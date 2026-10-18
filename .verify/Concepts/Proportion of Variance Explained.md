---
target: Concepts/Proportion of Variance Explained.md
created: 2026-10-18
---

## [F-001] Cumulative PVE reaches 1 at min(n−1, p), not p
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 3
- claim: The cumulative curve rises to 1 at m = p.
- evidence: ISLR p.505 (PDF 512): 'In total, there are min(n − 1, p) principal components, and their PVEs sum to one.' With n ≤ p the curve reaches 1 before m = p. Restated to m = min(n−1, p).
- source_rank: 2
- proposed_action: Restate to min(n−1, p).
- applied: true
- fingerprint: aadd199f2e27

## [F-002] Kaiser rule (λ>1) is not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 2
- claim: A component with λ_m > 1 carries more than one variable's variance 'the Kaiser rule of thumb'.
- evidence: ISLR 2nd ed. full-text: 'Kaiser' occurs 0 times. ISLR p.508 (PDF 515) says 'there is no well-accepted objective way to decide how many principal components are enough'. The arithmetic (Σλ = p on standardized data) is right; the named rule needs a source. ESL and Penn State STAT 505 could not be fetched this session.
- source_rank: 2
- proposed_action: Cite an open source for the Kaiser criterion, or delete the parenthetical. Left open.
- applied: false
- fingerprint: 148d37a5850e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated to m = min(n−1, p) in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: PVE formula vs (12.8)-(12.10): the page writes λ_m for the variance of the m-th score vector, ISLR's (12.9) numerator, and ISLR p.499 solves PCA by eigen decomposition; PVEs positive, summing to one p.505; PVE as R² p.505; scaling p.506-507; recomputed example (Σ=8.0; 45%, 23.75%, 12.5%; cumulative 81.25% at 3)
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.2.3-12.2.4, pp.504-508 (PDF 511-515), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Medium: F-002 (Kaiser rule) is open. Notation: the page uses eigenvalues and ISLR uses scores; the quantities are the same. Printed page = PDF page - 7.

## [C-002] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- note: Page-number correction to this run's entries: in Chapter 12 of the CAS-hosted copy, printed page = PDF page − 6, not − 7. Every printed page cited above for Ch.12 is one too low: the PDF page numbers are right. Read: Algorithm 12.2 p.519 (PDF 525); Table 12.3 p.526 (PDF 532); PVE (12.8)-(12.10) pp.505-506 (PDF 511-512); choosing the number of PCs p.509 (PDF 515); scaling for clustering pp.529-530 (PDF 535-536).
