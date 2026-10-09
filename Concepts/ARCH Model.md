---
aliases:
  - Autoregressive Conditionally Heteroskedastic
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a6549a3f73ae7b0bc54f6838bf0277dd187e16198e0474ad211b4c2b49bcec62
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/ARCH Model.md
---
An **ARCH model** (autoregressive conditionally heteroskedastic model) lets the variance of the error term in a [[Time Series|time series]] model change over time: the variance of today's shock, given the past, is a linear function of the squares of recent shocks. It describes **volatility clustering**, the tendency of financial returns to have large moves, of either sign, followed by more large moves and quiet periods followed by quiet periods. The **GARCH** model generalizes it by adding past conditional variances to the equation; Frees (Regression Modeling with Actuarial and Financial Applications, Chapter 9) treats both.

> $$\sigma_t^2 = \mathrm{Var}\left(\varepsilon_t \mid \varepsilon_{t-1}, \varepsilon_{t-2}, \ldots\right)$$

> $$\sigma_t^2 = \omega + \gamma_1\varepsilon_{t-1}^2 + \cdots + \gamma_p\varepsilon_{t-p}^2$$

> $$\sigma_t^2 = \omega + \sum_{j=1}^{p}\gamma_j\varepsilon_{t-j}^2 + \sum_{j=1}^{q}\delta_j\sigma_{t-j}^2$$

> $$\mathrm{Var}(\varepsilon_t) = \frac{\omega}{1 - \sum_{j}\gamma_j - \sum_{j}\delta_j}$$

- **Symbols:** $\varepsilon_t$ is the shock in the mean model at time $t$, such as a return less its mean, or the error of an [[Autoregressive Model|autoregressive model]] or a regression. $\sigma_t^2$ is its conditional variance. The second block is ARCH($p$), the third is GARCH($p$, $q$), and the fourth is the unconditional variance (for ARCH, every $\delta_j = 0$). The conditions $\omega > 0$, $\gamma_j \geq 0$ and $\delta_j \geq 0$ keep every conditional variance positive.
- **Volatility clustering:** The shocks $\varepsilon_t$ are uncorrelated, so their [[Autocorrelation Function|autocorrelation function]] looks like that of [[White Noise|white noise]], but their squares are positively autocorrelated, because a large $\varepsilon_{t-1}^2$ raises $\sigma_t^2$. Significant autocorrelation in the squared residuals of a fitted mean model is the sign that an ARCH term is needed. Even with normal shocks, the unconditional distribution has fatter tails than the normal.
- **Stationarity:** The process is weakly [[Stationarity|stationary]] when $\sum\gamma_j + \sum\delta_j < 1$, and its unconditional variance is then the fourth block. The variance is therefore constant over the long run and changes only conditionally, from period to period. A sum close to 1 means that a burst of volatility dies away slowly.
- **Forecasting:** ARCH changes the width of a forecast interval, not its centre: the point forecast comes from the mean model, and the interval uses the forecast of $\sigma_{t+1}$ rather than a constant [[Variance and Standard Deviation|standard deviation]]. For GARCH(1, 1) the gap between the forecast variance and the long-run variance shrinks by the factor $\gamma_1 + \delta_1$ each period ahead. This is why a GARCH-type model of equity returns gives wider intervals after a turbulent period than a constant-[[Volatility|volatility]] model does (see [[Time Series Forecast]]).

> [!example]- Forecast Interval for a Monthly Equity Return {Example}
> The monthly return on an insurer's equity portfolio follows $y_t = 0.008 + \varepsilon_t$, with ARCH(1) errors $\sigma_t^2 = 0.001 + 0.30\,\varepsilon_{t-1}^2$. Last month's return was $-9.2\%$. Find the forecast standard deviation of next month's return and a 95% forecast interval, and compare them with the interval that uses the unconditional variance.
>
> > [!answer]-
> > Last month's shock is the return less its mean, $\varepsilon_{t-1} = -0.092 - 0.008 = -0.100$.
> > $$
> > \begin{align*}
> > \sigma_t^2 &= 0.001 + 0.30(-0.100)^2 \\
> > &= 0.001 + 0.003 \\
> > &= 0.004 \\
> > \sigma_t &= 0.0632
> > \end{align*}
> > $$
> > The 95% interval is $0.008 \pm 1.96(0.0632) = 0.008 \pm 0.124$, or $-11.6\%$ to $13.2\%$. The unconditional variance is $0.001/(1 - 0.30) = 0.001429$, a standard deviation of $0.0378$, which gives $0.008 \pm 0.074$, or $-6.6\%$ to $8.2\%$. After a large loss the model widens next month's interval by about two-thirds, while the point forecast stays at $0.8\%$.

> [!example]- Persistence of a GARCH(1, 1) Shock {Example}
> Monthly returns on a balanced fund have GARCH(1, 1) errors with $\omega = 0.00001$, $\gamma_1 = 0.08$ and $\delta_1 = 0.90$. Last month's conditional variance was $0.0009$ and its shock was $0.05$. Check that the process is stationary, find its long-run variance, and forecast next month's conditional variance.
>
> > [!answer]-
> > The process is stationary because $\gamma_1 + \delta_1 = 0.98 < 1$.
> > $$
> > \begin{align*}
> > \mathrm{Var}(\varepsilon_t) &= \frac{0.00001}{1 - 0.98} \\
> > &= 0.0005 \\
> > \sigma_t^2 &= 0.00001 + 0.08(0.05)^2 + 0.90(0.0009) \\
> > &= 0.00001 + 0.0002 + 0.00081 \\
> > &= 0.00102
> > \end{align*}
> > $$
> > The forecast standard deviation is $\sqrt{0.00102} = 3.19\%$, against a long-run $\sqrt{0.0005} = 2.24\%$. Most of the forecast comes from last month's high variance through $\delta_1$, not from the shock itself. With persistence of 0.98, the excess over the long-run variance shrinks by only 2% a month, so it takes about 34 months to halve.

> [!tip]- How it appears on the exam
> - **SRM** asks candidates to describe autoregressive conditionally heteroskedastic models alongside exponential smoothing and autoregressive models. Multiple-choice statements test what volatility clustering is, which variance changes over time (the conditional one), and the stationarity condition.
> - **Calculations:** A question gives fitted ARCH or GARCH coefficients and recent shocks, then asks for the next conditional variance, the long-run variance, or a forecast interval, under SRM's objective on predicted values and confidence intervals.
> - **Choosing the model:** A question may show residuals whose ACF is flat while the ACF of their squares is not, and ask which model addresses it.

> [!warning]- Exam traps
> - **Shock, not return:** The equation uses $\varepsilon_{t-1}^2$, the squared deviation from the mean model. Squaring the return itself, $y_{t-1}^2$, is wrong whenever the mean is not zero.
> - **Conditional or unconditional:** An ARCH process is heteroskedastic only conditionally. Its unconditional variance is constant when it is stationary, so "ARCH implies non-stationarity" is false.
> - **The stationarity condition:** It is the sum of all the $\gamma_j$ and $\delta_j$ that must be below 1, not each coefficient separately. The long-run variance has $\omega$ in the numerator and $1 - \sum\gamma_j - \sum\delta_j$ in the denominator.
> - **Two inputs in GARCH:** $\gamma_1$ multiplies last period's squared shock and $\delta_1$ multiplies last period's conditional variance. Swapping them, or putting last period's squared shock in both places, gives the wrong forecast.
> - **Variance, then standard deviation:** A forecast interval uses $\sigma_{t+1}$, the square root of the forecast variance. Multiplying 1.96 by the variance understates the interval badly.
