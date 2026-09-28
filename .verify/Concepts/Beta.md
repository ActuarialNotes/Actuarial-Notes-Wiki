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
