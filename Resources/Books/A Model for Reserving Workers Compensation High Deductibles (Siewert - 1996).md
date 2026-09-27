---
Title: "A Model for Reserving Workers Compensation High Deductibles"
Authors: "Jerome J. Siewert"
Publisher: "Casualty Actuarial Society"
Year: "1996"
date: "1996"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/7_Siewert.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b324fb720c03b94489a713b43b456a87381f45e7bddbc0a3755dababcb3ae6e7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/A Model for Reserving Workers Compensation High Deductibles (Siewert - 1996).md
---
![[A Model for Reserving Workers Compensation High Deductibles (Siewert - 1996) - Cover.svg]]

A paper on approaches for estimating liabilities under a workers compensation high deductible program, including one that relies on a loss distribution model. It addresses deductible size and mix, the absence of long-term histories and consistent loss development factors among deductible limits, and proposes approaches for estimating aggregate loss limit charges and the asset value for associated servicing revenue. The author was with Wausau Insurance Companies; the paper appeared in the Casualty Actuarial Society Forum, Summer 1996, pp. 217–244.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objective A4; the whole paper (Casualty Actuarial Society Forum, Summer 1996, pp. 217-244).

## 1 Abstract
- Several approaches for estimating liabilities under a high deductible program are described, including a proposal for a more sophisticated approach relying upon a loss distribution model.

## 2 Introduction
- Insurers developed the high deductible program in the early 1990s for price flexibility while passing risk to larger insureds, relief from residual market charges and premium taxes, cash flow advantages similar to the paid loss retro, loss control, and "self-insurance" without demanding state requirements.
- As the program matures the focus shifts to the liability side, where losses are not expected to emerge above deductible limits for many years.
- Six issues are posed: development factors without long-term deductible histories, patterns reflecting deductible size and mix, consistent development factors between limited and excess values, indexing deductible limits over time, the liability for aggregate loss limits, and the asset value of service revenue.
- Loss multipliers, similar to a loss conversion factor in [[Retrospective Rating|retro rating]], are applied to deductible losses to capture expenses that vary with loss.

## 3 Development Approaches
- Overview
    - The approach relies on the company's history of full coverage workers compensation claims to create deductible and excess development patterns as needed.
    - Factors are applied at the account level and the reserve is the sum of account ultimates, which reflects each account's own limits and so the deductible mix.
- Loss Ratio
    - In the absence of credible development histories, expected loss ratios from pricing are applied to premium; for immature years this is probably the most practical approach.
    - It can be tied to pricing and relies on a more credible pool of experience, but it ignores actual emerging experience and may not reflect account characteristics, so it is not particularly useful after several years of development.
    - Per-occurrence excess losses use account-based excess ratios, such as those underlying the industry excess loss factors used in retro rating; with $P$ premium, $E$ the expected loss ratio and $\chi$ the per occurrence charge, they are:
    > $$P \cdot E \cdot \chi$$
    - The aggregate loss charge, with $\phi$ the per aggregate charge from a process like that for retro insurance charges (NCCI Table M, see [[Loss Sensitive Rating]]), is:
    > $$P \cdot E \cdot (1 - \chi) \cdot \phi$$
- Implied Development
    - Develop full coverage losses to ultimate, develop deductible losses to ultimate with factors for inflation-indexed limits, and take ultimate excess losses as the difference — the [[Implied Development Method|implied development]] approach.
    - The full coverage tail factor must be consistent with the limited tail factors: limited losses should never be developed beyond unlimited losses, nor a lower limit beyond a higher one.
    - Limits are indexed for inflation: at 10% annual cost inflation, losses over a \$100,000 deductible in one year equate to those over \$110,000 the next, which allows experience years to be combined.
    - It gives an excess estimate at early maturities even when no excess losses have emerged, limited factors are more stable than excess ones, and the estimated deductible losses help determine the service revenue asset; but its focus is misplaced, as excess development is not recognized explicitly.
