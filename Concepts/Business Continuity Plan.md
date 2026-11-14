---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3e6116bdab39eb6b4d19abfa814f4a3efb4d85a2342985032ae5736585493928
  sources:
    - "NIST SP 800-34 Rev. 1, Contingency Planning Guide for Federal Information Systems (2010), §3.2.1 p.17 (PDF p.31) MTD/RTO/RPO; §3.4.2 pp.21-22 site types; §3.5.3 exercises; §3.6 maintenance, sha256:476f04d4c60b0770c1ac8b2720551972074ce78e936a3e7a535048416111d0df — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf"
    - "Ready.gov (FEMA), Ready Business Business Continuity Plan template, pp.1-3 plan sections, sha256:9945e3bb8bb0d45507e97de3d6f31a1b5a9bc90d454e95b8b8731b975bef259b — https://www.ready.gov/sites/default/files/2020-03/business-continuity-plan.pdf"
    - "Ready.gov (FEMA), Business Impact Analysis page, read via WebFetch 2026-10-10 (direct fetch 403; no hash) — https://www.ready.gov/business-impact-analysis"
    - "Ready.gov (FEMA), Business Continuity Planning page (six planning steps), read via WebFetch 2026-10-10 (direct fetch 403; no hash) — https://www.ready.gov/business/emergency-plans/continuity-planning"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Business Continuity Plan.md
---

A **Business Continuity Plan** (BCP) is the documented set of procedures, teams and resources an organization will use to keep or restore its critical functions after a disruption, within recovery times set in advance from a business impact analysis. It is the main product of [[Business Continuity Management|business continuity management]].

The maximum tolerable downtime (MTD) is the total time the organization will accept a function being out of service, counting every kind of impact. The recovery time objective (RTO) is the longest a system or resource can stay unavailable before the impact becomes unacceptable. Because work held up by an outage has to be reprocessed once systems return, the RTO must normally be shorter than the MTD, and the condition is

> $$\text{RTO} + t_{\text{reprocess}} \le \text{MTD}$$

- $t_{\text{reprocess}}$ is the time needed after recovery to rework transactions the outage held up.

The recovery point objective (RPO) is the point in time before the disruption to which data must be recoverable, so it measures how much data loss is tolerable. The RPO is not part of the MTD. It decides how often data is backed up, and the condition is

> $$\Delta t_{\text{backup}} \le \text{RPO}$$

- $\Delta t_{\text{backup}}$ is the interval between backups, which is the most data a failure just before the next backup can destroy.

The RTO is about time to restore service, and the RPO is about how much data may be lost. A plan that restores systems fast but backs up nightly can meet its RTO and still miss a short RPO.

> [!example]- Does this claims recovery plan meet its objectives? {Example}
> An insurer's BIA sets a maximum tolerable downtime of 48 hours for claims payment and an RPO of 4 hours. Transactions held up by an outage take 10 hours to reprocess once the claims system is restored. The plan uses a warm site that restores the system in 36 hours, and claims data is backed up every 24 hours.
>
> > [!answer]-
> > - The longest acceptable RTO is $48 - 10 = 38$ hours.
> > - The warm site's 36 hours meets this, with 2 hours to spare.
> > - The data objective fails: a failure just before the nightly backup loses up to 24 hours of claims data, against an RPO of 4 hours.
> > - Backups or replication must run at least every 4 hours.

## The business impact analysis

The BIA predicts the consequences of a disruption and gathers what is needed to choose recovery strategies. It considers scenarios such as damage to a building, equipment breakdown, loss of access to a site, supply chain failure, utility outages and loss of IT systems or data. Its impacts include lost or delayed sales, higher costs, regulatory fines, contractual penalties and lost customers, and they depend on when a disruption strikes and how long it lasts. The BIA is usually done by questionnaire with the managers who know each process, and its report ranks functions for recovery by their operational and financial impact. The BIA measures the consequences of losing a function, whatever the cause, while the [[Risk Assessment|risk assessment]] judges which events might cause the loss.

## Planning steps

Ready.gov's business continuity guidance sets out six steps:

1. Prepare to create the plan.
2. Define its objectives.
3. Identify and prioritize risks and impacts.
4. Develop continuity strategies.
5. Define the teams and their tasks.
6. Test the plan.

The NIST contingency planning guide for information systems adds two bookends: a policy statement that gives the program its authority, and plan maintenance.

## Contents of the plan

Ready.gov's template lists the plan's sections:

| Section | What it holds |
| :--- | :--- |
| Program administration | Scope, objectives and assumptions |
| Business continuity organization | Roles, lines of authority, succession of management and delegation of authority |
| BIA results | The RTOs for business processes and IT, and the RPO for data |
| Strategies and requirements | Procedures, resources and logistics for each recovery strategy, relocation and IT restoration |
| Manual workarounds | The forms and resources for doing work by hand |
| Incident management | Detection, alerts, activating the plan, damage assessment and an incident action plan |
| Training, testing and exercising | How the plan is tested |
| Program maintenance | How the plan is kept up to date |

The plan ends with references to related plans such as the emergency response, IT disaster recovery and crisis communications plans.

## Recovery strategies

For IT, alternate sites range from a cold site (space, power, telecommunications and environmental controls only), through a warm site (partly equipped with hardware and software), to a hot site (fully configured and staffed), with mirrored sites fully redundant in real time. A cold site is the cheapest and slowest, and a mirrored site the most expensive but nearly always available, so the RTO decides which is needed.

## Testing and maintenance

A tabletop exercise is a discussion in which a facilitator presents a scenario and participants talk through their roles, and no equipment is deployed. A functional exercise has people perform their duties in a simulated environment. A full-scale exercise tests every element of the plan, for example by failing a system over to the alternate site. Only a functional or full-scale exercise shows whether the alternate site and systems actually work.

The plan is a living document. It is reviewed at a set frequency and whenever something significant changes, with contact lists checked more often, and each test or real incident feeds a corrective action program. Updating the plan's details is maintenance, not an exercise of the plan.

> [!example]- Which part of the plan does each of these tasks belong to? {Example}
> A retailer's continuity coordinator has five tasks:
>
> 1. Write down who takes charge if the chief operating officer is unavailable.
> 2. Record that store sales can be rung up on paper slips if the point-of-sale system fails.
> 3. Gather the team to talk through a scenario in which the main warehouse floods.
> 4. Update the phone list after three team members leave.
> 5. List the RTO for online orders and the RPO for customer data.
>
> > [!answer]-
> > - Task 1 is the business continuity organization: succession of management.
> > - Task 2 is a manual workaround.
> > - Task 3 is a tabletop exercise, since the team discusses its response without deploying equipment.
> > - Task 4 is program maintenance, because contact lists change most often.
> > - Task 5 is the BIA results, which set the recovery objectives the strategies must meet.

> [!trap] Leaving reprocessing out of the MTD
> Restoring the system is not the end of the outage. Comparing the RTO with the MTD while ignoring the time to catch up on held work overstates the margin.
