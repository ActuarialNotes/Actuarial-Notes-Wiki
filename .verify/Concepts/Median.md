---
target: Concepts/Median.md
created: 2026-09-28
---

## [F-001] General two-sided median condition unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 2, line 21
- claim: The general condition is P(X <= m) >= 0.5 and P(X >= m) >= 0.5; if F equals exactly 0.5 across an interval, every point of it qualifies, and the Percentile convention takes the smallest.
- evidence: Confirmed: the continuous case (Grinstead & Snell ch. 5 exercise, median m with F(m) = 1/2; SOA sample solution 61, PDF p.21, solves F(m) = 0.5) and the smallest-m-with-F(m) >= p rule, which is how SOA sample solutions 137 (PDF p.40) and 181 (PDF p.54) find percentiles of a discrete and a mixed variable. Not found in any source read this session: the two-sided condition and the flat-interval rule (they match Loss Models Def. 3.7, which was not available). The cross-reference is also inconsistent with the vault Percentile page, which currently defines x_p by F(x_p) = p exactly (see that page F-001).
- source_rank: 1
- proposed_action: Cite Loss Models Def. 3.7 or another ranked source for the two-sided condition and the flat-interval rule.
- applied: false
- fingerprint: 021dc446416d

## [F-002] Absolute-error minimisation property unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 5, line 24
- claim: The median minimises expected absolute error E|X - c|, where the mean minimises expected squared error
- evidence: Grinstead & Snell Exercise 6.3.11 poses the question (which b minimizes E(|X - b|)?) but the text does not state the answer; no source read this session states either minimisation property. The sample-median sentence in the same bullet is confirmed by NIST e-Handbook 1.3.5.1 (middle value, or average of the two middle values for even N).
- source_rank: 3
- proposed_action: Cite a ranked source for both minimisation properties.
- applied: false
- fingerprint: 3849ffbf58ae

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: F(m) = 0.5 vs G&S ch. 5 exercise and SOA solution 61; discrete rule smallest m with F(m) >= 0.5 consistent with SOA solutions 137 and 181; exponential median theta ln 2 from Tables VaR_p = -theta ln(1-p); lognormal median exp(mu) from F = Phi(z); non-decreasing transform and (X - d)+ median m - d vs SOA solution 181 (median payment 500 - 250 = 250); right-skew ordering and sample median vs NIST 1.3.5.1. Examples recomputed before reading answers: f = 2(1-x): F = 1 - (1-x)^2, m = 0.29289, mean 1/3, mode 0; N: F(0) = 0.35, F(1) = 0.60, median 1, P(N >= 1) = 0.65, mean 1.25; exponential 5000, d = 1000: median 3465.74, F(1000) = 0.1813, m_Y = 2465.74, E[Y] = 5000 e^-0.2 = 4093.65 (integral of the survival function from d; consistent with Tables F(x)); all agree. Links resolve; LaTeX well formed.
- sources_checked: SOA Exam P Sample Solutions (Aug 2026 revision), Q61 (PDF p.21), Q137 (PDF p.40), Q181 (PDF p.54), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), Exponential A.3.3.1 and Lognormal (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), ch. 5 exercise defining the median, sec. 6.3 Exercise 6.3.11, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; NIST/SEMATECH e-Handbook of Statistical Methods, sec. 1.3.5.1 Measures of Location (fetched 2026-09-27), sha256:0a089979887b22d95c06e33973825f6222d73b60f1cde964df479a13bbd7d1d3 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm; SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Formulas and all three examples confirmed; two minor findings open (unsourced two-sided condition; unsourced minimisation property).

## [F-003] Symmetric-distribution claim conflicts with the smallest-median convention
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 3 (Median versus mean), line 22
- claim: A symmetric distribution has median equal to the mean.
- evidence: NIST e-Handbook 1.3.5.1 states only that for a normal distribution the mean, median and mode are equivalent, and that for skewed distributions the mean is pulled in the direction of the heavier tail; no source read states the general symmetric rule. Under the convention the page now uses (smallest m with F(m) >= 0.5, the rule SOA solutions 137 and 181 apply) it fails for a symmetric discrete variable: X = 0 or 1 with probability 1/2 each has F(0) = 0.5, so median 0 against mean 0.5 (rank 5, falsifies only).
- source_rank: 3
- proposed_action: Restate as NIST does: median = mean for a normal; for a skewed distribution the mean is pulled toward the heavier tail.
- applied: true
- fingerprint: bec21da464e4

