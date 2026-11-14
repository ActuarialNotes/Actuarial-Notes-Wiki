---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a2811701badb75456b0c1558a885fce11db582d4714c869dd1005be95706636f
  sources:
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor), §8.1 'Insurance Market Conditions': soft/hard markets, capacity, combined ratio, cash flow underwriting, sha256:7e7830b39c5a0cd17f75dbfeb2f0d2abe4e422df2b92c3f0218097ca48411d3d — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s12-01-insurance-market-conditions.html"
    - "Feldblum, Underwriting Cycles and Business Strategies (PCAS 2001), pp.175–185: interpretations of the cycle (ratemaking lag, underwriting philosophy, interest rates and cash flow underwriting, competition), sha256:02e494fce1810157e17d5f634338c6f803d29536b990661173966bd38c90faa1 — https://casact.org/sites/default/files/database/proceed_proceed01_01175.pdf"
    - "IRMI glossary, 'cash flow underwriting', sha256:261314799aa69fc69faf80bb4164e110df8b3079005b42c8aba4b7f384813152 — https://www.irmi.com/term/insurance-definitions/cash-flow-underwriting"
    - "IRMI glossary, 'hard market', sha256:50ebcc651210de2c80575a8daddd519e69cfddb04262c4921ff364c9cd4336d3 — https://www.irmi.com/term/insurance-definitions/hard-market"
    - "IRMI glossary, 'soft market', sha256:960a6b97f4b798dc8fbfbb7682f8735267be18f9c528b6beca2c3e4de1c6cf60 — https://www.irmi.com/term/insurance-definitions/soft-market"
    - "IRMI glossary, 'capacity', sha256:a21b8c9f170b484498d12e8c2f5152feb16596960b298365c36d227ee54b91bd — https://www.irmi.com/term/insurance-definitions/capacity"
    - "Myers, Reinsurance Overview (NAMIC Directors' Education, 9 May 2017), slides pp.6–17 (functions, types, facultative uses, pro rata, per-risk/cat XOL, types of reinsurers, marketing), sha256:c8c7fe0c3bbd0f5d327147142f007ff9d13af260c71da725eb9973a0700121a4 — https://www.namic.org/pdf/reinsuranceRe/17dbc_ReinsuranceOverview.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Cycle.md
---

The **Underwriting Cycle** is the recurring swing of the property-casualty insurance market between a soft market, in which prices fall, [[Underwriting|underwriting]] standards loosen and insurance is easy to buy, and a hard market, in which prices rise, standards tighten and coverage is harder to find. It is one of the main features of the environment an insurer's [[Business Strategy|strategy]] has to allow for.

The cycle is usually traced through the industry's [[Combined Ratio|combined ratio]], which climbs while prices are soft and falls after they harden. The combined ratio in year $t$ is

> $$\text{CR}_t = \text{LR}_t + \text{ER}_t$$

- $\text{LR}_t$ is the [[Loss Ratio|loss and LAE ratio]].
- $\text{ER}_t$ is the [[Expense Ratio|expense ratio]].

The cycle in prices runs alongside a cycle in surplus. Capacity is the premium volume an insurer's policyholders' surplus ([[Capital and Surplus]]) can support, so in year $t$ it is

> $$\text{Capacity}_t = k \times \text{Surplus}_t$$

- $k$ is the largest premium-to-surplus ratio the insurer, its regulators and the rating agencies will accept.

Surplus grows with net income, after underwriting results and [[Investment Income|investment income]], and with new capital. It falls with losses.

> [!example]- How much premium can this insurer support after the hurricane, and what are its options? {Example}
> An insurer has policyholders' surplus of \$500 million and writes \$1,200 million of premium a year. Its board, with an illustrative ceiling, will not let written premium exceed 3 times surplus. A hurricane costs the insurer \$150 million of surplus.
>
> > [!answer]-
> > - Surplus after the hurricane is $500 - 150 = \$350$ million, so capacity is $3 \times 350 = \$1{,}050$ million.
> > - Before the hurricane the insurer wrote at 2.4 times surplus. The same book would now run at about 3.4 times, above its ceiling.
> > - It must shrink its book by $(1{,}200 - 1{,}050)/1{,}200 = 12.5\%$, raise $1{,}200/3 - 350 = \$50$ million of new capital, or buy [[Reinsurance|reinsurance]] that frees capacity.
> > - When many insurers face the same choice after the same event, the industry's capacity falls together, prices rise, and the market hardens.

