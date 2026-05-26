**Bühlmann Credibility** (also called **Greatest Accuracy Credibility**) is a least-squares credibility framework that derives the credibility factor $Z$ by minimizing the expected squared error between the credibility estimate and the true (unknown) risk parameter $\theta$.

> $$\text{Estimate} = Z \cdot \bar{X} + (1-Z) \cdot \mu$$
>
> $$Z = \frac{n}{n + k}, \quad k = \frac{v}{a}$$

**Variance components:**

| Symbol | Name | Definition |
| :--- | :--- | :--- |
| $\mu = E[X]$ | Overall mean | Expected value of $X$ |
| $v = E[\sigma^2(\theta)]$ | Expected process variance | Expected within-risk variance |
| $a = \text{Var}(\mu(\theta))$ | Variance of hypothetical means | Between-risk variance |
| $k = v/a$ | Bühlmann credibility parameter | Ratio of process variance to structural variance |

- As $n \to \infty$, $Z \to 1$ (full credibility to observed data)
- As $k \to 0$ (low process variance), $Z \to 1$ even for small $n$
- Bühlmann credibility is the **best linear estimate** of $\mu(\theta)$ given $X_1, \ldots, X_n$
- When $\theta$ has a conjugate prior, Bühlmann = Bayesian credibility ([[Bayesian Credibility]])

> [!example]- Bühlmann Credibility Calculation {Example}
> A risk has process variance $v = 400$ and structural variance $a = 100$. Three years of observations give $\bar{X} = 50$ and the overall mean is $\mu = 40$. Calculate the credibility estimate.
>
> > [!answer]-
> > $k = v/a = 400/100 = 4$; $Z = n/(n+k) = 3/(3+4) = 3/7 \approx 0.4286$.
> > $$\text{Estimate} = \frac{3}{7}(50) + \frac{4}{7}(40) = 21.43 + 22.86 \approx 44.29$$
