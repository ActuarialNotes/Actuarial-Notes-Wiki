---
target: questions/exam-mas-i/masi-an-009.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading answer/explanation; key compared with the blind answer; every distractor's arithmetic and rationale recomputed; option distinctness; explanation arithmetic line by line; wiki_link tags against what the question tests (all resolve; validate_content.py clean); learning_objective against the Exam MAS-I domain titles and the 2026 outline tasks; stated facts against the cited sources
- sources_checked: Huang, STAT 317 (U. Chicago, 2021) Lecture 11 slides, following Ross ch.5, slides 17-18 (5.4.3 conditional/mixed Poisson process: stationary increments; increments in general not independent), PDF pp.17-18, sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf; Mahler & Dean, "Credibility", ch.8 of Foundations of Casualty Actuarial Science (SOA study note C-21-01), 5.3 conjugate priors, Example 5.3.1 (observing claims raises, no claims lowers, the posterior mean (alpha+C)/(lambda+Y)), PDF pp.101-102, sha256:bccdb7968ae276e041bf7f6eb5aea3aea473f1dc7739bc64352419c8a6a0f3c5 — https://www.soa.org/globalassets/assets/files/edu/C-21-01.pdf; Daniel, "Poisson processes (and mixture distributions)", CAS Study Note (June 2008), MAS-I reading, Section 1.3.3 (an insurer models insured claims as Poisson with lambda varying randomly among insureds), PDF p.12, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: A. Key A. Explanation's B/C distinction (stationary but not independent increments) matches Huang's slides on Ross 5.4.3; the posterior shift matches Mahler & Dean's gamma-Poisson examples. Medium: rank-3 support for the Ross section. Tags tested; LO Domain A.
