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

## [F-002] Moved bullet ends in a colon that now introduces nothing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-04T01:06Z/38ca
- date: 2026-11-04
- severity: nit
- status: open
- locus: opening bullets, 'Individual point probabilities are zero; ... areas under $f$:'
- claim: Individual point probabilities are zero; all probabilities are computed as areas under $f$:
- evidence: Before 13f4a424 this bullet sat directly above the formula box '> $$P(a \leq X \leq b) = \int_a^b f(x)\, dx$$', which its colon introduced. The restructure moved the bullet below the box, byte-identical, so the colon is now followed by the CDF bullet. git diff 13f4a424~1 13f4a424 shows the move.
- source_rank: 4
- proposed_action: Replace the trailing colon with a full stop (or fold the bullet into the lead) when the page is next edited; check the answerability record does not quote the colon first.
- applied: false
- fingerprint: 0457419d3f60

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T01:06Z/38ca
- date: 2026-11-04
- status_set: verified
- confidence: high
- checks_run: diff only: 13f4a424 moves the two opening bullets (PDF conditions; point probabilities zero) from above the defining formula to below it, byte-identical, and adds an [!idea] card, a collapsed [!tip] and [!warning] card. Move leaves 'computed as areas under $f$:' introducing nothing (F nit). Idea: point probability 0, only areas, density > 1 possible (G&S p.60), F' = f (G&S Thm 2.1); P(X<b) = P(X<=b) follows from P(X=b) = 0. Traps: density zero off its support (definition); exponential with mean theta is lambda = 1/theta, F = 1 - e^{-x/theta} (G&S p.205-207); memoryless only for the exponential among continuous densities (G&S p.68) and S(a+b)/S(a) otherwise (conditional probability). Tip consistency-checked: 63 exam-p questions tag the page; densities with an unknown constant (p-297, p-341), exponential/uniform stories, median/percentile (p-379, p-395); 'a total approximated by a normal' is an Exam P shape (SOA LO 3i) though none of the 63 tagged questions has it. Links resolve; qc.sh OK.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 memoryless, only continuous density with this property is the exponential, p.68 (PDF p.76); 4 beta density on [0,1] p.168 (PDF p.176); 5.1 geometric memoryless p.186 (PDF p.194); 5.2 continuous uniform density 1/(b-a) on [a,b] and exponential density on [0, infinity) p.205 (PDF p.213), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), A.3.2.1 gamma printed p.4 (PDF p.9, page image), A.6.1.2 beta printed p.8 (PDF p.13), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Siegrist, 4.1 Definitions and Basic Properties (expected value), symmetry: a density symmetric about a, that is f(a+x)=f(a-x) (HTML fetched 2026-10-30), sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html; Siegrist, 3.6 Distribution and Quantile Functions: distribution symmetric about a has F(a-t)=1-F(a+t) (t=0 gives F(a)=1/2); quantile symmetry (HTML fetched 2026-10-30), sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html; OpenStax, Calculus Volume 1 (Strang, Herman et al., 2016), §5.2 Properties of the Definite Integral, property 6 eq. 5.14 (additivity over intervals) p.538 (PDF p.546), sha256:202c86537285adf7e5abeb64057c39ee7333ad8c8473b6dd6a9ddf3e72443286 — https://assets.openstax.org/oscms-prodcms/media/documents/CalculusVolume1-OP.pdf; Pishro-Nik, 4.1.1 Probability Density Function: P(a<X<=b)=integral_a^b f_X(u)du; integral of f_X over R = 1 (HTML fetched 2026-10-30), sha256:20e46d6010878510f8f2fb209f72164daf90f0c7379d7d764099b84fc4bdab68 — https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php; Pishro-Nik, 4.1.2 Expected Value and Variance: LOTUS E[g(X)]=integral g(x)f_X(x)dx (4.3); Var(X)=EX^2-(EX)^2 (HTML fetched 2026-10-30), sha256:5ba159d4c07c821a4921efc16bf495e760abbb81638dd01897c7fab3693b05e6 — https://www.probabilitycourse.com/chapter4/4_1_2_expected_val_variance.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §2.2 p.60 (PDF p.68: point probability 0, f(x) not a probability, f(3/4) = 3/2 > 1); Definition 2.2 and Theorem 2.1 p.61 (PDF p.69: F(x) = integral of f, d/dx F(x) = f(x)); Example 2.17 p.68 (PDF p.76: 'The only continuous density function with this property is the exponential density'); §5.2 Exponential p.205-207 (PDF pp.213-215: f = lambda e^{-lambda x}, F = 1 - e^{-lambda x}, memoryless P(T > r+s | T > r) = P(T > s), lambda the reciprocal of the average), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables (PDF p.3); Topic 3 learning outcome i) Central Limit Theorem (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Diff-only re-pass after the concept-page-standard restructure (13f4a424); checker is a different agent from the writer.

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T04:24Z/cee2
- date: 2026-11-04
- status_set: verified
- confidence: high
- checks_run: diff only (wording pass, 808e4362): idea card gains a framing opener; point probability 0 and density > 1 claims re-read in G&S §2.2 p.60; symmetric-density, piecewise, normal-support, exam-shape and trap bullets split into sentences; symmetric example (80th percentile = 5) and exponential CDF 1 - e^{-x/theta} unchanged. Terminology kept (PDF, CDF). Prior sources unchanged. Open nit F-002 (trailing colon) untouched by this diff, still open.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 memoryless, only continuous density with this property is the exponential, p.68 (PDF p.76); 4 beta density on [0,1] p.168 (PDF p.176); 5.1 geometric memoryless p.186 (PDF p.194); 5.2 continuous uniform density 1/(b-a) on [a,b] and exponential density on [0, infinity) p.205 (PDF p.213), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), A.3.2.1 gamma printed p.4 (PDF p.9, page image), A.6.1.2 beta printed p.8 (PDF p.13), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Siegrist, 4.1 Definitions and Basic Properties (expected value), symmetry: a density symmetric about a, that is f(a+x)=f(a-x) (HTML fetched 2026-10-30), sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html; Siegrist, 3.6 Distribution and Quantile Functions: distribution symmetric about a has F(a-t)=1-F(a+t) (t=0 gives F(a)=1/2); quantile symmetry (HTML fetched 2026-10-30), sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html; OpenStax, Calculus Volume 1 (Strang, Herman et al., 2016), §5.2 Properties of the Definite Integral, property 6 eq. 5.14 (additivity over intervals) p.538 (PDF p.546), sha256:202c86537285adf7e5abeb64057c39ee7333ad8c8473b6dd6a9ddf3e72443286 — https://assets.openstax.org/oscms-prodcms/media/documents/CalculusVolume1-OP.pdf; Pishro-Nik, 4.1.1 Probability Density Function: P(a<X<=b)=integral_a^b f_X(u)du; integral of f_X over R = 1 (HTML fetched 2026-10-30), sha256:20e46d6010878510f8f2fb209f72164daf90f0c7379d7d764099b84fc4bdab68 — https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php; Pishro-Nik, 4.1.2 Expected Value and Variance: LOTUS E[g(X)]=integral g(x)f_X(x)dx (4.3); Var(X)=EX^2-(EX)^2 (HTML fetched 2026-10-30), sha256:5ba159d4c07c821a4921efc16bf495e760abbb81638dd01897c7fab3693b05e6 — https://www.probabilitycourse.com/chapter4/4_1_2_expected_val_variance.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §2.2 p.60 (PDF p.68: point probability 0, f(x) not a probability, f(3/4) = 3/2 > 1); Definition 2.2 and Theorem 2.1 p.61 (PDF p.69: F(x) = integral of f, d/dx F(x) = f(x)); Example 2.17 p.68 (PDF p.76: 'The only continuous density function with this property is the exponential density'); §5.2 Exponential p.205-207 (PDF pp.213-215: f = lambda e^{-lambda x}, F = 1 - e^{-lambda x}, memoryless P(T > r+s | T > r) = P(T > s), lambda the reciprocal of the average), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables (PDF p.3); Topic 3 learning outcome i) Central Limit Theorem (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 6.2 and the remark after it ('expectations add, whether or not the summands are mutually independent') pp.231-232 (PDF pp.239-240); §2.2 p.60 (PDF p.68: f(x) is not the probability of x, f(3/4) = 3/2); §5.1 Hypergeometric p.193 (PDF p.201: counts samples of size n; tends to binomial as N, k -> infinity), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
- note: Diff-only re-pass after the sentence-rules wording pass (808e4362); checker is a different agent from the writer. No meaning change found.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-11-06T18:03Z/5586
- date: 2026-11-06
- resolves: F-002
- status: resolved
- note: The rewrite replaced the bullet: it now reads 'A single point has probability zero, so P(X < b) and P(X <= b) are equal.' with a full stop; the stranded colon is gone.

