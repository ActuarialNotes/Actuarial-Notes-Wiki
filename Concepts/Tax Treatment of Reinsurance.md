---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bbcba568881e2c0b2edebac8ff8c2bd7e35cc2de92942d323141451d550b99b9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tax Treatment of Reinsurance.md
---

**The Tax Treatment of Reinsurance** is how cessions, recoveries and commutations flow into a U.S. P&C insurer's federal taxable income. Because the tax computation starts from the annual statement ([[Insurance Income Tax]]), reinsurance generally follows its statutory treatment — ceded premium reduces premium, recoveries reduce losses incurred — but unpaid losses enter at their **discounted** tax value, so the tax result of a reinsurance transaction, a commutation above all, can differ sharply from its statutory result.

> $$\Delta\text{Taxable income}_{\text{cedant}} = \text{Price} - d_c \times \text{Recoverable}$$

> $$\Delta\text{Taxable income}_{\text{reinsurer}} = d_r \times \text{Reserve} - \text{Price}$$

- These are the effects of a **[[Commutations|commutation]]** at a given price, where $d_c$ and $d_r$ are each party's §846 discount factors on the commuted reserves ([[Loss Reserve Discounting]]). The statutory result uses the same formulas with $d = 1$, so a commutation priced near present value produces a statutory loss for the cedant and gain for the reinsurer far larger than their taxable counterparts.
- **Statutory accounting of the commutation** (SSAP No. 62R): the cedant eliminates the recoverable and records the cash received as a negative paid loss; the reinsurer eliminates a reserve carried at ultimate for a payment made at present value; both book the difference in underwriting income. Commuted balances are written off through the schedules where they were recorded, which distorts both parties' [[Schedule P]] triangles.
- **Why the two factors differ.** IRS discount factors vary by line and accident year. A cedant carries ceded excess-of-loss reserves under the underlying line, while the reinsurer reports them as non-proportional assumed reinsurance, which has its own payment pattern — so even an agreed price gives asymmetric tax results. Since the 2017 TCJA both parties must use the IRS patterns.
- **Current versus deferred.** Total tax expense (current plus deferred) equals the tax rate times the book gain or loss; discounting decides only how much is current and how much is a change in the **deferred tax asset** on the reserve discount. Under SAP the deferred part goes directly to surplus and must pass the admissibility test.
- **Other rules to recognise:** ceded unearned premium reduces the net UPR on which the $20\%$ revenue offset is computed; a $1\%$ federal excise tax applies to reinsurance premiums paid to foreign reinsurers unless an exemption applies; §845 lets the IRS reallocate items under reinsurance between related parties, or under any contract with a significant tax avoidance effect; and for large groups the base erosion and anti-abuse tax (BEAT) can reach reinsurance premiums ceded to foreign affiliates.

> [!example]- Tax Effect of a Commutation {Example}
> A cedant carries a $\$500$ recoverable (undiscounted) on the commuted business; the reinsurer carries a $\$550$ reserve for the same claims. They commute for $\$400$. The cedant's §846 discount factor on these reserves is $0.875$; the reinsurer's, on its non-proportional assumed line, is $0.85$. Both pay tax at $21\%$.
>
> Compute each party's statutory and taxable result, and split its tax effect into current and deferred.
>
> > [!answer]-
> > **Statutory (undiscounted):**
> >
> > $$
> > \begin{align*}
> > \text{Cedant} &= 400 - 500 \\
> > &= -100 \\
> > \text{Reinsurer} &= 550 - 400 \\
> > &= 150
> > \end{align*}
> > $$
> >
> > **Taxable (discounted):**
> >
> > $$
> > \begin{align*}
> > \text{Cedant} &= 400 - 0.875(500) \\
> > &= -37.5 \\
> > \text{Reinsurer} &= 0.85(550) - 400 \\
> > &= 67.5
> > \end{align*}
> > $$
> >
> > **Cedant:** current tax falls by $0.21 \times 37.5 = 7.875$. Its net reserves rise by the $\$500$ it takes back, of which the tax basis recognises $\$437.5$, so its deferred tax asset rises by $0.21 \times 62.5 = 13.125$. Total benefit $7.875 + 13.125 = 21.0 = 0.21 \times 100$.
> >
> > **Reinsurer:** current tax rises by $0.21 \times 67.5 = 14.175$, and the deferred tax asset on its $\$82.5$ discount reverses by $0.21 \times 82.5 = 17.325$. Total $14.175 + 17.325 = 31.5 = 0.21 \times 150$.
> >
> > Each side should negotiate on an after-tax basis: the cedant's cash tax saving is small next to its book loss, and part of its benefit is a deferred tax asset it may not be able to admit in full.

> [!example]- Ceding to an Offshore Affiliate {Example}
> A U.S. insurer proposes a $50\%$ quota share of its book to a Bermuda affiliate that is not engaged in a U.S. trade or business, with a ceding commission well above the insurer's acquisition costs. Identify the tax and statutory issues.
>
> > [!answer]-
> > - **Excise tax:** $1\%$ of the ceded premium, unless an exemption applies.
> > - **BEAT:** if the group is large enough, the premiums are base erosion payments to a foreign related party.
> > - **§845(a):** the parties are related, so the IRS may reallocate income and deductions if the premium and commission do not reflect the risk actually transferred.
> > - **Statutory:** the commission in excess of anticipated acquisition cost must be set up as a liability and amortised over the contract, not taken into surplus at once (SSAP No. 62R). Unless the affiliate is authorised, certified or a reciprocal-jurisdiction reinsurer, credit for the cession depends on collateral, and any unsecured amount drives the provision for reinsurance in [[Schedule F]]. And the contract must pass [[Insurance Accounting|risk transfer]] like any other.
> >
> > A structure that looks efficient before tax can lose its appeal once excise tax, BEAT and the statutory deferral of the excess commission are priced in.
