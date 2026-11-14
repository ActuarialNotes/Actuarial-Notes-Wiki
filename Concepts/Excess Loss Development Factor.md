---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:20a8e996be2bafb9b068b0feb7c97a87fc48c164c5f13c108b48588752bd6a3f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Excess Loss Development Factor.md
---
An **Excess Loss Development Factor** ($\text{XSLDF}^L_t$) is the development factor, from age $t$ to a later age or ultimate, for the losses above a per-occurrence deductible or limit $L$. Siewert derives it from the unlimited [[Development Factor|development factor]] $\text{LDF}_t$ and the **limited severity relativity** $R^L_t$, the limited severity divided by the unlimited severity at age $t$, so that the limited and excess factors split unlimited development consistently.

The excess loss development factor is

> $$\text{XSLDF}^L_t = \text{LDF}_t \times \frac{1 - R^L}{1 - R^L_t}$$

- $R^L$ is the limited severity relativity at the later age.

The limited (deductible) factor is

> $$\text{LDF}^L_t = \text{LDF}_t \times \frac{R^L}{R^L_t}$$

Measured on the severity distribution at that maturity, $R^L_t = E[X \wedge L]/E[X]$ is the [[Loss Elimination Ratio|loss elimination ratio]] of the deductible: the share of unlimited losses below $L$. Its complement $1 - R^L_t$ is the excess ratio, the share of expected losses above $L$.

Write losses at age $t$ as counts times severity, $C_t S_t$. The limited part is $C_t S_t R^L_t$ and the excess part $C_t S_t (1 - R^L_t)$. Dividing the later age by age $t$ gives both formulas, with the common factor $\text{LDF}_t = (C/C_t)(S/S_t)$ (Siewert's equations 4.2–4.7). Since unlimited losses are limited losses plus excess losses, the unlimited factor is

> $$\text{LDF}_t = R^L_t \, \text{LDF}^L_t + (1 - R^L_t) \, \text{XSLDF}^L_t$$

The weights in this balance are the relativities at the **starting** age $t$. Over several periods, the age-to-age factors multiply and the relativity ratios telescope, so a factor to ultimate comes straight from the relativities at the two end points.

> [!example]- What are this book's limited and excess factors from 12 months to ultimate, and does the 12–24 balance hold? {Example}
> A workers compensation book has these unlimited age-to-age factors and limited severity relativities for a $\$250{,}000$ deductible:
>
> | Age | 12 | 24 | 36 | Ult |
> | :--- | ---: | ---: | ---: | ---: |
> | Unlimited factor to next age | 1.600 | 1.150 | 1.080 | |
> | Relativity $R^L$ | 0.97 | 0.95 | 0.93 | 0.90 |
>
> > [!answer]-
> > - From 12 to 24, the limited factor is $1.600 \times 0.95/0.97 = 1.5670$ and the excess factor is $1.600 \times 0.05/0.03 = 2.6667$.
> > - The balance weights by the 12-month relativity: $0.97(1.5670) + 0.03(2.6667) = 1.5200 + 0.0800 = 1.6000$.
> > - The unlimited 12-to-ultimate factor is $1.600 \times 1.150 \times 1.080 = 1.9872$.
> > - The limited 12-to-ultimate factor is $1.9872 \times 0.90/0.97 = 1.8438$.
> > - The excess 12-to-ultimate factor is $1.9872 \times 0.10/0.03 = 6.6240$, more than three times the unlimited factor.

## Leverage

Late development lands mostly above the deductible, so the LER falls with maturity ($R^L < R^L_t$), and $\text{XSLDF}^L_t > \text{LDF}_t > \text{LDF}^L_t$. Losses limited to a basic limit develop less than unlimited losses, and losses above it develop more slowly and are more volatile.

Development still to come at age $t$ is $1 - 1/\text{LDF}_t$, and its excess part is $(1 - R^L_t)(\text{XSLDF}^L_t - 1)/\text{LDF}_t$. In the example above, $1 - 1/1.9872 = 0.4968$ of ultimate is still to come at 12 months, and $0.03(5.6240)/1.9872 = 0.0849$ of it, 17%, is excess development. At 36 months the excess share of what remains is 47.5%.

Because $1 - R^L_t$ is small, a small error in the relativity becomes a large error in the excess factor. Siewert finds excess factors "quite leveraged and extremely volatile". Applied directly to excess losses, they give no answer at all when nothing has yet emerged above the deductible. That is why he prefers the [[Implied Development Method|implied development]] and [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] approaches for the excess layer.

> [!example]- What are this book's excess ultimate and IBNR, and what if the 36-month limited severity were $\$5{,}160$? {Example}
> A severity model fitted to a workers compensation book gives these average severities per full coverage claim. Claim counts are complete by 36 months.
>
> | Severity | 36 months | Ultimate |
> | :--- | ---: | ---: |
> | Unlimited | $\$6{,}000$ | $\$8{,}000$ |
> | Limited to $\$250{,}000$ | $\$5{,}100$ | $\$6{,}400$ |
>
> Reported losses excess of the $\$250{,}000$ deductible are $\$1{,}350{,}000$ at 36 months.
>
> > [!answer]-
> > - With counts complete, the unlimited factor is the severity ratio, $8{,}000/6{,}000 = 1.3333$.
> > - The relativities are $R^L_{36} = 5{,}100/6{,}000 = 0.85$ and $R^L_{\text{ult}} = 6{,}400/8{,}000 = 0.80$.
> > - The excess factor is $1.3333 \times 0.20/0.15 = 1.7778$, the same as the ratio of excess severities, $1{,}600/900$.
> > - The excess ultimate is $\$1{,}350{,}000 \times 1.7778 = \$2{,}400{,}000$, so the IBNR is $\$2{,}400{,}000 - \$1{,}350{,}000 = \$1{,}050{,}000$.
> > - With $\$5{,}160$, $R^L_{36} = 0.86$ and the excess factor is $1.3333 \times 0.20/0.14 = 1.9048$.
> > - A 1.2% change in one fitted severity moves the excess factor by 7.1%, and the IBNR on the same reported losses to about $\$1{,}221{,}000$.

## Consistency across limits

Developed limit by limit, Siewert's factors gave smaller deductibles higher completion factors than larger ones. Tying every limit to one unlimited factor through relativities, ideally read from a fitted severity distribution, prevents it. His Weibull fit at a $\$250{,}000$ deductible gives 48-to-ultimate factors of $1.238$ unlimited, $1.072$ limited and $2.205$ excess.

## Layers between two limits

For a layer between limits $L_1 < L_2$, the relativity ratio becomes a ratio of differences:

> $$\frac{R^{L_2} - R^{L_1}}{R^{L_2}_t - R^{L_1}_t}$$

That is the same algebra as Sahasrabuddhe's [[Layer Development Factor|layer development factors]]. Under a [[Large Deductible Policy|large deductible]], the excess layer is the insurer's own liability and the limited layer is what it bills back ([[Deductible Recovery]]). See [[A Model for Reserving Workers Compensation High Deductibles (Siewert - 1996)|Siewert (1996)]].

> [!trap] Weighting the balance by the later age's relativity
> The balance $\text{LDF}_t = R^L_t \, \text{LDF}^L_t + (1 - R^L_t) \, \text{XSLDF}^L_t$ weights by the relativity at the starting age. Siewert's own printed check for accident year 1993, 12 to 24 months, quotes the 24-month relativity $0.9704$, but it balances to the unlimited $1.6044$ only with the 12-month one: $0.9593(1.6229) + 0.0407(1.1684) = 1.6044$.
