---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:58ac14da8ec4cb9004f7fc8e295af2635d8353530e804be621c3054420001e28
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Level of Aggregation.md
---

**Level of Aggregation** is the [[IFRS 17]] requirement that contracts be measured in **groups**, not individually and not as a whole book. Contracts are first divided into **portfolios** (similar risks, managed together), then each portfolio is split by **annual cohort** (contracts issued no more than twelve months apart), and each cohort is split by **profitability** at initial recognition.

> $$\text{Group} = \text{Portfolio} \; \cap \; \text{Annual cohort} \; \cap \; \text{Profitability bucket}$$

- **The three profitability buckets:** contracts that are [[Onerous Contract|onerous]] at initial recognition; contracts with **no significant possibility of becoming onerous** subsequently; and everything else. Assessment is at initial recognition and the grouping is **never reassessed** afterwards.
- **The annual cohort requirement** prevents an insurer from mixing new profitable business with older unprofitable business to conceal the latter. It is the single most contested requirement in IFRS 17 and was the subject of an EU carve-out for some contracts — Canada applies it in full.
- **Why it matters so much:** the [[Onerous Contract|onerous]] test is applied **per group**. Profitable business cannot offset unprofitable business across groups, so losses surface that would have been invisible under a portfolio-wide premium deficiency test.
- **Practical effect for P&C insurers.** The number of groups multiplies quickly — line by province by cohort by profitability bucket — which drives system complexity, and it makes the choice of **portfolio** definition consequential: a broadly drawn portfolio permits more offsetting within groups, a narrowly drawn one surfaces more losses.
- **The floor, not the ceiling.** IFRS 17 sets a *minimum* granularity; an insurer may disaggregate further, and some do for management reporting. It may **not** aggregate more coarsely.
- Contracts within a group are measured together for the [[Contractual Service Margin|CSM]], the [[Loss Component]], and the onerous assessment — but the [[Liability for Incurred Claims|LIC]] can in practice be estimated at a coarser level and allocated, since claims already incurred carry no CSM.

> [!example]- How Many Groups? {Example}
> An insurer writes personal automobile in Ontario and Alberta, and commercial property in Ontario. Within personal auto Ontario, one subset of business written in the year is expected to be onerous. All contracts are annual and written throughout the year.
>
> Determine the minimum number of groups for the year, and explain what the requirement achieves.
>
> > [!answer]-
> > **Portfolios** — contracts with similar risks managed together. Personal auto Ontario, personal auto Alberta and commercial property Ontario are three distinct portfolios (an insurer could argue personal auto is one portfolio across provinces, but the different regulatory and benefit regimes make separate portfolios the better view, and it is the one a regulator will expect).
> >
> > **Cohort** — one, since all contracts are written within the year.
> >
> > **Profitability** — personal auto Ontario splits into at least two groups (onerous, and the rest); the other two portfolios have one each, assuming no onerous business.
> >
> > $$\text{Minimum groups} = 2 + 1 + 1 = 4$$
> >
> > **What it achieves.** Suppose personal auto Ontario is expected to produce a $\$6$ million loss on the onerous subset and a $\$20$ million profit on the rest. Under a portfolio-level test, the portfolio is profitable and no loss is recognised. Under IFRS 17, the onerous group's $\$6$ million loss is recognised **immediately** as a [[Loss Component]], while the profitable group's $\$20$ million emerges over the coverage period.
> >
> > That asymmetry — losses now, profits later — is the intended outcome, and it is why the annual cohort requirement matters: without it, next year's profitable business could be pooled with this year's losses and the loss would never appear at all.
