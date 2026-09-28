---
target: Concepts/Order Statistics.md
created: 2026-09-28
---

## [F-001] Page covers only i.i.d. single order statistics; syllabus 3f asks for joint distribution for independent variables
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: formula block and conditions bullet, lines 16-20
- claim: The formulas above apply when the observations are i.i.d. with common CDF F(x) and PDF f(x)
- evidence: SOA Probability syllabus Nov 2026, PDF p.4, Topic 3 learning outcome f: Determine the joint distribution of order statistics for a set of independent random variables; the topic objective reads the distribution of order statistics for independent random variables. The page gives only the marginal cdf and pdf of one order statistic for an i.i.d. sample. Its formulas and the i.i.d. condition are correct (Siegrist, Order Statistics, sha256:19ff485c...), so nothing on the page is wrong, but it gives no joint density of (X_(j), X_(k)) and nothing for independent, non-identically distributed variables (e.g. the minimum of independent exponentials with different means, P(min > x) = product of survival functions), both of which the syllabus names.
- source_rank: 1
- proposed_action: Add the joint density of two order statistics and the min/max of independent, non-identically distributed variables (authoring task for a maintainer).
- applied: false
- fingerprint: 5d8d451b0cb1

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: definition as k-th smallest of the sample (Siegrist); F_{X(k)} binomial-sum cdf and f_{X(k)} = n!/((k-1)!(n-k)!) F^{k-1}(1-F)^{n-k} f (Siegrist, identical); k=1 case applied by SOA Q451 (page image read); uniform E[X_(k)] = k/(n+1) (Siegrist, beta(k, n-k+1), a=0, h=1); i.i.d. condition stated; example recomputed before reading: E[X_(3)] = 3/4 = 0.75 for n=3 - agrees; figure embed resolves; open minor F-001 is a coverage gap versus syllabus 3f, not a formula error
- sources_checked: Siegrist, Random (randomservices.org), Random Samples > Order Statistics (k-th smallest value; F_k(x)=sum_{j=k}^n C(n,j)F^j(1-F)^{n-j}; f_k(x)=n!/((k-1)!(n-k)!) F^{k-1}(1-F)^{n-k} f; standard uniform X_(k) ~ beta(k, n-k+1), E(X_(k)) = a + h k/(n+1)), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html; SOA Exam P Sample Solutions (Aug 2026 revision), Q451 solution (first order statistic density g_1(y) = 3 f(y)[1-F(y)]^2), PDF p.126, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Probability Exam syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes 3a-3f, PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
