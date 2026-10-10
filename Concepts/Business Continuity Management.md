---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5a08d123b36cccd91bbafc2e051a29499b3becbebcaeb7321b2e2487ed729786
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Business Continuity Management.md
---

**Business Continuity Management** (BCM) is the management process that keeps an organization able to deliver its key products and services at an acceptable level during a disruption, and restores them within set times afterward. It runs as a cycle: a business impact analysis finds what matters most and how long each activity can be down, recovery objectives are set from it, strategies are chosen to meet them, a business continuity plan documents the response, and testing and review keep the plan working. ISO 22301 sets the requirements for a business continuity management system, and BCM is one of the disciplines behind [[Organizational Resilience|organizational resilience]].

> $$I(t) = \int_0^t \ell(s)\, ds$$

> $$\text{MTPD} = \min\{\, t : I(t) \ge T \,\}$$

> $$\text{RTO} < \text{MTPD}$$

- **Symbols:** $\ell(s)$ is the rate at which an interruption of an activity costs the organization, per hour or per day, at time $s$ after it starts. It counts lost revenue, extra expense, regulatory penalties and harm to reputation, and it usually rises over time. $I(t)$ is the cumulative impact of an interruption lasting $t$, and $T$ is the most impact the organization can tolerate. The maximum tolerable period of disruption (MTPD) is how long the activity can be down before the impact becomes unacceptable.
- **Business impact analysis:** The BIA lists the organization's activities, the resources each depends on (people, premises, systems, data and suppliers), and how the impact of losing each grows over time. It ranks activities by urgency, so the most time-critical are recovered first. A [[Risk Assessment|risk assessment]] sits beside it, judging which threats could cause an interruption and how likely they are.
- **Recovery time objective:** The RTO is the target time to resume an activity after a disruption. It is set inside the MTPD, leaving a margin for detecting the problem, deciding to invoke the plan and checking that recovery worked. The recovery point objective (RPO) is the most data the organization can afford to lose, measured as time back to the last usable copy, and it decides how often data is backed up or replicated.
- **Strategy:** Strategies are chosen to meet the RTO at acceptable cost. They include alternate work sites, staff working from home, backup data centres (a hot site running in parallel, a warm site with equipment ready, a cold site with space only), extra suppliers, stockpiles, and [[Risk Transfer|insurance]] such as [[Business Income Coverage|business income coverage]] for the loss that can't be avoided.
- **The plan:** The business continuity plan says who declares an incident, who does what, how staff, customers, regulators and the media are told, and the step-by-step procedures for recovering each activity. Disaster recovery plans for information technology are part of it.
- **Testing and maintenance:** A plan nobody has tested often fails when needed. Testing ranges from a desk check of the plan and a tabletop walkthrough of a scenario, through simulations, to a full switch of operations to the backup site. Each test, and each real incident, is followed by a review that updates the plan, and the plan is reviewed again whenever the business changes.
- **Policy and embedding:** BCM starts with a policy, approved by senior management, that sets its scope and assigns responsibility. Training and awareness embed it, so that continuity is part of how the organization works rather than a binder on a shelf.

> [!example]- Setting Recovery Objectives From a Business Impact Analysis {Example}
> A property-casualty insurer's BIA covers three activities. The organization can tolerate an impact of \$300,000 from the loss of any one activity. With illustrative figures:
>
> - **Policy administration system:** Losing it costs \$150,000 a day from the start, because no policies can be issued, endorsed or billed.
> - **Claims payment:** Losing it costs \$40,000 a day for the first two days, then \$120,000 a day as regulatory complaints and reputational harm build.
> - **New business underwriting:** Losing it costs \$25,000 a day, because brokers can be asked to wait.
>
> Find each activity's MTPD, rank the recovery priority and suggest RTOs that leave a day of margin.
>
> > [!answer]-
> > With a constant rate, the MTPD is the tolerance divided by the daily impact.
> > $$
> > \begin{align*}
> > \text{MTPD}_{\text{admin}} &= \frac{300{,}000}{150{,}000} \\
> > &= 2 \text{ days} \\
> > \text{MTPD}_{\text{UW}} &= \frac{300{,}000}{25{,}000} \\
> > &= 12 \text{ days}
> > \end{align*}
> > $$
> > Claims payment costs \$80,000 over the first two days, so the remaining \$220,000 of tolerance runs out at the higher rate.
> > $$
> > \begin{align*}
> > \text{MTPD}_{\text{claims}} &= 2 + \frac{300{,}000 - 80{,}000}{120{,}000} \\
> > &= 2 + 1.83 \\
> > &= 3.83 \text{ days}
> > \end{align*}
> > $$
> > Policy administration is recovered first, then claims payment, then underwriting. With a day of margin the RTOs are about 1 day, 2.8 days and 11 days. The claims result shows why a BIA looks at how impact grows over time: at the early rate alone, claims payment would look like it could wait 7.5 days.

> [!example]- Choosing a Recovery Strategy Under a Tolerance Limit {Example}
> For the policy administration system above (\$150,000 a day, MTPD 2 days), the insurer has three options. A hot site costs \$180,000 a year and recovers in half a day. A warm site costs \$60,000 a year and recovers in 3 days. A cold site costs \$15,000 a year and recovers in 10 days. Suppose the chance of an outage needing the site is 5% a year. Compare the expected annual cost of each option and choose one.
>
> > [!answer]-
> > The expected annual cost is the site cost plus the probability times the impact of the recovery time.
> > $$
> > \begin{align*}
> > \text{Hot} &= 180{,}000 + 0.05(150{,}000 \times 0.5) \\
> > &= 183{,}750 \\
> > \text{Warm} &= 60{,}000 + 0.05(150{,}000 \times 3) \\
> > &= 82{,}500 \\
> > \text{Cold} &= 15{,}000 + 0.05(150{,}000 \times 10) \\
> > &= 90{,}000
> > \end{align*}
> > $$
> > On expected cost the warm site is cheapest, but its 3-day recovery is longer than the 2-day MTPD, and an outage would cost \$450,000, more than the organization can tolerate. Only the hot site meets the recovery objective, so it is the strategy BCM chooses. The tolerance acts as a constraint, not just as one more cost to average.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The business continuity section covers business continuity management and business continuity planning. Questions ask for the steps of the BCM cycle in order, what a business impact analysis produces, and how a recovery time objective relates to the maximum tolerable period of disruption.
> - **DISC-RM:** Application questions describe an organization and a disruption, then ask which activity should be recovered first, which strategy fits a recovery objective, or which kind of test would best show whether the plan works.

> [!warning]- Exam traps
> - **BIA versus risk assessment:** The business impact analysis measures the consequences of losing an activity, whatever causes it. The risk assessment judges which threats could cause the loss and how likely they are. Swapping the two is a common wrong answer.
> - **RTO inside the MTPD:** The RTO must be shorter than the MTPD, because detecting the incident and invoking the plan take time. An RTO equal to the MTPD leaves no margin, and one longer than it accepts an intolerable impact.
> - **RTO versus RPO:** The RTO is how quickly an activity must resume, and the RPO is how much data may be lost. A nightly backup sets an RPO of up to a day, whatever the RTO is.
> - **Cheapest is not enough:** A strategy that minimizes expected cost but misses the recovery objective fails BCM's test. Check the recovery time against the MTPD before comparing costs.
> - **An untested plan:** Writing the plan is not the last step. Testing, review and maintenance are part of the cycle, and an answer that ends at "document the plan" leaves them out.
