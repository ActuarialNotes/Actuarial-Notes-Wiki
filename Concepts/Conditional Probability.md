---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:e04f4a3e27cbe9188fd70cb4b5c937b53e9fc9474a38e779d195e7fd27e50115
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 pp.133-134 (PDF pp.141-142) definition with P(E) > 0; §4.1 Independent Events pp.139-140 (PDF pp.147-148); §4.2 p.162 (PDF p.170) continuous conditional probability, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1f, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Conditional Probability.md
---

**Conditional Probability** $P(A \mid B)$ is the probability that event $A$ occurs given that event $B$ is known to have occurred, restricting the sample space to $B$.

> $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$

- If $A$ and $B$ are independent, then $P(A \mid B) = P(A)$
- Conditional probability is foundational to [[Bayes Theorem]], [[The Law of Total Probability]], and various insurance and actuarial calculations

![[Media/Figures/Conditional_Probability.svg|340]]

> [!example]- Claim Severity Given Deductible Threshold {Example}
> A loss $X$ is uniformly distributed on $(0, 1000)$. Given that the loss exceeds 400, what is the probability it also exceeds 700?
>
> > [!answer]-
> > Let $A = \{X > 700\}$ and $B = \{X > 400\}$. Since $A \subseteq B$, we have $A \cap B = A$.
> > $$P(A \mid B) = \frac{P(X > 700)}{P(X > 400)} = \frac{300/1000}{600/1000} = \frac{300}{600} = 0.5$$
