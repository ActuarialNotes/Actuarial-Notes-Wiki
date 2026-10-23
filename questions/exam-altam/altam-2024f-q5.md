---
id: "altam-2024f-q5"
exam: "Exam ALTAM"
topic: "Universal Life Insurance"
learning_objective: "Universal Life Insurance"
difficulty: medium
type: multi-part
year: 2024
session: Fall
wiki_link:
  - Concepts/Universal+Life+Insurance
  - Concepts/Joint+Life
  - Concepts/Life+Insurance
points: 11
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:06717ff6e935f84d27049d45fcc81a86828b5f28ab8f6b2dee4de1be6dba4277
  sources:
    - "SOA Exam ALTAM Fall 2024 — exam (question paper), Q5, pp.11-12, sha256:a75dc6453611a1e32f792a8f6c5efa70b61d82ce0a86291594d816b74f01b830 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/exams/2024-fall-altam-exam.pdf"
    - "SOA Exam ALTAM Fall 2024 — model solutions and examiners' comments, Q5, pp.10-12, sha256:bef60a4ff411c7fa3eb0fd8d4b6a52a32d8ddf620ff365270c2a6dce96299a4f — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/fall-2024-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2024f-q5.md
---

For a Type B universal life policy with annual premiums, you are given the following information:

(i) The Additional Death Benefit is 100,000.

(ii) The minimum annual premium is 2,000.

(iii) The death benefit is paid immediately on death.

(iv) The expense charge is 100 plus 2% of the premium.

(v) The CoI is calculated based on 120% of the Standard Ultimate Mortality Model.

(vi) CoIs are not discounted (that is, $i_q = 0$).

(vii) The annual effective credited interest rate of $i_c = 0.06$ is credited continuously to account values.

(viii) There is no corridor factor.

A life age 50 purchases this policy. She pays annual premiums of 2,000 throughout the term of the policy.

## Part a (3 points)

(i) Show that the Account Value at the end of the second year is 3730 to the nearest 10. You should calculate the value to the nearest 0.1.

(ii) Roughly sketch a graph of the account values, $AV_t$, as a function of $t$, for $0 \le t < 2$. You should identify key values on your sketch.

### Explanation
**(i)**

$$AV_1 = \left(0.98P - 100 - 1.2q_{50}(100{,}000)\right)(1.06) = 1817.88$$

$$AV_2 = \left(1817.88 + 0.98P - 100 - 1.2q_{51}(100{,}000)\right)(1.06) = 3729.24$$

**(ii)**

![Hand-drawn model solution sketch of AVt against t from 0 to 2, vertical axis marked 1000 to 5000. AV starts at 0 at t = 0 and jumps to AV0+ = 1715, rises slowly to AV1 = 1817 at t = 1, jumps to AV1+ = 3518, then rises slowly to AV2- = 3729 at t = 2](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-2024f-q5-av-sketch-year-0-2.png)

### Examiner Report
Overall, candidates were well-prepared for this question.

Candidates did very well on this part, understanding how account value increases and decreases. The best candidates made good graphs that showed vertical jumps in AV at time 0 and time 1, but unfortunately many candidates lost points here. A sizable portion of candidates did not reflect positive interest accumulation within the policy years. Some candidates also misinterpreted "continuous" interest to mean force of interest. Key features of the graph are AV0=0, jump to AV0+ =1715 , slow increase to V1=1818, jump to AV1+ =3518, slow rise to AV2=3729. Axes should be appropriately labelled.

## Part b (2 points)

Show that the youngest age at which the deductions (cost of insurance and expenses) are greater than the premium for this policyholder is age 74.

### Explanation
$$0.02P + 100 + 1.2q_x(100{,}000) > 2000$$

$$\Rightarrow q_x > \frac{2000 - 40 - 100}{1.2(100{,}000)} = 0.0155$$

$$\Rightarrow x > 73$$

So the youngest age is 74.

