---
target: Concepts/Linkage.md
created: 2026-10-18
---

## [F-001] Unsourced table claims: complete as 'the usual default', average 'less sensitive to outliers'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: minor
- status: open
- locus: table, Complete and Average rows
- claim: Complete linkage gives 'compact, balanced clusters — the usual default'; average is 'less sensitive to outliers than complete'.
- evidence: ISLR Table 12.3 and p.525 (PDF 532): average, complete and single are 'most popular among statisticians'; 'average and complete linkage are generally preferred over single linkage, as they tend to yield more balanced dendrograms'. Neither 'default' nor outlier sensitivity appears. Deleted both clauses; the cells now read 'balanced dendrograms'.
- source_rank: 2
- proposed_action: Delete the unsourced clauses.
- applied: true
- fingerprint: dfad00dac5c7

## [F-002] 'Variables must be standardized' overstates the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 4
- claim: Variables must be standardized first whenever their units differ.
- evidence: ISLR p.528-529 (PDF 535-536): 'We might also want to scale the variables to have standard deviation one if they are measured on different scales'; 'whether or not it is a good decision to scale the variables ... depends on the application at hand.' Restated to that.
- source_rank: 2
- proposed_action: Restate to the reading.
- applied: true
- fingerprint: 1defd2a8339f

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Deleted in this run; both cells now say 'balanced dendrograms' (ISLR p.525).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Restated to the reading in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: complete/single/average/centroid definitions vs Table 12.3 p.525; inversion definition p.525; chaining ('extended, trailing clusters'); correlation-based distance groups by shape pp.526-528; scaling p.528-529; recomputed example (6, 5, 5.5)
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.4, pp.516-531 (PDF 523-538), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Printed page = PDF page - 7.

## [C-002] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- note: Page-number correction to this run's entries: in Chapter 12 of the CAS-hosted copy, printed page = PDF page − 6, not − 7. Every printed page cited above for Ch.12 is one too low: the PDF page numbers are right. Read: Algorithm 12.2 p.519 (PDF 525); Table 12.3 p.526 (PDF 532); PVE (12.8)-(12.10) pp.505-506 (PDF 511-512); choosing the number of PCs p.509 (PDF 515); scaling for clustering pp.529-530 (PDF 535-536).
