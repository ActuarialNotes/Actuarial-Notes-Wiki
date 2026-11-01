---
target: Concepts/Variable Transformation.md
created: 2026-10-31
---

## [F-001] 'In a GLM the response is not transformed' contradicts the readings
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- severity: major
- status: open
- locus: lead, second sentence
- claim: In a Generalized Linear Model the response is not transformed - the link and the error distribution handle its scale - so transformation is about the predictors.
- evidence: Goldburd et al., CAS Monograph 5, §5.1.3 'Transforming the Target Variable' (printed p.45) says 'it may also be necessary or beneficial to transform the target variable in some way prior to modeling', e.g. capping large losses in pure premium, loss ratio or severity models; and ISLR §3.3.3 (PDF p.106) transforms the response with log Y or sqrt Y for non-constant variance in the linear model SRM tests under 2e 'Variable transformations'. Stated as a rule, the sentence would tell an SRM candidate that response transformations are not a thing. Deleted (transcription: removing a clause the source contradicts).
- source_rank: 2
- proposed_action: Delete the sentence.
- applied: true
- fingerprint: e8cac99c12e2

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Deleted in this run.

## [F-002] Capping predictors and standardizing-for-interactions unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- severity: minor
- status: open
- locus: body, Capping / standardizing bullet
- claim: Capping extreme predictor values before fitting stops a handful of points from driving the fit; standardizing helps when interactions or penalties are used.
- evidence: No source read states either. Goldburd §5.1.3 caps the target (large losses), not predictors; ISLR §6.2.1 (printed p.239) advises standardizing the predictors before ridge regression 'so that they are all on the same scale', but says nothing of interactions. The capping clause was cut and the standardizing clause restated to ISLR's ridge advice. Notation: ISLR's (6.6) divides by the standard deviation without centring; the page's (x - xbar)/s_x centres too - noted, not changed.
- source_rank: 2
- proposed_action: Cut the capping clause; restate standardizing to ISLR §6.2.1.
- applied: true
- fingerprint: 76cd13e46ac4

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Capping clause and the [[Outlier]] / [[Interaction]] links cut; bullet now 'Before a penalized fit such as ridge regression, standardizing ... puts predictors on a common scale' (the MAS-II answerability quote is kept intact).

## [F-003] Page omits transformations of the response
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- severity: minor
- status: open
- locus: whole page (definition and bullets)
- claim: The page defines a variable transformation only as a transformation of a predictor.
- evidence: SRM outcome 2e lists 'Variable transformations and interactions' under model selection for OLS and GLMs; ISLR §3.3.3 transforms the response (log Y, sqrt Y) and Frees Ch.1 §1.3 is 'Power Transforms' (publisher's printed contents, p.vii); Goldburd §5.1.3 transforms the target. After F-001's deletion the page is no longer wrong about this, but a candidate studying it will not meet response transformations. New prose needed - not authored here.
- source_rank: 2
- proposed_action: A writer adds a bullet on transforming the response (log Y, sqrt Y for non-constant variance; capping losses), from ISLR §3.3.3 and Goldburd §5.1.3, checked by a different agent.
- applied: false
- fingerprint: 106534a4d5e0

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Read every link (all resolve). Log transform and power-curve interpretation against Goldburd §2.4.1 (its AOI example, coefficient 0.62, 2^0.62); binning, polynomial and hinge bullets against Goldburd §5.4.2-5.4.4 (variation within bins ignored, polynomials erratic at the edges, max(0, x - c)); detection by residual plots against Goldburd §5.4.1 (partial residual plots) and ISLR §3.3.3; the U-shaped driver-age example against Goldburd p.12. Major F-001 (response 'not transformed') deleted; minor F-002 (capping predictors, standardizing for interactions) cut/restated; minor F-003 (no response transformations) left open for a writer. Examples recomputed (rank 5): 2^0.6 = 1.516, 1.5^0.6 = 1.275. Edits avoid the passages the MAS-I and MAS-II answerability records quote.
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.4.1 printed pp.11-12 (logging continuous predictors in a log-link model; coefficient as a power; AOI example; driver-age U shape); §5.1.3 printed p.45; §5.4-5.4.4 printed pp.48-54 (binning, polynomial terms erratic at the edges, hinge functions, partial residual plots), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021; CAS-hosted copy), §3.3.3 PDF pp.104-106 (non-linearity seen in residual plots, transform the predictors with log X, sqrt X, X^2; transform the response with log Y or sqrt Y); §6.2.1 printed p.239 (standardize before ridge), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; SOA, Exam SRM syllabus, January 2027, outcome 2e, p.3, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf
