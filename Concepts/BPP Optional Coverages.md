---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8f23247efe3aae8d7b367e70982f751c5074d8c84c365757ea707a7dda012531
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/BPP Optional Coverages.md
---

**The optional coverages** of the [[Building and Personal Property Coverage Form|BPP]] are four provisions that apply only when the declarations show them, separately for each item of property: agreed value, which suspends the coinsurance condition; inflation guard, which raises the limit automatically through the year; replacement cost, which replaces actual cash value as the valuation basis; and the extension of replacement cost to personal property of others. They are section G of ISO CP 00 10 10 12, and they change the result of the [[BPP Loss Conditions and Additional Conditions|loss conditions and additional conditions]] rather than the property or perils covered.

> $$\text{Paid}_{\text{AV}} = \min\left(\min\left(\frac{C}{A},\ 1\right) L - D,\ C\right)$$

> $$\Delta C = C_0 \times g \times \frac{t}{365}$$

> $$\text{Paid}_{\text{RC}} \leq \min\big(C,\ \text{RC}_{\text{comparable}},\ \text{Spent}\big)$$

- **Symbols:** $C$ is the limit of insurance, $A$ the agreed value shown in the declarations, $L$ the loss and $D$ the deductible. For inflation guard, $C_0$ is the limit on the most recent of the inception date, the anniversary date or a change amending the limit, $g$ the annual percentage shown as a decimal and $t$ the days since that date. In the last block, $\text{RC}_{\text{comparable}}$ is the cost to replace with property of comparable material and quality used for the same purpose, and Spent is the amount actually and necessarily spent to repair or replace.
- **Agreed value:** The coinsurance condition does not apply to the property. Instead, the insurer pays no more than the proportion the limit bears to the agreed value, so a limit equal to the agreed value pays losses in full up to the limit. The option applies only to loss on or after its effective date and before the agreed value expiration date or the policy expiration, whichever comes first. If the expiration date is not extended, coinsurance is reinstated and the option ends.
- **Inflation guard:** The limit increases automatically by the annual percentage shown in the declarations, pro rata by days, from the most recent of the inception, anniversary or limit-changing date. It protects an insured whose replacement costs rise during the year from falling below the coinsurance requirement and from running out of limit.
- **Replacement cost:** Replacement cost without deduction for depreciation replaces actual cash value in the valuation condition. It does not apply to personal property of others, contents of a residence, works of art, antiques or rare articles, or stock unless the declarations show "Including Stock"; tenants' improvements and betterments are not treated as property of others. The insured may first settle at actual cash value and still claim the difference later, if it notifies the insurer within 180 days of the loss. The insurer pays nothing on a replacement cost basis until the property is actually repaired or replaced, and only if that is done as soon as reasonably possible. Payment is the least of the limit, the cost to replace with comparable property for the same purpose, and the amount actually spent; a building rebuilt elsewhere is paid no more than rebuilding at the original premises would cost. The increased cost of complying with an ordinance or law is excluded from the cost of repair, and is paid only through the [[BPP Additional Coverages and Coverage Extensions|increased cost of construction additional coverage]], which itself requires this option.
- **Extension of replacement cost to personal property of others:** Shown only alongside replacement cost, it removes the exclusion of personal property of others, so that property is valued at replacement cost too. If a written contract governs the insured's liability for an item, it is valued at the amount the insured is liable for under the contract, but no more than the lesser of its replacement cost and the limit.
- **Why they matter:** The three main options answer the [[Insurance to Value|insurance to value]] problem from different directions. Agreed value removes the penalty, inflation guard keeps the limit moving with values, and replacement cost closes the gap between [[Actual Cash Value|actual cash value]] and the cost to rebuild ([[Replacement Cost]]).

