---
target: questions/exam-mas-ii/masii-an-004.md
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
- sources_checked: Dean, Topics in Credibility Theory, SOA Construction and Evaluation of Actuarial Models Study Note (C-24-05), §1.2 Bühlmann-Straub Model, PDF pp.11-16: exposure m_t (e.g. number of insured vehicles), process variance sigma^2/m_t; 'The total exposure m replaces N in the Bühlmann formula', Z = m/(m+K); worked example p.16, sha256:6e31928104c195095960e92ec11de665106d1c11357b8bb5674410d377afc1b0 — https://www.soa.org/globalassets/assets/files/edu/c-24-05.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.12 Credibility, printed pp.220-221 (PDF 232-233): Bühlmann Z = N/(N+K), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Recomputed: m = 40 x 3 = 120 car-years; Z = 120/270 = 0.4444; 0.08 + 0.4444(0.04) = 0.09778, option D. Distractors: Z = 3/153 gives 0.0808 (B); Z = 40/190 gives 0.0884 (C); reversed 0.1022 (E). Dean's §1.2 matches the framing (total exposure across periods is the volume, in K's unit). Writer asked for Tse §7.4: not reachable (commercial book); Tse, the assigned Domain A reading, is a commercial book and was not reached; the formulas were checked against two CAS/SOA study notes (rank 3), whose notation differs from Tse's (Tse: k = mu_PV / sigma^2_HM) but not the substance.
