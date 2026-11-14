---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:00d6e4decbac1b27b32514adab311ff5ce4074ba4fe13bfb2d09e7b353124eed
  sources:
    - "OpenStax, Psychology 2e, §12.4 Conformity, Compliance, and Obedience, 'Groupthink' (definition after Janis 1972; a directive leader who makes his opinions known discourages disagreement; avoided by having the leader withhold position statements until all members have voiced their views), sha256:5914f63d41db5de7312cd568348f5906146e72c954ae67e5d0aed3254878a3a8 — https://openstax.org/books/psychology-2e/pages/12-4-conformity-compliance-and-obedience"
    - "Organizational Behavior v1.1 (Saylor Academy; the Saylor edition names no author), §11.4 Decision Making in Groups: groupthink symptoms (self-censorship, pressure on dissenters); OB Toolbox — leaders remain impartial and refrain from stating preferences at the outset, anonymous feedback channel; nominal group technique ensures all members participate; Delphi technique by a series of questionnaires, responses can be kept anonymous, sha256:fa2d788adacb2018496b786a0657da851cf4dba2c10fce60791f3a5917cad996 — https://saylordotorg.github.io/text_organizational-behavior-v1.1/s15-04-decision-making-in-groups.html"
    - "RAND Corporation, Delphi Method (topic page): developed by RAND in the 1950s; experts anonymously answer questionnaires, receive the group response and revise their answers, sha256:2f94c661dbd733626b95ae4e85a552a61d7167424377078581b8b6b94f4425da — https://www.rand.org/topics/delphi-method.html"
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 pp.46, 54, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
    - "Risk & Insurance Education Alliance, Risk Identification (ELR course reading), pp.1-5, sha256:1592f41132ab2c9854a94b3de7c237a84442678d065a545621991fda4d6148cc — https://riskeducation.org/pub/media/elr/Risk-Identification.pdf"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.111-112 (PDF pp.13-14), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Identification.md
---
**Risk Identification** is the first step of [[Risk Management|risk management]]: finding and describing the risks that could affect an organization's objectives, before any of them is measured or treated. A risk that is never identified is retained by default, so the completeness of this step limits everything that follows.

Its methods are:

1. Document analysis: questionnaires, checklists, financial statements, contracts, policies, loss histories, flowcharts and organizational charts.
2. Compliance review against the laws and regulations that apply.
3. Personal inspections of facilities and operations.
4. Expertise within and beyond the organization.
5. Structured techniques: brainstorming, interviews, workshops and scenario analysis.

Identification documents the conditions and events that represent material threats to the organization's objectives, or areas to exploit for competitive advantage. That record is the input to [[Risk Assessment|risk assessment]], which measures each risk, and to treatment through [[Risk Control|risk control]] and risk financing ([[Risk Mitigation]]). It is updated as the organization and its environment change, and a [[Risk Aware Culture|risk-aware culture]] keeps new risks reaching it.

## Holistic risk identification

Holistic identification looks across every source of risk and across the upside as well as the downside, rather than only at the [[Loss Exposure|loss exposures]] that insurance can cover. The four categories are:

| Category | Arises from |
| :--- | :--- |
| Hazard | Property, liability and personnel loss exposures, the traditional subject of insurance |
| [[Operational Risk]] | People, processes, systems and outside events, such as a fraud or an IT failure |
| [[Financial Risk]] | Prices, interest rates, credit and liquidity |
| Strategic | The organization's choices and its environment: the [[Business Risk]] of competition, regulation, reputation and the economy |

A [[Risk Taxonomies|risk taxonomy]] makes these categories specific to the organization. In [[Enterprise Risk Management|enterprise risk management]], identification also looks for connections, such as a supplier failure that is at once an operational, a financial and a reputational event. Identifying risks one department at a time misses these connections and the concentrations they create.

## Methods of identification

Risk assessment questionnaires and checklists list the exposures common to similar organizations. Financial statements and accounting records point to exposures, since each asset on the balance sheet can be damaged or lost and each item of revenue or expense on the income statement can fall or rise. Contracts, insurance policies, loss histories, organizational policies, flowcharts and organizational charts each show where an exposure is created, assumed or concentrated.

