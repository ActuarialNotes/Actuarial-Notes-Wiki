---
target: Exam MAS-II (CAS).md
created: 2026-10-09
---

## [F-001] Learning objectives list 36 tasks; the outline lists 21, and the page's numbering no longer matches the Source Material codes
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: major
- status: open
- locus: ## Learning Objectives, numbered tasks in Domains A-D
- claim: Domain A has 7 tasks, B 7, C 15 and D 7 (36 in all), presented as the exam's tasks and cited by the Source Material codes A1-A2, B1-B4, C1-C9, C10-C11, D1-D4.
- evidence: CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13; https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b), pp.2-3, lists A1-A2, B1-B4, C1-C11 and D1-D4 (21 tasks). Diff with links stripped: A1 and A2 correspond to page A1-A2 (A1 reads link labels 'Limited Fluctuation Credibility', 'Bühlmann Credibility', etc. where the outline has '(limited fluctuation), Bühlmann, ...'); page A3-A7 (full-credibility standard, EPV/VHM, conjugate priors, empirical Bayes, complement of credibility) are not on the outline. B: page B1, B2, B5 add clauses to outline B1, B2, B3 ('and distinguish fixed effects from random effects'; 'including random intercept ...'; 'using the Likelihood Ratio Test, AIC and BIC'); page B6 says 'the model structure' for outline B4's 'the linear mixed model structure'; page B3, B4, B7 (variance components/ICC, REML vs ML, BLUP) are not on the outline. C: page C1, C2, C7, C13 (supervised/unsupervised and bias-variance, CV and bootstrap, out-of-bag error, regularization) are not on the outline; page C4, C6, C9, C11, C12, C14, C15 add clauses to outline C2, C4, C6, C8, C9, C10, C11 ('by cost-complexity pruning'; '- bagging, random forests and boosting -'; 'including the scree plot'; 'including the dendrogram and the choice of linkage'; 'including the role of the activation function ...'; 'the confusion matrix'; 'quantile plot'); page C5 has 'a set of decision trees' where outline C3 prints 'a set decision of trees' (a typo in the source). D: page D1 and D7 add clauses to outline D1 and D4; page D2, D3, D5 (stationarity/differencing, ACF/PACF identification, decomposition and exponential smoothing) are not on the outline. Because the page's tasks are renumbered, the outline's codes now point at different tasks: outline C10-C11 (predictive accuracy, Goldburd and Salis) are page C14-C15, while the Source Material's 'C10-C11' line on the page lands on clustering outputs and neural networks; 'C1-C9' for James covers page C1-C9, which includes CV/bootstrap and omits clustering and neural networks.
- source_rank: 1
- proposed_action: Restore Domains A-D to the outline's 21 tasks in its words and numbering (A1-A2, B1-B4, C1-C11, D1-D4), keeping links only on the outline's own words. Move the vault-added material that is within the assigned readings into the ### topic lists rather than the task list. Not auto-fixed: removing the 15 added tasks drops concept links that appear nowhere else in their callout (e.g. Posterior Distribution, Exact Credibility, Complement of Credibility, Hidden Layer, Extended Linear Model, Correlogram, Prediction Interval, Backward Shift Operator, AIC, BIC), which changes the exam's syllabus concept set and is a scope decision.
- applied: false
- fingerprint: f4681e495420

