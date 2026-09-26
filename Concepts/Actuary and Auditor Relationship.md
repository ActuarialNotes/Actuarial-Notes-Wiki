---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b4623378487559d11951015092f24ede28ea6bea9de8efee7b0b3339bed803b8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuary and Auditor Relationship.md
---

**The Actuary and Auditor Relationship** is the professional interaction between the actuary who determines amounts in an insurer's financial statements — for a Canadian P&C insurer, the [[Appointed Actuary]]'s valuation of [[Insurance Contract Liabilities]] — and the [[External Auditor]] who audits those statements. In Canada it is governed by the **Joint Policy Statement** (JPS) approved by the Canadian Actuarial Standards Board and the Auditing and Assurance Standards Board, effective for communications initiated on or after 31 March 2023.

> $$\text{Actuary} \xrightarrow{\text{liability valuation}} \text{Auditor}$$
>
> $$\text{Auditor} \xrightarrow{\text{work on data integrity}} \text{Actuary}$$

- **Three separate responsibilities.** The financial statements are **management's**; the audit opinion is the **auditor's** alone; the valuation of the liabilities is the **actuary's**. The JPS is explicit that using the other professional's work "does not constitute reliance": neither's responsibility is reduced by it.
- **Use runs both ways.** The *inquiring* professional uses the *responding* professional's work. The actuary, responsible for judging whether data are relevant, sufficient and reliable, may use the auditor's procedures on data integrity; the auditor may use the actuary's assumptions, methods and data as audit evidence for the liabilities.
- **What must be settled up front.** Communication starts when both engagements are planned, with management's permission for each to talk to and share information with the other. The inquiring professional states the intended use of the work and seeks confirmation that the other is appointed, in good standing and working to their professional standards; then they discuss the **accounting framework and policy choices** against the actuarial valuation choices, **[[Materiality]]**, **[[Subsequent Events]]** and the **timing** and dates of their reports.
- **The written response.** The responding professional confirms qualification — Fellowship of the [[Canadian Institute of Actuaries (CIA)|CIA]] for the actuary, membership of a professional accounting body for the auditor — and its work. An auditor's response states that its work on the data is **not an assurance engagement**, so the actuary cannot describe the data as "verified by the auditor".
- **Outside the JPS:** communications between the auditor and **the auditor's own actuary**, and between the actuary and an **external review actuary** ([[Peer Review]]), are not covered.
- **Where the two meet** is the audit committee of the board ([[Corporate Governance]]). A disagreement over a judgement — the [[Risk Adjustment for Non-Financial Risk|risk adjustment]], a [[IFRS 17 Discount Rates|discount rate]], [[Risk Transfer|risk transfer]] on a reinsurance contract — belongs there, not in private negotiation.

> [!example]- Mismatched Materiality and Report Dates {Example}
> At planning, the auditor tells the Appointed Actuary it intends to use the valuation as audit evidence with a materiality of $\$5$ million. The actuary's valuation materiality is $\$8$ million, and the actuary plans to date the report 5 March; the audit report will be dated 20 March. What should the two settle?
>
> > [!answer]-
> > **Materiality.** Approximations and unexplained differences up to $\$8$ million are acceptable to the actuary but could be material to the audit. Either the actuary performs the work to a threshold no greater than $\$5$ million for the items the auditor will use, or the auditor plans additional procedures of its own. The JPS asks them to establish exactly this: whether the responding professional's materiality suits the inquiring professional's purpose.
> >
> > **Subsequent events.** Events between 5 and 20 March — a large claim, a court decision — could affect the liabilities after the actuary has signed. The two agree how the actuary will consider matters that come to attention up to the date of the actuary's report, and align the dates or agree an update so the gap is covered.
> >
> > Both points are cheap to resolve at planning and expensive to discover at year end.

> [!example]- Can the Actuary Lean on the Audit? {Example}
> The actuary finds a $\$12$ million unexplained difference between claims-system payments and the general ledger. The CFO says the auditors have tested the ledger, so the actuary can rely on the audited figures. Assess.
>
> > [!answer]-
> > The actuary may **use** the auditor's work on data integrity — after asking the auditor, under the JPS, what procedures were performed and on what — but responsibility for concluding that the data are sufficient and reliable stays with the actuary. The auditor's response will say its work is not an assurance engagement on the data.
> >
> > So the actuary must investigate the difference, decide whether it is material to the valuation, and disclose it and its treatment in the [[Appointed Actuary's Report]]. "The auditors tested it" is evidence, not a conclusion.
