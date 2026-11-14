---
aliases:
  - Binomial Option Pricing
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:d0d27ce8d003b57ec944963dac49fbad4cd40f5654ef80a4cadeae6c1b1183c2
  sources:
    - "SOA Exam FAM syllabus, October 2026, Topic 6 (a)-(d), p.5; readings p.8 (AMLCR Ch.16), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "M. Cudina (UT Austin), M339D Lecture 17: Option pricing in the one-period binomial model, Lecture 17, pp.3-5, eqs. 17.1-17.4, sha256:8bcdda7a38233af8e1b15e9111762407662d5bf68fe4039cf7b67d30aff1b838 — http://web.ma.utexas.edu/users/mcudina/m339d-lecture-17-binomial-option-pricing-one-period.pdf"
    - "M. Cudina (UT Austin), M339D Lecture 18: The forward binomial tree, Lecture 18, pp.1-2, sha256:fcac094be5476cfcd6f557d78c6493d01b209d49922cddd58b2d1002720dbaed — http://web.ma.utexas.edu/users/mcudina/m339d-lecture-18-forward-trees.pdf"
    - "K. Sigman (Columbia), Binomial lattice model for stock prices (2007), pp.1-3, eqs. 3-9, sha256:e638c7c5da07b00908e9dff9297df74e5b26c7cbde1f149f29e770fbf25df2cb — http://www.columbia.edu/~ks20/FE-Notes/4700-07-Notes-BLM.pdf"
    - "SOA Exam FAM-S sample solutions (Oct 2024), Q100 p.39; Q103 p.40; Q108 p.43, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
    - "Wikipedia, Binomial options pricing model (rank 3), Method, Step 3; Relationship with Black-Scholes, sha256:b12df888884415d33dcc0e61f7c506c7ed5654e6b63f73515965e2f3db9e146b — https://en.wikipedia.org/wiki/Binomial_options_pricing_model"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Binomial Option Pricing Model.md
---
The **Binomial Option Pricing Model** is a model that values an option by assuming that, over each period of length $h$, the price of the underlying asset either rises by a factor $u$ or falls by a factor $d$. Over one period, the price $C$ of an option on an asset priced at $S$ is its expected payoff under the [[Risk-Neutral Valuation|risk-neutral]] probability, discounted at the risk-free rate, which is

> $$C = e^{-rh}\left[p^*C_u + (1 - p^*)\,C_d\right]$$

- $C_u$ and $C_d$ are the option's values after an up move and after a down move.
- $r$ is the continuously compounded risk-free rate.
- $p^*$ is the risk-neutral probability of an up move.

The risk-neutral probability of an up move is

> $$p^* = \frac{e^{(r - \delta)h} - d}{u - d}$$

- $\delta$ is the asset's dividend yield. FAM's objectives use a non-dividend-paying asset, so $\delta = 0$.

The tree is free of arbitrage only if $d < e^{(r - \delta)h} < u$, which is the same as $0 < p^* < 1$. The same formulas price a put or any other [[European Option|simple European-style derivative]], with $C$ replaced by that derivative's value.

> [!example]- What is the price of a 1-year European call with strike $85$ on this stock? {Example}
> A non-dividend-paying stock is priced at $80$. In one year it will be worth $80u = 100$ or $80d = 68$, so $u = 1.25$ and $d = 0.85$. The risk-free rate is $r = 0.04$.
>
> > [!answer]-
> > - The call pays $C_u = 100 - 85 = 15$ after an up move and $C_d = 0$ after a down move.
> > - The risk-neutral probability is $p^* = (e^{0.04} - 0.85)/(1.25 - 0.85) = 0.477027$.
> > - The price is $C = e^{-0.04}\left[0.477027(15) + 0.522973(0)\right] = 6.8748$.

## The replicating portfolio

Over one period, the option's two possible values can be reproduced by a [[Replicating Portfolio|replicating portfolio]] of $\Delta$ shares of the asset and $B$ in risk-free bonds, so the option must cost what that portfolio costs. The number of shares is

> $$\Delta = e^{-\delta h}\,\frac{C_u - C_d}{S(u - d)}$$

The amount in bonds is

> $$B = e^{-rh}\,\frac{u\,C_d - d\,C_u}{u - d}$$

The price of the option is

> $$C = \Delta S + B$$

