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
