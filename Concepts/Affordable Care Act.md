---
aliases:
  - ACA Product
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fe9a40182cce11a2e2cdd6fb81e33d9e539f48f7407eeed56df2ff764f531fa4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Affordable Care Act.md
---
The **Affordable Care Act** (ACA), the Patient Protection and Affordable Care Act of 2010, is the U.S. federal law that reshaped the individual and small group health insurance markets from 2014. An ACA product is a plan sold under its rules.

The law works through six sets of provisions:

1. Market rules on who must be accepted and how premiums may vary.
2. Essential health benefits and metal tiers that standardize coverage and its value.
3. Exchanges, where coverage is bought with premium subsidies.
4. A rate filing that develops every plan's rate from one risk pool.
5. A minimum medical loss ratio for all fully insured business.
6. Premium stabilization programs, including risk adjustment.

It also expanded [[Medicaid]].

## Market rules

Insurers in the individual and small group markets must offer coverage to every applicant (guaranteed issue), renew it, and cover preexisting conditions. Under modified community rating, a person's premium in plan $i$ is

> $$P_{i} = P_{\text{base}} \times f_{\text{age}} \times f_{\text{area}} \times f_{\text{tob}}$$

- $P_{\text{base}}$ is the plan's base rate.
- $f_{\text{age}}$, $f_{\text{area}}$ and $f_{\text{tob}}$ are the factors for age, rating area and tobacco use.

Premiums may vary only by age, within a 3:1 ratio for adults, by tobacco use, within 1.5:1, by rating area and by family size. The 3:1 ratio compares the oldest adult rate with the youngest adult rate. It does not cap a single person's premium at three times the base rate, and the tobacco and area factors apply on top of it. Each insurer pools all its enrollees in a market into a single risk pool, from which every plan's rate is derived.

## Essential health benefits and metal tiers

Plans must cover the essential health benefits, ten categories that include hospital care, prescription drugs, maternity and mental health, with no annual or lifetime dollar limits. Plans are graded by **actuarial value**, the share of a standard population's covered costs the plan pays. The tiers are bronze 60%, silver 70%, gold 80% and platinum 90%, each within a narrow band, calculated with the federal AV calculator.

## Exchanges and subsidies

Individuals buy coverage on the exchanges, or marketplaces, and those with qualifying incomes receive a premium tax credit. The credit is the premium of the second-lowest-cost silver plan in the area less a required contribution set as a share of income. A rate increase for that benchmark plan is therefore borne mostly by the government for subsidized members, but in full by members who receive no credit.

Cost-sharing reductions raise the actuarial value of silver plans for low-income enrollees. When the federal government stopped funding them in late 2017, insurers loaded the cost into silver premiums, which raised the benchmark and with it every credit.

## Rate filing

Insurers file rates each year with an actuarial memorandum and the Unified Rate Review Template. The filing develops a market-wide index rate from the single risk pool's experience, projected with [[Trend|trend]] and adjusted for the expected risk adjustment transfer. Plan-level adjustments are then allowed only for actuarial value and cost sharing, network, benefits beyond the essential ones, administrative cost and catastrophic plan eligibility. Large increases are reviewed for reasonableness.

## Medical loss ratio

Insurers must spend at least 80% of premium, net of taxes and fees, on claims and quality improvement in the individual and small group markets, and 85% in the large group market. The medical loss ratio is

> $$\text{MLR} = \frac{\text{Claims} + \text{QI}}{\text{Premium} - \text{Taxes}}$$

- $\text{Claims}$ are incurred claims.
- $\text{QI}$ is spending on activities that improve health care quality.
- $\text{Taxes}$ are federal and state taxes and licensing and regulatory fees.

The ratio is measured over three years, with an adjustment for small, less credible blocks. A shortfall is refunded to policyholders, and the rebate is

> $$\text{Rebate} = \max\left(0,\ \text{MLR}_{\min} - \text{MLR}\right) \times \left(\text{Premium} - \text{Taxes}\right)$$

