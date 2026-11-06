---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:3c77f230d92fbfeeb3433c238283f6d1082348ee7c99da554131f801989b19f7
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

**Conditional Probability** $P(A \mid B)$ is the probability that [[Event|event]] $A$ occurs given that event $B$ has occurred.

> $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$

- $A$ is the event being asked about and $B$ is the event known to have happened.
- $P(A \cap B)$ is the probability that both happen.

> [!idea] The idea
> Knowing that $B$ happened rules out every outcome outside $B$. The question becomes: what share of $B$ is also $A$? The formula answers that share by dividing the overlap by the size of $B$.

![[Media/Figures/Conditional_Probability.svg|340]]

## One portfolio, three questions

An insurer covers 1,000 drivers. 300 of them are young and 700 are older. Last year 60 young drivers and 70 older drivers had a claim.

| | Claim | No claim | Total |
|---|---|---|---|
| Young | 60 | 240 | 300 |
| Older | 70 | 630 | 700 |
| Total | 130 | 870 | 1,000 |

**What share of all drivers are young and had a claim?** That is the joint probability. The whole portfolio is the sample space, so divide by 1,000.

> $$P(\text{young} \cap \text{claim}) = \frac{60}{1000} = 0.06$$

**A driver is young. What is the probability they had a claim?** Now the sample space is only the 300 young drivers. The 700 older drivers no longer matter.

> $$P(\text{claim} \mid \text{young}) = \frac{60}{300} = 0.20$$

The formula gives the same answer, because dividing both counts by 1,000 doesn't change their ratio: $0.06 / 0.30 = 0.20$.

**A driver had a claim. What is the probability they are young?** The condition has changed, so the sample space is now the 130 drivers with a claim.

> $$P(\text{young} \mid \text{claim}) = \frac{60}{130} \approx 0.46$$

The numerator, 60, is the same in both conditional questions. Only the denominator moved. That is the whole difference between $P(A \mid B)$ and $P(B \mid A)$.

> [!trap] Reading the condition backwards
> "20% of young drivers claim" and "20% of claimants are young" are different statements. When a question gives one and asks for the other, use [[Bayes Theorem]]. Answering with the given figure is the most common mistake on this topic.

## What stays true after conditioning

Conditioning on $B$ produces a new probability, so every rule you already know still works inside $B$.

- The complement rule holds: $P(\text{no claim} \mid \text{young}) = 1 - 0.20 = 0.80$.
- Changing the *condition* is different. $P(\text{claim} \mid \text{older}) = 70/700 = 0.10$, which is not $1 - 0.20$.
- Rearranging the formula gives the [[Probability Multiplication Rule|multiplication rule]]: $P(\text{young} \cap \text{claim}) = 0.30 \times 0.20 = 0.06$.

## When is the condition irrelevant?

Overall, $P(\text{claim}) = 130/1000 = 0.13$. Learning that a driver is young raises this to 0.20, so age carries information about claims. If it didn't, the two events would be [[Independent Events|independent]].

> $$P(A \mid B) = P(A) \iff A \text{ and } B \text{ are independent}$$

## The same idea with a random variable

A condition is often a range of a loss or a lifetime. The overlap is then an interval, and the probabilities come from the CDF $F$.

> $$P(X \le b \mid X > a) = \frac{F(b) - F(a)}{1 - F(a)}, \quad a < b$$

- A loss uniform on $(0, 1000)$, known to exceed 400, is at most 700 with probability $(0.7 - 0.4)/(1 - 0.4) = 0.5$.
- A person alive at age $x$ dies within $n$ years with probability $P(T \le x + n \mid T > x)$, not $P(T \le x + n)$.

## Expected value given an event

The same move works for an expected value. To find the mean of $X$ given an event $A$, keep only the outcomes in $A$ and rescale their probabilities by $P(A)$.

> $$E[X \mid A] = \sum_x x \, \frac{P(X = x,\ A)}{P(A)}$$

- A loss is 0, 100, 400 or 1,000 with probabilities 0.4, 0.3, 0.2 and 0.1. Given that the loss is positive, its mean is $(30 + 80 + 100) / 0.6 = 350$.
- Writing $1_A$ for the indicator of $A$ (1 if $A$ occurs, 0 if not), the same formula is $E[X \cdot 1_A] / P(A)$.

## Try it

> [!example]- Fill in the missing cell {Example}
> Of a group of policyholders, 40% insure a car, 30% insure a home and 15% insure both. Find $P(\text{home} \mid \text{car})$ and $P(\text{home} \mid \text{no car})$.
>
> > [!answer]-
> > **Plan:** lay the percentages out as a table, then divide by the given row.
> >
> > | | Home | No home | Total |
> > |---|---|---|---|
> > | Car | 15 | 25 | 40 |
> > | No car | 15 | 45 | 60 |
> > | Total | 30 | 70 | 100 |
> >
> > $P(\text{home} \mid \text{car}) = 15/40 = 0.375$ and $P(\text{home} \mid \text{no car}) = 15/60 = 0.25$. The two answers don't add to 1, because they are conditioned on different rows.

> [!example]- A draw with a condition {Example}
> An urn holds 4 red, 3 blue and 5 green balls. Three are drawn without replacement. Given that no green ball is drawn, what is the probability that exactly two are red?
>
> > [!answer]-
> > **Plan:** with green ruled out, the draw is three balls from the 7 red and blue balls, each set equally likely.
> > $$P(2 \text{ red} \mid \text{no green}) = \frac{\binom{4}{2}\binom{3}{1}}{\binom{7}{3}} = \frac{18}{35} \approx 0.514$$
> > Shrinking the urn first is the same move as shrinking the sample space to $B$.

> [!warning]- Exam traps
> - **Reversing the condition.** Same numerator, different denominator. Use [[Bayes Theorem]].
> - **Dividing by the grand total.** That gives $P(A \cap B)$, not $P(A \mid B)$.
> - **Complementing the condition.** $P(A \mid B^c) \ne 1 - P(A \mid B)$.
