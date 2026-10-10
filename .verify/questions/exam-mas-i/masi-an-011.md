---
target: questions/exam-mas-i/masi-an-011.md
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
- sources_checked: Mahler & Dean, "Credibility", ch.8 of Foundations of Casualty Actuarial Science (SOA study note C-21-01), 4.2 Bayesian analysis, two-type example: posterior probability of each type = prior x likelihood / total, posterior mean frequency, PDF p.81, sha256:bccdb7968ae276e041bf7f6eb5aea3aea473f1dc7739bc64352419c8a6a0f3c5 — https://www.soa.org/globalassets/assets/files/edu/C-21-01.pdf; Daniel, "Poisson processes (and mixture distributions)", CAS Study Note (June 2008), MAS-I reading, Mixing Method, Fact 1.17 and Example 1.18 (Poisson with a discrete random mean), PDF pp.10-11, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: weights 0.8e^-0.2=0.65498, 0.2e^-1.2=0.06024; posterior mean 0.142112 -> 0.1421. Key 0.1421. Wrong entries recomputed: 0.2000, 0.1658 (one year, 0.165834), 0.1016 (unnormalised), 0.1235 ((1-lambda)^2). Medium: Bayesian updating rests on Mahler & Dean (not a MAS-I reading). LO Domain A.
