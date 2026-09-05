---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:48e4c1b8b3b99af452d95ca3961686be7b2a72940d06685cf94b64399c81379f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Net Income.md
---

**Net Income** is the profit or loss an insurer reports for a period, after tax. Under [[IFRS 17]] it is built from two clearly separated components — the **[[Insurance Service Result]]** (underwriting) and the **net financial result** (investment income less [[Insurance Finance Income or Expenses]]) — which together with other income and expenses and tax produce net income.

> $$\text{Net income} = \bigl(\text{ISR} + \text{Net financial result} + \text{Other}\bigr) \times (1 - t)$$

- **The separation is the point.** Before IFRS 17, underwriting and investment effects were mingled, so a fall in interest rates could improve or damage a figure meant to describe pricing and selection. Now a reader can see which half of the business produced the profit.
- **What net income excludes:** items reported in [[Comprehensive Income|other comprehensive income]] — unrealised gains on FVOCI investments, and, where the [[Other Comprehensive Income Option|OCI option]] is elected, the effect of discount rate changes on insurance liabilities. Two insurers with identical economics can report different net income purely from these elections.
- **Sources of volatility** peculiar to insurers: reserve development on prior years (recognised immediately as [[Insurance Service Expenses|past service]]), catastrophe losses, [[Onerous Contract|onerous group]] charges recognised in full at inception, and — where the OCI option is not elected — discount rate movements.
- **Net income is not cash.** An insurer collects premium before paying claims, so cash flow can be strongly positive while income is negative (a growing, underpriced book) or negative while income is positive (a shrinking, profitable one). Both patterns matter for [[Solvency]].
- **Net income feeds capital.** Retained earnings flow into equity and hence into [[Capital Available]], so a loss reduces the [[MCT]] ratio directly — which is why [[FCT]] adverse scenarios model earnings, not just balance sheets.
- Regulators and rating agencies read **the composition** of net income more than its level: profit from underwriting is repeatable, profit from investment returns is not under the insurer's control, and profit from prior-year reserve releases is neither.

> [!example]- Same Net Income, Different Companies {Example}
> Two insurers each report net income of $\$40$ million on $\$500$ million of insurance revenue.
>
> - **Insurer P**: insurance service result $+\$34$M; net financial result $+\$20$M; prior-year development $+\$2$M favourable; tax $\$14$M.
> - **Insurer Q**: insurance service result $-\$22$M; net financial result $+\$21$M; prior-year favourable development $+\$55$M; tax $\$14$M.
>
> Assess.
>
> > [!answer]-
> > Identical bottom lines, completely different businesses.
> >
> > **Insurer P** earns its profit from **current underwriting**. The $\$34$ million service result comes from business written this year, and the $\$2$ million of favourable development is immaterial. This is repeatable: if pricing and selection stay as they are, next year looks like this year.
> >
> > **Insurer Q** loses $\$22$ million on current underwriting and reports a profit only because of $\$55$ million released from prior-year reserves. Three problems follow:
> >
> > 1. **The release is not repeatable.** Reserve redundancy is finite. When it is exhausted, the reported result falls to roughly the underwriting result — a loss.
> > 2. **The release raises a question about the reserves themselves.** A $\$55$ million favourable movement means the prior estimate was $\$55$ million too high. Either the reserving process is systematically conservative (and was overstating liabilities before), or the release was taken to support the reported result. Neither reading is comfortable, and both invite [[OSFI]]'s attention.
> > 3. **Current pricing is inadequate.** A $-\$22$ million service result on $\$500$ million of revenue means current business is written at roughly a $104\%$ combined ratio, and under IFRS 17 some of it should be surfacing as [[Onerous Contract|onerous]].
> >
> > **The analytical rule:** read the insurance service result **before** net income, and read prior-year development separately from it. An insurer whose profit depends on releases is consuming a stock, not earning a flow.
