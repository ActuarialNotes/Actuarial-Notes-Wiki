---
target: Concepts/Extended Linear Model.md
created: 2026-10-04
---

## [F-001] Table says ordinary regression and GLMs are 'linear, additive' and only an ELM may have interactions or transformations
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: model-class table, 'Predictor effects' column and 'Extended linear model | Any | Any' row, lines 20-24
- claim: Ordinary regression | Normal | Identity | Linear, additive; GLM | Exponential family | Chosen to fit the data | Linear, additive; Extended linear model | Any | Any | May include interactions, transformations, banded variables.
- evidence: ISLR 2nd ed. sec.3.3.2 'Extensions of the Linear Model' (printed pp.87-91, PDF pp.97-101; MAS-I assigned): least-squares linear regression with an interaction term beta3*X1*X2 ('Removing the Additive Assumption') and with polynomial terms ('Non-linear Relationships'), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. Monograph 5 sec.5.4 (binning continuous predictors, polynomial terms, piecewise linear functions, natural cubic splines, printed pp.48-55, PDF pp.58-65) and sec.5.6 (interactions of categorical and continuous variables, printed pp.55-61) — all inside a GLM; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; a PCPA syllabus reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf. 'Linear' in both classes means linear in the coefficients, so the table's contrast in the 'Predictor effects' column is wrong for both of the first two rows. No source read defines an 'extended linear model' class with 'Any' response distribution and 'Any' link: the CAS MAS-I outline uses 'Extended Linear Models' as the Domain C heading over linear regression, GLMs and James Ch.1-7 (2026 outline PDF pp.5-6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf). The page's opening sentence ('go beyond ordinary least-squares') also sits awkwardly with its own bullet that OLS is a special case.
- source_rank: 2
- proposed_action: Drop the 'Predictor effects' contrast (all three admit interactions, transformations and banded variables — ISLR sec.3.3.2, Monograph secs.5.4/5.6) and the 'Any | Any' row, or replace the row with what the outline groups under the heading.
- applied: false
- fingerprint: 1d91d013eba9

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: F-001 re-confirmed against ISLR sec.3.3.2 and Monograph secs.5.4/5.6; formulas and 'OLS = Normal + identity' vs Rodriguez B.1.2; three modelling choices and comparison tools vs outline tasks 2, 5, 7, 8; Gamma/log severity and Poisson counts vs Monograph sec.2.7; figure (nested OLS within GLM within ELM) read; links and embed resolve
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; Dobson/James/Larsen citations PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.3.3.2 'Extensions of the Linear Model' (interaction and polynomial terms in least squares, printed pp.87-91, PDF pp.97-101); sec.4.6.3 (printed pp.170-172, PDF pp.180-182); Rodriguez, GLM lecture notes (Princeton), App. B, Generalized Linear Model Theory, secs.B.1.1-B.1.2 (PDF pp.2-4), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.1.3 fn.1 (PDF p.16); secs.2.7.1-2.7.2 (gamma for severity, Poisson for frequency, PDF pp.29-31); secs.5.4, 5.6 (PDF pp.58-71)
- note: F-001 (major) left open: the table's 'Predictor effects' contrast and 'Any | Any' row are not what the sources say. Everything else on the page is supported. Exam pages linking it: MAS-I, MAS-II.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Model-class table: 'Predictor effects' column and the 'Extended linear model | Any | Any' row deleted; a bullet under the table now says both ordinary regression and GLMs can include interactions, transformations such as polynomial terms and banded variables, 'linear' meaning linear in the coefficients (ISLR's own example, beta0 + beta1 x + beta2 x^2 'is still a linear model'). Opening sentence reworded from a class definition no source gives to what the outline says: 'Extended Linear Models is the name the CAS MAS-I outline gives its regression domain: ordinary linear regression and the models that extend it ...'. Sources: CAS Exam MAS-I Content Outline 2026, Domain C description and tasks 1-9 (PDF p.5), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; ISLR 2nd ed. sec.3.3.2 'Removing the Additive Assumption' and 'Non-linear Relationships' (PDF pp.97-102), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Monograph 5 secs.5.4 (binning, polynomial terms, piecewise linear, splines) and 5.6 (interactions) in a GLM, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: every edit re-read: opening sentence vs outline Domain C; table rows (Normal/identity; exponential family/chosen link) vs Rodriguez B.1.1-B.1.2; interactions/polynomial terms/banding in both classes vs ISLR 3.3.2 and Monograph 5.4/5.6; remaining bullets unchanged and as checked in phase 1; links and embed resolve
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C heading, description and tasks 1-9 (PDF p.5), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sec.3.3.2 (PDF pp.97-102), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Rodriguez, GLM lecture notes (Princeton), App. B secs.B.1.1-B.1.2 (PDF pp.2-4), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), secs.2.7.1-2.7.2 (PDF pp.29-31), secs.5.4, 5.6 (contents, PDF p.3), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Resolve run: F-001 (major) resolved. Medium: Gamma/Poisson guidance and the example rest on the rank-3 Monograph.

