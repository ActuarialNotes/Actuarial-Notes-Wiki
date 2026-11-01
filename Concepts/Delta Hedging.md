---
aliases:
  - Delta-Hedging
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:80e9e4a489b85e06801c17a75538998cdb8dfd444329d664607000e5ae1d3c8b
  sources:
    - "SOA Exam FAM syllabus, October 2026, Topic 6 (a)-(d), p.5; readings p.8 (AMLCR Ch.16), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "M. Haugh (Columbia IEOR E4706), The Black-Scholes Model (2016), delta p.7, gamma p.8, Delta Hedging and eq.24 pp.11-12, sha256:a84225df571d081f2eb2079d8e1160d51af50c72e4fd2c52f5073ac39d6884bb — http://www.columbia.edu/~mh2078/FoundationsFE/BlackScholes.pdf"
    - "M. Cudina (UT Austin), M339D Lecture 17: Option pricing in the one-period binomial model, Lecture 17, pp.3-5, eqs. 17.1-17.4, sha256:8bcdda7a38233af8e1b15e9111762407662d5bf68fe4039cf7b67d30aff1b838 — http://web.ma.utexas.edu/users/mcudina/m339d-lecture-17-binomial-option-pricing-one-period.pdf"
    - "SOA ALTAM Fall 2024 model solutions, Q6(a)-(b), p.13, sha256:bef60a4ff411c7fa3eb0fd8d4b6a52a32d8ddf620ff365270c2a6dce96299a4f — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/fall-2024-altam-solutions.pdf"
    - "SOA ALTAM syllabus, October 2026, Topic 7 (a)-(d), p.6, sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf"
    - "SOA INV-201 syllabus, Nov 2026-Jul 2027, Topic 1(a); Topic 3(c), p.4; hedging topic (c), p.7, sha256:8b5d280585ae9d0e35943729f861ac13ada7462be850c328da93645b7bbd9bc1 — https://www.soa.org/globalassets/assets/files/edu/2026/inv-201/2026-2027-inv-201-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Delta Hedging.md
---
**Delta hedging** offsets a derivative position with $\Delta$ units of the underlying asset, $\Delta$ being the derivative's sensitivity to the asset price, so that the combined position does not gain or lose on a small price move; rebalanced as $\Delta$ changes, the stock-plus-bond position becomes a **replicating portfolio** for the derivative. It is the dynamic [[Hedging|hedge]] behind both an option market-maker's book and an insurer's hedge of an equity-linked guarantee.

> $$\Delta_{C} = e^{-\delta T} N(d_1)$$

> $$\Delta_{P} = -e^{-\delta T} N(-d_1)$$

> $$\Delta = e^{-\delta h}\,\frac{V_u - V_d}{S(u - d)}$$

> $$B = e^{-rh}\,\frac{u V_d - d V_u}{u - d}$$

> $$R(h) \approx \tfrac12 S^2 \Gamma \left[\sigma^2 h - (\epsilon/S)^2\right]$$

- The first two are the [[Black-Scholes Model|Black-Scholes]] deltas, with $d_1 = \dfrac{\ln(S/K) + (r - \delta + \sigma^2/2)T}{\sigma\sqrt{T}}$; the third and fourth are the binomial replicating portfolio, $\Delta$ shares plus $B$ in bonds, worth $V = \Delta S + B$
- A writer of the derivative holds $+\Delta$ shares per option sold (a call writer buys stock, a put writer shorts it); the hedged position earns the risk-free rate only in the limit of continuous rebalancing under the model's assumptions
- With discrete rebalancing the hedge is exact only to first order. The last block is the approximate profit $R(h)$ of a writer of a delta-hedged option on a non-dividend stock over a short period $h$ in which the stock moves by $\epsilon$, with $\Gamma$ the option's gamma: the writer gains when the realized move is smaller than the one-sigma move $\sigma S\sqrt{h}$ and loses when it is larger, so the hedge outcome depends on realized versus assumed [[Volatility|volatility]]
- For a guarantee on a [[Life Insurance|life insurance]] or annuity contract, each option's delta is weighted by the probability the benefit is paid, which assumes [[Mortality|mortality]] risk is diversified away

