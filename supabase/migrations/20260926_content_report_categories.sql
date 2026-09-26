-- Content reports: a fuller set of categories for the reader to choose from.
--
-- The report modal used to offer four — wrong answer / typo / unclear / other —
-- which left most of what a reader actually finds under "other": a step in the
-- worked solution that doesn't follow, a number that differs from the published
-- paper, a formula that doesn't render. It now offers eleven, split by what the
-- page is (a question has a keyed answer and a published original; a concept
-- page has neither). See quiz/src/lib/reportIssue.ts for the catalogue, and
-- scripts/sync_reports.py for the triage hint each one carries into the log.
--
-- The four original values stay valid: rows already filed with them must still
-- satisfy the constraint, and `sync_reports.py` still reads them.
--
-- APPLY THIS BEFORE DEPLOYING the app that offers the new categories — until it
-- runs, a report filed under any of the new ones fails the old CHECK.

ALTER TABLE content_reports DROP CONSTRAINT IF EXISTS content_reports_severity;

ALTER TABLE content_reports ADD CONSTRAINT content_reports_severity CHECK (
  severity IS NULL OR severity IN (
    'wrong answer',
    'solution error',
    'mistranscribed',
    'incorrect',
    'missing',
    'outdated',
    'typo',
    'unclear',
    'display',
    'broken link',
    'other'
  )
);
