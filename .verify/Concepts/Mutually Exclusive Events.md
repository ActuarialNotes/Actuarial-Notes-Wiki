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
