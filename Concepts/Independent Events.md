---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:39ab978d6f083ae710563d7403b73e580a0a28a1e33d9a1d8b6087584bb78b64
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 independence (p.139, PDF p.147), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Independent Events.md
---

Two events $A$ and $B$ are **Independent** if knowing that one occurred provides no information about whether the other occurred. Equivalently, they satisfy the product rule:

> $$P(A \cap B) = P(A) \cdot P(B)$$

- When $P(A) > 0$ and $P(B) > 0$, independence means $P(A \mid B) = P(A)$ and $P(B \mid A) = P(B)$. An event with probability 0 is independent of every event.
- The product rule is the definition, rather than $P(A \mid B) = P(A)$, because it is symmetric in $A$ and $B$ and still works when an event has probability 0.
- Independence must be verified from the probabilities. It cannot be assumed from a diagram.
- For a collection of events $A_1, \ldots, A_n$ to be **mutually independent**, the product rule must hold for every subset of the collection, not just pairs:

> $$P(A_{i_1} \cap A_{i_2} \cap \cdots \cap A_{i_m}) = P(A_{i_1})\,P(A_{i_2}) \cdots P(A_{i_m})$$

> [!idea] The idea
> When events are independent, knowing that one occurred does not change the probability of the other, so the probability that both occur is the product of their probabilities. To find the probability of "at least one", find the probability that none occurs, which is also a product, and subtract it from 1.

![[Media/Figures/Independent_Events.svg|340]]

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
> > Since $P(A \cap B) = 0.12 = P(A) \cdot P(B)$, the two events are independent. Knowing whether one policyholder claims does not change the probability that the other claims.

> [!tip]- How it appears on the exam
> - **Exam P** (General Probability, objective 3): several policies, losses or trials are stated to be independent, and the question asks for the probability that all, none or at least one of them produce an event, such as a loss above a deductible, a claim or an accident.
> - **Exam P**: given $P(A)$, $P(B)$ and $P(A \cap B)$ (or a table of them), decide whether the events are independent by checking the product rule.
> - Independence is more often a stated assumption inside a bigger calculation than the question itself. Examples are independent losses under several policies, accidents that each independently involve an uninsured driver, and products of independent random variables.
> - **MAS-I**: five past-paper questions in the bank link this page. In them, independence of events is one step inside hazard-rate, stochastic-process and inclusion-exclusion problems.

> [!warning]- Exam traps
> - **Independent is not mutually exclusive.** Two events with positive probabilities that cannot occur together are *dependent*: $P(A \cap B) = 0$ but $P(A)\,P(B) > 0$. Multiplying the probabilities of disjoint events gives a wrong answer from the right numbers. So does adding the probabilities of independent events.
> - **Pairwise is not mutual.** Three events can be independent in every pair yet fail the product rule for all three together. A question about all three needs mutual independence, either stated or checked.
> - **"At least one" by multiplication or addition.** With $n$ independent trials, the answer is $1 - (1 - p)^n$. It is not $np$, which can exceed 1, and it is not $p^n$, which is the probability of "all of them".
> - **Union without the overlap.** For independent $A$ and $B$, $P(A \cup B) = P(A) + P(B) - P(A)\,P(B)$. Dropping the last term overstates the answer. The overstated answer appears as an option equal to the plain sum.
