---
target: Concepts/Expected Value.md
created: 2026-09-28
---

## [F-001] Expectation formula omits the absolute-convergence proviso
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: formula block, line 16
- claim: E[X] = sum_k k f(k) (discrete) and integral x f(x) dx (continuous), stated without any existence condition.
- evidence: Grinstead & Snell Def. 6.1 (sec. 6.1) defines E(X) = sum x m(x) "provided this sum converges absolutely"; Def. 6.4 (sec. 6.3, PDF p.276) defines E(X) = integral x f(x) dx "provided the integral of |x| f(x) dx is finite". The page states both unconditionally. Rated minor rather than major: every example on the page has a finite mean, and the sibling Moment page does say moments need not exist (Pareto E[X^k] only for -1 < k < alpha, SOA Tables for Exam C A.2.3.1, PDF p.8).
- source_rank: 3
- proposed_action: Add "provided the sum/integral converges absolutely" to the formula block, or point to the non-existence caveat on [[Moment]].
- applied: false
- fingerprint: d4e89c5c4eee

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Discrete and continuous definitions vs G&S Def. 6.1 / Def. 6.4; linearity E[aX+b] = aE[X] + b vs G&S Thm 6.2 and Thm 6.10; long-run-average reading vs G&S sec. 6.3 interpretation of E(X); n-th raw moment vs G&S sec. 10.3, central moments vs NIST 1.3.5.11; syllabus usage vs Nov 2026 Exam P LO c. Example recomputed before reading the answer: 0(0.5) + 100(0.3) + 500(0.2) = 130, agrees. Links and embed resolve; LaTeX well formed.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), sec. 6.1 Def. 6.1 and Thm 6.1-6.2, sec. 6.3 Def. 6.4 (PDF p.276) and Thm 6.10, sec. 10.3 (PDF pp.401-402), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; NIST/SEMATECH e-Handbook of Statistical Methods, sec. 1.3.5.11 Measures of Skewness and Kurtosis (fetched 2026-09-27), sha256:e47d203aad5f3b584e818850bb3e51a89b29ed1d7ca9981f7dbffe3c5f94f165 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b.htm; SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Formulas and example confirmed; one minor open (existence proviso).
