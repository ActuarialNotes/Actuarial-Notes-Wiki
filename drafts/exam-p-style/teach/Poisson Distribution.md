The **Poisson Distribution** $X \sim \text{Poi}(\lambda)$ models the number of events in a fixed interval of time or space, when events happen independently at a constant average rate $\lambda$.

> $$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}, \quad k = 0, 1, 2, \ldots$$

- $\lambda > 0$ is the mean number of events in the interval.
- The mean and the variance are both $\lambda$.

> $$E[X] = \text{Var}(X) = \lambda$$

> [!idea] The idea
> Events that are individually rare but have many chances to happen produce a Poisson count. Claims on a large portfolio are the standard case. Each policy is unlikely to claim, but there are many policies, so the number of claims settles around a steady average $\lambda$.

![[Media/Poisson_pmf.svg|500]]

![[Media/Figures/Poisson_Distribution.svg|340]]

## Claims in one month

Claims arrive at an average rate of 3 per month, so the monthly count is Poisson with $\lambda = 3$.

| Claims $k$ | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| $P(X = k)$ | 0.0498 | 0.1494 | 0.2240 | 0.2240 | 0.1680 | 0.1008 |

- The most likely counts are 2 and 3, close to the mean.
- Each probability is the one before it times $\lambda / k$. For example, $P(X = 4) = 0.2240 \times 3/4 = 0.1680$. This is quicker than recomputing each term from scratch.

> $$P(X = k) = P(X = k - 1) \cdot \frac{\lambda}{k}$$

"At least" questions are faster through the complement. The probability of at least 2 claims is one minus the probability of 0 or 1.

> $$P(X \ge 2) = 1 - 0.0498 - 0.1494 = 0.8009$$

## Working back from "no claims"

The probability of no events is $e^{-\lambda}$. So a question that states the probability of no events, or of at least one, has told you $\lambda$.

> $$\lambda = -\ln P(X = 0)$$

- If 5% of months have no claims, then $\lambda = -\ln 0.05 \approx 3.0$.
- A question can also relate the zero probabilities of two Poisson counts, such as "a second portfolio is half as likely to have no claims". Write that as an equation between the probabilities, $e^{-\lambda_2} = 0.5\,e^{-\lambda_1}$, and take logarithms. It is not a statement about the means.

> [!trap] Halving the mean
> "Half as likely to have no claims" does not mean half the mean. With $\lambda_1 = 2$, it gives $\lambda_2 = 2 + \ln 2 \approx 2.69$.

## Where the Poisson comes from

The Poisson is the limit of the [[Binomial Distribution|binomial]] when there are many trials, each with a small probability.

- Take $n$ trials with success probability $p$. Let $n \to \infty$ and $p \to 0$ while $np = \lambda$ stays fixed. The binomial count approaches $\text{Poi}(\lambda)$.
- 200 policies, each claiming with probability 0.01, give a binomial count with $P(X \ge 2) \approx 0.5954$. The Poisson with $\lambda = 2$ gives $0.5940$.

## Even or odd counts

Some questions ask for the probability of an even number of events. Adding the series for $e^{\lambda}$ and $e^{-\lambda}$ cancels the odd powers and doubles the even ones. Multiplying by $e^{-\lambda}$ then gives the even and odd probabilities.

> $$P(X \text{ even}) = \frac{1 + e^{-2\lambda}}{2}$$

> $$P(X \text{ odd}) = \frac{1 - e^{-2\lambda}}{2}$$

- For $\lambda = 3$, $P(X \text{ even}) \approx 0.5012$. For any $\lambda$, even counts are slightly more likely, because 0 is even.

## Try it

> [!example]- At least two claims {Example}
> Claims follow a Poisson distribution with mean 3 per month. Find the probability of at least two claims in a month.
>
> > [!answer]-
> > **Plan:** use the complement, since "at least 2" has infinitely many terms.
> > $$P(X \ge 2) = 1 - e^{-3} - 3e^{-3} = 1 - 4e^{-3} \approx 0.8009$$

> [!example]- Two portfolios {Example}
> Portfolio A has a Poisson claim count with mean 2. Portfolio B's count is also Poisson, and B is half as likely as A to have no claims. Find the mean of B.
>
> > [!answer]-
> > **Plan:** turn the sentence into an equation between zero probabilities.
> > $$e^{-\lambda_B} = 0.5\,e^{-2}$$
> > $$\lambda_B = 2 + \ln 2 \approx 2.69$$

> [!example]- An even number of claims {Example}
> The number of claims in a year is Poisson with mean 3. Find the probability that the number of claims is even.
>
> > [!answer]-
> > $$P(X \text{ even}) = \frac{1 + e^{-6}}{2} \approx 0.5012$$

> [!warning]- Exam traps
> - **Summing an infinite tail.** For "at least $k$", subtract the first $k$ terms from 1.
> - **Treating a probability statement as a statement about $\lambda$.** "Half as likely to have no claims" is an equation in $e^{-\lambda}$.
> - **Forgetting $k = 0$.** The Poisson starts at 0, and $P(X = 0) = e^{-\lambda}$ is the term most often left out of a complement.
