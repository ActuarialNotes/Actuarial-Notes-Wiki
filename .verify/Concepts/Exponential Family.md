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

## [F-003] Link admissibility stated as 'maps the mean range onto the whole line'; the sources require a one-to-one differentiable link
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 'The canonical Link Function ...', line 32 (second clause)
- claim: ... but any link that maps the mean range onto the whole line is allowed — the log link is standard for insurance because it makes rating factors multiplicative
- evidence: Rodriguez GLM notes App. B sec.B.1.2 (PDF p.3): the link is 'a one-to-one continuous differentiable transformation g(mu_i)', with examples 'identity, log, reciprocal, logit and probit'; (PDF p.4) after the canonical pairings 'other combinations are also possible', sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf. Larsen p.2: 'While one can use a non-canonical link function ...', sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf. The page's criterion names neither condition (a non-monotone map onto the line would qualify) and, read as the rule, excludes links the same sources list for a mean whose range is (0, inf): the identity, and the reciprocal — the page's own Gamma row, -1/mu, maps (0, inf) onto (-inf, 0), not the whole line. The vault's Link Function page states 'monotone, differentiable'. The clause's second half is supported: Monograph 5 sec.2.1.3 fn.1 (printed p.6, PDF p.16): 'the desirability of a multiplicative rating plan trumps all other considerations, so the log link is almost always used'; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf.
- source_rank: 3
- proposed_action: Replace 'any link that maps the mean range onto the whole line is allowed' with 'any monotone (one-to-one), differentiable link may be used' (Rodriguez B.1.2).
- applied: false
- fingerprint: 0234a2a19e4b

## [C-001] Validation pass — disputed
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: disputed
- checks_run: density form, mean b'(theta), variance a(phi)b''(theta) = phi V(mu) with a = phi vs Rodriguez B.1.1; members vs Rodriguez B.1.1 and Larsen p.2; V(mu) column vs Larsen p.2 and Monograph; canonical links vs Larsen p.3 and Rodriguez B.1.2/B.4.1, Tweedie row recomputed theta = integral dmu/V(mu) (F-001 confirmed); sufficiency of the canonical link vs Rodriguez B.1.2; Poisson exponential-form example recomputed; figure read; links resolve
- sources_checked: Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, p.2 (Tweedie power-variance list, canonical link and unbiasedness) and p.3 (canonical link table; exponential-family form and table); Rodriguez, GLM lecture notes (Princeton), App. B, secs.B.1.1-B.3.2, B.4.1 (PDF pp.2-9), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Rodriguez, GLM lecture notes (Princeton), Models for Count Data With Overdispersion (2013, rev. 2022), sec.1 (PDF pp.1-2), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.1.3 fn.1 (PDF p.16); sec.2.7.1 (gamma V = mu^2, PDF p.29); sec.2.7.3 (Tweedie, PDF pp.32-35); statmod reference manual (G. Smyth), tweedie() help page: canonical link power = 1 - var.power, sha256:108779ab82400727c502d80a56cecb547895e7fc6dc51acbe105183e529d191a — https://search.r-project.org/CRAN/refmans/statmod/html/tweedie.html
- note: F-001 (critical — Tweedie canonical link given as log) is open and confirmed, so the page is disputed. F-002 (minor) confirmed. New F-003 (minor): link admissibility condition. The canonical link's X'y sufficient statistic is consistent with Rodriguez B.1.2 ('a minimal sufficient statistic for beta exists'), which does not write it out. Linked by the MAS-I exam page only.
