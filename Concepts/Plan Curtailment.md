---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:60ff682031d8dd00c0c924cb30116cad7112807372accd3c6937cf640458c3c8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Plan Curtailment.md
---

A **Plan Curtailment** is an event that significantly reduces the expected years of future service of a [[Defined Benefit Plan|defined benefit]] plan's present employees, or eliminates for a significant number of them the accrual of benefits for some or all of their future service, such as a plant closure, a large layoff or a freeze of accruals. Pension accounting treats it alongside a **settlement**, an irrevocable action, such as a lump-sum payment or an annuity purchase, that relieves the employer of primary responsibility for part of the obligation and of the risks attached to it. Under ASC 715 both events bring amounts held in accumulated other comprehensive income (AOCI) into earnings at once; under IAS 19 both are measured as a change in the obligation and charged to profit or loss.

> $$L^{\text{PSC}} = f \times PSC$$

> $$G^{\text{PBO}} = \max\left(\Delta PBO - NL,\ 0\right)$$

> $$CG = G^{\text{PBO}} - L^{\text{PSC}}$$

> $$SL = \frac{PBO_{\text{settled}}}{PBO} \times NL$$

- **Symbols:** Under ASC 715, $PSC$ is the unrecognized prior service cost in AOCI, $f$ is the share of the affected employees' expected future years of service that the curtailment removes, $\Delta PBO$ is the decrease in the projected benefit obligation the curtailment causes, and $NL$ is the unrecognized net loss in AOCI. $CG$ is the curtailment gain (a loss when negative) and $SL$ is the settlement loss, a gain when the AOCI balance is a net gain.
- **The curtailment effect under ASC 715:** Two pieces are combined. The prior service cost tied to service that will no longer be rendered is a loss. A decrease in the PBO is a gain only to the extent it exceeds a net loss in AOCI, and an increase in the PBO, such as from earlier vesting, is a loss only to the extent it exceeds a net gain.
- **Timing under ASC 715:** A net curtailment loss is recognized when the curtailment is probable and its effects can be reasonably estimated. A net curtailment gain waits until the event happens, when the employees are terminated or the amendment is adopted.
- **Settlements under ASC 715:** The pro rata share of the AOCI net gain or loss, measured after remeasuring the obligation at the settlement date, is recognized in earnings. Settlement accounting is required when the settlements in a year exceed the year's service cost plus interest cost, and below that threshold an employer may elect it as a consistent policy.
- **Order of events:** When a [[Plan Termination|plan termination]] or wind-up brings both, the usual order measures the curtailment first, on the remeasured obligation, and then the settlement on the AOCI balances that remain. The order matters because the curtailment can use up the AOCI net loss that the settlement would otherwise recognize, so the sponsor treats the order as an accounting policy and applies it consistently.
- **IAS 19:** A curtailment is a past service cost, the change in the defined benefit obligation, recognized in profit or loss at the earlier of the event and the recognition of related restructuring or termination costs. A settlement gain or loss is the difference between the obligation settled and the settlement price. Remeasurements stay in other comprehensive income and are never recycled, so nothing comes out of OCI on either event.
- **Termination benefits:** Special termination benefits offered for a limited time, such as an early retirement window, are recognized under ASC 715 when employees accept them. Contractual termination benefits are recognized when the triggering event is probable. These are separate charges from the curtailment itself, although one event often produces all three.

