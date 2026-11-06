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

> [!tip]- How it appears on the exam
> - **Exam P**: a survey given as percentages or a two-way table with a cell missing.
> - **Exam P**: a loss or lifetime given a threshold, such as "given that the loss exceeds the deductible".
> - **Exam P**: draws without replacement given a condition.
> - **MAS-I and MAS-II**: one step inside larger questions on the exponential distribution, Markov chains and Bayesian estimation.

> [!warning]- Exam traps
> - **Reversing the condition.** Same numerator, different denominator. Use [[Bayes Theorem]].
> - **Dividing by the grand total.** That gives $P(A \cap B)$, not $P(A \mid B)$.
> - **Complementing the condition.** $P(A \mid B^c) \ne 1 - P(A \mid B)$.
