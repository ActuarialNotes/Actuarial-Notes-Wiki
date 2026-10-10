---
target: questions/exam-mas-i/masi-an-005.md
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
- sources_checked: CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.2.4.1 Pareto: F(x), E[X^x] = theta/(alpha-1)[1-(theta/(x+theta))^(alpha-1)], PDF p.10, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.3.2 (scale distributions: multiplying by a constant changes only the scale parameter; inflation), 3.4.3 (Y^L = (X^u) - (X^d); inflation with fixed d and u), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Tse, Nonlife Actuarial Models (Cambridge, 2009), publisher preview: table of contents, contents: 2.2 continuous severity distributions, 2.3 mixtures, 2.4 tail properties, 2.5 coverage modifications incl. 2.5.4 inflation, PDF pp.9-10 (contents only; text not read), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: a 918 (1000(1-(2/7)^2)=918.37), b 363 (918.37-555.56), c 417 (theta=2,200: 997.30-580.08=417.22). Key matches all three. Wrong entries recomputed: 1000, 977 (power alpha), 382 (cap 6,000), 1224 (per payment, 362.81/0.29630), 399, 363. Stem LEV formula matches the CAS MAS-I tables (rank 1). Medium because the coverage-modification framework rests on Loss Data Analytics (rank 3); Tse is commercial. LO Domain A (A3).