> [!example]- A Plant Closure Under ASC 715 {Example}
> A sponsor closes a plant, which removes 40% of the expected future years of service of the employees present when an earlier plan amendment created prior service cost. The closure reduces the PBO by \$4 million, because the affected members' benefits will no longer be based on projected pay. Before the closure, AOCI holds unrecognized prior service cost of \$6 million and an unrecognized net loss of \$3 million. Find the curtailment gain or loss recognized in earnings.
>
> > [!answer]-
> > The prior service cost for service that will no longer be rendered is a loss, and the PBO decrease is a gain only to the extent it exceeds the net loss in AOCI.
> > $$
> > \begin{align*}
> > L^{\text{PSC}} &= 0.40(6{,}000{,}000) \\
> > &= 2{,}400{,}000 \\
> > G^{\text{PBO}} &= \max(4{,}000{,}000 - 3{,}000{,}000,\ 0) \\
> > &= 1{,}000{,}000 \\
> > CG &= 1{,}000{,}000 - 2{,}400{,}000 \\
> > &= -1{,}400{,}000
> > \end{align*}
> > $$
> > The sponsor recognizes a net curtailment loss of \$1.4 million as soon as the closure is probable and estimable. The other \$3 million of the PBO decrease eliminates the AOCI net loss, and \$3.6 million of prior service cost stays in AOCI to be amortized. Under IAS 19 the same closure would be a past service credit of \$4 million in profit or loss, because IAS 19 holds no prior service cost or net loss in reserve to offset it.

> [!example]- Lump Sums That Trigger Settlement Accounting {Example}
> After a termination, a plan pays lump sums of \$20 million that exactly settle \$20 million of an \$80 million PBO, measured at the settlement date. AOCI holds an unrecognized net loss of \$12 million, and the year's service cost and interest cost are \$3 million and \$4 million. Find the settlement charge under ASC 715 and under IAS 19.
>
> > [!answer]-
> > The settlements exceed service cost plus interest cost, so settlement accounting is required.
> > $$
> > \begin{align*}
> > 20{,}000{,}000 &> 3{,}000{,}000 + 4{,}000{,}000 \\
> > SL &= \frac{20{,}000{,}000}{80{,}000{,}000}(12{,}000{,}000) \\
> > &= 3{,}000{,}000
> > \end{align*}
> > $$
> > Under ASC 715 the sponsor recognizes a settlement loss of \$3 million, and \$9 million of net loss stays in AOCI. Under IAS 19 the settlement price equals the obligation settled, so there is no settlement gain or loss, and the remeasurement losses remain in OCI. Had the plan bought annuities from an insurer for \$21 million instead, IAS 19 would show a \$1 million settlement loss, the premium over the obligation. This is the accounting side of a [[Pension Risk Transfer|pension risk transfer]].

> [!tip]- How it appears on the exam
> - **RET-201 Accounting Standards:** Calculation questions give a curtailment or a termination, the AOCI balances and the obligation before and after, and ask for the gain or loss and the year's pension cost and disclosure under ASC 715, often beside the IAS 19 answer.
> - **Advice questions:** Written questions ask a candidate to advise a sponsor on how a freeze, a lump-sum window, an annuity purchase or a full wind-up will hit earnings, and on the timing of the charge.
> - **Combined events:** Termination questions build the events in sequence: the remeasurement, then the curtailment, then the settlement, then any special termination benefits. Each step changes the AOCI balances the next one starts from.

> [!warning]- Exam traps
> - **The offset comes first:** A PBO decrease is a curtailment gain only after it has absorbed any AOCI net loss. Booking the full decrease as a gain overstates it whenever a net loss exists.
> - **Gains wait, losses don't:** Under ASC 715 a net curtailment loss is recognized when probable, but a net gain only when the event occurs. Reporting both at the announcement date misstates the period.
> - **The settlement threshold:** Settlement accounting under ASC 715 is triggered by the year's settlements against service cost plus interest cost. Comparing lump sums to the PBO, or to service cost alone, applies the wrong test.
> - **No recycling under IAS 19:** IAS 19 never moves remeasurements from OCI into profit or loss. Applying ASC 715's pro rata recognition to an IAS 19 settlement invents a charge.
> - **A freeze is a curtailment, not a settlement:** Freezing accruals removes future service, which is a curtailment. The obligation stays in the plan until lump sums are paid or annuities are bought, which is the settlement.
