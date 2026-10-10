---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8b9f27f5c90cd77f883ffd1ea602961a796b4ae5e56e06fd9ebabae38aaa93ed
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Numeraire.md
---

A **numeraire** is the unit in which prices are measured: any traded asset whose price $N_t$ is always positive can serve, such as the money-market account, a zero-coupon bond or a stock. For each numeraire there is an equivalent [[Martingale|martingale]] measure $\mathbb{Q}^N$ under which every traded price divided by $N_t$ is a martingale, so a derivative can be priced as an expectation in whichever unit makes that expectation easiest. Choosing the numeraire well is the standard device for interest-rate derivatives, where discounting and the payoff are both random.

> $$\frac{V_t}{N_t} = E^{\mathbb{Q}^N}\!\left[\frac{V_T}{N_T}\,\Big|\,\mathcal{F}_t\right]$$

> $$V_0 = e^{-rT}E^{\mathbb{Q}}\left[V_T\right]$$

> $$V_0 = P(0,T)\,E^{\mathbb{Q}^T}\left[V_T\right]$$

> $$\frac{d\mathbb{Q}^N}{d\mathbb{Q}^M}\bigg|_{\mathcal{F}_T} = \frac{N_T/N_0}{M_T/M_0}$$

- **Symbols:** $V_t$ is the price of any traded claim, $N_t$ and $M_t$ are two numeraires, and $P(t,T)$ is the price at $t$ of a zero-coupon bond paying 1 at $T$. With constant rates the money-market account is $B_t = e^{rt}$, and in general it is $B_t = \exp\int_0^t r_s\,ds$.
- **Money-market numeraire:** Using $B_t$ gives the [[Risk-Neutral Valuation|risk-neutral measure]] $\mathbb{Q}$ and the second block. With random rates, the discount factor $B_T^{-1}$ sits inside the expectation, as $E^{\mathbb{Q}}\left[e^{-\int_0^T r_s\,ds}\,V_T\right]$, and is correlated with any rate-dependent payoff.
- **Forward measure:** Using the zero-coupon bond maturing at $T$ gives the $T$-forward measure $\mathbb{Q}^T$. Because $P(T,T) = 1$, the discount factor comes outside the expectation (third block), and the forward price of any asset for delivery at $T$, $F_t = V_t/P(t,T)$, is a martingale under $\mathbb{Q}^T$. Hull calls this a world that is forward risk neutral with respect to $P(t,T)$.
- **Forward rates:** The forward rate for the period from $T$ to $T + \tau$ is a martingale under the $(T + \tau)$-forward measure. That is why a caplet, which pays at $T + \tau$, is priced with Black's model on the forward rate, and why an [[Interest Rate Derivative|interest rate derivative]] that pays a rate at the end of its period is valued at today's forward rate.
- **Other numeraires:** An annuity (the value of a stream of zero-coupon bonds) is the numeraire that makes a forward swap rate a martingale, which gives Black's model for a [[Swaption|swaption]]. A stock used as numeraire prices an option to exchange one asset for another.
- **Change of numeraire:** The fourth block converts expectations between two measures. In Hull's form, moving from numeraire $g$ to numeraire $h$ raises the expected growth rate of any variable $v$ by $\rho\,\sigma_v\,\sigma_w$, where $w = h/g$ and $\rho$ is the correlation between $v$ and $w$. Volatilities do not change, as [[Girsanov's Theorem|Girsanov's theorem]] requires.

> [!example]- Valuing a Claim That Pays a Bond Under the Forward Measure {Example}
> Continuously compounded zero rates are 3.0% for 2 years and 3.5% for 5 years. A claim pays at $T = 2$ the price at that time of a zero-coupon bond with face \$1,000 that matures at year 5. Value the claim under the 2-year forward measure, without modelling interest rates.
>
> > [!answer]-
> > The bond's forward price for delivery at 2 is $P(t,5)/P(t,2)$, which is a martingale under $\mathbb{Q}^2$, and at $t = 2$ it equals $P(2,5)$.
> > $$
> > \begin{align*}
> > P(0,2) &= e^{-0.06} = 0.941765 \\
> > P(0,5) &= e^{-0.175} = 0.839457 \\
> > E^{\mathbb{Q}^2}\left[P(2,5)\right] &= \frac{0.839457}{0.941765} \\
> > &= 0.891366 \\
> > V_0 &= 1{,}000\,P(0,2)\,E^{\mathbb{Q}^2}\left[P(2,5)\right] \\
> > &= 1{,}000(0.941765)(0.891366) \\
> > &= 839.46
> > \end{align*}
> > $$
> > The claim is worth \$839.46, which is exactly today's price of the 5-year bond, as it must be, since holding the bond delivers the same thing at time 2. Under $\mathbb{Q}$ this would require the joint distribution of $e^{-\int_0^2 r\,ds}$ and $P(2,5)$, but under $\mathbb{Q}^2$ only the forward price is needed.

