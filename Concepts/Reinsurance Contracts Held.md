---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e15699aae734bd6de3f8c9f1b96764b613a14c956a911c0d53a3ae54527fd58c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Contracts Held.md
---

**Reinsurance Contracts Held** are the reinsurance an insurer buys, measured under [[IFRS 17]] as a **separate asset** with its own [[Fulfilment Cash Flows|fulfilment cash flows]], [[Risk Adjustment for Non-Financial Risk|risk adjustment]] and [[Contractual Service Margin|CSM]]. They are **never netted** against the underlying insurance contract liabilities, and several measurement rules are deliberately mirror-images of those for contracts issued.

> $$\text{Reinsurance asset} = \text{PV(recoveries)} - \text{PV(ceded premiums)} + \text{RA} + \text{CSM}$$

- **No netting, ever.** The balance sheet shows gross [[Insurance Contract Liabilities]] and a separate reinsurance asset. The purpose is to make **counterparty exposure visible** — a heavily reinsured insurer now displays how much of its balance sheet depends on someone else's solvency.
- **The risk adjustment has the opposite sign in effect.** For contracts issued, the RA increases the liability; for reinsurance held, it represents risk **transferred away** and therefore **increases the asset**. Getting this sign wrong is the most common IFRS 17 reinsurance error.
- **Non-performance risk is separate and explicit.** The reinsurer's credit risk — including disputes and collectability, not only default — reduces the asset, and changes in it go through profit or loss. This is distinct from the risk adjustment.
- **The CSM can be a net cost.** Reinsurance is usually bought at a price above expected recoveries, so the "profit" on the contract is negative. IFRS 17 nonetheless defers it as a CSM (a net cost of purchasing reinsurance) rather than recognising it immediately — the **no day-one loss** treatment, the reverse of the onerous rule for contracts issued.
- **The loss-recovery component.** Where reinsurance covers an [[Onerous Contract|onerous]] group, a loss-recovery component is recognised on the reinsurance asset **at the same time** as the loss on the underlying group, so the two are matched rather than the loss appearing first.
- **[[Premium Allocation Approach|PAA]] eligibility is assessed separately** for reinsurance held, and a treaty covering multiple underwriting years or with a long coverage period may need the [[General Measurement Model|GMM]] even where the underlying business uses the PAA.

> [!example]- Measuring the Reinsurance Asset {Example}
> An insurer buys a quota share ceding $30\%$. Ceded premium is $\$60$ million, expected recoveries have a present value of $\$52$ million, the ceding commission is $\$14$ million, the risk adjustment on risk transferred is $\$3$ million, and the allowance for reinsurer non-performance is $\$1.2$ million.
>
> Measure the asset at initial recognition and state the presentation.
>
> > [!answer]-
> > **Fulfilment cash flows** on the reinsurance held, from the cedant's perspective — recoveries in, ceded premium out, commission in:
> >
> > $$\begin{align*}
> > \text{Net inflows} &= \$52\text{M} + \$14\text{M} - \$60\text{M} \\
> > &= \$6\text{M}
> > \end{align*}$$
> >
> > **Add the risk adjustment** for risk transferred (it increases the asset):
> >
> > $$\$6\text{M} + \$3\text{M} = \$9\text{M}$$
> >
> > **Deduct non-performance risk:**
> >
> > $$\$9\text{M} - \$1.2\text{M} = \$7.8\text{M}$$
> >
> > **CSM.** Since the fulfilment cash flows are favourable to the cedant, a CSM of $\$7.8$ million is established so that no gain is recognised at inception; the asset carries at $\$7.8$M net and the CSM releases as coverage is received.
> >
> > **Presentation.** The asset appears on its own line — it does **not** reduce the gross liabilities. If the insurer's gross [[Liability for Incurred Claims|LIC]] is $\$400$ million and the reinsurance share of it is $\$120$ million, the balance sheet shows $\$400$ million of liability and a $\$120$ million-plus asset, not $\$280$ million net.
> >
> > **Why that matters.** The gross-up makes the insurer's dependence on its reinsurers plain: a reader can now see that $30\%$ of the claim liability is recoverable from third parties, and can ask who they are and how they are rated. Under netting, that exposure was invisible.
