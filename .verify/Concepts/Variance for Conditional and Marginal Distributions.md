---
target: Concepts/Variance for Conditional and Marginal Distributions.md
created: 2026-09-28
---

## [F-001] Ratio stated as a factor of four is 4.33
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: nit
- status: open
- locus: example 3 (Both Terms Matter), answer, line 82
- claim: Reporting only 6.25 (the between-group term) would understate the spread by a factor of four.
- evidence: Recomputed independently: Var(X) = E[Y^2]/12 + Var(Y/2) = 20.833 + 6.25 = 27.083 (checked directly: E[X]=7.5, E[X^2]=E[Y^2]/3=83.33, Var=27.08). 27.083/6.25 = 4.33, so 6.25 understates by a factor of about 4.3, not four. The law of total variance used is Pishro-Nik eq. 5.10 and Siegrist Conditional Expected Value (var(Y)=E[var(Y|X)]+var[E(Y|X)]).
- source_rank: 5
- proposed_action: Say a factor of more than four (27.08/6.25 = 4.33).
- applied: false
- fingerprint: 84f5845c0384

## [F-002] Unsourced causal claim about insurer pricing practice
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 2 (Marginal Variance via the Law of Total Variance), answer, line 58
- claim: which is why insurers do not price every driver at the portfolio mean
- evidence: The mathematics before the clause is sourced (Var(N)=0.25 > E[N]=0.2; law of total variance, Pishro-Nik eq. 5.10). The clause asserting that this overdispersion is why insurers price drivers individually is a statement about insurance practice that no source read this session supports: SOA study note P-21-05 (Risk and Insurance, sha256:1cb44e7f...) has no discussion of risk classification (full-text search for classif and heterogen returns nothing), and none of the probability references address pricing.
- source_rank: 2
- proposed_action: Cite a source for the risk-classification rationale (e.g. a CAS ratemaking reading) or remove the clause.
- applied: false
- fingerprint: b83b470ec648

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Var(X|Y=y)=E[X^2|Y=y]-(E[X|Y=y])^2 (Siegrist Conditional); E[X]=E[E[X|Y]] (Pishro-Nik eq 5.7; Siegrist; G&S Thm 6.5 partition form); law of total variance (Pishro-Nik eq 5.10; Siegrist; applied by SOA Q388); E[Var(X|Y)]<=Var(X) and the within/between-group reading (Pishro-Nik 5.1.5 text after eq 5.10); E[X|Y] a random variable, function of Y (Pishro-Nik 5.1.5); examples recomputed before reading: Var(X|Y=2)=0.16; E[N]=0.2, Var(N)=0.25; Var(X)=20.83+6.25=27.08 - all agree (uniform conditional variance y^2/12 matches Siegrist); open nit F-001 (factor 4.33 not 4) and minor F-002 (unsourced pricing clause) do not affect a formula; links and figure embed resolve
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.5 Conditional Expectation (Revisited) and Conditional Variance, eq. 5.7 (law of iterated expectations) and eq. 5.10 (law of total variance), sha256:f2c2e885d3519ab5b2d86ade4f54957dbc11842dd5af70988c43bd5a2e1da5d8 — https://www.probabilitycourse.com/chapter5/5_1_5_conditional_expectation.php; Siegrist, Random (randomservices.org), Expected Value > Conditional Expected Value (E[E(Y|X)]=E(Y); var(Y|X)=E(Y^2|X)-[E(Y|X)]^2; var(Y)=E[var(Y|X)]+var[E(Y|X)]; uniform conditional variance l^2/12), sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html; SOA Exam P Sample Solutions (Aug 2026 revision), Q388 solution (Var(X) = Var(E(X|N)) + E(Var(X|N)) = 12 + 16 = 28), PDF p.108, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §6.1 Theorem 6.5 (E(X)=sum_j E(X|F_j)P(F_j)) p.239 (PDF p.247), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Probability Exam syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes 3a-3f, PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-001/R] Ratio corrected to more than four
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Now reads: would understate the spread by a factor of more than four (27.08/6.25, about 4.3). Recomputed: Var(X) = 250/12 + 6.25 = 27.083; 27.083/6.25 = 4.33.

