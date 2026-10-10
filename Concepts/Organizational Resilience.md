---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b7f42531c69461a72965fcc5fa53e28f41b405eb155c7c6f337e74a3ddf928fc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Organizational Resilience.md
---

**Organizational Resilience** (organizational resiliency) is an organization's ability to anticipate, absorb, adapt to and recover from disruptions, expected or not, so that it keeps delivering its objectives and can come out of the event stronger. It is wider than [[Business Continuity Management|business continuity management]], which restores particular activities after an interruption: resilience is a property of the whole organization, built from its strategy, culture, leadership, resources and [[Enterprise Risk Management|risk management]]. ISO 22316 gives the international guidance on it.

> $$\text{RL} = \int_{t_0}^{t_1} \left[\, Q_0 - Q(t) \,\right] dt$$

> $$R = \frac{1}{Q_0\,(t_1 - t_0)} \int_{t_0}^{t_1} Q(t)\, dt$$

- **Symbols:** $Q(t)$ is the organization's performance at time $t$, such as output, policies serviced or claims paid, as a share of normal. $Q_0$ is normal performance, $t_0$ is when the disruption strikes and $t_1$ is the end of the window being measured. $\text{RL}$ is the resilience loss, the area of the "resilience triangle" between normal and actual performance, and $R$ is the share of normal performance delivered over the window. A resilient organization keeps the drop $Q_0 - Q(t_0)$ shallow and the recovery short, so $\text{RL}$ is small and $R$ is close to 1.
- **Anticipate:** The organization scans its environment for threats and changes before they arrive, through [[Risk Identification|risk identification]], horizon scanning for [[Emerging Risk|emerging risks]], scenario work and [[Stress Testing|stress testing]]. Knowing its critical dependencies, such as key suppliers, systems and people, is part of anticipating.
- **Absorb:** Buffers limit the immediate damage. They include redundancy (a second supplier or data centre), slack resources, [[Capital|capital]] and liquidity, and [[Risk Transfer|risk transfer]] such as [[Business Income Coverage|business income insurance]], which replaces lost profit while operations are restored.
- **Adapt:** The organization changes how it works to fit the new conditions, by rerouting supply, changing products, moving staff or redesigning processes. Adaptation needs a culture that shares information and leaders who can decide quickly with incomplete facts.
- **Recover:** Plans and resources bring operations back to normal, or to a better new normal. Business continuity and disaster recovery plans are the main tools here, and a review after the event feeds lessons back into anticipation.
- **Relation to ERM:** [[Enterprise Risk Management|ERM]] identifies, measures and treats risks the organization can name, within its [[Risk Appetite|risk appetite]]. Resilience adds the capacity to cope with events nobody foresaw, so the two complement each other: ERM reduces the chance and size of known losses, while resilience limits the damage of whatever still gets through.
- **Relation to business continuity:** Business continuity management is one of the disciplines that make an organization resilient, together with crisis management, [[Operational Risk|operational risk]] management, information security and supply chain management. ISO 22316 treats coordinating these disciplines as one of the attributes of a resilient organization, alongside a shared vision, effective leadership, a supportive culture, shared information and available resources.

> [!example]- Measuring Two Manufacturers After a Supplier Fire {Example}
> Two manufacturers each lose their main component supplier to a fire. Each normally earns gross profit of \$50,000 a day. Firm A has a single supplier, so its output falls to 40% of normal at once and climbs back in a straight line to 100% over 30 days while it qualifies a new supplier. Firm B keeps a second qualified supplier and a safety stock, so its output falls only to 80% and recovers in a straight line over 20 days. Measure each firm's resilience over the 30 days after the fire, and the gross profit each loses.
>
> > [!answer]-
> > With performance in percentage points, each loss is a triangle: half the drop times the recovery time.
> > $$
> > \begin{align*}
> > \text{RL}_A &= \tfrac{1}{2}(100 - 40)(30) \\
> > &= 900 \\
> > R_A &= 1 - \frac{900}{100 \times 30} \\
> > &= 0.700 \\
> > \text{RL}_B &= \tfrac{1}{2}(100 - 80)(20) \\
> > &= 200 \\
> > R_B &= 1 - \frac{200}{100 \times 30} \\
> > &= 0.933
> > \end{align*}
> > $$
> > A loss of 900 percentage-point-days is 9 full days of output, so Firm A loses $9 \times \$50{,}000 = \$450{,}000$ of gross profit. Firm B loses 2 days, or \$100,000. The second supplier helps twice: it absorbs the shock by keeping the drop shallow, and it speeds recovery because there is no supplier to qualify. Firm A could insure part of its loss with [[Business Income Coverage|contingent business income coverage]], but insurance pays for the loss after the fact and doesn't keep its customers supplied.

> [!example]- Assessing an Insurer After a Claims Vendor Outage {Example}
> A regional insurer outsources first notice of loss for auto claims to a single vendor. A ransomware attack takes the vendor offline for nine days during a hailstorm. The insurer's staff take claims by email and spreadsheet, a backlog of 4,000 claims builds up, and complaints to the regulator rise. Afterwards the insurer adds a second vendor, brings a small intake team in house, writes vendor outages into its continuity plan, and adds vendor cyber controls to its supplier reviews. Assess the insurer's resilience using the four capabilities.
>
> > [!answer]-
> > - **Anticipate:** This was weak before the event. The vendor was a single point of failure that the insurer had not mapped, and a cyber attack on a supplier was not in its scenarios. The new supplier reviews close that gap.
> > - **Absorb:** This was limited. The insurer had no backup vendor and no spare intake capacity, so a vendor outage during a storm turned straight into a backlog.
> > - **Adapt:** This went reasonably well. Staff improvised a manual intake process that kept claims coming in, which shows a culture willing to change how work is done.
> > - **Recover:** This was slow, because there was no plan for the scenario and recovery waited on the vendor. The second vendor and in-house team should shorten recovery and keep the drop shallow next time.
> >
> > The changes improve all four capabilities, and the regulatory complaints show why this matters to an insurer: [[Claims Handling|claims handling]] is the moment its promise to policyholders is tested, so a disruption there damages its reputation and its standing with regulators as well as its costs.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The business continuity section opens with organizational resiliency. Questions describe a disruption and ask which capability a given action shows (anticipating, absorbing, adapting or recovering), or ask how resilience differs from business continuity and from ERM.
> - **DISC-RM:** Application questions give a short case, often a supply chain or technology failure, and ask which step would most improve the organization's resilience. The best answer usually removes a single point of failure or improves how information is shared, rather than buying more insurance.

> [!warning]- Exam traps
> - **Resilience is not business continuity:** Business continuity restores defined activities after an interruption, within set recovery times. Resilience is the broader ability of the whole organization to anticipate and adapt, including to events no plan covers, so an answer that treats a continuity plan as the whole of resilience is incomplete.
> - **Insurance absorbs cost, not disruption:** Business income insurance replaces lost profit, but it doesn't keep customers served or rebuild a supply chain. A case answer that relies on insurance alone misses the operational part of resilience.
> - **Recovery is not the only measure:** A short recovery after a deep drop can lose more than a longer recovery after a shallow one. Compare the whole area of lost performance, not just the time to get back to normal.
> - **Anticipating is not predicting:** Resilience does not require forecasting the exact event. It requires knowing the organization's critical dependencies and keeping the capacity to respond, so "the event was unforeseeable" is not a reason the organization could not have been resilient to it.
