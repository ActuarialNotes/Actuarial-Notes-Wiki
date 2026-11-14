---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:96b3d0c0ad4a1b51b9b4ac5fb60e9e632ccdb3f68774f78448744dc7f5a7cdd1
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble ¶31, ¶35 (PDF pp.37-38); SSAP No. 62R ¶30, ¶40, ¶49, ¶76 (PDF pp.441, 444, 446, 450), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), pp.56-58 (Capital and Surplus Account), p.62 (ceding commission treated as revenue), pp.121-122, pp.302-306, sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf"
    - "IFRS 17 Insurance Contracts as adopted by Commission Regulation (EU) 2021/2036 (OJ L 416, 23.11.2021), ¶78, ¶80, ¶82-83, ¶86 (PDF pp.18-19), sha256:c3fd00c0bff726d1886fffc0404815217cba23a84d155d681cfbf9fa631ec315 — https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32021R2036"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Statements.md
---

**Financial Statements** are the structured reports of an insurer's financial position, performance, changes in equity and cash flows, together with the notes that explain them. They are prepared under [[Statutory Accounting Principles|SAP]], [[GAAP]] or [[IFRS]], which differ in what they recognise and how they measure it. The primary set is:

1. The [[Balance Sheet|balance sheet]], the insurer's assets, liabilities and equity at a date.
2. The [[Income Statement|income statement]], its performance over a period.
3. The [[Cash Flow Statement|cash flow statement]].
4. A statement of changes in equity, the [[Capital and Surplus|capital and surplus]] account in U.S. statutory reporting.
5. The [[Notes to Financial Statements|notes]].

The balance sheet identity is

> $$\text{Assets} = \text{Liabilities} + \text{Equity}$$

The change in equity over a period, which the statement of changes in equity shows, is

> $$\Delta\,\text{Equity} = \text{Net income} + \text{Direct equity items} + \text{Capital in} - \text{Dividends}$$

- $\text{Direct equity items}$ are changes that bypass net income: other comprehensive income under GAAP and IFRS, and direct charges and credits to surplus under SAP.
- $\text{Capital in}$ is capital contributed by the owners.

Under SAP, certain items not attributable to the earnings process are charged or credited directly to surplus rather than passing through statutory net income. They include unrealised gains, the change in nonadmitted assets, the change in the provision for reinsurance and the change in net deferred tax.

## The U.S. statutory statements

Under the NAIC Preamble, the statutory financial statements are the balance sheet, the related summary of operations (the statutory income statement), the statement of changes in capital and surplus, and the cash flow statement. These cannot show everything needed to judge an insurer's short- and long-term stability, so management supplements them with notes, management's discussion and analysis, and supplementary schedules and exhibits. The balance sheet is the principal focus of solvency measurement. The income statement is a secondary one that shows whether the insurer can sustain itself as a going concern.

## SAP and GAAP

SAP measures solvency on a liquidation-minded basis, and GAAP (ASC 944) measures performance for a going concern. The two differ as follows:

| Item | SAP | GAAP |
| :--- | :--- | :--- |
| Assets | Only admitted assets count | All assets are recognised, subject to impairment |
| Acquisition costs | Expensed immediately while the full unearned premium is held, so there is no DAC and new business drains surplus | Capitalised as DAC and matched to earned premium |
| Reinsurance | Loss and premium reserves are shown net of reinsurance, and the [[Schedule F]] provision for reinsurance is charged to surplus | Reserves are shown gross, with recoverables as an asset |

Reinsurance is where the bases diverge most. A proportional treaty with a ceding commission gives immediate **surplus relief** under SAP but none under GAAP. A contract that fails [[Risk Transfer|risk transfer]] is accounted for under SAP as a [[Deposit Accounting|deposit]] (SSAP No. 62R). [[Reinsurance Accounting|Reinsurance accounting]] has the details.

> [!example]- How do statutory surplus and GAAP equity change when this insurer writes the business, with and without the quota share? {Example}
> A U.S. insurer writes $\$10$ million of annual premium on day 1 and pays acquisition costs of $25\%$. It cedes $40\%$ under a quota share with a $25\%$ ceding commission.
>
> > [!answer]-
> > - Without the treaty, cash received is $10 - 2.5 = 7.5$, against an unearned premium reserve of $10$.
> > - Statutory surplus changes by $7.5 - 10 = -2.5$, because SAP expenses the acquisition cost. GAAP equity changes by $7.5 + 2.5 - 10 = 0$, because GAAP carries the $\$2.5$ million as DAC.
> > - With the treaty, the insurer pays ceded premium of $4.0$ less a commission of $1.0$, leaving cash of $7.5 - 3.0 = 4.5$ and net unearned premium of $6.0$.
> > - Statutory surplus changes by $4.5 - 6.0 = -1.5$, an improvement of $\$1.0$ million, the ceding commission.
> > - GAAP equity changes by $4.5 + (2.5 - 1.0) - 6.0 = 0$, because the commission reduces DAC.

## IFRS 17 in Canada

Under IFRS 17, revenue is [[Insurance Revenue|insurance revenue]], not written or earned premium. Acquisition costs sit inside the [[Liability for Remaining Coverage|liability for remaining coverage]]. [[Reinsurance Contracts Held|Reinsurance contracts held]] are a separate asset, never netted, and reinsurance may appear in profit or loss as one net line. Canadian ratios computed from IFRS 17 statements are therefore not comparable with the pre-2023 series, nor with U.S. statutory ratios ([[Key Financial Measures|key financial measures]]).

> [!example]- What is this insurer's insurance service result under IFRS 17, and how does it compare with the old netted presentation? {Example}
> A Canadian insurer reports insurance revenue of $\$500$ million, claims incurred of $\$360$ million and other insurance service expenses of $\$80$ million. It cedes $20\%$ under a quota share: ceded premium of $\$100$ million, a ceding commission of $\$25$ million not contingent on claims, and recoveries of $20\%$ of claims.
>
> > [!answer]-
> > - A ceding commission not contingent on claims reduces the premium paid to the reinsurer, so the allocation of reinsurance premium is $100 - 25 = 75$.
> > - Recoveries are $0.20 \times 360 = 72$, so the net reinsurance expense is $75 - 72 = 3$.
> > - The insurance service result is $500 - 360 - 80 - 3 = 57$.
> > - Netted, as before IFRS 17, net earned premium is $400$, net claims $288$ and net expenses $80 - 25 = 55$, so the underwriting result is $400 - 288 - 55 = 57$.
> > - The profit is the same $\$57$ million, but IFRS 17 keeps revenue at the gross $\$500$ million and shows reinsurance as one $\$3$ million net cost, so ratios built on the two presentations cannot be compared.

> [!trap] Running surplus changes through net income
> Under SAP, the changes in nonadmitted assets and in the provision for reinsurance go directly to surplus, not through net income. Adding them to statutory net income misstates it.
