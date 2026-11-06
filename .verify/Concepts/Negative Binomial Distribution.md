---
target: Concepts/Negative Binomial Distribution.md
created: 2026-09-28
---

## [F-001] Var(X) > E[X] always is false for the trials-count X the page defines
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: notes, bullet 2, line 25
- claim: Var(X) > E[X] always, so the negative binomial is the standard overdispersed alternative to the Poisson for claim counts in a heterogeneous portfolio.
- evidence: For the X defined on the page (trials until the r-th success, support r, r+1, ...), E[X]=r/p (Pishro-Nik 3.2.2, Pascal EX=m/p) and Var(X)=r(1-p)/p^2 (SOA Tables for Exam C App. B.2.1.4, PDF p.15: Var[N]=r beta(1+beta) with beta=(1-p)/p, unchanged by the shift X=N+r). Var(X)>E[X] iff (1-p)/p>1 iff p<1/2. Counterexample: r=3, p=0.75 gives E[X]=4, Var(X)=3(0.25)/0.5625=1.333, less than 4. The inequality holds always only for the failures count Y=X-r, where Var(Y)/E[Y]=1/p=1+beta>1 (Exam C Tables B.2.1.4). The heterogeneous-portfolio rationale is not stated in any source read this session.
- source_rank: 1
- proposed_action: Restrict the overdispersion statement to the failures-count form Y (Var(Y) = E[Y]/p > E[Y]), and source or drop the heterogeneous-portfolio clause.
- applied: false
- fingerprint: a1a9ebc257fa

## [F-002] CAS MAS-I context uses the Loss Models NB(r, beta) failures form; page gives no beta mapping
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: notes, bullet 1, line 24
- claim: The alternative counts failures before the r-th success, Y = X - r, with P(Y=k) = C(k+r-1,k) p^r (1-p)^k
- evidence: Exam MAS-I (CAS).md lists [[Negative Binomial Distribution]] among the distributions that arise from Poisson processes (mixed Poisson process, random rate across the portfolio). The Loss Models parameterisation (SOA Tables for Exam C App. B.2.1.4, PDF p.15) is NB(beta, r) counting failures, pk = r(r+1)...(r+k-1) beta^k / (k!(1+beta)^(r+k)), E=r beta, Var=r beta(1+beta), with r any positive real. The page gives only (r, p) forms with r = number of successes required (an integer) and never states the mapping p = 1/(1+beta). Exam P usage (SOA sample solution Q146, PDF pp.42-43: third malfunction on the fifth day, C(4,2)(0.4)^2(0.6)^2(0.4) = 0.13824) is the trials form the page leads with. Usage differs by context; flagged, not reconciled.
- source_rank: 1
- proposed_action: Add a note mapping the page parameterisation to the Loss Models NB(r, beta) form (p = 1/(1+beta), Y = failures, r not necessarily an integer) for readers arriving from Exam MAS-I.
- applied: false
- fingerprint: 98b66ac7b6b6

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: trials pmf C(k-1,r-1)p^r(1-p)^(k-r), k=r,r+1,... (G&S p.187; SOA Q146 applies the same form); r=1 geometric (G&S p.187; Exam C B.2.1.2 note); E=r/p (Pishro-Nik 3.2.2); Var=r(1-p)/p^2 (sum of r independent geometrics, G&S pp.289, 262; Exam C rbeta(1+beta) with beta=(1-p)/p); failures form C(k+r-1,k)p^r(1-p)^k, E[Y]=r(1-p)/p (Exam C B.2.1.4 with beta=(1-p)/p); page states which parameterisation it uses; overdispersion claim false for trials X -> F-001; MAS-I parameterisation flag -> F-002; example recomputed before reading: C(6,2)=15 x 0.015625 x 0.31640625 = 0.074158 -> 0.0742 (agrees); links and media exist
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 negative binomial u(x,k,p)=C(x-1,k-1)p^k q^(x-k), trials until the k-th head, k=1 geometric, p.187 (PDF p.195); 7.1 convolution of k geometrics is negative binomial p.289 (PDF p.297); 6.2 geometric V=q/p^2 p.262 (PDF p.270), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-09-27, 3.2.2 Pascal(m,p) EX=m/p, sha256:cef561084124ba2a0ab25d131a56f9647e8f53a20ab41be7c4480f11fb27c5bf — https://www.probabilitycourse.com/chapter3/3_2_2_expectation.php; SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q146 solution PDF pp.42-43 (negative binomial probability of the third success on the fifth trial), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf
- note: Formulas agree with sources; open major F-001 on the overdispersion claim and minor F-002 flagging the CAS MAS-I (Loss Models) parameterisation.

