---
verification:
  status: unverified
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:7db05463bdd29f3ccfe5b803534046f1a997330dfaa421dc062c2c70c0c98f1e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Contractual Service Margin.md
---

![[Media/Figures/Contractual_Service_Margin.svg|340]]

The **Contractual Service Margin** (CSM) is the [[IFRS 17]] building block that holds the unearned profit on a group of insurance contracts. At initial recognition it is set at the amount that makes the group produce no gain on day one, so the CSM at inception, $\text{CSM}_0$, is

> $$\text{CSM}_0 = \max\bigl(0,\; \text{PV}_{\text{in}} - \text{PV}_{\text{out}} - \text{RA}\bigr)$$

- $\text{PV}_{\text{in}}$ is the present value of the group's future cash inflows.
- $\text{PV}_{\text{out}}$ is the present value of its future cash outflows.
- $\text{RA}$ is the [[Risk Adjustment for Non-Financial Risk|risk adjustment for non-financial risk]].

A day-one loss, unlike a gain, is recognised at once. If the outflows and risk adjustment exceed the inflows, the group is [[Onerous Contract|onerous]], the loss goes straight to profit or loss, and there is no CSM.

Interest accretes on the CSM at the discount rate locked in at initial recognition, not at current rates. It is one of the few places IFRS 17 keeps a historical rate.

## Release over coverage units

The CSM is released to [[Insurance Revenue|revenue]] as coverage is provided. Each period's release is in proportion to the [[Coverage Units|coverage units]] provided in that period out of the total expected, so a period covering more or larger risks releases more profit.

> [!example]- What is this group's CSM at inception, and how much is released in year 1? {Example}
> A three-year group of contracts is written for premium of $\$60$ million received at inception. The present value of expected claims and expenses is $\$44$ million and the risk adjustment is $\$5$ million. Coverage units are expected to be $40\%$, $35\%$ and $25\%$ across the three years. Ignore interest accretion.
>
> > [!answer]-
> > - The CSM at inception is $\$60\text{M} - \$44\text{M} - \$5\text{M} = \$11\text{M}$, and no gain is recognised at inception.
> > - Year 1 provides $40\%$ of the coverage units, so it releases $0.40 \times \$11\text{M} = \$4.4\text{M}$.
> > - The CSM left at the end of year 1 is $\$11\text{M} - \$4.4\text{M} = \$6.6\text{M}$.

## Changes in estimates

Revisions to estimates of cash flows for future service adjust the CSM rather than profit, so their effect is spread over the remaining coverage. Changes that relate to past service, such as claims experience and revisions to the [[Liability for Incurred Claims|LIC]], go straight to profit or loss.

The CSM cannot go negative. If an unfavourable revision exceeds the remaining CSM, the CSM is reduced to zero and the excess is recognised as a loss, creating a [[Loss Component|loss component]].

> [!example]- At the end of year 1, expected claims for years 2 and 3 rise by $\$4$ million. What happens to the CSM of $\$6.6$ million? {Example}
> - The revision relates to future service, years 2 and 3, so it adjusts the CSM rather than profit.
> - The CSM falls to $\$6.6\text{M} - \$4\text{M} = \$2.6\text{M}$, and year 1 profit is unaffected.
> - Had the $\$4$ million been adverse development on claims already incurred, it would relate to past service and hit profit or loss at once.
> - Had the revision been $\$8$ million, the CSM would fall to zero and the remaining $\$8\text{M} - \$6.6\text{M} = \$1.4\text{M}$ would be a loss, creating a loss component.

## The CSM in P&C insurance

P&C insurers see relatively little of the CSM. Most Canadian P&C business is measured under the [[Premium Allocation Approach|PAA]], which has no CSM in the [[Liability for Remaining Coverage|LRC]], and the LIC never has one. The CSM matters for multi-year contracts, some commercial business and [[Reinsurance Contracts Held|reinsurance held]], where it can be an asset representing the net cost of reinsurance.
