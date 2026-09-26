---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dba084d1c80c2518f01054986b870addbd4386c39383c31249d4283b87933495
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Reporting.md
---

**Financial Reporting** is the preparation and communication of an insurer's financial position and results to users outside management — regulators, investors, policyholders, [[Rating Agency|rating agencies]] and tax authorities — on a prescribed accounting basis. For a P&C insurer the largest and most judgemental number in every report is the claim liability, which makes the actuary a participant in financial reporting, not merely a supplier to it.

> $$\text{Equity} = \text{Assets} - \text{Insurance liabilities} - \text{Other liabilities}$$

- **Why the actuary matters.** Insurance liabilities are an estimate, so equity is an estimate: a reserve change of $\Delta$ moves pre-tax income and equity by $-\Delta$. Every reported measure of profit and capital inherits the actuary's judgement.
- **Different users, different bases.** Regulatory reporting asks *can this insurer pay its claims?* and leans conservative; general-purpose reporting asks *how did the business perform?* and aims at a neutral going-concern measure; tax reporting asks what is taxable. The same insurer's "surplus", "equity" and "capital" differ across them by design.
- **Canada.** One measurement basis — IFRS, with [[IFRS 17]] for insurance contracts — serves both the audited [[Financial Statements|financial statements]] and the regulatory filings: the [[Canadian Annual Return]] (core statements, supervisory quarterly and annual supplements, and the [[MCT]] return), filed with [[OSFI]] and provincial regulators. The [[Appointed Actuary]] values the [[Insurance Contract Liabilities]] in accordance with [[Accepted Actuarial Practice]] under the [[Insurance Companies Act]] (or the provincial Insurance Act), gives the opinion that accompanies the statements, and prepares the [[Appointed Actuary's Report]] and the [[FCT]] report.
- **United States.** Two bases run side by side. [[Statutory Accounting Principles|SAP]], codified by the NAIC, underlies the [[NAIC Annual Statement]] filed with the states; [[GAAP]] underlies the statements filed by SEC registrants and investor reporting; [[IFRS]] appears where a U.S. insurer reports to a foreign parent. The Appointed Actuary's SAO is attached to the Annual Statement, supported by the confidential [[Actuarial Opinion Summary]] and [[Actuarial Report]], and [[Schedule P]] discloses the development of the reserves behind it.
- **The actuary's obligations** — valuation standards, [[Materiality]], [[Subsequent Events]], disclosure and escalation — are set by law, regulators and professional standards: see [[Professional Responsibilities of the Actuary]], [[Actuarial Standards of Practice]] (U.S.) and [[Standards of Practice]] (Canada).

> [!example]- One Reserve Change, Three Readers {Example}
> At year end the actuary increases the estimate of unpaid claims by $\$24$ million. Before the change, the insurer's pre-tax income was $\$60$ million and its surplus $\$300$ million. Ignoring tax, what does each audience see?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Pre-tax income} &= \$60\text{M} - \$24\text{M} \\
> > &= \$36\text{M} \\[4pt]
> > \text{Surplus} &= \$300\text{M} - \$24\text{M} \\
> > &= \$276\text{M}
> > \end{align*}
> > $$
> >
> > - **Investors** see earnings fall by $40\%$ — a headline result.
> > - **The regulator** sees surplus fall by $8\%$ and asks whether the capital ratio and leverage remain acceptable.
> > - **A rating agency** asks whether this is a one-off or the latest step in a pattern of adverse development visible in the claims development exhibit or Schedule P.
> >
> > One estimate, three consequences — which is why the estimate's basis and uncertainty must be communicated, not just the number.

> [!example]- The Same Claims on Two Bases {Example}
> Unpaid claims of $\$50$ million are payable in one year and $\$50$ million in two years. Compare a U.S. statutory carried reserve (undiscounted, no explicit margin) with a Canadian IFRS 17 liability for incurred claims using a $4\%$ discount rate and a risk adjustment of $5\%$ of the present value.
>
> > [!answer]-
> > **U.S. statutory:** $\$100$ million, the nominal amount.
> >
> > **Canadian IFRS 17:**
> >
> > $$
> > \begin{align*}
> > PV &= \frac{50}{1.04} + \frac{50}{1.04^2} \\
> > &= 48.077 + 46.228 \\
> > &= 94.305 \\[4pt]
> > RA &= 0.05 \times 94.305 \\
> > &= 4.715 \\[4pt]
> > LIC &= 94.305 + 4.715 \\
> > &= 99.02
> > \end{align*}
> > $$
> >
> > About $\$99.0$ million. The two totals are close, but for different reasons: statutory accounting keeps an implicit margin by not discounting, while IFRS 17 discounts and then adds an explicit, disclosed margin. Change the interest rate or the confidence level and they diverge — so a comparison across bases must reconcile the components, not the totals.