## [F-002] Uses the narrow 'linear predictor only' sense of Model Structure
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: minor
- status: open
- locus: opening sentence and bullet 'Building an extended linear model requires three choices'
- claim: Lists the response distribution, the link function and the Model Structure as three separate choices, with Model Structure glossed as '(which predictors, transformations, and interactions enter the linear predictor)'; the opening sentence likewise lists 'a flexible [[Model Structure]] for the linear predictor' beside the distribution and link.
- evidence: CAS Exam MAS-I Content Outline 2026, Domain C Task 2 (PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf): 'Select the appropriate model structure for an extended linear model given the behavior of the data set to be modeled (e.g., appropriate link function and distribution for the dependent variable for GLM)' - the outline's example of model structure is the link and the distribution, which the page sets beside it as separate choices. Dobson & Barnett 4th ed. §1.2 printed p.3 (preview PDF p.20, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a): step 1 of modelling is 'Specifying models in two parts: equations linking the response and explanatory variables, and the probability distribution of the response variable'. Concepts/Model Structure.md was rewritten in this run (its F-001) to the CAS sense - distribution, link and linear-predictor terms - so the linked page now contradicts this page's gloss of it.
- source_rank: 1
- proposed_action: Make Model Structure the umbrella: the response distribution, the link function and the linear predictor are its three parts; drop the Model Structure link from the opening sentence's list.
- applied: true
- fingerprint: eb269556b034

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Opening sentence: 'and a flexible [[Model Structure]] for the linear predictor' -> 'and a more flexible linear predictor'. Bullet rewritten: 'Building an extended linear model means choosing its Model Structure, which has three parts: the response distribution, the Link Function, and the linear predictor (which predictors, transformations, and interactions enter it). The MAS-I outline's own example of choosing a GLM's model structure is choosing its link function and the distribution of the dependent variable.' Sources re-read this session: CAS Exam MAS-I Content Outline 2026, Domain C Task 2, PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed; Dobson & Barnett 4th ed. §1.2 printed p.3 (preview PDF p.20; model specified in two parts: equations linking response and explanatory variables, and the response distribution), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a; Rodriguez GLM notes App. B §§B.1.1-B.1.2 (exponential-family distribution, link g(mu_i) = eta_i, linear predictor eta_i = x_i'beta), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286. Now consistent with Concepts/Model Structure.md as rewritten this run.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Re-read both edits and the whole page. Model Structure usage checked against MAS-I outline Task C2 and Dobson §1.2 step 1, and against Concepts/Model Structure.md as rewritten this run (distribution, link, linear-predictor terms) - now consistent. Table rows and OLS = Normal + identity vs Rodriguez B.1.1-B.1.2; interactions/polynomial terms in both classes vs ISLR §3.3.2 and Monograph §§5.4/5.6; comparison tools vs outline tasks 3, 7, 8; gamma/log severity and Poisson counts, and positivity of the log-link model, vs Monograph §§2.1.2, 2.7.1-2.7.2. Links ([[Model Structure]], [[Link Function]], [[Generalized Linear Model]], [[Interaction]], [[Deviance]], [[AIC]], [[BIC]], [[Residual Plot]]) and the figure embed resolve; figure (generated) not re-reviewed.
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C heading, description and tasks 1-9 (Task 2: model structure, e.g. link function and distribution of the dependent variable for GLM; tasks 3, 7, 8: evaluation, AIC/BIC/deviance, diagnostic plots), PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope, printed pp.2-3 (PDF pp.19-20): modelling step 1, specifying models in two parts; linear regression a special case of GLMs, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), §3.3.2 Extensions of the Linear Model: interaction term (3.31), quadratic term (3.36) 'still a linear model', PDF pp.97-102, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Rodriguez, GLM lecture notes (Princeton), App. B §§B.1.1-B.1.2: exponential-family response, link g(mu_i) = eta_i, linear predictor eta_i = x_i'beta, standard linear model = normal errors with identity link, PDF pp.2-4, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), §2.1.2-2.1.3 log link gives a multiplicative structure and guarantees positive premium, gamma severity example (PDF pp.14-15); §2.7.1-2.7.2 gamma for severity, Poisson for frequency (PDF pp.29-31); contents §§5.4 (binning, polynomial terms, piecewise linear, splines) and 5.6 interactions (PDF p.6), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Resolve run: F-002 (narrow sense of Model Structure) found, fixed and closed in this run. Medium, not high: the severity/frequency guidance and the example rest on CAS Monograph 5 (rank 3), and the example is the vault's own. No open findings.
