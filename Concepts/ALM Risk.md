---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:775e24fb00998cee6735fed1389c1b8ce0b0e0e0e0fe3c2c3ef918d24e7aed43
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/ALM Risk.md
---

**ALM risk** is the risk that the assets and liabilities of an insurer, pension plan or bank respond differently to the same change in markets, member behaviour or demographics, so that the surplus between them falls. It covers interest rate, spread and credit, liquidity, policyholder option, inflation, longevity, currency and basis risks, and each is measured by its effect on surplus rather than on the assets or the liabilities alone.

> $$\Delta S = \Delta A - \Delta L$$

> $$\Delta S \approx -\sum_{k} \left(\text{KR01}_{A,k} - \text{KR01}_{L,k}\right)\Delta y_k$$

> $$\Delta S_{\text{spread}} \approx -\left(SD_A\,A - SD_L\,L\right)\Delta s$$

- **Symbols:** $S = A - L$ is the surplus. $\text{KR01}_{A,k}$ and $\text{KR01}_{L,k}$ are the key rate '01s of the assets and liabilities at key maturity $k$: the gain in value for a one basis point fall in the rate at that maturity alone, with the curve between key rates interpolated. $\Delta y_k$ is the change in that key rate in basis points. In the last line, $SD_A$ and $SD_L$ are spread durations and $\Delta s$ is a change in credit spreads, which moves the liabilities only to the extent that their discount rate includes a spread.
- **Interest rate risk:** [[Price Risk|Price risk]] is the fall in a fixed-income asset's value when rates rise, and [[Reinvestment Risk|reinvestment risk]] is the lower income on cash flows reinvested after rates fall. A surplus with matched [[Duration|duration]] is protected against a small parallel shift, but not against a twist of the [[Yield Curve|yield curve]], which key rate durations measure, or against large moves, which [[Convexity|convexity]] and scenario testing capture. The full treatment is on the [[Interest Rate Risk|interest rate risk]] page.
- **Spread and credit risk:** Corporate bonds, mortgages and structured credit lose value when credit spreads widen and when issuers are downgraded or default. Spread widening hurts the surplus unless the liabilities are discounted at a rate that widens with the asset spreads, and [[Credit Risk|credit]] losses are permanent where spread moves may reverse.
- **Liquidity risk:** Funding liquidity risk is the risk of not having cash to meet obligations when they fall due, and market liquidity risk is the risk of being able to sell assets only at a deep discount. It is measured by comparing liquid sources, after haircuts, with stressed outflows over a horizon, and it is most dangerous when liabilities can be withdrawn on demand.
- **Policyholder option and behaviour risk:** Policyholders and members hold [[Embedded Option|embedded options]], such as surrender, lapse, guaranteed rates and annuitization, and they tend to exercise them when doing so hurts the insurer. Surrenders rise when rates rise, which is called disintermediation, and guarantees bite when rates fall, so liability cash flows shorten or lengthen exactly when the assets are least able to follow. Projections need dynamic [[Lapse|lapse]] assumptions rather than fixed cash flows.
- **Inflation and longevity risk:** Indexed pensions and property and casualty claims grow with [[Inflation|inflation]], while most bonds pay fixed amounts, so unexpected inflation raises the liabilities more than the assets. [[Longevity Risk|Longevity risk]], people living longer than assumed, lengthens annuity and pension cash flows, and it can't be hedged with financial assets, only with reinsurance, longevity swaps or buy-ins.
- **Currency and basis risk:** Assets in one currency backing liabilities in another expose the surplus to exchange rates unless hedged. Basis risk is the gap between the rate that values the hedge and the rate that values the liability, such as a swap hedging liabilities discounted on a government curve, or a hedge on an index that differs from the guarantee's own fund.
- **Managing the risks:** The tools are [[Cash Flow Matching|cash flow matching]] and [[Immunization|immunization]], key-rate hedging with bonds and [[Interest Rate Derivative|interest rate derivatives]], liquidity buffers and limits on puttable liabilities, product design such as surrender charges and market value adjustments, and risk transfer through reinsurance. The risks are set against the institution's [[Risk Appetite|risk appetite]], usually as limits on surplus sensitivity and on capital at risk.

