---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:143dc5db9bb1b32057b8e275e986b52133bee466470baba73e136c06b6c5f760
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Put-Call Parity.md
---

**Put-call parity** is the no-arbitrage identity linking a European call $C$ and a European put $P$ on the same underlying, with the same strike $K$ and expiry $T$: a long call plus a short put pays $S_T - K$ in every state, so it must cost what a forward purchase of the asset at $K$ costs today, the [[Present Value|present value]] of the asset less the present value of the strike.

> $$C - P = F^P_{0,T}(S) - K e^{-rT}$$

> $$C - P = S_0 e^{-\delta T} - K e^{-rT}$$

- $F^P_{0,T}(S)$ is the **prepaid forward price**: $S_0$ for a non-dividend stock, $S_0 e^{-\delta T}$ with a continuous dividend yield $\delta$, and $S_0 - PV_{0,T}(\text{Div})$ with discrete dividends; $r$ is the continuously compounded risk-free rate
- It is **model-free**: it follows from the [[Payoff|payoffs]] alone ($\max(S_T-K,0) - \max(K-S_T,0) = S_T - K$), so it holds under the binomial model, the [[Black-Scholes Model]] and any other arbitrage-free model, and under any [[Volatility|volatility]]
- Rearranged it builds **synthetic positions**: long call + short put = synthetic forward; stock + put = call + bond (the protective put behind a guaranteed minimum maturity benefit)
- It holds only for **European** options. For American options on a non-dividend stock it weakens to the bounds $S_0 - K \leq C - P \leq S_0 - K e^{-rT}$, part of the price bounds INV-201 pairs with parity

> [!example]- Pricing a Put from a Quoted Call {Example}
> An index is at $S_0 = 50$ and pays dividends continuously at $\delta = 0.02$. The continuously compounded risk-free rate is $r = 0.05$. A 6-month European call with strike $55$ costs $2.80$. Find the price of the 6-month European put with strike $55$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P &= C - S_0 e^{-\delta T} + K e^{-rT} \\
> >   &= 2.80 - 50e^{-0.01} + 55e^{-0.025} \\
> >   &= 2.80 - 49.5025 + 53.6420 \\
> >   &= 6.94
> > \end{align*}
> > $$
> > The put is worth $6.94$: it is in the money ($K > S_0$), so it costs more than the out-of-the-money call.

> [!example]- Exploiting a Parity Violation {Example}
> A non-dividend-paying stock trades at $100$, $r = 0.04$, and 1-year European options with strike $100$ are quoted at $C = 10.50$ and $P = 6.00$. Show an arbitrage and its profit per share.
>
> > [!answer]-
> > Parity requires
> > $$
> > \begin{align*}
> > C - P &= S_0 - K e^{-rT} \\
> >       &= 100 - 100e^{-0.04} \\
> >       &= 3.9211
> > \end{align*}
> > $$
> > but the quotes give $C - P = 4.50$, so the call is rich relative to the put. **Sell the call, buy the put, buy the stock, and borrow $96.0789$** (the present value of $K$). Today's cash flow is
> > $$
> > \begin{align*}
> > \Pi_0 &= 10.50 - 6.00 - 100 + 96.0789 \\
> >       &= 0.5789
> > \end{align*}
> > $$
> > At $T$ the stock plus put minus call is worth exactly $K = 100$ whatever $S_T$ is, which repays the loan. The riskless profit is $0.58$ per share, the gap $4.50 - 3.9211$.

> [!example]- Parity with Discrete Dividends {Example}
> A stock trades at $80$ and will pay dividends of $1$ at $t = 0.25$ and $t = 0.75$. With $r = 0.06$, a 1-year European put with strike $75$ costs $3.20$. Find the price of the 1-year European call with strike $75$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > PV(\text{Div}) &= e^{-0.06(0.25)} + e^{-0.06(0.75)} \\
> >                &= 1.9411 \\
> > C &= P + (S_0 - PV(\text{Div})) - K e^{-rT} \\
> >   &= 3.20 + 78.0589 - 75e^{-0.06} \\
> >   &= 3.20 + 78.0589 - 70.6323 \\
> >   &= 10.63
> > \end{align*}
> > $$
> > The call is worth $10.63$. Ignoring the dividends would give $12.57$: the call holder does not receive them, so they come off the prepaid forward.

> [!tip]- How it appears on the exam
> - **FAM** (objective "apply put-call parity"): given three of $C$, $P$, $S_0$, $K$, $r$, $\delta$, solve for the fourth, often a put price from a [[Black-Scholes Model|Black-Scholes]] call or a [[Risk-Neutral Valuation|binomial]] call computed earlier in the question.
> - **FAM**: parity used backwards to find an implied dividend yield, an implied risk-free rate, or the strike at which $C = P$ (the forward price, $K = S_0 e^{(r-\delta)T}$).
> - **INV-201** ("understand put-call parity and price bounds"): identify which quotes violate parity or the bounds, and describe the arbitrage trades and their cash flows today and at expiry, as a written answer.
> - **INV-201**: parity for [[Delta Hedging|delta]] and the other Greeks, $\Delta_C - \Delta_P = e^{-\delta T}$ and equal gammas and vegas, used to convert a hedge in calls into one in puts.

> [!warning]- Exam traps
> - **Dropping the dividend term.** With a dividend yield the stock enters as $S_0 e^{-\delta T}$, not $S_0$; with cash dividends subtract their present value. A put price that comes out too low by about $S_0(1-e^{-\delta T})$ is this slip.
> - **Discounting the strike at the wrong rate basis.** $Ke^{-rT}$ needs a continuously compounded $r$; given an annual effective rate, use $K(1+i)^{-T}$. Mixing them moves the answer by cents and lands on a wrong choice.
> - **Applying parity to American options.** Early exercise breaks the equality; only the inequalities hold, and with dividends even those change.
> - **Getting the arbitrage direction backwards.** If $C - P$ exceeds $F^P - Ke^{-rT}$, *sell* the call, *buy* the put and buy the stock with borrowed money; reversing every leg locks in a loss of the same size.
