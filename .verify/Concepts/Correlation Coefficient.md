---
target: Concepts/Correlation Coefficient.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: rho = Cov/(sigma_X sigma_Y) (G&S Ex 6.3.18; Pishro-Nik 5.3.1; Siegrist); -1<=rho<=1 (G&S Ex 6.3.18c; Pishro-Nik properties list); rho=+-1 iff Y=aX+b with a>0 / a<0 (Pishro-Nik); rho=0 means uncorrelated, no linear association (Pishro-Nik; Siegrist); example recomputed before reading: 6/(3*4)=0.5 - agrees; link and figure embed resolve
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Exercise 6.3.18(a)-(c) p.281 (PDF p.289), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Covariance and Correlation (Cov definition and E[XY]-EXEY form; rho = Cov/(sigma_X sigma_Y); -1<=rho<=1; rho=+-1 iff Y=aX+b; rho(aX+b,cY+d)=rho(X,Y) for a,c>0; independent implies uncorrelated, converse not necessarily true), sha256:b6bc17d7f786f7ac8d2836f42d6524c99e8909254d473f1edef7909f1da9620e — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php; Siegrist, Random: Probability, Mathematical Statistics, Stochastic Processes (randomservices.org), Expected Value > Covariance and Correlation (definitions; cov = E(XY)-E(X)E(Y); independent implies uncorrelated, converse fails; correlation dimensionless), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html; SOA Probability Exam syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes 3a-3f, PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
