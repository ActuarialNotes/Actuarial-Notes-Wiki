---
aliases:
  - Medicare Supplement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:db72c73795511317f1b9137998fd086fa385787996bb8efc4049f13dfa1e957a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Medicare Supplement Insurance.md
---
**Medicare Supplement Insurance**, or Medigap, is private health insurance sold to people enrolled in Original [[Medicare]] that pays some or all of the cost sharing Medicare Parts A and B leave to the beneficiary, such as the hospital deductible, the Part B deductible and the 20% Part B coinsurance. Its benefits come in a small set of standardized plans, so policies from different insurers can be compared on price.

## Standardized plans

Plans are identified by letters (A, B, C, D, F, G, K, L, M and N), and every insurer's Plan G, for example, has the same benefits. Plan A has the core benefits. The others add the Part A deductible, skilled nursing facility coinsurance, the Part B deductible, Part B excess charges and foreign travel emergency care in different combinations.

Plan G is Plan F without the Part B deductible. People newly eligible for Medicare from 2020 can't buy Plans C and F, which cover the Part B deductible. Plans K and L pay a share of the cost sharing up to an annual out-of-pocket limit, and Plan N has small copays for office and emergency room visits. A Medicare Select policy offers the same benefits through a hospital network at a lower premium.

> [!example]- What do Plan G and Plan N pay for this beneficiary's year? {Example}
> A beneficiary has one hospital stay, with an illustrative Part A deductible of $\$1{,}700$. Medicare-approved Part B services are $\$5{,}000$, with an illustrative Part B deductible of $\$280$, and twelve of the services are office visits. Medicare pays 80% of Part B charges above the deductible, and Plan N's office visit copay is $\$20$.
>
> > [!answer]-
> > - The Part B coinsurance Medicare leaves is $0.20 \times (5{,}000 - 280) = 944$.
> > - Plan G pays the Part A deductible and the coinsurance, $1{,}700 + 944 = \$2{,}644$.
> > - Plan N pays the same less the copays, $2{,}644 - 12 \times 20 = \$2{,}404$.
> > - Neither plan pays the Part B deductible, so the beneficiary pays $\$280$ under Plan G and $280 + 240 = \$520$ under Plan N.
> > - Plan N's beneficiary also pays any excess charges from doctors who don't accept Medicare's approved amount, which Plan G covers. Plan N's lower premium buys the copays, which also discourage low-value visits.

## Open enrollment and guaranteed issue

For six months starting when a person is 65 or older and enrolled in Part B, an insurer must sell them any plan it offers without medical underwriting. After that window the insurer may underwrite, except in guaranteed issue situations such as losing employer retiree coverage or a Medicare Advantage plan leaving the area.

## Rating methods

| Method | What the premium depends on |
| :--- | :--- |
| Issue-age rating | The age at purchase. The premium rises only with medical trend. |
| Attained-age rating | The current age. The premium also rises as the insured ages, so it starts lower and ends higher. |
| Community rating | Nothing about age. Everyone in an area pays the same rate. |

Some states require community rating. The method chosen shapes how premiums move with the block's age over the policy's life.

## Selection and lapse

Underwriting at issue lowers claims in the first few policy years, so loss ratios start low and rise with duration. This is why the benchmark ratio of the refund test grows with the age of the block, and why a block that keeps selling looks more profitable than its lifetime loss ratio. Healthy policyholders who can pass underwriting elsewhere lapse to a cheaper insurer, which leaves the remaining block less healthy and drives rate increases.

## Loss ratio standards

Rates are filed with the states and must meet minimum loss ratios. The anticipated lifetime loss ratio of a policy form is

> $$\text{LLR} = \frac{\sum_t v^t\,C_t}{\sum_t v^t\,P_t}$$

- $C_t$ is the expected incurred claims in year $t$.
- $P_t$ is the expected premium in year $t$.
- $v^t$ discounts year $t$ to the present, and the sums run over the life of the policy form.

Federal law and the NAIC model regulation require an expected lifetime loss ratio of at least 65% for individual policies and 75% for group policies. Each rate filing must show the standard is met.

Each year the insurer also files a refund calculation for each plan in each state, and pays a refund to policyholders when a block's experience falls below the standard. The experienced ratio plus a credibility tolerance, Ratio 3, is

> $$\text{Ratio 3} = \frac{C}{P - R} + \tau$$

- $C$ is the actual incurred claims since inception.
- $P$ is the earned premium since inception.
- $R$ is the refunds already made.
- $\tau$ is a credibility tolerance that depends on the life years exposed.

The tolerance is added to the experienced ratio, which makes a refund less likely for a small block. When Ratio 3 is below the benchmark ratio, the refund is

> $$\text{Refund} = (P - R) - \frac{(P - R) \times \text{Ratio 3}}{\text{Ratio 1}}$$

- $\text{Ratio 1}$ is the benchmark ratio since inception, from the NAIC worksheet.

The refund is the premium in excess of what would have produced the benchmark ratio on the credibility-adjusted claims. A block with fewer than 500 life years since inception has no credibility, so no refund is calculated. A refund below 0.5% of the annualized premium in force is not paid either.

> [!example]- Is a refund required for this block, and how much? {Example}
> An insurer's individual Plan G block in one state has these figures since inception:
>
> | Item | Value |
> | :--- | ---: |
> | Earned premium | $\$12{,}000{,}000$ |
> | Refunds made | $0$ |
> | Incurred claims | $\$6{,}600{,}000$ |
> | Life years exposed | 3,200 |
> | Credibility tolerance | 7.5% |
> | Benchmark ratio | 63.5% |
> | Annualized premium in force at December 31 | $\$4{,}500{,}000$ |
>
> > [!answer]-
> > - The experienced ratio is $6{,}600{,}000 / 12{,}000{,}000 = 55.0\%$.
> > - Ratio 3 is $55.0\% + 7.5\% = 62.5\%$, below the benchmark of 63.5%, so a refund is required.
> > - The credibility-adjusted claims are $12{,}000{,}000 \times 0.625 = 7{,}500{,}000$.
> > - The refund is $12{,}000{,}000 - 7{,}500{,}000/0.635 = 188{,}976.38$.
> > - It is more than $0.005 \times 4{,}500{,}000 = 22{,}500$, so the insurer must refund or credit $\$188{,}976.38$ to policyholders.

> [!trap] Testing a group block against the individual standard
> The minimum lifetime loss ratio is 65% for individual policies and 75% for group policies. Testing a group block against 65% passes a block that fails.
