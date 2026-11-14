---
aliases:
  - Observed Price
  - Traded Security
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d13383923771c2af8a0872c4c6589159deb1d60d423e3cb5795fcaf35c90fac1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Calibration.md
---
**Model calibration** is choosing a pricing model's parameters so that the prices the model gives to liquid traded securities match their observed market prices, before the model is used to value or hedge something that does not trade. An interest rate model is calibrated to the [[Yield Curve|yield curve]] and to cap or swaption prices, and an equity model to option prices across strikes and maturities, which is where the [[Volatility Smile|volatility smile]] enters.

When the model cannot match every price exactly, the calibrated parameters $\hat\theta$ minimize a weighted sum of squared pricing errors over the $n$ calibration instruments, which is

> $$\hat\theta = \arg\min_{\theta}\ \sum_{i=1}^{n} w_i\left(V_i^{\text{model}}(\theta) - V_i^{\text{mkt}}\right)^2$$

- $\theta$ is the vector of model parameters.
- $V_i^{\text{mkt}}$ is the observed price of calibration instrument $i$, and $V_i^{\text{model}}(\theta)$ is the model's price for it.
- $w_i$ is a weight, often the inverse of the instrument's bid-ask spread or of its vega.

Pricing an [[Embedded Option|embedded option]] or a bond option off a model that misprices the underlying bonds builds the error into the option value.

## Fitting a short-rate model to the yield curve

A no-arbitrage short-rate model has a drift function $\theta(t)$ chosen so that every zero-coupon bond price on today's curve is reproduced exactly. In the Ho-Lee model the dynamics of the short rate are

> $$dr = \theta(t)\,dt + \sigma\,dz$$

The drift that fits today's curve is

> $$\theta(t) = F_t(0, t) + \sigma^2 t$$

- $F(0,t)$ is the instantaneous [[Forward Rate|forward rate]] for time $t$ read from today's curve, and $F_t$ is its slope in $t$.
- $\sigma$ is the volatility of the short rate.

In the Hull-White model the short rate also reverts to a mean, and its dynamics are

> $$dr = \big(\theta(t) - a\,r\big)\,dt + \sigma\,dz$$

The drift that fits today's curve in Hull-White is

> $$\theta(t) = F_t(0,t) + aF(0,t) + \frac{\sigma^2}{2a}\left(1 - e^{-2at}\right)$$

- $a$ is the speed of mean reversion.

With a piecewise-constant $\theta(t)$, the curve is fitted one maturity at a time, as a bootstrap: the earlier pieces of $\theta(t)$ are fixed before the next is solved. Each new bond maturity adds one more piece of $\theta(t)$, which is how the model fits the whole curve.

> [!example]- What drift fits this Ho-Lee model to two zero-coupon bonds? {Example}
> In the Ho-Lee model $dr = \theta(t)\,dt + 0.01\,dz$, take $\theta(t)$ to be $\theta_1$ on $[0, 1)$ and $\theta_2$ on $[1, 2)$. The short rate is $r_0 = 0.025$. Zero-coupon bonds trade at continuously compounded yields of $3.0\%$ for one year and $3.6\%$ for two years. Under Ho-Lee, bond prices satisfy
>
> $$-\ln P(0,T) = r_0T + \int_0^T \theta(s)(T - s)\,ds - \frac{\sigma^2T^3}{6}$$
>
> > [!answer]-
> > - For $T = 1$, the integral is $\int_0^1 \theta_1(1 - s)\,ds = \theta_1/2$, and the variance term is $\sigma^2/6 = 0.0000167$.
> > - So $0.030 = 0.025 + \tfrac12\theta_1 - 0.0000167$, which gives $\theta_1 = 2(0.0050167) = 0.010033$.
> > - For $T = 2$, the integral is $\theta_1\int_0^1(2 - s)\,ds + \theta_2\int_1^2(2 - s)\,ds = 1.5\theta_1 + 0.5\theta_2$, and the variance term is $8\sigma^2/6 = 0.0001333$.
> > - So $0.072 = 0.050 + 1.5(0.010033) + 0.5\theta_2 - 0.0001333$, which gives $0.5\theta_2 = 0.007083$.
> > - The drift is $\theta_1 = 0.010033$ in the first year and $\theta_2 = 0.014167$ in the second, and the model prices both bonds exactly. The drift is larger in the second year because the curve steepens there.

