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
