**Line of Business** is a grouping of policies covering a similar kind of risk that share an [[Exposure Base|exposure base]], a rating structure, a development pattern and a regulatory classification — personal auto, homeowners, workers compensation, commercial general liability, and so on. The line is the outermost level at which rate indications and reserve analyses are organized.

> $$\text{Rate}_{\text{line}} = \frac{\text{Losses} + \text{LAE} + \text{Fixed Expenses}}{\text{Exposures} \times (1 - V - Q)}$$

- The line determines what the actuary can even measure: the exposure base, the relevant [[Loss Trend|trends]], the shape of the development pattern, and which rating variables are permitted.
- Lines differ along the axes tested in [[Types of Insurance]] — [[Long Tail Lines|long]] vs. [[Short Tail Insurance|short tail]], low vs. high [[Frequency|frequency]], [[Occurrence Coverage|occurrence]] vs. [[Claims Made Coverage|claims-made]] trigger — and each axis changes the choice of data organization and reserving method.
- Segmentation *within* a line (coverage, class, [[Territory Ratemaking|territory]]) balances [[Homogeneity]] against [[Credibility]]. Segmentation *across* lines is rarely optional: combining auto physical damage with general liability is indefensible on either criterion.
- Statutory reporting fixes the outer boundaries. Annual Statement Schedule P lines and NAIC line definitions determine how reserves are reported and how [[External Information in Reserving|industry benchmarks]] are published, so the actuary's internal segments must roll up to them.
- Multi-line policies (commercial package, homeowners) are analyzed **by coverage**, not by policy, then recombined — a homeowners indication is built from separate property, liability and theft analyses.

![[Media/Figures/Line_of_Business.svg|340]]

> [!example]- Matching Exposure Base and Method to the Line {Example}
> An actuary must set up analyses for personal auto physical damage, workers compensation, and commercial general liability.
>
> Specify the exposure base, aggregation basis and preferred reserving method for each.
>
> > [!answer]-
> > | | Auto phys. dam. | Workers comp | CGL |
> > |---|---|---|---|
> > | Exposure base | car-years | payroll per $\$100$ | sales / receipts |
> > | Inflation-sensitive base? | no | yes → [[Exposure Trend]] | yes |
> > | Tail | short | long | long |
> > | Trigger | occurrence | occurrence | occurrence or claims-made |
> > | Aggregation | [[Accident Year]] | accident year | accident or [[Report Year]] |
> > | Reserving | [[Chain Ladder Method|chain ladder]] (paid) | [[Bornhuetter-Ferguson Method|BF]] at early ages | BF / [[Cape Cod Method|Cape Cod]] |
> >
> > Nothing here is arbitrary: the tail dictates the reserving method, the base's inflation sensitivity dictates whether exposure trend applies, and the trigger dictates the aggregation basis.

> [!example]- Segmenting Inside a Line {Example}
> A homeowners book of $\$80{,}000{,}000$ is written across one state, with a large coastal territory exposed to hurricane.
>
> How should the line be segmented for the rate indication?
>
> > [!answer]-
> > **By coverage first, peril second, territory third.**
> >
> > 1. Split the indication into **property** and **liability (Section II)** — different pure premiums, different development, different trends. Liability is a small slice of homeowners premium but a long-tail one.
> > 2. Within property, pull out [[Catastrophe Loss|catastrophe]] losses. Hurricane losses are not projectable from five years of history; they are priced from a model's long-run average annual loss and loaded separately, while the non-catastrophe experience carries the rest of the indication.
> > 3. Only then split by [[Territory Ratemaking|territory]] and amount of insurance for the **relativities** — those are a different exercise from the overall level, and each cell must be [[Credibility|credibility-weighted]].
> >
> > The order matters. Territory relativities computed on catastrophe-inclusive data would swing wildly depending on whether a hurricane happened to hit the coastal territory during the experience period.
