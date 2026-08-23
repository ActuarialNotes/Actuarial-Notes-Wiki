---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:38a9c006468869c4e76262c7fbe267f205344630cc43f0d142283d79802d8633
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Salvage and Subrogation.md
---

**Salvage and Subrogation** (S&S) are the two recoveries that reduce an insurer's net cost after it has paid a claim: **salvage** is the value realized from damaged property the insurer takes title to (a totalled vehicle); **subrogation** is recovery from a third party legally responsible for the loss.

> $$\text{Net Ultimate} = \text{Gross Ultimate} - \text{S\&S Ultimate}$$

- S&S must be **projected on its own triangle**, not scaled from losses. Recovery patterns lag payment patterns — salvage arrives within months, but subrogation requires establishing liability against a third party and can take years, especially where litigation is involved.
- Applying loss development factors to reported recoveries, or netting recoveries inside the loss triangle without checking that the netting is consistent across all years, both produce errors that are invisible in the result.
- Data must be **consistent about direction**: recoveries may be recorded as negative payments inside the loss triangle, as a separate recovery triangle, or (worst) inconsistently across systems and years. A change in recording convention looks exactly like a change in recovery rates.
- Because recoveries can arrive after a claim closes, S&S is a common source of **negative development** — age-to-age factors below $1.000$ in the later columns of a net triangle. Capping factors at $1.000$ removes real recoveries from the estimate.
- Salvage is material in auto physical damage and property; subrogation in auto liability, workers compensation (third-party actions) and products liability. Recovery rates vary enormously by line, so a benchmark ratio borrowed across lines is worthless.
- Omitting S&S from the analysis overstates net reserves; assuming this year's recovery rate will persist without checking the subrogation department's staffing and practices is the mirror error.

![[Media/Figures/Salvage_and_Subrogation.svg|340]]

> [!example]- Developing Recoveries Separately {Example}
> AY 2023: gross reported losses $\$1{,}000{,}000$ with a gross CDF of $1.200$; reported salvage $\$80{,}000$ and subrogation $\$40{,}000$, with an S&S CDF of $1.250$.
>
> Compute net ultimate losses.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Gross ultimate} &= \$1{,}000{,}000 \times 1.200 \\
> > &= \$1{,}200{,}000 \\[6pt]
> > \text{S\&S reported} &= \$80{,}000 + \$40{,}000 = \$120{,}000 \\[4pt]
> > \text{S\&S ultimate} &= \$120{,}000 \times 1.250 \\
> > &= \$150{,}000 \\[6pt]
> > \text{Net ultimate} &= \$1{,}200{,}000 - \$150{,}000 \\
> > &= \$1{,}050{,}000
> > \end{align*}$$
> >
> > The S&S CDF ($1.250$) exceeds the gross CDF ($1.200$) because recoveries lag losses. Developing the recoveries at the gross factor instead would give an S&S ultimate of $\$144{,}000$ and a net ultimate $\$6{,}000$ too high — small here, but the gap widens with the tail, and in subrogation-heavy lines the recovery CDF can be double the loss CDF.

> [!example]- A Change in Recovery Practice {Example}
> Subrogation recoveries as a percentage of paid losses, by accident year at $36$ months:
>
> | AY | Recovery ratio |
> |---|---|
> | $2019$ | $6.2\%$ |
> | $2020$ | $6.4\%$ |
> | $2021$ | $6.1\%$ |
> | $2022$ | $9.3\%$ |
> | $2023$ | $9.8\%$ |
>
> The insurer outsourced subrogation to a specialist vendor in $2022$. How should the reserve analysis respond?
>
> > [!answer]-
> > The recovery ratio stepped up roughly $50\%$ when the vendor took over — a genuine, explained change in the process, not noise.
> >
> > Consequences for the analysis:
> >
> > - **Historical recovery factors are stale.** Factors built on $2019$–$2021$ describe the old recovery rate and will under-project recoveries on the recent years, over-stating net reserves.
> > - **The older accident years are still running off under the new arrangement.** If the vendor is also pursuing open subrogation on AY $2019$–$2021$ claims, those years' future recoveries will exceed what their own history implies — so the change affects every open year, not just the new ones.
> > - **The net triangle is now non-homogeneous** across the change date, which is an argument for developing gross and recoveries separately (as here) rather than netting inside one triangle.
> >
> > The practical selection: use the post-$2022$ ratios for the recent years, and for the older years apply judgment about how much of their remaining subrogation potential the vendor can still capture. Both are judgment calls, and both belong in the documentation — this is the sort of operational change Friedland's Chapter 4 management interview is designed to surface *before* the triangles are built.
