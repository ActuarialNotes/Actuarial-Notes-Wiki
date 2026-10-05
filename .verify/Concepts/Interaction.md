---
target: Concepts/Interaction.md
created: 2026-10-04
---

## [F-001] Omits the hierarchical principle (keep main effects with their interaction)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: body, bullet on testing interaction terms (line 21)
- claim: Interaction terms are tested for significance via the parameter estimate table or a nested-model ANOVA test; the page says nothing about the main effects when an interaction is kept.
- evidence: ISLR 2nd ed. §3.3.2 (printed p.89, PDF p.99, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf): 'The hierarchical principle states that if we include an interaction in a model, we should also include the main effects, even if the p-values associated with their coefficients are not significant ... X1 x X2 is typically correlated with X1 and X2, and so leaving them out tends to alter the meaning of the interaction.' The page directs readers to per-term significance in the parameter estimate table without this rule, so pruning by p-value could drop a main effect while keeping its interaction. Everything else on the page matches ISLR eqs (3.31)-(3.35) and Monograph 5 §5.6.
- source_rank: 2
- proposed_action: Add the hierarchical principle as a bullet. Requires new prose - not applied.
- applied: false
- fingerprint: 3bcaf827cc78

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: formula vs ISLR (3.31); beta3 interpretation vs ISLR (3.32)-(3.33) ('or vice-versa'); additivity when beta3 = 0 vs ISLR p.87; categorical x continuous = different slopes vs ISLR (3.35); hierarchical principle checked for (absent, F-001); example recomputed (-0.02 + 0.03 = 0.01); links resolve; figure checked by SVG title/labels only
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.2 Extensions of the Linear Model, 'Removing the Additive Assumption' (printed pp.87-90, PDF pp.97-100), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §5.6 Interactions PDF pp.65-67, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 5, PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Verified, medium: one minor omission open (F-001, hierarchical principle).

## [F-002] Per-term significance via the parameter estimate table offered without the multi-level caveat
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: minor
- status: open
- locus: body, bullet on testing interaction terms
- claim: Interaction terms are tested for significance via the parameter estimate table or a nested-model ANOVA (likelihood-ratio) test - with no caveat for an interaction that enters as several dummy coefficients.
- evidence: ISLR 2nd ed. §3.3.1, printed p.86 (PDF p.96, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf): 'the coefficients and their p-values do depend on the choice of dummy variable coding. Rather than rely on the individual coefficients, we can use an F-test to test H0: beta1 = beta2 = 0; this does not depend on the coding.' An interaction with a categorical predictor of more than two levels has one coefficient per non-base level, so judging it term by term from the parameter estimate table ties the decision to the base level. Found while resolving F-001; the same issue was a major finding on Concepts/Model Structure.md (F-002).
- source_rank: 2
- proposed_action: Say that an interaction with several coefficients is tested jointly with the nested-model test.
- applied: true
- fingerprint: 41f741bb29cf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Added a bullet stating the hierarchical principle: if an interaction is included, its main effects are included too even if their p-values are not significant, because x1 x x2 is typically correlated with x1 and x2 and leaving the main effects out tends to alter the meaning of the interaction. Source: ISLR 2nd ed. §3.3.2, printed p.89 (PDF p.99), 'The hierarchical principle states that if we include an interaction in a model, we should also include the main effects, even if the p-values associated with their coefficients are not significant ... X1 x X2 is typically correlated with X1 and X2, and so leaving them out tends to alter the meaning of the interaction', sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Testing bullet extended: an interaction with a categorical predictor of more than two levels has several coefficients; test them jointly with the nested-model test, since the individual coefficients and their p-values depend on which level is the base. Source: ISLR 2nd ed. §3.3.1, printed p.86 (PDF p.96), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Monograph 5 §6.2.1 eq.17, PDF pp.75-76 (a categorical variable with m levels adds m - 1 parameters, tested together by the nested F-test), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: new hierarchical-principle bullet and joint-test sentence re-read against ISLR pp.86 and 89; Table 3.9 / TV x radio interpretation re-read (slope of one predictor = beta1 + beta3 x other); categorical x continuous slopes and additivity when beta3 = 0 vs ISLR §3.3.2; interactions of categorical, ordinal and continuous predictors vs MAS-I Task C5; example recomputed (-0.02 + 0.03 = 0.01, sign reverses); links resolve; figure not re-checked (generated, out of scope)
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.1 printed p.86 (PDF p.96); §3.3.2 'Removing the Additive Assumption' printed pp.87-90 (PDF pp.97-100), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.1 nested F-test PDF pp.75-76, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Resolve run: F-001 fixed; F-002 found while resolving (the same per-dummy p-value issue as Model Structure F-002) and fixed. Medium: ISLR treats interactions in least squares; the GLM framing (link scale) rests on CAS Monograph 5 (rank 3), and the example is the vault's own.
