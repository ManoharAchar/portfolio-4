-- ============================================================
-- Guest Archive seed — 46 placeholder visitors
-- Run order:
--   1. DELETE FROM sessions;  (clear any existing rows)
--   2. DELETE FROM passes;    (clear any existing rows)
--   3. Run this file in full
-- ============================================================

-- Passes — 46 rows, timestamps spread Dec 2025 → May 2026
-- Intent distribution: see-work (12), designer (11), exploring (12), sent-here (11)
-- pass_color follows intent mapping used throughout the app

INSERT INTO passes (id, token, animal_name, intent, pass_color, created_at) OVERRIDING SYSTEM VALUE VALUES
(1,  gen_random_uuid(), 'Quiet Storm',      'exploring',  '#c4a24d', '2025-12-03 14:23:00+00'),
(2,  gen_random_uuid(), 'Silver Tide',      'see-work',   '#64818c', '2025-12-08 09:15:00+00'),
(3,  gen_random_uuid(), 'Open Road',        'designer',   '#798c6d', '2025-12-11 16:42:00+00'),
(4,  gen_random_uuid(), 'Drifting Leaf',    'sent-here',  '#c87a5a', '2025-12-15 11:08:00+00'),
(5,  gen_random_uuid(), 'Empty Shore',      'exploring',  '#c4a24d', '2025-12-19 08:54:00+00'),
(6,  gen_random_uuid(), 'Hollow Echo',      'see-work',   '#64818c', '2025-12-22 15:31:00+00'),
(7,  gen_random_uuid(), 'Faded Map',        'designer',   '#798c6d', '2025-12-26 10:17:00+00'),
(8,  gen_random_uuid(), 'Distant Bell',     'sent-here',  '#c87a5a', '2025-12-30 13:44:00+00'),
(9,  gen_random_uuid(), 'Pale Horizon',     'see-work',   '#64818c', '2026-01-03 09:22:00+00'),
(10, gen_random_uuid(), 'Wandering Star',   'exploring',  '#c4a24d', '2026-01-07 14:55:00+00'),
(11, gen_random_uuid(), 'Broken Thread',    'designer',   '#798c6d', '2026-01-10 11:33:00+00'),
(12, gen_random_uuid(), 'Fleeting Shadow',  'sent-here',  '#c87a5a', '2026-01-14 16:08:00+00'),
(13, gen_random_uuid(), 'Ancient Path',     'see-work',   '#64818c', '2026-01-17 10:45:00+00'),
(14, gen_random_uuid(), 'Gentle Rain',      'exploring',  '#c4a24d', '2026-01-21 08:19:00+00'),
(15, gen_random_uuid(), 'Still Water',      'designer',   '#798c6d', '2026-01-25 13:52:00+00'),
(16, gen_random_uuid(), 'Burning Glass',    'see-work',   '#64818c', '2026-01-28 15:27:00+00'),
(17, gen_random_uuid(), 'Hidden Trail',     'sent-here',  '#c87a5a', '2026-02-01 09:41:00+00'),
(18, gen_random_uuid(), 'Cold Light',       'exploring',  '#c4a24d', '2026-02-04 14:16:00+00'),
(19, gen_random_uuid(), 'Slow River',       'designer',   '#798c6d', '2026-02-08 11:05:00+00'),
(20, gen_random_uuid(), 'Borrowed Time',    'see-work',   '#64818c', '2026-02-11 16:38:00+00'),
(21, gen_random_uuid(), 'Fading Signal',    'sent-here',  '#c87a5a', '2026-02-15 08:52:00+00'),
(22, gen_random_uuid(), 'Old Lantern',      'exploring',  '#c4a24d', '2026-02-18 13:24:00+00'),
(23, gen_random_uuid(), 'Rising Fog',       'designer',   '#798c6d', '2026-02-22 10:57:00+00'),
(24, gen_random_uuid(), 'Deep Current',     'see-work',   '#64818c', '2026-02-25 15:13:00+00'),
(25, gen_random_uuid(), 'White Noise',      'sent-here',  '#c87a5a', '2026-03-01 09:36:00+00'),
(26, gen_random_uuid(), 'Cracked Mirror',   'exploring',  '#c4a24d', '2026-03-04 14:49:00+00'),
(27, gen_random_uuid(), 'Torn Page',        'designer',   '#798c6d', '2026-03-08 11:22:00+00'),
(28, gen_random_uuid(), 'Faint Ember',      'see-work',   '#64818c', '2026-03-12 16:55:00+00'),
(29, gen_random_uuid(), 'Narrow Gate',      'sent-here',  '#c87a5a', '2026-03-15 08:18:00+00'),
(30, gen_random_uuid(), 'Long Shadow',      'exploring',  '#c4a24d', '2026-03-19 13:41:00+00'),
(31, gen_random_uuid(), 'Brief Flash',      'designer',   '#798c6d', '2026-03-23 10:04:00+00'),
(32, gen_random_uuid(), 'Known Route',      'see-work',   '#64818c', '2026-03-27 15:37:00+00'),
(33, gen_random_uuid(), 'Dark Matter',      'sent-here',  '#c87a5a', '2026-04-01 09:50:00+00'),
(34, gen_random_uuid(), 'Soft Ground',      'exploring',  '#c4a24d', '2026-04-04 14:13:00+00'),
(35, gen_random_uuid(), 'Worn Atlas',       'designer',   '#798c6d', '2026-04-08 11:46:00+00'),
(36, gen_random_uuid(), 'Fading Ink',       'see-work',   '#64818c', '2026-04-12 16:09:00+00'),
(37, gen_random_uuid(), 'Early Frost',      'sent-here',  '#c87a5a', '2026-04-16 08:32:00+00'),
(38, gen_random_uuid(), 'Last Signal',      'exploring',  '#c4a24d', '2026-04-20 13:55:00+00'),
(39, gen_random_uuid(), 'Steady Flame',     'designer',   '#798c6d', '2026-04-24 10:18:00+00'),
(40, gen_random_uuid(), 'Open Window',      'see-work',   '#64818c', '2026-04-28 15:41:00+00'),
(41, gen_random_uuid(), 'Trailing Edge',    'sent-here',  '#c87a5a', '2026-05-02 09:04:00+00'),
(42, gen_random_uuid(), 'Night Passage',    'exploring',  '#c4a24d', '2026-05-06 14:27:00+00'),
(43, gen_random_uuid(), 'Marked Trail',     'designer',   '#798c6d', '2026-05-10 11:50:00+00'),
(44, gen_random_uuid(), 'Quiet Harbor',     'see-work',   '#64818c', '2026-05-14 16:23:00+00'),
(45, gen_random_uuid(), 'Broken Compass',   'sent-here',  '#c87a5a', '2026-05-19 08:46:00+00'),
(46, gen_random_uuid(), 'Passing Cloud',    'exploring',  '#c4a24d', '2026-05-24 13:09:00+00');

