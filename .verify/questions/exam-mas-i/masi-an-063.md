---
target: questions/exam-mas-i/masi-an-063.md
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
- sources_checked: Siegrist, randomservices.org, ch.7 Best Unbiased Estimators, Cramer-Rao lower bound for an unbiased estimator of lambda(theta): [d lambda/d theta]^2 / E[L_2], sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html; CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.3.2.1 gamma density, PDF p.11, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: I(theta) = alpha/theta^2, bound alpha theta^2/n = 3(160,000)/25 = 19,200. Key 19200; wrong entries 2,133.33, 57,600, 480,000 recomputed. Medium: Domain B's readings (Hogg, Tse) are commercial; facts confirmed against open rank-3 references (MAS-I precedent). LO Domain B (B8).
