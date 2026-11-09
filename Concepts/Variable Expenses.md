---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:d95b70f3516680c80811a61b49bb20d1b9f537acdbb78134350ae5536cae08bf
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp.125-135 (PDF pp.137-147), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.9 (PDF p.21), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variable Expenses.md
---

![[Media/Figures/Variable_Expenses.svg|340]]

**Variable Expenses** are underwriting expenses that vary directly with premium, so that each is a constant percentage of premium. Premium taxes and commissions are the standard examples. The variable expense provision of an expense category is

> $$V = \frac{\text{Variable Expenses}}{\text{Premium}}$$

- $\text{Variable Expenses}$ are the category's calendar year expenses times one minus its percentage assumed fixed.
- $\text{Premium}$ is the [[Written Premium|written premium]] for expenses incurred when the policy is written (commissions, other acquisition, taxes, licenses and fees) and the [[Earned Premium|earned premium]] for expenses incurred as coverage is provided (general expenses).

The provision is a ratio to premium, not to exposures, in every expense projection method. The categories' provisions are summed into the total variable expense provision $V$. Mixing the denominators misstates the provision in a growing or shrinking book.

> [!example]- An insurer's commissions are $15\%$ of written premium, premium taxes $2\%$ and other variable acquisition costs $3\%$. What is its variable expense provision? {Example}
> - The three expenses are all variable, and each is already a ratio to written premium.
> - The variable expense provision is $V = 15\% + 2\% + 3\% = 20\%$.

## Variable expenses in the indicated rate

Variable expenses are a share of the rate being solved for, so they enter the denominator of the indicated rate with the target profit provision:

> $$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

- $F$ is the [[Fixed Expenses|fixed expense]] per exposure.
- $Q_T$ is the target [[Profit and Contingency Provision|profit provision]], as a share of premium.

Dividing by $1 - V - Q_T$ grosses up the rate, so the variable expenses are $V$ of the final rate. Adding $V$ to the costs instead under-recovers them. A fixed expense fee is grossed up the same way, $F/(1 - V - Q_T)$, so that it also carries the variable expenses and profit on the premium it brings in.

> [!example]- With $V = 20\%$, a projected pure premium of $\$300$, fixed expenses of $\$40$ per exposure and a target profit provision of $5\%$, what is the indicated rate, and what does adding the $25\%$ instead give? {Example}
> - The indicated rate is $340/0.75 = \$453.33$.
> - It holds $0.20 \times 453.33 = \$90.67$ of variable expenses and $\$22.67$ of profit, leaving $\$340$ for losses and fixed expenses.
> - Adding $25\%$ instead gives $340 \times 1.25 = \$425$.
> - Of the $\$425$, variable expenses and profit take $\$106.25$, leaving $\$318.75$ for a $\$340$ obligation.

## Variable expenses by line and channel

The size and make-up of $V$ vary by line and by company. Commissions tend to be much higher in lines that need a comprehensive inspection at the onset of the policy, such as large commercial property, than in lines that do not, such as personal auto. Within a line, an agency-based company pays higher commissions than a national direct writer, which spends more on other acquisition costs such as advertising. Commission rates may differ between new and renewal business. Contingent commissions vary the commission with the quality of the business written (a loss ratio) or its amount (predetermined volume goals).

The selected provision is a prospective estimate of what the expenses will be. A structural change in distribution, such as moving business direct, renegotiating commission scales or adding a contingent commission, is reflected prospectively rather than from the historical ratios.

> [!example]- An insurer writes through agents at $17\%$ commission, with premium taxes of $2.5\%$, other variable expenses of $2\%$, fixed expenses of $\$45$ per exposure, a target profit provision of $5\%$ and a pure premium of $\$420$. It will move $40\%$ of its business to a direct channel with no commission but $\$18$ per policy of added fixed cost. What is the indicated rate before and after the move? {Example}
> - Before the move, $V = 17\% + 2.5\% + 2\% = 21.5\%$.
> - The indicated rate before the move is $465/0.735 = \$632.65$.
> - After the move, the commission is $0.60 \times 17\% = 10.2\%$, so $V = 14.7\%$, and the fixed expense rises by $0.40 \times 18 = \$7.20$ to $\$52.20$.
> - The indicated rate after the move is $472.20/0.803 = \$588.04$, a $7.1\%$ decrease.
> - The historical expense ratios still carry the agency commission, so they would overstate $V$ for the projection period.

## Trending variable expenses

Variable expenses are a constant percentage of premium. They change automatically as the premium changes, so the variable expense ratio needs no trend. Only fixed expenses are trended ([[Expense Provisions#Trending expenses|trending expenses]]).
