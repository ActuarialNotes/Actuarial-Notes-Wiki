---
target: Concepts/Permutation.md
created: 2026-09-27
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: P(n,k) = n(n-1)...(n-k+1) = G&S Theorem 3.2 count of k-permutations (G&S writes (n)_k; notation difference only), PDF p.88; = n!/(n-k)! by the factorial definition on the same page; factor-of-k! relation = G&S Thm 3.5 C(n,j) = (n)_j/j! (PDF p.102); without replacement per Def. 3.2 (ordered listing of a subset); example recomputed first: 8·7·6 = 336 and C(8,3) = 56 = stated; figure embed resolves
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Def. 3.2 and Thm 3.2 p.80 (PDF p.88); §3.2 Thm 3.5 p.94 (PDF p.102), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1b, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:38Z/8d19
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: diff add-only (6+, 0-); earlier content and sources unchanged; (n-k)! fixing k items = Siegrist Matching; circular (n-1)! = Siegrist round table; adjacent block method stated in words by Sekhon & Bloom §7.3 Ex. 5 (tie together, 3!·2!) and matched by Siegrist's exercise answers (2880 = 5!·4!, 384 = 4!·2^4, 1152 = 2·4!·4!); examples recomputed: 6! = 720, 4!·2! = 48 confirmed by enumeration of 5! orders; rule 10: compared p-549 (circle of 6, answer 2/5) and p-389 — not on page; 3 item quotes probe 'linked'
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Def. 3.2 and Thm 3.2 p.80 (PDF p.88); §3.2 Thm 3.5 p.94 (PDF p.102), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1b, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), fetched 2026-10-30, Finite Sampling Models §6 The Matching Problem (#{X_i = i for all i in J} = (n-j)!; C(n,j) subsets) sha256:6c44b9152bd3fe3f4e53e442c55bb21d299ee229e7ae996e5bb893b424b2857f — https://www.randomservices.org/random/urn/Matching.html; Foundations §1.8 Combinatorial Structures, Arrangements exercises (round table (n-1)!; couples/men together 384, 2880; books by subject) sha256:63ef90fd651593defb33d7772ecbe92f6198b6b655219a5cb726c76cdc393ccb — https://www.randomservices.org/random/foundations/Structures.html; R. Sekhon & R. Bloom, Applied Finite Mathematics (LibreTexts, CC BY-NC-SA 4.0), §7.3 Permutations, Example 5 ('we tie A and B together and treat them as one person … 3! 2! = 12'), fetched 2026-10-30, sha256:34d1761b4d54b6366e27427f706a44729ef59ca2056c035d524253d882c9c500 — https://math.libretexts.org/Bookshelves/Applied_Mathematics/Applied_Finite_Mathematics_(Sekhon_and_Bloom)/07:_Sets_and_Counting/7.03:_Permutations
- note: Re-pass after the Exam P G8 writer added passages (w2). Earlier sources re-cited from the block; new passages checked against the sources read this run.