## [F-002] Exponential smoothing, cross-validation, the bootstrap and regularization are on the page but outside the assigned readings
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: major
- status: open
- locus: Domain C tasks C1, C2, C13 and ### Learning framework; Domain D task D5 and ### Trend and seasonality
- claim: Domain C tasks and lists include Cross-Validation, Bootstrap and Regularization (C2, C13, '### Learning framework'); Domain D task D5 says 'smooth it with exponential smoothing' and '### Trend and seasonality' lists Exponential Smoothing.
- evidence: CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13; https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b), p.4, assigns James et al. 2nd ed. 'Chapters 1 (Background reading only), 2.2, 4.4.2 (Confusion Matrix Only), 8, 10, 12' and Cowpertwait 'Chapters 1-5 (excluding Sections 3.3 and 3.4), 6, 7 (Sections 7.1, 7.2 and 7.3)'. James et al. 2nd ed. CAS-hosted PDF bookmark outline (https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f): Ch 5 'Resampling Methods' (5.1 Cross-Validation, 5.2 The Bootstrap) and Ch 6 'Linear Model Selection and Regularization' are not assigned. The outline mentions James 5.1 and 5.2 only on p.5 as recommended MAS-I review for candidates with a MAS-I waiver. Cowpertwait contents (library TOC scan, https://obalkyknih.cz/file/toc/233741/pdf, sha256:64c8d1acd2d515e84acce255da1766a7b544603ad1096f40b2ed7949bc4d791c, PDF p.3): '3.4 Exponential smoothing and the Holt-Winters method' (3.4.1 Exponential smoothing, 3.4.2 Holt-Winters method), which the outline excludes. Section 1.5.4 'Smoothing' (inside 1.5 Decomposition of series, PDF p.2) is assigned; exponential smoothing is not. Every link in a learning-objective callout counts as a MAS-II syllabus concept, so readiness and study plans include these.
- source_rank: 1
- proposed_action: Remove Exponential Smoothing from Domain D, and Cross-Validation, Bootstrap and Regularization from Domain C, or mark them plainly as MAS-I review. Scope decision; not auto-fixed.
- applied: false
- fingerprint: 1e54f8e3c288

## [F-003] Domain C readings line omits Salis
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: Domain C, **Readings:** line
- claim: '**Readings:** James et al. · GLM'.
- evidence: CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13; https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b), p.3, Domain C 'Readings: - James et al. - GLM - Salis'. P.4 cites 'Salis, A., "Measures of Predictive Accuracy," CAS Study Note, November 2025', abbreviation Salis, tasks 'C3 & C10', source OP, linked to https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf (read: 'Updated: November 6, 2025', 'Measures of Predictive Accuracy, Study Note for MAS-II', Anthony T. Salis, PDF p.1, sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010).
- source_rank: 1
- proposed_action: Add 'Salis' to the Domain C readings line.
- applied: true
- fingerprint: 9aec0da36aa5

## [F-004] Source Material omits the Salis study note
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: major
- status: open
- locus: ## Source Material
- claim: The callout lists 5 sources (Cowpertwait, Goldburd, James, Tse, West); the Salis study note is absent.
- evidence: CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13; https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b), p.4, the Complete Text References table has 6 citations, the sixth 'Salis, A., "Measures of Predictive Accuracy," CAS Study Note, November 2025', for C3 & C10. The study note (https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf, sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010, PDF p.1) covers Gini index for node purity, entropy, lift, Gini index for lift and confusion-matrix ratios. No Resources/Books page exists for it. quiz/src/data/syllabusVintages.ts already notes the shelf adds Salis because the page lacks it. A candidate reading the callout as the reading list misses one assigned reading.
- source_rank: 1
- proposed_action: Write a Resources/Books page for Salis (2025) from the study note, then add it to the Source Material callout ('C3, C10') with the title count {6 Sources}, and drop the shelf's workaround in syllabusVintages.ts. Needs a new page; not auto-fixed.
- applied: false
- fingerprint: 1fce2431293c

## [F-005] Source Material lines gave task codes only; the outline's chapter scopes were absent
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: ## Source Material, indented bullet under each reading
- claim: Each reading carried only its codes: Cowpertwait 'D1-D4', Goldburd 'C10-C11', James 'C1-C9', Tse 'A1-A2', West 'B1-B4'.
- evidence: CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13; https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b), p.4: Cowpertwait 'Chapters 1-5 (excluding Sections 3.3 and 3.4), 6, 7 (Sections 7.1, 7.2 and 7.3)'; GLM 'CAS Monograph #5, 2nd edition ... Chapter 7'; James et al. '2nd ed. ... Chapters 1 (Background reading only), 2.2, 4.4.2 (Confusion Matrix Only), 8, 10, 12. Exam questions will not be sourced directly from Chapter 1.'; Tse 'Chapters 6.1-6.3, 7.1-7.4, 8.1-8.2, and 9.1-9.2'; West '3rd Edition ... All chapters, excluding coding examples; Additional Notes on Shrinkage Means (http://www-personal.umich.edu/~bwest/shrinkage.doc)'. Without these a candidate cannot tell that only Chapter 7 of the GLM monograph, or only four chapters' sections of Tse, are examinable.
- source_rank: 1
- proposed_action: Add each reading's scope after its codes, in the outline's words.
- applied: true
- fingerprint: c399a8b1807c

