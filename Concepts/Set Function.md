---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:bb6fb57cc03c90cfde8d1020e31b5db5fe699dacc693d20a7900ccaa3f8d9df5
  sources:
    - "Encyclopedia of Mathematics (Springer/EMS), article Set function, fetched 2026-09-28, sha256:b2e0e1232b723b52bdc147fe88ced0ad2f459b58ce633e882eb2b38a9ea7d3d2 — https://encyclopediaofmath.org/wiki/Set_function"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Examples 1.6 and 1.8 (pp.18-20, PDF pp.26-28), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
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
> > For example, when rolling a fair die (all six outcomes equally likely), the probability of an even number is $P(\{2,4,6\}) = \frac{3}{6} = 0.5$.
> > We can assign a probability to any event in the sample space $S=\{1, 2, 3, 4, 5, 6\}$.
