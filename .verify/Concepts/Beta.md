---
target: Concepts/Beta.md
created: 2026-09-28
---

## [F-001] Unsourced claim that every Exam P beta question has integer parameters
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: example Probability the Loss Ratio Exceeds a Threshold, closing sentence, line 62
- claim: Any Exam P beta question will have integer parameters for exactly this reason.
- evidence: No source read this session states this. The SOA Exam P sample solution read for the beta (Q565, PDF p.157, Beta(4,2)) uses integer parameters, which is consistent with the observation but does not establish the universal claim or its stated reason; it is a prediction about future papers presented as fact.
- source_rank: 1
- proposed_action: Soften to an observation (SOA sample questions on the beta use integer parameters) or delete the sentence.
- applied: false
- fingerprint: 8121597278d9

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: pdf and B(a,b) = Gamma(a)Gamma(b)/Gamma(a+b): tables A.6.1.2 with theta = 1 (f = Gamma(a+b)/(Gamma(a)Gamma(b)) x^(a-1)(1-x)^(b-1)) and G&S p.168 (B as the integral); alpha = beta = 1 is uniform: G&S p.168. Mean a/(a+b) and E[X^2] = a(a+1)/((a+b)(a+b+1)) from the tables integer-moment row, giving Var = ab/((a+b)^2(a+b+1)); same variance formula NIST 1.3.6.6.17 and SOA Q565. Integer-parameter constant (a+b-1)C(a+b-2, a-1) follows from Gamma(n) = (n-1)!; checked at (3,2): 4 x 3 = 12 = 1/B(3,2). Skew direction: NIST skewness 2(q-p)sqrt(p+q+1)/((p+q+2)sqrt(pq)) is positive when alpha < beta, zero when equal. Uniform order statistic Beta(k, n-k+1) with mean k/(n+1): Siegrist 6.6. Parameterisation note: the SOA tables beta carries a scale theta (support 0 < x < theta); the page is the theta = 1 case. Examples recomputed before reading: Beta(3,2) mean 0.6, Var 6/150 = 0.04, SD 0.20; P(X > 0.8) = 1 - (4(0.512) - 3(0.4096)) = 1 - 0.8192 = 0.1808 (page 0.181); E[X_(2)] of 4 uniforms = 2/5 = 0.4. All agree. Links and embeds resolve. Open minor F-001.
- sources_checked: SOA, Tables for Exam C (Fall 2009), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; A.6.1.2 beta (a, b, theta), printed p.8 (PDF p.13), read with theta = 1; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Chapter 4 Beta Density p.168 (PDF p.176), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; NIST/SEMATECH e-Handbook of Statistical Methods, 1.3.6.6.17 Beta Distribution (standard beta pdf, mean, standard deviation, skewness), fetched 2026-09-28, sha256:eaab2714d3753b95f94be3402dcc443911e5a19a90ef34aeddb05eb11c0165b0 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda366h.htm; SOA, Exam P Sample Solutions (Aug 2026 revision), Q565 (PDF p.157), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Kyle Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), 6.6 Order Statistics, The Uniform Distribution, fetched 2026-09-28, sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html