## Equilibrium models fit the curve only approximately

An equilibrium model such as Vasicek or CIR has a constant long-run level, so it can match only a few points of the curve and fits the rest by least squares. That is why a no-arbitrage model such as Hull-White replaces the constant level $b$ with $\theta(t)/a$.

> [!example]- Can the Vasicek model fit both bonds of the Ho-Lee example? {Example}
> The same bonds are to be priced by the Vasicek model $dr = 0.20(b - r)\,dt + 0.01\,dz$ with $r_0 = 0.025$. Bond prices are $P(0,T) = A(0,T)e^{-B(0,T)r_0}$, where
>
> $$B = \frac{1 - e^{-aT}}{a}$$
>
> $$\ln A = (B - T)\left(b - \frac{\sigma^2}{2a^2}\right) - \frac{\sigma^2B^2}{4a}$$
>
> > [!answer]-
> > - For $T = 1$, $B = 0.906346$, $\sigma^2/(2a^2) = 0.00125$, $\sigma^2B^2/(4a) = 0.000103$ and $Br_0 = 0.022659$.
> > - Setting $\ln P(0,1) = -0.030$ gives $-0.030 = -0.093654\,(b - 0.00125) - 0.000103 - 0.022659$, so $b = 0.078542$.
> > - For $T = 2$, $B = 1.648400$ and $\ln A = -0.351600(0.077292) - 0.000340 = -0.027515$.
> > - So $\ln P(0,2) = -0.027515 - 1.648400(0.025) = -0.068725$, a two-year yield of $0.068725/2 = 3.44\%$.
> > - Against $3.60\%$ in the market, the model overprices the two-year bond. Fitting $b$ to the two-year bond instead gives $b = 0.0879$ and misprices the first.
> > - No, one constant level cannot match a curve of any shape.

## Calibrating the volatility parameters

The curve fixes the drift, $\theta(t)$, and says nothing about volatility. The volatility parameters $a$ and $\sigma$ are then fitted to option prices, such as caps, floors or [[Swaption|swaptions]], usually quoted as Black implied volatilities. Caplets depend on one forward rate at a time, while swaptions depend on how the rates move together, so the calibration set should match the exposure being valued.

## Risk-neutral and real-world calibration

A market-consistent calibration targets today's prices and is used for valuation and hedging. A real-world calibration, used in an [[Economic Scenario Generator|economic scenario generator]] for projections and capital, targets historical behaviour such as the long-run level, the spread of rates and the frequency of inversions. The two give different parameters for the same model, and using one where the other is needed is a common error.

## Over-fitting and model risk

A model with as many parameters as instruments fits them exactly, but the fitted values can jump from one day to the next and imply implausible dynamics. That makes hedge ratios unstable and the hedges expensive to rebalance. Penalizing roughness in $\theta(t)$, fitting fewer and more liquid instruments, and checking out-of-sample prices guard against [[Overfitting|over-fitting]].

A model that fits every calibration price can still misprice an exotic payoff whose value depends on what the calibration did not pin down, such as the forward smile or the correlation between rates. This is the [[Model Risk|model risk]] that [[Model Validation|model validation]] checks. A perfect fit to the calibration set says nothing about how well the model prices instruments outside it, so whether a model is fit for purpose is judged by an out-of-sample test or a stability check, not by the calibration error.

> [!trap] Dropping the convexity term
> In Ho-Lee and Vasicek the bond price includes a variance term, $\sigma^2T^3/6$ or $\sigma^2B^2/(4a)$. Dropping it fits the drift to the wrong price, and the error grows quickly with maturity.
