---
target: questions/exam-mas-i/masi-an-067.md
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
- sources_checked: Frees et al., Loss Data Analytics (open text), ch.4 Model Selection and Estimation, Kolmogorov-Smirnov statistic max(D+, D-) with |i/n - F*| and |F* - (i-1)/n|; Example 4.1.8 (F_n(x-) vs F_n(x)), sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: D = 0.5507 - 0.2 = 0.3507 -> C (exhaustive check over jumps incl. the tie at 800). Key C; distractors 0.105, 0.151, 0.384, 0.465 each reproduced by its stated error. Medium: Domain B's readings (Hogg, Tse) are commercial; facts confirmed against open rank-3 references (MAS-I precedent). LO Domain B.
