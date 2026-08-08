**Multicollinearity** is strong linear association among the *predictors* of a regression. The fit as a whole stays fine, but individual coefficients become unstable: the data cannot say which of two nearly interchangeable variables is doing the work, so each coefficient gets a large standard error.

> $$\text{VIF}_j = \frac{1}{1 - R_j^{2}}$$

> $$\text{Var}(\hat\beta_j) = \frac{\sigma^{2}}{S_{jj}} \times \text{VIF}_j$$

- $R_j^2$ is from regressing predictor $x_j$ on all the *other* predictors. A **variance inflation factor** above $5$–$10$ is the usual flag
- Symptoms: a significant overall $F$ test with no significant individual coefficients, coefficients that flip sign when a variable is added or a few rows change, and standard errors that are implausibly large
- What it does **not** hurt is prediction inside the observed range of the predictors — fitted values and [[R-Squared]] are unaffected. It damages *interpretation*, which is fatal for a rating model where each relativity must stand on its own
- **Perfect** collinearity (the dummy-variable trap: including every level of a [[Categorical Predictor]] plus an intercept) makes $\mathbf{X}^\top\mathbf{X}$ singular and the fit impossible; drop one level as the base
- Remedies: drop one of the pair, combine them into a single variable, centre the variables before adding polynomial or [[Interaction]] terms, or shrink with a penalized fit. Collecting data that breaks the association is the real fix
- Common in insurance data by construction — vehicle age and vehicle value, building age and construction type, exposure and premium all move together
- Detect it before fitting with a correlation matrix or a [[Scatter Plot]] matrix of the predictors; confirm afterwards with VIFs from the [[Parameter Estimate Tables]]

![[Media/Figures/Multicollinearity.svg|340]]

> [!example]- Computing and Interpreting a VIF {Example}
> Regressing vehicle value on the other predictors gives $R^2 = 0.92$. Compute the VIF and describe the effect on the coefficient.
>
> > [!answer]-
> > $$\text{VIF} = \frac{1}{1 - 0.92} = 12.5$$
> > The variance of $\hat\beta$ for vehicle value is $12.5$ times what it would be if that predictor were uncorrelated with the others, so its standard error is $\sqrt{12.5} = 3.5$ times larger. A relativity that would have been comfortably significant may now fail its Wald test entirely.

> [!example]- Sign Flip in a Rating Model {Example}
> A severity model includes both vehicle age and vehicle value, which correlate at $-0.94$. Alone, vehicle age has coefficient $-0.08$; together with value it becomes $+0.05$. Is the positive sign a real effect?
>
> > [!answer]-
> > Almost certainly not. With $r = -0.94$ the two variables carry nearly the same information, so the fit can trade a large coefficient on one against a large opposite coefficient on the other with little change in the likelihood — the split between them is essentially arbitrary. Keep **one** of the two (or build a single derived variable such as value-per-year-of-age) and choose between the candidate models on holdout error or [[AIC]], not on the sign of an unstable coefficient.
