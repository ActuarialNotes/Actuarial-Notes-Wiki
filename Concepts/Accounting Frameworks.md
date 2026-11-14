---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:9255f3b8c3d024571c8d7a12baf87827e8fbea59d689770e6a8e4fae2cf96749
  sources:
    - "Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), Ch.1 pp.8-11, Ch.2 p.12, p.25 (printed 7-11, 24), Ch.22 pp.302-306, sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf"
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble ¶17-20, ¶30-31, ¶36 (PDF pp.34-37), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "FASB, Concepts Statement No. 8, Conceptual Framework for Financial Reporting (as amended), OB2, OB5, OB9, OB10 (PDF pp.11-13), sha256:30fc0735a3362490d5708953fbbb78ee9e6baf2e05fa02efd1e753d5aa2effae — https://storage.fasb.org/Concepts_Statement_No._8_(As_Amended).pdf"
    - "IFRS Foundation, IFRS 17 Insurance Contracts standard page (fetched 2026-10-10), sha256:ed3f063f8346f9f29d379aa4eaa2a0c56d1df5bf5d82e05e2a175305c14ebac9 — https://www.ifrs.org/issued-standards/list-of-standards/ifrs-17-insurance-contracts/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accounting Frameworks.md
---

An **Accounting Framework** is a set of rules under which an insurer measures and reports its transactions, built for one kind of user. A U.S. property-casualty insurer reports to state regulators under [[Statutory Accounting Principles|statutory accounting (SAP)]], to investors and lenders under [[GAAP]] if it issues GAAP statements, to a foreign parent or market under [[IFRS]], and to the IRS on a tax basis, while management also works from internal figures of its own.

| Framework | Set by | Primary users |
| --- | --- | --- |
| Statutory accounting (SAP) | The domiciliary state, built on the NAIC's *Accounting Practices and Procedures Manual* | Regulators |
| GAAP | The FASB, with the SEC overseeing it | Existing and potential investors, lenders and other creditors |
| IFRS | The IASB | Users in many countries outside the U.S. |
| Tax basis | The tax law passed by Congress, enforced by the IRS | The IRS |
| Management reporting | Management's own decisions | Management |

Which source of guidance governs within each framework is set by its [[Accounting Rule Hierarchy|rule hierarchy]].

> [!example]- Which framework would each of these users read? {Example}
> 1. The insurance department of the insurer's home state, checking whether it can still pay its claims.
> 2. A bank deciding whether to lend to the insurer's publicly traded holding company.
> 3. The IRS.
> 4. The insurer's foreign parent, an IFRS filer that consolidates it into group accounts.
> 5. The chief underwriting officer, deciding whether to keep writing commercial auto in one state.
>
> > [!answer]-
> > - The state insurance department reads SAP. The regulator is the primary user of statutory statements, which are built to measure solvency.
> > - The bank reads GAAP. A lender is a primary user of general purpose financial reports, and a public company files GAAP statements with the SEC.
> > - The IRS reads the tax basis, which starts from statutory income and adjusts it as the tax law requires.
> > - The foreign parent reads IFRS, because it files under it, so the U.S. subsidiary's results must be prepared on that basis for the group.
> > - The chief underwriting officer reads management reporting. Management can obtain the information it needs internally, in whatever detail the decision calls for.

## Statutory accounting

SAP is the accounting prescribed or permitted by the insurer's domiciliary state, built on the NAIC's *Accounting Practices and Procedures Manual*, so two insurers can follow slightly different statutory rules, and each discloses its departures from the NAIC Manual. Its primary users are regulators, whose concern is solvency: whether policyholder and other obligations will be met when they come due. It therefore stresses the ability to pay claims in the future and applies conservatism. It expenses acquisition costs as incurred and reports loss and premium reserves net of reinsurance.

SAP counts only admitted assets, so an insurer's statutory surplus is

> $$\text{Statutory surplus} = \text{Admitted assets} - \text{Liabilities}$$

- $\text{Admitted assets}$ are the assets SAP allows on the balance sheet, those available to meet policyholder obligations.

## GAAP

U.S. GAAP is set by the FASB, with the SEC overseeing it and setting the rules for publicly traded companies. Publicly traded insurers report under it, and privately held companies may too. Its general purpose reports are directed at existing and potential investors, lenders and other creditors deciding whether to provide resources to the entity, so it stresses the earnings that emerge period by period, matching revenue with expense. The FASB notes that regulators may find general purpose reports useful, but those reports are directed at investors, lenders and other creditors. Regulators' own framework is SAP.

Acquisition costs are deferred and amortised, and reinsurance is shown gross, with loss reserves as a liability and amounts recoverable from reinsurers as an asset.

> [!example]- What loss reserve does this insurer report under SAP and under GAAP, and what total assets? {Example}
> At year end an insurer's gross unpaid losses are $\$500$ million, and $\$120$ million of that is recoverable from reinsurers. It holds $\$900$ million of other admitted assets.
>
> > [!answer]-
> > - SAP reports the loss reserve net of reinsurance; GAAP reports it gross and shows the recoverable as an asset.
> > - Under SAP the liability is $500 - 120 = \$380$ million, and total assets stay at $\$900$ million.
> > - Under GAAP the liability is the gross $\$500$ million, and total assets are $900 + 120 = \$1{,}020$ million.
> > - Equity is $\$520$ million on both bases, but the GAAP balance sheet is larger on both sides.

## IFRS

International Financial Reporting Standards are issued by the IASB and used in many countries outside the U.S. They reach U.S. insurers that have international subsidiaries or that are subsidiaries of IFRS filers. Insurance contracts are measured under [[IFRS 17]].

## Tax basis

For an insurer the starting point for taxable income is statutory income, which is then adjusted. Taxable income is

> $$\text{Taxable income} = \text{SAP income} \pm \text{Tax adjustments}$$

- $\text{Tax adjustments}$ are the departures the tax law makes from statutory income, set out on [[Insurance Income Tax]].

The adjustments specific to insurers mostly accelerate income, chiefly through discounting loss reserves and reducing the unearned premium that may be deducted. Because it follows tax law rather than an accounting concept, tax accounting may be more or less conservative than SAP.

## Management reporting

Management does not have to rely on general purpose reports, because it can obtain the information it needs internally. Internal reporting is shaped by management's own decisions rather than by an outside user. Capital needs, for example, can be judged on bases beyond the statutory one, including an economic basis.

> [!trap] Mixing net and gross reserves
> SAP nets ceded reserves against the liability, and GAAP shows them gross with a recoverable asset. An estimate of unpaid claims compared with the booked reserve must be prepared net for SAP and gross for GAAP.
