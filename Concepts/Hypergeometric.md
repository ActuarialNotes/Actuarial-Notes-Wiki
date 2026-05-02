$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}, \quad k = \max(0,\,n+K-N),\ldots,\min(n,K)$$
$$\text{where } N = \text{population size},\; K = \text{successes in population},\; n = \text{sample size}$$

The **Hypergeometric distribution** models the number of successes in a sample of size $n$ drawn **without replacement** from a finite population of $N$ items, $K$ of which are "successes." Unlike the [[Binomial]], trials are not independent.

$$E[X] = \frac{nK}{N}, \qquad \text{Var}(X) = \frac{nK(N-K)(N-n)}{N^2(N-1)}$$

> [!example]- Drawing Defective Items {💡 Example}
> A box contains 10 insurance policies: 4 with errors and 6 without. An auditor selects 3 at random without replacement. Find the probability exactly 2 have errors.
>
> > [!answer]- Answer
> > $N=10$, $K=4$, $n=3$, $k=2$:
> > $$P(X=2) = \frac{\binom{4}{2}\binom{6}{1}}{\binom{10}{3}} = \frac{6 \cdot 6}{120} = \frac{36}{120} = 0.30$$
