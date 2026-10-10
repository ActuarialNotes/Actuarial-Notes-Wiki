---
target: questions/exam-mas-i/masi-an-015.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: blind recomputation from the stem before reading answer/explanation; key compared with the blind answer; every distractor's arithmetic and rationale recomputed; option distinctness; explanation arithmetic line by line; wiki_link tags against what the question tests (all resolve; validate_content.py clean); learning_objective against the Exam MAS-I domain titles and the 2026 outline tasks; stated facts against the cited sources
- sources_checked: Daniel, "Poisson processes (and mixture distributions)", CAS Study Note (June 2008), MAS-I reading, Def. & Properties 1.20 property 6 (C*Gamma is gamma with scale C theta), PDF p.11; Def. & Properties 1.21 (negative binomial pmf), PDF p.11; Example 1.24 (mixed Poisson over 2 years: 2 lambda gamma, mixture negative binomial r=alpha, beta=2 theta), PDF p.12, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), B.2.1.4 negative binomial pmf, PDF p.15, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: r=3, beta=0.2, P(N=1)=0.6/1.2^4=0.28935 -> D. Key D. Distractors recomputed: 0.0116, 0.1234, 0.2049, 0.3293/0.5787. Daniel's Example 1.24 is exactly this construction. LO Domain A.
