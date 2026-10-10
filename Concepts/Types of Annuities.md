---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fa39d3cc31127925a910fc4854b101eefc5da2de2801cc7b117096a502e1aa43
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Types of Annuities.md
---

An **annuity** is a contract with an insurance company in which the buyer pays a single premium or a series of premiums and the insurer promises to make income payments at regular intervals, for a period the buyer chooses or for life. Annuities are classified along several independent lines: **fixed, indexed or variable** (how the value grows), **immediate or deferred** (when income starts), **single or flexible premium** (how it is paid for), the **payout option** chosen, and whether it is held in a **qualified** retirement plan. This page is the product view a buyer or producer uses; the pricing view is [[Life Annuity]].

> $$AV_t = \big(AV_{t-1} + P_t\big)\big(1 + \max(r_t,\ g)\big)$$

> $$SC_t = s_t\,\big(W - f\,AV_t\big)^+$$

- **Symbols:** For a fixed deferred annuity, $AV_t$ is the account value at the end of year $t$, $P_t$ the premium paid at the start of the year, $r_t$ the rate the insurer declares and $g$ the minimum guaranteed rate stated in the contract. $SC_t$ is the surrender (withdrawal) charge on a withdrawal $W$, $s_t$ is the charge percentage for year $t$, which usually falls each year until the surrender period ends, and $f$ is the share of the account value, often 10%, that may be withdrawn each year free of charge. The exact charge basis is set by the contract.
- **Fixed annuities:** The insurer credits interest at a rate it sets, usually fixed for a year or for an initial period, and guarantees that the rate will never fall below a stated minimum. The initial rate may be higher than later renewal rates. During payout, each fixed payment is set when payments start and does not change.
- **Fixed indexed annuities:** A type of fixed annuity whose interest is based on changes in a market index, such as the S&P 500, over an index term. Participation rates, caps and spreads mean the credit reflects only part of the index's rise, but the credit is never below zero, so the account does not fall when the index does unless money is withdrawn. The buyer does not invest in the index itself. See [[Indexed Annuity]].
- **Variable annuities:** Premiums go into subaccounts, investment portfolios the owner chooses, and the value changes with their performance, with no guaranteed return. Variable annuities carry mortality and expense risk charges and the subaccounts' fund fees, and they usually include a death benefit. Optional living benefit riders, at extra cost, can guarantee a minimum account value, income or withdrawals, such as a [[Guaranteed Minimum Income Benefit]] or [[Guaranteed Minimum Withdrawal Benefit]].
- **Immediate versus deferred:** An immediate annuity starts income no later than one year after the premium is paid and is usually bought with one payment. A deferred annuity has an **accumulation period**, during which the value grows tax-deferred, then a **payout period**. A deferred annuity's basic death benefit, if the owner dies before payout, is commonly the greater of the account value and the premiums paid or a minimum guaranteed value.
- **Single, flexible or scheduled premium:** A single premium annuity is bought with one payment. A flexible premium annuity lets the owner pay as much as they want, whenever they want, within set limits, and a scheduled premium annuity sets the payments and their frequency in the contract.
- **Payout options:** On annuitizing, the owner chooses how income is paid. *Life only* pays for the annuitant's lifetime and nothing after death, which gives the highest payment. *Life with period certain* pays for life but at least for a set period, usually 10 or 20 years, continuing to a beneficiary if the annuitant dies within it. *Joint and survivor* pays as long as either of two people lives, possibly reduced after the first death. Each guarantee added makes every payment smaller than under life only. Annuitizing is generally irrevocable, and a lump-sum withdrawal or systematic withdrawals keep control of the money but give up the guarantee of lifetime income.
- **Qualified versus nonqualified:** A nonqualified annuity is bought with after-tax dollars, has no annual contribution limit, and taxes only the earnings, as ordinary income, when withdrawn. A qualified annuity funds a tax-advantaged plan, such as an IRA or a 401(k), so contributions follow the plan's limits and the annuity adds no further tax advantage. In either case withdrawals before age 59 and a half may incur a 10% federal tax penalty.
- **Regulation and protection:** Every annuity is regulated by the state insurance department, and the salesperson must hold a state license. A variable annuity is also a security, so its seller must be registered with FINRA and the buyer receives a prospectus. Many states give a free look period, usually 10 to 30 days, to return the contract. Annuities are not guaranteed by the FDIC or any federal agency, so the guarantees depend on the insurer's financial strength, although state guarantees may apply if it fails.

