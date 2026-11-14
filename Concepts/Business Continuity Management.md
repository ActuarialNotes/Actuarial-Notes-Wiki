---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:5eaebcb991ec6a88e0204c8bde74d1cf069ea3530b9d3b9d9dbf4c9821b3218b
  sources:
    - "NIST SP 800-34 Rev. 1, Contingency Planning Guide for Federal Information Systems (2010), ES-1 (policy), §3.2 BIA, §3.2.1 RTO/MTD, §3.4.2 sites, §3.5.3 exercises, §3.6 maintenance, sha256:476f04d4c60b0770c1ac8b2720551972074ce78e936a3e7a535048416111d0df — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf"
    - "Mid Sussex District Council, Business Continuity Policy Appendix A: Terms & Definitions (2019, citing ISO 22301), p.2, sha256:3550ebea9d87cf22770286c01a673a36a75c26d93818bfb7dfbac85a7ccb9315 — https://www.midsussex.gov.uk/media/4134/business-continuity-policy-appendix-a.pdf"
    - "Ready.gov (FEMA), Business Impact Analysis page, read via WebFetch 2026-10-10 (direct fetch 403; no hash) — https://www.ready.gov/business-impact-analysis"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Business Continuity Management.md
---

**Business Continuity Management** (BCM) is the management process that keeps an organization able to deliver its key products and services at an acceptable level during a disruption, and restores them within set times afterward. ISO 22301 sets the requirements for a business continuity management system, and BCM is one of the disciplines behind [[Organizational Resilience|organizational resilience]].

BCM starts with a policy, approved by senior management, that sets its scope and assigns responsibility. It then runs as a cycle:

1. A business impact analysis finds what matters most and how long each activity can be down.
2. Recovery objectives are set from it.
3. Strategies are chosen to meet them.
4. A [[Business Continuity Plan|business continuity plan]] documents the response.
5. Testing and review keep the plan working.

Training and awareness embed BCM, so that continuity is part of how the organization works rather than a binder on a shelf.

## Business impact analysis

The business impact analysis (BIA) lists the organization's activities, the resources each depends on (people, premises, systems, data and suppliers), and how the impact of losing each grows over time. It ranks activities by urgency, so the most time-critical are recovered first. The BIA measures the consequences of losing an activity, whatever causes it. A [[Risk Assessment|risk assessment]] sits beside it, judging which threats could cause an interruption and how likely they are.

## Maximum tolerable period of disruption

An interruption of an activity costs the organization at a rate $\ell(s)$, per hour or per day, at time $s$ after it starts. The rate counts lost revenue, extra expense, regulatory penalties and harm to reputation, and it usually rises over time. The cumulative impact of an interruption lasting $t$ is

> $$I(t) = \int_0^t \ell(s)\, ds$$

The maximum tolerable period of disruption (MTPD) is how long the activity can be down before the impact becomes unacceptable. If $T$ is the most impact the organization can tolerate, the MTPD is

> $$\text{MTPD} = \min\{\, t : I(t) \ge T \,\}$$

> [!example]- What is each activity's MTPD, and which is recovered first? {Example}
> An insurer can tolerate an impact of \$300,000 from the loss of any one activity. With illustrative figures, its BIA finds:
>
> | Activity | Daily impact ($) |
> | :--- | :--- |
> | Policy administration | 150,000 from the start |
> | Claims payment | 40,000 for two days, then 120,000 |
> | New business underwriting | 25,000 |
>
> > [!answer]-
> > - With a constant rate, the MTPD is the tolerance divided by the daily impact: $300{,}000/150{,}000 = 2$ days for policy administration and $300{,}000/25{,}000 = 12$ days for underwriting.
> > - Claims payment costs \$80,000 over the first two days, so the remaining \$220,000 of tolerance runs out at the higher rate.
> > - Its MTPD is $2 + 220{,}000/120{,}000 \approx 3.83$ days.
> > - At the early rate alone, claims payment would look like it could wait 7.5 days, which is why a BIA looks at how impact grows over time.
> > - Policy administration is recovered first, then claims payment, then underwriting.

## Recovery objectives

The recovery time objective (RTO) is the target time to resume an activity after a disruption. It is set inside the MTPD, leaving a margin for detecting the problem, deciding to invoke the plan and checking that recovery worked, so

> $$\text{RTO} < \text{MTPD}$$

An RTO equal to the MTPD leaves no margin, and one longer than it accepts an intolerable impact.

The recovery point objective (RPO) is the most data the organization can afford to lose, measured as time back to the last usable copy, and it decides how often data is backed up or replicated. The RTO is how quickly an activity must resume, and the RPO is how much data may be lost. A nightly backup sets an RPO of up to a day, whatever the RTO is.

## Recovery strategies

Strategies are chosen to meet the RTO at acceptable cost. They include alternate work sites, staff working from home, backup data centres (a hot site, a warm site with equipment ready, a cold site with space only), extra suppliers, stockpiles, and [[Risk Transfer|insurance]] such as [[Business Income Coverage|business income coverage]] for the loss that can't be avoided. Check the recovery time against the MTPD before comparing costs, and choose the cheapest strategy among those that meet it.

> [!example]- Which recovery site should the insurer choose for policy administration? {Example}
> Policy administration costs \$150,000 a day when down and has an MTPD of 2 days. The chance of an outage needing a site is 5% a year.
>
> | Site | Annual cost ($) | Recovery time |
> | :--- | ---: | :--- |
> | Hot | 180,000 | Half a day |
> | Warm | 60,000 | 3 days |
> | Cold | 15,000 | 10 days |
>
> > [!answer]-
> > - The expected annual cost is the site cost plus 5% of the impact over the recovery time.
> > - That is $180{,}000 + 0.05(75{,}000) = \$183{,}750$ for the hot site, $60{,}000 + 0.05(450{,}000) = \$82{,}500$ for the warm site and $15{,}000 + 0.05(1{,}500{,}000) = \$90{,}000$ for the cold site.
> > - The warm site is cheapest on expected cost, but its 3-day recovery is longer than the 2-day MTPD, and an outage would cost \$450,000, more than the organization can tolerate.
> > - Only the hot site meets the recovery objective, so it is the strategy BCM chooses.

## Testing and maintenance

A plan nobody has tested often fails when needed. Testing ranges from a desk check of the plan and a tabletop walkthrough of a scenario, through simulations, to a full switch of operations to the backup site. Each test, and each real incident, is followed by a review that updates the plan, and the plan is reviewed again whenever the business changes.

> [!trap] Choosing the cheapest strategy that misses the recovery objective
> A strategy that minimizes expected cost but misses the recovery objective fails BCM's test. The tolerance is a constraint, not one more cost to average.
