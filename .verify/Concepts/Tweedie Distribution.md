---
target: Concepts/Tweedie Distribution.md
created: 2026-10-04
---

## [F-001] Tweedie said to force frequency and severity to share the same relativities; the Monograph says they move in the same direction
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: bullet 2 (one-step pure premium), line 29
- claim: Fitted with a log link, it models pure premium in one step ... — convenient, but it forces frequency and severity to share the same relativities.
- evidence: Monograph 5 sec.2.7.3 (printed pp.24-25, PDF pp.34-35): with mu varying by record and phi, p constant, 'a Tweedie GLM contains the implicit assumption that frequency and severity "move in the same direction"'; sec.5.1.1 (p.44, PDF p.54) repeats it. Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; a PCPA syllabus reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf. It does not say the relativities are equal, and from the Monograph's own eqs 7-9 (mu = lambda*alpha*theta, p = (alpha+2)/(alpha+1), phi = lambda^(1-p)(alpha*theta)^(2-p)/(2-p)) they are not: solving with phi and p fixed gives lambda proportional to mu^(2-p) and alpha*theta to mu^(p-1), so a pure-premium relativity r splits into r^(2-p) on frequency and r^(p-1) on severity — equal only at p = 1.5. Recomputed for the page's own example (p = 1.6, relativity e^0.22 = 1.246): frequency 1.092, severity 1.141.
- source_rank: 3
- proposed_action: Replace 'share the same relativities' with the Monograph's 'move in the same direction' (a predictor that raises pure premium raises both components).
- applied: false
- fingerprint: a51c07401de5

## [F-002] How p is chosen and its typical range contradict Larsen and the Monograph
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: bullet 3 (power parameter), line 30
- claim: p is usually estimated by profile likelihood over a grid (typically 1.4-1.7 for personal lines) rather than fitted alongside beta.
- evidence: Larsen (MAS-I reading) p.2: 'In some software packages, one can specify the Tweedie distribution, which will in turn cause the software package to find the best value for the power, p, parameter when solving for the parameters (betas)', sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf. Monograph 5 sec.2.7.3 (pp.24-25, PDF pp.34-35) lists three ways: software estimating p 'as part of the model-fitting process'; testing candidate values against log-likelihood or cross-validation; or judgmental selection ('common choices being 1.6, 1.67 or 1.7'); and 'Values of p used in insurance modeling typically range between 1.5 and 1.8'. Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; a PCPA syllabus reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf. Neither source says grid profiling is the usual method, and the 1.4-1.7 'personal lines' range is in neither.
- source_rank: 2
- proposed_action: Transcribe the Monograph: p may be estimated by the software with the betas, chosen from candidate values by log-likelihood or cross-validation, or selected judgmentally (1.6, 1.67, 1.7); typical insurance range 1.5-1.8.
- applied: false
- fingerprint: e9eb046e3d8c

## [F-003] Tweedie deviance said to have no closed form
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: bullet 4 (dispersion and deviance), line 31
- claim: The Dispersion Parameter phi is estimated from the data, and the Deviance has no simple closed form — the density itself requires an infinite series, so model comparison leans on AIC and holdout error.
- evidence: scikit-learn 1.9.1 User Guide sec.3.4.6.9 'Mean Poisson, Gamma, and Tweedie deviances' gives the Tweedie deviance in closed form for general p: 2( max(y,0)^(2-p)/((1-p)(2-p)) - y*yhat^(1-p)/(1-p) + yhat^(2-p)/(2-p) ), sha256:7e740e140ba75771bb1c7de132babfd958c277b5529d187e7ba744e69729120c — https://scikit-learn.org/stable/modules/model_evaluation.html. Recomputed (rank 5): the closed form equals the definition 2*integral_mu^y (y-t)/t^p dt (1.4100036 both ways at y=3, mu=1.2, p=1.6). It is the density's normalising term that needs a series — and that is what AIC (a log-likelihood) needs, so the 'so model comparison leans on AIC' inference runs backwards. Monograph 5 sec.2.7.3 (p.25) chooses p by log-likelihood or cross-validation; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; a PCPA syllabus reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf.
- source_rank: 3
- proposed_action: Delete 'the Deviance has no simple closed form — ' and the 'so model comparison leans on AIC' inference, or state that the unit deviance is closed form while the density needs a series.
- applied: false
- fingerprint: 51ac14517671
