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

## [F-001/R] Negative-values remark now admits a uniform with a < 0
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Bullet now reads: apart from a uniform with a < 0, the normal is the only one on this list that can go negative, and the only one with no lower bound at all. Grinstead & Snell 5.2 p.205 (PDF p.213): the continuous uniform density is 1/(b-a) on [a,b], with no sign condition on a. The exponential (G&S 5.2, density on 0 <= x < infinity) and beta (G&S 4 p.168, PDF p.176, on [0,1]; Exam C tables A.6.1.2, 0 < x < theta) are nonnegative by their supports; gamma and lognormal supports as confirmed in the prior pass.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001: uniform support [a,b] with a unrestricted per G&S 5.2; memoryless attributed to the exponential and geometric only, per G&S p.68 and p.186; gamma mean alpha theta from A.3.2.1 (k = 1); beta mean alpha/(alpha+beta) from A.6.1.2 with theta = 1; example integral 1 - 0.125 = 0.875 recomputed. Lognormal and normal lines not re-read this session, hence medium.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 memoryless, only continuous density with this property is the exponential, p.68 (PDF p.76); 4 beta density on [0,1] p.168 (PDF p.176); 5.1 geometric memoryless p.186 (PDF p.194); 5.2 continuous uniform density 1/(b-a) on [a,b] and exponential density on [0, infinity) p.205 (PDF p.213), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), A.3.2.1 gamma printed p.4 (PDF p.9, page image), A.6.1.2 beta printed p.8 (PDF p.13), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:41Z/6d53
- date: 2026-10-30
- status_set: verified
- confidence: medium
- checks_run: Diff vs 0287511f is additions only (no existing line changed or removed); earlier content unchanged and its prior sources re-cited; every added claim/formula read against the cited section; every added example recomputed (incl. numeric quadrature where relevant); no question's numbers, scenario or wording on the page (compared with the item question files); f(m+x)=f(m-x) verbatim in Siegrist 4.1; half each side from F(a-t)=1-F(a+t) at t=0; percentile above median; symmetric example recomputed; piecewise splitting from integral additivity, P(a<X<=b), LOTUS and normalization; two-piece example c=2/3, E[X]=1, P=7/12 recomputed
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 memoryless, only continuous density with this property is the exponential, p.68 (PDF p.76); 4 beta density on [0,1] p.168 (PDF p.176); 5.1 geometric memoryless p.186 (PDF p.194); 5.2 continuous uniform density 1/(b-a) on [a,b] and exponential density on [0, infinity) p.205 (PDF p.213), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), A.3.2.1 gamma printed p.4 (PDF p.9, page image), A.6.1.2 beta printed p.8 (PDF p.13), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Siegrist, 4.1 Definitions and Basic Properties (expected value), symmetry: a density symmetric about a, that is f(a+x)=f(a-x) (HTML fetched 2026-10-30), sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html; Siegrist, 3.6 Distribution and Quantile Functions: distribution symmetric about a has F(a-t)=1-F(a+t) (t=0 gives F(a)=1/2); quantile symmetry (HTML fetched 2026-10-30), sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html; OpenStax, Calculus Volume 1 (Strang, Herman et al., 2016), §5.2 Properties of the Definite Integral, property 6 eq. 5.14 (additivity over intervals) p.538 (PDF p.546), sha256:202c86537285adf7e5abeb64057c39ee7333ad8c8473b6dd6a9ddf3e72443286 — https://assets.openstax.org/oscms-prodcms/media/documents/CalculusVolume1-OP.pdf; Pishro-Nik, 4.1.1 Probability Density Function: P(a<X<=b)=integral_a^b f_X(u)du; integral of f_X over R = 1 (HTML fetched 2026-10-30), sha256:20e46d6010878510f8f2fb209f72164daf90f0c7379d7d764099b84fc4bdab68 — https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php; Pishro-Nik, 4.1.2 Expected Value and Variance: LOTUS E[g(X)]=integral g(x)f_X(x)dx (4.3); Var(X)=EX^2-(EX)^2 (HTML fetched 2026-10-30), sha256:5ba159d4c07c821a4921efc16bf495e760abbb81638dd01897c7fab3693b05e6 — https://www.probabilitycourse.com/chapter4/4_1_2_expected_val_variance.php
