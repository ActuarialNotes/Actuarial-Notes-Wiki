---
target: questions/exam-mas-i/masi-an-096.md
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
- sources_checked: Goldburd, Khare & Tevet, Generalized Linear Models for Insurance Rating, CAS Monograph No. 5 (CAS syllabus reading for MAS-II, Exam 8 and PCPA), 2.4 categorical variables may be numeric, e.g. territory 1 to 8, PDF p.20, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (2021), CAS-hosted copy, MAS-I reading, 4.2: coding a qualitative variable with numbers implies an ordering and equal spacing, PDF p.141, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Larsen, "Generalized Linear Models", CAS Study Note (rev. June 2016), MAS-I reading, quasi-likelihood for overdispersion in Poisson regression, PDF p.1, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; CAS Exam MAS-I Content Outline 2026, Domain C tasks 1-9 and readings (Dobson & Barnett, Hogg, James et al., Larsen), PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: A. Key A. The printed R output was reproduced exactly by refitting the Poisson GLM by IRLS (intercept -2.67824, slope 0.02685, SE 0.06167/0.01833, z 1.465, p 0.143, deviances 67.620/65.472, AIC 107.03). Explanation's fitted range 0.0706-0.0786, saturated AIC 47.56, chi-square(4) 9.49 reproduced. LO Domain C (C4, C5).