> [!example]- Setting and Rebalancing a Market-Maker's Hedge {Example}
> A market-maker writes $1{,}000$ six-month European calls on a non-dividend stock with $S_0 = 40$, $K = 42$, $r = 0.05$, $\sigma = 0.25$. Find the shares bought to delta-hedge, then the shares to buy one week later if the stock is at $41.50$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(40/42) + (0.05 + 0.03125)(0.5)}{0.25\sqrt{0.5}} \\
> >     &= -0.04619 \\
> > \Delta_0 &= N(-0.04619) \\
> >          &= 0.48158
> > \end{align*}
> > $$
> > The writer buys $481.58$ shares (call value $2.3954$ each, so $\$16{,}868$ is borrowed). A week later $T = 0.5 - 1/52$:
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(41.5/42) + (0.08125)(0.48077)}{0.25\sqrt{0.48077}} \\
> >     &= 0.15626 \\
> > \Delta_1 &= 0.56209
> > \end{align*}
> > $$
> > The writer buys $1{,}000(0.56209 - 0.48158) = 80.51$ more shares for about $\$3{,}341$. Delta hedging a short call means buying after rises and selling after falls.

> [!example]- Replicating a Guaranteed Minimum Maturity Benefit {Example}
> An insurer has $1{,}000$ policies issued to lives aged $60$, each with fund value $F_0 = 100$ invested in an equity index and a GMMB guaranteeing $G = 100$ to survivors at $T = 10$. The fund pays a management charge of $1\%$ a year deducted continuously, $r = 0.04$, $\sigma = 0.20$ and ${}_{10}p_{60} = 0.90$. Find the cost of the guarantee and the replicating portfolio at time $0$.
>
> > [!answer]-
> > The guarantee is a put on the fund, which behaves like a stock with dividend yield $0.01$:
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(1) + (0.04 - 0.01 + 0.02)(10)}{0.20\sqrt{10}} \\
> >     &= 0.79057 \\
> > d_2 &= 0.15811 \\
> > P &= 100e^{-0.4}N(-0.15811) - 100e^{-0.1}N(-0.79057) \\
> >   &= 67.032(0.43718) - 90.484(0.21460) \\
> >   &= 29.305 - 19.418 \\
> >   &= 9.888
> > \end{align*}
> > $$
> > The cost is $1{,}000(0.90)(9.888) = \$8{,}899$. The replicating portfolio is a **short** position of $1{,}000(0.90)(19.418) = \$17{,}476$ in the index and $1{,}000(0.90)(29.305) = \$26{,}375$ in 10-year zero-coupon bonds, net $\$8{,}899$. The insurer, being short the put, *holds* this portfolio as its hedge.

> [!example]- Hedge Profit When the Stock Jumps {Example}
> For the calls in the first example ($\Gamma = 0.056359$ at time $0$), the stock moves by $\$1.20$ over one day ($h = 1/365$). Approximate the delta-hedged writer's profit on the $1{,}000$ calls.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > R &\approx 1{,}000 \times \tfrac12 (40)^2 (0.056359)\left[\frac{0.0625}{365} - \left(\frac{1.20}{40}\right)^2\right] \\
> >   &= 45{,}087 \times (0.000171 - 0.000900) \\
> >   &= -32.86
> > \end{align*}
> > $$
> > The one-sigma daily move is $0.25(40)\sqrt{1/365} = 0.523$; a move more than twice that costs the writer about $\$32.86$, whichever direction it goes.

> [!tip]- How it appears on the exam
> - **FAM** (Black-Scholes "price and delta hedge"): compute $\Delta$ for a call or put and the number of shares to buy or sell to hedge a written position.
> - **ALTAM** ("construct a replicating portfolio ... using delta-hedging"): for a GMMB or GMDB, split the guarantee's value into its stock and bond parts, weighted by survival or death probabilities, and roll it forward to find the rebalancing cost and the hedge error at the next step.
> - **INV-201** ("the interplay between hedging assumptions and hedging outcomes"): explain or compute hedge P&L under discrete rebalancing, realized versus implied volatility, jumps and transaction costs, usually as a written answer supported by the gamma approximation.

> [!warning]- Exam traps
> - **Sign of the hedge.** A *written* call is hedged by buying $N(d_1)$ shares; a written put by *shorting* $e^{-\delta T}N(-d_1)$ shares. Quoting $\Delta_P$ as $N(-d_1)$ with a plus sign reverses the trade.
> - **Dropping $e^{-\delta T}$.** With a dividend yield (or a fund management charge) the delta is $e^{-\delta T}N(d_1)$, not $N(d_1)$.
> - **Rebalancing with the old time to expiry.** Recompute $d_1$ with the remaining term; reusing $T$ gives a delta that is slightly wrong and a rebalancing trade off by a few shares.
> - **Forgetting the survival weight on an insurance guarantee.** The GMMB hedge is ${}_{T}p_x$ times the option hedge per policy; hedging every policy in full over-hedges by the expected deaths.
