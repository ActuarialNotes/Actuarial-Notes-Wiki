The **Chi-Squared Distribution** $\chi^2(n)$ with $n$ degrees of freedom is the distribution of the sum of squares of $n$ independent standard [[Normal Distribution|normal]] variables. It is the [[Sampling Distribution|sampling distribution]] behind tests and intervals for a normal variance and behind likelihood ratio tests.

> $$V = \sum_{i=1}^{n} Z_i^2 \sim \chi^2(n), \quad Z_i \sim N(0, 1)$$

> $$f(x) = \frac{x^{n/2 - 1}\,e^{-x/2}}{2^{n/2}\,\Gamma(n/2)}, \quad x > 0$$

> $$E[V] = n$$

> $$\text{Var}(V) = 2n$$

- $f$ is the density of $V$. It is the [[Gamma]] distribution with shape $n/2$ and scale 2; with $n = 2$ it is the [[Exponential Distribution|exponential]] with mean 2.
- **Additivity:** a sum of independent chi-squared variables is chi-squared, with the degrees of freedom added.
- **Normal samples:** for a sample of size $n$ from $N(\mu, \sigma^2)$ with [[Sample Variance|sample variance]] $S^2$, $(n - 1)S^2/\sigma^2 \sim \chi^2(n - 1)$. This gives the [[Confidence Interval|confidence interval]] and the test for $\sigma^2$.
- **[[Likelihood Ratio Test|Likelihood ratio tests]]:** for nested models with $p_1 < p_2$ parameters, $-2\ln\lambda = 2(\ell_2 - \ell_1)$ is approximately $\chi^2(p_2 - p_1)$ in large samples. For [[Generalized Linear Model|GLMs]] this is the drop in [[Deviance|deviance]] divided by the [[Dispersion Parameter|dispersion parameter]].
- **The CAS MAS-I table** gives *lower-tail* areas for $n = 1$ to 50: the entry in column $p$ is the value $c$ with $P(V \leq c) = p$, for $p = 0.005,\ 0.010,\ 0.025,\ 0.050,\ 0.950,\ 0.975,\ 0.990,\ 0.995$. An upper-tail 5% critical value is read from the $0.950$ column. For large $n$ the distribution is approximately normal with mean $n$ and variance $2n$.
- On MAS-I it supplies the critical values for tests of a normal variance, chi-square tests (Hogg §4.7), likelihood ratio tests (Hogg §8.3) and GLM model comparisons. The [[Student's t-Distribution]] and the [[F-Distribution]] are both built from it.

> [!example]- Confidence Interval for the Variance of Log-Losses {Example}
> The logarithms of 10 claim amounts are treated as a sample from a normal distribution. Their sample variance is $s^2 = 0.36$. Using the CAS chi-square table, find a 95% confidence interval for $\sigma^2$.
>
> > [!answer]-
> > $(n - 1)S^2/\sigma^2 \sim \chi^2(9)$, and $(n - 1)s^2 = 9(0.36) = 3.24$. From the $df = 9$ row, $P(\chi^2_9 \leq 2.70) = 0.025$ and $P(\chi^2_9 \leq 19.02) = 0.975$. Solving $2.70 \leq 3.24/\sigma^2 \leq 19.02$ for $\sigma^2$:
> >
> > $$
> > \begin{align*}
> > \text{lower} &= \frac{3.24}{19.02} \\
> > &= 0.170 \\
> > \text{upper} &= \frac{3.24}{2.70} \\
> > &= 1.200
> > \end{align*}
> > $$
> >
> > The interval $(0.170,\ 1.200)$ is not centred on $0.36$: the chi-squared distribution is skewed right, so the large quantile sets the lower bound.

> [!example]- Testing an Added Rating Variable {Example}
> A claim-frequency GLM has maximised log-likelihood $-1{,}250.6$. Adding a rating variable with 4 levels (3 extra parameters) raises it to $-1{,}245.9$. Test at the 5% level whether the variable is significant.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > 2(\ell_2 - \ell_1) &= 2\bigl(-1{,}245.9 - (-1{,}250.6)\bigr) \\
> > &= 9.4
> > \end{align*}
> > $$
> >
> > Compare with $\chi^2(3)$. The $df = 3$ row gives $7.81$ in the $0.950$ column and $9.35$ in the $0.975$ column. Since $9.4 > 7.81$, reject the smaller model at 5%: the variable is significant. Because $9.4$ also exceeds $9.35$ but not $11.34$ (the $0.990$ column), the [[p-Value|p-value]] lies between 0.01 and 0.025.
