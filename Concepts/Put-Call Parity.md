---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:357ca0f81cc6f8b2022c570dd5ca08364a98f85afa7405976875a7aa7ba9ce54
  sources:
    - "SOA Exam FAM syllabus, October 2026, Topic 6 (a)-(d), p.5; readings p.8 (AMLCR Ch.16), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "SOA Exam FAM-S sample solutions (Oct 2024), Q77, Q78 p.32; Q101 p.40, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
    - "M. Haugh (Columbia IEOR E4706), The Black-Scholes Model (2016), eq.21 pp.6-7; delta, gamma, vega pp.7-9, sha256:a84225df571d081f2eb2079d8e1160d51af50c72e4fd2c52f5073ac39d6884bb — http://www.columbia.edu/~mh2078/FoundationsFE/BlackScholes.pdf"
    - "K. Foster (CCNY), Lecture Notes 5: Option Values (Hull Ch 9), Spring 2010, Upper/Lower Bounds, Put-Call Parity, Early Exercise of American Options, sha256:5d6ea3740ce0bd304c4bb3cb04a77fc163b043dd385ab2a9390ee1bc567acc04 — https://kfoster.ccny.cuny.edu/classes/spring2010/eco275/lecturenotes5.html"
    - "Wikipedia, Put-call parity (rank 3), Statement; dividends, sha256:0319f058a96ed68396350383dc92981eab17922478a78ed2f6a65b37c01c944d — https://en.wikipedia.org/wiki/Put%E2%80%93call_parity"
    - "SOA INV-201 syllabus, Nov 2026-Jul 2027, Topic 1(a); Topic 3(c), p.4; hedging topic (c), p.7, sha256:8b5d280585ae9d0e35943729f861ac13ada7462be850c328da93645b7bbd9bc1 — https://www.soa.org/globalassets/assets/files/edu/2026/inv-201/2026-2027-inv-201-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Put-Call Parity.md
---

**Put-call parity** is the no-arbitrage relation between the prices of a European call and a European put on the same underlying, with the same strike $K$ and expiry $T$. For a stock that pays no dividends, with call price $C$ and put price $P$, it is

> $$C - P = S_0 - K e^{-rT}$$

- $S_0$ is the stock price today.
- $r$ is the continuously compounded risk-free rate, so $K e^{-rT}$ is the [[Present Value|present value]] of the strike.

A long call and a short put pay $\max(S_T - K, 0) - \max(K - S_T, 0) = S_T - K$ whatever the stock price $S_T$ at expiry, so they must cost what the stock costs less the present value of the strike. The relation follows from the [[Payoff|payoffs]] alone. It holds in the binomial model, the [[Black-Scholes Model]] and any other arbitrage-free model, whatever the [[Volatility|volatility]]. It holds for each strike separately, so options on one stock with one expiry and different strikes can be related by applying it at each strike. Given an annual effective rate $i$ in place of $r$, the present value of the strike is $K(1+i)^{-T}$.

> [!example]- A stock with no dividends trades at $40$, $r = 0.05$, and a 1-year call with strike $40$ costs $4.00$. What does the matching put cost? {Example}
> - The present value of the strike is $40e^{-0.05} = 38.0492$.
> - The put is $P = C - S_0 + K e^{-rT} = 4.00 - 40 + 38.0492 = 2.05$.

## Dividend-paying stocks

When the stock pays dividends, the holder of an option does not receive them, so the stock price is replaced by the prepaid forward price $F^P_{0,T}(S)$, the price today of the stock delivered at $T$. Put-call parity is then

> $$C - P = F^P_{0,T}(S) - K e^{-rT}$$

- $F^P_{0,T}(S) = S_0 e^{-\delta T}$ for a continuous dividend yield $\delta$.
- $F^P_{0,T}(S) = S_0 - PV_{0,T}(\text{Div})$ for discrete dividends, where $PV_{0,T}(\text{Div})$ is the present value of the dividends paid before $T$.

> [!example]- What does the 6-month European put with strike $55$ cost? {Example}
> An index is at $S_0 = 50$ and pays dividends continuously at $\delta = 0.02$. The continuously compounded risk-free rate is $r = 0.05$. A 6-month European call with strike $55$ costs $2.80$.
>
> > [!answer]-
> > - The prepaid forward price is $50e^{-0.02(0.5)} = 49.5025$.
> > - The present value of the strike is $55e^{-0.05(0.5)} = 53.6420$.
> > - The put is $P = C - F^P_{0,T}(S) + K e^{-rT} = 2.80 - 49.5025 + 53.6420 = 6.94$.

## Synthetic positions and arbitrage

Rearranged, parity builds one position from the others. A long call and a short put make a synthetic forward, and a stock plus a put has the same payoff as a call plus a zero-coupon bond paying $K$. This protective put is the structure behind a guaranteed minimum maturity benefit. When quoted prices break parity, buying the cheap side and selling the rich side locks in a riskless profit.

> [!example]- What arbitrage do these quotes allow, and what is its profit per share? {Example}
> A non-dividend-paying stock trades at $100$ and $r = 0.04$. 1-year European options with strike $100$ are quoted at $C = 10.50$ and $P = 6.00$.
>
> > [!answer]-
> > - Parity requires $C - P = 100 - 100e^{-0.04} = 3.9211$.
> > - The quotes give $C - P = 4.50$, so the call is rich relative to the put.
> > - Sell the call, buy the put, buy the stock, and borrow $100e^{-0.04} = 96.0789$.
> > - Today's cash flow is $10.50 - 6.00 - 100 + 96.0789 = 0.5789$.
> > - At expiry the stock plus the put minus the call is worth exactly $100$ whatever $S_T$ is, which repays the loan.
> > - The riskless profit is $0.58$ per share, the gap $4.50 - 3.9211$.

## American options

Early exercise breaks the equality, so parity holds only for European options. For American options on a stock that pays no dividends, it weakens to the bounds

> $$S_0 - K \le C - P \le S_0 - K e^{-rT}$$

> [!trap] Dropping the dividend term
> With a dividend yield the stock enters as $S_0 e^{-\delta T}$, not $S_0$, and with cash dividends their present value comes off $S_0$. A put price too low by about $S_0(1 - e^{-\delta T})$ is this slip.
