---
target: questions/exam-mas-i/masi-an-073.md
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
- sources_checked: CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.3.2.1 gamma M(t) = (1 - theta t)^-alpha for t < 1/theta (any alpha > 0); A.2.4.1 Pareto moments only for k < alpha; A.4.1.1 lognormal moments exp(k mu + k^2 sigma^2/2) for all k; A.4.1.4 single-parameter Pareto moments k < alpha; PDF pp.10-14, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Frees et al., Loss Data Analytics (open text), ch.10 Insurance Portfolio Management (tails), 10.2.1: the lognormal has all positive moments yet no moment generating function, sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html; CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: D. Key D confirmed by the rank-1 table's gamma MGF. Distractors A, B, E are confirmed by the table and LDA. Distractor C (Weibull tau=0.5 has no MGF) is only derived (e^{-sqrt(x/theta)} decays more slowly than e^{-tx}); no source read states it. Medium: Domain B's readings (Hogg, Tse) are commercial; facts confirmed against open rank-3 references (MAS-I precedent). LO Domain B.
