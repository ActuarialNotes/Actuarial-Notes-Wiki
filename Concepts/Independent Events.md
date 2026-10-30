---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:5511e636d0bbdf79ed1ddb05d6da04c33f6844bbdee35012c54876e7ef4a2db0
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (p.139, PDF p.147), Thm 4.1 (p.140, PDF p.148), Def. 4.2 (p.141, PDF p.149), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.1 Independence (Lemma: A,B independent ⇒ A,B^c; A^c,B; A^c,B^c independent, proof P(A∩B^c)=P(A)(1-P(B)); flight example P(A)=1-(1-p_c)^N), sha256:d3a628b19b7630f57b78839bd1c92defb3988d4897dcdab840d5811dc5522dbd — https://www.probabilitycourse.com/chapter1/1_4_1_independence.php"
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

### Complements and "at least one"

- If $A$ and $B$ are independent, then so are $A$ and $B^c$, $A^c$ and $B$, and $A^c$ and $B^c$, so $P(A \cap B^c) = P(A)\,(1 - P(B))$.
- For example, if two lives die independently of each other, their survivals are independent too.
- The probability that neither of two independent events occurs is the product of the complement probabilities:

> $$P(A^c \cap B^c) = (1 - P(A))\,(1 - P(B))$$

- If $n$ independent trials each produce an event with probability $p$, the probability that at least one produces it is $1 - (1 - p)^n$, the complement of no occurrences:

> $$P(\text{at least one}) = 1 - (1 - p)^n$$

> [!example]- Testing Independence of Two Claim Events {Example}
> For two policyholders, $P(\text{A claims}) = 0.4$, $P(\text{B claims}) = 0.3$, and $P(\text{both claim}) = 0.12$. Are their claim events independent?
>
> > [!answer]-
> > Check whether $P(A \cap B) = P(A) \cdot P(B)$:
> > $$P(A) \cdot P(B) = 0.4 \times 0.3 = 0.12$$
> > Since $P(A \cap B) = 0.12 = P(A) \cdot P(B)$, the two events are independent — knowledge of one policyholder's claim does not affect the probability of the other's.
