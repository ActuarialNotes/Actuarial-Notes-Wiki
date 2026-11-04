---
target: Concepts/Independent Events.md
created: 2026-09-27
---

## [F-001] Conditional form of independence stated without the positive-probability condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: definition bullet, line 15
- claim: P(A | B) = P(A) and P(B | A) = P(B)
- evidence: G&S Def. 4.1 (p.139, PDF p.147): E and F are independent if either both have positive probability and P(E|F) = P(E), P(F|E) = P(F), or at least one has probability 0. Conditional probability needs P(E) > 0 (p.134, PDF p.142). The page gives the conditional form with no condition. Severity minor, not major: the product form in the formula box (G&S Thm 4.1, p.140) holds without the condition, so no calculation a candidate does is affected.
- source_rank: 3
- proposed_action: Qualify the bullet with provided P(A), P(B) > 0, or lead with the product rule as the definition.
- applied: false
- fingerprint: 2924a8a2b85b

## [F-002] Mutual-independence bullet introduces a two-event formula
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: mutual independence bullet and formula box, lines 17-19
- claim: For a collection of events to be mutually independent, the product rule must hold for every subset of the collection, not just pairs: P(A and B) = P(A) P(B)
- evidence: The bullet text agrees with G&S Def. 4.2 (pp.140-141, PDF pp.148-149: for any subset {Ai,...,Am}, P(Ai and ... and Am) = P(Ai)...P(Am); pairwise independence does not imply mutual). But its closing colon hands off to the formula box, which shows only the two-event product, so the page displays the pairwise condition as if it were the collection condition.
- source_rank: 3
- proposed_action: Move the formula box above the mutual-independence bullet (as the two-event definition), and if wanted display the every-subset product from G&S Def. 4.2 under the bullet.
- applied: false
- fingerprint: ec56cc753a33

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: Two-event definition P(A and B) = P(A)P(B): G&S Thm 4.1; applied as a product in SOA Q10 p.5 and Q351 p.98. Symmetry: G&S p.140 (each equation implies the other). Mutual independence over every subset, pairs not sufficient: G&S Def. 4.2 and the remark after it. Example recomputed first: 0.4*0.3 = 0.12 = P(both), independent, agrees. Open minors F-001 (missing P > 0 on the conditional form) and F-002 (formula box placement); no formula wrong. Figure exists.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 p.134 (PDF p.142), Def. 4.1 p.139 (PDF p.147), Thm 4.1 p.140 (PDF p.148), Def. 4.2 and remarks pp.140-141 (PDF pp.148-149), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q10 p.5 and Q351 p.98, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf

## [F-001/R] Conditional form stated for positive probabilities; product rule leads
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: The product rule P(A ∩ B) = P(A) P(B) now follows the opening sentence as the defining condition (G&S Thm 4.1, p.140, PDF p.148: independent if and only if the product holds). The conditional form P(A | B) = P(A), P(B | A) = P(B) is now stated for P(A) > 0 and P(B) > 0, with G&S Def. 4.1 case 2 (p.139, PDF p.147): an event of probability 0 is independent of every event.

