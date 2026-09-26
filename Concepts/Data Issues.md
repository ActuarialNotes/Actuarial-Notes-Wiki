---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cb4df59c75fef0e1bc711e58679d7953d442ea4bd96cf9e00be10997ac1137ac
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Issues.md
---

**Data Issues** are defects in the data behind a ratemaking or reserving analysis — errors, omissions, inconsistent definitions, anomalous values and structural irregularities — that would bias the result if the data were used as delivered. The actuary must find them, then correct, adjust for, work around or disclose them.

> $$\text{CY}_Y\ \text{paid} = \sum_{\text{AY}} \left( P_{\text{AY}}^{(Y)} - P_{\text{AY}}^{(Y-1)} \right)$$

- $P_{\text{AY}}^{(Y)}$ is cumulative paid for an accident year as of year-end $Y$: the latest diagonal of a paid triangle less the previous diagonal is the calendar year's payments. That identity is what lets a triangle be **reconciled** to financial statements, a standard first check on any reserving or ratemaking extract.
- **Friedland's verification checklist** (not an audit — see [[Data Quality]]): *consistency with financial statement data*; *consistency with the prior analysis's data*, with any difference explained; *reasonableness* — questionable values such as large negative paid claims or fields that contradict each other are investigated, though not presumed wrong; and *definitions* — know what each field means (incurred, reserves and paid all mean different things to different departments) and how often default values stand in for missing information.
- **Typical errors:** transactions coded to the wrong accident period, line or coverage; payments not yet allocated to an accident period; impossible dates (a claim reported before it occurred, a policy effective after it expires); zero or negative exposure; duplicated or missing months; catastrophes and large losses flagged inconsistently.
- **Definitional changes** masquerade as trends: counting per claimant instead of per occurrence, treating reopened claims as new, including ALAE, recording claims net or gross of [[Recoveries|recoveries]]. See [[Claims Coding Changes]] and [[Changing Conditions]].
- **Exam 7 — issues in a stochastic triangle model** (Shapland's ODP bootstrap): *negative incremental values* (a modified log link handles them unless a whole column sums negative, which needs a constant shift; or model salvage and subrogation separately); *missing values* (estimate from surrounding cells, or exclude from the factors and residuals); *outliers* (exclude with care — skewed residuals are expected); *heteroscedasticity* (group development periods and adjust residuals, or sample within groups); *heteroecthesious data* — a partial first development period or partial last diagonal; and *exposure changes* (model losses per exposure). See [[Data Diagnostic Analysis]], [[Stochastic Reserving]], [[Missing Data]], [[Outlier]].
- The end-of-analysis counterpart is [[Reasonableness Testing|reasonableness testing]] of the results: implied frequencies, severities, loss ratios and average unpaid per open claim by year.

> [!example]- A Paid Triangle That Does Not Reconcile {Example}
> Cumulative paid ($000):
>
> | AY | 12 | 24 | 36 | 48 |
> |---|---|---|---|---|
> | $2021$ | $4{,}200$ | $7{,}100$ | $8{,}300$ | $8{,}700$ |
> | $2022$ | $4{,}500$ | $7{,}500$ | $8{,}900$ | |
> | $2023$ | $4{,}800$ | $8{,}100$ | | |
> | $2024$ | $5{,}000$ | | | |
>
> The accounting records show calendar year $2024$ payments on AY $2021$–$2024$ of $\$10{,}700$k, of which $\$5{,}600$k is on AY $2024$. The selected paid CDF at $12$ months is $2.10$. Reconcile and assess the effect.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Latest diagonal} &= 8{,}700 + 8{,}900 + 8{,}100 + 5{,}000 \\
> > &= 30{,}700 \\
> > \text{Prior diagonal} &= 8{,}300 + 7{,}500 + 4{,}800 = 20{,}600 \\
> > \text{Triangle CY 2024} &= 30{,}700 - 20{,}600 = 10{,}100
> > \end{align*}
> > $$
> >
> > The triangle is $\$600$k short. By accident year its CY $2024$ increments are $400$, $1{,}400$, $3{,}300$ and $5{,}000$; the first three match the accounting records, so the gap is entirely in AY $2024$ — typically payments made but not yet allocated to an accident period when the extract was cut.
> >
> > $$\$600\text{k} \times 2.10 = \$1{,}260\text{k}$$
> >
> > of AY $2024$ ultimate would be missing from a paid projection, and next year's $12$–$24$ factor would be overstated when the payments surface. Correct the extract (or reallocate the $\$600$k) before selecting anything.

> [!example]- A Keying Error in the Development Factors {Example}
> Paid $12$–$24$ age-to-age factors for AY $2019$–$2023$ are $1.62$, $1.66$, $2.945$, $1.67$ and $1.63$. Investigation of AY $2021$ finds a $\$580{,}000$ payment keyed as $\$5{,}800{,}000$; the AY had $\$4{,}000$k paid at $12$ months. AY $2024$ has $\$4{,}300$k paid at $12$ months.
>
> Quantify the effect and the right treatment.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Corrected AY 2021 at 24} &= 11{,}780 - 5{,}220 = 6{,}560 \\
> > \text{Corrected factor} &= 6{,}560 / 4{,}000 = 1.640 \\
> > \text{Average as keyed} &= 9.525 / 5 = 1.905 \\
> > \text{Average corrected} &= 8.220 / 5 = 1.644
> > \end{align*}
> > $$
> >
> > (The keyed value at $24$ months was $6{,}560 + 9 \times 580 = 11{,}780$.) Left in, the error would add $4{,}300 \times (1.905 - 1.644) = \$1{,}122$k at the $12$–$24$ step alone for AY $2024$, before the rest of the CDF compounds it; it would also depress AY $2021$'s later factors, since its base is inflated.
> >
> > Correcting the record is better than excluding the cell: exclusion loses a genuine observation, and in an ODP bootstrap an error left in the triangle becomes an extreme residual that is resampled into every other cell's variability.
