---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f739359d8126dad58aadc1cbdcde970a60c7ce021d7b8ef8e2d3bd4f5114bad5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accident Year.md
---

**Accident Year** (AY) is a data aggregation method that groups losses by the calendar year in which the loss event *occurred*, and matches them against the [[Earned Premium|premium earned]] in that same year — regardless of when the policy was written, when the claim was reported, or when it was paid.

> $$\text{AY } n \text{ Loss Ratio} = \frac{\text{Losses occurring in year } n}{\text{Premium earned in year } n}$$

- The **occurrence date** alone decides the year. A policy written $10/1/2023$ with a loss on $2/4/2024$ paid in $2026$ is Accident Year $2024$.
- AY is the standard basis for both ratemaking and reserving because it is the best compromise on Werner & Modlin's two axes: losses are matched to the exposure that generated them (unlike [[Calendar Year]]), and the cohort closes at the end of the year rather than a full policy term later (unlike [[Policy Year]]).
- An AY cohort is **not final** at year end: losses still develop as claims are reported and case reserves are re-estimated, so an AY must be brought to ultimate with a [[Cumulative Development Factor|CDF]] before it can be compared with a mature year. See [[Loss Development]].
- Premium and losses are only *approximately* matched. AY $n$ earned premium comes partly from policies written in year $n-1$, whose rates and terms differ — which is why the premium must still be brought to current level ([[On-Leveling]]).
- The rows of a [[Development Triangle]] are usually accident years; diagonals are valuation dates. Accident *quarters* or *months* are used when volume permits and responsiveness matters.

![[Media/Figures/Accident_Year.svg|340]]

> [!example]- Assigning a Claim to an Accident Year {Example}
> A $12$-month policy is effective $10/1/2023$. The insured has a loss on $11/15/2024$, which is reported $12/1/2024$, reserved at $\$40{,}000$, and paid $\$52{,}000$ on $3/1/2025$.
>
> Assign the claim under each aggregation basis.
>
> > [!answer]-
> > | Basis | Year | Driver |
> > |---|---|---|
> > | [[Accident Year]] | **2024** | occurrence date $11/15/2024$ |
> > | [[Policy Year]] | 2023 | policy effective date $10/1/2023$ |
> > | [[Report Year]] | 2024 | first notice $12/1/2024$ |
> > | [[Close Year]] | 2025 | settlement $3/1/2025$ |
> > | [[Calendar Year]] | 2024 and 2025 | $\$40{,}000$ incurred in CY 2024; the $\$12{,}000$ of adverse development lands in CY 2025 |
> >
> > Only the accident-year assignment is unaffected by how the claim was handled — which is exactly why it is the ratemaking standard.

> [!example]- Why an Accident Year Loss Ratio Moves {Example}
> AY 2024 earned premium is $\$8{,}000{,}000$. Reported losses were $\$4{,}400{,}000$ at $12$ months and $\$5{,}300{,}000$ at $24$ months. The selected $\text{CDF}_{24 \to \text{ult}}$ is $1.150$.
>
> Compute the loss ratio at each evaluation and at ultimate.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{LR at 12 mo} &= \frac{\$4{,}400{,}000}{\$8{,}000{,}000} \\
> > &= 55.0\% \\[4pt]
> > \text{LR at 24 mo} &= \frac{\$5{,}300{,}000}{\$8{,}000{,}000} \\
> > &= 66.3\%
> > \end{align*}$$
> >
> > At ultimate:
> >
> > $$\begin{align*}
> > \text{Ultimate} &= \$5{,}300{,}000 \times 1.150 \\
> > &= \$6{,}095{,}000 \\[4pt]
> > \text{Ultimate LR} &= \frac{\$6{,}095{,}000}{\$8{,}000{,}000} \\
> > &= 76.2\%
> > \end{align*}$$
> >
> > The denominator never changes — earned premium for a closed accident year is fixed — so every movement in an AY loss ratio comes from loss development. An immature AY loss ratio always understates the ultimate answer, and quoting one without its CDF is a standard exam trap.
