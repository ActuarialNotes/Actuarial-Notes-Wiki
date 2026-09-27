---
target: Concepts/Permutation.md
created: 2026-09-27
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: P(n,k) = n(n-1)...(n-k+1) = G&S Theorem 3.2 count of k-permutations (G&S writes (n)_k; notation difference only), PDF p.88; = n!/(n-k)! by the factorial definition on the same page; factor-of-k! relation = G&S Thm 3.5 C(n,j) = (n)_j/j! (PDF p.102); without replacement per Def. 3.2 (ordered listing of a subset); example recomputed first: 8·7·6 = 336 and C(8,3) = 56 = stated; figure embed resolves
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Def. 3.2 and Thm 3.2 p.80 (PDF p.88); §3.2 Thm 3.5 p.94 (PDF p.102), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1b, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
