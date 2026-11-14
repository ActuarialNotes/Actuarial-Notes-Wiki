---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:d3ccd64150e059b06042e001a21037fb8c6954b0566bfcd36bd00e51df6e428d
  sources:
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §G.1–G.4, D pp.10, 14–16, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/BPP Optional Coverages.md
---

The **optional coverages** of the [[Building and Personal Property Coverage Form|BPP]] are the four provisions in section G of ISO CP 00 10 10 12 that apply only when the declarations show them, separately for each item of property. They change the result of the [[BPP Loss Conditions and Additional Conditions|loss conditions and additional conditions]] rather than the property or perils covered.

The four optional coverages are:

1. **Agreed value**, which suspends the coinsurance condition.
2. **Inflation guard**, which raises the limit automatically through the year.
3. **Replacement cost**, which replaces actual cash value as the valuation basis.
4. **Extension of replacement cost to personal property of others**, which extends replacement cost to that property.

> [!idea] The idea
> The first three options answer the [[Insurance to Value|insurance to value]] problem from different directions.

Agreed value removes the penalty, inflation guard keeps the limit moving with values, and replacement cost closes the gap between [[Actual Cash Value|actual cash value]] and the cost to rebuild ([[Replacement Cost|replacement cost]]).

## Agreed value

Under agreed value the coinsurance condition does not apply to the property. Instead, the insurer pays no more than the proportion the limit bears to the agreed value, so a limit equal to the agreed value pays losses in full up to the limit. The reduction is the limit over the agreed value, not the limit over the coinsurance requirement. The amount paid is

> $$\text{Paid}_{\text{AV}} = \min\left(\min\left(\frac{C}{A},\ 1\right) L - D,\ C\right)$$

- $C$ is the limit of insurance.
- $A$ is the agreed value shown in the declarations.
- $L$ is the loss, and $D$ is the deductible.

The option applies only to loss on or after its effective date and before the agreed value expiration date or the policy expiration, whichever comes first. If the expiration date is not extended, coinsurance is reinstated and the option ends, even though the policy is still in force.

> [!example]- What is paid under coinsurance, under agreed value, and under agreed value with a lower limit? {Example}
> A building is insured for $\$1{,}000{,}000$ with a 90% coinsurance percentage and a $\$5{,}000$ deductible. By the time of a $\$300{,}000$ fire loss, construction costs have pushed its value to $\$1{,}400{,}000$. Find the payment (a) under the coinsurance condition, (b) with the agreed value option and an agreed value of $\$1{,}000{,}000$, and (c) with an agreed value of $\$1{,}000{,}000$ but a limit of only $\$800{,}000$.
>
> > [!answer]-
> > - (a) Coinsurance compares the limit with 90% of the value at the time of loss, $0.90 \times 1{,}400{,}000 = \$1{,}260{,}000$.
> > - The reduced loss is $1{,}000{,}000 / 1{,}260{,}000 \times 300{,}000 = \$238{,}095.24$, and the insurer pays $238{,}095.24 - 5{,}000 = \$233{,}095.24$.
> > - (b) Agreed value suspends coinsurance, and the limit equals the agreed value, so the loss is paid in full less the deductible, $\$295{,}000$.
> > - (c) The limit is 80% of the agreed value, so the loss is cut in the same proportion: $0.80 \times 300{,}000 - 5{,}000 = \$235{,}000$.
> > - Agreed value fixes the reduction to what was agreed at the outset, so a rise in value during the year no longer cuts the payment.

## Inflation guard

Under inflation guard the limit increases automatically by the annual percentage shown in the declarations, pro rata by days, from the most recent of the inception, anniversary or limit-changing date. It protects an insured whose replacement costs rise during the year from falling below the coinsurance requirement and from running out of limit. The amount of increase is

> $$\Delta C = C_0 \times g \times \frac{t}{365}$$

- $C_0$ is the limit on the most recent of the inception date, the anniversary date or a change amending the limit.
- $g$ is the annual percentage, written as a decimal.
- $t$ is the number of days since that date.

> [!example]- A $\$2{,}000{,}000$ limit carries a 6% inflation guard. What is the limit 219 days into the policy year? {Example}
> - The increase is $2{,}000{,}000 \times 0.06 \times 219/365 = \$72{,}000$.
> - The limit on day 219 is $2{,}000{,}000 + 72{,}000 = \$2{,}072{,}000$.
> - A loss on that day is subject to a $\$2{,}072{,}000$ limit, and the coinsurance test uses that limit.

## Replacement cost

Under replacement cost, replacement cost without deduction for depreciation replaces actual cash value in the valuation condition. It does not apply to personal property of others, contents of a residence, works of art, antiques or rare articles, or stock unless the declarations show "Including Stock". Tenants' improvements and betterments are not treated as property of others.

The insurer pays nothing on a replacement cost basis until the property is actually repaired or replaced, and only if that is done as soon as reasonably possible. The insured may first settle at actual cash value and still claim the difference later, if it notifies the insurer within 180 days of the loss. The payment is at most

> $$\text{Paid}_{\text{RC}} \leq \min\big(C,\ \text{RC}_{\text{comparable}},\ \text{Spent}\big)$$

- $\text{RC}_{\text{comparable}}$ is the cost to replace with property of comparable material and quality used for the same purpose.
- $\text{Spent}$ is the amount actually and necessarily spent to repair or replace.

A building rebuilt elsewhere is paid no more than rebuilding at the original premises would cost. The increased cost of complying with an ordinance or law is excluded from the cost of repair, and is paid only through the [[BPP Additional Coverages and Coverage Extensions|increased cost of construction additional coverage]], which itself requires this option.

> [!example]- What is paid before and after this store is rebuilt? {Example}
> A store's building limit is $\$500{,}000$ with replacement cost, a $\$2{,}500$ deductible and coinsurance met. A fire damages it, and the actual cash value of the damage is $\$300{,}000$. Replacing the damaged part with comparable material for the same use would cost $\$420{,}000$, but the owner rebuilds with upgraded finishes and spends $\$445{,}000$.
>
> > [!answer]-
> > - Until the building is rebuilt, the insurer pays on an actual cash value basis, $300{,}000 - 2{,}500 = \$297{,}500$.
> > - Once it is rebuilt, replacement cost is the least of the limit, the comparable cost and the amount spent, $\min(500{,}000,\ 420{,}000,\ 445{,}000) = \$420{,}000$.
> > - The insurer pays $420{,}000 - 2{,}500 = \$417{,}500$ in all, a further $\$120{,}000$ when the work is done.
> > - The $\$25{,}000$ spent on upgrades is the owner's.

## Extension of replacement cost to personal property of others

This option is shown only alongside replacement cost. It removes the exclusion of personal property of others, so that property is valued at replacement cost too. If a written contract governs the insured's liability for an item, it is valued at the amount the insured is liable for under the contract, but no more than the lesser of its replacement cost and the limit.

> [!trap] Applying the full inflation guard percentage from day one
> The increase accrues by days through the year from the last inception, anniversary or limit change. It is not the full annual percentage from day one. Halfway through the year, a 6% inflation guard has raised the limit by 3%.