A compliance review checks the organization against the laws and regulations that apply to it, which reveals legal exposures. Personal inspections of facilities and operations find hazards that documents never mention. Expertise within the organization, such as plant managers and engineers, and beyond it, such as lawyers, consultants and insurers' risk control staff, fills in what the risk manager does not know. Brainstorming, interviews, workshops and scenario analysis draw out risks that have no loss history, including emerging and strategic risks.

No one method is enough. Checklists miss what is unusual about the organization, financial statements miss risks with no balance, and inspections miss contracts.

> [!example]- What risk does each of the food distributor's financial statement items point to, and in which category? {Example}
> A regional food distributor's balance sheet shows warehouses and trucks, inventory of perishable food, and accounts receivable from grocery chains. Its income statement shows sales concentrated in three customers, a large fuel expense, and interest on a floating-rate loan.
>
> > [!answer]-
> > - The warehouses and trucks point to property exposures to fire, windstorm and collision, and the trucks to auto liability, which are hazard risks.
> > - The perishable inventory points to spoilage from a refrigeration breakdown, a hazard risk, and to contamination that could bring product liability claims and a recall.
> > - The receivables point to credit risk if a grocery chain fails, a financial risk.
> > - The customer concentration points to the loss of a major customer, a strategic risk.
> > - The fuel expense points to fuel price changes, and the floating-rate loan to rising interest rates, both financial risks.
> > - A breakdown in the routing system that schedules deliveries would be an operational risk that neither statement shows, which is why document analysis is paired with interviews and inspections.

## Risk identification as a team

A cross-functional team brings operations, finance, legal, sales, IT and frontline staff together, because the people closest to a process know where it fails. A team also guards against blind spots and [[Bias|bias]]. If $n$ reviewers or methods miss things independently, the probability that at least one of them finds a given risk is

> $$P(\text{found}) = 1 - \prod_{i=1}^{n} (1 - p_i)$$

- $p_i$ is the probability that reviewer or method $i$ finds the risk.

The formula assumes the reviewers miss things independently, which is the reason to choose them for different perspectives. Adding people from the same function, using the same documents, adds little.

> [!example]- How likely is the manufacturer's team to find the exposure, with and without an independent finance analyst? {Example}
> A manufacturer wants to know how likely its review is to find dependence on a single overseas supplier. With illustrative figures, the probabilities that each reviewer finds an exposure like this are:
>
> | Reviewer | Probability of finding it |
> | :--- | ---: |
> | Risk manager | 0.5 |
> | Plant manager | 0.4 |
> | Sales director | 0.3 |
> | Finance analyst | 0.2 |
>
> In the second case, the finance analyst works from the same documents as the risk manager and finds nothing the risk manager would miss.
>
> > [!answer]-
> > - With four independent reviewers, $P(\text{found}) = 1 - (0.5)(0.6)(0.7)(0.8) = 1 - 0.168 = 0.832$.
> > - If the finance analyst only repeats the risk manager's view, the team is effectively three reviewers.
> > - Then $P(\text{found}) = 1 - (0.5)(0.6)(0.7) = 1 - 0.21 = 0.79$.
> > - The team raises the chance of finding the exposure from 0.5 to 0.832, but only because its members see the business differently. A reviewer who shares the same sources and the same blind spots adds a person without adding a perspective.

A group session such as a brainstorming workshop has its own failure. When a senior or dominant member states a view, the others tend to defer to it or go along to avoid conflict. This is called groupthink, and the list narrows to what that member already sees. A facilitator guards against it by asking every member for input and keeping the leader from announcing an opinion first. Anonymous methods such as the Delphi technique, in which a panel answers anonymously over several rounds, keep any one participant's authority from dominating the rest.

> [!trap] Stopping at the insurable exposures
> Holistic identification covers operational, financial and strategic risks too, and many of them are not insurable. Listing only the exposures an insurance policy covers is the traditional approach the course contrasts with ERM.
