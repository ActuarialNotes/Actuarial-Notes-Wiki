---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:036e7f77de661657e59054163bdc11543782c91f55376f42d388357fb2f53371
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Income Tax.md
---

**Insurance Income Tax** for a U.S. property/casualty insurer is the federal corporate income tax — $21\%$ since the Tax Cuts and Jobs Act of 2017 (TCJA) — on taxable income computed under IRC §832. The computation starts from the underwriting and investment exhibit of the statutory [[NAIC Annual Statement]] and then departs from it in three places: unearned premium, loss reserves, and tax-exempt investment income.

> $$\begin{aligned} \text{Taxable UW income} = {} & \text{WP} - 0.8\,\Delta\text{UPR} \\ & - (\text{Paid} + \Delta\text{Discounted reserves}) \\ & - \text{Expenses incurred} \end{aligned}$$

> $$\text{Proration add-back} = 25\% \times (\text{Exempt interest} + \text{DRD})$$

- **Revenue offset.** Tax premiums earned add $80\%$ of the prior year-end UPR and deduct $80\%$ of the current one, so $20\%$ of any **increase** in unearned premium is taxed now — a proxy for the acquisition costs statutory accounting has already expensed against premium not yet earned. A growing insurer pays tax sooner; a shrinking one gets it back.
- **Discounted reserves.** Losses incurred use unpaid losses *and* LAE discounted under §846 at IRS-prescribed rates and payment patterns ([[Loss Reserve Discounting]]), not the undiscounted statutory reserves. The deduction for a reserve increase is smaller now and larger later.
- **Proration.** Tax-exempt municipal interest and the dividends-received deduction (DRD) are sheltered, but losses incurred are reduced by $25\%$ of them. The TCJA replaced the former $15\%$ with $5.25\%$ divided by the top corporate rate, which at $21\%$ is $25\%$. The exemption is therefore only partial for an insurer.
- **Other features.** P&C insurers kept their two-year carryback and twenty-year carryforward of net operating losses after the TCJA; very large groups may also be subject to the $15\%$ corporate alternative minimum tax on adjusted financial statement income, enacted in 2022; reinsurance has its own rules ([[Tax Treatment of Reinsurance]]).
- **Book-tax differences.** The revenue offset and reserve discounting are **timing** differences that create deferred tax assets under SAP (subject to admissibility limits) and GAAP; exempt interest and proration are **permanent**. So the effective rate on book income is not $21\%$, and the actuary's reserve estimate directly changes the tax paid.

> [!example]- Computing a P&C Insurer's Taxable Income {Example}
> Statutory data for the year: written premium $\$1{,}000$; UPR rose from $\$400$ to $\$480$; paid losses and LAE $\$550$; undiscounted unpaid losses and LAE rose from $\$1{,}200$ to $\$1{,}300$, which discount under §846 to $\$1{,}080$ and $\$1{,}165$; underwriting expenses incurred $\$280$; taxable bond interest $\$60$; tax-exempt municipal interest $\$40$.
>
> Compute statutory pre-tax income, taxable income and the tax.
>
> > [!answer]-
> > **Statutory:**
> >
> > $$
> > \begin{align*}
> > \text{EP} &= 1{,}000 - 80 \\
> > &= 920 \\
> > \text{Losses incurred} &= 550 + 100 \\
> > &= 650 \\
> > \text{Pre-tax income} &= 920 - 650 - 280 + 60 + 40 \\
> > &= 90
> > \end{align*}
> > $$
> >
> > **Tax basis:**
> >
> > $$
> > \begin{align*}
> > \text{EP} &= 1{,}000 - 0.8(80) \\
> > &= 936 \\
> > \text{Losses incurred} &= 550 + (1{,}165 - 1{,}080) - 0.25(40) \\
> > &= 625 \\
> > \text{Taxable income} &= 936 - 625 - 280 + 60 \\
> > &= 91 \\
> > \text{Tax} &= 0.21 \times 91 \\
> > &= 19.11
> > \end{align*}
> > $$
> >
> > Reconciling to book: $90 - 40 + 10 + 16 + 15 = 91$ — exempt interest out, proration back in, the $\$16$ revenue offset and the $\$15$ of reserve discount added. The tax is $21.2\%$ of statutory income even though $40\%$ of investment income was tax-exempt: the exemption saved $\$8.40$, proration clawed back $\$2.10$, and $\$6.51$ was prepaid on timing differences that will reverse, carried as a deferred tax asset.
