---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7c09eb54ca5bdf940505d91d0b5aacc695c48f42dfff802d867b4ae559280e0d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Swaption.md
---

A **swaption** is an option to enter an interest rate swap at a fixed rate $s_K$ on a future date $T$. A **payer swaption** gives the right to pay fixed and receive floating, so it pays off when swap rates rise above $s_K$. A **receiver swaption** gives the right to receive fixed, so it pays off when they fall below it. The European swaption is priced in the market with Black's model, treating the forward swap rate as lognormal.

> $$\text{Payer payoff at each payment date} = L\,\tau\,(s_T - s_K)^+$$

> $$s_F = \frac{P(0,T_0) - P(0,T_N)}{A}$$

> $$A = \sum_{i=1}^{N} \tau\,P(0,T_i)$$

> $$V_{\text{pay}} = L\,A\left[s_F\,N(d_1) - s_K\,N(d_2)\right]$$

> $$V_{\text{rec}} = L\,A\left[s_K\,N(-d_2) - s_F\,N(-d_1)\right]$$

> $$d_1 = \frac{\ln(s_F/s_K) + \sigma^2 T/2}{\sigma\sqrt{T}}$$

- **Symbols:** Following Hull section 29.3, $L$ is the notional principal, $T = T_0$ is the swaption's expiry and the start of the underlying swap, $T_1, \dots, T_N$ are the swap's payment dates, $\tau$ is the accrual fraction of each period ($1/m$ for $m$ payments a year), and $P(0, t)$ is the price today of a zero-coupon bond paying \$1 at $t$. $s_T$ is the swap rate observed at expiry, $s_F$ is today's forward swap rate, $\sigma$ is the volatility of the forward swap rate, and $d_2 = d_1 - \sigma\sqrt{T}$.
- **Option on a rate:** At expiry the holder of a payer swaption exercises if $s_T > s_K$, because it can then pay $s_K$ on a swap the market prices at $s_T$. The gain is a stream of $L\,\tau\,(s_T - s_K)$ on each of the $N$ payment dates, so a payer swaption is a call on the swap rate and a receiver swaption is a put.
- **The annuity factor:** The payoff is paid over $N$ dates, not at $T$, so Black's formula is scaled by $A$, the value of \$1 a period on the swap's payment dates. Using the annuity as the [[Numeraire|numeraire]] is what makes the forward swap rate a [[Martingale|martingale]] and justifies Black's formula.
- **Option on a bond:** Entering a pay-fixed swap is like issuing a fixed-rate bond and buying a floating-rate note, so a payer swaption is a put on a coupon bond with coupon rate $s_K$ and a strike equal to its face value. A receiver swaption is the matching call on the bond.
- **Parity:** A long payer and a short receiver with the same terms pay $s_T - s_K$ in every state, which is a forward-start swap. Their prices therefore differ by $L\,A\,(s_F - s_K)$, which is the swaption form of [[Put-Call Parity|put-call parity]].
- **Caps and floors:** A cap is a portfolio of caplets, each an option on one period's rate, and its [[Payoff|payoff]] is $\sum L\,\tau\,(R_i - K)^+$. A payer swaption is one option on the whole swap. A portfolio of options is worth at least as much as an option on the portfolio, so a cap with the same strike, dates and notional is worth at least as much as the payer swaption.
- **Callable bonds and insurers:** The issuer of a [[Callable Bond|callable bond]] can call it when rates fall, which is the same as holding a receiver swaption, usually Bermudan. An insurer that has sold guaranteed rates, or whose policyholders can lapse when rates rise, buys swaptions to hedge those [[Embedded Option|embedded options]].

