---
target: Concepts/Exponential Family.md
created: 2026-10-04
---

## [F-001] Tweedie canonical link given as log; the canonical link is the power link mu^(1-p)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: critical
- status: open
- locus: table, Tweedie (1<p<2) row, 'Canonical link' column, line 30
- claim: | Tweedie ($1<p<2$) | $\mu^{p}$ | $\ln\mu$ | Pure premium | — i.e. the canonical link of the Tweedie with 1<p<2 is ln(mu).
- evidence: statmod reference manual (G. Smyth), tweedie() help page: 'link.power: index of power link function. link.power=0 produces a log-link. Defaults to the canonical link, which is 1-var.power' and 'The canonical link for each Tweedie family is link.power = 1 - var.power' (link = mu^link.power; 0 = log), sha256:108779ab82400727c502d80a56cecb547895e7fc6dc51acbe105183e529d191a — https://search.r-project.org/CRAN/refmans/statmod/html/tweedie.html. For 1<p<2 the canonical link power 1-p lies in (-1,0), so g(mu) is proportional to mu^(1-p); log (power 0) is canonical only at p=1, the Poisson. The same rule reproduces the page's own Poisson (0 -> log), Gamma (-1 -> 1/mu) and inverse Gaussian (-2 -> mu^-2) rows, so the Tweedie row is the one that breaks it. Recomputation (rank 5, consistent): theta = integral of dmu/V(mu) = mu^(1-p)/(1-p) for V(mu)=mu^p. The log link is what is used in practice (Monograph 5 sec.2.1.3 fn.1, printed p.6 / PDF p.16: 'the log link is almost always used'; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; a PCPA syllabus reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf) — the page already marks that distinction for the Gamma row ('-1/mu (log in practice)') but not here. A student asked for the canonical link of a Tweedie GLM would answer log from this table.
- source_rank: 3
- proposed_action: Change the cell to $\mu^{1-p}/(1-p)$ (power link $\mu^{1-p}$), optionally '(log in practice)' as the Gamma row does.
- applied: false
- fingerprint: f95468eb8dde

## [F-002] Membership said to guarantee IRLS convergence and the deviance's chi-square theory
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: bullet 'Membership is what guarantees...', line 33
- claim: Membership is what guarantees the GLM machinery works: iteratively reweighted least squares converges, the Deviance has its chi^2 theory, and the Fisher Information has a closed form.
- evidence: Rodriguez, 'Models for Count Data With Overdispersion' (2013, rev. 2022) sec.1 (PDF pp.1-2): IRLS 'depends only on the mean and variance of the observations' — quasi-likelihood fits the same algorithm without a full exponential-family distribution, sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf; Larsen (MAS-I reading) p.1 likewise uses quasi-likelihood 'when the assumption that a distribution follows the exponential family is not supported', sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf. Convergence is not guaranteed by membership: ISLR 2nd ed. sec.4.4 (printed p.141, PDF p.151): 'When there is substantial separation between the two classes, the parameter estimates for the logistic regression model are surprisingly unstable' (the vault's own Logistic Regression page says a coefficient goes to infinity), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. The chi-square theory is asymptotic and, for binomial data, needs grouped data with n_i -> infinity (Rodriguez, GLM notes App. B sec.B.4.3, PDF p.11, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf).
- source_rank: 3
- proposed_action: Soften to what the sources say: membership lets every GLM be fitted by the same IRLS / Fisher-scoring algorithm with information X'WX/phi (Rodriguez App. B secs.B.2, B.3.1), with the deviance's chi-square distribution an asymptotic approximation; drop 'guarantees ... converges'.
- applied: false
- fingerprint: 024697ad7e89
