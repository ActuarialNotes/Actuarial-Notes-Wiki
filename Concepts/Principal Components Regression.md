**Principal Components Regression (PCR)** is a dimension reduction method for [[Linear Regression]]. It replaces the $p$ predictors $X_1, \dots, X_p$ with the first $M < p$ principal components $Z_1, \dots, Z_M$, then fits a linear model to those components by least squares.

> $$Z_m = \sum_{j=1}^{p} \phi_{jm} X_j$$
>
> $$y_i = \theta_0 + \sum_{m=1}^{M} \theta_m z_{im} + \epsilon_i$$
>
> $$\beta_j = \sum_{m=1}^{M} \theta_m \phi_{jm}$$

- $\phi_{1m}, \dots, \phi_{pm}$ are the **loadings** of the $m$th component, and $z_{im}$ are the **principal component scores** (see [[Principal Components Analysis]]). The first component is the direction along which the observations vary the most. Of all combinations with $\sum_j \phi_{j1}^2 = 1$, it has the largest variance. Each later component has the largest variance subject to being uncorrelated with the ones before it, which means perpendicular to them.
- **Why it can help.** The fit estimates the $M + 1$ coefficients $\theta_0, \dots, \theta_M$ instead of $p + 1$. The implied $\beta_j$ are forced into the form of the third line, which can bias them. But when $p$ is large relative to $n$, choosing $M \ll p$ can cut their variance a great deal. If $M = p$ and the $Z_m$ are linearly independent, there is no constraint, and PCR is just least squares on the original predictors.
- **Its assumption.** PCR assumes that the directions in which $X_1, \dots, X_p$ vary most are also the directions associated with $Y$. Nothing guarantees this, because the components are chosen without looking at $Y$. [[Partial Least Squares]] is the supervised alternative.
- **Not feature selection.** Every $Z_m$ is a linear combination of all $p$ original predictors, so the fitted model still uses every one of them (see [[Variable Selection]]). In this sense PCR is closer to ridge regression than to the lasso (see [[Regularization]]). ISLR describes ridge regression as "a continuous version of PCR".
- **In practice.** $M$ is usually chosen by [[Cross-Validation]]. As $M$ grows, bias falls and variance rises, so test MSE is U-shaped (see [[Bias-Variance Tradeoff]]). Standardize each predictor before computing the components. Otherwise the high-variance variables dominate them. You might skip this only when every variable is in the same units. PCR does well when the first few components capture most of the variation in the predictors *and* the relationship with the response.

> [!example]- Predicted Loss Cost and Implied Coefficients {Example}
> A commercial property model has two standardized predictors: building area $X_1$ and insured value $X_2$. Their first principal component has loadings $\phi_{11} = 0.8$ and $\phi_{21} = 0.6$. PCR with $M = 1$, fit to annual loss cost in \$000, gives $\hat\theta_0 = 12.0$ and $\hat\theta_1 = 2.5$.
>
> (a) Predict the loss cost of a risk with standardized values $x_1 = 1.5$ and $x_2 = 0.5$.
> (b) Find the coefficients $\beta_1$ and $\beta_2$ that this fit implies for the original predictors.
>
> > [!answer]-
> > (a) The loadings satisfy $0.8^2 + 0.6^2 = 1$. The risk's score on the first component is
> > $$
> > \begin{align*}
> > z_1 &= 0.8(1.5) + 0.6(0.5) \\
> > &= 1.2 + 0.3 \\
> > &= 1.5
> > \end{align*}
> > $$
> > and the prediction is
> > $$
> > \begin{align*}
> > \hat y &= 12.0 + 2.5(1.5) \\
> > &= 15.75
> > \end{align*}
> > $$
> > so the predicted loss cost is \$15,750.
> >
> > (b) $\beta_j = \theta_1 \phi_{j1}$, so $\beta_1 = 2.5(0.8) = 2.0$ and $\beta_2 = 2.5(0.6) = 1.5$. Check: $12.0 + 2.0(1.5) + 1.5(0.5) = 15.75$.
> >
> > The two coefficients are locked in the ratio $0.8 : 0.6$. This is the constraint that dimension reduction places on the fit. Ordinary least squares on $X_1$ and $X_2$ could set them freely.

> [!example]- What a PCR Fit Estimates {Example}
> A pricing team runs PCR on $p = 40$ standardized telematics predictors. Ten-fold cross-validated MSE is lowest at $M = 6$.
>
> (a) How many regression coefficients does the final fit estimate?
> (b) How many of the 40 predictors does the fitted model depend on?
> (c) What would PCR with $M = 40$ amount to?
>
> > [!answer]-
> > (a) Seven: $\theta_0, \theta_1, \dots, \theta_6$.
> >
> > (b) All 40. Each of $Z_1, \dots, Z_6$ is a linear combination of every original predictor, so none of them drops out. PCR reduces the *dimension* of the fit but does not select features. If the team needs a model built on a few of the original variables, the lasso is the tool for that.
> >
> > (c) Least squares on all 40 original predictors, assuming the 40 components are linearly independent. With $M = p$, PCR does no dimension reduction.
