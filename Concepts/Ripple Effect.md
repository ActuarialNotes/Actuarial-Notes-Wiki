---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:08a70dd434affab03973a64313ff38ddc7d7e925f19a046d284a7444741452e6
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ripple Effect.md
---

![[Media/Figures/Ripple_Effect.svg|340]]

A **Ripple Effect** is a second-order consequence that follows from an adverse scenario, beyond its direct financial impact. [[FCT]] requires the [[Appointed Actuary]] to model ripple effects, because a scenario examined only for its immediate effect understates its severity, sometimes by a wide margin.

The typical ripple effects depend on the scenario:

| Scenario | Typical ripple effects |
| :--- | :--- |
| Catastrophe | Reinstatement premium payable immediately. Reinsurance renewal at much higher cost or reduced capacity. A [[Rating Agency]] downgrade, then higher borrowing costs, impaired access to capital markets and less new business. Operational disruption if the event hit the insurer's own region. |
| Reserve deterioration | Loss of regulatory and market confidence. A rating downgrade. Re-pricing that loses business. More [[OSFI]] scrutiny and possible limits on dividends and growth. Continued losses on business still being written, since inadequate reserves usually mean inadequate rates. |
| Investment loss | Less [[Capital Available]], which raises the cost of writing business. Forced asset sales that realise further losses. A market risk profile that may worsen if the remaining portfolio is less liquid. |

The effects compound. A $\$50$ million catastrophe that triggers a downgrade, a $30\%$ rise in reinsurance cost and a $10\%$ loss of business is not a $\$50$ million event.

> [!example]- How does this catastrophe move the MCT ratio, with and without ripple effects? {Example}
> An insurer suffers a $\$60$ million net catastrophe loss. Its capital available before the event is $\$340$ million, its minimum capital required under the [[MCT]] is $\$200$ million, and its tax rate is $27\%$. The ripple effects are:
>
> | Ripple effect | Cost |
> | :--- | ---: |
> | Reinstatement premium (year 1) | $\$8$ million |
> | Higher reinsurance renewal cost | $\$12$ million a year |
> | Lost underwriting contribution after a downgrade | $\$14$ million a year |
> | Higher borrowing costs | $\$3$ million a year |
>
> > [!answer]-
> > - With the direct loss only, capital available is $\$340\text{M} - 0.73 \times \$60\text{M} = \$296.2$ million, an MCT ratio of $148\%$, just below the supervisory target.
> > - With ripple effects, year 1 also pays the reinstatement premium: $\$340\text{M} - 0.73 \times \$68\text{M} = \$290.4$ million, or $145\%$.
> > - From year 2 the recurring costs take $0.73 \times (\$12\text{M} + \$14\text{M} + \$3\text{M}) = \$21.2$ million a year.
> > - Capital available falls to $\$269.2$ million ($135\%$) in year 2 and $\$248.0$ million ($124\%$) in year 3.
> > - The direct view shows a one-time dip to $148\%$. The ripple view shows a continuing decline to $124\%$ that calls for a capital plan, such as multi-year reinsurance terms and a higher [[Internal Target Capital Ratio|internal target]].

## Management actions

FCT requires both sides of a scenario: the ripple effects that worsen it and the realistic management actions that mitigate it. Some actions available in normal conditions, such as raising capital or buying reinsurance, are unavailable in the scenario that created the need for them.

> [!trap] Leaving out the feedback into pricing
> The most commonly omitted ripple effect is the feedback into pricing. The events that damage capital usually also mean that the business currently being written is underpriced, so losses continue after the event.
