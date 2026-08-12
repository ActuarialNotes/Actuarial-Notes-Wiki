**External Information in Reserving** is the use of data originating outside the entity being analyzed — industry development patterns, published loss trends, competitor filings, economic and legal indicators — to supplement or replace an insurer's own experience when that experience is thin, distorted, or newly written. It is the reserving counterpart of the [[Complement of Credibility|complement of credibility]] in ratemaking.

- **When external data is needed:** a new line or new company with no history; a small or newly segmented book whose triangle is too volatile to be [[Credibility|credible]]; the immature end of a long-tail triangle where a [[Tail Factor]] must be chosen; and as an independent reasonableness check on a selection driven entirely by internal data.
- **Common sources:** industry aggregations (ISO, NCCI, statistical agents, Schedule P compilations for U.S. insurers; GISA and OSFI returns in Canada), rating-bureau loss development patterns, published loss-trend indices, reinsurer experience on the same treaty, and the CAS examiner's-report style benchmarks used for market comparison.
- **Never use external data unadjusted.** It must be reconciled to the subject book on the dimensions that actually drive development: coverage and [[Line of Business|line of business]] definitions, policy limits and attachment points, [[Mix of Business|mix of business]], jurisdiction and legal environment, [[Case Adequacy|case-reserve adequacy]] philosophy, and [[Settlement Rate|settlement speed]]. Two books with the same nominal line code can have very different development if one is written at higher limits.
- **Blending, not switching.** The usual application is a credibility-weighted selection: $\hat{U} = Z \cdot U_{\text{internal}} + (1-Z) \cdot U_{\text{external}}$, with $Z$ reflecting the volume and stability of the internal data. The [[Bornhuetter-Ferguson Method]] and [[Expected Loss Method]] are the natural vehicles, since both need an a priori expected loss ratio that external data can supply.
- **External information also flags problems.** A development pattern far outside the industry range, or a loss ratio that diverges persistently from peers writing the same business, is a signal to re-examine internal assumptions — a diagnostic use that does not require adopting the external numbers at all.
- **Documentation matters.** ASOP 43 requires the actuary to disclose reliance on data supplied by others and the reasonableness review performed; a benchmark adopted without a stated rationale for its applicability is a documentation gap as much as a technical one (see [[Reserve Communication]]).

![[Media/Figures/External_Information_in_Reserving.svg|340]]

> [!example]- Benchmarking a Tail Factor {Example}
> An insurer's commercial auto liability triangle runs only $60$ months. Internal $48\text{–}60$ age-to-age factors are $1.021$, $1.018$, and $1.024$. Industry patterns for commercial auto liability show a $60$-months-to-ultimate tail of $1.045$, but the industry data is written at a $\$1$M limit while the insurer writes at $\$500$K.
>
> How should the tail be selected?
>
> > [!answer]-
> > The internal data supports continued development past $60$ months — factors are still comfortably above $1.000$ — but the triangle cannot measure how much remains. The industry tail of $1.045$ is the only direct evidence of the unobserved layer, so it is the right starting point.
> >
> > It must then be adjusted **downward** for the limit difference. Development beyond $60$ months in liability is dominated by large, slow-settling claims; a book capped at $\$500$K truncates exactly those claims, so it develops less in the tail than a $\$1$M book. A selection somewhere between $1.025$ and $1.040$ is defensible depending on the severity distribution, with the reasoning documented.
> >
> > Selecting the raw $1.045$ would over-state [[IBNR]]; selecting $1.000$ because "the triangle ends at $60$ months" would understate it materially. Neither internal nor external data alone answers the question.

> [!example]- A Priori Loss Ratio for a New Line {Example}
> An insurer enters a new state for homeowners in 2024. At $12$ months, AY 2024 reported losses are $\$1{,}150{,}000$ on earned premium of $\$8{,}000{,}000$. There is no internal history. Industry experience for this state and line shows an ultimate loss ratio of $62\%$; the insurer's rates were filed about $4\%$ below the industry average.
>
> Estimate ultimate losses.
>
> > [!answer]-
> > With no internal history the [[Chain Ladder Method]] is unusable — there are no development factors to select. Use the [[Bornhuetter-Ferguson Method]] with an externally derived a priori.
> >
> > Adjust the industry loss ratio for the rate differential (lower rates → higher loss ratio):
> >
> > $$\text{A priori LR} = \frac{0.62}{1 - 0.04} = 0.646$$
> >
> > $$\text{Expected ultimate} = \$8{,}000{,}000 \times 0.646 = \$5{,}168{,}000$$
> >
> > With an industry-benchmark $12$-month CDF of, say, $1.25$ for homeowners, the percentage unreported is $1 - 1/1.25 = 0.20$:
> >
> > $$\text{Ultimate}_{\text{BF}} = \$1{,}150{,}000 + 0.20 \times \$5{,}168{,}000 = \$2{,}183{,}600$$
> >
> > Every input here is external. The estimate should be presented with that reliance disclosed, and revisited as soon as the insurer's own experience becomes credible.
