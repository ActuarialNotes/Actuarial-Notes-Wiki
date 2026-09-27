---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f35ae7ab9878538fbc035be406e83d71c31f60b20378886bbffede92627564a2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Independent Risk.md
---

**Independent risk** is the part of the uncertainty in insurance liabilities that comes from the randomness inherent in the insurance process. In [[A Framework for Assessing Risk Margins (Marshall et al. - 2008)|Marshall et al. (2008)]] it is one of the three sources of uncertainty a [[Risk Margin|risk margin]] must cover, alongside [[Internal Systemic Risk|internal]] and [[External Systemic Risk|external systemic risk]]. It has two components: the random component of [[Parameter Risk|parameter risk]] and the random component of [[Process Risk|process risk]].

> $$\mathrm{CoV}_{\text{ind}} = \frac{\sqrt{\sum_i (w_i\,\mathrm{CoV}_i)^2}}{\sum_i w_i}$$

- $w_i$ is valuation portfolio $i$'s share of the central estimate (by class, and separately for outstanding claim and premium liabilities), and $\mathrm{CoV}_i$ its independent risk [[Coefficient of Variation|CoV]]. There are no cross terms, because independent risk is uncorrelated with every other source of uncertainty and between valuation portfolios. The paper's worked example combines its independent risk CoVs in exactly this way.
- **The two components.** The random component of parameter risk is the extent to which randomness in the insurance process compromises the choice of parameters. The random component of process risk is the pure effect of that randomness: even a perfectly calibrated model will differ from the outcome. Marshall et al. find it not normally enlightening to split them.
- **How it is measured.** Stochastic models such as the Mack method, bootstrapping, the stochastic chain ladder, [[GLM Loss Reserving|GLMs]] and Bayesian techniques suit independent risk. The better a model fits away past systemic episodes and trends, the more its remaining volatility reflects random effects alone. A model that does not fit them away also measures past external systemic risk, and needs separate allowances for the rest. A bootstrap can use residuals from stable periods only, and the method used should match the central estimate's.
- **Premium liabilities.** Simpler techniques work too: remove past systemic episodes, seasonality, and standard and [[Superimposed Inflation|superimposed inflation]] from claim frequencies and average claim sizes, then measure the CoV of the residual volatility.
- **Benchmarks.** By the law of large numbers, larger portfolios have lower independent CoVs, and longer run-off leaves more time for random effects. So a short-tail portfolio's outstanding claim CoV is likely below a similar-sized long-tail one's. A long-tail portfolio's premium liability CoV is normally above its outstanding claim CoV, while a short-tail portfolio's is normally below, unless event risk intervenes. External benchmarks, such as the 2001 Tillinghast paper, are a sanity check and sometimes the only view available.

> [!example]- Consolidating Independent Risk Across Classes {Example}
> An insurer's outstanding claim liabilities are $20\%$ motor, $30\%$ home and $50\%$ liability, with independent risk CoVs of $8\%$, $6\%$ and $5\%$.
>
> Compute the independent risk CoV for the whole portfolio.
>
> > [!answer]-
> > The weights sum to $1$, and independent risk has no correlation terms:
> >
> > $$
> > \begin{align*}
> > \mathrm{CoV}_{\text{ind}}^2 &= (0.2 \times 0.08)^2 + (0.3 \times 0.06)^2 + (0.5 \times 0.05)^2 \\
> > &= 0.000256 + 0.000324 + 0.000625 \\
> > &= 0.001205 \\
> > \mathrm{CoV}_{\text{ind}} &= 3.47\%
> > \end{align*}
> > $$
> >
> > The weighted average of the class CoVs is $5.9\%$, so independence cuts the portfolio figure by more than a third. Random effects in different classes offset each other. Systemic risks, which are correlated across classes, do not diversify this way, which is why the framework assesses them separately.

> [!example]- Backing Inflation Out Before Benchmarking {Example}
> An actuary benchmarks the independent risk CoV of a \$80 million outstanding claim liability against a table calibrated on 2001 liability sizes, which reads $9\%$ at \$50 million and $7\%$ at \$100 million (interpolate linearly). Claims inflation since 2001 has totalled $60\%$.
>
> What CoV should be read, and what happens if inflation is ignored?
>
> > [!answer]-
> > Marshall et al. warn that the benchmark CoVs depend on the size of the liability in 2001 dollars, so inflation since then must be backed out first:
> >
> > $$
> > \begin{align*}
> > \text{2001-dollar size} &= \frac{80}{1.60} \\
> > &= \$50\text{ million} \\
> > \mathrm{CoV} &= 9.0\%
> > \end{align*}
> > $$
> >
> > Reading the table at \$80 million instead gives $9\% - \tfrac{30}{50}(2\%) = 7.8\%$. The inflated liability looks like a larger portfolio, and larger portfolios have less random volatility, so ignoring inflation understates the independent CoV, here by $1.2$ points.
