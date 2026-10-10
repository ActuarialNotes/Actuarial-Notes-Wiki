---
target: questions/exam-mas-i/masi-an-017.md
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
- sources_checked: Ross, Introduction to Probability Models, Ch.4 Markov Chains (course-hosted copy, an edition earlier than the 11th-13th the outline lists), 4.6 Mean Time Spent in Transient States: S=(I-P_T)^-1, s_ij counts the starting period; making the states of A absorbing to get the time to enter A, printed pp.230-232 (PDF pp.46-48), sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: make Weak absorbing; m1 = 1.6/0.22 = 7.27 -> D. Key D; stem's 22.9% long-run Weak checked (pi = 0.3958, 0.3750, 0.2292). Distractors 4.37, 4.55, 6.27/6.36, 10 recomputed and each sits in its range. Ross 4.6's absorbing-set device is what the explanation uses. LO Domain A. Medium: Ross is commercial and the copy read is an earlier edition than the 2026 outline lists (MAS-I precedent).
