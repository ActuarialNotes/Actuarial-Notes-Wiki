---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1450f75afdee3a2f20173b228bd841389d9424fc9748f314e5cc21ed3970e86e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/ALM Risk.md
---
**ALM risk** is the risk that the assets and liabilities of an insurer, pension plan or bank respond differently to the same change in markets, member behaviour or demographics, so that the surplus between them falls. Each ALM risk is measured by its effect on surplus rather than on the assets or the liabilities alone.

With surplus $S = A - L$, the change in surplus is

> $$\Delta S = \Delta A - \Delta L$$

- $\Delta A$ is the change in the value of the assets.
- $\Delta L$ is the change in the value of the liabilities.

The risks are [[Interest Rate Risk|interest rate]], spread and credit, liquidity, policyholder option, inflation, longevity, currency and basis risk.

## Interest rate risk

[[Price Risk|Price risk]] is the fall in a fixed-income asset's value when rates rise, and [[Reinvestment Risk|reinvestment risk]] is the lower income on cash flows reinvested after rates fall. A surplus with matched [[Duration|duration]] is protected against a small parallel shift. It is not protected against a twist of the [[Yield Curve|yield curve]], which key rate durations measure, or against large moves, which [[Convexity|convexity]] and scenario testing capture.

For changes $\Delta y_k$, in basis points, in the key rates $k$, the change in surplus is

> $$\Delta S \approx -\sum_{k} \left(\text{KR01}_{A,k} - \text{KR01}_{L,k}\right)\Delta y_k$$

- $\text{KR01}_{A,k}$ and $\text{KR01}_{L,k}$ are the key rate '01s of the assets and liabilities at key maturity $k$.
- A key rate '01 is the gain in value for a one basis point **fall** in the rate at that maturity alone, with the curve between key rates interpolated, so a rise in rates gives $-\text{KR01} \times \Delta y$.

> [!example]- What do a parallel rise, a flattening and a steepening do to this insurer's surplus? {Example}
> An insurer's key rate '01s, in thousands of dollars per basis point, are below. In the parallel rise every rate rises 50 basis points. In the flattening the 2-, 5-, 10- and 30-year rates change by $+50$, $+25$, $0$ and $-25$ basis points, and the steepening is the opposite.
>
> | Key rate | 2-year | 5-year | 10-year | 30-year | Total |
> | :--- | ---: | ---: | ---: | ---: | ---: |
> | Assets | 120 | 380 | 600 | 150 | 1,250 |
> | Liabilities | 60 | 200 | 450 | 540 | 1,250 |
>
> > [!answer]-
> > - The net key rate '01s, assets minus liabilities, are $+60$, $+180$, $+150$ and $-390$, which sum to zero.
> > - The parallel rise gives $\Delta S = -(60 + 180 + 150 - 390) \times 50 = 0$, because the total '01 is matched.
> > - The flattening gives $\Delta S = -(60 \times 50 + 180 \times 25 + 150 \times 0 - 390 \times (-25))$.
> > - That is $-(3{,}000 + 4{,}500 + 0 + 9{,}750) = -17{,}250$ thousand, a loss of $\$17.25$ million.
> > - The liabilities are concentrated at 30 years, where rates fell, and the assets at 2 to 10 years, where rates rose.
> > - The steepening reverses every sign and gains $\$17.25$ million.
> > - To close the curve risk, the insurer would lengthen its assets at the 30-year key rate, for example with 30-year receive-fixed swaps, funded from the 5-year and 10-year buckets.

## Spread and credit risk

Corporate bonds, mortgages and structured credit lose value when credit spreads widen and when issuers are downgraded or default. [[Credit Risk|Credit]] losses are permanent, where spread moves may reverse. For a change $\Delta s$ in credit spreads, the change in surplus is

> $$\Delta S_{\text{spread}} \approx -\left(SD_A\,A - SD_L\,L\right)\Delta s$$

- $SD_A$ and $SD_L$ are the spread durations of the assets and liabilities.
- $SD_L$ is nonzero only to the extent that the liabilities' discount rate includes a spread.

Whether the liabilities move with spreads is set by the accounting or regulatory discount rate, so the basis is stated before spread risk on surplus is measured.

> [!example]- What does a 100 basis point spread widening do to this insurer's surplus? {Example}
> An insurer holds $\$2{,}000$ million of corporate bonds with spread duration 6.5. Its liabilities of $\$1{,}800$ million have duration 8.0 and are discounted at a rate that includes half of any change in the spread on its assets.
>
> > [!answer]-
> > - The liability discount rate rises by 50 basis points, so the liabilities fall too.
> > - The assets fall by $2{,}000 \times 6.5 \times 0.01 = 130$ million.
> > - The liabilities fall by $1{,}800 \times 8.0 \times 0.005 = 72$ million.
> > - The surplus falls by $130 - 72 = \$58$ million.
> > - With a risk-free discount rate the liabilities would not move, and the surplus would fall by the full $\$130$ million.

## Liquidity risk

Funding liquidity risk is the risk of not having cash to meet obligations when they fall due, and market liquidity risk is the risk of being able to sell assets only at a deep discount. It is measured by comparing liquid sources, after haircuts, with stressed outflows over a horizon. It is most dangerous when liabilities can be withdrawn on demand. An institution with positive surplus can still fail if it can't raise cash in time, so a solvency measure doesn't show liquidity risk.

## Policyholder option risk

Policyholders and members hold [[Embedded Option|embedded options]], such as surrender, lapse, guaranteed rates and annuitization, and they tend to exercise them when doing so hurts the insurer. Surrenders rise when rates rise, which is called disintermediation, and guarantees bite when rates fall. Liability cash flows therefore shorten or lengthen exactly when the assets are least able to follow. Projections need dynamic [[Lapse|lapse]] assumptions, since a key rate profile built from scheduled cash flows understates how much the liabilities shorten when rates rise.

## Inflation and longevity risk

Indexed pensions and property and casualty claims grow with [[Inflation|inflation]], while most bonds pay fixed amounts, so unexpected inflation raises the liabilities more than the assets. [[Longevity Risk|Longevity risk]], people living longer than assumed, lengthens annuity and pension cash flows. It can't be hedged with financial assets, only with reinsurance, longevity swaps or buy-ins.

## Currency and basis risk

Assets in one currency backing liabilities in another expose the surplus to exchange rates unless hedged. Basis risk is the gap between the rate that values the hedge and the rate that values the liability. A swap hedging liabilities discounted on a government curve has it, and so does a hedge on an index that differs from the guarantee's own fund.

## Managing ALM risk

The tools are:

- [[Cash Flow Matching|Cash flow matching]] and [[Immunization|immunization]].
- Key-rate hedging with bonds and [[Interest Rate Derivative|interest rate derivatives]].
- Liquidity buffers and limits on puttable liabilities.
- Product design, such as surrender charges and market value adjustments.
- Risk transfer through reinsurance.

The risks are set against the institution's [[Risk Appetite|risk appetite]], usually as limits on surplus sensitivity and on capital at risk.

> [!trap] Matched DV01 taken as matched curve risk
> Two portfolios with the same total DV01 can have very different key rate profiles. A zero surplus change under a parallel shock does not make the surplus immune, and a twist can still cost millions, as in the flattening above.
