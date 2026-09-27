---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2c579d21dc69a5554b04e137a1ef811ff736fd55763c710d8536d8fcdabf603b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Excess Loss Development Factor.md
---

**Excess Loss Development Factor** ($\text{XSLDF}^L_t$) is the development factor, from age $t$ to a later age or ultimate, for the losses above a per-occurrence deductible or limit $L$. Siewert derives it from the unlimited (full coverage) factor and the **limited severity relativity** $R^L_t$, the share of loss at age $t$ that lies below $L$, so that the limited and excess factors split unlimited development consistently.

> $$\text{XSLDF}^L_t = \text{LDF}_t \times \frac{1 - R^L}{1 - R^L_t}$$

> $$\text{LDF}^L_t = \text{LDF}_t \times \frac{R^L}{R^L_t}$$

> $$\text{LDF}_t = R^L_t \, \text{LDF}^L_t + (1 - R^L_t) \, \text{XSLDF}^L_t$$

- **Symbols.** $\text{LDF}_t$ is the unlimited [[Development Factor|development factor]] from age $t$, $\text{LDF}^L_t$ the limited (deductible) factor, and $R^L_t$ the limited severity divided by the unlimited severity at age $t$. $R^L$ is the same ratio at the later age. Measured on the severity distribution at that maturity, $R^L_t = E[X \wedge L]/E[X]$ is the [[Loss Elimination Ratio|loss elimination ratio]] of the deductible, and $1 - R^L_t$ its excess ratio.
- **Where it comes from.** Write losses at age $t$ as counts times severity, $C_t S_t$. The limited part is $C_t S_t R^L_t$ and the excess part $C_t S_t (1 - R^L_t)$. Dividing the later age by age $t$ gives the formulas, with the common factor $\text{LDF}_t = (C/C_t)(S/S_t)$ (Siewert's equations 4.2–4.7). The weights in the balance equation are the relativities at the **starting** age $t$.
- **Leverage.** Late development lands mostly above the deductible, so the LER falls with maturity ($R^L < R^L_t$), and $\text{XSLDF}^L_t > \text{LDF}_t > \text{LDF}^L_t$. Because $1 - R^L_t$ is small, a small error in the relativity becomes a large error in the excess factor. Siewert finds excess factors "quite leveraged and extremely volatile". Applied directly to excess losses, they give no answer at all when nothing has yet emerged above the deductible. That is why he prefers the [[Implied Development Method|implied development]] and [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] approaches for the excess layer.
- **Consistency across limits.** Developed limit by limit, Siewert's factors gave smaller deductibles higher completion factors than larger ones. Tying every limit to one unlimited factor through relativities, ideally read from a fitted severity distribution, prevents it. His Weibull fit at a \$250,000 deductible gives 48-to-ultimate factors of $1.238$ unlimited, $1.072$ limited and $2.205$ excess.
- **Related pages.** Under a [[Large Deductible Policy|large deductible]], the excess layer is the insurer's own liability and the limited layer is what it bills back ([[Deductible Recovery]]). For a layer between two limits, the relativity becomes a difference, $(R^{L_2} - R^{L_1})/(R^{L_2}_t - R^{L_1}_t)$. That is the same algebra as Sahasrabuddhe's [[Layer Development Factor|layer development factors]]. See [[A Model for Reserving Workers Compensation High Deductibles (Siewert - 1996)|Siewert (1996)]].
- **A note on the paper's printed check.** Siewert illustrates the balance equation for accident year 1993, 12 to 24 months, with the 24-month relativity $0.9704$. It only balances to the unlimited $1.6044$ with the 12-month relativity: $0.9593(1.6229) + 0.0407(1.1684) = 1.6044$.

> [!example]- Limited and Excess Factors from Unlimited Factors {Example}
> A workers compensation book has these unlimited age-to-age factors and limited severity relativities for a \$250,000 deductible:
>
> | Age | 12 | 24 | 36 | Ult |
> |---|---|---|---|---|
> | Unlimited factor to next age | $1.600$ | $1.150$ | $1.080$ | |
> | Relativity $R^L$ | $0.97$ | $0.95$ | $0.93$ | $0.90$ |
>
> Compute the limited and excess age-to-age factors and the 12-to-ultimate factors. Check the balance from 12 to 24 months. What share of the development still to come is excess development at 12 months, and at 36 months?
>
> > [!answer]-
> > Limited factors are $\text{LDF}_t \times R^L / R^L_t$, and excess factors are $\text{LDF}_t \times (1 - R^L)/(1 - R^L_t)$:
> >
> > $$
> > \begin{align*}
> > \text{LDF}^L_{12} &= 1.600 \times 0.95 / 0.97 \\
> > &= 1.5670 \\
> > \text{LDF}^L_{24} &= 1.150 \times 0.93 / 0.95 \\
> > &= 1.1258 \\
> > \text{LDF}^L_{36} &= 1.080 \times 0.90 / 0.93 \\
> > &= 1.0452
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{XSLDF}^L_{12} &= 1.600 \times 0.05 / 0.03 \\
> > &= 2.6667 \\
> > \text{XSLDF}^L_{24} &= 1.150 \times 0.07 / 0.05 \\
> > &= 1.6100 \\
> > \text{XSLDF}^L_{36} &= 1.080 \times 0.10 / 0.07 \\
> > &= 1.5429
> > \end{align*}
> > $$
> >
> > The relativity ratios telescope, so the 12-to-ultimate factors come straight from the end points:
> >
> > $$
> > \begin{align*}
> > \text{LDF}_{12} &= 1.600 \times 1.150 \times 1.080 \\
> > &= 1.9872 \\
> > \text{LDF}^L_{12} &= 1.9872 \times 0.90 / 0.97 \\
> > &= 1.8438 \\
> > \text{XSLDF}^L_{12} &= 1.9872 \times 0.10 / 0.03 \\
> > &= 6.6240
> > \end{align*}
> > $$
> >
> > The balance from 12 to 24 months weights by the relativity at 12 months:
> >
> > $$
> > \begin{align*}
> > \text{LDF}_{12} &= 0.97(1.5670) + 0.03(2.6667) \\
> > &= 1.5200 + 0.0800 \\
> > &= 1.6000
> > \end{align*}
> > $$
> >
> > Development still to come is $1 - 1/\text{LDF}_t$. Its excess part is $(1 - R^L_t)(\text{XSLDF}^L_t - 1)/\text{LDF}_t$:
> >
> > $$
> > \begin{align*}
> > \text{At 12: } 1 - 1/1.9872 &= 0.4968 \\
> > \text{excess part} &= 0.03(5.6240)/1.9872 \\
> > &= 0.0849 \\
> > \text{At 36: } 1 - 1/1.0800 &= 0.0741 \\
> > \text{excess part} &= 0.07(0.5429)/1.0800 \\
> > &= 0.0352
> > \end{align*}
> > $$
> >
> > Excess development is $0.0849/0.4968 = 17\%$ of what remains at 12 months, but $0.0352/0.0741 = 47.5\%$ at 36 months. The excess factor from 12 months, $6.62$, is more than three times the unlimited $1.99$.

> [!example]- An Excess Factor from a Fitted Severity Model {Example}
> A severity model fitted to a workers compensation book gives these average severities per full coverage claim. Claim counts are complete by 36 months.
>
> | Severity | 36 months | Ultimate |
> |---|---|---|
> | Unlimited | $\$6{,}000$ | $\$8{,}000$ |
> | Limited to \$250,000 | $\$5{,}100$ | $\$6{,}400$ |
>
> Reported losses excess of the \$250,000 deductible are \$1,350,000 at 36 months. Estimate the excess ultimate and IBNR. Then show the effect if the fitted limited severity at 36 months had been \$5,160 instead.
>
> > [!answer]-
> > With counts complete, the unlimited factor is the severity ratio:
> >
> > $$
> > \begin{align*}
> > \text{LDF}_{36} &= 8{,}000 / 6{,}000 \\
> > &= 1.3333 \\
> > R^L_{36} &= 5{,}100 / 6{,}000 \\
> > &= 0.85 \\
> > R^L_{\text{ult}} &= 6{,}400 / 8{,}000 \\
> > &= 0.80
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{XSLDF}^L_{36} &= 1.3333 \times \frac{1 - 0.80}{1 - 0.85} \\
> > &= 1.7778 \\
> > \text{Ultimate} &= \$1{,}350{,}000 \times 1.7778 \\
> > &= \$2{,}400{,}000 \\
> > \text{IBNR} &= \$2{,}400{,}000 - \$1{,}350{,}000 \\
> > &= \$1{,}050{,}000
> > \end{align*}
> > $$
> >
> > The same factor is the ratio of excess severities, $(8{,}000 - 6{,}400)/(6{,}000 - 5{,}100) = 1{,}600/900 = 1.7778$. The limited factor is $6{,}400/5{,}100 = 1.2549$. In LER terms, the deductible eliminates $85\%$ of losses at 36 months but only $80\%$ at ultimate.
> >
> > With a limited severity of $\$5{,}160$ at 36 months:
> >
> > $$
> > \begin{align*}
> > R^L_{36} &= 5{,}160 / 6{,}000 \\
> > &= 0.86 \\
> > \text{XSLDF}^L_{36} &= 1.3333 \times \frac{0.20}{0.14} \\
> > &= 1.9048
> > \end{align*}
> > $$
> >
> > A $1.2\%$ change in one fitted severity moves the excess factor by $7.1\%$, and the IBNR on the same reported losses from $\$1{,}050{,}000$ to $\$1{,}221{,}000$. That leverage is why the excess factor is best read off a severity model that is consistent at every limit, rather than selected from a volatile excess triangle.
