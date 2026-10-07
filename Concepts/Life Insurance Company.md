---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c34f08207d50e22beea6c0db328bb2210ed61a56397c304667a0a1b5d67f87a6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Insurance Company.md
---

**A Life Insurance Company** is an [[Insurer|insurer]] whose business is long-duration contracts contingent on human life: [[Life Insurance|life insurance]], [[Annuity Contract|annuities]] and, often, disability, long-term care and group benefits. It collects premiums years or decades before it pays benefits. Its balance sheet is therefore dominated by policy [[Reserve|reserves]], backed by long-term invested assets, with a layer of capital above them. Regulators require that capital, and [[Rating Agency|rating agencies]] judge it.

> $$\text{Surplus} = \text{Assets} - \text{Policy liabilities}$$

> $$\text{RBC ratio} = \frac{\text{Total adjusted capital}}{\text{ACL RBC}}$$

> $$\text{LICAT total ratio} = \frac{\text{Available capital} + \text{Surplus allowance} + \text{Eligible deposits}}{\text{Base solvency buffer}}$$

- **Liabilities first.** Reserves are [[Valuation|valued]] under each reporting framework's [[Valuation Principle|valuation principle]]: U.S. statutory (formulaic and principle-based reserves), [[GAAP]] and [[IFRS 17]]. The same company reports different surplus under each.
- **Risks that set its capital.** These are asset default and market risk, [[Interest Rate Risk|interest rate]] and asset-liability mismatch, [[Insurance Risk|insurance risk]] ([[Mortality|mortality]], longevity, morbidity, lapse), and business and operational risk. Long liabilities make it very sensitive to interest rates. Guarantees embedded in annuities and [[Universal Life Insurance|universal life]] add option-like market risk.
- **Capital frameworks.** In the U.S., the NAIC's [[Risk-Based Capital|RBC]] system triggers regulatory action as the ratio falls through 200% (Company Action Level), 150%, 100% and 70% of Authorized Control Level RBC. In Canada, [[OSFI]]'s LICAT sets a supervisory target of 100% and a minimum of 90% for the total ratio, and 70% and 55% for the core ratio. [[Solvency II]] and the IAIS standards apply internationally.
- **Mortality tables.** Life insurers build and use industry tables, which are graduated from pooled experience, projected for improvement, and adjusted for underwriting class.

> [!example]- Reading an RBC Ratio {Example}
> A U.S. life insurer has total adjusted capital of \$900M and Authorized Control Level RBC of \$250M. After an investment loss, TAC falls to \$450M and ACL RBC rises to \$260M because of downgraded bonds. Find the ratio before and after, and the action level reached.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Before} &= \frac{900}{250} \\
> > &= 360\% \\
> > \text{After} &= \frac{450}{260} \\
> > &= 173\%
> > \end{align*}
> > $$
> > At $173\%$, between $150\%$ and $200\%$, the company is at **Company Action Level**. It must file an RBC plan with its domiciliary regulator setting out how it will restore capital. The ratio fell from both sides: capital fell, and the downgrades raised the requirement.

> [!example]- Surplus Sensitivity to a Rate Fall {Example}
> A life insurer holds assets of \$10,000M with modified duration 8, against policy liabilities of \$9,200M with modified duration 12. Estimate the change in surplus if interest rates fall by 1%.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \Delta A &\approx 8(10{,}000)(0.01) \\
> > &= +800 \\
> > \Delta L &\approx 12(9{,}200)(0.01) \\
> > &= +1{,}104 \\
> > \Delta \text{Surplus} &= 800 - 1{,}104 \\
> > &= -304
> > \end{align*}
> > $$
> > Surplus falls from \$800M to about \$496M, a $38\%$ loss from a 1% rate move. The liabilities are longer than the assets that back them. This is why [[Cash Flow Matching|asset-liability matching]] dominates a life company's risk management.

> [!tip]- How it appears on the exam
> - **CP-351** asks candidates to describe and compare measures of regulatory capital adequacy for life insurers across jurisdictions (RBC, LICAT, Solvency II). It also tests how asset and liability risks feed those measures. Answers are written, with occasional ratio calculations.
> - **ILA-201U** covers capital management for a U.S. life insurer: required capital, economic capital, and the perspectives of regulators, investors, policyholders and management. **ILA-201I** and **ILA-201U** ask how regulators and rating agencies evaluate life insurers.
> - **ILA-101** describes how the modern mortality tables that life insurers use are created: data, graduation, improvement and selection.

> [!warning]- Exam traps
> - **Wrong denominator.** The RBC ratio is quoted against Authorized Control Level RBC. Company Action Level is $2 \times$ ACL, so dividing by CAL RBC halves the ratio and moves the action level.
> - **LICAT is not the P&C MCT.** The life ratio's supervisory target is $100\%$, not the MCT's $150\%$. Applying the P&C thresholds wrongly flags a healthy life insurer.
> - **Duration mismatch sign.** When liabilities are longer than assets, *falling* rates hurt surplus. Treating a rate fall as favourable, as for a bond holder, reverses the answer.
> - **One company, several surpluses.** Statutory, GAAP and IFRS 17 equity differ for the same insurer. Mixing a GAAP liability with a statutory capital requirement gives a meaningless ratio.
