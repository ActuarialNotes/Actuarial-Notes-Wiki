---
target: Concepts/The Law of Total Probability.md
created: 2026-09-27
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: P(B) = Σ P(B|A_i)P(A_i) over a partition matches G&S eq. (4.3) (PDF p.154; H_1..H_m of which one and only one occurs = mutually exclusive and exhaustive); term identity P(B|A_i)P(A_i) = P(B∩A_i) is G&S eq. (4.2), same page; SOA sample solution 84 applies the rule by name (From the Law of Total Probability); example recomputed first: 0.20(0.30) + 0.10(0.50) + 0.15(0.20) = 0.06 + 0.05 + 0.03 = 0.14 = stated; syllabus outcome 1g; link Bayes Theorem and figure embed resolve
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 p.146 (PDF p.154) eqs. (4.2)-(4.3), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q84, PDF p.26, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:35Z/14ca
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: diff vs 0287511f is add-only (one ### subsection); discrete and continuous conditioning formulas checked against PN §5.1.3 and eq. (5.16); the three independent-variable formulas (sum exceeding s on X∈B, P(X=Y), P(X>g(Y))) derived from them with P(Y∈·|X=x)=P(Y∈·) under independence; no item question's numbers on page; prior content unchanged
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 p.146 (PDF p.154) eqs. (4.2)-(4.3), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q84, PDF p.26, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.1.3 Conditioning and Independence (P(X∈A)=Σ_{y_j} P(X∈A|Y=y_j)P_Y(y_j)), sha256:f96cfc28220511431e9ae38905cb664d260d0c2d770fcc6d9a9288149ed138e0 — https://www.probabilitycourse.com/chapter5/5_1_3_conditioning_independence.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence, eq. (5.16) P(A)=∫P(A|X=x)f_X(x)dx and example P(X^3+Y>1)=∫_0^1 P(Y>1-x^3)dx 'since X and Y are independent', sha256:b9e764e0b2adb7b888334dd58ee563d47c9c6cd66bd666fa4fa24c7d5e3b32a4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php
- note: G8 w1 re-check after writer addition: conditioning on the value of a random variable.
