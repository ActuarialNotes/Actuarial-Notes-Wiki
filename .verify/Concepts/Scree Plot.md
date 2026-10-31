---
target: Concepts/Scree Plot.md
created: 2026-10-18
---

## [F-001] Overreach: 'a vague elbow means no low-dimensional structure'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 4, last sentence
- claim: A vague elbow means the data have no low-dimensional structure.
- evidence: ISLR p.508 (PDF 515) says only that the visual analysis 'is inherently ad hoc' and the question 'is inherently ill-defined'. It does not conclude anything about structure from a vague elbow. Deleted the sentence.
- source_rank: 2
- proposed_action: Delete the sentence.
- applied: true
- fingerprint: 8ecf1ea49294

## [F-002] Kaiser rule (λ>1) is not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 3; example answer
- claim: 'Keep λ_m > 1 on standardized data' is offered as a companion rule, and the example applies 'Kaiser'.
- evidence: ISLR 2nd ed. full-text: 'Kaiser' occurs 0 times. ISLR p.508 (PDF 515): 'there is no well-accepted objective way to decide how many principal components are enough.' No source read this session states the rule.
- source_rank: 2
- proposed_action: Cite an open source for the Kaiser criterion. Deleting it would mean rewriting the example, so it needs a writer.
- applied: false
- fingerprint: 48757c7c8c9b

## [F-003] Etymology unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: nit
- status: open
- locus: bullet 1
- claim: 'The name is geological: the steep face ... the rubble at the base is noise.'
- evidence: ISLR full-text: 'geolog' occurs 0 times. It is harmless and almost certainly true (scree = talus slope), but no source read this session states it.
- source_rank: 2
- proposed_action: Cite or delete.
- applied: false
- fingerprint: 14fb2f1e1d97

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Deleted in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: definition vs Fig.12.3 caption and pp.505-508 (scree plot = PVE per component; elbow by eye; ad hoc); recomputed example (drops 1.3, 0.9, 0.3, 0.1, 0.2; total 6.0; 75%)
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.2.3-12.2.4, pp.504-508 (PDF 511-515), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Medium: F-002 (Kaiser rule) and F-003 (etymology) are open. ISLR plots PVE; the page also allows eigenvalues, which are proportional to PVE. Printed page = PDF page - 7.

## [C-002] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- note: Page-number correction to this run's entries: in Chapter 12 of the CAS-hosted copy, printed page = PDF page − 6, not − 7. Every printed page cited above for Ch.12 is one too low: the PDF page numbers are right. Read: Algorithm 12.2 p.519 (PDF 525); Table 12.3 p.526 (PDF 532); PVE (12.8)-(12.10) pp.505-506 (PDF 511-512); choosing the number of PCs p.509 (PDF 515); scaling for clustering pp.529-530 (PDF 535-536).

## [F-004] Eigenvalue-close-to-1 clause unsourced
- entry_type: finding
- author: agent:checker-islr-b
- run_id: 2026-10-31T05:08Z/61e8
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Correlated variables share a component', last clause
- claim: On standardized data that component's eigenvalue is close to 1, the variance of the one variable it carries.
- evidence: No source read this run states it: ISLR §12.2.1 PDF pp.507-509 (USArrests, UrbanPop 'less correlated with the other three' carries most of PC2) supports only that the less-correlated variable gets a component of its own; NIST §6.5.5.1, Minitab, Penn State STAT 505 Lesson 11, Shalizi 36-350 PCA notes searched — none states the eigenvalue≈1 case. It is an inference (P1), so cut.
- source_rank: 2
- proposed_action: Delete the clause, keep the sourced half of the bullet.
- applied: true
- fingerprint: 2241f68d3597

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:checker-islr-b
- run_id: 2026-10-31T05:08Z/61e8
- date: 2026-10-31
- resolves: F-004
- status: resolved
- note: Clause deleted in this run; bullet now ends 'is left largely to a component of its own'.

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
- checks_run: whole page re-read; zero-eigenvalue bullet vs Minitab (rank r<p ⇒ p−r zero eigenvalues), Shalizi pp.2-3, 8-10, NIST 6.5.5.2 (det = product); cumulative PVE flat after 100% from PVEs summing to one; shared/own-component bullet vs ISLR USArrests — eigenvalue≈1 clause cut (F-004); Kaiser sourced (F-002 closed); eigenvalue scree plot vs Penn State L11; example recomputed (drops 1.3, 0.9, 0.3, 0.1, 0.2; 4.5/6 = 75%); rule 10: no number from masii-2019f-q39
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, footnote 2 p.501 (PDF 507), §12.2.1 USArrests pp.501-503 (PDF 507-509: crime variables share PC1, UrbanPop 'less correlated with the other three' carries most of PC2), §12.2.3 p.506 (PDF 512: PVEs sum to one; scree plot), Fig. 12.3 and §12.2.4 p.509 (PDF 515: elbow, ad hoc); Minitab Support, Principal Components Analysis, 'Interpret all statistics and graphs' (Kaiser criterion) and 'Methods and formulas' (rank r < p gives p − r zero eigenvalues; multicollinearity) — https://support.minitab.com/en-us/minitab/help-and-how-to/statistical-modeling/multivariate/how-to/principal-components/methods-and-formulas/methods-and-formulas; NIST/SEMATECH e-Handbook of Statistical Methods §6.5.5.1 (component variances are the eigenvalues; Kaiser (1966) eigenvalues greater than unity) and §6.5.5.2 (eigenvalues of R sum to p; det R = product of eigenvalues) — https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc551.htm , https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc552.htm; Penn State STAT 505 Lesson 11 'Principal Components Analysis' (scree plot of eigenvalues against i; cumulative-proportion targets) and Lesson 12 §12.5 (cumulative 80%, eigenvalues of at least one, scree elbow) — https://online.stat.psu.edu/stat505/Lesson11.html , https://online.stat.psu.edu/stat505/Lesson12.html; Shalizi, 36-401 Lecture 17 'Multicollinearity' (CMU, Fall 2015), pp.2-3, 8-10 (zero eigenvalue ⇔ singular ⇔ exact linear combination; correlation entries (nearly) ±1), sha256:d8115efaaad92aacf470b4ba842b184c2906aba30816c4f6ae2a13b8c1327380 — https://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/lecture-17.pdf
- note: Medium: F-003 (geological etymology, nit) remains open, unsourced but harmless. Only MAS-II links this page.
