---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:42121c2ca3aeb90e970df3614cacd0851b4d840fdaba087ddde4ec3495d75854
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 p.146 (PDF p.154) eqs. (4.2)-(4.3), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q84, PDF p.26, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/The Law of Total Probability.md
---

**The Law of Total Probability** states that if $\{A_1, \ldots, A_n\}$ is a partition of the sample space $S$, then the probability of any event $B$ can be expressed as a weighted average of its conditional probabilities given each $A_i$.
- $\{A_1, A_2, \ldots, A_n\}$ must be mutually exclusive and exhaustive events to partition $S$
- Used for computing the denominator $P(E)$ in [[Bayes Theorem]] and finding marginal probabilities when a problem is structured by distinct scenarios or risk classes
- Every term equals $P(B \mid A_i)\,P(A_i) = P(B \cap A_i)$

> $$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$

![[Media/Figures/The_Law_of_Total_Probability.svg|340]]

> [!example]- Overall Claim Probability Across Risk Classes {Example}
> A portfolio is 30% young drivers ($A_1$), 50% middle-aged ($A_2$), and 20% senior ($A_3$). Claim probabilities are $P(C \mid A_1)=0.20$, $P(C \mid A_2)=0.10$, $P(C \mid A_3)=0.15$. Find the overall probability of a claim.
>
> > [!answer]-
> > Since $\{A_1, A_2, A_3\}$ partitions the portfolio:
> > $$P(C) = (0.20)(0.30) + (0.10)(0.50) + (0.15)(0.20)$$
> > $$= 0.060 + 0.050 + 0.030 = 0.140$$
> > The overall claim probability is 14%.
