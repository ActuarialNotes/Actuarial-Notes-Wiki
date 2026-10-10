---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7ab96caff916014696504c66082568650d5e9ab1199868c5f9b07daf0593c071
  sources:
    - "AF Group / Accident Fund, Premium Audit Process (web page, read 2026-10-10): estimate vs actual exposures and classifications, online/mail/phone/virtual/physical audits, audit noncompliance charge varies by state, sha256:bb3f82a60aebdb65467e3bf0144b0406cce6742e2713a6ea2c3df00b3f096259 — https://accidentfund.com/ph/premium-audit-process"
    - "Fla. Admin. Code R. 69O-189.003(4)(b) and (f) (via Cornell LII), voluntary-market minimum audit requirements, records examined, classification audits, sha256:a361d22c0e135409ed917b6df625d654dda03db24afd8fbd17602e93d6fff80f — https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-69O-189-003"
    - "IRMI glossary, 'premium audit', sha256:4d303e9e2670eb03ca6e5050b336726d99d40c4294ec4a273a9a9f79a6b79909 — https://www.irmi.com/term/insurance-definitions/premium-audit"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Audit.md
---

**Premium Audit** is the post-expiration verification of a policy's actual exposure, used on commercial lines whose [[Exposure Base|exposure base]] cannot be known in advance — workers compensation (payroll), general liability (sales or receipts), commercial auto (mileage or units).

> $$\text{Audited Premium} = \text{Rate} \times \text{Actual Exposure}$$

> $$\text{Audit Adjustment} = \text{Audited Premium} - \text{Deposit Premium}$$

- The insured pays a **deposit premium** at inception based on estimated exposures. After expiry, the auditor examines payroll records, tax filings and sales ledgers, and the difference is billed as **additional premium** or refunded as **return premium**.
- **Why insurers audit:** The premium charged at inception is an estimate, and the exposures and classifications behind it change during the policy. The audit compares the actual exposures and classifications with the estimate to fix the final premium, which can go down as well as up, and it checks that each employee's duties are assigned to the right classification. Without it, an insured that under-estimates its exposure pays too little, and one that over-estimates pays too much.
- **How audits are done:** An audit may be physical, at the insured's premises with an auditor, or virtual, by telephone, by mail or online. The records reviewed include payroll records, federal reports of employee income, state reemployment tax forms, cash disbursement journals and other accounting records, certificates of insurance for subcontractors, and independent contractor documents. Which method a policy gets is often set by rule. Florida's workers compensation rule, for example, requires a physical audit every year for a voluntary market policy with an estimated annual premium of \$10,000 or more, allows a mail or physical audit below that, and requires a physical audit for new business with construction classifications. An insured that does not cooperate with an audit can face an audit noncompliance charge, which varies by state.
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

> [!tip]- How it appears on the exam
> - **DISC-RM:** The risk control and premium auditing section asks why insurers audit premiums, how an audit is carried out (the method, the records examined, the classification check), and what audits contribute to underwriting, ratemaking and the insured's fair treatment.
> - **Ratemaking (Exam 5):** Audits explain why policy-year premium develops, and why an unaudited year's premium needs development before it is used.

> [!warning]- Exam traps
> - **Audits can return premium:** An audit finds the actual exposure, so an insured whose payroll or sales fell gets a return premium. Treating the audit as a device only for collecting more is wrong.
> - **Classification matters as much as exposure:** Payroll assigned to a cheaper class code understates the premium even when the total payroll is right. The audit checks both.
