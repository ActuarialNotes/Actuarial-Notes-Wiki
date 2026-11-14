---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4cd4f92d8204364c1f94029d6d05e1f511170ba1378bc0e1816ac82f7044d368
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Contracts Held.md
---

![[Media/Figures/Reinsurance_Contracts_Held.svg|340]]

**Reinsurance Contracts Held** are the reinsurance an insurer buys. Under [[IFRS 17]] they are measured as a **separate asset** with their own [[Fulfilment Cash Flows|fulfilment cash flows]], [[Risk Adjustment for Non-Financial Risk|risk adjustment]] and [[Contractual Service Margin|CSM]], and several of their measurement rules mirror those for contracts issued. From the cedant's side, the reinsurance asset is

> $$\text{Asset} = \text{PV(recoveries)} - \text{PV(ceded premiums)} + \text{RA} - \text{NPR} + \text{CSM}$$

- $\text{PV(recoveries)}$ is the present value of the claims the reinsurer is expected to pay.
- $\text{PV(ceded premiums)}$ is the present value of the premiums paid to the reinsurer, net of any ceding commission received.
- $\text{RA}$ is the risk adjustment for the risk transferred to the reinsurer.
- $\text{NPR}$ is the allowance for the reinsurer's non-performance.

The risk adjustment on reinsurance held represents risk **transferred away**, so it increases the asset, where on contracts issued it increases the liability. Non-performance risk is separate from it and explicit. It covers the reinsurer's credit risk, including disputes and collectability as well as default, it reduces the asset, and changes in it go through profit or loss.

> [!example]- What is this quota share's reinsurance asset at initial recognition? {Example}
> An insurer buys a quota share ceding $30\%$. Its estimates at inception are:
>
> | Item | Amount |
> | :--- | ---: |
> | Ceded premium | $\$60$ million |
> | PV of expected recoveries | $\$52$ million |
> | Ceding commission | $\$14$ million |
> | Risk adjustment on risk transferred | $\$3$ million |
> | Allowance for reinsurer non-performance | $\$1.2$ million |
>
> > [!answer]-
> > - The net cash flows to the cedant are $\$52\text{M} + \$14\text{M} - \$60\text{M} = \$6$ million.
> > - The risk adjustment increases the asset to $\$6\text{M} + \$3\text{M} = \$9$ million.
> > - The non-performance allowance reduces it to $\$9\text{M} - \$1.2\text{M} = \$7.8$ million.
> > - No gain is recognised at inception, so the CSM is $-\$7.8$ million and the asset's carrying amount at initial recognition is $\$7.8\text{M} - \$7.8\text{M} = 0$.
> > - The $\$7.8$ million is released from the CSM as the reinsurance coverage is received.

## The contractual service margin on reinsurance held

Reinsurance is usually bought at a price above expected recoveries, so the CSM on reinsurance held is usually a net cost of purchasing reinsurance. IFRS 17 defers it as a CSM rather than recognising it immediately. This no day-one loss treatment is the reverse of the onerous rule for contracts issued.

Where reinsurance covers an [[Onerous Contract|onerous]] group, a **loss-recovery component** is recognised on the reinsurance asset at the same time as the loss on the underlying group, so the two are matched.

[[Premium Allocation Approach|PAA]] eligibility is assessed separately for reinsurance held. A treaty covering several underwriting years or with a long coverage period may need the [[General Measurement Model|GMM]] even where the underlying business uses the PAA.

## Presentation

Reinsurance held is **never netted** against the underlying insurance contract liabilities. The balance sheet shows gross [[Insurance Contract Liabilities|insurance contract liabilities]] and the reinsurance asset on its own line, which makes the insurer's exposure to its reinsurers' solvency visible.

> [!example]- An insurer's gross LIC is $\$400$ million, of which $\$120$ million is recoverable under its quota share. What does the balance sheet show? {Example}
> - The gross [[Liability for Incurred Claims|LIC]] is shown in full, as a liability of $\$400$ million.
> - The reinsurance share is shown as a separate asset of $\$120$ million plus its risk adjustment, less non-performance risk.
> - The balance sheet does not show $\$280$ million net, so a reader can see that $30\%$ of the claim liability depends on third parties and ask who they are.

> [!trap] Deducting the risk adjustment from the reinsurance asset
> On contracts issued the risk adjustment adds to the liability. On reinsurance held it represents risk transferred away, so it is added to the asset, not deducted from it.