## [F-001/R] Unsourced claim about Exam P beta parameters deleted
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted the sentence Any Exam P beta question will have integer parameters for exactly this reason: no source read states it, and it is a prediction about future papers. The example result stands: 12[(1/3 - 1/4) - (0.8^3/3 - 0.8^4/4)] = 12(0.083333 - 0.068267) = 0.1808, about 0.181.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001: density and uniform special case against G&S p.168; E = a/(a+b) and E[X^2] = a(a+1)/((a+b)(a+b+1)) from A.6.1.2 give Var = ab/((a+b)^2(a+b+1)); 1/B for integers = (a+b-1) C(a+b-2, a-1); examples recomputed: 0.60, 0.04, 0.1808, 0.4. Skewness direction and the order-statistic result not re-read this session, hence medium.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 4 Beta Density B(alpha,beta,x) = x^(alpha-1)(1-x)^(beta-1)/B(alpha,beta) on [0,1], alpha = beta = 1 is the uniform, p.168 (PDF p.176), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), A.6.1.2 beta (a, b, theta), printed p.8 (PDF p.13), read with theta = 1, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:03Z/5586
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: Every number on the page recomputed in python (scipy 1.18) before comparing with the page: 1/B(3,2)=12 and the binomial-coefficient form 4 x C(3,2)=12; tail table 0.6875/0.5248/0.1808/0.0523 against scipy beta.sf and F=4x^3-3x^4; mean 0.6, var 0.04, SD 0.2; mode 2/3; Beta(6,4) var 0.02182; Beta(2,6) mean 0.25, var 12/576=0.0208, SD 0.144; k=20 for x^3(1-x), P(X<0.5)=0.1875; Beta(3,3) constant 30, P(X(3)<0.4)=0.31744, equal to binomial(5,0.4) P(N>=3)=0.31744. Formulas, skew direction, mode, order-statistic law against Siegrist 5.17 and 6.6 and G&S §4; integer constant is (a+b-1)!/((a-1)!(b-1)!) via Gamma(n)=(n-1)!. On other exams: MAS-II 2026 outline Domain A (Bayesian credibility, Tse 8.1-8.2); CAS MAS-II Spring 2019 Q19 (official booklet p.23) is a binomial likelihood with a beta prior, so the beta-binomial pair is examined on MAS-II; posterior Beta(a+x, b+m-x) equals Siegrist's a+Y_n, b+n-Y_n with m Bernoulli trials. Note: Tse's contents name gamma-Poisson, beta-geometric and gamma-exponential in 8.2; the beta-binomial pair rests on the 2019 paper, not on a named Tse subsection. Links and embeds resolve.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4 Beta density B(alpha,beta,x) = x^(alpha-1)(1-x)^(beta-1)/B(alpha,beta) on [0,1], alpha = beta = 1 the uniform (PDF p.176), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.17 The Beta Distribution: density with B(a,b); a=b=1 standard uniform; mode (a-1)/(a+b-2) for a,b>1; E(X)=a/(a+b), var(X)=ab/((a+b)^2(a+b+1)); positively skewed if a<b, negatively if a>b, symmetric if a=b; k-th order statistic of n standard uniforms is Beta(k, n-k+1) (HTML fetched 2026-11-06), sha256:9ef44a035fff82ca4d81ae3db74baa55abdc511dfea0522006c4a62e60909032 — https://www.randomservices.org/random/special/Beta.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 6.6 Order Statistics: k-th order statistic of a uniform sample is beta with left parameter k, right n-k+1 (HTML fetched 2026-11-06), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.8 The Gamma Distribution: Gamma(k+1)=k! (HTML fetched 2026-11-06), sha256:24d8bfbac0c1cdc05848961605509fb8cc7f4182127be1ff73bf9be78fedfeb6 — https://www.randomservices.org/random/special/Gamma.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 7.4 Bayesian Estimation: Bernoulli model with beta prior (a,b): posterior beta with left a + Y_n, right b + (n - Y_n) (HTML fetched 2026-11-06), sha256:96904b1fd4ab905bbffa62bd5cc0d965b3c969e543a983124e968718ed25d550 — https://www.randomservices.org/random/point/Bayes.html; CAS, Exam Content Outline, Modern Actuarial Statistics II (MAS-II), 2026 (v06 2026_1_13), Domain A Introduction to Credibility tasks A1-A2 incl. Bayesian credibility, reading Tse (PDF p.2); Complete Text References: Tse chs 6.1-6.3, 7.1-7.4, 8.1-8.2, 9.1-9.2 (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents p.x (PDF p.12): 8 Bayesian approach, 8.2 Conjugate distributions, 8.2.1 The gamma-Poisson conjugate distribution, sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-II Spring 2019, Q19 (binomial likelihood with beta prior p^3(1-p)^5, posterior mean of p), official booklet PDF p.23 (OCR), sha256:ece3305b695aa96a37c55cbec4ce30ca2a2e013d24141183acfe3b77b71c29f1 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasii_spmasii-19.pdf
- note: Full re-check of the rewritten page including the new 'On other exams' paragraph. No findings.
