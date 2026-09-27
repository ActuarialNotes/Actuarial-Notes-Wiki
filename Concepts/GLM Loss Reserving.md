---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:aecb867e391a0dde0916dabcef51c3c28b214b317114acd3b61ce4d2b36665b7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/GLM Loss Reserving.md
---

**GLM loss reserving** fits a [[Generalized Linear Model|generalized linear model]] to the cells of a claims triangle. Each cell is treated as an independent observation from an [[Exponential Family|exponential dispersion family]] distribution whose mean is linked to accident-period and development-period covariates, so one fitted model gives the reserve, its [[Prediction Error|prediction error]] and the diagnostics that test it. [[Stochastic Loss Reserving Using Generalized Linear Models (Taylor and McGuire - 2016)|Taylor and McGuire (2016)]] show that the [[Chain Ladder Method|chain ladder]] is itself such a model.

> $$h(\mu_{kj}) = x_{kj}^{T}\beta$$

> $$\mathrm{Var}[Y_{kj}] = \frac{\phi\,V(\mu_{kj})}{w_{kj}}$$

- $Y_{kj}$ is the incremental amount of accident period $k$ in development period $j$, with mean $\mu_{kj}$. $h$ is the [[Link Function|link function]], $x_{kj}$ the covariates, $\beta$ the parameters, $V$ the [[Variance Function|variance function]] ($V(\mu) = \mu^p$ for a [[Tweedie Distribution|Tweedie]] member, $p = 1$ for the [[Over-Dispersed Poisson Model|over-dispersed Poisson]]), $\phi$ the [[Dispersion Parameter|dispersion parameter]] and $w_{kj}$ a known weight.
- **Two GLMs reproduce the chain ladder.** The *ODP cross-classified* model has $Y_{kj} \sim \mathrm{ODP}(\alpha_k\beta_j, \phi)$ with $\sum_j \beta_j = 1$: a log link, with accident and development year as categorical covariates. The *ODP Mack* model ([[Mack Chain Ladder Model|Mack's]] model given an ODP distribution) takes the response $\hat f_{kj} - 1 = Y_{k,j+1}/X_{kj}$, an identity link, development year as the only covariate, and weight $X_{kj}$. Both give the chain ladder's forecasts, which Taylor (2011) showed are minimum variance unbiased under these models (for the cross-classified model once corrected for bias). They are different models, though, and give different prediction errors.
- **Marginal sums.** The cross-classified model's likelihood equations set every row total and every column total of fitted values equal to the observed total. That is why it reproduces the chain ladder, and why actual-versus-expected by accident or development year is always exactly 100%. A missing effect has to be found in the calendar direction, the cell-by-cell heat map and the residuals.
- **Choosing the model** means choosing the error distribution (a larger Tweedie $p$ for a heavier tail), the covariates, the link (a multiplicative structure implies a log link) and the weights. A zero weight deletes a cell, so using only the latest diagonals or dropping an [[Outlier|outlier]] is still a GLM fit. Weights inversely proportional to the residual variance correct [[Heteroscedasticity|heteroscedasticity]].
- **Prediction error.** Its mean square (MSEP) is the expected squared parameter error plus the expected squared process error, the two being independent. It is estimated by the delta method from the fitted parameters' covariance matrix, or by a semi-parametric or parametric [[Bootstrap|bootstrap]], which gives the whole distribution. [[Model Risk|Model error]] lies outside the model and can be the largest part.
- **Diagnostics** use standardized [[Deviance Residual|deviance residuals]] plotted against accident, development and calendar period, spread plots, actual-and-expected plots, a 2-D heat map, a [[PP Plot|P-P plot]] and a histogram. The monograph's order is to fit a sensible link and distribution, fit the main effects, check for gross violations, improve the fit of the cell means, then review the distribution in detail.
- **Extending the model** is the point of the framework. When the diagnostics reject the chain ladder, the GLM is extended rather than abandoned. The monograph's Chapter 7, beyond the Exam 7 assignment, replaces the accident and development parameters with parsimonious curves and adds calendar-period ([[Superimposed Inflation|superimposed inflation]]) and [[Interaction|interaction]] terms, comparing the models by [[AIC]], [[BIC]] and prediction error.

> [!example]- The Chain Ladder as an ODP Cross-Classified GLM {Example}
> Incremental paid losses (\$000):
>
> | AY | Dev 1 | Dev 2 | Dev 3 |
> |---|---|---|---|
> | 1 | $100$ | $60$ | $20$ |
> | 2 | $120$ | $66$ | |
> | 3 | $130$ | | |
>
> (a) Compute the chain ladder reserve with volume-weighted factors. (b) Fit the ODP cross-classified model by solving its marginal-sum equations with $\beta_1 + \beta_2 + \beta_3 = 1$, and forecast the same reserve.
>
> > [!answer]-
> > **(a) Chain ladder.** The cumulative rows are $100, 160, 180$; $120, 186$; and $130$.
> >
> > $$
> > \begin{align*}
> > \hat f_1 &= \frac{160 + 186}{100 + 120} \\
> > &= 1.5727 \\
> > \hat f_2 &= \frac{180}{160} \\
> > &= 1.125 \\
> > \hat R_2 &= 186 \times (1.125 - 1) \\
> > &= 23.25 \\
> > \hat R_3 &= 130 \times (1.5727 \times 1.125 - 1) \\
> > &= 100.01
> > \end{align*}
> > $$
> >
> > The total reserve is $123.26$.
> >
> > **(b) Marginal sums.** Solve row 1, column 3, row 2, column 2, then row 3, using the constraint each time:
> >
> > $$
> > \begin{align*}
> > \hat\alpha_1 &= 100 + 60 + 20 \\
> > &= 180 \\
> > \hat\beta_3 &= \frac{20}{180} \\
> > &= 0.11111 \\
> > \hat\alpha_2 &= \frac{120 + 66}{1 - 0.11111} \\
> > &= 209.25 \\
> > \hat\beta_2 &= \frac{60 + 66}{180 + 209.25} \\
> > &= 0.32370 \\
> > \hat\beta_1 &= 1 - 0.32370 - 0.11111 \\
> > &= 0.56519 \\
> > \hat\alpha_3 &= \frac{130}{0.56519} \\
> > &= 230.01
> > \end{align*}
> > $$
> >
> > The forecasts are $\hat Y_{23} = 209.25 \times 0.11111 = 23.25$, $\hat Y_{32} = 230.01 \times 0.32370 = 74.45$ and $\hat Y_{33} = 230.01 \times 0.11111 = 25.56$. So $\hat R_2 = 23.25$ and $\hat R_3 = 100.01$, exactly the chain ladder's.
> >
> > With $\sum_j\beta_j = 1$, each $\hat\alpha_k$ is the chain ladder ultimate ($180$, $209.25$, $230.01$) and $\hat\beta_j$ is the incremental emergence pattern. The factors are recovered as $\hat f_1 = (\hat\beta_1 + \hat\beta_2)/\hat\beta_1 = 0.88889/0.56519 = 1.5727$.

> [!example]- Fitting Only the Latest Two Diagonals with Zero Weights {Example}
> Cumulative paid losses (\$000):
>
> | AY | Dev 1 | Dev 2 | Dev 3 | Dev 4 |
> |---|---|---|---|---|
> | 1 | $1{,}000$ | $1{,}500$ | $1{,}650$ | $1{,}700$ |
> | 2 | $1{,}100$ | $1{,}700$ | $1{,}850$ | |
> | 3 | $1{,}200$ | $1{,}900$ | | |
> | 4 | $1{,}300$ | | | |
>
> Fit the ODP Mack GLM using only the latest $m = 2$ experience years, with weights $w_{kj} = X_{kj}\,I(3 \le k + j \le 4)$. Compare AY 4's reserve with the all-year fit.
>
> > [!answer]-
> > Each response is $\hat f_{kj} - 1$. The GLM estimate for each development year is the weighted mean of its responses, and weight times response is just $Y_{k,j+1}$:
> >
> > | Response | $k + j$ | Value | Weight |
> > |---|---|---|---|
> > | AY 1, dev 1 | $2$ | $0.5000$ | $0$ |
> > | AY 2, dev 1 | $3$ | $0.5455$ | $1{,}100$ |
> > | AY 3, dev 1 | $4$ | $0.5833$ | $1{,}200$ |
> > | AY 1, dev 2 | $3$ | $0.1000$ | $1{,}500$ |
> > | AY 2, dev 2 | $4$ | $0.0882$ | $1{,}700$ |
> > | AY 1, dev 3 | $4$ | $0.0303$ | $1{,}650$ |
> >
> > $$
> > \begin{align*}
> > \hat f_1 &= 1 + \frac{600 + 700}{1{,}100 + 1{,}200} \\
> > &= 1.56522 \\
> > \hat f_2 &= 1 + \frac{150 + 150}{1{,}500 + 1{,}700} \\
> > &= 1.09375 \\
> > \hat f_3 &= 1 + \frac{50}{1{,}650} \\
> > &= 1.03030 \\
> > \hat R_4 &= 1{,}300 \times (1.56522 \times 1.09375 \times 1.03030 - 1) \\
> > &= 993.0
> > \end{align*}
> > $$
> >
> > The all-year fit gives $\hat f_1 = 5{,}100/3{,}300 = 1.54545$ and $\hat R_4 = 964.0$. The zero weight on AY 1's $1.500$ link raises AY 4's reserve by $29.0$ ($3.0\%$), because the first link has been rising. The later factors are unchanged here, since every cell they use lies on the last two diagonals.

> [!example]- What the Marginal Sums Hide {Example}
> An ODP cross-classified model is fitted to a triangle of incremental losses (\$000). The actual values and the fitted values are:
>
> | AY | Actual 1 | Actual 2 | Actual 3 | Actual 4 |
> |---|---|---|---|---|
> | 1 | $500$ | $300$ | $150$ | $58$ |
> | 2 | $500$ | $300$ | $173$ | |
> | 3 | $500$ | $345$ | | |
> | 4 | $575$ | | | |
>
> | AY | Fitted 1 | Fitted 2 | Fitted 3 | Fitted 4 |
> |---|---|---|---|---|
> | 1 | $484.9$ | $305.5$ | $159.6$ | $58.0$ |
> | 2 | $496.7$ | $312.9$ | $163.4$ | |
> | 3 | $518.4$ | $326.6$ | | |
> | 4 | $575.0$ | | | |
>
> Compute actual/expected by accident year, development year and calendar period, and say what the model is missing.
>
> > [!answer]-
> > **By accident year and development year** every ratio is $100\%$. Row 2, for example, is $973/973.0$ and column 2 is $945/945.0$. The likelihood equations force this, so these plots say nothing.
> >
> > **By calendar period** (the diagonals $k + j - 1$):
> >
> > $$
> > \begin{align*}
> > \text{CY 1} &= \frac{500}{484.9} \\
> > &= 103.1\% \\
> > \text{CY 2} &= \frac{300 + 500}{305.5 + 496.7} \\
> > &= 99.7\% \\
> > \text{CY 3} &= \frac{150 + 300 + 500}{159.6 + 312.9 + 518.4} \\
> > &= 95.9\% \\
> > \text{CY 4} &= \frac{58 + 173 + 345 + 575}{58.0 + 163.4 + 326.6 + 575.0} \\
> > &= 102.5\%
> > \end{align*}
> > $$
> >
> > The heat map tells the same story cell by cell. Every cell of calendar period 3 is below $100\%$ ($94.0\%$, $95.9\%$, $96.5\%$). The two interior cells of period 4 are above it ($105.9\%$, $105.6\%$); its corner cells are fitted exactly because each is alone in its row or column.
> >
> > The colours run along whole diagonals rather than clustering in accident and development groups, so the missing effect is a calendar-period one: here a jump in the latest period, such as a court precedent. The chain ladder has smeared it across the row and column parameters. The remedy is a calendar term with a simple structure, not a free parameter per diagonal (see [[Superimposed Inflation]]).
