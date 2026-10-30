---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:f56a785366ae7c1d0b9670139fea89f4772dfc6ad6ef2a417c169dbab0a55245
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (p.139, PDF p.147), Bayes formula and eqs. (4.2)-(4.3) (pp.145-146, PDF pp.153-154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayes Theorem.md
---

**Bayes' Theorem** is a formula for reversing conditional probabilities, updating the prior probability $P(H)$ of a hypothesis to the posterior probability $P(H \mid E)$ after observing evidence $E$.
- The denominator $P(E)$ is computed via [[The Law of Total Probability]] across a partition $\{H_i\}$ of the sample space:

> $$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$

> $$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$

- $H$ is the hypothesis and $E$ is the observed evidence
- If $H$ and $E$ are independent (with $P(E) > 0$), observing $E$ leaves the prior unchanged: $P(H \mid E) = P(H)$
- See also [[Bayesian Credibility]]

![[Media/Figures/Bayes_Theorem.svg|340]]

### Evidence restricted to a subset of hypotheses

When the evidence is an event $E$ together with the information that the outcome lies in a subset $H_1, \ldots, H_k$ of the hypotheses, condition on both: the denominator of Bayes' theorem sums over only the hypotheses in that subset.

> $$P\big(H_j \mid E \cap (H_1 \cup \cdots \cup H_k)\big) = \frac{P(E \mid H_j)\,P(H_j)}{\sum_{i=1}^{k} P(E \mid H_i)\,P(H_i)}, \quad j \le k$$

- This is Bayes' theorem with the evidence $E' = E \cap (H_1 \cup \cdots \cup H_k)$: $P(E' \mid H_i) = P(E \mid H_i)$ for $i \le k$ and $0$ for every other hypothesis, so the other categories drop out of the denominator.

### Conditionally independent events

Events $A$ and $B$ are conditionally independent given each class $C_i$ of a partition when $P(A \cap B \mid C_i) = P(A \mid C_i)\,P(B \mid C_i)$: within a class, the probability of several outcomes is the product of their conditional probabilities.

> $$P(A \cap B) = \sum_i P(A \mid C_i)\,P(B \mid C_i)\,P(C_i)$$

> $$P(B \mid A) = \frac{\sum_i P(A \mid C_i)\,P(B \mid C_i)\,P(C_i)}{\sum_i P(A \mid C_i)\,P(C_i)}$$

- Events that are independent given each class are in general not independent unconditionally when the class is unknown, because observing one event updates the probability of each class.
- Repeated tosses of a coin chosen at random are independent only given which coin was chosen; unconditionally they are dependent, because each toss gives information about the coin.
- The second formula is a Bayesian update of the class probabilities, $P(B \mid A) = \sum_i P(B \mid C_i)\,P(C_i \mid A)$: compute the joint probability and the probability of the observed event by conditioning on each class, then divide.
- Observing $A$ shifts weight toward the classes under which $A$ is more likely; with two classes, when $A$ and $B$ are both more likely in the same class, this raises the probability of $B$, so $P(B \mid A) > P(B)$.

> [!example]- Two tosses of an unknown coin {Example}
> A bag holds a fair coin and a coin that lands heads with probability 0.8. One coin is drawn at random and tossed twice. Find the probability that the second toss is heads given that the first is.
>
> > [!answer]-
> > **Plan:** the tosses are independent given the coin, so condition on the coin for both numerator and denominator.
> > $$P(H_1) = 0.5(0.5) + 0.5(0.8) = 0.65$$
> > $$P(H_1 \cap H_2) = 0.5(0.5)^2 + 0.5(0.8)^2 = 0.125 + 0.32 = 0.445$$
> > $$P(H_2 \mid H_1) = \frac{0.445}{0.65} \approx 0.685$$
> > A first head makes the biased coin more likely, so the second head is more likely than the unconditional 0.65.

> [!example]- Identifying a High-Risk Policyholder After a Claim {Example}
> 20% of policyholders are high-risk ($H$) and 80% are low-risk ($L$). A high-risk policyholder files a claim in year 1 with probability 0.40; a low-risk one with probability 0.10. A randomly selected policyholder files a claim. What is the probability they are high-risk?
>
> > [!answer]-
> > First find $P(\text{claim})$ by the Law of Total Probability:
> > $$P(C) = P(C \mid H)P(H) + P(C \mid L)P(L) = (0.40)(0.20) + (0.10)(0.80) = 0.08 + 0.08 = 0.16$$
> > Now apply Bayes' Theorem:
> > $$P(H \mid C) = \frac{P(C \mid H)\,P(H)}{P(C)} = \frac{0.40 \times 0.20}{0.16} = \frac{0.08}{0.16} = 0.50$$
> > After observing a claim, the probability the policyholder is high-risk rises from 20% to 50%.
