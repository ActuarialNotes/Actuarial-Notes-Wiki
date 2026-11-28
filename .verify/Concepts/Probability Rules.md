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

## [F-002] Integer-count complement identity not covered by any source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- severity: minor
- status: open
- locus: The count sentence
- claim: For a count N, {N >= k} is the complement of {N <= k-1}, so P(N >= k) = 1 - P(N <= k-1).
- evidence: The identity is arithmetically correct for integer-valued N and follows from Thm 1.1 property 5, but no excerpt read this session states the integer-count case. Listed under unsourced; filed minor because it is a fact no source read supports directly.
- source_rank: 5
- applied: false
- fingerprint: 87960fe09ad6

## [C-003] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- status_set: in_review
- checks_run: Blind examples solved first in Python: C6 1-0.9^5 = 0.40951 (page's approx 0.41 is fine as ≈); C11 0.60+0.45-0.25 = 0.80, neither = 0.20 (agrees); C16 (6/10)(5/9)(4/8) = 1/6 (agrees); C21 0.3*0.2 + 0.7*0.1 = 0.13 (agrees). Claim-by-claim against G&S (prob.pdf) excerpts read this session: C3 complement formula checked against Thm 1.1 property 5 (P(A~) = 1 - P(A)): page line 5 has '1 + P(E)' - wrong sign, critical. C2/C4 and page line 9 (P(E)=1-P(E^c)) agree with Thm 1.1(5). C7-C10 addition rule checked against Thm 1.4 (eq 1.1) and its proof: formula, overlap subtraction, and disjoint reduction agree. C12-C15 multiplication rule checked against eq. (4.2)/Thm 4.1 and Def 4.1: P(E|F)P(F) = P(E n F), and product form iff independent, agree. Branch weights = conditional probabilities and path = product of branches checked against Example 4.5 and its tree (p.135). C17-C20 total probability checked against eq. (4.3) with pairwise disjoint H_i covering the sample space, and the sum-to-1 statement via Thm 1.1; agrees. C22 trap: derived from Def 4.1 with P(E),P(F)>0 and P(E n F)=0 giving P(E|F)=0 != P(E); agrees. C5 count sentence 'P(N>=k) = 1 - P(N<=k-1)' is arithmetically right for integer N (complement of N>=k is N<=k-1) but no excerpt covers integer counts; filed minor under unsourced. Prior open finding F-001 (rounded = 0.41) is resolved by the page now reading '0.40951 ≈ 0.41'; confirmed fixed, not re-filed. The log's earlier 'verified' result for the complement rule was not borne out by the current page text.
- sources_checked: https://math.dartmouth.edu/~prob/prob/prob.pdf, §1.2 Thm 1.1 property 5 (p.22, PDF p.30), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; https://math.dartmouth.edu/~prob/prob/prob.pdf, Thm 1.4 (p.24, PDF p.32), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; https://math.dartmouth.edu/~prob/prob/prob.pdf, Def. 4.1 (p.139, PDF p.147), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; https://math.dartmouth.edu/~prob/prob/prob.pdf, Thm 4.1 (p.140, PDF p.148), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; https://math.dartmouth.edu/~prob/prob/prob.pdf, eq. (4.3) (p.146, PDF p.154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; https://math.dartmouth.edu/~prob/prob/prob.pdf, Example 4.5 (p.135, PDF p.143), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
