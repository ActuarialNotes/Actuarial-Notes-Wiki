---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f1eb949826aba6e11aeccaca7e475ef3cba48027fd346214dca0af7d57905530
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ancillary Benefit.md
---

An **Ancillary Benefit** is any benefit a [[Defined Benefit Plan|defined benefit plan]] provides beyond the basic lifetime pension from normal retirement age, such as a bridge benefit, an early-retirement subsidy, a death benefit, a disability benefit or indexation. Each one is a separate promise with its own value, priced as an addition to the plan's cost, so the expected present value of the plan is

> $$\text{EPV}_{\text{plan}} = \text{EPV}_{\text{basic}} + \sum_k \text{EPV}_{\text{ancillary},\,k}$$

- $\text{EPV}_{\text{basic}}$ is the expected present value of the basic lifetime pension.
- $\text{EPV}_{\text{ancillary},\,k}$ is the expected present value of the $k$th ancillary benefit.

Much of a DB plan's hidden cost lies in its ancillary benefits, because their value depends on member choices and on assumptions such as retirement and disability rates. The SOA's catalogue of [[Embedded Option|embedded options]] treats subsidized early retirement, bridges and generous optional-form factors as options the members hold against the sponsor.

## Bridge benefits

A bridge is a temporary pension from early retirement to the age at which social security or [[Social Insurance|government pensions]] begin, usually 65. It levels the member's income across that date and so makes early retirement affordable. A level income option does the same thing in reverse, by raising the plan pension before government benefits start and lowering it afterward so that the two have equal value.

For a bridge of $b$ a year, paid monthly from age $x$ to 65 or earlier death, the EPV is

> $$\text{EPV}_{\text{bridge}} = b\;\ddot{a}^{(12)}_{x:\overline{65-x}|}$$

- $\ddot{a}^{(12)}_{x:\overline{n}|}$ is the monthly temporary [[Life Annuity|life annuity]]-due factor for $n$ years.

With [[Woolhouse's Formula|Woolhouse's formula]], the monthly factor is

> $$\ddot{a}^{(12)}_{x:\overline{n}|} \approx \ddot{a}_{x:\overline{n}|} - \tfrac{11}{24}\left(1 - {}_nE_x\right)$$

- ${}_nE_x$ is the [[Pure Endowment|pure endowment]] factor.

> [!example]- What is the EPV of this bridge at 60? {Example}
> A plan pays a member who retires at 60 a bridge benefit of $\$8{,}000$ a year, monthly in advance, until age 65 or earlier death. On the Standard Ultimate Life Table at 5%, $\ddot{a}_{60} = 14.9041$, $\ddot{a}_{65} = 13.5498$ and ${}_5E_{60} = 0.76687$.
>
> > [!answer]-
> > - The annual temporary annuity factor is $\ddot{a}_{60:\overline{5}|} = \ddot{a}_{60} - {}_5E_{60}\,\ddot{a}_{65}$.
> > - That is $14.9041 - 0.76687(13.5498) = 4.5132$.
> > - The monthly factor is $4.5132 - \tfrac{11}{24}(1 - 0.76687) = 4.4063$.
> > - The EPV of the bridge is $8{,}000 \times 4.4063 = \$35{,}250$.
> > - Valuing it as an annual annuity would give $\$36{,}106$ and overstate the cost by about 2.4%.

> [!trap] Using the whole-life factor for a bridge
> A bridge stops at 65 as well as on death, so its factor is $\ddot{a}_{x:\overline{n}|}$, not $\ddot{a}_x$. The whole-life factor values a lifetime pension and more than triples the cost of a five-year bridge. The Woolhouse adjustment for the temporary annuity is likewise $\frac{11}{24}(1 - {}_nE_x)$, not $\frac{11}{24}$.

## Early-retirement subsidies

A reduction for early payment smaller than the actuarially equivalent one gives the member more value than the deferred pension, as described in [[Early Retirement|early retirement]]. The subsidy is an ancillary benefit. It may be vested or non-vested depending on the plan's [[Vesting|eligibility rules]].

## Death benefits

A pre-retirement death benefit pays a lump sum, often the commuted value of the accrued pension or a refund of contributions with interest, or a pension to the surviving spouse. A post-retirement death benefit is built into the form of payment, as a guaranteed period or a joint and survivor pension. Legislation in both the United States and Canada requires a minimum spousal benefit on death before and after retirement unless the spouse waives it.

An [[Optional Form of Payment|optional form of payment]] changes how the member's own benefit is paid, while an ancillary benefit is provided by the plan's terms. A joint and survivor form with actuarially equivalent factors costs the sponsor nothing, but a subsidized one is an ancillary benefit.

## Disability benefits

A plan may pay an immediate unreduced pension on total disability. More often it keeps crediting service while the member receives [[Disability Income Insurance|long-term disability]] benefits, so that the pension is not cut short by the disability.

## Indexation

Automatic increases in pensions in payment, tied to a price index or at a fixed rate, protect retirees from [[Inflation|inflation]] and are expensive. Indexation can be full, partial (such as 50% of CPI or CPI less 1%), capped, or conditional on the plan's funded status or on investment returns, which shares the cost with members.

For a pension of $B$ a year that increases by $g$ a year, discounted at $i$, the EPV is

> $$\text{EPV}_{\text{indexed}} = B\;\ddot{a}_{x}\big|_{j}$$

- $\ddot{a}_x\big|_j$ is the life annuity-due factor at the reduced rate $j$.

The reduced rate is

> $$1 + j = \frac{1+i}{1+g}$$

$j$ is slightly smaller than $i - g$. Discounting at $i - g$ instead gives a smaller factor and understates the cost.

> [!example]- What does indexation at 2% add to the cost of this pension? {Example}
> A member retires at 65 with a pension of $\$30{,}000$ a year, paid annually in advance. On the SULT at 5%, $\ddot{a}_{65} = 13.5498$. The plan is considering 2% compound annual increases after the first payment, and the annuity factor at the reduced rate is $\ddot{a}_{65}\big|_{j} = 16.5404$.
>
> > [!answer]-
> > - The payment at time $k$ is $30{,}000(1.02)^k$, so discounting at 5% is the same as discounting a level payment at $j$.
> > - The reduced rate is $j = 1.05/1.02 - 1 = 0.02941$.
> > - The level pension is worth $30{,}000 \times 13.5498 = \$406{,}494$.
> > - The indexed pension is worth $30{,}000 \times 16.5404 = \$496{,}212$.
> > - Indexation costs $496{,}212 - 406{,}494 = \$89{,}718$, about 22% of the level pension's value.

## Canadian tax rules

In Canada the Income Tax Regulations define the lifetime retirement benefit of a registered DB plan. They list the ancillary benefits that may be added to it, among them bridging, early-retirement benefits, guaranteed periods and other death benefits, disability benefits and indexing, each with its own limits (the [[Canadian Pension Legislation#Tax legislation|tax rules]]). A plan that pays beyond those limits puts its registration at risk, so richer benefits move to a [[Executive Retirement Plan|supplementary plan]].
