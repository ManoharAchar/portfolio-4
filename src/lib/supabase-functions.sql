-- Guest Archive: server-side aggregate function
-- Run this once in the Supabase SQL editor (Database → SQL Editor → New query).
--
-- What it does: computes per-archetype counts and IQR-trimmed averages for
-- dwell time, scroll depth, and case studies opened — server-side, so the
-- JS client never needs to fetch every session row.
--
-- After running, fetchAggregateData() in src/lib/archive.js will automatically
-- use this function instead of the client-side fallback.

CREATE OR REPLACE FUNCTION get_archive_aggregate()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  n      integer;
  result json;
BEGIN
  SELECT COUNT(*) INTO n FROM sessions;

  IF n = 0 THEN
    RETURN json_build_object(
      'total',             0,
      'wanderer',          0,
      'scholar',           0,
      'hunter',            0,
      'passerby',          0,
      'avg_dwell_seconds', null,
      'avg_scroll_depth',  null,
      'avg_case_studies',  null
    );
  END IF;

  -- Compute per-metric IQR fences, then average only the inliers for each metric.
  -- Each metric is trimmed independently (same behaviour as the JS trimmedMean fn).
  WITH fences AS (
    SELECT
      percentile_cont(0.25) WITHIN GROUP (ORDER BY dwell_seconds)       AS dq1,
      percentile_cont(0.75) WITHIN GROUP (ORDER BY dwell_seconds)       AS dq3,
      percentile_cont(0.25) WITHIN GROUP (ORDER BY scroll_depth)        AS sq1,
      percentile_cont(0.75) WITHIN GROUP (ORDER BY scroll_depth)        AS sq3,
      percentile_cont(0.25) WITHIN GROUP (ORDER BY case_studies_opened) AS cq1,
      percentile_cont(0.75) WITHIN GROUP (ORDER BY case_studies_opened) AS cq3
    FROM sessions
  )
  SELECT json_build_object(
    'total',             n,
    'wanderer',          COUNT(*) FILTER (WHERE archetype = 'wanderer'),
    'scholar',           COUNT(*) FILTER (WHERE archetype = 'scholar'),
    'hunter',            COUNT(*) FILTER (WHERE archetype = 'hunter'),
    'passerby',          COUNT(*) FILTER (WHERE archetype = 'passerby'),
    'avg_dwell_seconds', ROUND(AVG(
      CASE WHEN dwell_seconds
        BETWEEN f.dq1 - 1.5*(f.dq3-f.dq1) AND f.dq3 + 1.5*(f.dq3-f.dq1)
        THEN dwell_seconds END
    ))::int,
    'avg_scroll_depth',  AVG(
      CASE WHEN scroll_depth
        BETWEEN f.sq1 - 1.5*(f.sq3-f.sq1) AND f.sq3 + 1.5*(f.sq3-f.sq1)
        THEN scroll_depth END
    ),
    'avg_case_studies',  AVG(
      CASE WHEN case_studies_opened
        BETWEEN f.cq1 - 1.5*(f.cq3-f.cq1) AND f.cq3 + 1.5*(f.cq3-f.cq1)
        THEN case_studies_opened::float END
    )
  )
  INTO result
  FROM sessions, fences f;

  RETURN result;
END;
$$;

-- Allow the anonymous (unauthenticated) role to call this function.
-- The Supabase JS anon client uses this role for all public reads.
GRANT EXECUTE ON FUNCTION get_archive_aggregate() TO anon;

-- ─────────────────────────────────────────────────────────────────────────
-- Guest Archive: SECURITY DEFINER readers for the `passes` table
--
-- The `passes` table has RLS restricting SELECT to a matching token header
-- (see the "restrict pass SELECT to token header" migration), so any visitor
-- browsing the archive can no longer see anyone else's pass via a direct
-- query — the carousel, the expanded grid, and the "last session" hero
-- fallback all silently returned empty/null because of this. These three
-- functions run as the function owner (bypassing RLS) so the public archive
-- views work the same way get_ledger_rows already does.
-- ─────────────────────────────────────────────────────────────────────────

-- 10 most recent passes, for the archive carousel.
CREATE OR REPLACE FUNCTION get_carousel_passes()
RETURNS TABLE(id bigint, animal_name text, intent text, pass_color text, created_at timestamptz)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, animal_name, intent, pass_color, created_at
  FROM passes
  ORDER BY created_at DESC
  LIMIT 10;
$$;

GRANT EXECUTE ON FUNCTION get_carousel_passes() TO anon;

-- Paginated passes for the expanded "See all" grid, optionally filtered to
-- passes whose most recent session matched a given archetype.
-- Returns GRID_PAGE+1 (28) rows so the client can detect hasMore.
CREATE OR REPLACE FUNCTION get_grid_passes(p_offset int, p_archetype text DEFAULT 'all')
RETURNS TABLE(id bigint, animal_name text, intent text, pass_color text, created_at timestamptz)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.animal_name, p.intent, p.pass_color, p.created_at
  FROM passes p
  WHERE (
    p_archetype = 'all'
    OR EXISTS (
      SELECT 1 FROM sessions s
      WHERE s.pass_id = p.id AND s.archetype = p_archetype
    )
  )
  ORDER BY p.created_at DESC
  LIMIT 28
  OFFSET p_offset;
$$;

GRANT EXECUTE ON FUNCTION get_grid_passes(int, text) TO anon;

-- Most recent session for a given pass, with its pass fields embedded —
-- used as the hero fallback after refresh, and to pin the visitor's own
-- row when it hasn't loaded into the current ledger page yet.
CREATE OR REPLACE FUNCTION get_last_session(p_pass_id bigint)
RETURNS TABLE(
  id bigint, archetype text, dwell_seconds integer, scroll_depth double precision,
  case_studies_opened integer, created_at timestamptz,
  pass_id_val bigint, animal_name text, intent text, pass_color text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    s.id, s.archetype, s.dwell_seconds, s.scroll_depth, s.case_studies_opened, s.created_at,
    p.id AS pass_id_val, p.animal_name, p.intent, p.pass_color
  FROM sessions s
  LEFT JOIN passes p ON p.id = s.pass_id
  WHERE s.pass_id = p_pass_id
  ORDER BY s.created_at DESC
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION get_last_session(bigint) TO anon;

-- ─────────────────────────────────────────────────────────────────────────
-- Create a new pass, bypassing the SELECT-on-RETURNING RLS trap.
--
-- createPass() does `.insert(...).select().single()`, which PostgREST
-- executes as INSERT ... RETURNING. The "anon insert passes" policy (WITH
-- CHECK true) allows the insert itself, but the RETURNING row is still
-- governed by the "anon select own pass" SELECT policy (token = request
-- header). The client only saves the new token to localStorage *after* a
-- successful insert, so the header is empty at insert time — the RETURNING
-- clause fails RLS and the whole request errors with 42501, even though
-- the insert would otherwise have succeeded. This has silently blocked
-- every new visitor from getting a pass since the SELECT policy was added.
-- SECURITY DEFINER sidesteps this entirely.
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION create_pass(p_token uuid, p_animal_name text, p_intent text, p_pass_color text)
RETURNS TABLE(id bigint, token uuid, animal_name text, intent text, pass_color text, created_at timestamptz)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO passes (token, animal_name, intent, pass_color)
  VALUES (p_token, p_animal_name, p_intent, p_pass_color)
  RETURNING id, token, animal_name, intent, pass_color, created_at;
$$;

GRANT EXECUTE ON FUNCTION create_pass(uuid, text, text, text) TO anon;
