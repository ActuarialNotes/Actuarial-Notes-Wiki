---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:62f89c05a1d2f65858569962e84e3e719f3a1d77d6626dd7c04f1abd643905e9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/GAAP.md
---

**GAAP** (U.S. Generally Accepted Accounting Principles) is the accounting framework set by the Financial Accounting Standards Board (FASB) and codified in its Accounting Standards Codification (ASC), under which SEC-registered U.S. insurers report to investors. Its insurance guidance sits mainly in **ASC 944**.

Where [[Statutory Accounting Principles|SAP]] asks whether the insurer could meet its policyholder obligations, GAAP asks what the business is earning as a going concern, so it matches expenses to the revenue they produce. Its signature difference from SAP is **deferred acquisition costs** (DAC). GAAP capitalises the incremental costs of *successfully* acquiring contracts, such as commissions and premium taxes, and amortises them in proportion to premium earned. SAP expenses them as incurred. The GAAP acquisition expense of a period is

> $$\text{Acquisition expense}_{\text{GAAP}} = \text{Costs incurred} - \Delta\text{DAC}$$

- $\text{Costs incurred}$ is the acquisition costs incurred in the period, which SAP expenses in full.
- $\Delta\text{DAC}$ is the change in the DAC asset over the period.

GAAP therefore recognises the "equity in the unearned premium" that SAP withholds, and a growing insurer looks better on GAAP than on SAP.

> [!example]- What is this new insurer's first-year underwriting income on SAP and on GAAP? {Example}
> A new insurer writes $\$1{,}200$ of annual policies uniformly through its first year. Acquisition costs (commission and premium tax) are $20\%$ of written premium. Other, non-deferrable expenses are $\$30$. Losses and LAE are $65\%$ of earned premium.
>
> > [!answer]-
> > - Uniform writing of annual policies earns half the year's writings, so earned premium is $\$600$ and unearned premium is $\$600$.
> > - Losses and LAE are $0.65 \times 600 = \$390$.
> > - Acquisition costs are $0.20 \times 1{,}200 = \$240$. SAP expenses all of it.
> > - GAAP defers the part relating to unearned premium, $0.20 \times 600 = \$120$, and expenses the other $\$120$.
> > - SAP underwriting income is $600 - 390 - 240 - 30 = -\$60$.
> > - GAAP underwriting income is $600 - 390 - 120 - 30 = \$60$.
> > - The $\$120$ gap is the DAC asset. The business runs at a $90\%$ GAAP combined ratio, yet statutory surplus falls by $\$60$ in the year it is written. This growth strain is why a fast-growing insurer needs capital even when its pricing is sound.

## Other differences from SAP

The other SAP-to-GAAP differences are:

- Nonadmitted assets (overdue premiums, furniture and equipment, part of the deferred tax asset) are restored, net of allowances.
- Reinsurance is **grossed up**: recoverables on unpaid losses and prepaid reinsurance premiums are assets, not reductions of liabilities. The statutory provision for reinsurance ([[Schedule F]]) gives way to an allowance for credit losses under the CECL model (ASC 326).
- Available-for-sale bonds are at fair value, with unrealised gains in other comprehensive income. SAP carries investment-grade bonds at amortised cost. Fair-value changes on equity securities run through net income.
- Surplus notes are debt, not surplus.
- Changes in deferred tax run through tax expense, not directly to surplus.
- A gain on retroactive reinsurance is deferred and amortised, rather than booked to restricted special surplus.

Some things largely do not differ. P&C claim liabilities are carried undiscounted under both, with no explicit risk margin, and both require a premium deficiency reserve when unearned premium will not cover future losses and expenses.

> [!example]- What is this insurer's GAAP shareholders' equity? {Example}
> An insurer reports statutory surplus of $\$400$M. Apply $21\%$ deferred tax to the DAC and the unrealised gain only. It has:
>
> | Item | Amount |
> | :--- | ---: |
> | Acquisition costs GAAP would defer | $\$60$M |
> | Nonadmitted assets | $\$15$M |
> | GAAP credit-loss allowance on them | $\$3$M |
> | Provision for reinsurance | $\$8$M |
> | GAAP CECL allowance on recoverables | $\$2$M |
> | Fair value of AFS bonds above amortised cost | $\$10$M |
> | Surplus notes | $\$25$M |
>
> > [!answer]-
> > - DAC adds $\$60$M, restoring the equity in the unearned premium.
> > - Nonadmitted assets return net of their allowance, adding $15 - 3 = \$12$M.
> > - The provision for reinsurance is replaced by the CECL allowance, adding $8 - 2 = \$6$M.
> > - Bonds move to fair value, adding $\$10$M.
> > - Surplus notes move to debt, subtracting $\$25$M.
> > - Deferred tax on the DAC and the gain is $0.21 \times (60 + 10) = \$14.7$M, subtracted.
> > - GAAP equity is $400 + 60 + 12 + 6 + 10 - 25 - 14.7 = \$448.3$M, which is $\$48.3$M above statutory surplus.

## Financial statements

GAAP's statements are the balance sheet, income and comprehensive income, changes in shareholders' equity, cash flows, and notes. For short-duration contracts the notes include accident-year incurred and paid claims development tables, GAAP's counterpart to [[Schedule P]]. [[Financial Statements]] and [[Accounting Standards]] compare GAAP with SAP and [[IFRS]].

> [!trap] Netting reinsurance against GAAP reserves
> Under GAAP, loss reserves are shown gross on the balance sheet, and the reinsurance recoverable is a separate asset. Reducing the reserve by the recoverable, as the statutory balance sheet does, understates both the liabilities and the assets.
