---
aliases:
  - Retirement Funding Alternative
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6093630699b147d0596a4db8e83bab91b3dd1fdc4af5114968d2024c6fb06b9d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Executive Retirement Plan.md
---
An **Executive Retirement Plan** is a supplementary arrangement that pays a select group of senior employees the part of their pension that a tax-registered or tax-qualified [[Retirement Plan|retirement plan]] cannot, because the tax rules cap the benefit or the pay it may be based on. It goes by many names, including supplemental executive retirement plan (SERP), top-hat plan and excess benefit plan, and it is *nonqualified* in the United States and *unregistered* in Canada. The sponsor's main design decision is the **funding alternative**: whether to pay benefits as they fall due or to set money aside, and how securely.

> $$B^{\text{total}} = \alpha\,n\,\text{FAE}$$

> $$B^{\text{reg}} = n\,\min\left(\alpha\,\text{FAE},\ M\right)$$

> $$B^{\text{SERP}} = B^{\text{total}} - B^{\text{reg}}$$

> $$F_N + R_N = C\left(1 + \tfrac{i}{2}\right)^{N}$$

- **Symbols:** $\alpha$ is the accrual rate, $n$ the years of service, FAE the final average earnings and $M$ the maximum pension per year of service that the registered plan may pay. In a Canadian retirement compensation arrangement (RCA), $C$ is a contribution made now, $F_N$ is the invested fund and $R_N$ the refundable tax account after $N$ years, and $i$ is the return on the invested fund.
- **Why the plans exist:** A registered or qualified plan earns its tax deferral within limits, so a career-pay formula applied to an executive's salary soon exceeds the cap. Without a top-up, the executive's replacement ratio would be far below the rest of the workforce's. Executive plans are also used to attract mid-career hires with extra service credits, to reward retention through stricter vesting, and to tie retirement pay to bonuses.
- **Pay as you go (book reserve):** The employer simply promises the benefit and pays it from operating cash when due. The company keeps the money, gets its tax deduction only when benefits are paid, and books an accounting liability. The member is an unsecured creditor and loses the benefit if the employer fails or a new owner refuses to pay.
- **Rabbi and secular trusts (U.S.):** A rabbi trust holds assets for the benefits but leaves them reachable by the employer's creditors in insolvency, so the member is not taxed until paid and the trust protects only against a change of heart or of control. A secular trust protects the assets from creditors as well, but then the member is taxed when the benefit vests, before it is paid.
- **Retirement compensation arrangement (Canada):** The employer's contributions are deductible when made, but 50% of every contribution and of the investment income is remitted as a refundable tax, held by the Canada Revenue Agency without interest and refunded at \$1 for every \$2 of benefits paid. The benefit is secured and the member is taxed only on receipt, but the fund grows at about half the investment return, the tax drag the last formula shows.
- **Letter of credit:** Instead of assets, an RCA can hold a bank's letter of credit that pays the benefits if the employer defaults. The employer pays the bank's annual fee, and the refundable tax applies only to the amounts paid into the RCA for that fee, so security is bought for a small fraction of the cost of funding.
- **Other routes:** An individual pension plan (IPP) registers a DB plan for one owner-manager and can deduct more than an RRSP at older ages. Some employers fund through corporate-owned life insurance, or raise the registered plan's benefit to the tax maximum before topping up.
- **Evaluating the options:** The RET-301 readings judge each alternative from three sides. For the sponsor the questions are the cash cost, the timing of the tax deduction, the accounting and the governance. For shareholders they are the use of capital and the effect on the balance sheet. For the member they are the security of the promise and the timing of personal tax.

> [!example]- Sizing a SERP Above the Registered Maximum {Example}
> An executive retires with 25 years of service and final average earnings of \$400,000. The company's pension formula is 2% of final average earnings per year of service, and the registered plan may pay at most an illustrative \$3,800 a year per year of service. Find the total pension, the part the registered plan pays and the SERP benefit.
>
> > [!answer]-
> > The formula gives \$8,000 per year of service, more than double the cap.
> > $$
> > \begin{align*}
> > B^{\text{total}} &= 0.02 \times 25 \times 400{,}000 \\
> > &= 200{,}000 \\
> > B^{\text{reg}} &= 25 \times \min(8{,}000,\ 3{,}800) \\
> > &= 95{,}000 \\
> > B^{\text{SERP}} &= 200{,}000 - 95{,}000 \\
> > &= 105{,}000
> > \end{align*}
> > $$
> > More than half of the pension depends on the SERP. The cap binds for anyone whose final average earnings exceed $3{,}800 / 0.02 = 190{,}000$, so the plan covers a small group, which is why its security becomes a negotiating point for the executives in it.

> [!example]- The Cost of Funding an RCA Versus Paying as You Go {Example}
> A SERP benefit is expected to have a value of \$1,000,000 when an executive retires in 10 years. The company could fund it now through an RCA invested at 6%, or pay it when due. Its corporate tax rate is an illustrative 27%, and money left in the company earns 6% before tax. Compare the present value of the after-tax cost of the two approaches.
>
> > [!answer]-
> > Paying as you go costs $1{,}000{,}000(1 - 0.27) = 730{,}000$ after tax in 10 years, discounted at the company's after-tax return $0.06 \times 0.73 = 4.38\%$. In the RCA, half of every dollar sits in the refundable tax account at no interest, so the total grows at 3%.
> > $$
> > \begin{align*}
> > PV^{\text{PAYG}} &= \frac{730{,}000}{1.0438^{10}} \\
> > &= 475{,}499 \\
> > C &= \frac{1{,}000{,}000}{1.03^{10}} \\
> > &= 744{,}094 \\
> > PV^{\text{RCA}} &= 744{,}094 \times 0.73 \\
> > &= 543{,}189
> > \end{align*}
> > $$
> > Funding through the RCA costs about \$67,700 more, or 14%, because the RCA's money is effectively taxed at 50% on its returns while the company's own money is taxed at 27%. At retirement the RCA holds \$500,000 of investments and \$500,000 of refundable tax, which comes back as benefits are paid. The extra cost buys the executive security, and a letter of credit buys similar security for less.

> [!tip]- How it appears on the exam
> - **RET-101 (1a, 1b, 2d):** Candidates describe the structure and purpose of executive retirement arrangements, from Allen et al. ch. 14, and the risks they leave with the executive, chiefly the employer's insolvency.
> - **RET-301 (4a):** Candidates evaluate the funding alternatives (pay as you go, an RCA, a letter of credit, an IPP and insurance) for the sponsor, the shareholders and the participants. The readings are the Morneau Shepell handbook ch. 13, the Willis Towers Watson text ch. 23 and the RCA tax planning article.
> - **Calculations:** Short calculations split a pension between the registered plan and the SERP, or compare the after-tax cost of funding an RCA with paying as you go.

> [!warning]- Exam traps
> - **The refundable tax is not a cost forever:** The 50% remitted to the RCA's refundable tax account comes back as benefits are paid. The cost of an RCA is the lost interest on that account, not the tax itself.
> - **Security versus tax deferral:** A rabbi trust keeps the member's tax deferral but not protection from the employer's creditors, and a secular trust gives the protection but triggers tax early. An answer that gives a rabbi trust both has the two confused.
> - **Per year of service:** The registered maximum applies to the pension per year of service, so the SERP benefit is the formula pension minus $n$ times the capped accrual, not minus a single cap.
> - **Shareholders are a separate stakeholder:** Funding an executive plan ties up capital that could earn more in the business, and the security it buys benefits the executives. A RET-301 evaluation is expected to say who gains and who pays under each alternative.
