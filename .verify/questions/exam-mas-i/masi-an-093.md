---
target: questions/exam-mas-i/masi-an-093.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: blind recomputation from the stem before reading answer/explanation; key compared with the blind answer; every distractor's arithmetic and rationale recomputed; option distinctness; explanation arithmetic line by line; wiki_link tags against what the question tests (all resolve; validate_content.py clean); learning_objective against the Exam MAS-I domain titles and the 2026 outline tasks; stated facts against the cited sources
- sources_checked: Goldburd, Khare & Tevet, Generalized Linear Models for Insurance Rating, CAS Monograph No. 5 (CAS syllabus reading for MAS-II, Exam 8 and PCPA), 2.6 exposure offset ln(exposure) for a claim count with varying term lengths, PDF p.28; 2.5 weights, average severity row weighted by claim count, PDF pp.26-27; 2.7.1 gamma severity, PDF p.29; Tweedie density with a point mass at 0, PDF p.34; 2.8 logistic regression, renewal as a binary target, logit link, PDF pp.35-36, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Larsen, "Generalized Linear Models", CAS Study Note (rev. June 2016), MAS-I reading, Tweedie distributions: 1 < p < 2 compound Poisson-gamma for data combining zeros with continuous positive values, PDF p.2, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; CAS Exam MAS-I Content Outline 2026, Domain C tasks 1-9 and readings (Dobson & Barnett, Hogg, James et al., Larsen), PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: a D, b C, c A, d B. Key matches all four; each part's example appears in Goldburd almost verbatim (renewal as a logistic target; exposure offset; claim-count weight). LO Domain C (C2).
