---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:441612f35454160b7e1fa224c01c2fc3ab0ab5639548afef646fa3eb351b4edc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Implied Development Method.md
---

The **Implied Development Method** is Siewert's approach to the excess layer of a [[Large Deductible Policy|high deductible]] program: develop full coverage (unlimited) losses to ultimate, develop deductible (limited) losses to ultimate with factors for inflation-indexed limits, and take the ultimate excess losses as the difference. Excess development is implied by the two developments rather than measured on the thin excess data itself.

For losses at age $t$, the ultimate excess loss is

> $$\text{Ult}^{XS} = C_t \cdot \text{LDF}_t - C^L_t \cdot \text{LDF}^L_t$$

- $C_t$ is the unlimited reported loss at age $t$, and $C^L_t$ the reported loss limited to the deductible $L$.
- $\text{LDF}_t$ and $\text{LDF}^L_t$ are their [[Cumulative Development Factor|age-to-ultimate factors]].

The excess IBNR is the ultimate less the reported excess loss:

> $$\text{IBNR}^{XS} = \text{Ult}^{XS} - (C_t - C^L_t)$$

Siewert applies the factors account by account, each at its own deductible, and sums the account ultimates. That reflects the program's deductible mix.

> [!example]- What is each account's excess IBNR by implied development? {Example}
> At 36 months, one accident year of a workers compensation program has two accounts ($000):
>
> | Account | Deductible | Unlimited reported | Limited reported |
> | :--- | ---: | ---: | ---: |
> | A | $100,000 | 1,200 | 900 |
> | B | $250,000 | 2,000 | 1,750 |
>
> The unlimited 36-to-ultimate factor is $1.300$. The limited factors are $1.080$ at $\$100{,}000$ and $1.150$ at $\$250{,}000$.
>
> > [!answer]-
> > - Account A's ultimate excess loss is $1{,}200 \times 1.300 - 900 \times 1.080 = 1{,}560 - 972 = 588$.
> > - Its reported excess loss is $1{,}200 - 900 = 300$, so its excess IBNR is $588 - 300 = 288$.
> > - Account B's ultimate excess loss is $2{,}000 \times 1.300 - 1{,}750 \times 1.150 = 2{,}600 - 2{,}012.5 = 587.5$.
> > - Its reported excess loss is $250$, so its excess IBNR is $337.5$.
> > - The total excess IBNR is $625.5$, or $\$625{,}500$.
> > - The implied excess factors are $588/300 = 1.96$ for A and $587.5/250 = 2.35$ for B, so the higher retention's excess layer develops more.

## Consistency of the factors

The full coverage [[Tail Factor|tail]] must agree with the limited tails. Limited losses must never be developed beyond unlimited losses, nor a lower limit beyond a higher one. In the example, $1.080 < 1.150 < 1.300$ passes this check.

Limits are indexed for inflation so experience years can be combined. At $10\%$ cost inflation, losses over a $\$100{,}000$ deductible one year match those over $\$110{,}000$ the next. Siewert's index of $1.095$ makes a current $\$250{,}000$ limit equivalent to $\$228{,}311$ a year earlier.

## Strengths and weakness

The method gives an excess estimate at early maturities even when no excess losses have emerged. Limited factors are more stable than excess ones. Its by-product, the ultimate deductible losses, feeds the service revenue asset, a loss multiplier on deductible losses less known [[Deductible Recovery|recoveries]]. Its weakness, in Siewert's words, is that its focus is misplaced: one would like to recognize excess development explicitly.

## Other approaches to the excess layer

Siewert compares the method with three others. $P$ is premium, $E$ the expected loss ratio, $\chi$ the per-occurrence charge and $O_t$ the observed excess loss at age $t$.

The **loss ratio approach** sets the ultimate excess losses from pricing:

> $$\text{Ult}^{XS} = P \cdot E \cdot \chi$$

It is practical for immature years but ignores emerging experience.

**Direct development** applies an [[Excess Loss Development Factor|excess loss development factor]] to reported excess losses:

> $$\text{Ult}^{XS} = O_t \cdot \text{XSLDF}_t$$

- $\text{XSLDF}_t$ is the excess layer's age-to-ultimate factor.

It is leveraged and volatile, and it gives nothing when nothing has emerged.

**Credibility weighting** gives the observed excess loss a credibility of $Z = 1/\text{XSLDF}_t$, which is the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] result:

> $$\text{Ult}^{XS} = O_t + P \cdot E \cdot \chi \cdot \left(1 - \frac{1}{\text{XSLDF}_t}\right)$$

It is stable and tied to pricing, but it ignores actual experience to the extent of the complement of credibility.

The implicit and explicit methods need not give the same reserve. Their underlying factors should balance, though, to the unlimited factor. [[Claims Development by Layer (Sahasrabuddhe - 2010)|Sahasrabuddhe (2010)]] covers moving a development pattern between layers.

> [!example]- What is the excess IBNR by implied development, by direct development and by Bornhuetter-Ferguson, and why do they differ? {Example}
> At 24 months an accident year with a $\$250{,}000$ deductible has unlimited reported losses of $4{,}000$ and limited reported losses of $3{,}800$ ($000). The factors to ultimate are $1.400$ unlimited and $1.250$ limited. They were derived with a 24-month ratio of limited to unlimited reported loss of $R^L_{24} = 0.96$, and the expected excess ultimate from pricing is $800$.
>
> > [!answer]-
> > - By implied development, $\text{Ult}^{XS} = 4{,}000(1.400) - 3{,}800(1.250) = 5{,}600 - 4{,}750 = 850$, so the IBNR is $850 - 200 = 650$.
> > - The excess factor that balances with these factors is $\text{XSLDF}_{24} = (1.400 - 0.96 \times 1.250)/0.04 = 5.000$.
> > - By direct development, the IBNR is $200 \times 5.000 - 200 = 800$.
> > - By Bornhuetter-Ferguson, the IBNR is $800 \times (1 - 1/5.000) = 640$.
> > - The factors expect $4\%$ of reported losses above the deductible at 24 months, which is $160$. Actual excess emergence is $200$, which is $40$ more.
> > - Direct development multiplies the extra $40$ by $5.0$, adding $200$ to the ultimate. Implied development sees it only as $40$ less limited loss, developed at $1.25$, adding $50$. Bornhuetter-Ferguson passes it through one for one, adding $40$.
> > - All three rest on the same balanced factors. They differ in how far they let an early, volatile emergence move the reserve.

The method is from [[A Model for Reserving Workers Compensation High Deductibles (Siewert - 1996)|Siewert (1996)]].
