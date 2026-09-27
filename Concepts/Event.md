---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:0e9ea51b72e37e206962f4f65f22e4f3b2c8728e72eefefd0809422b52b74d74
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 events as subsets (p.18, PDF p.26), Example 1.6/1.8 die (pp.18-20), elementary event (p.20, PDF p.28), Theorem 1.1 (p.22, PDF p.30), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (sample space, outcome, event), fetched 2026-09-27, sha256:d93c82800caad31da983d799d5444d8627a5423b3338900bf22405af912bc7f4 — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.2 Probability — Axioms of Probability, fetched 2026-09-27, sha256:ec9c2c3c0edfb4599a9fcd8511745e673f7a2c9a3ec43f3c6b03dd3036864705 — https://www.probabilitycourse.com/chapter1/1_3_2_probability.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Event.md
---

An **event** $E$ is any subset of the [[Sample Space]] $S$.
- Events are the objects to which probabilities are assigned.
- A **simple event** contains exactly one outcome.
- A **compound event** contains two or more outcomes.
- The [[Axioms of Probability]] define $P(E) \in [0,1]$ for every event $E$, with $P(S) = 1$.

![[Media/Figures/Event.svg|340]]

> [!example]- Rolling a Die {Example}
> A fair six-sided die is rolled. The sample space is $S = \{1,2,3,4,5,6\}$.
>
> > [!answer]-
> > Let $E = \{2, 4, 6\}$ be the event "an even number is rolled." This is a compound event containing 3 outcomes.
> > $$P(E) = \frac{|E|}{|S|} = \frac{3}{6} = 0.5$$
