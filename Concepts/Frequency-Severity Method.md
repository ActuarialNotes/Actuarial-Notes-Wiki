---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:ea42e97c640fd4a5c6a53bffe400c83d40d712d49ac422ecfceb021f4c7aca28
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.11 Frequency-Severity Techniques, PDF pp.200-203, 207-213, 218 (printed 194-197, 201-207, 212), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Frequency-Severity Method.md
---

**Frequency-Severity Method** projects [[Claim Count Triangle|claim counts]] and average [[Severity|severity]] separately and multiplies them, instead of developing loss dollars directly.

> $$U = N_{\text{ult}} \times S_{\text{ult}}$$

> $$U = \text{Exposures} \times \text{Frequency}_{\text{ult}} \times S_{\text{ult}}$$

Friedland gives three variants:

- **Development on counts and severities.** Develop the count triangle to ultimate counts; develop an average severity triangle (dollars ÷ counts at each age) to ultimate severity; multiply. The straightforward version.
- **Exposures and inflation.** For the most recent accident years, where development factors are most leveraged: compare developed ultimate counts with a trended **exposure** base to select a **frequency**, and select severity from developed severities **trended** to the latest year's cost level.
- **Disposal rate approach.** Project the number of claims closing in each future period from historical **disposal rates**, value them at a trended severity for that maturity, and sum the future payments. This is the variant that handles a changing [[Settlement Rate|settlement rate]] head on.

Further points:

- The value of the split is **diagnostic**. A dollar triangle tells you losses grew; frequency and severity tell you *why*, and the two causes call for different responses and carry different persistence.
- Counts are more **credible** and less inflation-sensitive; severity is where the trend lives. Projecting each with the tool it suits — development for counts, trend for severity — is often better than developing either alone.
- The method needs **consistent count definitions** across the whole triangle, and it is sensitive to [[Large Loss|large losses]] in the severity series, so severities are usually capped and the excess layer added back separately.
- A pitfall: average severity triangles mix two opposing forces — IBNER pushing severity up, late-reported small claims pulling it down. Report-year severities avoid the dilution; accident-year severities do not.
- Because frequency and severity are projected separately, a known change in claim cost, such as a tort reform or a benefit change, can be built into the selected severities directly instead of waiting for it to show up in the development pattern. Friedland lists this ability to reflect inflation explicitly as an often-cited advantage, and adjusts XYZ Insurer's severities for its tort reforms this way (Friedland, Ch. 11). The other side of it: the result is highly sensitive to the trend assumption.

**Approach #2 in detail** (Friedland, Ch. 11, pp. 202–204):

- Ultimate claim counts and the exposure base are put on a common level before they are compared: the counts are trended with the claim count trend, and an inflation-sensitive exposure base is trended to the same year (payroll, for workers compensation).
- Where earned premium is the only exposure data available, frequency is the trended ultimate claim counts divided by the on-level earned premium. Putting premium on the current rate level keeps rate changes out of the frequency, and dividing by an exposure measure keeps growth in the book out of it.
- Frequency and severity are selected at the latest year's level and then moved back one year at a time to the earlier year being projected. To move a selected severity back one year, divide it by one year's severity trend factor. To move a selected frequency back one year, divide it by one year's claim count trend factor and reverse one year of change in the exposure base (a year of payroll inflation, or the rate level change between the two years for on-level premium).
- Projected ultimate claims for each recent year are its exposure times the selected frequency times the selected severity.

**The disposal rate technique in detail** (Friedland, Ch. 11, pp. 205–212):

- The disposal rate at an age is cumulative closed claim counts divided by the selected ultimate claim counts for the accident year; a disposal rate is selected for each age.
- Future closed counts complete the square: the claims an accident year still has to close (its ultimate claim counts less the claims closed to date) are spread over the future ages in proportion to the selected incremental disposal rates still to come, each divided by one minus the selected disposal rate at the latest age.
- Incremental paid severity at an age is the incremental paid claims in that age interval divided by the incremental closed claim counts in the same interval. The incremental severities are trended to a common cost level before they are compared and selected by age, then moved back to each accident year's own cost level for the future cells.
- Projected ultimate claims are the sum, over every age, of incremental closed claim counts times incremental paid severity; the actual cells to date plus the projected future cells complete the row.
- An implicit assumption is that there are no significant partial (interim) payments. The technique matches paid dollars to closed counts, so material payments on claims that are still open distort the incremental severities. Where they are material, paid claims on closed claims only, or paid claims in the interval divided by the claims open at the start of it, can be used instead.
- Where the trended incremental severities begin to vary from year to year at the older ages, usually because few claims close there and one large claim can dominate, the experience of those ages is combined. The tail severity is the sum of trended incremental paid claims divided by the sum of incremental closed claim counts over every cell at the selected age and older.
- The age at which to combine depends on the age at which the results become erratic, the influence on the total projection of selecting a particular age, and the percentage of claims expected to be closed beyond that age. Combining too late leaves the oldest ages' severities resting on a handful of volatile claims; combining too early gives up age-by-age severities that the data can still support. In Friedland's example, combining one age earlier would have reduced the unpaid claim estimate by more than 10%.

![[Media/Figures/Frequency-Severity_Method.svg|340]]

> [!example]- Straightforward Frequency-Severity Projection {Example}
> An accident year has $10{,}000$ earned car-years. Projected ultimate frequency is $0.08$ claims per car-year and projected ultimate severity is $\$12{,}500$.
>
> Estimate ultimate losses.
>
> > [!answer]-
> > $$\begin{align*}
> > N_{\text{ult}} &= 10{,}000 \times 0.08 = 800 \text{ claims} \\[4pt]
> > U &= 800 \times \$12{,}500 = \$10{,}000{,}000
> > \end{align*}$$
> >
> > Equivalently a pure premium of $0.08 \times \$12{,}500 = \$1{,}000$ per car-year. The decomposition matters when the estimate is challenged: an actuary can defend $0.08$ against the exposure base and $\$12{,}500$ against severity trend and settled-claim data, where a bare $\$1{,}000$ has no supporting evidence of its own.

> [!example]- Diagnosing an Adverse Year {Example}
> An accident year's ultimate estimate has risen $22\%$ since the previous valuation. The components:
>
> | | Prior valuation | Current |
> |---|---|---|
> | Ultimate counts | $1{,}200$ | $1{,}215$ |
> | Ultimate severity | $\$9{,}000$ | $\$10{,}830$ |
>
> What happened, and what should change in the analysis?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Count change} &= \frac{1{,}215}{1{,}200} - 1 = +1.3\% \\[4pt]
> > \text{Severity change} &= \frac{10{,}830}{9{,}000} - 1 = +20.3\%
> > \end{align*}$$
> >
> > $$1.013 \times 1.203 = 1.219 \;\checkmark$$
> >
> > Counts are essentially where they were — reporting is complete and the earlier count projection was good. **The entire deterioration is severity.**
> >
> > That narrows the causes sharply. It is not a reporting-pattern change, not a frequency shock, and not a volume issue. The candidates are: claims already known getting worse (IBNER, possibly from a [[Case Adequacy|case adequacy]] change), an [[Inflation|inflation]] or legal shock hitting open claims, or one or two [[Large Loss|large claims]] developing.
> >
> > Two things follow for the analysis. First, check whether this is one accident year or **all of them** — a severity jump across every open year on the same diagonal is a calendar-year effect requiring a triangle restatement, not a year-specific reserve increase. Second, if severity trend has genuinely stepped up, the **pricing** severity trend selection is stale too, and the reserving finding is also a rate-adequacy finding.
