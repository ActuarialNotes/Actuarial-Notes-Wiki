---
target: questions/exam-disc-rm/discrm-an-471.md
created: 2026-10-10
---

## [F-001] Tag pointed at a Canadian workers compensation page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv13
- date: 2026-10-10
- severity: minor
- status: open
- locus: wiki_link
- claim: wiki_link included Concepts/Workers+Compensation+Insurance (provincial boards).
- evidence: Concepts/Workers Compensation Insurance describes Canada's provincial workers compensation boards; the question is about a U.S. state requirement.
- source_rank: 4
- proposed_action: Retag to Concepts/Workers+Compensation+Underwriting (lead rule).
- applied: true
- fingerprint: 334b837f39c1

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv13
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Retagged to Concepts/Workers+Compensation+Underwriting in this run.

## [C-001] In review: depends on decision D6
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv13
- date: 2026-10-10
- note: Blind answer matched the key (C). The question tests the essential/desirable/available split, which has no independent source (only Bonga lecture notes) and was deleted from Concepts/Insurance as a Risk Management Technique under D6. Stays in_review with 035 pending D6.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv13
- date: 2026-10-10
- status_set: in_review
- checks_run: blind recomputation from the stem with key and explanation withheld (matched key); key and every distractor rationale checked; arithmetic re-worked; wiki_link targets exist and fit; learning_objective equals the DISC-RM section title; facts checked against the sources listed
- note: Left in_review pending D6 (see comment).

## [C-003] D6 note
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv13
- date: 2026-10-10
- note: D6: the essential/desirable/available split this question tests was deleted from Concepts/Insurance as a Risk Management Technique in dv13 because no independent source states it (only Bonga lecture notes). No vault page now teaches the content. Stays in_review until D6 is decided (source found and content restored, or question retired).

## [C-004] Retired under D6
- entry_type: comment
- author: agent:lead
- date: 2026-10-11
- locus: frontmatter
- note: Retired (off_syllabus: true) under decision D6, resolved the open-source way (docs/cas-publication-plan.md §3.5): the essential/desirable/available insurance split this question tests is stated only in The Institutes' course text, and it was removed from Insurance as a Risk Management Technique, so no vault page teaches it. Kept for the record; the quiz no longer serves it.
