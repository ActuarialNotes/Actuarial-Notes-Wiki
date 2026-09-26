---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:961b4cb715df23873089197c5a4a685237a13b3112ee47cb74ff1dc0dcc09a84
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rules-Based Regulation.md
---

**Rules-Based Regulation** prescribes *how* a regulated firm must comply — specific formulas, factors, limits and procedures — and judges compliance by whether the rules were followed, rather than by whether a stated outcome was achieved. In [[Solvency Regulation|solvency regulation]] it takes the form of prescribed capital formulas, fixed thresholds and eligibility rules; its counterpart is [[Principles-Based Regulation]].

> $$\text{Required capital} = \sum_i f_i \times E_i$$

- **The factor formula.** $E_i$ is an exposure measure (claim liabilities or premium by class of business, asset values by type and credit rating) and $f_i$ a factor fixed by the regulator for every firm alike. The [[MCT]]'s risk margins are built this way, as are the U.S. [[Risk-Based Capital|RBC]] formula and the old EU Solvency I margin, which was a fixed percentage of premiums or claims.
- **Canadian rules-based elements:** the MCT's prescribed factors, the $1.5$ multiplier that turns [[Capital Required]] into the [[Base Solvency Buffer]], the $100\%$ minimum and $150\%$ [[Supervisory Target Capital Ratio|supervisory target]], the [[Earthquake Exposure Risk Margin]] calculation, and the [[Registered Reinsurance|registration]] and collateral rules that decide whether ceded liabilities earn capital credit.
- **Advantages:** objective and comparable across insurers; transparent and predictable; cheap to administer and to audit; enforceable, because a breach is a fact rather than a judgement; and resistant to inconsistency between supervisors.
- **Disadvantages:** one size fits no one exactly; a risk the formula omits — [[Concentration Risk|concentration]], [[Climate Risk|climate]], reserve quality — attracts no capital; firms can satisfy the letter while defeating the purpose (regulatory arbitrage); rules lag product innovation; and compliance can replace risk management as the goal.
- **Canada combines both deliberately.** The rules-based MCT supplies a comparable floor; [[ORSA]], the [[Internal Target Capital Ratio|internal target]] and [[FCT]] ask the principles-based question of whether that floor is enough for *this* insurer. [[Solvency II]] does the same with its standard formula, approved internal models and own-risk assessment.

> [!example]- Same Formula, Different Risk {Example}
> A regulator's formula (factors illustrative) charges $15\%$ of net claim liabilities and $10\%$ of net written premium. Insurers A and B each carry $\$400$ million of claim liabilities and write $\$300$ million of premium. A's liabilities are spread over $2{,}000$ commercial accounts; $40\%$ of B's arise from one industrial client, and B's reinsurance is placed with a single reinsurer. Compute the requirement and evaluate it.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Required} &= 0.15 \times 400 + 0.10 \times 300 \\
> > &= 60 + 30 \\
> > &= \$90\text{M}
> > \end{align*}
> > $$
> >
> > Both insurers need $\$90$ million. The rule is doing its job — the figure is objective and comparable — but it cannot see that B's losses depend on one account and its recoveries on one counterparty. B's true capital need is higher.
> >
> > The gap is closed by the principles-based layer: B's [[ORSA]] should identify the [[Concentration Risk|concentration]] and set an internal target well above A's, its [[FCT]] should include the failure of that client or reinsurer as an adverse scenario, and OSFI can challenge a target that ignores it. The rule sets the floor; the principles decide how far above it this insurer must stand.

> [!example]- Gaming a Rating Bucket {Example}
> A capital formula applies the same credit-risk factor to every bond within a rating category. An insurer moves $\$200$ million of bonds from the top of the BBB category (yield $5.0\%$) to the bottom (yield $5.6\%$). What happens to income, capital required and risk?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \Delta\,\text{Income} &= 200 \times (0.056 - 0.050) \\
> > &= \$1.2\text{M per year}
> > \end{align*}
> > $$
> >
> > Capital required is **unchanged** — the factor depends only on the category — while default risk has risen, and one further downgrade drops the whole block into a category with a much larger charge, a cliff the formula did not price. The insurer has complied with every rule and taken more risk than the rule assumed.
> >
> > This is the characteristic weakness of rules-based regulation: it rewards optimising *to* the rule. The remedies are principles-based — [[Risk Appetite|risk appetite]] limits, ORSA, and supervisory judgement about investment strategy — which is why no modern solvency regime relies on the formula alone.
