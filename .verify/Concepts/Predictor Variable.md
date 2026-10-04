---
target: Concepts/Predictor Variable.md
created: 2026-10-04
---

## [F-001] Calls dropping a collinear predictor 'a mistake'; ISLR gives it as a standard remedy
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: example 'How Collinearity Hides a Real Effect', answer, last sentence (line 49)
- claim: Dropping [vehicle value] on that basis is a mistake; combining the correlated variables or accepting the joint effect is the better response.
- evidence: ISLR 2nd ed. §3.3.3 'Collinearity' (printed pp.102-103, PDF pp.112-113, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf): 'When faced with the problem of collinearity, there are two simple solutions. The first is to drop one of the problematic variables from the regression. This can usually be done without much compromise to the regression fit, since the presence of collinearity implies that the information that this variable provides about the response is redundant ... The second solution is to combine the collinear variables together into a single predictor.' CAS Monograph 5 §2.9 (PDF pp.37-38, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf) also lists removing all but one of a correlated group first. The page's underlying point - a low t-statistic under collinearity is not evidence the effect is absent (ISLR p.102: collinearity reduces power) - is supported; calling the drop 'a mistake' contradicts the reading. The VIF arithmetic recomputes exactly (VIF 6.25, SE 0.10, t 3.75 -> 1.50).
- source_rank: 2
- proposed_action: Reword: the low t-statistic does not show the effect is absent; dropping one of the collinear predictors or combining them are the two standard remedies (ISLR §3.3.3). Authoring - not applied.
- applied: false
- fingerprint: ef891f4db29f

## [F-002] 'Covariate' given as a general synonym; Dobson & Barnett reserve it for quantitative predictors
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: lead sentence (line 14)
- claim: A predictor variable is also called an explanatory or independent variable, a covariate, a feature, or a rating variable.
- evidence: Dobson & Barnett 4th ed. §1.2 (printed p.2, PDF p.19 of the publisher preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf): 'A qualitative, explanatory variable is called a factor ... A quantitative explanatory variable is sometimes called a covariate.' ISLR §2.1 (printed p.15, PDF p.26, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf) gives 'predictors, independent variables, features, or sometimes just variables', without 'covariate'. General usage often treats covariate as any predictor, so this is a notation difference with the syllabus text, not an error.
- source_rank: 2
- proposed_action: Optionally note that Dobson & Barnett use 'covariate' for a quantitative predictor and 'factor' for a qualitative one. Not applied.
- applied: false
- fingerprint: 5c8b6f8f39e8

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: synonyms vs ISLR §2.1 and Dobson §1.2 (F-002 nit on 'covariate'); 'holding the other predictors fixed' vs ISLR p.72; k-1 indicators vs ISLR p.86; offset coefficient fixed at 1 vs Monograph 5 §2.6; control variable vs Monograph 5 §5.1; VIF = 1/(1 - R_j^2) vs ISLR p.102; 'independent is misleading' vs Dobson p.2; training vs test error vs ISLR §6.1; both examples recomputed (11 territory indicators; VIF 6.25, SE 0.10, t 3.75 -> 1.50) and the collinearity advice checked against ISLR §3.3.3 (F-001); links resolve; no figure
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §2.1 (printed p.15, PDF p.26); §3.2 (printed p.72, PDF p.82); §3.3.1 (printed pp.83-87); §3.3.3 collinearity/VIF (printed pp.99-103, PDF pp.109-113); §6.1 (printed pp.227-235), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018), publisher eBook preview, §1.2 Scope (printed p.2, PDF p.19), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 5-6, PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.6 offsets PDF pp.27-28; §2.9 multicollinearity/VIF PDF pp.37-38; §5.1 control variable PDF p.56, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Verified, medium: control-variable and offset claims rest on CAS Monograph 5 (rank 3); one minor (F-001) and one nit (F-002) open.
