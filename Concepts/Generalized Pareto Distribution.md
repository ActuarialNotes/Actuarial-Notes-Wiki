---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c21a5f3e1d528b276872e3468445974a2d808c9e59a12b9d75011c5e024cb1dc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Generalized Pareto Distribution.md
---

**The Generalized Pareto Distribution (GPD)** $G_{\xi,\beta}$ is the limiting distribution of the excess loss $X - d$, given $X > d$, over a high threshold $d$, for any loss distribution whose block maxima have a [[Generalized Extreme Value Distribution|generalized extreme value]] limit. It is the basis of the peaks-over-threshold method, which fits the GPD to the largest losses only and uses it to estimate tail probabilities, Value at Risk and Expected Shortfall beyond the range of the data.

> $$G_{\xi,\beta}(y) = 1 - \left(1 + \frac{\xi y}{\beta}\right)^{-1/\xi}, \quad \xi \neq 0$$

> $$G_{0,\beta}(y) = 1 - e^{-y/\beta}$$

> $$\Pr(X > x) \approx S_X(d)\left[1 + \frac{\xi(x - d)}{\beta}\right]^{-1/\xi}, \quad x > d$$

> $$Q_\alpha = d + \frac{\beta}{\xi}\left[\left(\frac{S_X(d)}{1 - \alpha}\right)^{\xi} - 1\right]$$

> $$ES_\alpha = \frac{Q_\alpha + \beta - \xi d}{1 - \xi}$$

- **Symbols:** Following Hardy and Saunders (the ASTAM study note on extreme value theory), $\xi$ is the shape parameter and $\beta > 0$ the scale parameter. The support is $y \ge 0$ when $\xi \ge 0$ and $0 \le y \le -\beta/\xi$ when $\xi < 0$. $Q_\alpha$ is the $\alpha$-[[Risk Measure|Value at Risk]] and $ES_\alpha = E[X \mid X > Q_\alpha]$ the Expected Shortfall, which Loss Models writes as $\text{VaR}_p$ and $\text{TVaR}_p$ for a continuous loss. $S_X(d)$ is estimated by the proportion of the sample above the threshold.
- **Pickands–Balkema–de Haan theorem:** A distribution is in the maximum domain of attraction of the GEV with shape $\xi$ if and only if its excess losses over $d$ approach a GPD with the same $\xi$, and some scale $\beta$, as $d$ rises to the top of its range. When $\xi > 0$ the GPD is a two-parameter [[Pareto Distribution|Pareto]] with shape $1/\xi$ and scale $\beta/\xi$, when $\xi = 0$ it is [[Exponential Distribution|exponential]] with mean $\beta$, and when $\xi < 0$ it is bounded.
- **Linear mean excess:** If $Y$ is $G_{\xi,\beta}$, then $Y - k$ given $Y > k$ is $G_{\xi,\,\beta + \xi k}$, so for $\xi < 1$ the [[Mean Excess Loss|mean excess loss]] at $d + k$ is $(\beta + \xi k)/(1 - \xi)$, a straight line in $k$ with slope $\xi/(1-\xi)$. The mean is $\beta/(1 - \xi)$ for $\xi < 1$, and moments exist only below order $1/\xi$. The threshold is chosen where the empirical mean excess plot becomes roughly linear.
- **Choosing the threshold:** A higher threshold makes the GPD a better approximation but leaves fewer exceedances to fit it to, so the estimate of $\xi$ trades bias against variance and often has a large standard error.

