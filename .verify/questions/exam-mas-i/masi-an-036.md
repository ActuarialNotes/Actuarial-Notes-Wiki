---
target: questions/exam-mas-i/masi-an-036.md
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
- sources_checked: Siegrist, randomservices.org, ch.7 Estimators, bias, MSE = Var + bias^2; efficiency compares unbiased estimators, sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html; CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: a 0.81(2/9) + 0.01 = 0.19; b B (0.19 < 0.222); c relative efficiency only between unbiased estimators, compare by MSE. Key 0.19 and B; wrong entries 0.18, 0.22, 0.17 and the 1.23 ratio checked. Medium: Domain B's readings (Hogg, Tse) are commercial; facts confirmed against open rank-3 references (MAS-I precedent). LO Domain B (B8).
