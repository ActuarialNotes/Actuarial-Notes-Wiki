---
target: questions/exam-mas-i/masi-an-074.md
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
- sources_checked: Frees et al., Loss Data Analytics (open text), ch.10 Insurance Portfolio Management (tails), 10.2.2 Definition 10.2 limiting ratio of survival functions; Example 10.2.4 Pareto heavier than Weibull; 10.2.1 Pareto tail heavier as alpha falls; lognormal has no MGF, sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html; CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.2.4.1 Pareto, A.3.2.3 Weibull, A.3.3.1 exponential, A.4.1.1 lognormal survival functions, PDF pp.10-13, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: DBCEA. Key DBCEA; log-survival values at 10^6 (-2,500, -200, -42.0, -18.5, -13.8) and the wrong entries ACEBD (by mean) and CAEBD (by S(10,000)) reproduced. Medium: Domain B's readings (Hogg, Tse) are commercial; facts confirmed against open rank-3 references (MAS-I precedent). LO Domain B.
