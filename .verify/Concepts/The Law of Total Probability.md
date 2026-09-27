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
