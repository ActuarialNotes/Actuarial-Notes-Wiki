---
target: Exam MAS-I (CAS).md
created: 2026-10-04
---

## [F-001] Domain C tasks numbered 10-18; the outline numbers them C1-C9
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: Learning Objectives, Domain C task numbering
- claim: Domain C's nine tasks were numbered 10-18, running on from B9. The page's own Source Material cites them as C1-C9 (Dobson, Hogg, James, Larsen).
- evidence: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026-06-29; https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed), PDF p.5, numbers the Domain C tasks 1-9 ('1. Select the appropriate model for an extended linear model' through '9. Interpret exploratory data analysis plots'). Numbering restarts in each domain: A1-A6 on p.3, B1-B9 on p.4. The Complete Text References table on p.6 cites 'C1-C9' for Dobson & Barnett, James et al. and Larsen, and 'B1-B8, C1-C9' for Hogg. Numbered 10-18, the page's tasks matched none of those codes. quiz/src/lib/sourceMaterial.ts objectiveFilterOptions therefore offered no Learning objective filter on the MAS-I shelf.
- source_rank: 1
- proposed_action: Renumber the Domain C tasks 1-9 as on p.5.
- applied: true
- fingerprint: 2d8884fcf8f3

## [F-002] Six task statements depart from the outline's wording
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: Learning Objectives, tasks B3, B6, B8, C1, C2, C3
- claim: B3 'Test statistical hypotheses (Hypothesis Testing), including ...'. B6 'Model insurance claims in aggregate using Aggregate Loss Models'. B8 '... applying criteria such as consistency ...', without 'to estimates'. C1 'Select the appropriate model for an extended linear model, from Linear Regression through the Generalized Linear Model and Linear Mixed Model'. C2 '... given the behavior of the data set (e.g., ...', without 'to be modeled'. C3 'Evaluate models developed using an extended linear model approach, including Cross-Validation and the Bias-Variance Tradeoff'.
- evidence: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026-06-29; https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed). p.4 B3: 'Test statistical hypotheses, including Type I and Type II errors'. B6: 'Model insurance claims in aggregate'. B8: '... using maximum likelihood estimation (MLE) applying criteria to estimates such as consistency, ...'. p.5 C1: 'Select the appropriate model for an extended linear model'. C2: '... given the behavior of the data set to be modeled (e.g., appropriate link function and distribution for the dependent variable for GLM)'. C3: 'Evaluate models developed using an extended linear model approach'. The older outline, the outline still served at the 2023-06 URL the vault cites (MASI_CO_2025_S v04 2024-12-19; https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf, sha256:0bd233bd23e60430706b52ab37eb248a9b14d33f9fe3d9bc0712a9e763e2e610), has the same wording on pp.4-5. So these are vault additions, not an earlier version. Every concept the removed clauses linked is still linked elsewhere in the same domain callout, so the syllabus concept set does not change. Those concepts are Hypothesis Testing, Aggregate Loss Model, Linear Regression, Generalized Linear Model, Linear Mixed Model, Cross-Validation and Bias-Variance Tradeoff.
- source_rank: 1
- proposed_action: Restore the outline's words in each task. Keep links only on the outline's own words: 'in [[Aggregate Loss Model|aggregate]]', 'to [[Parameter Estimation|estimates]]', '[[Tidy Data|data set to be modeled]]'.
- applied: true
- fingerprint: 832bcce8ca1f

## [F-003] Linear Mixed Model listed as a MAS-I model family; it is MAS-II's
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: Domain C, ### Model Families, 'Linear Mixed Model' bullet
- claim: Domain C lists '[[Linear Mixed Model]] for [[Clustered Data|grouped or repeated data]]' among the MAS-I model families. Before this pass, task C1 named it too (removed under F-002).
- evidence: No MAS-I reading assigns mixed models. CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026-06-29; https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed), p.6, limits Dobson & Barnett to 'Chapters 1-9, excluding 6.3.3, 6.7, 6.8, & 7.9'. In Dobson & Barnett 4th ed. publisher eBook preview, Contents PDF pp.8-12 (https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a), repeated-measures and multilevel models are Chapter 11, 'Clustered and Longitudinal Data' (PDF p.12): 11.3 'Repeated measures models for Normal data', 11.5 'Multilevel models'. That is outside Ch 1-9. A full-text search of ISLR 2nd ed., CAS-hosted copy, PDF bookmark outline (https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f) (Ch 1-7 assigned) and of Larsen, Generalized Linear Models study note (https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd) finds 0 occurrences of 'mixed model' or 'random effect'. Hogg's Domain C sections are 4.4, 6.3, 6.5, 7.5 and 9.1-9.6. Hogg's Ch 9 is 'Inferences About Normal Linear Models': one-way ANOVA, noncentral chi-square and F, multiple comparisons, two-way ANOVA, a regression problem (Hogg, McKean & Craig 8th ed. (Global Edition) publisher eBook preview, Contents PDF pp.6-9 (https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf, sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99), PDF p.9). Linear mixed models are MAS-II's Domain B, 'Linear Mixed Models 10-20%', read from West, Welsh & Galecki (CAS Exam MAS-II Content Outline 2026, PDF pp.2 and 4 (https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b)). Every link in a learning-objective callout becomes a syllabus concept, so MAS-I readiness and study plans count a MAS-II topic.
- source_rank: 1
- proposed_action: Remove the Linear Mixed Model bullet from Domain C, or mark it plainly as MAS-II material. This is a scope decision, so it was not auto-fixed.
- applied: false
- fingerprint: a29d0a870351

