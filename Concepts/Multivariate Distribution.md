A **multivariate distribution** describes the joint probabilistic behavior of two or more [[Random Variable]]s. For random variables $X_1, X_2, \ldots, X_n$, the joint distribution is characterized by the [[Joint Probability Function]] (discrete) or joint density function (continuous).

Key derived objects from a joint distribution include:
- **[[Marginal Probability Function]]s**: distributions of individual variables after integrating/summing out the others
- **[[Conditional Probability Function]]s**: distributions of one variable given fixed values of the others
- **[[Covariance]] and [[Correlation Coefficient]]**: measures of linear dependence between pairs of variables

If all variables are [[Independent Random Variables]], the joint distribution factors as the product of the marginals.

> [!example]- Joint vs. Marginal Distribution {💡 Example}
> $X$ and $Y$ each take values $\{0, 1\}$ with joint PMF: $P(0,0)=0.1$, $P(0,1)=0.4$, $P(1,0)=0.3$, $P(1,1)=0.2$.
>
> > [!answer]- Answer
> > Marginal of $X$: $P(X=0) = 0.1+0.4 = 0.5$, $P(X=1) = 0.3+0.2 = 0.5$.
> > Marginal of $Y$: $P(Y=0) = 0.1+0.3 = 0.4$, $P(Y=1) = 0.4+0.2 = 0.6$.
> > Since $P(0,0) = 0.1 \neq P(X=0)P(Y=0) = 0.20$, $X$ and $Y$ are not independent.
