---
target: Concepts/Poisson Process.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: high
- checks_run: independent recomputation before reading answers: P(N(3) > 5) = 1 − 0.44568 = 0.5543 for Poi(6); thinning rate 10 × 0.30 = 3; every formula checked against Daniel (rank 2) and corroborated by Siegrist; figure checked against generator (λ = 4 path vs mean line λt, Exp gap marked); links and embed resolve; verify_check clean
- sources_checked: Daniel, "Poisson processes (and mixture distributions)", CAS Study Note (June 2008) — MAS-I syllabus reading, Def. & Prop. 1.1-1.2 p.4 (Poisson pmf, E = Var = Λ, independent increments), Fact 1.13 p.9 (thinning), Fact 1.15 pp.9-10 (sum of independent Poisson processes), Fact 1.25 p.13 (increment over length h is Poisson λh), Fact 1.26 p.13 (interevent times iid exponential mean 1/λ; nth event time Gamma α = n, θ = 1/λ), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Thinning and Superposition' (types p and 1 − p independent Poisson processes; combined process Poisson with summed rate), sha256:e07aab3aa8206236541466f57719dcdce9fdf7f1f21a9dd5357d89034cf623ba — https://www.randomservices.org/random/poisson/Splitting.html; Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Gamma Distribution' (T_n gamma shape n, rate r; E = n/r), sha256:bbea5da3e0577d07d2670905b5727657c25b044f8382e17cee3bdfdd723bbe16 — https://www.randomservices.org/random/poisson/Gamma.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Linked from Exam MAS-I only. No findings. Notation: the page uses Ross's notation (T_i interarrival times, S_n arrival times, Gamma 'shape n and rate λ'); Daniel writes V_j for interevent times and T_n for event times with Gamma(α = n, θ = 1/λ) - same distributions, not an error.
