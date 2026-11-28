---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:2642bfa16acc38d0b8577f14acb412f9d60bec06a8c716374cac0a81ebfa8a8d
  sources:
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, Sec. 4.1 Conditional probability, PDF pp.141-142; Def. 4.1 and Thm 4.1 independence, PDF pp.147-148 (p.135 note that P(E)>0 is assumed, PDF p.142), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Conditional Probability | Formulas | Calculation | Chain Rule | Prior Probability, 1.4.0 Conditional Probability, formula (1.5) and chain rule (1.6)-(1.7), sha256:91c05da890c99c763b930621ee3f68b7802bc01add63496307e2e26efd05b545 — https://www.probabilitycourse.com/chapter1/1_4_0_conditional_probability.php"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Probability Multiplication Rule.md
---

![[Media/Figures/Probability_Multiplication_Rule.svg|340]]

The **Probability Multiplication Rule** gives the [[Probability|probability]] that two [[Event|events]] both occur from a [[Conditional Probability|conditional probability]]. For events $E$ and $F$, the probability that both occur is

> $$P(E \cap F) = P(E)\,P(F \mid E)$$

> $$P(E \cap F) = P(F)\,P(E \mid F)$$

- $P(F \mid E)$ is the probability of $F$ given that $E$ has occurred.
- When $E$ and $F$ are [[Independent Events|independent]], $P(F \mid E) = P(F)$ and the rule is $P(E \cap F) = P(E)\,P(F)$.

Use the form whose conditional probability the question gives.

> [!idea] The idea
> The probability that both occur is the share of outcomes in which $E$ occurs, times the share of those in which $F$ also occurs.

> [!example]- 60% of an insurer's customers insure more than one car. Of those customers, 20% insure a sports car. What is the probability that a customer insures more than one car and a sports car? {Example}
> - Let $E$ be "insures more than one car" and $F$ be "insures a sports car".
> - "Of those customers, 20%" is the conditional probability $P(F \mid E) = 0.20$.
> - $P(E \cap F) = 0.60 \times 0.20 = 0.12$.

## A chain of events

For three events, each factor conditions on everything before it:

> $$
> \begin{aligned}
> & P(E_1 \cap E_2 \cap E_3) \\
> &= P(E_1)\,P(E_2 \mid E_1) \\
> &\quad \times P(E_3 \mid E_1 \cap E_2)
> \end{aligned}
> $$

The chain extends to any number of events, one conditional factor per event. Draws without replacement are a chain, because each draw changes what is left.

> [!example]- A portfolio has 10 policies, 4 of which will have a claim. Two policies are drawn at random without replacement. What is the probability that both have a claim? {Example}
> - The first policy has a claim with probability $\frac{4}{10}$.
> - Given that, 3 of the 9 policies left have a claim, so the second has a claim with probability $\frac{3}{9}$.
> - Both have a claim with probability $\frac{4}{10} \times \frac{3}{9} = \frac{2}{15} \approx 0.133$.

> [!example]- From the same 10 policies, policies are drawn without replacement until one with a claim is found. What is the probability that the first claim is on the third draw? {Example}
> - The event is no claim, then no claim, then a claim.
> - The factors are $\frac{6}{10}$, then $\frac{5}{9}$ with 5 claim-free policies left of 9, then $\frac{4}{8}$ with all 4 claims left of 8.
> - The probability is $\frac{6}{10} \times \frac{5}{9} \times \frac{4}{8} = \frac{1}{6}$.

> [!trap] Unconditional factors without replacement
> Without replacement, each later factor must reflect what was already drawn. Using $0.4 \times 0.4 = 0.16$ for two claims treats the draws as independent, which is right only with replacement. Without it, the answer is $\frac{4}{10} \times \frac{3}{9} \approx 0.133$.