## [F-004] Domain A topic lists omit Ross's reliability (Ch 9) and simulation (Ch 11) sections
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: Domain A topic lists (### Poisson Processes, ### Markov Chains, ### Survival Models and Life Contingencies)
- claim: Domain A's lists cover Poisson processes, Markov chains and survival/life contingencies. For Markov chains they give the transition matrix, n-step transitions and the stationary distribution. Reliability appears only inside a Combinatorics bullet ('counting the path and cut sets of a k-out-of-n system'). Simulation does not appear in Domain A at all.
- evidence: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026-06-29; https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed), p.6, assigns Ross to A1-A6: 'Sections 4.1-4.8, 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2, 9.1-9.6, 11.1, 11.2.1, and 11.2.2'. Ross's Chapter 9 is 'Reliability Theory' and Chapter 11 'Simulation' (Elsevier product page for Ross, Introduction to Probability Models 13th ed., chapter-level table of contents (https://shop.elsevier.com/books/introduction-to-probability-models/ross/978-0-443-18761-2, fetched 2026-10-04, sha256:4feee1adf6f271c13df56c766024e4cbd75c1c730698a0e109a95f1260839a23); the 11th-13th editions all number these chapters the same way). Domain A has no reliability-theory topic of its own, such as system reliability or system lifetime. It has no simulation topic either: the only inverse-transform mention is filed under Domain B (see the misfiled-topics finding in this run). §§4.1-4.8 run through the whole Markov-chain chapter up to §4.8, and the page names three items from it. The section titles could not be checked: Ross is a purchased text, and only its chapter-level contents were readable this session. Daniel (whole note, A1-A5) and Struppeck (A5-A6) are covered by the Poisson-process and life-contingency lists.
- source_rank: 1
- proposed_action: Author Domain A topics for Ross Ch 9 reliability (§§9.1-9.6) and Ch 11 simulation (§§11.1, 11.2.1-11.2.2), and check the Markov-chain list against §§4.1-4.8. Existing pages that could be linked: System Reliability, Inversion Method. This is authoring, so it was not auto-fixed.
- applied: false
- fingerprint: 73a231f7c3bc

## [F-005] Domain B topic lists omit assigned Hogg and Tse sections
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: Domain B topic lists (### Summarizing a Sample, ### Estimation, ### Testing, ### Loss Models)
- claim: Domain B's lists cover sample summaries, MLE and method of moments, sufficiency, Fisher information/Cramer-Rao, the estimator criteria, censoring and truncation, hypothesis testing (Type I/II, power, p-value, confidence interval, likelihood ratio test) and frequency/severity/aggregate/coverage modifications. That is the whole of what they cover.
- evidence: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026-06-29; https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed), p.6, assigns Hogg Domain B 'Sections 1.7, 2.7, 2.8, 3.7, 4.1, 4.4, 4.5, 4.6, 4.7, 5.1, 6.1-6.5, 7.1-7.6, 8.1, 8.2, 8.3' and Tse 'Sections 1.1, 2.2, 2.3, 2.4, 2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2'. Hogg, McKean & Craig 8th ed. (Global Edition) publisher eBook preview, Contents PDF pp.6-9 (https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf, sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99) (numbering read from the Global Edition) titles seven of these sections. 1.7.3 'Mixtures of Discrete and Continuous Type Distributions' and 3.7 'Mixture Distributions'. 2.7 'Transformations for Several Random Variables' and 2.8 'Linear Combinations of Random Variables'. 4.7 'Chi-Square Tests'. 5.1 'Convergence in Probability'. 7.3 'Properties of a Sufficient Statistic' and 7.4 'Completeness and Uniqueness'. 7.6 'Functions of a Parameter'. 8.1 'Most Powerful Tests' and 8.2 'Uniformly Most Powerful Tests'. None of these has a topic or link in Domain B; transformations is filed under A. For Tse, Tse, Nonlife Actuarial Models, printed Contents p.vii (Cambridge Core page image https://static.cambridge.org/content/id/urn%3Acambridge.org%3Aid%3Abook%3A9780511812156/resource/name/firstPage-9780511812156toc_pvii-xii_CBO.jpg, sha256:310e411c2bcc82d3ba9d145325e7a649444a68994c6d03c990c75475c2e59fc0) puts §§2.2-2.5 in Ch 2 'Claim-severity distribution'; §2.2 is 'Some continuous distributions for claim severity'. Cambridge Core's chapter summaries name what the assigned chapters cover. Ch 2: exponential, gamma, Weibull and Pareto; mixture distributions; tail weight, limiting ratio and CTE; coverage modifications (https://www.cambridge.org/core/books/nonlife-actuarial-models/claimseverity-distribution/8AE37E6CDD30868D3EBB88C0A243E36F, sha256:845cd8ea5de684acc55fa07721da5d877cf04b8abb61216417f23f70cc496b0b). Ch 11: the empirical distribution and kernel estimates (sha256:2cfb45c2df0f9e21bace0f908bf1dd1d0141ebaed4d4cb345004b07e20a43ba4). Ch 12: moment and percentile matching, and MLE (sha256:0c59b0a78861adcee880e0cc8098c5e5b22fc3f14e9dad9a22757eb0fbfd47ad). Ch 13: Kolmogorov-Smirnov, Anderson-Darling, chi-square goodness-of-fit and likelihood ratio tests (sha256:da44723cc0e3571d8d26490f992d7860af1b0d8b8205f6e67dd4e9779d5f0181). None of these is on the page: Weibull/Pareto, tail weight, empirical distribution, percentile matching, KS/AD/chi-square goodness-of-fit. Which section inside Tse Ch 11-13 holds which topic comes from the summaries, because only contents p.vii (up to §2.2.1) was readable.
- source_rank: 1
- proposed_action: Author Domain B topics for the omitted sections: mixtures, transformations and linear combinations, chi-square and goodness-of-fit tests, most powerful/UMP tests (Neyman-Pearson), Rao-Blackwell/completeness, convergence in probability, the severity distributions and tail weight, the empirical distribution and percentile matching. This is authoring, so it was not auto-fixed.
- applied: false
- fingerprint: 0b7a2905e084

## [F-006] Domain C topic lists omit James Ch 5.2-7, Dobson Ch 8-9 and Larsen's quasi-likelihood
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: Domain C topic lists (### Model Families, ### Specifying the Model, ### Evaluating the Model, ### Diagnostic Plots, ### Exploratory Data Analysis)
- claim: From the statistical-learning reading, Domain C's lists give only Variable Selection, Cross-Validation and the Bias-Variance Tradeoff. The rest is linear regression, GLMs, logistic/Poisson regression, Tweedie, the linear mixed model, model specification, deviance/AIC/BIC/R-squared, ANOVA, diagnostic plots and EDA.
- evidence: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026-06-29; https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed), p.6, assigns to C1-C9: James et al. 'Chapters 1, 2 (excluding Section 2.2.3), 3 (Sections 3.1 through 3.3 ...), 4 (Sections 4.1 through 4.4; the Linear Discrimination Analysis portion of Section 4.4 will not be tested), 5, 6, and 7'; Dobson & Barnett 'Chapters 1-9, excluding 6.3.3, 6.7, 6.8, & 7.9'; Hogg Domain C 4.4, 6.3, 6.5, 7.5, 9.1-9.6; and Larsen. ISLR 2nd ed., CAS-hosted copy, PDF bookmark outline (https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f) has these sections: 4.3.5 Multinomial Logistic Regression (PDF p.150), 4.4.3 Quadratic Discriminant Analysis (p.162), 4.4.4 Naive Bayes (p.163); 5.2 The Bootstrap (p.218); 6.2 Shrinkage Methods, with 6.2.1 Ridge Regression, 6.2.2 The Lasso and 6.2.3 Selecting the Tuning Parameter (pp.245-258); 6.3 Dimension Reduction Methods, with 6.3.1 Principal Components Regression and 6.3.2 Partial Least Squares (pp.259-267); 6.4 Considerations in High Dimensions (p.269); and Ch 7 7.1 Polynomial Regression, 7.2 Step Functions, 7.3 Basis Functions, 7.4 Regression Splines, 7.5 Smoothing Splines, 7.6 Local Regression and 7.7 Generalized Additive Models (pp.298-318). Dobson & Barnett 4th ed. publisher eBook preview, Contents PDF pp.8-12 (https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a) lists 6.5 Analysis of covariance, 7.5 Goodness of fit statistics, Ch 8 Nominal and Ordinal Logistic Regression and §§9.3-9.7 contingency tables and log-linear models. Hogg, McKean & Craig 8th ed. (Global Edition) publisher eBook preview, Contents PDF pp.6-9 (https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf, sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99) lists 9.3 Noncentral chi-square and F-Distributions and 9.4 Multiple Comparisons. Larsen, Generalized Linear Models study note (https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd), PDF p.1, has the headings 'Quasi-Likelihood' (overdispersion) and 'Regression Through the Origin'. None of these has a topic or link in Domain C. Nothing from James Ch 7 is listed. Domain C is 45-55% of the exam (p.3).
- source_rank: 1
- proposed_action: Author Domain C topics for the omitted readings: bootstrap; ridge, lasso and tuning; PCR/PLS and high dimensions; polynomial and step functions, regression and smoothing splines, local regression and GAMs; multinomial logistic, QDA and naive Bayes; nominal/ordinal logistic regression; log-linear models and contingency tables; ANCOVA and multiple comparisons; quasi-likelihood. Existing pages that could be linked: Bootstrap, Regularization, High Dimensional Variables. This is authoring, so it was not auto-fixed.
- applied: false
- fingerprint: 8f32f5ee0d87

## [F-007] Transformations filed under Domain A and simulation by inversion under Domain B; the readings place them the other way round
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: Domain A ### Poisson Processes, 'Transformations of Random Variables' bullet; Domain B ### Summarizing a Sample, 'Cumulative Distribution Function (CDF)' bullet
- claim: Domain A lists 'Transformations of Random Variables — deriving the distribution of a function of a lifetime or claim size'. Domain B lists 'Cumulative Distribution Function (CDF) — including its use to simulate a draw by inversion'.
- evidence: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026-06-29; https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed), p.6, assigns Hogg 1.7 and 2.7 to Domain B (B1-B8). Hogg, McKean & Craig 8th ed. (Global Edition) publisher eBook preview, Contents PDF pp.6-9 (https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf, sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99) titles them 1.7.2 'Transformations' (within 1.7 'Continuous Random Variables') and 2.7 'Transformations for Several Random Variables'. No assigned Domain A section is about transformations: Ross's assigned sections are in Ch 4, 5, 9 and 11, Daniel's note is about Poisson processes and mixtures, and Struppeck's is about life contingencies. Simulation is assigned only through Ross §§11.1, 11.2.1 and 11.2.2, in Ch 11 'Simulation' (Elsevier product page for Ross, Introduction to Probability Models 13th ed., chapter-level table of contents (https://shop.elsevier.com/books/introduction-to-probability-models/ross/978-0-443-18761-2, fetched 2026-10-04, sha256:4feee1adf6f271c13df56c766024e4cbd75c1c730698a0e109a95f1260839a23)), and the outline gives Ross to A1-A6. Hogg's 4.8 'The Method of Monte Carlo' and 4.8.1 'Accept-Reject Generation Algorithm' are not among the assigned Hogg sections. Each bullet's concept is therefore counted toward the wrong domain weight (A 20-30%, B 20-30%).
- source_rank: 1
- proposed_action: Move the transformations bullet to Domain B, and the simulation-by-inversion clause to Domain A with the Ross Ch 11 topic that F-004 asks for. This changes which domain the concepts count toward, so it was not auto-fixed.
- applied: false
- fingerprint: 6df3d3580606

