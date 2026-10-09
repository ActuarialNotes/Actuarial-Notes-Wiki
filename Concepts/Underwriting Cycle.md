---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:95a79528f9133bdc8369e2f38c5299c8a74e5bdfcc94f3d1a7f9defb48d3a7af
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Cycle.md
---

**The Underwriting Cycle** is the recurring swing of the property-casualty insurance market between a soft market, in which prices fall, [[Underwriting|underwriting]] standards loosen and insurance is easy to buy, and a hard market, in which prices rise, standards tighten and coverage is harder to find. It is usually traced through the industry's [[Combined Ratio|combined ratio]], which climbs while prices are soft and falls after they harden, and it is one of the main features of the environment an insurer's [[Business Strategy|strategy]] has to allow for.

> $$\text{CR}_t = \text{LR}_t + \text{ER}_t$$

> $$\text{Capacity}_t = k \times \text{Surplus}_t$$

> $$\text{Surplus}_{t+1} = \text{Surplus}_t + \text{NI}_t + \text{New capital}_t$$

- **Symbols:** $\text{CR}_t$ is the combined ratio in year $t$, the sum of the [[Loss Ratio|loss and LAE ratio]] $\text{LR}_t$ and the [[Expense Ratio|expense ratio]] $\text{ER}_t$. $\text{Surplus}_t$ is policyholders' surplus ([[Capital and Surplus]]), $\text{NI}_t$ is net income after underwriting results and [[Investment Income|investment income]], and $k$ is the largest premium-to-surplus ratio the insurer, its regulators and the rating agencies will accept. Capacity is the premium volume that surplus can support, so the cycle in prices runs alongside a cycle in surplus.
- **Soft market:** Insurers compete for market share by cutting rates, broadening coverage, offering higher limits and accepting accounts they would otherwise decline. Capacity is plentiful, buyers can choose among insurers, and combined ratios rise as the business written at inadequate prices is earned and its losses develop.
- **Hard market:** After underwriting losses have eaten into surplus, insurers raise rates, restrict coverage, tighten underwriting standards and withdraw from unprofitable lines or territories. Capacity is scarce, some buyers struggle to find coverage at any price, and combined ratios fall as the higher rates are earned.
- **The turn back to soft:** Hard-market profits rebuild surplus, and high returns attract new capital, both from existing insurers and from new entrants. The extra capacity leads insurers to compete on price again, which starts the next soft phase.
- **Internal explanations:** Rates are set from past experience, so prices lag the losses they are meant to cover, and loss reserves on recent years are estimated before their losses are known. Competition for market share pushes prices down while results look good, and the supply of capacity rises and falls with surplus. These features feed on each other and make the market overshoot in both directions.
- **External explanations:** A [[Catastrophe Loss|catastrophe]], a change in the legal environment, inflation or a fall in the financial markets can cut surplus suddenly and harden the market. Interest rates matter as well: when investment yields are high, insurers accept higher combined ratios because investment income covers the underwriting loss, a practice called cash flow underwriting, and that prolongs a soft market.
- **Effects on insurers and buyers:** An insurer that keeps its underwriting discipline in a soft market loses volume to competitors but avoids writing business at a loss, and it has the surplus to grow when prices harden. Buyers face shifting availability and affordability, and in a severe hard market some turn to [[Self-Insured Retention|self-insurance]], captives or the [[Excess and Surplus Lines|surplus lines]] market.
- **Why it matters to actuaries:** Experience periods that span a turn in the cycle mix business written under different prices and standards. [[Underwriting Changes|Changes in underwriting]] shift the mix of risks and distort trends and development, and soft-market years are often the ones whose reserves later prove inadequate ([[Reserve Adequacy]]).

> [!example]- Capacity After a Catastrophe {Example}
> An insurer has policyholders' surplus of \$500 million and writes \$1,200 million of premium a year. Its board, with an illustrative ceiling, will not let written premium exceed 3 times surplus. A hurricane costs the insurer \$150 million of surplus. How much premium can it support afterward, and what are its options for keeping its book?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Surplus}_{\text{after}} &= 500 - 150 \\
> > &= 350 \\
> > \text{Capacity} &= 3 \times 350 \\
> > &= 1{,}050 \\
> > \text{Cut in volume} &= \frac{1{,}200 - 1{,}050}{1{,}200} \\
> > &= 12.5\% \\
> > \text{Surplus needed} &= \frac{1{,}200}{3} \\
> > &= 400
> > \end{align*}
> > $$
> > Before the hurricane, the insurer wrote at 2.4 times surplus. Afterward, the same book would run at about 3.4 times, above its ceiling. It must shrink its book by 12.5%, raise \$50 million of new capital, or buy [[Reinsurance|reinsurance]] that frees capacity. When many insurers face the same choice after the same event, the industry's capacity falls together, prices rise, and the market hardens.

> [!example]- Reading the Cycle From Combined Ratios {Example}
> An illustrative market shows these average rate changes and combined ratios over eight years.
>
> | Year | Rate change | Combined ratio |
> |---|---|---|
> | 1 | -2% | 96% |
> | 2 | -4% | 99% |
> | 3 | -5% | 103% |
> | 4 | -3% | 108% |
> | 5 | +8% | 111% |
> | 6 | +12% | 104% |
> | 7 | +6% | 97% |
> | 8 | +1% | 94% |
>
> Identify the soft and hard phases, explain why the combined ratio peaks in Year 5, and find the operating ratio in Year 4 if the investment income ratio is 9%.
>
> > [!answer]-
> > Years 1 to 4 are the soft phase: rates fall each year and the combined ratio rises. Years 5 to 7 are the hard phase, with large rate increases, and Year 8 shows prices flattening as the market moves toward the next soft phase. The combined ratio peaks in Year 5, after rates have started to rise, because premium is earned over the policy term and Year 5's earned premium still comes largely from policies written at Year 4's prices. Losses on the soft years also keep developing and are recognized late.
> > $$
> > \begin{align*}
> > \text{Operating ratio}_4 &= 108\% - 9\% \\
> > &= 99\%
> > \end{align*}
> > $$
> > Investment income still leaves a small operating profit in Year 4, which is why cash flow underwriting can keep prices falling even at a combined ratio of 108%. In Year 5 the operating ratio would be above 100%, and that loss of surplus is what drives the hard market.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The objective sits in the strategic management section. Questions ask candidates to describe the underwriting cycle, contrast a soft market with a hard market, explain the internal and external factors that drive it, and describe its effects on insurers, their capacity and their customers. A case may ask how an insurer's strategy, such as its growth plan or underwriting standards, should respond to the phase of the cycle.

> [!warning]- Exam traps
> - **Soft and hard reversed:** A soft market is the buyer's market, with low prices and broad coverage, and a hard market is the seller's market, with high prices and tight standards. The words describe how easy insurance is to buy, not how good results are.
> - **The worst year is not the cheapest year:** Combined ratios peak after prices begin to rise, because earned premium lags written premium and soft-market losses develop late. An answer that places the peak combined ratio at the lowest rates gets the timing wrong.
> - **Capacity is surplus, not demand:** Capacity is the premium the insurer's surplus can support. A catastrophe cuts capacity even though the demand for insurance is unchanged, which is why prices rise after one.
> - **An underwriting loss is not always an operating loss:** A combined ratio above 100% can still leave an operating profit when investment income is large. That is the basis of cash flow underwriting, and it explains why soft markets last longer when interest rates are high.
> - **No fixed period:** The cycle has no reliable length or amplitude, and its turning points can't be predicted from the calendar. Describe it by its phases and causes rather than by a number of years.
