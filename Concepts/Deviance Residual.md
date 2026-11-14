---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5375d147d1471184d644298303edcf95324514d1e986027f876a8cea1e1ef957
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deviance Residual.md
---

A **Deviance Residual** is the signed square root of one observation's contribution to a [[Generalized Linear Model|GLM]]'s [[Deviance|deviance]]. The standardized deviance residual first divides that contribution by the estimated [[Dispersion Parameter|dispersion parameter]], and is

> $$R_i^D = \operatorname{sgn}(Y_i - \hat Y_i)\left(\frac{d_i}{\hat\phi}\right)^{1/2}$$

- $Y_i$ and $\hat Y_i$ are observation $i$ and its fitted value.
- $d_i$ is observation $i$'s contribution to the unscaled deviance $D^* = \sum_i d_i$.
- $\hat\phi = D^*/(n - p)$, for $n$ observations and $p$ fitted parameters.

For the over-dispersed Poisson, comparing its log-density $[y\ln\mu - \mu]/\phi$ with the saturated fit $\mu = y$ gives the contribution

> $$d_i = 2\left[Y_i\ln\frac{Y_i}{\hat Y_i} - (Y_i - \hat Y_i)\right]$$

- $y\ln y = 0$ at $y = 0$.

[[Residual]] gives the unstandardized version.

> [!example]- What are the standardized Pearson and deviance residuals of these two cells? {Example}
> An over-dispersed Poisson reserving GLM has $\hat\phi = 50$. Two cells each have a fitted value of $400$ (\$000). One came in at $520$ and the other at $280$.
>
> > [!answer]-
> > - Under the over-dispersed Poisson, $\hat\sigma = \sqrt{\hat\phi\,\hat Y} = \sqrt{50 \times 400} = 141.42$.
> > - The Pearson residuals are $\pm 120/141.42 = \pm 0.849$.
> > - For the cell at $520$, $d = 2[520\ln(520/400) - 120] = 32.859$, so $R^D = +\sqrt{32.859/50} = 0.811$.
> > - For the cell at $280$, $d = 2[280\ln(280/400) + 120] = 40.262$, so $R^D = -\sqrt{40.262/50} = -0.897$.
> > - The Pearson residuals are symmetric because they are linear in $Y$. The over-dispersed Poisson is right-skewed, so a shortfall of $120$ is less likely than an excess of $120$, and the deviance residual marks it as the more extreme outcome.

## Normality of deviance residuals

[[Stochastic Loss Reserving Using Generalized Linear Models (Taylor and McGuire - 2016)|Taylor and McGuire (2016)]] use the standardized deviance residual for every residual diagnostic of a reserving model, because it is much closer to normal than the [[Pearson Residual|Pearson residual]]. The Pearson residual $(Y_i - \hat Y_i)/\hat\sigma_i$ is a linear transform of the observation, so it reproduces any skewness in the data. Pierce and Schafer (1986) showed that deviance residuals are normal up to an error of order $m^{-1/2}$. Taylor and McGuire's histograms from a gamma model of bodily injury claims (CoV $1.16$) show highly skewed Pearson residuals and nearly normal deviance residuals.

A [[QQ Plot|Q-Q plot]] needs observations from one distribution, which raw GLM observations with different means are not. Standardized deviance residuals are asymptotically $N(0,1)$, so they are plotted against standard normal quantiles, alongside a histogram and the [[PP Plot|P-P plot]].

## Residual plots

Plotted against accident, development and calendar period or the fitted value, the residuals should scatter evenly about zero with constant spread. A trend means the cell means are wrong, such as a missing effect. Fanning means the dispersion assumption is wrong. This is the [[Heteroscedasticity|heteroscedasticity]] a spread plot measures: the standard deviation of standardized residuals should vary randomly about $1$. The cure is weights roughly inversely proportional to the residuals' variance, since cell $i$'s dispersion is $\phi_i = \phi/w_i$ ([[Residual Plot]]).

> [!example]- What weights remove this heteroscedasticity, and what do they do to this cell's residual? {Example}
> In a spread plot of standardized deviance residuals by development year, the standard deviation is about $1.6$ in development years 1–2 and about $0.8$ in later years. After the refit, $\hat\phi = 100$. A development-year-1 cell has fitted value $40{,}000$ and actual $46{,}000$.
>
> > [!answer]-
> > - The standard deviation is twice as large in years 1–2, so their dispersion is about $2^2 = 4$ times as large.
> > - The weights are $w = 1/4$ in years 1–2 and $w = 1$ elsewhere.
> > - The cell's standard deviation rises from $\sqrt{100 \times 40{,}000} = 2{,}000$ to $\sqrt{4 \times 100 \times 40{,}000} = 4{,}000$.
> > - Its deviance contribution is $d = 2[46{,}000\ln(46{,}000/40{,}000) - 6{,}000] = 858.1$.
> > - Standardized by $\hat\phi$ alone the residual is $\sqrt{858.1/100} = 2.93$, which looks like an outlier.
> > - Standardized by the cell's own dispersion $\hat\phi/w = 400$ it is $\sqrt{858.1/400} = 1.46$, an ordinary value.

## Deviance residuals in the bootstrap

The semi-parametric bootstrap may resample Pearson, deviance or any residual whose inverse exists. Because deviance residuals are asymptotically normal, a parametric bootstrap in Shibata's sense can replace resampling the actual residuals with draws from a normal distribution ([[GLM Loss Reserving]]).
