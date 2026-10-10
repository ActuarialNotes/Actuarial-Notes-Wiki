---
target: questions/exam-mas-i/masi-an-075.md
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
- sources_checked: CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.3.3.1 exponential E[X^x] = theta(1 - e^{-x/theta}), PDF p.12, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.4.3 Y^L = alpha[(X^u) - (X^d)]; inflation E(Y^L) = alpha(1+r)[E(X^u/(1+r)) - E(X^d/(1+r))]; 3.4.1 E(Y^P) = E(Y^L)/S(d), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Tse, Nonlife Actuarial Models (Cambridge, 2009), publisher preview: table of contents, contents: 2.2 continuous severity distributions, 2.3 mixtures, 2.4 tail properties, 2.5 coverage modifications incl. 2.5.4 inflation, PDF pp.9-10 (contents only; text not read), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: a 546.76 -> 547, b 702.05 -> 702, c 603.33 -> 603. Key matches all parts; intermediates 934.603 and 203.297 and the 10.3% increase checked; wrong entries 729, 584, 2,472, 601, 548, 596 recomputed. Medium: Domain B's readings (Hogg, Tse) are commercial; facts confirmed against open rank-3 references (MAS-I precedent). LO Domain B.
