---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:95413e3ca9f106bf8398c52fc97bc984efe2acd84cd7f11a29a484cd7284e0bf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Contract Liabilities.md
---

**Insurance Contract Liabilities** are the obligations an insurer carries under the insurance contracts it has issued. Under [[IFRS 17]] they are the sum of the **[[Liability for Remaining Coverage]]** (LRC) — future service not yet provided — and the **[[Liability for Incurred Claims]]** (LIC) — claims that have already occurred, whether reported or not.

> $$\text{Insurance Contract Liability} = \text{LRC} + \text{LIC}$$

- **LIC** is the actuary's traditional territory: case reserves, IBNR, and the associated adjustment expenses, measured as the present value of [[Fulfilment Cash Flows|fulfilment cash flows]] plus a [[Risk Adjustment for Non-Financial Risk|risk adjustment]].
- **LRC** under the [[Premium Allocation Approach|PAA]] is essentially the unearned premium net of deferred [[Insurance Acquisition Cash Flows|acquisition cash flows]], plus a [[Loss Component]] where the group is [[Onerous Contract|onerous]].
- **They are measured on completely different bases** and confusing them is the single most common IFRS 17 error. The LRC is *premium-driven* and released as coverage is provided; the LIC is *claim-driven* and released as claims are paid.
- **Valuation must be in accordance with [[Accepted Actuarial Practice]]** — the requirement in s. 365 of the [[Insurance Companies Act]] — which for a Canadian insurer means the [[Standards of Practice]] and the CIA's educational notes on IFRS 17 application.
- **Reinsurance is not netted.** [[Reinsurance Contracts Held]] are a separate asset with their own measurement, so the balance sheet shows gross liabilities and a reinsurance asset rather than a net figure. This inflates both sides relative to the old presentation and is deliberate: it makes reinsurance counterparty exposure visible.
- The [[Appointed Actuary]] opines on these liabilities in the [[Statement of Actuarial Opinion]], and they flow directly into [[Capital Available]] and hence the [[MCT]] ratio.

> [!example]- Building the Liability {Example}
> At December 31 a PAA insurer has: unearned premium $\$46$ million, unamortised acquisition cash flows $\$11$ million, undiscounted case reserves and IBNR of $\$208$ million, an effect of discounting of $-\$14$ million, a risk adjustment of $\$17$ million, and reinsurance recoverable on unpaid claims of $\$35$ million (risk adjustment on reinsurance held $\$3$ million).
>
> Present the insurance contract liabilities.
>
> > [!answer]-
> > **Liability for remaining coverage:**
> >
> > $$\begin{align*}
> > \text{LRC} &= \$46\text{M} - \$11\text{M} \\
> > &= \$35\text{M}
> > \end{align*}$$
> >
> > assuming no group is onerous; otherwise a [[Loss Component]] is added.
> >
> > **Liability for incurred claims:**
> >
> > $$\begin{align*}
> > \text{LIC} &= \$208\text{M} - \$14\text{M} + \$17\text{M} \\
> > &= \$211\text{M}
> > \end{align*}$$
> >
> > **Total insurance contract liabilities:**
> >
> > $$\$35\text{M} + \$211\text{M} = \$246\text{M}$$
> >
> > **Separately, as an asset**, reinsurance contracts held:
> >
> > $$\$35\text{M} + \$3\text{M} = \$38\text{M}$$
> >
> > Note that the reinsurance risk adjustment **adds** to the asset rather than subtracting: it represents the risk the reinsurer relieves the cedant of, so it increases the value of the reinsurance held. Candidates routinely sign this wrong. The asset is then reduced separately for the reinsurer's **non-performance risk**, which is a credit adjustment, not a risk adjustment.
