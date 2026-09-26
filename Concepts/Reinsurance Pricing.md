---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:becc4afe6b84598c689be0a699437433a389943f48965d9dd9e0c9425c2a5c26
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Pricing.md
---

**Reinsurance Pricing** estimates the expected loss cost to a [[Reinsurance|reinsurance]] contract — from the cedant's own adjusted history (**experience rating**) or from its current exposure profile run through severity or exposure curves (**exposure rating**) — and then loads that loss cost for the reinsurer's expenses, risk and the timing of cash flows. The price is usually quoted as a rate on the cedant's subject premium.

> $$\text{Loss cost rate} = \frac{\sum \text{trended, developed layer losses}}{\sum \text{on-level subject premium}}$$
>
> $$\text{EF} = \frac{E[X \wedge u] - E[X \wedge d]}{E[X \wedge PL]}$$
>
> $$\text{Premium} = \frac{\text{Loss cost}\,(1 + \text{ULAE}) + \text{Fixed}}{1 - \text{Variable \%}}$$

- **Clark's pricing paradox:** if a contract's experience is stable enough to price precisely, the cedant will not want to buy it. Reinsurance covers what is hard to price, so the basic tools are a starting point for judgment.
- **Experience rating** (a *burning cost* when unadjusted): on-level the subject premium; trend each large loss individually and keep every loss that would pierce the layer *after* trend; apply the layer terms (ALAE included if it is covered pro rata); develop with excess-layer [[Loss Development|development factors]]; divide. The yearly loss costs should scatter randomly about their average — a drift signals wrong trend or development, or a changed mix. Proportional treaties follow the same logic on loss ratios, with catastrophe and shock losses removed and a modelled catastrophe load added back.
- **Exposure rating** prices the current profile. In the exposure factor $\text{EF}$, $PL$ is the policy limit, $u = \min(PL, AP + Lim)$ and $d = \min(PL, AP)$ for attachment point $AP$ and layer limit $Lim$; $\text{EF}$ times subject premium times the expected loss ratio is the layer loss ([[Limited Expected Value]]). Casualty uses [[Increased Limits|increased limits factors]] from a [[Severity Distribution|severity distribution]] (excess loss factors for workers compensation); property uses [[Exposure Curves|exposure curves]] with retention and limit expressed as a share of insured value.
- **Reconciling the two:** *free cover* — no trended loss reaching the top of a layer — is priced from exposure-rating relativities; credibility rests on the claim count *expected* in the experience period (not the count observed) and on how stable the yearly loss costs are.
- **Catastrophe covers** were once priced by *payback* — premium set so the limit is repaid over a chosen number of years — and are now priced from catastrophe-model output ([[Catastrophe Expected Loss Cost]]). [[Reinstatements]] are usually paid *pro rata as to amount*.
- **Loss-sensitive features** — [[Sliding Scale Commissions]], [[Profit Commission|profit commissions]], [[Loss Corridors]], annual aggregate deductibles — respond non-linearly to results, so they are priced over an aggregate loss distribution, not at the expected loss ratio ([[Reinsurance Contract Provisions]]).
- **The final price** adds variable expenses (ceding commission, brokerage), fixed overhead and reinsurer ULAE — reinsurers pay no premium tax. The traditional "100/80" load treats all expenses as a $20\%$ variable charge. Risk load and investment income sit beyond this formula ([[Risk Loads]]).

> [!example]- Experience Rating a Per-Risk Excess Layer {Example}
> A cedant buys \$500K xs \$500K per risk. Three years are shown for brevity (\$000s; losses already trended to the treaty period, premium at the treaty period's rate level):
>
> | Year | On-level subject premium | Trended large losses | Excess LDF |
> |---|---|---|---|
> | 2021 | $10{,}000$ | $700$, $1{,}200$ | $1.10$ |
> | 2022 | $11{,}000$ | $450$, $900$ | $1.35$ |
> | 2023 | $12{,}000$ | $1{,}300$, $650$ | $1.90$ |
>
> Projected subject premium is $13{,}000$. Find the loss cost and the premium with ULAE of $3\%$ of losses, fixed expense of $50$ and $10\%$ brokerage.
>
> > [!answer]-
> > Each loss contributes $\min(\max(X - 500, 0), 500)$: $200 + 500 = 700$ in 2021, $0 + 400 = 400$ in 2022 and $500 + 150 = 650$ in 2023.
> >
> > $$
> > \begin{align*}
> > \text{Developed} &= 700(1.10) + 400(1.35) + 650(1.90) \\
> > &= 770 + 540 + 1{,}235 \\
> > &= 2{,}545 \\
> > \text{Loss cost rate} &= \frac{2{,}545}{33{,}000} \\
> > &= 7.71\% \\
> > \text{Expected loss} &= 0.0771(13{,}000) \\
> > &= 1{,}003 \\
> > \text{Premium} &= \frac{1{,}003(1.03) + 50}{1 - 0.10} \\
> > &= 1{,}203
> > \end{align*}
> > $$
> >
> > The indicated rate is $1{,}203/13{,}000 = 9.25\%$ of subject premium. The yearly loss costs — $7.7\%$, $4.9\%$, $10.3\%$ — scatter without a clear trend, but two or three losses a year is thin experience: the result should be credibility-weighted with an exposure rate.

> [!example]- Exposure Rating a Casualty Layer With ILFs {Example}
> A treaty covers \$1.5M xs \$500K per occurrence, loss and ALAE pro rata. The cedant's projected subject premium is \$4.0M on policies with \$1M limits and \$2.0M on policies with \$2M limits; its expected loss and ALAE ratio is $65\%$. ILFs are $1.55$ at \$500K, $1.80$ at \$1M and $2.00$ at \$2M. Find the treaty loss cost.
>
> > [!answer]-
> > The layer's top is $500 + 1{,}500 = 2{,}000$ (\$000s), capped at each policy limit:
> >
> > $$
> > \begin{align*}
> > \text{EF}_{\$1\text{M}} &= \frac{1.80 - 1.55}{1.80} \\
> > &= 0.1389 \\
> > \text{EF}_{\$2\text{M}} &= \frac{2.00 - 1.55}{2.00} \\
> > &= 0.2250 \\
> > \text{Layer loss} &= 4{,}000(0.65)(0.1389) + 2{,}000(0.65)(0.2250) \\
> > &= 361.1 + 292.5 \\
> > &= 653.6
> > \end{align*}
> > $$
> >
> > The loss cost is $653.6/6{,}000 = 10.9\%$ of subject premium. The \$2M policies supply almost half the layer loss from one third of the premium, because more of each of their limits sits inside the layer — which is why the limits profile, not last year's claims, drives an exposure rate.
