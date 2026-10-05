---
target: Concepts/Unsupervised Learning.md
created: 2026-10-05
---

## [F-001] One listed actuarial use is unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 'Common actuarial uses'
- claim: Common actuarial uses: reducing correlated rating variables to a handful of components, grouping territories or classes, and exploratory data analysis before a GLM.
- evidence: EDA: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.1 (PDF p.504), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf: 'Unsupervised learning is often performed as part of an exploratory data analysis'. Grouping territories: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016) Ch 11 'Clustering' (PDF p.203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf. 'Reducing correlated rating variables to a handful of components' appears in no source read this session (not ISLR; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 rev.), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, has no principal-components passage).
- source_rank: 3
- proposed_action: Cite a source for PCA on rating variables, or drop that use. Not applied.
- applied: false
- fingerprint: 6458bb09bece

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: page read in full, no prior log; exam pages linking it: MAS-II (task 1) - also 1 MAS-I and 3 MAS-II questions; no-response definition, no CV / subjective assessment ('no universally accepted mechanism for performing cross-validation', PDF p.504; CV only when PCs feed a supervised fit, PDF p.516), PCA and clustering as the syllabus methods (MAS-II tasks 5-8), scale sensitivity, PCs as preprocessing (PCR) against ISLR; example interpretation consistent with §12.2; links (7) and figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §12.1 (PDF pp.503-504), §12.2.4 scaling and scree plot (PDF pp.513-516, incl. CV available only for PCR), §12.2.5, §12.4 and §12.4.2 scaling (PDF pp.522-535), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-II Content Outline 2026, Domain C tasks 5-8 (PDF p.3), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch 11 'Clustering' (PDF p.203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: Correct in the MAS-II sense. One minor finding open (an unsourced actuarial use).
