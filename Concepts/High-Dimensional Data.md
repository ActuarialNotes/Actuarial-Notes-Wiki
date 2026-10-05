**High-Dimensional Data** are data sets with as many features as observations or more, $p \ge n$ (ISLR treats $p > n$ as the definition, and $p$ slightly below $n$ as raising the same issues). In this setting least squares and other classical methods fit the training data perfectly whether or not any real relationship exists, so they overfit badly.

> $$p \ge n \;\Longrightarrow\; \text{RSS} = 0 \ \text{ and } \ R^2 = 1$$

> $$\hat\sigma^2 = \frac{\text{RSS}}{n - p - 1}$$

- $n$ is the number of observations, $p$ the number of features, and RSS the [[Residual Sum of Squares]]. Least squares has at least as many coefficients as points, so the residuals are zero regardless of the data. The usual estimate of $\sigma^2$ then has nothing left to work with.
- **What breaks.** Training RSS, [[R-Squared]], p-values and the usual fit measures are useless as evidence: adding features unrelated to the response drives $R^2$ to $1$ and training MSE to $0$, while test MSE explodes. $C_p$, [[AIC]] and [[BIC]] are unreliable because $\hat\sigma^2$ is, and adjusted $R^2$ can be made $1$.
- **What works.** Less flexible fitting methods: forward stepwise selection ([[Variable Selection]]), ridge regression and the lasso ([[Regularization]]), and [[Principal Components Regression]]. Choosing the tuning parameter well, for example by [[Cross-Validation]], is crucial.
- **Curse of dimensionality.** Test error tends to rise with $p$ unless the added features are genuinely associated with the response. Noise features increase the risk of overfitting and bring no gain.
- **Interpreting results.** [[Multicollinearity]] is extreme: any variable can be written as a linear combination of the others. A selected set of predictors is only one of many that would predict about as well. Report performance on an independent test set or by cross-validation ([[Test Error]]), never on the training data.
- This is ISLR §6.4. It is a different idea from [[High Dimensional Variables]], the Exam 8 term for a *single* categorical rating variable with so many levels (thousands of territories, vehicle models or class codes) that most levels are thin.

> [!example]- A Perfect Fit That Predicts Nothing {Example}
> An analyst has loss costs for just two vehicles, $(x, y) = (2, 300)$ and $(5, 150)$, where $x$ is vehicle age. She fits $y = \beta_0 + \beta_1 x$ by least squares. Find the fit, its $R^2$, and its prediction for a $10$-year-old vehicle.
>
> > [!answer]-
> > Two parameters and two points give an exact fit through both points:
> >
> > $$
> > \begin{align*}
> > \hat\beta_1 &= \frac{150 - 300}{5 - 2} = -50 \\[4pt]
> > \hat\beta_0 &= 300 - (-50)(2) = 400
> > \end{align*}
> > $$
> >
> > Both residuals are $0$, so $\text{RSS} = 0$ and $R^2 = 1$. The divisor $n - p - 1 = 2 - 1 - 1 = 0$, so $\sigma^2$ cannot be estimated and no standard error or p-value exists.
> >
> > $$
> > \begin{align*}
> > \hat y(10) &= 400 - 50(10) \\
> > &= -100
> > \end{align*}
> > $$
> >
> > A negative loss cost. The "perfect" fit says nothing about the true relationship: any two points would have been fitted exactly. This is the $p + 1 \ge n$ problem in its smallest form.

> [!example]- Reporting a Telematics Model {Example}
> A pricing team has $3{,}000$ telematics features for $400$ drivers. Forward stepwise selection picks $12$ features, and the fitted model has training $R^2 = 0.97$ and highly significant p-values. Which conclusions are justified, and what should be reported?
>
> > [!answer]-
> > **Not justified:** that the fit is good (training $R^2$ and p-values carry no evidence when $p > n$), and that these $12$ features are *the* drivers of loss. With extreme multicollinearity many other sets of $12$ would predict about as well, and rerunning the selection on new data could pick a different, even non-overlapping, set.
> >
> > **Report instead:** the error on an independent test set or the cross-validated error. Present the $12$ features as one of many possible predictive models, still to be validated on new data. A lasso or ridge fit with its penalty chosen by cross-validation is a natural benchmark. Adding features is only worthwhile if they are truly associated with loss, because noise features raise test error.
