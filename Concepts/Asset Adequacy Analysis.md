---
aliases:
  - Asset Adequacy
  - Liability Cash Flow
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:07ddb3900fa721fef079026796a22cf68f7bb1c5e6dca6a68c008fe9468e76ec
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Asset Adequacy Analysis.md
---
**Asset Adequacy Analysis** tests whether the assets an insurer holds to support its reserves, together with the future premiums and investment income they will produce, are enough to pay the obligations of the business under moderately adverse conditions. It is the work behind the U.S. appointed actuary's [[Statement of Actuarial Opinion|statement of actuarial opinion]] that a life or health insurer's reserves make good and sufficient provision, and its usual method is cash flow testing: projecting asset and liability cash flows together under a range of scenarios. A shortfall is met by holding an additional reserve.

> $$A_{t+1} = \big(A_t + P_t - B_t - E_t\big)(1 + i_t)$$

> $$S_T = A_T - V_T$$

> $$\text{PVES} = \frac{S_T}{\prod_{t=0}^{T-1}(1 + i_t)}$$

> $$\text{GPV} = \text{PV}(B + E) - \text{PV}(P)$$

- **Symbols:** $A_t$ is the value of the assets supporting the block at time $t$, and $P_t$, $B_t$ and $E_t$ are the liability cash flows, premiums, benefits and expenses, taken here at the start of each year. $i_t$ is the earned rate in the scenario, $V_T$ the reserve still required at the end of the horizon $T$, $S_T$ the ending surplus, and PVES its present value at the scenario's rates. $\text{GPV}$ is a gross premium valuation of the liabilities, using best-estimate assumptions and gross premiums.
- **Purpose and standard:** Formula reserves are set on prescribed assumptions and do not by themselves show that the assets behind them will be enough. ASOP 22 guides the actuary who signs an opinion based on asset adequacy analysis, and the work is documented in an actuarial memorandum that sets out the assets, the assumptions, the scenarios and the results ([[Appointed Actuary|appointed actuary]]).
- **Approaches:** Cash flow testing is the most thorough approach, and it is needed when asset and liability cash flows interact. A gross premium valuation, which compares the reserve with the present value of future benefits and expenses less future premiums, suits business with little interest sensitivity. Simpler demonstrations, such as loss ratio tests, can serve small or stable blocks.
- **Long-duration health:** For [[Long-Term Care Insurance|long-term care]] and [[Disability Income Insurance|disability income]], the key liability assumptions are morbidity, claim termination, [[Lapse|lapses]], mortality and future premium rate increases, which may be assumed only to the extent they are likely to be approved. Level premiums produce positive cash flow for many years before claims peak, so these blocks are exposed to the rates at which that cash is reinvested.
- **Asset and liability interaction:** Positive net cash flow is reinvested at the scenario's new money rates, which creates [[Reinvestment Risk|reinvestment risk]]. Negative net cash flow forces assets to be sold at the scenario's market values, which creates [[Interest Rate Risk|interest rate risk]]. Bonds that can be called and mortgage-backed securities that prepay change their own cash flows as rates move, and [[Credit Risk|credit]] defaults reduce asset cash flows in adverse scenarios.
- **Scenarios and sensitivities:** The projection is run under several interest rate scenarios, rising, falling and changing direction, or under a set generated stochastically. Sensitivity tests move one liability assumption at a time, such as morbidity or lapses, to show which ones drive the result. A block must pass in moderately adverse scenarios, not only in the expected one.
- **Results:** Where projected surplus is negative, the actuary sets up an additional reserve, sized from the scenarios in which the block fails. The same logic gives the P&C [[Premium Deficiency|premium deficiency]] for unexpired coverage and the [[Reserve Adequacy|reserve adequacy]] review of unpaid claims. Lengthening assets to match the liabilities, as in [[Asset-Liability Management|asset-liability management]], can remove the need for an additional reserve.

> [!example]- Cash Flow Testing a Long-Term Care Block {Example}
> A closed LTC block has \$1,000 of assets equal to its reserve, invested short so the whole portfolio earns each year's new money rate. Net liability cash flows at the start of years 1 to 3 are $+50$, $+30$ and $-20$, and the reserve required at the end of year 3 is \$1,180. Find the ending surplus and its present value under a level scenario of 5% and a falling scenario of 4%, 3% and 2%.
>
> > [!answer]-
> > In the level scenario, assets grow to \$1,227.58 and the ending surplus is \$47.58. The falling scenario earns less on the same cash flows.
> > $$
> > \begin{align*}
> > A_1 &= 1{,}050 \times 1.04 \\
> > &= 1{,}092.00 \\
> > A_2 &= 1{,}122.00 \times 1.03 \\
> > &= 1{,}155.66 \\
> > A_3 &= 1{,}135.66 \times 1.02 \\
> > &= 1{,}158.37 \\
> > S_3 &= 1{,}158.37 - 1{,}180 \\
> > &= -21.63 \\
> > \text{PVES} &= \frac{-21.63}{1.04 \times 1.03 \times 1.02} \\
> > &= -19.79
> > \end{align*}
> > $$
> > The block fails the falling scenario, so an additional reserve of about \$19.79 is needed if that scenario is judged moderately adverse. The cause is the mismatch: long liabilities are backed by short assets, and the positive early cash flows are reinvested as rates fall. Three-year bonds bought at the start would have locked in 5% on most of the portfolio, and the block would then end the falling scenario with about \$1,219 of assets and pass.

> [!example]- A Gross Premium Valuation {Example}
> A disability income block holds a reserve of \$500. On best-estimate assumptions, the present value of future benefits is \$820, of future expenses \$60, and of future gross premiums \$330. Is the reserve adequate?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{GPV} &= 820 + 60 - 330 \\
> > &= 550
> > \end{align*}
> > $$
> > The block needs \$550 and holds \$500, so a deficiency of \$50 is added to the reserve. A gross premium valuation tests the liabilities alone, with a fixed discount rate, so it says nothing about whether the actual assets can earn that rate.

> [!tip]- How it appears on the exam
> - **CP-321 asset adequacy:** Questions ask candidates to describe the asset adequacy approaches used for long-duration health contracts, such as cash flow testing and gross premium valuation, and when each is appropriate under ASOP 22.
> - **CP-321 cash flow projections:** Questions ask candidates to describe cash flow projections and how asset and liability cash flows interact, such as how positive net cash flow is reinvested, how negative cash flow forces asset sales, and how a scenario moves the result.

> [!warning]- Exam traps
> - **Reserve basis is not the test basis:** The reserve is set on prescribed assumptions, while asset adequacy analysis projects on the actuary's own assumptions, with margins for moderately adverse experience. Re-running the reserve basis tests nothing.
> - **Ignoring reinvestment:** Level-premium health blocks have positive cash flow for years. Projecting them as if all cash earns the current portfolio yield hides the reinvestment risk when rates fall.
> - **One scenario:** Passing the level scenario does not show adequacy. A block can pass where rates stay flat and fail when they fall or rise, depending on how its assets and liabilities are matched.
> - **Unapproved rate increases:** Future premium increases on long-term care can be assumed only to the extent they are likely to be filed and approved. Assuming the full increase the block needs makes any block pass.
