---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:a048c6e917b8885f4eff90d320367d0704d7af9630c9784038202f2dde5083dc
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (p.139, PDF p.147), Thm 4.1 (p.140, PDF p.148), Def. 4.2 (p.141, PDF p.149), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Independent Events.md
---

Two events $A$ and $B$ are **Independent** if knowing that one occurred provides no information about whether the other occurred. Equivalently, they satisfy the product rule:

> $$P(A \cap B) = P(A) \cdot P(B)$$

![[Media/Figures/Independent_Events.svg|340]]

- When $P(A) > 0$ and $P(B) > 0$, independence means $P(A \mid B) = P(A)$ and $P(B \mid A) = P(B)$; an event with probability 0 is independent of every event
- Independence is a symmetric relation and must be verified mathematically; it cannot be assumed from a diagram
- For a collection of events $A_1, \ldots, A_n$ to be **mutually independent**, the product rule must hold for every subset of the collection, not just pairs:

> $$P(A_{i_1} \cap A_{i_2} \cap \cdots \cap A_{i_m}) = P(A_{i_1})\,P(A_{i_2}) \cdots P(A_{i_m})$$

> [!example]- Testing Independence of Two Claim Events {Example}
> For two policyholders, $P(\text{A claims}) = 0.4$, $P(\text{B claims}) = 0.3$, and $P(\text{both claim}) = 0.12$. Are their claim events independent?
>
> > [!answer]-
> > Check whether $P(A \cap B) = P(A) \cdot P(B)$:
> > $$P(A) \cdot P(B) = 0.4 \times 0.3 = 0.12$$
> > Since $P(A \cap B) = 0.12 = P(A) \cdot P(B)$, the two events are independent — knowledge of one policyholder's claim does not affect the probability of the other's.
