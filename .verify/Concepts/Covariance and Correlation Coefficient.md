---
target: Concepts/Covariance and Correlation Coefficient.md
created: 2026-09-28
---

## [F-001] Cross-reference promises bilinearity on a page that does not state it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 3, line 22
- claim: See [[Correlation]] for interpretation and [[Covariance]] for properties such as bilinearity.
- evidence: Rank 4 consistency check: Concepts/Covariance.md (read in full this session) states only the two Cov formulas and the independence bullet; a full-text search of it for bilinear returns nothing, and it gives no Cov(aX+bY, Z) identity. The property itself is real (Siegrist, Covariance and Correlation: cov(a + bX, Y) = b cov(X, Y), sha256:23ef4758...), so the reader is sent to a page that does not have what is promised.
- source_rank: 4
- proposed_action: Either add the bilinearity property to Concepts/Covariance.md (sourced from Siegrist or Pishro-Nik 5.3.1) or drop the words for properties such as bilinearity.
- applied: false
- fingerprint: 5312adef1fc2

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Cov = E[XY]-E[X]E[Y] (G&S Ex 6.3.17a; Siegrist; Pishro-Nik); rho = Cov/(sigma_X sigma_Y) in [-1,1] (G&S Ex 6.3.18; Pishro-Nik); correlation dimensionless, covariance in product units (Siegrist Covariance and Correlation, correlation is dimensionless since numerator and denominator carry the product of the units); rho=0 not implying independence (Pishro-Nik; Siegrist); example recomputed before reading: E[X]=2.4, E[Y]=6.8, E[XY]=17.2, Cov=0.88 - agrees; links resolve; open minor F-001 is a cross-reference, not a formula; note this page is linked from no Exam page
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Exercises 6.3.17-18 p.281 (PDF p.289), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Random: Probability, Mathematical Statistics, Stochastic Processes (randomservices.org), Expected Value > Covariance and Correlation (definitions; cov = E(XY)-E(X)E(Y); independent implies uncorrelated, converse fails; correlation dimensionless), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Covariance and Correlation (Cov definition and E[XY]-EXEY form; rho = Cov/(sigma_X sigma_Y); -1<=rho<=1; rho=+-1 iff Y=aX+b; rho(aX+b,cY+d)=rho(X,Y) for a,c>0; independent implies uncorrelated, converse not necessarily true), sha256:b6bc17d7f786f7ac8d2836f42d6524c99e8909254d473f1edef7909f1da9620e — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php; SOA Probability Exam syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes 3a-3f, PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-001/R] Bilinearity stated here; cross-reference no longer promises it
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Added a bullet: Cov(aX+bY, Z) = a Cov(X,Z) + b Cov(Y,Z), adding a constant leaves covariance unchanged, Cov(X,X) = Var(X) — Pishro-Nik §5.3.1 Lemma 5.3 (Cov(X,X) = Var(X); Cov(aX,Y) = a Cov(X,Y); Cov(X+c,Y) = Cov(X,Y); Cov(X+Y,Z) = Cov(X,Z) + Cov(Y,Z)); G&S Ex. 6.2.23 also notes Cov(X,X) = V(X). The cross-reference now reads See also [[Correlation]] and [[Covariance]].

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001: both formulas, the [-1,1] range, the independence caveat and the bilinearity bullet against Pishro-Nik §5.3.1 and G&S Ex. 6.2.23 / 6.3.17-18. Example recomputed: E[X] = 2.4, E[Y] = 6.8, E[XY] = 17.2, Cov = 0.88.
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Covariance and Correlation (Cov = E[XY]-EX EY; Lemma 5.3 bilinearity; rho = Cov/(sigma_X sigma_Y); -1 <= rho <= 1; independent implies uncorrelated, converse not necessarily true), web page as fetched 2026-09-28, sha256:330faf8fb05f924926ce40a5e577b79910d97ec946263f40c64bf5e1277a9f82 — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ex. 6.2.23 (PDF p.275), Exercises 6.3.17-18 (PDF p.289), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- status_set: verified
- confidence: high
- checks_run: Blind examples solved first in Python from the joint PMF: marginals P(X=1)=0.3, P(X=3)=0.7, P(Y=4)=0.3, P(Y=8)=0.7; E[X]=2.4, E[Y]=6.8, E[XY]=17.2, Cov=0.88 (page 0.88). C10: E[X^2]=6.6, Var X=0.84, E[Y^2]=49.6, Var Y=3.36, sd product 1.68, rho=0.5238 (page 0.524). C15: Var(H)=10*0.5*0.5=2.5, Cov(H,T)=Cov(H,10-H)=-Var(H)=-2.5 (page -2.5). Every line of the working matches the computed values. C2-C4 covariance and E[XY] tables: Pishro-Nik 5.3.1 (Cov=E[XY]-EX EY, the discrete sum); Grinstead Ex. 6.3.17(a) p.289 (PDF p.289) cov=E(XY)-E(X)E(Y). C3 displayed formula Cov(X,Y) = E[XY] + E[X]E[Y]: WRONG SIGN. Pishro-Nik 5.3.1 gives E[XY]-(EX)(EY), Grinstead 6.3.17(a) gives E(XY)-E(X)E(Y); the page's own C5 example subtracts (17.2 - 16.32). C6-C7 rho = Cov/(sigma_X sigma_Y): Pishro-Nik 5.3.1 (eq. for rho); Siegrist 4.5 correlation definition. C1 covariance sign interpretation and rho in [-1,1]: Pishro-Nik 5.3.1 (positively/negatively correlated; -1<=rho<=1). C9 correlation dimensionless and the covariance rearrangement: Siegrist 4.5 ('correlation is dimensionless, since the numerator and denominator have the same physical units'); rearrangement from C7. C11-C13 bilinearity Cov(aX+bY,Z)=aCov(X,Z)+bCov(Y,Z): Pishro-Nik 5.3.1 Lemma 5.3 (Cov(aX,Y)=aCov, Cov(X+Y,Z)=Cov(X,Z)+Cov(Y,Z)) and the general sum formula; Siegrist 4.5 cov(a+bX,Y)=b cov(X,Y). C14 constant has covariance 0, adding a constant leaves Cov unchanged, Cov(X,X)=Var(X): Siegrist 4.5 ('A constant is independent of any random variable'); Pishro-Nik Lemma 5.3 (Cov(X+c,Y)=Cov(X,Y), Cov(X,X)=Var(X)). C15 coin example: binomial variance 2.5 is standard (Exam P syllabus lists binomial). C16 trap: Siegrist 4.5 'the converse fails with a passion: ... functionally related ... yet uncorrelated' (a nonlinear function can have zero covariance); independence as product of marginals in every cell is the definition. Log: F-001 resolved (bilinearity bullet added), C-002 verified; no open findings before this pass, but the sign error in C3 is new to the current text.
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Covariance and Correlation: Cov = E[XY]-EX EY, Lemma 5.3 (Cov(X,X)=Var(X), Cov(X+c,Y)=Cov(X,Y), Cov(X+Y,Z)=Cov(X,Z)+Cov(Y,Z), general sum formula), rho = Cov/(sigma_X sigma_Y), -1<=rho<=1 — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §4.5 Covariance and Correlation: cov(a+bX,Y)=b cov(X,Y), constant independent of any variable, correlation dimensionless, converse of 'independent implies uncorrelated' fails — https://www.randomservices.org/random/expect/Covariance.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed.), Exercise 6.3.17(a)-(c) p.281 (PDF p.289): cov(X,Y)=E(XY)-E(X)E(Y); cov=0 if independent; V(X+Y)=V(X)+V(Y)+2cov — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcome e) covariance and correlation coefficient for discrete random variables (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
