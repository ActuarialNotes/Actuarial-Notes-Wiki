---
id: "astam-2024f-q2"
exam: "Exam ASTAM"
topic: "Increased Limits"
learning_objective: "Coverage Modifications"
difficulty: easy
type: multi-part
year: 2024
session: Fall
wiki_link:
  - Concepts/Deductible
  - Concepts/Increased+Limits
  - Concepts/Policy+Limit
  - Concepts/Coverage+Modifications
points: 7
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:c69f35b5899acf157a80691c2723e7cf16be55a25dc995f19d8fedc3b2d7c34d
  sources:
    - "SOA Exam ASTAM Fall 2024, question booklet, Q2, p.4, sha256:c7e45ae70452fc50709e1721f3b9242de1e2af1ac0afc1cc29cf0449fb683f94 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/exams/2024-fall-astam-exam.pdf"
    - "SOA ASTAM October 2024 Model Solutions, Q2, pp.2-3, sha256:f1aa2ecb9f29f00351447712a247f5ac19c2cff2bd2d69a892e6eeb5854c9f8e — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/fall-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2024f-q2.md
---

## Part a (3 points)

ABC insurance sells automobile collision coverage with ordinary deductibles of 250, 500, and 1,000. The base rate is based on a deductible of 500.

You are given the following data:

| Loss Size | Number of Losses | Ground Up Total Loss |
|---|---|---|
| 0 – 250 | 1,000 | 150,000 |
| 251 – 500 | 2,000 | 650,000 |
| 501 – 1,000 | 6,000 | 4,320,000 |
| Over 1,000 | 20,000 | 90,000,000 |
| **All** | **29,000** | **95,120,000** |

(i) Calculate the indicated deductible relativity for the deductible of 250.

(ii) Calculate the indicated deductible relativity for the deductible of 1,000.

(iii) Explain why the ground-up loss severity distribution might differ for different deductible levels.

### Explanation
In 000's, the payouts under the different deductibles are

$$\begin{align*}
D = 250: &\quad (95{,}120 - 150) - (20{,}000 + 6{,}000 + 2{,}000)(0.25) = 87{,}970 \\
D = 500: &\quad (90{,}000 + 4{,}320) - (20{,}000 + 6{,}000)(0.50) = 81{,}320 \\
D = 1000: &\quad 90{,}000 - 20{,}000(1.0) = 70{,}000
\end{align*}$$

(i) The deductible relativity of 250:500 is

$$\frac{87{,}970}{81{,}320} = 1.082$$

(ii) The deductible relativity of 1000:500 is

$$\frac{70{,}000}{81{,}320} = 0.861$$

(iii) Different deductible levels are likely associated with different wealth levels – wealthier policyholders will tend to self-insure to a higher level than less wealthy policyholders. Wealthy policyholders also tend to have higher ground up losses as they drive more expensive cars, and hence the collision coverage would tend to be more expensive.

### Examiner Report
Overall, this question was very poorly done. Mathematically, this question was pretty simple. Candidates may have been expecting higher difficulty, thus they appeared to be overthinking the question

Many mistakes were likely made due to hasty reading and interpreting of the question and table. Spending a few extra minutes to read and understand the table would result in fewer minor mistakes.

There was some confusion with the table buckets and interpretation of the data.

## Part b (2 points)

ABC also sells liability insurance with limits of 250,000, 1,000,000, and 5,000,000. The base rate is based on a limit of 250,000.

You are given the following data:

| Size of Loss | Number of Claims | Ground Up Total Losses (in Millions) |
|---|---|---|
| 1 – 250,000 | 1,200 | 180.00 |
| 250,001 – 1,000,000 | 850 | 361.25 |
| 1,000,001 – 5,000,000 | 150 | 187.50 |
| **All** | **2,200** | **728.75** |

(i) Calculate the increased limit factor (ILF) for the limit of 1,000,000.

(ii) Calculate the increased limit factor (ILF) for the limit of 5,000,000.

### Explanation
In millions, the payouts under the different limits are:

$$\begin{align*}
L = 0.25: &\quad 180 + 1000(0.25) = 430.00 \\
L = 1.0: &\quad 180 + 361.25 + 150(1) = 691.25 \\
L = 5.0: &\quad 728.75
\end{align*}$$

So the ILFs, relative to the $L = 0.25$ limit, are

(i) $L = 1.0$:

$$\frac{691.25}{430.00} = 1.608$$

(ii) $L = 5.0$:

$$\frac{728.75}{430.00} = 1.695$$

### Examiner Report
For Part B, many candidates were still thinking in terms of deductible, and did not shift to think about policy limits.

## Part c (2 points)

Describe two practical considerations regarding the data to use for determining ILFs.

### Explanation
- The insurer may not know the total amount of the claim. If the claim exceeds the upper limit, the amount above the upper limit may not be reported to the company.
- The amount of the loss may be influenced by the amount of the limit. Attorneys often sue for the amount of the limit.
- Adverse or self-selection can occur with policy limits, which means that changing the limit might also change the ground-up loss distribution.
