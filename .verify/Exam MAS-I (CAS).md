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
