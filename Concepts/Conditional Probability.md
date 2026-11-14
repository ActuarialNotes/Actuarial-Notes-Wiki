---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:8957242c2c4893468c02b890e324e4f9439437b5ec4d37eeb75137d70c99436b
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 conditional probability P(F|E)=P(F∩E)/P(E), E as the new sample space (pp.133-134, PDF pp.141-142), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 independence (either event probability 0 counts as independent), Thm 4.1 independent iff P(E∩F)=P(E)P(F) (pp.139-140, PDF pp.147-148); Def. 4.2 mutual independence over every subset, pairwise does not imply mutual (p.141, PDF p.149); Exercise 7: A heads on first toss, B heads on second, C tosses match are pairwise independent but not independent (PDF p.159), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.0 Conditional Probability (definition; conditional probability is a probability measure, P(A^c|C)=1−P(A|C); chain rule), read 2026-11-06, sha256:6068941689f60230e24fc4ad4a1589902e6d5d4e9f080efa97d0ade85a2d6e4a — https://www.probabilitycourse.com/chapter1/1_4_0_conditional_probability.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.1.3 Conditioning and Independence (conditional PMF P_{X|A}(x_i)=P(X=x_i and A)/P(A); E[X|A]=Σ x_i P_{X|A}(x_i); LTP over values of a discrete random variable; independent random variables: conditional PMF equals marginal), read 2026-11-06, sha256:937740fa7d0feecdb1a09585b50e5fc6bea5ed4cfae6425ad7aa56855a0f58e4 — https://www.probabilitycourse.com/chapter5/5_1_3_conditioning_independence.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence (conditional CDF (F_X(x)−F_X(a))/(F_X(b)−F_X(a)); law of total probability P(A)=∫P(A|X=x)f_X(x)dx (5.16)), read 2026-11-06, sha256:5d697207bda40aa9ff1ce9a59db1231fe112d2fd061fed5ce08921d8c889c03a — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2), Topic 2 outcome b (PDF p.3), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
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
