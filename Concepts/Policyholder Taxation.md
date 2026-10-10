---
aliases:
  - Canadian Tax Regulation
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e88384b81376dc5684cdf2bd5594581e2dad8dc3928c875bab2b384eac2dace7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policyholder Taxation.md
---
**Policyholder Taxation** is the set of income tax rules that decide how the owner of a [[Life Insurance|life insurance]] policy or an [[Annuity Contract|annuity]] is taxed on its investment growth, its withdrawals and loans, its surrender and its death benefit. In both the U.S. and Canada, a policy that meets a statutory test of being mainly insurance lets its savings grow free of current tax and pays its death benefit tax-free, while a policy that is mainly an investment loses part of that shelter.

> $$\text{CSV}_t \leq \text{NSP}_t \quad \text{(CVAT)}$$

> $$\sum_{k=1}^{t} \text{Premium}_k \leq t \times \text{7-pay premium}, \quad t \leq 7$$

> $$\text{Policy gain} = \text{Proceeds of disposition} - \text{ACB}$$

- **The U.S. definition of life insurance:** Under IRC section 7702, a contract is life insurance for tax purposes only if it passes one of two tests. The cash value accumulation test (CVAT) requires the cash surrender value never to exceed the net single premium for the future benefits. The guideline premium test (GPT) caps the premiums paid at the larger of the guideline single premium and the sum of the guideline level premiums, and it adds a cash value corridor: the death benefit must be at least a set percentage of the cash value, 250% up to age 40 and falling to 100% at age 95.
- **Inside build-up and the death benefit:** A contract that qualifies under 7702 is not taxed on the growth of its cash value while it is held, and its death benefit is excluded from the beneficiary's income. On surrender, the gain over the investment in the contract, broadly the premiums paid less amounts already received tax-free, is ordinary income.
- **Modified endowment contracts:** Section 7702A applies the 7-pay test. A contract is a modified endowment contract (MEC) if, at any time in its first seven years, the premiums paid exceed the premiums that would have paid it up after seven level annual premiums. A material change, such as an increase in benefits, starts a new 7-pay test.
- **What changes for a MEC:** A MEC is still life insurance, so the death benefit stays tax-free. Withdrawals and policy loans from it are taxed gain first rather than basis first, and the taxable part carries an additional 10% tax if the owner is under age 59 1/2, unless an exception applies.
- **U.S. annuities:** A non-qualified deferred annuity also grows tax-deferred, and its withdrawals are taxed gain first, with the same 10% additional tax before age 59 1/2. Once annuitized, each payment is split by the exclusion ratio, the investment in the contract divided by the expected return, into a tax-free return of premium and taxable income, until the whole investment has been recovered.
- **Canada's exempt policy test:** Under the Income Tax Act and its regulations, a policy is exempt if its accumulating fund stays within that of a benchmark exemption test policy at each anniversary. Since 2017 the benchmark has been an eight-pay endowment at age 90, replacing a 20-pay endowment at age 85. An exempt policy's growth is not taxed annually and its death benefit is tax-free.
- **Accrual taxation in Canada:** A policy that is not exempt is taxed each year on the growth of its accumulating fund over its adjusted cost basis, so the owner pays tax on investment income as it accrues. Annuities are also taxed on accrual, except prescribed annuities, which spread the interest evenly over the payment period.
- **Adjusted cost basis and dispositions:** The adjusted cost basis (ACB) of a Canadian policy is broadly the premiums paid, less the net cost of pure insurance (NCPI) charged each year, less the amounts already paid out. A surrender, a partial withdrawal or a policy loan above the ACB is a disposition, and the policy gain is fully included in income, not taxed as a capital gain.
- **Registered plans:** Policies held inside registered plans, such as a [[Registered Retirement Savings Plan|registered retirement savings plan]], follow the plan's rules rather than these, as do U.S. qualified annuities. See [[Tax Treatment of Retirement Plans|tax treatment of retirement plans]].

