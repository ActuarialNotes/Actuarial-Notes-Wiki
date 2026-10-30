---
target: Concepts/Independent Random Variables.md
created: 2026-09-28
---

## [F-001] Example stem asserts uniform marginals the joint density does not have
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: example Verifying Independence, stem, line 27
- claim: X ~ Uniform(0,1) and Y ~ Uniform(0,1) with joint density f(x,y) = 2 for 0 < x < y < 1
- evidence: Recomputed before reading the answer: f_X(x) = int_x^1 2 dy = 2(1-x) and f_Y(y) = int_0^y 2 dx = 2y on (0,1); neither is the Uniform(0,1) density 1, and the page answer derives the same two marginals. No pair with Uniform(0,1) marginals has this joint density, so the stem states a contradiction. The conclusion survives: 4y(1-x) != 2, so by G&S Thm 4.2 (PDF p.173, density factorisation iff independent) X and Y are not independent.
- source_rank: 5
- proposed_action: Remove the Uniform(0,1) assertions from the stem (e.g. state only that X and Y have joint density 2 on 0 < x < y < 1). Author wording; not auto-fixed.
- applied: false
- fingerprint: cd058d33b88d

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: CDF factorisation against G&S Def. 4.7 (PDF p.173); density factorisation against G&S Thm 4.2 (PDF p.173); Cov = 0 under independence and converse false against G&S Ex. 6.2.23 (PDF p.275), Ex. 6.3.17 (PDF p.289) and SOA sample solution Q248 (Cov 0 yet dependent, PDF p.73); E[XY] = E[X]E[Y] against G&S Thm 6.4 (PDF p.241); Var(X+Y) = Var X + Var Y against G&S Thm 6.8 (PDF p.267); CLT for i.i.d. sums against G&S §9.2 (PDF p.348) and syllabus Topic 3 i; example recomputed before reading the answer: marginals 2(1-x) and 2y, product 4y(1-x) != 2, not independent, agrees; stem uniform-marginal claim contradicted (F-001); 3 wiki-links and 1 embed resolve
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.7 and Thm 4.2 (PDF p.173), Thm 6.4 (PDF p.241), Thm 6.8 (PDF p.267), Ex. 6.2.23 (PDF p.275), Ex. 6.3.17 (PDF p.289), §9.2 (PDF p.348), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q248 (PDF p.73), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 2 outcomes e-f (PDF p.3) and Topic 3 outcome i (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-001/R] Example stem no longer asserts uniform marginals
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Stem now states only the joint density f(x,y) = 2 on 0 < x < y < 1 (0 elsewhere); the contradictory Uniform(0,1) assertions are gone. Recomputed: f_X(x) = 2(1-x), f_Y(y) = 2y, product 4y(1-x) differs from 2, so X and Y are not independent (G&S Thm 4.2, PDF p.173). Answer unchanged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001: cdf and density factorisation (G&S Def. 4.7, Thm 4.2); Cov = 0 under independence with the converse false (G&S Ex. 6.2.23, 6.3.17(b); SOA Q248), hence E[XY] = E[X]E[Y]; Var of an independent sum (G&S Thm 6.8); CLT for i.i.d. sums (Thms 9.4, 9.6). Example recomputed: marginals 2(1-x), 2y; product 4y(1-x) differs from 2, not independent.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.7 and Thm 4.2 (PDF p.173), Thm 6.8 (V(X+Y)=V(X)+V(Y) for independent X, Y), Ex. 6.2.23 (PDF p.275), Ex. 6.3.17 (PDF p.289), Thms 9.4 and 9.6 (PDF pp.351, 365), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q248 (Cov = 0 yet dependent, PDF p.73), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Covariance and Correlation (Cov = E[XY]-EX EY; independent implies uncorrelated, converse not necessarily true), web page as fetched 2026-09-28, sha256:330faf8fb05f924926ce40a5e577b79910d97ec946263f40c64bf5e1277a9f82 — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:36Z/7439
- date: 2026-10-30
- status_set: verified
- confidence: medium
- checks_run: Diff against 0287511f read in full: additions only, no prior sentence changed; earlier content and its prior sources (re-cited) unchanged; new wiki-links resolve; LaTeX balanced; no question numbers, scenario or wording on the page (compared with the items' question files). Functions of independent variables independent (Siegrist 2.5) and E[g(X)h(Y)] = E[g(X)]E[h(Y)] (Pishro-Nik 5.2.3). Pattern counting re-derived: event = sum over its points (5.1.1), each point a product of PMF values by independence, points with the same multiset of values equally likely and counted by the multinomial coefficient (Siegrist 11.5). New example recomputed before reading its answer: 3(0.2)(0.25)+3(0.09)(0.5) = 0.150+0.135 = 0.285, and by direct convolution (0.25,0.30,0.29) then 0.29(0.5)+0.30(0.3)+0.25(0.2) = 0.285; agrees.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.7 and Thm 4.2 (PDF p.173), Thm 6.8 (V(X+Y)=V(X)+V(Y) for independent X, Y), Ex. 6.2.23 (PDF p.275), Ex. 6.3.17 (PDF p.289), Thms 9.4 and 9.6 (PDF pp.351, 365), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q248 (Cov = 0 yet dependent, PDF p.73), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Covariance and Correlation (Cov = E[XY]-EX EY; independent implies uncorrelated, converse not necessarily true), web page as fetched 2026-09-28, sha256:330faf8fb05f924926ce40a5e577b79910d97ec946263f40c64bf5e1277a9f82 — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 2.5 Independence: if {X_i} is independent then {g_i(X_i)} is independent; the Bernoulli indicator sequence is exchangeable (permuting does not change the probability), HTML fetched 2026-10-30, sha256:5f47788c1c3a1a7a6b7b916b9d339bb59184c723dc6d2ccd05fd1a11639054c9 — https://www.randomservices.org/random/prob/Independence.html; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_{X|A}(x) = f_X(x)/P(A) on A, conditional expectation as the integral against f_{X|A}; independent X, Y have f_XY = f_X f_Y and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-10-30, sha256:b9e764e0b2adb7b888334dd58ee563d47c9c6cd66bd666fa4fa24c7d5e3b32a4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.1.1 Joint PMF: P((X,Y) in A) = sum of P_XY over (A cap R_XY); R_XY taken as R_X x R_Y with some P_XY zero; marginal PMF eq. (5.1), HTML fetched 2026-10-30, sha256:eeadad2f381a4b909be811c27c4f8b6e9e85b96678a9fa9a25bf57ade8bfbabf — https://www.probabilitycourse.com/chapter5/5_1_1_joint_pmf.php; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 11.5 The Multinomial Distribution: each sequence with outcome i occurring j_i times has probability p_1^{j_1}...p_k^{j_k}, the number of such sequences is the multinomial coefficient; generalizes Bernoulli trials (k = 2); Y_i is binomial with parameters n and p_i, HTML fetched 2026-10-30, sha256:eee1779c2c22be3a73f51f9149c846395c8ba2cbe8609433afd865b3c9a50e2e — https://www.randomservices.org/random/bernoulli/Multinomial.html
- note: Re-passed after the Exam P G8 additions (w6); new passages checked against the cited open sources and the short derivations re-done.
