---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ceab6fc2b9e07abfac63c1ceeafa29004fe380c7d7dcf8118f6dcbf77391eddb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Onerous Contract.md
---

**An Onerous Contract** under [[IFRS 17]] is a group of insurance contracts whose expected [[Fulfilment Cash Flows|fulfilment cash flows]] exceed the consideration for them — that is, a group expected to lose money. The loss is recognised **immediately and in full** in profit or loss, and is tracked in the [[Liability for Remaining Coverage|LRC]] as a [[Loss Component]].

> $$\text{Onerous} \iff \text{PV(outflows)} + \text{RA} \; > \; \text{PV(inflows)}$$

- **Tested at the [[Level of Aggregation|group]] level**, and this is what makes IFRS 17 stricter than the old premium deficiency reserve. Profitable groups cannot offset onerous ones, and the annual cohort requirement stops next year's good business absorbing this year's bad.
- **Two testing points:** at **initial recognition** (was the business written at a loss?) and at each **subsequent reporting date** (has it become onerous, or has an existing loss component changed?). Under the [[Premium Allocation Approach|PAA]], a group is presumed not onerous at inception unless facts and circumstances indicate otherwise — but the insurer must reassess whenever indicators appear.
- **Indicators to watch:** a rate filing approved well below the indication, a [[Automobile Insurance Reform|reform]] rolled back, adverse loss trend on recently written business, entry into a new line at competitive rates, or a combined ratio above $100\%$ on the current cohort.
- **No [[Contractual Service Margin|CSM]] on an onerous group.** There is no unearned profit to defer, so the entire loss hits profit immediately. Subsequent favourable changes first reverse the loss component; only once it is exhausted can a CSM be established.
- **The asymmetry is deliberate:** losses are recognised at once, profits are deferred and released over coverage. It is the accounting expression of prudence, and it means an insurer writing at inadequate rates cannot postpone the consequence to the year the claims arrive.
- **The [[Appointed Actuary]]'s role is central.** The onerous assessment is an actuarial judgement about future cost on business already written, which is exactly the analysis behind a rate indication — so an actuary who signs a rate indication showing inadequacy has, in effect, identified an onerous group.

> [!example]- When Rate Suppression Meets IFRS 17 {Example}
> An insurer's Ontario personal auto indication is $+12\%$; the regulator approves $+3\%$. The group written in the following twelve months is expected to earn premium of $\$140$ million, with expected claims and directly attributable expenses of $\$149$ million and a risk adjustment of $\$4$ million.
>
> What is the accounting consequence?
>
> > [!answer]-
> > **The group is onerous:**
> >
> > $$\begin{align*}
> > \text{Loss} &= \$149\text{M} + \$4\text{M} - \$140\text{M} \\
> > &= \$13\text{M}
> > \end{align*}$$
> >
> > The $\$13$ million is recognised **immediately** in [[Insurance Service Expenses]] as contracts in the group are recognised — not spread over the coverage period, and not deferred until the claims are paid. A [[Loss Component]] of $\$13$ million is established within the LRC.
> >
> > **What this changes, relative to the old framework.** Under the previous regime a premium deficiency reserve was tested across a broad portfolio and often produced nothing, because profitable commercial lines offset unprofitable auto. IFRS 17's group-level test surfaces the loss the year the business is written.
> >
> > **The consequences that follow:**
> >
> > - **Earnings.** A $\$13$ million charge lands in the year of writing, before a single claim is reported.
> > - **[[MCT]].** [[Capital Available]] falls by the after-tax amount immediately, so rate suppression now shows up in the capital ratio a year earlier than it used to.
> > - **[[FCT]] and [[ORSA]].** A known onerous group is a financial-condition matter; the adverse scenarios must contemplate the suppression continuing.
> > - **Strategy.** The insurer must decide whether to keep writing at a rate it has now formally recognised as loss-making. Recognising the loss up front makes that a board-level question rather than a slow discovery.
> >
> > That visibility is the intended effect of the standard: **the cost of writing business at an inadequate rate is now reported when the decision is made, not when the claims arrive.**