> [!example]- A Contract That Fails the 7-Pay Test {Example}
> A universal life policy has a 7-pay premium of \$5,000. The owner pays \$4,000 in year 1, \$4,000 in year 2 and \$9,000 in year 3. Early in year 4, aged 50, the owner withdraws \$10,000, when the cash value is \$20,000 and the investment in the contract is \$17,000. Is the policy a MEC, and how is the withdrawal taxed?
>
> > [!answer]-
> > Compare the cumulative premiums with the cumulative 7-pay limit.
> > $$
> > \begin{align*}
> > \text{Year 1:}\ 4{,}000 &\leq 5{,}000 \\
> > \text{Year 2:}\ 8{,}000 &\leq 10{,}000 \\
> > \text{Year 3:}\ 17{,}000 &> 15{,}000
> > \end{align*}
> > $$
> > The policy becomes a MEC in year 3. A MEC distribution is taxed gain first, and the gain in the contract is $20{,}000 - 17{,}000 = 3{,}000$.
> > $$
> > \begin{align*}
> > \text{Taxable} &= \min(10{,}000,\ 3{,}000) \\
> > &= 3{,}000 \\
> > \text{Additional tax} &= 0.10(3{,}000) \\
> > &= 300
> > \end{align*}
> > $$
> > The other \$7,000 is a tax-free return of basis. Had the owner paid no more than \$6,000 in year 3, the policy would not be a MEC, and the \$10,000 would be a tax-free recovery of basis under the basis-first rule.

> [!example]- A Canadian Policy Gain on Surrender {Example}
> A Canadian exempt universal life policy has received premiums of \$30,000. The NCPI charged over its life totals \$6,000, and there have been no withdrawals or loans. The owner surrenders it for \$31,500. Find the policy gain and the tax at a 45% marginal rate.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{ACB} &= 30{,}000 - 6{,}000 \\
> > &= 24{,}000 \\
> > \text{Policy gain} &= 31{,}500 - 24{,}000 \\
> > &= 7{,}500 \\
> > \text{Tax} &= 0.45(7{,}500) \\
> > &= 3{,}375
> > \end{align*}
> > $$
> > The gain is larger than the \$1,500 by which the proceeds exceed the premiums, because the NCPI reduces the ACB. The cost of the insurance protection is not a deductible cost of the investment. The whole gain is income, since a policy gain is not a capital gain.

> [!tip]- How it appears on the exam
> - **ILA-101:** Candidates describe and apply the U.S. and Canadian rules for individual life and annuity products. Typical questions run the 7-pay test, classify a distribution from a MEC or a non-MEC, apply the annuity exclusion ratio, or compute a Canadian ACB and policy gain.
> - **ILA-201I:** Policyholder taxation sits beside corporate taxation and the [[Investment Income Tax|investment income tax]], so questions ask how the exempt and non-exempt status of a policy decides who pays tax on its investment income.
> - **Design questions:** Short answers ask how a product is designed to stay within 7702, 7702A or the exempt test, for example by limiting premiums or raising the death benefit.

> [!warning]- Exam traps
> - **MEC status does not tax the death benefit:** A MEC is still life insurance, so its death benefit stays tax-free. Only the order and tax on lifetime distributions change.
> - **Cumulative test:** The 7-pay test compares cumulative premiums with the cumulative limit in each of the first seven years. A large premium in one year can fail it even when the annual average is below the 7-pay premium.
> - **Loans are distributions only for a MEC:** A loan from a non-MEC is not taxed, but a loan from a MEC is taxed as a distribution, gain first.
> - **NCPI reduces the ACB:** In Canada, the ACB is not the premiums paid. Forgetting to deduct the NCPI understates the policy gain.
> - **Exempt is the sheltered status:** An exempt policy escapes annual accrual taxation, and a non-exempt policy is taxed each year. Reading "exempt" as "outside the tax shelter" reverses the rules.
