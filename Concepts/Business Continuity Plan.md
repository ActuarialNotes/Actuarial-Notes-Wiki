A **business continuity plan** (BCP) is the documented set of procedures, teams and resources an organization will use to keep or restore its critical functions after a disruption, within recovery times set in advance from a business impact analysis. It is the main product of [[Business Continuity Management|business continuity management]]: the plan records who leads the response, which functions are restored first, the strategies and resources for restoring them, how the plan is activated, and how it will be tested and kept up to date.

> $$\text{RTO} + t_{\text{reprocess}} \le \text{MTD}$$

> $$\Delta t_{\text{backup}} \le \text{RPO}$$

- **Symbols:** The maximum tolerable downtime (MTD) is the total time the organization will accept a function being out of service, counting every kind of impact. The recovery time objective (RTO) is the longest a system or resource can stay unavailable before the impact becomes unacceptable. $t_{\text{reprocess}}$ is the time needed after recovery to rework transactions the outage held up. The recovery point objective (RPO) is the point in time before the disruption to which data must be recoverable, so it measures how much data loss is tolerable. $\Delta t_{\text{backup}}$ is the interval between backups, which is the most data a failure just before the next backup can destroy.
- **Why the RTO sits inside the MTD:** Because work held up by an outage has to be reprocessed once systems return, the RTO must normally be shorter than the MTD. The RPO is not part of the MTD; it is set by how much data loss the process can tolerate, and it decides how often data is backed up.
- **The business impact analysis:** The BIA predicts the consequences of a disruption and gathers what is needed to choose recovery strategies. It considers scenarios such as damage to a building, equipment breakdown, loss of access to a site, supply chain failure, utility outages and loss of IT systems or data. Its impacts include lost or delayed sales, higher costs such as overtime and expedited shipping, regulatory fines, contractual penalties, lost customers and delayed business plans, and they depend on when a disruption strikes and how long it lasts. The BIA is usually done by questionnaire with the managers who know each process, and its report ranks functions for recovery by their operational and financial impact.
- **Planning steps:** Ready.gov's business continuity guidance sets out six steps: prepare to create the plan, define its objectives, identify and prioritize risks and impacts, develop continuity strategies, define the teams and their tasks, and test the plan. The NIST contingency planning guide for information systems adds two bookends: a policy statement that gives the program its authority, and plan maintenance.
- **Contents of the plan:** Ready.gov's template lists the plan's sections. **Program administration** defines its scope, objectives and assumptions. The **business continuity organization** sets roles, lines of authority, succession of management and delegation of authority, and how the team works with contractors and vendors. The **BIA results** state the RTOs for business processes and IT and the RPO for data. **Strategies and requirements** give the procedures, resources and logistics for each recovery strategy, for relocation to alternate sites and for restoring IT. **Manual workarounds** document the forms and resources for doing work by hand. **Incident management** covers detection and reporting, alerts, activating the plan and the emergency operations center, damage assessment and an incident action plan. The plan ends with **training, testing and exercising**, **program maintenance**, and references to related plans such as the emergency response, IT disaster recovery, crisis communications and employee assistance plans.
- **Recovery strategies:** For IT, alternate sites range from a cold site (space, power, telecommunications and environmental controls only), through a warm site (partly equipped with hardware and software), to a hot site (fully configured and staffed), with mirrored sites fully redundant in real time. A cold site is the cheapest and slowest, and a mirrored site the most expensive but nearly always available, so the RTO decides which is needed.
- **Testing and exercises:** A tabletop exercise is a discussion in which a facilitator presents a scenario and participants talk through their roles; no equipment is deployed. A functional exercise has people perform their duties in a simulated environment, and a full-scale exercise tests every element of the plan, for example by failing a system over to the alternate site. Ready.gov's template also names orientation sessions for team members.
- **Maintenance:** The plan is a living document. It is reviewed at a set frequency and whenever something significant changes, with contact lists checked more often, and each test or real incident feeds a corrective action program. Copies are kept where the team can reach them if the company's own servers are down.

> [!example]- Checking Recovery Objectives Against the Plan {Example}
> An insurer's BIA sets a maximum tolerable downtime of 48 hours for its claims payment process. If the claims system is lost, the transactions it held up take an estimated 10 hours to reprocess once it is restored. The current strategy is a warm site that can restore the system in 36 hours. Claims data is backed up every 24 hours, and the BIA sets an RPO of 4 hours. Does the plan meet the objectives? What would have to change?
>
> > [!answer]-
> > The recovery time plus reprocessing must fit within the MTD:
> > $$
> > \begin{align*}
> > \text{RTO} &\le \text{MTD} - t_{\text{reprocess}} \\
> > &= 48 - 10 \\
> > &= 38 \text{ hours}
> > \end{align*}
> > $$
> > The warm site's 36 hours meets this, with 2 hours to spare. The data objective fails: a failure just before the nightly backup loses up to 24 hours of claims data, against an RPO of 4 hours. Backups or replication must run at least every 4 hours. If the MTD were cut to 40 hours, the RTO limit would fall to 30 hours, and the warm site would no longer be fast enough, so a hot site would be needed.

> [!example]- Matching Plan Activities to the Plan's Sections {Example}
> A retailer's continuity coordinator has these tasks: (a) write down who takes charge if the chief operating officer is unavailable; (b) record that store sales can be rung up on paper slips and keyed in later if the point-of-sale system fails; (c) gather the team in a conference room to talk through a scenario in which the main warehouse floods; (d) update the phone list after three team members leave; (e) list the RTO for online orders and the RPO for customer data. Which part of the plan or which activity does each belong to?
>
> > [!answer]-
> > - **(a)** The business continuity organization: lines of authority and succession of management.
> > - **(b)** Manual workarounds, with the forms and resources they need.
> > - **(c)** Testing and exercising: a tabletop exercise, since the team discusses its response without deploying equipment.
> > - **(d)** Program maintenance: contact lists change most often, so they are reviewed more often than the rest of the plan.
> > - **(e)** The business impact analysis results, which set the recovery objectives the strategies must meet.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The business continuity section closes with business continuity planning. Questions ask what the plan contains, what the BIA contributes to it, how the RTO, RPO and MTD relate, and which kind of exercise fits a stated purpose.
> - **Applied cases:** A short scenario gives a recovery time, a reprocessing time or a backup interval and asks whether the plan meets its objectives, or describes an activity and asks which part of the plan it belongs to.

> [!warning]- Exam traps
> - **RTO versus RPO:** The RTO is about time to restore service; the RPO is about how much data may be lost. A plan that restores systems fast but backs up nightly can meet its RTO and still miss a short RPO.
> - **Reprocessing counts against the MTD:** Restoring the system is not the end of the outage. Comparing the RTO with the MTD while ignoring the time to catch up on held work overstates the margin.
> - **BIA versus risk assessment:** The BIA measures the consequences of losing a function, whatever the cause; the risk assessment judges which events might cause the loss. A plan built only on likely events can fail when an unlikely one strikes.
> - **A tabletop is not a test of equipment:** A tabletop exercise checks roles and decisions through discussion. Only a functional or full-scale exercise shows whether the alternate site and systems actually work.
