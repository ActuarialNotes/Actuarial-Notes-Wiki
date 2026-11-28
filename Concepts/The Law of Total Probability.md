---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:6f8ab971b3ff6faeb2c8c3b66a28f59bcffac57f6b173fe8d7316b9d2af66394
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.4.2 Law of Total Probability (partition; P(A)=sum P(A|B_i)P(B_i)), sha256:74374c15f5796d8e6f2953868ec1740e9a2e06056840d4930531848cacd04a2b — https://www.probabilitycourse.com/chapter1/1_4_2_total_probability.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.3 Law of Total Probability over a discrete random variable's values, sha256:850dd9e91b2a4bed994194bba7d64751bccf18af296e2eba51a0f7580c6a0b6a — https://www.probabilitycourse.com/chapter5/5_1_3_conditioning_independence.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Law of Total Probability, eq. (5.16) and worked example, sha256:af73df7c214c87397f4ac78f80e7bc7445eb9254884adb06e45db6f5ea6ca2b4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "Grinstead & Snell, Introduction to Probability, 2nd rev. ed., Thms 1.1-1.3, pp.22-23 (PDF pp.30-31); §4.1 eqs (4.1)-(4.3), pp.145-146 (PDF pp.153-154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P syllabus, November 2026, Topic 1 outcome g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/The Law of Total Probability.md
---

![[Media/Figures/The_Law_of_Total_Probability.svg|340]]

**The Law of Total Probability** is the rule that finds the probability of an [[Event|event]] $E$ by splitting the [[Sample Space|sample space]] into scenarios. If the events $F_1, F_2, \ldots, F_n$ partition the sample space, the probability of $E$ is

> $$P(E) = \sum_{i=1}^{n} P(E \mid F_i)\,P(F_i)$$

- $F_1, \ldots, F_n$ are [[Mutually Exclusive Events|mutually exclusive]] and exhaustive: every outcome is in exactly one of them.
- Each term is the joint probability $P(E \cap F_i)$, by the [[Conditional Probability#The multiplication rule|multiplication rule]].
- With two scenarios, $F$ and $F^c$, the law has two terms, $P(E \mid F)\,P(F)$ and $P(E \mid F^c)\,P(F^c)$.

The law gives the denominator of [[Bayes Theorem|Bayes' theorem]].

> [!example]- A portfolio is 30% young drivers, 50% middle-aged and 20% senior. Their claim probabilities are 0.20, 0.10 and 0.15. What is the probability that a driver chosen at random has a claim? {Example}
>
> | Class $F_i$ | $P(F_i)$ | $P(E \mid F_i)$ | $P(E \cap F_i)$ |
> | --- | --- | --- | --- |
> | Young | 0.30 | 0.20 | 0.060 |
> | Middle-aged | 0.50 | 0.10 | 0.050 |
> | Senior | 0.20 | 0.15 | 0.030 |
>
> - Each row is the share of the portfolio that is in that class and has a claim.
> - The rows don't overlap, so they add to $P(E) = 0.14$.

## Conditioning on a random variable

The scenarios can be the values of a discrete [[Random Variable|random variable]] $X$, since the events $\{X = x\}$ partition the sample space:

> $$P(E) = \sum_x P(E \mid X = x)\,P(X = x)$$

> [!example]- Two independent claim counts $X$ and $Y$ are each 0, 1 or 2 with probabilities 0.5, 0.3 and 0.2. What is the probability that they are equal? {Example}
> - Given $X = x$, the counts are equal when $Y = x$, which has probability $P(Y = x)$ by independence.
> - $P(X = Y)$ is $0.5^2 + 0.3^2 + 0.2^2$, which is $0.38$.

For a continuous random variable $Y$ with density $f(y)$, the sum becomes an integral:

> $$P(E) = \int_{-\infty}^{\infty} P(E \mid Y = y)\,f(y)\,dy$$

> [!example]- Given its risk parameter $\Lambda = \lambda$, a policy has no claims in a year with probability $e^{-\lambda}$. $\Lambda$ is uniform on $(0, 2)$. What is the probability of no claims? {Example}
> - The density of $\Lambda$ is $\frac{1}{2}$ on $(0, 2)$.
> - The probability of no claims is
>
> $$
> \begin{aligned}
> &\int_0^2 e^{-\lambda} \cdot \tfrac{1}{2}\,d\lambda \\
> &= \frac{1 - e^{-2}}{2} \\
> &= 0.432
> \end{aligned}
> $$

## Repeated trials of an unknown class

When the same unknown class $F_i$ produces two events $E_1$ and $E_2$, independent within each class, the first event is evidence about the class. The probability of $E_2$ given $E_1$ is

> $$P(E_2 \mid E_1) = \frac{\sum_{i} P(E_1 \mid F_i)\,P(E_2 \mid F_i)\,P(F_i)}{\sum_{i} P(E_1 \mid F_i)\,P(F_i)}$$

> [!example]- 25% of drivers are risky and claim in a year with probability 0.4. The rest claim with probability 0.1. Years are independent given the class. A driver claimed last year. What is the probability that they claim next year? {Example}
> - The denominator is the probability of a claim last year: $0.25(0.4) + 0.75(0.1) = 0.175$.
> - The numerator is the probability of claims in both years, $0.25(0.4)^2 + 0.75(0.1)^2$, which is $0.0475$.
> - $P(E_2 \mid E_1) = \frac{0.0475}{0.175} = 0.271$, higher than 0.175, because last year's claim makes the risky class more likely.

> [!trap] An unweighted average
> The plain average of the three claim probabilities above, $\frac{0.20 + 0.10 + 0.15}{3} = 0.15$, treats every class as a third of the portfolio. The answer is 0.14, because each $P(E \mid F_i)$ must be weighted by $P(F_i)$.