## [F-008] Source Material lines give task codes only; the outline's section limits, exclusions and Ross's editions are absent
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: ## Source Material, every reading line
- claim: Each reading's sub-bullet is task codes alone. Dobson 'C1–C9', Hogg 'B1–B8, C1–C9', James 'C1–C9', Ross 'A1–A6', Tse 'B1–B4, B7–B9'. Ross is linked only as the 2019 (12th) edition.
- evidence: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026-06-29; https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed), p.6, limits most readings. Dobson & Barnett: 'Chapters 1-9, excluding 6.3.3, 6.7, 6.8, & 7.9'. Hogg: Domain B 'Sections 1.7, 2.7, 2.8, 3.7, 4.1, 4.4, 4.5, 4.6, 4.7, 5.1, 6.1, 6.2, 6.3, 6.4, 6.5, 7.1-7.6, 8.1, 8.2, 8.3', Domain C '4.4, 6.3, 6.5, 7.5, 9.1-9.6'. James et al.: 'Chapters 1, 2 (excluding Section 2.2.3), 3 (Sections 3.1 through 3.3, and 3.6 labs on Sections 3.1 through 3.3), 4 (Sections 4.1 through 4.4; the Linear Discrimination Analysis portion of Section 4.4 will not be tested), 5, 6, and 7'. Ross: '11th edition, 12th edition, or 13th edition ... 2014/ 2019/2023 - Sections 4.1-4.8, 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2, 9.1-9.6, 11.1, 11.2.1, and 11.2.2'. Tse: 'Sections 1.1, 2.2, 2.3, 2.4, 2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2'. Daniel: practice problems on the CAS website. None of this is on the exam page, so the shelf card for James reads 'C1–C9' as if the whole book were assigned. The 13th-edition allowance for Ross is new in 2026: the outline still served at the 2023-06 URL the vault cites (MASI_CO_2025_S v04 2024-12-19; https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf, sha256:0bd233bd23e60430706b52ab37eb248a9b14d33f9fe3d9bc0712a9e763e2e610), p.6, reads '11th edition or 12th edition ... 2014/ 2019'. Apart from that, the two outlines' readings are identical. The resource pages carry these section lists in their On-the-syllabus callouts (rank 4, consistency only), which is why this is minor. Ross's resource page still says '(of the 11th or 12th edition)'.
- source_rank: 1
- proposed_action: After each reading's codes, append its scope from p.6 word for word, as the vault's other CAS pages do, and state that Ross's 11th, 12th or 13th edition may be used. This adds content, so it was not auto-fixed.
- applied: false
- fingerprint: e8bfecc6f122

