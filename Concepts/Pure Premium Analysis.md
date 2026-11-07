---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:e8983d002a4c01844f778a37eb2c423f46f865fa1099a85bd0434b17d82d1da0
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.7 p.139 and Ch.8 pp.145-149 (PDF pp.151, 157-161), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.9 pp.161, 165-166 (PDF pp.173, 177-178), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, v3 2010), Ch. 15 Evaluation of Techniques (PDF p.352), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Pure Premium Analysis.md
---

![[Media/Figures/Pure_Premium_Analysis.svg|340]]

A **Pure Premium Analysis** compares the [[Pure Premium|pure premiums]] of the levels of a [[Rating Variable|rating variable]], or of the accident years of a book, to measure how the cost of losses per exposure differs between them. In the univariate pure premium approach to [[Classification Ratemaking|classification ratemaking]], the pure premium of level $i$ is

> $$\text{Pure Premium}_i = \frac{\text{Losses}_i + \text{LAE}_i}{\text{Earned Exposures}_i}$$

> $$\text{Indicated Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$

- $\text{Losses}_i$ and $\text{LAE}_i$ are the level's projected ultimate losses and LAE, usually loss and ALAE only, since ULAE cannot be allocated by class.
- $\text{Pure Premium}_{\text{base}}$ is the pure premium of the base level, whose relativity is $1.000$.

The relativity rests on the assumption that every level has the same expense and profit provisions. Over several years, the experience pure premium is the sum of the years' projected ultimate losses divided by the sum of their earned exposures. Extraordinary and catastrophe losses, which can fall on one level, are usually replaced by an average expected figure. Companies often first divide each pure premium by the all-levels pure premium and then rebase, dividing each relativity by the base level's, so that current, indicated and competitors' relativities can be compared on the same basis.

> [!example]- A homeowners book has three territories. Territory 2 is the base. What are the indicated territory relativities? {Example}
> The territories' experience is:
>
> | Territory | Exposures | Loss and ALAE |
> | --- | --- | --- |
> | 1 | 294 | $\$15{,}234.96$ |
> | 2 | 385 | $\$26{,}509.75$ |
> | 3 | 309 | $\$23{,}255.29$ |
> | Total | 988 | $\$65{,}000.00$ |
>
> - The pure premiums are $15{,}234.96/294 = \$51.82$, $26{,}509.75/385 = \$68.86$ and $23{,}255.29/309 = \$75.26$.
> - The all-territories pure premium is $65{,}000/988 = \$65.79$, so the relativities to the total are $0.7877$, $1.0467$ and $1.1439$.
> - Dividing each by Territory 2's $1.0467$ gives the indicated relativities $0.7526$, $1.0000$ and $1.0929$.

## Distributional bias

The pure premium of each level is based on that level's experience alone. The univariate approach assumes the exposures of each level are distributed in the same way across every other rating variable. When they are not, the losses of a correlated variable are counted in the level being analyzed. That effect is counted a second time when the other variable is rated too. This is distributional bias, a double counting of the correlated variable's effect. The assumption is tested by comparing the distribution of exposures across the other rating variables within each level.

> [!example]- Territory 1 above has 179 of its 294 homes at a high amount of insurance, and Territory 3 has 40 of 309. The true territory relativities are $0.6312$, $1.0000$ and $1.2365$. Why do the indications of $0.7526$, $1.0000$ and $1.0929$ miss them? {Example}
> - High-value homes have higher losses, and Territory 1 has a disproportionate share of them, so its pure premium includes their higher losses.
> - Territory 1's indicated relativity is therefore above its true relativity, $0.7526$ against $0.6312$.
> - Territory 3 has a disproportionate share of low-value homes, so its indicated relativity is below its true relativity, $1.0929$ against $1.2365$.
> - The amount of insurance relativities charge for home value again, so the univariate indications count it twice.

## Adjusted pure premium approach

When premium at current rate level is not available for a [[Loss Ratio Method|loss ratio approach]], the distortion can be reduced by adjusting the exposures. Each level's exposures are multiplied by the exposure-weighted average current relativity of the other rating variables, so

> $$\text{Adjusted Exposures}_i = \text{Earned Exposures}_i \times \bar{R}_i$$

> $$\text{Adjusted Pure Premium}_i = \frac{\text{Losses}_i + \text{LAE}_i}{\text{Adjusted Exposures}_i}$$

- $\bar{R}_i$ is the exposure-weighted average relativity of the other rating variables for the exposures in level $i$.

The indicated relativity is then each level's adjusted pure premium divided by the base level's. With many rating variables, the actuary may adjust only for those suspected of a distributional bias.

> [!example]- The exposure-weighted average amount of insurance relativities of Territories 1, 2 and 3 are $1.2083$, $1.0497$ and $0.9528$. What are the adjusted indicated relativities? {Example}
> - The adjusted exposures are $294 \times 1.2083 = 355.24$, $385 \times 1.0497 = 404.13$ and $309 \times 0.9528 = 294.42$.
> - The adjusted pure premiums are $15{,}234.96/355.24 = \$42.89$, $26{,}509.75/404.13 = \$65.60$ and $23{,}255.29/294.42 = \$78.99$.
> - Dividing by Territory 2's $\$65.60$ gives the indicated relativities $0.6538$, $1.0000$ and $1.2040$, much closer to the true $0.6312$, $1.0000$ and $1.2365$.

## Pure premiums compared with loss ratios

A pure premium divides by exposures, and a loss ratio divides by premium at current rate level. So the [[Pure Premium Method|pure premium approach]] needs clearly defined exposures but no premium, and it is unaffected by past rate changes. It is preferable when premium at current rate level is unavailable or hard to calculate accurately, for example after many changes to a rating algorithm with many variables or when a new rating variable means the historical premium cannot be restated at current rate level. It must be used for a new line of business with no current rates. The loss ratio approach is preferable when exposures are not available or are not clearly defined, as for commercial general liability. For the same reasons, a [[Generalized Linear Model|GLM]] is usually fitted to pure premiums, or to [[Frequency|frequency]] and [[Severity|severity]] separately, since a loss ratio model is tied to the current rates and becomes obsolete when rates and rating structures change.

A pure premium reflects frequency and severity together, so pricing decisions rest on it rather than on severity alone.

> [!example]- A personal auto insurer changed its rating algorithm's many variables several times during the experience period and now wants territory relativities. Which approach should it use? {Example}
> - The loss ratio approach needs each territory's premium at current rate level.
> - After many changes to many variables, recalculating premium at current rate level by territory is difficult to do accurately.
> - The pure premium approach needs only each territory's losses and exposures, and car-years are clearly defined.
> - The insurer should use the pure premium approach, adjusting the exposures for any rating variable with a distributional bias across territories.

## Pure premiums in reserving

A reserving actuary divides each accident year's selected ultimate claims by its earned exposures as a [[Reserve Adequacy#Reasonableness tests of the selected ultimate claims|reasonableness test]] of the selection. A pure premium that moves from year to year in a way trend cannot explain points to the estimate rather than the business.
