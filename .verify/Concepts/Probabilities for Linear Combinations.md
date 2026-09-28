---
target: Concepts/Probabilities for Linear Combinations.md
created: 2026-09-28
---

## [F-001] Discrete half of syllabus outcome 3g not covered
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: whole page
- claim: Page treats only linear combinations of independent normal random variables.
- evidence: SOA Probability Exam syllabus Nov 2026, Topic 3 outcome g: "Calculate probabilities for linear combinations of independent discrete random variables as well as for continuous normal random variables." The page, which carries this outcome as its title, covers only the normal case (lead, formula block, single example); nothing addresses the discrete case (the distribution of a sum of independent discrete variables, e.g. by convolution). What the page does state is correct (G&S Example 7.5, printed p.294, PDF p.302).
- source_rank: 1
- proposed_action: Author decision: add the discrete case (convolution of independent discrete variables, with an example) or link the page that covers it.
- applied: false
- fingerprint: 43e7326a8a2a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: L ~ N(sum c_i mu_i, sum c_i^2 sigma_i^2) for independent normals: normality from G&S Example 7.5 (sum of independent normals is normal with mean mu1+mu2, variance sigma1^2+sigma2^2) and G&S PDF p.290 exercise (rho X + sqrt(1-rho^2) V standard normal, a sum of scaled independent normals); mean and variance from G&S Thms 6.10, 6.14, 6.16. Independence condition stated. Example recomputed before reading: mean 300, SD sqrt(325)=18.028, z=2.219 -> 2.22, SOA table Phi(2.22)=0.9868, P=0.0132 (agrees). CLT pointer consistent with syllabus 3i. Link Central Limit Theorem resolves; figure exists; LaTeX fine.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Example 7.5 Sum of Two Independent Normal Random Variables (printed p.294, PDF p.302), Ex. 6.3 on rho X + sqrt(1-rho^2) V (printed p.282, PDF p.290), Thms 6.10, 6.14, 6.16 (printed pp.269-272, PDF pp.277-280), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P normal distribution table (rev. 4/29/21), row z=2.2 (column .02 = 0.9868), sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; SOA Probability Exam syllabus, November 2026, Topic 3 (Multivariate Random Variables) learning outcomes g-i, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Formula and example verified; open minor F-001 is a syllabus-coverage gap, not an error.
