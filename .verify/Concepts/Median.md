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