## [F-009] Lead sentence names Domain C as 'Generalized Linear Models'; the outline's domain is Extended Linear Models
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: Lead paragraph, first sentence
- claim: 'The Modern Actuarial Statistics I exam is a 4-hour computer-based CAS exam covering Stochastic Processes, Survival Models, Statistics, and Generalized Linear Models as part of the ACAS credentialing pathway.'
- evidence: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026-06-29; https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed), p.3, names the three domains 'A. Probability Models (Stochastic Processes and Survival Models)', 'B. Statistics' and 'C. Extended Linear Models' (45-55%). Domain C's readings go beyond GLMs: James Ch 5-7 (resampling, ridge/lasso, PCR/PLS, splines, GAMs) and Hogg Ch 9 (ANOVA). So 'Generalized Linear Models' narrows the exam's largest domain to one of its model families. The rest of the sentence checks out. The 4-hour length: p.1 'Exam Duration 4 hours' in a 4.5-hour appointment, and CAS 2026 Syllabus of Basic Education (PDF modified 2026-06-26; https://www.casact.org/sites/default/files/2025-01/2025_SOBE.pdf, sha256:f0ce0da128368cedb6ca35ac139ca0357e159a983dcf94e4275e32fa44530038) pp.10-12 '4 Hours'. Computer-based delivery: Pearson VUE test centres (SOBE p.13). Part of the ACAS pathway: CAS Credential Requirements page, fetched 2026-10-04 (https://www.casact.org/credential-requirements, sha256:53c285ffbbe390a21e4c20f733269c5cdfaca53a091b770efb77d24943d4c088) lists 'Requirements for Associateship: MAS-I, MAS-II, Course on Professionalism, Exam 5, PCPA Exam, PCPA Project, Exam 6'.
- source_rank: 1
- proposed_action: Name the third area as the outline does, '[[Extended Linear Model|Extended Linear Models]]'. This rewrites the lead sentence, so it was not auto-fixed.
- applied: false
- fingerprint: e447eb3c59b9

## [F-010] Prerequisite callout omits Exam 2, which CAS says MAS-I assumes; its calculus line is unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: Lead, '> [!question]- Prerequisite knowledge' callout
- claim: Prerequisites listed: 'Calculus, including integration, differentiation, and infinite series' and 'The Exam P toolkit: Probability, Random Variables, Expected Value, Variance, Conditional Probability, and the named distributions'.
- evidence: CAS 2026 Syllabus of Basic Education (PDF modified 2026-06-26; https://www.casact.org/sites/default/files/2025-01/2025_SOBE.pdf, sha256:f0ce0da128368cedb6ca35ac139ca0357e159a983dcf94e4275e32fa44530038). The p.8 table 'Exam or VEE Requirement / Assumes Prior Knowledge from the Following Exam(s)' reads 'Exam MAS-I — Exams 1 and 2'. p.7 adds that 'it is generally assumed that candidates for Associateship-level Exams MAS-I, MAS-II, 5, and 6 are familiar with material covered on the preliminary exams'. The callout covers Exam 1 (Exam P) but not Exam 2 (Financial Mathematics). Struppeck's life-contingency note, assigned for A5-A6, values payments using 'the rate(s) of interest for discounting' (https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf, sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849, PDF p.3). Neither the 2026 outline nor the SOBE says anything about calculus or infinite series. The calculus line is plausible, as Exam 1 rests on it, but it has no source.
- source_rank: 1
- proposed_action: Add Exam 2 (financial mathematics / interest theory) to the prerequisites, citing SOBE p.8. Either source the calculus line or reword it as Exam 1 background. This adds content, so it was not auto-fixed.
- applied: false
- fingerprint: a5836911898d

## [F-011] Task C2 links 'data set' to Tidy Data, a concept from no MAS-I reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: Learning Objectives, task C2, '[[Tidy Data|data set to be modeled]]'
- claim: Task C2's 'data set' links to the Tidy Data concept page.
- evidence: A full-text search of ISLR 2nd ed., CAS-hosted copy, PDF bookmark outline (https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f), Larsen, Generalized Linear Models study note (https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd) and Dobson & Barnett 4th ed. publisher eBook preview, Contents PDF pp.8-12 (https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a) finds 0 occurrences of 'tidy'. Concepts/Tidy Data.md cites R for Data Science and Python for Data Analysis. Neither is on CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026-06-29; https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed) p.6, and the link checker reports both as broken resource links from that page. A candidate following the task's link lands on material outside the syllabus.
- source_rank: 1
- proposed_action: Point 'data set' at a syllabus concept or leave it unlinked. Choosing the target is a judgement, so it was not auto-fixed.
- applied: false
- fingerprint: 822ffa80d9f1

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- resolves: F-001
- status: resolved
- note: Renumbered the Domain C tasks 1-9, as on the 2026 outline p.5. Objective codes on the page are now A1-A6, B1-B9 and C1-C9. Every code the Source Material cites resolves, so objectiveFilterOptions now offers the shelf's Learning objective filter (checked against the edited page with vitest). syllabus_lint 0/0 and test_syllabus_lib OK. vitest sourceMaterial, resourceExams, questionBank, examCatalog, storeBooks, syllabusChapters and wikiParser pass (171 tests).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- resolves: F-002
- status: resolved
- note: Restored the outline's words. B3 drops '([[Hypothesis Testing]])'. B6 reads 'Model insurance claims in [[Aggregate Loss Model|aggregate]]'. B8 adds 'to [[Parameter Estimation|estimates]]'. C1 ends at 'extended linear model'. C2 reads '[[Tidy Data|data set to be modeled]]'. C3 ends at 'approach'. Links sit only on the outline's own words; the two inserted noun phrases are linked because test_syllabus_lib requires every noun phrase in an objective to be linked. The syllabus concept set is unchanged, since every concept the removed clauses linked is still linked in the same callout. The Linear Mixed Model bullet stays, under F-003.

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: in_review
- checks_run: The page was written from the 2025 outline that is still served at the 2023-06 URL. That outline differs from the 2026 v06 outline only in Ross's editions (13th/2023 added) and the study-kit source key, so the page has not rolled over in substance. Weights: A 20-30%, B 20-30%, C 45-55% match p.3. Domain preambles: all three match pp.3-5; B's 'second semester' is the outline's '2nd semester'. Tasks: all 24 were diffed phrase by phrase against pp.3-5. A1-A6 match. B1, B2, B4, B5, B7 and B9 match. B3, B6, B8, C1, C2 and C3 carried vault wording and were restored (F-002). C was numbered 10-18 and is now 1-9 (F-001). C4-C9 match apart from plural link labels. Readings lines: A 'Daniel, Ross, Struppeck', B 'Hogg, McKean, and Craig, Tse' and C 'Dobson and Barnett, Hogg, McKean, and Craig, James et al., Larsen' match pp.3-5. Source Material: 8 readings = the 8 references on p.6. Every task code matches p.6 (Daniel A1-5, Dobson C1-C9, Hogg B1-B8 and C1-C9, James C1-C9, Larsen C1-C9, Ross A1-A6, Struppeck A5-6, Tse B1-B4 and B7-9). Every linked resource page's year and edition matches its p.6 citation. The section limits are absent (F-008). Lead: 4 hours (p.1; SOBE pp.10-12), Pearson VUE computer-based delivery (SOBE p.13) and the ACAS pathway (Credential Requirements) all check; the domain naming is F-009. Prerequisites were checked against SOBE p.8 (F-010). Topic lists: each ### list was diffed against the assigned sections, using ISLR2 bookmarks, the Dobson and Hogg publisher contents, the Ross and Tse publisher chapter lists, and full-text search of Larsen, Daniel, Struppeck and ISLR2 for every named method. That produced F-003 to F-007. Tweedie (Larsen p.2), QQ and box plots (Larsen pp.1-2), thinning and sums of Poisson processes (Daniel Fact 1.15), mixed Poisson (Daniel's mixtures) and life tables, whole life and annuities (Struppeck) were all found. Bonus-malus, multi-state and credit-migration examples occur 0 times in Daniel and Struppeck and could not be checked against Ross, which is a purchased text. The hat matrix H = X(X^TX)^{-1}X^T agrees with a rank-3 reference only (Wikipedia, Projection matrix); Dobson 6.2 and Hogg 9.6 could not be read. Links: validate_links.py --exam 'Exam MAS-I (CAS)' is clean, and audit_exam.py shows no broken link on this page (3 broken resource links sit on concept pages). LaTeX is balanced. verify_check is clean, and syllabus_lint and test_syllabus_lib pass after the edits. App data outside the vault: examFees.ts MAS-I $550/$440, examSittings.ts 2026 MAS-I rows, and examSittingDetails.ts (Oct 2026 registration deadline Sep 29, refund deadline Oct 6, 4-hour length, Pearson VUE, item types) all agree with the CAS page, the SOBE and the outline. examPdfLinks.ts 'mas-i' still points at the 2023-06 outline. The page does not state that link, so it is reported, not filed.
- sources_checked: CAS, Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026-06-29, 8 pp.), PDF pp.1-8, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS, Exam MAS-I — Modern Actuarial Statistics-I exam page, read 2026-10-04: windows Jul 29-Aug 4 and Oct 28-Nov 5, 2026; fee $550 ($440 students); links the 2026 Content Outline, sha256:60386e2cc573d16ac1792989fdf4d27382f0944e668a773669bb2567ca26004a — https://www.casact.org/exam/exam-mas-i-modern-actuarial-statistics-i; CAS, 2026 Syllabus of Basic Education (PDF modified 2026-06-26), pp.7-8 prior-knowledge table, pp.10-13 MAS-I schedule and Pearson VUE delivery, sha256:f0ce0da128368cedb6ca35ac139ca0357e159a983dcf94e4275e32fa44530038 — https://www.casact.org/sites/default/files/2025-01/2025_SOBE.pdf; CAS, Exam MAS-I Content Outline as served at the 2023-06 URL (MASI_CO_2025_S v04 2024-12-19), pp.3-6, for the wording the page was written from, sha256:0bd233bd23e60430706b52ab37eb248a9b14d33f9fe3d9bc0712a9e763e2e610 — https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf; CAS, Exam MAS-II Content Outline 2026, PDF pp.2, 4 (Linear Mixed Models domain, West et al.), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; CAS, Credential Requirements page, read 2026-10-04 (Requirements for Associateship include MAS-I), sha256:53c285ffbbe390a21e4c20f733269c5cdfaca53a091b770efb77d24943d4c088 — https://www.casact.org/credential-requirements; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, bookmark outline Ch 1-7 and full-text search, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018), publisher eBook preview, Contents PDF pp.8-12, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; Hogg, McKean & Craig, Introduction to Mathematical Statistics, 8th ed. (Global Edition), publisher eBook preview, Contents PDF pp.6-9, sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf; Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016), PDF pp.1-3, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; Daniel, Poisson processes (and mixture distributions), CAS Study Note (June 2008), full-text search, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; Struppeck, Life Contingencies, CAS Study Note (rev. Sept 2015), full-text search, sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf; Ross, Introduction to Probability Models, 13th ed. (Elsevier 2023), publisher product page, chapter-level contents, sha256:4feee1adf6f271c13df56c766024e4cbd75c1c730698a0e109a95f1260839a23 — https://shop.elsevier.com/books/introduction-to-probability-models/ross/978-0-443-18761-2; Tse, Nonlife Actuarial Models (CUP 2009), Cambridge Core contents p.vii image, sha256:310e411c2bcc82d3ba9d145325e7a649444a68994c6d03c990c75475c2e59fc0, and chapter summaries for Ch 2, 11, 12, 13 — https://www.cambridge.org/core/books/nonlife-actuarial-models/41EF4E4BB9E3A31F63DDCC18C245C271
- note: In review, not verified. The 2026 outline and the CAS exam page were read in full, and every weight, task, readings line, task code and reading on the page now agrees with them. Four major findings stay open: a MAS-II topic, the linear mixed model, is listed in Domain C (F-003), and the topic lists of all three domains omit assigned material (F-004 to F-006). The biggest gaps are Ross's reliability and simulation chapters, Hogg's most powerful/UMP and chi-square tests, Tse's severity, empirical and goodness-of-fit material, and James Ch 5.2-7 (bootstrap, ridge/lasso, PCR/PLS, splines, GAMs). Each needs authoring, so none was auto-fixed. Every link in these callouts becomes a syllabus concept, so these findings change what MAS-I readiness and study plans count. Two transcription fixes were applied: C1-C9 numbering (F-001) and the outline's task wording (F-002). F-011's 'leave it unlinked' option would trip test_syllabus_lib's unlinked-noun check, so a fix should re-point the link instead. No critical finding and no source conflict.

