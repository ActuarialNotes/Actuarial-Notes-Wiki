---
target: Concepts/Axioms of Probability.md
created: 2026-09-27
---

## [F-001] Complement-rule proof cites the wrong axiom for P(S)=1
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: major
- status: open
- locus: Example: Deriving the Complement Rule from the Axioms, answer line 39
- claim: Proof says "But $A \cup A^c = S$, so by Axiom 2: $P(S) = 1$", while the page table numbers $P(S)=1$ as Axiom 1 (Total Probability) and Axiom 2 as Non-negativity.
- evidence: By the page own table (lines 21-23) P(S)=1 is Axiom 1; Axiom 2 is P(E)>=0, which says nothing about P(S). Pishro-Nik §1.3.2 numbers the axioms Axiom 1 P(A)>=0, Axiom 2 P(S)=1, Axiom 3 countable additivity; Grinstead & Snell Thm 1.1 (p.22, PDF p.30) lists P(E)>=0 as property 1 and P(Omega)=1 as property 2. So the proof uses the standard numbering while the table uses a different one, and a reader following the page cites the wrong axiom. The conclusion P(A^c)=1-P(A) is correct (G&S Thm 1.1 property 5, p.22).
- source_rank: 3
- proposed_action: Make the numbering consistent: either reorder the table to the source order (non-negativity, P(S)=1, additivity) or change the proof to cite Axiom 1. Maintainer choice; not auto-fixed because it decides which numbering the page adopts.
- applied: false
- fingerprint: 7d86174d5198

## [F-002] Kolmogorov attribution not supported by any source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: intro, line 14
- claim: The axioms are "also called Kolmogorov’s axioms".
- evidence: Pishro-Nik §1.3.2 states the three axioms without naming Kolmogorov (0 hits for Kolmogorov on the page). Grinstead & Snell full text has one occurrence of Kolmogorov (a footnote far from ch.1) and none of axiom; the SOA Nov 2026 syllabus 1a says only "state the basic axioms of probability". The attribution is conventional but no source read this session supports it.
- source_rank: 3
- proposed_action: Cite a source for the Kolmogorov attribution or drop the parenthetical.
- applied: false
- fingerprint: 36afabd10fbf

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: P(S)=1: G&S Thm 1.1 prop 2 + Pishro-Nik Axiom 2; P(E)>=0: G&S Thm 1.1 prop 1 + Pishro-Nik Axiom 1; countable additivity for pairwise disjoint events: Pishro-Nik Axiom 3 (G&S Thm 1.2 finite form, extended to countable spaces p.29); syllabus 1a asks for the basic axioms, consistent. Numbering differs from Pishro-Nik (page puts P(S)=1 first) - notation, noted, but it breaks the proof (F-001). Example 1 recomputed before reading answer: 0.3+0.5=0.8, not 0.9, so additivity is violated - agrees. Example 2 result P(A^c)=1-P(A) = G&S Thm 1.1 prop 5 - agrees; axiom citation wrong (F-001). Links Concepts/Probability, Concepts/Mutually Exclusive Events resolve; figure exists; LaTeX balanced.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Theorem 1.1 (p.22, PDF p.30), Theorem 1.2 (p.23, PDF p.31), countable spaces (pp.28-29, PDF pp.36-37), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.2 Probability — Axioms of Probability, fetched 2026-09-27, sha256:ec9c2c3c0edfb4599a9fcd8511745e673f7a2c9a3ec43f3c6b03dd3036864705 — https://www.probabilitycourse.com/chapter1/1_3_2_probability.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Formulas all source-backed; open major F-001 is a numbering inconsistency in a proof, open minor F-002 an unsourced attribution.

## [F-001/R] Axioms renumbered to the source order
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Intro list and table reordered to Pishro-Nik §1.3.2 numbering (Axiom 1 P(A) ≥ 0, Axiom 2 P(S) = 1, Axiom 3 countable additivity for disjoint events), which G&S Thm 1.1 (p.22, PDF p.30) also follows (property 1 P(E) ≥ 0, property 2 P(Ω) = 1). The complement-rule proof, which cites Axiom 2 for P(S) = 1 and Axiom 3 for additivity, now agrees with the table; proof text unchanged.

