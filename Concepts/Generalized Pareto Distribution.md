---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9380d581d3e97e2516acb393c18fa15ffe4a89cd584315a05b6eefc39b8f2359
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Generalized Pareto Distribution.md
---

A **Generalized Pareto Distribution** (GPD) $G_{\xi,\beta}$ is the limiting distribution of the excess loss $X - d$, given $X > d$, over a high threshold $d$, for any loss distribution whose block maxima have a [[Generalized Extreme Value Distribution|generalized extreme value]] limit. It is the basis of the peaks-over-threshold method, which fits the GPD to the largest losses only and uses it to estimate tail probabilities, Value at Risk and Expected Shortfall beyond the range of the data.

Following Hardy and Saunders (the ASTAM study note on extreme value theory), with a shape parameter $\xi \neq 0$ and a scale parameter $\beta > 0$, the cdf of an excess loss $y$ is

> $$G_{\xi,\beta}(y) = 1 - \left(1 + \frac{\xi y}{\beta}\right)^{-1/\xi}$$

- The support is $y \ge 0$ when $\xi > 0$, and $0 \le y \le -\beta/\xi$ when $\xi < 0$.

When $\xi = 0$, the cdf is

> $$G_{0,\beta}(y) = 1 - e^{-y/\beta}$$

The Pickands–Balkema–de Haan theorem says that a distribution is in the maximum domain of attraction of the GEV with shape $\xi$ if and only if its excess losses over $d$ approach a GPD with the same $\xi$, and some scale $\beta$, as $d$ rises to the top of its range. When $\xi > 0$ the GPD is a two-parameter [[Pareto Distribution|Pareto]] with shape $1/\xi$ and scale $\beta/\xi$. When $\xi = 0$ it is [[Exponential Distribution|exponential]] with mean $\beta$, and when $\xi < 0$ it is bounded. The mean is $\beta/(1 - \xi)$ for $\xi < 1$, and moments exist only below order $1/\xi$.

The exam tables from Loss Models list a different "generalized Pareto", with parameters $\alpha$, $\theta$ and $\tau$, a member of the transformed beta family. A peaks-over-threshold question means the extreme value distribution $G_{\xi,\beta}$.

## Tail probabilities and risk measures

For a loss $x$ above the threshold, the GPD gives the tail probability

> $$\Pr(X > x) \approx S_X(d)\left[1 + \frac{\xi(x - d)}{\beta}\right]^{-1/\xi}$$

- $S_X(d)$ is the probability that a loss exceeds the threshold, estimated by the proportion of the sample above it.

The $\alpha$-[[Risk Measure|Value at Risk]] is

> $$Q_\alpha = d + \frac{\beta}{\xi}\left[\left(\frac{S_X(d)}{1 - \alpha}\right)^{\xi} - 1\right]$$

and the Expected Shortfall, $ES_\alpha = E[X \mid X > Q_\alpha]$, is

> $$ES_\alpha = \frac{Q_\alpha + \beta - \xi d}{1 - \xi}$$

- $\xi < 1$. When $\xi \ge 1$ the mean of the GPD, and so the Expected Shortfall, is infinite.
- $1 - \alpha < S_X(d)$, so that the quantile lies above the threshold.

Loss Models writes $Q_\alpha$ and $ES_\alpha$ as $\text{VaR}_p$ and $\text{TVaR}_p$ for a continuous loss. When $\xi = 0$, the formulas take their limits: $Q_\alpha = d + \beta \ln\big(S_X(d)/(1 - \alpha)\big)$ and $ES_\alpha = Q_\alpha + \beta$.

> [!example]- What are $\Pr(X > 2{,}000)$, the 99% Value at Risk and the 99% Expected Shortfall of this liability book? {Example}
> Of 1,000 liability claims (in thousands), 40 exceed a threshold of 500. A GPD fitted to the 40 excesses has $\xi = 0.4$ and $\beta = 300$.
>
> > [!answer]-
> > - The threshold's survival probability is estimated as $40/1{,}000 = 0.04$.
> > - $\Pr(X > 2{,}000) = 0.04\left[1 + 0.4(1{,}500)/300\right]^{-2.5} = 0.04\,(3)^{-2.5} = 0.002566$.
> > - With $0.04/0.01 = 4$ and $4^{0.4} - 1 = 0.741101$, $Q_{0.99} = 500 + 750(0.741101) = 1{,}055.83$.
> > - $ES_{0.99} = (1{,}055.83 + 300 - 0.4 \times 500)/(1 - 0.4) = 1{,}926.38$.
> > - The 99% Value at Risk is about 1.06 million, and the claims above it average about 1.93 million.

## Mean excess loss of the GPD

If $Y$ is $G_{\xi,\beta}$, then $Y - k$ given $Y > k$ is $G_{\xi,\,\beta + \xi k}$. For $\xi < 1$, the [[Mean Excess Loss|mean excess loss]] at $d + k$ is therefore

> $$e(d + k) = \frac{\beta + \xi k}{1 - \xi}$$

A GPD's mean excess line has slope $\xi/(1 - \xi)$ and intercept $\beta/(1 - \xi)$. The threshold is chosen where the empirical mean excess plot becomes roughly linear.

> [!example]- Above 100, the empirical mean excess is close to $e(100 + k) = 50 + 0.5k$. What are $\xi$, $\beta$ and the probability that a loss above 100 exceeds 200? {Example}
> - The slope gives $\xi/(1 - \xi) = 0.5$, so $\xi = \tfrac{1}{3}$.
> - The intercept gives $\beta = 50\left(1 - \tfrac{1}{3}\right) = 33.33$.
> - As a Pareto, the shape is $1/\xi = 3$, which is $1 + 1/0.5$, and the scale is $\beta/\xi = 100$, which is $50/0.5$.
> - The excess over 100 must exceed 100, so the probability is $\left[1 + \tfrac{1}{3}(100)/33.33\right]^{-3} = 2^{-3} = 0.125$.

## Choosing the threshold

A higher threshold makes the GPD a better approximation but leaves fewer exceedances to fit it to, so the estimate of $\xi$ trades bias against variance and often has a large standard error. Empirical estimates cannot go beyond the largest observation, while the GPD fit can.

> [!trap] Leaving out the threshold's survival probability
> $G_{\xi,\beta}$ gives probabilities for losses that have already exceeded $d$. An unconditional tail probability needs the factor $S_X(d)$, and a Value at Risk needs the tail level $1 - \alpha$ converted to $(1 - \alpha)/S_X(d)$ above the threshold. In the liability example, leaving out the 0.04 gives $\Pr(X > 2{,}000) = 0.064$ instead of $0.002566$.
