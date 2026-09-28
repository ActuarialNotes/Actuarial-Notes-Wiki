---
target: Concepts/Gamma.md
created: 2026-09-28
---

## [F-001] Variance-over-mean scale trick claimed for any scale family
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: example Finding Gamma Parameters from Mean and Variance, closing sentence, line 72
- claim: This ratio trick — variance over mean gives the scale — works for any scale family and is faster than solving the two equations simultaneously.
- evidence: Var/E = theta holds for the gamma because alpha theta^2 / (alpha theta) = theta for every alpha (SOA Tables for Exam C A.3.2.1, printed p.4, PDF p.9: E[X^k] = theta^k alpha(alpha+1)...(alpha+k-1)). It fails for other scale families in the same tables. Pareto with alpha = 3 (A.2.3.1, printed p.3, PDF p.8, E[X^k] = theta^k k!/((alpha-1)...(alpha-k))): E = theta/2, E[X^2] = theta^2, Var = 0.75 theta^2, so Var/E = 1.5 theta. Beta with a = b = 1 and scale theta (A.6.1.2, printed p.8, PDF p.13), i.e. uniform on (0, theta): E = theta/2, Var = theta^2/12, Var/E = theta/6. A student applying the trick to a Pareto or a uniform recovers the wrong scale.
- source_rank: 1
- proposed_action: Restrict the remark to the gamma family (exponential included), where Var/E equals theta for every alpha, and delete the words works for any scale family.
- applied: false
- fingerprint: b3a6f3f89f32

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: pdf (x/theta)^alpha e^(-x/theta)/(x Gamma(alpha)) equals the page form; E[X^k] = theta^k Gamma(alpha+k)/Gamma(alpha) gives E = alpha theta, Var = alpha theta^2, CV = 1/sqrt(alpha): tables A.3.2.1. alpha = 1 reproduces the exponential entry (A.3.3.1). Gamma(alpha+1) = alpha Gamma(alpha) and Gamma(k+1) = k! from the integer-moment rows (A.3.2.1, A.3.3.1). Chi-squared = gamma with rate 1/2 and shape n/2, i.e. theta = 2: G&S p.296. Sum of n iid exponentials is gamma(n): G&S p.207 and p.300. Integer-alpha survival as a Poisson sum: G&S p.207 G_n(x) = 1 - e^(-lambda x)(1 + lambda x/1! + ... + (lambda x)^(n-1)/(n-1)!), and SOA Q390 P(X > 4) = (7/3)e^(-4/3) = 0.6151 for alpha = 2, theta = 3. Notation: SOA Q507 writes beta for the scale (E = alpha beta = 600) and G&S uses beta for the shape; the page names only the rate usage but tells the reader to check the convention. Examples recomputed before reading: 1000, 250000, CV 0.50; P(T > 1) = 5e^(-2) = 0.6767; theta = 400, alpha = 2. All agree. Links and embeds resolve. Open major F-001 (scale-family remark).
- sources_checked: SOA, Tables for Exam C (Fall 2009), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; A.1 Introduction printed p.1 (PDF p.6), A.2.3.1 Pareto printed p.3 (PDF p.8), A.3.2.1 Gamma printed p.4 (PDF p.9), A.3.3.1 Exponential printed p.6 (PDF p.11), A.6.1.2 beta printed p.8 (PDF p.13); Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.2 p.207 (PDF p.215) and 7.2 pp.296, 300 (PDF pp.304, 308), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Exam P Sample Solutions (Aug 2026 revision), Q390 (PDF p.109) and Q507 (PDF pp.139-140), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf

## [F-001/R] Variance-over-mean scale trick restricted to the gamma
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Closing sentence now says the trick is a gamma property (exponential included): Var/E = alpha theta^2/(alpha theta) = theta for every alpha, from SOA Tables for Exam C A.3.2.1 (PDF p.9, page image), E[X^k] = theta^k (alpha+k-1)...alpha. The words works for any scale family are gone; the page gives the uniform on (0, theta) as a scale family where it fails: A.6.1.2 with a = b = 1 gives E = theta/2, E[X^2] = theta^2/3, Var = theta^2/12, Var/E = theta/6. Pareto alpha = 3 (A.2.3.1, PDF p.8, page image) also fails: E = theta/2, E[X^2] = theta^2, Var/E = 1.5 theta.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001: E = alpha theta and Var = alpha theta^2 from A.3.2.1 moments (k = 1, 2), CV = 1/sqrt(alpha); uniform and Pareto counterexamples recomputed from A.6.1.2 and A.2.3.1; examples recomputed: 1000, 250000, CV 0.50; P(T > 1) = 5e^-2 = 0.677; theta = 400, alpha = 2. Chi-squared and sum-of-exponentials lines not re-read this session, hence medium.
- sources_checked: SOA, Tables for Exam C (Fall 2009), A.2.3.1 Pareto printed p.3 (PDF p.8, page image), A.3.2.1 Gamma printed p.4 (PDF p.9, page image), A.6.1.2 beta printed p.8 (PDF p.13), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf
