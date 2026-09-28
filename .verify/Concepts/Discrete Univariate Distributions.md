---
target: Concepts/Discrete Univariate Distributions.md
created: 2026-09-28
---

## [F-001] Variance-to-mean rule for the negative binomial contradicts the page own trials parameterisation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: Choosing the right one, identification bullets, line 39
- claim: The variance-to-mean ratio is a fast identification check: it is < 1 for binomial, = 1 for Poisson, and > 1 for negative binomial.
- evidence: SOA Tables for Exam C App. B.2.1.4 (PDF p.15): the negative binomial N counts failures (support 0,1,2,...), E[N]=r beta, Var[N]=r beta(1+beta), so Var/E = 1+beta > 1; B.2.1.3 binomial Var/E = 1-q < 1; B.2.1.1 Poisson Var/E = 1. But line 33 of this page defines the negative binomial as trials until the r-th success with E[X]=r/p (the Grinstead & Snell 5.1 form, PDF p.195). For that X, Var(X)=r(1-p)/p^2 and Var/E=(1-p)/p, which is below 1 whenever p>1/2: r=3, p=0.75 gives E=4, Var=1.333, ratio 0.333, which the page rule would classify as binomial. The rule is true only for the failures-count form.
- source_rank: 1
- proposed_action: State that the ratio test applies to the failures-count (Loss Models) negative binomial, whose Var/E = 1/p = 1+beta, or drop the negative binomial from the rule.
- applied: false
- fingerprint: bc42d18897e6

## [F-002] Discrete uniform mean (n+1)/2 stated without the {1,...,n} support condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: Choosing the right one, list item, line 35
- claim: One of n equally likely outcomes -> Discrete Uniform, with E[X] = (n+1)/2
- evidence: Grinstead & Snell 6.2 Exercise 11 (p.264, PDF p.272) gives E(X)=(n+1)/2 and V(X)=(n-1)(n+1)/12 for X chosen at random from the integers 1,2,...,n. Line 35 applies E[X]=(n+1)/2 to any n equally likely outcomes with no support stated. The linked page Concepts/Uniform Discrete.md shows the failure itself: 10 equally likely values 20..29 have mean 24.5, not (10+1)/2 = 5.5.
- source_rank: 3
- proposed_action: Qualify line 35 as uniform on {1,...,n}, or give the general-range mean (a+b)/2.
- applied: false
- fingerprint: 2b69c5e4f602

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: PMF conditions f>=0, sum=1 (G&S Def 1.2); CDF F(x)=P(X<=x) as sum (Pishro-Nik 3.2.1); identification means: binomial np (Exam C mq; G&S p.233), hypergeometric nK/N (Pishro-Nik 3.2.5), geometric trials 1/p (G&S p.262), NB trials r/p (Pishro-Nik 3.2.2), Poisson lambda (Exam C), uniform (n+1)/2 only on 1..n (G&S Ex 6.2.11) -> F-002; binomial-hypergeometric agreement for large population (G&S p.193); ratio rule: binomial 1-q<1, Poisson 1 (Exam C), NB >1 only for failures form -> F-001; example recomputed before reading: 10c=1, c=0.1, F(3)=0.6 (agrees); all six wiki-links resolve; figure embed exists; distribution list matches the Nov 2026 syllabus Topic 2
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 1.2 p.19 (PDF p.27) distribution function m >= 0, sum = 1; 5.1 geometric p.185 (PDF p.193), negative binomial p.187 (PDF p.195), hypergeometric and its binomial limit p.193 (PDF p.201); 6.1 E(Sn)=np p.233 (PDF p.241); 6.2 E(T)=1/p p.262 (PDF p.270), Exercise 11 uniform on 1..n p.264 (PDF p.272), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-09-27, 3.2.1 CDF definition F_X(x)=P(X <= x), sha256:af20b8d628299ce3fe01503e29617951bd45f4292ce46980c319cd3eede2035b — https://www.probabilitycourse.com/chapter3/3_2_1_cdf.php; 3.2.2 Pascal EX=m/p, sha256:cef561084124ba2a0ab25d131a56f9647e8f53a20ab41be7c4480f11fb27c5bf — https://www.probabilitycourse.com/chapter3/3_2_2_expectation.php; 3.2.5 hypergeometric EX=kb/(b+r), sha256:71f926e8d746785af219018a406d4b28b9aac9e283a7c501119fc6c94584f86e — https://www.probabilitycourse.com/chapter3/3_2_5_solved3_2.php; SOA Probability Exam syllabus, November 2026, Topic 2 Univariate Random Variables (binomial, geometric, hypergeometric, negative binomial, Poisson, uniform), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Formulas agree with sources; two major findings open on the identification list (NB ratio rule under the page own parameterisation; missing 1..n condition on the uniform mean).
