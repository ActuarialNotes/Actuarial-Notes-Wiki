---
target: Concepts/Moments for Linear Combinations.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: E[W] linear: G&S Thm 6.2 and 6.10. Var(W) = sum a_i^2 Var(X_i) + 2 sum_{i<j} a_i a_j Cov: G&S Ex. 6.3.17(c) V(X+Y)=V(X)+V(Y)+2cov(X,Y) with Thm 6.7/6.14 V(cX)=c^2 V(X); SOA Q80 bilinear Cov expansion with coefficient 1.2; SOA Q301 Var(total)=5+8+2(3)=19. Independent case drops covariances: G&S Thm 6.8/6.16 and Ex. 6.3.17(b); stated as a sufficient condition, correctly. Aggregate-loss use: SOA Q86 total payout mean and variance. Example recomputed before reading: E=250, Var=1,300, SD=36.056 -> 36.06 (agrees). Links Central Limit Theorem, Expected Value, Variance, Independent Random Variables resolve; figure exists; LaTeX fine.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 6.2 (printed p.231, PDF p.239), Thms 6.7-6.8 (printed p.259, PDF p.267), Ex. 6.3.17 (printed p.281, PDF p.289), Thms 6.10, 6.14, 6.16 (printed pp.269-272, PDF pp.277-280), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q80 (PDF p.25), Q86 (PDF pp.26-27), Q301 (PDF p.84), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Probability Exam syllabus, November 2026, Topic 3 (Multivariate Random Variables) learning outcomes g-i, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: No findings.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T17:59Z/b51f
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: E[W] linear, Var(W) with doubled covariances, Cov of two combinations = sum a_i b_j Cov: Pishro-Nik Lemma 5.3 and 5.21; Var=Cov(W,W) grid idea: Pishro-Nik 5.3.1 Var(Z)=Cov(Z,Z) expansion; var(aX+b)=a^2 var: Siegrist 4.3; independent sum n sigma^2 and mean sigma^2/n: G&S Thms 6.7-6.8 and Siegrist 4.5 (sample mean). Running example table (X auto 0-1, Y home 0-2) recomputed in python before reading the page's figures: E[X]=0.40, E[Y]=0.70, E[Y^2]=1.02, Var(X)=0.24, Var(Y)=0.53, E[XY]=0.40, Cov=0.12, Var(X+Y)=1.01. E[L]=7.5; 1.1L+2 mean 10.25, variance 59.59; grid 24+6+6+13.25=49.25; one-copy error 43.25; Cov(10X,L)=30; 100L variance 492,500; T 4,925; T/100 0.4925; CV 0.936 and 0.094. Try-its: 22 (SOA-style); 2Cov=300, new variance 2,056; 7c+12=0 => c=-12/7. Links resolve; $$ balanced.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), Ex. 6.3.17(a)-(c) and 6.3.18(a)-(c) printed p.281 (PDF p.289); Def. 7.1 p.286 (PDF p.294); Thm 7.1 and sum of two exponentials (PDF pp.299-301); Examples 7.5-7.6 (PDF p.302); Thms 9.4 and 9.6 (PDF pp.351, 365); continuity correction (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Lemma 5.3 covariance properties incl. bilinearity; eq. 5.21 Var(aX+bY); correlation definition, -1<=rho<=1, rho=+-1 linear, rho(-X,Y)=-rho(X,Y), rho(aX+b,cY+d)=rho(X,Y) for a,c>0; independent implies uncorrelated, converse fails; pairwise uncorrelated sums, sha256:10ac40b763d78b0fa19a116594da71769bf417b59a1714be707c7c410991a7fb — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.3 Variance: var(a+bX)=b^2 var(X); indicator var(X)=p(1-p), sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.5 Covariance and Correlation: Events (cov and cor of indicators), var(X+Y), var(X-Y), cor = +-1 iff linear with that slope sign, uniform X and Y = X^2 uncorrelated, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html; SOA Exam P Sample Solutions, Q80 (PDF p.24), Q301 (PDF p.82), Q388 (PDF p.107), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Rewritten page re-verified; no findings.
