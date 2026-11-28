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

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:41Z/6d53
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: Diff vs 0287511f is additions only (no existing line changed or removed); earlier content unchanged and its prior sources re-cited; every added claim/formula read against the cited section; every added example recomputed (incl. numeric quadrature where relevant); no question's numbers, scenario or wording on the page (compared with the item question files); cX+k ~ Unif(ca+k, cb+k) from Siegrist's location-scale closure; [0,500]/100 -> [0,5]; probability as area for independent uniforms (Siegrist 5.20 product theorem); P(Y>2X)=1/4 recomputed
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 memoryless, only continuous density with this property is the exponential, p.68 (PDF p.76); 5.2 continuous uniform density 1/(b-a) on [a,b] p.205 (PDF p.213), memoryless P(T > r+s | T > r) = P(T > s) p.206 (PDF p.214), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Exam P Sample Solutions (Aug 2026 revision), Q473 (PDF p.132), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Tables for Exam C (Fall 2009), A.6.1.2 beta (a, b, theta) with a = b = 1, uniform on (0, theta): E = theta/2, E[X^2] = theta^2/3, printed p.8 (PDF p.13), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Siegrist, 5.21 The Uniform Distribution on an Interval, Related Distributions: Y=c+dX (d>0) uniform with location c+da and scale dw (HTML fetched 2026-10-30), sha256:8e9ed89d801bc2780eab168757688e254a9484275e8d068c1fd000bf625c8558 — https://www.randomservices.org/random/special/UniformContinuous.html; Siegrist, 5.20 General Uniform Distributions: P(X in A)=lambda(A)/lambda(S); (X,Y) uniform on S x T iff X, Y independent and each uniform (HTML fetched 2026-10-30), sha256:df0f3d671bbd4ee0a72d98431cfd36e142ce833eb5c78d96dcfcb9c6650d7575 — https://www.randomservices.org/random/special/Uniform.html

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:03Z/5586
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: Every number on the page recomputed in python (scipy 1.18) before comparing with the page: Unif(0,500): P(100<X<250)=0.3, mean 250, var 20,833.33, SD 144.34; X|X>200 Unif(200,500) mean 350, excess mean 150, per loss 0.6x150=90; P(X>400|X>200)=1/3 vs 0.6; Unif(0,10) 2/5 vs 7/10; inflation mean 275; square: X+Y<500 0.5, Y>2X 0.25 (triangle 250x500/2 over 500^2), |X-Y|<100 1-(0.8)^2=0.36, each also by 10^6-draw simulation (0.5001/0.2498/0.3599); try-its 0.7x350=245, (b-a)^2=3600 so (30,90) and P(X>75)=0.25, 0.5^2/2=0.125, 0.7^2=0.49. Formulas against Siegrist 5.21; conditional-uniform and area-ratio rules against Siegrist 5.20; not memoryless (G&S p.68: only the exponential); E[(X-d)+]=P(X>d)E[X-d|X>d] from G&S Thm 6.5 with (X-d)+=0 on X<=d; deductible pays the excess (SOA P-21-05). Links and embeds resolve.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §2.2 Example 2.17 p.68 (PDF p.76): 'The only continuous density function with this property is the exponential density'; §5.1 geometric memoryless (PDF p.194); §5.2 uniform density 1/(b-a) and exponential density (PDF pp.213-216), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.21 The Uniform Distribution on an Interval: f = 1/(b-a); E(X)=(a+b)/2; var(X)=(b-a)^2/12; X = a + wU location-scale family (HTML fetched 2026-11-06), sha256:8e9ed89d801bc2780eab168757688e254a9484275e8d068c1fd000bf625c8558 — https://www.randomservices.org/random/special/UniformContinuous.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.20 General Uniform Distributions: P(X in A)=lambda(A)/lambda(S); conditional distribution given X in R is uniform on R; (X,Y) uniform on S x T iff X, Y independent and each uniform (HTML fetched 2026-11-06), sha256:df0f3d671bbd4ee0a72d98431cfd36e142ce833eb5c78d96dcfcb9c6650d7575 — https://www.randomservices.org/random/special/Uniform.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 6.5 E(X) = sum_j E(X|F_j)P(F_j) (PDF p.247), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Risk and Insurance study note P-21-05, VI Limits on Policy Benefits: deductible pays the loss in excess of the deductible, losses vs claim payments, benefit limits (PDF pp.7-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf
- note: Full re-check of the rewritten page. No findings.

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- status_set: verified
- confidence: high
- checks_run: Blind-solved the four worked examples first in Python (scratchpad/work/ucd_blind.py, run): C6 P(100<X<250) for U(0,500) = 150/500 = 0.30; C12 mean 60, variance 300 gives b-a = 60, (a,b) = (30,90), P(X>75) = 15/60 = 0.25; C15 E[(X-300)+] on U(0,1000) = 700^2/2000 = 245; C19 P(Y > X + 0.5) on the unit square = 0.5^2/2 = 0.125. All four match the page's answers and working lines. Claims: C1-C3 density 1/(b-a) on (a,b), zero outside (Siegrist 5.21 'f = 1/(b-a)'; Grinstead 5.2 p.205 PDF p.213). C5 CDF (x-a)/(b-a) (Siegrist 5.21, 'F(x) = (x-a)/(w)' on [a,a+w] in endpoint form). C8 MEAN: the page writes E[X] = (a-b)/2; the source (Siegrist 5.21, 'E(X) = 1/2(a+b)') gives (a+b)/2, so C8 is wrong (finding F-1). C9 variance (b-a)^2/12 (Siegrist 5.21). C10 midpoint, median, sd (b-a)/sqrt(12) (Siegrist 5.21 median = midpoint; sd from variance). C11 linear map cX+k (c>0) uniform on (ca+k, cb+k) (Siegrist 5.21 Related Distributions, Y=c+dX has location c+da, scale dw). C13 given X>d the loss is uniform on (d,b) (Siegrist 5.20 conditional distribution of a uniform given X in R is uniform on R; SOA Exam P sample Q473, PDF p.131-132: claim uniform on [0,1-d] with probability 1-d). C14 E[(X-d)+] = (b-d)^2/(2(b-a)): derived by direct integration, int_d^b (x-d)/(b-a) dx = (b-d)^2/(2(b-a)), and it agrees with the Q473 structure; no source prints this exact form, so it rests on my computation (rank 5) with the source's conditional structure behind it. C16 trap: P(X>s+t | X>s) = P(X>t) holds only for the exponential (Grinstead 2.2 Example 2.17 p.68, 'the only continuous density function with this property is the exponential'); the trap's numbers P(X>8|X>5) = 2/5 and P(X>3) = 7/10 recomputed and correct. C17-C18 independent uniforms give a uniform pair on the square; probability = area / (b-a)^2 (Siegrist 5.20, product of uniforms). Open log items: none (F-001 from 2026-09-28 resolved; the log's later re-checks C-003 and C-004 are consistent with this check except for C8, which the log's C-004 did not catch). The C8 error is in the page as written, not in the log's verified text.
- sources_checked: https://www.randomservices.org/random/special/UniformContinuous.html, §5.21 The Uniform Distribution on an Interval: E(X)=(a+b)/2, var=(b-a)^2/12, Related Distributions (location-scale), sha256:8e9ed89d801bc2780eab168757688e254a9484275e8d068c1fd000bf625c8558 — https://www.randomservices.org/random/special/UniformContinuous.html; https://www.randomservices.org/random/special/Uniform.html, §5.20 General Uniform Distributions: conditional distribution given X in R; product of independent uniforms, sha256:df0f3d671bbd4ee0a72d98431cfd36e142ce833eb5c78d96dcfcb9c6650d7575 — https://www.randomservices.org/random/special/Uniform.html; https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf, Q473 (PDF p.131-132): uniform loss, deductible d, claim uniform on [0,1-d] with probability 1-d, sha256:147ff95346ea891a1fc9e889f412701a3a41561dcd6f330d285422249ae25c84 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; https://math.dartmouth.edu/~prob/prob/prob.pdf, §2.2 Example 2.17 p.68 (PDF p.76): only continuous density with the memoryless property is exponential; §5.2 uniform density 1/(b-a) (PDF p.213), memoryless (PDF p.214), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
