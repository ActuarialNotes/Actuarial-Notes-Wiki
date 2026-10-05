---
target: Concepts/Model Structure.md
created: 2026-10-04
---

## [F-001] Definition excludes distribution and link, which the CAS outline names as model structure
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: lead definition (line 14) and first bullet
- claim: Model Structure is the set of terms in an extended linear model's linear predictor, 'as distinct from the choice of response distribution or Link Function'; structure decisions are 'the focus of Variable Selection'.
- evidence: CAS Exam MAS-I Content Outline 2026, Domain C Task 2 (PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf): 'Select the appropriate model structure for an extended linear model given the behavior of the data set to be modeled (e.g., appropriate link function and distribution for the dependent variable for GLM)'. The outline's own example of model structure is the link and the distribution - what the page says model structure is distinct from. CAS Exam MAS-II Content Outline 2026, Domain B (PDF p.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf): 'the structure of linear mixed models, including how to accommodate models with correlated observations or models where the variance is either not assumed to be constant or a function of the mean', and Task B4 names 'the linear mixed model structure and variable selection' as two things, against the page's equation of structure with variable selection. Both exam pages that link this concept (MAS-I task 11; MAS-II domain B and task 6) quote the outline's sense. The page's narrower 'terms in the linear predictor' sense exists in general usage, but it contradicts the usage of the exams that link the page.
- source_rank: 1
- proposed_action: Redefine to follow the CAS usage: model structure covers the response distribution and link (and, for LMMs, the random-effects/covariance structure) as well as the terms of the linear predictor, which become one component. Requires new prose - not applied.
- applied: false
- fingerprint: ee3ebd67660d