## [F-006] Three domain preambles depart from the outline's wording
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: nit
- status: open
- locus: Domain A, C and D preambles
- claim: A: 'credibility-weighted estimates'. C: '... strengths and weaknesses to select the most appropriate procedure'. D: 'the ARIMA (Auto Regressive Integrated Moving Average) time series model'.
- evidence: CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13; https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b), p.2 A: 'calculate credibility weighted estimates.' p.3 C: 'recognize their inherent strengths and weaknesses to be able to select the most appropriate procedure for the learning task at hand.' p.3 D: 'the basic applications of the Auto Regressive Integrated Moving Average (ARIMA) time series model.' The B preamble matches word for word, links stripped.
- source_rank: 1
- proposed_action: Restore the outline's words; links kept on the same words.
- applied: true
- fingerprint: 692ef167aafd

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Domain C readings line now reads 'James et al. · GLM · Salis', as on outline p.3.

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- resolves: F-005
- status: resolved
- note: Each Source Material line now carries the outline p.4 scope after its codes, word for word. syllabus_lint: 0 errors, 0 warnings.

## [F-006/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- resolves: F-006
- status: resolved
- note: A, C and D preambles now read as on outline pp.2-3, links stripped.

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: in_review
- checks_run: Lead: 4-hour exam (outline p.1: 4 hours, 4.5-hour appointment), four domains, ACAS. Prerequisites callout against outline p.5 Assumed Knowledge (calculus, probability, linear algebra at the pre-regression level, mastery of MAS-I): consistent. Domain titles and weights A 15-25, B 10-20, C 40-50, D 15-25 match p.2. Preambles: B word for word; A, C, D fixed (F-006). Tasks diffed phrase by phrase, links stripped, against pp.2-3: 36 on the page vs 21 on the outline (F-001, open). Topic scope spot-checked against assigned chapters: exponential smoothing, CV, bootstrap, regularization outside (F-002, open); predictive-accuracy items match Goldburd 7.2-7.3 and Salis. Readings lines: A Tse, B West, D Cowpertwait match; C lacked Salis (F-003, fixed). Source Material: 5 of 6 citations; Salis missing (F-004, open); codes A1-A2, B1-B4, C1-C9, C10-C11, D1-D4 match p.4; scopes added (F-005). Link names (title, author, year) agree with p.4 citations. Sitting: CAS page links only the 2026 outline; next window Oct 28 - Nov 5, 2026; app examSittings MAS-II row and examPdfLinks 'mas-ii' agree. syllabus_lint: 0 errors, 0 warnings. 262 wiki-links, all resolve exact (vault_links).
- sources_checked: CAS, Exam Content Outline — Modern Actuarial Statistics II (MAS-II), 2026 (MASII_CO_S_2026 v06 2026_1_13, 6 pp.), PDF pp.1-6 incl. link annotations, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; CAS, Exam MAS-II — Modern Actuarial Statistics-II exam page, read 2026-10-09: windows July 29 - August 4, 2026 and October 28 - November 5, 2026 (register by Sep. 29, 2026); '2026 Content Outline' the only outline linked, sha256:0b8e99645a8185c88b514201e1b60ed881d27b51442f616af4baab416d4f2f48 — https://www.casact.org/exam/exam-mas-ii-modern-actuarial-statistics-ii; Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II, updated November 6, 2025, PDF p.1, sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf; James et al., An Introduction to Statistical Learning 2nd ed., CAS-hosted PDF, bookmark outline, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, GLMs for Insurance Rating, CAS Monograph 5, 2nd ed., bookmark outline Ch 7, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Cowpertwait & Metcalfe, Introductory Time Series with R (Springer 2009), contents, library TOC scan PDF pp.1-3, sha256:64c8d1acd2d515e84acce255da1766a7b544603ad1096f40b2ed7949bc4d791c — https://obalkyknih.cz/file/toc/233741/pdf
- note: in_review: delivery, weights, preambles, readings and Source Material codes and scopes now match the outline, but the task list (F-001), four out-of-scope topics (F-002) and the missing Salis source page (F-004) remain open as major findings; each needs a scope or authoring decision. Page edits: three preambles, Domain C readings line, five Source Material scope lines.
