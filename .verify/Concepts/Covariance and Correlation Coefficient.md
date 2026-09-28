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
