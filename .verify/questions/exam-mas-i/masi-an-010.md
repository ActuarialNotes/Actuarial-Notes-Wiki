---
target: questions/exam-mas-i/masi-an-010.md
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
- sources_checked: Daniel, "Poisson processes (and mixture distributions)", CAS Study Note (June 2008), MAS-I reading, iterated expectation and conditional variance formula Var = E[Var|B] + Var(E|B), PDF p.7; Def. & Properties 1.1 (Poisson mean = variance), PDF p.4; Example 1.24 (mixed Poisson process count over t years is Poisson with mean t*lambda given lambda), PDF p.12, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; Huang, STAT 317 (U. Chicago, 2021) Lecture 11 slides, following Ross ch.5, slide 18 (mixed Poisson process: increments not independent), PDF p.18, sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf; CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: a Var = E[2L]+Var(2L) = 0.40+0.24 = 0.64; b C (Model I gives 0.20/0.40, Model II 0.26/0.52, Model III 0.26/0.64). Key 0.64 and C. Wrong entries 0.52 and 0.58 recomputed. Every step uses Daniel's conditional-variance formula. Tags tested; LO Domain A.
