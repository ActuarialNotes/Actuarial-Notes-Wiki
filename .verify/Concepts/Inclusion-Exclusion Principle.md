---
target: Concepts/Inclusion-Exclusion Principle.md
created: 2026-09-27
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: Two- and three-event formulas and the sign-alternation rule: G&S Thm 3.8 eq. (3.3) and its gloss (add singles, subtract two-way, add three-way, and so forth); SOA Q1 p.2 applies the three-event form, Q100 p.30 applies it to counts (34+15+10-7-6-5+4 = 45), supporting the or-size wording. Disjoint reduction: G&S Thm 1.4 remark. Examples recomputed first: 0.5+0.4-0.2 = 0.7 (agrees); 0.9-0.3+0.05 = 0.65 (agrees; region check: only-A = 0.15, pairwise-only = 0.05, all non-negative). One-line align* inside a callout is a vaultMath.ts-handled shape. Links Event, Set Operations, Probability, Mutually Exclusive Events resolve; figure exists.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.4 p.24 (PDF p.32), Thm 3.8 Inclusion-Exclusion Principle p.104 (PDF p.112), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q1 p.2 and Q100 p.30, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T21:37Z/a2ck
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: Diff check: one bullet + two formula blocks on Bonferroni bounds added, frontmatter untouched. Checked against Siegrist, Probability Measures: Boole's inequality (first upper bound) and the general Bonferroni inequalities (odd truncation upper, even lower — Siegrist's 'event' is a typo for 'even'); the written second bound is the m = 2 case. No question's numbers on the page (masi-2019f-q6 read). G8: MAS-I.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.4 p.24 (PDF p.32), Thm 3.8 Inclusion-Exclusion Principle p.104 (PDF p.112), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q1 p.2 and Q100 p.30, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Siegrist, Random (randomservices.org, HTML fetched 2026-10-30), Probability Spaces > Probability Measures: Boole's inequality P(union A_i) <= sum P(A_i); general Bonferroni inequalities — the inclusion-exclusion sum truncated after m terms is an upper bound for P(union) if m is odd and a lower bound if m is even — https://www.randomservices.org/random/prob/Probability.html
