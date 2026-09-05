---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0c5a252f1ae9930c0859f64cbdebe2c79f509a42a5580df074a5113ae20736aa
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Service Result.md
---

**The Insurance Service Result** is [[IFRS 17]]'s measure of **underwriting performance**: [[Insurance Revenue]] less [[Insurance Service Expenses]], less the net expense from [[Reinsurance Contracts Held|reinsurance contracts held]]. It excludes all investment return and all interest-rate effects, which are reported separately as [[Insurance Finance Income or Expenses]].

> $$\text{ISR} = \text{Insurance revenue} - \text{Insurance service expenses} - \text{Net reinsurance expense}$$

- **The point of the separation.** Under previous presentations, investment income and the unwinding of discount were mixed into an insurer's results, so a fall in interest rates could flatter or damage a figure meant to describe underwriting. The ISR isolates the question "did we price and select the business well?"
- **The IFRS 17 income statement structure**, in order: insurance revenue, insurance service expenses, net expense from reinsurance held → **insurance service result**; then insurance finance income or expenses and investment income → **net financial result**; the two summing to profit before tax.
- **Reinsurance appears as a single net line** in the ISR, so a heavily reinsured insurer shows large gross revenue and expenses and a large negative reinsurance line, rather than netted figures.
- **Relation to the combined ratio.** The ISR is close to an underwriting result, but the two are not identical: revenue excludes deposit components and loss-component amounts, expenses exclude discount unwind, and reinsurance is presented net. An insurer's disclosed combined ratio and its ISR should be reconcilable but will not match line for line.
- **What can distort it:** a large [[Onerous Contract|onerous]] group charge lands entirely in one period; a change in the [[Coverage Units]] driver changes CSM release; and a [[Risk Adjustment for Non-Financial Risk|risk adjustment]] release pattern that differs from claim emergence shifts profit between periods.

> [!example]- Building the Income Statement {Example}
> For the year: insurance revenue $\$480$ million; claims and expenses incurred $\$390$ million; acquisition amortisation $\$62$ million; a loss on an onerous group $\$9$ million; ceded premium relating to coverage received $\$70$ million; amounts recoverable from reinsurers on incurred claims $\$48$ million; unwinding of discount on liabilities $\$16$ million; investment income $\$95$ million.
>
> Present the result.
>
> > [!answer]-
> > **Insurance service expenses:**
> >
> > $$\begin{align*}
> > &= \$390\text{M} + \$62\text{M} + \$9\text{M} \\
> > &= \$461\text{M}
> > \end{align*}$$
> >
> > **Net expense from reinsurance held:**
> >
> > $$\$70\text{M} - \$48\text{M} = \$22\text{M}$$
> >
> > **Insurance service result:**
> >
> > $$\begin{align*}
> > \text{ISR} &= \$480\text{M} - \$461\text{M} - \$22\text{M} \\
> > &= -\$3\text{M}
> > \end{align*}$$
> >
> > **Net financial result:**
> >
> > $$\$95\text{M} - \$16\text{M} = \$79\text{M}$$
> >
> > **Profit before tax:**
> >
> > $$-\$3\text{M} + \$79\text{M} = \$76\text{M}$$
> >
> > **What the presentation reveals.** The insurer reports a healthy $\$76$ million profit — and an underwriting result of **negative $\$3$ million**. Every dollar of profit came from investment return.
> >
> > That is precisely the information the old presentation obscured, and it is the reason the ISR exists. An insurer running at a small underwriting loss funded by investment income is viable while rates hold, and exposed the moment they do not. A reader of the pre-IFRS-17 income statement would have seen only the $\$76$ million.
