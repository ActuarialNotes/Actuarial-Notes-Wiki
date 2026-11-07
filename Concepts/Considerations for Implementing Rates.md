---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:727bce4def2d5f55b08e15335e0fefefe9add8616cdeba288b43ffa1247d3e7e
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 13 pp. 247-248 (PDF pp. 259-260); Ch. 14 pp. 263-264, 272-274, 283 (PDF pp. 275-276, 284-286, 295), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Considerations for Implementing Rates.md
---

![[Media/Figures/Considerations_for_Implementing_Rates.svg|340]]

**Considerations for Implementing Rates** are the decisions that turn an [[Overall Rate Level Indication|indication]] into rates in force: how much to file, how to distribute it, what mechanism to use, and what to do when the full indication cannot be taken. The overall change is implemented through the [[Rating Algorithm|rating algorithm]], normally as a base rate adjustment, and must be **off-balanced** against any simultaneous change in relativities so the two together deliver the intended effect. If no fixed expense fee or other additive premium applies, the proposed base rate is

> $$\text{Base Rate}_{\text{new}} = \text{Base Rate}_{\text{current}} \times \frac{1 + \text{overall change}}{1 + \text{change in average rate differential}}$$

- $\text{overall change}$ is the selected change in average premium.
- $\text{change in average rate differential}$ is the change in premium that the new relativities alone produce on the current distribution of exposures.

$1/(1 + \text{change in average rate differential})$ is the off-balance factor, the amount the base rate is adjusted to balance the changes in the rate differentials.

> [!example]- The overall indication is +6.0%. New class relativities, applied to the current distribution of exposures, would alone raise premium 3.5%. The current base rate is $\$480$. What is the new base rate? {Example}
> - The base rate change is $1.060/1.035 = 1.0242$.
> - The new base rate is $480 \times 1.060/1.035 = \$491.59$.
> - Applying +6.0% to the base rate as well as the new relativities would deliver $1.06 \times 1.035 = 1.097$, an increase of 9.7%.

One further check belongs here: the off-balance is computed on the **current** in-force distribution, which assumes the rate change will not alter the portfolio. If insureds receiving large increases non-renew, the realized average premium change may differ from the target. If the risks that leave are not equally profitable, the shift affects the adequacy of the overall rates.

## Capping the change for one rating variable

Capping limits how much premium can move. A cap on the change for any level of a rating variable is made up by adjusting the base rate and the other relativities. The capped relativity is set so that its relativity change, times the off-balance factor and the overall change, gives the capped total change.

> [!example]- The target overall change is +15.0%. New relativities for one variable give an off-balance factor of 0.9749. Level 1's relativity moves from 0.8000 to 0.9000, a total change of 26.13%, and management caps any level at +20%. What is Level 1's capped relativity? {Example}
> - The capped relativity $X$ satisfies $(X/0.8000) \times 0.9749 \times 1.15 = 1.20$.
> - Solving gives $X = 0.8563$.
> - The capped premium for Level 1 falls $\$8{,}459$ short, which is made up by raising the base rate $8{,}459/975{,}889 = 0.87\%$ on the other levels' $\$975{,}889$ of premium.
> - Since the base rate change also reaches Level 1, its capped relativity is reduced by a further 0.87%, so that its total change stays at 20%.

## Premium transition rules

A **premium transition rule** caps any one renewal's change. At a 15% cap, an insured due +20% gets +15% now and $1.20/1.15 - 1 = 4.3\%$ at the next renewal. The base rate must reflect the transition, and the actuary decides whether the target average premium is reached over the whole period or by its end. Long transitions risk overlapping the next rate change. A company may limit any one insured's premium change to reduce the chance that the insured shops for a better deal, and in some jurisdictions a regulation or law limits the increase an insurer may offer a renewing insured.

> [!example]- The indication is +20%, and the insurer phases it over two annual filings, taking +10% now. What second-year change reaches the same level, and what does the delay cost on $\$40{,}000{,}000$ of earned premium? {Example}
> - The second-year change is $1.20/1.10 - 1 = +9.1\%$.
> - The cost of phasing is a full year written at an inadequate rate.
> - The book is $9.1\%$ short for that year, which is $40{,}000{,}000 \times 0.0909 = \$3.64$ million.

## Approximated average rate differential

Where the detailed data for extension of exposures are not available, the proposed base rate is the proposed average premium, less the average fixed fee, divided by the weighted average proposed rate differential across all rating variables. For a purely multiplicative rating algorithm, that average differential is approximated as the product of each rating variable's exposure-weighted average differential. An additive discount enters as one minus its exposure-weighted average discount. Weighting each variable's differentials independently ignores the dependence of one variable's exposure distribution on the levels of another, the distributional bias between variables.

## Non-pricing solutions

Rate adequacy is not only achieved through rate. Where a full increase is unavailable, the same gap can be closed by [[Non-Pricing Solutions|non-pricing solutions]]:

- reducing **expenses**, fixed or variable;
- tightening **underwriting** criteria or non-renewing policies whose premium is grossly inadequate;
- changing **coverage**, for example by raising deductibles or adding exclusions;
- better **loss control**, for example medical management and return-to-work programs in workers compensation.

## Competitive comparisons and communication

Companies study their competitive position by comparing their premium with competitors' premium on the same risks: for a set of sample risks (a market basket), for all quoted risks (new business), or for all existing insureds (renewal competitiveness). They look at two levels, how competitive their rates are on average for all risks combined, and how competitive they are for individual risks or groups of risks.

Regulatory filing and approval, systems changes when the structure of the rating algorithm changes, and communication of the expected effect to management, regulators and the sales and customer-service functions all stand between the analysis and the effective date. The [[Loss Trend|trend period]] runs forward to the policies written from that date. A [[Minimum Premium|minimum premium]] and expense fees interact with the base rate, so a percentage change to the base does not flow through evenly to policies sitting at the minimum.

> [!trap] Applying the overall change to the base rate and the relativities
> A base rate raised by the full indication, on top of new relativities that already raise premium, double-counts. With a +6.0% indication and relativities worth +3.5%, the result is +9.7%. The base rate change is the overall change divided by the change in average rate differential.
