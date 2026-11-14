---
aliases:
  - Delta-Hedging
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:a648a1708b9bb85528e98ad47c2f76919800be82d86c2d9c25287a04cfcc8afd
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
**Delta Hedging** is a dynamic [[Hedging|hedge]] that offsets a derivative position with $\Delta$ units of the underlying asset, $\Delta$ being the derivative's sensitivity to the asset price, so that the combined position does not gain or lose on a small price move. Rebalanced as $\Delta$ changes, the stock-plus-bond position becomes a replicating portfolio for the derivative. In the [[Black-Scholes Model|Black-Scholes model]], the delta of a European call on a stock with dividend yield $\delta$ is

> $$\Delta_{C} = e^{-\delta T} N(d_1)$$

- $N(\cdot)$ is the standard normal CDF.
- $T$ is the time to expiry in years.

The delta of the matching put is

> $$\Delta_{P} = -e^{-\delta T} N(-d_1)$$

The argument $d_1$ is

> $$d_1 = \dfrac{\ln(S/K) + (r - \delta + \sigma^2/2)T}{\sigma\sqrt{T}}$$

- $S$ is the stock price and $K$ is the strike.
- $r$ is the continuously compounded risk-free rate and $\sigma$ is the [[Volatility|volatility]].

For FAM's non-dividend-paying stock, $\delta = 0$, so the call's delta is $N(d_1)$ and the put's is $-N(-d_1) = N(d_1) - 1$. A position's delta is the number of options times each option's delta, positive for options held and negative for options written. A hedge holds shares equal to the negative of the position's delta, so the total delta is zero. A writer of the derivative holds $+\Delta$ shares per option sold (a call writer buys stock, a put writer shorts it). The hedged position earns the risk-free rate only in the limit of continuous rebalancing under the model's assumptions. In a binomial tree, the shares and bonds that hedge an option over one period are its [[Binomial Option Pricing Model#The replicating portfolio|replicating portfolio]].

> [!example]- How many shares does this market-maker buy to delta-hedge, and how many more one week later? {Example}
> A market-maker writes $1{,}000$ six-month European calls on a non-dividend-paying stock with $S_0 = 40$, $K = 42$, $r = 0.05$ and $\sigma = 0.25$. One week later the stock is at $41.50$.
>
> > [!answer]-
> > - At the start, $\ln(40/42) = -0.048790$, $(r + \sigma^2/2)T = 0.040625$ and $\sigma\sqrt{T} = 0.176777$.
> > - So $d_1 = (-0.048790 + 0.040625)/0.176777 = -0.04619$.
> > - Each call's delta is $\Delta_0 = N(-0.04619) = 0.48158$.
> > - The writer buys $481.58$ shares. Each call is worth $2.3954$, so $\$16{,}868$ is borrowed.
> > - A week later the time to expiry is $T = 0.5 - 1/52 = 0.48077$.
> > - Then $\ln(41.5/42) = -0.011976$, $(r + \sigma^2/2)T = 0.039063$ and $\sigma\sqrt{T} = 0.173344$.
> > - So $d_1 = (-0.011976 + 0.039063)/0.173344 = 0.15626$ and $\Delta_1 = N(0.15626) = 0.56209$.
> > - The writer buys $1{,}000(0.56209 - 0.48158) = 80.51$ more shares, for about $\$3{,}341$.

## Hedging an insurance guarantee

For a guarantee on a [[Life Insurance|life insurance]] or annuity contract, each option's delta is weighted by the probability the benefit is paid, which assumes [[Mortality|mortality]] risk is diversified away. A fund that pays a management charge deducted continuously behaves like a stock with that charge as its dividend yield.

> [!example]- What is the cost of this guarantee, and what portfolio replicates it at issue? {Example}
> An insurer has $1{,}000$ policies issued to lives aged $60$. Each has a fund value $F_0 = 100$ invested in an equity index and a GMMB guaranteeing $G = 100$ to survivors at $T = 10$. The fund pays a management charge of $1\%$ a year, deducted continuously. Also, $r = 0.04$, $\sigma = 0.20$ and ${}_{10}p_{60} = 0.90$.
>
> > [!answer]-
> > - The guarantee is a put on the fund, which behaves like a stock with dividend yield $0.01$.
> > - $d_1 = (0 + 0.05 \times 10)/(0.20\sqrt{10}) = 0.5/0.63246 = 0.79057$ and $d_2 = 0.79057 - 0.63246 = 0.15811$.
> > - The bond part is $100e^{-0.4}N(-0.15811) = 67.032(0.43718) = 29.305$.
> > - The fund part is $100e^{-0.1}N(-0.79057) = 90.484(0.21460) = 19.418$.
> > - The put is $29.305 - 19.418 = 9.888$.
> > - The cost is $1{,}000(0.90)(9.888) = \$8{,}899$.
> > - The replicating portfolio is a short position of $1{,}000(0.90)(19.418) = \$17{,}476$ in the index and $1{,}000(0.90)(29.305) = \$26{,}375$ in 10-year zero-coupon bonds, net $\$8{,}899$.
> > - The insurer is short the put, so it holds this portfolio as its hedge.

## Hedge error with discrete rebalancing

With discrete rebalancing the hedge is exact only to first order. Over a short period $h$ in which a non-dividend-paying stock moves by $\epsilon$, the approximate profit of a writer of a delta-hedged option is

> $$R(h) \approx \tfrac12 S^2 \Gamma \left[\sigma^2 h - (\epsilon/S)^2\right]$$

- $\Gamma$ is the option's gamma.

The writer gains when the realized move is smaller than the one-sigma move $\sigma S\sqrt{h}$ and loses when it is larger. The hedge outcome therefore depends on realized against assumed volatility.

> [!example]- What is the delta-hedged writer's approximate profit on these calls over the day? {Example}
> A market-maker has written and delta-hedged $1{,}000$ calls on a stock at $S = 40$ with $\sigma = 0.25$. Each call's gamma is $\Gamma = 0.056359$. Over one day ($h = 1/365$) the stock moves by $\$1.20$.
>
> > [!answer]-
> > - $\tfrac12 S^2 \Gamma$ for the $1{,}000$ calls is $1{,}000 \times \tfrac12 (40)^2 (0.056359) = 45{,}087$.
> > - $\sigma^2 h = 0.0625/365 = 0.000171$ and $(\epsilon/S)^2 = (1.20/40)^2 = 0.000900$.
> > - The profit is $45{,}087 \times (0.000171 - 0.000900) = -32.86$.
> > - The one-sigma daily move is $0.25(40)\sqrt{1/365} = 0.523$, so a move of more than twice that costs the writer about $\$32.86$, in either direction.

> [!trap] Hedging a written put by buying shares
> A written call is hedged by buying $e^{-\delta T}N(d_1)$ shares, and a written put by shorting $e^{-\delta T}N(-d_1)$ shares. Quoting $\Delta_P$ as $N(-d_1)$ with a plus sign reverses the trade.
