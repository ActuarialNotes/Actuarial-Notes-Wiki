---
target: Concepts/Standard Deviation.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: sigma = sqrt(Var) vs G&S sec. 6.2 (D(X) = sqrt V(X)) and Pishro-Nik sec. 3.2.4 (SD in the units of X, variance not); sqrt(E[X^2] - E[X]^2) vs G&S Thm 6.6; sigma(aX+b) = |a| sigma(X) as the square root of G&S Thm 6.7; syllabus LO d. Example recomputed before reading the answer: 50000 - 200^2 = 10000, sigma = 100, agrees. Links and embed resolve; LaTeX well formed.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), sec. 6.2 definition of D(X), Thm 6.6 and Thm 6.7, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, sec. 3.2.4 Variance (fetched 2026-09-27), sha256:90ca917f6141a0c49d353bdae1e824585656afd7d76c80823c31247f0c522008 — https://www.probabilitycourse.com/chapter3/3_2_4_variance.php; SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Clean pass.

## [F-001] Exam 9 and DISC attribution of investment-return volatility not found in their outlines
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-06T18:05Z/9825
- date: 2026-11-06
- severity: minor
- status: open
- locus: ## On other exams, first bullet (Exam 9 and the DISCs) and the two-asset formula under it
- claim: Exam 9 and the DISCs measure an investment's risk, or volatility, by the standard deviation of its return. For two assets with weights w1, w2 and correlation rho, the portfolio's variance is ...
- evidence: CAS Exam 9 Content Outline, Fall 2026 (sha256:be1980d4…, pp.3-6): domains A Catastrophe and Reinsurance, B Risk and Return (risk measures, economic value of insurance cash flows, risk loads, profitability decomposition; reading Mildenhall & Major), C Financial Risk Management, D ERM; full-text search finds no 'standard deviation', 'volatility' or 'variation', and no investment-portfolio task. DISC RM syllabus (sha256:34fbee38…) lists '1c Basic Risk Measures' with no named measure and nothing on investment returns; DISC IA and DISC DA syllabi (sha256:e9ce8e88…, d4d82323…) contain none of these terms. The portfolio-variance formula itself is correct (Siegrist 4.5, var of a sum with covariance) and the Try-it arithmetic recomputes (0.0148, 12.2%); only the exam attribution is unsupported.
- source_rank: 1
- proposed_action: Re-source the bullet to a current Exam 9 or DISC reading that measures investment risk by the standard deviation of return, or drop the Exam 9/DISC attribution (and decide whether the portfolio Try-it stays). Writer task: the replacement needs prose.
- applied: false
- fingerprint: 0375ac5b8b0d

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:05Z/9825
- date: 2026-11-06
- status_set: verified
- confidence: medium
- checks_run: SD as square root of variance (G&S p.257); sd(a+bX)=|b|sd(X) (Siegrist 4.3); sigma(S_n)=sigma sqrt(n) (G&S Thm 6.9); variance of a sum with correlation (Siegrist 4.5); CLT (G&S ch.9); standard score (Siegrist 4.3); sample variance divides by n-1 (Siegrist 6.5) with MAS-I task B1. Recomputed: sqrt(36,100)=190; mean absolute deviation 148; 1.1x190=209; sqrt(72,200)=268.7; 100 claims mean 13,000 SD 1,900; 95th pct 13,000+1.645x1,900=16,126 (16,125.5); z for 16,800 = 2; Try-its: 100; 500 sqrt(400)=10,000, P(Z>1)=0.1587; portfolio variance 0.0148, SD 12.2%, weighted average 22% (all agree). Exam 9 / DISC bullet opened as a finding (not in the Fall 2026 Exam 9 outline or the DISC syllabi). Links and embed resolve.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 6.1 p.226 (PDF p.234, absolute convergence; no expected value otherwise); Thm 6.2 linearity, expectations add whether or not independent; Def. 6.3 variance and standard deviation p.257; Thms 6.6 Var=E(X^2)-mu^2, 6.7 V(cX)=c^2V(X), V(X+c)=V(X), 6.8 V(X+Y)=V(X)+V(Y) independent, 6.9 sigma(S_n)=sigma sqrt(n) (pp.258-260, PDF pp.265-268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.3 Variance: var>=0, =0 iff constant; var(a+bX)=b^2 var(X), sd(a+bX)=|b|sd(X); standard score; cv(X)=sd(X)/E(X), E(X)!=0, compares variability across different means, sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.5 Covariance and correlation: cov=E(XY)-E(X)E(Y); cor=cov/(sd sd); var(X+Y)=var(X)+var(Y)+2cov(X,Y), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Ch. 9 Central Limit Theorem, Thms 9.2-9.5 pp.330-345 (PDF pp.338-354), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 6.5 Sample variance: s^2 = sum (x_i - m)^2/(n-1), sha256:452e2841007fad173229a9bb069a4acdda8e0d0bc6c1632f7239ef585248b0c6 — https://www.randomservices.org/random/sample/Variance.html; CAS, Exam MAS-I Content Outline (2026), Domain A tasks 1-3 (Poisson processes; expected values, variances; limited expected value) p.3; Domain B tasks 1, 5, 6, 9 (sample mean and variance; frequency and severity; aggregate; censoring and truncation) p.4, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS, Exam 9 Content Outline, Fall 2026, Domains A-D tasks and readings (pp.3-6): no investment-return volatility or portfolio variance task, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; The Institutes / CAS, DISC RM syllabus, Course syllabus (pp.2-4): 1c Basic Risk Measures; no named measure, sha256:34fbee38024d3433de5d84c09138114c56edfb0336468dfefefdc78e23f67eac — https://www.casact.org/sites/default/files/2022-12/DISC_RM.pdf
- note: Full re-pass after the Exam P teaching-style rewrite: every claim and number on the rewritten page checked; checker is not the writer. Numbers recomputed in python before comparing with the page.
