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

## [F-001/R] Unsourced ranking sentence removed
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted "The most common calculation derived from a Venn Diagram is finding the probability of the union." The formula is now introduced as the two-event union rule, G&S Thm 1.4 (p.24, PDF p.32).

## [F-002/R] Example stem defines A and H
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Stem now reads "Let A be the event that a policyholder has an auto policy and H the event that they have a homeowners policy", matching the answer tip (Auto, Homeowners). Numbers unchanged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001, F-002: Venn diagram visualises relations between sets, rectangle = universal set (Pishro-Nik §1.2.1); union, intersection, difference, complement (G&S p.21, Figure 1.7); union rule = G&S Thm 1.4; phrasing table: neither = (A ∪ B)^c, A but not B = A − B = A ∩ B^c (Pishro-Nik §1.2.2), exactly one = (A − B) ∪ (B − A); example recomputed 0.70 + 0.40 − 0.20 = 0.90, neither = 0.10, auto only 0.70 − 0.20 = 0.50, consistent with the figure region labels 0.50 / 0.20 / 0.20 / 0.10.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Figure 1.7 Venn diagrams (pp.21-22, PDF pp.29-30), Thm 1.4 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.1 Venn Diagrams, fetched 2026-09-28, sha256:2fe78c16c34bc692e154703fc87319338f8983e53c9914321e49e0fd8e5344ab — https://www.probabilitycourse.com/chapter1/1_2_1_venn.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (difference, disjoint sets, partition), fetched 2026-09-28, sha256:f8c7bf7ece0a23a177de9f1eeff3631122625cb461fde905f05d4fa468ad03ba — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:35Z/6484
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: diff additions only; exactly-one formula read in PN §1.3.3 Ex 1.11 with G&S Thm 1.4; eight-region partition and region sums read in Siegrist §2.3 (three-event exercise, accounting proof) and G&S Thm 1.2/1.3; newspaper example recomputed (a=10,b=15,c=5; 30 exactly two; 25 none); no question numbers; prior content and sources unchanged
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Figure 1.7 Venn diagrams (pp.21-22, PDF pp.29-30), Thm 1.4 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.1 Venn Diagrams, fetched 2026-09-28, sha256:2fe78c16c34bc692e154703fc87319338f8983e53c9914321e49e0fd8e5344ab — https://www.probabilitycourse.com/chapter1/1_2_1_venn.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (difference, disjoint sets, partition), fetched 2026-09-28, sha256:f8c7bf7ece0a23a177de9f1eeff3631122625cb461fde905f05d4fa468ad03ba — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, three-event exercise (exactly one / exactly two as unions of A∩B∩C^c-type regions; none = (A∪B∪C)^c), inclusion-exclusion proof by accounting (seven disjoint regions of A∪B∪C), sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §1.1 Sets (partitions), sha256:88ae6adae225bb78dcf149c6e9807cc4de3d615bf803a343f73b387d3729824a — https://www.randomservices.org/random/foundations/Sets.html; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.3 Finding Probabilities (Example 1.11: either but not both = P(A−B)+P(B−A); P(A−B)=P(A)−P(A∩B)), fetched 2026-10-30, sha256:984952f1ea762230cb0c228497cb48dced7032a55616e2ef6ca339338bd2fdfb — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.2 and Thm 1.3 (p.23, PDF p.31), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
- note: Re-pass after the G8 writer added passages (w0); checker is a different agent from the writer.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T01:05Z/b47c
- date: 2026-11-04
- status_set: verified
- confidence: high
- checks_run: diff only (b7493155 vs verified 2026-10-30 text): figure embed moved below the phrasing table, unchanged. Idea card: disjoint regions add (G&S Thm 1.1(4), Thm 1.2), every given total a sum of regions (Thm 1.3). Tip: objectives 1, 4-5 = syllabus a, d, e; bank tag counts consistency-checked (rank 4, not sourced) with an exact-line grep for the wiki_link entry over questions/ on 2026-11-04: 9 exam-p — match; shapes spot-read: p-258/p-445 driver risk factors (p-258 asks the total), p-367 health risk factors, p-182/p-183/p-184 portfolio profiles, p-331 symbolic answer — all tagged. Traps: pairwise count includes the centre (A∩B = (A∩B∩C^c) ∪ (A∩B∩C), Thm 1.2); at least one = union, exactly one = P(A−B)+P(B−A) = union − overlap (PN §1.3.3), at most one = 1−P(A∩B) (complement, Thm 1.1(5)); eight regions partition the group (Thm 1.3).
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Figure 1.7 Venn diagrams (pp.21-22, PDF pp.29-30), Thm 1.4 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.1 Venn Diagrams, fetched 2026-09-28, sha256:2fe78c16c34bc692e154703fc87319338f8983e53c9914321e49e0fd8e5344ab — https://www.probabilitycourse.com/chapter1/1_2_1_venn.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (difference, disjoint sets, partition), fetched 2026-09-28, sha256:f8c7bf7ece0a23a177de9f1eeff3631122625cb461fde905f05d4fa468ad03ba — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, three-event exercise (exactly one / exactly two as unions of A∩B∩C^c-type regions; none = (A∪B∪C)^c), inclusion-exclusion proof by accounting (seven disjoint regions of A∪B∪C), sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §1.1 Sets (partitions), sha256:88ae6adae225bb78dcf149c6e9807cc4de3d615bf803a343f73b387d3729824a — https://www.randomservices.org/random/foundations/Sets.html; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.3 Finding Probabilities (Example 1.11: either but not both = P(A−B)+P(B−A); P(A−B)=P(A)−P(A∩B)), fetched 2026-10-30, sha256:984952f1ea762230cb0c228497cb48dced7032a55616e2ef6ca339338bd2fdfb — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.2 and Thm 1.3 (p.23, PDF p.31), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 property 4 (p.22, PDF p.30), Thm 1.2 and Thm 1.3 (p.23, PDF p.31), Thm 1.4 (p.24, PDF p.32), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.3 Finding Probabilities (P(A−B)=P(A)−P(A∩B); Example: either but not both = P(A−B)+P(B−A)), fetched 2026-11-04, sha256:63d80d6b505c6ee80359645000bca6d4788ae1c97446662a77dd6deb07c7e946 — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
