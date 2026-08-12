**Age-to-Age Factor** (link ratio) is the ratio of a cohort's cumulative amount at one maturity to its amount at the previous maturity — the observed development between two ages.

> $$f_{n \to n+1}^{\text{AY}} = \frac{C_{\text{AY},\,n+1}}{C_{\text{AY},\,n}}$$

> $$f_{n \to n+1}^{\text{vol-wtd}} = \frac{\sum_{\text{AY}} C_{\text{AY},\,n+1}}{\sum_{\text{AY}} C_{\text{AY},\,n}}$$

**Selecting a factor** from the column of observations is the central judgment of the [[Chain Ladder Method|chain ladder]]. The candidates:

- **Volume-weighted (all-year)** — the ratio of column sums. Weights each year by its size, so it is stable and dominated by the large years. The default choice.
- **Simple average** — equal weight to each year, so a small, volatile year counts as much as a large one. Useful when volume differs for reasons unrelated to the pattern.
- **Latest $k$-year** average (volume-weighted or simple) — responsive to a genuine change in the pattern, at the cost of credibility.
- **Medial average** (drop high and low) — robust to a single distorted year.
- **Judgmental selection**, documented — the honest answer when the column contains a known one-off.

Further points:

- Factors need **not** exceed $1.000$. Salvage and subrogation recoveries, conservative initial case reserving, and claims closing below their reserves all produce downward development. Flooring factors at $1.000$ because "losses only go up" is a standard error.
- Look at the column **before** averaging it. A steady column supports a volume-weighted all-year selection; a column trending over time is a signal, not noise, and calls for the latest years or an investigation.
- A factor that moves along the **diagonal** rather than down the column is a calendar-year effect ([[Development Triangle]]) and should be addressed by restating the triangle, not by averaging it away.
- The same selection process runs on paid, reported, count and ALAE triangles, and the selections should be mutually consistent — a paid factor implying faster emergence than the reported factor at the same age needs an explanation.

![[Media/Figures/Age_to_Age_Factor.svg|340]]

> [!example]- Selecting Factors from a Column {Example}
> Cumulative reported losses ($000s):
>
> | AY | 12 mo | 24 mo | 36 mo |
> |---|---|---|---|
> | $2021$ | $500$ | $750$ | $875$ |
> | $2022$ | $550$ | $825$ | $950$ |
> | $2023$ | $600$ | $900$ | |
>
> Compute the individual and volume-weighted factors and select.
>
> > [!answer]-
> > **$12$–$24$:**
> >
> > $$\frac{750}{500} = 1.500 \qquad \frac{825}{550} = 1.500 \qquad \frac{900}{600} = 1.500$$
> >
> > $$f^{\text{vol-wtd}} = \frac{750 + 825 + 900}{500 + 550 + 600} = \frac{2{,}475}{1{,}650} = 1.500$$
> >
> > **$24$–$36$:**
> >
> > $$\frac{875}{750} = 1.167 \qquad \frac{950}{825} = 1.152$$
> >
> > $$f^{\text{vol-wtd}} = \frac{875 + 950}{750 + 825} = \frac{1{,}825}{1{,}575} = 1.159$$
> >
> > Selections: $1.500$ and $1.159$. With only two observations at $24$–$36$ and a $1.5\%$ spread between them, the volume-weighted average is a reasonable pick — but the column is thin, and a benchmark from a wider data source is worth comparing against before it is trusted.

> [!example]- When the Averages Disagree {Example}
> The $12$–$24$ column of a liability triangle:
>
> | AY | Factor | Losses at 12 mo ($000s$) |
> |---|---|---|
> | $2018$ | $1.42$ | $4{,}100$ |
> | $2019$ | $1.45$ | $4{,}300$ |
> | $2020$ | $1.38$ | $900$ |
> | $2021$ | $1.61$ | $4{,}800$ |
> | $2022$ | $1.63$ | $5{,}200$ |
> | $2023$ | $1.66$ | $5{,}600$ |
>
> ($2020$ was a partial year of writings after a mid-year book transfer.) What should be selected?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Simple all-year} &= 1.525 \\
> > \text{Volume-weighted all-year} &= 1.545 \\
> > \text{Latest 3-year simple} &= 1.633 \\
> > \text{Medial (drop high/low)} &= 1.528
> > \end{align*}$$
> >
> > The averages span eleven points, and choosing between them by formula misses the point. **The column has a trend**: $1.42$, $1.45$, $1.38$, then $1.61$, $1.63$, $1.66$. Something changed around $2021$ — development is genuinely slower to emerge, or case reserving weakened, or the mix shifted toward longer-reporting claims.
> >
> > Any all-year average blends two regimes and lands between them, describing neither. The defensible selection is from the **latest three years** ($\approx 1.63$), *provided* the actuary can identify what changed and satisfy themselves it will persist. If it cannot be explained, the factor selection is not the real problem — the unexplained change is, and it needs the operational enquiry Friedland's Chapter 4 describes.
> >
> > The $2020$ year deserves separate handling in any case: at $900$ against a normal $4{,}000$+, it is a partial year whose factor carries little information, which is precisely the case for a medial or volume-weighted approach rather than a simple average.
