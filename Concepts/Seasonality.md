**Seasonality** is a pattern in a [[Time Series]] that repeats at a fixed, known period $s$ — 4 for quarterly data, 12 for monthly, 7 for daily. It is distinct from a cycle, whose length is not fixed.

> $$Y_t = m_t + s_t + z_t \quad \text{with } s_t = s_{t+s} \text{ and } \sum_{j=1}^{s}s_j = 0$$
>
> $$\text{seasonal ARIMA: } (p,d,q)\times(P,D,Q)_s$$

- **Additive** seasonality adds a fixed amount each period; **multiplicative** scales the level, so it grows with the trend. A log transform turns the second into the first
- Signature on the [[Autocorrelation Function|ACF]]: significant spikes at lags $s, 2s, 3s, \dots$ that do not die away
- **Handling it:** seasonal [[Differencing]] $\nabla_s Y_t = Y_t - Y_{t-s}$ removes a stochastic seasonal pattern; seasonal dummies or a sine/cosine pair in a regression remove a deterministic one
- A seasonal ARIMA multiplies the seasonal and non-seasonal polynomials, so it models within-period and across-period dependence at once
- Actuarial cases: winter freeze losses, quarterly reporting lags, the seasonal pattern in the reporting of accident-year claims

![[Media/Figures/Seasonality.svg|340]]

> [!example]- Additive or Multiplicative? {Example}
> Quarterly claim counts show a Q1 excess over the yearly average of +180 in year 1 (average 900), +310 in year 5 (average 1,550) and +420 in year 9 (average 2,100). Which form of seasonality, and what transform helps?
>
> > [!answer]-
> > As a share of the level: $180/900 = 20\%$, $310/1550 = 20\%$, $420/2100 = 20\%$ — constant in **proportional** terms, growing in absolute terms.
> > **Multiplicative.** Fit on $\log Y_t$, where the Q1 effect becomes a constant $\log(1.20) = 0.182$ addition and an additive seasonal model applies. Modelling the raw series additively would under-fit the early years and over-fit the late ones.
