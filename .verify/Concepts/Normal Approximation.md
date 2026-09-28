---
target: Concepts/Normal Approximation.md
created: 2026-09-28
---

## [F-001] Poisson normal approximation stated without a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 3, line 22
- claim: a Poisson$(\lambda)$ approximately $N(\lambda, \lambda)$ for large $n$ or $\lambda$ — each is a sum of i.i.d. pieces.
- evidence: The binomial half is sourced: Grinstead & Snell Thm 9.1 (printed p.328, PDF p.336) and Thm 9.2 give the normal limit of b(n,p) with mean np and SD sqrt(npq). No source read this session states that Poisson(lambda) is approximately N(lambda, lambda) for large lambda, or that a Poisson variable is a sum of i.i.d. Poisson pieces: a text search of G&S for Poisson with normal/sum/convolution found nothing relevant, and SOA sample solution Q459 (PDF p.128) applies the CLT to the mean of 64 Poisson observations, not to a single Poisson variable. Standard and not contradicted, but unsourced.
- source_rank: 3
- proposed_action: Cite a source for the Poisson case (Poisson additivity plus the CLT, or a text stating the large-lambda normal approximation) or drop the Poisson clause.
- applied: false
- fingerprint: e44f61522136

## [F-002] Tail-understatement claim for skewed severities unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 5, line 24
- claim: The approximation is weakest in the tails and for small $n$ with skewed summands. Claim severities are right-skewed, so the normal tends to **understate** the chance of a very large aggregate loss.
- evidence: No source read this session makes this claim: the word skew occurs zero times in the Grinstead & Snell text, its CLT statements (Thm 9.4, PDF p.351; Thm 9.6, PDF p.365) are limit statements with no rate or tail comparison, and no SOA Exam P sample solution read discusses it. Not contradicted; stated as fact without support.
- source_rank: 3
- proposed_action: Add a citation (e.g. a loss-models text on the normal approximation to aggregate losses) or mark it as an unsourced remark.
- applied: false
- fingerprint: 823894de35f9

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: P(S_n<=s) and P(Xbar<=x) standardisations: G&S Thm 9.4/9.6 and SOA Q459 (SD of mean of 64 Poisson(16) = 4/8 = 0.5). Continuity correction k+0.5 and k-0.5: G&S 9.1 printed p.332 (35 to 65 successes, n=100, p=.5 -> -3.1 to 3.1) and SOA Q71 (at most 90 -> below 90.5, z=2.28). Binomial N(np, npq): G&S Thm 9.1. Fund n mu + z sigma sqrt n: SOA Q65 (90th percentile = mean + 1.282 SD); z_0.95 = 1.6449 in SOA table, page uses 1.645. Example 1 recomputed: 100,000 + 1.645(20,000) = 132,900; 332.25 per member; loading 82.25 = 32.9% (agrees). Example 2: mean 50, var 47.5, SD 6.892, z=1.378 -> 1.38, table 0.9162, P=0.0838; uncorrected z=1.451 -> 1.45, table 0.9265, 0.0735 (agree). Example 3: 0.05 sqrt(n) >= 1.645 -> n >= 1,082.41 -> 1,083 (agrees). Links Independent and Identically Distributed, Normal Distribution, Central Limit Theorem, Sample Mean, Moments for Linear Combinations, Binomial Distribution, Poisson Distribution, Probabilities for Linear Combinations, Percentile resolve; LaTeX fine.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 9.1 (printed p.328, PDF p.336), 1/2 correction worked example in 9.1 (printed p.332, PDF p.340), Thm 9.4 (PDF p.351), Thm 9.6 (PDF p.365), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q65 (PDF p.22), Q71 (PDF p.23), Q459 (PDF p.128), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Exam P normal distribution table (rev. 4/29/21), rows z=1.3 and 1.4 and the Values of z for selected Pr(Z<z) row (0.95 -> 1.6449), sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; SOA Probability Exam syllabus, November 2026, Topic 3 (Multivariate Random Variables) learning outcomes g-i, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Formulas and all three examples verified. Open minors F-001/F-002 are unsourced side claims, not formulas. The exact binomial 0.0867 in example 2 was checked only by own summation (rank 5: consistent, not a confirmation).
