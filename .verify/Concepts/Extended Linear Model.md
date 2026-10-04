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
