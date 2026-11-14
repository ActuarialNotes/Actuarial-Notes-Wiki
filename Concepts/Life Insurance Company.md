---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9b383d56995f9944624504344836dbbe9486fad075fd275f1bade9a733af8e52
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Insurance Company.md
---
A **Life Insurance Company** is an [[Insurer|insurer]] whose business is long-duration contracts contingent on human life: [[Life Insurance|life insurance]], [[Annuity Contract|annuities]] and, often, disability, long-term care and group benefits. It collects premiums years or decades before it pays benefits, so its balance sheet is dominated by policy [[Reserve|reserves]], backed by long-term invested assets, with a layer of capital above them.

Its surplus is

> $$\text{Surplus} = \text{Assets} - \text{Policy liabilities}$$

The policy liabilities are [[Valuation|valued]] under each reporting framework's [[Valuation Principle|valuation principle]]: U.S. statutory (formulaic and principle-based reserves), [[GAAP]] and [[IFRS 17]]. The same company reports a different surplus under each. Regulators require capital, and [[Rating Agency|rating agencies]] judge it.

Life insurers also build and use industry mortality tables, which are graduated from pooled experience, projected for improvement, and adjusted for underwriting class ([[Mortality Table Construction|mortality table construction]]).

## Risks that set its capital

1. Asset default and market risk.
2. [[Interest Rate Risk|Interest rate]] and asset-liability mismatch risk.
3. [[Insurance Risk|Insurance risk]]: [[Mortality|mortality]], longevity, morbidity and lapse.
4. Business and operational risk.

Long liabilities make a life insurer very sensitive to interest rates. Guarantees embedded in annuities and [[Universal Life Insurance|universal life]] add option-like market risk.

> [!example]- How much would this insurer's surplus change if interest rates fell by 1%? {Example}
> A life insurer holds assets of $\$10{,}000$M with modified duration 8, against policy liabilities of $\$9{,}200$M with modified duration 12.
>
> > [!answer]-
> > - The assets rise by about $8(10{,}000)(0.01) = \$800$M.
> > - The liabilities rise by about $12(9{,}200)(0.01) = \$1{,}104$M.
> > - Surplus changes by $800 - 1{,}104 = -\$304$M, from $\$800$M to about $\$496$M.
> > - That is a 38% loss from a 1% rate move, because the liabilities are longer than the assets that back them.

This is why [[Cash Flow Matching|asset-liability matching]] dominates a life company's risk management.

## Capital ratios

In the U.S., the NAIC's [[Risk-Based Capital|RBC]] ratio is

> $$\text{RBC ratio} = \frac{\text{Total adjusted capital}}{\text{ACL RBC}}$$

- ACL RBC is the Authorized Control Level risk-based capital.

Regulatory action is triggered as the ratio falls through 200% (Company Action Level), 150%, 100% and 70% of ACL RBC.

> [!example]- What are this insurer's RBC ratios before and after an investment loss, and what action level does it reach? {Example}
> A U.S. life insurer has total adjusted capital of $\$900$M and Authorized Control Level RBC of $\$250$M. After an investment loss, TAC falls to $\$450$M and ACL RBC rises to $\$260$M because of downgraded bonds.
>
> > [!answer]-
> > - Before the loss, the ratio is $900/250 = 360\%$.
> > - After it, the ratio is $450/260 = 173\%$.
> > - At 173%, between 150% and 200%, the company is at Company Action Level.
> > - It must file an RBC plan with its domiciliary regulator setting out how it will restore capital.

In Canada, [[OSFI]]'s LICAT total ratio is

> $$\text{LICAT total ratio} = \frac{\text{Available capital} + \text{Surplus allowance} + \text{Eligible deposits}}{\text{Base solvency buffer}}$$

OSFI sets a supervisory target of 100% and a minimum of 90% for the total ratio, and 70% and 55% for the core ratio. [[Solvency II]] and the IAIS standards apply internationally.

> [!trap] Dividing by Company Action Level RBC
> The RBC ratio is quoted against Authorized Control Level RBC. Company Action Level is $2 \times$ ACL, so dividing by CAL RBC halves the ratio. In the example, the 360% would read as 180% and wrongly put the company at Company Action Level.
