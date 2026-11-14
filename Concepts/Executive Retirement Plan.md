---
aliases:
  - Retirement Funding Alternative
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f7b307dcad4dac4d5ee60301c96d068d02fe8124cd731593d79373351910e35a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Executive Retirement Plan.md
---

An **Executive Retirement Plan** is a supplementary arrangement that pays a select group of senior employees the part of their pension that a tax-registered or tax-qualified [[Retirement Plan|retirement plan]] cannot, because the tax rules cap the benefit or the pay it may be based on. It goes by many names, including supplemental executive retirement plan (SERP), top-hat plan and excess benefit plan, and it is *nonqualified* in the United States and *unregistered* in Canada.

With accrual rate $\alpha$, $n$ years of service and final average earnings $\text{FAE}$, the pension the company's formula promises is

> $$B^{\text{total}} = \alpha\,n\,\text{FAE}$$

If the registered plan may pay at most $M$ per year of service, the part it pays is

> $$B^{\text{reg}} = n\,\min\left(\alpha\,\text{FAE},\ M\right)$$

and the executive plan pays the rest:

> $$B^{\text{SERP}} = B^{\text{total}} - B^{\text{reg}}$$

A registered or qualified plan earns its tax deferral within limits, so a career-pay formula applied to an executive's salary soon exceeds the cap. Without a top-up, the executive's replacement ratio would be far below the rest of the workforce's. Executive plans are also used to attract mid-career hires with extra service credits, to reward retention through stricter vesting, and to tie retirement pay to bonuses.

> [!example]- What are the total pension, the registered plan's part and the SERP benefit for this executive? {Example}
> An executive retires with 25 years of service and final average earnings of $\$400{,}000$. The company's pension formula is 2% of final average earnings per year of service, and the registered plan may pay at most an illustrative $\$3{,}800$ a year per year of service.
>
> > [!answer]-
> > - The formula gives $0.02 \times 400{,}000 = \$8{,}000$ per year of service, more than double the cap.
> > - The total pension is $0.02 \times 25 \times 400{,}000 = \$200{,}000$.
> > - The registered plan pays $25 \times \min(8{,}000,\ 3{,}800) = \$95{,}000$.
> > - The SERP pays $200{,}000 - 95{,}000 = \$105{,}000$, more than half of the pension.
> > - The cap binds for anyone whose final average earnings exceed $3{,}800 / 0.02 = \$190{,}000$, so the plan covers a small group.

## Funding alternatives

The sponsor's main design decision is the **funding alternative**, the choice between paying benefits as they fall due and setting money aside, and how securely. The alternatives are:

1. **Pay as you go (book reserve).** The employer promises the benefit and pays it from operating cash when due. The company keeps the money, gets its tax deduction only when benefits are paid, and books an accounting liability. The member is an unsecured creditor and loses the benefit if the employer fails or a new owner refuses to pay.
2. **Rabbi trust (U.S.).** A trust holds assets for the benefits but leaves them reachable by the employer's creditors in insolvency. The member is not taxed until paid, and the trust protects only against a change of heart or of control.
3. **Secular trust (U.S.).** The trust protects the assets from creditors as well, but the member is taxed when the benefit vests, before it is paid.
4. **Retirement compensation arrangement (Canada).** The employer's contributions are deductible when made, but 50% of every contribution and of the investment income is remitted as a refundable tax. The Canada Revenue Agency holds it without interest and refunds $\$1$ for every $\$2$ of benefits paid. The benefit is secured and the member is taxed only on receipt.
5. **Letter of credit.** An RCA can hold a bank's letter of credit that pays the benefits if the employer defaults, instead of assets. The employer pays the bank's annual fee, and the refundable tax applies only to the amounts paid into the RCA for that fee, so security is bought for a small fraction of the cost of funding.
6. **Other routes.** An individual pension plan (IPP) registers a DB plan for one owner-manager and can deduct more than an RRSP at older ages. Some employers fund through corporate-owned life insurance, or raise the registered plan's benefit to the tax maximum before topping up.

The RET-301 readings judge each alternative from three sides. For the sponsor the questions are the cash cost, the timing of the tax deduction, the accounting and the governance. For shareholders they are the use of capital and the effect on the balance sheet. For the member they are the security of the promise and the timing of personal tax.

## Tax drag in a retirement compensation arrangement

In an RCA, half of each contribution and of each year's income sits in the refundable tax account at no interest. A contribution $C$ made now, with the invested fund earning $i$, therefore grows to

> $$F_N + R_N = C\left(1 + \tfrac{i}{2}\right)^{N}$$

- $F_N$ is the invested fund after $N$ years.
- $R_N$ is the refundable tax account after $N$ years.

The refundable tax comes back as benefits are paid, so the cost of an RCA is the lost interest on that account, not the tax itself.

> [!example]- How does the after-tax cost of funding this benefit through an RCA compare with paying as you go? {Example}
> A SERP benefit is expected to have a value of $\$1{,}000{,}000$ when an executive retires in 10 years. The company could fund it now through an RCA invested at 6%, or pay it when due. Its corporate tax rate is an illustrative 27%, and money left in the company earns 6% before tax.
>
> > [!answer]-
> > - Paying as you go costs $1{,}000{,}000(1 - 0.27) = \$730{,}000$ after tax in 10 years.
> > - Discounted at the company's after-tax return of $0.06 \times 0.73 = 4.38\%$, that is $730{,}000 / 1.0438^{10} = \$475{,}499$ today.
> > - In the RCA the total grows at 3%, so the contribution needed is $1{,}000{,}000 / 1.03^{10} = \$744{,}094$.
> > - The contribution is deductible, so its after-tax cost is $744{,}094 \times 0.73 = \$543{,}189$.
> > - Funding through the RCA costs about $\$67{,}700$ more, or 14%, because the RCA's money is effectively taxed at 50% on its returns while the company's own money is taxed at 27%.
> > - At retirement the RCA holds $\$500{,}000$ of investments and $\$500{,}000$ of refundable tax. The extra cost buys the executive security, and a letter of credit buys similar security for less.

> [!trap] Rabbi trust versus secular trust
> A rabbi trust keeps the member's tax deferral but not protection from the employer's creditors. A secular trust gives the protection but triggers tax early. An answer that gives a rabbi trust both has the two confused.
