---
target: Concepts/Loading Vector.md
created: 2026-10-05
---

## [F-001] Example's two loading vectors are not orthogonal
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: major
- status: open
- locus: example 'Interpreting Two Loading Vectors', stem
- claim: PCA on four standardized telematics variables gives phi_1 = (0.52, 0.51, 0.49, 0.48) and phi_2 = (0.61, 0.55, -0.42, -0.39).
- evidence: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.2.1 (PDF p.507), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf: 'constraining Z2 to be uncorrelated with Z1 is equivalent to constraining the direction phi_2 to be orthogonal (perpendicular) to the direction phi_1', and footnote 2 (PDF p.507): the phi_m are the ordered eigenvectors of X^T X. Recomputed (rank 5, falsifies only): phi_1 . phi_2 = 0.3172 + 0.2805 - 0.2058 - 0.1872 = 0.2047, not 0 (angle about 78 degrees), so the pair cannot be PC1 and PC2 of one PCA. Norms are fine (1.001, 1.003) and the asked PC1 score 2.00 is right. Orthogonality is exactly what MAS-II loading-vector computations lean on (e.g. recovering a missing loading; CAS Exam MAS-II Content Outline 2026 Domain C task 5, PDF p.3, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf), so the example teaches the wrong habit.
- source_rank: 2
- proposed_action: Replace phi_2 with a unit vector orthogonal to phi_1 (dot product 0 to two decimals) and show the orthogonality check beside the norm check. New numbers - not applied.
- applied: false
- fingerprint: 8a8f82264d63

## [F-002] Sign ambiguity is across software, not between runs
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: nit
- status: open
- locus: bullet 4 ('Sign is arbitrary')
- claim: phi_m and -phi_m describe the same component, so software may flip it between runs.
- evidence: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.2.4 'Uniqueness of the Principal Components' (PDF p.515), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf: 'Each principal component loading vector is unique, up to a sign flip. This means that two different software packages will yield the same principal component loading vectors, although the signs of those loading vectors may differ.' The source's point is across packages, not run-to-run randomness; the first half of the bullet is correct.
- source_rank: 2
- proposed_action: Say 'different software may report the opposite sign (scores flip with it)'. Not applied.
- applied: false
- fingerprint: d0824892974d

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: low
- checks_run: page read in full, no prior log; exam pages linking it: MAS-II (task 8, unsupervised methods list); z_im and unit-norm constraint diffed against ISLR 12.2-12.4; eigenvector statement against footnote 2 (ISLR: X^T X; page: covariance/correlation matrix - same eigenvectors, notation only); well-posedness against PDF p.506 ('arbitrarily large variance'); example recomputed (norms 1.001/1.003, z1 = 2.00, phi_1.phi_2 = 0.2047); link and figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §12.2.1 eqs. 12.1-12.4 and footnote 2 (PDF pp.505-507), §12.2.4 uniqueness up to sign (PDF p.515), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-II Content Outline 2026, Domain C task 5 (PDF p.3), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Definitions and formulas match ISLR Ch 12 (MAS-II sense; MAS-I reaches loadings only through PCR, ISLR §6.3.1). Confidence low because a major finding is open: the example's PC1/PC2 loadings are not orthogonal.

## [C-002] F-001 also applies to the figure
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- locus: figure (Media/Figures/Loading_Vector.svg)
- note: Re F-001: the generated figure draws the same non-orthogonal pair - scripts/figures_exam_mas_ii.py loading_vector(), lines 1184-1185, phi_1 = [0.52, 0.51, 0.49, 0.48], phi_2 = [0.61, 0.55, -0.42, -0.39] (dot product 0.2047). Fixing the example needs the builder changed and the figure regenerated (docs/concept-figures.md), not a hand edit of the SVG.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Example recomputed with an orthogonal pair. New loadings are the first two eigenvectors (numpy eigh, rounded to 2 dp) of the correlation matrix R = [[1,.65,.45,.45],[.65,1,.45,.35],[.45,.45,1,.60],[.45,.35,.60,1]] (eigenvalues 2.4765, 0.7817, 0.4241, 0.3177): phi_1 = (0.52, 0.50, 0.50, 0.48), phi_2 = (0.42, 0.55, -0.43, -0.58); unrounded (0.5185, 0.4959, 0.5044, 0.4805) and (0.4211, 0.5543, -0.4298, -0.5751). Rounded checks: phi_1.phi_2 = 0.2184 + 0.2750 - 0.2150 - 0.2784 = 0 exactly; ||phi_1||^2 = 1.0008, ||phi_2||^2 = 1.0002; PC1 score with all four +1 = 2.00 (unchanged). The answer now shows the orthogonality check beside the norm check; the interpretation (PC1 a size component, PC2 first pair vs last pair) still holds. Basis: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.2.1 (PDF p.507: constraining Z2 uncorrelated with Z1 'is equivalent to constraining the direction phi_2 to be orthogonal (perpendicular) to the direction phi_1'; footnote 2, loadings are ordered eigenvectors), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. The generated figure (Media/Figures/Loading_Vector.svg from scripts/figures_exam_mas_ii.py loading_vector()) still draws the old pair - not changed here; filed separately with locus 'figure'.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Bullet 4 now reads 'so two software packages may report opposite signs (the scores flip with the loadings)' in place of 'software may flip it between runs'. Source: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.2.4 'Uniqueness of the Principal Components' (PDF p.515: 'two different software packages will yield the same principal component loading vectors, although the signs of those loading vectors may differ'; 'the score vectors are unique up to a sign flip'), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf.

## [F-003] Generated figure still draws the old non-orthogonal loading pair
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: minor
- status: open
- locus: figure (Media/Figures/Loading_Vector.svg; scripts/figures_exam_mas_ii.py loading_vector())
- claim: The figure plots phi_1 = (0.52, 0.51, 0.49, 0.48) and phi_2 = (0.61, 0.55, -0.42, -0.39) (builder lines ~1184-1185), whose dot product is 0.2047.
- evidence: The example was corrected this run (F-001 resolution) to phi_1 = (0.52, 0.50, 0.50, 0.48), phi_2 = (0.42, 0.55, -0.43, -0.58), the first two eigenvectors of R = [[1,.65,.45,.45],[.65,1,.45,.35],[.45,.45,1,.60],[.45,.35,.60,1]], dot product 0. Loading vectors must be orthogonal: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.2.1 (PDF p.507), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. The figure now also disagrees with the page's example.
- proposed_action: Change loading_vector() in scripts/figures_exam_mas_ii.py to the new pair and regenerate the SVG (docs/concept-figures.md). Generated figure - not edited by the resolve agent.
- applied: false
- fingerprint: d75d8dc59bc6

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: whole log read; F-001/F-002 closed; every edit re-read; example recomputed in numpy (eigenvectors of the 4x4 correlation matrix in the F-001 note; rounded phi_1.phi_2 = 0, norms 1.0008/1.0002, z1 = 2.00); sign bullet against PDF p.515; z_im and unit norm against eqs. 12.2-12.4; link and figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §12.2.1 eqs. 12.1-12.4, unit-norm constraint, orthogonality and footnote 2 (PDF pp.505-507), §12.2.4 uniqueness up to sign (PDF p.515), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-II Content Outline 2026, Domain C tasks 5-8 (PDF p.3) and James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Example now uses an orthogonal pair. One minor finding open (F-003): the generated figure still draws the old pair - a figure fix outside this file. Medium: the example is the vault's own and the figure disagrees with it until regenerated.
