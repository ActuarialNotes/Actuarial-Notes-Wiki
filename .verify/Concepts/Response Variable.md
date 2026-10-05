---
target: Concepts/Response Variable.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: synonyms vs Dobson §1.2 and ISLR §2.1; g(E[Y]) = x'beta vs ISLR (4.42); Var = phi*V(mu) and claim-count weights vs Monograph 5 §2.5; V(mu) = mu, mu^2, mu^3 and Tweedie 1<p<2 vs Larsen p.2 and Monograph 5 §2.7; inverse Gaussian 'heavier tail' vs Monograph 5 ('sharper peak and a wider tail'); logistic and 0/1 linear fits outside [0,1] vs ISLR p.132; NB when deviance/df >> 1 vs STAT 504 L9 and Monograph 5; E[ln Y] vs ln E[Y] by Jensen (derivation only); both examples recomputed (pi0 = 0.1824, pi1 = 0.3318, OR = e^0.8 = 2.2255, ratio 1.819); links resolve; no figure
- sources_checked: Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018), publisher eBook preview, §1.2 Scope (printed pp.2-3, PDF pp.19-20), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; Larsen, 'Generalized Linear Models', CAS Study Note (rev. June 2016), PDF p.2 (Tweedie variance powers p = 0, 1, (1,2), 2, 3), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §2.1 (printed p.15, PDF p.26); §4.2 (printed p.132, PDF p.142); §4.3 logistic; §4.6.3 GLMs (printed p.170, PDF p.180), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.5 weights and Var[y] = phi*V(mu) PDF pp.26-27; §2.6 offsets; §2.7 gamma, inverse Gaussian, ODP/negative binomial, Tweedie PDF pp.29-33, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Penn State STAT 504, Lesson 9 'Poisson Regression', SAS output for the horseshoe-crab width model (Full Log Likelihood -461.5881, AIC 927.1762, AICC 927.2468, BIC 933.4828; n = 173, 2 parameters), sha256:f8021fab7a1c8cfeb2de7ebfe3b5d1977a32671dd3acefc9ade531369c5da506 — https://online.stat.psu.edu/stat504/Lesson09
- note: Verified, medium: no findings; the severity/pure-premium practice claims rest on CAS Monograph 5 (rank 3), the variance powers also on Larsen (rank 2).
