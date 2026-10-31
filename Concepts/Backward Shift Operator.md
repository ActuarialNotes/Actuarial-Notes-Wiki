---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:checker-ts
  content_hash: sha256:cc50c52f1ef6675afe5ed4c4dd32e00f3bc595b86a7a1f2a1eeffe92f4e4c750
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 9, §9.1 unit-root tests, §9.2 Backshift notation, §9.3 AR(1) as MA(∞), §9.5 ARIMA in backshift form (eq. 9.2), roots outside unit circle, ACF/PACF patterns for AR/MA identification, §9.8 forecasting steps and prediction intervals, read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/backshift.html"
    - "Shumway & Stoffer, Time Series Analysis and Its Applications Using R, EZ Edition (CC BY-NC 4.0, version 2016.12.30), Property 1.2 (PDF p.24: white-noise sample ACF approx N(0,1/n), ±2/√n), §1.5 CCF Def. 1.5/1.11, §3.2 eqs (3.3), (3.9), (3.13) (PDF pp.57-61: φ(B)x_t = θ(B)w_t), §3.7 overdifferencing (PDF p.88), §3.9 Regression with Autocorrelated Errors (PDF pp.94-96), §5.2 Unit Root Testing (PDF p.161: DF null H0: φ = 1), sha256:a0fd39387167c0c6b618f4bd853e99782e418ba4679b42542a4fb664b4aa463d — http://www.math-evry.cnrs.fr/_media/members/aguilloux/enseignements/timeseries_light_free.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Backward Shift Operator.md
---

**The backward shift operator** $B$ (also called the backshift or lag operator) maps a value of a [[Time Series]] to the value one period earlier, $Bx_t = x_{t-1}$. Writing a model as polynomials in $B$ turns the [[Autoregressive Model|autoregressive]] and [[Moving Average Model|moving average]] relationships between current and past values into algebra that can be expanded, factored and solved.

> $$B^{k}x_t = x_{t-k}$$
>
> $$\nabla x_t = x_t - x_{t-1} = (1 - B)\,x_t$$
>
> $$\phi(B)\,(1 - B)^{d}\,x_t = \theta(B)\,\varepsilon_t$$

- $\phi(B) = 1 - \phi_1 B - \cdots - \phi_p B^p$ is the AR polynomial and $\theta(B) = 1 + \theta_1 B + \cdots + \theta_q B^q$ the MA polynomial. $\varepsilon_t$ is [[White Noise|white noise]] and $d$ the number of differences, which together make the [[ARIMA]]$(p, d, q)$ model. Some texts write the white noise as $w_t$ rather than $\varepsilon_t$, as in Shumway and Stoffer's $\phi(B)\,x_t = \theta(B)\,w_t$; the polynomials are the same.
- **Rules.** $B$ is linear, leaves a constant unchanged ($Bc = c$), and its powers add: $B^jB^k = B^{j+k}$. Operator polynomials therefore multiply like ordinary polynomials, e.g. $(1 - 0.5B)(1 - B) = 1 - 1.5B + 0.5B^2$.
- **Differencing.** [[Differencing]] is $\nabla = 1 - B$, repeated as $\nabla^d = (1 - B)^d$. The seasonal difference is $\nabla_s = 1 - B^s$, with $s = 4$ for quarterly and $s = 12$ for monthly data. A factor $(1 - B)$ inside an AR polynomial is a **unit root**: factor it out and it becomes the "I" in ARIMA.
- **Stationarity and invertibility.** Treat $B$ as a number and solve $\phi(B) = 0$. The model is [[Stationarity|stationary]] when every root exceeds $1$ in absolute value. The same test on $\theta(B) = 0$ checks invertibility. A root at exactly $B = 1$ is the unit root of a [[Random Walk]].
- **Inverting an operator.** For $\lvert\phi\rvert < 1$, $(1 - \phi B)^{-1} = 1 + \phi B + \phi^2B^2 + \cdots$, so an AR(1) is an MA($\infty$) with weights $\psi_j = \phi^j$. These $\psi$ weights set the width of a [[Prediction Interval|prediction interval]].

> [!example]- Identifying an ARIMA Model from an Expanded Equation {Example}
> A quarterly claim-severity index is modelled as
> $$x_t = 1.5x_{t-1} - 0.5x_{t-2} + \varepsilon_t - 0.3\varepsilon_{t-1}$$
> Identify $p$, $d$ and $q$, and check the remaining ARMA part for stationarity and invertibility.
>
> > [!answer]-
> > Collect the $x$ terms on the left and write both sides in $B$:
> > $$
> > \begin{align*}
> > (1 - 1.5B + 0.5B^{2})\,x_t &= (1 - 0.3B)\,\varepsilon_t \\
> > (1 - 0.5B)(1 - B)\,x_t &= (1 - 0.3B)\,\varepsilon_t
> > \end{align*}
> > $$
> > The AR polynomial has roots $B = 1$ and $B = 2$. The root at $1$ is a unit root, so difference once: $(1 - 0.5B)\nabla x_t = (1 - 0.3B)\varepsilon_t$.
> >
> > The remaining AR root $B = 2$ exceeds $1$, so the differenced series is stationary. The MA root $B = 1/0.3 = 3.33$ exceeds $1$, so it is invertible.
> >
> > **ARIMA(1, 1, 1)** with $\phi_1 = 0.5$ and $\theta_1 = -0.3$. The index itself wanders, but its quarterly changes follow a stationary ARMA(1, 1).

> [!example]- One-Step Forecast from Operator Form {Example}
> Monthly reported claim counts follow $(1 - 0.6B)(1 - B)\,x_t = (1 + 0.3B)\,\varepsilon_t$. The latest values are $x_t = 120$ and $x_{t-1} = 115$, and the latest residual is $\hat\varepsilon_t = 2$. Forecast $x_{t+1}$.
>
> > [!answer]-
> > Expand the left side, $(1 - 0.6B)(1 - B) = 1 - 1.6B + 0.6B^2$, and solve for $x_t$:
> > $$x_t = 1.6x_{t-1} - 0.6x_{t-2} + \varepsilon_t + 0.3\varepsilon_{t-1}$$
> > Shift forward one period and set the unknown future shock $\varepsilon_{t+1}$ to $0$:
> > $$
> > \begin{align*}
> > \hat{x}_{t+1} &= 1.6(120) - 0.6(115) + 0.3(2) \\
> > &= 192 - 69 + 0.6 \\
> > &= 123.6
> > \end{align*}
> > $$
> > Read on the differenced scale: last month's change of $+5$ carries forward at $\phi = 0.6$ (giving $+3$), plus $0.3 \times 2 = 0.6$ from the MA term. That is $120 + 3.6 = 123.6$ claims.