-- Advance the passes sequence so the next real visitor gets id = 47
SELECT setval(pg_get_serial_sequence('passes', 'id'), 46);


-- Sessions — one row per pass, lifetime stats
-- Archetype distribution: wanderer (18), passerby (12), scholar (9), hunter (7)
--
-- Thresholds (must match computeArchetype in session.js):
--   scholar:  scroll_depth > 0.70 AND dwell_seconds > 240 AND case_studies_opened >= 2
--   hunter:   case_studies_opened >= 3 AND dwell_seconds < 180
--   passerby: dwell_seconds < 45 AND scroll_depth < 0.20
--   wanderer: everything else
--
-- Every row below has been verified against these rules.

INSERT INTO sessions (pass_id, archetype, dwell_seconds, scroll_depth, case_studies_opened, created_at) OVERRIDING SYSTEM VALUE VALUES
-- Wanderers — dwell 50–237s, scroll 0.27–0.66, case_studies 0–1
(1,  'wanderer', 187, 0.52, 1, '2025-12-03 14:23:00+00'),
(4,  'wanderer', 143, 0.38, 0, '2025-12-15 11:08:00+00'),
(7,  'wanderer', 216, 0.61, 1, '2025-12-26 10:17:00+00'),
(9,  'wanderer', 164, 0.44, 0, '2026-01-03 09:22:00+00'),
(12, 'wanderer',  95, 0.27, 1, '2026-01-14 16:08:00+00'),
(15, 'wanderer', 177, 0.56, 0, '2026-01-25 13:52:00+00'),
(18, 'wanderer', 203, 0.48, 1, '2026-02-04 14:16:00+00'),
(20, 'wanderer', 132, 0.35, 0, '2026-02-11 16:38:00+00'),
(23, 'wanderer', 191, 0.63, 1, '2026-02-22 10:57:00+00'),
(26, 'wanderer', 158, 0.42, 0, '2026-03-04 14:49:00+00'),
(29, 'wanderer', 224, 0.58, 1, '2026-03-15 08:18:00+00'),
(32, 'wanderer', 148, 0.47, 0, '2026-03-27 15:37:00+00'),
(35, 'wanderer', 182, 0.51, 1, '2026-04-08 11:46:00+00'),
(38, 'wanderer', 169, 0.39, 0, '2026-04-20 13:55:00+00'),
(40, 'wanderer', 237, 0.66, 1, '2026-04-28 15:41:00+00'),
(42, 'wanderer', 155, 0.44, 0, '2026-05-06 14:27:00+00'),
(44, 'wanderer', 196, 0.53, 1, '2026-05-14 16:23:00+00'),
(46, 'wanderer', 211, 0.58, 0, '2026-05-24 13:09:00+00'),

