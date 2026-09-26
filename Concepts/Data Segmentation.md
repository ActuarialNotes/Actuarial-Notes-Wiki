---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ccbc28890c94fb800ab39f54ed83309f8c1075de0b6fdacd847c00472e9992bd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Segmentation.md
---

**Data Segmentation** is the division of ratemaking (or reserving) data into groups — by line, coverage, jurisdiction, class, territory, claim type or limit — fine enough that each group's risks share similar expected costs and emergence patterns ([[Homogeneity|homogeneity]]), yet large and stable enough that each group's own experience can be relied on ([[Credibility|credibility]]).

> $$\widehat{\text{PP}}_g = Z_g\,\text{PP}_g + (1 - Z_g)\,\text{PP}_{\text{combined}}$$

> $$Z_g = \min\left(1,\ \sqrt{n_g / n_{\text{full}}}\right)$$

- $\text{PP}_g$ is group $g$'s observed [[Pure Premium|pure premium]], $n_g$ its claim count, $n_{\text{full}}$ the [[Full Credibility Standard|full credibility standard]] (e.g. $1{,}082$ claims). The trade-off is in the formula: every further split makes the groups more alike but shrinks $n_g$, so more of each group's estimate is handed to the [[Complement of Credibility|complement]].
- **Werner's statistical criteria for a grouping:** the differences between groups should be statistically significant and stable from year to year; risks should be homogeneous within groups and heterogeneous between them; and each group should be large enough, or stable enough, to be credible. Where a level is too thin, combine similar levels or find more data. Whether a grouping can become a [[Rating Variable|rating variable]] also depends on operational (objective, inexpensive, verifiable), social and legal criteria — see [[Classification Ratemaking]].
- **Ratemaking practice:** develop and trend losses on homogeneous bodies of claims — property and liability separately, coverages within a line where they behave differently, jurisdictions where laws or volume warrant. The overall indication is normally produced for each jurisdiction and line whose rates are filed separately.
- **Reserving practice (Friedland):** group claims that share coverage (the same laws, policy terms and claims handling), with enough claim counts, and similar reporting patterns, ability to set case reserves, settlement patterns, reopening likelihood and severity; policy limits are another useful cut. Do not combine segments whose relative volume is changing — see [[Mix of Business]] and [[Reserving Data Organization]].
- **Practical limits:** a segment needs a field the systems actually capture; separate analyses cost time; and a small, stable component may not justify its own study. Friedland quotes Longley-Cook's image of a crumbly cake that can be sliced only one way at a time — slice it several ways at once and only crumbs are left. Multivariate models such as a [[Generalized Linear Model|GLM]] are the ratemaking answer: they use all the data to estimate each variable's effect.

> [!example]- Is a Sprinkler Split Worth Making? {Example}
> A commercial property class, three years' experience:
>
> | Group | Exposures | Claims | Losses |
> |---|---|---|---|
> | Sprinklered | $30{,}000$ | $900$ | $\$4{,}500{,}000$ |
> | Non-sprinklered | $10{,}000$ | $400$ | $\$3{,}600{,}000$ |
>
> Using $n_{\text{full}} = 1{,}082$ claims and the combined pure premium as the complement, estimate each group's pure premium.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PP}_{S} &= \$4{,}500{,}000 / 30{,}000 = \$150.00 \\
> > \text{PP}_{N} &= \$3{,}600{,}000 / 10{,}000 = \$360.00 \\
> > \text{PP}_{\text{comb}} &= \$8{,}100{,}000 / 40{,}000 = \$202.50
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > Z_S &= \sqrt{900 / 1{,}082} = 0.912 \\
> > Z_N &= \sqrt{400 / 1{,}082} = 0.608 \\
> > \widehat{\text{PP}}_S &= 0.912(\$150) + 0.088(\$202.50) \\
> > &= \$154.62 \\
> > \widehat{\text{PP}}_N &= 0.608(\$360) + 0.392(\$202.50) \\
> > &= \$298.26
> > \end{align*}
> > $$
> >
> > The split is worth making: even after credibility the non-sprinklered risks cost $298.26 / 154.62 = 1.93$ times the sprinklered ones, and a single class rate would overcharge the sprinklered risks by about a third. Because each group was pulled toward the combined figure, the exposure-weighted average of the two estimates ($\$190.53$) no longer equals $\$202.50$; the relativities are rebalanced to the overall level before use.

> [!example]- Slicing the Cake Too Many Ways {Example}
> A homeowners experience period contains $9{,}600$ claims. An analyst proposes pure premiums for every cell of $20$ territories $\times$ $8$ protection classes $\times$ $4$ construction types. With $n_{\text{full}} = 1{,}082$, evaluate this against one-way segmentation.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Cross-classified: } 9{,}600 / 640 &= 15 \text{ claims per cell} \\
> > Z &= \sqrt{15 / 1{,}082} = 0.118 \\
> > \text{Territory alone: } 9{,}600 / 20 &= 480 \text{ claims} \\
> > Z &= \sqrt{480 / 1{,}082} = 0.666 \\
> > \text{Protection class alone: } 9{,}600 / 8 &= 1{,}200 \text{ claims} \\
> > Z &= 1.000
> > \end{align*}
> > $$
> >
> > With $12\%$ credibility per cell, the $640$-cell table is almost entirely complement — it looks detailed and says very little. Each variable on its own is credible, but one-way analyses of correlated variables double-count. The standard resolution is a multivariate model, which estimates each variable's effect from all $9{,}600$ claims at once instead of from one cell's $15$.
