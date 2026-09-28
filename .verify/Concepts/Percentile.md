---
target: Concepts/Percentile.md
created: 2026-09-28
---

## [F-001] Percentile defined by F(x_p) = p, which fails for discrete and mixed variables
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: definition, line 14, and formula block, lines 16-18
- claim: the smallest x_p with P(X <= x_p) = p
- evidence: SOA Exam P sample Q181 (solution PDF p.54): losses uniform on [0,1000], deductible 250; the official solution gives the 20th percentile of the reimbursement as max(0, 200 - 250) = 0. The reimbursement has F(0) = P(loss <= 250) = 0.25 and no value with F = 0.20 exactly, so the page definition has no solution; SOA takes the smallest value with F >= 0.20. SOA Q137 (solution PDF p.40): Poisson with lambda = 3; K = 4 is the first value with F(K) = 0.815 > 0.75, and no K has F(K) = 0.75. The last bullet ("take the smallest x_p satisfying the condition") does not rescue it, since at a jump F(x_p) = p cannot be satisfied at all. The vault Median page (rank 4, consistency only) already uses the correct form, smallest m with F(m) >= 0.5.
- source_rank: 1
- proposed_action: Define x_p as the smallest x with F(x) >= p (equivalently F(x_p-) <= p <= F(x_p)), keeping F(x_p) = p and x_p = F^{-1}(p) as the continuous, strictly increasing special case.
- applied: false
- fingerprint: 567191ac2c02

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: x_p = F^(-1)(p) for continuous strictly increasing F vs Tables VaR_p entries (exponential -theta ln(1-p); Pareto theta[(1-p)^(-1/alpha) - 1]), which also confirm the VaR bullet; 50th percentile = median vs SOA solution 61; discrete and mixed percentiles vs SOA solutions 137 and 181 (finding F-001); syllabus LO c. Examples recomputed before reading answers: exponential theta = 10: -10 ln 0.1 = 23.026 (= Tables VaR_0.9); N(100, 225): 100 + 1.645(15) = 124.675, z_0.95 = 1.645 by interpolation between SOA table entries 1.64 (0.9495) and 1.65 (0.9505); both agree. Links and embed resolve; LaTeX well formed.
- sources_checked: SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), VaR_p entries: Pareto A.2.3.1 (PDF p.8), Exponential A.3.3.1 (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q137 (PDF p.40), Q181 (PDF p.54), Q61 (PDF p.21), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Exam P normal distribution table (rev. 4/29/21), Phi(1.64) = 0.9495 and Phi(1.65) = 0.9505, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Formulas and both examples check out for continuous F; confidence low because the defining sentence, the page subject, is wrong for discrete and mixed variables (F-001, major, rank-1 evidence from SOA Q137 and Q181).
