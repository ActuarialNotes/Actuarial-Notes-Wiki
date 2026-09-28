---
target: Concepts/Central Limit Theorem.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: CLT statement (i.i.d., mean mu, finite variance sigma^2, (S_n - n mu)/(sigma sqrt n) -> N(0,1)) against G&S Thm 9.4 (discrete) and Thm 9.6 (continuous), both for a common distribution with mean mu and variance sigma^2. S_n approx N(n mu, n sigma^2): G&S Thm 6.9 moments plus SOA Q65 and Q86 (total approximated as normal with the sum mean and SD). Example recomputed before reading: mean 100,000, SD 300 sqrt(200)=4,242.6, z=0.943 -> 0.94, SOA table Phi(0.94)=0.8264, P=0.1736 (agrees). Figure exists; escaped currency outside math is the vault Obsidian shape.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 9.4 Central Limit Theorem (printed p.343, PDF p.351), Thm 9.6 Central Limit Theorem (printed p.357, PDF p.365), Thm 6.9 (printed p.260, PDF p.268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q65 (PDF p.22), Q86 (PDF pp.26-27), Q459 (PDF p.128), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Exam P normal distribution table (rev. 4/29/21), row z=0.9 (column .04 = 0.8264), sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; SOA Probability Exam syllabus, November 2026, Topic 3 (Multivariate Random Variables) learning outcomes g-i, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: No findings. MAS-I also links this page; usage is the same theorem.