### Examiner Report
Candidates did very well on this part as well, understanding how policy deductions are calculated. Occasionally candidates showed how age 74's charges were sufficiently high but, regrettably, did not show or explain how age 73's charges were insufficiently high. Some candidates also misinterpreted "policy deductions" to mean only COIs when in fact other charges should have been included.

## Part c (3 points)

(i) Assume that the policyholder holds the policy until her death at age 91.6.

You are given that $AV_{41} = 109{,}467$.

Calculate the total amount of death benefit paid.

(ii) Roughly sketch a graph of the account values, $AV_t$, as a function of $t$, for $41 \le t < 41.6$.

### Explanation
**(i)**

$$AV_{41.6} = \left(109{,}500 \text{ (as printed)} + 0.98(2000) - 100 - 1.2q_{91}(100{,}000)\right)(1.06)^{0.6} = 101{,}320$$

$$DB = AV_{41.6} + ADB = 201{,}320$$

**(ii)**

![Hand-drawn model solution sketch of AVt against t from 41 to 41.6, vertical axis broken above 0 and marked 95,000 to 110,000. At t = 41 the AV41 value near 110,000 drops vertically to AV41+ = 97,839, then rises gradually to AV41.6 = 101,320 at t = 41.6](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-2024f-q5-av-sketch-age-91.png)

### Examiner Report
Candidates did reasonably well on this part. The great majority remembered to add the 100,000 face amount to the AV. Mistakes with the mortality charge -- such as applying only a fractional portion of COI charges -- and/or the 0.6 years of interest accumulation were fairly common. As with Part A, the vertical jumps in the graphing portion of this question were commonly misunderstood. Key features of the graph were AV41 = 109,467, jump down to AV 41+ = 97,839, gradual rise to AV41.6 = 101,320.

## Part d (3 points)

The insurer offers a special joint life and last survivor version of the policy, under which a death benefit of 50,000 is paid out on the first death of a couple. On the second death, the death benefit is 50,000 plus the account value. The CoI is calculated assuming that the lives have independent future lifetimes and that the mortality of each life is 120% of the Standard Ultimate Mortality Model. All other policy details and assumptions are as given above.

A couple, Linda and Xiaobai, who are both age 50, purchases this policy. Linda also buys the single life policy.

(i) Show that in the first year, the CoI for this policy is the same as the CoI for the single life policy.

(ii) Describe how the account values of the single life policy and joint life policy would compare at the end of the $t$-th year if both Linda and Xiaobai survive to time $t-1$.

(iii) Describe how the account values of the single life policy and joint life policy would compare at the end of the $t$-th year if only Linda survives to time $t-1$.

### Explanation
Let $\hat{q}_y = 1.2q_y$ and $\hat{p}_y = 1 - \hat{q}_y$

**(i)** Single Life:

$$COI = \hat{q}_{x+t}(100{,}000)$$

Joint Life:

$$
\begin{align*}
COI &= 2\hat{q}_{x+t}\,\hat{p}_{x+t}(50{,}000) + \left(\hat{q}_{x+t}\right)^2(100{,}000) \\
&= \hat{q}_{x+t}\left(1 - \hat{q}_{x+t}\right)(100{,}000) + \left(\hat{q}_{x+t}\right)^2(100{,}000) \\
&= \hat{q}_{x+t}(100{,}000)
\end{align*}
$$

**(ii)** They will be the same, as the COI will be the same each year (as in the first year calc above).

**(iii)** The AVs for the joint life will be greater than for the single life as the ADB and COI will be smaller (ADB is 50,000 instead of 100,000)

### Examiner Report
This part proved difficult for many candidates, including many of those who responded well to parts A through C. In subpart (i), candidates were expected to show more steps in their proofs. Candidates often mistakenly applied the 1.2 factor to the joint life and/or last survivor policy rather than the single life. Several candidates also tried to use the AV in their COI calculations. The best candidates included clear explanations for why their responses were true, specifically calling out the link between the policy's death benefit, its cost of insurance charges, and consequently its account value.
