---
id: "astam-2024s-q2"
exam: "Exam ASTAM"
topic: "Classification Ratemaking"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: medium
type: multi-part
year: 2024
session: Spring
wiki_link:
  - Concepts/Classification+Ratemaking
  - Concepts/Loss+Ratio+Method
  - Concepts/Balancing+Back
  - Concepts/Overall+Rate+Level+Indication
  - Concepts/Permissible+Loss+Ratio
  - Concepts/Central+Limit+Theorem
points: 8
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:8ab193e53ccfa881106380eb9d7053c58ef2f2a3c1465fe9dff348b4cea15a91
  sources:
    - "SOA Exam ASTAM Spring 2024 (April 24, 2024), question booklet, Q2, pp.4-5, sha256:e41c30b8ef94a58adba9510cdeb6875db0e3a2abdb3491df90b0eab848421fdf — https://www.soa.org/globalassets/assets/files/edu/2024/spring/exams/spring-2024-astam-exam.pdf"
    - "SOA ASTAM April 2024 Model Solutions, Q2, pp.2-4, sha256:4f33d5c7e1aa38fd23684a24eb5e1c6535973fa01492638db9ecc94b87ace259 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/spring-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2024s-q2.md
---

XYZ Insurance sells medical liability insurance.

## Part a (1 point)

Briefly describe two differences between the distributions of the loss for a single policy and the average loss per policy for a large portfolio of independent policies.

### Explanation
1. The individual loss distribution will generally be highly positively skewed, as most losses are fairly small, but there is a small probability of a very large loss. In contrast, the average loss per policy will be fairly symmetric, because the distribution is approximately Normal, from the Central Limit Theorem.

2. The individual policy loss distribution will have a probability mass at zero, as many policies do not generate any claims. The average loss per policy distribution will not.

3. The individual policy loss distribution will have a much higher standard deviation - i.e. a much larger spread – than the average loss per policy distribution, as the standard deviation of the average is 1/N (as printed) times the standard deviation of each individual loss (assuming i.i.d).

### Examiner Report
For Part(a), the candidates did not do great on this question. Many did correctly identify the difference in variance. However, beyond that they tended not really address the question with regard to the difference between the distributions. For Part (b) and Part (c), virtually everyone got these correct. The only common error was that some candidates did not note the B was the Base.

## Part b (2 points)

You are the ratemaking actuary for XYZ Insurance. XYZ uses the following data to determine the indicated premium rate on its medical liability insurance:

| Item | Value |
|---|---|
| Expected Effective Period Incurred Losses (000s) | 25,000 |
| Fixed Expenses (000s) | 3,000 |
| Earned Exposure Units (000s) | 20 |
| Permissible Loss Ratio | 0.85 |

Show that the indicated premium rate is 1,650 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation
The average gross premium rate for 2024 is

$$\begin{align*}
&\frac{\text{New ave loss cost} + \text{fixed expenses per exposure}}{\text{permissible loss ratio}} \\
&= \frac{(25000 + 30000)}{20} \times \frac{1}{0.85} \text{ (as printed)} \\
&= 1647.06
\end{align*}$$

## Part c (1 point)

XYZ sells medical insurance in Regions A, B, and C. XYZ used the following differentials and had the following experience:

| Region | Existing Differential | Experience Period Loss Ratio at Current Rates | Exposure Units (000s) |
|---|---|---|---|
| A | 0.80 | 0.72 | 5 |
| B | 1.00 | 0.80 | 10 |
| C | 1.20 | 0.76 | 5 |

Determine the indicated differential for each region using the loss ratio method.

### Explanation
Since Region B has a 2023 Differential of 1.00, this is considered the base case.

The 2024 differentials then for each region are:

$$\begin{align*}
\text{Region A:}\quad &\text{2023 differential} \times \frac{\text{Region A Loss Ratio}}{\text{Region B Loss Ratio}} \\
&= 0.80\,\frac{0.72}{0.80} \\
&= 0.72
\end{align*}$$

Region B: 1.00 (still base case)

$$\begin{align*}
\text{Region C:}\quad &\text{2023 differential} \times \frac{\text{Region A Loss Ratio}}{\text{Region B Loss Ratio}} \text{ (as printed)} \\
&= 1.20\,\frac{0.76}{0.80} \\
&= 1.14
\end{align*}$$

## Part d (2 points)

Another method for calculating new differentials is the loss cost method.

(i) Explain one reason why the differentials calculated by the two methods might produce different results.

(ii) Explain what conditions are required for the two methods to produce the same results.

### Explanation
(i) The differentials calculated from the two methods will not exactly be the same when there are several risk classification characteristics used and the distribution of all cross-variables in any cell (called the cell population) is heterogeneous.

(ii) On the other hand, if the cell population is homogeneous, even with several risk classifications, the differentials from the two methods will yield to the same result.

### Examiner Report
For Part (d), most students received zero or very few points on this question. A common mistake was to try to mathematically equate the two formulas. Very few candidates demonstrated a true understanding of the conditions necessary for the two approaches to be the same.

## Part e (2 points)

You are given the following additional data:

| Item | Value |
|---|---|
| Base Premium Rate for Region B | 1,500 |
| Target Premium Increase | 9.8% |

Calculate the revised base premium rate such that the premium change and the differentials are balanced.

### Explanation
From (b), the average gross premium rate for 2024 is 1647.06 so that the target increase is

$$\frac{1647.06}{1500} = 1.098$$

The off-balance factor for all three regions is

$$\frac{0.72(5{,}000) + 1(10{,}000) + 1.14(5{,}000)}{0.80(5{,}000) + 1(10{,}000) + 1.20(5{,}000)} = \frac{19{,}300}{20{,}000} = 0.965$$

The revised base premium rate for 2024 should therefore be

$$\frac{1.098}{0.965}\left(1{,}500\right) = 1706.74$$

### Examiner Report
For Part e, students still did well on this part although not as well as on b and c. A common error was using the inverse of the off-balance factor.
