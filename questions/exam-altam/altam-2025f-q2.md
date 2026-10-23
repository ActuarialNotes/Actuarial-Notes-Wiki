---
id: "altam-2025f-q2"
exam: "Exam ALTAM"
topic: "No-Lapse Guarantee"
learning_objective: "Universal Life Insurance"
difficulty: medium
type: multi-part
year: 2025
session: Fall
wiki_link:
  - Concepts/Universal+Life+Insurance
  - Concepts/No-Lapse+Guarantee
  - Concepts/Reserve
points: 7
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:5a2b817a09b8f452bbc2c48dab0a651fe5d95c126894646c0c2c36d2d710c458
  sources:
    - "SOA Exam ALTAM Fall 2025 – exam (questions), Q2, p.4, sha256:8298b1396b4c2dac7679324ddfc5451f9ebeb004d5dd019fb961a7ad76f8fbb8 — https://www.soa.org/globalassets/assets/files/edu/2025/fall/exams/2025-fall-altam-exam.pdf"
    - "SOA ALTAM Fall 2025 Model Solutions and Examiners' Comments, Q2, pp.2-3, sha256:7d087ea5f200ed24a6bb37c8e74edebb3fc45943458d10d06bc02e46cd8f6b2a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2025-11-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2025f-q2.md
---

An individual age 40 purchases a Type A Universal Life insurance policy with a Face Amount of 100,000.

The policy offers a no-lapse guarantee that specifies that from time 20, the policy will not lapse before age 90, provided that the policyholder pays a minimum premium of 1000 each year for the first 20 years.

You are given the following information:

1. Cost of Insurance rates are set at 120% of the Standard Ultimate Survival Model (SUSM).
2. The interest rate for discounting the cost of insurance charge is $i_q = 0.02$.
3. The credited rate for year 1 is 4%.
4. Expense charges are 50 per policy per year plus 3% of premiums.
5. There are no corridor factors.
6. There is no additional charge for the no-lapse guarantee.

## Part a (1 point)

Briefly describe the difference between Type A and Type B Universal Life products.

### Explanation
Type A policies offer a level death benefit equal to the specified face value (unless corridor factors apply).

Type B policies offer a death benefit equal to a specified level additional death benefit plus the account value, so the total death benefit increases with the account value.

### Examiner Report
1. Parts (a) and (b) were done well by most candidates.

## Part b (2 points)

The policyholder pays a premium of 1500 at the start of the first year. Calculate the account value at the end of the first year, $AV_1$.

### Explanation
Because there are no corridor factors, we have

$$AV_1 = \Big((1500)(0.97) - 50 - 1.2\,q_{40}\,v_{i_q}\left(100{,}000 - AV_1\right)\Big)(1.04)$$

$$\Rightarrow AV_1 = \frac{\Big((1500)(0.97) - 50 - 1.2\,q_{40}\,v_{i_q}(100{,}000)\Big)(1.04)}{1 - 1.2\,q_{40}\,v_{i_q}(1.04)} = \mathbf{1{,}397.62}$$

### Examiner Report
1. Parts (a) and (b) were done well by most candidates.

## Part c (2 points)

You are also given:

1. After 20 years, the policy qualifies for the no-lapse guarantee.
2. The valuation basis for the no-lapse guarantee is the SUSM with $i = 5\%$.
3. The account value at the end of year 20 is $AV_{20} = 33{,}590$.
4. The account value at the end of year 40 is $AV_{40} = 26{,}403$.

(i) Calculate the reserve for the no-lapse guarantee at the end of year 20.

(ii) Calculate the reserve for the no-lapse guarantee at the end of year 40.

### Explanation
**(i)** At time 20:

$$V^{nlg} = \max\left(100{,}000A^{\,1}_{60:\overline{30}|} - AV_{20},\ 0\right)$$

$$A^{\,1}_{60:\overline{30}|} = A_{60} - v^{30}\frac{l_{90}}{l_{60}}A_{90} = 0.21483$$

$$\Rightarrow V^{nlg} = \max(21{,}483 - 33{,}590,\ 0) = \mathbf{0}$$

**(ii)** At time 40:

$$V^{nlg} = \max\left(100{,}000A^{\,1}_{80:\overline{10}|} - AV_{40},\ 0\right)$$

$$A^{\,1}_{80:\overline{10}|} = A_{80:\overline{10}|} - {}_{10}E_{80} = 0.33722$$

$$\Rightarrow V^{nlg} = \max(33{,}722 - 26{,}403,\ 0) = \mathbf{7{,}319}$$

### Examiner Report
2. Part (c) proved much more challenging. Only around 15% of candidates knew how to calculate the reserves. The no-lapse guarantee is a topic that is in the sample questions and is explained in the text book, and the calculation is fairly straightforward, so the poor performance on this part was unexpected.

## Part d (2 points)

Give two advantages and two disadvantages from the perspective of the insurer of offering a no-lapse guarantee on a Universal Life insurance product.

### Explanation
Advantages:

1. Offering the guarantee might offer a competitive advantage over other insurers and result in more sales.
2. Requiring a minimum premium level for the guarantee to be valid could entice policyholders to pay more in premiums than they otherwise would have, which will tend to make the product more profitable for the insurer.

Disadvantages:

1. If the guarantee ends up being "in the money", there could be significant costs for the insurer, especially since this risk is not fully diversifiable.
2. The insurer should hold reserves for the guarantee, which is potentially an additional cost arising late in the policy term.

### Examiner Report
3. Part (d) was done well by the candidates who knew what a no-lapse guarantee is. Good candidates explained how premium persistency could improve profits, and they also knew the risks to the insurance company. Several candidates had a fundamental misunderstanding of NLGs, conflating them with short-pay options.
