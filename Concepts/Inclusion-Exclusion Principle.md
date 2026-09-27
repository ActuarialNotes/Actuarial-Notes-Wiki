---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:2022035461f97d1a5a1097c99bb420f5c60bd545ab325d894be3ac57c36f65db
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.4 p.24 (PDF p.32), Thm 3.8 Inclusion-Exclusion Principle p.104 (PDF p.112), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q1 p.2 and Q100 p.30, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Inclusion-Exclusion Principle.md
---

The **Inclusion-Exclusion Principle** is a counting rule for the probability (or size) of a union of overlapping [[Event|events]]: add the individual probabilities, subtract the pairwise intersections, add back the triple intersections, and so on, so that no outcome is counted more than once.

> $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

> $$\begin{aligned} P(A \cup B \cup C) = {}& P(A) + P(B) + P(C) \\ &- P(A \cap B) - P(A \cap C) - P(B \cap C) \\ &+ P(A \cap B \cap C) \end{aligned}$$

- The signs alternate by intersection size: add single events, subtract pairwise intersections, add triple intersections, and so on.
- For [[Mutually Exclusive Events|disjoint]] events the intersection terms are $0$, so the rule reduces to $P(A \cup B) = P(A) + P(B)$.
- It is the general form of the addition rule of [[Probability]] and relies on [[Set Operations]] for the union and intersection.

![[Media/Figures/Inclusion-Exclusion_Principle.svg|340]]

> [!example]- Probability of At Least One Event Occurring {Example}
> Among a group of insurance claims, $P(A) = 0.5$, $P(B) = 0.4$, and $P(A \cap B) = 0.2$. What is the probability that at least one of $A$ or $B$ occurs?
>
> > [!answer]-
> > "At least one of $A$ or $B$" is the event $A \cup B$:
> > $$\begin{align*} P(A \cup B) &= P(A) + P(B) - P(A \cap B) \\ &= 0.5 + 0.4 - 0.2 \\ &= 0.7 \end{align*}$$

> [!example]- Three Overlapping Coverages {Example}
> A policyholder may file an auto ($A$), home ($B$), or liability ($C$) claim. Given $P(A) = P(B) = P(C) = 0.3$, each pairwise intersection $= 0.1$, and $P(A \cap B \cap C) = 0.05$, find the probability of at least one claim.
>
> > [!answer]-
> > $$\begin{align*} P(A \cup B \cup C) &= 0.3 + 0.3 + 0.3 \\ &\quad - 0.1 - 0.1 - 0.1 \\ &\quad + 0.05 \\ &= 0.65 \end{align*}$$
> > There is a 65% chance the policyholder files at least one of the three claims.