> [!example]- Pricing a 1-into-3-Year Payer Swaption with Black's Model {Example}
> An insurer buys a one-year European payer swaption on a three-year swap with annual payments, a notional of \$10 million and a fixed rate of 4.5%. The zero-coupon bond prices are $P(0,1) = 0.9608$, $P(0,2) = 0.9194$, $P(0,3) = 0.8763$ and $P(0,4) = 0.8353$, and the volatility of the forward swap rate is 20%. Find the payer swaption's value, then the value of the receiver swaption with the same terms.
>
> > [!answer]-
> > The swap starts at $T_0 = 1$ and pays at years 2, 3 and 4, with $\tau = 1$.
> > $$
> > \begin{align*}
> > A &= 0.9194 + 0.8763 + 0.8353 \\
> > &= 2.6310 \\
> > s_F &= \frac{0.9608 - 0.8353}{2.6310} \\
> > &= 0.04770
> > \end{align*}
> > $$
> > With $T = 1$ and $\sigma = 0.20$,
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(0.04770/0.045) + 0.02}{0.20} \\
> > &= 0.3913 \\
> > d_2 &= 0.3913 - 0.20 \\
> > &= 0.1913 \\
> > V_{\text{pay}} &= 10^7 \times 2.6310 \left[0.04770(0.65223) - 0.045(0.57587)\right] \\
> > &= 136{,}739
> > \end{align*}
> > $$
> > The receiver swaption follows from parity.
> > $$
> > \begin{align*}
> > V_{\text{rec}} &= V_{\text{pay}} - L\,A\,(s_F - s_K) \\
> > &= 136{,}739 - 10^7(2.6310)(0.0027) \\
> > &= 65{,}702
> > \end{align*}
> > $$
> > The payer swaption costs about \$136,700 and the receiver about \$65,700. The payer is dearer because the forward swap rate of 4.77% is already above the 4.5% strike, so it is in the money.

> [!example]- Exercising the Payer Swaption at Expiry {Example}
> At the end of the year in the first example, the three-year swap rate is 5.30%, and the swap curve is flat, so the annuity factor at expiry is the value of a three-year annuity-immediate at 5.30%. Should the insurer exercise, and what is the swaption worth at expiry?
>
> > [!answer]-
> > The swap rate is above 4.5%, so the insurer exercises and pays 4.5% on a swap the market prices at 5.30%. The gain is $10^7(0.053 - 0.045) = \$80{,}000$ a year for three years.
> > $$
> > \begin{align*}
> > A_T &= \frac{1}{1.053} + \frac{1}{1.053^2} + \frac{1}{1.053^3} \\
> > &= 2.7080 \\
> > V_T &= 80{,}000 \times 2.7080 \\
> > &= 216{,}641
> > \end{align*}
> > $$
> > The swaption is worth about \$216,600 at expiry, against the \$136,700 paid for it. The insurer can keep the swap, or settle in cash for its value. Had the swap rate ended at 4.30%, the payer swaption would have expired worthless, and the receiver would have paid off.

> [!tip]- How it appears on the exam
> - **INV-201 objective 1a:** Questions ask for the payoff of a payer or receiver swaption at expiry for a given swap rate, alongside the payoffs of caps, floors and plain swaps, and ask which way rates must move for each to pay off.
> - **Pricing:** A question may give zero-coupon bond prices or a swap curve and a volatility and ask for the forward swap rate, the annuity factor and the Black price, or use parity to move from a payer to a receiver.
> - **Written:** Questions ask how a swaption differs from a cap, why a callable bond contains a receiver swaption, or which swaption an insurer would buy to hedge a minimum guaranteed crediting rate.

> [!warning]- Exam traps
> - **The annuity factor:** Black's formula prices an option on a rate, so it must be scaled by $L\,A$. Using $L\,P(0,T)$, as if the payoff were paid once at expiry, understates this three-year swaption by nearly two thirds.
> - **Payer vs receiver:** "Payer" means the holder pays fixed, so it gains when rates rise. Treating a payer swaption as a call on a bond gets the direction backwards, because bond prices fall when rates rise.
> - **Discounting from the start date:** The annuity sums the bond prices at the swap's payment dates, $T_1$ to $T_N$, not from today. Including $P(0,T_0)$ for the expiry date adds a payment that is never made.
> - **Cap vs swaption:** A cap's caplets are exercised one at a time, while a swaption is exercised once for the whole swap. Pricing a swaption as the sum of caplets overstates it.
