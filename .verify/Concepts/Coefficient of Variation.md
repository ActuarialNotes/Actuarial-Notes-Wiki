---
target: Concepts/Coefficient of Variation.md
created: 2026-09-28
---

## [F-001] Positive-mean restriction unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 3, line 22
- claim: It is meaningful only when E[X] > 0
- evidence: CV = sigma/mu is confirmed by Anderson & Brown P-21-05 ("the coefficient of variation, which is the ratio of the standard deviation to the mean") and applied that way in SOA Exam P sample solution 252 (PDF p.74). Neither, nor any other source read this session, restricts it to E[X] > 0; the ratio is defined for any nonzero mean. Possibly a reasonable convention, but stated as fact without a source.
- source_rank: 1
- proposed_action: Cite a source for the restriction, or soften it to "requires E[X] != 0; normally used for positive quantities such as losses".
- applied: false
- fingerprint: 6d2e55365472

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: CV = sigma/mu = sqrt(Var X)/E[X] vs P-21-05 pooling section and SOA sample solution 252; dimensionless and relative-dispersion bullets follow from the definition; syllabus LO d. Example recomputed before reading the answer: 100/500 = 0.20, 300/2000 = 0.15, A more variable, agrees. Links and embed resolve; LaTeX well formed.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), pooling section (CV = SD/mean; sqrt(n) sigma less than n sigma) and benefit-limit section (premium based primarily on expected claim payments), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q252 (PDF p.74), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Definition and example confirmed; one minor open (unsourced E[X] > 0 restriction).

