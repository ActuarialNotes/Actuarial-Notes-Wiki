---
target: questions/exam-mas-i/masi-an-045.md
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
- sources_checked: CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.2.4.3 loglogistic F(x) = u, u = (x/theta)^gamma/(1+(x/theta)^gamma), PDF p.10, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Frees et al., Loss Data Analytics (open text), ch.4 Model Selection and Estimation, 4.1.1.3 smoothed empirical quantile with j = floor((n+1)q); 4.1.3.2 percentile matching incl. a loglogistic example, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: positions 2.5 and 7.5 give 170 and 965; gamma = ln 9 / ln(965/170) = 1.2654 -> 1.27. Key 1.27; wrong entries 1.67 (210/780), 1.39 (150/725 at ng), 0.79 recomputed; theta-hat 405.0 checked. Stem CDF matches the CAS tables. Medium: percentile-matching method from Loss Data Analytics (Tse commercial). LO Domain B.
