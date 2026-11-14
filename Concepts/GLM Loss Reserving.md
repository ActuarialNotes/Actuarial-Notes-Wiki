---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:77ecd2d90ba00a8ee155a72660c4471cd14166a046b24255eb25fe198654ef67
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/GLM Loss Reserving.md
---

**GLM Loss Reserving** is the fitting of a [[Generalized Linear Model|generalized linear model]] to the cells of a claims triangle. Each cell is treated as an independent observation from an [[Exponential Family|exponential dispersion family]] distribution whose mean is linked to accident-period and development-period covariates, so one fitted model gives the reserve, its [[Prediction Error|prediction error]] and the diagnostics that test it.

The mean of each cell is linked to its covariates by

> $$h(\mu_{kj}) = x_{kj}^{T}\beta$$

- $Y_{kj}$ is the incremental amount of accident period $k$ in development period $j$, with mean $\mu_{kj}$.
- $h$ is the [[Link Function|link function]].
- $x_{kj}$ is the vector of the cell's covariates and $\beta$ the vector of parameters.

The variance of each cell is

> $$\mathrm{Var}[Y_{kj}] = \frac{\phi\,V(\mu_{kj})}{w_{kj}}$$

- $V$ is the [[Variance Function|variance function]], $V(\mu) = \mu^p$ for a [[Tweedie Distribution|Tweedie]] member, with $p = 1$ for the [[Over-Dispersed Poisson Model|over-dispersed Poisson]].
- $\phi$ is the [[Dispersion Parameter|dispersion parameter]].
- $w_{kj}$ is a known weight.

## The chain ladder as a GLM

[[Stochastic Loss Reserving Using Generalized Linear Models (Taylor and McGuire - 2016)|Taylor and McGuire (2016)]] show that two GLMs reproduce the [[Chain Ladder Method|chain ladder]]'s forecasts. The *ODP cross-classified* model has $Y_{kj} \sim \mathrm{ODP}(\alpha_k\beta_j, \phi)$ with $\sum_j \beta_j = 1$. It has a log link, with accident and development year as categorical covariates. The *ODP Mack* model ([[Mack Chain Ladder Model|Mack's]] model given an ODP distribution) takes the response $\hat f_{kj} - 1 = Y_{k,j+1}/X_{kj}$, an identity link, development year as the only covariate, and weight $X_{kj}$, the cumulative amount. Taylor (2011) showed that the chain ladder's forecasts are minimum variance unbiased under these models, for the cross-classified model once corrected for bias. They are different models, though, and give different prediction errors.

The cross-classified model's likelihood equations set every row total and every column total of fitted values equal to the observed total. That is why it reproduces the chain ladder. With $\sum_j\beta_j = 1$, each $\hat\alpha_k$ is the chain ladder ultimate and $\hat\beta_j$ is the incremental emergence pattern.

> [!example]- Does the ODP cross-classified model reproduce the chain ladder reserve on this triangle? {Example}
> Incremental paid losses ($000) are:
>
> | AY | Dev 1 | Dev 2 | Dev 3 |
> | :--- | ---: | ---: | ---: |
> | 1 | 100 | 60 | 20 |
> | 2 | 120 | 66 | |
> | 3 | 130 | | |
>
> > [!answer]-
> > - The cumulative rows are $100, 160, 180$, then $120, 186$, then $130$.
> > - The volume-weighted factors are $\hat f_1 = 346/220 = 1.5727$ and $\hat f_2 = 180/160 = 1.125$.
> > - The chain ladder reserves are $\hat R_2 = 186 \times 0.125 = 23.25$ and $\hat R_3 = 130 \times (1.5727 \times 1.125 - 1) = 100.01$, a total of $123.26$.
> > - The marginal sums are solved one at a time with $\beta_1 + \beta_2 + \beta_3 = 1$. Row 1 gives $\hat\alpha_1 = 180$, and column 3 gives $\hat\beta_3 = 20/180 = 0.11111$.
> > - Row 2 gives $\hat\alpha_2 = 186/(1 - 0.11111) = 209.25$, and column 2 gives $\hat\beta_2 = 126/(180 + 209.25) = 0.32370$.
> > - Then $\hat\beta_1 = 1 - 0.32370 - 0.11111 = 0.56519$, and row 3 gives $\hat\alpha_3 = 130/0.56519 = 230.01$.
> > - The forecasts are $\hat Y_{23} = 209.25 \times 0.11111 = 23.25$, $\hat Y_{32} = 230.01 \times 0.32370 = 74.45$ and $\hat Y_{33} = 230.01 \times 0.11111 = 25.56$.
> > - So $\hat R_2 = 23.25$ and $\hat R_3 = 100.01$, exactly the chain ladder's. The ultimates $180$, $209.25$ and $230.01$ are the chain ladder's too.

## Choosing the model

Choosing the model means choosing the error distribution (a larger Tweedie $p$ for a heavier tail), the covariates, the link (a multiplicative structure implies a log link) and the weights. A zero weight deletes a cell, so using only the latest diagonals or dropping an [[Outlier|outlier]] is still a GLM fit. Weights inversely proportional to the residual variance correct [[Heteroscedasticity|heteroscedasticity]].

