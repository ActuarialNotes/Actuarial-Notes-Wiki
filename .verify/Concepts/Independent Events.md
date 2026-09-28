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