> [!example]- Surplus Under Parallel and Twist Shocks Using Key Rate '01s {Example}
> An insurer's key rate '01s, in thousands of dollars per basis point, are:
>
> | Key rate | 2-year | 5-year | 10-year | 30-year | Total |
> |---|---|---|---|---|---|
> | Assets | 120 | 380 | 600 | 150 | 1,250 |
> | Liabilities | 60 | 200 | 450 | 540 | 1,250 |
>
> Estimate the change in surplus for (a) a parallel rise of 50 basis points, (b) a flattening in which the 2-, 5-, 10- and 30-year rates change by $+50$, $+25$, $0$ and $-25$ basis points, and (c) the opposite steepening.
>
> > [!answer]-
> > The net key rate '01s, assets minus liabilities, are $+60$, $+180$, $+150$ and $-390$, which sum to zero.
> > $$
> > \begin{align*}
> > \Delta S_{(a)} &= -(60 + 180 + 150 - 390)(50) \\
> > &= 0 \\
> > \Delta S_{(b)} &= -\left[60(50) + 180(25) + 150(0) + (-390)(-25)\right] \\
> > &= -(3{,}000 + 4{,}500 + 0 + 9{,}750) \\
> > &= -17{,}250
> > \end{align*}
> > $$
> > The insurer's total DV01 is matched, so a parallel shift leaves the surplus unchanged to first order. The flattening costs \$17.25 million, because the liabilities are concentrated at 30 years where rates fell, while the assets are concentrated at 2 to 10 years where rates rose. The steepening in (c) reverses every sign and gains \$17.25 million. To close the curve risk, the insurer would lengthen its assets at the 30-year key rate, for example with 30-year receive-fixed swaps, and fund them from the 5-year and 10-year buckets.

> [!example]- Surplus Under a Spread Widening {Example}
> An insurer holds \$2,000 million of corporate bonds with spread duration 6.5. Its liabilities of \$1,800 million have duration 8.0 and are discounted at a rate that includes half of any change in the spread on its assets. Estimate the change in surplus if credit spreads widen by 100 basis points, and compare it with liabilities discounted at a risk-free rate.
>
> > [!answer]-
> > The liability discount rate rises by 50 basis points, so the liabilities fall too.
> > $$
> > \begin{align*}
> > \Delta S &\approx -\left[2{,}000(6.5)(0.01) - 1{,}800(8.0)(0.005)\right] \\
> > &= -(130 - 72) \\
> > &= -58
> > \end{align*}
> > $$
> > The surplus falls by \$58 million. With a risk-free discount rate the liabilities would not move, and the surplus would fall by the full \$130 million. Which result is right depends on the valuation basis, so the same assets can carry very different spread risk under different accounting or capital regimes.

> [!tip]- How it appears on the exam
> - **CP-351, learning objective 1c:** Candidates demonstrate an understanding of the ALM risks, from Sweeting's chapter on risk identification, Hardy and Saunders's chapter on risk taxonomy and the first paper on life insurance risk, capital and ALM. Expect a written answer that names and explains the risks in a described product or balance sheet, such as a deferred annuity block or a pension plan.
> - **Measurement:** Learning objectives 2a and 2b ask candidates to identify and evaluate a portfolio's exposures, with Tuckman and Serrat's chapters on DV01 and key rate '01s and the paper on key rate durations. Expect a calculation of the surplus change under parallel and non-parallel shocks.
> - **Management:** The third section of the syllabus asks how to manage these risks, so a measurement question often ends with a recommended hedge.

> [!warning]- Exam traps
> - **Matched DV01 is not matched curve risk:** Two portfolios with the same total DV01 can have very different key rate profiles. Concluding that the surplus is immune because the parallel shock gives zero misses the twist risk.
> - **Sign conventions:** A '01 is the gain for a one basis point fall, so a rise in rates gives $-\text{KR01} \times \Delta y$. Using the '01 as the gain for a rise reverses every answer.
> - **Static cash flows for optional liabilities:** Surrenders, lapses and guarantees change the liability cash flows when rates move. A key rate profile built from scheduled cash flows understates how much the liabilities shorten when rates rise.
> - **Spread risk depends on the valuation basis:** Whether the liabilities move with spreads is set by the accounting or regulatory discount rate, not by the assets. State the basis before measuring spread risk on surplus.
> - **Liquidity is not solvency:** An institution can have a positive surplus and still fail if it can't raise cash in time. A solvency measure doesn't show liquidity risk, which needs its own stressed sources-and-uses test.