## [F-012] Tweedie bullet says 'for pure premium'; Larsen describes the Tweedie by its power variance
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: minor
- status: open
- locus: Domain C, ### Model Families, Tweedie Distribution bullet
- claim: Domain C listed '[[Tweedie Distribution]] for [[Pure Premium|pure premium]]', which made Pure Premium a MAS-I syllabus concept.
- evidence: The Tweedie's only MAS-I reading is Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016; https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd), PDF p.2, 'Tweedie Distributions': 'a family of distributions where the variance is related to the mean through a power function Var[Y] = a[E(Y)]^p' (Normal p = 0, Poisson 1, compound Poisson-gamma 1 < p < 2, gamma 2, inverse Gaussian 3), 'particularly useful in the case where one has a data set that combines observations with zero for the dependent variable with continuous non-zero value'. Larsen never says 'pure premium'; neither does the full text of ISLR 2nd ed. (CAS-hosted copy, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f) or the Dobson & Barnett 4th ed. publisher preview (sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a). CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06; https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed) pp.3-6 names no pure premium either. The use is real (rank 3: Goldburd et al., CAS Monograph 5), but the link put a concept from no MAS-I reading into MAS-I readiness.
- source_rank: 2
- proposed_action: Describe the Tweedie in Larsen's words and drop the Pure Premium link.
- applied: true
- fingerprint: da67def1e5be