## [F-002/R] Mutual-independence bullet now introduces the every-subset product
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: The two-event formula box moved above the bullets; the mutual-independence bullet now ends on P(A_{i1} ∩ ... ∩ A_{im}) = P(A_{i1}) ... P(A_{im}) for every subset, per G&S Def. 4.2 (p.141, PDF p.149).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001, F-002: product rule iff independence = G&S Thm 4.1; conditional form for positive probabilities and probability-0 case = Def. 4.1 (symmetric in the two events); every-subset product for mutual independence = Def. 4.2; example recomputed 0.4 × 0.3 = 0.12 = P(both), so the events are independent.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (p.139, PDF p.147), Thm 4.1 (p.140, PDF p.148), Def. 4.2 (p.141, PDF p.149), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:35Z/14ca
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: diff vs 0287511f is add-only (one ### subsection); complement lemma, P(A∩B^c), P(A^c∩B^c) and 1-(1-p)^n checked against PN §1.4.1 Lemma and flight example; no item question's numbers on page; prior content unchanged
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (p.139, PDF p.147), Thm 4.1 (p.140, PDF p.148), Def. 4.2 (p.141, PDF p.149), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.1 Independence (Lemma: A,B independent ⇒ A,B^c; A^c,B; A^c,B^c independent, proof P(A∩B^c)=P(A)(1-P(B)); flight example P(A)=1-(1-p_c)^N), sha256:d3a628b19b7630f57b78839bd1c92defb3988d4897dcdab840d5811dc5522dbd — https://www.probabilitycourse.com/chapter1/1_4_1_independence.php
- note: G8 w1 re-check after writer addition: complements and at-least-one.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-04T01:05Z/e16c
- date: 2026-11-04
- status_set: verified
- confidence: high
- checks_run: diff only: product rule moved under the definition is unchanged; figure moved after the new idea card. New idea card: product rule as definition (Pishro-Nik §1.4.1), conditional form needs P(B)≠0 and both directions with a separate prob-0 clause (G&S Def 4.1) while the product form covers prob 0 (G&S Thm 4.1 proof); 'at least one' via complement of intersection = Pishro-Nik union formula. Tip: objective 3 = syllabus 1c; question shapes consistency-checked against p-348, p-551, p-200; 'five MAS-I past-paper questions' consistency-checked by grep (masi-2019f-005/006/007, masi-2019s-007/010; topics stochastic processes, inclusion-exclusion, hazard rate, gambler's ruin). Traps: disjoint ⇒ dependent (Pishro-Nik Warning + Lemma); pairwise ≠ mutual (G&S PDF p.149); 1−(1−p)^n (Pishro-Nik); union p1+p2−p1p2 (Pishro-Nik P(W1) denominator, equal to 1−(1−p1)(1−p2)). moved lines compared line-for-line between HEAD~1 and HEAD (only reordering; no existing sentence reworded); tip objective numbers checked against the SOA syllabus and the Exam P page's numbering; new wiki-links and LaTeX resolve/balance
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (p.139, PDF p.147), Thm 4.1 (p.140, PDF p.148), Def. 4.2 (p.141, PDF p.149), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.1 Independence (Lemma: A,B independent ⇒ A,B^c; A^c,B; A^c,B^c independent, proof P(A∩B^c)=P(A)(1-P(B)); flight example P(A)=1-(1-p_c)^N), sha256:d3a628b19b7630f57b78839bd1c92defb3988d4897dcdab840d5811dc5522dbd — https://www.probabilitycourse.com/chapter1/1_4_1_independence.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (PDF p.147: conditional form needs both events positive, prob-0 case a separate clause), Thm 4.1 and proof (PDF p.148: product rule holds when either event has probability 0), Def. 4.2 and the remark that pairwise independence does not imply mutual independence (PDF p.149), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.1 Independence, fetched 2026-11-04: definition P(A∩B)=P(A)P(B) with P(A|B)=P(A) only when P(B)≠0; union of independent events 1−Π(1−P(A_i)); 'Warning! One common mistake is to confuse independence and being disjoint' Lemma (P(A),P(B)≠0, disjoint ⇒ not independent); P(W1)=p1/(p1+p2−p1p2), sha256:c724f4e665e442de29d06ae48c8d0871b5d258abf5536bf7f58f13ea5c70f7a8 — https://www.probabilitycourse.com/chapter1/1_4_1_independence.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2) and Topic 2 learning outcome b (PDF p.3), read 2026-11-04 for the objective numbers in the exam tip, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Diff-only re-pass after the concept-page-standard restructure (idea card, exam tip, exam traps; content moved). Earlier sources re-cited from the block; new passages checked against sources read this run. Checker is a different agent from the writer.
