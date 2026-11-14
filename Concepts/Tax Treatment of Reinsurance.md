---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c86a18e2f4fdf31cbe72bc34391df740e2f47f05dd33ebfdccab3612cbb322a8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tax Treatment of Reinsurance.md
---
**Tax Treatment of Reinsurance** is how cessions, recoveries and commutations flow into a U.S. P&C insurer's federal taxable income. The tax computation starts from the annual statement ([[Insurance Income Tax]]), so reinsurance generally follows its statutory treatment: ceded premium reduces premium, and recoveries reduce losses incurred.

Unpaid losses enter taxable income at their **discounted** tax value, so the tax result of a reinsurance transaction can differ sharply from its statutory result. A **[[Commutations|commutation]]** shows it most. When a cedant and reinsurer commute for a given price, the change in the cedant's taxable income is

> $$\Delta\text{Taxable income}_{\text{cedant}} = \text{Price} - d_c \times \text{Recoverable}$$

- $\text{Price}$ is the cash the reinsurer pays the cedant.
- $\text{Recoverable}$ is the cedant's undiscounted recoverable on the commuted business.
- $d_c$ is the cedant's §846 discount factor on the commuted reserves ([[Loss Reserve Discounting]]).

The change in the reinsurer's taxable income is

> $$\Delta\text{Taxable income}_{\text{reinsurer}} = d_r \times \text{Reserve} - \text{Price}$$

- $\text{Reserve}$ is the reinsurer's undiscounted reserve for the same claims.
- $d_r$ is the reinsurer's §846 discount factor on those reserves.

The statutory result uses the same formulas with $d = 1$. A commutation priced near present value therefore produces a statutory loss for the cedant and a statutory gain for the reinsurer far larger than their taxable counterparts.

> [!example]- What is each party's statutory and taxable result on this commutation? {Example}
> A cedant carries a $\$500$ recoverable (undiscounted) on the commuted business, and the reinsurer carries a $\$550$ reserve for the same claims. They commute for $\$400$. The cedant's §846 discount factor on these reserves is $0.875$, and the reinsurer's, on its non-proportional assumed line, is $0.85$.
>
> > [!answer]-
> > - The cedant's statutory result is $400 - 500 = -100$.
> > - The reinsurer's statutory result is $550 - 400 = 150$.
> > - The cedant's taxable result is $400 - 0.875 \times 500 = 400 - 437.5 = -37.5$.
> > - The reinsurer's taxable result is $0.85 \times 550 - 400 = 467.5 - 400 = 67.5$.

## Statutory accounting of a commutation

Under SSAP No. 62R the cedant eliminates the recoverable and records the cash received as a negative paid loss. The reinsurer eliminates a reserve carried at ultimate for a payment made at present value. Both book the difference in underwriting income. Commuted balances are written off through the schedules where they were recorded, which distorts both parties' [[Schedule P]] triangles.

## Why the two discount factors differ

IRS discount factors vary by line and accident year. A cedant carries ceded excess-of-loss reserves under the underlying line, while the reinsurer reports them as non-proportional assumed reinsurance, which has its own payment pattern. Even an agreed price therefore gives asymmetric tax results. Since the 2017 TCJA both parties must use the IRS patterns.

## Current and deferred tax

Total tax expense, current plus deferred, equals the tax rate times the book gain or loss. Discounting decides only how much is current and how much is a change in the **deferred tax asset** on the reserve discount. Under SAP the deferred part goes directly to surplus and must pass the admissibility test.

> [!example]- With both parties taxed at $21\%$, how does the commutation above split into current and deferred tax? {Example}
> - The cedant's current tax falls by $0.21 \times 37.5 = 7.875$.
> - The cedant's net reserves rise by the $\$500$ it takes back, of which the tax basis recognises $\$437.5$, so its deferred tax asset rises by $0.21 \times 62.5 = 13.125$.
> - The cedant's total benefit is $7.875 + 13.125 = 21.0$, which is $0.21 \times 100$.
> - The reinsurer's current tax rises by $0.21 \times 67.5 = 14.175$.
> - The deferred tax asset on the reinsurer's $\$82.5$ discount reverses by $0.21 \times 82.5 = 17.325$.
> - The reinsurer's total tax expense is $14.175 + 17.325 = 31.5$, which is $0.21 \times 150$.

## Other tax rules for reinsurance

Ceded unearned premium reduces the net UPR on which the $20\%$ revenue offset is computed. A $1\%$ federal excise tax applies to reinsurance premiums paid to foreign reinsurers unless an exemption applies. Under §845 the IRS may reallocate items under reinsurance between related parties, or under any contract with a significant tax avoidance effect. For large groups, the base erosion and anti-abuse tax (BEAT) can reach reinsurance premiums ceded to foreign affiliates.

> [!example]- What tax and statutory issues does this cession to an offshore affiliate raise? {Example}
> A U.S. insurer proposes a $50\%$ quota share of its book to a Bermuda affiliate that is not engaged in a U.S. trade or business, with a ceding commission well above the insurer's acquisition costs.
>
> > [!answer]-
> > - The federal excise tax applies at $1\%$ of the ceded premium, unless an exemption applies.
> > - If the group is large enough, the premiums are base erosion payments to a foreign related party under BEAT.
> > - The parties are related, so under §845(a) the IRS may reallocate income and deductions if the premium and commission do not reflect the risk actually transferred.
> > - Under SSAP No. 62R the commission in excess of anticipated acquisition cost must be set up as a liability and amortised over the contract, not taken into surplus at once.
> > - Unless the affiliate is an authorised, certified or reciprocal-jurisdiction reinsurer, credit for the cession depends on collateral, and any unsecured amount drives the provision for reinsurance in [[Schedule F]].
> > - The contract must also pass [[Insurance Accounting|risk transfer]] like any other.

> [!trap] Taking the statutory result as the taxable result
> On a commutation the statutory result compares the price with undiscounted reserves, but taxable income compares it with discounted ones. In the example above the cedant books a $\$100$ statutory loss and only a $\$37.5$ taxable loss, so each side should negotiate on an after-tax basis.