## [F-001/R] Positive-mean restriction replaced by the sourced use
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Bullet now reads: CV requires E[X] != 0 (it divides by the mean), and it is used to compare the variability of positive distributions, such as losses, with different expected values, which is what P-21-05 (PDF p.5) says: the coefficient of variation is useful for comparing variability between positive distributions with different expected values. The unsourced only-when-E[X] > 0 claim is gone.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: CV = sigma/mu vs P-21-05 and SOA solution 252; comparison of positive distributions with different means vs P-21-05 p.5; syllabus LO d. Example recomputed: 100/500 = 0.20, 300/2000 = 0.15, A more variable (agrees). Links resolve; LaTeX well formed.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), pooling section (CV = ratio of SD to mean; useful for comparing variability between positive distributions with different expected values) (PDF pp.4-5), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Exam P Sample Solutions (Aug 2026 rev.), Q252 (solutions PDF p.74), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-002] DISC use of the CV not confirmed against the DISC course text
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-06T18:05Z/9825
- date: 2026-11-06
- severity: minor
- status: open
- locus: ## On other exams, third bullet (The DISCs)
- claim: The DISCs use the CV to compare the riskiness of exposures of different sizes.
- evidence: The DISC RM syllabus (The Institutes for CAS, sha256:34fbee38…, p.2) lists only the topic '1c Basic Risk Measures'; DISC IA and DISC DA syllabi name no dispersion measure. The Institutes' course text is not openly available, so what it says about the CV could not be read. Baranoff et al. §6.2 (an open risk-management text, not a DISC reading) does use the CV to compare risks with different means, which makes the claim plausible but does not confirm the DISC attribution.
- source_rank: 1
- proposed_action: Confirm against the DISC RM course material (Basic Risk Measures) and cite it, or soften the attribution to the general risk-management usage. Needs the Institutes text or new prose; not auto-fixed.
- applied: false
- fingerprint: 927d37c3fb46

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:05Z/9825
- date: 2026-11-06
- status_set: verified
- confidence: medium
- checks_run: Definition, E(X)!=0, dimensionless, used to compare variability across different means (Siegrist 4.3, Baranoff §6.2); scale invariance from sd(a+bX)=|b|sd (Siegrist 4.3); pooling sigma sqrt(n) (G&S Thm 6.9) and CV/sqrt(n), quadrupling halves CV (Baranoff §6.5 appendix); objective risk inversely proportional to sqrt(n) (thismatter, rank 3). Recomputed: 190/130=1.46; inflation 143/209 1.46; fee 150/190 1.27; pool 1,900/13,000=0.146. Named CVs: exponential 1, gamma 1/sqrt(alpha), lognormal sqrt(e^{sigma^2}-1) from LM A.3 / A.5.1.1 moments; Poisson 1/sqrt(lambda) from mean = variance = lambda. MAS-II: n_X = lambda CV^2 and n_PP = lambda(1+CV^2) for Poisson counts (LDA ch.9), n0=(1.645/0.05)^2=1,082.41, CV^2=2.136, 2,312 claims (agree); Exam 7: Shapland §5.5.1 CoV = standard error/mean, total-year CoV below each year's. Try-its: 0.20 vs 0.15; sqrt(1.25)=1.118; binomial pools 4.2/18=0.233 and 8.4/72=0.117 (agree). DISC bullet opened as a finding. Links and embed resolve.
- sources_checked: Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.3 Variance: var>=0, =0 iff constant; var(a+bX)=b^2 var(X), sd(a+bX)=|b|sd(X); standard score; cv(X)=sd(X)/E(X), E(X)!=0, compares variability across different means, sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 6.1 p.226 (PDF p.234, absolute convergence; no expected value otherwise); Thm 6.2 linearity, expectations add whether or not independent; Def. 6.3 variance and standard deviation p.257; Thms 6.6 Var=E(X^2)-mu^2, 6.7 V(cX)=c^2V(X), V(X+c)=V(X), 6.8 V(X+Y)=V(X)+V(Y) independent, 6.9 sigma(S_n)=sigma sqrt(n) (pp.258-260, PDF pp.265-268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy, 2012), §6.2 Measures of risk: standard deviation; coefficient of variation = SD/mean, a relative value of risk when means differ, sha256:2cd18f66c1d1d9bc8162fb93bce73ddf75b766f3363ac06e3ec20e165d473773 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s06-02-measures-of-risk-putting-it-to.html; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy, 2012), §6.5 Appendix: More Exposures, Less Risk: quadrupling the sample doubles the SD; CV as relative measure of risk, 9.5/100 vs 19/400, sha256:0fb4dd0d04812eb4f4ceaf8bc2e059ae323809659ce7945309682a998ee487fd — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-05-appendix-more-exposures-less-r.html; thismatter.com, Risk (rank 3), Objective risk (degree of risk): inversely proportional to the square root of the sample size, sha256:659df83373126ab2bcbc77f5c62f32ad63dc672422c9d5e5ddf8fc6cdf26343d — https://thismatter.com/money/insurance/risk.htm; SOA Exam C tables (Loss Models 3rd ed. Appendix A excerpts), A.2.3.1 Pareto (E[X^k] for -1<k<alpha, no M(t)) PDF p.8; A.3.2.1 Gamma (M(t)=(1-theta t)^-alpha, t<1/theta; E[X^k]) PDF p.9; A.3.3.1 Exponential (M(t), E[X^k]=theta^k k!, E[X^x]=theta(1-e^{-x/theta})) and A.5.1.1 Lognormal (E[X^k]=exp(k mu + k^2 sigma^2/2), no M(t)) PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 14.4 Poisson distribution: M+N Poisson with parameter a+b for independent Poisson M, N, sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html; Frees et al., Loss Data Analytics (open text), Ch. 9 Credibility: §9.2 full credibility standards, n_X = lambda_kp (sigma_X/mu_X)^2 (eq. 9.6), n_PP = lambda_kp[sigma_N^2/mu_N + (sigma_X/mu_X)^2], lambda_kp=(y_p/k)^2; §9.3 Bühlmann EPV and VHM, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html; CAS, Exam MAS-II Content Outlines (2026), Domain A Introduction to Credibility, tasks 1-2: classical (limited fluctuation), Bühlmann, Bühlmann-Straub and Bayesian credibility; reading Tse (p.2), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide (CAS Monograph 4, 2016), §5.5.1 Estimated-Unpaid Results, pp.41-42 (PDF pp.49-50): coefficient of variation = standard error divided by the mean; CoV for all years combined should be less than for any individual year, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf; CAS, Exam 7 Content Outline, Fall 2026, Complete text references: Mack (1994) and Shapland (2016) on the syllabus (pp.4-5), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf; The Institutes / CAS, DISC RM syllabus, Course syllabus (pp.2-4): 1c Basic Risk Measures; no named measure, sha256:34fbee38024d3433de5d84c09138114c56edfb0336468dfefefdc78e23f67eac — https://www.casact.org/sites/default/files/2022-12/DISC_RM.pdf
- note: Full re-pass after the Exam P teaching-style rewrite: every claim and number on the rewritten page checked; checker is not the writer. Numbers recomputed in python before comparing with the page.