A call is replicated by buying shares and borrowing ($\Delta > 0$, $B < 0$), and a put by shorting shares and lending ($\Delta < 0$, $B > 0$). The real-world probability of an up move never enters the price, because the replicating portfolio matches the payoff in both states whatever their probabilities are.

> [!example]- What portfolio replicates the 1-year call with strike $85$ on this stock? {Example}
> A non-dividend-paying stock is priced at $80$ and will be worth $100$ or $68$ in one year, so $u = 1.25$ and $d = 0.85$. The risk-free rate is $r = 0.04$. The call pays $C_u = 15$ or $C_d = 0$.
>
> > [!answer]-
> > - The number of shares is $\Delta = \frac{15 - 0}{80(1.25 - 0.85)} = 0.46875$.
> > - The amount in bonds is $B = e^{-0.04}\,\frac{1.25(0) - 0.85(15)}{0.40} = 0.960789(-31.875) = -30.6252$.
> > - The call is replicated by buying $0.46875$ shares and borrowing $30.6252$.
> > - Its price is $C = 0.46875(80) - 30.6252 = 6.8748$, the same as the risk-neutral price.

## Multi-period trees

A tree of $n$ periods is valued one node at a time with the one-period formula, starting from the payoffs at expiry. McDonald's forward tree builds the factors from the [[Volatility|volatility]] $\sigma$. Its up factor is

> $$u = e^{(r - \delta)h + \sigma\sqrt{h}}$$

Its down factor is

> $$d = e^{(r - \delta)h - \sigma\sqrt{h}}$$

These factors make $p^* = 1/(1 + e^{\sigma\sqrt{h}})$. As the number of periods grows, the binomial price of a European option converges to the [[Black-Scholes Model|Black-Scholes]] price.

A European option depends only on the terminal payoffs, so its price is also the discounted risk-neutral expectation over the terminal nodes. For a tree of $n$ periods, that price is

> $$C = e^{-rT}\sum_{k=0}^{n}\binom{n}{k}(p^*)^k(1 - p^*)^{n-k}\,C_k$$

- $T = nh$ is the time to expiry.
- $C_k$ is the payoff at the terminal node reached by $k$ up moves and $n - k$ down moves.

> [!example]- What is the price of a 1-year European put with strike $100$ on this stock? {Example}
> A non-dividend-paying stock is priced at $100$, with $\sigma = 0.25$ and $r = 0.05$. The put is priced on a two-period forward tree with $h = 0.5$.
>
> > [!answer]-
> > - The up factor is $u = e^{0.025 + 0.176777} = 1.223575$ and the down factor is $d = e^{0.025 - 0.176777} = 0.859180$.
> > - The risk-neutral probability is $p^* = 1/(1 + e^{0.176777}) = 0.455921$, so $1 - p^* = 0.544079$.
> > - The stock ends at $149.71$, $105.13$ or $73.82$, so the put pays $0$, $0$ or $100 - 73.82 = 26.180952$.
> > - Only the path with two down moves pays, with risk-neutral probability $0.544079^2 = 0.296022$.
> > - The price is $e^{-0.05}(0.296022)(26.180952) = 7.37$.

## American options

An American option is worth the larger of its exercise value and its continuation value at every node, so early exercise has to be checked node by node. The exercise value at a node uses that node's asset price.

> [!example]- What is the price of a 1-year American put with strike $100$ on this stock? {Example}
> A non-dividend-paying stock is priced at $100$, and $r = 0.05$. On a two-period forward tree with $h = 0.5$, $u = 1.223575$, $d = 0.859180$ and $p^* = 0.455921$. The European put on the same tree is worth $7.37$.
>
> > [!answer]-
> > - Each step discounts by $e^{-0.025} = 0.975310$.
> > - After an up move both outcomes pay nothing, so the put is worth $0$ there.
> > - After a down move the stock is $85.92$. The continuation value is $0.975310(0.544079)(26.180952) = 13.8928$.
> > - Exercising there pays $100 - 85.9180 = 14.0820$, which is more than $13.8928$, so the put is exercised.
> > - The price is $0.975310(0.544079)(14.0820) = 7.47$, so the right to exercise early adds $0.10$.

> [!trap] Discounting by $e^{-rT}$ at every step
> Each step of a tree discounts by $e^{-rh}$, so a two-step tree discounts the terminal payoffs by $e^{-2rh} = e^{-rT}$ in total. Discounting by $e^{-rT}$ at every node discounts twice and understates the price.
