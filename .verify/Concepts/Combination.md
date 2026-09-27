---
target: Concepts/Combination.md
created: 2026-09-27
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: C(n,k) = n!/(k!(n-k)!) and C(n,k) = C(n,n-k) match G&S p.95 (PDF p.103); counts unordered subsets without repetition per Thm 3.5 (PDF p.102); used by the hypergeometric distribution (G&S §5.1, PDF p.201) and inclusion-exclusion (Thm 3.8, PDF p.112); binomial distribution uses C(n,j) (PDF p.105); example recomputed first: C(8,3) = 336/6 = 56 = stated; links Binomial Distribution, Hypergeometric Distribution, Inclusion-Exclusion Principle and figure embed resolve
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.2 Thm 3.5 p.94 and p.95 (PDF pp.102-103); Thm 3.8 Inclusion-Exclusion p.104 (PDF p.112); §5.1 hypergeometric p.193 (PDF p.201); binomial distribution uses C(n,j) (PDF p.105), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1b, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
