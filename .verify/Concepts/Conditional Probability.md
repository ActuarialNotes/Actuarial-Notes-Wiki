---
target: Concepts/Conditional Probability.md
created: 2026-09-27
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: P(A|B) = P(A∩B)/P(B) with P(B) > 0 matches G&S §4.1 (PDF p.142, incl. the P(E) > 0 condition); independence implies P(A|B) = P(A) matches G&S §4.1 Independent Events (PDF p.147); definition matches syllabus outcome 1f; example recomputed before reading the answer: X ~ U(0,1000), P(X>700)/P(X>400) = 0.3/0.6 = 0.5 = stated 0.5 (conditioning on a continuous event as in G&S §4.2, PDF p.170); wiki-links Bayes Theorem and The Law of Total Probability resolve; Media/Figures/Conditional_Probability.svg exists; LaTeX well-formed
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 pp.133-134 (PDF pp.141-142) definition with P(E) > 0; §4.1 Independent Events pp.139-140 (PDF pp.147-148); §4.2 p.162 (PDF p.170) continuous conditional probability, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1f, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
