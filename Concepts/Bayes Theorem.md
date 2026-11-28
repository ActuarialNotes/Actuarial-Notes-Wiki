---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:657702862ea48f0dde8f702089b2dfcb0fcdb9d09a68d1264b173e3890d4f102
  sources:
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §4.1 Bayes' formula, eqs (4.1)-(4.3), PDF pp.153-154, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Bayes' Rule, §1.4.3 Bayes' Rule, sha256:867c787d2cd9944ad19bbe866fe4824579d6ad917fcb542af790408377ba091e — https://www.probabilitycourse.com/chapter1/1_4_3_bayes_rule.php"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, Ch.5 Poisson pmf, PDF p.206, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf, Q306 solution, PDF p.84, sha256:147ff95346ea891a1fc9e889f412701a3a41561dcd6f330d285422249ae25c84 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayes Theorem.md
---

![[Media/Figures/Bayes_Theorem.svg|340]]

**Bayes' Theorem** is the rule that reverses a [[Conditional Probability|conditional probability]]: it finds $P(F \mid E)$ from $P(E \mid F)$. For [[Event|events]] $E$ and $F$ with $P(E) > 0$, the probability of $F$ given $E$ is

> $$P(F \mid E) = \frac{P(E \mid F)\,P(F)}{P(E)}$$

- $P(F)$ is the **prior** probability of $F$, before $E$ is observed.
- $P(F \mid E)$ is the **posterior** probability of $F$, after $E$ is observed.
- $P(E \mid F)$ is the **likelihood** of $E$ when $F$ holds.

> [!example]- 20% of an insurer's policyholders are high-risk and 80% are low-risk. A high-risk policyholder files a claim with probability 0.40, and a low-risk one with probability 0.10. A policyholder files a claim. What is the probability that they are high-risk? {Example}
> - Let $F$ be "is high-risk" and $E$ be "files a claim", so $P(F) = 0.20$ and $P(E \mid F) = 0.40$.
> - By the [[The Law of Total Probability|law of total probability]], $P(E)$ is $0.40(0.20) + 0.10(0.80)$, which is $0.16$.
> - $P(F \mid E) = \frac{0.40 \times 0.20}{0.16} = 0.50$.
> - The claim raised the probability of high-risk from the prior 0.20 to the posterior 0.50.

## Bayes' theorem for a partition

When the events $F_1, F_2, \ldots, F_n$ partition the sample space, the probability of $F_j$ given $E$ is

> $$P(F_j \mid E) = \frac{P(E \mid F_j)\,P(F_j)}{\sum_{i=1}^{n} P(E \mid F_i)\,P(F_i)}$$

- $F_1, \ldots, F_n$ are [[Mutually Exclusive Events|mutually exclusive]] and exhaustive: every outcome is in exactly one of them.

The denominator is $P(E)$, found by the law of total probability. The likelihood $P(E \mid F_i)$ can come from each class's distribution: a Poisson probability for a claim count, or a survival probability $P(T > t)$ for "still in force at time $t$".

> [!example]- 60% of drivers have a Poisson claim count with mean 1, and 40% have mean 3. A driver has exactly 2 claims. What is the probability that the driver has mean 3? {Example}
> - The likelihood of 2 claims is $\frac{e^{-1}\,1^2}{2!} = 0.1839$ for mean 1 and $\frac{e^{-3}\,3^2}{2!} = 0.2240$ for mean 3.
> - $P(E)$ is $0.60(0.1839) + 0.40(0.2240)$, which is $0.2000$.
> - The probability that the driver has mean 3 is $\frac{0.40 \times 0.2240}{0.2000} = 0.448$.

> [!trap] Reading the likelihood as the posterior
> A test flags 95% of defective items and 10% of good ones, and 2% of items are defective. "Flags 95% of defective items" is $P(\text{flagged} \mid \text{defective})$, not $P(\text{defective} \mid \text{flagged})$. The posterior is $\frac{0.95 \times 0.02}{0.95 \times 0.02 + 0.10 \times 0.98} = 0.162$, far below 0.95.
