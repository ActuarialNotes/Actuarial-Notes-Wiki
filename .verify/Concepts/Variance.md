---
target: Concepts/Variance.md
created: 2026-09-28
---

## [F-001] Zero-variance converse unsourced and loosely stated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 3, line 17
- claim: Var(X) >= 0, with equality only if X is constant
- evidence: Pishro-Nik sec. 3.2.4 confirms Var(X) >= 0 (since (X - mu)^2 >= 0) and shows a constant has variance 0, but no source read this session states the converse. The converse holds only almost surely (Var(X) = 0 iff P(X = mu) = 1): a variable that differs from a constant on a probability-zero set also has variance 0.
- source_rank: 3
- proposed_action: Write "with equality only if P(X = mu) = 1" and cite a ranked source for it.
- applied: false
- fingerprint: 27cd20223dd6

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Var = E[(X-mu)^2] vs G&S sec. 6.2 definition; = E[X^2] - mu^2 vs G&S Thm 6.6; Var(aX+b) = a^2 Var(X) vs G&S Thm 6.7 (V(cX) = c^2 V(X), V(X+c) = V(X)); Var >= 0 vs Pishro-Nik sec. 3.2.4; syllabus LO d. Example recomputed before reading the answer: 310000 - 500^2 = 60000, agrees. Links and embed resolve; LaTeX well formed.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), sec. 6.2 definition of V(X), Thm 6.6 and Thm 6.7, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, sec. 3.2.4 Variance (fetched 2026-09-27), sha256:90ca917f6141a0c49d353bdae1e824585656afd7d76c80823c31247f0c522008 — https://www.probabilitycourse.com/chapter3/3_2_4_variance.php; SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Formulas and example confirmed; one minor open (zero-variance converse).

## [F-001/R] Unsourced zero-variance converse removed
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Bullet now states only what Pishro-Nik §3.2.4 says: Var(X) >= 0 because (X - mu)^2 >= 0, and a variable always equal to its mean (Y = 0 in the source) has variance 0. The converse (equality only if constant) is deleted: no source read this session states it.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: Var = E[(X-mu)^2] and Var >= 0 vs Pishro-Nik §3.2.4; E[X^2] - mu^2 vs G&S Thm 6.6; Var(aX+b) = a^2 Var(X) vs G&S Thm 6.7; syllabus LO d. Example recomputed: 310000 - 500^2 = 60000 (agrees). Links resolve; LaTeX well formed.
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §3.2.4 Variance (definition, Var >= 0, variance 0 for a variable equal to its mean), sha256:2eb1d22be0e78ad88e2d456fbf134ecbb4b1515f0eacaef640e8483d4ac88547 — https://www.probabilitycourse.com/chapter3/3_2_4_variance.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorems 6.6 and 6.7, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
