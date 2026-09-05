---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d70da81579de0fb51f3233d02fbec6ae554a5b53de20aeecefde63f73996727d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Contractual Service Margin.md
---

**The Contractual Service Margin** (CSM) is the [[IFRS 17]] building block holding the **unearned profit** on a group of insurance contracts. At initial recognition it is set at exactly the amount that makes the total liability produce **no gain on day one**; it is then released to [[Insurance Revenue|revenue]] as coverage is provided, measured in [[Coverage Units]].

> $$\text{CSM}_0 = -\bigl(\text{PV of future cash inflows} - \text{PV of outflows} - \text{RA}\bigr)$$

- **No day-one gain, but a day-one loss is recognised immediately.** If the fulfilment cash flows are *negative* in the insurer's favour there is profit, and it is deferred as CSM; if they are unfavourable the group is [[Onerous Contract|onerous]] and the loss goes straight to profit or loss with **no CSM at all**. The asymmetry is deliberate.
- **Release over [[Coverage Units]].** Each period, the CSM is allocated to revenue in proportion to the coverage units provided that period out of the total expected — so a group covering more or larger risks in a period releases more profit then.
- **The CSM absorbs changes in future service.** Favourable or unfavourable revisions to estimates of *future* cash flows adjust the CSM rather than hitting profit immediately — a shock absorber that spreads the effect over the remaining coverage. **Changes relating to past service** (claims experience, revisions to the [[Liability for Incurred Claims|LIC]]) go straight to profit.
- **The CSM cannot go negative.** If an unfavourable revision exceeds the remaining CSM, the CSM is reduced to zero and the excess is recognised as a loss, creating a [[Loss Component]].
- **P&C insurers see relatively little of it.** Most Canadian P&C business is measured under the [[Premium Allocation Approach|PAA]], which has no CSM for the [[Liability for Remaining Coverage|LRC]], and the [[Liability for Incurred Claims|LIC]] never has one. The CSM matters for multi-year contracts, some commercial business, and — importantly — **[[Reinsurance Contracts Held|reinsurance held]]**, where the CSM can be an asset representing the net cost of reinsurance.
- Interest accretes on the CSM at the **locked-in discount rate** at initial recognition, not at current rates — one of the few places IFRS 17 retains a historical rate.

> [!example]- Setting and Releasing the CSM {Example}
> A three-year group of contracts is written for premium of $\$60$ million received at inception. The present value of expected claims and expenses is $\$44$ million and the risk adjustment is $\$5$ million. Coverage units are expected to be $40\%$, $35\%$ and $25\%$ across the three years. Ignore interest accretion.
>
> Compute the CSM at inception and the amount released in year 1. Then suppose that at the end of year 1, expected future claims for years 2 and 3 rise by $\$4$ million.
>
> > [!answer]-
> > **At inception:**
> >
> > $$\begin{align*}
> > \text{CSM}_0 &= \$60\text{M} - \$44\text{M} - \$5\text{M} \\
> > &= \$11\text{M}
> > \end{align*}$$
> >
> > No gain is recognised at inception; the whole $\$11$ million is deferred.
> >
> > **Year 1 release:**
> >
> > $$0.40 \times \$11\text{M} = \$4.4\text{M}$$
> >
> > leaving a CSM of $\$6.6$ million.
> >
> > **The unfavourable revision.** The $\$4$ million relates to **future service** (years 2 and 3), so it adjusts the CSM rather than hitting profit:
> >
> > $$\$6.6\text{M} - \$4\text{M} = \$2.6\text{M}$$
> >
> > Profit for year 1 is unaffected by the revision — the entire effect is absorbed and will emerge as reduced profit in years 2 and 3. **This is the CSM's purpose**: it smooths revisions to future expectations.
> >
> > **The contrast worth drawing.** Had the $\$4$ million instead been adverse development on claims *already incurred*, it would relate to **past service** and would hit profit or loss immediately, with no CSM absorption. And had the revision been $\$8$ million rather than $\$4$ million, the CSM would fall to zero and the remaining $\$1.4$ million would be recognised as a loss, creating a [[Loss Component]] — the CSM has a floor at zero.
