---
target: Concepts/Mutually Exclusive Events.md
created: 2026-09-27
---

## [F-001] Example stem is internally inconsistent and poses no question
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: example Insurance Claim Type, lines 23-28
- claim: A single claim is classified as either property damage (P) or bodily injury (B), but not both. P(P) = 0.60 and P(B) = 0.35.
- evidence: Read as written, either PD or BI but not both makes the two classes exhaustive, so their probabilities would sum to 1; they sum to 0.95 and the answer then introduces a 5% other class the stem never mentions. The stem also asks nothing (no Find/What is sentence), and it names an event P, so the page writes P(P). The arithmetic is right (0.60+0.35 = 0.95 by G&S Thm 1.1 property 4, p.23; 1-0.95 = 0.05).
- source_rank: 3
- proposed_action: Reword the stem so claims may be of another type (e.g. property damage, bodily injury, or other), add the question (probability the claim is PD or BI), and rename event P (e.g. D) so it is not the probability function.
- applied: false
- fingerprint: 572a800863b5

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: Definition (cannot both occur, A and B = empty set, so P = 0): G&S Thm 1.2 pairwise disjoint (no two have an element in common). Two-event and finite pairwise-disjoint additivity: G&S Thm 1.1(4), Thm 1.2. Usage matches SOA: Q100 p.30 adds counts because the sets are mutually exclusive; Q351 p.98 invokes the addition rule for a union of mutually exclusive events. Example recomputed: 0.95 and 0.05, agree; stem wording finding F-001 (minor, no formula affected). Link Probability Addition Rule resolves; figure exists.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 property 4 pp.22-23 (PDF pp.30-31), Thm 1.2 p.23 (PDF p.31), Thm 1.4 p.24 (PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q100 p.30 and Q351 p.98, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Probability Exam syllabus, November 2026, General Probability learning outcomes a, c-g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-001/R] Example stem made consistent and given a question
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Stem now: each claim is exactly one of property damage (D), bodily injury (B), or other; event P renamed D; it asks for P(D ∪ B) and P(other). Answer: 0.60 + 0.35 = 0.95 by additivity, and since the three classes partition the claims P(other) = 1 − 0.95 = 0.05 (G&S Thm 1.1 properties 4-5, pp.22-23).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: disjoint = empty intersection (Pishro-Nik §1.2.2), so P(A ∩ B) = 0; addition rule reduces to P(A) + P(B) (G&S Thm 1.1 property 4, and Thm 1.4 with P(A ∩ B) = 0); finite pairwise-disjoint additivity = Thm 1.2; example recomputed 0.60 + 0.35 = 0.95, P(other) = 1 − 0.95 = 0.05.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 4-5 (pp.22-23, PDF pp.30-31), Thm 1.2 (p.23, PDF p.31), Thm 1.4 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (difference, disjoint sets, partition), fetched 2026-09-28, sha256:f8c7bf7ece0a23a177de9f1eeff3631122625cb461fde905f05d4fa468ad03ba — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes 1a-1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:35Z/6484
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: diff additions only; subset-of-empty argument checked against G&S Thm 1.1 props 1, 3 and Siegrist increasing property; no question numbers; prior content and sources unchanged
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 4-5 (pp.22-23, PDF pp.30-31), Thm 1.2 (p.23, PDF p.31), Thm 1.4 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (difference, disjoint sets, partition), fetched 2026-09-28, sha256:f8c7bf7ece0a23a177de9f1eeff3631122625cb461fde905f05d4fa468ad03ba — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes 1a-1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 1 and 3 (p.22, PDF p.30), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, increasing property, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html
- note: Re-pass after the G8 writer added passages (w0); checker is a different agent from the writer.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T01:05Z/b47c
- date: 2026-11-04
- status_set: verified
- confidence: high
- checks_run: diff only (b7493155 vs verified 2026-10-30 text): defining formula moved directly under the definition, unchanged. New bullet: ME with positive probabilities never independent — G&S Thm 4.1 needs P(A∩B)=P(A)P(B)>0, but disjoint gives 0. Idea card: disjoint events add (Thm 1.1(4), Thm 1.2); with exclusive and exhaustive classes one class = 1 − the rest (Thm 1.2 with P(Ω)=1; PN partition). Tip: objective 4 = syllabus d; bank tag counts consistency-checked (rank 4, not sourced) with an exact-line grep for the wiki_link entry over questions/ on 2026-11-04: 8 exam-p (p-607, p-191, p-081, p-346, p-147, p-192, p-039, p-087) — match; shapes spot-read: ME pairs in three events p-191/p-346/p-087 with an independent pair in p-191, cancer stages p-147, call lengths p-607, thefts per year p-192, two groups p-039; 'claim types' is the page's own example, not a tagged question (no finding). Traps: product in place of 0 raises P(A∩C) and lowers the union (addition rule); overlapping 2-4 and 3-5 minute intervals share [3,4) so can't be added (Thm 1.1(4) needs disjointness); 1 − rest needs exhaustive classes (Thm 1.3 partition). Link Independent Events resolves.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 4-5 (pp.22-23, PDF pp.30-31), Thm 1.2 (p.23, PDF p.31), Thm 1.4 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (difference, disjoint sets, partition), fetched 2026-09-28, sha256:f8c7bf7ece0a23a177de9f1eeff3631122625cb461fde905f05d4fa468ad03ba — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes 1a-1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 1 and 3 (p.22, PDF p.30), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, increasing property, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 4-5 (pp.22-23, PDF pp.30-31), Thm 1.2 and Thm 1.3 (p.23, PDF p.31); §4.1 Def. 4.1 (p.139, PDF p.147) and Thm 4.1 independence iff P(E∩F)=P(E)P(F) (p.140, PDF p.148), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (mutually exclusive / disjoint sets; partitions), fetched 2026-11-04, sha256:4025d5e8caa7de295a64d919f3cfc5b2f48996971272f227a574e5e7c4c5f9fd — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T04:24Z/d5ff
- date: 2026-11-04
- status_set: verified
- confidence: high
- checks_run: diff only (wording pass, 7cfd9bb8): independence bullet reworded, same claim (P(A∩B)=0 vs P(A)P(B)>0); '1 minus the others' moved from card to a bullet (G&S Thm 1.2/1.3 with P(Ω)=1); card adds 'adding two events usually counts their overlap twice' (G&S Thm 1.4 proof); tip bank count 8 and shapes unchanged (thefts per year p-192, two groups p-039 per C-004); traps reworded only
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Venn Fig. 1.7, Thm 1.1-1.4 incl. Thm 1.4 proof 'added twice' (pp.21-24, PDF pp.29-32); Infinite Sample Spaces (pp.28-29, PDF pp.36-37), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf

