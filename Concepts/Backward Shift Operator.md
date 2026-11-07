---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-ts
  content_hash: sha256:409329188b1de54bef2bb85e956095850b081752665458757325804e78595ab1
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 9, §9.1 unit-root tests, §9.2 Backshift notation, §9.3 AR(1) as MA(∞), §9.5 ARIMA in backshift form (eq. 9.2), roots outside unit circle, ACF/PACF patterns for AR/MA identification, §9.8 forecasting steps and prediction intervals, read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/backshift.html"
    - "Shumway & Stoffer, Time Series Analysis and Its Applications Using R, EZ Edition (CC BY-NC 4.0, version 2016.12.30), Property 1.2 (PDF p.24: white-noise sample ACF approx N(0,1/n), ±2/√n), §1.5 CCF Def. 1.5/1.11, §3.2 eqs (3.3), (3.9), (3.13) (PDF pp.57-61: φ(B)x_t = θ(B)w_t), §3.7 overdifferencing (PDF p.88), §3.9 Regression with Autocorrelated Errors (PDF pp.94-96), §5.2 Unit Root Testing (PDF p.161: DF null H0: φ = 1), sha256:a0fd39387167c0c6b618f4bd853e99782e418ba4679b42542a4fb664b4aa463d — http://www.math-evry.cnrs.fr/_media/members/aguilloux/enseignements/timeseries_light_free.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Backward Shift Operator.md
---

The **Backward Shift Operator** $\mathbf{B}$ is the operator that maps each value of a [[Time Series|time series]] to the value one period earlier, $\mathbf{B}x_t = x_{t-1}$. Applied $k$ times, it is

> $$\mathbf{B}^k x_t = x_{t-k}$$

$\mathbf{B}$ is linear, it leaves a constant unchanged, and its powers add, $\mathbf{B}^j\mathbf{B}^k = \mathbf{B}^{j+k}$. Polynomials in $\mathbf{B}$ therefore multiply like ordinary polynomials. The first [[Differencing|difference]] is $\nabla = 1 - \mathbf{B}$.

> [!example]- What is $(1 - 0.5\mathbf{B})(1 - \mathbf{B})x_t$ written out in terms of $x_t$? {Example}
> - The polynomials multiply to $1 - 1.5\mathbf{B} + 0.5\mathbf{B}^2$.
> - Applied to $x_t$, this is $x_t - 1.5x_{t-1} + 0.5x_{t-2}$.

## An ARMA model in operator form

An [[ARIMA|ARMA]]($p$, $q$) model is written in $\mathbf{B}$ by moving every autoregressive term to the left side:

> $$\alpha(\mathbf{B})\,x_t = \beta(\mathbf{B})\,w_t$$

- $\alpha(\mathbf{B}) = 1 - \alpha_1\mathbf{B} - \cdots - \alpha_p\mathbf{B}^p$ is the [[Autoregressive Model|autoregressive]] polynomial.
- $\beta(\mathbf{B}) = 1 + \beta_1\mathbf{B} + \cdots + \beta_q\mathbf{B}^q$ is the [[Moving Average Model|moving average]] polynomial.
- $\{w_t\}$ is [[White Noise|white noise]].

> [!example]- A model is $x_t = 1.5x_{t-1} - 0.5x_{t-2} + w_t - 0.3w_{t-1}$. What are its polynomials in $\mathbf{B}$? {Example}
> - Moving the autoregressive terms to the left gives $x_t - 1.5x_{t-1} + 0.5x_{t-2} = w_t - 0.3w_{t-1}$.
> - The autoregressive polynomial is $\alpha(\mathbf{B}) = 1 - 1.5\mathbf{B} + 0.5\mathbf{B}^2$.
> - The moving average polynomial is $\beta(\mathbf{B}) = 1 - 0.3\mathbf{B}$.

## Stationarity and invertibility

Treating $\mathbf{B}$ as a number, the model is [[Stationarity|stationary]] when every root of $\alpha(\mathbf{B}) = 0$ is greater than 1 in absolute value. The same test on $\beta(\mathbf{B}) = 0$ checks invertibility. A factor $1 - c\mathbf{B}$ has the root $1/c$, and a factor $1 - \mathbf{B}$, with the root 1, is a unit root that one difference removes.

> [!example]- Is $(1 - 1.5\mathbf{B} + 0.5\mathbf{B}^2)\,x_t = (1 - 0.3\mathbf{B})\,w_t$ stationary and invertible, and what model is it? {Example}
> - The autoregressive polynomial factors as $(1 - 0.5\mathbf{B})(1 - \mathbf{B})$, with roots $2$ and $1$.
> - The root at $1$ is a unit root, so the series is not stationary. Its first difference satisfies $(1 - 0.5\mathbf{B})\nabla x_t = (1 - 0.3\mathbf{B})w_t$.
> - The remaining root $2$ is greater than 1, so the differences are stationary.
> - The moving average root is $1/0.3 = 3.33$, greater than 1, so the model is invertible.
> - The model is ARIMA$(1, 1, 1)$.

## Forecasting from operator form

To forecast, the operator form is expanded back into an equation for $x_t$, shifted forward, and each future white noise term is set to zero.

> [!example]- A series follows $(1 - 0.6\mathbf{B})(1 - \mathbf{B})\,x_t = (1 + 0.3\mathbf{B})\,w_t$, with $x_t = 120$, $x_{t-1} = 115$ and the latest residual $2$. What is the forecast of $x_{t+1}$? {Example}
> - The left side expands to $1 - 1.6\mathbf{B} + 0.6\mathbf{B}^2$, so $x_t = 1.6x_{t-1} - 0.6x_{t-2} + w_t + 0.3w_{t-1}$.
> - Shifted forward one period, with $w_{t+1}$ set to zero, the forecast is $1.6(120) - 0.6(115) + 0.3(2)$.
> - That is $192 - 69 + 0.6 = 123.6$.
