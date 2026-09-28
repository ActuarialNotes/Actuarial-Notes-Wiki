---
target: Concepts/Event.md
created: 2026-09-27
---

## [F-001] Compound-event definition not supported by any source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: definition bullets, line 17
- claim: A **compound event** contains two or more outcomes.
- evidence: Grinstead & Snell §1.2 defines an event as any subset of the sample space (p.18) and names the single-outcome event {omega} an elementary event (p.20), which supports the page simple event in substance; neither G&S (0 occurrences of "compound event" in the full text) nor Pishro-Nik §1.3.1 defines a compound event, and the SOA Nov 2026 syllabus 1a uses neither term.
- source_rank: 3
- proposed_action: Cite a source for the simple/compound terminology (e.g. the syllabus text that uses it) or drop the compound-event bullet.
- applied: false
- fingerprint: 0f9ba6ae2aad

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: Event = subset of sample space: G&S p.18, Pishro-Nik §1.3.1 (an event is a subset of the sample space to which we assign a probability); simple event = G&S elementary event (terminology difference, noted); compound event unsourced (F-001); P(E) in [0,1] with P(S)=1: G&S Thm 1.1 props 1-3 (upper bound derived via monotonicity) and Pishro-Nik Axioms 1-2. Example recomputed before reading answer: fair die, E={2,4,6}, 3/6 = 0.5 = G&S P(E)=1/2 - agrees. Links Sample Space, Axioms of Probability resolve; figure exists; LaTeX balanced.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 events as subsets (p.18, PDF p.26), Example 1.6/1.8 die (pp.18-20), elementary event (p.20, PDF p.28), Theorem 1.1 (p.22, PDF p.30), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (sample space, outcome, event), fetched 2026-09-27, sha256:d93c82800caad31da983d799d5444d8627a5423b3338900bf22405af912bc7f4 — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.2 Probability — Axioms of Probability, fetched 2026-09-27, sha256:ec9c2c3c0edfb4599a9fcd8511745e673f7a2c9a3ec43f3c6b03dd3036864705 — https://www.probabilitycourse.com/chapter1/1_3_2_probability.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Open minor F-001.

## [F-001/R] Unsourced compound-event terminology removed
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted the compound-event bullet and the example label "compound event" (now "This event contains 3 outcomes"). The simple-event bullet now also gives G&S’s term: a simple (elementary) event contains exactly one outcome (G&S p.20, PDF p.28: the elementary event {ω} consisting of a single outcome).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001: event = subset of the sample space (G&S p.18; Pishro-Nik §1.3.1); elementary event = one outcome (G&S p.20); P(E) ≥ 0 and P(S) = 1 = Pishro-Nik §1.3.2 Axioms 1-2, with P(E) ≤ 1 from G&S Thm 1.1 properties 2-3; die example recomputed 3/6 = 0.5 = G&S Example 1.8 and Pishro-Nik §1.3.1 (fair die, even number, 1/2).
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 events (p.18, PDF p.26), Example 1.8 and elementary event (p.20, PDF p.28), Thm 1.1 (p.22, PDF p.30), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (outcome, sample space, event), fetched 2026-09-28, sha256:5ab5af0abfbf56905a0a023eb3242ae9749a17af50a5ff8581a6c69030ce29ad — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.2 Probability — Axioms of Probability, fetched 2026-09-28, sha256:ce6639e8688b5f1a5d2d5c4430f172a938d0a6573450984852a1415e28e93df1 — https://www.probabilitycourse.com/chapter1/1_3_2_probability.php; SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
