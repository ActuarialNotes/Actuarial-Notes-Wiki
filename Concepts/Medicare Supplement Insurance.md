---
aliases:
  - Medicare Supplement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7600407236e6b3e4c69b1ac77c621e77daacc31c410a9c1d84610a7d273fa2bc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Medicare Supplement Insurance.md
---
**Medicare Supplement Insurance** (Medigap) is private health insurance sold to people enrolled in Original [[Medicare]] that pays some or all of the cost sharing Medicare Parts A and B leave to the beneficiary, such as the hospital deductible, the Part B deductible and the 20% Part B coinsurance. The benefits come in a small set of standardized plans, so policies from different insurers can be compared on price. Rates are filed with the states and must meet minimum loss ratios, with a refund to policyholders when a block's experience falls below the standard.

> $$\text{LLR} = \frac{\sum_t v^t\,C_t}{\sum_t v^t\,P_t}$$

> $$\text{Ratio 3} = \frac{C}{P - R} + \tau$$

> $$\text{Refund} = (P - R) - \frac{(P - R) \times \text{Ratio 3}}{\text{Ratio 1}}$$

- **Symbols:** $\text{LLR}$ is the anticipated lifetime loss ratio, the present value of expected incurred claims $C_t$ over the present value of expected premiums $P_t$ for the life of the policy form. In the refund test, $P$ is earned premium since inception, $R$ the refunds already made, $C$ actual incurred claims, and $\tau$ a credibility tolerance that depends on the life years exposed. $\text{Ratio 1}$ is the benchmark ratio since inception from the NAIC worksheet, and $\text{Ratio 3}$ is the experienced ratio plus the tolerance.
- **Standardized plans:** Plans are identified by letters (A, B, C, D, F, G, K, L, M and N), and every insurer's Plan G, for example, has the same benefits. Plan A has the core benefits, and the others add the Part A deductible, skilled nursing facility coinsurance, the Part B deductible, Part B excess charges and foreign travel emergency care in different combinations. Plans K and L pay a share of the cost sharing up to an annual out-of-pocket limit, and Plan N has small copays for office and emergency room visits. People newly eligible for Medicare from 2020 can't buy Plans C and F, which cover the Part B deductible. A Medicare Select policy offers the same benefits through a hospital network at a lower premium.
- **Open enrollment and guaranteed issue:** For six months starting when a person is 65 or older and enrolled in Part B, an insurer must sell them any plan it offers without medical underwriting. After that window the insurer may underwrite, except in guaranteed issue situations such as losing employer retiree coverage or a Medicare Advantage plan leaving the area.
- **Rating methods:** Under issue-age rating, the premium depends on the age at purchase and rises only with medical trend. Under attained-age rating, it also rises as the insured ages, so it starts lower and ends higher. Under community rating, everyone in an area pays the same rate whatever their age. Some states require community rating, and the method chosen shapes how premiums move with the block's age over the policy's life.
- **Loss ratio standards:** Federal law and the NAIC model regulation require an expected lifetime loss ratio of at least 65% for individual policies and 75% for group policies. Each rate filing must show the standard is met, and each year the insurer files a refund calculation for each plan in each state.
- **Selection and lapse:** Underwriting at issue lowers claims in the first few policy years, so loss ratios start low and rise with duration. This is why the benchmark ratio grows with the age of the block, and why a block that keeps selling looks more profitable than its lifetime loss ratio. Healthy policyholders who can pass underwriting elsewhere lapse to a cheaper insurer, which leaves the remaining block less healthy and drives rate increases.

> [!example]- Testing a Block Against the Refund Requirement {Example}
> An insurer's individual Plan G block in one state has earned premium of \$12,000,000 since inception, no refunds so far, and incurred claims of \$6,600,000. It has 3,200 life years exposed since inception, which gives a tolerance of 7.5%, and the benchmark ratio from the worksheet is 63.5%. The annualized premium in force at December 31 is \$4,500,000. Is a refund required, and how much?
>
> > [!answer]-
> > The experienced ratio is $6{,}600{,}000 / 12{,}000{,}000 = 55.0\%$.
> > $$
> > \begin{align*}
> > \text{Ratio 3} &= 55.0\% + 7.5\% \\
> > &= 62.5\% \\
> > \text{Adjusted claims} &= 12{,}000{,}000 \times 0.625 \\
> > &= 7{,}500{,}000 \\
> > \text{Refund} &= 12{,}000{,}000 - \frac{7{,}500{,}000}{0.635} \\
> > &= 188{,}976.38
> > \end{align*}
> > $$
> > Ratio 3 is below the benchmark of 63.5%, so a refund is required. It is more than $0.005 \times 4{,}500{,}000 = 22{,}500$, so the insurer must refund or credit \$188,976.38 to policyholders. The refund is the premium in excess of what would have produced the benchmark ratio on the credibility-adjusted claims.

> [!example]- What Plan G and Plan N Pay for One Year {Example}
> A beneficiary has one hospital stay, with an illustrative Part A deductible of \$1,700, and Medicare-approved Part B services of \$5,000 with an illustrative Part B deductible of \$280. Twelve of the Part B services are office visits. Medicare pays 80% of Part B charges above the deductible. Find what Plan G pays and what Plan N pays, using Plan N's \$20 office visit copay.
>
> > [!answer]-
> > The Part B coinsurance left by Medicare is $0.20\,(5{,}000 - 280) = 944$ dollars.
> > $$
> > \begin{align*}
> > \text{Plan G} &= 1{,}700 + 944 \\
> > &= 2{,}644 \\
> > \text{Plan N} &= 1{,}700 + 944 - 12 \times 20 \\
> > &= 2{,}404
> > \end{align*}
> > $$
> > Neither plan pays the \$280 Part B deductible. Under Plan G the beneficiary pays \$280, and under Plan N \$520, plus any excess charges from doctors who don't accept Medicare's approved amount, which Plan G covers and Plan N doesn't. Plan N's lower premium buys the copays, which also discourage low-value visits.

> [!tip]- How it appears on the exam
> - **CP-321 objective 1:** Written questions ask candidates to describe Medicare supplement coverage, the organizations that sell it and why, and its moral hazard and financial and legal risks, such as the effect of underwriting wear-off and selective lapse.
> - **CP-321 objective 2:** The reading on pricing Medicare supplement benefits supports questions that give Medicare cost sharing and utilization and ask for a plan's claim cost, or that give a block's experience and ask whether it meets the loss ratio standard or needs a refund.
> - **Rating:** Questions also ask candidates to compare issue-age, attained-age and community rating, including how each spreads cost across ages and how each fares when healthy lives lapse.

> [!warning]- Exam traps
> - **Individual versus group standard:** The minimum is 65% for individual policies and 75% for group policies. Testing a group block against 65% passes a block that fails.
> - **Tolerance direction:** The credibility tolerance is added to the experienced ratio before it is compared with the benchmark, which makes a refund less likely for a small block. Subtracting it, or applying it to the benchmark, reverses the effect.
> - **Fewer than 500 life years:** A block with fewer than 500 life years since inception has no credibility, so no refund is calculated. A refund below 0.5% of annualized premium in force is not paid either.
> - **Plan F and Plan G:** Plan G is Plan F without the Part B deductible. A new enrollee's Plan G claim cost should exclude the deductible, and pricing it as Plan F overstates the cost.
