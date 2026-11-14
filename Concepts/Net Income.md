---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c8c6e11442ed4bfd6aa8c398a34b6fc284b6775e66d679d2e074553e57df9998
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Net Income.md
---

![[Media/Figures/Net_Income.svg|340]]

**Net Income** is the profit or loss an insurer reports for a period, after tax. Under [[IFRS 17]] it is built from two separated components, the [[Insurance Service Result|insurance service result]] from underwriting and the net financial result from investments. In terms of them, net income is

> $$\text{Net income} = \bigl(\text{ISR} + \text{NFR} + \text{Other}\bigr) \times (1 - t)$$

- $\text{ISR}$ is the insurance service result.
- $\text{NFR}$ is the net financial result, investment income less [[Insurance Finance Income or Expenses|insurance finance income or expenses]].
- $\text{Other}$ is other income and expenses.
- $t$ is the tax rate.

Before IFRS 17, underwriting and investment effects were mingled, so a fall in interest rates could improve or damage a figure meant to describe pricing and selection. With the two separated, a reader can see which half of the business produced the profit.

## What net income excludes

Items reported in [[Comprehensive Income|other comprehensive income]] are not in net income. They include unrealised gains on FVOCI investments and, where the [[Other Comprehensive Income Option|OCI option]] is elected, the effect of discount rate changes on insurance liabilities. Two insurers with identical economics can report different net income purely from these elections.

## Sources of volatility

The sources of volatility peculiar to an insurer's net income are:

- Reserve development on prior years, recognised immediately as [[Insurance Service Expenses|past service]].
- Catastrophe losses.
- [[Onerous Contract|Onerous group]] charges, recognised in full at inception.
- Discount rate movements, where the OCI option is not elected.

## Net income and cash flow

Net income is not cash. An insurer collects premium before paying claims, so cash flow can be strongly positive while income is negative, as in a growing, underpriced book. It can also be negative while income is positive, as in a shrinking, profitable one. Both patterns matter for [[Solvency|solvency]].

## Net income and capital

Retained earnings flow into equity and hence into [[Capital Available|capital available]], so a loss reduces the [[MCT]] ratio directly. This is why [[FCT]] adverse scenarios model earnings as well as balance sheets.

## Composition of net income

Regulators and rating agencies read the composition of net income more than its level. Profit from underwriting is repeatable. Profit from investment returns is not under the insurer's control, and profit from prior-year reserve releases is neither.

> [!example]- Which of these two insurers' net income of $\$40$ million is repeatable? {Example}
> Two insurers each report net income of $\$40$ million on $\$500$ million of insurance revenue. Their results are, in $\$$ millions:
>
> | | Insurer P | Insurer Q |
> | :--- | ---: | ---: |
> | Current-year insurance service result | $+34$ | $-22$ |
> | Prior-year favourable development | $+2$ | $+55$ |
> | Net financial result | $+18$ | $+21$ |
> | Tax | $-14$ | $-14$ |
> | Net income | $40$ | $40$ |
>
> > [!answer]-
> > - Insurer P earns its profit from current underwriting. Its $\$34$ million comes from business written this year, and its $\$2$ million of favourable development is immaterial.
> > - If P's pricing and selection stay as they are, next year looks like this year, so P's profit is repeatable.
> > - Insurer Q loses $\$22$ million on current underwriting and reports a profit only because $\$55$ million was released from prior-year reserves.
> > - Reserve redundancy is finite. When it is exhausted, Q's result falls to roughly its underwriting result, which is a loss.
> > - A $\$55$ million release means the prior estimate was $\$55$ million too high. Either the reserving was systematically conservative, or the release was taken to support the result, and both invite [[OSFI]]'s attention.
> > - Q's loss of $\$22$ million on $\$500$ million of revenue is a combined ratio of about $104\%$, so under IFRS 17 some of its business should be showing as onerous.
> > - Only Insurer P's net income is repeatable.

> [!trap] Reading net income before the insurance service result
> Two insurers with the same net income can have opposite underwriting results. Read the insurance service result first, and read prior-year development separately from it.
