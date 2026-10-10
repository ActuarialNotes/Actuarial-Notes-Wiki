---
aliases:
  - ACA Product
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:04f77beafc1f1f6cc5a32131124e37458603c763b5198091191a783dc7a71fbf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Affordable Care Act.md
---
**The Affordable Care Act** (ACA), the Patient Protection and Affordable Care Act of 2010, is the U.S. federal law that reshaped the individual and small group health insurance markets from 2014. It requires insurers to accept every applicant and limits how premiums may vary, standardizes benefits and their value into metal tiers, sets up exchanges where subsidized coverage is bought, and moves money between insurers through risk adjustment so that none gains by enrolling healthier members. It also expanded [[Medicaid]] and set minimum medical loss ratios for all fully insured business. An ACA product is a plan sold under these rules.

> $$P_{i} = P_{\text{base}} \times f_{\text{age}} \times f_{\text{area}} \times f_{\text{tob}}$$

> $$\text{MLR} = \frac{\text{Claims} + \text{QI}}{\text{Premium} - \text{Taxes}}$$

> $$\text{Rebate} = \max\left(0,\ \text{MLR}_{\min} - \text{MLR}\right) \times \left(\text{Premium} - \text{Taxes}\right)$$

> $$T_i = \left(\frac{\pi_i}{\sum_j s_j \pi_j} - \frac{\alpha_i}{\sum_j s_j \alpha_j}\right)\bar{P}_s$$

- **Symbols:** $P_i$ is the premium for a person in plan $i$, built from the plan's base rate and factors for age, rating area and tobacco use. In the medical loss ratio, Claims are incurred claims, QI is spending on activities that improve health care quality, and Taxes are federal and state taxes and licensing and regulatory fees. In the risk transfer, $\pi_i$ is plan $i$'s plan liability risk score times its induced demand and geographic cost factors, $\alpha_i$ is its actuarial value times its allowable rating factor and the same two factors, $s_j$ is plan $j$'s share of statewide enrollment, and $\bar{P}_s$ is the statewide average premium. $T_i$ is the transfer per member per month, received when positive and paid when negative.
- **Market rules:** Insurers in the individual and small group markets must offer coverage to every applicant (guaranteed issue), renew it, and cover preexisting conditions. Under modified community rating, premiums may vary only by age, within a 3:1 ratio for adults, by tobacco use, within 1.5:1, by rating area and by family size. Each insurer pools all its enrollees in a market into a single risk pool, from which every plan's rate is derived.
- **Benefits and metal tiers:** Plans must cover the essential health benefits, ten categories that include hospital care, prescription drugs, maternity and mental health, with no annual or lifetime dollar limits. Plans are graded by **actuarial value**, the share of a standard population's covered costs the plan pays: bronze 60%, silver 70%, gold 80% and platinum 90%, each within a narrow band, calculated with the federal AV calculator.
- **Exchanges and subsidies:** Individuals buy coverage on the exchanges, or marketplaces, and those with qualifying incomes receive a premium tax credit. The credit is the premium of the second-lowest-cost silver plan in the area less a required contribution set as a share of income, so it absorbs premium increases for subsidized members. Cost-sharing reductions raise the actuarial value of silver plans for low-income enrollees, and when the federal government stopped funding them in late 2017, insurers loaded the cost into silver premiums, which raised the benchmark and with it every credit.
- **Rate filing:** Insurers file rates each year with an actuarial memorandum and the Unified Rate Review Template. The filing develops a market-wide index rate from the single risk pool's experience, projected with [[Trend|trend]] and adjusted for the expected risk adjustment transfer, then allows plan-level adjustments only for actuarial value and cost sharing, network, benefits beyond the essential ones, administrative cost and catastrophic plan eligibility. Large increases are reviewed for reasonableness.
- **Medical loss ratio:** Insurers must spend at least 80% of premium, net of taxes and fees, on claims and quality improvement in the individual and small group markets, and 85% in the large group market. The ratio is measured over three years, with an adjustment for small, less credible blocks, and a shortfall is refunded to policyholders as a rebate.
- **Premium stabilization:** Guaranteed issue invites [[Adverse Selection|adverse selection]], so the law created three programs: permanent risk adjustment, and transitional reinsurance and temporary risk corridors for 2014 to 2016. HHS risk adjustment transfers money from plans with healthier-than-average enrollees to plans with sicker ones within each state market, using the concurrent HHS-HCC model, and the transfers sum to zero. The individual mandate penalty that also guarded against adverse selection was reduced to zero from 2019.

