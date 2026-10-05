---
target: Concepts/Link Function.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: definition (one-to-one/monotone, differentiable; g(mu) = eta; mu = g^-1(eta)) vs Rodriguez B.1.2; canonical link vs Rodriguez B.1.2 and Larsen; each table row (identity, log, logit, reciprocal, probit and their inverses) vs Rodriguez B.1.2, Larsen p.3, ISLR sec.4.6.3, Dobson sec.1.2; log link's positivity and multiplicative effect vs ISLR sec.4.6.2 and Monograph fn.1; example recomputed e^0.35 = 1.419 (42%); figure read; links resolve
- sources_checked: Rodriguez, GLM lecture notes (Princeton), App. B, sec.B.1.2 The Link Function (PDF pp.3-4), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, pp.2-3 (canonical link section and table: identity, logit, natural log, inverse); James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, secs.4.6.2-4.6.3 (log link for Poisson regression, nonnegative fitted values, link functions eta(mu) = mu, logit, log; printed pp.167-172, PDF pp.177-182); Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, sec.1.2 Scope (probit and logistic dose-response models, printed p.5, PDF p.22); Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.1.3 fn.1 (log link almost always used for a multiplicative rating plan, PDF p.16)
- note: No findings. Medium rather than high because the monotone/differentiable condition is confirmed by a rank-3 source (Rodriguez) only. Exam pages linking it: MAS-I, PCPA.
