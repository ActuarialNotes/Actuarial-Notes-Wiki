---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7899fcb2ab1dc7bd3919aee14aa04e8c9a0bed5fccfcbd4a978b77441d451a44
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Investment Income Tax.md
---

**Investment Income Tax** (IIT) is the 15% tax that Part XII.3 of Canada's Income Tax Act levies on a life insurer's taxable Canadian life investment income, an estimate of the investment income that builds up for its policyholders inside life insurance policies. It is a proxy tax: the holder of an exempt policy is not taxed on that build-up as it accrues, so the insurer pays a flat tax on it instead, measured by applying a prescribed net interest rate to its policy reserves.

> $$\text{CLII} = r_{\text{net}} \times \frac{V_{t-1} + V_t}{2} - \text{PH} \pm \text{adj}$$

> $$\text{TCLII} = \max\left(0,\ \text{CLII} - \text{Losses carried forward}\right)$$

> $$\text{IIT} = 0.15 \times \text{TCLII}$$

- **Symbols:** CLII is Canadian life investment income for the year and TCLII the taxable amount after losses. $V_{t-1}$ and $V_t$ are the maximum tax reserves the Income Tax Regulations allow for the insurer's taxable life insurance policies at the end of the prior and current years. $r_{\text{net}}$ is the net interest rate, PH is the income the policyholders of those policies must report themselves, and adj is a smaller statutory adjustment for certain guarantees, often ignored in exam questions.
- **The net interest rate:** The Act derives $r_{\text{net}}$ from the 60-month average yield on Government of Canada long-term bonds, reduced and then scaled down by a set percentage. Because it follows a five-year average, the tax moves slowly with interest rates, and it is zero when long-term yields are very low.
- **Which policies count:** The base covers taxable life insurance policies, meaning life insurance policies in Canada other than annuity contracts, registered policies such as those held in a registered pension plan or a [[Registered Retirement Savings Plan|registered retirement savings plan]], certain older guaranteed policies and segregated fund policies. Annuities are excluded because their holders are taxed on accrual, and registered plans because the savings are meant to be sheltered.
- **Why it exists:** The holder of an exempt policy pays no tax on the investment income credited to the policy while it is held, and the death benefit is tax-free (see [[Policyholder Taxation|policyholder taxation]]). Meanwhile, the insurer deducts the growth in its reserves, which includes that income, so without IIT the income would escape tax entirely. A flat 15% charged to the insurer is a simple stand-in for the tax the policyholders would otherwise pay.
- **No double tax:** Non-exempt policyholders already report their accrued income each year, and the amounts they report are subtracted as PH. The insurer is taxed only on the build-up that no policyholder reports, which is mainly that of exempt policies.
- **Losses carry forward:** CLII can be negative, for example in a year when the net interest rate is zero but policyholders still report income. The loss is carried forward for up to 20 years and deducted from later positive amounts.
- **Who bears it:** IIT is a cost of the insurer, but it is priced into the products that generate it, so in effect the policyholders of exempt savings-heavy policies pay it through lower crediting rates or higher premiums. It is computed separately from the Part I corporate tax described under [[Life Insurance Company Taxation|life insurance company taxation]].

> [!example]- IIT for a Block of Exempt Policies {Example}
> A Canadian life insurer's maximum tax reserves for its taxable life insurance policies were \$800 million at the end of last year and \$860 million at the end of this year. Segregated funds, annuities and registered policies are already left out. The net interest rate for the year is an illustrative $2.4\%$, and the holders of its non-exempt policies reported \$1.5 million of accrued income. There are no losses carried forward, and the guarantee adjustment is nil. Find the IIT.
>
> > [!answer]-
> > The rate applies to the average of the opening and closing reserves, and the income the policyholders reported is subtracted.
> > $$
> > \begin{align*}
> > \bar{V} &= \frac{800 + 860}{2} \\
> > &= 830 \\
> > \text{CLII} &= 0.024(830) - 1.5 \\
> > &= 18.42 \\
> > \text{IIT} &= 0.15(18.42) \\
> > &= 2.763
> > \end{align*}
> > $$
> > The insurer owes about \$2.76 million of IIT. That is 0.33% of the average reserve, the tax cost of sheltering the policyholders' build-up, and it is the figure the product actuary reflects in the pricing of exempt savings policies.

> [!example]- A Year With No Net Interest {Example}
> In the next year, long-term yields have fallen, so the net interest rate is zero, and the non-exempt policyholders report \$1.6 million of accrued income. The year after, the net interest rate is $1.0\%$, the average reserve is \$900 million and policyholders report \$1.7 million. Find the IIT in each year.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{CLII}_2 &= 0 \times \bar{V}_2 - 1.6 \\
> > &= -1.6 \\
> > \text{CLII}_3 &= 0.010(900) - 1.7 \\
> > &= 7.3 \\
> > \text{TCLII}_3 &= 7.3 - 1.6 \\
> > &= 5.7 \\
> > \text{IIT}_3 &= 0.15(5.7) \\
> > &= 0.855
> > \end{align*}
> > $$
> > No IIT is due in year 2, and the \$1.6 million loss is carried forward. In year 3, the loss reduces the taxable amount to \$5.7 million and the IIT to \$855,000. The loss is not refunded as cash, so it is worth something only if the insurer has positive investment income within 20 years.

> [!tip]- How it appears on the exam
> - **ILA-201I:** Candidates calculate the investment income tax from given reserves, a net interest rate and the amounts policyholders report, as the objective on corporate and policyholder taxation states. Short answers ask why IIT exists, which policies are in its base, and how it interacts with the exempt policy test and accrual taxation.
> - **Pricing context:** Questions may ask how IIT affects the pricing or profitability of a universal life or whole life product, where it is one of the taxes in the profit projection.

> [!warning]- Exam traps
> - **Exempt policies are the target:** IIT taxes the build-up that policyholders don't report, which is mainly that of exempt policies. Non-exempt policyholders are taxed on accrual, and their reported income is subtracted from the base.
> - **Average reserve, not the increase:** The net interest rate applies to the average of the opening and closing reserves. Using the change in the reserve measures something else.
> - **Excluded business:** Annuities, registered plans and segregated funds are outside the base. Including their reserves overstates the tax.
> - **Losses are carried, not refunded:** A negative CLII produces no refund. It is carried forward and deducted from later years' positive amounts.
> - **A separate tax:** IIT is levied under Part XII.3 at 15% of its own base. It is not the Part I corporate income tax on the insurer's profit.
