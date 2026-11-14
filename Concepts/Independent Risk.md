---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:87b069b2389a62db54b5398d21e9a744163e6f4dfdaf8e070dcbdbf1a23f10bd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Independent Risk.md
---

**Independent Risk** is the part of the uncertainty in insurance liabilities that comes from the randomness inherent in the insurance process. In [[A Framework for Assessing Risk Margins (Marshall et al. - 2008)|Marshall et al. (2008)]] it is one of the three sources of uncertainty a [[Risk Margin|risk margin]] must cover, alongside [[Internal Systemic Risk|internal]] and [[External Systemic Risk|external systemic risk]].

The independent risk [[Coefficient of Variation|CoV]] of a group of valuation portfolios is

> $$\mathrm{CoV}_{\text{ind}} = \frac{\sqrt{\sum_i (w_i\,\mathrm{CoV}_i)^2}}{\sum_i w_i}$$

- $w_i$ is valuation portfolio $i$'s share of the central estimate, by class and separately for outstanding claim and premium liabilities.
- $\mathrm{CoV}_i$ is portfolio $i$'s independent risk CoV.

There are no cross terms, because independent risk is uncorrelated with every other source of uncertainty and between valuation portfolios. The paper's worked example combines its independent risk CoVs in exactly this way. Systemic risks are correlated across classes and do not diversify this way, which is why the framework assesses them separately.

> [!example]- What is the independent risk CoV of this insurer's outstanding claim liabilities? {Example}
> The outstanding claim liabilities are:
>
> | Class | Share | Independent risk CoV |
> | :--- | ---: | ---: |
> | Motor | 20% | 8% |
> | Home | 30% | 6% |
> | Liability | 50% | 5% |
>
> > [!answer]-
> > - The weights sum to $1$, and independent risk has no correlation terms.
> > - The squared CoV is $(0.2 \times 0.08)^2 + (0.3 \times 0.06)^2 + (0.5 \times 0.05)^2 = 0.000256 + 0.000324 + 0.000625 = 0.001205$.
> > - The portfolio's independent risk CoV is $\sqrt{0.001205} = 3.47\%$.
> > - The weighted average of the class CoVs is $5.9\%$, so independence cuts the portfolio figure by more than a third.

## Components of independent risk

Independent risk has two components: the random component of [[Parameter Risk|parameter risk]] and the random component of [[Process Risk|process risk]]. The random component of parameter risk is the extent to which randomness in the insurance process compromises the choice of parameters. The random component of process risk is the pure effect of that randomness: even a perfectly calibrated model will differ from the outcome. Marshall et al. find it not normally enlightening to split them.

## Measuring independent risk

Stochastic models such as the Mack method, bootstrapping, the stochastic chain ladder, [[GLM Loss Reserving|GLMs]] and Bayesian techniques suit independent risk. The better a model fits away past systemic episodes and trends, the more its remaining volatility reflects random effects alone. A model that does not fit them away also measures past external systemic risk, and needs separate allowances for the rest. A bootstrap can use residuals from stable periods only, and the method used should match the central estimate's.

For premium liabilities, simpler techniques work too. Past systemic episodes, seasonality, and standard and [[Superimposed Inflation|superimposed inflation]] are removed from claim frequencies and average claim sizes, and the CoV of the remaining volatility is measured.

## Benchmarks for the CoV

By the law of large numbers, larger portfolios have lower independent CoVs, and longer run-off leaves more time for random effects. So a short-tail portfolio's outstanding claim CoV is likely below a similar-sized long-tail one's. A long-tail portfolio's premium liability CoV is normally above its outstanding claim CoV, while a short-tail portfolio's is normally below, unless event risk intervenes. External benchmarks, such as the 2001 Tillinghast paper, are a sanity check and sometimes the only view available.

> [!example]- What CoV should be read from this benchmark table, and what happens if inflation is ignored? {Example}
> An actuary benchmarks the independent risk CoV of an $\$80$ million outstanding claim liability against a table calibrated on 2001 liability sizes. It reads $9\%$ at $\$50$ million and $7\%$ at $\$100$ million, interpolated linearly. Claims inflation since 2001 has totalled $60\%$.
>
> > [!answer]-
> > - The benchmark CoVs depend on the size of the liability in 2001 dollars, so inflation since then is backed out first.
> > - The 2001-dollar size is $80/1.60 = \$50$ million, so the CoV read is $9.0\%$.
> > - Reading the table at $\$80$ million instead gives $9\% - \tfrac{30}{50}(2\%) = 7.8\%$.
> > - The inflated liability looks like a larger portfolio, and larger portfolios have less random volatility, so ignoring inflation understates the independent CoV, here by $1.2$ points.
