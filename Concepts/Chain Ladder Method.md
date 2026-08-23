---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:de5421d182acad3156e476c0b27e9d36ea17b7b08a6d0ed3b02a05eee8269f08
  sources: []
  open_findings: 0
  log: .verify/Concepts/Chain Ladder Method.md
---

**Chain Ladder Method** (development or link-ratio method) projects each cohort to ultimate by multiplying its latest cumulative amount by a [[Cumulative Development Factor|cumulative development factor]] derived from the historical pattern.

> $$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$

> $$\text{IBNR} = U_{\text{AY}} - C_{\text{AY},\,n}$$

**The procedure:** build the cumulative [[Development Triangle|triangle]] → compute [[Age to Age Factor|age-to-age factors]] → select a factor for each interval → chain them into CDFs with a [[Tail Factor|tail]] → apply to the latest diagonal.

**The assumptions**, and each is a way the method fails:

- **Each cohort develops in the same pattern.** Violated by a change in [[Mix of Business|mix]], limits or coverage.
- **The pattern is stable over calendar time.** Violated by a change in [[Case Adequacy|case adequacy]], [[Settlement Rate|settlement speed]] or [[Inflation|inflation]] — the diagonal effects.
- **Future development is proportional to what has emerged.** This is the strong one: the method takes whatever sits on the diagonal at face value and scales it. A [[Large Loss|shock loss]] reported early is multiplied by the full CDF.

Further points:

- The chain ladder is at its best on **mature cohorts with stable patterns and ample volume** — and at its worst at immature ages in [[Long Tail Lines|long-tail lines]], where the CDF is large and the diagonal is thin. There, [[Bornhuetter-Ferguson Method|BF]] or the [[Expected Loss Method|expected claims]] technique is preferred.
- Run it on **paid and reported** data both. The two answers rest on the same claims, so their difference is a diagnostic about case adequacy and settlement rates, not a menu to average.
- It is entirely **data-driven**: nothing external — premium, exposure, rate level or judgment about the year — enters the estimate. That independence is its strength as a check on other methods and its weakness as a standalone estimate.

![[Media/Figures/Chain_Ladder_Method.svg|340]]

> [!example]- Chain Ladder Projection Across Three Years {Example}
> Cumulative reported losses ($000s):
>
> | AY | 12 mo | 24 mo | 36 mo |
> |---|---|---|---|
> | $2022$ | $575$ | $875$ | $1{,}025$ |
> | $2023$ | $600$ | $900$ | |
> | $2024$ | $625$ | | |
>
> Selected factors: $f_{12\text{–}24} = 1.500$, $f_{24\text{–}36} = 1.170$, tail $= 1.081$.
>
> Project each year and compute total IBNR.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{CDF}_{36} &= 1.081 \\
> > \text{CDF}_{24} &= 1.170 \times 1.081 = 1.265 \\
> > \text{CDF}_{12} &= 1.500 \times 1.265 = 1.898
> > \end{align*}$$
> >
> > | AY | Reported | CDF | Ultimate | IBNR |
> > |---|---|---|---|---|
> > | $2022$ | $1{,}025$ | $1.081$ | $1{,}108$ | $83$ |
> > | $2023$ | $900$ | $1.265$ | $1{,}139$ | $239$ |
> > | $2024$ | $625$ | $1.898$ | $1{,}186$ | $561$ |
> > | **Total** | $2{,}550$ | | $3{,}433$ | $883$ |
> >
> > Total IBNR is $\$883{,}000$, of which $64\%$ sits on the single most recent year. That concentration is the signature of the method: the youngest cohort carries the largest factor, the thinnest data and almost all the uncertainty.

> [!example]- Where the Chain Ladder Breaks {Example}
> Accident year $2024$ at $12$ months has reported losses of $\$4{,}500{,}000$, including one claim reserved at its $\$1{,}500{,}000$ policy limit. The selected $\text{CDF}_{12}$ is $3.20$, built from years containing no such claim. Earned premium is $\$14{,}000{,}000$ and the a priori loss ratio is $65\%$.
>
> Estimate ultimate losses.
>
> > [!answer]-
> > **Chain ladder as-is:**
> >
> > $$\$4{,}500{,}000 \times 3.20 = \$14{,}400{,}000$$
> >
> > — a $103\%$ loss ratio, against an a priori of $65\%$, driven by one claim. The method has implicitly forecast that the $\$1.5$M claim will grow to $\$4.8$M, which it cannot: it is already at policy limits.
> >
> > **Corrected — remove the shock loss, develop the rest, add it back:**
> >
> > $$\begin{align*}
> > \text{Ordinary} &= \$3{,}000{,}000 \times 3.20 = \$9{,}600{,}000 \\
> > \text{Known large claim} &= \$1{,}500{,}000 \\
> > \text{Provision for further large claims} &\approx \$700{,}000 \\[4pt]
> > \text{Ultimate} &= \$11{,}800{,}000
> > \end{align*}$$
> >
> > — an $84\%$ loss ratio, still adverse but plausible.
> >
> > **BF as a cross-check**, using the corrected treatment: with $p = 1/3.20 = 31.25\%$,
> >
> > $$\$4{,}500{,}000 + 0.6875 \times 0.65 \times \$14{,}000{,}000 = \$10{,}756{,}000$$
> >
> > The three answers span $\$3.6$M. The chain ladder's $\$14.4$M is the one that should be discarded outright — not because the method is wrong, but because its proportionality assumption is being applied to a diagonal that violates it.
