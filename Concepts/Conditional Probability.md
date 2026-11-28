---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:8957242c2c4893468c02b890e324e4f9439437b5ec4d37eeb75137d70c99436b
  sources:
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §4.1 conditional probability, Examples 4.1-4.2, PDF pp.141-142; Def. 4.1 PDF p.147, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Conditional Probability | Formulas | Calculation | Chain Rule | Prior Probability, §1.4.0 conditional probability axioms and rules, sha256:91c05da890c99c763b930621ee3f68b7802bc01add63496307e2e26efd05b545 — https://www.probabilitycourse.com/chapter1/1_4_0_conditional_probability.php"
    - "Conditioning | Independence | CDF, §5.1.3 conditional PMF and E[X|A], sha256:850dd9e91b2a4bed994194bba7d64751bccf18af296e2eba51a0f7580c6a0b6a — https://www.probabilitycourse.com/chapter5/5_1_3_conditioning_independence.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Conditional Probability.md
---

![[Media/Figures/Conditional_Probability.svg|340]]

A **Conditional Probability** is the probability that an [[Event|event]] $E$ occurs given that an event $F$ has occurred. If $P(F) > 0$, the conditional probability of $E$ given $F$ is

> $$P(E \mid F) = \frac{P(E \cap F)}{P(F)}$$

- $P(E \cap F)$ is the [[Probability|probability]] that both $E$ and $F$ occur.

> [!idea] The idea
> Knowing that $F$ occurred shrinks the [[Sample Space|sample space]] to $F$.

> [!example]- An insurer covers 1,000 drivers. 300 are young, and 60 of the young drivers had a claim last year. What is the probability that a young driver had a claim? {Example}
> - Let $E$ be "had a claim" and $F$ be "is young".
> - $P(E \cap F) = \frac{60}{1{,}000} = 0.06$ and $P(F) = \frac{300}{1{,}000} = 0.30$.
> - $P(E \mid F) = \frac{0.06}{0.30} = 0.20$.
> - This is the same as $\frac{60}{300}$, the share of the young drivers who had a claim.

## The multiplication rule

Multiplying both sides by $P(F)$ gives the probability that both events occur:

> $$P(E \cap F) = P(E \mid F)\,P(F)$$

A statement such as "25% of those who insure a car also insure a home" gives a conditional probability, $P(\text{home} \mid \text{car}) = 0.25$. When $P(E \mid F) = P(E)$, knowing $F$ changes nothing, and $E$ and $F$ are [[Independent Events|independent]].

> [!example]- 40% of policyholders insure a car, and 25% of those who insure a car also insure a home. What is the probability that a policyholder insures both? {Example}
> - Let $F$ be "insures a car" and $E$ be "insures a home", so $P(F) = 0.40$ and $P(E \mid F) = 0.25$.
> - $P(E \cap F) = 0.25 \times 0.40 = 0.10$.

## When one event contains the other

If every outcome of $E$ is also in $F$, $E \subseteq F$, then $E \cap F = E$, and

> $$P(E \mid F) = \frac{P(E)}{P(F)}$$

> [!example]- A fair die is rolled and shows at least 4. What is the probability that it shows 6? {Example}
> - Let $E = \{6\}$ and $F = \{4, 5, 6\}$, so $E \subseteq F$.
> - $P(E \mid F) = \frac{1/6}{3/6} = \frac{1}{3}$.

## The rules of probability given an event

Given $F$, conditional probabilities follow the same rules as probabilities. For [[Mutually Exclusive Events|mutually exclusive]] events $E_1$ and $E_2$, the probability of their union given $F$ is the sum of their conditional probabilities given $F$:

> $$P(E_1 \cup E_2 \mid F) = P(E_1 \mid F) + P(E_2 \mid F)$$

> [!example]- Among policyholders with a claim, 30% are young, 50% are middle-aged and 20% are older. What is the probability that a policyholder with a claim is not middle-aged? {Example}
> - The age classes are mutually exclusive.
> - $P(\text{young or older} \mid \text{claim}) = 0.30 + 0.20 = 0.50$.

## Conditioning on a random variable

A condition on a [[Random Variable|random variable]] $X$ is an event such as $\{X > a\}$. For $b > a$, the event $\{X > b\}$ is contained in $\{X > a\}$, so

> $$P(X > b \mid X > a) = \frac{P(X > b)}{P(X > a)}$$

The complement rule still holds inside the condition: $P(X \le b \mid X > a) = 1 - P(X > b \mid X > a)$.

> [!example]- A loss is uniform on $(0, 1{,}000)$. Given that it exceeds a deductible of 400, what is the probability that it is at most 800? {Example}
> - $P(X > 800) = 0.2$ and $P(X > 400) = 0.6$.
> - $P(X > 800 \mid X > 400) = \frac{0.2}{0.6} = \frac{1}{3}$.
> - The probability that the loss is at most 800 is $1 - \frac{1}{3} = \frac{2}{3}$.

## Expected value given an event

The [[Expected Value|expected value]] of a discrete random variable $X$ given an event $F$ weights each value by its probability within $F$:

> $$E[X \mid F] = \sum_x x \, \frac{P(\{X = x\} \cap F)}{P(F)}$$

> [!example]- A loss is 0, 100, 400 or 1,000 with probabilities 0.4, 0.3, 0.2 and 0.1. What is the expected loss given that the loss is positive? {Example}
> - The event $F$ is "the loss is positive", with $P(F) = 0.3 + 0.2 + 0.1 = 0.6$.
> - The positive losses contribute $100(0.3)$, $400(0.2)$ and $1{,}000(0.1)$, which add to $210$.
> - $E[X \mid F] = \frac{210}{0.6} = 350$.

> [!trap] Reading the condition backwards
> "20% of young drivers had a claim" is $P(\text{claim} \mid \text{young})$. "20% of drivers with a claim are young" is $P(\text{young} \mid \text{claim})$, a different number. When a question gives one and asks for the other, use [[Bayes Theorem|Bayes' theorem]].
