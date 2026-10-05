---
target: Concepts/Analysis of Covariance.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: independent python recomputation of both examples before comparing (F = 0.7297 on (2,18), p = 0.496; F = 5.0 on (2,20), p = 0.0173; nested-model df 23/22/20/18 for n=24, k=3; raw means 7.50/8.05/8.05 reproduced as each line at its own xbar; adjusted means 7.65/7.90/8.05; e^0.15 = 1.162); all 4 F-table values diffed against the CAS tables PDF; every formula, df rule and the adjusted-means definition checked against Rodríguez §2.8 and PSU STAT 502 L9; definition and GLM bullet against Dobson §1.2/Table 1.1; all 9 wiki-link targets exist; 68 math spans render in KaTeX
- sources_checked: Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope printed pp.3-4 (PDF pp.20-21): 'Analysis of covariance (ANCOVA) is used when at least one of the explanatory variables is continuous' and Table 1.1 (continuous response, nominal & some continuous explanatory -> ANCOVA; binary/count response with categorical & continuous -> logistic/Poisson regression); Contents PDP p.10 lists §6.5 Analysis of covariance p.132 (body not in preview), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 §2.8 'Analysis of Covariance Models', PDF pp.42-48: additive model (2.21) mu_ij = mu + alpha_i + beta x_ij, parallel lines; reference cell alpha_1 = 0; model matrix = constant + dummies (one dropped) + covariate; hierarchical anova Table 2.24 (Effort|Setting F on 2 and 16 d.f. = k-1, n-k-1); adjusted means mu + alpha_i + beta*xbar Table 2.26; different-slopes model (2.22) with alpha_1 = gamma_1 = 0, parallelism F on 2 and 14 d.f. (= k-1, n-2k) Table 2.28, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Penn State STAT 502 (online course notes), Lesson 9 'ANCOVA Part I', §9.1 covariate entered as a regression variable, treatments compared at the mean of the covariate, removes variation due to the covariate; §9.2 steps: test equal slopes (treatment x covariate interaction) first, then common-slope model with LS means at the covariate mean, else compare at three or more covariate values, sha256:02e005b021c61df817b6e7c1f86c458a016a2574ecba53f2261eaeafa04ec16c — https://online.stat.psu.edu/stat502/Lesson09.html; CAS Exam MAS-I Tables (version 01/15/2018), F-distribution table: F(2,18) upper 0.05 = 3.555 (PDF p.18); F(2,20) upper 0.05 = 3.493, 0.02 = 4.788, 0.01 = 5.849 (PDF p.19), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list PDF p.6: Dobson & Barnett Chapters 1-9 excluding 6.3.3, 6.7, 6.8 & 7.9 (so §6.5 ANCOVA is assigned), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Every claim and number checks. Dobson §6.5's body is not in the free preview, so the formulas and the test sequence rest on rank-3 notes (Rodríguez, PSU) whose notation matches the page exactly; hence medium. No exam page links this concept yet (Exam MAS-I (CAS).md has no [[Analysis of Covariance]] link).

## [C-002] Inbound links added during this run; locator typo in C-001
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- note: Correction to C-001: (1) its note says no exam page links this concept; while this pass ran, the working-tree Exam MAS-I (CAS).md gained [[Analysis of Covariance]] under Domain C 'Model Families' (line 164) and Concepts/ANOVA.md line 40 links it as 'adding a continuous variate to the group indicators gives an Analysis of Covariance model' — both uses match this page's definition (Dobson §1.2: ANCOVA when at least one explanatory variable is continuous). (2) C-001's Dobson locator 'Contents PDP p.10' should read 'Contents PDF p.10'.