> [!example]- How does AY 4's reserve change when the ODP Mack GLM is fitted to the latest two diagonals only? {Example}
> Cumulative paid losses ($000) are:
>
> | AY | Dev 1 | Dev 2 | Dev 3 | Dev 4 |
> | :--- | ---: | ---: | ---: | ---: |
> | 1 | 1,000 | 1,500 | 1,650 | 1,700 |
> | 2 | 1,100 | 1,700 | 1,850 | |
> | 3 | 1,200 | 1,900 | | |
> | 4 | 1,300 | | | |
>
> The weights are $w_{kj} = X_{kj}\,I(3 \le k + j \le 4)$.
>
> > [!answer]-
> > - Each development year's estimate is the weighted mean of its responses $\hat f_{kj} - 1$, and weight times response is just $Y_{k,j+1}$.
> > - AY 1's first link, at $k + j = 2$, gets a zero weight, so $\hat f_1 = 1 + (600 + 700)/(1{,}100 + 1{,}200) = 1.56522$.
> > - Every cell the later factors use lies on the last two diagonals, so they are unchanged: $\hat f_2 = 1 + 300/3{,}200 = 1.09375$ and $\hat f_3 = 1 + 50/1{,}650 = 1.03030$.
> > - AY 4's reserve is $1{,}300 \times (1.56522 \times 1.09375 \times 1.03030 - 1) = 993.0$.
> > - The all-year fit gives $\hat f_1 = 5{,}100/3{,}300 = 1.54545$ and a reserve of $964.0$.
> > - Dropping AY 1's link raises AY 4's reserve by $29.0$, or $3.0\%$, because the first link has been rising.

## Prediction error

The mean square error of prediction (MSEP) is the expected squared parameter error plus the expected squared process error, the two being independent. It is estimated by the delta method from the fitted parameters' covariance matrix, or by a semi-parametric or parametric [[Bootstrap|bootstrap]], which gives the whole distribution. [[Model Risk|Model error]] lies outside the model and can be the largest part.

## Diagnostics

The diagnostics use standardized [[Deviance Residual|deviance residuals]] plotted against accident, development and calendar period, spread plots, actual-and-expected plots, a 2-D heat map, a [[PP Plot|P-P plot]] and a histogram. The monograph's order is to fit a sensible link and distribution, fit the main effects, check for gross violations, improve the fit of the cell means, then review the distribution in detail.

The marginal sums make actual-versus-expected by accident or development year exactly 100% under the cross-classified model. A missing effect has to be found in the calendar direction, the cell-by-cell heat map and the residuals.

> [!example]- What do actual-versus-expected ratios by accident, development and calendar period show for this ODP cross-classified fit? {Example}
> The actual and fitted incremental losses ($000) are:
>
> | AY | Actual 1 | Actual 2 | Actual 3 | Actual 4 |
> | :--- | ---: | ---: | ---: | ---: |
> | 1 | 500 | 300 | 150 | 58 |
> | 2 | 500 | 300 | 173 | |
> | 3 | 500 | 345 | | |
> | 4 | 575 | | | |
>
> | AY | Fitted 1 | Fitted 2 | Fitted 3 | Fitted 4 |
> | :--- | ---: | ---: | ---: | ---: |
> | 1 | 484.9 | 305.5 | 159.6 | 58.0 |
> | 2 | 496.7 | 312.9 | 163.4 | |
> | 3 | 518.4 | 326.6 | | |
> | 4 | 575.0 | | | |
>
> > [!answer]-
> > - By accident year and by development year every ratio is $100\%$. Row 2, for example, is $973/973.0$ and column 2 is $945/945.0$.
> > - By calendar period (the diagonals $k + j - 1$) the ratios are $500/484.9 = 103.1\%$, $800/802.2 = 99.7\%$, $950/990.9 = 95.9\%$ and $1{,}151/1{,}123.0 = 102.5\%$.
> > - Cell by cell, every cell of calendar period 3 is below $100\%$ ($94.0\%$, $95.9\%$, $96.5\%$), and the two interior cells of period 4 are above it ($105.9\%$, $105.6\%$).
> > - The pattern runs along whole diagonals, so the model is missing a calendar-period effect, here a jump in the latest period such as a court precedent.
> > - The chain ladder has spread it across the row and column parameters. The remedy is a calendar term with a simple structure, not a free parameter per diagonal.

## Extending the model

When the diagnostics reject the chain ladder, the GLM is extended rather than abandoned. The monograph's Chapter 7, beyond the Exam 7 assignment, replaces the accident and development parameters with parsimonious curves and adds calendar-period ([[Superimposed Inflation|superimposed inflation]]) and [[Interaction|interaction]] terms, comparing the models by [[AIC]], [[BIC]] and prediction error.

> [!trap] Reading accident-year actual-versus-expected as a test of fit
> Under the ODP cross-classified model, actual over expected by accident year and by development year is always exactly 100%, whatever is wrong with the model. Test the fit by calendar period, by cell and with the residuals.