> [!example]- Agreed Value Against Coinsurance {Example}
> A building is insured for \$1,000,000 with a 90% coinsurance percentage and a \$5,000 deductible. By the time of a \$300,000 fire loss, construction costs have pushed its value to \$1,400,000. Find the payment (a) under the coinsurance condition, (b) with the agreed value option and an agreed value of \$1,000,000, and (c) with an agreed value of \$1,000,000 but a limit of only \$800,000.
>
> > [!answer]-
> > (a) Coinsurance compares the limit with 90% of the value at the time of loss.
> > $$
> > \begin{align*}
> > R &= \frac{1{,}000{,}000}{0.90 \times 1{,}400{,}000} \\
> > &= \frac{1{,}000{,}000}{1{,}260{,}000} \\
> > R \times 300{,}000 &= 238{,}095.24 \\
> > \text{Paid} &= 238{,}095.24 - 5{,}000 \\
> > &= 233{,}095.24
> > \end{align*}
> > $$
> > (b) Agreed value suspends coinsurance, and the limit equals the agreed value, so the loss is paid in full less the deductible: \$295,000.
> > (c) The limit is 80% of the agreed value, so the loss is cut in the same proportion.
> > $$
> > \begin{align*}
> > \text{Paid} &= 0.80 \times 300{,}000 - 5{,}000 \\
> > &= 235{,}000
> > \end{align*}
> > $$
> > Agreed value fixes the reduction to what was agreed at the outset, so a rise in value during the year no longer cuts the payment.

> [!example]- Inflation Guard in the Form's Style {Example}
> The applicable limit of insurance is \$2,000,000, the annual percentage increase is 6%, and 219 days have passed since the start of the policy year. Find the amount of increase and the limit on that day.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \Delta C &= 2{,}000{,}000 \times 0.06 \times \frac{219}{365} \\
> > &= 72{,}000 \\
> > C_{219} &= 2{,}072{,}000
> > \end{align*}
> > $$
> > A loss on day 219 is subject to a \$2,072,000 limit, and the coinsurance test uses that limit.

> [!example]- Replacement Cost: The Least of Three {Example}
> A store's building limit is \$500,000 with replacement cost. A fire destroys part of it. Replacing the damaged part with comparable material for the same use would cost \$420,000, but the owner rebuilds with upgraded finishes and spends \$445,000. The deductible is \$2,500, and coinsurance is met. Before rebuilding, the actual cash value of the damage was \$300,000. What is paid before and after rebuilding?
>
> > [!answer]-
> > Until the building is rebuilt, the insurer pays on an actual cash value basis: $300{,}000 - 2{,}500 = 297{,}500$. Once rebuilt, replacement cost is the least of the limit, the comparable cost and the amount spent.
> > $$
> > \begin{align*}
> > \text{RC} &= \min(500{,}000,\ 420{,}000,\ 445{,}000) \\
> > &= 420{,}000 \\
> > \text{Paid} &= 420{,}000 - 2{,}500 \\
> > &= 417{,}500
> > \end{align*}
> > $$
> > The insurer pays a further \$120,000 when the work is done. The \$25,000 spent on upgrades is the owner's.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is applying the BPP optional coverages. Questions ask how agreed value, inflation guard or replacement cost changes a payment, when replacement cost is paid, and which property replacement cost does not apply to.
> - **With other conditions:** Agreed value questions pair with the coinsurance calculation; replacement cost questions pair with the valuation condition and the increased cost of construction additional coverage.

> [!warning]- Exam traps
> - **Agreed value replaces coinsurance, it does not add to it:** Under agreed value the reduction is the limit over the agreed value, not the limit over the coinsurance requirement.
> - **Agreed value expires:** After the agreed value expiration date, coinsurance is reinstated even though the policy is still in force.
> - **Replacement cost is paid after rebuilding:** Until the property is repaired or replaced, the insured receives actual cash value.
> - **Stock and property of others:** Replacement cost does not apply to stock unless "Including Stock" is shown, or to personal property of others unless the extension is shown.
> - **Inflation guard is pro rata:** The increase accrues by days through the year from the last inception, anniversary or limit change; it is not the full annual percentage from day one.
