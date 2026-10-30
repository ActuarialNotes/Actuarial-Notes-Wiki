---
target: Concepts/Probability Addition Rule.md
created: 2026-09-27
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: Two-event rule: G&S Thm 1.4 eq. (1.1), which notes it reduces to disjoint additivity when A and B are disjoint and is generalised by Thm 3.8 (so the also-known-as-inclusion-exclusion bullet is the n=2 case). Three-event formula: G&S Thm 3.8 with n=3, and SOA Q1 p.2 applies exactly this expansion (0.28+0.29+0.19-0.14-0.10-0.12+0.08 = 0.48). Example recomputed first: 0.05+0.03-0.01 = 0.07, agrees. Link Mutually Exclusive Events resolves; figure exists.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 property 4 pp.22-23 (PDF pp.30-31), Thm 1.4 p.24 (PDF p.32), Thm 3.8 Inclusion-Exclusion Principle p.104 (PDF p.112), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q1 and Q3 p.2, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:35Z/6484
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: diff additions only; only/exactly-one/independence-complement read in PN §1.3.3, §1.4.1; exactly-two formula checked against Siegrist §2.3 exercise (0.04+0.1+0.1−0.03=0.21); intersection bounds read in Siegrist (Bonferroni, two-event bounds); example recomputed (0.60; union in [0.7,1], neither in [0,0.3]); no question numbers; prior content and sources unchanged
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 property 4 pp.22-23 (PDF pp.30-31), Thm 1.4 p.24 (PDF p.32), Thm 3.8 Inclusion-Exclusion Principle p.104 (PDF p.112), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q1 and Q3 p.2, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.3 Finding Probabilities (P(A−B)=P(A)−P(A∩B), A−B=A∩B^c; Example 1.11 either but not both), fetched 2026-10-30, sha256:984952f1ea762230cb0c228497cb48dced7032a55616e2ef6ca339338bd2fdfb — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.4.1 Independence (A, B independent ⇒ A and B^c, A^c and B independent), fetched 2026-10-30, sha256:d3a628b19b7630f57b78839bd1c92defb3988d4897dcdab840d5811dc5522dbd — https://www.probabilitycourse.com/chapter1/1_4_1_independence.php; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, difference rule, increasing property, Bonferroni's inequality, two-event bounds P(A)+P(B)−1 ≤ P(A∩B), three-event exercise (exactly two = 0.21 reproduced by Σpairwise − 3·triple), sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html
- note: Re-pass after the G8 writer added passages (w0); checker is a different agent from the writer.
