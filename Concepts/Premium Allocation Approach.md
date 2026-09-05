---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:af979a281bff1cee03f4c7eee0b95e81938c55731412a873a9d4d506cd57da31
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Allocation Approach.md
---

**The Premium Allocation Approach** (PAA) is [[IFRS 17]]'s simplified measurement of the **[[Liability for Remaining Coverage]]** for short-duration contracts: the LRC is premium received less [[Insurance Acquisition Cash Flows|acquisition cash flows]], released to [[Insurance Revenue|revenue]] over the coverage period — essentially the familiar unearned premium mechanics. It is the model almost all Canadian P&C business uses.

> $$\text{LRC}_{\text{PAA}} = \text{Premium received} - \text{Acquisition cash flows} - \text{Revenue recognised}$$

- **Eligibility.** A group qualifies if the coverage period is **one year or less**, or if the insurer can demonstrate that PAA measurement would not differ **materially** from the [[General Measurement Model|GMM]]. The demonstration is required at initial recognition, per group, and must be documented.
- **What the PAA does *not* simplify:** the **[[Liability for Incurred Claims|LIC]]**. Once a claim occurs it is measured identically under both models — present value of [[Fulfilment Cash Flows|fulfilment cash flows]] plus [[Risk Adjustment for Non-Financial Risk|risk adjustment]]. The PAA is an LRC simplification only, and this is the most frequently misstated point about it.
- **No [[Contractual Service Margin]].** Profit is not identified separately at inception; it emerges as revenue exceeds incurred claims. But the [[Onerous Contract|onerous]] test still applies, and an onerous group carries a [[Loss Component]] recognised immediately.
- **Practical expedients** available under the PAA: acquisition cash flows may be **expensed as incurred** if the coverage period is a year or less; and the LRC need not be discounted if the coverage period is a year or less or there is no significant financing component. Both are policy choices to be applied consistently.
- **Why it exists.** For a twelve-month policy, the GMM's full cash flow projection, CSM and coverage-unit tracking produce a number indistinguishable from unearned premium, at large cost. The PAA keeps the answer and drops the machinery.
- **Where the PAA is *not* available**, and candidates should recognise the cases: multi-year commercial contracts, extended warranty and surety, some [[Reinsurance Contracts Held|reinsurance held]] arrangements covering multiple underwriting years, and any group where experience is expected to vary enough over a longer term that the models would diverge.

> [!example]- Is This Group PAA-Eligible? {Example}
> Assess eligibility for each group.
>
> 1. Annual personal automobile policies.
> 2. A five-year construction wrap-up liability policy.
> 3. A three-year commercial property policy with level annual premiums and stable expected claims.
> 4. An excess-of-loss reinsurance treaty covering a single underwriting year, with claims paid over eight years.
>
> > [!answer]-
> > 1. **Eligible.** Coverage period is one year — automatic eligibility, no demonstration needed. This is the overwhelming majority of Canadian P&C business.
> > 2. **Not eligible** without demonstration, and the demonstration will almost certainly fail. Over five years, discount rates and claim expectations will be revised repeatedly; the CSM absorption of those revisions under the GMM produces a materially different pattern from a straight-line PAA release. Construction wrap-ups are the standard example of a contract that must use the GMM.
> > 3. **Possibly eligible**, and this is where judgement is required. Level premiums and stable claims mean the GMM's CSM would release roughly evenly, close to the PAA's time-based release. The insurer must **demonstrate and document** that at initial recognition; the sensitivity is to how much the discount rate and claim assumptions are expected to move over three years.
> > 4. **Eligible on coverage period** — the treaty covers one underwriting year, so the *coverage* period is one year even though claims are paid over eight. The long payout affects the **LIC**, which is measured at present value plus risk adjustment regardless of model. This is the case that most cleanly separates the two ideas: **coverage duration determines the model; claim duration determines the discounting.**