-- Passersby — dwell 11–43s, scroll 0.04–0.17, case_studies 0
(3,  'passerby',  22, 0.08, 0, '2025-12-11 16:42:00+00'),
(6,  'passerby',  31, 0.11, 0, '2025-12-22 15:31:00+00'),
(10, 'passerby',  18, 0.06, 0, '2026-01-07 14:55:00+00'),
(14, 'passerby',  38, 0.14, 0, '2026-01-21 08:19:00+00'),
(17, 'passerby',  27, 0.09, 0, '2026-02-01 09:41:00+00'),
(22, 'passerby',  15, 0.05, 0, '2026-02-18 13:24:00+00'),
(25, 'passerby',  43, 0.17, 0, '2026-03-01 09:36:00+00'),
(28, 'passerby',  29, 0.12, 0, '2026-03-12 16:55:00+00'),
(31, 'passerby',  11, 0.04, 0, '2026-03-23 10:04:00+00'),
(34, 'passerby',  36, 0.13, 0, '2026-04-04 14:13:00+00'),
(37, 'passerby',  24, 0.07, 0, '2026-04-16 08:32:00+00'),
(41, 'passerby',  33, 0.10, 0, '2026-05-02 09:04:00+00'),

-- Scholars — dwell 356–541s, scroll 0.76–0.93, case_studies 2–3
(2,  'scholar',  412, 0.84, 3, '2025-12-08 09:15:00+00'),
(8,  'scholar',  378, 0.89, 2, '2025-12-30 13:44:00+00'),
(13, 'scholar',  541, 0.93, 3, '2026-01-17 10:45:00+00'),
(16, 'scholar',  489, 0.77, 2, '2026-01-28 15:27:00+00'),
(19, 'scholar',  356, 0.81, 2, '2026-02-08 11:05:00+00'),
(24, 'scholar',  467, 0.88, 3, '2026-02-25 15:13:00+00'),
(30, 'scholar',  523, 0.91, 2, '2026-03-19 13:41:00+00'),
(36, 'scholar',  398, 0.76, 3, '2026-04-12 16:09:00+00'),
(43, 'scholar',  444, 0.85, 2, '2026-05-10 11:50:00+00'),

-- Hunters — dwell 84–141s, scroll 0.38–0.62, case_studies 3
(5,  'hunter',   98, 0.45, 3, '2025-12-19 08:54:00+00'),
(11, 'hunter',  127, 0.53, 3, '2026-01-10 11:33:00+00'),
(21, 'hunter',   84, 0.41, 3, '2026-02-15 08:52:00+00'),
(27, 'hunter',  113, 0.38, 3, '2026-03-08 11:22:00+00'),
(33, 'hunter',  141, 0.57, 3, '2026-04-01 09:50:00+00'),
(39, 'hunter',  106, 0.49, 3, '2026-04-24 10:18:00+00'),
(45, 'hunter',  132, 0.62, 3, '2026-05-19 08:46:00+00');

-- Advance the sessions sequence to match
SELECT setval(pg_get_serial_sequence('sessions', 'id'), 46);


-- ============================================================
-- Optional: add a unique constraint to enforce one session per pass
-- (Required if you haven't already run this from the session model migration)
-- ALTER TABLE sessions ADD CONSTRAINT sessions_pass_id_unique UNIQUE (pass_id);
--
-- Optional: allow the anon key to PATCH session rows (required for return visits)
-- CREATE POLICY "anon can update sessions"
--   ON sessions FOR UPDATE TO anon
--   USING (true) WITH CHECK (true);
-- ============================================================
