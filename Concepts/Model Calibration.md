---
aliases:
  - Observed Price
  - Traded Security
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c9dfd07250c3dff7a9ed1013ab8d30f3393e867c57ad596421b0c822eba999cd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Calibration.md
---
**Model calibration** is choosing a pricing model's parameters so that the prices the model gives to liquid traded securities match their observed market prices, before the model is used to value or hedge something that does not trade. An interest rate model is calibrated to the [[Yield Curve|yield curve]] and to cap or swaption prices; an equity model is calibrated to option prices across strikes and maturities, which is where the [[Volatility Smile|volatility smile]] enters.

> $$\hat\theta = \arg\min_{\theta}\ \sum_{i=1}^{n} w_i\left(V_i^{\text{model}}(\theta) - V_i^{\text{mkt}}\right)^2$$

> $$\text{Ho-Lee:}\quad dr = \theta(t)\,dt + \sigma\,dz$$

> $$\theta(t) = F_t(0, t) + \sigma^2 t$$

> $$\text{Hull-White:}\quad dr = \big(\theta(t) - a\,r\big)\,dt + \sigma\,dz$$

> $$\theta(t) = F_t(0,t) + aF(0,t) + \frac{\sigma^2}{2a}\left(1 - e^{-2at}\right)$$

- **Symbols:** $\theta$ in the first block is the vector of model parameters, $V_i^{\text{mkt}}$ is the observed price of calibration instrument $i$, $V_i^{\text{model}}(\theta)$ is the model's price for it, and $w_i$ is a weight, often the inverse of the bid-ask spread or of the instrument's vega. In the short-rate models, $F(0,t)$ is the instantaneous [[Forward Rate|forward rate]] for time $t$ read from today's curve, $F_t$ is its slope in $t$, $a$ is the speed of mean reversion and $\sigma$ the rate volatility.
- **Exact fit and best fit:** A no-arbitrage short-rate model has a function $\theta(t)$ chosen so that every zero-coupon bond price on today's curve is reproduced exactly. An equilibrium model such as Vasicek or CIR has a constant long-run level, so it can match only a few points of the curve and fits the rest by least squares. Pricing an [[Embedded Option|embedded option]] or a bond option off a model that misprices the underlying bonds builds the error into the option value.
- **Two stages:** The curve fixes the drift, $\theta(t)$, and it says nothing about volatility. The volatility parameters $a$ and $\sigma$ are then fitted to option prices, such as caps, floors or [[Swaption|swaptions]], usually quoted as Black implied volatilities. Caplets depend on one forward rate at a time, while swaptions depend on how the rates move together, so the choice of calibration set should match the exposure being valued.
- **Risk-neutral and real-world calibration:** A market-consistent calibration targets today's prices and is used for valuation and hedging. A real-world calibration, used in an [[Economic Scenario Generator|economic scenario generator]] for projections and capital, targets historical behaviour such as the long-run level, the spread of rates and the frequency of inversions. The two give different parameters for the same model, and using one where the other is needed is a common error.
- **Over-fitting and stability:** A model with as many parameters as instruments fits them exactly, but the fitted values can jump from one day to the next and imply implausible dynamics. That makes hedge ratios unstable and the hedges expensive to rebalance. Penalizing roughness in $\theta(t)$, fitting fewer and more liquid instruments, and checking out-of-sample prices guard against [[Overfitting|over-fitting]].
- **Model risk:** A model that fits every calibration price can still misprice an exotic payoff whose value depends on what the calibration did not pin down, such as the forward smile or the correlation between rates. This is the [[Model Risk|model risk]] that [[Model Validation|model validation]] checks.

