---
target: Concepts/Variance.md
created: 2026-09-28
---

## [F-001] Zero-variance converse unsourced and loosely stated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 3, line 17
- claim: Var(X) >= 0, with equality only if X is constant
- evidence: Pishro-Nik sec. 3.2.4 confirms Var(X) >= 0 (since (X - mu)^2 >= 0) and shows a constant has variance 0, but no source read this session states the converse. The converse holds only almost surely (Var(X) = 0 iff P(X = mu) = 1): a variable that differs from a constant on a probability-zero set also has variance 0.
- source_rank: 3
- proposed_action: Write "with equality only if P(X = mu) = 1" and cite a ranked source for it.
- applied: false
- fingerprint: 27cd20223dd6

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Var = E[(X-mu)^2] vs G&S sec. 6.2 definition; = E[X^2] - mu^2 vs G&S Thm 6.6; Var(aX+b) = a^2 Var(X) vs G&S Thm 6.7 (V(cX) = c^2 V(X), V(X+c) = V(X)); Var >= 0 vs Pishro-Nik sec. 3.2.4; syllabus LO d. Example recomputed before reading the answer: 310000 - 500^2 = 60000, agrees. Links and embed resolve; LaTeX well formed.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), sec. 6.2 definition of V(X), Thm 6.6 and Thm 6.7, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, sec. 3.2.4 Variance (fetched 2026-09-27), sha256:90ca917f6141a0c49d353bdae1e824585656afd7d76c80823c31247f0c522008 — https://www.probabilitycourse.com/chapter3/3_2_4_variance.php; SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Formulas and example confirmed; one minor open (zero-variance converse).

## [F-001/R] Unsourced zero-variance converse removed
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Bullet now states only what Pishro-Nik §3.2.4 says: Var(X) >= 0 because (X - mu)^2 >= 0, and a variable always equal to its mean (Y = 0 in the source) has variance 0. The converse (equality only if constant) is deleted: no source read this session states it.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: Var = E[(X-mu)^2] and Var >= 0 vs Pishro-Nik §3.2.4; E[X^2] - mu^2 vs G&S Thm 6.6; Var(aX+b) = a^2 Var(X) vs G&S Thm 6.7; syllabus LO d. Example recomputed: 310000 - 500^2 = 60000 (agrees). Links resolve; LaTeX well formed.
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §3.2.4 Variance (definition, Var >= 0, variance 0 for a variable equal to its mean), sha256:2eb1d22be0e78ad88e2d456fbf134ecbb4b1515f0eacaef640e8483d4ac88547 — https://www.probabilitycourse.com/chapter3/3_2_4_variance.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorems 6.6 and 6.7, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:05Z/9825
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: Definition and shortcut (G&S Def 6.3, Thm 6.6); var>=0, constant -> 0 (Siegrist 4.3); Var(aX+b)=a^2Var(X) (G&S Thm 6.7, Siegrist 4.3); Var(X1+X2) with 2Cov (Siegrist 4.5), independent sum (G&S Thm 6.8); law of total variance (Siegrist 4.7). Recomputed: weighted squared deviations 8,450/270/27,380 -> 36,100, 500 claim 76% of it; E[X^2]=53,000; 1.21x36,100=43,681; payment (X-50)+: 105, 41,250, 30,225; independent sum 72,200, 2X 144,400; total variance 19,200+16,900=36,100; Try-its 60,000; uniform 83,333.3 and 1.05^2 x = 91,875; mixture 6,250+10,000=16,250 (all agree). On other exams: MAS-II A1 (Bühlmann EPV/VHM per LDA ch.9); MAS-I A3, B5, B6, B9 and FAM Topics 1 and 2 (coverage modifications, aggregate mean and variance). Links and embed resolve.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 6.1 p.226 (PDF p.234, absolute convergence; no expected value otherwise); Thm 6.2 linearity, expectations add whether or not independent; Def. 6.3 variance and standard deviation p.257; Thms 6.6 Var=E(X^2)-mu^2, 6.7 V(cX)=c^2V(X), V(X+c)=V(X), 6.8 V(X+Y)=V(X)+V(Y) independent, 6.9 sigma(S_n)=sigma sqrt(n) (pp.258-260, PDF pp.265-268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.3 Variance: var>=0, =0 iff constant; var(a+bX)=b^2 var(X), sd(a+bX)=|b|sd(X); standard score; cv(X)=sd(X)/E(X), E(X)!=0, compares variability across different means, sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.5 Covariance and correlation: cov=E(XY)-E(X)E(Y); cor=cov/(sd sd); var(X+Y)=var(X)+var(Y)+2cov(X,Y), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.7 Conditional expected value: var(Y)=E[var(Y|X)]+var[E(Y|X)], sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html; CAS, Exam MAS-II Content Outlines (2026), Domain A Introduction to Credibility, tasks 1-2: classical (limited fluctuation), Bühlmann, Bühlmann-Straub and Bayesian credibility; reading Tse (p.2), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; Frees et al., Loss Data Analytics (open text), Ch. 9 Credibility: §9.2 full credibility standards, n_X = lambda_kp (sigma_X/mu_X)^2 (eq. 9.6), n_PP = lambda_kp[sigma_N^2/mu_N + (sigma_X/mu_X)^2], lambda_kp=(y_p/k)^2; §9.3 Bühlmann EPV and VHM, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html; CAS, Exam MAS-I Content Outline (2026), Domain A tasks 1-3 (Poisson processes; expected values, variances; limited expected value) p.3; Domain B tasks 1, 5, 6, 9 (sample mean and variance; frequency and severity; aggregate; censoring and truncation) p.4, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; SOA, Exam FAM syllabus, February 2027, Topic 1 coverage modifications (p.2); Topic 2 severity moments, existence of moments, aggregate mean and variance (p.3); Topic 9 present value random variables, means and variances, notation for their expected values (p.7); Topic 10 future loss random variable, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf
- note: Full re-pass after the Exam P teaching-style rewrite: every claim and number on the rewritten page checked; checker is not the writer. Numbers recomputed in python before comparing with the page.
