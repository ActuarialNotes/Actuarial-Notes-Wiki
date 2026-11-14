---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:304fc910d7425049a9e42d1d6d4b8720e469caeb8571853a524d100a1d1ba129
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Level of Aggregation.md
---

![[Media/Figures/Level_of_Aggregation.svg|340]]

**Level of Aggregation** is the [[IFRS 17]] requirement that contracts be measured in groups, not individually and not as a whole book. Contracts are divided into portfolios of similar risks managed together, each portfolio is split into annual cohorts of contracts issued no more than twelve months apart, and each cohort is split by profitability at initial recognition.

A group of contracts is

> $$\text{Group} = \text{Portfolio} \cap \text{Annual cohort} \cap \text{Profitability bucket}$$

The three profitability buckets are:

1. Contracts that are [[Onerous Contract|onerous]] at initial recognition.
2. Contracts with no significant possibility of becoming onerous subsequently.
3. All other contracts.

Contracts are assessed at initial recognition, and the grouping is never reassessed afterwards. IFRS 17 sets a minimum granularity. An insurer may divide its contracts more finely, but not more coarsely.

Contracts within a group are measured together for the [[Contractual Service Margin|CSM]], the [[Loss Component|loss component]] and the onerous assessment. The [[Liability for Incurred Claims|LIC]] can in practice be estimated at a coarser level and allocated, since claims already incurred carry no CSM.

> [!example]- What is the minimum number of groups this insurer must form for the year? {Example}
> An insurer writes personal automobile in Ontario and Alberta, and commercial property in Ontario. All contracts are annual and written throughout the year. Within personal auto Ontario, one subset of the year's business is expected to be onerous, and the rest of its business is not.
>
> > [!answer]-
> > - Personal auto Ontario, personal auto Alberta and commercial property Ontario are three portfolios. Their different regulatory and benefit regimes make separate portfolios the better view.
> > - All contracts are written within the year, so each portfolio has one annual cohort.
> > - Personal auto Ontario splits into at least two groups, the onerous subset and the rest.
> > - The other two portfolios have one group each.
> > - The minimum is $2 + 1 + 1 = 4$ groups.

## The onerous test by group

The onerous test is applied per group. Profitable business cannot offset unprofitable business across groups, so losses surface that a portfolio-wide premium deficiency test would not show. This makes the definition of a portfolio consequential: a broad portfolio permits more offsetting within groups, and a narrow one surfaces more losses. The number of groups multiplies quickly, by line, province, cohort and profitability bucket, which adds to system complexity.

> [!example]- How does the grouping change the loss recognised on this portfolio? {Example}
> Personal auto Ontario is expected to produce a $\$6$ million loss on its onerous subset and a $\$20$ million profit on the rest.
>
> > [!answer]-
> > - Tested as one portfolio, it is expected to earn $\$20 - \$6 = \$14$ million, so no loss is recognised.
> > - Under IFRS 17 the onerous subset is its own group, so its $\$6$ million loss is recognised immediately as a [[Loss Component|loss component]].
> > - The profitable group's $\$20$ million emerges over the coverage period.

## The annual cohort requirement

The annual cohort requirement keeps an insurer from mixing new profitable business with older unprofitable business to conceal the latter. Without it, next year's profitable business could be pooled with this year's losses, and the loss would never appear. It is the most contested requirement in IFRS 17 and was the subject of an EU carve-out for some contracts. Canada applies it in full.

> [!trap] Offsetting an onerous subset against profitable business
> A portfolio that is profitable overall can still contain an onerous group. Test each group separately and recognise the onerous group's loss at once, whatever the rest of the portfolio earns.
