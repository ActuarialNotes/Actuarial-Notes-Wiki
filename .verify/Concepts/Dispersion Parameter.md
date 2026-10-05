---
target: Concepts/Dispersion Parameter.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Var = phi V(mu)/w vs Rodriguez B.1.1; Pearson estimator and its df vs Rodriguez c4a; phi for Normal/Poisson/binomial/Gamma vs Rodriguez B.1.1, B.4.1 and Monograph (gamma: phi = 1/alpha = CV^2 from eqs 5-6); phi leaves beta unchanged and scales SEs by sqrt(phi) vs Rodriguez B.2 and c4a; scaled deviance and the F test vs Rodriguez B.3.2; weights vs Monograph sec.2.6; both examples recomputed (2.50, 0.237, Wald 2.67 -> 1.69; CV 0.80, alpha 1.5625); figure read; links resolve
- sources_checked: Rodriguez, GLM lecture notes (Princeton), App. B, secs.B.1.1 (a_i(phi) = phi/p_i; var = phi b/p_i), B.2 (phi cancels in the IRLS estimate), B.3.1-B.3.2 (scaled deviance, F test with estimated phi) (PDF pp.2-7), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Rodriguez, GLM lecture notes (Princeton), Models for Count Data With Overdispersion, sec.1 (Pearson estimate phihat = chi2_p/(n-p), SEs times sqrt(phihat), beta unchanged) (PDF pp.1-2), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.6 (exposure as a weight reduces variance, PDF p.28); sec.2.7.1 (gamma variance), sec.2.7.2 (ODP, overdispersion from unexplained risk variation, PDF p.31), sec.2.7.3 eq.6 (gamma CV = 1/sqrt(alpha), PDF p.33); Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, p.1 (quasi-likelihood constant of proportionality between mean and variance)
- note: No findings. 'Correlated observations' as a cause of overdispersion (line 22) was not located in the sources read; the other two causes are Monograph sec.2.7.2. 'Pearson version generally preferred' matches Rodriguez c4a ('The standard approach relies on Pearson's chi^2'). Linked by the MAS-I exam page only.