- Direct Development
    - Given limited and full coverage development factors, the [[Excess Loss Development Factor|excess loss development factors]] are fixed; excess factors should balance back to full coverage development, though reserve indications from the implicit and explicit methods need not be the same.
    - Excess factors are leveraged and extremely volatile, and they give no estimate when excess losses have not yet emerged.
- Credibility Weighting Techniques/Bornhuetter-Ferguson
    - It ties recent years to pricing and gives more stable estimates, but it ignores actual experience to the extent of the complement of credibility.
    - Observed loss $O_t$ is credibility weighted with the expected ultimate loss $E$, preferably from pricing; the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] technique sets the credibility to $1/\text{LDF}_t$:
    > $$L = O_t + E \cdot \frac{\text{LDF}_t - 1}{\text{LDF}_t}$$

## 4 Development Model
- Determining development factors for a high deductible program is an exercise in partitioning development about the deductible limit.
- Some Possible Approaches
    - Company full coverage claims, with an indexed limit applied, give accident year development histories by limit; the studies used limits from \$50,000 to \$1,000,000, case losses including indemnity, medical and subject allocated claim expense, and 25 years of history (Table 2).
    - The index of 1.095 comes from an exponential trend line fitted to long-term average severity (Chart 1), so a current \$250,000 limit is equivalent to \$228,311 in the first prior year.
    - Claim count development is separated from severity development; full coverage counts are used because there is very little true claim count IBNR after about three years.
    - Tail factors come from a three-parameter inverse power curve (Sherman) fitted to age-to-age factors for each limit and extended to a common maturity of 40 years, tied to the company's full coverage [[Tail Factor|tail factor]]:
    > $$y = 1 + a \cdot (t + c)^{-b}$$
    - Development factors must be related to limited severity relativities, the ratio of the limited to the unlimited severity; developing each limit on its own gave completion factors for smaller deductibles that sometimes exceeded those for larger ones.
    - With $C$ counts, $S$ unlimited severity and $R^L$ the relativity at limit $L$ (subscript $t$ for age $t$, none for the later age), the limited and excess factors are:
    > $$\text{LDF}^L = \frac{C}{C_t} \cdot \frac{S}{S_t} \cdot \frac{R^L}{R^L_t}$$
    >
    > $$\text{XSLDF}^L = \frac{C}{C_t} \cdot \frac{S}{S_t} \cdot \frac{1 - R^L}{1 - R^L_t}$$
- Motivation for Relationship
    - Tables 4 and 5 show age-to-age factors and limited severity relativities about a \$250,000 deductible for accident years 1989–1993; actual case development does not always conform, as the limited factor sometimes exceeds the unlimited.
    - For accident year 1993 from 12 to 24 months, the limited factor of 1.6229 equals the unlimited 1.6044 compounded with the change in relativities, 1.0116; the excess factor of 1.1684 is the unlimited factor times the ratio of the complements of the relativities.
    - The relationships partition total loss development consistently between limited and excess development: the unlimited factor is the relativity-weighted average of the limited and excess factors.
    > $$\text{LDF}_t = R^L_t \cdot \text{LDF}^L_t + (1 - R^L_t) \cdot \text{XSLDF}^L_t$$
- Distributional Model - A More Promising Approach
    - A [[Severity Distribution|loss distribution]] model whose parameters vary over time ties the relativities to the severities, giving consistent development factors and easy interpolation among limits and years.
    - A Weibull distribution is used, with parameters found by minimizing the chi-square between actual and expected severity relativities around \$250,000, constrained to reproduce the actual unlimited severity.
    - Table 6 gives limited and excess factors from 48 months to ultimate by limit; 48 months is chosen to focus on severity, assuming no IBNR count development after 36 months.
    - For a \$250,000 deductible (Chart 5), excess development is the vast majority of development with increasing age; expected development partitions about the deductible limit as:
    > $$1 - \frac{1}{\text{LDF}_t} = \frac{R^L_t (\text{LDF}^L_t - 1) + (1 - R^L_t)(\text{XSLDF}^L_t - 1)}{R^L_t \cdot \text{LDF}^L_t + (1 - R^L_t) \cdot \text{XSLDF}^L_t}$$