> [!example]- A Withdrawal From a Fixed Deferred Annuity {Example}
> A 62-year-old buys a single premium fixed deferred annuity for \$100,000. The insurer credits an initial rate of 4% for three years, and the contract guarantees at least 2%. For year 4 the insurer declares a renewal rate of 1.5%. Surrender charges are 7%, 6%, 5% and 4% in years 1 to 4, applied to any amount withdrawn above 10% of the account value. At the end of year 4, after interest is credited, the owner withdraws \$30,000. What is the account value before the withdrawal, the surrender charge, and the amount the owner receives?
>
> > [!answer]-
> > The declared 1.5% is below the 2% minimum, so year 4 is credited at 2%.
> > $$
> > \begin{align*}
> > AV_4 &= 100{,}000\,(1.04)^3(1.02) \\
> > &= 114{,}736.13 \\
> > f\,AV_4 &= 0.10(114{,}736.13) \\
> > &= 11{,}473.61 \\
> > SC_4 &= 0.04\,(30{,}000 - 11{,}473.61) \\
> > &= 741.06
> > \end{align*}
> > $$
> > The owner receives \$29,258.94 and the account falls to \$84,736.13. The earnings withdrawn are taxable as ordinary income, but at 62 there is no 10% early-withdrawal penalty. Waiting until the surrender period ends, or withdrawing only the free 10%, would avoid the charge.

> [!example]- Matching Buyers to Annuities {Example}
> Recommend an annuity type for each buyer.
>
> 1. A 70-year-old widower with no dependents wants the largest income he cannot outlive, starting next month, from a \$200,000 lump sum.
> 2. A 45-year-old who has already contributed the maximum to her 401(k) wants more tax-deferred retirement saving, plans to add money irregularly, and accepts market losses in exchange for growth.
> 3. A 58-year-old wants no loss of principal from market falls but some share of market gains.
> 4. A retiring couple wants income that continues until the second of them dies.
>
> > [!answer]-
> > 1. **Single premium immediate annuity, life only.** Income starts within a year, and with no one to provide for, the life-only option pays the most.
> > 2. **Flexible premium variable deferred annuity, nonqualified.** Flexible premiums suit irregular deposits, the subaccounts give market growth with no guarantee, and outside the 401(k) there is no annual contribution limit. She should expect higher charges and a long surrender period.
> > 3. **Fixed indexed annuity.** Credits follow part of an index's rise, subject to caps or participation rates, and are never below zero.
> > 4. **Joint and survivor payout option.** Payments continue while either spouse lives, at a lower amount per payment than life only.

> [!example]- Life Only Versus Period Certain {Example}
> At annuitization an insurer quotes \$1,000 a month life only, or \$940 a month for life with 10 years certain. The annuitant dies 4 years after payments begin. What does each option pay in total?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Life only} &= 48 \times 1{,}000 \\
> > &= 48{,}000 \\
> > \text{To the annuitant} &= 48 \times 940 \\
> > &= 45{,}120 \\
> > \text{To the beneficiary} &= 72 \times 940 \\
> > &= 67{,}680
> > \end{align*}
> > $$
> > The period certain option pays \$112,800 in total, the full 120 payments, because death fell inside the 10-year period. Life only stops at death. Had the annuitant lived 25 years, life only would have paid \$18,000 more over that time, the price of the guarantee.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The Life and Health Insurance section asks candidates to evaluate types of annuities. Questions describe a buyer's age, need for income, tolerance for market risk and liquidity needs, and ask which annuity type or payout option fits.
> - **Feature questions:** A question names a feature, such as a minimum guaranteed rate, a cap, subaccounts, a surrender charge, a free look or a period certain, and asks which kind of annuity has it or what it does.
> - **Short calculations:** An applied question can credit interest to a fixed annuity at the greater of the declared and guaranteed rates, or apply a surrender charge to a withdrawal above the free amount.

> [!warning]- Exam traps
> - **Indexed is not variable:** A fixed indexed annuity's credit is never below zero, while a variable annuity's subaccounts can lose principal. Treating an index annuity as invested in the market overstates its downside.
> - **Guarantees cost income:** A period certain or a survivor benefit makes each payment smaller than life only. An answer that adds a guarantee and keeps the life-only payment is wrong.
> - **Tax-deferred, not tax-free:** Earnings are taxed as ordinary income when withdrawn, and a withdrawal before 59 and a half may also carry the 10% penalty. The surrender charge is separate and is set by the contract, not the tax law.
> - **No extra deferral inside a plan:** An annuity in an IRA or 401(k) gains no additional tax advantage from being an annuity. Recommending one for tax deferral that the plan already provides misses the point.
> - **Two regulators for variable annuities:** All annuities answer to the state insurance department, but a variable annuity is also a security, so its seller needs FINRA registration as well as a state license.
