---
target: Concepts/Variance and Standard Deviation.md
created: 2026-09-28
---

## [F-001] Covariance term said to vanish only under independence
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: bullet 3, line 24
- claim: the Covariance term drops out only when X and Y are independent
- evidence: Grinstead & Snell Exercise 6.2.23 defines Cov(X,Y) and asks the reader to "show, by an example, that we can have Cov(X, Y) = 0 and X and Y not independent"; Exercise 6.3.17(b)-(c) gives V(X+Y) = V(X) + V(Y) + 2cov(X,Y) and cov = 0 under independence with the caution "the converse is not always true". So the term drops out whenever X and Y are uncorrelated; independence is sufficient, not necessary. Counterexample (rank 5, falsifies only): X uniform on {-1,0,1}, Y = X^2: Cov = E[X^3] - E[X]E[X^2] = 0; Var(X) = 2/3, Var(Y) = 2/9, Var(X+Y) = 4/3 - 4/9 = 8/9 = 2/3 + 2/9; yet Y is a function of X. A reader of "only when" would infer independence from additive variances.
- source_rank: 3
- proposed_action: Replace "only when X and Y are independent" with wording that the term vanishes whenever Cov(X,Y) = 0, in particular when X and Y are independent, and that the converse fails.
- applied: false
- fingerprint: 71a04bd36039

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definitions and E[X^2] - mu^2 vs G&S sec. 6.2 and Thm 6.6; Var(aX+b) and SD(aX+b) vs G&S Thm 6.7; Var(X+Y) = Var X + Var Y + 2Cov vs G&S Exercise 6.3.17(c) and Thm 6.8; SDs do not add and the sqrt(n) pooling statement vs P-21-05 pooling section; CV cross-reference vs P-21-05. Examples recomputed before reading answers: N: E[N] = 0.5, E[N^2] = 0.7, Var 0.45, SD 0.6708; f = 3x^2: E[X] = 0.75, E[X^2] = 0.6, Var 0.0375, SD 0.1936; two independent SD 300: Var 180000, SD 424.26; all agree. Links resolve; LaTeX well formed. No exam page links this page.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), sec. 6.2 definitions, Thm 6.6-6.8, Exercise 6.2.23, Exercise 6.3.17, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), pooling section (CV = SD/mean; sqrt(n) sigma less than n sigma) and benefit-limit section (premium based primarily on expected claim payments), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf
- note: Formulas and all three examples confirmed; one major open on the stated condition for dropping the covariance term (formula itself correct).

## [F-001/R] Covariance term drops out when uncorrelated, not only when independent
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Bullet now says the covariance term drops out whenever Cov(X,Y) = 0 (X and Y uncorrelated), for example when they are independent, and that zero covariance does not imply independence. Sources: G&S Ex. 6.3.17(b)-(c) (V(X+Y) = V(X) + V(Y) + 2cov, cov = 0 under independence, converse not always true), Ex. 6.2.23; Pishro-Nik §5.3.1 (converse not necessarily true; uncorrelated implies Var(X+Y) = Var X + Var Y).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: Var(X+Y) formula and the uncorrelated condition vs G&S Ex. 6.3.17 and Pishro-Nik §5.3.1; zero covariance without independence vs G&S Ex. 6.2.23 and Pishro-Nik §5.3.1; definitions and E[X^2] - mu^2 vs G&S Thm 6.6; Var(aX+b), SD(aX+b) vs G&S Thm 6.7; SDs do not add, sqrt(n) pooling and CV cross-reference vs P-21-05. Examples recomputed: E[N] = 0.5, E[N^2] = 0.7, Var 0.45, SD 0.6708; f = 3x^2: 0.75, 0.6, Var 0.0375, SD 0.1936; 300^2 + 300^2 = 180000, SD 424.26 (all agree). Links resolve; LaTeX well formed.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorems 6.6-6.8, Exercise 6.2.23, Exercise 6.3.17, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §5.3.1 Covariance and Correlation (independent implies Cov = 0, converse not necessarily true; uncorrelated implies Var(X+Y) = Var(X) + Var(Y)), sha256:b6bc17d7f786f7ac8d2836f42d6524c99e8909254d473f1edef7909f1da9620e — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), pooling section (SD of the sum of n independent policies sqrt(n) sigma, less than n sigma; CV = SD/mean) (PDF pp.4-5), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf
