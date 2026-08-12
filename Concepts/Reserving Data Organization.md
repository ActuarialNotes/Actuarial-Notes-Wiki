**Reserving Data Organization** is the grouping of claim and exposure data into cohorts for estimating [[Unpaid Claims|unpaid claims]]. Friedland's framing differs from ratemaking's: the cohort must be a set of claims whose **emergence pattern** is stable enough to project forward, and it must be segmented so that each triangle is internally consistent.

> $$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$

> $$\text{IBNR} = \text{Ultimate} - \text{Reported to date}$$

- **[[Accident Year]]** is the default reserving basis for direct business: claims grouped by occurrence date produce a [[Development Triangle]] whose rows share an exposure period and whose columns share a maturity.
- **[[Policy Year]]** and **[[Underwriting Year]]** are used where the contract, not the calendar, defines the cohort — reinsurance, large-deductible and retro programs — at the cost of a longer, more leveraged development pattern.
- **[[Report Year]]** is required for [[Claims Made Coverage|claims-made]] business and preferred for severity triangles, because a report year contains no pure [[IBNR]] and its claim-count denominator is fixed.
- **[[Calendar Year]]** is never a reserving cohort. Its diagonal *is* the data — a calendar year is one diagonal of every triangle — and a diagonal effect (a reserve strengthening, a settlement push, a change in [[Inflation|inflation]]) is a distortion to be diagnosed, not a cohort to be projected.

Beyond the time basis, Friedland's segmentation requirements:

- Split into groups that balance [[Homogeneity]] against [[Credibility]] — by [[Line of Business|line]], coverage, [[Long Tail Lines|tail length]], and by claim type where settlement patterns genuinely differ.
- Keep **gross, ceded and net** triangles separate rather than netting inside the data; the [[Ceded Losses|ceded]] pattern differs from the [[Gross Losses|gross]] one because reinsurance attaches to large, slow claims.
- Handle recoveries consistently: decide whether [[Salvage and Subrogation|salvage and subrogation]] and [[Deductible Recovery|deductible recoveries]] are netted in the triangle or estimated separately, and apply the same treatment to every year.
- Keep counts alongside dollars. Paid, reported, closed and open **claim counts** ([[Claim Count Triangle]]) are what make the dollar triangles diagnosable.

> [!example]- Segmenting a Book Before Building Triangles {Example}
> A regional insurer writes personal auto: bodily injury liability, property damage liability, collision, and comprehensive. Total annual premium is $\$60{,}000{,}000$, split $35/15/35/15$. Physical damage claims close within months; BI claims run several years.
>
> How should the reserving data be organized?
>
> > [!answer]-
> > **Separate triangles for BI, PD, and physical damage (collision and comprehensive together or apart).** Combining them would average a multi-year liability pattern with an essentially immediate property pattern, producing development factors that fit neither.
> >
> > Working through the segmentation criteria:
> >
> > - **Homogeneity** — BI is [[Long Tail Lines|long-tail]], high severity, litigated; comprehensive is [[Short Tail Insurance|short-tail]], high frequency, low severity. Different patterns, so different triangles.
> > - **Credibility** — at $\$21{,}000{,}000$ of BI premium there is ample volume for its own triangle; splitting comprehensive further by peril would thin it out for little gain.
> > - **Practicality** — comprehensive is dominated by catastrophe-driven diagonals (hail), which argues for pulling [[Catastrophe Loss|catastrophe]] claims out and reserving them separately whatever the segmentation.
> >
> > All four segments stay on an **accident year** basis so that the results aggregate and reconcile to the financial statements.

> [!example]- Why the Calendar Year Is a Diagnostic, Not a Cohort {Example}
> A reported-loss triangle shows the following age-to-age factors. The most recent diagonal (valuation $12/31/2024$) is bolded.
>
> | AY | 12–24 | 24–36 | 36–48 |
> |---|---|---|---|
> | 2021 | 1.55 | 1.20 | **1.14** |
> | 2022 | 1.52 | **1.26** | |
> | 2023 | **1.61** | | |
>
> Historical averages excluding the latest diagonal are $1.53$, $1.20$ and $1.08$.
>
> What does the pattern indicate, and how should the actuary respond?
>
> > [!answer]-
> > Every factor on the $12/31/2024$ diagonal is **above** its historical average, at every maturity. That is a **calendar year effect**: something happened in $2024$ that raised reported losses across all accident years simultaneously — most commonly a strengthening of [[Case Adequacy|case reserve adequacy]], but a legal or [[Inflation|inflationary]] shock does the same thing.
> >
> > The wrong response is to average the elevated factors into the selections, which would apply a one-time level shift to every future year as if it were an ongoing pattern.
> >
> > The right response is to diagnose first: check average case outstanding by maturity and the [[Settlement Rate|closure rate]] for a corresponding shift, ask claims management what changed (Friedland Ch. 4), and if case adequacy has genuinely increased, restate the historical triangle with the [[Berquist-Sherman Method|Berquist-Sherman]] case-adequacy adjustment before selecting factors.
