---
target: Concepts/Continuous Univariate Distributions.md
created: 2026-09-28
---

## [F-001] Claim that only the normal can go negative ignores the uniform on (a,b)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: Choosing the right one, note bullets, line 35
- claim: The normal is the only one on this list allowed to go negative — a red flag if the quantity is a loss.
- evidence: The same list offers the Uniform on (a,b) with no sign restriction on a. NIST e-Handbook 1.3.6.6.2 gives the uniform pdf 1/(B - A) for A <= x <= B with A a location parameter (any real), so Uniform(-1,1) is negative with probability 1/2. The other four (exponential, gamma, beta, lognormal) are nonnegative by their supports in the SOA Tables for Exam C (PDF pp.9, 11, 13). The statement holds only for those four plus a uniform with a >= 0.
- source_rank: 3
- proposed_action: Qualify the sentence so it does not exclude a uniform with a < 0 (e.g. the normal is the only one here with support unbounded below). Wording is an authoring decision.
- applied: false
- fingerprint: 6d818e9160dd

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Density conditions and P(a <= X <= b) = integral of f: G&S Def 2.1 p.59; F = integral of f and F-prime = f: G&S Thm 2.1 p.61; zero point probabilities follow from Def 2.1 with a = b; S = 1 - F. Means in the chooser: uniform (a+b)/2 NIST 1.3.6.6.2; exponential theta, gamma alpha*theta, beta a/(a+b) (tables beta with theta = 1), lognormal exp(mu + sigma^2/2) SOA Tables pp.4, 6, 8; normal mean mu G&S p.213. Memoryless: only continuous density is the exponential (G&S p.68), shared with the geometric (G&S p.206). Gamma as waiting time to the n-th event: G&S p.207. Lognormal mu, sigma are the parameters of ln X: tables A.5.1.1 z = (ln x - mu)/sigma. Example recomputed before reading: f = 3x^2, P(0.5 < X < 1) = 1 - 0.125 = 0.875, agrees. All 9 wiki-links resolve; the figure embed exists. Open minor F-001 (negative-support remark).
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 Definition 2.1 p.59 (PDF p.67), Theorem 2.1 p.61 (PDF p.69), Example 2.17 p.68 (PDF p.76), 5.2 pp.206-207 and 213 (PDF pp.214-215, 221), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; A.3.2.1 Gamma printed p.4 (PDF p.9), A.3.3.1 Exponential and A.5.1.1 Lognormal printed p.6 (PDF p.11), A.6.1.2 beta printed p.8 (PDF p.13); NIST/SEMATECH e-Handbook of Statistical Methods, 1.3.6.6.2 Uniform Distribution (pdf, cdf, common statistics), fetched 2026-09-28, sha256:c420db7b6567c417241eca246094bddb30692813e5cd34c260f396a9f8796fad — https://www.itl.nist.gov/div898/handbook/eda/section3/eda3662.htm
