---
target: Concepts/Hazard Rate.md
created: 2026-10-04
---

## [F-001] Worked example rounds S(5) = e^-0.1125 to 0.8935 instead of 0.8936
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: example 'Recovering the Survival Function from a Hazard Rate', answer
- claim: S(5) = e^{-0.1125} ≈ 0.8935
- evidence: Method is right: S(t) = exp(-∫_0^t μ(s) ds) (Slud §2.2 p.42, sha256:dccaca6b…; Siegrist, Distribution and Quantile Functions, Reliability, sha256:50c869a0…). Recomputed before reading the page's value: H(5) = ∫_0^5 (0.02 + 0.001t) dt = 0.10 + 0.0125 = 0.1125 (the page's H(5) is right); e^{-0.1125} = 0.8935973…, which is 0.8936 to four decimals. 0.8935 is a truncation, not a rounding. Rank 5 (recomputation) — it can falsify the stated digit; no source states this example.
- source_rank: 5
- proposed_action: Change 0.8935 to 0.8936 in the example's last line.
- applied: false
- fingerprint: 17277076530e

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Every formula and named result checked against Slud §2.2/§2.5 and Siegrist: μ = f/S = -(d/dt) ln S; S = exp(-∫_0^t μ); H(t) = ∫μ = -ln S (Slud p.39; Struppeck fn.3 names it the cumulative hazard); constant hazard <=> exponential (Slud p.42-43); Weibull shape >1 increasing, <1 decreasing (Slud p.42, as γ); increasing = aging, decreasing = burn-in / infant mortality (Slud p.43); Gompertz-Makeham μ_x = A + Bc^x (Slud p.44); synonyms force of mortality / failure rate / hazard (Slud p.39, Siegrist h(t), Struppeck λ(t)); μ_x notation (SOA LTAM notation note p.1). Both worked examples recomputed from scratch in Python before reading the stated answers: μ(t) = 0.10t agrees; S(5) differs in the 4th decimal (F-001). Figure (generated, scripts/figures_exam_mas_i.py hazard_rate) is a bathtub curve labelled infant / useful life / wear-out — consistent with Slud p.43. Links resolve. Exam usage: only Exam MAS-I (CAS) links the page (A4 and the Survival Models list); Exam P / ISLR / Dobson resource pages use 'hazard rate' in the same f/S sense, so no cross-exam sense conflict.
- sources_checked: Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §2.2 pp.37-44 (force of mortality: definition as limiting death rate, μ = f/S = -d/dx ln S, S = exp(-∫μ), exponential = constant force, Weibull shape γ>1 increasing / 0<γ<1 decreasing, aging vs burn-in/infant mortality, bathtub shape, Gompertz-Makeham A + Bc^x with Gompertz A = 0) and §2.5 pp.59-60, sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), 'Distribution and Quantile Functions', Reliability section, html sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html; Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), pp.10-11 and footnote 3 ('hazard rate when used to describe mortality is called the force of mortality'; λ(t); cumulative hazard; P&C risks have decreasing hazard rates), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; SOA, Notation and Terminology Used on Exam LTAM (version Aug 1, 2021), pp.1-2, sha256:ffcc9efd3c0a72edadf4b259703660e07515b313f6fd9ffa57e25d72b1d090f9 — https://www.soa.org/globalassets/assets/Files/Edu/2018/ltam-notation-note.pdf
- note: Medium: the A4 reading for hazard rates is Ross, Introduction to Probability Models (2026 outline; Struppeck p.10-11 says continuous-time survival and hazard are covered elsewhere in the syllabus), which is not freely available and was not read — its notation (the page offers h(t), λ(t), μ_x) was not checked against it. All claims are confirmed by rank-3 sources (Slud, Siegrist) and Struppeck. The parameter ranges A ≥ 0, B > 0, c > 1 on Gompertz-Makeham are not stated as constraints in Slud (which gives the form, A = 0 for Gompertz, c > 1 for increasing force and B > 0 for convexity); not a finding. Open: F-001 minor (rounding).