> [!example]- Peaks Over Threshold for a Liability Book {Example}
> Of 1,000 liability claims, 40 exceed a threshold of 500 (in \$000s). A GPD fitted to the 40 excesses has $\xi = 0.4$ and $\beta = 300$. Estimate the probability that a claim exceeds 2,000, the 99% Value at Risk and the 99% Expected Shortfall.
>
> > [!answer]-
> > The threshold's survival probability is estimated as $40/1{,}000 = 0.04$, and the GPD supplies the rest of the tail.
> > $$
> > \begin{align*}
> > \Pr(X > 2{,}000) &= 0.04\left[1 + \frac{0.4(1{,}500)}{300}\right]^{-2.5} \\
> > &= 0.04\,(3)^{-2.5} \\
> > &= 0.002566 \\
> > Q_{0.99} &= 500 + \frac{300}{0.4}\left[\left(\frac{0.04}{0.01}\right)^{0.4} - 1\right] \\
> > &= 500 + 750(0.741101) \\
> > &= 1{,}055.83 \\
> > ES_{0.99} &= \frac{1{,}055.83 + 300 - 0.4(500)}{1 - 0.4} \\
> > &= 1{,}926.38
> > \end{align*}
> > $$
> > The 99% Value at Risk is about \$1.06 million, and the claims above it average about \$1.93 million. The Expected Shortfall is 1.8 times the Value at Risk, because with $\xi = 0.4$ the mean excess keeps rising with the threshold.

> [!example]- Reading the GPD Off a Mean Excess Plot {Example}
> Above a threshold of 100, the empirical mean excess function of a set of losses is close to the line $e(100 + k) = 50 + 0.5k$. Estimate $\xi$ and $\beta$ for the excess losses over 100, and the probability that a loss above 100 also exceeds 200.
>
> > [!answer]-
> > A GPD's mean excess line has slope $\xi/(1 - \xi)$ and intercept $\beta/(1 - \xi)$.
> > $$
> > \begin{align*}
> > \frac{\xi}{1 - \xi} &= 0.5 \\
> > \xi &= \tfrac{1}{3} \\
> > \beta &= 50\left(1 - \tfrac{1}{3}\right) \\
> > &= 33.33
> > \end{align*}
> > $$
> > The excess over 100 must exceed 100, so the conditional probability is $\left[1 + \tfrac{1}{3}(100)/33.33\right]^{-3} = 2^{-3} = 0.125$. This GPD is a Pareto with shape 3 and scale 100, so the excess losses have a finite variance but no third moment. A maximum likelihood fit would refine these rough values, but the slope alone already shows a positive $\xi$.

> [!tip]- How it appears on the exam
> - **ASTAM** asks candidates to understand the derivation and characteristics of the GPD and to apply it to the estimation of tail risk measures and probabilities. A question gives a threshold, the number of observations above it out of the sample, and fitted values of $\xi$ and $\beta$, then asks for a tail probability, a Value at Risk or an Expected Shortfall.
> - **The exponential case:** When $\xi = 0$, the formulas take their limits, $\Pr(X > x) = S_X(d)\,e^{-(x-d)/\beta}$, $Q_\alpha = d + \beta \ln\big(S_X(d)/(1 - \alpha)\big)$ and $ES_\alpha = Q_\alpha + \beta$, and the reading's exercises use this case too.
> - **Written comments:** The reading's exercises ask for the trade-off in choosing a threshold, and for a comparison of GPD estimates with empirical ones, which cannot go beyond the largest observation.

> [!warning]- Exam traps
> - **Two generalized Paretos:** The exam tables from Loss Models list a different "generalized Pareto" with parameters $\alpha$, $\theta$ and $\tau$, a member of the transformed beta family. The ASTAM objective that pairs the GPD with the GEV means the extreme value distribution $G_{\xi,\beta}$, and using the tables' entry for a peaks-over-threshold question gives the wrong answer.
> - **Conditional probabilities:** $G_{\xi,\beta}$ gives probabilities for losses that have already exceeded $d$. An unconditional tail probability needs the factor $S_X(d)$, and a Value at Risk needs the tail level $1 - \alpha$ converted to $(1 - \alpha)/S_X(d)$ above the threshold.
> - **The quantile must lie above the threshold:** The formulas for $Q_\alpha$ and $ES_\alpha$ hold only when $1 - \alpha < S_X(d)$. A 90% Value at Risk with only 4% of the data above $d$ cannot come from this tail fit.
> - **A shape of 1 or more:** The mean of the GPD, and so the Expected Shortfall, is infinite when $\xi \ge 1$. A fitted $\xi$ close to 1 makes the Expected Shortfall estimate very large and very uncertain.
