---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a1eb52076cdd3eac33c467df10ea2e995943cc353a48457030663b379d07364c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Reporting.md
---

**Financial Reporting** is the preparation and communication of an insurer's financial position and results to users outside management, such as regulators, investors, policyholders, [[Rating Agency|rating agencies]] and tax authorities, on a prescribed accounting basis. For a P&C insurer the largest and most judgemental number in every report is the claim liability, which makes the actuary a participant in financial reporting.

An insurer's equity is

> $$\text{Equity} = \text{Assets} - \text{Insurance liabilities} - \text{Other liabilities}$$

- $\text{Insurance liabilities}$ are the actuary's estimate of what the insurer owes on its contracts.

Because the insurance liabilities are an estimate, equity is an estimate too. A reserve increase of $\Delta$ lowers pre-tax income and equity by $\Delta$, so every reported measure of profit and capital inherits the actuary's judgement.

> [!example]- At year end the actuary increases the estimate of unpaid claims by $\$24$ million. Pre-tax income was $\$60$ million and surplus $\$300$ million. Ignoring tax, what does each reader see? {Example}
> - Pre-tax income falls to $60 - 24 = \$36$ million, and surplus to $300 - 24 = \$276$ million.
> - Investors see earnings fall by 40%.
> - The regulator sees surplus fall by 8% and asks whether the capital ratio and leverage remain acceptable.
> - A rating agency asks whether this is a one-off or the latest step in a pattern of adverse development in the claims development exhibit or Schedule P.
> - One estimate has three consequences, so its basis and uncertainty must be communicated along with the number.

The actuary's obligations (valuation standards, [[Materiality|materiality]], [[Subsequent Events|subsequent events]], disclosure and escalation) are set by law, regulators and professional standards. They are covered in [[Professional Responsibilities of the Actuary]], the [[Actuarial Standards of Practice]] (U.S.) and the [[Standards of Practice]] (Canada).

## Bases of financial reporting

Each user asks a different question, so each basis measures differently:

| User | Question | Basis |
| :--- | :--- | :--- |
| Regulator | Can this insurer pay its claims? | Leans conservative |
| Investor | How did the business perform? | A neutral, going-concern measure |
| Tax authority | What is taxable? | Tax rules |

The same insurer's surplus, equity and capital therefore differ across the bases by design.

## Financial reporting in Canada

One measurement basis, IFRS with [[IFRS 17]] for insurance contracts, serves both the audited [[Financial Statements|financial statements]] and the regulatory filings. The regulatory filing is the [[Canadian Annual Return]] (core statements, supervisory quarterly and annual supplements, and the [[MCT]] return), filed with [[OSFI]] and the provincial regulators.

The [[Appointed Actuary]] values the [[Insurance Contract Liabilities|insurance contract liabilities]] in accordance with [[Accepted Actuarial Practice|accepted actuarial practice]] under the [[Insurance Companies Act]] or the provincial Insurance Act. The appointed actuary gives the opinion that accompanies the statements and prepares the [[Appointed Actuary's Report]] and the [[FCT]] report.

> [!example]- How do a U.S. statutory reserve and a Canadian IFRS 17 liability for incurred claims compare for these claims? {Example}
> Unpaid claims of $\$50$ million are payable in one year and $\$50$ million in two years. The statutory reserve is undiscounted with no explicit margin. The IFRS 17 liability uses a 4% discount rate and a risk adjustment of 5% of the present value.
>
> > [!answer]-
> > - The U.S. statutory reserve is the nominal amount, $\$100$ million.
> > - The present value is $50/1.04 + 50/1.04^2 = 48.077 + 46.228 = \$94.305$ million.
> > - The risk adjustment is $0.05 \times 94.305 = \$4.715$ million.
> > - The [[Liability for Incurred Claims|liability for incurred claims]] is $94.305 + 4.715 = \$99.02$ million.
> > - The totals are close for different reasons. Statutory accounting keeps an implicit margin by not discounting, while IFRS 17 discounts and adds an explicit, disclosed margin.

## Financial reporting in the United States

Two bases run side by side. [[Statutory Accounting Principles|SAP]], codified by the NAIC, underlies the [[NAIC Annual Statement]] filed with the states. [[GAAP]] underlies the statements of SEC registrants and investor reporting. [[IFRS]] appears where a U.S. insurer reports to a foreign parent.

The appointed actuary's statement of actuarial opinion is attached to the Annual Statement, supported by the confidential [[Actuarial Opinion Summary]] and [[Actuarial Report]]. [[Schedule P]] discloses the development of the reserves behind it.

> [!trap] Comparing totals across bases
> Two bases can give close totals for different reasons, and diverge as soon as the interest rate or the confidence level changes. Reconcile the components (discounting and margin), not the totals.
