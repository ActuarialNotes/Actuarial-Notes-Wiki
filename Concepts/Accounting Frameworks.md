---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8fee1ee0a42118e66f366fb22ec1676ce9e49057c4307b1d3d0b07ee7f1dcaad
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accounting Frameworks.md
---

**Accounting Frameworks** are the distinct sets of rules under which an insurer measures and reports the same transactions, each built for a different user. A U.S. property-casualty insurer reports to state regulators under [[Statutory Accounting Principles|statutory accounting (SAP)]], to investors and lenders under [[GAAP]] if it issues GAAP statements, to a foreign parent or market under [[IFRS]], and to the IRS on a tax basis, while management also works from internal figures of its own.

> $$\text{Statutory surplus} = \text{Admitted assets} - \text{Liabilities}$$

> $$\text{Taxable income} = \text{SAP income} \pm \text{Tax adjustments}$$

- **Symbols:** Admitted assets are the assets SAP allows on the balance sheet, those available to meet policyholder obligations. Tax adjustments are the departures the tax law makes from statutory income, set out on [[Insurance Income Tax]].
- **Statutory accounting (SAP):** SAP is the accounting prescribed or permitted by the insurer's domiciliary state, built on the NAIC's *Accounting Practices and Procedures Manual*. Its primary users are regulators, whose concern is solvency: whether policyholder and other obligations will be met when they come due. It therefore stresses the ability to pay claims in the future, applies conservatism, excludes nonadmitted assets, expenses acquisition costs as incurred and reports loss and premium reserves net of reinsurance. Its basic statements are the balance sheet, the summary of operations, the statement of changes in capital and surplus and the cash flow statement.
- **GAAP:** U.S. GAAP is set by the FASB, with the SEC overseeing it and setting the rules for publicly traded companies. Publicly traded insurers report under it, and privately held companies may too. Its general purpose reports are directed at existing and potential investors, lenders and other creditors deciding whether to provide resources to the entity, so it stresses the earnings that emerge period by period, matching revenue with expense. Acquisition costs are deferred and amortised, and reinsurance is shown gross, with loss reserves as a liability and amounts recoverable from reinsurers as an asset.
- **IFRS:** International Financial Reporting Standards are issued by the IASB and used in many countries outside the U.S. They reach U.S. insurers that have international subsidiaries or that are subsidiaries of IFRS filers. Insurance contracts are now measured under [[IFRS 17]].
- **Tax basis:** The IRS enforces the tax law passed by Congress. For an insurer the starting point for taxable income is statutory income, which is then adjusted. The adjustments specific to insurers mostly accelerate income, chiefly through discounting loss reserves and reducing the unearned premium that may be deducted. Because it follows tax law rather than an accounting concept, tax accounting may be more or less conservative than SAP.
- **Management (internal) reporting:** Management does not have to rely on general purpose reports, because it can obtain the information it needs internally. Internal reporting is therefore shaped by management's own decisions rather than by an outside user, and capital needs, for example, can be judged on bases beyond the statutory one, including an economic basis.
- **Other bases:** State and local governments follow GAAP set by the GASB, which matters to an actuary working for a public entity that retains its own risks. The concepts behind each framework are compared on [[Qualitative Characteristics of Accounting Information]], and which source wins within each framework is on [[Accounting Rule Hierarchy]].

> [!example]- Matching Users to Frameworks {Example}
> Name the framework, or frameworks, each user would read.
>
> 1. The insurance department of the insurer's home state, checking whether it can still pay its claims.
> 2. A bank deciding whether to lend to the insurer's publicly traded holding company.
> 3. The IRS.
> 4. The insurer's foreign parent, an IFRS filer that consolidates it into group accounts.
> 5. The chief underwriting officer, deciding whether to keep writing commercial auto in one state.
>
> > [!answer]-
> > 1. **SAP.** The regulator is the primary user of statutory statements, which are built to measure solvency.
> > 2. **GAAP.** A lender is a primary user of general purpose financial reports, and a public company files GAAP statements with the SEC.
> > 3. **Tax basis**, which starts from statutory income and adjusts it as the tax law requires.
> > 4. **IFRS**, because the parent files under it, so the U.S. subsidiary's results must be prepared on that basis for the group.
> > 5. **Management reporting.** Management can obtain the information it needs internally, in whatever detail the decision calls for, rather than relying on general purpose reports.

> [!example]- One Reserve, Two Balance Sheets {Example}
> At year end an insurer's gross unpaid losses are \$500 million, and \$120 million of that is recoverable from reinsurers. Show how the liability appears under SAP and under GAAP, and the total assets each shows if the insurer holds \$900 million of other admitted assets.
>
> > [!answer]-
> > SAP reports the loss reserve net of reinsurance; GAAP reports it gross and shows the recoverable as an asset.
> > $$
> > \begin{align*}
> > \text{Liability}_{\text{SAP}} &= 500 - 120 \\
> > &= 380 \\
> > \text{Liability}_{\text{GAAP}} &= 500 \\
> > \text{Assets}_{\text{GAAP}} &= 900 + 120 \\
> > &= 1{,}020
> > \end{align*}
> > $$
> > Statutory total assets stay at \$900 million. The equity is the same on both bases here, \$520 million, but the GAAP balance sheet is larger on both sides. An actuary comparing an estimate of unpaid claims with the booked reserve must prepare it net for SAP and gross for GAAP, and may also estimate the ceded amount for comparison with the GAAP recoverable.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objectives cover the types of accounting frameworks and the rule hierarchies within them. Expect a question that describes a user, such as a regulator, an investor, the IRS or management, and asks which framework serves it and why.
> - **Contrasts:** A question can give one treatment, such as acquisition costs expensed at once or reinsurance netted against reserves, and ask which framework uses it and what objective explains it.
> - **Linked objectives:** The framework sets the reading of [[Financial Statements|insurer financial statements]] and of [[Premium Accounting|premium accounting]], so the same distinctions return in those questions.

> [!warning]- Exam traps
> - **Regulators are not GAAP's primary users:** The FASB notes that regulators may find general purpose reports useful, but those reports are directed at investors, lenders and other creditors. Regulators' own framework is SAP.
> - **Tax is not GAAP:** For an insurer, taxable income starts from statutory income, not GAAP income.
> - **Net or gross:** SAP nets ceded reserves against the liability, and GAAP shows them gross with a recoverable asset. Mixing the two bases misstates the comparison.
> - **SAP varies by state:** It is the accounting prescribed or permitted by the domiciliary state, so two insurers can follow slightly different statutory rules, and each discloses its departures from the NAIC Manual.
