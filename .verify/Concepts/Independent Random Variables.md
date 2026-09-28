---
target: Concepts/Independent Random Variables.md
created: 2026-09-28
---

## [F-001] Example stem asserts uniform marginals the joint density does not have
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: example Verifying Independence, stem, line 27
- claim: X ~ Uniform(0,1) and Y ~ Uniform(0,1) with joint density f(x,y) = 2 for 0 < x < y < 1
- evidence: Recomputed before reading the answer: f_X(x) = int_x^1 2 dy = 2(1-x) and f_Y(y) = int_0^y 2 dx = 2y on (0,1); neither is the Uniform(0,1) density 1, and the page answer derives the same two marginals. No pair with Uniform(0,1) marginals has this joint density, so the stem states a contradiction. The conclusion survives: 4y(1-x) != 2, so by G&S Thm 4.2 (PDF p.173, density factorisation iff independent) X and Y are not independent.
- source_rank: 5
- proposed_action: Remove the Uniform(0,1) assertions from the stem (e.g. state only that X and Y have joint density 2 on 0 < x < y < 1). Author wording; not auto-fixed.
- applied: false
- fingerprint: cd058d33b88d

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: CDF factorisation against G&S Def. 4.7 (PDF p.173); density factorisation against G&S Thm 4.2 (PDF p.173); Cov = 0 under independence and converse false against G&S Ex. 6.2.23 (PDF p.275), Ex. 6.3.17 (PDF p.289) and SOA sample solution Q248 (Cov 0 yet dependent, PDF p.73); E[XY] = E[X]E[Y] against G&S Thm 6.4 (PDF p.241); Var(X+Y) = Var X + Var Y against G&S Thm 6.8 (PDF p.267); CLT for i.i.d. sums against G&S §9.2 (PDF p.348) and syllabus Topic 3 i; example recomputed before reading the answer: marginals 2(1-x) and 2y, product 4y(1-x) != 2, not independent, agrees; stem uniform-marginal claim contradicted (F-001); 3 wiki-links and 1 embed resolve
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.7 and Thm 4.2 (PDF p.173), Thm 6.4 (PDF p.241), Thm 6.8 (PDF p.267), Ex. 6.2.23 (PDF p.275), Ex. 6.3.17 (PDF p.289), §9.2 (PDF p.348), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q248 (PDF p.73), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 2 outcomes e-f (PDF p.3) and Topic 3 outcome i (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
