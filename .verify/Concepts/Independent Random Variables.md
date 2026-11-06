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

## [F-002] MAS-I named as a CLT exam without support in its content outline
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-06T18:00Z/29d9
- date: 2026-11-06
- severity: minor
- status: open
- locus: On other exams, first bullet
- claim: The Central Limit Theorem applies to sums of i.i.d. random variables, on Exam P and MAS-I alike.
- evidence: The Exam P syllabus (Nov 2026, Topic 3 outcome i, PDF p.4) names the CLT for i.i.d. sums. The CAS MAS-I 2026 content outline (sha256:245892366dea…) does not: 'central limit' and 'normal approximation' occur nowhere in it, and its Hogg, McKean & Craig reading list for Domain B (PDF p.6) is 1.7, 2.7, 2.8, 3.7, 4.1, 4.4-4.7, 5.1, 6.1-6.5, 7.1-7.6, 8.1-8.3, which omits §5.3, the CLT section of the 8th edition. The CLT may still be used inside the listed hypothesis-testing sections (task B4 'critical values from a sampling distribution'), but that could not be confirmed without the textbook, which is not openly available.
- source_rank: 1
- proposed_action: Either cite the MAS-I reading where the CLT is applied (e.g. a Hogg §4.5-4.6 large-sample test, if it is there) or drop 'and MAS-I alike' from the bullet.
- applied: false
- fingerprint: 19b412badb74

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:00Z/29d9
- date: 2026-11-06
- status_set: verified
- confidence: medium
- checks_run: Recomputed: product table, Var X=0.25, Var Y=0.5275, sum 0.7775 vs dependent 0.9275 with Cov 0.075; zero-covariance trap 1/3 vs 1/9; P(X+Y=3) 0.075 vs 0.10; ALTAM q_xy=0.28; Try-its marginals 2(1-x), 2y; three policies 0.285; E[XY]=2.2, E[X^2Y^2]=9.7067. Definitions against MIT 7a §4, 7b, G&S Defs 4.4/4.7, Thm 4.2, Thm 6.8, Pishro-Nik 5.2.3 (E[g(X)h(Y)]), Siegrist Independence (functions of independent variables). On other exams: FAM syllabus Topic 2 frequency/aggregate models + Siegrist Poisson additivity; ALTAM syllabus Topic 3 (independence of future lifetimes); Exam 9 outline + Wikipedia independence copula; MAS-I could not be confirmed (finding). Links resolve.
- sources_checked: Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7a: Joint Distributions, Independence, §4 Definition: independent iff joint cdf = product of marginal cdfs, equivalently pmf/pdf products; Ex. 12 cell-by-cell check pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf; Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7b: Covariance and Correlation, Property 5 Var(X+Y) = Var X + Var Y + 2Cov; Property 6 and Warning: converse false (p.1), sha256:71f8a7b5f3b2233de2e8722ec1372f5704195efc2a6fb72c50c8ef505f92c4dc — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-b.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.4 (PDF p.151); Def. 4.7 and Thm 4.2 density factorisation (PDF p.173); Thm 6.8 Var(X+Y) = V(X)+V(Y) for independent X, Y (PDF p.267), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_X|Y = f_XY/f_Y; E[X|Y=y], Var(X|Y=y); independence gives f_X|Y = f_X, E[XY] = EX EY and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-11-06, sha256:5d697207bda40aa9ff1ce9a59db1231fe112d2fd061fed5ce08921d8c889c03a — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 2.5 Independence: functions g_i(X_i) of independent variables are independent; the indicator sequence is exchangeable, HTML fetched 2026-11-06, sha256:5f47788c1c3a1a7a6b7b916b9d339bb59184c723dc6d2ccd05fd1a11639054c9 — https://www.randomservices.org/random/prob/Independence.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), The Poisson Distribution: independent Poisson N, M with parameters a, b: N + M is Poisson(a + b), HTML fetched 2026-11-06, sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html; SOA Exam FAM syllabus, February 2027, Topic 2 Severity, Frequency, and Aggregate Models, outcomes e-k (PDF p.3), sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf; SOA Exam ALTAM syllabus, October 2026, Topic 3 Joint Life Insurance and Annuities, outcomes a-b (independence or dependence of future lifetimes) (PDF p.3), sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf; CAS Exam 9 Content Outline, Fall 2026, Domain D (Brehm et al.) task 5 'Select models to manage diverse risks and evaluate correlations of risks' (PDF p.6) and Brehm chapters 1-5 (PDF p.7), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Wikipedia, Copula (statistics): Sklar's theorem (joint distribution = copula of the marginals) and the independence copula C(u,v) = uv, HTML fetched 2026-11-06, sha256:0e663c458baaef81b2713afb34d7f77eca2f8bd460043883f22cc02b2d51c556 — https://en.wikipedia.org/wiki/Copula_(statistics); SOA Probability Exam (Exam P) syllabus, November 2026, Topic 3 outcomes g-i (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Re-check of the rewritten page (teaching-style rewrite). Every claim and number checked; all prior findings remain closed. One minor finding open: MAS-I named as a CLT exam without outline support; every other claim, including the FAM, ALTAM and Exam 9 bullets, held against the sources cited.
