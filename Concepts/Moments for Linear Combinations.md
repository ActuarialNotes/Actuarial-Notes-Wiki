For a linear combination $W = a_1 X_1 + a_2 X_2 + \cdots + a_n X_n$ of random variables:

$$E[W] = a_1 E[X_1] + a_2 E[X_2] + \cdots + a_n E[X_n]$$

$$\text{Var}(W) = \sum_{i=1}^n a_i^2 \,\text{Var}(X_i) + 2\sum_{i < j} a_i a_j \,\text{Cov}(X_i, X_j)$$

When the variables are [[Independent Random Variables]], all covariance terms vanish:
$$\text{Var}(W) = \sum_{i=1}^n a_i^2 \,\text{Var}(X_i)$$

These results underlie the [[Central Limit Theorem]] and are used to compute the [[Expected Value]] and [[Variance]] of aggregate loss models.

> [!example]- Portfolio of Two Risks {💡 Example}
> $X_1 \sim (E=100, \text{Var}=400)$ and $X_2 \sim (E=150, \text{Var}=900)$, independent. Find $E[X_1+X_2]$ and $\text{Var}(X_1+X_2)$.
>
> > [!answer]- Answer
> > $$E[X_1+X_2] = 100 + 150 = 250$$
> > $$\text{Var}(X_1+X_2) = 400 + 900 = 1300 \implies \text{SD} = \sqrt{1300} \approx 36.06$$
