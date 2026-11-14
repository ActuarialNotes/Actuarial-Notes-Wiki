---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:e140a5ec0bb618ecf33d288599068fc4549cd0dad56a41bdd18687a11890f254
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Statement of Changes in Equity.md
---
![[Media/Figures/Statement_of_Changes_in_Equity.svg|340]]

The **Statement of Changes in Equity** reconciles an insurer's opening and closing equity, showing every movement in the period: [[Net Income|net income]], other [[Comprehensive Income|comprehensive income]], dividends, share issues and repurchases, and any adjustments from changes in accounting policy.

The closing equity is

> $$\text{Equity}_{\text{close}} = \text{Equity}_{\text{open}} + \text{CI} - \text{Dividends} + \text{Capital transactions}$$

- $\text{Equity}_{\text{open}}$ is the equity at the start of the period.
- $\text{CI}$ is comprehensive income, the total change in equity from all non-owner sources: net income plus other comprehensive income.
- $\text{Capital transactions}$ are share issues less share repurchases.

The statement's columns are the components of equity: share capital, contributed surplus, retained earnings, and accumulated other comprehensive income. Accumulated other comprehensive income is where FVOCI investment movements and, if elected, the effects of the [[Other Comprehensive Income Option|OCI option]] accumulate. The statement shows comprehensive income split by these components and reconciled to the balance sheet.

Accounting policy changes appear as an adjustment to opening retained earnings. That is where the equity effect of the [[Transition to IFRS 17|transition to IFRS 17]] was recorded.

## The statement in solvency supervision

[[Capital Available|Capital available]] is built from equity, so this statement is the record of how capital moved. It separates four movements that all change the [[MCT]] ratio:

| Movement | Component |
| :--- | :--- |
| Capital earned | Retained earnings |
| Capital raised | Share issues |
| Capital distributed | Dividends |
| Capital revalued | Accumulated other comprehensive income |

Dividends are the item under supervisory scrutiny. An insurer paying dividends while its capital ratio is falling is distributing capital it may need, and [[OSFI]] can restrict distributions as an early intervention measure. The statement separates what happened to the insurer (earnings, market movements) from what the insurer chose (distributions), and only the second is a governance question.

> [!example]- Does this insurer's equity reconcile, and what does the statement show a supervisor? {Example}
> An insurer's equity fell from $\$310$ million to $\$268$ million. Its statement of changes in equity shows net income of $\$46$ million, an other comprehensive loss of $\$28$ million and dividends paid of $\$60$ million. Its minimum capital required is $\$160$ million, and its equity is taken as its capital available.
>
> > [!answer]-
> > - The closing equity is $310 + 46 - 28 - 60 = \$268$ million, so the statement reconciles.
> > - The insurer earned $\$46$ million and paid out $\$60$ million, a payout ratio of $60/46 = 130\%$.
> > - With the $\$28$ million OCI loss, most likely FVOCI bond values falling as rates rose, equity fell $\$42$ million, or $14\%$.
> > - The [[MCT]] ratio fell from $310/160 = 194\%$ to $268/160 = 168\%$.
> > - The dividend alone took $60/160 = 37.5$ points off the ratio, more than the whole 26-point decline. It was a distribution of accumulated capital, made in a year when the balance sheet was also absorbing an unrealised investment loss.
> > - The supervisor's questions follow: whether the board approved the dividend with the projected capital ratio in front of it, as [[ORSA]] governance requires, and whether the [[FCT]] shows the ratio holding above the internal target under adverse scenarios after the dividend.
