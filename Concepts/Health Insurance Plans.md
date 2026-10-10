---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1d1a9f4ae09044bc4c7915b79fbec52625ac9432c29f05a0e5513ddd392872b9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Health Insurance Plans.md
---

**Health Insurance Plans** are the arrangements that pay for an individual's or a group's medical care in the United States, bought individually or through an employer, and they differ in two ways: how they restrict the choice of provider, and how much of each bill the member pays through cost sharing. The main types are traditional indemnity plans and the managed care plans, health maintenance organizations (HMOs), preferred provider organizations (PPOs) and point-of-service (POS) plans, with high-deductible plans paired with a tax-advantaged account as a further option. Public programs, [[Medicare]] and [[Medicaid]], cover the elderly, the disabled and people with low income.

> $$m(A) = \min\Big(K + \min(A, D) + c\,(A - D)_+,\ M\Big)$$

> $$\text{Annual cost} = 12\pi + m(A) - H$$

- **Symbols:** $A$ is the member's allowed charges for the year on services subject to the deductible, $D$ is the deductible, $c$ is the member's [[Coinsurance|coinsurance]] share above it, and $K$ is the total of fixed copayments, such as \$25 for each office visit, charged outside the deductible. $M$ is the out-of-pocket maximum, after which the plan pays in full. In the second block, $\pi$ is the member's monthly premium contribution and $H$ is any employer deposit to the member's health account.
- **Indemnity plans:** A traditional indemnity, or fee-for-service, plan lets the member see any provider and reimburses a percentage of reasonable and customary charges after a deductible. It offers the most choice and the least control over cost, and it is now rare.
- **HMOs:** An HMO provides care through a network of providers for a fixed prepayment and pays nothing outside the network except in an emergency. A primary care physician acts as gatekeeper and must refer the member to a specialist. Cost sharing is usually low, often a flat copayment.
- **PPOs:** A PPO contracts with a network of providers at negotiated rates, and members pay less in network but are still covered out of network at higher cost sharing, with no referral needed. An out-of-network provider can also bill the member the difference between its charge and the allowed amount, which is called balance billing.
- **POS plans:** A POS plan combines the two. Members choose a primary care physician and pay HMO-like cost sharing for care the physician manages, but can go out of network at PPO-like cost.
- **High-deductible plans and accounts:** A high-deductible health plan (HDHP) has a large deductible and lower premiums, and it can be paired with a health savings account (HSA), which the member owns, funds with pre-tax money and keeps on changing jobs. A health reimbursement arrangement (HRA) is funded and owned by the employer, and the unused balance does not follow the employee out of the job.
- **The Affordable Care Act:** The [[Affordable Care Act]] requires individual and small-group plans to cover ten categories of essential health benefits, among them hospitalization, emergency services, maternity and newborn care, mental health, prescription drugs and preventive care. It bars exclusions for pre-existing conditions and lifetime or annual dollar limits on those benefits, caps out-of-pocket costs, covers preventive care without cost sharing and lets children stay on a parent's plan to age 26.
- **Related pages:** The employer's side, with claim costs per member per month and reserves, is on [[Group Health Insurance]]. Disability income, long-term care and critical illness insurance are long-duration [[Health Insurance|health insurance]] in the life-exam sense.

