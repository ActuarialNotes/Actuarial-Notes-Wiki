---
target: Concepts/Quasi-Likelihood.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: definition, no exponential-family assumption, name from a variation on the likelihood derivative equations, phi solved with beta: Larsen p.1; IRLS needs only mean and variance, MQLE optimality, phi<1 rare, phi cancels so beta-hat = Poisson MLE, Var(beta-hat)=phi(X'WX)^-1, phi-hat = Pearson X2/(n-p), SE x sqrt(phi-hat), caution that this assumes the systematic part is right, NB alternative: Rodriguez c4a sec.1; understated SEs/p-values and artificially complex models, t on n-p df, drop-in-deviance per df / phi-hat vs F: BMLR 4.9.1; F-statistic and ODP same estimates: Goldburd 6.2.1 and 2.7.2; both examples recomputed in python before reading answers (phi=2.90, SE=0.136, t=1.835 < 1.965, z=3.125; F=3.448 > 2.39) - all agree; 8 links resolve; no exam page links this page
- sources_checked: Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), 'Quasi-Likelihood' (p.1), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; Rodriguez, GLM lecture notes (Princeton), addendum 'Models for Count Data With Overdispersion' (rev. Oct 2022), sec.1 The Over-Dispersed Poisson Model (PDF pp.1-3), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf; Roback & Legler, Beyond Multiple Linear Regression (CRC 2021, open online edition), ch.4 Poisson Regression, sec.4.9.1 Dispersion Parameter Adjustment, sha256:55079c7b837d6207e55badacb0258e26d6c8f07ee731d11db0878b2d6a4982d4 — https://bookdown.org/roback/bookdown-BeyondMLR/ch-poissonreg.html; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.7.2 overdispersed Poisson (PDF p.31) and sec.6.2.1 Nested Models and the F-Test, eq.17 (PDF pp.74-76), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Clean pass at medium: the definition is confirmed by Larsen (rank 2); the dispersion formula, SE scaling and F test rest on rank-3 sources (Rodriguez, BMLR, Goldburd), which all agree.
