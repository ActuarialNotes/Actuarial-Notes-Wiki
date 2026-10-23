---
id: "altam-2023f-q5"
exam: "Exam ALTAM"
topic: "Universal Life Insurance"
learning_objective: "Universal Life Insurance"
difficulty: medium
type: multi-part
year: 2023
session: Fall
wiki_link:
  - Concepts/Universal+Life+Insurance
  - Concepts/Life+Insurance
  - Concepts/Cash+Flow
points: 8
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:1f2409813dd1c1816ad7a69030699637749b9bcd847feb9b63229b0b35424ecb
  sources:
    - "SOA Exam ALTAM Fall 2023 — exam (question paper), Q5, p.10, sha256:c162b6a75c9ccaedf38fcc9f7f4debf83abcf768f1e6ee6ff0d84e89e3098bc7 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-altam-exam.pdf"
    - "SOA Exam ALTAM Fall 2023 — model solutions and examiners' comments, Q5, pp.11-12, sha256:df2ab0d9bc15ea197487448a071c8d909aa27d14841c082505cbb63358a6b93b — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/altam-fall-2023-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2023f-q5.md
---

An insurer sells both Type A and Type B universal life insurance policies to lives age 75.

You are given the following information about these policies:

(i) The cost of insurance rates for the policy are 100% of the mortality rates in the Standard Ultimate Mortality Model.

(ii) The interest rate used to discount the cost of insurance charge is 4%.

(iii) The expense charges at the beginning of each policy year are 100 plus 10% of premium.

(iv) The credited interest rate during all policy years is 7%.

(v) The corridor factor in all years is 1.05.

## Part a (1 point)

Explain why Type A universal life policies are more commonly affected by corridor factors than Type B universal life policies.

### Explanation
Corridor factors exist to ensure that the additional death benefit (ADB) of a UL policy, over and above the account value, is large compared with the account value. Type A policies have a decreasing ADB, as it is the difference between the face value and the account value. For a long term policy, it is likely that the ADB becomes quite small as the account value grows. Type B policies have a constant ADB, so it is less likely that the ADB becomes too small relative to the account value. Hence, the Type A policy will be more likely to be impacted by the corridor factor than a Type B policy.

### Examiner Report
For part (a), a large number of candidates failed to articulate concisely that with a fixed total death benefit as the account value grows over time, the additional death benefit will decrease and therefore be more susceptible to the corridor adjustment.

## Part b (1 point)

Consider a Type B universal life policy, with a death benefit of 100,000 plus the account value. The premium paid at the beginning of the first policy year is 10,000.

Show that the cost of insurance charge for the first policy year is 1800 to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
$AV_1$ is less than $P(1.07)$, so clearly the corridor factor does not apply.

$$
CoI = q_{75} \cdot 100{,}000 \cdot v_{4\%} = 1772.40
$$

### Examiner Report
For part (b), most candidates successfully calculated the cost of insurance, but many failed to demonstrate that the corridor adjustment was not applicable.

## Part c (1 point)

Calculate the account value of the policy at the end of the first policy year.

### Explanation

$$
\begin{align*}
AV_1 &= (P - e - CoI)(1.07) \\
&= (10{,}000(0.9) - 100 - 1772.40)(1.07) \\
&= 7626.53
\end{align*}
$$

### Examiner Report
For Part (c), most candidates successfully calculated the account value of the policy at the end of the first policy year.

## Part d (2 points)

Now consider a Type A universal life policy with a face amount of 100,000. The premium paid at the beginning of the first policy year is 10,000.

Calculate the account value of this policy at the end of the first policy year.

### Explanation
Again, $AV_1$ will be less than 10,700, and so the ADB will be greater than 89,300, and the corridor factor will not apply.

$$
\begin{align*}
AV_1 &= (P - e - CoI)(1.07) \\
&= \left(P - e - q_{75}\,v_{4\%}\left(FA - AV_1\right)\right)(1.07)
\end{align*}
$$

$$
\begin{align*}
\Rightarrow AV_1 &= \frac{\left(P - e - q_{75}\,v_{4\%}\,FA\right)(1.07)}{1 - q_{75}\,v_{4\%}(1.07)} \\
&= \frac{\left(10{,}000(0.9) - 100 - 100{,}000(0.018433)v_{4\%}\right)(1.07)}{1 - (0.018433)v_{4\%}(1.07)} \\
&= 7773.96
\end{align*}
$$

### Examiner Report
For part (d), most candidates were successful at calculating the account value of the policy at the end of the first policy year, but many failed to demonstrate that the corridor adjustment was not applicable.

## Part e (3 points)

The account value at the end of the 8th policy year for the Type A policy is 81,618.64. The policyholder pays a 10,000 premium at the beginning of the 9th policy year. Calculate the account value at the end of the 9th policy year.

### Explanation
It is possible that the corridor factor will apply here. So $AV_9$ is the smaller of the AV ignoring the corridor factor, $AV_9^f$ and the AV using the corridor factor, $AV_9^c$, where

$$
AV_9^f = \frac{\left(AV_8 + P - e - q_{83}\,v_{4\%}\,FA\right)(1.07)}{1 - q_{83}\,v_{4\%}(1.07)} = 96{,}698.82
$$

$$
\begin{align*}
AV_9^c &= \left(AV_8 + P - e - CoI\right)(1.07) \\
&= \left(AV_8 + P - e - q_{83}\,v_{4\%}(cf - 1)AV_9^c\right)(1.07) \\
&= \frac{\left(AV_8 + P - e\right)(1.07)}{1 + q_{83}\,v_{4\%}(0.05)(1.07)} \\
&= 96{,}626.45
\end{align*}
$$

$$
\Rightarrow AV_9 = Min(96{,}698.82 \text{ and } 96{,}626.45) = 96.626.45 \text{ (as printed)}
$$

### Examiner Report
For part (e), most candidates were able to calculate what the account value was without considering the corridor factor, some candidates failed to appropriately apply the corridor factor adjustment, which was relevant in this situation. Minimal points were awarded for failing to realize the corridor factor applied.
