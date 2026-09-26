---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2784d08a859e651477e71be7fda724c2c6cf708287b27f95d7f4a94a6d1ae634
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Statements.md
---

**Financial Statements** are the structured reports of an insurer's financial position, performance, changes in equity and cash flows, together with the notes that explain them. The primary set is the [[Balance Sheet]], the [[Income Statement]], the [[Cash Flow Statement]], a statement of changes in equity (the [[Capital and Surplus]] account in U.S. statutory reporting) and the [[Notes to Financial Statements|notes]] — prepared under [[Statutory Accounting Principles|SAP]], [[GAAP]] or [[IFRS]], which differ in what they recognise and how they measure it.

> $$\text{Assets} = \text{Liabilities} + \text{Equity}$$
>
> $$\Delta\,\text{Equity} = \text{Net income} + \text{Direct equity items} + \text{Capital in} - \text{Dividends}$$

- **Direct equity items** are changes that bypass net income: other comprehensive income under GAAP and IFRS; under SAP, direct charges and credits to surplus such as unrealised gains, the change in non-admitted assets, the change in the provision for reinsurance and the change in net deferred tax.
- **United States — SAP versus GAAP.** SAP measures solvency on a liquidation-minded basis: only **admitted assets** count; acquisition costs are expensed immediately while the full unearned premium is held, so there is no DAC and new business *drains* surplus; the [[Schedule F]] provision for reinsurance is charged to surplus; loss and premium reserves are shown **net** of reinsurance. GAAP (ASC 944) measures performance for a going concern: acquisition costs are capitalised as DAC and matched to earned premium, all assets are recognised subject to impairment, and reinsurance is presented **gross**, with recoverables as an asset.
- **Canada — IFRS 17.** The statement of financial position, statement of profit or loss, comprehensive income, changes in equity, cash flows and notes. Revenue is [[Insurance Revenue]], not written or earned premium; acquisition costs sit inside the [[Liability for Remaining Coverage]]; [[Reinsurance Contracts Held]] are a separate asset, never netted, and reinsurance appears in profit or loss as one net line. The OSFI core return (see [[Canadian Annual Return]]) reproduces these statements in regulatory form with the liability roll-forwards IFRS 17 introduced.
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
