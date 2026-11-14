---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:90311ad2eaee0860735a7d0cfcc775114db5c11361a40d52765e374b425d80b9
  sources:
    - "NAIC Buyer's Guide for Deferred Annuities (Revised 2013; TIAA reprint), PDF pp.6-12 (immediate vs deferred; accumulation/payout; basic death benefit; surrender charge with ~10% free; tax deferral; salesperson state licence, VA seller FINRA-registered; prospectus; fixed/fixed indexed/variable; participation, cap, spread; never less than zero; M&E and fund charges; annuitize; GMAB/GMIB/GLWB; ordinary income tax, 10% penalty before 59 1/2; IRA same tax advantages; free look usually 10-30 days; guarantees depend on insurer strength), sha256:a002e363b194ac63b19db864c1deb39c7151aa0e0a94d4a10889af5166d9d6f2 — https://www.tiaa.org/public/pdf/NAIC+Deferred+Annuity+Buyers+Guide.pdf"
    - "NAIC Buyer's Guide to Fixed Deferred Annuities as adopted at Okla. Admin. Code 365:25 App. S, pp.1-6 (single/flexible/scheduled premium; immediate = income within one year, usually one payment; minimum guaranteed rate; initial and renewal rates; surrender/withdrawal charges, free withdrawal; payout options life only (highest), life with period certain usually 10 or 20 years with beneficiary receiving the rest of the period, joint and survivor; death benefit commonly greater of contract value or premiums paid; return of premium not taxed; 10% penalty before 59 1/2; qualified plans; free look), sha256:deb3ce4ecc5f566237ca8aa695a5b491a05c088472ddae05553d6d22ee1f12df — https://www.oid.ok.gov/wp-content/uploads/2019/10/BUYERS-GUIDE.pdf"
    - "FINRA, 'Annuities' investor page, read 2026-10-10 (all annuities regulated by state insurance commissioners, VAs also SEC/FINRA; not FDIC/SIPC guaranteed, state guarantees may apply; annuitization generally irrevocable; systematic withdrawals forfeit the guarantee; nonqualified after-tax, no annual contribution limit; inside IRA/401(k) no additional tax advantage; gains ordinary income; 10% penalty before 59 1/2; free look 10-30 days; VA surrender periods 8+ years), sha256:21ee19bd03b04db9a90b3d772bb1e7205024101bc4e64f1b440b970f1846ae83 — https://www.finra.org/investors/investing/investment-products/annuities"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Types of Annuities.md
---

The **Types of Annuities** are the classes an annuity falls into, where an annuity is a contract with an insurance company in which the buyer pays a single premium or a series of premiums and the insurer promises to make income payments at regular intervals, for a period the buyer chooses or for life. This is the product view a buyer or producer uses. The pricing view is [[Life Annuity]].

Annuities are classified along five independent lines:

1. How the value grows: fixed, indexed or variable.
2. When income starts: immediate or deferred.
3. How it is paid for: single, flexible or scheduled premium.
4. How income is paid: the payout option chosen.
5. Whether it is held in a qualified retirement plan.

## Fixed annuities

The insurer credits interest at a rate it sets, usually fixed for a year or for an initial period, and guarantees that the rate will never fall below a stated minimum. The initial rate may be higher than later renewal rates. For a fixed deferred annuity, the account value at the end of year $t$ is

> $$AV_t = \big(AV_{t-1} + P_t\big)\big(1 + \max(r_t,\ g)\big)$$

- $P_t$ is the premium paid at the start of year $t$.
- $r_t$ is the rate the insurer declares for year $t$.
- $g$ is the minimum guaranteed rate stated in the contract.

During payout, each fixed payment is set when payments start and does not change.

## Surrender charges

A deferred annuity charges for withdrawals during its surrender period. The surrender (withdrawal) charge on a withdrawal $W$ in year $t$ is

> $$SC_t = s_t\,\big(W - f\,AV_t\big)^+$$

- $s_t$ is the charge percentage for year $t$, which usually falls each year until the surrender period ends.
- $f$ is the share of the account value, often 10%, that may be withdrawn each year free of charge.
- $(x)^+$ is $x$ when $x$ is positive and $0$ otherwise.

The exact charge basis is set by the contract.