## Soft and hard markets

| | Soft market | Hard market |
| :--- | :--- | :--- |
| Prices | Fall, often to inadequate levels | Rise |
| Coverage and standards | Broader coverage, higher limits, accounts accepted that would otherwise be declined | Restricted coverage, tighter standards, withdrawal from unprofitable lines or territories |
| Capacity | Plentiful | Scarce |
| Combined ratio | Rises as business written at inadequate prices is earned and its losses develop | Falls as the higher rates are earned |

A soft market is the buyer's market and a hard market the seller's. In a soft market insurers compete for market share by cutting rates, and buyers can choose among insurers. A hard market follows when underwriting losses have eaten into surplus, and some buyers struggle to find coverage at any price. Hard-market profits rebuild surplus, and high returns attract new capital, both from existing insurers and from new entrants. The extra capacity leads insurers to compete on price again, which starts the next soft phase.

The cycle has no reliable length or amplitude, and its turning points can't be predicted from the calendar.

> [!example]- Which years are soft and which hard, and why does the combined ratio peak in Year 5? {Example}
> An illustrative market shows these average rate changes and combined ratios. The investment income ratio is 9%.
>
> | Year | Rate change | Combined ratio |
> | ---: | ---: | ---: |
> | 1 | -2% | 96% |
> | 2 | -4% | 99% |
> | 3 | -5% | 103% |
> | 4 | -3% | 108% |
> | 5 | +8% | 111% |
> | 6 | +12% | 104% |
> | 7 | +6% | 97% |
> | 8 | +1% | 94% |
>
> > [!answer]-
> > - Years 1 to 4 are the soft phase: rates fall each year and the combined ratio rises.
> > - Years 5 to 7 are the hard phase, with large rate increases. Year 8 shows prices flattening as the market moves toward the next soft phase.
> > - The combined ratio peaks in Year 5, after rates have started to rise, because premium is earned over the policy term. Year 5's earned premium still comes largely from policies written at Year 4's prices, and losses on the soft years keep developing.
> > - In Year 4 the operating ratio is $108\% - 9\% = 99\%$, a small operating profit, which is why prices can keep falling even at a combined ratio of 108%.

## Causes of the cycle

Internal explanations come from how the industry works:

- Rates are set from past experience, so prices lag the losses they are meant to cover, and loss reserves on recent years are estimated before their losses are known.
- Competition for market share pushes prices down while results look good.
- The supply of capacity rises and falls with surplus.

These features feed on each other and make the market overshoot in both directions.

External explanations come from outside the industry. A [[Catastrophe Loss|catastrophe]], a change in the legal environment, inflation or a fall in the financial markets can cut surplus suddenly and harden the market. Interest rates matter as well. When investment yields are high, insurers accept higher combined ratios because investment income covers the underwriting loss, a practice called cash flow underwriting, and that prolongs a soft market.

## Effects on insurers and buyers

An insurer that keeps its underwriting discipline in a soft market loses volume to competitors but avoids writing business at a loss, and it has the surplus to grow when prices harden. Buyers face shifting availability and affordability, and in a severe hard market some turn to [[Self-Insured Retention|self-insurance]], captives or the [[Excess and Surplus Lines|surplus lines]] market.

For an actuary, experience periods that span a turn in the cycle mix business written under different prices and standards. [[Underwriting Changes|Changes in underwriting]] shift the mix of risks and distort trends and development, and soft-market years are often the ones whose reserves later prove inadequate ([[Reserve Adequacy]]).

> [!trap] Putting the worst combined ratio at the lowest prices
> Combined ratios peak after prices begin to rise, because earned premium lags written premium and soft-market losses develop late. An answer that places the peak combined ratio in the year of the lowest rates gets the timing wrong.
