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

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:41Z/6d53
- date: 2026-10-30
- status_set: verified
- confidence: medium
- checks_run: Diff vs 0287511f is additions only (no existing line changed or removed); earlier content unchanged and its prior sources re-cited; every added claim/formula read against the cited section; every added example recomputed (incl. numeric quadrature where relevant); no question's numbers, scenario or wording on the page (compared with the item question files); x=mu+z_p sigma from F^{-1}(p)=mu+sigma Phi^{-1}(p); upper-tail z_{1-q}; sigma=(x2-x1)/(z2-z1); E[X^2]=mu^2+sigma^2; 2Phi(a/sigma)-1 and sigma<=a/z_{(1+p)/2}; expected-excess closed form re-derived independently and confirmed from Wikipedia's truncated-normal mean (rank 3) plus E[(X-c)+]=P(X>c)E[X-c|X>c], and by numeric quadrature at four (mu,sigma,c) points; examples 10.83 and mu=40, sigma=20 recomputed
- sources_checked: SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table and selected-percentile row, PDF p.2, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.2 p.213 (PDF p.221), 7.2 Example 7.5 p.294 (PDF p.302), 9.1 p.332 (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Exam P Sample Solutions (Aug 2026 revision), Q71 (PDF p.23), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Pishro-Nik, 4.2.3 Normal Distribution: F_X(x)=Phi((x-mu)/sigma), norminv = Phi^{-1}, worked example P(-7<X<-3)=Phi(1)-Phi(-1)=2Phi(1)-1 (HTML fetched 2026-10-30), sha256:87692396b07b851fe96f8ff72f95ed7a894246b70426e34b44e6fe0f48b8d16d — https://www.probabilitycourse.com/chapter4/4_2_3_normal.php; Siegrist, 5.6 The Normal Distribution: phi'(z)=-z phi(z); Phi(-z)=1-Phi(z); F^{-1}(p)=mu+sigma Phi^{-1}(p) (HTML fetched 2026-10-30), sha256:f4e2fe70308bf064dc44f62716075c9be463a2de262cb0aca8de1d6a0c6ffc84 — https://www.randomservices.org/random/special/Normal.html; Wikipedia, Truncated normal distribution, One sided truncation (of lower tail): E(X | X>a) = mu + sigma phi(alpha)/Z with alpha=(a-mu)/sigma and Z=1-Phi(alpha); with E[(X-c)+] = P(X>c)(E[X|X>c]-c) this gives the page's expected-excess formula (HTML fetched 2026-10-30), sha256:d098cf3929b0a8598465c2b7706bb4854e5bc4b415765b24c84684e78c32238f — https://en.wikipedia.org/wiki/Truncated_normal_distribution; Pishro-Nik, 4.1.2 Expected Value and Variance: LOTUS E[g(X)]=integral g(x)f_X(x)dx (4.3); Var(X)=EX^2-(EX)^2 (HTML fetched 2026-10-30), sha256:5ba159d4c07c821a4921efc16bf495e760abbb81638dd01897c7fab3693b05e6 — https://www.probabilitycourse.com/chapter4/4_1_2_expected_val_variance.php

## [F-001] Worked example is Exam P p-911 rescaled
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-30T18:43Z/21d0
- date: 2026-10-30
- severity: minor
- status: open
- locus: expected-excess derivation bullet, closing 'For instance' sentence
- claim: Page gave the example mu=50, sigma=10, c=40: E[(X-c)+] = 10 Phi(1) + 10 phi(1) = 10.83.
- evidence: questions/exam-p/p-911.md asks E[max(X-200,0)] for X ~ N(300, 100^2): the same standardized threshold (mu-c)/sigma = 1, so its keyed answer 108.33 (option D) is exactly 10 x the page's 10.83, and the question can be answered by recall of the example (rule 10). The formula itself is correct (re-derived; Wikipedia truncated normal E(X|X>a); numeric quadrature) and stays.
- source_rank: 4
- proposed_action: Delete the 'For instance' sentence; keep the formula and its derivation.
- applied: true
- fingerprint: d5230be037ba

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-30T18:43Z/21d0
- date: 2026-10-30
- resolves: F-001
- status: resolved
- note: Deleted the 'For instance' sentence (mu=50, sigma=10, c=40 -> 10.83) from the expected-excess bullet; formula and derivation unchanged. No replacement example authored.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:43Z/21d0
- date: 2026-10-30
- status_set: verified
- confidence: medium
- checks_run: Re-pass after deleting the expected-excess example sentence (F-001, rule 10 leak of p-911); diff vs 0287511f still additions only; remaining added claims unchanged since run 2026-10-30T18:41Z/6d53 and checked against the same sources there: x=mu+z_p sigma, two-condition solve, 2Phi(a/sigma)-1 and sigma bound, expected-excess closed form (re-derived, Wikipedia truncated-normal mean, numeric quadrature), two-percentile example mu=40, sigma=20 recomputed
- sources_checked: SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table and selected-percentile row, PDF p.2, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.2 p.213 (PDF p.221), 7.2 Example 7.5 p.294 (PDF p.302), 9.1 p.332 (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Exam P Sample Solutions (Aug 2026 revision), Q71 (PDF p.23), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Pishro-Nik, 4.2.3 Normal Distribution: F_X(x)=Phi((x-mu)/sigma), norminv = Phi^{-1}, worked example P(-7<X<-3)=Phi(1)-Phi(-1)=2Phi(1)-1 (HTML fetched 2026-10-30), sha256:87692396b07b851fe96f8ff72f95ed7a894246b70426e34b44e6fe0f48b8d16d — https://www.probabilitycourse.com/chapter4/4_2_3_normal.php; Siegrist, 5.6 The Normal Distribution: phi'(z)=-z phi(z); Phi(-z)=1-Phi(z); F^{-1}(p)=mu+sigma Phi^{-1}(p) (HTML fetched 2026-10-30), sha256:f4e2fe70308bf064dc44f62716075c9be463a2de262cb0aca8de1d6a0c6ffc84 — https://www.randomservices.org/random/special/Normal.html; Wikipedia, Truncated normal distribution, One sided truncation (of lower tail): E(X | X>a) = mu + sigma phi(alpha)/Z with alpha=(a-mu)/sigma and Z=1-Phi(alpha); with E[(X-c)+] = P(X>c)(E[X|X>c]-c) this gives the page's expected-excess formula (HTML fetched 2026-10-30), sha256:d098cf3929b0a8598465c2b7706bb4854e5bc4b415765b24c84684e78c32238f — https://en.wikipedia.org/wiki/Truncated_normal_distribution; Pishro-Nik, 4.1.2 Expected Value and Variance: LOTUS E[g(X)]=integral g(x)f_X(x)dx (4.3); Var(X)=EX^2-(EX)^2 (HTML fetched 2026-10-30), sha256:5ba159d4c07c821a4921efc16bf495e760abbb81638dd01897c7fab3693b05e6 — https://www.probabilitycourse.com/chapter4/4_1_2_expected_val_variance.php

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:03Z/5586
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: Every number on the page recomputed in python (scipy 1.18) before comparing with the page: 1-Phi(1)=0.1587, Phi(2)=0.9772 (table), 95th pct 58,225, sigma 8225/1.645=5000, 2Phi(1)-1=0.6827, 5000/1.645=3039.5 (about 3,040); expected excess over 55,000: -5000(0.1587)+5000(0.2420)=416.5, exact 416.58, and direct quadrature 416.58; sigma=sqrt(4e7)=6324.6, z=0.791, P=0.2146 (page 0.2145 with interpolated table); D~N(20,625), Phi(-0.8)=1-0.7881=0.2119 (table row 0.8); two-percentile mu=40, sigma=20 from table z=1,2; z values 1.282/1.645/1.960/2.326 against the table's selected-percentile row (1.2816, 1.6449, 1.9600, 2.3263). Formulas: density, standardization, symmetry, quantile, phi'=-z phi, sums of independent normals exactly normal (Siegrist 5.6); expected-excess formula equals P(X>c)(E[X|X>c]-c) with the truncated-normal mean (Wikipedia); continuity correction Siegrist 6.4; CLT G&S 9.4/9.6. Links and embeds resolve.
- sources_checked: Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.6 The Normal Distribution: phi'(z)=-z phi(z); Phi and Phi^-1 have no closed form; Phi(-z)=1-Phi(z); location-scale family, quantile mu + sigma Phi^-1(p); sum of independent normals normal, linear transformations (HTML fetched 2026-11-06), sha256:f4e2fe70308bf064dc44f62716075c9be463a2de262cb0aca8de1d6a0c6ffc84 — https://www.randomservices.org/random/special/Normal.html; SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table rows z=0.7-2.0 and selected-percentile row (0.90 1.2816, 0.95 1.6449, 0.975 1.9600, 0.99 2.3263), PDF p.2, read 2026-11-06, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; Wikipedia, Truncated normal distribution, One sided truncation (of lower tail): E(X | X>a) = mu + sigma phi(alpha)/Z, alpha=(a-mu)/sigma, Z = 1 - Phi(alpha) (HTML fetched 2026-11-06), sha256:dec14d4864f0614704b51dea05d7e16f652f951d55cf24920b0fc3e0dad2be1f — https://en.wikipedia.org/wiki/Truncated_normal_distribution; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 6.4 The Central Limit Theorem: continuity correction for integer-valued sums (HTML fetched 2026-11-06), sha256:ee6dc9f8e9feb14f19f96a0206c3289a4aedfc014f5e3dabf79422e1dc29f9e3 — https://www.randomservices.org/random/sample/CLT.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 9.4 and Thm 9.6 Central Limit Theorem (PDF pp.351, 365), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
- note: Full re-check of the rewritten page. The expected-excess example now uses the running example (50,000/5,000/55,000), not p-911's numbers. No findings.
