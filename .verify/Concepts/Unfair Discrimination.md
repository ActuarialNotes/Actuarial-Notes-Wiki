---
target: Concepts/Unfair Discrimination.md
created: 2026-10-10
---

## [F-001] NAIC #880 cited at the superseded section letter
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- severity: minor
- status: open
- locus: United States bullet
- claim: The NAIC Unfair Trade Practices Act (§4G) lists, among unfair discrimination, ...
- evidence: The NAIC #880 PDF (sha256:e27f5324468298edb8af55d6166ac73a928c7fcd2571340a51bb342a1bf7367e, https://content.naic.org/sites/default/files/model-law-880.pdf) prints the current Spring 2024 text with unfair discrimination at 'H. Unfair Discrimination.', items (3) geographic location and (5) sex, marital status, race, religion or national origin (PDF pp.4-5). §4G is the lettering of the Summer 2008 text appended later in the same PDF (PDF pp.23-24).
- source_rank: 1
- proposed_action: Change '§4G' to '§4H'.
- applied: true
- fingerprint: dcc31af56dd9

## [F-002] Tip says DISC-DA 10.4 covers this page; the exam page no longer links it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- severity: minor
- status: open
- locus: How it appears on the exam, DISC-DA bullet
- claim: DISC-DA: Section 10.4 covers the societal impact of credit-based insurance scores. Questions ask whether a predictive variable can still be unfairly discriminatory, ...
- evidence: Exam DISC-DA (CAS).md objective 10.4 links only [[Credit-Based Insurance Scoring]]; no DISC-DA objective links [[Unfair Discrimination]] (rank 4, vault cross-reference). The DISC-DA syllabus (sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16, https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf) gives section titles only.
- source_rank: 4
- proposed_action: Delete the DISC-DA tip line.
- applied: true
- fingerprint: 5db7c647f41d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Changed '(§4G)' to '(§4H)' in this run, on the lead's instruction.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Deleted the DISC-DA tip line in this run, on the lead's instruction. The page was not otherwise verified.

## [C-001] Scope of this run's check
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- note: Only the two items above were checked and fixed, on the lead's instruction. The rest of the page (mostly Canadian-framed) has not been fact checked; the status stays unverified.
