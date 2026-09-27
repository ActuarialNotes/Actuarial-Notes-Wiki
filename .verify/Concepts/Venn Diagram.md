---
target: Concepts/Venn Diagram.md
created: 2026-09-27
---

## [F-001] Most-common-calculation claim is unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: intro, line 14
- claim: The most common calculation derived from a Venn Diagram is finding the probability of the union.
- evidence: No source read supports a ranking of Venn-diagram uses. Pishro-Nik §1.2.1 presents Venn diagrams only as a way of visualising relations between sets; the two SOA Exam P sample solutions that name a Venn diagram (Q182, PDF pp.54-55; Q258, PDF pp.75-76) use it to solve for region counts (e.g. X = Y = Z = 150 in Q258), not a union probability.
- source_rank: 1
- proposed_action: Drop the ranking or cite a source for it.
- applied: false
- fingerprint: b5aa2328eedb

## [F-002] Example stem never says what events A and H are
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: nit
- status: open
- locus: Example: The Insurance Policyholder, stem line 35
- claim: $P(A) = 0.70$, $P(H) = 0.40$, $P(A \cap H) = 0.20$. Find the probability of a policyholder having neither policy.
- evidence: The stem gives probabilities for A and H without defining them; only the answer tip reveals they are Auto and Homeowners policies. The arithmetic is unaffected: recomputed 0.70+0.40-0.20 = 0.90 (G&S Thm 1.4, p.24), neither = 1-0.90 = 0.10.
- source_rank: 5
- proposed_action: Define A (owns an auto policy) and H (owns a homeowners policy) in the stem.
- applied: false
- fingerprint: 3e477754175a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: P(A u B)=P(A)+P(B)-P(A n B) = G&S Thm 1.4 eq.(1.1), no condition needed; universal set as rectangle, sets as closed regions = Pishro-Nik §1.2.1; phrase table: both = intersection, either/or = union (G&S p.21 inclusive or convention), neither = (A u B)^c (complement, Pishro-Nik §1.2.2), A but not B = A minus B (G&S p.21 snow-but-not-rain example E = B - C), exactly one = union of the two differences (from the same definitions); SOA Q182/Q258 solutions use Venn diagrams on exam problems. Example recomputed before reading answer: 0.9, neither 0.10 - agrees; trap tip Auto only 70-20=50 = G&S Cor 1.1 P(A)=P(A n B)+P(A n B~) - agrees. Figure exists; LaTeX balanced; no wiki-links.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Figure 1.7 Venn diagrams (pp.21-22, PDF pp.29-30), Theorem 1.4 and Corollary 1.1 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.1 Venn Diagrams, fetched 2026-09-27, sha256:918553ec01dda7da540a1f051713ec597d9e4a9e612a4ee5dfc03a08f6e96287 — https://www.probabilitycourse.com/chapter1/1_2_1_venn.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (incl. De Morgan's law, mutually exclusive), fetched 2026-09-27, sha256:aae5ce2766d2602e6bbdf92038d7bafdceca10b66ead36612dc7c6b31a35e12b — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php; SOA Exam P Sample Solutions (Aug 2026 revision), Q182 (PDF pp.54-55) and Q258 (PDF pp.75-76), Venn-diagram solutions, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Open minor F-001 (unsourced claim), nit F-002 (undefined events in stem).
