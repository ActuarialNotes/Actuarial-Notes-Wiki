---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:241c10dba9bab049ab8f9369462eff4efb8b97bccee3187937b2b739713c5a25
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Swaption.md
---
A **Swaption** is an option to enter an interest rate swap at a fixed rate $s_K$ on a future date $T$. A **payer swaption** gives the right to pay fixed and receive floating, so it pays off when swap rates rise above $s_K$. A **receiver swaption** gives the right to receive fixed, so it pays off when they fall below it. On each payment date of the swap, a payer swaption pays

> $$L\,\tau\,(s_T - s_K)^+$$

- $L$ is the notional principal.
- $\tau$ is the accrual fraction of each period, $1/m$ for $m$ payments a year.
- $s_T$ is the swap rate observed at expiry.

At expiry the holder of a payer swaption exercises if $s_T > s_K$, because it can then pay $s_K$ on a swap the market prices at $s_T$. The gain is a stream of $L\,\tau\,(s_T - s_K)$ on each of the $N$ payment dates, so a payer swaption is a call on the swap rate and a receiver swaption is a put.

## Black's model for a European swaption

A European swaption is priced in the market with Black's model, treating the forward swap rate as lognormal. Following Hull section 29.3, the swap starts at the expiry $T = T_0$ and pays on $T_1, \dots, T_N$. Its annuity factor is

> $$A = \sum_{i=1}^{N} \tau\,P(0,T_i)$$

- $P(0, t)$ is the price today of a zero-coupon bond paying $\$1$ at $t$.

Today's forward swap rate is

> $$s_F = \frac{P(0,T_0) - P(0,T_N)}{A}$$

The payoff is paid over $N$ dates, not at $T$, so Black's formula is scaled by $A$, the value of $\$1$ a period on the swap's payment dates. Using the annuity as the [[Numeraire|numeraire]] is what makes the forward swap rate a [[Martingale|martingale]] and justifies Black's formula. The value of a payer swaption is

> $$V_{\text{pay}} = L\,A\left[s_F\,N(d_1) - s_K\,N(d_2)\right]$$

and the value of a receiver swaption is

> $$V_{\text{rec}} = L\,A\left[s_K\,N(-d_2) - s_F\,N(-d_1)\right]$$

where

> $$d_1 = \frac{\ln(s_F/s_K) + \sigma^2 T/2}{\sigma\sqrt{T}}$$

- $\sigma$ is the volatility of the forward swap rate.
- $d_2 = d_1 - \sigma\sqrt{T}$.
- $N(\cdot)$ is the standard normal distribution function.

> [!example]- What are this one-year payer swaption and the matching receiver swaption worth? {Example}
> An insurer buys a one-year European payer swaption on a three-year swap with annual payments, a notional of $\$10$ million and a fixed rate of 4.5%. The volatility of the forward swap rate is 20%. The zero-coupon bond prices are:
>
> | $t$ | 1 | 2 | 3 | 4 |
> | :--- | ---: | ---: | ---: | ---: |
> | $P(0,t)$ | 0.9608 | 0.9194 | 0.8763 | 0.8353 |
>
> > [!answer]-
> > - The swap starts at $T_0 = 1$ and pays at years 2, 3 and 4, with $\tau = 1$.
> > - The annuity factor is $A = 0.9194 + 0.8763 + 0.8353 = 2.6310$.
> > - The forward swap rate is $s_F = (0.9608 - 0.8353)/2.6310 = 0.047700$.
> > - With $T = 1$ and $\sigma = 0.20$, $d_1 = \left[\ln(0.047700/0.045) + 0.02\right]/0.20 = 0.3914$ and $d_2 = 0.1914$.
> > - The payer swaption is worth $10^7 \times 2.6310\left[0.047700(0.65225) - 0.045(0.57589)\right] = \$136{,}743$.
> > - By parity, the receiver is worth $136{,}743 - 10^7(2.6310)(0.047700 - 0.045) = 136{,}743 - 71{,}050 = \$65{,}693$.
> > - The payer is dearer because the forward swap rate of 4.77% is already above the 4.5% strike, so it is in the money.

## Value at expiry

At expiry the gain on each payment date is discounted at the swap rate then prevailing, with the annuity factor on the swap's own payment dates.

> [!example]- At expiry the three-year swap rate is 5.30% on a flat curve. What is the payer swaption above worth? {Example}
> - The swap rate is above 4.5%, so the insurer exercises and pays 4.5% on a swap the market prices at 5.30%.
> - The gain is $10^7(0.053 - 0.045) = \$80{,}000$ a year for three years.
> - The annuity factor is $1/1.053 + 1/1.053^2 + 1/1.053^3 = 2.7080$.
> - The swaption is worth $80{,}000 \times 2.7080 = \$216{,}641$, against the $\$136{,}743$ paid for it.
> - Had the swap rate ended at 4.30%, the payer swaption would have expired worthless, and the receiver would have paid off.

## Swaptions as bond options

Entering a pay-fixed swap is like issuing a fixed-rate bond and buying a floating-rate note. A payer swaption is therefore a put on a coupon bond with coupon rate $s_K$ and a strike equal to its face value. A receiver swaption is the matching call on the bond.

## Put-call parity for swaptions

A long payer and a short receiver with the same terms pay $s_T - s_K$ in every state, which is a forward-start swap. Their prices therefore differ by the value of that swap, which is the swaption form of [[Put-Call Parity|put-call parity]]. The difference is

> $$V_{\text{pay}} - V_{\text{rec}} = L\,A\,(s_F - s_K)$$

## Caps and swaptions

A cap is a portfolio of caplets, each an option on one period's rate $R_i$ at strike $K$, and its [[Payoff|payoff]] is $\sum L\,\tau\,(R_i - K)^+$. A payer swaption is one option on the whole swap, exercised once. A portfolio of options is worth at least as much as an option on the portfolio, so a cap with the same strike, dates and notional is worth at least as much as the payer swaption. Pricing a swaption as the sum of caplets overstates it.

## Swaptions in callable bonds and insurance

The issuer of a [[Callable Bond|callable bond]] can call it when rates fall, which is the same as holding a receiver swaption, usually Bermudan. An insurer that has sold guaranteed rates, or whose policyholders can lapse when rates rise, buys swaptions to hedge those [[Embedded Option|embedded options]].

> [!trap] Leaving out the annuity factor
> Black's formula prices an option on a rate, so it must be scaled by $L\,A$. Using $L\,P(0,T)$, as if the payoff were paid once at expiry, understates the three-year swaption above by nearly two thirds. The annuity sums the bond prices at the payment dates $T_1$ to $T_N$, not $P(0,T_0)$ at expiry.
