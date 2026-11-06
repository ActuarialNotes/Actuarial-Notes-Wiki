---
target: Concepts/Linear Combinations of Random Variables.md
created: 2026-09-28
---

## [F-001] Covariance terms said to vanish only for independent variables
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: bullet 1, line 20
- claim: Variance does: the [[Covariance]] terms vanish only for [[Independent Random Variables|independent]] $X_i$.
- evidence: Grinstead & Snell Exercise 6.2.23 (printed p.267, PDF p.275) has the reader show that independence gives Cov(X,Y)=0 and show by an example that Cov(X,Y)=0 can hold with X and Y not independent; Exercise 6.3.17(b) (printed p.281, PDF p.289) repeats: "Caution: the converse is not always true." Independence is sufficient, not necessary: the cross terms vanish whenever the X_i are pairwise uncorrelated. Saying they vanish "only for independent" X_i teaches the converse (zero covariance implies independence), which the source says is false and which is a standard Exam P trap. The displayed Var(L) formula itself is correct and needs no independence (G&S Ex. 6.3.17(c); SOA Exam P sample solution Q80, PDF p.25, expands Cov(X+Y, X+1.2Y) bilinearly with no independence).
- source_rank: 3
- proposed_action: Remove "only" and state the condition as the source does: the covariance terms vanish when the X_i are independent (more generally, pairwise uncorrelated), and zero covariance does not imply independence. Needs an author, since it adds prose.
- applied: false
- fingerprint: 55c258d40503

## [F-002] CLT sentence drops the finite-variance and i.i.d.-sum conditions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 4, line 23
- claim: for large $n$ the [[Central Limit Theorem]] makes $L$ approximately normal whatever the $X_i$ are.
- evidence: Grinstead & Snell Thm 9.4 (printed p.343, PDF p.351) and Thm 9.6 (printed p.357, PDF p.365) state the CLT for S_n = X_1 + ... + X_n, independent variables with a common distribution having expected value mu and variance sigma^2, i.e. equal weights and a finite variance; G&S printed p.344 (PDF p.352) notes that dropping identical distribution needs Lindeberg-type conditions. SOA Nov 2026 syllabus outcome 3i likewise limits the CLT to linear combinations of i.i.d. variables. The page applies it to a general L = sum c_i X_i and says "whatever the X_i are", which omits the finite-variance hypothesis and extends the theorem to arbitrary weights it does not cover. The CLT page itself states the condition correctly.
- source_rank: 3
- proposed_action: Restrict the sentence to the sum or mean of the i.i.d. X_i and add the finite-variance condition, as Concepts/Central Limit Theorem.md states it.
- applied: false
- fingerprint: 533dac1e4d91

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: E[L] linear with no independence: G&S Thm 6.2/6.10. Var(L) with 2 sum c_i c_j Cov cross terms: G&S Ex. 6.3.17(c) V(X+Y)=V(X)+V(Y)+2cov(X,Y) with Thm 6.7 V(cX)=c^2 V(X); SOA Q80 bilinear expansion Cov(X+Y,X+1.2Y)=Var(X)+1.2Var(Y)+2.2Cov(X,Y); SOA Q301 Var(total)=5+8+2(3)=19. Independent case: G&S Thm 6.8. Exact normality of combinations of independent normals: G&S Example 7.5. Xbar mean mu, variance sigma^2/n: G&S Thm 6.9. Example 1 recomputed before reading: E=2(300)+3(500)=2,100, Var=4(2,500)+9(10,000)=100,000 (agrees). Example 2: 9+16-2(6)=13 (agrees). Example 3: E=400, Var=10,000/25=400, SD=20 (agrees). Links Covariance, Independent Random Variables, Moments for Linear Combinations, Probabilities for Linear Combinations, Central Limit Theorem resolve; figure embed exists; LaTeX balanced.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 6.2 (printed p.231, PDF p.239), Thms 6.7-6.9 (printed pp.259-260, PDF pp.267-268), Ex. 6.2.23 (PDF p.275), Ex. 6.3.17 (printed p.281, PDF p.289), Example 7.5 (printed p.294, PDF p.302), Thms 9.4 and 9.6 (PDF pp.351, 365), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q80 (PDF p.25), Q301 (PDF p.84), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Probability Exam syllabus, November 2026, Topic 3 (Multivariate Random Variables) learning outcomes g-i, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Displayed formulas and all three examples check out against sources. Open major F-001 misstates the condition attached to the variance formula (covariance terms vanish "only" for independent variables), hence low confidence; open minor F-002 overbroad CLT sentence.

