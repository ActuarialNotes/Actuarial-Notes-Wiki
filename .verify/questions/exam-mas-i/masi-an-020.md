---
target: questions/exam-mas-i/masi-an-020.md
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
- sources_checked: Ross, Introduction to Probability Models, Ch.4 Markov Chains (course-hosted copy, an edition earlier than the 11th-13th the outline lists), Example 4.7 Bonus Malus system: s_i(k) and P_ij = sum over k with s_i(k)=j of e^-lambda lambda^k/k!, printed pp.188-189 (PDF pp.4-5); Proposition 4.3 and Example 4.23 average annual premium = sum pi_j x premium_j, printed pp.215-217 (PDF pp.31-33), sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: stationary pi = (0.65698, 0.22985, 0.11317), average premium 356.94 -> B. Key B. Distractors recomputed by solving their chains: A 348.70 (two-plus rule ignored), C 360.76 (0.7/0.3 with no two-plus), D 396.96 (every claim to level 3), E 433.33. Construction follows Ross Example 4.7/4.23. LO Domain A. Medium: Ross is commercial and the copy read is an earlier edition than the 2026 outline lists (MAS-I precedent).
