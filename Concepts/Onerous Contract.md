---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5d37b805c7ab33f38fad5e2fe5d0d6600b0e48c3ac36e3d3b73207939e536a42
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Onerous Contract.md
---

![[Media/Figures/Onerous_Contract.svg|340]]

An **Onerous Contract** under [[IFRS 17]] is a group of insurance contracts whose expected [[Fulfilment Cash Flows|fulfilment cash flows]] exceed the consideration for them, that is, a group expected to lose money. The loss is recognised immediately and in full in profit or loss, and is tracked in the [[Liability for Remaining Coverage|liability for remaining coverage]] as a [[Loss Component|loss component]].

A group is onerous when the present value of its expected outflows plus its risk adjustment exceeds the present value of its inflows, and its loss is

> $$\text{Loss} = \text{PV(outflows)} + \text{RA} - \text{PV(inflows)}$$

- $\text{PV(outflows)}$ is the present value of expected claims and directly attributable expenses.
- $\text{RA}$ is the [[Risk Adjustment for Non-Financial Risk|risk adjustment for non-financial risk]].
- $\text{PV(inflows)}$ is the present value of the premium.

> [!idea] The idea
> Losses are recognised at once while profits are deferred and released over coverage, so the cost of writing at an inadequate rate is reported when the business is written, not when the claims arrive.

> [!example]- What is the accounting consequence of this rate suppression? {Example}
> An insurer's Ontario personal auto indication is $+12\%$, and the regulator approves $+3\%$. The group written in the following twelve months is expected to earn premium of $\$140$ million, with expected claims and directly attributable expenses of $\$149$ million and a risk adjustment of $\$4$ million.
>
> > [!answer]-
> > - The outflows plus the risk adjustment, $\$149\text{M} + \$4\text{M} = \$153\text{M}$, exceed the $\$140$ million of premium, so the group is onerous.
> > - The loss is $\$153\text{M} - \$140\text{M} = \$13\text{M}$.
> > - The $\$13$ million is recognised immediately in [[Insurance Service Expenses|insurance service expenses]] as the contracts in the group are recognised, before a single claim is reported.
> > - A loss component of $\$13$ million is established within the liability for remaining coverage.
> > - [[Capital Available|Capital available]] falls by the after-tax amount at once, so the rate suppression shows up in the [[MCT]] ratio a year earlier than it used to.
> > - A known onerous group is a financial-condition matter, so the [[FCT]] and [[ORSA]] adverse scenarios must contemplate the suppression continuing.
> > - The insurer must decide at board level whether to keep writing at a rate it has formally recognised as loss-making.

## The loss component and the contractual service margin

There is no [[Contractual Service Margin|contractual service margin]] on an onerous group, because there is no unearned profit to defer. Later favourable changes first reverse the loss component, and only once it is exhausted can a contractual service margin be established.

## Level of aggregation

The test is made at the [[Level of Aggregation|group]] level, which makes IFRS 17 stricter than the old premium deficiency reserve. Profitable groups cannot offset onerous ones, and the annual cohort requirement stops next year's good business absorbing this year's bad. A premium deficiency reserve tested across a broad portfolio often produced nothing, because profitable commercial lines offset unprofitable auto.

## When the test is made

The test is made at two points:

1. At initial recognition, to ask whether the business was written at a loss.
2. At each subsequent reporting date, to ask whether the group has become onerous or an existing loss component has changed.

Under the [[Premium Allocation Approach|premium allocation approach]], a group is presumed not onerous at inception unless facts and circumstances indicate otherwise, and the insurer must reassess whenever indicators appear. The indicators to watch are a rate filing approved well below the indication, a [[Automobile Insurance Reform|reform]] rolled back, adverse loss trend on recently written business, entry into a new line at competitive rates, and a combined ratio above $100\%$ on the current cohort.

The onerous assessment is an actuarial judgement about future cost on business already written, which is the analysis behind a rate indication. An actuary who signs a rate indication showing inadequacy has, in effect, identified an onerous group.