## [F-001/R] Covariance terms vanish for uncorrelated variables; converse caveat stated
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Bullet now says the variance formula holds in general, the covariance terms drop out whenever the X_i are pairwise uncorrelated, independent variables are always uncorrelated, and zero covariance does not by itself imply independence — G&S Ex. 6.2.23 (PDF p.275) and Ex. 6.3.17(b) (PDF p.289: the converse is not always true); the general formula with covariance terms is G&S Ex. 6.3.17(c) and SOA Q301 (Var(Total) = 5 + 8 + 2(3) = 19, PDF pp.83-84).

## [F-002/R] CLT sentence restricted to i.i.d. sums and means with finite variance
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Now reads: for n i.i.d. variables with mean mu and finite variance sigma^2, the mean has variance sigma^2/n, and for large n the CLT makes the sum and the mean approximately normal, whatever their common distribution — the setting of G&S Thm 9.4 (PDF p.351) and Thm 9.6 (PDF p.365) and of syllabus outcome 3i. The claim about a general L = sum c_i X_i was removed.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001, F-002: linearity of expectation and the variance formula with covariance terms (G&S Ex. 6.3.17(c); Q301); c^2 scaling (Thm 6.7); independent implies uncorrelated, converse false (Ex. 6.2.23, 6.3.17(b)); sums of independent normals (Example 7.5); CLT for i.i.d. sums (Thms 9.4, 9.6). Examples recomputed: E[L] = 2100, Var(L) = 100,000; Var(X - Y) = 13; E = 400, SD = 20.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 6.7 (V(cX) = c^2 V(X)), Thm 6.8 (V(X+Y) = V(X)+V(Y), independent), Ex. 6.2.23 (PDF p.275), Ex. 6.3.17 (PDF p.289), Example 7.5 (sum of independent normals is normal, PDF p.302), Thms 9.4 and 9.6 (PDF pp.351, 365), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q301 (variance of a sum with a covariance term, PDF pp.83-84), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:36Z/7439
- date: 2026-10-30
- status_set: verified
- confidence: medium
- checks_run: Diff against 0287511f read in full: additions only, no prior sentence changed; earlier content and its prior sources (re-cited) unchanged; new wiki-links resolve; LaTeX balanced; no question numbers, scenario or wording on the page (compared with the items' question files). Indicator payment bullet: E(1_A) = P(A) (Siegrist 4.1), var = p(1-p) (Siegrist 4.3); mean/variance then by the page's own formulas; for indicators covariance vanishes exactly when the events are independent, consistent with the page's uncorrelated condition.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 6.7 (V(cX) = c^2 V(X)), Thm 6.8 (V(X+Y) = V(X)+V(Y), independent), Ex. 6.2.23 (PDF p.275), Ex. 6.3.17 (PDF p.289), Example 7.5 (sum of independent normals is normal, PDF p.302), Thms 9.4 and 9.6 (PDF pp.351, 365), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q301 (variance of a sum with a covariance term, PDF pp.83-84), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.3 Variance: indicator X with P(X = 1) = p has E(X) = p and var(X) = p(1 - p), HTML fetched 2026-10-30, sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.1 Definitions and Basic Properties: Symmetry (distribution symmetric about a with E(X) existing gives E(X) = a; density form f(a+x) = f(a-x)), Linearity, indicator E(1_A) = P(A), conditional density f(x|A) and its conditional expected values, HTML fetched 2026-10-30, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html
- note: Re-passed after the Exam P G8 additions (w6); new passages checked against the cited open sources and the short derivations re-done.

## [F-003] CLT bullet drops the finite-variance condition again (regression of F-002)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-06T17:59Z/b51f
- date: 2026-11-06
- severity: minor
- status: open
- locus: ## The distribution of a combination, bullet 2
- claim: A sum or mean of many i.i.d. terms is approximately normal by the [[Central Limit Theorem]], whatever their common distribution.
- evidence: Grinstead & Snell Thm 9.4 (PDF p.351) and Thm 9.6 (PDF p.365) state the CLT for S_n, a sum of independent variables with a common distribution having expected value mu and variance sigma^2; G&S Example 7.6 (PDF p.302) gives the Cauchy case, whose sums do not approach normality. 'Whatever their common distribution' is therefore false as stated. The page's previous version had this exact condition restored by F-002/R; the 2026-11 rewrite dropped it again.
- source_rank: 3
- proposed_action: Delete 'whatever their common distribution' and state the theorem's hypothesis: 'A sum or mean of many i.i.d. terms with finite variance is approximately normal by the [[Central Limit Theorem]].'
- applied: true
- fingerprint: fbfb1ab5d39d

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-11-06T17:59Z/b51f
- date: 2026-11-06
- resolves: F-003
- status: resolved
- note: Applied in this pass: 'whatever their common distribution' deleted and 'with finite variance' added, matching G&S Thms 9.4/9.6 (PDF pp.351, 365). Re-read the changed line against the source.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T17:59Z/b51f
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: E[L] linear without assumptions and Var(L) with 2 sum c_i c_j Cov: Pishro-Nik Lemma 5.3 bilinear form and 5.21, G&S Ex. 6.3.17(c); pairwise uncorrelated suffices: Pishro-Nik 5.3.1; indicator mean/variance: Siegrist 4.3; var(a+bX)=b^2 var: Siegrist 4.3; independent normal combination exactly normal: G&S Example 7.5; CLT for i.i.d. sums with finite variance: G&S Thms 9.4/9.6 (F-003 fixed). Running example table (X auto 0-1, Y home 0-2) recomputed in python before reading the page's figures: E[X]=0.40, E[Y]=0.70, E[Y^2]=1.02, Var(X)=0.24, Var(Y)=0.53, E[XY]=0.40, Cov=0.12, Var(X+Y)=1.01. E[L]=7.5; Var pieces 24, 13.25, 12, total 49.25, sd 7.02; no-cov 37.25; Var(Y-X)=0.53; rider mean 6.16, variance 34.69; 100 policyholders 750 / 4,925; average 0.4925. Try-its: 2,100 and 100,000; 13; 400 and SD 20. Links resolve; $$ balanced.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), Ex. 6.3.17(a)-(c) and 6.3.18(a)-(c) printed p.281 (PDF p.289); Def. 7.1 p.286 (PDF p.294); Thm 7.1 and sum of two exponentials (PDF pp.299-301); Examples 7.5-7.6 (PDF p.302); Thms 9.4 and 9.6 (PDF pp.351, 365); continuity correction (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Lemma 5.3 covariance properties incl. bilinearity; eq. 5.21 Var(aX+bY); correlation definition, -1<=rho<=1, rho=+-1 linear, rho(-X,Y)=-rho(X,Y), rho(aX+b,cY+d)=rho(X,Y) for a,c>0; independent implies uncorrelated, converse fails; pairwise uncorrelated sums, sha256:10ac40b763d78b0fa19a116594da71769bf417b59a1714be707c7c410991a7fb — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.3 Variance: var(a+bX)=b^2 var(X); indicator var(X)=p(1-p), sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.5 Covariance and Correlation: Events (cov and cor of indicators), var(X+Y), var(X-Y), cor = +-1 iff linear with that slope sign, uniform X and Y = X^2 uncorrelated, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html; SOA Exam P Sample Solutions, Q80 (PDF p.24), Q301 (PDF p.82), Q388 (PDF p.107), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Rewritten page re-verified after applying F-003 (finite-variance condition on the CLT bullet).