> [!example]- Choosing Between a PPO and an HDHP {Example}
> An employer offers two plans. The PPO costs the employee \$300 a month, with a \$500 deductible, 20% coinsurance, a \$25 copay for each office visit and a \$3,000 out-of-pocket maximum. The HDHP costs \$100 a month, with a \$3,000 deductible, 20% coinsurance after it, a \$6,500 out-of-pocket maximum and a \$750 employer deposit to the employee's HSA. Office visits have an allowed charge of \$150, and copays count toward the out-of-pocket maximum. Find the employee's annual cost under each plan in (a) a light year with four office visits and \$400 of lab work, and (b) a heavy year with the same four visits and \$29,400 of other care.
>
> > [!answer]-
> > Under the PPO the visits cost four copays, and the other care goes through the deductible and coinsurance. Under the HDHP every allowed dollar, the \$600 of visits included, goes through the deductible.
> > $$
> > \begin{align*}
> > m_{\text{PPO}}^{(a)} &= 100 + 400 \\
> > &= 500 \\
> > m_{\text{HDHP}}^{(a)} &= 1{,}000 \\
> > m_{\text{PPO}}^{(b)} &= \min\big(100 + 500 + 0.2(28{,}900),\ 3{,}000\big) \\
> > &= 3{,}000 \\
> > m_{\text{HDHP}}^{(b)} &= \min\big(3{,}000 + 0.2(27{,}000),\ 6{,}500\big) \\
> > &= 6{,}500
> > \end{align*}
> > $$
> > Adding premiums of \$3,600 and \$1,200, and taking off the \$750 HSA deposit for the HDHP:
> > $$
> > \begin{align*}
> > \text{PPO}^{(a)} &= 3{,}600 + 500 \\
> > &= 4{,}100 \\
> > \text{HDHP}^{(a)} &= 1{,}200 + 1{,}000 - 750 \\
> > &= 1{,}450 \\
> > \text{PPO}^{(b)} &= 3{,}600 + 3{,}000 \\
> > &= 6{,}600 \\
> > \text{HDHP}^{(b)} &= 1{,}200 + 6{,}500 - 750 \\
> > &= 6{,}950
> > \end{align*}
> > $$
> > The HDHP saves \$2,650 in the light year and costs \$350 more in the heavy one. An employee who expects little care does better with the HDHP, and the PPO's higher premium buys protection against a bad year. When healthier employees choose the HDHP, the PPO's pool grows costlier, a form of [[Adverse Selection|adverse selection]].

> [!example]- Going Out of Network in a PPO {Example}
> A PPO member who has met the deductible needs an outpatient procedure. An in-network surgeon's allowed charge is \$1,200, and the member pays 20% coinsurance in network. An out-of-network surgeon charges \$2,000, the plan allows \$1,200, and the member pays 40% coinsurance out of network. What does the member pay for each?
>
> > [!answer]-
> > In network the member pays only the coinsurance on the allowed charge. Out of network the member pays the higher coinsurance and the balance bill.
> > $$
> > \begin{align*}
> > \text{In network} &= 0.20(1{,}200) \\
> > &= 240 \\
> > \text{Out of network} &= 0.40(1{,}200) + (2{,}000 - 1{,}200) \\
> > &= 1{,}280
> > \end{align*}
> > $$
> > The out-of-network choice costs \$1,040 more. Balance billing is often the larger part of the gap, and it usually does not count toward the out-of-pocket maximum. An HMO member would get nothing toward the out-of-network surgeon outside an emergency.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is to describe health insurance plans. Questions ask how indemnity, HMO, PPO and POS plans differ in provider choice, referrals and cost sharing, or what an HSA, an HRA or an HDHP is.
> - **Cost-sharing calculations:** A question gives a plan's deductible, coinsurance, copays and out-of-pocket maximum and a year's claims, and asks what the member pays or which of two plans costs less.
> - **Public programs:** A question can ask in outline who Medicare and Medicaid cover, or what the Affordable Care Act requires of a plan.

> [!warning]- Exam traps
> - **The out-of-pocket maximum caps cost sharing, not premium:** The member's total cost is the premium plus cost sharing up to the maximum. Comparing plans on the maximum alone ignores the premium difference, which decides the answer for most members.
> - **Copays and the deductible:** A PPO copay for an office visit usually applies without the deductible, while an HDHP that is paired with an HSA must apply the deductible to almost everything except preventive care. Running the visits through the PPO deductible overstates its cost.
> - **HSA versus HRA:** The employee owns an HSA and keeps it on leaving the job. The employer owns an HRA, so swapping them reverses the answer to who keeps the balance.
> - **Balance billing:** The allowed amount, not the provider's charge, is the base for out-of-network coinsurance. The member also owes the difference between the charge and the allowed amount, which coinsurance alone does not show.
