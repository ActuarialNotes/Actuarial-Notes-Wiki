---
target: Concepts/Transformations of Random Variables.md
created: 2026-09-27
---

## [F-001] Inverse-transform claim for any distribution is broader than the source condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: Probability Integral Transform example, answer, line 58
- claim: Run backwards, X = F_X^{-1}(U) turns uniform random numbers into samples from any distribution
- evidence: G&S Corollary 5.2 (PDF p.220) states the inverse-transform result only for a cumulative distribution function F that is strictly increasing when 0 < F(y) < 1: then Y = F^{-1}(U) has cdf F. The page states it for any distribution, but for a distribution whose CDF has jumps or flat stretches (every discrete distribution, and the mixed payment variables Exam P uses) F_X^{-1} is not an ordinary inverse and the page defines no generalized inverse. No source read this session supports the unqualified any-distribution form.
- source_rank: 3
- proposed_action: Qualify the sentence to distributions with a strictly increasing CDF (G&S Cor. 5.2), or state the generalized inverse F^{-1}(u) = inf{x : F(x) >= u} if the general claim is wanted. Needs new prose, so not auto-fixed.
- applied: false
- fingerprint: 2ad0afec18f8

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: CDF method against Pishro-Nik §4.1.3 and G&S Thm 5.1; change-of-variable formula with absolute Jacobian for strictly monotone g against G&S Cor 5.1 (increasing: +, decreasing: -) and Pishro-Nik Thm 4.1 (which also requires g differentiable; G&S states only strict monotonicity, so no finding); non-monotone branches against Pishro-Nik (4.6); linear E and Var against Pishro-Nik §4.1.2 and G&S Thms 6.2, 6.7; LOTUS against Pishro-Nik (4.3); deductible (X-d)+, benefit limit min(X,u), inflation scaling against P-21-05 pp.7-9 and syllabus Topic 2 LO e. Examples recomputed before reading answers: exponential pdf e^(-x/theta)/theta from Tables A.3.3.1, f_Y(y) = (1/1000) e^(-y/1100) / 1.1 = e^(-y/1100)/1100, and without the Jacobian the integral is 1.1 (agrees); F_U(u) = u (agrees, G&S Cor 5.2 for the reverse direction); X^2 with X ~ U(-1,1): F_Y = sqrt(y), f_Y = 1/(2 sqrt y) on (0,1) (agrees with Pishro-Nik §4.1.3). Inverse-transform generality -> F-001 minor (open). All wiki-links resolve; figure exists (generated); LaTeX well formed; also linked from Exam MAS-I, no usage difference found.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 5.1 and Corollary 5.1 (PDF p.218), Corollary 5.2 (PDF p.220), Theorem 6.2 (PDF p.239), Theorem 6.7 (PDF p.267), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; , §4.1.3 Functions of Continuous Random Variables (CDF method, Theorem 4.1 method of transformations, general form (4.6), Uniform(-1,1) squared example), sha256:fc521c3f2e55589d01948dd57e551aee1c34ccda1a11b52302064a9672de23bf — https://www.probabilitycourse.com/chapter4/4_1_3_functions_continuous_var.php; , §4.1.2 Expected Value and Variance (LOTUS (4.3), E[aX+b] = aEX + b, Var(aX+b) = a^2 Var(X) (4.4)), sha256:120c9fb88296609ab0cd0c2d2e74064ec745b889842a1a93703e328dbf9266ab — https://www.probabilitycourse.com/chapter4/4_1_2_expected_val_variance.php; SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential, PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), Deductibles (PDF p.7), Benefit Limits (PDF p.8), Inflation (PDF p.9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes a, e, f and Topic 3 learning outcomes a-e, g (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: CDF method against Pishro-Nik §4.1.3 and G&S Thm 5.1; change-of-variable formula with absolute Jacobian for strictly monotone g against G&S Cor 5.1 (increasing: +, decreasing: -) and Pishro-Nik Thm 4.1 (which also requires g differentiable; G&S states only strict monotonicity, so no finding); non-monotone branches against Pishro-Nik (4.6); linear E and Var against Pishro-Nik §4.1.2 and G&S Thms 6.2, 6.7; LOTUS against Pishro-Nik (4.3); deductible (X-d)+, benefit limit min(X,u), inflation scaling against P-21-05 pp.7-9 and syllabus Topic 2 LO e. Examples recomputed before reading answers: exponential pdf e^(-x/theta)/theta from Tables A.3.3.1, f_Y(y) = (1/1000) e^(-y/1100) / 1.1 = e^(-y/1100)/1100, and without the Jacobian the integral is 1.1 (agrees); F_U(u) = u (agrees, G&S Cor 5.2 for the reverse direction); X^2 with X ~ U(-1,1): F_Y = sqrt(y), f_Y = 1/(2 sqrt y) on (0,1) (agrees with Pishro-Nik §4.1.3). Inverse-transform generality -> F-001 minor (open). All wiki-links resolve; figure exists (generated); LaTeX well formed; also linked from Exam MAS-I, no usage difference found.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 5.1 and Corollary 5.1 (PDF p.218), Corollary 5.2 (PDF p.220), Theorem 6.2 (PDF p.239), Theorem 6.7 (PDF p.267), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.3 Functions of Continuous Random Variables (CDF method, Theorem 4.1 method of transformations, general form (4.6), Uniform(-1,1) squared example), sha256:fc521c3f2e55589d01948dd57e551aee1c34ccda1a11b52302064a9672de23bf — https://www.probabilitycourse.com/chapter4/4_1_3_functions_continuous_var.php; , §4.1.2 Expected Value and Variance (LOTUS (4.3), E[aX+b] = aEX + b, Var(aX+b) = a^2 Var(X) (4.4)), sha256:120c9fb88296609ab0cd0c2d2e74064ec745b889842a1a93703e328dbf9266ab — https://www.probabilitycourse.com/chapter4/4_1_2_expected_val_variance.php; SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential, PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), Deductibles (PDF p.7), Benefit Limits (PDF p.8), Inflation (PDF p.9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes a, e, f and Topic 3 learning outcomes a-e, g (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Still present: Inverse-transform claim for any distribution is broader than the source condition
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- reaffirms: F-001
- note: Re-detected on this sweep; the finding above still stands unchanged.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: CDF method against Pishro-Nik §4.1.3 and G&S Thm 5.1; change-of-variable formula with absolute Jacobian for strictly monotone g against G&S Cor 5.1 (increasing: +, decreasing: -) and Pishro-Nik Thm 4.1 (which also requires g differentiable; G&S states only strict monotonicity, so no finding); non-monotone branches against Pishro-Nik (4.6); linear E and Var against Pishro-Nik §4.1.2 and G&S Thms 6.2, 6.7; LOTUS against Pishro-Nik (4.3); deductible (X-d)+, benefit limit min(X,u), inflation scaling against P-21-05 pp.7-9 and syllabus Topic 2 LO e. Examples recomputed before reading answers: exponential pdf e^(-x/theta)/theta from Tables A.3.3.1, f_Y(y) = (1/1000) e^(-y/1100) / 1.1 = e^(-y/1100)/1100, and without the Jacobian the integral is 1.1 (agrees); F_U(u) = u (agrees, G&S Cor 5.2 for the reverse direction); X^2 with X ~ U(-1,1): F_Y = sqrt(y), f_Y = 1/(2 sqrt y) on (0,1) (agrees with Pishro-Nik §4.1.3). Inverse-transform generality -> F-001 minor (open). All wiki-links resolve; figure exists (generated); LaTeX well formed; also linked from Exam MAS-I, no usage difference found.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 5.1 and Corollary 5.1 (PDF p.218), Corollary 5.2 (PDF p.220), Theorem 6.2 (PDF p.239), Theorem 6.7 (PDF p.267), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.3 Functions of Continuous Random Variables (CDF method, Theorem 4.1 method of transformations, general form (4.6), Uniform(-1,1) squared example), sha256:fc521c3f2e55589d01948dd57e551aee1c34ccda1a11b52302064a9672de23bf — https://www.probabilitycourse.com/chapter4/4_1_3_functions_continuous_var.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.2 Expected Value and Variance (LOTUS (4.3), E[aX+b] = aEX + b, Var(aX+b) = a^2 Var(X) (4.4)), sha256:120c9fb88296609ab0cd0c2d2e74064ec745b889842a1a93703e328dbf9266ab — https://www.probabilitycourse.com/chapter4/4_1_2_expected_val_variance.php; SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential, PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), Deductibles (PDF p.7), Benefit Limits (PDF p.8), Inflation (PDF p.9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes a, e, f and Topic 3 learning outcomes a-e, g (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-001/R] Inverse-transform sentence qualified to strictly increasing CDFs
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Sentence now states G&S Corollary 5.2 with its condition: for a CDF F strictly increasing where 0 < F < 1, X = F^{-1}(U) has CDF F, the basis of simulation. The unqualified any-distribution claim is gone; no generalized inverse is introduced.

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: inverse-transform condition vs G&S Cor. 5.2 (F strictly increasing where 0 < F(y) < 1) and Ch. 5 Ex. 21; CDF method vs G&S Thm 5.1 and Pishro-Nik §4.1.3; change-of-variable density with |d g^-1/dy| vs G&S Cor. 5.1 and the Pishro-Nik §4.1.3 theorem; non-monotone X^2 vs Pishro-Nik §4.1.3 example; linear E and Var vs Pishro-Nik §4.1.2 and G&S Thms 6.2, 6.7; deductible, benefit limit and inflation vs P-21-05. Examples recomputed: (1/1000)e^(-y/1100)/1.1 = e^(-y/1100)/1100 (exponential mean 1100, Tables A.3.3.1); F_U(u) = u; F_Y = sqrt(y), f_Y = 1/(2 sqrt y) on (0,1). Links resolve; LaTeX well formed.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 5.1 and Corollary 5.1, Corollary 5.2 with the simulation paragraph before it, Ch. 5 Exercise 21, Theorems 6.2 and 6.7, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.3 Functions of Continuous Random Variables (CDF method, method of transformations theorem for strictly monotonic differentiable g, Uniform(-1,1) squared example), sha256:fc521c3f2e55589d01948dd57e551aee1c34ccda1a11b52302064a9672de23bf — https://www.probabilitycourse.com/chapter4/4_1_3_functions_continuous_var.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.2 Expected Value and Variance (LOTUS, E[aX+b] = aEX + b, Var(aX+b) = a^2 Var(X) (4.4)), sha256:120c9fb88296609ab0cd0c2d2e74064ec745b889842a1a93703e328dbf9266ab — https://www.probabilitycourse.com/chapter4/4_1_2_expected_val_variance.php; SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), A.3.3.1 Exponential (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), Deductibles, Benefit Limits and Inflation sections (PDF pp.7-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
