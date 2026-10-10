---
target: questions/exam-mas-i/masi-an-003.md
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
- sources_checked: Daniel, "Poisson processes (and mixture distributions)", CAS Study Note (June 2008), MAS-I reading, Def. & Properties 1.1 (Poisson pmf), PDF p.4; Fact 1.15 (sum of independent Poisson processes is Poisson, rates add), PDF p.9; Fact 1.25 (mean = rate x length), PDF p.13, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: exposure 50(0.5)+150(0.5)=100 vehicle-years, mean 12, P(N=10)=e^-12 12^10/10! = 0.104837 -> 0.1048; key 0.1048. Wrong entries recomputed: Poisson(18) 0.014985 -> 0.0150, Poisson(24) 0.00066 -> 0.0007, Poisson(6) 0.041303 -> 0.0413. Tags incl. Poisson Superposition tested; LO Domain A.
