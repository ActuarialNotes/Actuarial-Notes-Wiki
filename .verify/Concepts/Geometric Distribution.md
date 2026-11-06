---
target: Concepts/Geometric Distribution.md
created: 2026-09-28
---

## [F-001] Memorylessness example prompt admits a second reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: nit
- status: open
- locus: example Using Memorylessness After a Dry Spell, prompt, line 38
- claim: Find the probability that at least 3 more must be reviewed before the first claim appears.
- evidence: Read as at least 3 further reviews up to and including the one with the claim: P(X>10 | X>8) = P(X>2) = 0.8^2 = 0.64 (my recomputation before reading, and the page answer). Read as at least 3 further claim-free reviews before the claim: P(X>11 | X>8) = 0.8^3 = 0.512. The answer states the event explicitly (X > 8+2), so the result is not wrong for the event it names; memorylessness itself per Grinstead & Snell 5.1 p.186 (PDF p.194), P(T>r+s | T>r) = q^s.
- source_rank: 3
- proposed_action: Reword the prompt to name the event, e.g. that the first claim is on the 11th policy or later.
- applied: false
- fingerprint: 07d2dd4cb988

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: trials pmf and support (G&S p.185); E=1/p, Var=(1-p)/p^2 (G&S p.262); memoryless property and exponential link (G&S p.186); failures form Y=X-1: Exam C B.2.1.2 pk=beta^k/(1+beta)^(k+1), E=beta, Var=beta(1+beta), with beta=(1-p)/p gives (1-p)^k p, (1-p)/p, (1-p)/p^2 (same variance, as stated); survival (1-p)^n (G&S p.186 P(T>r)=q^r); page states its parameterisation explicitly; examples recomputed before reading: 0.8^2 x 0.2=0.128, E=5, P(X>2)=0.64 (all agree; wording nit F-001); links and media exist
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 geometric pmf P(T=j)=q^(j-1)p, j=1,2,... p.185 (PDF p.193); memoryless P(T>r+s|T>r)=q^s, also obeyed by the exponential, p.186 (PDF p.194); 6.2 E(T)=1/p and V(T)=q/p^2 p.262 (PDF p.270), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-09-27, 3.2.2 geometric EX=1/p on range 1,2,3,..., sha256:cef561084124ba2a0ab25d131a56f9647e8f53a20ab41be7c4480f11fb27c5bf — https://www.probabilitycourse.com/chapter3/3_2_2_expectation.php

## [F-001/R] Memorylessness example prompt names the event
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Prompt now asks for the probability that the first claim comes on the 11th policy or later, i.e. X > 10 given X > 8, which is the event the answer computes: P(X > 8+2 | X > 8) = P(X > 2) = 0.8^2 = 0.64 (Grinstead & Snell 5.1 p.186, PDF p.194: P(T > r+s | T > r) = q^s). The alternative reading (0.512) is no longer available.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: pmf, survival q^n, memorylessness and E = 1/p against G&S; failures form pk = beta^k/(1+beta)^(k+1) = (1-p)^k p with beta = (1-p)/p, E[N] = beta = (1-p)/p and Var[N] = beta(1+beta) = (1-p)/p^2 against Exam C tables B.2.1.2; examples recomputed: 0.8^2 x 0.2 = 0.128, E = 5, P(X > 10 | X > 8) = 0.64.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 geometric pmf P(T=j) = q^(j-1) p p.185 (PDF p.193); P(T > k) = q^k and memoryless P(T > r+s | T > r) = q^s, also obeyed by the exponential, p.186 (PDF p.194); 6.2 E(T) = 1/p p.262 (PDF p.270), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), B.2.1.2 geometric (PDF p.15, page image), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:01Z/8f44
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: pmf q^(k-1)p, P(X>n)=q^n, memorylessness, E=1/p, Var=q/p^2 against G&S 5.1 and Ex. 6.19; table 0.2/0.16/0.128/0.1024/0.0819, P(X>3)=0.512, Var=20, sd 4.47, P(X>10|X>8)=0.64, 0.8^10=0.107; failures form mean (1-p)/p, same variance; Loss Models form beta^k/(1+beta)^(k+1), mean beta, var beta(1+beta), r=1 negative binomial, p=1/(1+beta), from MAS-I tables B.2.1.2 (FAM, ASTAM syllabi name (a,b,0) frequency from Loss Models); Try-it: e^-0.6-e^-0.8=0.0995, 0.49, E=2, Var=6, (2/3)^3=0.2963.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 geometric P(T=j) = q^(j-1)p p.185 (PDF p.193); P(T>k) = q^k and memoryless P(T>r+s|T>r) = q^s, also obeyed by the exponential, p.186 (PDF p.194); §6.2 Example 6.19 E(T)=1/p, V(T)=q/p^2 p.262 (PDF p.270), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; CAS, Tables for Exam MAS-I (version date 01/15/2018, linked from the CAS MAS-I exam page), p.1 (tables used when writing MAS-I questions); p.15 Appendix B.2 (a,b,0) class: B.2.1.1 Poisson, B.2.1.2 geometric-beta, B.2.1.3 binomial-q,m, B.2.1.4 negative binomial-beta,r, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; SOA, Exam FAM syllabus (2027 February), Topic 2 outcomes e)-j) (a,b,0) frequency, individual risk model, normal approximation, p.3; readings Loss Models Ch. 6, p.8, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf; SOA, Exam ASTAM syllabus (October 2026), Topic 2 a) aggregate claims with (a,b,0) or (a,b,1) frequency, p.2; Loss Models readings, p.6, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 13.4 The Poisson Distribution: P(N_t=n) = e^{-rt}(rt)^n/n!; modes at a-1 and a for integer a; sum of independent Poissons; N_s given N_t = n is binomial(n, s/t), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html
- note: Full re-check after the Exam P teaching-style rewrite; every claim on the page checked, numbers recomputed in python before comparing; checker is a different agent from the writer.