## [C-006] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:03Z/5586
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: Every number on the page recomputed in python (scipy 1.18) before comparing with the page: f=x/8 normalises on (0,4); P(1<X<3)=0.5; F(x)=x^2/16 table rows 0.0625/0.25/0.5625/1; S(3)/S(2)=7/12 vs S(1)=0.9375; E[X]=8/3, median sqrt 8=2.83, 90th pct sqrt 14.4=3.79, E[X^2]=8, Var=8/9; E[min(X,3)]=1.125+1.3125=2.4375 (numeric quadrature); try-its 0.875 and 0.5^(1/3)=0.794; S(x)=(10-x)^2/100, 0.16/0.64=0.25, S(4)=0.36; two-piece c=2/3, E[X]=1, P(0.5<X<2)=7/12. Definitions: density conditions and P(a<=X<=b) as area, point probability 0, density > 1 possible, F'=f (G&S §2.2); memoryless only the exponential among continuous densities and the geometric discrete (G&S pp.68, 186); symmetric-density median and percentile (Siegrist 4.1, 3.6); law of total expectation for the capped payment (G&S Thm 6.5); chooser means: uniform, exponential theta, gamma alpha theta (Exam C A.3.2.1 E[X^k] k=1), beta a/(a+b), normal mu, lognormal exp(mu+sigma^2/2) (Exam C A.5.1.1); supports confirm only the normal and a uniform with a<0 can be negative. All wiki-links and both embeds resolve.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §2.2 Example 2.17 p.68 (PDF p.76): 'The only continuous density function with this property is the exponential density'; §5.1 geometric memoryless (PDF p.194); §5.2 uniform density 1/(b-a) and exponential density (PDF pp.213-216), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §2.2 p.60 (PDF p.68: point probability 0, f(x) not a probability, f(3/4)=3/2 > 1); Definition 2.2 and Theorem 2.1 (PDF p.69: F = integral of f, F' = f); §4 Beta density on [0,1] (PDF p.176), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 6.5 E(X) = sum_j E(X|F_j)P(F_j) (PDF p.247), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), A.3.2.1 Gamma f, M(t) = (1 - theta t)^-alpha, E[X^k] (printed p.4, PDF p.9 page image, read 2026-11-06); A.3.3.1 Exponential f, F, M(t), VaR_p = -theta ln(1-p), TVaR_p = VaR_p + theta, E[X ^ x] = theta(1 - e^(-x/theta)); A.5.1.1 Lognormal E[X^k] = exp(k mu + k^2 sigma^2/2) (printed p.6, PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 4.1 Definitions and Basic Properties: symmetry, a density symmetric about a has f(a+x)=f(a-x) (HTML fetched 2026-11-06), sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 3.6 Distribution and Quantile Functions: distribution symmetric about a has F(a-t)=1-F(a+t), so F(a)=1/2; quantile symmetry (HTML fetched 2026-11-06), sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.21 The Uniform Distribution on an Interval: E(X)=(a+b)/2 on [a,b], location a any real (HTML fetched 2026-11-06), sha256:8e9ed89d801bc2780eab168757688e254a9484275e8d068c1fd000bf625c8558 — https://www.randomservices.org/random/special/UniformContinuous.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.6 The Normal Distribution: N(mu, sigma^2) on R, mean mu (HTML fetched 2026-11-06), sha256:f4e2fe70308bf064dc44f62716075c9be463a2de262cb0aca8de1d6a0c6ffc84 — https://www.randomservices.org/random/special/Normal.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.17 The Beta Distribution: E(X)=a/(a+b) on (0,1) (HTML fetched 2026-11-06), sha256:9ef44a035fff82ca4d81ae3db74baa55abdc511dfea0522006c4a62e60909032 — https://www.randomservices.org/random/special/Beta.html; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables (PDF p.3); Topic 3 outcome i) Central Limit Theorem (PDF p.4), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Full re-check of the rewritten page (new teaching style). F-002 (stranded colon) closed by the rewrite. No findings.

## [F-003] CDF method for a function of X is not sourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- severity: minor
- status: open
- locus: The CDF-method sentence
- claim: The distribution of a function of X, such as cX or X^2, is found from F by the CDF method.
- evidence: No source I could reach states the CDF method for a function of X. I searched Pishro-Nik §4.1.1 and the Grinstead and Siegrist passages read this session for 'function of' and 'transformation' and found nothing. The method is standard, and the link target (Transformations of Random Variables) is a vault page that is not part of this check. The claim is left unsourced.
- source_rank: 5
- applied: false
- fingerprint: da0f585181c3

## [F-004] Trap sentence attributes the 0.9375 to the exponential
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- severity: nit
- status: open
- locus: The trap card
- claim: Only the exponential would give S(1) = 0.9375 as the answer to P(X > 3 | X > 2).
- evidence: The arithmetic is right: S(2) = 12/16, S(3) = 7/16, so the ratio is 7/12, and S(1) = 15/16 = 0.9375. The sentence reads as though the exponential's answer for this density is 0.9375. The point is that a memoryless density would make P(X > 3 | X > 2) equal S(1), which is 0.9375 here, and only the exponential is memoryless. Grinstead p.68 (PDF p.76) says the exponential is the only continuous density with the memoryless property.
- source_rank: 2
- proposed_action: > For the repair cost, $P(X > 3 \mid X > 2) = \frac{S(3)}{S(2)} = \frac{7}{12}$. If the memoryless property were assumed, the answer would be $S(1) = 0.9375$; only the exponential has that property, so it does not apply here. For any other density, divide the two survival probabilities.
- applied: false
- fingerprint: 11cd36abd0a1

## [F-005] Gamma row says 'waiting time to the alpha-th event' for any alpha
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- severity: nit
- status: open
- locus: The gamma row of the table
- claim: The gamma(alpha, theta) distribution is the waiting time to the alpha-th event, for any alpha.
- evidence: Grinstead §5.2 p.207 (PDF p.215) derives the waiting time to the n-th event (a sum of n exponentials) as a gamma density with integer n, and says that the general gamma density allows any positive real n but does not discuss it. The waiting-time reading therefore holds only for whole alpha. The mean alpha*theta is correct per SOA Exam C A.3.2.1 (k = 1). This is a wording issue, not a wrong figure.
- source_rank: 2
- proposed_action: | Waiting time to the $n$th event, $n$ a whole number | [[Gamma]] $(\alpha, \theta)$ | $(0, \infty)$ | $\alpha\theta$ |
- applied: false
- fingerprint: 7fe53b66603b

## [C-007] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- status_set: in_review
- checks_run: Blind examples solved first in plain Python with fractions: C4 c = 1/8 (8c = 1); C10 P(X>3) = 7/16 = 0.4375; C14 P(X<=4)=0.5 and P(X<=5)=0.8 so the 80th percentile is 5; C17 answers beta (share), exponential (constant-rate waiting time), normal (CLT). All four match the page's working line by line (C4 8c=1, C10 F(3)=9/16, S(3)=7/16, C14 0.5+0.3=0.8, C17 three named fits). C1-C2 density conditions f>=0 and total area 1: Pishro-Nik s.4.1.1 (f_X>=0; integral over R = 1); Grinstead Def 2.1 p.59 (PDF p.67) gives P(X in E)=integral over E. C3 density zero off its range: Grinstead Example 2.10 (f=0 otherwise). C5-C6 CDF as integral from -inf and survival S=P(X>x): Grinstead Thm 2.1 p.61 (PDF p.69); Siegrist 3.6 F^c = 1-F = P(X>x). C7 S(x)=1+F(x): WRONG. Siegrist 3.6 (CDF.html) states F^c(x)=1-F(x)=P(X>x); Grinstead p.205-207 uses 1-F(s) for the tail; the page's own C10 example gives S(3)=1-0.5625=0.4375. C8 f=F': Grinstead Thm 2.1 (PDF p.69), d/dx F = f. C9 CDF method for a function of X: no reachable source covers it; listed unsourced. C11-C13 symmetry f(m+x)=f(m-x), F(a-t)=1-F(a+t) so F(a)=1/2 and m is the median: Siegrist 4.1 Symmetry (f(a+x)=f(a-x)); Siegrist 3.6 (F(a-t)=1-F(a+t), t=0 gives 1/2). C16 table: uniform mean (a+b)/2 Siegrist 5.21 (E(X)=(1/2)(a+b)); exponential mean theta and Exponential values (0,inf) Grinstead p.205 (0<=x<inf) and SOA Exam C A.3.3.1 (E[X^k]=theta^k Gamma(k+1)); gamma mean alpha*theta SOA Exam C A.3.2.1 (k=1); beta (0,1) and mean a/(a+b) Siegrist 5.17 (E(X^k) form, k=1) and Grinstead s.4 (beta density on [0,1]); normal all reals, mean mu Siegrist 5.6 (location parameter is the mean; mu in (-inf,inf)); lognormal (0,inf), mean exp(mu+sigma^2/2) SOA Exam C A.5.1.1 (E[X^k]=exp(k mu + k^2 sigma^2/2), k=1, z=(ln x - mu)/sigma). Memoryless attributed to the exponential among continuous densities: Grinstead Example 2.17 p.68 (PDF p.76) and s.5.2 p.206-207. Sums/averages approximately normal: SOA Exam P syllabus Topic 3 outcome i (CLT, PDF p.4). C15 'a share... so it is beta': Siegrist 5.17 says the beta distribution is useful for modeling random probabilities and proportions, so the example's choice is supported. C10 and C14 and C4 checked against source formulas (density, CDF integral). C18 trap: arithmetic checked: S(3)/S(2) = (7/16)/(12/16) = 7/12 and S(1) = 15/16 = 0.9375, both correct; the sentence wording is a nit (see finding 3). C16 gamma 'waiting time to the alpha-th event' holds for whole alpha (Grinstead s.5.2 p.207 says the general gamma allows any positive real n but is not discussed as a waiting time); see finding 4.
- sources_checked: Grinstead & Snell, Introduction to Probability, §2.2 Definition 2.1 p.59 (PDF p.67), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability, §2.2 Theorem 2.1 p.61 (PDF p.69); Example 2.17 p.68 (PDF p.76); §2.2 p.60 (PDF p.68), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability, §5.2 pp.205-207 (PDF pp.213-215), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §3.6 Distribution and Quantile Functions: reliability F^c = 1 - F, symmetry F(a-t)=1-F(a+t), quantile symmetry, sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §4.1 Symmetry, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §5.6 Normal distribution: location parameter is the mean, sha256:f4e2fe70308bf064dc44f62716075c9be463a2de262cb0aca8de1d6a0c6ffc84 — https://www.randomservices.org/random/special/Normal.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §5.17 Beta distribution: modeling random probabilities and proportions; E(X^k), sha256:9ef44a035fff82ca4d81ae3db74baa55abdc511dfea0522006c4a62e60909032 — https://www.randomservices.org/random/special/Beta.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §5.21 The Uniform Distribution on an Interval: E(X) = (a+b)/2, sha256:8e9ed89d801bc2780eab168757688e254a9484275e8d068c1fd000bf625c8558 — https://www.randomservices.org/random/special/UniformContinuous.html; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §4.1.1 Probability density function: f_X >= 0, integral = 1, CDF as integral, sha256:ca7a69b5758983d339d4c2f5cc12f4046ae40be69410512baa75663c329131fa — https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php; SOA, Tables for Exam C (Fall 2009), A.3.2.1 Gamma, A.3.3.1 Exponential, A.5.1.1 Lognormal (printed pp.4, 6; PDF pp.9, 11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 3 learning outcome i) Central Limit Theorem (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
