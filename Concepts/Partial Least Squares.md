**Partial Least Squares (PLS)** is a *supervised* dimension reduction method. Like [[Principal Components Regression]], it builds $M$ new features $Z_1, \dots, Z_M$ as linear combinations of the predictors and fits a least squares linear model to them. Unlike PCR, it uses the response $Y$ to choose those features, so they approximate the predictors and are also related to the response.

> $$Z_m = \sum_{j=1}^{p} \phi_{jm} X_j$$
>
> $$\phi_{j1} = \frac{\sum_{i=1}^{n}(x_{ij} - \bar{x}_j)(y_i - \bar{y})}{\sum_{i=1}^{n}(x_{ij} - \bar{x}_j)^2}$$
>
> $$y_i = \theta_0 + \sum_{m=1}^{M} \theta_m z_{im} + \epsilon_i$$

- **First direction.** Standardize the $p$ predictors. Then set each $\phi_{j1}$ equal to the coefficient from the simple [[Linear Regression]] of $Y$ onto $X_j$ (the second line). That coefficient is proportional to the [[Correlation|correlation]] between $Y$ and $X_j$. So $Z_1$ puts the most weight on the variables most strongly related to the response.
- **Later directions.** Regress each variable on $Z_1$ and keep the residuals. The residuals are the information $Z_1$ has not explained. Compute $Z_2$ from them in exactly the same way $Z_1$ was computed from the original data, and repeat until there are $M$ directions. Finally, fit $Y$ on $Z_1, \dots, Z_M$ by least squares, just as in PCR.
- **Tuning.** $M$ is a tuning parameter, usually chosen by [[Cross-Validation]]. The predictors and the response are generally standardized first.
- **Against PCR.** PCR finds its directions without using $Y$, so nothing guarantees that the directions that best explain the predictors are also the best ones for predicting the response (see [[Principal Components Analysis]], [[Unsupervised Learning]]). The first PLS direction fits the predictors less closely than the first principal component, but it explains the response better (see [[Supervised Learning]]).
- **In practice.** PLS is popular in chemometrics. It often performs no better than ridge regression (see [[Regularization]]) or PCR. Supervised dimension reduction can reduce bias, but it can also increase variance, so on balance PLS gains little over PCR. As in PCR, the new features are linear combinations of the original predictors, not a subset of them (see [[Variable Selection]]).

> [!example]- Computing the First PLS Direction {Example}
> Four auto policies have two standardized predictors, vehicle value $X_1$ and annual mileage $X_2$ (each with mean $0$ and $\sum x^2 / n = 1$), and claim cost $y$ in \$000:
>
> | Policy | $x_1$ | $x_2$ | $y$ |
> |---|---|---|---|
> | 1 | $-1$ | $-1.4$ | $2$ |
> | 2 | $-1$ | $0.2$ | $6$ |
> | 3 | $1$ | $-0.2$ | $4$ |
> | 4 | $1$ | $1.4$ | $8$ |
>
> Find the first PLS direction $Z_1$, then the PLS fit with $M = 1$ and its fitted value for policy 4.
>
> > [!answer]-
> > $\bar y = 5$, so $y - \bar y = (-3, 1, -1, 3)$. Each predictor has mean $0$ and $\sum x_{ij}^2 = 4$, so the simple-regression slopes are
> > $$
> > \begin{align*}
> > \phi_{11} &= \frac{(-1)(-3) + (-1)(1) + (1)(-1) + (1)(3)}{4} \\
> > &= 1.0 \\
> > \phi_{21} &= \frac{(-1.4)(-3) + (0.2)(1) + (-0.2)(-1) + (1.4)(3)}{4} \\
> > &= 2.2
> > \end{align*}
> > $$
> > The direction $z_{i1} = 1.0\,x_{i1} + 2.2\,x_{i2}$ gives scores $(-4.08, -0.56, 0.56, 4.08)$, with mean $0$. Regressing $y$ on $z_1$:
> > $$
> > \begin{align*}
> > \hat\theta_1 &= \frac{\sum z_{i1}(y_i - \bar y)}{\sum z_{i1}^2} \\
> > &= \frac{23.36}{33.92} \\
> > &= 0.6887 \\
> > \hat\theta_0 &= 5
> > \end{align*}
> > $$
> > Policy 4's fitted value is $5 + 0.6887(4.08) = 7.81$, or \$7,810.
> >
> > Mileage gets 2.2 times the weight of vehicle value because it is far more correlated with claim cost: $r = 0.98$ against $0.45$, which is the same ratio. For comparison, these two standardized predictors have correlation $0.6$, and their first principal component weights them equally, $(0.707, 0.707)$. PCA picks its direction without ever looking at $y$.

> [!example]- PLS or PCR? {Example}
> Which of these statements are true?
>
> I. PLS uses the response to choose its directions, and PCR does not.
> II. A PLS fit with $M = 3$ directions on 50 predictors uses only 3 of the 50 predictors.
> III. Because it is supervised, PLS can be expected to beat PCR.
>
> > [!answer]-
> > **Only I.**
> >
> > I is true. The first PLS direction weights each $X_j$ by its simple-regression coefficient on $Y$. PCR's components depend only on the predictors.
> >
> > II is false. Each $Z_m$ is a linear combination of the predictors, so all 50 still feed the fit. The *dimension* is reduced to 3, but no predictors are dropped.
> >
> > III is false. ISLR notes that PLS often does no better than ridge regression or PCR in practice. Supervision can reduce bias, but it can also increase variance, so the overall benefit relative to PCR is a wash.