> [!example]- A Medical Loss Ratio Rebate {Example}
> Over the three-year measurement period, an insurer's individual market block earns \$100 million of premium, pays \$5 million of taxes and fees, incurs \$72 million of claims and spends \$1.5 million on quality improvement. The block is fully credible. Find its MLR and the rebate it owes.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{MLR} &= \frac{72 + 1.5}{100 - 5} \\
> > &= 77.37\% \\
> > \text{Rebate} &= (0.80 - 0.7737) \times 95 \\
> > &= 2.5
> > \end{align*}
> > $$
> > The insurer owes \$2.5 million in rebates, which is exactly what brings claims and quality improvement up to 80% of the \$95 million of premium net of taxes. Equivalently, $0.80 \times 95 - 73.5 = 2.5$.

> [!example]- A Simplified HHS Risk Transfer {Example}
> A state's individual market has two insurers, both selling only silver plans with an actuarial value of 0.70, and the statewide average premium is \$500 PMPM. Insurer A has 40% of the enrollment, an average plan liability risk score of 1.40 and an average allowable rating factor (the age factor) of 1.25. Insurer B has 60% of the enrollment, a risk score of 0.95 and a rating factor of 1.05. The induced demand and geographic cost factors are all 1. Find each insurer's transfer.
>
> > [!answer]-
> > The denominators are the enrollment-weighted averages, $0.4(1.40) + 0.6(0.95) = 1.13$ for risk and $0.70\,[0.4(1.25) + 0.6(1.05)] = 0.791$ for the rating side.
> > $$
> > \begin{align*}
> > T_A &= \left(\frac{1.40}{1.13} - \frac{0.70(1.25)}{0.791}\right) \times 500 \\
> > &= (1.2389 - 1.1062) \times 500 \\
> > &= 66.37 \\
> > T_B &= \left(\frac{0.95}{1.13} - \frac{0.70(1.05)}{0.791}\right) \times 500 \\
> > &= (0.8407 - 0.9292) \times 500 \\
> > &= -44.25
> > \end{align*}
> > $$
> > Insurer A receives \$66.37 PMPM and Insurer B pays \$44.25 PMPM, and $0.4(66.37) - 0.6(44.25) = 0$, so the transfers balance. A's members are older, which the 1.25 rating factor already lets it charge for, so A is paid only for the part of its higher risk that its premiums cannot reflect.

> [!tip]- How it appears on the exam
> - **GH-201U:** Candidates describe the ACA's market rules, exchanges, subsidies and premium stabilization programs, and evaluate their effect on pricing and rate filing, such as how the single risk pool, rating restrictions and the expected risk adjustment transfer shape the index rate. A calculation may ask for an MLR rebate or a rate under the allowed rating factors.
> - **GH-301:** The risk adjustment section applies the HHS transfer formula to ACA products, asks how the HHS-HCC model works and how it has changed, and asks why the formula subtracts the allowable rating and actuarial value terms.

> [!warning]- Exam traps
> - **The MLR denominator:** Taxes and licensing and regulatory fees are subtracted from premium, and quality improvement spending is added to claims. Using gross premium understates the MLR and the rebate.
> - **Rating factors already charged:** The transfer subtracts the plan's allowable rating and actuarial value term, because premiums already vary with age and metal level. Paying a plan its full risk score relative to the average pays twice for its older members.
> - **Zero sum:** Transfers within a state market sum to zero when weighted by enrollment. A set of transfers that are all positive, or that don't balance, has a mistake in a denominator.
> - **Ratios and limits:** The 3:1 age ratio compares the oldest adult rate with the youngest adult rate. It does not cap a single person's premium at three times the base rate, and tobacco and area factors apply on top of it.
> - **Subsidies move with the benchmark:** The premium tax credit tracks the second-lowest-cost silver premium, so a rate increase for that plan is borne mostly by the government for subsidized members, but in full by members who receive no credit.
