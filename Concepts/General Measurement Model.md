---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c0a875f966ae69e8b2275aa6f943da967220531f563404eb21e68bfe7e77fd31
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/General Measurement Model.md
---

**The General Measurement Model** (GMM, also the *building block approach*) is [[IFRS 17]]'s default measurement basis for insurance contracts: the liability is the present value of expected [[Fulfilment Cash Flows|fulfilment cash flows]], plus a [[Risk Adjustment for Non-Financial Risk|risk adjustment]], plus a [[Contractual Service Margin]] holding the unearned profit.

> $$\text{Liability} = \text{PV(Cash flows)} + \text{RA} + \text{CSM}$$

- **The three (or four) building blocks:** estimates of future cash flows; discounting for the time value of money and financial risk; the risk adjustment for non-financial risk; and — for the [[Liability for Remaining Coverage|LRC]] only — the CSM. Together the first three are the fulfilment cash flows.
- **Every contract is eligible.** The GMM applies unless a contract qualifies for the [[Premium Allocation Approach|PAA]] simplification or the variable fee approach. In Canadian P&C practice most short-duration business uses the PAA, so the GMM appears mainly on **multi-year contracts**, some long-term commercial covers, and certain [[Reinsurance Contracts Held|reinsurance held]] arrangements.
- **Full remeasurement each period.** Cash flow estimates, discount rates and the risk adjustment are all updated to current values, with the changes routed according to whether they relate to future service (CSM), past service (profit or loss), or the time value of money ([[Insurance Finance Income or Expenses]]).
- **The [[Liability for Incurred Claims|LIC]] is measured the same way under both models** — fulfilment cash flows plus risk adjustment, no CSM. The GMM/PAA choice affects only the LRC, which is a point candidates frequently get backwards.
- **The GMM is more work.** It requires cash flow projection over the full contract term, a locked-in discount rate for CSM accretion alongside current rates for the liability, and coverage-unit tracking for CSM release — which is precisely why the PAA exists.

> [!example]- GMM Versus PAA on the Same Contract {Example}
> A three-year commercial policy is written for a single premium of $\$9$ million. Expected claims are $\$2.2$ million in each year, the risk adjustment is $\$0.6$ million, and the discount rate is $3\%$. Acquisition costs are $\$0.9$ million.
>
> Contrast the initial LRC under the GMM with what the PAA would produce (were the contract eligible).
>
> > [!answer]-
> > **GMM.** Present value of expected claims, paid at the end of each year:
> >
> > $$\begin{align*}
> > \text{PV} &= \$2.2\text{M}\left(\frac{1 - 1.03^{-3}}{0.03}\right) \\
> > &= \$2.2\text{M} \times 2.82861 \\
> > &= \$6.223\text{M}
> > \end{align*}$$
> >
> > Adding acquisition costs and the risk adjustment, and comparing with the premium:
> >
> > $$\begin{align*}
> > \text{CSM}_0 &= \$9\text{M} - \$6.223\text{M} - \$0.9\text{M} - \$0.6\text{M} \\
> > &= \$1.277\text{M}
> > \end{align*}$$
> >
> > **Initial LRC under the GMM:**
> >
> > $$\$6.223\text{M} + \$0.6\text{M} + \$1.277\text{M} = \$8.1\text{M}$$
> >
> > which equals premium less acquisition costs, as it must — the CSM is defined to make it so.
> >
> > **PAA.** The LRC is simply premium less acquisition cash flows:
> >
> > $$\$9\text{M} - \$0.9\text{M} = \$8.1\text{M}$$
> >
> > **The same number at inception.** The models diverge *afterwards*: under the PAA the LRC runs off on a time or expected-release basis with no CSM to adjust, while under the GMM revisions to future claims adjust the CSM and the components are remeasured every period. On a three-year contract, that difference is material — which is why the PAA is restricted to coverage periods of a year or less unless the insurer can demonstrate the results would not differ materially.
