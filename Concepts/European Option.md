---
aliases:
  - Simple European-style Derivative
  - Simple Option
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e7545eb63d5a4dad7cf152c998154a3c147eaf8abad01b949a4e9edcbfa51a72
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/European Option.md
---
A **European option** gives its holder the right, but not the obligation, to buy (a **call**) or sell (a **put**) an underlying asset at a fixed strike price $K$ on one date only, the expiry date $T$. More generally, a **simple European-style derivative** pays an amount $g(S_T)$ that depends only on the asset's price at the single date $T$, so calls, puts and cash-or-nothing payoffs are all of this kind. Its price is the [[Risk-Neutral Valuation|risk-neutral]] expected [[Present Value|present value]] of the [[Payoff|payoff]].

> $$\text{Call payoff} = (S_T - K)^+$$

> $$\text{Put payoff} = (K - S_T)^+$$

> $$\max\!\left(0,\; S_0e^{-\delta T} - Ke^{-rT}\right) \leq C \leq S_0e^{-\delta T}$$

> $$\max\!\left(0,\; Ke^{-rT} - S_0e^{-\delta T}\right) \leq P \leq Ke^{-rT}$$

- **Symbols:** Following McDonald, $S_T$ is the asset's price at expiry, $K$ is the strike, $r$ is the continuously compounded risk-free rate and $\delta$ is the continuous dividend yield, and $(x)^+ = \max(x, 0)$. FAM's objectives use a non-dividend-paying asset, so $\delta = 0$ there. $C$ and $P$ are the prices of the European call and put, and the last two blocks are their no-arbitrage bounds.
- **European and American:** An American option can be exercised at any time up to $T$, so it is worth at least as much as the European option with the same terms. For a call on a non-dividend-paying stock the two are worth the same, because exercising that call early is never optimal.
- **Moneyness:** A call is in the money when $S > K$, at the money when $S = K$ and out of the money when $S < K$, and a put is the reverse. The **intrinsic value** is what exercising now would pay, $(S - K)^+$ for a call or $(K - S)^+$ for a put, and the **time value** is the option's price less its intrinsic value.
- **Pricing:** The price comes from the [[Binomial Option Pricing Model|binomial model]] or the [[Black-Scholes Model|Black-Scholes formula]], and a call and a put with the same strike and expiry are tied together by [[Put-Call Parity|put-call parity]]. The bounds hold in every arbitrage-free model, so a quote outside them can be exploited with the asset and a bond.

> [!example]- A Deep-in-the-Money Put Worth Less Than Its Intrinsic Value {Example}
> A non-dividend-paying stock has fallen to $S_0 = 60$. A 2-year European put on it has strike $K = 100$. With $r = 0.05$ and $\sigma = 0.20$, find the put's Black-Scholes price, its intrinsic and time values, and its lower bound.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(60/100) + (0.05 + 0.02)(2)}{0.20\sqrt{2}} \\
> > &= \frac{-0.51083 + 0.14}{0.28284} \\
> > &= -1.31107
> > \end{align*}
> > $$
> > So $d_2 = -1.31107 - 0.28284 = -1.59391$, $N(-d_2) = 0.94452$, $N(-d_1) = 0.90508$ and $Ke^{-rT} = 100e^{-0.10} = 90.4837$.
> > $$
> > \begin{align*}
> > P &= 90.4837(0.94452) - 60(0.90508) \\
> > &= 85.46 - 54.30 \\
> > &= 31.16
> > \end{align*}
> > $$
> > The intrinsic value is $100 - 60 = 40$, so the time value is $31.16 - 40 = -8.84$. The lower bound is $90.48 - 60 = 30.48$, and the price is above it. The holder cannot collect the strike until $T$, so the strike is worth only its present value today. An American put on the same terms would be worth at least 40, because it could be exercised now.

> [!example]- Arbitrage from a Call Quoted Below Its Lower Bound {Example}
> A non-dividend-paying stock trades at $50$, and $r = 0.06$. A 1-year European call with strike $45$ is quoted at $7.00$. Show that the quote allows an arbitrage, and find the riskless profit per share.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Lower bound} &= S_0 - Ke^{-rT} \\
> > &= 50 - 45e^{-0.06} \\
> > &= 50 - 42.3794 \\
> > &= 7.6206
> > \end{align*}
> > $$
> > The call is cheap, so buy the call, short one share and lend $42.3794$ for one year.
> > $$
> > \begin{align*}
> > \text{Cash today} &= -7.00 + 50 - 42.3794 \\
> > &= 0.6206
> > \end{align*}
> > $$
> > At $T$ the loan returns $45$. If $S_T \geq 45$, exercising the call buys back the share for $45$, and the position closes at zero. If $S_T < 45$, the share is bought back for $S_T$ and $45 - S_T$ is left over. The profit of $0.62$ per share today is riskless, and the position can only add to it at expiry.

> [!tip]- How it appears on the exam
> - **FAM** asks candidates to "identify the cash flows and characteristics of puts and calls", such as the payoff and profit at expiry for a given $S_T$, whether an option is in or out of the money, and how a European option differs from an American one.
> - **Pricing a simple European-style derivative:** The next FAM objectives price "a simple European-style derivative on a single non-dividend paying asset" with a [[Binomial Option Pricing Model|binomial tree]] or the [[Black-Scholes Model|Black-Scholes formula]], then ask for its [[Delta Hedging|delta hedge]] or for the other option through [[Put-Call Parity|put-call parity]].
> - **Bounds:** A question can also give a quote outside the no-arbitrage bounds and ask which trades lock in a riskless profit, as in the second example.

> [!warning]- Exam traps
> - **Moneyness of a put:** A put is in the money when $S < K$. Reading a put's moneyness with the call's rule gives the wrong intrinsic value and the wrong sign for its delta.
> - **Negative time value is not an arbitrage:** A deep-in-the-money European put can sell below $K - S_0$, because its holder must wait until $T$. The bound that binds is $Ke^{-rT} - S_0$, so a put priced between the two is fair.
> - **No early exercise:** A European option is valued from its payoff at $T$ alone. Adding an early-exercise check at the interior nodes of a tree values the American option instead, which is worth more for a put.
> - **Dividends in the bounds:** With a dividend yield, the stock enters the bounds as $S_0e^{-\delta T}$. Using $S_0$ overstates the call's lower bound and can make a fair price look like an arbitrage.
