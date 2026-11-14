---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:61b8238f459c2e6949771be337c88788f970dc6a5c155a73eebac5e0da864741
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Report.md
---
An **Actuarial Report** is the confidential document supporting a U.S. property-casualty [[Statement of Actuarial Opinion]]. The NAIC defines it as the formal means of conveying the [[Appointed Actuary]]'s conclusions and recommendations to the state regulator and the board of directors, of recording the methods and procedures used, of making sure those addressed understand the significance of the findings, and of documenting the analysis underlying the opinion.

The report is one of three documents the Appointed Actuary prepares:

| Document | Public? | What it says |
| :--- | :--- | :--- |
| Statement of Actuarial Opinion | Public | What the actuary concluded ([[SAO Language]]) |
| [[Actuarial Opinion Summary]] | Confidential | How much: the estimates against the carried reserves |
| Actuarial Report | Confidential | How and why: the analysis behind the opinion |

The report is where the [[Reserve Communication]] duties of [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP No. 43]] are discharged in full, and it is one of the [[Appointed Actuary Responsibilities]]. Its Canadian counterpart is the [[Appointed Actuary's Report]].

## Narrative and technical components

The report has two components:

1. A narrative explaining the findings, recommendations and conclusions, and their significance, to management, the board and the regulator.
2. A technical component detailed enough for another actuary practising in the same field to evaluate the work, running from the basic data, such as [[Loss Development|loss triangles]], to the conclusions.

It should meet ASOP No. 41's documentation and disclosure requirements, and ASOP No. 36 points to ASOPs 20, 23, 38, 41, 43 and 56 for its content.

## Required exhibits and comments

The report must include:

1. The actuary's relationship to the company and role in advising the board and management on carried reserves, including how and when the analysis is presented.
2. An exhibit that ties to the Annual Statement, comparing the actuary's point estimates and/or ranges with the carried amounts for the segments analysed.
3. A reconciliation and mapping of the data used in the analysis to [[Schedule P]] lines, with material differences explained.
4. The change in the actuary's estimates from the prior report, net and (if relevant) gross, with extended discussion of material changes, or a statement that a newly appointed actuary did not review the predecessor's work.
5. Extended comments on trends bearing on the risk of material adverse deviation, and on any unusual [[IRIS Ratios]] for one-year and two-year reserve development or estimated current reserve deficiency to surplus.
6. Where another party's analysis covers a material portion of the reserves, its dollar amount and share of the total, how far the actuary reviewed it, and the conclusions.

## Reconciliation of the data to Schedule P

The reconciliation is of the data the actuary used, after mapping and exclusions. Reconciling the data the company sent is not enough, because the actuary must show that data was neither created nor destroyed along the way. Summed over the segments analysed, the reconciliation is

> $$\sum_{\text{segments}} \text{Data used} = \text{Schedule P} \pm \text{Explained differences}$$

- $\text{Schedule P}$ is the amount reported in the Schedule P lines the segments map to.
- $\text{Explained differences}$ are the material differences the report explains, such as claims coded to another line or a program analysed separately.

> [!example]- How does this analysis reconcile to Schedule P? {Example}
> Figures are net case reserves at year-end, in $\$$ millions. Schedule P reports Other Liability Occurrence at $96.0$ and Products Liability Occurrence at $38.0$. The actuary's analysis has two segments: Premises and Operations, $88.5$, and Products and Completed Operations, $44.0$. Completed-operations claims on contractors' policies, $6.0$ of case reserves, are coded to Other Liability in Schedule P. A run-off program, $1.5$, was excluded from the triangles and analysed separately.
>
> > [!answer]-
> > - The Schedule P total is $96.0 + 38.0 = 134.0$.
> > - The triangles total $88.5 + 44.0 = 132.5$.
> > - The $1.5$ gap is the run-off program, shown on its own exhibit.
> > - Premises and Operations is $96.0 - 6.0 - 1.5 = 88.5$, Other Liability less the completed-operations claims and the run-off program.
> > - Products and Completed Operations is $38.0 + 6.0 = 44.0$, Products Liability plus the completed-operations claims.
> > - Every dollar in Schedule P is accounted for. A total that merely matched $134.0$ in the company's extract would not do.

## Change in the actuary's estimates

For each segment and accident year, the change from the prior report is

> $$\Delta\,\text{Ult}_{\text{AY}} = \text{Ult}_{\text{AY}}^{\text{current}} - \text{Ult}_{\text{AY}}^{\text{prior report}}$$

- $\text{Ult}_{\text{AY}}$ is the actuary's estimate of ultimate loss and LAE for the accident year.

A material change gets extended discussion, including whether it came from emerging experience or from a change of method or assumption, which the opinion must also disclose.

> [!example]- What must the report show about this change in estimates? {Example}
> Net ultimate loss and LAE for accident years 2024 and prior, in $\$$ millions, was $612.0$ for commercial auto liability, $388.0$ for homeowners and $250.0$ for workers compensation in the prior report. In the current report it is $653.0$, $379.5$ and $250.0$. Surplus is $600$.
>
> > [!answer]-
> > - Commercial auto changed by $653.0 - 612.0 = +41.0$, which is $6.7\%$ of its prior estimate.
> > - Homeowners changed by $379.5 - 388.0 = -8.5$, and workers compensation did not change.
> > - The total change is $41.0 - 8.5 = +32.5$, about $5.4\%$ of surplus.
> > - The total understates the commercial auto movement, which favourable homeowners partly hides.
> > - The report must show the change by segment, net and, if reinsurance treats the lines differently, gross.
> > - It must discuss the commercial auto movement at length: whether it was emerging experience against expectation or a change of method or assumption. The same finding belongs in its comments on the risk of material adverse deviation.

## Timing and custody

The report must be available by May 1 of the year after the opinion's year-end, or within two weeks of a request from any state commissioner. The opinion must assure that the report and workpapers will be kept at the company and available for regulatory examination for seven years. The report is proprietary and not for public inspection. It repeats the opinion's signature block plus the date the report was finalized. An affiliated pool may file one report with addenda for each company's non-pooled reserves.

> [!trap] Reconciling the data received instead of the data used
> Matching the company's extract to Schedule P is not the required reconciliation. The report reconciles the data that went into the analysis, after mapping and exclusions, and explains each material difference.
