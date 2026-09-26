---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a6814a1bd5ccd4b5cea0c47f9c420ca3e98cbba579fabb262230a7040d3aba8a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rating Factors.md
---

**Rating Factors** are the multipliers (occasionally additive amounts) that a [[Rating Algorithm|rating algorithm]] applies for each level of a [[Rating Variable|rating variable]]. Each is expressed relative to a base level whose factor is $1.00$, and together they turn a base rate into a risk's rate.

> $$\text{Rate}_i = \text{Base Rate} \times \prod_{k} f_k(v_{ik})$$

> $$f_k(v) = e^{\hat\beta_{k,v}}$$

- $v_{ik}$ is risk $i$'s level of variable $k$. In a log-link [[Generalized Linear Model|GLM]] a level's factor is its exponentiated coefficient, and the base rate corresponds to $e^{\hat\beta_0}$ (adjusted for any offsets). Goldburd et al. advise making the base level the one with the most data, so the other levels' standard errors measure distance from a well-estimated reference.
- **Variable, factor, relativity.** The variable is the characteristic (territory). The factor is the number charged for one of its levels. A one-way (univariate) relativity absorbs the effects of every correlated variable, whereas a multivariate factor is net of the others — see [[Classification Ratemaking]].
- **Stripping out rating factors.** Some variables fit a GLM poorly; territory is the standard case, with too many levels for a GLM (Goldburd et al., §9.2). The fix is to use the model of everything else to remove the other variables' effects before analysing that one. Fit the class GLM without territory, then measure each territory's actual losses against the GLM's prediction, or use that prediction as an [[Offset Variable|offset]] in a separate territory model. Smooth the result spatially and weight it by credibility. Then feed the territory relativities back into the class GLM as an offset, so the class factors cannot proxy for location. The monograph calls this a two-way street to be iterated ([[Territorial Rating]]).
- **Coverage options.** Deductible, limit and peril-group factors should be set outside the GLM by loss-elimination and [[Increased Limits|ILF]] methods and entered as offsets. A factor fitted in the GLM for an option the insured chose picks up selection effects: a higher deductible can even come out as a surcharge.
- In the filed plan, factors are rounded and capped, and the base rate is off-balanced so the change hits the target overall rate level — see [[Rating Plan]].

> [!example]- From GLM Coefficients to Rating Factors {Example}
> A log-link pure premium GLM gives intercept $5.70$, youthful driver $+0.47$ and territory 3 $+0.18$. The base levels are adult driver and territory 1. Find the factors and the pure premium for a youthful driver in territory 3.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Base} &= e^{5.70} \\
> > &= \$298.87 \\[4pt]
> > f_{\text{youthful}} &= e^{0.47} \\
> > &= 1.600 \\[4pt]
> > f_{\text{terr 3}} &= e^{0.18} \\
> > &= 1.197 \\[6pt]
> > \widehat{PP} &= e^{5.70 + 0.47 + 0.18} \\
> > &= e^{6.35} \\
> > &= \$572.49
> > \end{align*}
> > $$
> >
> > Coefficients add on the log scale, and factors multiply on the dollar scale. Rounding the factors to three decimals before multiplying gives $\$572.40$ instead. That is why the filed algorithm has to specify the rounding.

> [!example]- Stripping Territory Out with the GLM {Example}
> Territory T has $3{,}000$ exposures and $\$1{,}320{,}000$ of losses, and the statewide pure premium is $\$300$. A class GLM built *without* territory, balanced statewide, predicts $\$1{,}100{,}000$ for T's policies. T's neighbours show an actual-to-predicted ratio of $1.10$, and T's own ratio is given credibility $0.60$. Estimate T's territory relativity.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{One-way relativity} &= \frac{1{,}320{,}000 / 3{,}000}{300} \\
> > &= 1.467 \\[4pt]
> > \text{Mix of other factors} &= \frac{1{,}100{,}000 / 3{,}000}{300} \\
> > &= 1.222 \\[4pt]
> > \text{Stripped residual} &= \frac{1{,}320{,}000}{1{,}100{,}000} \\
> > &= 1.200 \\[4pt]
> > \text{Smoothed relativity} &= 0.60(1.200) + 0.40(1.10) \\
> > &= 1.160
> > \end{align*}
> > $$
> >
> > The one-way $1.467$ splits into $1.222 \times 1.200$. Most of T's high loss cost comes from *who* lives there (the class factors already charge for that), and only $1.20$ from *where*. Using $1.467$ as the territory factor would charge those class effects twice. The selected $1.16$ then goes back into the class GLM as an offset.
