---
target: Concepts/Logistic Regression.md
created: 2026-10-04
---

## [F-001] Binomial overdispersion said not to be a scale to estimate; deviance-vs-df check stated without the grouped-data condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: bullet 2 (canonical link and dispersion), line 21
- claim: The logit is the canonical link for the binomial, and the Dispersion Parameter is fixed at phi = 1; a residual Deviance far above its degrees of freedom signals overdispersion or a missing term rather than a scale to estimate.
- evidence: Larsen, 'Generalized Linear Models', CAS Study Note (MAS-I reading) p.1: over-dispersion 'is also mentioned in the case of the Binomial distribution where the variance observed is larger than the variance calculated using the Binomial distribution formula as described in section 7.7' [of Dobson & Barnett], and 'Through the quasi-likelihood approach, one can solve for a constant of proportionality between the mean and variance at the same time one solves for the betas' — i.e. the remedy the syllabus reading names *is* a scale to estimate, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf. Rodriguez, GLM notes App. B sec.B.4.3 (PDF p.11): the binomial deviance has an asymptotic chi-square distribution 'for grouped data ... as n_i -> infinity for all i, and can be used as a goodness of fit test' — for ungrouped 0/1 responses comparing the residual deviance with its df is not a valid overdispersion check, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf. The first half of the bullet (logit canonical, phi = 1 for the binomial) is right: Larsen p.3 table; Rodriguez B.4.1.
- source_rank: 2
- proposed_action: Delete 'rather than a scale to estimate' (Larsen's quasi-likelihood remedy estimates one) and add the condition that the deviance-vs-df comparison applies to grouped binomial data.
- applied: false
- fingerprint: b3e2a9f64eff

## [F-002] Nominal (multinomial) and ordinal logistic regression missing — assigned in ISLR sec.4.3.5 and Dobson Ch.8, tested in the bank
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: major
- status: open
- locus: definition (line 14) and page scope — two-class model only
- claim: Logistic Regression is the Generalized Linear Model for a binary response: the outcome is modelled as binomial and the logit Link Function maps the probability pi in (0,1) onto the whole real line (the page gives only the two-class model pi = e^eta/(1+e^eta)).
- evidence: ISLR 2nd ed. sec.4.3.5 'Multinomial Logistic Regression' (printed p.140, PDF p.150 — inside MAS-I's assigned secs.4.1-4.4): 'it is possible to extend the two-class logistic regression approach to the setting of K > 2 classes. This extension is sometimes known as multinomial logistic regression', with a baseline class K: Pr(Y=k|x) = e^{eta_k}/(1 + sum_{l<K} e^{eta_l}) and log[Pr(Y=k)/Pr(Y=K)] = eta_k (eqs 4.10-4.12); James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. Dobson & Barnett 4th ed. sec.1.2 (printed p.5, PDF p.22 of the preview): 'Logistic regression has been generalized to include responses with more than two nominal categories (nominal, multinomial, polytomous or polychotomous logistic regression) or ordinal categories (ordinal logistic regression). These methods are discussed in Chapter 8' — printed contents (PDF pp.11-12): 8.3 Nominal logistic regression; 8.4 Ordinal logistic regression (cumulative logit, proportional odds, adjacent categories, continuation ratio); Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf. The 2026 MAS-I outline assigns Dobson Ch.1-9 (excl. 6.3.3, 6.7, 6.8, 7.9) and James secs.4.1-4.4 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf. Rodriguez ch.6 sec.6.2 'The Multinomial Logit Model' (PDF pp.3-5) gives the same baseline-category model, sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf. The bank tests it: questions/exam-mas-i/masi-2018f-028.md (CAS MAS-I Fall 2018 Q28), which links this page, gives baseline-category log-odds -0.535 (B) and -1.489 (C) against A and asks Pr(B). Recomputed (rank 5): the multinomial formula gives e^-0.535/(1+e^-0.535+e^-1.489) = 0.323; this page's only formula, e^eta/(1+e^eta), gives 0.369 — both happen to fall in option B (20-40%), so the page's method reaches the key by luck.
- source_rank: 2
- proposed_action: Add a section on nominal (multinomial, baseline-category) logistic regression — ISLR eqs 4.10-4.12 / Dobson sec.8.3 — and a note on ordinal logistic regression (cumulative logit / proportional odds, Dobson sec.8.4); widen the opening definition accordingly. Not auto-fixed: requires new prose.
- applied: false
- fingerprint: 80045d202d59

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: logit/inverse-logit and odds-ratio interpretation vs ISLR eqs 4.2-4.4; canonical link and phi = 1 vs Larsen p.3 and Rodriguez B.4.1; MLE/Fisher information vs Rodriguez B.2-B.3.1; pseudo-R2 and classification measures vs Rodriguez ch.3; separation vs ISLR p.141; OLS failure example vs ISLR sec.4.2 and Rodriguez B.4.1; worked example recomputed (eta 0.90, pi 0.711, OR 0.970); scope diffed against Dobson Ch.8 and ISLR sec.4.3.5; figure read; links resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.4.2 (OLS fitted values outside [0,1], printed p.132, PDF p.142); sec.4.3 eqs 4.2-4.4 (logit, odds, e^beta1, printed pp.134-135, PDF pp.144-145); sec.4.3.5 (printed p.140, PDF p.150); sec.4.4 (separation instability, printed p.141, PDF p.151); Rodriguez, GLM lecture notes (Princeton), App. B, secs.B.2, B.3.1, B.4.1 (binomial in exponential form, logit canonical, phi = 1, Fisher information) (PDF pp.4-9), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Rodriguez, GLM lecture notes (Princeton), ch.3 Logit Models for Binary Data, pseudo-R2 and classification-table passage (PDF p.50), sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf; Rodriguez, GLM lecture notes (Princeton), ch.6 Multinomial Response Models, sec.6.2 (PDF pp.3-5), sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf; Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, sec.1.2 Scope (printed p.5, PDF p.22) and printed contents Ch.7-8 (PDF pp.11-12); Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, pp.1, 3; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.1 target variables (renewal, fraud; PDF p.12)
- note: F-001 (major) confirmed and left open. New F-002 (major): no nominal/ordinal logistic regression although ISLR sec.4.3.5 and Dobson Ch.8 are assigned and masi-2018f-028 tests it. Linked by the MAS-I exam page only.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Bullet 2 rewritten: 'rather than a scale to estimate' deleted; the deviance-vs-df check is now stated for grouped data only ('With grouped data (y_i successes out of n_i trials) the residual Deviance is approximately chi^2_{n-p} as the group sizes n_i grow ... with individual 0/1 responses the deviance has no such distribution and this check does not apply'); added 'Overdispersion can be handled by quasi-likelihood, which estimates a scale factor between the mean and the variance alongside the coefficients'. Sources: Rodriguez, GLM notes ch.3 sec.3.2.2 Goodness of Fit Statistics (PDF p.11), sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf; Rodriguez App. B sec.B.4.3 (PDF p.11), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Larsen p.1 (binomial over-dispersion, Dobson sec.7.7; quasi-likelihood solves for a constant of proportionality between mean and variance with the betas), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Added a 'More than two categories' section (opening sentence now notes the extensions): nominal (multinomial) logistic regression with baseline category K, log[Pr(Y=k)/Pr(Y=K)] = eta_k and Pr(Y=k) = e^{eta_k}/(1 + sum e^{eta_l}), Pr(Y=K) = 1/(1 + sum e^{eta_l}), baseline choice changes coefficients not fitted probabilities, e^{beta_kj} as odds-vs-baseline factor (ISLR 2nd ed. sec.4.3.5 eqs.4.10-4.12, PDF p.150, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Rodriguez ch.6 sec.6.2.1, PDF pp.3-4, sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf); ordinal logistic regression as the proportional-odds cumulative-logit model logit(gamma_j) = theta_j + x'beta with the proportional-odds interpretation (Rodriguez ch.6 secs.6.5.2-6.5.3 eqs.6.18-6.25, PDF pp.15-19, same hash/URL); adjacent-categories and continuation-ratio logits named from Dobson & Barnett 4th ed. printed contents secs.8.3-8.4.4 (preview PDF p.11) and sec.1.2 Scope (PDF p.22), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf. Linked to the new Concepts/Multinomial Logistic Regression.md and Concepts/Ordinal Logistic Regression.md (both exist; notation matches).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: every edit re-read against its source: grouped-data condition for the deviance chi^2 vs Rodriguez 3.2.2 and B.4.3; quasi-likelihood scale vs Larsen p.1; multinomial (baseline-category) formulas and interpretation vs ISLR eqs.4.10-4.12 and Rodriguez 6.2.1; proportional-odds model vs Rodriguez 6.5.2-6.5.3; ordinal variants vs Dobson Ch.8 contents; notation matches the new Multinomial/Ordinal pages; worked example recomputed (eta 0.90, pi 0.711, OR 0.970); links resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), secs.4.2-4.3.5 (eqs.4.2-4.4, 4.10-4.12; PDF pp.142-150) and sec.4.4 (separation, PDF p.151), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), pp.1, 3, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, printed contents Ch.8 (PDF p.11) and sec.1.2 Scope (PDF p.22), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; Rodriguez, GLM lecture notes (Princeton), App. B secs.B.2-B.4.3 (PDF pp.4-11), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Rodriguez, GLM lecture notes (Princeton), ch.3 Logit Models for Binary Data, sec.3.2.2 (PDF p.11), sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf; Rodriguez, GLM lecture notes (Princeton), ch.6 Multinomial Response Models, secs.6.2.1, 6.5.2-6.5.3 (PDF pp.3-4, 15-19), sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf
- note: Resolve run: F-001 and F-002 (major) resolved. High: every substantive claim confirmed by ISLR/Larsen (MAS-I readings), with Rodriguez for the ordinal model.
