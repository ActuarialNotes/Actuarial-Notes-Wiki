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