> [!example]- Fitting the Ho-Lee Drift to Two Zero-Coupon Bonds {Example}
> In the Ho-Lee model $dr = \theta(t)\,dt + 0.01\,dz$, take $\theta(t)$ to be $\theta_1$ on $[0, 1)$ and $\theta_2$ on $[1, 2)$. The short rate is $r_0 = 0.025$. Zero-coupon bonds trade at continuously compounded yields of $3.0\%$ for one year and $3.6\%$ for two years. Under Ho-Lee, $-\ln P(0,T) = r_0T + \int_0^T \theta(s)(T - s)\,ds - \sigma^2T^3/6$. Calibrate $\theta_1$ and $\theta_2$.
>
> > [!answer]-
> > For $T = 1$, $\int_0^1 \theta_1(1 - s)\,ds = \theta_1/2$, and the variance term is $\sigma^2/6 = 0.0000167$.
> > $$
> > \begin{align*}
> > 0.030 &= 0.025 + \tfrac12\theta_1 - 0.0000167 \\
> > \theta_1 &= 2(0.0050167) \\
> > &= 0.010033
> > \end{align*}
> > $$
> > For $T = 2$, the integral is $\theta_1\int_0^1(2 - s)\,ds + \theta_2\int_1^2(2 - s)\,ds = 1.5\theta_1 + 0.5\theta_2$, and the variance term is $8\sigma^2/6 = 0.0001333$.
> > $$
> > \begin{align*}
> > 0.072 &= 0.050 + 1.5(0.010033) + 0.5\theta_2 - 0.0001333 \\
> > 0.5\,\theta_2 &= 0.072 - 0.049867 - 0.015050 \\
> > &= 0.007083 \\
> > \theta_2 &= 0.014167
> > \end{align*}
> > $$
> > The model now prices both bonds exactly. The drift is larger in the second year because the curve steepens there, and each new bond maturity adds one more piece of $\theta(t)$, which is how the model fits the whole curve.

> [!example]- Why Vasicek Cannot Fit the Same Curve {Example}
> The same bonds are to be priced by the Vasicek model $dr = 0.20(b - r)\,dt + 0.01\,dz$ with $r_0 = 0.025$. Bond prices are $P(0,T) = A(0,T)e^{-B(0,T)r_0}$, where $B = (1 - e^{-aT})/a$ and $\ln A = (B - T)\big(b - \sigma^2/(2a^2)\big) - \sigma^2B^2/(4a)$. Calibrate $b$ to the one-year bond, then price the two-year bond.
>
> > [!answer]-
> > For $T = 1$, $B = 0.906346$, $\sigma^2/(2a^2) = 0.00125$, $\sigma^2B^2/(4a) = 0.000103$ and $Br_0 = 0.022659$. Setting $\ln P(0,1) = -0.030$ gives an equation that is linear in $b$.
> > $$
> > \begin{align*}
> > -0.030 &= -0.093654\,(b - 0.00125) - 0.000103 - 0.022659 \\
> > b - 0.00125 &= 0.077292 \\
> > b &= 0.078542
> > \end{align*}
> > $$
> > For $T = 2$, $B = 1.648400$ and $\ln A = -0.351600(0.077292) - 0.000340 = -0.027515$.
> > $$
> > \begin{align*}
> > \ln P(0,2) &= -0.027515 - 1.648400(0.025) \\
> > &= -0.068725 \\
> > y(0,2) &= 0.068725/2 \\
> > &= 0.03436
> > \end{align*}
> > $$
> > The model's two-year yield is $3.44\%$ against $3.60\%$ in the market, so the model overprices the two-year bond. Fitting $b$ to the two-year bond instead gives $b = 0.0879$ and misprices the first. One constant level cannot match a curve of any shape, which is why a no-arbitrage model such as Hull-White replaces $b$ with $\theta(t)/a$.

> [!tip]- How it appears on the exam
> - **INV-201:** The objective asks candidates to "calibrate a model to observed prices of traded securities including fitting to a given yield curve", read in Hull and in the SOA's *Calibrating Interest Rate Models*. Expect to solve for drift parameters from given zero-coupon prices, one maturity at a time, as in the first example.
> - **Explanations:** Written parts ask why an equilibrium model fits the curve only approximately and a no-arbitrage model fits it exactly, which instruments to calibrate the volatility parameters to, and how calibrating for valuation differs from calibrating for real-world projection.
> - **Judgment:** Some questions ask how to choose the objective function and weights, and what an unstable or over-fitted calibration does to hedging and to the valuation of path-dependent liabilities.

> [!warning]- Exam traps
> - **Yields versus prices:** Check whether the question gives zero-coupon prices, continuously compounded yields or annual effective yields. Converting $3\%$ annual effective as if it were continuous puts every fitted parameter off.
> - **The convexity term:** In Ho-Lee and Vasicek the bond price includes a variance term, $\sigma^2T^3/6$ or $\sigma^2B^2/(4a)$. Dropping it fits the drift to the wrong price, and the error grows quickly with maturity.
> - **Fitting one maturity at a time:** In a bootstrap the earlier pieces of $\theta(t)$ are fixed before the next is solved. Solving the two-year equation with $\theta_1$ unknown, or treating $\theta$ as constant, does not reproduce both prices.
> - **Calibration is not validation:** A perfect fit to the calibration set says nothing about how well the model prices instruments outside it. Questions that ask whether a model is fit for purpose want an out-of-sample test or a stability check, not the calibration error.