## [F-001/R] Overdispersion restricted to the failures count; unsourced portfolio clause dropped
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Bullet rewritten: Var(Y)/E[Y] = 1/p = 1+beta > 1 for the failures count Y, while the binomial ratio is below 1 and the Poisson ratio is exactly 1 (SOA Tables for Exam C B.2.1.1, B.2.1.3, B.2.1.4, PDF pp.14-15, page image). The trials count X is now said not to share it: Var(X)/E[X] = (1-p)/p, below 1 when p > 1/2, with the counterexample r = 3, p = 0.75: E = 4, Var = 0.75/0.5625 = 4/3. The heterogeneous-portfolio rationale, which no source read states, was deleted.

## [F-002/R] Loss Models NB(r, beta) mapping added
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: New bullet gives the exam tables failures form with p = 1/(1+beta): pk = r(r+1)...(r+k-1) beta^k / (k!(1+beta)^(r+k)), E = r beta, Var = r beta(1+beta), transcribed from SOA Tables for Exam C B.2.1.4 (PDF p.15, page image). Checked: with beta = (1-p)/p, C(k+r-1,k) p^r (1-p)^k equals the tables pk, r beta = r(1-p)/p = E[Y], r beta(1+beta) = r(1-p)/p^2. The remark that r need not be a whole number rests on the tables own contrast: B.2.1.3 requires m an integer, B.2.1.4 states no such condition. Exam MAS-I usage is not asserted on the page.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001 and F-002: trials pmf against G&S 5.1; failures pmf, mean and variance mapped to the Exam C tables B.2.1.4 with p = 1/(1+beta); ratios 1+beta (failures) and (1-p)/p (trials) recomputed, r=3, p=0.75 counterexample E=4, Var=4/3; example C(6,2)(0.25)^3(0.75)^4 = 0.07416 recomputed = 0.0742. E[X] = r/p taken from the tables mean plus the shift r (Pishro-Nik not re-read this session), hence medium.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 negative binomial u(x,k,p) = C(x-1,k-1) p^k q^(x-k), trials until the k-th head, k = 1 geometric, pp.186-187 (PDF pp.194-195), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), B.2.1.1 Poisson (PDF p.14); B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15, page image), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:36Z/5c0a
- date: 2026-10-30
- status_set: verified
- confidence: medium
- checks_run: additions only; last-trial-fixed coefficient C(k-1,r-1) against G&S 5.1 and Siegrist 11.4; multinomial-before-last-success count (k-1)!/(n_1!...n_m!(r-1)!) re-derived from Siegrist 11.5 multinomial coefficient; at least r successes before s-th failure iff >= r successes in first r+s-1 trials against Siegrist 11.4 Problem of Points; no question numbers on page; prior sources still back unchanged content
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 negative binomial u(x,k,p) = C(x-1,k-1) p^k q^(x-k), trials until the k-th head, k = 1 geometric, pp.186-187 (PDF pp.194-195), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), B.2.1.1 Poisson (PDF p.14); B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15, page image), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 negative binomial u(x,k,p) = C(x-1,k-1) p^k q^(x-k), pp.186-187 (PDF pp.194-195), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-10-30), §11.4 The Negative Binomial Distribution: V_k = n iff X_n = 1 and Y_(n-1) = k-1 (PDF of V_k); The Problem of Points, A wins n points before B wins m iff Y_(n+m-1) >= n, sha256:090f2543374cd589ff963f4addb35f897d0bd1c0c8ff5c08cc7086f659858916 — https://www.randomservices.org/random/bernoulli/NegativeBinomial.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-10-30), §11.5 The Multinomial Distribution: multinomial coefficient n!/(j_1!...j_k!), each sequence probability p_1^j_1...p_k^j_k, sha256:eee1779c2c22be3a73f51f9149c846395c8ba2cbe8609433afd865b3c9a50e2e — https://www.randomservices.org/random/bernoulli/Multinomial.html

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: delta check of the link-only edit in c7887a25 against the target page and the cited reading; rest of the page unchanged since its prior pass
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 negative binomial u(x,k,p) = C(x-1,k-1) p^k q^(x-k), trials until the k-th head, k = 1 geometric, pp.186-187 (PDF pp.194-195), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), B.2.1.1 Poisson (PDF p.14); B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15, page image), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 negative binomial u(x,k,p) = C(x-1,k-1) p^k q^(x-k), pp.186-187 (PDF pp.194-195), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-10-30), §11.4 The Negative Binomial Distribution: V_k = n iff X_n = 1 and Y_(n-1) = k-1 (PDF of V_k); The Problem of Points, A wins n points before B wins m iff Y_(n+m-1) >= n, sha256:090f2543374cd589ff963f4addb35f897d0bd1c0c8ff5c08cc7086f659858916 — https://www.randomservices.org/random/bernoulli/NegativeBinomial.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-10-30), §11.5 The Multinomial Distribution: multinomial coefficient n!/(j_1!...j_k!), each sequence probability p_1^j_1...p_k^j_k, sha256:eee1779c2c22be3a73f51f9149c846395c8ba2cbe8609433afd865b3c9a50e2e — https://www.randomservices.org/random/bernoulli/Multinomial.html
- note: Delta pass for one link sentence: '[[Frequency Distribution]] sets it beside the Poisson and binomial as a claim-count model.' True of the target, whose table lists Poisson, binomial and negative binomial (r, beta) with p0 = (1+beta)^-r (consistency, rank 4); the pmf itself is in the SOA tables already among this page's sources. The MAS-I masi-an-014:r2 quote was checked still on the page. Rest unchanged.

