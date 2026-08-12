**Short Tail Insurance** covers lines whose claims are reported and settled quickly — typically within a year — so that reported losses are close to ultimate almost immediately and [[IBNR]] is small relative to case reserves.

> $$\text{CDF}_{12 \to \text{ult}} \approx 1.0 \text{ for short-tail lines}$$

- Typical short-tail lines: auto physical damage (collision, comprehensive), homeowners property, inland marine, boiler and machinery, most first-party property covers.
- Losses are **observable**: a damaged car or a burnt building is inspected, appraised and paid. There is no latent injury, little litigation, and the loss amount is not a function of a jury's opinion years later.
- Consequently development is compact, [[Tail Factor|tail factors]] are near $1.000$, and the [[Chain Ladder Method|chain ladder]] on **paid** data is reliable at maturities where a long-tail line would still be guessing.
- Fast emergence means fast feedback on rate adequacy: shorter experience periods are acceptable, trend is measurable with less lag, and rate changes show up in results within a year — one reason personal lines can be re-priced annually.
- The dominant risk is **not** development but concentration: a single hail storm or hurricane can produce more loss in a day than a normal year, so [[Catastrophe Loss|catastrophe]] losses are excluded from the experience and loaded separately. A short-tail line can therefore have low reserve risk and very high underwriting risk at the same time.
- Short-tail reserves are also sensitive to seasonality: the December diagonal of a property triangle behaves differently from the June one, which is why quarterly rather than annual cohorts are common.

> [!example]- Short-Tail vs. Long-Tail Development Side by Side {Example}
> An auto comprehensive claim arises from hail damage on $3/5/2024$. A workers compensation occupational-disease claim also arises from $2024$ exposure.
>
> Trace each claim's life and the implication for reserving.
>
> > [!answer]-
> > **Comprehensive claim** — reported within days, vehicle appraised within a week, paid within a month. At $12/31/2024$ it is closed and its cost is a fact. The AY 2024 comprehensive triangle needs a $12$-to-ultimate factor of perhaps $1.02$, and virtually all of that is a handful of claims still in appraisal.
> >
> > **Occupational disease claim** — the exposure occurred in $2024$, but the disease may not manifest until $2029$ and may not be filed until $2031$; medical and indemnity payments then run for the claimant's lifetime. At $12/31/2024$ the claim is invisible, sitting entirely in pure IBNR, and the AY 2024 workers compensation CDF at $12$ months may exceed $2.0$.
> >
> > Same accident year, same insurer, same valuation date — and one estimate is essentially known while the other is dominated by assumptions about the next thirty years. This is why they are never combined in one triangle ([[Homogeneity]]).

> [!example]- Where the Uncertainty Actually Lives {Example}
> A homeowners book has $\$50{,}000{,}000$ of earned premium. Non-catastrophe losses have averaged a $58\%$ loss ratio with little year-to-year variation. Catastrophe losses over the last ten years were: $\$0$, $\$1$M, $\$0$, $\$4$M, $\$0$, $\$0$, $\$38$M, $\$2$M, $\$0$, $\$1$M.
>
> How should the rate indication treat the two components?
>
> > [!answer]-
> > The non-catastrophe portion is short-tail and stable — develop and trend it in the ordinary way.
> >
> > For catastrophes, the ten-year *average* is
> >
> > $$\frac{\$46{,}000{,}000}{10} = \$4{,}600{,}000 \text{ per year}$$
> >
> > or a $9.2\%$ catastrophe loss ratio — but the median year is $\$0$ and one year is $\$38$M. Neither the mean nor the median of ten observations is a credible estimate of a hurricane load.
> >
> > The correct treatment is to **exclude** catastrophe losses from the experience period entirely and load a modelled average annual loss (see [[Catastrophe Loss]]), so that the indication does not swing by $\pm 8$ points depending on whether the experience period happens to contain the storm.
> >
> > The line is short-tail in *development* and highly volatile in *result* — the two are independent properties, and conflating them is a common error.
