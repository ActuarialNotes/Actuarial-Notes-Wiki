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
