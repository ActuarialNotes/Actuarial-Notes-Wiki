**Catastrophe Loss** is loss arising from a single event, or a series of related events, that produces many claims at once — hurricane, earthquake, wildfire, hail, winter storm, terrorism. The defining feature for ratemaking is not the size of any one claim but the **correlation** across the book: the independence assumption that makes ordinary experience credible fails completely.

> $$\text{Total Pure Premium} = \text{Non-Cat PP} + \text{Cat Load}$$

> $$\text{Cat Load} = \frac{\text{Expected Annual Catastrophe Loss}}{\text{Exposures}}$$

- Catastrophe losses are **removed** from the experience period and replaced with a long-run expected load. A five-year experience period either contains the hurricane or does not, and neither answer is the expected cost.
- Two ways to build the load:
  - **Long-run historical**, for perils with enough history relative to their return period — hail, wind, winter storm. Werner's approach: express historical catastrophe losses as a ratio to a stable base (non-catastrophe losses, or amount of insurance years) over $20$–$30$ years, and apply that ratio to the current book.
  - **Modelled**, for perils whose return periods exceed any usable history — hurricane, earthquake. A catastrophe model simulates an event set against the insurer's actual exposure to produce an **average annual loss** (AAL) and the full loss distribution.
- The **exposure base must be current**. Historical hurricane losses reflect the book as it was; the load must reflect where the insurer writes today, which is what a model does naturally and a historical ratio does only if the base is adjusted.
- Modelled output also drives capital and reinsurance decisions through the **exceedance probability curve** — the $1$-in-$100$ and $1$-in-$250$ PMLs — so the same model serves pricing, [[Reinsurance|reinsurance]] purchasing and solvency work.
- **Consistency of definition** across years is essential. If a $\$40$M hail event is treated as a catastrophe in one year and left in the base experience in another, both the non-catastrophe trend and the load are corrupted.
- In **reserving**, catastrophe claims are triangulated separately: they report fast and settle in a distinctive pattern (rapid initial payment, then a long tail of disputed and litigated claims), quite unlike ordinary property claims.

> [!example]- Building a Homeowners Catastrophe Load {Example}
> Five years of experience: $\$50{,}000{,}000$ of losses on $10{,}000$ house-years a year, of which $\$8{,}000{,}000$ came from a single hurricane. The insurer's catastrophe model gives an average annual hurricane loss of $\$600{,}000$ for the current book.
>
> Compute the pure premium.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Non-cat losses} &= \$50{,}000{,}000 - \$8{,}000{,}000 \\
> > &= \$42{,}000{,}000 \\[4pt]
> > \text{Non-cat PP} &= \frac{\$42{,}000{,}000}{5 \times 10{,}000} \\
> > &= \$840 \\[6pt]
> > \text{Cat load} &= \frac{\$600{,}000}{10{,}000} = \$60 \\[4pt]
> > \text{Total PP} &= \$840 + \$60 = \$900
> > \end{align*}$$
> >
> > Compare with leaving the hurricane in: $\$50{,}000{,}000 / 50{,}000 = \$1{,}000$ per house-year — an $11\%$ overstatement, because the experience period happened to contain one hurricane where the modelled expectation is $\$600{,}000$ a year, or $\$3{,}000{,}000$ over five years.
> >
> > Had the five years contained no hurricane, the same procedure would have produced $\$900$ again, while the unadjusted calculation would have said $\$840$. Stability across experience periods is the point of the exercise.

> [!example]- Why Historical Averages Fail for Hurricane {Example}
> A coastal insurer's ten-year catastrophe loss history: $\$0$, $\$1$M, $\$0$, $\$4$M, $\$0$, $\$0$, $\$38$M, $\$2$M, $\$0$, $\$1$M, on $\$50{,}000{,}000$ of annual premium.
>
> Evaluate the ten-year average as a catastrophe load.
>
> > [!answer]-
> > $$\text{Ten-year average} = \frac{\$46{,}000{,}000}{10} = \$4{,}600{,}000 \text{ per year} \;(9.2\% \text{ of premium})$$
> >
> > The number is arithmetically fine and actuarially useless:
> >
> > - **The median year is zero.** Six of ten years had no catastrophe at all. The mean is driven entirely by one event.
> > - **Drop the $\$38$M year** and the average falls to $\$0.9$M — a $1.8\%$ load. Add a second such event and it doubles. An estimator that swings by a factor of five on one observation has no credibility.
> > - **The return period exceeds the data.** If a $\$38$M event is a $1$-in-$25$-year loss for this book, ten years of history cannot estimate its frequency; observing one says almost nothing about whether the true rate is $1$-in-$10$ or $1$-in-$50$.
> >
> > A modelled AAL solves all three: it simulates thousands of years of events against the current exposure, so the estimate does not depend on which storms happened to occur in the last decade, and it prices the *current* concentration rather than the historical one.
