---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:014a1cd631392f22ce9b09c51ea88965dcb4a4e9c57b3e9898aabb8fc0c15d46
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Investment Income Tax.md
---

**Investment Income Tax** (IIT) is the 15% tax that Part XII.3 of Canada's Income Tax Act levies on a life insurer's taxable Canadian life investment income, an estimate of the investment income that builds up for its policyholders inside life insurance policies. It is a proxy tax. The holder of an exempt policy is not taxed on that build-up as it accrues, so the insurer pays a flat tax on it instead, measured by applying a prescribed net interest rate to its policy reserves.

The Canadian life investment income for the year, CLII, is

> $$\text{CLII} = r_{\text{net}} \times \frac{V_{t-1} + V_t}{2} - \text{PH} \pm \text{adj}$$

- $r_{\text{net}}$ is the net interest rate.
- $V_{t-1}$ and $V_t$ are the maximum tax reserves the Income Tax Regulations allow for the insurer's taxable life insurance policies at the end of the prior and current years.
- $\text{PH}$ is the income the policyholders of those policies must report themselves.
- $\text{adj}$ is a smaller statutory adjustment for certain guarantees, often ignored in exam questions.

The losses of earlier years are deducted from it, so the taxable Canadian life investment income, TCLII, is

> $$\text{TCLII} = \max\left(0,\ \text{CLII} - \text{Losses carried forward}\right)$$

and the tax is

> $$\text{IIT} = 0.15 \times \text{TCLII}$$

> [!example]- What is this insurer's investment income tax for the year? {Example}
> A Canadian life insurer's maximum tax reserves for its taxable life insurance policies were \$800 million at the end of last year and \$860 million at the end of this year. Segregated funds, annuities and registered policies are already left out. The net interest rate for the year is an illustrative $2.4\%$, and the holders of its non-exempt policies reported \$1.5 million of accrued income. There are no losses carried forward, and the guarantee adjustment is nil.
>
> > [!answer]-
> > - The rate applies to the average of the opening and closing reserves, $(800 + 860)/2 = \$830$ million.
> > - The income the policyholders reported is subtracted, so $\text{CLII} = 0.024(830) - 1.5 = \$18.42$ million.
> > - With no losses carried forward, $\text{TCLII} = \$18.42$ million.
> > - The insurer owes $\text{IIT} = 0.15(18.42) = \$2.763$ million, about 0.33% of the average reserve. The product actuary reflects this cost in the pricing of exempt savings policies.

## The net interest rate

The Act derives $r_{\text{net}}$ from the 60-month average yield on Government of Canada long-term bonds, reduced and then scaled down by a set percentage. Because it follows a five-year average, the tax moves slowly with interest rates, and it is zero when long-term yields are very low.

## Policies in the base

The base covers taxable life insurance policies: life insurance policies in Canada other than annuity contracts, registered policies such as those held in a registered pension plan or a [[Registered Retirement Savings Plan|registered retirement savings plan]], certain older guaranteed policies and segregated fund policies. Annuities are excluded because their holders are taxed on accrual. Registered plans are excluded because the savings are meant to be sheltered. Including the reserves of excluded business overstates the tax.

## Why the tax exists

The holder of an exempt policy pays no tax on the investment income credited to the policy while it is held, and the death benefit is tax-free under [[Policyholder Taxation|policyholder taxation]]. The insurer deducts the growth in its reserves, which includes that income, so without IIT the income would escape tax entirely. A flat 15% charged to the insurer is a simple stand-in for the tax the policyholders would otherwise pay.

Non-exempt policyholders already report their accrued income each year, and the amounts they report are subtracted as $\text{PH}$. The insurer is therefore taxed only on the build-up that no policyholder reports, which is mainly that of exempt policies.

## Losses carried forward

CLII can be negative, for example in a year when the net interest rate is zero but policyholders still report income. A negative CLII produces no refund. The loss is carried forward for up to 20 years and deducted from later positive amounts.

> [!example]- What is the IIT in each of these two years? {Example}
> In the insurer's next year, long-term yields have fallen, so the net interest rate is zero, and the non-exempt policyholders report \$1.6 million of accrued income. In the year after, the net interest rate is $1.0\%$, the average reserve is \$900 million and policyholders report \$1.7 million.
>
> > [!answer]-
> > - In the first year, $\text{CLII} = 0 - 1.6 = -\$1.6$ million, so no IIT is due and the loss is carried forward.
> > - In the second year, $\text{CLII} = 0.010(900) - 1.7 = \$7.3$ million.
> > - The loss carried forward reduces the taxable amount to $\text{TCLII} = 7.3 - 1.6 = \$5.7$ million.
> > - The IIT is $0.15(5.7) = \$0.855$ million, or \$855,000. The loss is not refunded as cash, so it is worth something only if the insurer has positive investment income within 20 years.

## Who bears the tax

IIT is a cost of the insurer, but it is priced into the products that generate it. In effect the policyholders of exempt savings-heavy policies pay it through lower crediting rates or higher premiums, and it is one of the taxes in the profit projection of a universal life or whole life product. It is levied under Part XII.3 on its own base, separately from the Part I corporate tax on the insurer's profit described under [[Life Insurance Company Taxation|life insurance company taxation]].

> [!trap] Applying the rate to the increase in the reserve
> The net interest rate applies to the average of the opening and closing reserves, not to their change. In the first example, $0.024 \times 60$ less the \$1.5 million reported would give a CLII of $-\$0.06$ million instead of \$18.42 million.
