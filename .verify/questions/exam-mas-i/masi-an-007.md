---
target: questions/exam-mas-i/masi-an-007.md
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
- sources_checked: Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.4.3 (inflated per-loss variable with fixed d and u; coinsurance factor scales payment), 3.4.1 (ordinary deductible), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Tse, Nonlife Actuarial Models (Cambridge, 2009), publisher preview: table of contents, contents: 2.2 continuous severity distributions, 2.3 mixtures, 2.4 tail properties, 2.5 coverage modifications incl. 2.5.4 inflation, PDF pp.9-10 (contents only; text not read), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: C (I true: effective deductible d/1.1; II false: fixed limit dampens; III true: coinsurance proportional). Key C. Explanation's identities match Loss Data Analytics 3.4.3's inflation formula. Medium (Tse commercial; rank-3 support). Tags tested; LO Domain A.