> [!example]- A Call on a Zero-Coupon Bond by Black's Model {Example}
> Using the same curve, a 2-year European call on the 5-year bond above has strike 0.88 per unit of face, and the forward bond price is lognormal under $\mathbb{Q}^2$ with volatility $\sigma = 0.03$. Find the call's value per \$1,000 of face.
>
> > [!answer]-
> > Under $\mathbb{Q}^2$ the payoff is $\max\left(P(2,5) - K, 0\right)$, the bond price at 2 equals its forward price $F_2$, and $F_t$ is a lognormal martingale starting at $F_0 = 0.891366$. Discounting at $P(0,2)$ gives Black's formula.
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(0.891366/0.88) + \tfrac12(0.03)^2(2)}{0.03\sqrt{2}} \\
> > &= 0.32370 \\
> > d_2 &= 0.32370 - 0.042426 \\
> > &= 0.28127 \\
> > c &= P(0,2)\left[F_0N(d_1) - KN(d_2)\right] \\
> > &= 0.941765\left[0.891366(0.62692) - 0.88(0.61075)\right] \\
> > &= 0.021353 \times 0.941765 \\
> > &= 0.020110
> > \end{align*}
> > $$
> > The call is worth about \$20.11 per \$1,000 of face. The forward measure removes the stochastic discount factor, so the drift of the bond price and the dynamics of $r$ never enter.

> [!tip]- How it appears on the exam
> - **INV-201:** The syllabus lists change of numeraire among its stochastic calculus techniques, and its next objective asks candidates to apply the risk-neutral measure, the forward measure and normalization. The readings are Hull's chapter on martingales and measures, including its sections on alternative numeraires and on changing the numeraire.
> - **Choosing a numeraire:** A question asks which normalized prices are martingales under which measure. Examples are a forward price under the forward measure, a forward rate under the measure of the bond that pays at the end of its period, and a swap rate under the annuity measure.
> - **Pricing:** Candidates price a bond option, caplet or claim paying a bond price with Black's model under the forward measure, or show why $E^{\mathbb{Q}^T}[S_T]$ equals the forward price.
> - **Drift adjustments:** A question may ask for the drift of a variable after a change of numeraire, using $\rho\,\sigma_v\,\sigma_w$, or explain why a convexity or timing adjustment arises when a rate is paid at the wrong time for its natural measure.

> [!warning]- Exam traps
> - **The wrong discount factor:** Under $\mathbb{Q}^T$ the discount factor is today's bond price $P(0,T)$, a known number. Putting the random factor $e^{-\int_0^T r_s\,ds}$ inside a $\mathbb{Q}^T$ expectation, or using $\mathbb{Q}^T$ probabilities with the money-market account, mixes two measures and counts the discounting twice or not at all.
> - **Measure and payment date must match:** A forward rate for the period from $T$ to $T + \tau$ is a martingale under the $(T + \tau)$-forward measure, not the $T$-forward measure. Pricing a rate paid at $T$ at today's forward rate ignores a timing adjustment.
> - **Non-traded numeraires:** The numeraire must be a traded asset with a positive price. A rate, an index level or a payoff that can be zero cannot serve.
> - **Which volatility:** A change of numeraire changes drifts, never volatilities, but Black's model needs the volatility of the forward price. In a one-factor model the forward bond price $P(t,5)/P(t,2)$ has the difference of the two bonds' volatilities, not the 5-year bond's own, so use the volatility given for the forward price.
