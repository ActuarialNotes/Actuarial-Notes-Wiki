---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:10759df6b6b44bf1ef5f8ed3c7b90156dda452bc9f9f8305b4b3ec8457303480
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Comprehensive Income.md
---

![[Media/Figures/Comprehensive_Income.svg|340]]

**Comprehensive Income** is the total change in an insurer's equity during a period from all sources other than transactions with shareholders. It is [[Net Income|net income]] plus other comprehensive income:

> $$\text{Comprehensive income} = \text{Net income} + \text{OCI}$$

- $\text{OCI}$ is other comprehensive income, the items IFRS requires or permits to be recognised outside profit or loss.

Comprehensive income is the more complete measure of the period's economics, and net income is the more closely watched. The gap between them measures how much of the period's change in position was routed around the income statement.

## Other comprehensive income of a P&C insurer

A P&C insurer's OCI holds:

1. Unrealised gains and losses on investments classified at fair value through OCI (FVOCI), which is where most Canadian insurers hold their bond portfolios.
2. The effect of changes in [[IFRS 17 Discount Rates|discount rates]] on insurance liabilities, where the [[Other Comprehensive Income Option|OCI option]] has been elected.
3. Remeasurements of defined benefit pension plans, and currency translation on foreign operations.

## Recycling

Some OCI items are later reclassified into profit or loss: realised gains on FVOCI debt instruments, and the accumulated insurance finance amounts as liabilities run off. Others never are, such as pension remeasurements and FVOCI equity gains. Whether an item recycles determines whether it will ever affect reported earnings.

## Accounting mismatch

OCI is where an insurer manages accounting mismatch. Bonds at FVOCI move with interest rates. If the matching liability movement is also in OCI, the two offset there, and profit shows the underwriting result and the predictable unwind. If they are split across the two statements, reported profit swings with interest rates for no economic reason.

> [!example]- What are this insurer's net income and comprehensive income? {Example}
> Interest rates rise $150$ basis points during the year. The insurer holds $\$900$ million of FVOCI bonds with duration $4$, and insurance liabilities of $\$780$ million with duration $3$, for which it has elected the OCI option. Net income before these effects is $\$50$ million.
>
> > [!answer]-
> > - The bonds fall by about $4 \times 0.015 \times \$900\text{M} = \$54\text{M}$, a loss recognised in OCI.
> > - The liabilities fall by about $3 \times 0.015 \times \$780\text{M} = \$35\text{M}$, a gain to the insurer, which also goes to OCI because the OCI option is elected.
> > - OCI is $-\$54\text{M} + \$35\text{M} = -\$19\text{M}$.
> > - Net income is unchanged at $\$50$ million, and comprehensive income is $\$50\text{M} - \$19\text{M} = \$31\text{M}$.
> > - The $-\$19$ million is the duration mismatch: the assets lose more than the liabilities gain, which is a real economic loss.
> > - Without the OCI option, net income would be $\$50\text{M} + \$35\text{M} = \$85\text{M}$ and OCI $-\$54\text{M}$. Comprehensive income is the same, but reported profit is inflated $70\%$ by a rate movement.

## Accumulated OCI and capital

Accumulated OCI is part of equity, and therefore part of [[Capital Available]] and the [[MCT]] ratio. A sharp rise in interest rates reduces the value of FVOCI bonds, reduces accumulated OCI and reduces the capital ratio, even though the insurer intends to hold the bonds to maturity and will realise no loss on them.
