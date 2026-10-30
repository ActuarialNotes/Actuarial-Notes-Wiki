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

## [F-001/R] Absolute-convergence proviso added
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: New first bullet under the formula: the sum or integral must converge absolutely (sum |k| f(k) or integral |x| f(x) dx finite), otherwise X has no expected value (G&S Def. 6.1 and Def. 6.4); example given: a Pareto with shape alpha <= 1 has no mean, since Tables A.2.3.1 give E[X^k] only for -1 < k < alpha; points to Moment.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: discrete and continuous definitions with the absolute-convergence proviso vs G&S Def. 6.1 and 6.4 (a non-convergent sum means no expected value); Pareto alpha <= 1 has no mean vs Tables A.2.3.1; linearity vs G&S Thms 6.2, 6.10; raw and central moments vs Pishro-Nik §6.1.3 and G&S sec. 10.3; syllabus LO c. Example recomputed: 0(0.5) + 100(0.3) + 500(0.2) = 130 (agrees). Links resolve; LaTeX well formed.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 6.1 (sum converges absolutely), Def. 6.4 (integral of |x| f(x) finite), Theorems 6.2 and 6.10, sec. 10.3 (mu_n = E(X^n)), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-28), §6.1.3 Moment Functions (n-th moment E[X^n], n-th central moment E[(X-EX)^n], MGF exists if finite on [-a,a] for some a > 0), sha256:c0a7c6272c4e4f05d4a52ec1718dafa0e6420d9f0aed6e2898105f6de9144a4a — https://www.probabilitycourse.com/chapter6/6_1_3_moment_functions.php; SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), A.2.3.1 Pareto (E[X^k] for -1 < k < alpha) (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:36Z/7439
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: Diff against 0287511f read in full: additions only, no prior sentence changed; earlier content and its prior sources (re-cited) unchanged; new wiki-links resolve; LaTeX balanced; no question numbers, scenario or wording on the page (compared with the items' question files). Symmetric density mean = c when E[X] exists (Siegrist 4.1 Symmetry, verbatim). Tail sum (Siegrist 4.2, verbatim). Capped count re-derived: min(N,m) > k iff N > k and k < m, so its survival is P(N>k) for k<m and 0 after, and the tail sum stops at m-1. Expected excess re-derived: pointwise max(N-c,0) = (N-c) + sum_{n<c}(c-n)1{N=n} (N=n<c gives 0, N>=c gives N-c), then linearity and E(1_A)=P(A) (Siegrist 4.1); c=1 gives E[N]-1+P(N=0). Conditional mean: f(x)/P(A) on A (Pishro-Nik 5.2.3, Siegrist 4.1 f(x|A)) gives E[X|A] = E[X 1_A]/P(A) and, for continuous X, E[X|X<c] = int_{-inf}^c x f dx / F(c).
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 6.1 (sum converges absolutely), Def. 6.4 (integral of |x| f(x) finite), Theorems 6.2 and 6.10, sec. 10.3 (mu_n = E(X^n)), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-28), §6.1.3 Moment Functions (n-th moment E[X^n], n-th central moment E[(X-EX)^n], MGF exists if finite on [-a,a] for some a > 0), sha256:c0a7c6272c4e4f05d4a52ec1718dafa0e6420d9f0aed6e2898105f6de9144a4a — https://www.probabilitycourse.com/chapter6/6_1_3_moment_functions.php; SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), A.2.3.1 Pareto (E[X^k] for -1 < k < alpha) (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.1 Definitions and Basic Properties: Symmetry (distribution symmetric about a with E(X) existing gives E(X) = a; density form f(a+x) = f(a-x)), Linearity, indicator E(1_A) = P(A), conditional density f(x|A) and its conditional expected values, HTML fetched 2026-10-30, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.2 Additional Properties: N taking values in the naturals has E(N) = sum_{n>=0} P(N > n) = sum_{n>=1} P(N >= n), HTML fetched 2026-10-30, sha256:80150b157fee54ddfea427e726a32493121464235644d38eec5997fdd9ca7321 — https://www.randomservices.org/random/expect/Properties2.html; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_{X|A}(x) = f_X(x)/P(A) on A, conditional expectation as the integral against f_{X|A}; independent X, Y have f_XY = f_X f_Y and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-10-30, sha256:b9e764e0b2adb7b888334dd58ee563d47c9c6cd66bd666fa4fa24c7d5e3b32a4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php
- note: Re-passed after the Exam P G8 additions (w6); new passages checked against the cited open sources and the short derivations re-done.
