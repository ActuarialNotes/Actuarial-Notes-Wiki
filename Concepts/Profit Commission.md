---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:831a94a53bd0a3f0d78b84decce68ef0f62d15b5c286c5278dccd74ecc331487
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.12-13 (profit commission definition and 55/25/10/50% example, aggregate evaluation, carryforward ambiguity), pp.46-48 (profit commissions on finite risk covers, 75% of premium if loss free), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Profit Commission.md
---

A **Profit Commission** is additional commission the reinsurer pays the cedant at the end of a contract period, a stated percentage of the reinsurer's profit on the treaty. Profit is measured as premium less losses, less the ceding commission, less an agreed margin for the reinsurer's expenses. It is paid only when that profit is positive, so the cedant shares the upside and never the downside.

With every term a ratio to ceded premium, the profit commission is

> $$\text{PC} = k \times \max\left(0,\; 1 - \text{LR} - c - m\right)$$

- $k$ is the share of profit returned to the cedant.
- $\text{LR}$ is the treaty loss ratio.
- $c$ is the ceding commission.
- $m$ is the reinsurer's margin.

> [!example]- What is the profit commission on this quota share in a year with a $60\%$ loss ratio? {Example}
> The quota share has a $25\%$ ceding commission and a profit commission of $20\%$ after a $5\%$ margin.
>
> > [!answer]-
> > - The profit is $1 - 0.60 - 0.25 - 0.05 = 10\%$ of ceded premium.
> > - The profit commission is $0.20 \times 10\% = 2\%$ of ceded premium.

A profit commission never increases the reinsurer's expected margin. To leave that margin unchanged, the base terms must tighten, with a lower flat commission, a higher rate, or both. A [[Sliding Scale Commissions|sliding scale]], by contrast, moves the commission both ways within bounds. Profit commissions also appear on excess and catastrophe covers, for example returning a large share of premium if the contract is loss-free for several years. Heavy profit commissions are a hallmark of [[Finite Reinsurance|finite reinsurance]] and one of the features that can defeat [[Risk Transfer|risk transfer]]. See [[Reinsurance Contract Provisions]].

## Deficit carryforward

A deficit (negative profit) in one year is often carried into the next year's calculation. The deficit is subtracted from the next year's profit before the commission percentage is applied. That lowers the expected profit commission, but a single-year pricing view ignores it. Clark notes the same ambiguity in pricing carryforwards as for sliding scales.

> [!example]- What is the profit commission in each year of this treaty, and what would year 2's be with no carryforward? {Example}
> A quota share cedes $\$8$M of premium each year, with a $27.5\%$ ceding commission. The profit commission is $40\%$ of profit after a $7.5\%$ margin, with deficits carried forward. Year 1's loss ratio is $70\%$ and year 2's is $55\%$.
>
> > [!answer]-
> > - Year 1's profit is $100\% - 70\% - 27.5\% - 7.5\% = -5\%$, so no profit commission is paid.
> > - The deficit of $0.05 \times \$8\text{M} = \$400{,}000$ carries forward.
> > - Year 2's profit is $(100 - 55 - 27.5 - 7.5)\% \times \$8\text{M} = \$800{,}000$.
> > - Year 2's profit commission is $0.40 \times (\$800{,}000 - \$400{,}000) = \$160{,}000$.
> > - With no carryforward it would be $0.40 \times \$800{,}000 = \$320{,}000$.
> > - The carryforward halves year 2's payment, so the reinsurer recovers part of year 1's loss before sharing year 2's profit.

## Expected profit commission

> [!idea] The idea
> A profit commission is a call option the cedant holds on the treaty's profit, so its expected value grows with the volatility of the loss ratio.

Because the payoff is convex, $E[\text{PC}] \ge \text{PC}(E[\text{LR}])$. Clark evaluates it over an [[Aggregate Loss Model|aggregate distribution]] of the loss ratio, where the expected profit commission is

> $$E[\text{PC}] = k \sum_i p_i \max\left(0,\; 1 - \text{LR}_i - c - m\right)$$

- $p_i$ is the probability of loss-ratio outcome $\text{LR}_i$.

> [!example]- What is this treaty's expected profit commission, and the reinsurer's expected loss-plus-commission ratio? {Example}
> A quota share has $\$20$M of ceded premium, a $25\%$ ceding commission, and a profit commission of $20\%$ after a $5\%$ margin. The treaty loss ratio is:
>
> | Loss ratio | Probability |
> | ---: | ---: |
> | 40% | 0.2 |
> | 60% | 0.4 |
> | 80% | 0.3 |
> | 100% | 0.1 |
>
> > [!answer]-
> > - The expected loss ratio is $0.2(40) + 0.4(60) + 0.3(80) + 0.1(100) = 66\%$.
> > - $\text{PC} = 0.20\max(0, 70 - \text{LR})$ is $6$, $2$, $0$ and $0$ points in the four outcomes.
> > - $E[\text{PC}] = 0.2(6) + 0.4(2) = 2.0\%$, or $\$400{,}000$.
> > - The reinsurer's expected ratio is $66 + 25 + 2.0 = 93.0\%$.

> [!trap] Pricing the profit commission at the expected loss ratio
> The plug-in $0.20(70 - 66) = 0.8\%$, or $\$160{,}000$, understates the $2.0\%$ the reinsurer gives away in the example. It gives zero whenever the expected loss ratio exceeds $1 - c - m$. Compute the commission in each outcome, then average.
