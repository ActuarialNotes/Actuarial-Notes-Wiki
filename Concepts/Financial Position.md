---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:4e48b0bf1c1af2f8fa66512d849cd8aaaff187c898e8d8e5a3f2f537bffba92a
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Position.md
---

**The Statement of Financial Position** — the balance sheet — reports an insurer's assets, liabilities and equity at a point in time. Under [[IFRS 17]] its shape changed materially for insurers: unearned premium and deferred acquisition costs disappeared into the [[Liability for Remaining Coverage]], reinsurance moved to the asset side as a separate [[Reinsurance Contracts Held|reinsurance contract asset]], and claim liabilities are carried at present value plus a [[Risk Adjustment for Non-Financial Risk|risk adjustment]].

> $$\text{Assets} = \text{Liabilities} + \text{Equity}$$

- **The principal assets** of a Canadian P&C insurer: invested assets (bonds dominant, some equities, cash), premiums receivable, [[Reinsurance Contracts Held|reinsurance contract assets]], deferred tax assets, and property and equipment. The investment mix is heavily constrained by the need to match liability [[Duration|duration]] and by the [[MCT]]'s [[Market Risk Margin|market risk]] charges.
- **The principal liabilities:** [[Insurance Contract Liabilities]] ([[Liability for Remaining Coverage|LRC]] plus [[Liability for Incurred Claims|LIC]]), which typically exceed half of total liabilities; payables; and any debt.
- **Equity** comprises share capital, retained earnings, and **accumulated other comprehensive income** — the last being where unrealised gains on FVOCI investments and, if the [[Other Comprehensive Income Option|OCI option]] is elected, the effect of discount rate changes on liabilities accumulate.
- **From balance sheet to capital.** [[Capital Available]] starts from equity and applies regulatory adjustments — deducting intangibles, goodwill and certain deferred tax assets, and adjusting for items OSFI does not accept as loss-absorbing. Equity and capital available are therefore related but not equal.
- **The gross-up effect.** Because reinsurance is no longer netted, an insurer that cedes heavily reports a larger balance sheet on both sides than it did before IFRS 17, with no change in economics. Comparisons across the transition date must allow for it.
- **Liquidity, not just solvency.** A balance sheet can show ample equity while the assets are illiquid relative to a catastrophe's payment pattern — which is why [[FCT]] tests cash flows and not only capital.

![[Media/Figures/Financial_Position.svg|340]]

> [!example]- Equity Versus Capital Available {Example}
> An insurer reports: total assets $\$1{,}240$ million (including goodwill $\$40$ million and intangibles $\$18$ million); total liabilities $\$980$ million. Regulatory adjustments also require deduction of $\$12$ million of deferred tax assets that rely on future profitability.
>
> Compute equity and capital available, and comment.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Equity} &= \$1{,}240\text{M} - \$980\text{M} \\
> > &= \$260\text{M}
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Capital available} &= \$260\text{M} - \$40\text{M} - \$18\text{M} - \$12\text{M} \\
> > &= \$190\text{M}
> > \end{align*}$$
> >
> > **Capital available is $27\%$ lower than equity** — a gap that will surprise anyone reading the balance sheet alone.
> >
> > **Why the deductions.** Goodwill and intangibles cannot be sold to pay claims; a deferred tax asset that depends on future profits is worthless precisely when the insurer is unprofitable, which is when capital is needed. The regulatory adjustments ask a single question of each asset: **would this absorb a loss?**
> >
> > **The practical consequence.** If minimum capital required is $\$120$ million, the [[MCT]] ratio is $190/120 = 158\%$, not the $217\%$ that using equity would suggest. An acquisition that creates goodwill therefore consumes regulatory capital dollar for dollar even though it leaves accounting equity unchanged — a fact that shapes how Canadian insurers finance acquisitions.
