---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3ec25059c13ce222149c8d0126222b402a0ab7ef227c210d1d48355277e4fc97
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deviance Residual.md
---

**The standardized deviance residual** is the signed square root of one observation's contribution to a [[Generalized Linear Model|GLM]]'s [[Deviance|deviance]], after that contribution is divided by the estimated [[Dispersion Parameter|dispersion parameter]]. [[Stochastic Loss Reserving Using Generalized Linear Models (Taylor and McGuire - 2016)|Taylor and McGuire (2016)]] use it for every residual diagnostic of a reserving model, because it is much closer to normal than the [[Pearson Residual|Pearson residual]].

> $$R_i^D = \operatorname{sgn}(Y_i - \hat Y_i)\left(\frac{d_i}{\hat\phi}\right)^{1/2}$$

> $$d_i = 2\left[Y_i\ln\frac{Y_i}{\hat Y_i} - (Y_i - \hat Y_i)\right]$$

- $d_i$ is observation $i$'s contribution to the unscaled deviance $D^* = \sum_i d_i$, and $\hat\phi = D^*/(n - p)$. The second line is $d_i$ for the over-dispersed Poisson, from its log-density $[y\ln\mu - \mu]/\phi$ compared with the saturated fit $\mu = y$ (with $y\ln y = 0$ at $y = 0$). See [[Residual]] for the unstandardized version.
- **Why not Pearson.** The Pearson residual $(Y_i - \hat Y_i)/\hat\sigma_i$ is a linear transform of the observation, so it reproduces any skewness in the data. Pierce and Schafer (1986) showed that deviance residuals are normal up to an error of order $m^{-1/2}$. Taylor and McGuire's histograms from a gamma model of bodily injury claims (CoV $1.16$) show highly skewed Pearson residuals and nearly normal deviance residuals.
- **What to look for.** Plotted against accident, development and calendar period or the fitted value, the residuals should scatter evenly about zero with constant spread. A trend means the cell means are wrong, such as a missing effect. Fanning means the dispersion assumption is wrong, the [[Heteroscedasticity|heteroscedasticity]] a spread plot measures: the standard deviation of standardized residuals should vary randomly about $1$. The cure is weights roughly inversely proportional to the residuals' variance (see [[Residual Plot]]).
- **Checking the distribution.** A [[QQ Plot|Q-Q plot]] needs observations from one distribution, which raw GLM observations with different means are not. Standardized deviance residuals are asymptotically $N(0,1)$, so they are plotted against standard normal quantiles, alongside a histogram and the [[PP Plot|P-P plot]].
- **In the bootstrap.** The semi-parametric bootstrap may resample Pearson, deviance or any residual whose inverse exists. Because deviance residuals are asymptotically normal, a parametric bootstrap in Shibata's sense can replace resampling the actual residuals with draws from a normal distribution (see [[GLM Loss Reserving]]).

> [!example]- Pearson and Deviance Residuals for Two ODP Cells {Example}
> An over-dispersed Poisson reserving GLM has $\hat\phi = 50$. Two cells each have a fitted value of $400$ (\$000); one came in at $520$ and the other at $280$.
>
> Compute the standardized Pearson and deviance residuals for each.
>
> > [!answer]-
> > Under the ODP, $\hat\sigma = \sqrt{\hat\phi\,\hat Y} = \sqrt{50 \times 400} = 141.42$, so the Pearson residuals are $\pm 120/141.42 = \pm 0.849$.
> >
> > $$
> > \begin{align*}
> > d_{520} &= 2\left[520\ln\frac{520}{400} - 120\right] \\
> > &= 32.859 \\
> > R^D_{520} &= +\sqrt{32.859/50} \\
> > &= 0.811 \\
> > d_{280} &= 2\left[280\ln\frac{280}{400} + 120\right] \\
> > &= 40.262 \\
> > R^D_{280} &= -\sqrt{40.262/50} \\
> > &= -0.897
> > \end{align*}
> > $$
> >
> > The Pearson residuals are symmetric because they are linear in $Y$. The deviance residuals are not: the ODP is right-skewed, so a shortfall of $120$ is less likely than an excess of $120$, and the deviance residual marks it as the more extreme outcome.

> [!example]- From a Spread Plot to Weights {Example}
> In a spread plot of standardized deviance residuals by development year, the standard deviation is about $1.6$ in development years 1–2 and about $0.8$ in later years. After the refit below, $\hat\phi = 100$. A development-year-1 cell has fitted value $40{,}000$ and actual $46{,}000$.
>
> Set weights to remove the heteroscedasticity, and show the effect on this cell's variance and standardized residual.
>
> > [!answer]-
> > The standard deviation is twice as large in years 1–2, so their dispersion is about $2^2 = 4$ times as large. Since $\phi_i = \phi/w_i$, set $w = 1/4$ in years 1–2 and $w = 1$ elsewhere.
> >
> > $$
> > \begin{align*}
> > \mathrm{SD}_{w = 1} &= \sqrt{100 \times 40{,}000} \\
> > &= 2{,}000 \\
> > \mathrm{SD}_{w = 1/4} &= \sqrt{4 \times 100 \times 40{,}000} \\
> > &= 4{,}000 \\
> > d &= 2\left[46{,}000\ln\frac{46{,}000}{40{,}000} - 6{,}000\right] \\
> > &= 858.1
> > \end{align*}
> > $$
> >
> > Standardized by $\hat\phi$ alone the residual is $\sqrt{858.1/100} = 2.93$, which looks like an outlier. Standardized by the cell's own dispersion $\hat\phi/w = 400$ it is $\sqrt{858.1/400} = 1.46$, an ordinary value. The weights put the early years' residuals back on the same unit spread as the rest, and they also give those cells the larger process variance they really have.
