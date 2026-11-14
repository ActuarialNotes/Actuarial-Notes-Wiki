---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7a72556d0eb11ddc39b34c100ecdbfbb40f2bc2c756e38181a6250524915fed4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Numeraire.md
---
A **Numeraire** is the unit in which prices are measured. Any traded asset whose price $N_t$ is always positive can serve, such as the money-market account, a zero-coupon bond or a stock.

For each numeraire $N_t$ there is an equivalent [[Martingale|martingale]] measure $\mathbb{Q}^N$ under which every traded price divided by $N_t$ is a martingale, so the price $V_t$ of any traded claim is

> $$\frac{V_t}{N_t} = E^{\mathbb{Q}^N}\!\left[\frac{V_T}{N_T}\,\Big|\,\mathcal{F}_t\right]$$

- $\mathcal{F}_t$ is the information available at time $t$.

A derivative can therefore be priced as an expectation in whichever unit makes that expectation easiest. Choosing the numeraire well is the standard device for interest rate derivatives, where discounting and the payoff are both random. A rate, an index level or a payoff that can be zero cannot serve as a numeraire.

## The money-market account and the risk-neutral measure

The money-market account $B_t = \exp\int_0^t r_s\,ds$ as numeraire gives the [[Risk-Neutral Valuation|risk-neutral measure]] $\mathbb{Q}$. With a constant rate $r$, $B_t = e^{rt}$ and the price of a claim paying $V_T$ at $T$ is

> $$V_0 = e^{-rT}E^{\mathbb{Q}}\left[V_T\right]$$

With random rates, the discount factor sits inside the expectation, as $E^{\mathbb{Q}}\left[e^{-\int_0^T r_s\,ds}\,V_T\right]$, and it is correlated with any rate-dependent payoff.

## The forward measure

The zero-coupon bond maturing at $T$, with price $P(t,T)$ at time $t$ and $P(T,T) = 1$, as numeraire gives the $T$-forward measure $\mathbb{Q}^T$. The discount factor comes outside the expectation, and the price is

> $$V_0 = P(0,T)\,E^{\mathbb{Q}^T}\left[V_T\right]$$

The forward price of any asset for delivery at $T$, $F_t = V_t/P(t,T)$, is a martingale under $\mathbb{Q}^T$. Hull calls this a world that is forward risk neutral with respect to $P(t,T)$.

The forward rate for the period from $T$ to $T + \tau$ is a martingale under the $(T + \tau)$-forward measure. That is why a caplet, which pays at $T + \tau$, is priced with Black's model on the forward rate, and why an [[Interest Rate Derivative|interest rate derivative]] that pays a rate at the end of its period is valued at today's forward rate. A rate paid at $T$ instead needs a timing adjustment.

> [!example]- What is this claim on a 5-year bond worth today? {Example}
> Continuously compounded zero rates are 3.0% for 2 years and 3.5% for 5 years. A claim pays at $T = 2$ the price at that time of a zero-coupon bond with face \$1,000 that matures at year 5.
>
> > [!answer]-
> > - The bond's forward price for delivery at 2, $P(t,5)/P(t,2)$, is a martingale under $\mathbb{Q}^2$, and at $t = 2$ it equals $P(2,5)$.
> > - Today's bond prices are $P(0,2) = e^{-0.06} = 0.941765$ and $P(0,5) = e^{-0.175} = 0.839457$.
> > - So $E^{\mathbb{Q}^2}\left[P(2,5)\right] = 0.839457/0.941765 = 0.891366$.
> > - The claim is worth $1{,}000(0.941765)(0.891366) = \$839.46$.
> > - That is exactly today's price of the 5-year bond, since holding the bond delivers the same thing at time 2. Under $\mathbb{Q}$ the value would need the joint distribution of $e^{-\int_0^2 r\,ds}$ and $P(2,5)$, but under $\mathbb{Q}^2$ only the forward price is needed.

> [!example]- What is this 2-year call on the 5-year bond worth per \$1,000 of face? {Example}
> Using the same curve, a 2-year European call on the 5-year bond has strike $K = 0.88$ per unit of face. The forward bond price is lognormal under $\mathbb{Q}^2$ with volatility $\sigma = 0.03$.
>
> > [!answer]-
> > - Under $\mathbb{Q}^2$ the payoff is $\max\left(P(2,5) - K, 0\right)$, and the bond price at 2 equals its forward price, a lognormal martingale starting at $F_0 = 0.891366$.
> > - Discounting at $P(0,2)$ gives Black's formula, $c = P(0,2)\left[F_0N(d_1) - KN(d_2)\right]$.
> > - $d_1 = \left[\ln(0.891366/0.88) + \tfrac12(0.03)^2(2)\right]/(0.03\sqrt{2}) = 0.32370$.
> > - $d_2 = 0.32370 - 0.042426 = 0.28127$.
> > - $c = 0.941765\left[0.891366(0.62692) - 0.88(0.61075)\right] = 0.941765(0.021353) = 0.020110$.
> > - The call is worth about \$20.11 per \$1,000 of face. The drift of the bond price and the dynamics of $r$ never enter.

## Other numeraires

An annuity, the value of a stream of zero-coupon bonds, is the numeraire that makes a forward swap rate a martingale, which gives Black's model for a [[Swaption|swaption]]. A stock used as numeraire prices an option to exchange one asset for another.

## Change of numeraire

The measures of two numeraires $N_t$ and $M_t$ are related by the density

> $$\frac{d\mathbb{Q}^N}{d\mathbb{Q}^M}\bigg|_{\mathcal{F}_T} = \frac{N_T/N_0}{M_T/M_0}$$

In Hull's form, moving from numeraire $g$ to numeraire $h$ raises the expected growth rate of any variable $v$ by $\rho\,\sigma_v\,\sigma_w$, where $w = h/g$ and $\rho$ is the correlation between $v$ and $w$. Volatilities do not change, as [[Girsanov's Theorem|Girsanov's theorem]] requires.

> [!trap] Mixing the discount factor of one measure with another
> Under $\mathbb{Q}^T$ the discount factor is today's bond price $P(0,T)$, a known number. Putting the random factor $e^{-\int_0^T r_s\,ds}$ inside a $\mathbb{Q}^T$ expectation, or using $\mathbb{Q}^T$ probabilities with the money-market account, counts the discounting twice or not at all.
