**Conditional Probability** $P(A \mid B)$ is the probability that [[Event|event]] $A$ occurs given that event $B$ has occurred.

> $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$

- The event after the bar, $B$, becomes the new [[Sample Space|sample space]]. It is always the denominator.
- Rearranged, the formula is the [[Probability Multiplication Rule|multiplication rule]], $P(A \cap B) = P(B)\,P(A \mid B)$.
- $A$ and $B$ are [[Independent Events|independent]] exactly when $P(A \mid B) = P(A)$.

> [!idea] The idea
> Knowing $B$ happened throws away every outcome outside $B$. Dividing by $P(B)$ rescales what is left so it sums to 1.

![[Media/Figures/Conditional_Probability.svg|340]]

## The four question shapes

Every Exam P conditional probability question is one of these. Find the denominator first.

| The question gives you | The denominator is | Section |
|---|---|---|
| Percentages of a population with two attributes | the given row or column total | 1 |
| A loss or lifetime and a threshold | $P(X > a) = 1 - F(a)$ | 2 |
| A draw without replacement and a condition | the number of draws the condition allows | 3 |
| $P(B \mid A)$ when it asks for $P(A \mid B)$ | $P(B)$, built by total probability | 4 |

### 1. Percentages or a two-way table

**Do:** draw the table, fill missing cells by subtraction, then divide the cell by the total of the row or column that is given.

> [!example]- Car and home {Example}
> 40% of policyholders insure a car, 30% a home and 15% both. Find $P(\text{home} \mid \text{car})$ and $P(\text{home} \mid \text{no car})$.
>
> > [!answer]-
> > $$P(\text{home} \mid \text{car}) = \frac{0.15}{0.40} = 0.375$$
> > The no-car row holds $0.30 - 0.15 = 0.15$ home insureds out of $0.60$.
> > $$P(\text{home} \mid \text{no car}) = \frac{0.15}{0.60} = 0.25$$

**Watch out:** a cell over the grand total is the joint probability $P(A \cap B)$. And $P(A \mid B^c)$ is not $1 - P(A \mid B)$, as the two answers above show.

### 2. A loss or lifetime above a threshold

**Do:** turn both events into intervals of $X$, intersect them, and read the probabilities off the CDF $F$.

> $$P(X \le b \mid X > a) = \frac{F(b) - F(a)}{1 - F(a)}, \quad a < b$$

> [!example]- Exponential loss {Example}
> A loss $X$ is exponential with mean 100. Given that $X > 50$, find the probability that $X \le 150$.
>
> > [!answer]-
> > $$\frac{F(150) - F(50)}{1 - F(50)} = \frac{e^{-0.5} - e^{-1.5}}{e^{-0.5}} = 1 - e^{-1} \approx 0.632$$
> > This equals $P(X \le 100)$. The [[Exponential Distribution|exponential distribution]] is memoryless, so the excess over 50 has the same distribution as $X$.

**Watch out:** a person alive at age $x$ is conditioned on survival. The probability of death within $n$ years is $P(T \le x + n \mid T > x)$, not $P(T \le x + n)$.

### 3. A draw with a condition

**Do:** remove whatever the condition rules out, then count in the smaller population.

> [!example]- No green ball {Example}
> An urn holds 4 red, 3 blue and 5 green balls. Three are drawn without replacement. Given that no green ball is drawn, find the probability that exactly two are red.
>
> > [!answer]-
> > With green ruled out, the draw is three of the 7 red and blue balls.
> > $$\frac{\binom{4}{2}\binom{3}{1}}{\binom{7}{3}} = \frac{18}{35} \approx 0.514$$

**Watch out:** computing $P(\text{2 red} \cap \text{no green})$ and $P(\text{no green})$ separately also works, but takes twice as long.

### 4. The condition is given the wrong way round

**Do:** recognise the reversal and use [[Bayes Theorem]]. Build the denominator with [[The Law of Total Probability|the law of total probability]].

> [!example]- Young drivers {Example}
> 30% of drivers are young. 20% of young drivers and 10% of older drivers have a claim. A driver has a claim. Find the probability that they are young.
>
> > [!answer]-
> > $$P(\text{young} \mid \text{claim}) = \frac{0.3 \times 0.2}{0.3 \times 0.2 + 0.7 \times 0.1} = \frac{0.06}{0.13} \approx 0.462$$

**Watch out:** answering 0.20 is the reversal. The given figure has the right numerator and the wrong denominator.

> [!tip]- Beyond Exam P
> - **MAS-I and MAS-II**: conditioning is one step inside questions on the exponential distribution, Markov chains and Bayesian estimation.
