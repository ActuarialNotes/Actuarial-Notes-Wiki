---
aliases:
  - Risk Neutral
  - Risk-Neutral
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:57d38b0806a8c30111ca1516b10cbc6ed9c3e05e55454448aac8bc8a0b1cf1d1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk-Neutral Valuation.md
---
**Risk-neutral valuation** prices a derivative as the [[Expected Value|expected]] payoff discounted at the risk-free rate $r$, where the expectation is taken under the **risk-neutral measure** $\mathbb{Q}$: the artificial probabilities under which every asset's expected total return is $r$ (a stock's price drifts at $r - \delta$, the dividends making up the rest), so every traded asset's discounted price is a martingale. Because it reproduces the cost of the replicating portfolio, it gives the unique no-arbitrage price.

> $$V_0 = e^{-rT}\, E^{\mathbb{Q}}\!\left[V_T\right]$$

> $$p^* = \frac{e^{(r-\delta)h} - d}{u - d}$$

> $$\frac{dS_t}{S_t} = (r - \delta)\,dt + \sigma\, dW^{\mathbb{Q}}_t$$

- In the binomial model $u$ and $d$ are the up and down factors over a step of length $h$, and $p^*$ is the risk-neutral probability of an up move; no-arbitrage requires $d < e^{(r-\delta)h} < u$, which is exactly $0 < p^* < 1$
- The real-world expected return $\alpha$ never enters the price. It survives only in the **market price of risk** $\lambda = (\alpha - r)/\sigma$, the drift shift that Girsanov's theorem uses to move from the real-world measure to $\mathbb{Q}$ (INV-201)
- Under $\mathbb{Q}$ in the [[Black-Scholes Model]], $E^{\mathbb{Q}}[S_T] = S_0 e^{(r-\delta)T}$ (the forward price) and $\Pr^{\mathbb{Q}}(S_T > K) = N(d_2)$, which is why $N(d_2)$ appears in the call formula
- Changing the **numeraire** gives other pricing measures: discounting by a zero-coupon bond maturing at $T$ instead of the money-market account gives the $T$-**forward measure**, under which forward prices are martingales, the standard device for interest-rate derivatives

> [!example]- One-Period Binomial Call {Example}
> A non-dividend stock is at $100$ and in one year moves to $120$ or $90$. With $r = 0.05$, price a 1-year European call with strike $105$. Compare with discounting at $r$ the real-world expected payoff when the stock's expected return is $\alpha = 0.10$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > p^* &= \frac{e^{0.05} - 0.9}{1.2 - 0.9} \\
> >     &= 0.50424 \\
> > C &= e^{-0.05}\left[0.50424(15) + 0.49576(0)\right] \\
> >   &= 7.19
> > \end{align*}
> > $$
> > With the real-world probability $p = (e^{0.10} - 0.9)/0.3 = 0.68390$, discounting at $r$ would give $e^{-0.05}(0.68390)(15) = 9.76$, an arbitrageable price. The call is worth $7.19$: real-world probabilities must be paired with a risk-adjusted discount rate, risk-neutral ones with $r$.

> [!example]- Two-Period European Put on a Dividend-Paying Stock {Example}
> A stock at $50$ pays dividends continuously at $\delta = 0.02$; $r = 0.06$. A two-period binomial tree with $h = 0.5$ uses $u = 1.15$ and $d = 0.90$. Price a 1-year European put with strike $54$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > p^* &= \frac{e^{(0.06-0.02)(0.5)} - 0.90}{1.15 - 0.90} \\
> >     &= \frac{1.020201 - 0.90}{0.25} \\
> >     &= 0.48081
> > \end{align*}
> > $$
> > Terminal prices are $S_{uu} = 66.125$, $S_{ud} = 51.75$, $S_{dd} = 40.50$, with put payoffs $0$, $2.25$ and $13.50$. For a European option only the terminal distribution matters:
> > $$
> > \begin{align*}
> > P &= e^{-0.06}\left[2p^*(1-p^*)(2.25) + (1-p^*)^2(13.50)\right] \\
> >   &= e^{-0.06}\left[1.12334 + 3.63910\right] \\
> >   &= 0.941765 \times 4.76244 \\
> >   &= 4.49
> > \end{align*}
> > $$
> > The put is worth $4.49$. The dividend yield lowers $p^*$, which raises the put's value.

> [!example]- Cash-or-Nothing Payoff: Real-World vs Risk-Neutral Probability {Example}
> A structured note pays $1{,}000$ in one year if an index, now at $100$, is above $110$. The index pays no dividends, $\sigma = 0.20$, $r = 0.04$ and its real-world expected return is $\alpha = 0.10$. Find the note's price and the market price of risk.
>
> > [!answer]-
> > Under $\mathbb{Q}$ the drift is $r$:
> > $$
> > \begin{align*}
> > d_2 &= \frac{\ln(100/110) + (0.04 - 0.02)(1)}{0.20} \\
> >     &= -0.37655 \\
> > V_0 &= 1{,}000\, e^{-0.04} N(-0.37655) \\
> >     &= 1{,}000 \times 0.960789 \times 0.35325 \\
> >     &= 339.40
> > \end{align*}
> > $$
> > The real-world probability of paying is $N(-0.07655) = 0.46949$ (drift $\alpha$ in place of $r$), which would give $451.08$. The market price of risk is $\lambda = (0.10 - 0.04)/0.20 = 0.30$. The note costs $339.40$; the higher real-world probability is the investor's reward for risk, not part of the price.

> [!tip]- How it appears on the exam
> - **FAM** (option pricing "using risk neutral expected present values"): one- or two-period binomial trees for European calls and puts on a stock with a dividend yield, given $u$, $d$, $h$, $r$, $\delta$; often paired with the replicating portfolio $(\Delta, B)$ in the same question.
> - **FAM**: [[Black-Scholes Model|Black-Scholes]] prices read as risk-neutral expectations, then [[Put-Call Parity|put-call parity]] to get the other option.
> - **INV-201** ("risk-neutral measure, forward measure, normalization, and the market price of risk"): derive the $\mathbb{Q}$-dynamics of a price via Girsanov, identify which normalized prices are martingales under which measure, and compute $\lambda$ from a given $\alpha$, $r$ and $\sigma$.
> - **INV-201**: written answers explaining why the real-world drift does not affect a hedgeable payoff's price, and why incomplete markets (mortality, policyholder behaviour) admit many risk-neutral measures.

> [!warning]- Exam traps
> - **Using real-world probabilities with $r$.** If the question gives $\alpha$, it is usually a distractor for the price; it matters only for real-world questions (probability of exercise, expected payoff, Sharpe ratio).
> - **Forgetting $\delta$ in $p^*$.** With a dividend yield the numerator is $e^{(r-\delta)h} - d$, not $e^{rh} - d$; dropping it overstates $p^*$ and overprices calls.
> - **Discounting per step with the full term.** Each binomial step discounts by $e^{-rh}$; a two-step tree discounts by $e^{-2rh} = e^{-rT}$, not $e^{-rT}$ at every node.
> - **Valuing an American option from terminal probabilities alone.** The shortcut sum over terminal nodes works only for European payoffs; an American option needs node-by-node backward induction with an early-exercise check.
