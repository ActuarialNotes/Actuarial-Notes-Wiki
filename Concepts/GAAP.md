---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4e99b6030aae79e7a6404f449b98cac2d54ca155127451fc34cb4092095f62c2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/GAAP.md
---

**GAAP** (U.S. Generally Accepted Accounting Principles) is the accounting framework set by the Financial Accounting Standards Board (FASB) and codified in its Accounting Standards Codification (ASC), under which SEC-registered U.S. insurers report to investors; insurance guidance sits mainly in **ASC 944**. Where [[Statutory Accounting Principles|SAP]] asks whether the insurer could meet its policyholder obligations, GAAP asks what the business is earning as a going concern — so it matches expenses to the revenue they produce.

> $$\text{Acquisition expense}_{\text{GAAP}} = \text{Costs incurred} - \Delta\text{DAC}$$

- **Deferred acquisition costs (DAC)** are the signature difference. GAAP capitalises the incremental costs of *successfully* acquiring contracts — commissions, premium taxes — and amortises them in proportion to premium earned; SAP expenses them as incurred. GAAP therefore recognises the "equity in the unearned premium" that SAP withholds, and a growing insurer looks better on GAAP than on SAP.
- **The other SAP-to-GAAP differences** a candidate should be able to list:
  - Nonadmitted assets (overdue premiums, furniture and equipment, part of the deferred tax asset) are restored, net of allowances.
  - Reinsurance is **grossed up**: recoverables on unpaid losses and prepaid reinsurance premiums are assets, not reductions of liabilities, and the statutory provision for reinsurance ([[Schedule F]]) gives way to an allowance for credit losses under the CECL model (ASC 326).
  - Available-for-sale bonds are at fair value, with unrealised gains in other comprehensive income (SAP: amortised cost for investment grade); fair-value changes on equity securities run through net income.
  - Surplus notes are debt, not surplus; changes in deferred tax run through tax expense, not directly to surplus.
  - A gain on retroactive reinsurance is deferred and amortised, rather than booked to restricted special surplus.
- **What largely does not differ:** P&C claim liabilities are carried undiscounted under both, with no explicit risk margin, and both require a premium deficiency reserve when unearned premium will not cover future losses and expenses.
- **Statements and disclosure.** Balance sheet, income and comprehensive income, changes in shareholders' equity, cash flows, and notes — which for short-duration contracts include accident-year incurred and paid claims development tables, GAAP's counterpart to [[Schedule P]]. See [[Financial Statements]] and [[Accounting Standards]] for the three-way comparison with SAP and [[IFRS]].

> [!example]- Growth Strain: SAP Loss, GAAP Profit {Example}
> A new insurer writes $\$1{,}200$ of annual policies uniformly through its first year. Acquisition costs (commission and premium tax) are $20\%$ of written premium; other, non-deferrable expenses are $\$30$. Losses and LAE are $65\%$ of earned premium.
>
> Compute first-year underwriting income on each basis.
>
> > [!answer]-
> > Uniform writing of annual policies earns half the year's writings, so earned premium is $\$600$ and unearned premium is $\$600$.
> >
> > $$
> > \begin{align*}
> > \text{Losses and LAE} &= 0.65 \times 600 \\
> > &= 390 \\
> > \text{Acquisition costs} &= 0.20 \times 1{,}200 \\
> > &= 240
> > \end{align*}
> > $$
> >
> > **SAP** expenses all $\$240$; **GAAP** defers the part relating to unearned premium, $0.20 \times 600 = \$120$, and amortises the other $\$120$:
> >
> > $$
> > \begin{align*}
> > \text{UW income}_{\text{SAP}} &= 600 - 390 - 240 - 30 \\
> > &= -60 \\
> > \text{UW income}_{\text{GAAP}} &= 600 - 390 - 120 - 30 \\
> > &= 60
> > \end{align*}
> > $$
> >
> > The $\$120$ gap is exactly the DAC asset. The business runs at a $90\%$ GAAP combined ratio, yet statutory surplus falls by $\$60$ in the year it is written — the growth strain that makes a fast-growing insurer need capital even when its pricing is sound.

> [!example]- Bridging Statutory Surplus to GAAP Equity {Example}
> An insurer reports statutory surplus of $\$400$M. It has $\$60$M of acquisition costs GAAP would defer; $\$15$M of nonadmitted assets, which GAAP would carry net of a $\$3$M credit-loss allowance; an $\$8$M provision for reinsurance, against which GAAP would hold a $\$2$M CECL allowance; available-for-sale bonds whose fair value exceeds amortised cost by $\$10$M; and $\$25$M of surplus notes. Apply $21\%$ deferred tax to the DAC and the unrealised gain only.
>
> Estimate GAAP shareholders' equity.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Equity} &= 400 + 60 + (15 - 3) + (8 - 2) \\
> > &\quad + 10 - 25 - 0.21(60 + 10) \\
> > &= 400 + 60 + 12 + 6 + 10 - 25 - 14.7 \\
> > &= 448.3
> > \end{align*}
> > $$
> >
> > GAAP equity is $\$448.3$M, $\$48.3$M above statutory surplus even after the surplus notes move to debt. Each step reverses one piece of statutory conservatism: DAC restores the equity in the unearned premium, nonadmitted assets return at realisable value, the Schedule F penalty gives way to an estimate of what is actually uncollectible, and bonds move to market value.