## [F-002/R] Unsourced Kolmogorov parenthetical removed
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Deleted "(also called Kolmogorov’s axioms)". No source read this session names the axioms after Kolmogorov: Pishro-Nik §1.3.2 states them unnamed; Encyclopedia of Mathematics "Probability space" (fetched 2026-09-28) credits the probability-space concept to Kolmogorov but does not name the axioms; G&S has no such attribution.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001, F-002: table order = Pishro-Nik §1.3.2 (non-negativity, P(S) = 1, countable additivity for disjoint events); proof uses Axiom 3 for P(A ∪ A^c) = P(A) + P(A^c) and Axiom 2 for P(S) = 1, conclusion P(A^c) = 1 − P(A) = G&S Thm 1.1 property 5; example 1 recomputed 0.3 + 0.5 = 0.8 ≠ 0.9, so the stated model violates additivity; syllabus 1a asks candidates to state the basic axioms.
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.2 Probability — Axioms of Probability, fetched 2026-09-28, sha256:ce6639e8688b5f1a5d2d5c4430f172a938d0a6573450984852a1415e28e93df1 — https://www.probabilitycourse.com/chapter1/1_3_2_probability.php; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 (p.22, PDF p.30), Thm 1.2 (p.23, PDF p.31), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-003] Addition rule said to reduce to Axiom 3 when P(A ∩ B) = 0
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-06T18:03Z/b32c
- date: 2026-11-06
- severity: nit
- status: open
- locus: Events that overlap, last bullet
- claim: "This is the addition rule. It reduces to Axiom 3 when P(A ∩ B) = 0."
- evidence: G&S §1.2 Thm 1.4 proof (p.24, PDF p.32): 'if A ∩ B = ∅, then Equation 1.1 reduces to Property 4' — the condition is that the events are disjoint. Axiom 3 (Pishro-Nik §1.3.2; Siegrist Ch.1 §3) is stated for disjoint events; two events can overlap in a nonempty set of probability 0 without being mutually exclusive, so P(A ∩ B) = 0 gives the additive equation but is not the hypothesis of Axiom 3.
- source_rank: 2
- proposed_action: State the condition as A ∩ B = ∅ (mutually exclusive), as G&S does.
- applied: false
- fingerprint: 9662e05b30b7

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:03Z/b32c
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: Three axioms (non-negativity, P(S)=1, countable additivity for disjoint events) = Pishro-Nik §1.3.2 Axioms 1-3 and Siegrist Ch.1 §3 (a)-(c); every other rule derived from them = Pishro-Nik §1.3.3 (complement, P(∅)=0, P(A)≤1, monotonicity, inclusion-exclusion, each proved from the axioms); complement proof via Axioms 3 and 2 = G&S Thm 1.1(5) proof; countable case = G&S Infinite Sample Spaces and Ex. 1.13 (geometric sum). Recomputed in python: model sums 0.60+0.25+0.10+0.05=1; P(1 or 2)=0.35; P(at least one)=0.40; P(B)=0.95, P(A∩B)=0.35, P(A∪B)=1, 0.40+0.95=1.35, 0.40+0.95−0.35=1; Σ_{k≥1} 0.5^(k+1)=0.5 = 1−0.5; Try-it 0.8≠0.9, P(A∩B)≥0.30, 1−0.40=0.60. One nit opened (addition rule 'reduces to Axiom 3 when P(A∩B)=0'); links/embed resolve.
- sources_checked: Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.3.2 Probability (Axioms 1-3, third axiom for countably many disjoint events, finite case), read 2026-11-06, sha256:6bac16281e4f438b39671ab9249f058d9f4ed54f5477614b361b29fa10e983c8 — https://www.probabilitycourse.com/chapter1/1_3_2_probability.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.3.3 Finding Probabilities (complement rule, P(empty)=0, P(A)<=1, P(A-B)=P(A)-P(A∩B), inclusion-exclusion n=2, monotonicity, with proofs from the axioms), read 2026-11-06, sha256:d9bbfac6df61983d64593563b88f919487a03c5ea8c140c3ee3bb97e36ca33ca — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.1 §3 Probability Measure (Kolmogorov axioms a-c, countable additivity; probability as a function on the collection of events), read 2026-11-06, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space/outcomes/events, Def. 1.2 P(E)=Σ_{ω∈E} m(ω), Examples 1.6-1.9, set operations and Fig. 1.7, Thm 1.1 (P(E)≥0, P(Ω)=1, monotonicity, disjoint additivity, complement with proof), Thms 1.2-1.4 and Cor. 1.1 (pp.18-24, PDF pp.26-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Ex. 1.10, Def. 1.3 uniform m(ω)=1/n, Ex. 1.11 two dice 36 ordered pairs, no single correct sample space, Determination of Probabilities, Infinite Sample Spaces (countable; Ex. 1.13 geometric sum), Historical Remarks 36 ordered vs 21 unordered pairs (pp.24-30, PDF pp.32-38), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Probability Exam (Exam P) syllabus, November 2026, introduction (calculus incl. series, differentiation, integration assumed, PDF p.1) and Topic 1 General Probability learning objective and outcomes a-g (PDF p.2), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Rewritten page re-checked against Pishro-Nik, Siegrist and G&S; every number recomputed and agrees. One nit open.