## [F-004] Transformation rule stated for any non-decreasing g
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 4 (Increasing transformations), line 23
- claim: If g is non-decreasing, g(m) is a median of g(X).
- evidence: No source read this session states the general rule. SOA sample solution 181 (PDF p.54) applies it only to the deductible payment, a continuous non-decreasing map: median payment 500 - 250 = 250 and 20th percentile max(0, 200 - 250) = 0. With the page median defined as the smallest m with F(m) >= 0.5 the general form fails for a g with a jump: X uniform on (0,1), g = 0 below 0.5 and 1 from 0.5, gives g(m) = 1 while the median of g(X) is 0 (rank 5, falsifies only).
- source_rank: 1
- proposed_action: Restrict the bullet to the deductible payment: median of (X - d)+ is max(m - d, 0), and likewise for every percentile, as SOA solution 181 does.
- applied: true
- fingerprint: 39cccd591056

## [F-005] Never overstates the mean comparison
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- severity: nit
- status: open
- locus: Median Payment Under a Deductible, answer, last sentence
- claim: subtracting the deductible works for the median, never for the mean.
- evidence: If P(X < d) = 0 then (X - d)+ = X - d and E[(X - d)+] = E[X] - d by linearity (G&S Thm 6.2), so never is too strong; for the example exponential the mean does not shift that way (5000 e^-0.2 = 4093.65, not 4000).
- source_rank: 3
- proposed_action: Say the deductible carries the median through, but not the mean.
- applied: true
- fingerprint: 65fe4097dc2a

## [F-001/R] Unsourced two-sided condition and flat-interval rule removed
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Lead now defines the median as the smallest m with F(m) >= 0.5 (the percentile rule SOA solutions 137 and 181 apply), with F(m) = 0.5 as the continuous case (G&S Ch. 5 Ex. 22; SOA solution 61). Bullet 2 keeps only the discrete statement: F(m) = 0.5 usually has no solution, so take the smallest m with F(m) >= 0.5, the same rule as every Percentile. The two-sided condition, the flat-interval rule and the example check that used them are deleted. The Percentile page now uses the same definition, so the cross-reference is consistent.

## [F-002/R] Unsourced minimisation property deleted
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: The sentence claiming the median minimises E|X - c| and the mean minimises squared error is deleted: G&S Ex. 6.3.11 only poses the question and no source read this session states either property. The sample-median sentence stays, confirmed by NIST 1.3.5.1.

## [F-003/R] Median versus mean restated as NIST states it
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-003
- status: resolved
- note: Now: for a normal distribution the median equals the mean; for a skewed one they differ, the mean pulled toward the heavier tail (NIST 1.3.5.1). The rest of the bullet is unchanged.

## [F-004/R] Transformation bullet restricted to the deductible payment
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-004
- status: resolved
- note: Bullet renamed Deductibles pass straight through: (X - d)+ is a continuous non-decreasing function of the loss, so its median is max(m - d, 0) and the same holds for every percentile, which is exactly how SOA solution 181 computes the median payment (500 - 250) and 20th percentile (max(0, 200 - 250)).

## [F-005/R] Wording softened
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-005
- status: resolved
- note: Last sentence now reads: subtracting the deductible carries the median through, but not the mean.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001, F-002, F-003, F-004, F-005: smallest m with F(m) >= 0.5 vs SOA solutions 137 and 181; continuous F(m) = 0.5 vs G&S Ch. 5 Ex. 22 and SOA solution 61; normal median = mean and mean pulled toward the heavier tail vs NIST 1.3.5.1; exponential median theta ln 2 from Tables VaR_p; lognormal median e^mu from F = Phi(z); deductible payment median max(m - d, 0) vs SOA solution 181; sample median vs NIST 1.3.5.1. Examples recomputed: 1 - sqrt(0.5) = 0.29289, mean 1/3, mode 0; F(0) = 0.35, F(1) = 0.60, median 1, mean 1.25; 5000 ln 2 = 3465.74, F(1000) = 0.1813, m_Y = 2465.74, E[Y] = 5000 e^-0.2 = 4093.65 (all agree). Links resolve; LaTeX well formed.
- sources_checked: SOA Exam P Sample Solutions (Aug 2026 rev.), Q61 (PDF p.21), Q137 (PDF p.40), Q181 (PDF p.54), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch. 5 Exercise 22 (median m with F(m) = 1/2), Theorem 6.2, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), Exponential A.3.3.1 (F(x), VaR_p = -theta ln(1-p)) and Lognormal A.5.1.1 (F(x) = Phi(z)) (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; NIST/SEMATECH e-Handbook of Statistical Methods, sec. 1.3.5.1 Measures of Location (fetched 2026-09-27), sha256:0a089979887b22d95c06e33973825f6222d73b60f1cde964df479a13bbd7d1d3 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm; SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
