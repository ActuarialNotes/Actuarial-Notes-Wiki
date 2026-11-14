---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4265833c21ebfd78a64bc55612df3bdd8f5995fb2e049eba41d989f1c5205395
  sources:
    - "ISO 22316:2017 Security and resilience - Organizational resilience - Principles and attributes (SSB national adoption preview), contents (clauses 5.2-5.10) and Introduction, sha256:df65a9597e1243277410a09603a95608399fec48f8360bcc242eaec5e302675e — https://www.ssb.sr/media/1175/afschrift-ssb-iso-22316_2017-e.pdf"
    - "NIST SP 800-160 Vol. 2 Rev. 1, Developing Cyber-Resilient Systems (2021), Appendix B p.76 (NIAC 2010 definition: anticipate, absorb, adapt to, rapidly recover), sha256:d3e9830faadfd1e7a43392194320c5203935c3d7f30f78896b55a8a53e0f0b15 — https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-160v2r1.pdf"
    - "Bruneau et al., A Framework to Quantitatively Assess and Enhance the Seismic Resilience of Communities, Earthquake Spectra 19(4) 2003 (author copy), pp.736-737 (Q(t), loss of resilience integral; robustness, redundancy), sha256:38afd71aebf6f552712b9100e09b5938a5f04e18bc2d0bc1f795011d3e9bd8b7 — https://www.eng.buffalo.edu/~bruneau/EERI%202003%20Bruneau%20et%20al.pdf"
    - "Mid Sussex District Council, Business Continuity Policy Appendix A: Terms & Definitions (2019, citing ISO 22301), p.2, sha256:3550ebea9d87cf22770286c01a673a36a75c26d93818bfb7dfbac85a7ccb9315 — https://www.midsussex.gov.uk/media/4134/business-continuity-policy-appendix-a.pdf"
    - "COSO, Enterprise Risk Management: Integrating with Strategy and Performance, Executive Summary (June 2017), p.6 (ERM enhances resilience: anticipate and respond), sha256:2d4809dd09687d701944987f65ca6ddc39074a00236abebfd436d79f4563abd1 — https://www.coso.org/_files/ugd/3059fc_61ea5985b03c4293960642fdce408eaa.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Organizational Resilience.md
---

**Organizational Resilience** (organizational resiliency) is an organization's ability to anticipate, absorb, adapt to and recover from disruptions, expected or not, so that it keeps delivering its objectives and can come out of the event stronger. It is a property of the whole organization, built from its strategy, culture, leadership, resources and [[Enterprise Risk Management|risk management]].

Resilience is built from four capabilities:

1. **Anticipate.** The organization scans its environment for threats and changes before they arrive, through [[Risk Identification|risk identification]], horizon scanning for [[Emerging Risk|emerging risks]], scenario work and [[Stress Testing|stress testing]]. Knowing its critical dependencies, such as key suppliers, systems and people, is part of anticipating.
2. **Absorb.** Buffers limit the immediate damage. They include redundancy (a second supplier or data centre), slack resources, [[Capital|capital]] and liquidity, and [[Risk Transfer|risk transfer]] such as [[Business Income Coverage|business income insurance]], which replaces lost profit while operations are restored.
3. **Adapt.** The organization changes how it works to fit the new conditions, by rerouting supply, changing products, moving staff or redesigning processes. Adaptation needs a culture that shares information and leaders who can decide quickly with incomplete facts.
4. **Recover.** Plans and resources bring operations back to normal, or to a better new normal. Business continuity and disaster recovery plans are the main tools here, and a review after the event feeds lessons back into anticipation.

