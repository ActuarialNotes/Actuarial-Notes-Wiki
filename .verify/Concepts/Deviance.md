---
target: Concepts/Deviance.md
created: 2026-10-04
---

## [F-001] Deviance and scaled deviance on mixed conventions — D* = D/phi divides the page's own D by phi twice
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: critical
- status: open
- locus: formula block (lines 16-18) with bullets on RSS (line 21), scaled deviance (line 23) and analysis of deviance (line 24)
- claim: D = -2[l(fitted model) - l(saturated model)]; for a Normal linear model deviance equals RSS = sum(y - yhat)^2; scaled deviance D* = D/phi ~ chi^2_{n-p}; Delta D = D_reduced - D_full ~ chi^2_{Delta p}.
- evidence: Monograph 5 sec.6.1.2 (printed p.63, PDF p.73), eq.15: *scaled* deviance D* = 2 x (ll_saturated - ll_model); 'Multiplying the scaled deviance by the estimated dispersion parameter phi yields the unscaled deviance'; fn.12: 'some (e.g., Dobson & Barnett) use the term "deviance" to refer to the measure presented here as "scaled deviance," and use "scaled deviance" to refer to that measure multiplied by the estimated dispersion parameter'. Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; a PCPA syllabus reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf. Rodriguez, GLM notes App. B sec.B.3.2 eqs B.11-B.13 (PDF pp.6-7): -2 log lambda = D(y,muhat)/phi is the scaled deviance, the Normal deviance D is the residual sum of squares, and nested models are compared by (D(w1) - D(w2))/phi ~ chi^2 (an F when phi is estimated), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Monograph eq.17 (p.65) likewise tests (D_S - D_B)/(#added x phihat_B) on unscaled D. ISLR 2nd ed. sec.6.1.1 (printed p.228, PDF p.236) uses a third convention, 'negative two times the maximized log-likelihood'. So the page's defining formula is the Monograph's/Rodriguez's *scaled* deviance (Dobson & Barnett's 'deviance'), while its RSS bullet and D* = D/phi treat D as *unscaled*. Under every one of these conventions, D* = D/phi applied to the page's D divides by phi twice. Worked check (rank 5): a gamma model with l_sat - l_model = 50 and phi = 0.5 has scaled deviance 100 and unscaled 50 (Monograph eq.15); the page gives D = 100 and D* = 200. For a Normal model the page's own formula gives RSS/sigma^2, not RSS. With phi = 1 (Poisson, binomial — the page's worked example) all versions coincide, which is why the example still works. This is also a terminology conflict between sources (Dobson & Barnett vs Monograph/McCullagh-Nelder) that the page should flag rather than resolve.
- source_rank: 3
- proposed_action: State one convention and keep it: e.g. (Monograph / McCullagh-Nelder) scaled D* = 2(l_sat - l_model) with log-likelihoods at the fitted phi; unscaled D = phi x D*; Normal unscaled D = RSS (scaled RSS/sigma^2); nested test on Delta D/phi ~ chi^2, or the F statistic with phihat when phi is estimated. Add a note that Dobson & Barnett (MAS-I reading) call 2(l_sat - l_model) the 'deviance' (Monograph fn.12) and ISLR uses -2 x log-likelihood. Not auto-fixed: sources use conflicting names.
- applied: false
- fingerprint: b27483224987

## [C-001] Analysis-of-deviance bullet re-checked — covered by F-001
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- locus: bullet 'Analysis of Deviance', line 24
- note: Re-checked at the coordinator's request. F-001's claim already includes this line, and the re-check confirms it: with D unscaled (as the page's RSS bullet and D* = D/phi use it) the nested-model statistic is (D_reduced - D_full)/phi, asymptotically chi^2 on p2 - p1 df, and with phi estimated it is the F statistic [(D_S - D_B)/#added]/phihat_B on (#added, n - p_B) df — Rodriguez GLM notes App. B sec.B.3.2 eq.B.13 and its Normal example (PDF p.7), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Monograph 5 sec.6.2 eq.17 (printed p.65, PDF p.75), 'the symbol D refers to the unscaled deviance', Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf. Under the page's own defining formula (the scaled deviance) the chi^2 statement holds only when phi is known. The bullet states neither, so a resolution of F-001 has to fix line 24 as well as line 23. The worked example is unaffected (Poisson, phi = 1): Delta D = 14.4 > chi^2_{0.95,2} = 5.991, p = 0.00075.

## [C-002] Validation pass — disputed
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: disputed
- checks_run: saturated-model definition, non-negativity and D = 0 at the saturated model vs Monograph sec.6.1.2; Poisson deviance formula vs Rodriguez sec.4.2.2 and the scikit-learn Tweedie p = 1 case; Normal deviance = RSS (unscaled) vs Rodriguez B.3.2; scaled deviance and nested tests vs Rodriguez B.13 and Monograph eq.17 (F-001 confirmed, analysis-of-deviance line included — see comment); example recomputed (14.4 > 5.991); figure read; links resolve
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.6.1.2 eqs 15-16 and fn.12 (scaled vs unscaled deviance; Dobson & Barnett's opposite naming), printed pp.63-64, PDF pp.73-74; sec.6.2 eq.17 F-test on unscaled deviance, printed p.65, PDF p.75; Rodriguez, GLM lecture notes (Princeton), App. B, sec.B.3.2 Likelihood Ratio Tests and The Deviance (eqs B.11-B.13; Normal deviance = RSS) (PDF pp.6-7), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Rodriguez, GLM lecture notes (Princeton), ch.4 sec.4.2.2 Poisson deviance and its chi^2 on n-p df (PDF pp.7-8), sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.6.1.1 (deviance as -2 x maximized log-likelihood, printed p.228, PDF p.236)
- note: F-001 (critical — scaled/unscaled conventions mixed, D* = D/phi divides the page's own D by phi twice, Delta D ~ chi^2 stated without /phi or the F alternative) confirmed and open, so the page is disputed; it is also a naming conflict between sources (Dobson & Barnett vs Monograph/McCullagh-Nelder) the page should flag. Exam pages linking it: MAS-I, PCPA.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: One convention throughout (McCullagh & Nelder / CAS Monograph 5 / Rodriguez): defining formula is now the scaled deviance D* = 2[l_sat - l(beta_hat)], with the unscaled deviance D = phi D* (D* = D/phi) on its own line; RSS bullet now reads 'the unscaled deviance is the RSS, so D* = RSS/sigma^2'; the old 'D* = D/phi ~ chi^2_{n-p}' bullet folded into the Poisson bullet (phi = 1, D ~ chi^2_{n-p} in large samples); analysis-of-deviance bullet now (D_reduced - D_full)/phi ~ chi^2_{Delta p} with phi known, and F = (D_reduced - D_full)/(Delta p phihat_full) on (Delta p, n - p_full) df with phi estimated; a naming bullet flags Dobson & Barnett's reversed names and ISLR's -2 log-likelihood; the example says Poisson phi = 1 (recomputed: chi^2_{0.95,2} = 5.991, p = 0.00075). Sources: Goldburd et al., CAS Monograph 5, 2nd ed., sec.6.1.2 eqs.15-16, fn.12 (PDF p.73) and sec.6.2.1 eq.17 (PDF p.75), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Rodriguez, GLM notes App. B sec.B.3.2 eqs.B.11-B.13 and the Normal examples (PDF pp.6-7), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Rodriguez ch.4 sec.4.2.2 (PDF pp.7-8), sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf; ISLR 2nd ed. sec.6.1.1 (PDF p.236), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. The naming difference between sources is flagged on the page rather than resolved.
