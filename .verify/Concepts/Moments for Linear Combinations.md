---
target: Concepts/Moments for Linear Combinations.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: E[W] linear: G&S Thm 6.2 and 6.10. Var(W) = sum a_i^2 Var(X_i) + 2 sum_{i<j} a_i a_j Cov: G&S Ex. 6.3.17(c) V(X+Y)=V(X)+V(Y)+2cov(X,Y) with Thm 6.7/6.14 V(cX)=c^2 V(X); SOA Q80 bilinear Cov expansion with coefficient 1.2; SOA Q301 Var(total)=5+8+2(3)=19. Independent case drops covariances: G&S Thm 6.8/6.16 and Ex. 6.3.17(b); stated as a sufficient condition, correctly. Aggregate-loss use: SOA Q86 total payout mean and variance. Example recomputed before reading: E=250, Var=1,300, SD=36.056 -> 36.06 (agrees). Links Central Limit Theorem, Expected Value, Variance, Independent Random Variables resolve; figure exists; LaTeX fine.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 6.2 (printed p.231, PDF p.239), Thms 6.7-6.8 (printed p.259, PDF p.267), Ex. 6.3.17 (printed p.281, PDF p.289), Thms 6.10, 6.14, 6.16 (printed pp.269-272, PDF pp.277-280), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q80 (PDF p.25), Q86 (PDF pp.26-27), Q301 (PDF p.84), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Probability Exam syllabus, November 2026, Topic 3 (Multivariate Random Variables) learning outcomes g-i, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: No findings.
