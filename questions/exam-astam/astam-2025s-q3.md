---
id: "astam-2025s-q3"
exam: "Exam ASTAM"
topic: "Classification Ratemaking"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: medium
type: multi-part
year: 2025
session: Spring
wiki_link:
  - Concepts/Classification+Ratemaking
  - Concepts/Balancing+Back
  - Concepts/Loss+Cost
  - Concepts/Deductible
  - Concepts/Pareto+Distribution
  - Concepts/Overall+Rate+Level+Indication
points: 10
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:d3a86a545b8764691721fe94e77fa50349698937425405b553735265be3f6678
  sources:
    - "SOA Exam ASTAM Spring 2025 — exam questions, Q3, pp.6-7, sha256:6abc81ba7d868ecb7eb1a7a747b4558adcfc1794531dcef0ef95c6c8f82c33e6 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/exams/spring-2025-astam-exam.pdf"
    - "SOA Exam ASTAM Spring 2025 — model solutions and examiners' comments, Q3, pp.6-9, sha256:f651a9645c9b8ace921bb11d9def2e3655895a0fd6c563fe8777c43eb3f706e5 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2025s-q3.md
---

The ratemaking actuary for a property and casualty insurance company is analyzing automobile claims data.

You are given the following information about the portfolio:

(i) Policies are classified into three classes, A, B, and C, depending on the deductible chosen.

(ii) The annual number of claims per policy within each class is assumed to follow a Poisson distribution, with parameter $\lambda$ varying across classes.

(iii) The ground-up loss severity for all classes is assumed to follow a Pareto distribution with $\alpha = 2$ and $\theta = 2500$.

(iv) Claim frequency and loss severity are independent.

(v) The current differentials are based on expected aggregate claim amount.

(vi) The table below shows the claim frequency information for the different classes.

| Class | Deductible | Claim Frequency Poisson, $\lambda$ |
|---|---|---|
| A (Base Rate) | 500 | 0.0625 |
| B | 1000 | 0.0510 |
| C | 1500 | 0.0430 |

## Part a (1 point)

State two considerations regarding the data to use for determining deductible relativities.

### Explanation

- Insurer may not know the ground up loss distribution. Any losses below the deductible are generally unobserved by the insurer.
- Losses that are above the deductible, but by a relatively small amount may also be unobserved, as policyholders will not claim small amounts (to avoid a premium increase, or not worth the hassle, for example).
- Adverse selection impacts the distribution of losses by deductible. Higher risk drivers may select a lower deductible if they expect to be making claims.
- On the other hand, wealthier drivers are more inclined to self-insure, and are more likely to choose a higher deductible, even if they are high risk. The loss severity of wealthier drivers is likely to be different to less wealthy drivers.
- The premium saved by choosing a higher deductible may (in some cases) be greater than the difference in deductible, leading to an arbitrage pushing policyholders to choose the higher deductible.

### Examiner Report

Examiners' Comments: Candidates struggled with this part often not addressing the question that was asked.

## Part b (3 points)

(i) Show that the expected aggregate claim amount for a Class A policy is 190 to the nearest 10. You should calculate the value to the nearest 0.1.

(ii) Calculate the current differential for Class B.

(iii) Calculate the current differential for Class C.

### Explanation

(i) Let $Y \sim \text{Pareto}(\alpha, \theta)$ denote the ground-up loss random variable. Given a deducible (as printed) $d$, the claim severity random variable is $Y_d = Y - d \mid Y > d$, so that

$$
\begin{align*}
\Pr[Y_d > y] &= \Pr[Y - d > y \mid Y > d] \\
             &= \frac{S_Y(y+d)}{S_Y(d)} \\
&= \left(\frac{\theta}{\theta + y + d}\right)^{\alpha} \left(\frac{\theta + d}{\theta}\right)^{\alpha} \\
 &= \left(\frac{\theta + d}{\theta + d + y}\right)^{\alpha}
\end{align*}
$$

$$\Rightarrow Y_d \sim \text{Pareto}(\alpha, \theta + d)$$

