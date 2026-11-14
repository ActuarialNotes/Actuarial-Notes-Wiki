---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dcda17250c2280d93d5a778161d6bca31979075f0b1e77b1f1d07a4147efaa2c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Target Loss Ratio.md
---
A **Target Loss Ratio** is the loss ratio that, if exactly achieved, produces the desired combined ratio and profit margin. It is the same quantity as the [[Permissible Loss Ratio|permissible loss ratio]], the benchmark the [[Loss Ratio Method|loss ratio method]] judges the adequacy of rates against. With every expense and the profit provision expressed as a proportion of premium, the target loss ratio is

> $$\text{Target LR} = 1 - V - F\% - Q_T$$

- $V$ is the [[Variable Expenses|variable expense]] ratio.
- $F\%$ is the [[Fixed Expenses|fixed expense]] ratio.
- $Q_T$ is the target underwriting [[Profit and Contingency Provision|profit provision]].

The target [[Combined Ratio|combined ratio]], losses plus expenses, is $1 - Q_T$. The target loss ratio is therefore the target combined ratio minus all the expense ratios.

When the projected loss ratio exceeds the target, rates are inadequate. When it falls below, rates are excessive. The indicated change is

> $$\text{Indicated Change} = \frac{\text{Projected LR}}{\text{Target LR}} - 1$$

Its sign is kept: a negative indicated change means the rates should decrease.

> [!example]- Variable expenses are $25\%$, fixed expenses $7\%$ and the profit provision $3\%$. The projected loss ratio is $70\%$. What rate change is indicated? {Example}
> - The target loss ratio is $1 - 0.25 - 0.07 - 0.03 = 65\%$.
> - The indicated change is $0.70/0.65 - 1 = +7.7\%$.
> - Rates must increase about $7.7\%$ to achieve the target loss ratio and the desired profit.
