---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:8d2ae48d438f7eb914ddf626aa29bbcddec3b799d9004aae6494c5afaed54c31
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.2 §2.8 Autocorrelation (r_k formula, trend and seasonal ACF patterns), §2.9 White noise (bounds ±1.96/√T), read 2026-10-18, sha256:a13a2a978731e95537586c671e4b4edda0fbb1711e81a1f01e2c2b967f4212b7 — https://otexts.com/fpp3/graphics.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.5 ACF/PACF identification, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.6 Box-Jenkins Model Identification, sha256:f6bec26320777b285bb8a39e47608912daa869d9303a23d4d47dc3f5678e8ee7 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc446.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Autocorrelation Function.md
---

The **autocorrelation function (ACF)** gives the correlation between a [[Time Series]] and itself $k$ periods earlier. Plotted against $k$ — the **correlogram** — it is the primary tool for identifying the MA order of an [[ARIMA]] model and for checking residuals.

> $$\rho_k = \frac{\gamma_k}{\gamma_0} = \frac{\mathrm{Cov}(Y_t, Y_{t+k})}{\mathrm{Var}(Y_t)}$$
>
> $$\hat{\rho}_k = \frac{\sum_{t=1}^{n-k}(y_t - \bar{y})(y_{t+k} - \bar{y})}{\sum_{t=1}^{n}(y_t - \bar{y})^{2}}$$

- $\rho_0 = 1$ always, and $\rho_k = \rho_{-k}$, so only positive lags are plotted
- **Significance bands** are $\pm 1.96/\sqrt{n}$; a spike inside them is indistinguishable from zero
- **The identification rule:** an MA($q$) process has $\rho_k = 0$ for $k > q$ — the ACF **cuts off** after lag $q$. An AR($p$) process has an ACF that **tails off** geometrically
- Slow, near-linear decay signals non-stationarity and calls for [[Differencing]]; a spike at lag $s$ and its multiples signals [[Seasonality]]
- On residuals it is the [[White Noise]] check: all spikes inside the bands means the model has extracted the structure
- The companion [[Partial Autocorrelation Function]] does the reverse job, cutting off for AR and tailing off for MA
- For two series, the [[Cross-Correlation]] function correlates one with the other shifted by $k$ periods; with the same series twice it is the ACF

![[Media/Figures/Autocorrelation_Function.svg|340]]

> [!example]- Identifying a Model from the ACF {Example}
> A differenced series of 144 monthly observations has $\hat\rho_1 = -0.52$, $\hat\rho_2 = 0.06$, $\hat\rho_3 = -0.04$, $\hat\rho_4 = 0.09$, with the PACF tailing off. What model does this suggest?
>
> > [!answer]-
> > Bands: $\pm 1.96/\sqrt{144} = \pm 0.163$. Only $\hat\rho_1$ clears them; lags 2–4 are all inside.
> > ACF **cuts off after lag 1**, PACF **tails off** → **MA(1)** on the differenced series, i.e. **ARIMA(0, 1, 1)**.
