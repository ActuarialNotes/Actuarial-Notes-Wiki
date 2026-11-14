---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e932a5489dbe7261e64bfbea91647b698c6d4eb6af5d4d6f9b14c2f91b329b2e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Clinical Policy Bulletin.md
---
A **Clinical Policy Bulletin** is a payer's published medical policy that states when a service, procedure, device, test or drug is considered medically necessary, and when it is considered experimental, investigational or cosmetic and therefore not covered. The name is the one Aetna uses. Other payers publish the same kind of document as a medical policy or a coverage policy, and [[Medicare]] makes national and local coverage determinations.

A bulletin has three parts:

1. **The policy** states the criteria a member must meet for the service to be considered medically necessary, such as a diagnosis, a severity level, the failure of a cheaper first-line treatment, or limits on frequency and setting. It also lists the uses the payer considers experimental and investigational because the evidence does not show benefit.
2. **The background** summarizes the clinical evidence behind the criteria, such as randomized trials, specialty society guidelines and technology assessments. It explains why the payer drew the line where it did, and it is where the reasons for a change appear.
3. **The codes** list the CPT and HCPCS codes for the service and the ICD-10 diagnosis codes that support it, split into codes covered when the criteria are met and codes not covered. Claims systems and prior authorization rules apply these [[Medical Coding|codes]], and an actuary uses them to find the affected claims.

Bulletins carry effective and review dates and are revised as evidence emerges. A service moving from experimental to medically necessary adds cost, while tighter criteria or a new prior authorization requirement reduces it.

> [!idea] The idea
> A bulletin decides which members can receive a service, so a change in it changes claim cost without any change in the benefit plan.

## Bulletins and the benefit plan

A [[Health Insurance Plans|health plan's]] benefit document lists what the plan covers, usually only services that are medically necessary. The bulletin is the payer's reading of what medically necessary means for one service, so it fills in the plan's terms rather than adding to them. The plan document governs if the two conflict, and a service the plan excludes outright stays excluded whatever the bulletin says. Bulletins often do not apply to every product the payer sells. Medicare and some Medicaid business follow government coverage rules, and self-funded plans may set their own terms.

## Cost of a policy change

An actuary pricing a block or projecting [[Trend|trend]] reads pending policy changes as a source of [[Utilization|utilization]] change separate from underlying medical trend. The same reading helps compare experience between payers, whose bulletins for the same service can differ. When a change opens a service to $N$ members over $\text{MM}$ member months, the change in cost per member per month is

> $$\Delta\text{PMPM} = \frac{N \times q \times s \times C}{\text{MM}}$$

- $q$ is the prevalence of the condition the service treats.
- $s$ is the share of those members who meet the bulletin's criteria and receive the service.
- $C$ is the cost per course of treatment or per service.

> [!example]- What does this bulletin revision add to the PMPM? {Example}
> A payer insures 1,000,000 members. A revision moves a therapy from experimental to medically necessary for patients who meet its criteria. The condition affects 50 members per 100,000, and 40% of them are expected to meet the criteria and be treated, at an illustrative cost of $\$30{,}000$ per course of treatment a year.
>
> > [!answer]-
> > - The annual cost is $1{,}000{,}000 \times 0.0005 \times 0.40 \times 30{,}000 = \$6{,}000{,}000$.
> > - Spread over $1{,}000{,}000 \times 12$ member months, it adds $\$0.50$ PMPM.
> > - The increase belongs in the rate projection as a coverage change. If the criteria covered 60% of patients, it would rise in proportion to $\$0.75$ PMPM.

When the change is given as a change in utilization per 1,000 members per year, from $U_0$ to $U_1$, the change in cost per member per month is

> $$\Delta\text{PMPM} = \frac{(U_1 - U_0) \times C}{12{,}000}$$

A restriction rarely saves its full gross amount, because members denied one service often use another.

> [!example]- What does this imaging restriction save per member per month? {Example}
> A plan's members use MRI and CT scans at 120 per 1,000 per year, at an average allowed cost of $\$900$ per scan. A bulletin revision requires a period of conservative treatment before imaging for low back pain, and the plan expects it to cut imaging utilization by 15%.
>
> > [!answer]-
> > - Utilization falls to $U_1 = 120 \times 0.85 = 102$ per 1,000.
> > - The change is $(102 - 120) \times 900/12{,}000 = -\$1.35$ PMPM.
> > - The plan saves $\$1.35$ PMPM before the cost of the prior authorization reviews and any increase in other services, such as physical therapy, that members use instead.

> [!trap] Folding a coverage change into trend
> The cost of a newly covered service is a one-time step in the level of claims, not a recurring rate of increase. Adding the $\$0.50$ PMPM to the medical trend rate compounds it into every later year.