## [F-002] Example makes the decision depend on individual p-values of interaction dummies
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: example 'Comparing Two Candidate Model Structures', answer (line 29)
- claim: Model 2 (territory x vehicle age interaction) is preferred on AIC 'provided the interaction terms are also individually significant in the parameter estimate table'.
- evidence: Territory is categorical, so the interaction enters as one column per non-base territory. ISLR 2nd ed. §3.3.1 (printed p.86, PDF p.96, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf): 'the coefficients and their p-values do depend on the choice of dummy variable coding. Rather than rely on the individual coefficients, we can use an F-test to test H0: beta1 = beta2 = 0; this does not depend on the coding.' Goldburd, Khare, Tevet & Guller, CAS Monograph 5, 2nd ed. (2025 rev.) §2.4.3 'Choose Your Base Level Wisely!' (PDF pp.25-26, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf) shows the level p-values change when the base level changes. Requiring each interaction term to be individually significant therefore ties the decision to an arbitrary base level; the terms should be judged jointly - by the AIC comparison the example already made, or a nested F / likelihood-ratio test.
- source_rank: 2
- proposed_action: Replace the 'individually significant' proviso with a joint test of the interaction terms, or drop it (the AIC comparison already answers the question). Requires new prose - not applied.
- applied: false
- fingerprint: 07613556c6f6

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: low
- checks_run: definition diffed against the CAS MAS-I Task C2 and MAS-II Domain B wording (contradicts - F-001); linear predictor with interaction and squared term vs ISLR (3.31), (3.36); 'more terms always improve in-sample fit' vs ISLR §6.1.1 and Monograph 5 §6.2.2; nested-model comparison vs Monograph 5 §6.2.1; diagnostic plots vs outline Task C8; example AIC comparison re-read (4,085 < 4,102) and its proviso checked against ISLR §3.3.1 (F-002); links resolve; figure checked by its SVG title/labels only (waterfall of beta terms summing to eta), not rendered
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 2, 3, 5, 8, PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026, Domain B and task B4, PDF p.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.1-3.3.2 (printed pp.83-90, PDF pp.93-100); §6.1.1-6.1.3 (printed pp.227-235, PDF pp.235-243), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.4.3 base level PDF pp.25-26; §6.2.1-6.2.2 nested F-test and AIC/BIC PDF pp.75-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Verified with LOW confidence: the page's lead definition contradicts the CAS usage of 'model structure' (F-001, major) and the worked example's decision rule contradicts ISLR (F-002, major).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Lead redefined to the CAS usage: model structure is the specified form of an extended linear model - the response distribution, the link function and the terms of the linear predictor - and the formula block now shows all three (Y ~ chosen distribution, g(mu) = eta, eta = ...). Bullets restructured to match: distribution and link chosen from the behavior of the response (link to [[Model Selection]]); the choice of linear-predictor terms is the focus of [[Variable Selection]] (no longer equated with structure as a whole); new MAS-II bullet that an LMM's structure also covers correlated observations and non-constant variance, with structure and variable selection named as separate things; 'correct distribution and link but the wrong structure' reworded to 'wrong linear predictor', and the nested-ANOVA bullet to 'one's linear predictor nested within the other's'. Sources: CAS MAS-I Content Outline 2026 Domain C Task 2, PDF p.5 ('Select the appropriate model structure ... (e.g., appropriate link function and distribution for the dependent variable for GLM)'), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed; CAS MAS-II Content Outline 2026 Domain B and Task 4, PDF p.2 ('the structure of linear mixed models, including how to accommodate models with correlated observations or models where the variance is either not assumed to be constant ...'; 'evaluate the linear mixed model structure and variable selection'), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b; Dobson & Barnett 4th ed. §1.2, printed p.3 (PDF p.20 of the preview): step 1 of modelling is 'Specifying models in two parts: equations linking the response and explanatory variables, and the probability distribution of the response variable', sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Example answer: the proviso 'provided the interaction terms are also individually significant in the parameter estimate table' deleted. Replaced by: territory is categorical, so the interaction is a set of coefficients (at least one per non-base territory); judge them jointly - by the AIC comparison the example already makes, or a nested F-test of all of them at once - not one p-value at a time, because the individual coefficients and p-values change with the base territory and the joint test does not. Sources: ISLR 2nd ed. §3.3.1, printed p.86 (PDF p.96): 'the coefficients and their p-values do depend on the choice of dummy variable coding. Rather than rely on the individual coefficients, we can use an F-test to test H0: beta1 = beta2 = 0; this does not depend on the coding', sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f; CAS Monograph 5 §6.2.1 eq.17, PDF pp.75-76 (nested-model F-test of a 5-level rating territory adding 5 - 1 = 4 parameters, tested together), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757. AIC comparison re-read: 4,085 < 4,102.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: every edit re-read against its source: definition and formula block vs MAS-I Task C2 and Dobson §1.2 step 1; LMM bullet vs MAS-II Domain B and Task B4; diagnostic plots vs MAS-I Task C8; 'more terms always improve in-sample fit' vs Monograph 5 §6.2.1 (p.75) and ISLR p.235; AIC/BIC penalties vs ISLR §6.1.3 and Monograph 5 §6.2.2; nested analysis of deviance vs Monograph 5 §6.2.1-6.2.2 (F-test only for nested models); example re-read (4,085 < 4,102) and its joint-test wording vs ISLR p.86 and Monograph 5 eq.17; links resolve (incl. new [[Model Selection]], [[Linear Mixed Model]], [[Polynomial Regression]]); figure not re-checked (generated, out of scope)
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026, Domain B description and tasks 1-4, PDF p.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope, printed pp.2-3 (PDF pp.19-20), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.1 printed p.86 (PDF p.96); §3.3.2 printed p.89 (PDF p.99); §6.1.1-6.1.3 printed pp.227-234 (PDF pp.235-242), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.1 nested F-test PDF pp.75-76; §6.2.2 penalized measures PDF pp.76-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Resolve run: F-001 and F-002 fixed and closed. Medium: the nested-deviance comparison for GLMs rests on CAS Monograph 5 (rank 3; ISLR's F-test is for least squares); the example is the vault's own.
