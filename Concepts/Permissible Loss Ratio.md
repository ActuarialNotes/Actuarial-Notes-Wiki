---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:a061d34528031c318a7eb095f01e7c83d193bdc0ba713602be6ec48f0812e4d5
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p.94 (PDF p.106); Ch. 7 pp.129-130, 137, 139 (PDF pp.141-142, 149, 151); Ch. 8 p.143 (PDF p.155), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Permissible Loss Ratio.md
---

![[Media/Figures/Permissible_Loss_Ratio.svg|340]]

A **Permissible Loss Ratio** (PLR, or target loss ratio) is the share of each premium dollar intended to pay for the projected losses and LAE, once the [[Expense Provisions|expense provisions]] and the profit provision have been taken out. It is the benchmark against which a projected loss ratio is judged in the [[Loss Ratio Method|loss ratio method]]. With LAE included in losses and every expense treated as variable, the permissible loss ratio is

> $$\text{PLR} = 1 - V - Q_T$$

- $V$ is the [[Variable Expenses|variable expense]] provision, the total expense ratio when every expense is variable.
- $Q_T$ is the target [[Profit and Contingency Provision|underwriting profit and contingencies provision]].

This is the fundamental insurance equation in ratio form. A negative profit provision raises the PLR. The indicated change is then the projected loss and LAE ratio divided by the PLR, less one, and its sign is kept: a negative result means the rates should decrease.

> [!example]- An insurer's variable expenses are $25\%$ of premium and its target profit provision is $5\%$. Its projected loss and LAE ratio is $71.5\%$. What are the PLR and the indicated change? {Example}
> - The permissible loss ratio is $1 - 0.25 - 0.05 = 70.0\%$.
> - The indicated change is $0.715/0.700 - 1 = +2.1\%$.
> - The rates are inadequate by $2.1\%$, although the loss ratio is well below $100\%$.

## Total and variable permissible loss ratios

When fixed expenses are separated, Werner & Modlin define two permissible loss ratios. The total permissible loss ratio pays for losses and LAE alone, and it is

> $$\text{PLR} = 1 - F\% - V - Q_T$$

- $F\%$ is the [[Fixed Expenses|fixed expense]] ratio.

$F\% + V$ is the total underwriting expense ratio. The variable permissible loss ratio pays for losses, LAE and fixed expenses, and it is

> $$\text{VPLR} = 1 - V - Q_T$$

The two are equal when all expenses are treated as variable. With fixed expenses separated, the projected loss and LAE ratio plus the fixed expense ratio is compared to the VPLR:

> $$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$

Fixed expenses are added to the loss ratio in the numerator because they do not scale with the rate being solved for. If LAE is treated as an operating expense rather than with losses, the operating expense ratio is subtracted in place of the underwriting expense ratio.

> [!example]- Variable expenses are $22\%$ of premium, fixed expenses $8\%$ and the target profit provision $5\%$. The projected loss and LAE ratio is $60\%$. What do the two forms indicate, and what does counting the fixed expenses twice give? {Example}
> - The VPLR is $1 - 0.22 - 0.05 = 0.73$, and the change is $0.68/0.73 - 1 = -6.8\%$.
> - The total PLR is $1 - 0.22 - 0.08 - 0.05 = 0.65$, and the all-variable change is $0.60/0.65 - 1 = -7.7\%$.
> - The two differ because the fixed expense ratio was measured at the current premium level and the all-variable form lets it move with the rate.
> - Counting the fixed expenses in the numerator and the PLR gives $0.68/0.65 - 1 = +4.6\%$, which flips the sign of the answer.

## Permissible loss ratio and expense structure

A higher variable expense ratio lowers the PLR and leaves less room for losses. An insurer with cheap distribution can run a higher loss ratio profitably, so a loss ratio says nothing about pricing adequacy without the expense structure behind it.

> [!example]- Three books each have a projected loss and LAE ratio of $68\%$ and a target profit provision of $5\%$. An independent agency book has variable expenses of $27\%$ and a fixed expense ratio of $9\%$, a captive agency book $20\%$ and $11\%$, and a direct book $9\%$ and $16\%$. Which are adequately priced? {Example}
> - The agency book's indicated change is $0.77/0.68 - 1 = +13.2\%$.
> - The captive agency book's is $0.79/0.75 - 1 = +5.3\%$.
> - The direct book's is $0.84/0.86 - 1 = -2.3\%$.
> - Only the direct book is adequately priced, on the same loss ratio as the other two.

## Permissible loss ratio in a premium

The same denominator turns an expected loss into a premium. Every load that is a percentage of premium, such as commissions, taxes, risk and profit loads, is in the denominator, and the premium is

> $$\text{Premium} = \frac{\text{Expected Loss and LAE} + \text{Fixed Expenses}}{1 - \text{Variable Loads}}$$

- $\text{Variable Loads}$ is the sum of every load expressed as a percentage of premium.

The profit provision is a margin sized for an average risk. Writing below-average risks at an average rate erodes it rather than being absorbed by it.

> [!trap] Counting fixed expenses twice
> Fixed expenses go either in the numerator, with the VPLR in the denominator, or in the total PLR, never both. Adding $F\%$ to the loss ratio and also subtracting it in the denominator overstates the indication, as the $+4.6\%$ against $-6.8\%$ above shows.
