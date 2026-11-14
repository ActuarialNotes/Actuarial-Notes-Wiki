---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e1e30c9cab63cd09a4437dee1f46f5c17adde70e23eb3e65e7746be25cedbb4a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Income Tax.md
---

**Insurance Income Tax** for a U.S. property/casualty insurer is the federal corporate income tax on taxable income computed under IRC §832, at $21\%$ since the Tax Cuts and Jobs Act of 2017 (TCJA). The computation starts from the underwriting and investment exhibit of the statutory [[NAIC Annual Statement]] and departs from it in three places: unearned premium, loss reserves and tax-exempt investment income.

The taxable underwriting income is

> $$\text{Taxable UW income} = \text{WP} - 0.8\,\Delta\text{UPR} - \text{Paid} - \Delta\text{DR} - \text{Expenses}$$

- $\text{WP}$ is written premium.
- $\Delta\text{UPR}$ is the increase in the unearned premium reserve over the year.
- $\text{Paid}$ is paid losses and LAE.
- $\Delta\text{DR}$ is the increase in unpaid losses and LAE discounted under §846.
- $\text{Expenses}$ is underwriting expenses incurred.

## Revenue offset

Tax premiums earned add $80\%$ of the prior year-end UPR and deduct $80\%$ of the current one. So $20\%$ of any increase in unearned premium is taxed now, as a proxy for the acquisition costs statutory accounting has already expensed against premium not yet earned. A growing insurer pays tax sooner, and a shrinking one gets it back.

## Discounted reserves

Losses incurred use unpaid losses and LAE discounted under §846 at IRS-prescribed rates and payment patterns ([[Loss Reserve Discounting]]), not the undiscounted statutory reserves. The deduction for a reserve increase is smaller now and larger later.

## Proration

Tax-exempt municipal interest and the dividends-received deduction (DRD) are sheltered, but losses incurred are reduced by a share of them. The amount added back is

> $$\text{Proration add-back} = 25\% \times (\text{Exempt interest} + \text{DRD})$$

The TCJA replaced the former $15\%$ with $5.25\%$ divided by the top corporate rate, which at $21\%$ is $25\%$. The exemption is therefore only partial for an insurer.

> [!example]- What are this insurer's statutory pre-tax income, taxable income and tax? {Example}
> Statutory data for the year:
>
> | Item | Amount ($) |
> | :--- | ---: |
> | Written premium | $1{,}000$ |
> | UPR, start → end | $400 \to 480$ |
> | Paid losses and LAE | $550$ |
> | Undiscounted unpaid losses and LAE, start → end | $1{,}200 \to 1{,}300$ |
> | The same discounted under §846, start → end | $1{,}080 \to 1{,}165$ |
> | Underwriting expenses incurred | $280$ |
> | Taxable bond interest | $60$ |
> | Tax-exempt municipal interest | $40$ |
>
> > [!answer]-
> > - Statutory earned premium is $1{,}000 - 80 = 920$, and statutory losses incurred are $550 + 100 = 650$.
> > - Statutory pre-tax income is $920 - 650 - 280 + 60 + 40 = 90$.
> > - Tax earned premium is $1{,}000 - 0.8 \times 80 = 936$.
> > - Tax losses incurred are $550 + (1{,}165 - 1{,}080) - 0.25 \times 40 = 625$.
> > - Taxable income is $936 - 625 - 280 + 60 = 91$, and the tax is $0.21 \times 91 = 19.11$.
> > - Reconciling to book, $90 - 40 + 10 + 16 + 15 = 91$: exempt interest out, proration back in, the $\$16$ revenue offset and the $\$15$ of reserve discount added.
> > - The tax is $21.2\%$ of statutory income although $40\%$ of investment income was tax-exempt. The exemption saved $\$8.40$, proration clawed back $\$2.10$, and $\$6.51$ was prepaid on timing differences that will reverse, carried as a deferred tax asset.

## Book-tax differences

The revenue offset and reserve discounting are timing differences. They create deferred tax assets under statutory accounting (subject to admissibility limits) and under GAAP. Exempt interest and proration are permanent differences. So the effective rate on book income is not $21\%$, and the actuary's reserve estimate directly changes the tax paid.

P&C insurers kept their two-year carryback and twenty-year carryforward of net operating losses after the TCJA. Very large groups may also be subject to the $15\%$ corporate alternative minimum tax on adjusted financial statement income, enacted in 2022. Reinsurance has its own rules ([[Tax Treatment of Reinsurance]]).

> [!trap] The exemption is only partial
> Tax-exempt interest is not fully tax-free to a P&C insurer. Proration reduces losses incurred by $25\%$ of it, so $\$40$ of exempt interest saves $0.21 \times 30 = \$6.30$, not $\$8.40$.
