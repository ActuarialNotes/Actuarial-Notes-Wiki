---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:1de157e986f8fb3ff2c5c374b70201ea7cb80837ace1fdd26aa097ee31b14591
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.9 §9.1 (differencing), §9.2 (backshift), §9.3-9.5 (AR, MA, ARIMA definition, Table 9.1 special cases, ACF/PACF identification), §9.9 (seasonal ARIMA), read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.6 Box-Jenkins Model Identification, sha256:f6bec26320777b285bb8a39e47608912daa869d9303a23d4d47dc3f5678e8ee7 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc446.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/ARIMA.md
---

An **ARIMA$(p, d, q)$** model (Autoregressive Integrated Moving Average) is the standard parametric framework for [[Time Series]] modeling. It combines **autoregressive (AR)**, **integrated (I)** (differencing for stationarity), and **moving average (MA)** components.

> $$\phi(B)\nabla^d Y_t = \theta(B)\varepsilon_t$$
>
> $$\phi(B) = 1 - \phi_1 B - \cdots - \phi_p B^p$$
>
> $$\theta(B) = 1 + \theta_1 B + \cdots + \theta_q B^q$$
>
> $$\varepsilon_t \stackrel{\text{iid}}{\sim} N(0, \sigma^2)$$
>
> $$B Y_t = Y_{t-1} \text{ (backshift operator)}$$

**Components:**

| Parameter | Meaning |
| :--- | :--- |
| $p$ | Order of autoregressive component — uses $p$ lags of $Y_t$ |
| $d$ | Degree of differencing — applied $d$ times to achieve stationarity |
| $q$ | Order of moving average component — uses $q$ lags of the error $\varepsilon_t$ |

**Special cases:**

| Model | Meaning |
| :--- | :--- |
| ARIMA$(p,0,0)$ | Pure AR$(p)$: $Y_t = \phi_1 Y_{t-1} + \cdots + \phi_p Y_{t-p} + \varepsilon_t$ |
| ARIMA$(0,0,q)$ | Pure MA$(q)$: $Y_t = \varepsilon_t + \theta_1\varepsilon_{t-1} + \cdots + \theta_q\varepsilon_{t-q}$ |
| ARIMA$(0,1,0)$ | Random walk: $Y_t = Y_{t-1} + \varepsilon_t$ |

**Model identification using ACF/PACF:**
- AR$(p)$: ACF tails off, PACF cuts off after lag $p$
- MA$(q)$: ACF cuts off after lag $q$, PACF tails off
- ARMA: both tail off

**Seasonal ARIMA$(p,d,q)(P,D,Q)_s$** adds seasonal AR, differencing, and MA terms at lag $s$.

![[Media/Figures/ARIMA.svg|340]]

> [!example]- AR(1) Forecast {Example}
> An AR(1) model is fitted: $Y_t = 10 + 0.7 Y_{t-1} + \varepsilon_t$. The most recent observation is $Y_{100} = 15$. Compute the one-step-ahead forecast $\hat{Y}_{101}$.
>
> > [!answer]-
> > $$\hat{Y}_{101} = 10 + 0.7(15) = 10 + 10.5 = 20.5$$

> [!example]- Identifying an ARIMA Model from ACF/PACF {Example}
> After first-differencing an insurance loss series, the ACF shows a significant spike at lag 1 and cuts off, while the PACF tails off gradually. What ARIMA model is suggested?
>
> > [!answer]-
> > ACF cuts off after lag 1 → MA(1). PACF tails off → no pure AR. $d = 1$ (one difference was needed). The identified model is **ARIMA$(0, 1, 1)$**.
