---
target: Concepts/Random Variable.md
created: 2026-09-27
---

## [F-001] Discrete/continuous classification by countable vs uncountable range is wrong and omits mixed variables
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: major
- status: open
- locus: bullet, line 18
- claim: Random variables are classified as discrete (countable range of outcomes) or continuous (uncountable range of outcomes)
- evidence: MIT 18.05 Reading 5b (PDF p.2) defines a continuous random variable by a density: X is continuous if there is f with P(c <= X <= d) = integral of f from c to d. Pishro-Nik §4.1.0 defines continuous by a continuous CDF, and §4.3.1 describes mixed random variables that are neither discrete nor continuous. An uncountable range is therefore not the test, and the two-way split is not exhaustive. Counterexample on the sibling page Concepts/Continuous Random Variable.md, example 2: Y = max(X - 200, 0) with X uniform on (0, 1000) has an uncountable range [0, 800) yet P(Y = 0) = 0.2, so Y is not continuous. The Exam P syllabus (Nov 2026, Topic 2 LO e, f) requires exactly such payment amount random variables under deductibles and benefit limits, so a candidate who applies this bullet misclassifies them. G&S Definition 1.1 (PDF p.26) supports the discrete half (finite or countably infinite).
- source_rank: 3
- proposed_action: Restate the bullet: discrete = values in a finite or countably infinite set (G&S Def. 1.1); continuous = has a density, P(c <= X <= d) is the integral of f (MIT 18.05 Reading 5b); and add that a payment variable under a deductible or limit is mixed, neither discrete nor continuous (link Payment Random Variable). Needs new prose, so not auto-fixed.
- applied: false
- fingerprint: 0e5a4b068b1a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: Definition X: S -> R against Pishro-Nik §3.1.1 and MIT 18.05 Reading 4a p.2 (agrees); two-coin example recomputed before reading the answer: P(X=0,1,2) = 1/4, 1/2, 1/4 (agrees); discrete/continuous classification bullet against G&S Def 1.1, MIT 5b p.2 and Pishro-Nik §4.1.0/§4.3.1 -> F-001 major (open, does not affect a formula); [[Sample Space]] resolves, Media/Figures/Random_Variable.svg exists (generated, not reviewed); LaTeX well formed; page also linked from Exam MAS-I, no CAS/SOA usage difference found.
- sources_checked: , §3.1.1 Random Variables (a random variable X is a function from the sample space to the real numbers), sha256:6a9473e3232fdf089177daacdbdeadad2d6f0e451217ed4c7d23e26c7973e356 — https://www.probabilitycourse.com/chapter3/3_1_1_random_variables.php; MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 4a: Discrete Random Variables, §2 definition (PDF p.2), cdf definition (PDF p.3), §2.8 Properties of the cdf (PDF pp.5-6), sha256:ff2a10e7ef1c0f5ef300ed8f73864d365ca5adcdf9775d1c4a6f356ee7687b5d — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class04-prep-a.pdf; MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 5b: Continuous Random Variables, definition of a continuous random variable (PDF p.2), pdf values greater than 1 (PDF p.4), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 1.1 (PDF p.26), Definition 1.2 (PDF p.27), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes a, e, f and Topic 3 learning outcomes a-e, g (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: Definition X: S -> R against Pishro-Nik §3.1.1 and MIT 18.05 Reading 4a p.2 (agrees); two-coin example recomputed before reading the answer: P(X=0,1,2) = 1/4, 1/2, 1/4 (agrees); discrete/continuous classification bullet against G&S Def 1.1, MIT 5b p.2 and Pishro-Nik §4.1.0/§4.3.1 -> F-001 major (open, does not affect a formula); [[Sample Space]] resolves, Media/Figures/Random_Variable.svg exists (generated, not reviewed); LaTeX well formed; page also linked from Exam MAS-I, no CAS/SOA usage difference found.
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §3.1.1 Random Variables (a random variable X is a function from the sample space to the real numbers), sha256:6a9473e3232fdf089177daacdbdeadad2d6f0e451217ed4c7d23e26c7973e356 — https://www.probabilitycourse.com/chapter3/3_1_1_random_variables.php; MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 4a: Discrete Random Variables, §2 definition (PDF p.2), cdf definition (PDF p.3), §2.8 Properties of the cdf (PDF pp.5-6), sha256:ff2a10e7ef1c0f5ef300ed8f73864d365ca5adcdf9775d1c4a6f356ee7687b5d — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class04-prep-a.pdf; MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 5b: Continuous Random Variables, definition of a continuous random variable (PDF p.2), pdf values greater than 1 (PDF p.4), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 1.1 (PDF p.26), Definition 1.2 (PDF p.27), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes a, e, f and Topic 3 learning outcomes a-e, g (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-001/R] Discrete/continuous classification restated; mixed variables named
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Bullet replaced: discrete = values in a finite or countably infinite set (G&S Def. 1.1, MIT 18.05 Reading 4a); continuous = probabilities from a density, P(a <= X <= b) = integral of f (MIT 18.05 Reading 5b definition), so the CDF has no jumps and P(X = x) = 0 (Pishro-Nik §4.1.0). New bullet: the two classes are not exhaustive; a deductible payment Y = (X - d)+ with X continuous has a continuum of values yet P(Y = 0) = P(X <= d) > 0 and is mixed, neither discrete nor continuous (Pishro-Nik §4.3.1), linking Payment Random Variable.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: X: S -> R vs Pishro-Nik §3.1.1 and MIT 4a; discrete definition vs G&S Def. 1.1 and MIT 4a; continuous-by-density vs MIT 5b, no jumps / P(X=x)=0 vs Pishro-Nik §4.1.0; mixed = neither discrete nor continuous vs Pishro-Nik §4.3.1; P(Y=0) = P(X<=d) for Y = (X-d)+ consistent with vault Continuous Random Variable example 2 and Payment Random Variable; payment variables on syllabus Topic 2 LO e. Two-coin example recomputed: 1/4, 1/2, 1/4 (agrees). All wiki-links resolve; LaTeX well formed.
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §3.1.1 Random Variables (X is a function from the sample space to the real numbers), sha256:6a9473e3232fdf089177daacdbdeadad2d6f0e451217ed4c7d23e26c7973e356 — https://www.probabilitycourse.com/chapter3/3_1_1_random_variables.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.0 Continuous Random Variables and their Distributions (Definition: continuous CDF; jumps correspond to P(X=x) > 0), sha256:5f1f5c3c515c0359a39754877a2f9ca95282110a471881b79d249ad828e3d140 — https://www.probabilitycourse.com/chapter4/4_1_0_continuous_random_vars_distributions.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.3.1 Mixed Random Variables (neither discrete nor continuous; jump points with P(Y=y) > 0), sha256:7ecb17fdb2f5962b0bb95a80845ebef502c08988f765e647d4cf08e56894b640 — https://www.probabilitycourse.com/chapter4/4_3_1_mixed.php; MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 4a: Discrete Random Variables, definition of a discrete random variable (PDF p.2), cdf definition (PDF p.3), sha256:ff2a10e7ef1c0f5ef300ed8f73864d365ca5adcdf9775d1c4a6f356ee7687b5d — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class04-prep-a.pdf; MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 5b: Continuous Random Variables, definition of a continuous random variable (PDF p.2), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 1.1 (discrete: finite or countably infinite), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
