---
target: Concepts/Clustering.md
created: 2026-10-05
---

## [F-001] Linkage list swaps ISLR's centroid linkage for Ward's
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: Linkage methods list
- claim: Linkage methods: Complete (max), Single (min, can produce chaining), Average, and Ward's (minimizes total within-cluster variance, analogous to K-means).
- evidence: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) Table 12.3 (PDF p.532), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf: 'the four most commonly-used types of linkage' are Complete, Single, Average and Centroid; centroid linkage 'can result in undesirable inversions'. 'Ward' occurs 0 times in ISLR. Complete/single/average match Table 12.3, and 'chaining' matches ISLR's 'extended, trailing clusters'. Ward's method is real - R stats::hclust documentation ('ward.D', 'ward.D2'; 'Ward's minimum variance method aims at finding compact, spherical clusters'), sha256:328952439ed3b589585f167660963e8541969526986dce52e95d1b661585cec4 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/hclust.html, rank 3 - but it is not on the MAS-II reading (CAS Exam MAS-II Content Outline 2026 PDF p.4: James Ch 12), while centroid linkage and inversions are, and the page omits them.
- source_rank: 2
- proposed_action: Add centroid linkage with its inversion caveat (ISLR Table 12.3); mark Ward's as beyond ISLR or drop it. Authoring - not applied.
- applied: false
- fingerprint: cc7d3b88e8c2

## [F-002] Standardization stated unconditionally
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet after the linkage list ('predictors should be standardized')
- claim: Clustering requires a dissimilarity measure (e.g., Euclidean distance, correlation-based distance); predictors should be standardized.
- evidence: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.4.2, 'Choice of Dissimilarity Measure' (PDF pp.534-535), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf: scaling to standard deviation one gives each variable equal importance and is advisable 'if they are measured on different scales', but 'whether or not it is a good decision to scale the variables before computing the dissimilarity measure depends on the application at hand' (socks vs computers example). The condition is missing; the dissimilarity-measure half is correct.
- source_rank: 2
- proposed_action: Qualify: standardize when variables are on different scales or should carry equal weight - an application-dependent choice (ISLR §12.4.2). Not applied.
- applied: false
- fingerprint: f4a1d23e4c4f

## [F-003] Fraud detection as a clustering use is unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 'Used in actuarial science for ...'
- claim: Used in actuarial science for policyholder segmentation, territory grouping, and fraud detection.
- evidence: Territory grouping: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016) Ch 11 'Clustering' (PDF p.203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf - units are grouped into territories 'to minimize within group heterogeneity and maximize between group heterogeneity'. Segmentation: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.4 (PDF p.522), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf - 'market segmentation by identifying subgroups of people'. Fraud detection is in no source read this session (ISLR Ch 12, Werner & Modlin Ch 11, Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 rev.), the MAS-II outline).
- source_rank: 3
- proposed_action: Cite a source for fraud detection or drop it. Not applied.
- applied: false
- fingerprint: c2d50c61fb14

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: page read in full, no prior log; exam pages linking it: MAS-II (tasks 10-11), DISC-DA ('Segmenting Data with Cluster Analysis'); definition, K-means (K prespecified, within-cluster variation), hierarchical algorithm and dendrogram cut against ISLR §12.4; linkage definitions against Table 12.3; example (choose K from fusion-height gap) against ISLR p.530 guidance; links (3) and figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §12.4 intro (PDF p.522), §12.4.1 K-means, §12.4.2 hierarchical clustering incl. dendrogram cut 'by eye' (PDF p.530), Table 12.3 linkage (PDF p.532), dissimilarity and scaling (PDF pp.534-535), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; R Documentation stats::hclust (R-devel manual), Details, sha256:328952439ed3b589585f167660963e8541969526986dce52e95d1b661585cec4 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/hclust.html; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch 11 'Clustering' (PDF p.203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; CAS Exam MAS-II Content Outline 2026, Domain C tasks 7-8 (PDF p.3) and James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Correct in the MAS-II (ISLR Ch 12) sense. Not checked: DISC-DA sense (The Institutes' course text is sold, not published). Exam 8 questions (cas8-2015-q6, 2016-q2, 2019-q4) link this page in the territorial-ratemaking sense (Werner & Modlin Ch 11) - consistent with the 'territory grouping' bullet. Three minor findings open.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Linkage list now follows ISLR Table 12.3: Ward's bullet replaced by Centroid ('distance between the two clusters' centroids (mean vectors); can produce inversions, where two clusters fuse at a height below either of them in the dendrogram'); the table's hierarchical row now reads Complete/single/average/centroid. Source: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.4.2 Table 12.3 and the inversion definition (PDF pp.531-532: 'The four most common types of linkage—complete, average, single, and centroid'; 'an inversion can occur, whereby two clusters are fused at a height below either of the individual clusters in the dendrogram'), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Standardization no longer unconditional: 'whether to standardize the variables (to standard deviation one) depends on the application: it gives every variable equal weight, and is advisable when they are measured on different scales'. Source: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.4.2 'Choice of Dissimilarity Measure' (PDF p.535: scaling to sd one gives each variable 'equal importance'; 'we might also want to scale ... if they are measured on different scales'; 'whether or not it is a good decision to scale the variables ... depends on the application at hand'), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: Deleted 'fraud detection' (no source found; ISLR's own fraud example, §4.1 PDF p.140, is a classification problem, not clustering). Kept the two sourced uses: segmentation (James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.4 PDF p.522, 'market segmentation ... amounts to clustering the people in the data set', sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf) and territory grouping (Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch 11 'Clustering' (PDF p.203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf: units grouped into territories 'to minimize within group heterogeneity and maximize between group heterogeneity').

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: whole log read; F-001..F-003 closed; every edit re-read; linkage list (complete/single/average/centroid, inversions) diffed against Table 12.3; scaling condition against PDF p.535; uses against ISLR p.522 and W&M Ch 11; hierarchical algorithm against Algorithm 12.3; example (cut where the fusion-height gap is large) against PDF pp.530-531; links (3) and figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §12.4 intro market segmentation (PDF p.522), hierarchical algorithm and dendrogram cut (PDF pp.530-532), Table 12.3 linkage and inversions (PDF pp.531-532), §12.4.2 dissimilarity and scaling (PDF pp.534-535), §4.1 fraud as classification (PDF p.140), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch 11 'Clustering' (PDF p.203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; CAS Exam MAS-II Content Outline 2026, Domain C tasks 5-8 (PDF p.3) and James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Correct in the MAS-II sense (ISLR Ch 12). Ward's replaced by centroid linkage; standardization made application-dependent; unsourced fraud-detection use removed. Medium: the worked example is the vault's own.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: delta check: diffed 4d8505eff^ (run 3707 bytes) to HEAD; two added bullets and the tip/trap callouts checked against ISLR §12.4.3 and p.532; prior-pass sources re-fetched, hashes unchanged
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §12.4.2-12.4.3 PDF pp.532, 536-538 (delta: small decisions, validating clusters, balanced linkage, scaling); prior-pass sections §12.4, Table 12.3, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; R documentation stats::hclust, Details, sha256:328952439ed3b589585f167660963e8541969526986dce52e95d1b661585cec4 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/hclust.html; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.11 'Clustering' PDF p.203, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; CAS Exam MAS-II Content Outline 2026, Domain C tasks 7-8, PDF p.3, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Medium as before (the worked example is the vault's own).
