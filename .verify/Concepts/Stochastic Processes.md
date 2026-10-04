---
target: Concepts/Stochastic Processes.md
created: 2026-10-04
---

## [F-001] Time series filed as an example of a counting process
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: bullet 3 (counting process)
- claim: A counting process N(t) records the number of events by time t; the Poisson Process is the central continuous-time example, and a Time Series is a common discrete-time example.
- evidence: Daniel (CAS study note, MAS-I reading) p.3 and Def. & Prop. 1.2(1) p.4: a counting process has N(0) = 0 and N(t) non-decreasing, taking only non-negative integer values (the number of events in (0, t]). Siegrist, Random ch.15 §1 (markov/General.html) classifies stochastic processes by time set (T = N discrete, [0, ∞) continuous) and state space. A time series of observations (the vault's own Time Series page: trend, seasonality, ACF of premium volumes) is a discrete-time stochastic process but is neither integer-valued nor non-decreasing, so as written the bullet makes it an example of a counting process. The Poisson-process half of the sentence is right.
- source_rank: 2
- proposed_action: Move the Time Series clause to the index-set bullet as an example of a discrete-time process, and leave the counting-process bullet with the Poisson process as its example.
- applied: false
- fingerprint: 64bbbcee08a2

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: definition, index set / state space, Markov property and P^n checked against Daniel and Siegrist; both examples recomputed before reading the answers (N(6) ~ Poi(24); (P²)_SP = 0.30); figure checked against its generator (three counting-process sample paths); 5 links + 1 embed resolve; $$ balanced; verify_check clean
- sources_checked: Daniel, "Poisson processes (and mixture distributions)", CAS Study Note (June 2008) — MAS-I syllabus reading, ch.1 §1.1 p.3 (a stochastic process is a collection of random variables N(t) indexed by t; counting processes), Def. & Prop. 1.2 p.4, Fact 1.25 p.13 (homogeneous increments Poisson with mean λh; stationary increments), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.15 §1 Introduction to General Markov Processes (time set T = N or [0,∞), state space S, Markov property), sha256:69b4f54fd8c976d8a7093b3bfb9e0b3e836aa60794d1ad262e55c9b4b27f043c — https://www.randomservices.org/random/markov/General.html; Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.15 §3 Discrete-Time Markov Chains (Markov property; Chapman-Kolmogorov, P_n = P^n), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 — https://www.randomservices.org/random/markov/Discrete.html; Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Poisson Distribution' (N has stationary, independent increments; N_t − N_s is Poisson r(t − s)), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Linked from Exam MAS-I only (Domain A). One minor finding: the counting-process bullet names Time Series as a discrete-time example of a counting process. Markov chains are on MAS-I via Ross §§4.1-4.8 (Ross not freely available; checked against Siegrist instead).