## [F-013] Assigned sections with no concept page to link: Ross 4.3, 4.5-4.8; Dobson 6.5; Hogg 9.3-9.4; Larsen's regression through the origin
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: minor
- status: open
- locus: Domain A ### Markov Chains; Domain C ### Specifying the Model / ### Evaluating the Model
- claim: Domain A's Markov-chain list names the transition probability matrix, n-step transitions, the stationary distribution (long-run proportions and limiting probabilities) and bonus-malus systems, and nothing from Ross 4.3 or 4.5-4.8. Domain C names nothing for Dobson 6.5, Hogg 9.3-9.4 or Larsen's 'Regression Through the Origin'.
- evidence: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06; https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed), p.6, assigns Ross 4.1-4.8, Dobson & Barnett Ch 1-9 (excluding 6.3.3, 6.7, 6.8, 7.9), Hogg Domain C 9.1-9.6, and Larsen. Ross, Introduction to Probability Models, 12th ed., printed Contents, library scan (TU Ilmenau via GBV; https://www.gbv.de/dms/ilmenau/toc/1665053453.PDF, sha256:0c754803d244fd8e3d9343742c99e98ded9a331894a833711e17b018622023dc), PDF p.3: 4.3 Classification of States, 4.5 Some Applications (4.5.1 The Gambler's Ruin Problem), 4.6 Mean Time Spent in Transient States, 4.7 Branching Processes, 4.8 Time Reversible Markov Chains. Dobson & Barnett 4th ed. publisher preview (https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a), Contents PDF p.10: 6.5 Analysis of covariance. Hogg, McKean & Craig 8th ed. publisher preview (https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf, sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99), Contents PDF p.9: 9.3 Noncentral chi-square and F-Distributions, 9.4 Multiple Comparisons. Larsen study note (https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd), PDF p.1 heading 'Regression Through the Origin'. Classification of states is examined: CAS Exam MAS-I Spring 2018 Q10 'Determine the number of classes of states in this Markov chain' (PDF p.14; sha256:12d102c422a45e87674b082ad448ac5e25a495115f963d1a9ac63a9f8f028020) and Fall 2019 Q9 'Determine the number of recurrent states' (PDF p.13; sha256:32e26dbc1bd463e053ea0f9116473551be6d1b2f35b6d3670a716ecb86a141bd), both read from the page images. No Concepts/ page covers any of these topics: the filenames and full text were searched for classification of states, recurrent, transient, gambler's ruin, branching process, time-reversible, analysis of covariance/ANCOVA, noncentral, multiple comparisons and regression through the origin, and they occur only in source citations. scripts/syllabus_lib.py requires every noun phrase in a learning-objective callout to link a note, and an unresolved link is an error on a beta exam, so the page cannot name them until the pages exist.
- source_rank: 1
- proposed_action: Write concept pages for these topics (e.g. Classification of States, Gambler's Ruin, Branching Process, Time-Reversible Markov Chain, Analysis of Covariance, Multiple Comparisons, Noncentral Chi-Square and F Distributions, Regression Through the Origin), then link them under Domain A ### Markov Chains and Domain C. This is concept authoring outside the exam page.
- applied: false
- fingerprint: 7296e580067c

## [F-003/R] Linear Mixed Model removed from Domain C
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: Removed the '[[Linear Mixed Model]] for [[Clustered Data|grouped or repeated data]]' bullet from Domain C ### Model Families; neither Linear Mixed Model nor Clustered Data is linked anywhere on the MAS-I page now, so both leave the MAS-I concept set (both stay on Exam MAS-II (CAS).md). Re-checked this session: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed) p.6 limits Dobson & Barnett to Ch 1-9, and the Dobson 4th ed. publisher preview contents PDF p.12 (sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a) puts repeated-measures and multilevel models in Ch 11 'Clustered and Longitudinal Data'; full-text search of the ISLR 2nd ed. CAS-hosted PDF (sha256:f708349f…) and of Larsen (sha256:5c4ed4e8…) finds 0 'mixed model'/'random effect'/'mixed-effect'; CAS Exam MAS-II Content Outline 2026 (sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b) PDF p.2 'B. Linear Mixed Models 10-20%' and p.4 West, Welsh & Galecki for B1-B4.

## [F-004/R] Reliability and Simulation added to Domain A; Markov list checked against Ross 4.1-4.8
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-004
- status: resolved
- note: Domain A gained ### Reliability Theory - System Reliability (structure functions, minimal path and minimal cut sets, systems of independent components, system life as a function of component lives, expected system lifetime), Inclusion-Exclusion Principle (bounds on the reliability function) and Combinatorics (path and cut sets of a k-out-of-n system, moved here from ### Poisson Processes) - and ### Simulation - Inversion Method (the inverse transformation method) and Rejection Method. These are the titles of the sections outline 2026 p.6 assigns Ross for A1-A6 (9.1-9.6, 11.1, 11.2.1, 11.2.2), read from Ross 12th ed. printed Contents, GBV library scan (https://www.gbv.de/dms/ilmenau/toc/1665053453.PDF, sha256:0c754803d244fd8e3d9343742c99e98ded9a331894a833711e17b018622023dc) PDF p.6 (9.2 Structure Functions, 9.2.1 Minimal Path and Minimal Cut Sets, 9.3, 9.4 Bounds on the Reliability Function, 9.4.1 Method of Inclusion and Exclusion, 9.5 System Life as a Function of Component Lives, 9.6 Expected System Lifetime) and PDF pp.6-7 (11.2.1 The Inverse Transformation Method, 11.2.2 The Rejection Method). Examined on CAS papers read from the page images: Fall 2018 Q7 minimal path sets of a 3-out-of-50 system in series with a 48-out-of-50 system (PDF p.11), Fall 2019 Q6 inclusion-exclusion bounds from minimal cut sets (PDF p.10). Markov list checked against Ross 4.1-4.8 (GBV PDF p.3): transition matrix (4.1), n-step transitions (4.2 Chapman-Kolmogorov), and the stationary distribution, now glossed with 4.4's title 'long-run proportions and limiting probabilities'. Bonus-malus systems kept: Ross Ch 4 Example 4.7 'Bonus Malus' system, and Example 4.23 its long-run average premium (Ch 4 of an earlier edition, course-hosted on the NTNU TMA4265 page, PDF pp.4 and 32, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1). Multi-State Model and Credit Rating Migration unlinked: neither occurs in that Ch 4 text, in Daniel or in Struppeck, and no Ross 4.x title names them, so they leave the MAS-I concept set. Ross 4.3 and 4.5-4.8 have no concept page to link; carried to F-013.

## [F-005/R] Assigned Hogg and Tse topics added to Domain B
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-005
- status: resolved
- note: Domain B gained ### Distribution Theory - Transformations of Random Variables (Hogg 1.7.2, 2.7), Linear Combinations of Random Variables (2.8), Mixture Distribution incl. mixtures of discrete and continuous type distributions (1.7.3, 3.7; Tse 2.3.2), Convergence in Probability (5.1). Estimation gained Percentile Matching (Tse 12.1.2), Rao-Blackwell Theorem with the properties of a sufficient statistic and completeness and uniqueness (Hogg 7.3, 7.4; the linked page covers completeness and Lehmann-Scheffe), and Empirical Distribution with kernel estimation of the probability density function (Tse 11.1.1, 11.1.2). Testing gained Neyman-Pearson Lemma for most powerful and uniformly most powerful tests (Hogg 8.1, 8.2) and the Chi-Square Goodness-of-Fit Test and Kolmogorov-Smirnov Test (Hogg 4.7; Tse 13.2.1, 13.2.3). Loss Models gained the claim-severity distributions exponential, gamma, Weibull and Pareto (Tse 2.2.1-2.2.4) and Tail Weight (Tse 2.4 'Tail properties of claim severity'). Section titles read this session from the Hogg 8th ed. publisher preview contents PDF pp.6-9 (sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99) and the Tse publisher preview printed contents PDF pp.9-13 (sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404); every one is a section outline 2026 p.6 assigns for Domain B. Rao-Blackwell/MVUE and Neyman-Pearson are examined: CAS MAS-I Spring 2019 Q19 (sufficient statistic; MVUE a function of it, PDF p.23) and Fall 2018 Q21 (best critical region by the Neyman-Pearson lemma, PDF p.25), read from the page images.

## [F-006/R] James Ch 4.3-7, Dobson Ch 8-9 and Larsen topics added to Domain C
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-006
- status: resolved
- note: Domain C gained: nominal (multinomial) and ordinal logistic regression (Dobson Ch 8, preview contents PDF p.11; ISLR 4.3.5); Log-Linear Models for contingency tables (Dobson 9.3-9.6, PDF p.12); Quasi-Likelihood for overdispersion (Larsen PDF p.1); Naive Bayes and Quadratic Discriminant Analysis as generative models for classification (ISLR 4.4, 4.4.3, 4.4.4; LDA left unlinked, as outline 2026 p.6 excludes it); ### Moving Beyond Linearity - polynomial regression, step functions, regression and smoothing splines, local regression, GAMs (ISLR 7.1-7.7); the chi-squared, t and F distributions as distributions related to the Normal (Dobson 1.4, PDF p.8); Supervised Learning and Test Error (ISLR 2.1.4, 2.2.1); Bootstrap (ISLR 5.2); ### Shrinkage and Dimension Reduction - Regularization (ridge, lasso, 6.2), Principal Components Regression and Partial Least Squares (6.3.1-6.3.2) with Principal Components Analysis linked as 6.3.1's own 'An Overview of Principal Components Analysis' (ISLR: 'Here we describe its use as a dimension reduction technique for regression'; PCA for unsupervised learning, Ch 12, stays MAS-II), High-Dimensional Data (6.4); and Residuals beside the Residual Plot (ISLR 3.1.1; Dobson 6.2.6, 7.6). ISLR sections from the CAS-hosted PDF bookmark outline and text (sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f); Dobson from the 4th ed. preview contents PDF pp.8-12 (sha256:40ed0b25…); Larsen sha256:5c4ed4e8…; outline 2026 p.6 assigns James Ch 1, 2 (excl. 2.2.3), 3.1-3.3, 4.1-4.4, 5, 6, 7 and Dobson Ch 1-9. Examined: CAS MAS-I Fall 2019 Q28 on PCR (PDF p.32) and Spring 2019 Q37 on lasso, PLS, PCA and ridge (PDF p.41), read from the page images. Dobson 6.5 ANCOVA, Hogg 9.3-9.4 and Larsen's regression through the origin have no concept page to link; carried to F-013.

## [F-007/R] Transformations moved to Domain B, inversion to Domain A
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-007
- status: resolved
- note: Transformations of Random Variables now sits in Domain B ### Distribution Theory (of one random variable, and transformations for several random variables: Hogg 1.7.2 and 2.7, which outline 2026 p.6 assigns to Domain B, B1-B8; titles from the Hogg preview contents PDF pp.6-7, sha256:7fd80607…). The Domain B CDF bullet now reads only '[[Cumulative Distribution Function (CDF)]]', and the Inversion Method is in Domain A ### Simulation beside the Rejection Method (Ross 11.2.1 The Inverse Transformation Method and 11.2.2 The Rejection Method, assigned for A1-A6 on outline p.6; Ross 12th ed. contents GBV scan PDF pp.6-7, sha256:0c754803…).

## [F-008/R] Source Material lines carry the outline's scope
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-008
- status: resolved
- note: Each Source Material line now gives its task codes followed by outline 2026 p.6's scope for that reading: Daniel - CAS Study Note, June 2008, practice problems noted in its Foreword on the CAS website; Dobson - 4th edition, Chapters 1-9 excluding 6.3.3, 6.7, 6.8 and 7.9; Hogg - 8th edition, Domain B Sections 1.7, 2.7, 2.8, 3.7, 4.1, 4.4-4.7, 5.1, 6.1-6.5, 7.1-7.6, 8.1-8.3 and Domain C 4.4, 6.3, 6.5, 7.5, 9.1-9.6; James - 2nd edition, Chapters 1, 2 (excluding 2.2.3), 3 (3.1-3.3 and the 3.6 labs on them), 4 (4.1-4.4, the LDA portion of 4.4 not tested), 5, 6 and 7; Larsen - December 2015, revised June 2016; Ross - 11th, 12th or 13th edition (2014, 2019 or 2023), Sections 4.1-4.8, 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2, 9.1-9.6, 11.1, 11.2.1, 11.2.2; Struppeck - October 2014, revised September 2015; Tse - Sections 1.1, 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2. Every line diffed against p.6 this session (sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed). The outline's 'Linear Discrimination Analysis' is given as ISLR's own name for the method, 'Linear Discriminant Analysis' (ISLR 4.4.1-4.4.2). vitest sourceMaterial and examCatalog pass (133 tests). The Ross resource page's own '(of the 11th or 12th edition)' is outside this file.

## [F-009/R] Lead names Extended Linear Models
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-009
- status: resolved
- note: The lead now reads '... covering [[Stochastic Processes]], [[Survival Model|Survival Models]], [[Statistics]], and [[Extended Linear Model|Extended Linear Models]] as part of the ACAS credentialing pathway', naming Domain C as outline 2026 p.3 does ('C. Extended Linear Models 45-55%'; sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed). 4 hours re-checked on outline p.1 ('Exam Duration 4 hours').

## [F-010/R] Prerequisites: Exams 1 and 2 as CAS states them
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-010
- status: resolved
- note: The prerequisite callout now opens 'The CAS Syllabus of Basic Education says MAS-I assumes prior knowledge from Exams 1 and 2. The CAS credits both through another actuarial society's equivalent exam, such as the SOA's Exams P and FM:', then lists Exam 1 (Probability) - probability, random variables, expected value, variance, conditional probability, the named distributions - and Exam 2 (Financial Mathematics) - interest and present value, which Struppeck's note uses to discount insurance and annuity payments. The unsourced calculus line is gone. Sources read this session: CAS 2026 Syllabus of Basic Education p.8 table 'Exam MAS-I | Exams 1 and 2' and p.7 (sha256:f0ce0da128368cedb6ca35ac139ca0357e159a983dcf94e4275e32fa44530038); CAS Credential Requirements page, MAS-I 'Prior Knowledge (Assumed) Exam 1 - Probability, Exam 2 - Financial Mathematics', and for Exams 1 and 2 'Offerings and fees are dependent on which actuarial society offers the equivalent exam: SOA, IFoA, IAI, IAA, CAA, ASSA', 'Credit through other organizations' (sha256:53c285ffbbe390a21e4c20f733269c5cdfaca53a091b770efb77d24943d4c088); CAS Exam 1 page 'Exam 1/P' (https://www.casact.org/exam/exam-1-probability, sha256:2fb9813a1e233fa4d1264e2bf003900356384b6d848840c2a29918bd1f16e9c6) and Exam 2 page 'Exam 2/FM', 'Credit will be given for SOA exam FM ...' (https://www.casact.org/exam/exam-2-financial-mathematics, sha256:f3a2d16129e4eb36b35705b52d7a49ac0df256dc39bc304a1c8f5578a3620241); SOA Probability Exam syllabus Nov 2026 pp.2-3 (sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397); SOA FM syllabus Dec 2026 p.2 'Time Value of Money', interest rate, present value (sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39); Struppeck PDF pp.2-3 'the rate(s) of interest for discounting', actuarial present value (sha256:8ea3f762…). An earlier draft of this edit said the CAS 'waives' Exams 1 and 2 for P and FM; reworded, since the CAS credits them through the other societies' exams rather than waiving them.

## [F-011/R] Task C2 links Data Types, not Tidy Data
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-011
- status: resolved
- note: Task C2's 'data set to be modeled' now links [[Data Types]] instead of [[Tidy Data]]. Data Types is already the link on task C9's own words 'data types' (outline 2026 p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed), so no concept from outside the MAS-I readings enters, and Tidy Data leaves the MAS-I concept set (it stays on DISC-DA and PCPA). C2's wording is unchanged from p.5; syllabus_lint 0 errors 0 warnings and test_syllabus_lib OK with the link in place.

## [F-012/R] Tweedie described in Larsen's words
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-012
- status: resolved
- note: The bullet now reads '[[Tweedie Distribution]]s, whose [[Variance|variance]] is a [[Tweedie Distribution|power of the mean]]', Larsen PDF p.2's definition (Var[Y] = a[E(Y)]^p; sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd). Pure Premium is no longer linked from the MAS-I page and leaves its concept set.
