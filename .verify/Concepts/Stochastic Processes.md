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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: The Time Series clause moved out of the counting-process bullet into the index-set bullet, as an example of a discrete-time process: 'A [[Time Series]] — values of a variable recorded at equally spaced times — is a common discrete-time example'. The gloss is NIST/SEMATECH e-Handbook of Statistical Methods §6.4.1 ('Definition of Time Series: An ordered sequence of values of a variable at equally spaced time intervals'), sha256:e76d291b8e79f57b07668cfd26d9b4ab26eb2edc5312b191140a72825e8b9acc — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc41.htm; equally spaced times index a discrete time set (Siegrist, Random ch.15 §1: T = N is discrete time, sha256:69b4f54f…). The counting-process bullet now names only the Poisson process, which fits Daniel's definition (Def. & Prop. 1.2(1) p.4: N(0) = 0, N(t) non-decreasing, non-negative integer values; sha256:e345451e…). The edit was committed by an interrupted earlier attempt of this run (commit 1b3ae0d8) and was reviewed against these sources this session; no further change.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Re-read the whole page against Daniel pp.3-4, 13 and Siegrist (all four sources re-fetched; hashes equal those logged in run 8861). The edit (Time Series moved to the index-set bullet with a gloss) re-read against NIST §6.4.1 and Siegrist's discrete time set. Examples recomputed in Python: N(6) ~ Poi(4 × 6 = 24), mean = variance = 24; (P^2)_SP = 0.8(0.2) + 0.2(0.7) = 0.30 (full P^2 = [[0.70, 0.30], [0.45, 0.55]]). 5 links + 1 figure embed resolve (vault_links exact). verify_check clean.
- sources_checked: Daniel, "Poisson processes (and mixture distributions)", CAS Study Note (June 2008) — MAS-I syllabus reading, ch.1 §1.1 p.3 (a stochastic process is a collection of random variables N(t) indexed by t; counting processes), Def. & Prop. 1.2 p.4 (counting process: N(0) = 0, non-decreasing, non-negative integers; independent increments; increment Poisson with mean ∫λ), §1.4.1 Fact 1.25 p.13 (homogeneous: increment Poisson with mean λh, stationary increments), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), ch.15 §1 Introduction to General Markov Processes (time set T = N discrete or [0,∞) continuous; state space; Markov property), sha256:69b4f54fd8c976d8a7093b3bfb9e0b3e836aa60794d1ad262e55c9b4b27f043c — https://www.randomservices.org/random/markov/General.html; Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), ch.15 §3 Discrete-Time Markov Chains (Chapman-Kolmogorov; P_n = P^n), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 — https://www.randomservices.org/random/markov/Discrete.html; Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), ch.13 The Poisson Process, 'The Poisson Distribution' (stationary, independent increments), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html; NIST/SEMATECH e-Handbook of Statistical Methods, §6.4.1 Definitions, Applications and Techniques (time series = an ordered sequence of values of a variable at equally spaced time intervals), HTML fetched 2026-10-05, sha256:e76d291b8e79f57b07668cfd26d9b4ab26eb2edc5312b191140a72825e8b9acc — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc41.htm; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and readings (p.3), text references (p.6: Daniel A1-5; Ross 4.1-4.8, 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Resolve run: F-001 closed. Medium: the counting-process and Poisson-increment claims are confirmed by the MAS-I reading (Daniel, rank 2); the index set / state space / Markov property and the P^2 example rest on Siegrist (rank 3), since Ross §§4.1-4.8 (the reading for Markov chains) is not freely available. No open findings.
