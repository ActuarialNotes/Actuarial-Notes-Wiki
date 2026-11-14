---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:8c8b98a1237808e77099863a246ea459ee0699778e4b7a497d4d2acfc83ca047
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reverse Stress Testing.md
---

![[Media/Figures/Reverse_Stress_Testing.svg|340]]

**Reverse Stress Testing** is a stress test that starts from the insurer becoming non-viable and works backwards to the events that would cause it. It asks "what would have to occur for this insurer to become non-viable?" rather than "what happens if this occurs?". It is a required element of [[FCT]] and a standard tool in [[ORSA]].

A reverse stress test has four steps:

1. **Define non-viability.** The endpoint is the point at which the business model fails: capital below the minimum, an inability to meet obligations, or a loss of market access from which the insurer cannot recover. A bad year is not enough.
2. **Search for the combinations that reach it.** The search runs over every combination of events that could produce the endpoint, not only the risks management already has in mind.
3. **Judge plausibility afterwards.** A scenario is first identified as a failure mode and only then judged for how plausible it is. Filtering for plausibility first defeats the purpose.
4. **Respond.** If a failure mode is credible, the insurer holds capital against it, reduces the exposure that creates it, or documents a plan for responding to it. The results feed the [[Internal Target Capital Ratio|internal target]] and the recovery plan.

The output is a description of failure modes, qualitative as much as quantitative. Naming the combination is often worth more than pricing its probability, because the response (a limit, a diversification requirement, a contingency plan) follows from the naming.

## Reverse and forward stress tests

Forward [[Stress Testing|stress tests]] test the risks management chose to test. A reverse test starts from an outcome, so it surfaces the exposure nobody was watching: a single reinsurer, a single distribution channel, a single jurisdiction's regulatory decision.

> [!example]- What would make this insurer non-viable? {Example}
> An insurer has an [[MCT]] ratio of $185\%$, with capital available of $\$370$ million and minimum capital required of $\$200$ million. Its tax rate is $27\%$, and it has $\$900$ million of claim liabilities and $\$500$ million of annual premium. Its bond-dominated portfolio would lose $\$233$ million only in a market event more severe than 2008.
>
> > [!answer]-
> > - Non-viability means capital available below $\$200$ million, a loss of $\$370\text{M} - \$200\text{M} = \$170$ million after tax.
> > - Before tax that is $\$170\text{M} / 0.73 = \$233$ million.
> > - A 1-in-250 catastrophe costing $\$310$ million gross, with $\$270$ million reinsured and $60\%$ of that with one reinsurer that fails, leaves $\$40\text{M} + 0.6 \times \$270\text{M} = \$202$ million, close to the target before reinstatement costs.
> > - A $15\%$ reserve deficiency on $\$900$ million is $\$135$ million, and three years at a $107\%$ combined ratio on $\$500$ million of premium add $3 \times 0.07 \times \$500\text{M} = \$105$ million, together $\$240$ million, which is enough.
> > - The investment portfolio alone is not enough, which is itself a finding.
> > - The failure modes are reinsurer concentration and reserve error combined with rate suppression. The insurer responds by capping any one reinsurer's share of the catastrophe program, setting its internal target above what the second combination implies, and adding the first combination to its FCT adverse scenarios.

> [!trap] Starting with a plausibility filter
> Screening scenarios for plausibility before searching for failure modes keeps the test on the risks management already expects. Find what breaks the insurer first, then judge how plausible it is.
