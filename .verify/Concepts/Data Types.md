---
target: Concepts/Data Types.md
created: 2026-10-04
---

## [F-001] Page nests ordinal under categorical; the MAS-I outline lists categorical and ordinal as separate types
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: opening definition and the Numeric/Categorical formula block
- claim: Categorical: nominal, ordinal, binary — ordinal is presented as a kind of categorical variable.
- evidence: CAS Exam MAS-I Content Outline 2026, Section C task 5 (p.5): 'Distinguish among categorical, ordinal, and continuous predictors and their interactions' — the outline uses 'categorical' for unordered levels and names 'ordinal' as a third type (sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf). The page's nesting is the usual statistical taxonomy and is not wrong: Siegrist, Random, Ch.6 §1 treats nominal and ordinal as levels of measurement of qualitative/discrete variables (sha256:0af72fbf0202413525cae99e696cfa70014a803d6c5ac7a7dcafd1577742414f — https://www.randomservices.org/random/sample/Introduction.html), and pandas' categorical type 'might have an order' (User Guide 'Categorical data', sha256:f2643db9e1c77824c0a0fad64f881fd62095d7bd9ae0acc3218bc37dcef97bbd). Flagged as a usage difference for MAS-I readers, not reconciled.
- source_rank: 1
- proposed_action: Add one line noting that the MAS-I outline's 'categorical, ordinal, and continuous' uses categorical to mean unordered (nominal) levels.
- applied: false
- fingerprint: 14a97ca93926

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: numeric/categorical split = ISLR §2.1.5 (quantitative vs qualitative a.k.a. categorical); continuous (values in an interval) vs discrete = Siegrist §6.1; nominal (names; few operations make sense 'even if numbers are used for the encoding') and ordinal (only order meaningful; differences not meaningful) = Siegrist §6.1; storage type is not statistical type and must be declared = ISLR §2.3.5 (numeric cylinders treated as quantitative; as.factor converts) and pandas 'category' dtype corresponding to R's factor; k - 1 indicator columns = ISLR §3.3.1; response type -> model (counts -> Poisson, binary -> logistic, zero mass plus continuous -> Tweedie) = Larsen p.2 and ISLR §2.1.5; examples worked first: 26 vehicle ages 0-25; e^(0.05 x 7) = e^0.35 = 1.4191 (stated 1.419), e^0.05 = 1.0513 (stated 1.051), 8 territories -> 7 coefficients — all match; links resolve (no figure on page); scope = MAS-I outline tasks C5 and C9.
- sources_checked: Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §1 'Introduction' (type and level of measurement: continuous/discrete, nominal, ordinal), sha256:0af72fbf0202413525cae99e696cfa70014a803d6c5ac7a7dcafd1577742414f — https://www.randomservices.org/random/sample/Introduction.html; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §2.1.5 quantitative vs qualitative (categorical) variables, printed p.28 (PDF p.39); §2.3.5 cylinders stored numeric treated as quantitative until as.factor(), printed p.50 (PDF p.61); §3.3.1 qualitative predictors, 'one fewer dummy variable than the number of levels', printed p.86 (PDF p.96), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; pandas 3.0.6 User Guide, 'Categorical data' (category dtype; comparison with R's factor), sha256:f2643db9e1c77824c0a0fad64f881fd62095d7bd9ae0acc3218bc37dcef97bbd — https://pandas.pydata.org/docs/user_guide/categorical.html; Larsen, 'Generalized Linear Models', CAS Study Note (rev. 6/29/2016), pp.1-2 ('QQ and Box Plots…', 'Tweedie Distributions'), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C Extended Linear Models, tasks 5 and 9, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Linked by MAS-I ('data types', task C9) and DISC-DA ('Data Classifications'); DISC-DA's course text is not public and was not checked. One nit open (outline usage of 'categorical' vs 'ordinal'). Medium: ISLR (rank 2) confirms the quantitative/qualitative split and coding; the nominal/ordinal/discrete detail rests on Siegrist and pandas (rank 3).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Added a bullet after Nominal/Ordinal/Binary: 'The MAS-I outline counts differently. Its task C5 asks candidates to distinguish categorical, ordinal, and continuous predictors — three kinds, so there categorical means unordered (nominal) levels. This page uses the wider sense, in which nominal and ordinal are both levels of measurement of a qualitative (categorical) variable.' Support: outline 2026 task C5 wording re-read (PDF p.5); Siegrist Ch.6 §1 'Levels of Measurement' (qualitative variables nominal; ordinal = only order meaningful); ISLR §2.1.5 PDF p.39 (qualitative, 'also known as categorical'). Taxonomy left as it was; convention flagged, not reconciled.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: New bullet re-read against the outline task C5 (PDF p.5), Siegrist §6.1 levels of measurement and ISLR §2.1.5 (PDF p.39). Rest of page unchanged since C-001; examples re-run: e^(0.05*7) = e^0.35 = 1.4191 (1.419), e^0.05 = 1.0513 (1.051), 8 territories -> 7 coefficients, veh_age 0-25 -> 26 values. Links resolve (no figure). F-001 closed; no open findings.
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C task 5 'Distinguish among categorical, ordinal, and continuous predictors and their interactions…', PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §2.1.5 'Regression Versus Classification Problems' (quantitative vs qualitative, also known as categorical), printed p.28 (PDF p.39), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §1 'Introduction' (levels of measurement: qualitative variables are nominal; ordinal = only order meaningful; continuous vs discrete), sha256:0af72fbf0202413525cae99e696cfa70014a803d6c5ac7a7dcafd1577742414f — https://www.randomservices.org/random/sample/Introduction.html
- note: Medium: nominal/ordinal/discrete detail rests on Siegrist (rank 3); ISLR (rank 2) and the outline confirm the quantitative/qualitative split and the outline's three-way usage.
