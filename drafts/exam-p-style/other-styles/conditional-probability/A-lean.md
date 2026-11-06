**Conditional Probability** $P(A \mid B)$ is the probability that [[Event|event]] $A$ occurs given that event $B$ has occurred.

> $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$

- Conditioning on $B$ makes $B$ the new [[Sample Space|sample space]]. Only the part of $A$ inside $B$ counts.
- Rearranged, the formula is the [[Probability Multiplication Rule|multiplication rule]], $P(A \cap B) = P(B)\,P(A \mid B)$.
- $A$ and $B$ are [[Independent Events|independent]] exactly when $P(A \mid B) = P(A)$.
- $P(\cdot \mid B)$ is itself a probability, so every rule still holds given $B$. For example, $P(A^c \mid B) = 1 - P(A \mid B)$.

> [!idea] The idea
> Once $B$ is known to have happened, every outcome outside $B$ is ruled out. The outcomes left in $B$ carry total probability $P(B)$, not 1. Dividing by $P(B)$ rescales them so they sum to 1 again. If $P(B) = 0.4$ and $P(A \cap B) = 0.1$, then $A$ takes up a quarter of $B$, so $P(A \mid B) = 0.25$.

![[Media/Figures/Conditional_Probability.svg|340]]

> [!example]- A survey with two attributes {Example}
> In a group of policyholders, 40% insure a car, 30% insure a home and 15% insure both. A policyholder who insures a car is chosen at random. What is the probability that they also insure a home?
>
> > [!answer]-
> > **Plan:** the condition is "insures a car", so divide by $P(\text{car})$.
> > $$P(\text{home} \mid \text{car}) = \frac{0.15}{0.40} = 0.375$$
> > The answer is larger than $P(\text{home}) = 0.30$, so the two attributes are not independent.

> [!example]- A loss above a threshold {Example}
> A loss $X$ is uniform on $(0, 1000)$. Given that the loss exceeds 400, what is the probability that it is at most 700?
>
> > [!answer]-
> > **Plan:** the intersection of $\{X \le 700\}$ and $\{X > 400\}$ is the interval $(400, 700]$.
> > $$P(X \le 700 \mid X > 400) = \frac{F(700) - F(400)}{1 - F(400)} = \frac{0.3}{0.6} = 0.5$$

> [!tip]- How it appears on the exam
> - **Exam P**: a survey given as percentages or a two-way table, asking for one attribute given another.
> - **Exam P**: a loss or lifetime given a condition, such as "given that the loss exceeds the deductible" or "given survival to age $x$".
> - **Exam P**: draws without replacement given a stated condition.
> - **MAS-I and MAS-II**: one step inside larger questions on the exponential distribution, Markov chains and Bayesian estimation.

> [!warning]- Exam traps
> - **Reversing the condition.** $P(A \mid B)$ and $P(B \mid A)$ share a numerator but not a denominator. Going from one to the other needs [[Bayes Theorem]].
> - **Dividing by the grand total.** A table cell over the grand total is $P(A \cap B)$. Divide by the total of the given row or column instead.
> - **Complementing the condition.** $P(A \mid B^c)$ is not $1 - P(A \mid B)$. Changing the condition changes the sample space.