> [!example]- What surrender charge does this owner pay, and what does she receive? {Example}
> A 62-year-old buys a single premium fixed deferred annuity for $\$100{,}000$. The insurer credits an initial rate of 4% for three years, and the contract guarantees at least 2%. For year 4 the insurer declares a renewal rate of 1.5%. Surrender charges are 7%, 6%, 5% and 4% in years 1 to 4, applied to any amount withdrawn above 10% of the account value. At the end of year 4, after interest is credited, the owner withdraws $\$30{,}000$.
>
> > [!answer]-
> > - The declared 1.5% is below the 2% minimum, so year 4 is credited at 2%.
> > - The account value is $AV_4 = 100{,}000\,(1.04)^3(1.02) = \$114{,}736.13$.
> > - The free amount is $0.10 \times 114{,}736.13 = \$11{,}473.61$.
> > - The charge is $SC_4 = 0.04 \times (30{,}000 - 11{,}473.61) = \$741.06$.
> > - The owner receives $30{,}000 - 741.06 = \$29{,}258.94$, and the account falls to $\$84{,}736.13$.
> > - The earnings withdrawn are taxable as ordinary income, but at 62 there is no 10% early-withdrawal penalty.

## Fixed indexed annuities

A fixed indexed annuity is a type of fixed annuity whose interest is based on changes in a market index, such as the S&P 500, over an index term. Participation rates, caps and spreads mean the credit reflects only part of the index's rise. The credit is never below zero, so the account does not fall when the index does unless money is withdrawn. The buyer does not invest in the index itself ([[Indexed Annuity]]).

## Variable annuities

Premiums go into subaccounts, investment portfolios the owner chooses, and the value changes with their performance, with no guaranteed return. Variable annuities carry mortality and expense risk charges and the subaccounts' fund fees, and they usually include a death benefit. Optional living benefit riders, at extra cost, can guarantee a minimum account value, income or withdrawals, such as a [[Guaranteed Minimum Income Benefit]] or [[Guaranteed Minimum Withdrawal Benefit]].

## Immediate and deferred annuities

An immediate annuity starts income no later than one year after the premium is paid and is usually bought with one payment. A deferred annuity has an accumulation period, during which the value grows tax-deferred, then a payout period. A deferred annuity's basic death benefit, if the owner dies before payout, is commonly the greater of the account value and the premiums paid or a minimum guaranteed value.

## Single, flexible and scheduled premium

A single premium annuity is bought with one payment. A flexible premium annuity lets the owner pay as much as they want, whenever they want, within set limits. A scheduled premium annuity sets the payments and their frequency in the contract.

## Payout options

On annuitizing, the owner chooses how income is paid:

- *Life only* pays for the annuitant's lifetime and nothing after death, which gives the highest payment.
- *Life with period certain* pays for life but at least for a set period, usually 10 or 20 years, continuing to a beneficiary if the annuitant dies within it.
- *Joint and survivor* pays as long as either of two people lives, possibly reduced after the first death.

Each guarantee added makes every payment smaller than under life only. Annuitizing is generally irrevocable. A lump-sum withdrawal or systematic withdrawals keep control of the money but give up the guarantee of lifetime income.

> [!example]- An insurer quotes $\$1{,}000$ a month life only, or $\$940$ for life with 10 years certain. If the annuitant dies after 4 years, what does each pay? {Example}
> - Life only pays $48 \times 1{,}000 = \$48{,}000$ and stops at death.
> - The period certain option pays the annuitant $48 \times 940 = \$45{,}120$.
> - Death fell inside the 10-year period, so the beneficiary receives the remaining $120 - 48 = 72$ payments, $72 \times 940 = \$67{,}680$.
> - The period certain option pays $\$112{,}800$ in total, the full 120 payments.
> - Had the annuitant lived 25 years, life only would have paid $300 \times 60 = \$18{,}000$ more, the price of the guarantee.

## Qualified and nonqualified annuities

A nonqualified annuity is bought with after-tax dollars, has no annual contribution limit, and taxes only the earnings, as ordinary income, when withdrawn. A qualified annuity funds a tax-advantaged plan, such as an IRA or a 401(k), so contributions follow the plan's limits and the annuity adds no further tax advantage. In either case withdrawals before age 59 and a half may incur a 10% federal tax penalty.

## Regulation and protection

Every annuity is regulated by the state insurance department, and the salesperson must hold a state license. A variable annuity is also a security, so its seller must be registered with FINRA and the buyer receives a prospectus. Many states give a free look period, usually 10 to 30 days, to return the contract. Annuities are not guaranteed by the FDIC or any federal agency, so the guarantees depend on the insurer's financial strength, although state guarantees may apply if it fails.

> [!trap] Treating an indexed annuity as a variable one
> A fixed indexed annuity's credit is never below zero, while a variable annuity's subaccounts can lose principal. Treating an indexed annuity as invested in the market overstates its downside.
