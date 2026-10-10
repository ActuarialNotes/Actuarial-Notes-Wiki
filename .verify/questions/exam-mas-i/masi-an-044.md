---
target: questions/exam-mas-i/masi-an-044.md
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
- sources_checked: Siegrist, randomservices.org, ch.7 Estimators, consistency definition, sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html; Siegrist, randomservices.org, ch.6 The Law of Large Numbers, weak law of large numbers, Var(M_n) = sigma^2/n, sha256:8662dfc55683fa40c79a5d453a450730e2ba151716a20eb61a2db307c33f5e85 — https://www.randomservices.org/random/sample/LLN.html; CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: E (X1+X2 ignores n). Key E; P(|X1+X2-theta| > 0.1 theta) = 0.81 for the triangular distribution verified; B (sqrt(3 x mean of squares) -> theta), C, D consistent. Medium: Domain B's readings (Hogg, Tse) are commercial; facts confirmed against open rank-3 references (MAS-I precedent). LO Domain B.
