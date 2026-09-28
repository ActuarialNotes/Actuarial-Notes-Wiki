---
target: Concepts/Uniform Continuous Distribution.md
created: 2026-09-28
---

## [F-001] Uniform described as memoryless within its support
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: bullet list, line 19
- claim: Conditional distributions on sub-intervals are also uniform (memoryless within the support)
- evidence: Grinstead & Snell 2.2 p.68 (PDF p.76): memoryless means the remaining wait does not depend on the time already waited, and "The only continuous density function with this property is the exponential density"; 5.2 p.206 (PDF p.214) states it as P(T > r + s | T > r) = P(T > s). The uniform fails it: for Unif(0,10), P(X > 8 | X > 5) = 2/5 = 0.4 but P(X > 3) = 0.7. The first half of the bullet is correct and matches SOA Exam P sample solution Q473 (PDF p.132): given the loss exceeds the deductible, the excess is uniform. The page Continuous Univariate Distributions says memoryless applies only to the exponential (and geometric), so the two pages contradict each other.
- source_rank: 3
- proposed_action: Delete the parenthetical (memoryless within the support); the conditional-uniformity statement stands on its own. Optionally add that the uniform is not memoryless.
- applied: false
- fingerprint: fb019f0825a8

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: pdf 1/(B - A), mean (A+B)/2, SD sqrt((B-A)^2/12) so Var = (b-a)^2/12: NIST 1.3.6.6.2; standard CDF F(x) = x with the location-scale form gives (x-a)/(b-a). Conditional uniformity above a deductible: SOA Q473 (excess uniform on [0, 1-d] with probability 1-d). Example recomputed before reading: integral from 300 to 1000 of (x-300)/1000 dx = 700^2/2000 = 245; page 0.7 x 350 = 245 agrees, and matches the Q473 form (1-d)^2/2 scaled by 1000. Figure embed exists. Open major F-001 (memoryless wording).
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, 1.3.6.6.2 Uniform Distribution (pdf, cdf, common statistics), fetched 2026-09-28, sha256:c420db7b6567c417241eca246094bddb30692813e5cd34c260f396a9f8796fad — https://www.itl.nist.gov/div898/handbook/eda/section3/eda3662.htm; SOA, Exam P Sample Solutions (Aug 2026 revision), Q473 (PDF p.132), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 Example 2.17 p.68 (PDF p.76) and 5.2 p.206 (PDF p.214), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf

## [F-001/R] Uniform no longer called memoryless
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted the parenthetical memoryless within the support. The conditional-uniformity half stays, now stated as: given X > d, X is uniform on (d, b) (SOA Exam P sample solution Q473, PDF p.132: with the loss uniform on [0,1] and deductible d, the claim is uniform on [0, 1-d] with probability 1-d). Added that the uniform is not memoryless, the exponential being the only continuous density that is (Grinstead & Snell 2.2 p.68, PDF p.76; 5.2 p.206, PDF p.214: P(T > r+s | T > r) = P(T > s)), with the counterexample Unif(0,10): P(X > 8 | X > 5) = 0.2/0.5 = 2/5 but P(X > 3) = 7/10.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: density 1/(b-a) on the interval per G&S 5.2; mean theta/2 and variance theta^2/12 on (0, theta) from A.6.1.2 with a = b = 1 (shift gives (a+b)/2 and (b-a)^2/12); CDF (x-a)/(b-a) integrated from the density; conditional uniformity per Q473; not memoryless per G&S p.68; example E[(X-300)+] = 0.7 x 350 = 245 = 700^2/2000 recomputed.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 memoryless, only continuous density with this property is the exponential, p.68 (PDF p.76); 5.2 continuous uniform density 1/(b-a) on [a,b] p.205 (PDF p.213), memoryless P(T > r+s | T > r) = P(T > s) p.206 (PDF p.214), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Exam P Sample Solutions (Aug 2026 revision), Q473 (PDF p.132), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Tables for Exam C (Fall 2009), A.6.1.2 beta (a, b, theta) with a = b = 1, uniform on (0, theta): E = theta/2, E[X^2] = theta^2/3, printed p.8 (PDF p.13), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf
