---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:7a002e7d26e34eada0e9b147b681b7e315bc0bb3f33a253b8f0ddab2cb9f0df3
  sources:
    - "Encyclopedia of Mathematics (Springer/EMS), article Set function, fetched 2026-09-27, sha256:168f98c55dc240fde7643462ca01950c62077204b0253c44239d8d197c4a469a — https://encyclopediaofmath.org/wiki/Set_function"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Definition 1.2 and Examples 1.6/1.8 (pp.18-20, PDF pp.26-28), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Set Function.md
---

A **set function** $f$ is a function that maps a collection of subsets $\mathcal{F}$ of a set $\mathcal{S}$ to the real numbers $\mathbb{R}$.

> $$f:\mathcal{F} \to \mathbb{R}$$

![[Media/Figures/Set_Function.svg|340]]

> [!example]- Probability as a Set Function {Example}
> A **probability function** assigns a real number between 0 and 1 to [[Concepts/Event|Events]] (sets of outcomes).
>
> > [!answer]-
> > For example, when rolling a die, the probability of an even number is $P(\{2,4,6\}) = 0.5$.
> > We can assign a probability to any event in the sample space $S=\{1, 2, 3, 4, 5, 6\}$.
