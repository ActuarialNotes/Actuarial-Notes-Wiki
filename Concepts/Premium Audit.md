---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e6edb2cc55c04e201765cd79d0d67fbf05ec63d70bee1e56d716cfc7166d9531
  sources: []
  open_findings: 0
  log: .verify/Concepts/Premium Audit.md
---

**Premium Audit** is the post-expiration verification of a policy's actual exposure, used on commercial lines whose [[Exposure Base|exposure base]] cannot be known in advance — workers compensation (payroll), general liability (sales or receipts), commercial auto (mileage or units).

> $$\text{Audited Premium} = \text{Rate} \times \text{Actual Exposure}$$

> $$\text{Audit Adjustment} = \text{Audited Premium} - \text{Deposit Premium}$$

- The insured pays a **deposit premium** at inception based on estimated exposures. After expiry, the auditor examines payroll records, tax filings and sales ledgers, and the difference is billed as **additional premium** or refunded as **return premium**.
- Audits break the tidy relationship between transaction date and cohort. An audit on a policy written in $2023$ books premium in $2025$, so **[[Policy Year]] premium keeps changing** for two or three years and [[Calendar Year|calendar year]] premium contains audit adjustments belonging to prior years.
- For ratemaking this means the experience period's premium is not final. Werner's remedy is an **audit-to-date development** on premium — the same logic as loss development, applied to the premium triangle — or restricting the experience period to years whose audits are essentially complete.
- Audits are the reason auditable lines carry [[Exposure Trend|exposure trend]]: a growing insured generates more payroll and pays more premium at the same rate, with no filing required. That automatic response is a feature, and it is why workers compensation rates respond to wage inflation without action.
- Audit results are also a **data quality** control. Systematic under-reporting of payroll, misclassification into cheaper class codes, and unaudited policies all show up as premium that never arrives, and each distorts both the rate indication and the classification relativities built on the reported exposures.

![[Media/Figures/Premium_Audit.svg|340]]

> [!example]- Workers Compensation Audit Adjustment {Example}
> A workers compensation policy is written with estimated payroll of $\$2{,}000{,}000$ at a rate of $\$3.50$ per $\$100$ of payroll. At audit, actual payroll for the term was $\$2{,}400{,}000$.
>
> Compute the deposit premium, audited premium and adjustment.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Deposit} &= \frac{\$2{,}000{,}000}{100} \times \$3.50 \\
> > &= \$70{,}000 \\[6pt]
> > \text{Audited} &= \frac{\$2{,}400{,}000}{100} \times \$3.50 \\
> > &= \$84{,}000 \\[6pt]
> > \text{Additional premium} &= \$84{,}000 - \$70{,}000 \\
> > &= \$14{,}000
> > \end{align*}$$
> >
> > The exposures used in the ratemaking database must be updated to $\$2{,}400{,}000$ as well. Booking the extra premium while leaving the exposure at its estimate would overstate the average premium per exposure and corrupt the [[Premium Trend|premium trend]] analysis.

> [!example]- Developing Premium to Ultimate {Example}
> A general liability book shows the following policy-year written premium at successive valuations ($000s):
>
> | PY | 12 mo | 24 mo | 36 mo |
> |---|---|---|---|
> | $2021$ | $9{,}500$ | $10{,}070$ | $10{,}171$ |
> | $2022$ | $10{,}200$ | $10{,}812$ | |
> | $2023$ | $11{,}000$ | | |
>
> Estimate ultimate PY 2023 premium.
>
> > [!answer]-
> > Age-to-age premium development factors:
> >
> > $$\begin{align*}
> > \text{PY 2021: } 12\text{–}24 &= \frac{10{,}070}{9{,}500} = 1.060 \\[4pt]
> > \text{PY 2022: } 12\text{–}24 &= \frac{10{,}812}{10{,}200} = 1.060 \\[4pt]
> > \text{PY 2021: } 24\text{–}36 &= \frac{10{,}171}{10{,}070} = 1.010
> > \end{align*}$$
> >
> > $$\text{CDF}_{12 \to \text{ult}} = 1.060 \times 1.010 = 1.071$$
> >
> > $$\text{Ultimate PY 2023} = \$11{,}000{,}000 \times 1.071 = \$11{,}781{,}000$$
> >
> > Using the unaudited $\$11{,}000{,}000$ as the denominator of a PY 2023 loss ratio would overstate it by about $7\%$ relative — while the losses in the numerator are developed to ultimate and the premium is not. Consistency of maturity between numerator and denominator is the point: develop both, or neither.
