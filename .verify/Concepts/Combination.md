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

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:38Z/8d19
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: diff add-only (22+, 0-); earlier content and sources unchanged; product of C(N_i,k_i) = Siegrist MultiHypergeometric multiplication principle; Pascal = G&S Thm 3.4 (0<j<n, shifted form 1≤k≤n); hockey-stick = Siegrist Structures Σ C(j,n) = C(m+1,n+1); telescoping re-derived; 1+3+6+10+15 = 35 = C(7,3); falling factorial = k!C(m,k) (G&S Thm 3.5); rule 10: compared p-524 and p-929 — the method is general, no question number or the answer 3(n+1)(n-3)/80 appears; 4 item quotes probe 'linked'
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.2 Thm 3.5 p.94 and p.95 (PDF pp.102-103); Thm 3.8 Inclusion-Exclusion p.104 (PDF p.112); §5.1 hypergeometric p.193 (PDF p.201); binomial distribution uses C(n,j) (PDF p.105), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1b, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.2 Theorem 3.4 (Pascal's rule, include/exclude proof) and Theorem 3.5 pp.93-94 (PDF pp.101-102), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), fetched 2026-10-30, Foundations §1.8 Combinatorial Structures (committee counts by multiplication principle; Σ_{j=n}^{m} C(j,n) = C(m+1,n+1)) sha256:63ef90fd651593defb33d7772ecbe92f6198b6b655219a5cb726c76cdc393ccb — https://www.randomservices.org/random/foundations/Structures.html; Finite Sampling Models §3 The Multivariate Hypergeometric Distribution (joint pdf Π C(m_i,y_i)/C(m,n) 'from the multiplication principle') sha256:ce429ccb0682c9be25603fb52bab837daa32b2910c2aeba0603daf193a8cf978 — https://www.randomservices.org/random/urn/MultiHypergeometric.html; H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-10-30, §2.1.3 Unordered Sampling without Replacement (Pascal identity) sha256:79bf0f32ecb9598045e409b9da0c99549342938e45c43ee75fbea7fc47c52911 — https://www.probabilitycourse.com/chapter2/2_1_3_unordered_without_replacement.php
- note: Re-pass after the Exam P G8 writer added passages (w2). Earlier sources re-cited from the block; new passages checked against the sources read this run.
