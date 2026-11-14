---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:740f2bbc9455df7549a30bb2445d84ddd7a508369d1dab9e92e708f2bc124038
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Pricing.md
---

**Reinsurance Pricing** is the estimation of the expected loss cost to a [[Reinsurance|reinsurance]] contract, from the cedant's own adjusted history (**experience rating**) or from its current exposure profile (**exposure rating**), and the loading of that loss cost for the reinsurer's expenses, risk and the timing of cash flows. The price is usually quoted as a rate on the cedant's subject premium.

> [!idea] The idea
> If a contract's experience is stable enough to price precisely, the cedant will not want to buy it, so Clark treats the basic tools as a starting point for judgment.

## Experience rating

Experience rating divides the cedant's past layer losses by the premium that produced them, so the loss cost rate is

> $$\text{Loss cost rate} = \frac{\sum \text{trended, developed layer losses}}{\sum \text{on-level subject premium}}$$

Unadjusted, the ratio is a *burning cost*. The adjustments are:

1. On-level the subject premium.
2. Trend each large loss individually from the ground up, and keep every loss that would pierce the layer after trend.
3. Apply the layer's attachment and limit to each trended occurrence, with ALAE included if it is covered pro rata.
4. Develop the layer losses with excess-layer [[Loss Development|development factors]].
5. Divide the total layer losses by the total premium.

The yearly loss costs should scatter randomly about their average. A drift signals a wrong trend or development, or a changed mix. Proportional treaties follow the same logic on loss ratios, with catastrophe and shock losses removed and a modelled catastrophe load added back.

> [!example]- What are the loss cost rate and the premium for this per-risk excess layer? {Example}
> A cedant buys $\$500$K xs $\$500$K per risk. In $\$000$s, with losses already trended to the treaty period and premium at the treaty period's rate level:
>
> | Year | On-level subject premium | Trended large losses | Excess LDF |
> | :--- | ---: | ---: | ---: |
> | 2021 | 10,000 | 700 and 1,200 | 1.10 |
> | 2022 | 11,000 | 450 and 900 | 1.35 |
> | 2023 | 12,000 | 1,300 and 650 | 1.90 |
>
> Projected subject premium is $13{,}000$. ULAE is $3\%$ of losses, fixed expense is $50$ and brokerage is $10\%$.
>
> > [!answer]-
> > - Each loss contributes $\min(\max(X - 500, 0), 500)$: $200 + 500 = 700$ in 2021, $0 + 400 = 400$ in 2022 and $500 + 150 = 650$ in 2023.
> > - The developed layer losses are $700(1.10) + 400(1.35) + 650(1.90) = 770 + 540 + 1{,}235 = 2{,}545$.
> > - The loss cost rate is $2{,}545/33{,}000 = 7.71\%$, so the expected loss is $0.07712(13{,}000) = 1{,}003$.
> > - The premium is $\dfrac{1{,}003(1.03) + 50}{1 - 0.10} = 1{,}203$, a rate of $1{,}203/13{,}000 = 9.25\%$ of subject premium.
> > - The yearly loss costs of $7.7\%$, $4.9\%$ and $10.3\%$ show no trend, but two losses a year is thin experience, so the result should be credibility-weighted with an exposure rate.

## Exposure rating

Exposure rating prices the current profile through a [[Severity Distribution|severity distribution]] or an [[Exposure Curves|exposure curve]]. For a policy with limit $PL$ and a layer of limit $Lim$ attaching at $AP$, the exposure factor, the share of the policy's expected loss that falls in the layer, is

> $$\text{EF} = \frac{E[X \wedge u] - E[X \wedge d]}{E[X \wedge PL]}$$

- $u = \min(PL, AP + Lim)$ is the top of the layer, capped at the policy limit.
- $d = \min(PL, AP)$ is the attachment, capped at the policy limit.
- $E[X \wedge u]$ is the [[Limited Expected Value|limited expected value]] at $u$.

The reinsurer's largest loss on a policy is therefore $u - d$, not the policy limit. The layer loss is

> $$\text{Layer loss} = \text{Subject premium} \times \text{ELR} \times \text{EF}$$

- $\text{ELR}$ is the expected loss ratio of the subject business.

Casualty uses [[Increased Limits|increased limits factors]] in place of the limited expected values (excess loss factors for workers compensation). Property uses exposure curves, with the retention and limit expressed as a share of insured value. Exposure rating relies on the expected loss ratio, and volatile historical loss ratios make it hard to set, so its credibility rests on how stable the yearly loss costs are and on the claim count *expected* in the experience period (not the count observed).

> [!example]- What is the loss cost of this casualty layer? {Example}
> A treaty covers $\$1.5$M xs $\$500$K per occurrence, loss and ALAE pro rata. The cedant's projected subject premium is $\$4.0$M on policies with $\$1$M limits and $\$2.0$M on policies with $\$2$M limits. Its expected loss and ALAE ratio is $65\%$. ILFs are $1.55$ at $\$500$K, $1.80$ at $\$1$M and $2.00$ at $\$2$M.
>
> > [!answer]-
> > - The layer's top is $500 + 1{,}500 = 2{,}000$ (in $\$000$s), capped at each policy limit.
> > - $\text{EF}_{\$1\text{M}} = (1.80 - 1.55)/1.80 = 0.1389$.
> > - $\text{EF}_{\$2\text{M}} = (2.00 - 1.55)/2.00 = 0.2250$.
> > - The layer loss is $4{,}000(0.65)(0.1389) + 2{,}000(0.65)(0.2250) = 361.1 + 292.5 = 653.6$.
> > - The loss cost is $653.6/6{,}000 = 10.9\%$ of subject premium.

## Free cover

When no trended loss reaches the top of a layer, experience rating the whole layer gives the upper part of it *free cover*. That part is priced from exposure-rating relativities instead: the experience loss cost of the layer the losses reached is scaled by the ratio of the exposure factors of the two layers.

## Catastrophe covers

Catastrophe covers were once priced by *payback*: premium set so the limit is repaid over a chosen number of years. They are now priced from catastrophe-model output ([[Catastrophe Expected Loss Cost]]). [[Reinstatements]] are usually paid *pro rata as to amount*.

## The final price

The reinsurer adds variable expenses (ceding commission, brokerage), fixed overhead $\text{Fixed}$ and its own ULAE, so the premium is

> $$\text{Premium} = \frac{\text{Loss cost}\,(1 + \text{ULAE}) + \text{Fixed}}{1 - \text{Variable \%}}$$

- $\text{ULAE}$ is the reinsurer's ULAE as a ratio to loss, and $\text{Variable \%}$ the variable expenses as a ratio to premium.

Unlike the cedant, the reinsurer pays no premium tax. The traditional "100/80" load treats all expenses as a $20\%$ variable charge. Risk load and investment income sit beyond this formula ([[Risk Loads]]), and loss-sensitive features are priced over an aggregate loss distribution ([[Reinsurance Contract Provisions]]).
