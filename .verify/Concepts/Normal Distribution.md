---
target: Concepts/Normal Distribution.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: pdf: the integrand of the G&S p.213 CDF formula; CDF has no closed form: G&S p.213 (F_X cannot be written in simple functions, tables used). SOA table lists z = 0.00 to 3.99 only, so negative z uses Phi(-z) = 1 - Phi(z) from the symmetric density. Percentiles 1.2816, 1.6449, 1.9600, 2.3263 in the table selected-values row match 1.282, 1.645, 1.960, 2.326. Sum of independent normals is normal with means and variances adding: G&S Example 7.5; the general constants c_i (c_i^2 on the variances) were not read verbatim in a source this session, hence confidence medium. Continuity correction k + 0.5: SOA Q71 (at most 90 via 90.5) and G&S p.332. The CLT bullet is a pointer to the Central Limit Theorem page and was not re-verified here. Examples recomputed before reading: sigma = 6324.56, z = 0.7906, table Phi(0.79) = 0.7852, Phi(0.80) = 0.7881, interpolated 0.7854, P = 0.2146; page gives 0.2145 via z rounded to 0.791 (Phi(0.791) = 0.7855), same 21.5 percent. D ~ N(20, 625), SD 25, Phi(0.80) = 0.7881, P(X < Y) = 0.2119, agrees. Links and embeds resolve.
- sources_checked: SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table and selected-percentile row, PDF p.2, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.2 p.213 (PDF p.221), 7.2 Example 7.5 p.294 (PDF p.302), 9.1 p.332 (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Exam P Sample Solutions (Aug 2026 revision), Q71 (PDF p.23), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf
