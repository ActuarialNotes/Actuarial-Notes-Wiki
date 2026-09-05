---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a5e42557f9977dedd8a6697691c56b704fd0d69099c839b41e33ffa88681cdf4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Capital Available.md
---

**Capital Available** is the numerator of the [[MCT]] ratio: the capital an insurer actually holds that is available to absorb losses. It starts from accounting equity and applies **regulatory adjustments and deductions** for items that would not in fact absorb a loss, then classifies what remains into quality tiers.

> $$\text{Capital Available} = \text{Category A} + \text{Category B} - \text{Deductions}$$

- **The tiering.** **Category A** is the highest quality — common shares, retained earnings, [[Comprehensive Income|accumulated other comprehensive income]] — permanently available and freely usable to absorb losses. **Category B** and **C** cover instruments with more limited loss absorbency, such as certain preferred shares and subordinated debt, and are subject to limits relative to Category A.
- **Principal deductions:** goodwill and intangible assets (cannot be sold to pay claims); deferred tax assets that depend on future profitability (worthless exactly when needed); interests in unconsolidated financial institutions; and certain other assets OSFI does not accept.
- **Why equity and capital available differ.** The deductions can be large — an acquisitive insurer's goodwill consumes regulatory capital dollar for dollar while leaving accounting equity untouched. This is why a strong balance sheet can still produce a weak MCT ratio.
- **It moves with the income statement and with markets.** Losses reduce it, dividends reduce it, and unrealised losses on FVOCI investments reduce it through OCI. Under [[IFRS 17]] an [[Onerous Contract|onerous group]] charge reduces it in the year the business is written.
- **Loss absorbency is the organising test.** Every question about whether an item counts reduces to: *would this absorb a loss when the insurer is in trouble?* Goodwill would not; a deferred tax asset contingent on profits would not; common equity would.

> [!example]- Building Capital Available {Example}
> An insurer reports equity of $\$340$ million, comprising common shares $\$120$ million, retained earnings $\$185$ million and accumulated OCI $\$35$ million. It also has $\$50$ million of subordinated debt qualifying as Category B. Deductions: goodwill $\$45$ million, intangibles $\$22$ million, and deferred tax assets dependent on future profitability $\$16$ million.
>
> Compute capital available, and the effect of a $\$30$ million unrealised investment loss.
>
> > [!answer]-
> > **Category A:**
> >
> > $$\$120\text{M} + \$185\text{M} + \$35\text{M} = \$340\text{M}$$
> >
> > **Deductions:**
> >
> > $$\$45\text{M} + \$22\text{M} + \$16\text{M} = \$83\text{M}$$
> >
> > **Capital available:**
> >
> > $$\begin{align*}
> > &= \$340\text{M} + \$50\text{M} - \$83\text{M} \\
> > &= \$307\text{M}
> > \end{align*}$$
> >
> > **Now a $\$30$ million unrealised loss** on FVOCI bonds, recognised in OCI:
> >
> > $$\begin{align*}
> > \text{Accumulated OCI} &= \$35\text{M} - \$30\text{M} = \$5\text{M} \\[4pt]
> > \text{Capital available} &= \$277\text{M}
> > \end{align*}$$
> >
> > **A $10\%$ fall in capital available from a movement in interest rates**, on bonds the insurer intends to hold to maturity and will suffer no realised loss on. If the [[Base Solvency Buffer]] were $\$180$ million, the [[MCT]] ratio falls from $171\%$ to $154\%$ — close to the supervisory target — for a reason unrelated to underwriting.
> >
> > **The management response** is not to sell the bonds (which would realise the loss) but to recognise that the liabilities are also worth less at higher rates. If the insurer has elected the [[Other Comprehensive Income Option|OCI option]] on its liabilities, the offsetting liability gain also runs through OCI and the net effect is only the duration mismatch — which is the whole reason the option exists.
