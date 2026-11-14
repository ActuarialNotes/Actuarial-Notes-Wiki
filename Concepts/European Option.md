---
aliases:
  - Simple European-style Derivative
  - Simple Option
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:eb55090413094bbbcec867da12a0740f7d97ccc8c423fe9aa239ee67a6276597
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

A **European Option** gives its holder the right, but not the obligation, to buy (a **call**) or sell (a **put**) an underlying asset at a fixed strike price $K$ on one date only, the expiry date $T$. With $S_T$ the asset's price at expiry, the payoffs are

> $$\text{Call payoff} = (S_T - K)^+$$

> $$\text{Put payoff} = (K - S_T)^+$$

- $(x)^+ = \max(x, 0)$.

More generally, a **simple European-style derivative** pays an amount $g(S_T)$ that depends only on the asset's price at the single date $T$, so calls, puts and cash-or-nothing payoffs are all of this kind. Its price is the [[Risk-Neutral Valuation|risk-neutral]] expected [[Present Value|present value]] of the [[Payoff|payoff]]. The price comes from the [[Binomial Option Pricing Model|binomial model]] or the [[Black-Scholes Model|Black-Scholes formula]], and a call and a put with the same strike and expiry are tied together by [[Put-Call Parity|put-call parity]].

## Moneyness, intrinsic value and time value

A call is in the money when $S > K$, at the money when $S = K$ and out of the money when $S < K$, and a put is the reverse. The **intrinsic value** is what exercising now would pay, $(S - K)^+$ for a call or $(K - S)^+$ for a put. The **time value** is the option's price less its intrinsic value.

A deep-in-the-money European put can have a negative time value, because its holder cannot collect the strike until $T$. A put on a non-dividend-paying stock at $S_0 = 60$ with $K = 100$, $T = 2$, $r = 0.05$ and $\sigma = 0.20$ has a Black-Scholes price of $31.16$, below its intrinsic value of $40$.

> [!trap] Reading a put's moneyness with the call's rule
> A put is in the money when $S < K$. Reading a put's moneyness with the call's rule gives the wrong intrinsic value.

## European and American options

An American option can be exercised at any time up to $T$, so it is worth at least as much as the European option with the same terms. For a call on a non-dividend-paying stock the two are worth the same, because exercising that call early is never optimal. A European option is valued from its payoff at $T$ alone, so a tree that checks for early exercise at its interior nodes values the American option instead.

## No-arbitrage bounds

Following McDonald, with $r$ the continuously compounded risk-free rate and $\delta$ the continuous dividend yield, the price $C$ of a European call is bounded by

> $$\max\!\left(0,\; S_0e^{-\delta T} - Ke^{-rT}\right) \leq C \leq S_0e^{-\delta T}$$

and the price $P$ of a European put by

> $$\max\!\left(0,\; Ke^{-rT} - S_0e^{-\delta T}\right) \leq P \leq Ke^{-rT}$$

- $S_0$ is the asset's price today.
- FAM's objectives use a non-dividend-paying asset, so $\delta = 0$ there.

The bounds hold in every arbitrage-free model, so a quote outside them can be exploited with the asset and a bond. The deep-in-the-money put above is priced above its lower bound of $100e^{-0.10} - 60 = 30.48$, so its negative time value is not an arbitrage.

> [!example]- How does this call quote allow an arbitrage, and what is the riskless profit per share? {Example}
> A non-dividend-paying stock trades at $50$, and $r = 0.06$. A 1-year European call with strike $45$ is quoted at $7.00$.
>
> > [!answer]-
> > - The lower bound is $S_0 - Ke^{-rT} = 50 - 45e^{-0.06} = 50 - 42.3794 = 7.6206$.
> > - The call is cheap, so buy the call, short one share and lend $42.3794$ for one year.
> > - The cash today is $-7.00 + 50 - 42.3794 = 0.6206$.
> > - At $T$ the loan returns $45$. If $S_T \geq 45$, exercising the call buys back the share for $45$, and the position closes at zero.
> > - If $S_T < 45$, the share is bought back for $S_T$ and $45 - S_T$ is left over.
> > - The profit of $0.62$ per share today is riskless, and the position can only add to it at expiry.
