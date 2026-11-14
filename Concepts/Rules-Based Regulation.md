---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:31d22d66c36852f2d32c898c41f17cd9148da8424cbe5dc2bb66259c351e745a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rules-Based Regulation.md
---

**Rules-Based Regulation** prescribes *how* a regulated firm must comply, through specific formulas, factors, limits and procedures, and judges compliance by whether the rules were followed rather than by whether a stated outcome was achieved. In [[Solvency Regulation|solvency regulation]] it takes the form of prescribed capital formulas, fixed thresholds and eligibility rules. Its counterpart is [[Principles-Based Regulation]].

A capital requirement written as a prescribed factor formula is

> $$\text{Required capital} = \sum_i f_i \times E_i$$

- $E_i$ is an exposure measure, such as claim liabilities or premium by class of business, or asset values by type and credit rating.
- $f_i$ is a factor fixed by the regulator, the same for every firm.

The [[MCT]]'s risk margins are built this way, as are the U.S. [[Risk-Based Capital|RBC]] formula and the old EU Solvency I margin, which was a fixed percentage of premiums or claims.

> [!example]- How much capital does this formula require of insurers A and B, and does it measure their risk? {Example}
> A regulator's formula (factors illustrative) charges $15\%$ of net claim liabilities and $10\%$ of net written premium. Insurers A and B each carry $\$400$ million of claim liabilities and write $\$300$ million of premium. A's liabilities are spread over $2{,}000$ commercial accounts. Of B's, $40\%$ arise from one industrial client, and B's reinsurance is placed with a single reinsurer.
>
> > [!answer]-
> > - Each insurer's requirement is $0.15 \times 400 + 0.10 \times 300 = \$90$ million.
> > - The figure is objective and comparable, but it cannot see that B's losses depend on one account and its recoveries on one counterparty.
> > - B's true capital need is higher than A's.
> > - B's [[ORSA]] should identify the [[Concentration Risk|concentration]] and set an internal target well above A's, and its [[FCT]] should include the failure of that client or reinsurer as an adverse scenario. OSFI can challenge a target that ignores it.

## Rules-based elements of the Canadian framework

The rules-based elements of Canadian solvency regulation include the MCT's prescribed factors, the $1.5$ divisor that turns [[Capital Required]] at the target level into minimum capital required, the $100\%$ minimum and $150\%$ [[Supervisory Target Capital Ratio|supervisory target]], the [[Earthquake Exposure Risk Margin]] calculation, and the [[Registered Reinsurance|registration]] and collateral rules that decide whether ceded liabilities earn capital credit.

## Advantages and disadvantages

Rules-based regulation is objective and comparable across insurers, transparent and predictable, and cheap to administer and to audit. It is enforceable, because a breach is a fact rather than a judgement, and it resists inconsistency between supervisors.

Its disadvantages are:

- One size fits no one exactly.
- A risk the formula omits, such as [[Concentration Risk|concentration]], [[Climate Risk|climate]] or reserve quality, attracts no capital.
- Firms can satisfy the letter of a rule while defeating its purpose (regulatory arbitrage).
- Rules lag product innovation.
- Compliance can replace risk management as the goal.

> [!example]- An insurer moves $\$200$ million of bonds from the top of the BBB category (yield $5.0\%$) to the bottom (yield $5.6\%$). What happens to its income, capital required and risk? {Example}
> - The capital formula applies the same credit-risk factor to every bond within a rating category.
> - Income rises by $200 \times (0.056 - 0.050) = \$1.2$ million a year.
> - Capital required is unchanged, because the factor depends only on the category.
> - Default risk has risen, and one further downgrade drops the whole block into a category with a much larger charge, a cliff the formula did not price.
> - The insurer has complied with every rule and taken more risk than the rule assumed. The remedies are [[Risk Appetite|risk appetite]] limits, ORSA and supervisory judgement about investment strategy.

## Rules and principles combined

Canada combines both approaches deliberately. The rules-based MCT supplies a comparable floor, and [[ORSA]], the [[Internal Target Capital Ratio|internal target]] and [[FCT]] ask the principles-based question of whether that floor is enough for *this* insurer. [[Solvency II]] does the same with its standard formula, approved internal models and own-risk assessment.
