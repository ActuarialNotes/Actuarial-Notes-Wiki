---
target: Concepts/Coverage Modifications.md
created: 2026-10-04
---

## [C-001] Exam DISC-IA links this page in a different sense
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: exam usage
- note: Exam DISC-IA (CAS).md links this page as [[Coverage Modifications|Property Insurance Limits]] (line 52) and as the BPP [[Coverage Modifications|Limits of Insurance]] (line 91): the policy-form provisions of property insurance. This page is the loss-model sense the MAS-I page uses (Domain B Loss Models: deductible, maximum covered loss u, coinsurance share alpha, per-loss / per-payment variables). The two overlap on limits and deductibles but not on coinsurance: in a property form a coinsurance clause is the underinsurance penalty (see Concepts/Coinsurance.md), not the share alpha used here. Not corrected on this page; flagged for whoever maintains the DISC-IA page. Separately: the frequency bullet uses the Loss Models / Exam C parameterisation (negative binomial beta -> beta*v, binomial q -> q*v); Tse 2009 (the MAS-I reading, §2.5, not read - not freely available) may parameterise these distributions differently.

## [C-002] C-001 notation note confirmed against Tse
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: Frequency bullet
- note: Supersedes the "may parameterise differently" in C-001, now read in the Tse 2009 publisher preview (sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404, https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf): Tse writes BN(n, theta) and NB(r, theta) with theta the success probability (§1.3.1 eq 1.17, PDF p.25; §1.3.3 eq 1.29-1.32, PDF p.27-28). In that notation the binomial rule is theta -> theta*v (the page q -> q*v), but the negative binomial rule is not theta -> theta*v: beta = (1 - theta)/theta, so beta -> beta*v is theta -> theta/(theta + v(1 - theta)). The page writes beta, the Loss Models / Exam C parameter (SOA Exam C tables PDF p.15, Loss Data Analytics §5.5.2), so it is right as written; a notation difference only. The C-001 section reference is also confirmed: Tse contents (PDF p.10) list §2.5 Effects of coverage modifications, p.66-79, with §2.5.5 Effects of deductible on claim frequency.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Every displayed formula against LDA §3.4.1/§3.4.3 (Y^L, E[Y^L], E[Y^P], inflation by deflating the limits, max payment alpha(u-d)); franchise E[Y^L] = E[(X-d)+] + d S(d) from LDA franchise definition (Y^L = X 1{X>d}); LER against LDA §3.4.1 (equals E[X^d]/E[X]); frequency: Poisson thinning vs Tse Thm 1.2 and LDA §5.5.2, NB beta*v vs LDA §5.5.2, binomial q*v by LDA pgf rule applied to the Exam C binomial pgf; E[N^L]E[Y^L] = E[N^P]E[Y^P] vs LDA §5.5.3. Both examples recomputed in python before comparing: E[X^500] = 360, E[X^5000] = 918.367, E[Y^L] = 446.694, S(500) = 0.512, E[Y^P] = 872.45, E[N^P] = 0.1536, 134.01 both ways; inflated: 369.684, 997.299, 502.09 (same by the LDA deflation formula), S = 0.540974, E[Y^P] = 928.13, +12.4% per loss, +6.4% per payment, +5.66% (relative) more payments - all agree. [[Benefit Limit]] really does write u for the maximum payment (rank-4 consistency). 12 links resolve exact; no embeds.
- sources_checked: Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (Aug 2020, open textbook), Ch.3 Modeling Loss Severity: §3.4.1 Y^L, Y^P = Y^L | X > d, E(Y^P) = E(Y^L)/(1 - F(d)), LER = [E(X) - E(Y^L)]/E(X), franchise deductible; §3.4.3 Y^L = alpha[(X^u) - (X^d)], maximum payment alpha(u - d) with u the maximum covered loss, and E(Y^L) = alpha(1+r)[E(X^(u/(1+r))) - E(X^(d/(1+r)))], sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (Aug 2020), Ch.5 §5.5.2 P_{N^P}(z) = P_{N^L}(1 + v(z-1)), v = Pr(X > d): N^P ~ Poi(lambda v), NB(beta v, r); §5.5.3 E(S) = E(N^L)E(X^L) = E(N^P)E(X^P), sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html; SOA, Tables for Exam C (Fall 2009), Pareto F(x) and E[X^x] = theta/(alpha-1)[1 - (theta/(x+theta))^(alpha-1)] (PDF p.8); binomial P(z) = [1 + q(z-1)]^m and negative binomial P(z) = [1 - beta(z-1)]^(-r) (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview: contents §2.5 Effects of coverage modifications, p.66-79 (PDF p.10); Theorem 1.2 Poisson decomposition X_i ~ PN(lambda p_i) (PDF p.31); BN(n, theta) and NB(r, theta) parameterisation (PDF p.25, 27-28), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 5 (PDF p.4), Tse §§2.2-2.5 assigned (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: No errors found. Medium: the formulas rest on an open text and the SOA Exam C tables (rank 3); Tse §2.5, the MAS-I reading, is not in the publisher preview. Exam DISC-IA links this page in its property-form sense (see C-001); NB parameter is the Loss Models beta, not Tse theta (C-002, which is a correction to the C-001 note, not to the page).
