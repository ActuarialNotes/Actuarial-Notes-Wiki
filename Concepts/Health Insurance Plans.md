---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:904fd33e5a3483529e17f83d0196f794b6477425192bb2914927fdb9f820e897
  sources:
    - "HealthCare.gov glossary and plan-types pages read 2026-10-10: HMO (network only except emergency) sha256:b313815d55482ded08e11d96acdd4df6f15b56f3ff5ca996415c655925014614; PPO (out of network at additional cost) sha256:8b435c4582532e9bcae3c79554698cb0c33032ae8b63b6f2714769a72545e930; plan types (POS requires referral; PPO no referral) sha256:a68d938036a29a2c8f71aef767b7fe8edf3cacd7c85c9e4f8c7f842e2490ad1c; referral (many HMOs) sha256:e4c0b77236ad6721b8dd12a3a967a0ec7461b4fff483a326385dd073afc47c46; HDHP sha256:cd25eb8c46c9294f49251bfc7237b746529c849ab23c73d1a1654a778998041b; HSA (pre-tax) sha256:5e2d83d92d6fffb041a699934902a82efc674483f6dfb9adf7e63784ef3f7172; HRA (employer funds and owns) sha256:fe94ad2932c79df69d3f96765ccedd2cf3c0d1e74bacededdc713d74a16d7007; balance billing sha256:7a9a2151209c64cd7a86b4545fb0abbc2531500f288049bf35a03838b725c003; essential health benefits (10 categories) sha256:41171699188eb33cfa9ee6c6998296f29ab1d33a84882f08f97b46b01fba4ae7; out-of-pocket maximum (excludes premiums, out-of-network care, charges above allowed amount) sha256:83127bb8ccbb163d6bf7194f227574a529d603e4a6a0c10ad72859efb831a18d; Medicare sha256:dafcb2670d59d7aa46041f50c955f87e1aad129cd5c39af08e1fd4d540b23ca6; Medicaid sha256:ad1be61df8b59e2456cdcd25f3a04cd3f6146c1fb0c06b5d85962ed8153ad934 — https://www.healthcare.gov/glossary/ and https://www.healthcare.gov/choose-a-plan/plan-types/"
    - "Delaware Department of Insurance, Consumer Health Insurance Guide (2024), 'Understanding Types of Plans' p.5 (indemnity: deductible then a percentage of expenses, often 80%, most flexibility; PPO; HMO with PCP and referrals, out-of-network usually not covered; POS hybrid with PCP, out-of-network at more cost), sha256:4f3d035eba6f9c2b4e6ef6c5765d2c5fc839e28588ae489270221e8df42afb11 — https://insurance.delaware.gov/wp-content/uploads/sites/15/2024/06/Consumer-Health-Insurance-Guide.pdf"
    - "IRS Publication 969 (HSA 'portable', stays with you if you change employers; HRA employer contributions only; HDHP preventive care without deductible), read 2026-10-10, sha256:e7f2142ee40e71690cbc6df147ada169d2f7723a71857af76f27a860b8c4ca0e — https://www.irs.gov/publications/p969"
    - "42 U.S.C. §§300gg-3 (no preexisting condition exclusion) sha256:921d99a4ca5e446141b2b7ca537c3c5e45d9a4ebd0b1a12009a68fb396657ef7; 300gg-6(a) (individual/small group must cover EHB package) sha256:6e7bfc08b2b0f981fac9c2ef2aec2afb6324ad329ed588e1c05c92b22d4ce18d; 300gg-11 (no lifetime or annual dollar limits on EHB) sha256:da7d024e8f1e1dcf4718a5707aab757b46388044dc7486b07f5108df67c33d51; 300gg-13 (preventive without cost sharing) sha256:4c39b631a7b9ba7501d0c3fe0f54ed87dc78b839d1c284b8254c20654acd811d; 300gg-14 (adult child to age 26) sha256:56a3b2f48ce7effc57f0a0fb7555bad357ba524123189a93e033ba43eb27823a; 18022(b)-(c) (ten EHB categories; cost-sharing cap) sha256:4a322609875dfa988bf2364120059f8b82dc8c1e765a84131977a1b9d685b8ad; 300gg-131/-132 (No Surprises Act balance-billing limits) sha256:bb1ad70a27113d73c9a48fe6d8bd107f7ec7b9c6e3247229467a5e165ee89476 / sha256:73ad766fc4ec6902d20f0fdcf6dd03e6429ca64181970e71b1a46ebe9a6e27b0 — https://www.law.cornell.edu/uscode/text/42/"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Health Insurance Plans.md
---

**Health Insurance Plans** are the arrangements that pay for an individual's or a group's medical care in the United States, bought individually or through an employer, and they differ in two ways: how they restrict the choice of provider, and how much of each bill the member pays through cost sharing. The main types are traditional indemnity plans and the managed care plans, health maintenance organizations (HMOs), preferred provider organizations (PPOs) and point-of-service (POS) plans, with high-deductible plans paired with a tax-advantaged account as a further option. Public programs, [[Medicare]] and [[Medicaid]], cover the elderly, the disabled and people with low income.

> $$m(A) = \min\Big(K + \min(A, D) + c\,(A - D)_+,\ M\Big)$$

> $$\text{Annual cost} = 12\pi + m(A) - H$$

- **Symbols:** $A$ is the member's allowed charges for the year on services subject to the deductible, $D$ is the deductible, $c$ is the member's [[Coinsurance|coinsurance]] share above it, and $K$ is the total of fixed copayments, such as \$25 for each office visit, charged outside the deductible. $M$ is the out-of-pocket maximum, after which the plan pays in full. In the second block, $\pi$ is the member's monthly premium contribution and $H$ is any employer deposit to the member's health account.
- **Indemnity plans:** A traditional indemnity, or fee-for-service, plan typically pays, after a deductible, a percentage of covered expenses, often 80%, and gives the member the most flexibility in choosing where to receive care.
- **HMOs:** An HMO has the member choose a primary care physician from its network, who manages the member's care and may have to refer the member to other network providers. Care outside the network is generally not covered except in an emergency.
- **PPOs:** A PPO contracts with a network of providers at negotiated rates, and members pay less in network but are still covered out of network at higher cost sharing, with no referral needed. An out-of-network provider can also bill the member the difference between its charge and the allowed amount, which is called balance billing. Since 2022 federal law (the No Surprises Act) limits the member to in-network cost sharing for emergency services and, unless the member gives notice-and-consent, for care from an out-of-network provider at an in-network facility.
- **POS plans:** A POS plan is a hybrid of the two. As in an HMO, the member chooses a primary care physician and needs a referral to see a specialist; as in a PPO, the member can go to an out-of-network provider and pay more of the cost.
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
> A PPO member who has met the deductible needs an outpatient procedure. An in-network surgeon's allowed charge is \$1,200, and the member pays 20% coinsurance in network. An out-of-network surgeon, operating at an out-of-network surgical center, charges \$2,000, the plan allows \$1,200, and the member pays 40% coinsurance out of network. What does the member pay for each?
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
> - **Balance billing:** The allowed amount, not the provider's charge, is the base for out-of-network coinsurance. Where federal law allows balance billing, the member also owes the difference between the charge and the allowed amount, which coinsurance alone does not show.
