---
aliases:
  - Asset Adequacy
  - Liability Cash Flow
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f6237f3fde48d201a9b42967852646e7fa6099d0dead93adebffbbb73187923f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Asset Adequacy Analysis.md
---
**Asset Adequacy Analysis** is a test of whether the assets an insurer holds to support its reserves, together with the future premiums and investment income they will produce, are enough to pay the obligations of the business under moderately adverse conditions. It is the work behind the U.S. appointed actuary's [[Statement of Actuarial Opinion|statement of actuarial opinion]] that a life or health insurer's reserves make good and sufficient provision.

Its usual method is cash flow testing, which projects asset and liability cash flows together under a range of scenarios. With the liability cash flows taken at the start of each year, the assets supporting a block grow over year $t$ of a scenario as

> $$A_{t+1} = \big(A_t + P_t - B_t - E_t\big)(1 + i_t)$$

- $A_t$ is the value of the assets supporting the block at time $t$.
- $P_t$, $B_t$ and $E_t$ are the premiums, benefits and expenses at the start of year $t$.
- $i_t$ is the rate earned in year $t$ of the scenario.

At the end of a projection horizon of $T$ years, the ending surplus is

> $$S_T = A_T - V_T$$

- $V_T$ is the reserve still required at time $T$.

The present value of the ending surplus, PVES, discounts it at the scenario's rates:

> $$\text{PVES} = \frac{S_T}{\prod_{t=0}^{T-1}(1 + i_t)}$$

A block whose projected surplus is negative in a moderately adverse scenario needs an additional reserve, sized from the scenarios in which it fails.

> [!example]- Does this long-term care block pass a level and a falling interest rate scenario? {Example}
> A closed [[Long-Term Care Insurance|long-term care]] block has $\$1{,}000$ of assets equal to its reserve, invested short so the whole portfolio earns each year's new money rate. The reserve required at the end of year 3 is $\$1{,}180$. The scenarios are a level 5% and a falling 4%, 3% and 2%.
>
> | Year | 1 | 2 | 3 |
> | :--- | ---: | ---: | ---: |
> | Net liability cash flow at start of year | $+50$ | $+30$ | $-20$ |
>
> > [!answer]-
> > - In the level scenario, $A_1 = 1{,}050 \times 1.05 = 1{,}102.50$, $A_2 = 1{,}132.50 \times 1.05 = 1{,}189.13$ and $A_3 = 1{,}169.13 \times 1.05 = 1{,}227.58$.
> > - The level scenario's ending surplus is $1{,}227.58 - 1{,}180 = 47.58$, with a PVES of $47.58/1.05^3 = 41.10$, so the block passes.
> > - In the falling scenario, $A_1 = 1{,}050 \times 1.04 = 1{,}092.00$, $A_2 = 1{,}122.00 \times 1.03 = 1{,}155.66$ and $A_3 = 1{,}135.66 \times 1.02 = 1{,}158.37$.
> > - The falling scenario's ending surplus is $1{,}158.37 - 1{,}180 = -21.63$.
> > - Its PVES is $-21.63/(1.04 \times 1.03 \times 1.02) = -19.79$.
> > - The block fails the falling scenario, so an additional reserve of about $\$19.79$ is needed if that scenario is judged moderately adverse.
> > - The cause is the mismatch. Long liabilities are backed by short assets, and the positive early cash flows are reinvested as rates fall. Three-year 5% bonds bought at the start would end the falling scenario with about $\$1{,}219$ of assets, and the block would pass.

## Purpose and standard

Formula reserves are set on prescribed assumptions and do not by themselves show that the assets behind them will be enough. Asset adequacy analysis projects on the actuary's own assumptions, with margins for moderately adverse experience, so re-running the reserve basis tests nothing. ASOP 22 guides the actuary who signs an opinion based on asset adequacy analysis. The [[Appointed Actuary|appointed actuary]] documents the work in an actuarial memorandum that sets out the assets, the assumptions, the scenarios and the results.

## Approaches to asset adequacy analysis

1. **Cash flow testing** is the most thorough approach. It is needed when asset and liability cash flows interact.
2. **Gross premium valuation** compares the reserve with the present value of future benefits and expenses less future premiums. It suits business with little interest sensitivity.
3. **Simpler demonstrations**, such as loss ratio tests, can serve small or stable blocks.

## Gross premium valuation

A gross premium valuation values the liabilities on best-estimate assumptions and gross premiums. The liability it gives is

> $$\text{GPV} = \text{PV}(B + E) - \text{PV}(P)$$

- $\text{PV}(B + E)$ is the present value of future benefits and expenses.
- $\text{PV}(P)$ is the present value of future gross premiums.

A reserve below the GPV is deficient by the difference. The test uses a fixed discount rate and the liabilities alone, so it says nothing about whether the actual assets can earn that rate.

> [!example]- A disability income block holds a reserve of $\$500$. The present values of its future benefits, expenses and gross premiums are $\$820$, $\$60$ and $\$330$. Is the reserve adequate? {Example}
> - The gross premium valuation is $820 + 60 - 330 = 550$.
> - The block needs $\$550$ and holds $\$500$, so a deficiency of $\$50$ is added to the reserve.

## Asset and liability interaction

Positive net cash flow is reinvested at the scenario's new money rates, which creates [[Reinvestment Risk|reinvestment risk]]. Negative net cash flow forces assets to be sold at the scenario's market values, which creates [[Interest Rate Risk|interest rate risk]]. Bonds that can be called and mortgage-backed securities that prepay change their own cash flows as rates move. [[Credit Risk|Credit]] defaults reduce asset cash flows in adverse scenarios. Lengthening assets to match the liabilities, as in [[Asset-Liability Management|asset-liability management]], can remove the need for an additional reserve.

## Scenarios and sensitivity tests

The projection is run under several interest rate scenarios (rising, falling and changing direction) or under a set generated stochastically. Sensitivity tests move one liability assumption at a time, such as morbidity or lapses, to show which ones drive the result. A block must pass in moderately adverse scenarios, not only in the expected one.

## Long-duration health business

For [[Long-Term Care Insurance|long-term care]] and [[Disability Income Insurance|disability income]], the key liability assumptions are morbidity, claim termination, [[Lapse|lapses]], mortality and future premium rate increases. A future rate increase may be assumed only to the extent it is likely to be filed and approved. Level premiums produce positive cash flow for many years before claims peak, so these blocks are exposed to the rates at which that cash is reinvested.

## Related tests in P&C insurance

The same logic gives the P&C [[Premium Deficiency|premium deficiency]] for unexpired coverage and the [[Reserve Adequacy|reserve adequacy]] review of unpaid claims.

> [!trap] Testing only the level scenario
> Passing the level scenario does not show adequacy. The block above passes at a level 5% and fails when rates fall to 2%, because its short assets are reinvested at the lower rates.
