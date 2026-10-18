---
target: questions/exam-mas-ii/masii-an-003.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: blind recomputation in Python before reading the key; every distractor's stated reasoning reproduced; explanation worked line by line; wiki_link targets exist (spaces as +) and sit on Exam MAS-II (CAS).md; topic/learning_objective match the exam page domain; format per question-writer formats.md; validate_content.py clean
- sources_checked: Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.12 Credibility, printed pp.220-221 (PDF 232-233): Z = N/(N+K), K = EVPV/VHM, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Dean, Topics in Credibility Theory, SOA Construction and Evaluation of Actuarial Models Study Note (C-24-05), PDF pp.10-11: Bühlmann Z = N/(N+K), N the number of observations, sha256:6e31928104c195095960e92ec11de665106d1c11357b8bb5674410d377afc1b0 — https://www.soa.org/globalassets/assets/files/edu/c-24-05.pdf
- note: Recomputed: K = 12, Z = 4/16 = 0.25, 0.25(900) + 0.75(600) = 675, option C. Distractors: N=1 gives 623.1 (B); Z = N/K = 1/3 gives 700 (D); reversed 825 (E). Tse, the assigned Domain A reading, is a commercial book and was not reached; the formulas were checked against two CAS/SOA study notes (rank 3), whose notation differs from Tse's (Tse: k = mu_PV / sigma^2_HM) but not the substance.
