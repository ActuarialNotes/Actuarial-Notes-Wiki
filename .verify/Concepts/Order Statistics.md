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

## [F-001/R] Independent non-identical extremes, joint density of two order statistics and two examples added
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Added: (1) for independent X_i with CDFs F_i, P(X_(n) <= x) = F_1(x)...F_n(x) and P(X_(1) > x) = product of [1 - F_i(x)], valid for any distribution (Siegrist, Transformations > Minimum and Maximum); (2) the joint density of (X_(j), X_(k)) for an i.i.d. continuous sample, n!/((j-1)!(k-j-1)!(n-k)!) F(x)^(j-1) [F(y)-F(x)]^(k-j-1) [1-F(y)]^(n-k) f(x) f(y), x < y, and its (min, max) case n(n-1)[F(y)-F(x)]^(n-2) f(x) f(y) (Siegrist, Order Statistics > Joint Distributions); (3) examples: the minimum of independent exponentials with means 10 and 15 is exponential with mean 6 (1/10 + 1/15 = 1/6; the survival-product method of SOA Q249, PDF pp.73-74), and the discrete joint pmf of (min, max) of two fair dice, 2/36 for l < h and 1/36 for l = h, with P(H - L >= 4) = 6/36 = 1/6 (recounted: (1,5), (1,6), (2,6)).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001: single order statistic CDF and PDF, joint density of two order statistics, independent non-identical max/min (Siegrist Order Statistics and Transformations; SOA Q249, Q497). Examples recomputed: E[max of 3 uniforms] = 0.75; min of Exp(10), Exp(15) has survival e^(-x/6), mean 6; dice P(H - L >= 4) = 1/6.
- sources_checked: Siegrist, Random (randomservices.org), Random Samples > Order Statistics (F_k and f_k for an i.i.d. sample; joint pdf f_jk of two order statistics and f_1n of min and max; standard uniform X_(k) beta(k, n-k+1)), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html; Siegrist, Random (randomservices.org), Distributions > Transformations > Minimum and Maximum (independent X_i with distribution functions F_i: max has F_1...F_n, min has 1 - product of (1 - F_i)), sha256:827bba81a7f85933f2ba982a09155f5277f5ec19838e2ffe70ac0563a56aca69 — https://www.randomservices.org/random/dist/Transformations.html; SOA Exam P Sample Solutions (Aug 2026 revision), Q249 (min of two independent exponentials by multiplying survival functions, PDF pp.73-74), Q497 (min of three i.i.d. losses, 1 - [1 - F(x)]^3, PDF p.137), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
