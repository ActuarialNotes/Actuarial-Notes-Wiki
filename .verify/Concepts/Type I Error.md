---
target: Concepts/Type I Error.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Definition, false-positive synonym, alpha formula, significance-level and trade-off bullets, critical-region construction checked against Siegrist ch.8 §1, ISLR2 §13.1.2, PSU STAT 415 L9 and NIST 7.1.3.1. Example is qualitative (true H0 rejected = Type I, probability alpha = 0.05 given H0) - consistent with the conditional definition in PSU L9. Links resolve exact; figure builder (alpha tail beyond the critical value of the H0 curve) matches. Exam usage: Exam MAS-I (CAS).md only, same sense.
- sources_checked: Siegrist, Random, ch.8 Hypothesis Testing §1 Introduction: 'A type 1 error is rejecting the null hypothesis H0 when H0 is true'; significance level = maximum type 1 error probability, rejection region constructed so the level is a prescribed small value (typically 0.1, 0.05, 0.01); reducing type 1 error by shrinking R necessarily increases type 2 error, sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html; James, Witten, Hastie & Tibshirani, ISLR 2nd ed., §13.1.2 and Table 13.1, pp.559-560 (PDF pp.565-566): 'Type I errors are also known as false positives'; Type I error rate = probability of rejecting H0 given H0 holds; Type I/Type II trade-off, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Penn State STAT 415 (2026 notes), Lesson 9 §9.1 and §9.3: Def 9.3 alpha = probability of a Type I error = significance level, alpha a conditional probability given H0 true, typical values 0.01/0.05/0.10, as alpha decreases beta increases, sha256:4b40913ee64c6e155867542d9d3517e3384e5a942452f6fc8b1e72bf815a8acf — https://online.stat.psu.edu/stat415/Lesson09.html; NIST/SEMATECH e-Handbook §7.1.3.1 Critical values and p values: alpha = 0.05 means H0 is rejected 5% of the time when true; critical region exceeded with probability alpha under H0, sha256:1de003010ccb462a50f87f25eb777a581442a61423c97e884266d8e89b0ff797 — https://www.itl.nist.gov/div898/handbook/prc/section1/prc131.htm
- note: No findings. Nuance not filed: for a discrete statistic the critical region can only be built with P(reject | H0) <= alpha (Siegrist §5; PSU L10 Ex 10.2 gets 0.1054 for a nominal 0.10), and for a composite H0 alpha is the maximum over H0. Medium: Hogg §4.5 (the MAS-I reading) not freely available, not read.
