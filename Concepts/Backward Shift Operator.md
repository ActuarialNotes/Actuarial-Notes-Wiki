---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:568b4e65afdbc6a2c1812df3ee3fbbc0f8309fcab720e5f953ea5323fd1a4482
  sources: []
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

- $\phi(B) = 1 - \phi_1 B - \cdots - \phi_p B^p$ is the AR polynomial and $\theta(B) = 1 + \theta_1 B + \cdots + \theta_q B^q$ the MA polynomial. $\varepsilon_t$ is [[White Noise|white noise]] and $d$ the number of differences, which together make the [[ARIMA]]$(p, d, q)$ model. Cowpertwait writes the same model as $\theta_p(B)x_t = \phi_q(B)w_t$, with $\alpha_i$ for the AR coefficients and $\beta_j$ for the MA ones. The letters are swapped relative to this vault's Box–Jenkins notation, so check which polynomial sits on which side.
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
