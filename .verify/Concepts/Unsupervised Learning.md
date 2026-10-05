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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Deleted the unsourced use 'reducing correlated rating variables to a handful of components'. The bullet now reads 'Common actuarial uses: grouping territories or classes, and exploratory data analysis before a GLM', both sourced: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch 11 'Clustering' (PDF p.203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf (units grouped into territories 'to minimize within group heterogeneity and maximize between group heterogeneity'); James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.1 (PDF p.504: 'Unsupervised learning is often performed as part of an exploratory data analysis'), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. Principal components as inputs to a supervised fit remain in the last bullet, which ISLR supports (§12.2 PDF p.505, 'derived variables for use in supervised learning problems'; §6.3.1 PCR).

## [F-002] 'The two syllabus methods' does not say which exam
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: nit
- status: open
- locus: bullet 1 ('The two syllabus methods')
- claim: The two syllabus methods: Principal Components Analysis and Clustering.
- evidence: PCA and clustering as unsupervised methods are MAS-II: CAS Exam MAS-II Content Outline 2026, Domain C tasks 5-8 (PDF p.3) and James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf (tasks 5-8; James Ch 12). On MAS-I, PCA appears only as principal components regression (James §6.3.1): CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf (James Ch 6). Without the exam named, 'syllabus' reads as MAS-I too, the exam whose questions the sibling pages now label.
- proposed_action: Say 'The two MAS-II syllabus methods'.
- applied: true
- fingerprint: c234d42f740f

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Bullet 1 now reads 'The two MAS-II syllabus methods: Principal Components Analysis ... and Clustering ...'. Source: CAS Exam MAS-II Content Outline 2026, Domain C tasks 5-8 (PDF p.3) and James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf (tasks 5-8: PCA loading vectors and variance explained; clustering procedures, e.g. K-means, hierarchical).

## [F-003] A sourced actuarial use was deleted as unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: nit
- status: open
- locus: bullet 'Common actuarial uses' (as left by F-001/R)
- claim: Common actuarial uses: grouping territories or classes, and exploratory data analysis before a GLM - the principal-components use was deleted by F-001/R as appearing in no source read.
- evidence: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch 10 'Data Mining Techniques' - Factor Analysis and Cluster Analysis (printed pp.183-184, PDF pp.195-196), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf: 'Factor analysis, of which principle components analysis may be the most commonly used, is a technique to reduce the number of parameter estimates in a classification analysis (such as a GLM)' and 'This technique might be used in ratemaking to compress a long list of highly correlated variables into a score variable (or a small number of uncorrelated score variables) that represents linear combinations of the original variables' (vehicle symbols as the example). The same pages also back the two uses that stayed: cluster analysis 'combine[s] small groups of similar risks into larger homogeneous categories', is 'an exploratory data analysis tool', is 'most commonly used in rating for geography', and 'allows easier incorporation into GLMs'. So the deleted use was supportable; F-001/R looked at Ch 11 (PDF p.203) but not Ch 10's data-mining section. Found re-reading the run-3707 edit.
- source_rank: 3
- proposed_action: Restore the use, worded as W&M put it, citing Ch 10.
- applied: true
- fingerprint: c5c3b9cfd57e

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: Bullet now reads 'Common actuarial uses: compressing a long list of highly correlated rating variables into a few uncorrelated score variables (principal components), grouping territories or classes, and exploratory data analysis before a [[Generalized Linear Model]]'. Source: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch 10 'Data Mining Techniques' - Factor Analysis and Cluster Analysis (printed pp.183-184, PDF pp.195-196), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf (factor analysis / PCA compressing correlated variables into uncorrelated score variables; cluster analysis grouping risks and geography, as EDA feeding GLMs). F-001's resolution stands for what it was: the clause was unsourced when read; it is now restored with this citation.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: re-pass after run-3707 resolutions of F-001/F-002: whole log read; F-002 edit ('MAS-II syllabus methods') re-read against MAS-II tasks 5-8 and the MAS-I reading list (PCA only as PCR there); F-001 deletion re-read - the deleted principal-components use turns out to be in W&M Ch 10 (PDF pp.195-196) and is restored with that citation (F-003 nit, applied and resolved); unchanged claims re-read (no test error / no CV arbiter, subjective scree/dendrogram choice, scaling for PCA and clustering, PCs as inputs to a supervised fit, example's 'variance direction is not a predictive one' vs ISLR p.268); 7 wiki links and the figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §12.1 subjective, EDA, no cross-validation (PDF pp.503-504), §12.2 derived variables for supervised learning (PDF p.505), §12.2.4 scaling (PDF pp.513-514) and number of components - scree, subjective, CV only for PCR (PDF pp.515-516), §12.4.2 scaling before dissimilarities (PDF p.536), practical issues - validating clusters, not robust, cluster subsets (PDF pp.537-538), §6.3.2 PCR drawback (PDF p.268), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06), Domain C tasks 5-8 (PDF p.3) and James reading list Ch 12 (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch 10 'Data Mining Techniques' - Factor Analysis, Cluster Analysis (PDF pp.195-196) and Ch 11 'Clustering' (PDF p.203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: W&M is rank 2 under P2 (syllabus-listed CAS text), so the actuarial-uses bullet is rank-2 supported; F-003's source_rank field says 3, which understates it.
