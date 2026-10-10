---
target: questions/exam-mas-i/masi-an-034.md
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
- sources_checked: Siegrist, randomservices.org, ch.9 Tests in the Normal Model, power function of the right-tailed z test, sha256:fd7bc50171fc51310f41e9132005b66cdbbd31bf507a70a0246394b05a379ab2 — https://www.randomservices.org/random/hypothesis/Normal.html; CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: a c = 532.9, beta = Phi(-0.355) = 0.3613 -> B; b n >= ((1.645+1.282)120/40)^2 = 77.11 -> 78. Key B and 78; check values beta(77)=0.1003, beta(78)=0.0970 reproduced. Distractors 0.484, 0.639, 0.905 and 77/95/98 recomputed. Medium: Domain B's readings (Hogg, Tse) are commercial; facts confirmed against open rank-3 references (MAS-I precedent). LO Domain B.
