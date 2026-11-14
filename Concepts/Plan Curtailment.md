---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:75175031b7cc93eec5e4b25bc395d33c8eed322f4cb05972db9de8369b079b68
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Plan Curtailment.md
---

A **Plan Curtailment** is an event that significantly reduces the expected years of future service of a [[Defined Benefit Plan|defined benefit]] plan's present employees, or eliminates for a significant number of them the accrual of benefits for some or all of their future service, such as a plant closure, a large layoff or a freeze of accruals. Pension accounting treats it alongside a **settlement**, an irrevocable action, such as a lump-sum payment or an annuity purchase, that relieves the employer of primary responsibility for part of the obligation and of the risks attached to it.

Under ASC 715 both events bring amounts held in accumulated other comprehensive income (AOCI) into earnings at once. The curtailment effect combines two pieces. The prior service cost tied to service that will no longer be rendered is a loss, which is

> $$L^{\text{PSC}} = f \times PSC$$

- $PSC$ is the unrecognized prior service cost in AOCI.
- $f$ is the share of the affected employees' expected future years of service that the curtailment removes.

A decrease in the projected benefit obligation (PBO) is a gain only to the extent it exceeds a net loss in AOCI, so the gain is

> $$G^{\text{PBO}} = \max\left(\Delta PBO - NL,\ 0\right)$$

- $\Delta PBO$ is the decrease in the PBO the curtailment causes.
- $NL$ is the unrecognized net loss in AOCI.

An increase in the PBO, such as from earlier vesting, is a loss only to the extent it exceeds a net gain in AOCI. The curtailment gain, a loss when negative, is

> $$CG = G^{\text{PBO}} - L^{\text{PSC}}$$

> [!example]- What curtailment gain or loss does this plant closure put in earnings under ASC 715? {Example}
> A sponsor closes a plant, which removes 40% of the expected future years of service of the employees present when an earlier plan amendment created prior service cost. The closure reduces the PBO by \$4 million, because the affected members' benefits will no longer be based on projected pay. Before the closure, AOCI holds unrecognized prior service cost of \$6 million and an unrecognized net loss of \$3 million.
>
> > [!answer]-
> > - The prior service cost for service that will no longer be rendered is a loss of $0.40(6{,}000{,}000) = \$2{,}400{,}000$.
> > - The PBO decrease is a gain only beyond the net loss in AOCI, $\max(4{,}000{,}000 - 3{,}000{,}000,\ 0) = \$1{,}000{,}000$.
> > - The curtailment gain is $1{,}000{,}000 - 2{,}400{,}000 = -\$1{,}400{,}000$, a net loss.
> > - The sponsor recognizes a net curtailment loss of \$1.4 million as soon as the closure is probable and estimable. The other \$3 million of the PBO decrease eliminates the AOCI net loss, and \$3.6 million of prior service cost stays in AOCI to be amortized.
> > - Under IAS 19 the same closure would be a past service credit of \$4 million in profit or loss, because IAS 19 holds no prior service cost or net loss in reserve to offset it.

## Timing under ASC 715

A net curtailment loss is recognized when the curtailment is probable and its effects can be reasonably estimated. A net curtailment gain waits until the event happens, when the employees are terminated or the amendment is adopted.

## Settlements under ASC 715

The obligation is first remeasured at the settlement date. The pro rata share of the AOCI net gain or loss is then recognized in earnings, so the settlement loss, a gain when the AOCI balance is a net gain, is

> $$SL = \frac{PBO_{\text{settled}}}{PBO} \times NL$$

- $PBO_{\text{settled}}$ is the part of the PBO the settlement discharges.

Settlement accounting is required when the settlements in a year exceed the year's service cost plus interest cost. Below that threshold an employer may elect it as a consistent policy.

Freezing accruals removes future service, so it is a curtailment. The obligation stays in the plan until lump sums are paid or annuities are bought, which is the settlement.

> [!example]- What is the settlement charge for these lump sums under ASC 715 and under IAS 19? {Example}
> After a termination, a plan pays lump sums of \$20 million that exactly settle \$20 million of an \$80 million PBO, measured at the settlement date. AOCI holds an unrecognized net loss of \$12 million, and the year's service cost and interest cost are \$3 million and \$4 million.
>
> > [!answer]-
> > - The settlements of \$20 million exceed service cost plus interest cost, \$7 million, so settlement accounting is required.
> > - The settlement loss is $(20/80)(12{,}000{,}000) = \$3{,}000{,}000$, and \$9 million of net loss stays in AOCI.
> > - Under IAS 19 the settlement price equals the obligation settled, so there is no settlement gain or loss, and the remeasurement losses remain in OCI.
> > - Had the plan bought annuities from an insurer for \$21 million instead, IAS 19 would show a \$1 million settlement loss, the premium over the obligation. This is the accounting side of a [[Pension Risk Transfer|pension risk transfer]].

## Curtailment and settlement in one event

When a [[Plan Termination|plan termination]] or wind-up brings both, the usual order measures the curtailment first, on the remeasured obligation, and then the settlement on the AOCI balances that remain. The order matters because the curtailment can use up the AOCI net loss that the settlement would otherwise recognize. The sponsor treats the order as an accounting policy and applies it consistently.

## Curtailments and settlements under IAS 19

Under IAS 19 both events are measured as a change in the obligation and charged to profit or loss. A curtailment is a past service cost, the change in the defined benefit obligation, recognized at the earlier of the event and the recognition of related restructuring or termination costs. A settlement gain or loss is the difference between the obligation settled and the settlement price. Remeasurements stay in other comprehensive income and are never recycled, so nothing comes out of OCI on either event.

## Termination benefits

Special termination benefits offered for a limited time, such as an early retirement window, are recognized under ASC 715 when employees accept them. Contractual termination benefits are recognized when the triggering event is probable. These are separate charges from the curtailment itself, although one event often produces all three.

> [!trap] Booking the whole PBO decrease as a curtailment gain
> A PBO decrease is a curtailment gain only after it has absorbed any AOCI net loss. In the plant closure, booking the full \$4 million decrease as a gain would turn a \$1.4 million loss into a \$1.6 million gain.
