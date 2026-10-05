---
target: Concepts/Generalized Additive Model.md
created: 2026-10-05
---

## [F-001] Partial residual in the backfitting example drops the intercept without saying so
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: Fitting bullet (partial residual) and example 'Sizing a Natural-Spline GAM and a Backfitting Step', part (b)
- claim: The page gives the partial residual for X3 as r_i = y_i − f1(x_i1) − f2(x_i2). In example (b), for a model written severity = β0 + f1 + f2 + f3 + ε, it computes the residual used to update f2 as y − f̂1 − f̂3 = 42.0 − 3.5 − (−1.5) = 40.0, with no β̂0 subtracted and no remark about the intercept.
- evidence: ISLR2 §7.7.1 footnote 6 (printed p.309, PDF p.317) gives exactly the page's form: 'A partial residual for X3, for example, has the form ri = yi − f1(xi1) − f2(xi2).' So the bullet transcribes the syllabus reading faithfully and is not wrong against it. The backfitting algorithm as usually stated also subtracts the intercept: Tibshirani, CMU 36-402 'Additive Models' notes §2.2 p.3 (sha256:008ff298d9d3c5103b58a5a417499e745348c6ead70fe96cdfa601f9ebf10d18) sets β̂0 = ȳ and builds the jth partial residual y − β̂0 − Σ_{ℓ≠j} r̂ℓ, under the identifiability convention E[rj(Xj)] = 0. Under that convention the example's partial residual is 40.0 − β̂0, not 40.0. The stem writes β0 into the model but gives no value for it, and the answer drops it silently. Arithmetic re-run: 42.0 − 3.5 + 1.5 = 40.0, correct under ISLR's form. This is a convention difference between a rank-2 and a rank-3 source (ISLR's footnote leaves the intercept inside the residual for the smoother to absorb), not a contradiction about a fact. It is logged so that a reader who meets a question supplying β̂0 knows to subtract it.
- source_rank: 3
- proposed_action: Keep ISLR's footnote form as the syllabus statement. Add one clause saying that ISLR's form leaves the intercept in the residual, and that the backfitting algorithm also subtracts β̂0 = ȳ (with each f̂j centred). In example (b), either say the intercept is absorbed into the smoothing-spline term, or give β̂0 and subtract it. This is authoring, so it is not applied.
- applied: false
- fingerprint: 1ed34d3b405a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Checked against ISLR2 §7.7 text read this session: (7.15) model and additivity, quantitative and qualitative responses, logistic GAM (7.18) with the same pros and cons, building blocks (natural/smoothing splines, local regression, polynomial, step functions, any combination), qualitative predictors as dummies, linear term (7.19), natural-spline GAM as one big regression, smoothing splines by backfitting, partial residual (footnote 6), small differences between smoothing-spline and natural-spline GAMs, the four pros, the additivity limitation with Xj x Xk and f_jk terms, random forests and boosting, 'useful compromise'. Both examples recomputed in python before reading the answers: logits -1.35 and -2.20, p = 0.206 and 0.100, OR = e^0.85 = 2.34; 1 + 4 + 5 + 3 = 13 coefficients; partial residual 42.0 - 3.5 + 1.5 = 40.0 under ISLR's footnote-6 form. The intercept convention is logged as F-001 (minor), against Tibshirani's backfitting algorithm (rank 3). 12 links resolve; LaTeX balanced.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.7 'Generalized Additive Models', eqs (7.15)-(7.19), footnote 6 and Figs 7.11-7.13, printed pp.306-311 (PDF pp.314-319), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Tibshirani, R., 'Additive Models' lecture notes, Advanced Methods for Data Analysis (CMU 36-402/36-608, Spring 2014), §2.1-2.2 pp.2-3 (additive model, identifiability E[rj(Xj)] = 0, backfitting with beta0-hat = ybar and partial residual y - beta0-hat - sum over l != j of rl-hat), sha256:008ff298d9d3c5103b58a5a417499e745348c6ead70fe96cdfa601f9ebf10d18 — https://www.stat.cmu.edu/~ryantibs/advmethods/notes/addmodels.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Verified against the syllabus reading. One minor finding is open: F-001, the partial residual's intercept convention, ISLR footnote 6 vs the standard backfitting algorithm.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Fitting bullet: ISLR's partial residual kept as the syllabus statement ('ISLR writes the partial residual as r_i = y_i − f1(x_i1) − f2(x_i2), which leaves the intercept in the residual' — ISLR §7.7 footnote 6, printed p.309, PDF p.317) and one sentence added: 'The backfitting algorithm as usually stated first sets beta0-hat = ybar and subtracts it too, r_i = y_i − beta0-hat − sum_{l≠j} f_l-hat(x_il), then centres each updated f_j-hat to mean zero' (Tibshirani, CMU 36-402 'Additive Models' §2.2, PDF p.3, sha256:008ff298…10d18, re-fetched and hash re-confirmed). Example (b): stem now gives the mean severity ybar = 30.0 and asks for both forms; answer keeps 42.0 − 3.5 − (−1.5) = 40.0 as ISLR's form, states that it leaves the intercept in, and adds the usual-algorithm value 40.0 − 30.0 = 10.0, with the refit f2 re-centred to mean zero. Recomputed in python: 40.0 and 10.0.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: Edited bullet and example (b) re-read against ISLR footnote 6 (PDF p.317, exact wording) and Tibshirani §2.2 backfitting loop (PDF p.3: beta0-hat = ybar, partial residual, smooth, centre). Examples re-run in python: logits -1.35 / -2.20, p = 0.2059 / 0.0998 (0.206 / 0.100), OR e^0.85 = 2.3396 (2.34); 1 + 4 + 5 + 3 = 13; partial residuals 40.0 (ISLR form) and 10.0 (intercept subtracted). Unchanged claims checked in C-001 against ISLR §7.7; f_jk / random forests / 'useful compromise' re-read on PDF p.318. All 12 wiki-links resolve. F-001 closed; no open findings.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.7 'Generalized Additive Models' — backfitting and footnote 6 'A partial residual for X3, for example, has the form ri = yi − f1(xi1) − f2(xi2)', printed p.309 (PDF p.317); §7.7.1 pros/cons and f_jk, printed p.310 (PDF p.318), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Tibshirani, R., 'Additive Models' lecture notes, Advanced Methods for Data Analysis (CMU 36-402/36-608, Spring 2014), §2.1 identifiability E(Y) = beta0, E[rj(Xj)] = 0 (PDF p.2); §2.2 backfitting: beta0-hat = ybar, jth partial residual y − beta0-hat − sum over l≠j of rl-hat, smooth, then centre rj-hat; different smoothers allowed per variable (PDF p.3), sha256:008ff298d9d3c5103b58a5a417499e745348c6ead70fe96cdfa601f9ebf10d18 — https://www.stat.cmu.edu/~ryantibs/advmethods/notes/addmodels.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: High: every substantive claim is from ISLR §7.7 (a MAS-I syllabus reading); the one rank-3 addition (Tibshirani's backfitting convention) is labelled as the usual algorithm's convention, beside ISLR's own form, not as a replacement for it.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Same checks as the preceding pass of this run (edits re-read against ISLR footnote 6 PDF p.317 and Tibshirani §2.2 PDF p.3; examples re-run: 0.206 / 0.100 / 2.34 / 13 / 40.0 / 10.0; links resolve).
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.7 'Generalized Additive Models' — backfitting and footnote 6 'A partial residual for X3, for example, has the form ri = yi − f1(xi1) − f2(xi2)', printed p.309 (PDF p.317); §7.7.1 pros/cons and f_jk, printed p.310 (PDF p.318), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Tibshirani, R., 'Additive Models' lecture notes, Advanced Methods for Data Analysis (CMU 36-402/36-608, Spring 2014), §2.1 identifiability E(Y) = beta0, E[rj(Xj)] = 0 (PDF p.2); §2.2 backfitting: beta0-hat = ybar, jth partial residual y − beta0-hat − sum over l≠j of rl-hat, smooth, then centre rj-hat; different smoothers allowed per variable (PDF p.3), sha256:008ff298d9d3c5103b58a5a417499e745348c6ead70fe96cdfa601f9ebf10d18 — https://www.stat.cmu.edu/~ryantibs/advmethods/notes/addmodels.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Supersedes the preceding pass's confidence: the new sentence on the usual backfitting convention (subtract beta0-hat = ybar, centre each f_j) and the 10.0 in example (b) rest on Tibshirani's notes (rank 3), so under the resolve policy this is medium, not high. No content change between the two passes.
