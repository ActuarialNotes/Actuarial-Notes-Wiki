---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5b3634cadba90931d7c00bce4016720a618a04d26f3352a6dfd73f97022a5b8a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statement of Changes in Equity.md
---

**The Statement of Changes in Equity** reconciles an insurer's opening and closing equity, showing every movement in the period: [[Net Income]], other [[Comprehensive Income|comprehensive income]], dividends, share issues and repurchases, and any adjustments from changes in accounting policy.

> $$\text{Equity}_{\text{close}} = \text{Equity}_{\text{open}} + \text{Comprehensive income} - \text{Dividends} + \text{Capital transactions}$$

- **Its columns** are the components of equity: share capital, contributed surplus, retained earnings, and **accumulated other comprehensive income** — the last being where FVOCI investment movements and, if elected, the [[Other Comprehensive Income Option|OCI option]] effects accumulate.
- **Why it matters to a regulator.** [[Capital Available]] is built from equity, so this statement is the audit trail of how capital moved. It distinguishes capital **earned** (retained earnings), capital **raised** (share issues), capital **distributed** (dividends) and capital **revalued** (accumulated OCI) — four very different things that all change the [[MCT]] ratio.
- **Dividends are the item under supervisory scrutiny.** An insurer paying dividends while its capital ratio is falling is distributing capital it may need, and [[OSFI]] can and does restrict distributions as an early intervention measure. This statement is where that behaviour is visible.
- **Accounting policy changes and transition** appear here as an adjustment to opening retained earnings — which is where the equity effect of [[Transition to IFRS 17]] was recorded.
- **The relationship to comprehensive income** is direct: comprehensive income is the total change in equity from all non-owner sources, and this statement shows it split by component and reconciled to the balance sheet.

> [!example]- Where Did the Capital Go? {Example}
> An insurer's equity fell from $\$310$ million to $\$268$ million. The statement of changes in equity shows: net income $\$46$ million; other comprehensive loss $\$28$ million; dividends paid $\$60$ million.
>
> Reconcile and assess.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Closing equity} &= \$310\text{M} + \$46\text{M} - \$28\text{M} - \$60\text{M} \\
> > &= \$268\text{M}
> > \end{align*}$$
> >
> > The reconciliation holds. Now read it.
> >
> > **The insurer earned $\$46$ million and paid out $\$60$ million** — a payout ratio of $130\%$. Combined with a $\$28$ million OCI loss (most likely FVOCI bond values falling as rates rose), equity fell $\$42$ million, or $14\%$.
> >
> > **Why this is a supervisory concern.** Dividends exceeding earnings are a distribution of accumulated capital, and they were paid in a year when the balance sheet was also absorbing an unrealised investment loss. If the [[Base Solvency Buffer]] were $\$160$ million, the [[MCT]] ratio fell from roughly $194\%$ to $168\%$ in a single year, and **$60\%$ of that decline was a discretionary decision by the board**.
> >
> > **The questions that follow:**
> >
> > - Was the dividend approved with the projected capital ratio in front of the board, as [[ORSA]] governance requires?
> > - Does the [[FCT]] report show the ratio holding above the internal target under adverse scenarios *after* the dividend?
> > - Is the payout policy sustainable, or was this a one-off upstreaming to a parent?
> >
> > **The general point:** this statement separates what happened *to* the insurer (earnings, market movements) from what the insurer *chose* (distributions). Only the second is a governance question, and only this statement makes the split plain.