## [F-002/R] Unsourced pricing clause deleted
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: No source for the risk-classification rationale was found, so the clause (which is why insurers do not price every driver at the portfolio mean) was removed. The sentence now ends at overdispersed relative to a single Poisson, which follows from Var(N) = E[Lambda] + Var(Lambda) = 0.25 > 0.2 = E[N] by the law of total variance (Pishro-Nik §5.1.5 eq. 5.10).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001, F-002: conditional variance, double expectation, total variance and Var(X) >= E[Var(X|Y)] (Pishro-Nik §5.1.5; Q388). Examples recomputed: Var(X|Y=2) = 0.16; E[N] = 0.2, Var(N) = 0.25; Var(X) = 20.83 + 6.25 = 27.08, ratio 4.33.
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.5 Conditional Expectation (Revisited) and Conditional Variance, law of iterated expectations and eq. 5.10 law of total variance, eq. 5.11 Var(X) >= E[Var(X|Y)], web page as fetched 2026-09-28, sha256:6adb223e9466dcfab4770df7a7b9ea167d6143e62706037baba712126a89f3cd — https://www.probabilitycourse.com/chapter5/5_1_5_conditional_expectation.php; Siegrist, Random (randomservices.org), Expected Value > Conditional Expected Value (uniform conditional variance l^2/12), sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html; SOA Exam P Sample Solutions (Aug 2026 revision), Q388 (Var(X) = Var(E(X|N)) + E(Var(X|N)) = 12 + 16 = 28, PDF p.108), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T17:59Z/b51f
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: Conditional variance formula, law of iterated expectations, law of total variance and Var(Y)>=E[Var(Y|X)]: Pishro-Nik 5.1.5 eqs. 5.7, 5.10, 5.11 and Siegrist 4.7; random-sum E[S]=E[N]mu, Var(S)=E[N]sigma^2+Var(N)mu^2: Pishro-Nik 5.1.5 eq. 5.12 example; Poisson mean = variance: Siegrist Poisson; uniform conditional variance l^2/12: Siegrist 4.7; worked total-variance application: SOA Q388 (12+16=28). Running example table (X auto 0-1, Y home 0-2) recomputed in python before reading the page's figures: E[X]=0.40, E[Y]=0.70, E[Y^2]=1.02, Var(X)=0.24, Var(Y)=0.53, E[XY]=0.40, Cov=0.12, Var(X+Y)=1.01. conditional rows: X=1 probs 0.25/0.5/0.25, mean 1.0, var 0.50; X=0 probs 0.6/0.3/0.1, mean 0.5, var 0.45; within 0.47, between 0.06, total 0.53. Try-its: 0.16; mixture 1.6+0.84=2.44; aggregate 60,000, SD 244.9; uniform mixture 20.83+6.25=27.08 (checked directly as E[X^2]-E[X]^2), ratio 4.33. Links resolve; $$ balanced.
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.5 law of iterated expectations (5.7), E[g(X)h(Y)] = E[g(X)]E[h(Y)] for independent, conditional variance, law of total variance (5.10), Var(X) >= E[Var(X|Y)] (5.11), random-sum example (5.12), sha256:1bda829553c761a1ee71ba3210a6510e4780b5bcba0513325b5180b3d4100d82 — https://www.probabilitycourse.com/chapter5/5_1_5_conditional_expectation.php; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.7 Conditional Expected Value: var(Y)=E[var(Y|X)]+var[E(Y|X)]; uniform var(Y|X)=l^2(X)/12, sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 14.4 The Poisson Distribution: E(N)=var(N); sum of independent Poisson(a), Poisson(b) is Poisson(a+b), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html; SOA Exam P Sample Solutions, Q80 (PDF p.24), Q301 (PDF p.82), Q388 (PDF p.107), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Rewritten page re-verified; no findings.
