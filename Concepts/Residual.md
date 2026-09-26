---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c3b5f7d9e1781e291f81734cf1e70ecf1eb962e5a6c525d314063b35cb04c8fb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Residual.md
---

A **residual** is the part of an observation a fitted model does not explain: the observed value minus the [[Fitted Values|fitted value]]. It is the sample stand-in for the unobservable error $\varepsilon_i$, and every [[Model Diagnostics|diagnostic]] — the [[Residual Plot]], the [[QQ Plot]], the residual [[Autocorrelation Function|ACF]] — asks whether the residuals still contain structure.

> $$e_i = y_i - \hat{y}_i$$

> $$r_i = \frac{e_i}{\hat\sigma\sqrt{1 - h_{ii}}}$$

**Linear regression.**

- $e_i$ is the **raw** residual. Even when the errors have constant variance the residuals do not: $\mathrm{Var}(e_i) = \sigma^2(1 - h_{ii})$, where $h_{ii}$ is the leverage from the [[Hat Matrix|hat matrix]]
- $r_i$ is the **standardized** (internally studentized) residual. The **externally studentized** residual uses $\hat\sigma_{(i)}$, estimated with observation $i$ left out, and follows a $t$ distribution with $n - p - 2$ degrees of freedom. Texts differ on which one they call "studentized"; either way, values beyond about $\pm 3$ flag an [[Outlier|outlier]]
- With an intercept, [[Ordinary Least Squares|OLS]] residuals sum to zero, and their squares sum to the [[Residual Sum of Squares]]

**Generalized linear models.** When the variance depends on the mean, raw residuals are not comparable across observations, so two scaled versions are used:

> $$r_i^{P} = \frac{y_i - \hat\mu_i}{\sqrt{V(\hat\mu_i)}}$$

> $$r_i^{D} = \operatorname{sign}(y_i - \hat\mu_i)\sqrt{d_i}$$

- The **Pearson residual** divides by the standard deviation implied by the [[Variance Function|variance function]] $V$. Its squares sum to the Pearson $\chi^2$ statistic, which divided by the residual degrees of freedom estimates the [[Dispersion Parameter|dispersion]]
- The **deviance residual** uses $d_i$, observation $i$'s contribution to the [[Deviance|deviance]], so its squares sum to $D$. For Poisson, $d_i = 2\left[y_i \ln(y_i/\hat\mu_i) - (y_i - \hat\mu_i)\right]$, with $y \ln y = 0$ at $y = 0$. Deviance residuals are closer to Normal for skewed responses, so they are the usual choice for a QQ plot

**Linear mixed models.** *Conditional* residuals $\mathbf{y} - \mathbf{X}\hat{\boldsymbol\beta} - \mathbf{Z}\hat{\mathbf{b}}$ estimate $\boldsymbol\varepsilon$ and have covariance $\mathbf{R}$; *marginal* residuals $\mathbf{y} - \mathbf{X}\hat{\boldsymbol\beta}$ have covariance $\mathbf{V} = \mathbf{Z}\mathbf{D}\mathbf{Z}^\top + \mathbf{R}$. The [[Variance Components|variance components]] therefore imply a [[Covariance Structure|covariance structure]] for the residuals, and the [[Intraclass Correlation|intraclass correlation]] is the correlation between two marginal residuals in the same group.

**Time series.** An [[ARIMA]] model's residuals are its one-step-ahead forecast errors, $\hat\varepsilon_t = y_t - \hat{y}_{t \mid t-1}$. If the model has captured the dependence they are [[White Noise|white noise]]: no spike in the [[Correlogram|correlogram]] of their ACF or [[Partial Autocorrelation Function|PACF]] outside $\pm 1.96/\sqrt{n}$, and a Ljung–Box statistic below its $\chi^2$ critical value. A spike that survives points to the AR or MA term that is missing.

> [!example]- Pearson and Deviance Residuals for Claim Counts {Example}
> A Poisson frequency GLM gives two policies the same fitted mean $\hat\mu = 1.2$. One had $3$ claims, the other none. Compute both residuals for each.
>
> > [!answer]-
> > For $y = 3$:
> > $$
> > \begin{align*}
> > r^P &= \frac{3 - 1.2}{\sqrt{1.2}} \\
> > &= 1.643 \\
> > d &= 2\left[3\ln\frac{3}{1.2} - (3 - 1.2)\right] \\
> > &= 1.898 \\
> > r^D &= +\sqrt{1.898} \\
> > &= 1.378
> > \end{align*}
> > $$
> > For $y = 0$: $r^P = -1.2/\sqrt{1.2} = -1.095$, and $d = 2(1.2) = 2.4$, so $r^D = -\sqrt{2.4} = -1.549$.
> >
> > The Pearson residuals are lopsided — a large positive value for a claim-heavy policy, a modest negative one for a claim-free policy — because a Poisson count is right-skewed. The deviance residuals pull the two toward symmetry, which is why they are the ones plotted against Normal quantiles.

> [!example]- A Small Residual at a High-Leverage Point {Example}
> A regression has $\hat\sigma = 0.6$. Observation A has raw residual $e = 0.5$ and leverage $h = 0.20$; observation B has the same raw residual and $h = 0.92$. Standardize both.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > r_A &= \frac{0.5}{0.6\sqrt{0.80}} \\
> > &= 0.93 \\
> > r_B &= \frac{0.5}{0.6\sqrt{0.08}} \\
> > &= 2.95
> > \end{align*}
> > $$
> > Identical raw residuals, very different messages. B pulls the fit so hard toward itself that a residual of $0.5$ is nearly three standard deviations of what its position allows. Screening raw residuals alone would miss it.

> [!example]- The Residual Covariance Implied by a Random Intercept {Example}
> Annual loss ratios for each policyholder are modelled with a random intercept, $\hat\sigma_b^2 = 40$ and $\hat\sigma^2 = 160$, independent conditional errors. Write the covariance matrix of one policyholder's three marginal residuals, and their correlation.
>
> > [!answer]-
> > $$
> > \mathbf{V}_i = \sigma_b^2\mathbf{J} + \sigma^2\mathbf{I} = \begin{bmatrix} 200 & 40 & 40 \\ 40 & 200 & 40 \\ 40 & 40 & 200 \end{bmatrix}
> > $$
> > Here $\mathbf{J}$ is the $3 \times 3$ matrix of ones. Each variance is $40 + 160 = 200$ and every pair of years shares the policyholder's intercept, so the correlation is $40/200 = 0.20$ at every lag — compound symmetry. The conditional residuals should be uncorrelated; if their correlation instead falls off with the gap between years, an AR(1) structure for $\mathbf{R}$ is the next model to try.
