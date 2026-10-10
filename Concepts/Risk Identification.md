---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:29770408ad5e0997c5a9c4d08190c1589b0ebb2716fece99700a1b7f700c61f0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Identification.md
---

**Risk identification** is the first step of [[Risk Management|risk management]]: finding and describing the risks that could affect an organization's objectives, before any of them is measured or treated. Holistic identification looks across every source of risk, hazard, operational, financial and strategic, and across the upside as well as the downside, rather than only at the [[Loss Exposure|loss exposures]] that insurance can cover. A risk that is never identified is retained by default, so the completeness of this step limits everything that follows.

> $$P(\text{found}) = 1 - \prod_{i=1}^{n} (1 - p_i)$$

- **Symbols:** $p_i$ is the probability that reviewer or method $i$ finds a given risk, and $P(\text{found})$ is the probability that at least one of the $n$ reviewers or methods finds it. The formula assumes the reviewers miss things independently, which is the reason to choose them for different perspectives. It shows why identification is done with several methods and by a team rather than by one person with one checklist.
- **The four categories:** Hazard risk arises from property, liability and personnel loss exposures, the traditional subject of insurance. [[Operational Risk|Operational risk]] arises from people, processes, systems and outside events, such as a fraud or an IT failure. [[Financial Risk|Financial risk]] arises from prices, interest rates, credit and liquidity. Strategic risk, the [[Business Risk|business risk]] of competition, regulation, reputation and the economy, arises from the organization's choices and its environment. A [[Risk Taxonomies|risk taxonomy]] makes these categories specific to the organization.
- **Holistic identification:** In [[Enterprise Risk Management|enterprise risk management]], identification covers risks that offer gain as well as loss, and it looks for connections, such as a supplier failure that is at once an operational, a financial and a reputational event. Identifying risks one department at a time misses these connections and the concentrations they create.
- **Document analysis:** Risk assessment questionnaires and checklists list the exposures common to similar organizations. Financial statements and accounting records point to exposures, since each asset on the balance sheet can be damaged or lost and each item of revenue or expense on the income statement can fall or rise. Contracts, insurance policies, loss histories, organizational policies, flowcharts and organizational charts each show where an exposure is created, assumed or concentrated.
- **Other methods:** A compliance review checks the organization against the laws and regulations that apply to it, which reveals legal exposures. Personal inspections of facilities and operations find hazards that documents never mention. Expertise within the organization, such as plant managers and engineers, and beyond it, such as lawyers, consultants and insurers' risk control staff, fills in what the risk manager does not know.
- **Structured techniques:** Brainstorming, interviews, workshops and scenario analysis draw out risks that have no loss history, including emerging and strategic risks. [[Stress Testing|Stress testing]] and [[Reverse Stress Testing|reverse stress testing]] work backward from an outcome to the events that could cause it.
- **Identification as a team:** A cross-functional team brings operations, finance, legal, sales, IT and frontline staff together, because the people closest to a process know where it fails. A team also guards against blind spots and [[Bias|bias]], though it needs a facilitator to keep a senior voice or groupthink from narrowing the list. Each risk identified is assigned an owner, who is accountable for it in the steps that follow.
- **Output:** Identification produces a register of risks, each described by its source, the event and its consequences. The register is the input to [[Risk Assessment|risk assessment]], which measures each risk, and to treatment through [[Risk Control|risk control]] and risk financing ([[Risk Mitigation]]). It is updated as the organization and its environment change, and a [[Risk Aware Culture|risk-aware culture]] keeps new risks reaching it.

> [!example]- Why the Team Finds More {Example}
> A manufacturer wants to know how likely its review is to find a given exposure, such as dependence on a single overseas supplier. With illustrative figures, the risk manager working alone finds an exposure like this with probability 0.5. The plant manager finds it with probability 0.4, the sales director with probability 0.3, and a finance analyst with probability 0.2. Find the probability the team finds it if the four miss things independently. Then suppose the finance analyst works from the same documents as the risk manager and finds nothing the risk manager would miss.
>
> > [!answer]-
> > With four independent reviewers:
> > $$
> > \begin{align*}
> > P(\text{found}) &= 1 - (0.5)(0.6)(0.7)(0.8) \\
> > &= 1 - 0.168 \\
> > &= 0.832
> > \end{align*}
> > $$
> > If the finance analyst only repeats the risk manager's view, the analyst adds nothing, and the team is effectively three reviewers.
> > $$
> > \begin{align*}
> > P(\text{found}) &= 1 - (0.5)(0.6)(0.7) \\
> > &= 1 - 0.21 \\
> > &= 0.79
> > \end{align*}
> > $$
> > The team raises the chance of finding the exposure from 0.5 to 0.832, but only because its members see the business differently. A reviewer who shares the same sources and the same blind spots adds a person without adding a perspective.

> [!example]- Reading Exposures From the Financial Statements {Example}
> A regional food distributor's balance sheet shows warehouses and trucks, inventory of perishable food, and accounts receivable from grocery chains. Its income statement shows sales concentrated in three customers, a large fuel expense, and interest on a floating-rate loan. Identify a risk each item points to and its category.
>
> > [!answer]-
> > The warehouses and trucks point to property exposures to fire, windstorm and collision, and the trucks to auto liability, which are hazard risks. The perishable inventory points to spoilage from a refrigeration breakdown, a hazard risk, and to contamination that could bring product liability claims and a recall. The receivables point to credit risk if a grocery chain fails, a financial risk.
> >
> > The customer concentration points to the loss of a major customer, a strategic risk. The fuel expense points to fuel price changes, and the floating-rate loan to rising interest rates, both financial risks. A breakdown in the routing system that schedules deliveries would be an operational risk that neither statement shows, which is why document analysis is paired with interviews and inspections.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The section on identifying risk asks candidates to describe holistic risk identification, to classify a scenario's risks as hazard, operational, financial or strategic, and to name the method that would find each. It also asks why identification is done as a team, which perspectives a team should include, and what can go wrong in a group.

> [!warning]- Exam traps
> - **Identification is not assessment:** Identification finds and describes the risks, and assessment measures their likelihood and impact. An answer that ranks risks before listing them has skipped a step.
> - **Hazard risk is not the whole list:** Holistic identification covers operational, financial and strategic risks too, and many of them are not insurable. Stopping at the exposures an insurance policy covers is the traditional approach the course contrasts with ERM.
> - **One method is never enough:** Checklists miss what is unusual about the organization, financial statements miss risks with no balance, and inspections miss contracts. Answers should combine methods and say what each one adds.
> - **A team needs different perspectives:** Adding people from the same function, using the same documents, adds little. The value of a team comes from members who see different parts of the organization.
