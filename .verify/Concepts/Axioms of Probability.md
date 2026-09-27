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
