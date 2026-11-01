---
aliases:
  - Simple European-style Derivative
  - Simple Option
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:476f46a7f791d9d39b4b698206609b0901421048d3c7a12de5e1c0c4542b7636
  sources:
    - "SOA Exam FAM syllabus, October 2026, Topic 6 (a)-(d), p.5; readings p.8 (AMLCR Ch.16), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "K. Foster (CCNY), Lecture Notes 5: Option Values (Hull Ch 9), Spring 2010, Upper/Lower Bounds, Put-Call Parity, Early Exercise of American Options, sha256:5d6ea3740ce0bd304c4bb3cb04a77fc163b043dd385ab2a9390ee1bc567acc04 — https://kfoster.ccny.cuny.edu/classes/spring2010/eco275/lecturenotes5.html"
    - "Wikipedia, Moneyness (rank 3), Intrinsic value and time value; ITM/ATM/OTM, sha256:959eee255f5ae94f582fe9ed125f1d4f4d3935f1953cae15cf9b9033af18bd0f — https://en.wikipedia.org/wiki/Moneyness"
    - "M. Haugh (Columbia IEOR E4706), The Black-Scholes Model (2016), eqs. 13, 21 pp.3, 6, sha256:a84225df571d081f2eb2079d8e1160d51af50c72e4fd2c52f5073ac39d6884bb — http://www.columbia.edu/~mh2078/FoundationsFE/BlackScholes.pdf"
    - "M. Cudina (UT Austin), M339D Lecture 17: Option pricing in the one-period binomial model, Lecture 17, pp.3-5, eqs. 17.1-17.4, sha256:8bcdda7a38233af8e1b15e9111762407662d5bf68fe4039cf7b67d30aff1b838 — http://web.ma.utexas.edu/users/mcudina/m339d-lecture-17-binomial-option-pricing-one-period.pdf"
    - "SOA Exam FAM-S sample questions (Oct 2024), Q77, Q78 p.62; Q100 p.82; Q103 p.85, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
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
> - **Moneyness of a put:** A put is in the money when $S < K$. Reading a put's moneyness with the call's rule gives the wrong intrinsic value.
> - **Negative time value is not an arbitrage:** A deep-in-the-money European put can sell below $K - S_0$, because its holder must wait until $T$. The bound that binds is $Ke^{-rT} - S_0$, so a put priced between the two is fair.
> - **No early exercise:** A European option is valued from its payoff at $T$ alone. Adding an early-exercise check at the interior nodes of a tree values the American option instead, which is worth more for a put.
> - **Dividends in the bounds:** With a dividend yield, the stock enters the bounds as $S_0e^{-\delta T}$. Using $S_0$ overstates the call's lower bound and can make a fair price look like an arbitrage.