## [F-003] Exam 8 listed as using the Loss Models NB(r, beta) form; its reading uses NB(r, q)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-06T18:01Z/8f44
- date: 2026-11-06
- severity: major
- status: open
- locus: On other exams, first bullet
- claim: FAM, MAS-I, ASTAM and Exam 8 use the Loss Models form. It counts failures and has parameters r and beta, with p = 1/(1+beta).
- evidence: The CAS Exam 8 Content Outline (October 2026, Exam_8_CO_2026_Fall.pdf, sha256:306e7a7b…) names no Loss Models reading; its distribution reading is Bahnemann, Distributions for Actuaries (CAS Monograph 2, Ch. 1-4 assumed). Bahnemann §3.4 eq. (3.19), PDF p.101 (page image read), writes the negative binomial with parameters r and q: f(n) = C(r+n-1,n) q^r (1-q)^n, q = alpha/(nu+alpha). The CAS Exam 8 Fall 2019 Q3 solution (questions/exam-8/cas8-2019-q3.md) likewise uses p with mean pr/(1-p), not beta. FAM (Loss Models Ch. 6), ASTAM (Loss Models, (a,b,0) frequency) and MAS-I (Tables for Exam MAS-I B.2.1.4 Negative binomial-beta,r; Daniel's MAS-I note Def. 1.21) do use the (r, beta) form.
- source_rank: 2
- proposed_action: Drop Exam 8 from the list (done). If Exam 8 is to be mentioned, a writer should add that Bahnemann parameterises it as (r, q) with q the success probability.
- applied: true
- fingerprint: b9af91ccf7a4

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-11-06T18:01Z/8f44
- date: 2026-11-06
- resolves: F-003
- status: resolved
- note: Deleted 'and Exam 8' (bullet now reads 'FAM, MAS-I and ASTAM use the Loss Models form.'). Remaining three exams re-checked against the MAS-I tables B.2.1.4, Daniel Def. 1.21 and the FAM/ASTAM syllabi.

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:01Z/8f44
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: pmf C(k-1,r-1)p^r(1-p)^(k-r), r=1 geometric against G&S 5.1; E=r/p, Var=r(1-p)/p^2 and failures form C(k+r-1,k)p^r(1-p)^k against Siegrist 11.4; table recomputed (0.0156/0.0527/0.0742/0.0779/0.0704), E=12, Var=36; neighbour ratio k/(k-r+1)(1-p) = 1 at k=8, modes at 8 and 9 (Siegrist failures mode t=(k-1)(1-p)/p=6, two modes 5 and 6 failures); E[Y]=9, ratio 36/9=4, trials counterexample r=3,p=0.75 gives 4 and 4/3; problem of points P(Bin(7,0.25)>=3)=0.2436 (also by exact recursion); multinomial 90*0.35^2*0.4^2*0.25^3=0.0276; Loss Models (r,beta) pmf, r*beta, r*beta(1+beta), Poisson-gamma r=alpha, beta=theta from MAS-I tables and Daniel; Try-it: 0.1382, 12 and 60 (non-sixes mean 10), 0.4752. Exam 8 attribution removed (F-003).
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 negative binomial: toss until the k-th head, X = number of tosses, u(x,k,p) = C(x-1,k-1)p^k q^(x-k), k=1 geometric, pp.186-187 (PDF pp.194-195), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 11.4 The Negative Binomial Distribution: V_k trial number of the k-th success, E = k/p, var = k(1-p)/p^2; W_k = V_k - k failures, pdf C(n+k-1,n)p^k(1-p)^n, mode at floor((k-1)(1-p)/p) with two modes when integer; the problem of points, sha256:090f2543374cd589ff963f4addb35f897d0bd1c0c8ff5c08cc7086f659858916 — https://www.randomservices.org/random/bernoulli/NegativeBinomial.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 11.5 The Multinomial Distribution: multinomial coefficient and product of category probabilities, sha256:eee1779c2c22be3a73f51f9149c846395c8ba2cbe8609433afd865b3c9a50e2e — https://www.randomservices.org/random/bernoulli/Multinomial.html; CAS, Tables for Exam MAS-I (version date 01/15/2018, linked from the CAS MAS-I exam page), p.1 (tables used when writing MAS-I questions); p.15 Appendix B.2 (a,b,0) class: B.2.1.1 Poisson, B.2.1.2 geometric-beta, B.2.1.3 binomial-q,m, B.2.1.4 negative binomial-beta,r, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Daniel, "Poisson Processes (and Mixture Distributions)", CAS study note (June 2008), MAS-I reading, Definition & Properties 1.21 negative binomial (r, beta), Pr[M=k] = r(r+1)...(r+k-1) beta^k / (k!(1+beta)^(k+r)), E = r beta; Poisson mixed over Gamma(alpha, theta) is negative binomial with r = alpha, beta = theta (PDF pp.11-12), sha256:aca974b4085c586e0aadb1461460aa42444310b5ab1986fc5b38ea2aa540ba01 — https://www.casact.org/library/studynotes/3_Poisson_2008.pdf; SOA, Exam FAM syllabus (2027 February), Topic 2 outcomes e)-j) (a,b,0) frequency, individual risk model, normal approximation, p.3; readings Loss Models Ch. 6, p.8, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf; SOA, Exam ASTAM syllabus (October 2026), Topic 2 a) aggregate claims with (a,b,0) or (a,b,1) frequency, p.2; Loss Models readings, p.6, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf; Bahnemann, Distributions for Actuaries, CAS Monograph No. 2 (Exam 8 reading), §3.4 Negative Binomial Distributions, eq. (3.19): f(n) = C(r+n-1,n) q^r (1-q)^n, parameters r and q, PDF p.101 (page image read), sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf
- note: Full re-check after the Exam P teaching-style rewrite; every claim on the page checked, numbers recomputed in python before comparing; checker is a different agent from the writer. One fix applied this pass (F-003); the edited bullet re-checked.
