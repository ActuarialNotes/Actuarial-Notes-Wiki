---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:78eb7cd559a4beea30239b5b33c96b56fb7135676f9dd8762f8b8ae79ab5cf89
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Report.md
---

**The Actuarial Report** is the confidential document supporting a U.S. property-casualty Statement of Actuarial Opinion. The NAIC defines it as the formal means of conveying the Appointed Actuary's conclusions and recommendations to the state regulator and the board of directors, of recording the methods and procedures used, of making sure those addressed understand the significance of the findings, and of **documenting the analysis underlying the opinion**.

> $$\sum_{\text{segments}} \text{Data used} = \text{Schedule P} \pm \text{Explained differences}$$

> $$\Delta\,\text{Ult}_{\text{AY}} = \text{Ult}_{\text{AY}}^{\text{current}} - \text{Ult}_{\text{AY}}^{\text{prior report}}$$

- **Timing and custody.** The report must be available by **May 1** of the year after the opinion's year-end, or within **two weeks** of a request from any state commissioner. The opinion itself must assure that the report and workpapers will be kept at the company and available for regulatory examination for **seven years**. It is proprietary and not for public inspection. It repeats the opinion's signature block plus the date the report was finalized; an affiliated pool may file one report with addenda for each company's non-pooled reserves.
- **Two components.** A **narrative** explaining the findings, recommendations and conclusions, and their significance, to management, the board and the regulator; and a **technical** component detailed enough for another actuary practising in the same field to evaluate the work, running from the basic data, such as [[Loss Development|loss triangles]], to the conclusions. It should meet ASOP No. 41's documentation and disclosure requirements, and ASOP No. 36 points to ASOPs 20, 23, 38, 41, 43 and 56 for its content.
- **Required exhibits and comments:**
  - the actuary's **relationship to the company** and role in advising the board and management on carried reserves, including how and when the analysis is presented;
  - an exhibit that **ties to the Annual Statement**, comparing the actuary's point estimates and/or ranges with the carried amounts for the segments analysed;
  - a **reconciliation and mapping** of the data *used* in the analysis to [[Schedule P]] lines, with material differences explained. Reconciling the data the company *sent* is not enough — the actuary must show that data was neither created nor destroyed along the way;
  - the **change in the actuary's estimates** from the prior report, net and (if relevant) gross, with extended discussion of material changes — or a statement that a newly appointed actuary did not review the predecessor's work;
  - extended comments on trends bearing on the **risk of material adverse deviation**, and on any unusual [[IRIS Ratios]] for one-year and two-year reserve development or estimated current reserve deficiency to surplus;
  - where another party's analysis covers a material portion of the reserves: its dollar amount and share of the total, how far the actuary reviewed it, and the conclusions.
- **Where it fits.** The opinion is public and says *what* the actuary concluded ([[SAO Language]]); the [[Actuarial Opinion Summary]] is confidential and says *how much*; the report is confidential and shows *how and why*. It is where the [[Reserve Communication]] duties of [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP No. 43]] are discharged in full, and one of the [[Appointed Actuary Responsibilities]].
- **Canadian counterpart:** the [[Appointed Actuary's Report]], which supports the Canadian [[Statement of Actuarial Opinion]].

> [!example]- Reconciling the Data Used to Schedule P {Example}
> Figures in \$ millions, net case reserves at year-end. Schedule P reports Other Liability – Occurrence at $96.0$ and Products Liability – Occurrence at $38.0$. The actuary's analysis has two segments: Premises and Operations, $88.5$, and Products and Completed Operations, $44.0$. Completed-operations claims on contractors' policies, $6.0$ of case reserves, are coded to Other Liability in Schedule P. A run-off program, $1.5$, was excluded from the triangles and analysed separately.
>
> Build the reconciliation.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Schedule P total} &= 96.0 + 38.0 \\
> > &= 134.0 \\
> > \text{Triangles total} &= 88.5 + 44.0 \\
> > &= 132.5
> > \end{align*}
> > $$
> >
> > The $1.5$ gap is the run-off program, shown on its own exhibit. The mapping explains the segment differences:
> >
> > $$
> > \begin{align*}
> > \text{Premises} &= 96.0 - 6.0 - 1.5 \\
> > &= 88.5 \\
> > \text{Products} &= 38.0 + 6.0 \\
> > &= 44.0
> > \end{align*}
> > $$
> >
> > Every dollar in Schedule P is accounted for. A total that merely matched $134.0$ in the company's extract would not do: the required reconciliation is of the data the actuary actually used, after mapping and exclusions.

> [!example]- The Change-in-Estimate Exhibit {Example}
> Net ultimate loss and LAE for accident years 2024 and prior, in \$ millions. Prior report: commercial auto liability $612.0$, homeowners $388.0$, workers compensation $250.0$. Current report: $653.0$, $379.5$ and $250.0$. Surplus is $600$. What must the report show?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \Delta_{\text{auto}} &= 653.0 - 612.0 \\
> > &= +41.0 \\
> > \Delta_{\text{home}} &= 379.5 - 388.0 \\
> > &= -8.5 \\
> > \Delta_{\text{total}} &= 41.0 - 8.5 + 0 \\
> > &= +32.5
> > \end{align*}
> > $$
> >
> > The total, $+32.5$ or about $5.4\%$ of surplus, understates the story: commercial auto moved $+41.0$ ($6.7\%$ of its prior estimate), partly hidden by favourable homeowners. The report must show the change by segment, net and — if reinsurance treats the lines differently — gross, with **extended discussion** of the commercial auto movement: was it emerging experience against expectation, or a change of method or assumption (which the opinion must also disclose)? The same finding belongs in the report's comments on risk of material adverse deviation.