- $\text{MLR}_{\min}$ is the market's minimum, 80% or 85%.

> [!example]- What is this block's MLR, and what rebate does it owe? {Example}
> Over the three-year measurement period, an insurer's fully credible individual market block earns $\$100$ million of premium, pays $\$5$ million of taxes and fees, incurs $\$72$ million of claims and spends $\$1.5$ million on quality improvement.
>
> > [!answer]-
> > - Premium net of taxes and fees is $100 - 5 = \$95$ million.
> > - Claims and quality improvement are $72 + 1.5 = \$73.5$ million.
> > - The MLR is $73.5/95 = 77.37\%$, below the individual market's 80%.
> > - The rebate is $(0.80 - 0.7737) \times 95 = \$2.5$ million.
> > - Equivalently, $0.80 \times 95 - 73.5 = 2.5$, the amount that brings claims and quality improvement up to 80% of net premium.

## Premium stabilization programs

Guaranteed issue invites [[Adverse Selection|adverse selection]], so the law created three programs: permanent risk adjustment, and transitional reinsurance and temporary risk corridors for 2014 to 2016. The individual mandate penalty that also guarded against adverse selection was reduced to zero from 2019.

HHS risk adjustment transfers money from plans with healthier-than-average enrollees to plans with sicker ones within each state market, using the concurrent HHS-HCC model. The transfer to plan $i$ per member per month is

> $$T_i = \left(\frac{\pi_i}{\sum_j s_j \pi_j} - \frac{\alpha_i}{\sum_j s_j \alpha_j}\right)\bar{P}_s$$

- $\pi_i$ is plan $i$'s plan liability risk score times its induced demand and geographic cost factors.
- $\alpha_i$ is plan $i$'s actuarial value times its allowable rating factor and the same two factors.
- $s_j$ is plan $j$'s share of statewide enrollment.
- $\bar{P}_s$ is the statewide average premium.
- A positive $T_i$ is received and a negative one is paid.

The formula subtracts the allowable rating and actuarial value term because premiums already vary with age and metal level. Paying a plan its full risk score relative to the average would pay twice for its older members. Weighted by enrollment, the transfers within a state market sum to zero, so a set of transfers that are all positive, or that don't balance, has a mistake in a denominator.

> [!example]- What is each insurer's risk adjustment transfer? {Example}
> A state's individual market has two insurers, both selling only silver plans with an actuarial value of 0.70. The statewide average premium is $\$500$ PMPM, and the induced demand and geographic cost factors are all 1.
>
> | Insurer | Enrollment share | Risk score | Allowable rating factor |
> | :--- | ---: | ---: | ---: |
> | A | 40% | 1.40 | 1.25 |
> | B | 60% | 0.95 | 1.05 |
>
> > [!answer]-
> > - The risk denominator is $0.4(1.40) + 0.6(0.95) = 1.13$.
> > - The rating denominator is $0.70\,[0.4(1.25) + 0.6(1.05)] = 0.791$.
> > - For A, $T_A = (1.40/1.13 - 0.875/0.791) \times 500 = (1.2389 - 1.1062) \times 500 = 66.37$.
> > - For B, $T_B = (0.95/1.13 - 0.735/0.791) \times 500 = (0.8407 - 0.9292) \times 500 = -44.25$.
> > - The transfers balance, since $0.4(66.37) - 0.6(44.25) = 0$.
> > - Insurer A receives $\$66.37$ PMPM and Insurer B pays $\$44.25$ PMPM. A's members are older, which its 1.25 rating factor already lets it charge for, so A is paid only for the part of its higher risk that its premiums cannot reflect.

> [!trap] Using gross premium in the MLR
> Taxes and licensing and regulatory fees are subtracted from premium, and quality improvement spending is added to claims. Dividing by gross premium, or leaving quality improvement out of the numerator, understates the MLR and overstates the rebate.
