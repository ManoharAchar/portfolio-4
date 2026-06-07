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
