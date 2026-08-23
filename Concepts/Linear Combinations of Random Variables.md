---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d1f62d6818bb0a400f358a69b6d0a5b92554590659d24f1c5154e128bb475d87
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Linear Combinations of Random Variables.md
---

**Linear Combinations of Random Variables** are expressions of the form $L = c_1 X_1 + c_2 X_2 + \cdots + c_n X_n$ for constants $c_i$, collapsing several random variables into a single quantity — an aggregate loss, a portfolio value, a sample mean.

> $$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$

> $$\text{Var}(L) = \sum_{i=1}^{n} c_i^2\,\text{Var}(X_i) + 2\sum_{i < j} c_i c_j\,\text{Cov}(X_i, X_j)$$

- **Expectation is always linear** — $E[L]$ needs no independence assumption at all. Variance does: the [[Covariance]] terms vanish only for [[Independent Random Variables|independent]] $X_i$. See [[Moments for Linear Combinations]].
- Coefficients enter the variance **squared**, so $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$ for independent $X, Y$ — a difference has a *larger* variance than either term, never a smaller one.
- A linear combination of independent normals is exactly normal, which is what makes [[Probabilities for Linear Combinations]] computable in closed form.
- For $n$ i.i.d. variables, $\bar{X}$ has mean $\mu$ and variance $\sigma^2/n$; for large $n$ the [[Central Limit Theorem]] makes $L$ approximately normal whatever the $X_i$ are.

![[Media/Figures/Linear_Combinations_of_Random_Variables.svg|340]]

> [!example]- Mean and Variance of a Two-Policy Portfolio {Example}
> Independent losses have $E[X] = 300$, $\text{Var}(X) = 2{,}500$, $E[Y] = 500$, $\text{Var}(Y) = 10{,}000$. Find the mean and variance of $L = 2X + 3Y$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[L] &= 2(300) + 3(500) \\
> >      &= 2{,}100
> > \end{align*}
> > $$
> > Independence kills the covariance term, and the coefficients square:
> > $$
> > \begin{align*}
> > \text{Var}(L) &= 2^2(2{,}500) + 3^2(10{,}000) \\
> >               &= 10{,}000 + 90{,}000 \\
> >               &= 100{,}000
> > \end{align*}
> > $$

> [!example]- A Difference of Correlated Losses {Example}
> $X$ and $Y$ have $\text{Var}(X) = 9$, $\text{Var}(Y) = 16$, and $\text{Cov}(X,Y) = 6$. Find $\text{Var}(X - Y)$.
>
> > [!answer]-
> > Here $c_1 = 1$ and $c_2 = -1$, so the cross term picks up $2c_1c_2 = -2$:
> > $$
> > \begin{align*}
> > \text{Var}(X - Y) &= \text{Var}(X) + \text{Var}(Y) - 2\,\text{Cov}(X,Y) \\
> >                   &= 9 + 16 - 2(6) \\
> >                   &= 13
> > \end{align*}
> > $$
> > Positive covariance shrinks the variance of a *difference* and inflates the variance of a *sum* — the sign of the cross term flips with the sign of $c_2$.

> [!example]- Sample Mean of 25 Claims {Example}
> Claim sizes are i.i.d. with mean 400 and standard deviation 100. Find the mean and standard deviation of the average of 25 claims.
>
> > [!answer]-
> > $\bar{X} = \frac{1}{25}\sum_{i=1}^{25} X_i$, so every $c_i = 1/25$:
> > $$
> > \begin{align*}
> > E[\bar{X}] &= 25 \cdot \tfrac{1}{25}(400) \\
> >            &= 400 \\
> > \text{Var}(\bar{X}) &= 25 \cdot \left(\tfrac{1}{25}\right)^2 (100^2) \\
> >                     &= \frac{10{,}000}{25} \\
> >                     &= 400
> > \end{align*}
> > $$
> > So $\text{SD}(\bar{X}) = 20$. Averaging leaves the mean alone but divides the standard deviation by $\sqrt{25} = 5$.
