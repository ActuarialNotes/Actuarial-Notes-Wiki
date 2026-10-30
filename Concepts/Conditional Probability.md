---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:e04f4a3e27cbe9188fd70cb4b5c937b53e9fc9474a38e779d195e7fd27e50115
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 pp.133-134 (PDF pp.141-142) definition with P(E) > 0; §4.1 Independent Events pp.139-140 (PDF pp.147-148); §4.2 p.162 (PDF p.170) continuous conditional probability, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1f, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Conditional Probability.md
---

**Conditional Probability** $P(A \mid B)$ is the probability that event $A$ occurs given that event $B$ is known to have occurred, restricting the sample space to $B$.

> $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$

- If $A$ and $B$ are independent, then $P(A \mid B) = P(A)$
- Conditional probability is foundational to [[Bayes Theorem]], [[The Law of Total Probability]], and various insurance and actuarial calculations

![[Media/Figures/Conditional_Probability.svg|340]]

### Conditioning keeps every rule

For a fixed event $B$ with $P(B) > 0$, $P(\cdot \mid B)$ is itself a probability, so every probability rule holds conditionally on $B$.

> $$P(A^c \mid B) = 1 - P(A \mid B)$$

> $$P(A_1 \cup A_2 \mid B) = P(A_1 \mid B) + P(A_2 \mid B)$$

- The complement rule holds conditionally: the probability of the complement of an event given $B$ is 1 minus the probability of the event given $B$.
- For mutually exclusive $A_1$ and $A_2$, the probability of their union given $B$ is the sum of their conditional probabilities given $B$.
- So when a signal sent as $s$ is either received correctly or not, $P(\text{received wrongly} \mid s \text{ sent}) = 1 - P(\text{received correctly} \mid s \text{ sent})$; and when only the symbols 0 and 1 can be sent, $P(1 \text{ sent}) = 1 - P(0 \text{ sent})$.

### Intervals of one variable

When both events are intervals of the same random variable, their intersection is the overlap of the two intervals.

> $$P(X \le b \mid X > a) = \frac{P(a < X \le b)}{P(X > a)} = \frac{F(b) - F(a)}{1 - F(a)}, \quad a < b$$

> $$P(a < X < b \mid c < X < d) = \frac{P(\max(a,c) < X < \min(b,d))}{P(c < X < d)}$$

- When conditioning on $X \ge a$ and asking for $X \le b$ with $a < b$, the intersection of the two events is the interval $a \le X \le b$, so for a continuous $X$ the conditional probability is $(F(b) - F(a))/(1 - F(a))$.
- For a continuous $X$ it does not matter whether the endpoints are included.
- For overlapping intervals with $a < c < b < d$, the overlap is $(a, b) \cap (c, d) = (c, b)$, which becomes the numerator event.
- A person known to be alive at age $x$, such as one insured at age $x$, is conditioned on survival: with lifetime $T$ from birth, the probability of death within $n$ years is $P(T \le x + n \mid T > x)$, not $P(T \le x + n)$.

### Two-way tables

When a population is cross-classified by two attributes, lay it out as a two-way table: each cell is a joint count, and each row or column total is the sum of its cells because the categories partition the population.

- A missing cell is found by subtraction: its row or column total minus the other cells of that row or column.
- For a member chosen at random, a conditional probability is a cell divided by its row or column total, $P(A \mid B) = |A \cap B| / |B|$.

### Conditional expectation given an event

For an event $A$ with $P(A) > 0$, the conditional expectation of $X$ given $A$ weights each value by its conditional probability $P(X = x \mid A) = P(X = x,\ A)/P(A)$.

> $$E[X \mid A] = \sum_x x \, \frac{P(X = x,\ A)}{P(A)} = \frac{E[X \cdot 1_A]}{P(A)}$$

- where $1_A$ is the indicator of $A$: 1 if $A$ occurs and 0 otherwise.
- The conditional expectation of $X$ given an event $A$ is the sum of $x$ times the joint probability of $x$ and $A$, divided by $P(A)$.

### Equally likely draws

When every outcome is equally likely, conditioning on $B$ leaves the outcomes in $B$ equally likely, so $P(A \mid B) = |A \cap B| / |B|$.

- When $n$ items are drawn without replacement and we condition on no item of one category being drawn, every $n$-item draw from the other items is equally likely, so the conditional distribution is that of drawing $n$ without replacement from the population with that category removed.

> [!example]- Conditioning a draw on a category being absent {Example}
> An urn holds 4 red, 3 blue and 5 green balls. Three are drawn without replacement. Given that no green ball is drawn, what is the probability that exactly two are red?
>
> > [!answer]-
> > **Plan:** with green excluded, the draw is three balls from the 7 red and blue balls, all equally likely.
> > $$P(2 \text{ red} \mid \text{no green}) = \frac{\binom{4}{2}\binom{3}{1}}{\binom{7}{3}} = \frac{6 \times 3}{35} = \frac{18}{35} \approx 0.514$$
> > Removing the excluded category first avoids computing $P(\text{no green})$ separately.

> [!example]- Claim Severity Given Deductible Threshold {Example}
> A loss $X$ is uniformly distributed on $(0, 1000)$. Given that the loss exceeds 400, what is the probability it also exceeds 700?
>
> > [!answer]-
> > Let $A = \{X > 700\}$ and $B = \{X > 400\}$. Since $A \subseteq B$, we have $A \cap B = A$.
> > $$P(A \mid B) = \frac{P(X > 700)}{P(X > 400)} = \frac{300/1000}{600/1000} = \frac{300}{600} = 0.5$$
