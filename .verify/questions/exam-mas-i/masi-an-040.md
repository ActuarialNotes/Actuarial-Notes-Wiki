---
target: questions/exam-mas-i/masi-an-040.md
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
- sources_checked: Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.4.1 E(Y^L) = integral of the survival function, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Siegrist, randomservices.org, ch.3 Mixed Distributions, mixed distributions, sha256:f19d040000526541dd0d61b1e33827f8c81d7cf638ec9ff87e76af9dc8dcc566 — https://www.randomservices.org/random/dist/Mixed.html; CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: E[Y] = integral_0^1000 (0.8 - 0.0005y) dy = 550. Key 550; point-mass route 0 + 250 + 300 agrees; wrong entries 250, 500, 450 recomputed. Medium: Domain B's readings (Hogg, Tse) are commercial; facts confirmed against open rank-3 references (MAS-I precedent). LO Domain B.
