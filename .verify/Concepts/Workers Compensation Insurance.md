---
target: Concepts/Workers Compensation Insurance.md
created: 2026-10-31
---

## [F-001] 'A law change alters the cost of every claim' contradicts Werner's benefit example
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/b3a4
- date: 2026-10-31
- severity: major
- status: open
- locus: bullet 'Statutory benefits in ratemaking (Exam 5)'
- claim: Statutes set the benefit structure ... so a law change alters the cost of every claim.
- evidence: Werner Ch.6 p.102 (PDF p.114), Table 6.6: lowering the maximum from 100% to 83.3% of SAWW changes benefits only for the 125-150% and >150% bands (11,006 -> 9,996; 11,000 -> 9,163); the 31 minimum-bound workers and the 46 between the limits are unchanged ('The number of workers affected by the minimum benefit, 31, is not impacted by the change'). The clause also contradicts the linked Policy Provision Changes page.
- source_rank: 2
- proposed_action: Delete the clause 'so a law change alters the cost of every claim'.
- applied: true
- fingerprint: c02645f85e66

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/b3a4
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Clause deleted in this run (transcription: removing what the source contradicts). The rest of the bullet matches W&M pp.101-103.

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/b3a4
- date: 2026-10-31
- status_set: in_review
- checks_run: Only the Exam 5 bullet was checked, against W&M Ch.6 pp.100-103 (PDF pp.112-115) and Table 6.6; link to Policy Provision Changes resolves. The rest of the page is Exam 6C (Canadian boards, Meredith principles, funding, the bargain example) with no prior log and not on Exam 5's readings.
- note: Exam 5 bullet checked and corrected (F-001, major, applied). Not verified: the Canadian 6C content needs Exam 6C's readings, which this pass did not consult, so the page stays in review.