> [!example]- How resilient was this insurer, capability by capability? {Example}
> A regional insurer outsources first notice of loss for auto claims to a single vendor. A ransomware attack takes the vendor offline for nine days during a hailstorm. The insurer's staff take claims by email and spreadsheet, a backlog of 4,000 claims builds up, and complaints to the regulator rise. Afterwards the insurer adds a second vendor, brings a small intake team in house, writes vendor outages into its continuity plan, and adds vendor cyber controls to its supplier reviews.
>
> > [!answer]-
> > - Anticipating was weak before the event. The vendor was a single point of failure that the insurer had not mapped, and a cyber attack on a supplier was not in its scenarios. The new supplier reviews close that gap.
> > - Absorbing was limited. The insurer had no backup vendor and no spare intake capacity, so a vendor outage during a storm turned straight into a backlog.
> > - Adapting went reasonably well. Staff improvised a manual intake process that kept claims coming in.
> > - Recovering was slow, because there was no plan for the scenario and recovery waited on the vendor. The second vendor and in-house team should shorten recovery and keep the drop shallow next time.
> > - The regulatory complaints show why this matters to an insurer: [[Claims Handling|claims handling]] is the moment its promise to policyholders is tested, so a disruption there damages its reputation and its standing with regulators as well as its costs.

## Measuring resilience

Let $Q(t)$ be the organization's performance at time $t$, such as output, policies serviced or claims paid, as a share of normal performance $Q_0$. If a disruption strikes at $t_0$ and the window being measured ends at $t_1$, the performance lost over the window is

> $$\text{RL} = \int_{t_0}^{t_1} \left[\, Q_0 - Q(t) \,\right] dt$$

- $\text{RL}$ is the resilience loss, the area of the "resilience triangle" between normal and actual performance.

The share of normal performance delivered over the window is

> $$R = \frac{1}{Q_0\,(t_1 - t_0)} \int_{t_0}^{t_1} Q(t)\, dt$$

A resilient organization keeps the drop $Q_0 - Q(t_0)$ shallow and the recovery short, so $\text{RL}$ is small and $R$ is close to 1. A short recovery after a deep drop can lose more than a longer recovery after a shallow one, so the whole area of lost performance is compared, not just the time to get back to normal.

> [!example]- What resilience and gross profit does each manufacturer lose after the supplier fire? {Example}
> Two manufacturers each lose their main component supplier to a fire. Each normally earns gross profit of \$50,000 a day. Firm A has a single supplier, so its output falls to 40% of normal at once and climbs back in a straight line to 100% over 30 days while it qualifies a new supplier. Firm B keeps a second qualified supplier and a safety stock, so its output falls only to 80% and recovers in a straight line over 20 days. The window is the 30 days after the fire.
>
> > [!answer]-
> > - With performance in percentage points, each loss is a triangle: half the drop times the recovery time.
> > - Firm A: $\text{RL}_A = \tfrac{1}{2}(100 - 40)(30) = 900$, so $R_A = 1 - 900/3{,}000 = 0.700$.
> > - Firm B: $\text{RL}_B = \tfrac{1}{2}(100 - 80)(20) = 200$, so $R_B = 1 - 200/3{,}000 = 0.933$.
> > - A loss of 900 percentage-point-days is 9 full days of output, so Firm A loses $9 \times \$50{,}000 = \$450{,}000$ of gross profit. Firm B loses 2 days, or \$100,000.
> > - The second supplier helps twice: it absorbs the shock by keeping the drop shallow, and it speeds recovery because there is no supplier to qualify.

## Resilience, ERM and business continuity

[[Enterprise Risk Management|ERM]] identifies, measures and treats risks the organization can name, within its [[Risk Appetite|risk appetite]]. Resilience adds the capacity to cope with events nobody foresaw. ERM reduces the chance and size of known losses, and resilience limits the damage of whatever still gets through.

[[Business Continuity Management|Business continuity management]] restores defined activities after an interruption, within set recovery times. It is one of the disciplines that make an organization resilient, together with crisis management, [[Operational Risk|operational risk]] management, information security and supply chain management. ISO 22316, the international guidance on resilience, treats coordinating these disciplines as one of the attributes of a resilient organization, alongside a shared vision, effective leadership, a supportive culture, shared information and available resources.

> [!trap] Relying on insurance for resilience
> Business income insurance replaces lost profit, but it doesn't keep customers served or rebuild a supply chain. Firm A could insure part of its loss with contingent business income coverage, but insurance pays for the loss after the fact and doesn't keep its customers supplied.
