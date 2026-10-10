---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b19fd7471d89f4fbd161bd412925c0e1637e76d2bbc85cc55cb1f84e3d4181f2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Clinical Policy Bulletin.md
---

**A clinical policy bulletin** is a payer's published medical policy that states when a service, procedure, device, test or drug is considered medically necessary, and when it is considered experimental, investigational or cosmetic and therefore not covered. The name is the one Aetna uses for its bulletins. Other payers publish the same kind of document as a medical policy or a coverage policy, and [[Medicare]] makes national and local coverage determinations. For the health actuary a bulletin is a lever on [[Utilization|utilization]]: it decides which members can receive a service, so a change in it changes claim cost without any change in the benefit plan.

> $$\Delta\text{PMPM} = \frac{N \times q \times s \times C}{\text{MM}}$$

> $$\Delta\text{PMPM} = \frac{(U_1 - U_0) \times C}{12{,}000}$$

- **Symbols:** $N$ is the number of members, $q$ the prevalence of the condition the service treats, $s$ the share of those members who meet the bulletin's criteria and receive the service, $C$ the cost per course of treatment or per service, and MM the member months over which the cost is spread. In the second form, $U_0$ and $U_1$ are utilization per 1,000 members per year before and after a policy change.
- **Coverage and necessity:** A [[Health Insurance Plans|health plan's]] benefit document lists what the plan covers, usually only services that are medically necessary. The bulletin is the payer's reading of what medically necessary means for one service, so it fills in the plan's terms rather than adding to them, and the plan document governs if the two conflict.
- **The policy section:** The policy states the criteria a member must meet for the service to be considered medically necessary, such as a diagnosis, a severity level, the failure of a cheaper first-line treatment, or limits on frequency and setting. It also lists the uses the payer considers experimental and investigational because the evidence does not show benefit.
- **The background section:** This section summarizes the clinical evidence behind the criteria, such as randomized trials, specialty society guidelines and technology assessments. It explains why the payer drew the line where it did, and it is where the reasons for a change appear.
- **The codes section:** The bulletin lists the CPT and HCPCS codes for the service and the ICD-10 diagnosis codes that support it, separated into codes covered when the criteria are met and codes not covered. These [[Medical Coding|codes]] are what claims systems and prior authorization rules apply, and what an actuary uses to find the affected claims.
- **Review and change:** Bulletins carry effective and review dates and are revised as evidence emerges. A service moving from experimental to medically necessary adds cost, while tighter criteria or a new prior authorization requirement reduces it.
- **Uses in pricing:** An actuary pricing a block or projecting [[Trend|trend]] reads pending policy changes as a source of utilization change separate from underlying medical trend. The same reading helps compare experience between payers, whose bulletins for the same service can differ.

> [!example]- Cost of Covering a Therapy No Longer Considered Experimental {Example}
> A payer insures 1,000,000 members. A bulletin revision moves a therapy from experimental to medically necessary for patients who meet its criteria. The condition affects 50 members per 100,000, and 40% of them are expected to meet the criteria and be treated, at an illustrative cost of \$30,000 per course of treatment a year. Find the annual cost and the effect on the PMPM.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Cost} &= 1{,}000{,}000 \times 0.0005 \times 0.40 \times 30{,}000 \\
> > &= 6{,}000{,}000 \\
> > \Delta\text{PMPM} &= \frac{6{,}000{,}000}{1{,}000{,}000 \times 12} \\
> > &= 0.50
> > \end{align*}
> > $$
> > The change adds \$0.50 PMPM, which belongs in the rate projection as a coverage change rather than as medical trend. If the criteria were broadened to cover 60% of patients, the cost would rise in proportion, to \$0.75 PMPM.

> [!example]- Tighter Criteria for Advanced Imaging {Example}
> A plan's members use MRI and CT scans at 120 per 1,000 per year, at an average allowed cost of \$900 per scan. A bulletin revision requires a period of conservative treatment before imaging for low back pain, and the plan expects the revision to cut imaging utilization by 15%. Estimate the PMPM saving.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > U_1 &= 120 \times (1 - 0.15) \\
> > &= 102 \\
> > \Delta\text{PMPM} &= \frac{(102 - 120) \times 900}{12{,}000} \\
> > &= -1.35
> > \end{align*}
> > $$
> > The plan saves \$1.35 PMPM before the cost of the prior authorization reviews and any increase in other services, such as physical therapy, that members use instead.

> [!tip]- How it appears on the exam
> - **GH-301:** Candidates describe what a clinical policy bulletin is and interpret one, saying which members qualify for a service, which uses are excluded as experimental, and which codes identify the service in claims data. A follow-up asks how a change in the bulletin would affect utilization, cost or a pricing assumption.
> - **The reading:** The objective is taught through the SOA eLearning module on terminology and analytical use of data for healthcare actuaries, which this page has not been checked against. Use the module's own examples and wording when preparing.

> [!warning]- Exam traps
> - **Bulletin versus benefit:** A bulletin interprets medical necessity within the benefits a plan covers. It cannot add a benefit the plan excludes, so a service a plan excludes outright stays excluded whatever the bulletin says.
> - **Not every plan:** Bulletins often do not apply to every product the payer sells. Medicare and some Medicaid business follow government coverage rules, and self-funded plans may set their own terms.
> - **Coverage change is not trend:** The cost of a newly covered service is a one-time step in the level of claims, not a recurring rate of increase. Folding it into the medical trend rate compounds it into every later year.
> - **Offsetting services:** A restriction rarely saves its full gross amount, because members denied one service often use another. Estimate the net effect, as in the second example.
