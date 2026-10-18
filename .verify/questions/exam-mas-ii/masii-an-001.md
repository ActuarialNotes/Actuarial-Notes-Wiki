---
target: questions/exam-mas-ii/masii-an-001.md
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
- sources_checked: Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.12 Credibility, printed pp.217-220 (PDF 229-232): full-credibility standard 1,082 claims at p=90%, k=5%; square-root rule Z = sqrt(n/1,082); worked example Z = sqrt(100/1,082) = 0.30, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Recomputed: frequency 480/25,000 = 0.0192; Z = sqrt(480/1,082) = 0.6661; 0.6661(0.0192) + 0.3339(0.0240) = 0.020802, option B. Distractors reproduce: linear Z 0.4436 gives 0.02187 (C); reversed weights 0.02240 (D). W&M Ch.12 states the standard in claims and the square-root rule exactly as used. Tse, the assigned Domain A reading, is a commercial book and was not reached; the formulas were checked against two CAS/SOA study notes (rank 3), whose notation differs from Tse's (Tse: k = mu_PV / sigma^2_HM) but not the substance.
