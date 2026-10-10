---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:503718326963c0a43bc70cf44f3699cea0b1a50b4011c957e7050346a199fa6c
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble ¶31, ¶35 (PDF pp.37-38); SSAP No. 62R ¶30, ¶40, ¶49, ¶76 (PDF pp.441, 444, 446, 450), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), pp.56-58 (Capital and Surplus Account), p.62 (ceding commission treated as revenue), pp.121-122, pp.302-306, sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf"
    - "IFRS 17 Insurance Contracts as adopted by Commission Regulation (EU) 2021/2036 (OJ L 416, 23.11.2021), ¶78, ¶80, ¶82-83, ¶86 (PDF pp.18-19), sha256:c3fd00c0bff726d1886fffc0404815217cba23a84d155d681cfbf9fa631ec315 — https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32021R2036"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Financial Statements.md
---

**Financial Statements** are the structured reports of an insurer's financial position, performance, changes in equity and cash flows, together with the notes that explain them. The primary set is the [[Balance Sheet]], the [[Income Statement]], the [[Cash Flow Statement]], a statement of changes in equity (the [[Capital and Surplus]] account in U.S. statutory reporting) and the [[Notes to Financial Statements|notes]] — prepared under [[Statutory Accounting Principles|SAP]], [[GAAP]] or [[IFRS]], which differ in what they recognise and how they measure it.

> $$\text{Assets} = \text{Liabilities} + \text{Equity}$$
>
> $$\Delta\,\text{Equity} = \text{Net income} + \text{Direct equity items} + \text{Capital in} - \text{Dividends}$$

- **Direct equity items** are changes that bypass net income: other comprehensive income under GAAP and IFRS; under SAP, direct charges and credits to surplus such as unrealised gains, the change in non-admitted assets, the change in the provision for reinsurance and the change in net deferred tax.
- **United States — SAP versus GAAP.** SAP measures solvency on a liquidation-minded basis: only **admitted assets** count; acquisition costs are expensed immediately while the full unearned premium is held, so there is no DAC and new business *drains* surplus; the [[Schedule F]] provision for reinsurance is charged to surplus; loss and premium reserves are shown **net** of reinsurance. GAAP (ASC 944) measures performance for a going concern: acquisition costs are capitalised as DAC and matched to earned premium, all assets are recognised subject to impairment, and reinsurance is presented **gross**, with recoverables as an asset.
- **The U.S. statutory set.** Under the NAIC Preamble, the statutory financial statements are the balance sheet, the related summary of operations (the statutory income statement), the statement of changes in capital and surplus, and the cash flow statement. Because these cannot show everything needed to judge an insurer's short- and long-term stability, management supplements them with notes, management's discussion and analysis, and supplementary schedules and exhibits. The balance sheet is the principal focus of solvency measurement, and the income statement a secondary one that shows whether the insurer can sustain itself as a going concern.
- **Canada — IFRS 17.** The statement of financial position, statement of profit or loss, comprehensive income, changes in equity, cash flows and notes. Revenue is [[Insurance Revenue]], not written or earned premium; acquisition costs sit inside the [[Liability for Remaining Coverage]]; [[Reinsurance Contracts Held]] are a separate asset, never netted, and reinsurance may appear in profit or loss as one net line. The OSFI core return (see [[Canadian Annual Return]]) reproduces these statements in regulatory form with the liability roll-forwards IFRS 17 introduced.
- **Reinsurance is where the bases diverge most.** A proportional treaty with a ceding commission gives immediate **surplus relief** under SAP but none under GAAP, and a contract that fails [[Risk Transfer|risk transfer]] is a deposit on every basis — see [[Reinsurance Accounting]], [[Deposit Accounting]] and [[Reinsurance Strategy]].
- Canadian ratios computed from IFRS 17 statements are not comparable with the pre-2023 series, nor with U.S. statutory ratios; see [[Key Financial Measures]].

> [!example]- Quota Share Surplus Relief: SAP versus GAAP {Example}
> A U.S. insurer writes $\$10$ million of annual premium on day 1 and pays acquisition costs of $25\%$. It cedes $40\%$ under a quota share with a $25\%$ ceding commission. Find the effect on statutory surplus and on GAAP equity at the moment of writing, with and without the treaty.
>
> > [!answer]-
> > **Without the treaty.** Cash received is $10 - 2.5 = 7.5$.
> >
> > $$
> > \begin{align*}
> > \Delta\text{Surplus}_{\text{SAP}} &= 7.5 - 10 \\
> > &= -2.5 \\[4pt]
> > \Delta\text{Equity}_{\text{GAAP}} &= 7.5 + 2.5 - 10 \\
> > &= 0
> > \end{align*}
> > $$
> >
> > GAAP carries the $\$2.5$ million as DAC; SAP expenses it against a full unearned premium reserve.
> >
> > **With the treaty.** Ceded premium $4.0$ less commission $1.0$: the insurer pays $3.0$, leaving cash of $4.5$ and net unearned premium of $6.0$.
> >
> > $$
> > \begin{align*}
> > \Delta\text{Surplus}_{\text{SAP}} &= 4.5 - 6.0 \\
> > &= -1.5 \\[4pt]
> > \Delta\text{Equity}_{\text{GAAP}} &= 4.5 + (2.5 - 1.0) - 6.0 \\
> > &= 0
> > \end{align*}
> > $$
> >
> > Statutory surplus improves by $\$1.0$ million — the ceding commission, which here exactly matches the acquisition cost on the ceded share, so none of it must be deferred. GAAP equity does not move: the commission simply reduces DAC. The relief is an artefact of SAP's conservatism, which is why rating agencies adjust for it.

> [!example]- A Quota Share Under IFRS 17 {Example}
> A Canadian insurer reports insurance revenue of $\$500$ million, claims incurred of $\$360$ million and other insurance service expenses of $\$80$ million. It cedes $20\%$ under a quota share: ceded premium $\$100$ million, ceding commission $\$25$ million (not contingent on claims), recoveries $20\%$ of claims. Compute the insurance service result and compare it with the old netted presentation.
>
> > [!answer]-
> > A ceding commission not contingent on claims reduces the premium paid to the reinsurer, so the allocation of reinsurance premium is $100 - 25 = 75$; recoveries are $0.20 \times 360 = 72$.
> >
> > $$
> > \begin{align*}
> > \text{Net reinsurance expense} &= 75 - 72 \\
> > &= 3 \\[4pt]
> > \text{Service result} &= 500 - 360 - 80 - 3 \\
> > &= 57
> > \end{align*}
> > $$
> >
> > **Netted (pre-IFRS 17):** net earned $400$, net claims $288$, net expenses $80 - 25 = 55$, so the underwriting result is $400 - 288 - 55 = 57$.
> >
> > Same profit of $\$57$ million, different picture: IFRS 17 keeps revenue at the gross $\$500$ million and shows reinsurance as a single $\$3$ million net cost, so ratios built on the two presentations cannot be compared.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective on the fundamentals of insurer financial statements asks what each statement shows, and how the statutory statements differ from GAAP ones, for example in acquisition costs, nonadmitted assets and reinsurance.
> - **Exams 6C and 6U:** The SAP, GAAP and IFRS 17 statements are compared in detail, as in the examples above.

> [!warning]- Exam traps
> - **Surplus moves outside income:** Under SAP, changes in nonadmitted assets and in the provision for reinsurance go directly to surplus, not through net income.
> - **Ceding commission and surplus:** A quota share's ceding commission raises statutory surplus at once, but leaves GAAP equity unchanged.

