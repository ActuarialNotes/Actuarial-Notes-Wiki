---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:a3fb736d5acccbec379a38a06772c978f75639a524be7d2b93aa90f0bc7fcc52
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Definitions 1.1-1.2 and Example 1.9 (pp.18-20, PDF pp.26-28), Infinite Sample Spaces (pp.28-29, PDF pp.36-37), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (sample space, outcome, event), fetched 2026-09-27, sha256:d93c82800caad31da983d799d5444d8627a5423b3338900bf22405af912bc7f4 — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Sample Space.md
---

A **Sample Space** $S$ (or $\Omega$) is the set of all possible outcomes of a random experiment.
- Every conceivable result of the experiment appears as exactly one element of $S$
- Outcomes in $S$ must be mutually exclusive (no two can occur simultaneously) and collectively exhaustive (together they cover every possibility)
- The sample space can be finite, countably infinite, or uncountably infinite depending on the experiment
- When $S$ is finite or countably infinite, its outcomes can be listed in sequence:

> $$S = \{\omega_1, \omega_2, \ldots\}$$
>
> $$\text{where each } \omega_i = \text{an elementary outcome of the experiment}$$

![[Media/Figures/Sample_Space.svg|340]]

> [!example]- Sample Space for Claim Occurrence and Size {Example}
> An experiment records whether a policyholder files a claim and, if so, classifies the loss as small ($\le$ \$$1{,}000$) or large ($>$ \$$1{,}000$). Write the sample space.
>
> > [!answer]-
> > There are three mutually exclusive, exhaustive outcomes:
> > $$S = \{\text{No Claim},\; \text{Small Claim},\; \text{Large Claim}\}$$
> > Each outcome is distinct, they cannot co-occur, and every possible result of the experiment is represented.
