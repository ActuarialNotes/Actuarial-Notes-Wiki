---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:5f8d9eb2da0471ca3fa351b08828980096a7a20239778d77d7da455becb6efd4
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 events (p.18, PDF p.26), Example 1.8 and elementary event (p.20, PDF p.28), Thm 1.1 (p.22, PDF p.30), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (outcome, sample space, event), fetched 2026-09-28, sha256:5ab5af0abfbf56905a0a023eb3242ae9749a17af50a5ff8581a6c69030ce29ad — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.2 Probability — Axioms of Probability, fetched 2026-09-28, sha256:ce6639e8688b5f1a5d2d5c4430f172a938d0a6573450984852a1415e28e93df1 — https://www.probabilitycourse.com/chapter1/1_3_2_probability.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Event.md
---

An **event** $E$ is any subset of the [[Sample Space]] $S$.
- Events are the objects to which probabilities are assigned.
- A **simple** (elementary) **event** contains exactly one outcome.
- The [[Axioms of Probability]] define $P(E) \in [0,1]$ for every event $E$, with $P(S) = 1$.

![[Media/Figures/Event.svg|340]]

> [!example]- Rolling a Die {Example}
> A fair six-sided die is rolled. The sample space is $S = \{1,2,3,4,5,6\}$.
>
> > [!answer]-
> > Let $E = \{2, 4, 6\}$ be the event "an even number is rolled." This event contains 3 outcomes.
> > $$P(E) = \frac{|E|}{|S|} = \frac{3}{6} = 0.5$$