$$\Rightarrow E[Y_d] = \frac{\theta + d}{\alpha - 1} \qquad \text{Note: This is also given in the formula sheet.}$$

$\Rightarrow$ the expected claim severity for class A is

$$\frac{\theta + d}{\alpha - 1} = \frac{2500 + 500}{2 - 1} = 3000$$

$\Rightarrow$ the expected aggregate claim amount for Class A is

$$\lambda_A \times 3000 = (0.0625)(3000) = 187.50$$

(ii) The expected aggregate claims for a Class B policy are $0.0510(3500) = 178.50$.

The differential relative to Class A is

$$\frac{178.50}{187.50} = 0.9520$$

(iii) The expected aggregate claims for a Class C policy are $0.0430(4000) = 172.00$.

(iv) (as printed) The differential relative to Class A is

$$\frac{172.00}{187.50} = 0.9173$$

### Examiner Report

Examiners Comments:

1. Candidates do not have to derive the Pareto result in (i) as the formula is given in the formula sheet.
2. Candidates did well on this part.

## Part c (3 points)

The current differentials are updated using the experience shown in the following table:

| Class | Claims | Earned Exposure |
|---|---|---|
| A (Base Rate) | 3,465,000 | 18,500 |
| B | 1,335,000 | 8,000 |
| C | 350,000 | 2,200 |

(i) Calculate the new indicated differential for Class B using the loss cost method.

(ii) Calculate the new indicated differential for Class C using the loss cost method.

(iii) Show that the off-balance factor using the new indicated differentials is 0.98 to the nearest 0.01. You should calculate the value to the nearest 0.001.

### Explanation

(i) and (ii) Cost per unit of exposure for the three groups are:

$$A: \ \frac{3{,}465{,}000}{18{,}500} = 187.297$$

$$B: \ \frac{1{,}335{,}000}{8{,}000} = 166.875$$

$$C: \ \frac{350{,}000}{2{,}200} = 159.091$$

So the differentials relative to group A are:

$$B: \ \frac{166.875}{187.297} = 0.8910$$

$$C: \ \frac{159.091}{187.297} = 0.8494$$

(iii) The off-balance factor is the ratio of the new average differential to the old average differential, weighted by exposure, i.e.

$$\frac{18{,}500(1) + 8000(0.8910) + 2200(0.8494)}{18{,}500(1) + 8000(0.9520) + 2200(0.9173)} = 0.9771 \text{ (as printed)}$$

### Examiner Report

Examiners' Notes: Overall candidates did reasonably good on this question. However, many candidates over complicated the question and made the calculations more difficult than necessary. The part was very straight forward.

## Part d (3 points)

The current base rate for Class A is 200. The insurer decides to implement an overall rate increase of 10%.

(i) Show that the resulting percentage increase in the base rate is between 12% and 13%. You should calculate the value to the nearest 0.1%.

(ii) Show that the percentage increase in premium for Class C policies is between 4% and 5%. You should calculate the value to the nearest 0.1%.

(iii) The marketing manager suggests instead applying a uniform 10% increase to the premiums of all classes. Critique this suggestion.

### Explanation

(i) Using the same exposure, given a new base rate of $B$, and the differentials in (c), for a 10% overall rate increase we have:

$$
\begin{align*}
B\{18{,}500(1) + 8000(0.8910) + 2200(0.8494)\} &= 1.1(200)\{18{,}500(1) + 8000(0.9520) + 2200(0.9173)\} \\
\Rightarrow B &= \frac{1.1(200)}{0.9771} \text{ (as printed)} \\
              &= 225.16
\end{align*}
$$

$$\Rightarrow \text{increase is } \frac{225.16}{200.00} - 1 = 12.58\%$$

(ii) Similarly, the increase for the group C policies is

$$\frac{225.16(0.8494)}{200(0.9173)} - 1 = 4.25\%$$

(iii) The actual claims from 2024 indicate that the premiums were high side for the higher deductible policies. Charging an across-the-board increase could encourage higher deductible policyholders to move to other insurers.

### Examiner Report

Examiners' Comments: Overall, candidates did a good job on this part.
