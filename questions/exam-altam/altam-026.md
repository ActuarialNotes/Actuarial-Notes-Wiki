---
id: "altam-026"
exam: "Exam ALTAM"
topic: "Analysis of Surplus"
learning_objective: "Profit Analysis"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Analysis+of+Surplus
  - Concepts/Policy+Value
  - Concepts/Equivalence+Principle
  - Concepts/Insurance+Premium
  - Concepts/Life+Insurance
points: 8
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:62aa9c535b1552edca8ad650a51315a75091c579d6e18f8347d2a357dfe8e980
  sources:
    - "SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q26, p.48, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q26, pp.51-52, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-026.md
---

An insurer issues fully discrete whole life insurance policies to 10,000 lives, each age 45, with independent future lifetimes.

The death benefit for each policy is 100,000. Gross premiums are determined using the equivalence principle. You are given the following information:

| | Pricing and Policy Value Assumptions | Policy Year 1 Actual Experience | Policy Year 2 Actual Experience |
|---|---|---|---|
| Interest | 5% | 7% | Same as pricing |
| Expense at Start of the Year | 75% of premium + 100 per policy in the first year; 10% of premium + 20 per policy thereafter | 75% of premium + 105 per policy | Same as pricing |
| Settlement Expense | 200 per policy | Same as pricing | 220 per policy |
| Mortality | Standard Ultimate Life Table | Same as pricing | 10 deaths |

## Part a (2 points)

Show that the gross premium for each policy is 1020 to the nearest 10. You should calculate the premium to the nearest 1.

### Explanation
$$\text{EPV Benefits} = (100{,}000)\,A_{45} = (100{,}000)(0.15161) = 15{,}161$$

$$\text{EPV Premiums} = P\,\ddot{a}_{45} = 17.8162P$$

$$\begin{align*}
\text{EPV Expenses} &= 20\ddot{a}_{45} + 80 + 200A_{45} + 0.1P\ddot{a}_{45} + 0.65P \\
&= (20)(17.8162) + 80 + (200)(0.15161) + [(0.1)(17.8162) + 0.65]P \\
&= 466.646 + 2.43162P
\end{align*}$$

$$P = \frac{15{,}161 + 466.646}{17.8162 - 2.43162} = 1015.80$$

## Part b (2 points)

Calculate the gross premium policy value for a policy inforce at the end of policy year 1.

### Explanation
$$\begin{align*}
{}_1V &= (100{,}200)\,A_{46} - 0.9P\ddot{a}_{46} + 20\ddot{a}_{46} \\
&= (100{,}200)(0.15854) - [(0.9)(1015.80) - 20](17.6706) \\
&= 84.30
\end{align*}$$

### Examiner Report
**Graders' Comments:** *Candidates could answer using the prospective approach or the recursion approach.. (as printed) The most common errors involved incorrect treatment of expenses. Some candidates used the actual interest rate (1.07) instead of the pricing rate (1.05), which led to partial credit if the rest of the solution was correct.*

## Part c (3 points)

For each of interest, expense and mortality, in that order, calculate the gain or loss by source in policy year 1 on this block of policies.

### Explanation
Interest Gain:

$$(10{,}000)(0.07 - 0.05)[P - (0.75P + 100)] = 30{,}790$$

Expense Gain:

$$(10{,}000)[(0.75P + 100) - (0.75P + 105)](1.07) = -53{,}500$$

Mortality Gain: 0

### Examiner Report
**Commentary:**

*Candidates were expected to indicate clearly whether the amount calculated is a gain or a loss. A few candidates calculated only the total gain/loss; this received small partial credit. One relatively common mistake was to use a factor of .07 instead of 1.07 when calculating the expense gain and loss.*

## Part d (1 point)

Explain the sources and direction of any gains or losses in policy year 2. Exact values are not necessary.

(This is a modified version of Question 4 from the Spring 2014 Written Answer exam.)
(Part (a) and part (b) are covered by the FAM-L exam.)

### Explanation
Interest: No gain or loss, as experience matches the assumption.

Expenses: Loss, as settlement expenses exceed the assumption.

Mortality: Expected deaths $= 10000\,p_{45}\,q_{46} = 8.4$. There will be a loss, as actual deaths exceed expected deaths

### Examiner Report
**Graders' Comments:** *A few candidates compared the experience of year 2 with year 1. For example, "interest in year 2 was lower than in year 1 so there was a loss due to interest". This did not directly answer the question and did not receive full credit. A few candidates proposed that there would be a gain due to mortality because there were more deaths than expected.*
