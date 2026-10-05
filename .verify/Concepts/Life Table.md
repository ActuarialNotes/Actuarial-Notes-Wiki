---
target: Concepts/Life Table.md
created: 2026-10-04
---

## [F-001] Complete expectation called approximate under UDD, where it is exact
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: bullet on curtate expectation
- claim: the complete expectation is approximately e̊_x ≈ e_x + 1/2 under a uniform-deaths assumption
- evidence: Struppeck ch.7 p.12 (sha256:8ea3f762…): 'If we assume that all deaths are uniformly distributed throughout the year, then we can get the complete expectation by adding 0.5 to the curtate expectation.' Slud §4.2 eq.(4.31) p.110 (sha256:dccaca6b…): complete = curtate + 1/2 holds 'exactly in the case (a) where failures are uniformly distributed within integer-age intervals', and only approximately under constant force. So under the stated assumption the relation is an identity, not an approximation. (Slud's notation is reversed — his e̊_x is the curtate expectation — a quirk of the source, not of the page.) Low consequence: the number a student computes is the same.
- source_rank: 2
- proposed_action: State it as e̊_x = e_x + 1/2 under UDD (approximate otherwise).
- applied: false
- fingerprint: 8a58701928e2

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Every formula checked: tpx = l_{x+t}/l_x, tqx = 1 - tpx, d_x = l_x - l_{x+1}, multiplication of survival probabilities, e_x = sum_{t>=1} tpx (Struppeck pp.4-5, p.12); t|qx = tpx q_{x+t} (Struppeck appendix Ex.2 'live to 60, then die in the next year'; deferred notation itself is standard, used in SOA MLC solution Q80 p.46); l_x = l_0 S(x), μ_x = -d/dx ln l_x (Slud p.38-39, p.59); UDD sqx = s qx and constant force spx = (px)^s for 0 <= s <= 1 (follow directly from Slud §3.2 (i) and (ii)); complete vs curtate (F-001). ILT (rank 1) spot-check: q_40 from l_40, l_41 = 0.0027812 vs tabulated 1000q_40 = 2.78. Both worked examples recomputed from scratch in Python and then compared with the page: q60 = 0.02, 2p60 = 0.95625, 2|q60 = 0.0275 (also = 2p60 x q62), e60 = 15,490/8,000 = 1.93625 (page 1.936) and +0.5 = 2.436 (page 2.44) — all agree. Figure (generated, life_table) plots l_x 8,000 / 7,840 / 7,650 / 7,430 / 7,170 with the drops as d_x — matches example 1. Links all resolve. Linked only by Exam MAS-I (CAS).
- sources_checked: Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.1-2 pp.1-5 (l_x, d_x = l_x - l_{x+1}, q_x = d_x/l_x, p_x, npx = l_{x+n}/l_x = p_x p_{x+1}...p_{x+n-1}, nqx = 1 - npx, radix), ch.6 p.10 (linear / exponential / hyperbolic interpolation), ch.7 p.12 (curtate expectation = sum of npx from n = 1; complete = curtate + 0.5 under uniform deaths), appendix p.13 (Ex.2: 10p50 x q60, a deferred death probability), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf; CAS Exam MAS-I Tables, Illustrative Life Table: Basic Functions and Single Benefit Premiums at i = 0.06, PDF p.4, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §2.2 pp.38-39 and §2.5 p.59 (S(x) = l_x/l_0, μ(x+t) = -(d/dt) ln l_{x+t}), §3.2 pp.62-65 (piecewise-uniform density: S(k+t) = S(k) - t f(k); piecewise-constant hazard: S(k+t) = S(k)e^{-tμ(k)}, p_k = e^{-μ(k)}), §4.2 p.110 eq.(4.31), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Medium rather than high: the life-table core is confirmed by Struppeck (rank 2) and the exam's ILT (rank 1), but the bridges to the continuous model (l_x = l_0 S(x), μ_x = -d/dx ln l_x) and the UDD / constant-force formulas are confirmed only by Slud (rank 3); Struppeck names linear and exponential interpolation but gives no formulas. Notation: Struppeck has no symbol for the deferred probability or for life expectancies; the page's t|qx, e_x (curtate) and e̊_x (complete) are the standard SOA usage. Open: F-001 nit.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Curtate-expectation bullet now reads 'if deaths are uniformly distributed within each year of age, the complete expectation is exactly e̊_x = e_x + 1/2 (under a constant force it is only an approximation, close when death rates are small)'; example 2's closing line now reads 'if deaths are uniform within each year, the complete expectation of life is 1.936 + 0.5 = 2.436 years' (was 'roughly … = 2.44'). Sources re-read this session: Struppeck ch.7 p.12 ('If we assume that all deaths are uniformly distributed throughout the year, then we can get the complete expectation by adding 0.5 to the curtate expectation', sha256:8ea3f762…); Slud §4.2 p.110, eq.(4.31): complete = curtate + 1/2 'exactly in the case (a) where failures are uniformly distributed within integer-age intervals or approximately in case (b) [constant force of mortality] when death rates are small' (sha256:dccaca6b…). Arithmetic: 15,490/8,000 = 1.93625, + 0.5 = 2.43625.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Re-read the two edits (curtate-expectation bullet; example 2's closing line) and the whole page. Both worked examples recomputed in Python: q60 = 160/8,000 = 0.02, 2p60 = 0.95625, 2|q60 = 220/8,000 = 0.0275, e60 = 15,490/8,000 = 1.93625 (page 1.936) and + 0.5 = 2.43625 (page 2.436). ILT spot check: q_40 = (9,313,166 - 9,287,264)/9,313,166 = 0.0027812 vs tabulated 1000q_40 = 2.78. UDD sq_x = s q_x and constant force sp_x = (p_x)^s follow from Slud p.110 (a) and (b) (p = e^{-μ}). Links ([[Survival Model]], [[Hazard Rate]], [[Whole Life Insurance]], [[Life Annuity]], [[Joint Life]], figure embed) resolve.
- sources_checked: Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.1-2 pp.3-5 (l_x, d_x = l_x - l_{x+1}, q_x = d_x/l_x, p_x = l_{x+1}/l_x, radix, npx = l_{x+n}/l_x = p_x p_{x+1}...p_{x+n-1}, nqx = 1 - npx), ch.6 p.10 (linear / exponential / hyperbolic interpolation), ch.7 p.12 (curtate expectation = Σ_{n>=1} npx; complete = curtate + 0.5 under uniform deaths), appendix p.13 (Ex.2, 10p50 × q60), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf; CAS Exam MAS-I Tables, Illustrative Life Table: Basic Functions and Single Benefit Premiums at i = 0.06, PDF p.4, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §1.1 pp.1-2 (S(x) = l_x/l_0), §2.2 pp.38-42 (f = -S', μ = -d/dx ln S), §4.2 p.110 cases (a) uniform failures and (b) constant force within integer ages, eq.(4.31) complete = curtate + 1/2 exactly under (a), approximately under (b), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6: Ross A1-A6, Struppeck A5-6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Resolve run: F-001 closed. Medium: the life-table core is confirmed by Struppeck (rank 2) and the ILT (rank 1), but the continuous bridges (l_x = l_0 S(x), μ_x = -d/dx ln l_x) and the UDD / constant-force formulas rest on Slud (rank 3) — Struppeck names the interpolations without formulas. No open findings.
