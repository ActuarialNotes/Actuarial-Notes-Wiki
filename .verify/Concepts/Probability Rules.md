---
target: Concepts/Probability Rules.md
created: 2026-09-27
---

## [F-001] Rounded result written as an equality
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: nit
- status: open
- locus: example At Least One via the Complement, line 54
- claim: 1 - 0.59049 = 0.41
- evidence: Recomputed: 1 - 0.9^5 = 1 - 0.59049 = 0.40951 exactly. The final line writes = 0.41, a rounding shown as equality. The method (complement of none, G&S Thm 1.1 property 5, applied the same way in SOA Sample Solutions Q1, p.2) is right.
- source_rank: 5
- proposed_action: Write \approx 0.41 (or = 0.40951) on the last line.
- applied: false
- fingerprint: 5361dca3a893

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: high
- checks_run: Complement rule: G&S Thm 1.1(5). Addition rule: G&S Thm 1.4, applied in SOA Q2/Q3 p.2. Multiplication P(A and B) = P(A|B)P(B): G&S eq. (4.2) and Thm 4.1 proof. Total probability over a partition: G&S eq. (4.3) with H_i pairwise disjoint and union Omega (page states the partition condition). Independence simplification: G&S Thm 4.1. Mutually exclusive is not independent: from G&S Def. 4.1/Thm 4.1 with P(A),P(B) > 0 and P(A and B) = 0. Chain rule for dependent draws: G&S Example 4.5 (branch weights are conditional probabilities, path = product). Examples recomputed first: 0.60+0.45-0.25 = 0.80, neither 0.20 (agree); 1-0.9^5 = 0.40951 (page says = 0.41, nit F-001); 6/10*5/9*4/8 = 1/6 (agrees). All nine wiki-links resolve.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 property 5 p.22 (PDF p.30), Thm 1.4 p.24 (PDF p.32), Thm 3.8 p.104 (PDF p.112), §4.1 conditional probability p.134 (PDF p.142), Example 4.5/Fig. 4.1 p.135 (PDF p.143), Def. 4.1 + Thm 4.1 pp.139-140 (PDF pp.147-148), eqs. (4.2)-(4.3) p.146 (PDF p.154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q1-Q3 p.2 and Q351 p.98, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf

## [F-001/R] Rounded result shown as an approximation
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Last line now reads 0.40951 ≈ 0.41. Recomputed: 0.9^5 = 0.59049, 1 − 0.59049 = 0.40951.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: complement = G&S Thm 1.1 property 5; addition = Thm 1.4; multiplication P(A ∩ B) = P(A | B) P(B) = eq. (4.2) and the proof of Thm 4.1; product form iff independent = Thm 4.1; total probability over a partition = eq. (4.3) with H1..Hm pairwise disjoint covering Ω; disjoint events with positive probability have P(A | B) = 0 ≠ P(A), so they are not independent (Def. 4.1); examples recomputed: 0.60 + 0.45 − 0.25 = 0.80, neither 0.20; 1 − 0.9^5 = 0.40951 ≈ 0.41; (6/10)(5/9)(4/8) = 120/720 = 1/6.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 property 5 (p.22, PDF p.30), Thm 1.4 (p.24, PDF p.32), Def. 4.1 (p.139, PDF p.147), Thm 4.1 (p.140, PDF p.148), Bayes formula and eqs. (4.2)-(4.3) (pp.145-146, PDF pp.153-154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.2 Probability — Axioms of Probability, fetched 2026-09-28, sha256:ce6639e8688b5f1a5d2d5c4430f172a938d0a6573450984852a1415e28e93df1 — https://www.probabilitycourse.com/chapter1/1_3_2_probability.php
