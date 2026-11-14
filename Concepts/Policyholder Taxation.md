---
aliases:
  - Canadian Tax Regulation
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ace77ba19435b4354bab8dbd29b444f02d8ba2bea9efca1d1bb5adc7263f4297
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policyholder Taxation.md
---

**Policyholder Taxation** is the set of income tax rules that decide how the owner of a [[Life Insurance|life insurance]] policy or an [[Annuity Contract|annuity]] is taxed on its investment growth, its withdrawals and loans, its surrender and its death benefit. In both the U.S. and Canada, a policy that meets a statutory test of being mainly insurance lets its savings grow free of current tax and pays its death benefit tax-free, while a policy that is mainly an investment loses part of that shelter.

## The U.S. definition of life insurance

Under IRC section 7702, a contract is life insurance for tax purposes only if it passes one of two tests. Under the cash value accumulation test (CVAT), the condition at every duration $t$ is

> $$\text{CSV}_t \leq \text{NSP}_t$$

- $\text{CSV}_t$ is the cash surrender value.
- $\text{NSP}_t$ is the net single premium for the future benefits.

The guideline premium test (GPT) caps the premiums paid at the larger of the guideline single premium and the sum of the guideline level premiums. It adds a cash value corridor: the death benefit must be at least a set percentage of the cash value, 250% up to age 40 and falling to 100% at age 95.

A contract that qualifies under 7702 is not taxed on the growth of its cash value while it is held, and its death benefit is excluded from the beneficiary's income. On surrender, the gain over the investment in the contract, broadly the premiums paid less amounts already received tax-free, is ordinary income.

## Modified endowment contracts

Section 7702A applies the 7-pay test. A contract is a modified endowment contract (MEC) if, at any time in its first seven years, the premiums paid exceed the premiums that would have paid it up after seven level annual premiums. The condition to stay outside MEC status in each year $t \le 7$ is

> $$\sum_{k=1}^{t} \text{Premium}_k \leq t \times \text{7-pay premium}$$

- $\text{Premium}_k$ is the premium paid in policy year $k$.

The test compares cumulative premiums with the cumulative limit in each of the first seven years, so one large premium can fail it even when the average is below the 7-pay premium. A material change, such as an increase in benefits, starts a new 7-pay test.

A MEC is still life insurance, so its death benefit stays tax-free. Withdrawals and policy loans from it are taxed gain first rather than basis first, and the taxable part carries an additional 10% tax if the owner is under age 59 1/2, unless an exception applies. A loan from a contract that is not a MEC is not taxed.

> [!example]- Is this policy a MEC, and how is the withdrawal taxed? {Example}
> A universal life policy has a 7-pay premium of $\$5{,}000$. The owner pays $\$4{,}000$ in year 1, $\$4{,}000$ in year 2 and $\$9{,}000$ in year 3. Early in year 4, aged 50, the owner withdraws $\$10{,}000$, when the cash value is $\$20{,}000$ and the investment in the contract is $\$17{,}000$.
>
> > [!answer]-
> > - Cumulative premiums are $4{,}000 \le 5{,}000$ in year 1 and $8{,}000 \le 10{,}000$ in year 2.
> > - In year 3 they are $17{,}000 > 15{,}000$, so the policy becomes a MEC in year 3.
> > - A MEC distribution is taxed gain first, and the gain in the contract is $20{,}000 - 17{,}000 = 3{,}000$.
> > - The taxable amount is $\min(10{,}000,\ 3{,}000) = \$3{,}000$, and the other $\$7{,}000$ is a tax-free return of basis.
> > - The owner is under 59 1/2, so the additional tax is $0.10(3{,}000) = \$300$.
> > - Had the owner paid no more than $\$6{,}000$ in year 3, the policy would not be a MEC, and the $\$10{,}000$ would be a tax-free recovery of basis under the basis-first rule.

## U.S. annuities

A non-qualified deferred annuity also grows tax-deferred, and its withdrawals are taxed gain first, with the same 10% additional tax before age 59 1/2. Once annuitized, each payment is split by the exclusion ratio into a tax-free return of premium and taxable income, until the whole investment has been recovered. The exclusion ratio is

> $$\text{Exclusion ratio} = \frac{\text{Investment in the contract}}{\text{Expected return}}$$

## Canada's exempt policy test

Under the Income Tax Act and its regulations, a policy is exempt if its accumulating fund stays within that of a benchmark exemption test policy at each anniversary. Since 2017 the benchmark has been an eight-pay endowment at age 90, replacing a 20-pay endowment at age 85. An exempt policy's growth is not taxed annually and its death benefit is tax-free, so "exempt" is the sheltered status.

A policy that is not exempt is taxed each year on the growth of its accumulating fund over its adjusted cost basis, so the owner pays tax on investment income as it accrues. Annuities are also taxed on accrual, except prescribed annuities, which spread the interest evenly over the payment period.

## Adjusted cost basis and policy gain

A surrender, a partial withdrawal or a policy loan above the adjusted cost basis (ACB) of a Canadian policy is a disposition. The policy gain on it is

> $$\text{Policy gain} = \text{Proceeds of disposition} - \text{ACB}$$

The ACB is broadly the premiums paid, less the net cost of pure insurance (NCPI) charged each year, less the amounts already paid out. The policy gain is fully included in income, not taxed as a capital gain.

> [!example]- What are the policy gain and the tax on surrendering this Canadian policy? {Example}
> A Canadian exempt universal life policy has received premiums of $\$30{,}000$. The NCPI charged over its life totals $\$6{,}000$, and there have been no withdrawals or loans. The owner surrenders it for $\$31{,}500$ and has a 45% marginal tax rate.
>
> > [!answer]-
> > - The ACB is $30{,}000 - 6{,}000 = \$24{,}000$.
> > - The policy gain is $31{,}500 - 24{,}000 = \$7{,}500$.
> > - The whole gain is income, so the tax is $0.45(7{,}500) = \$3{,}375$.
> > - The gain is larger than the $\$1{,}500$ by which the proceeds exceed the premiums, because the NCPI reduces the ACB.

Policies held inside registered plans, such as a [[Registered Retirement Savings Plan|registered retirement savings plan]], and U.S. qualified annuities follow the [[Tax Treatment of Retirement Plans|tax rules for retirement plans]] rather than these.

> [!trap] Taking the ACB as the premiums paid
> In Canada, the NCPI is deducted from the premiums in the ACB. Leaving it in understates the policy gain: $\$1{,}500$ in place of $\$7{,}500$ in the example.