## [C-006] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T04:27Z/5881
- date: 2026-11-04
- status_set: verified
- confidence: high
- checks_run: source list restored after a diff-only pass replaced it; content unchanged since pass 2026-11-04T04:24Z/d5ff
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 4-5 (pp.22-23, PDF pp.30-31), Thm 1.2 (p.23, PDF p.31), Thm 1.4 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (difference, disjoint sets, partition), fetched 2026-09-28, sha256:f8c7bf7ece0a23a177de9f1eeff3631122625cb461fde905f05d4fa468ad03ba — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes 1a-1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 1 and 3 (p.22, PDF p.30), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, increasing property, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 properties 4-5 (pp.22-23, PDF pp.30-31), Thm 1.2 and Thm 1.3 (p.23, PDF p.31); §4.1 Def. 4.1 (p.139, PDF p.147) and Thm 4.1 independence iff P(E∩F)=P(E)P(F) (p.140, PDF p.148), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (mutually exclusive / disjoint sets; partitions), fetched 2026-11-04, sha256:4025d5e8caa7de295a64d919f3cfc5b2f48996971272f227a574e5e7c4c5f9fd — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Venn Fig. 1.7, Thm 1.1-1.4 incl. Thm 1.4 proof 'added twice' (pp.21-24, PDF pp.29-32); Infinite Sample Spaces (pp.28-29, PDF pp.36-37), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf

## [C-007] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:02Z/df40
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: every formula and statement read against the sources cited; every number on the page (running example, tables, Try-it answers, trap figures) recomputed independently in python before comparing (rank 5, falsify-only: all agree); method of each worked number matches the sources' method; wiki-links and Media embeds resolve; $$ and \begin/\end balanced. Page-specific: disjoint additivity and partitions (G&S Thm 1.1(4), 1.2, 1.3); disjoint events with positive probability dependent, both properties only with a null event (Siegrist, Independence, G&S Thm 4.1); claim-count table .60/.25/.10/.05, .85, 1.25 overlap, addition rule 1, P(N≥3)=.05, P(N≥1)=.40 both ways, .15 vs 0; Try-it .95/.05, .78 (C fits outside A∪B), call lengths .55
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 property 4, Thm 1.2 (pairwise disjoint), Thm 1.3 (P(E)=Σ P(E∩A_i) over a partition), Thm 1.4 with proof 'added twice … subtracted once' (pp.22-24, PDF pp.30-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 independence (either event probability 0 counts as independent), Thm 4.1 independent iff P(E∩F)=P(E)P(F) (pp.139-140, PDF pp.147-148); Def. 4.2 mutual independence over every subset, pairwise does not imply mutual (p.141, PDF p.149); Exercise 7: A heads on first toss, B heads on second, C tosses match are pairwise independent but not independent (PDF p.159), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Probability Spaces > Independence (disjoint events with positive probability are dependent; probability 0 or 1 events independent of every event; pairwise vs mutual independence; Reliability: series reliability p1…pn, parallel 1−∏(1−pi), k out of n system works iff at least k components work), read 2026-11-06, sha256:5f47788c1c3a1a7a6b7b916b9d339bb59184c723dc6d2ccd05fd1a11639054c9 — https://www.randomservices.org/random/prob/Independence.html; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.1 Independence (complements of independent events independent; P(∪A_i)=1−∏(1−P(A_i)); warning not to confuse independence with disjointness), read 2026-11-06, sha256:fcf1aacf872ba059ed46a7a386f0e4725016d0ae10db09bd5d4f77d9883c35a7 — https://www.probabilitycourse.com/chapter1/1_4_1_independence.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2), Topic 2 outcome b (PDF p.3), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Full re-check of the page as rewritten into the new teaching style (2026-11-06); prior log read in full, no open findings or human comments carried. No errors found; no edits made.
