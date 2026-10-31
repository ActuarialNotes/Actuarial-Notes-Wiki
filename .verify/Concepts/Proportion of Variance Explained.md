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

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:checker-islr-b
- run_id: 2026-10-31T05:08Z/61e8
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Kaiser rule now sourced, no text change: NIST/SEMATECH e-Handbook of Statistical Methods §6.5.5.1 'Properties of Principal Components' (component variances are the eigenvalues; 'Eigenvalues greater than unity': Kaiser (1966) rule of thumb, each principal factor should represent a number of original variables) and §6.5.5.2 (eigenvalues of R sum to p; det R = product of eigenvalues) — https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc551.htm , https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc552.htm; Minitab Support, Principal Components Analysis: 'Interpret all statistics and graphs' (eigenvalues are the variances of the PCs; Kaiser criterion, keep eigenvalues > 1) and 'Methods and formulas' (rank r < p gives p − r eigenvalues equal to zero; multicollinearity) — https://support.minitab.com/en-us/minitab/help-and-how-to/statistical-modeling/multivariate/how-to/principal-components/interpret-the-results/all-statistics-and-graphs , https://support.minitab.com/en-us/minitab/help-and-how-to/statistical-modeling/multivariate/how-to/principal-components/methods-and-formulas/methods-and-formulas. With Σλ = p for a correlation matrix (NIST §6.5.5.2), λ > 1 is more than one variable's worth of variance.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:checker-islr-b
- run_id: 2026-10-31T05:08Z/61e8
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole page re-read; new 'From the scores' bullet vs (12.8)-(12.10); centred-score bullet vs p.500; eigenvalue = component variance vs footnote 2 and NIST 6.5.5.1; Σλ = p for R vs NIST 6.5.5.2; Kaiser vs NIST 6.5.5.1 / Minitab (closes F-002); min(n−1,p) vs p.506; R² reading p.506; example recomputed (Σ=8.0; 45%, 23.75%, 12.5%; cumulative 81.25% at 3); rule 10: no number of masii-2018f-q41 or masii-2019f-q41 on the page
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, §12.2.1 p.500 (PDF 506: centred scores average zero, objective is the sample variance), footnote 2 p.501 (PDF 507), §12.2.3 eqs. (12.8)-(12.11) pp.505-506 (PDF 511-512), §12.2.4 p.509 (PDF 515); NIST/SEMATECH e-Handbook of Statistical Methods §6.5.5.1 (component variances are the eigenvalues; Kaiser (1966) eigenvalues greater than unity) and §6.5.5.2 (eigenvalues of R sum to p; det R = product of eigenvalues) — https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc551.htm , https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc552.htm; Minitab Support, Principal Components Analysis, 'Interpret all statistics and graphs' (Kaiser criterion) and 'Methods and formulas' (rank r < p gives p − r zero eigenvalues; multicollinearity) — https://support.minitab.com/en-us/minitab/help-and-how-to/statistical-modeling/multivariate/how-to/principal-components/methods-and-formulas/methods-and-formulas; Penn State STAT 505 Lesson 11 'Principal Components Analysis' (scree plot of eigenvalues against i; cumulative-proportion targets) and Lesson 12 §12.5 (cumulative 80%, eigenvalues of at least one, scree elbow) — https://online.stat.psu.edu/stat505/Lesson11.html , https://online.stat.psu.edu/stat505/Lesson12.html
- note: Medium: the MAS-II reading is ISLR (open) but the 90% target and Kaiser rule are from NIST/Minitab/Penn State rather than the reading. Pages also on SRM and ACIA-CAPSTONE: nothing exam-specific. Printed page = PDF − 6 in ISLR Ch.12.
