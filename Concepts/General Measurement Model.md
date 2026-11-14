---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5ae917e8131f173acd3dfaf0f0190e1bf8273c1d445b49e471af09d89b2fc08c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/General Measurement Model.md
---

![[Media/Figures/General_Measurement_Model.svg|340]]

The **General Measurement Model** (GMM, also the building block approach) is [[IFRS 17]]'s default measurement basis for insurance contracts. Under it, the liability for a group of contracts is

> $$\text{Liability} = \text{PV(Cash flows)} + \text{RA} + \text{CSM}$$

- $\text{PV(Cash flows)}$ is the present value of the expected future cash flows, discounted for the time value of money and financial risk.
- $\text{RA}$ is the [[Risk Adjustment for Non-Financial Risk|risk adjustment for non-financial risk]].
- $\text{CSM}$ is the [[Contractual Service Margin|contractual service margin]], the unearned profit, held for the [[Liability for Remaining Coverage|liability for remaining coverage]] (LRC) only.

The present value and the risk adjustment together are the [[Fulfilment Cash Flows|fulfilment cash flows]]. Every period the cash flow estimates, discount rates and risk adjustment are all updated to current values. A change is routed by what it relates to: future service adjusts the CSM, past service goes to profit or loss, and the time value of money goes to [[Insurance Finance Income or Expenses|insurance finance income or expenses]].

> [!example]- What is the initial LRC of this contract under the GMM? {Example}
> A three-year commercial policy is written for a single premium of $\$9$ million. Expected claims are $\$2.2$ million a year, paid at the end of each year. The risk adjustment is $\$0.6$ million, the discount rate 3%, and acquisition costs $\$0.9$ million.
>
> > [!answer]-
> > - The present value of the claims is $2.2 \times (1 - 1.03^{-3})/0.03 = 2.2 \times 2.82861 = \$6.223$ million.
> > - The CSM is the premium less the claims, acquisition costs and risk adjustment: $9 - 6.223 - 0.9 - 0.6 = \$1.277$ million.
> > - The initial LRC is $6.223 + 0.6 + 1.277 = \$8.1$ million.
> > - This equals the premium less acquisition costs, as it must, because the CSM is defined to make it so.

## The GMM and the premium allocation approach

The GMM applies to every contract unless it qualifies for the [[Premium Allocation Approach|PAA]] simplification or the variable fee approach. In Canadian P&C practice most short-duration business uses the PAA, so the GMM appears mainly on multi-year contracts, some long-term commercial covers and certain [[Reinsurance Contracts Held|reinsurance held]] arrangements.

The GMM is more work. It requires a cash flow projection over the full contract term, a locked-in discount rate for accreting the CSM alongside current rates for the liability, and coverage-unit tracking for releasing the CSM.

Under the PAA the initial LRC is the premium less acquisition cash flows. On the contract above that is $9 - 0.9 = \$8.1$ million, the same as the GMM at inception. The models diverge afterwards. Under the PAA the LRC runs off on a time or expected-release basis with no CSM to adjust, while under the GMM revisions to future claims adjust the CSM and the components are remeasured every period. On a three-year contract that difference is material, which is why the PAA is restricted to coverage periods of a year or less unless the insurer can demonstrate that the results would not differ materially.

> [!trap] Applying the GMM/PAA choice to incurred claims
> The [[Liability for Incurred Claims|liability for incurred claims]] is measured the same way under both models: fulfilment cash flows, with no CSM. The choice between the GMM and the PAA affects only the LRC.
