---
target: Concepts/Underwriting Changes.md
created: 2026-10-31
---

## [F-001] Ratio 30% to 5% stated as 'four times'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- severity: minor
- status: open
- locus: example 'Underwriting Tightening', answer bullet 2
- claim: a book containing four times as much high-hazard business
- evidence: The example's own figures: high-hazard share fell from 30% to 5% of premium; 30/5 = 6. Arithmetic (rank 5) falsifies 'four'.
- source_rank: 5
- proposed_action: Change 'four' to 'six' (done).
- applied: true
- fingerprint: 107847b89cf6

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: 'four times' corrected to 'six times' (30% / 5%).

## [F-002] 'Berquist-Sherman does not address this' overlooks B-S data rearrangement
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 5
- claim: Berquist-Sherman does not address this. It corrects for changes in claims practice, not in the composition of the exposure.
- evidence: Friedland Ch. 13 pp. 283-284: Berquist and Sherman's first alternative is data selection and rearrangement, including dividing the data into more homogeneous groups 'when there have been changes in the composition of business by jurisdiction, coverage, class, territory, or size of risk'. Only the two quantitative B-S adjustments (case and paid) address claims practice.
- source_rank: 2
- proposed_action: Qualify as 'the Berquist-Sherman case and paid adjustments do not address this'; the segmenting response the bullet recommends is itself Berquist-Sherman's.
- applied: false
- fingerprint: dbcd69c6fc75

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: definition and mix mechanism vs Ch. 4 p. 47 and Ch. 7 product-mix example; a priori adjustment vs Ch. 8 p. 137; segmenting vs Ch. 13; average-premium evidence vs W&M Ch. 5; both examples recomputed (74%, -19%, +17 pts; 30/5 = 6)
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 p. 47 (underwriting executive questions); Ch. 7 pp. 103-105 (product mix); Ch. 8 p. 137 (adjust a priori for pricing/underwriting changes); Ch. 13 pp. 283-284, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 p. 82 (distributional changes, average premium); Ch. 6 p. 110 (distributional changes in loss trend), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: One arithmetic slip fixed (F-001); one minor attribution finding open (F-002). The 'new business penalty' and 'loosening is the more dangerous direction' are general knowledge, not found in either text.