## 5 Other Elements
- Aggregate Limits
    - Aggregate loss limits, conceptually similar to maximum premium limitations in retro rating, cap all losses the insured pays; their obligations are generally less significant than per-occurrence limits, and data for their development factors are sparse.
    - Development factors for losses excess of aggregate limits come from a [[Aggregate Loss Model|collective risk model]] (Heckman and Meyers) using the Weibull severity and a Poisson claim count distribution (Table 7).
    - That development decreases more rapidly over time with smaller deductibles, since most later development occurs above the deductible, and it is more leveraged for larger aggregate limits.
    - Given their volatility, a Bornhuetter-Ferguson method combining expected aggregate loss charges with the modeled development factors is recommended (Table 8).
    - Table 9 compares those estimates of aggregate excess IBNR at 48 months with the NCCI Table M alternative.
    - In the alternative, IBNR is the difference between Table M insurance charges at different maturities; at earlier maturities the per occurrence charge relates undeveloped limited losses to ultimate unlimited losses (31% at 48 months for \$250,000 in Table 6), and expected losses are adjusted for the loss limit by:
    > $$\text{Adjustment Factor} = \frac{1 + 0.8\chi}{1 - \chi}$$
- Service Revenue
    - Service revenue is generated like a loss conversion factor in a retro plan: a loss multiplier applied to deductible losses, limited by any aggregate, collected as losses are paid or as case incurred losses emerge.
    - The asset is determined by taking ultimate deductible losses at the account level, subtracting ultimate losses excess of aggregate limits, applying the loss multiplier, and subtracting known recoveries (Table 10).
- Allocated Claim Expense
    - Either the account manages [[Allocated Loss Adjustment Expense|allocated claim expense]] itself, calling for loss-only development patterns, or the expense is treated as loss subject to the limits, calling for combined patterns; the paper combines loss and expense.
    - Splitting loss and expense in proportion to their full coverage counterparts is expeditious.

## 6 Conclusion
- Suggested improvements: longer histories under the program reflecting risk characteristics, parameters and distributions that fit the data better, better tail factors, and more advanced approaches to indexing loss limits.

## Appendix I
- Weibull Distribution
    - The cumulative distribution function, density, mean and limited expected value are set out.
- LDF calculations about \$250,000 deductible limit
    - At ultimate ($\beta = 180.0$, $\alpha = 0.2326$) the mean is 6,846 and the [[Limited Expected Value|limited expected value]] 5,064; at 48 months ($\beta = 305.7$, $\alpha = 0.2625$) they are 5,530 and 4,722.
    - The 48-month-to-ultimate factors are 1.238 unlimited, 1.072 limited and 2.205 excess.

## Appendix II
- Determination of IBNR for an Aggregate Excess of 1,250,000
    - For expected unlimited loss of 2,500,000 and a \$250,000 deductible, NCCI Table M insurance charges at 48 months and at ultimate give an aggregate excess IBNR of 682,472 − 579,472 = 103,000.

## Related readings
- [[Claims Development by Layer (Sahasrabuddhe - 2010)]] — assigned with it for objective A4 in the Exam 7 content outline

## Sources
- [A Model for Reserving Workers Compensation High Deductibles (CAS Forum, Summer 1996)](https://www.casact.org/sites/default/files/2021-03/7_Siewert.pdf) — the paper: title page, abstract, Sections 1–6 and their run-in subheadings, Appendices I and II; formulas and tables read from page images, as the text layer is OCR
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation (Forum issue, year and page range, which the PDF itself does not print) and the assigned scope
