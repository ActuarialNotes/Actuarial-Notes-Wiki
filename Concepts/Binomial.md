$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad k = 0, 1, \ldots, n$$

The Binomial Distribution $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ independent Bernoulli trials, each with probability of success $p$.

It requires trials to be independent, each trial to have exactly two outcomes, and $p$ to be constant across trials. Its mean is $E[X] = np$ and variance is $\text{Var}(X) = np(1-p)$.

> [!example]- Number of Claims in a Group Policy {💡 Example}
> A group of 10 policyholders each independently file a claim with probability 0.3. Find the probability that exactly 4 file claims.
>
> > [!answer]- Answer
> > $X \sim \text{Bin}(10, 0.3)$, so:
> > $$P(X = 4) = \binom{10}{4}(0.3)^4(0.7)^6 = 210 \times 0.0081 \times 0.117649 \approx 0.2001$$
