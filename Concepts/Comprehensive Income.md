---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:32765564916f6178aeebc0c54c3256954b69ed99e94da4165f789ccc52a8d374
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Comprehensive Income.md
---

**Comprehensive Income** is the total change in an insurer's equity during a period from all sources other than transactions with shareholders. It is **[[Net Income]] plus other comprehensive income (OCI)** — items that IFRS requires or permits to be recognised outside profit or loss.

> $$\text{Comprehensive income} = \text{Net income} + \text{OCI}$$

- **What sits in OCI for a P&C insurer:**
  - Unrealised gains and losses on investments classified at **fair value through OCI**, which is where most Canadian insurers hold their bond portfolios.
  - The effect of **changes in [[IFRS 17 Discount Rates|discount rates]]** on insurance liabilities, where the [[Other Comprehensive Income Option|OCI option]] has been elected.
  - Remeasurements of defined benefit pension plans, and currency translation on foreign operations.
- **Recycling.** Some OCI items are later reclassified into profit or loss (realised gains on FVOCI debt instruments, and the accumulated insurance finance amounts as liabilities run off); others never are (pension remeasurements, FVOCI equity gains). Whether an item recycles determines whether it will ever affect reported earnings.
- **Why it matters for insurers specifically.** OCI is where **accounting mismatch** is managed. Bonds at FVOCI move with rates; if the matching liability movement is also in OCI, the two offset there and profit is left showing underwriting and the predictable unwind. If they are split across statements, reported profit swings for no economic reason.
- **Accumulated OCI is part of equity**, and therefore part of [[Capital Available]] and the [[MCT]] ratio. A sharp rise in interest rates reduces the value of FVOCI bonds, reduces accumulated OCI, and reduces the capital ratio — even though the insurer intends to hold the bonds to maturity and will suffer no loss.
- **Comprehensive income is the more complete measure** of the period's economics; net income is the more closely watched. An analyst should read both, and read the gap between them as a measure of how much of the period's change in position was routed around the income statement.

> [!example]- A Rate Rise Through the Statements {Example}
> Interest rates rise $150$ basis points during the year. An insurer holds $\$900$ million of FVOCI bonds with duration $4$ years, and insurance liabilities of $\$780$ million with duration $3$ years, for which it has elected the OCI option. Net income before these effects is $\$50$ million.
>
> Compute net income and comprehensive income.
>
> > [!answer]-
> > **Bond value falls:**
> >
> > $$\begin{align*}
> > \Delta A &\approx -4 \times 0.015 \times \$900\text{M} \\
> > &= -\$54\text{M}
> > \end{align*}$$
> >
> > recognised in OCI.
> >
> > **Liability value falls** (a gain to the insurer, since the liability is now worth less):
> >
> > $$\begin{align*}
> > \Delta L &\approx -3 \times 0.015 \times \$780\text{M} \\
> > &= -\$35\text{M}
> > \end{align*}$$
> >
> > and with the OCI option elected, this $+\$35$M gain also goes to OCI.
> >
> > **Results:**
> >
> > $$\begin{align*}
> > \text{Net income} &= \$50\text{M} \\[4pt]
> > \text{OCI} &= -\$54\text{M} + \$35\text{M} = -\$19\text{M} \\[4pt]
> > \text{Comprehensive income} &= \$50\text{M} - \$19\text{M} = \$31\text{M}
> > \end{align*}$$
> >
> > **What the $-\$19$ million represents.** It is the **duration mismatch**: assets at $4$ years against liabilities at $3$ years, so a rate rise hurts the assets more than it helps the liabilities. That is a genuine economic loss, and it is exactly the figure a reader wants.
> >
> > **Two further observations.** First, equity and hence [[Capital Available]] fall by $\$19$ million net, so the [[MCT]] ratio moves even though net income was untouched. Second, had the insurer **not** elected the OCI option, net income would have been $\$50 + \$35 = \$85$ million and OCI $-\$54$ million — the same comprehensive income, but a reported profit inflated $70\%$ by a rate movement. That contrast is the entire case for the option.
