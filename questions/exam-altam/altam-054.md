---
id: "altam-054"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Universal Life Insurance"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Universal+Life+Insurance
  - Concepts/Profit+Testing
  - Concepts/Net+Present+Value
  - Concepts/Reserve
  - Concepts/Multiple+Decrement+Model
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e209d05d3436f96a5ccccf57d537b87c3c2da5c3e901db78a17a6478f6179d14
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-054.md
---

For Type B universal life insurances with additional death benefit 100,000 on lives age 60, you are given the following policy details:

| Policy Year $k$ | Annual Premium | Credited Interest Rate | Percent of Premium Expense Charge | Annual Expense Charge | Annual Cost of Insurance Rate per 1000 | Surrender Charge |
|---|---|---|---|---|---|---|
| 1 | 5000 | 5% | 60% | 200 | 6.00 | 600 |
| 2 | 1000 | 5% | 10% | 50 | 7.47 | 200 |
| 3 | – | – | – | – | – | 0 |

You are also given the following profit testing assumptions:

| Policy Year $k$ | Dependent Probabilities $q_{60+k-1}^{(d)}$ | Dependent Probabilities $q_{60+k-1}^{(w)}$ | Earned Interest Rate | Commissions as Percent of Premium | Other Expenses |
|---|---|---|---|---|---|
| 1 | 0.004 | 0.100 | 6% | 90% | 100 |
| 2-10 | 0.003 + 0.001$k$ | 0.050 | 6% | 5% | 10 |

Expenses are incurred at the start of each policy year. Your company uses account values as reserves. The account value at the end of year 2, for a policy in force, is 1500.

## Part a (2 points)

Show that the account value at the end of year 1, for a policy in force, is 1300 to the nearest 100. You should calculate the account value to the nearest 1.

### Explanation

$$AV_1 = \left(0.4(5000) - 200 - 0.006(100000)\,v_{5\%}\right)(1.05) = 1290.0$$

### Examiner Report

**Graders' Comments:** *A number of candidates incorrectly used information from the \`Assumptions' table in this part. It is important in UL to understand the different roles of the policy terms and conditions (used to project account values) and the valuation assumptions (used to determine profitability).*

## Part b (3 points)

Your company discounts expected profits at 12%. The expected profits for the first three years are:

| Policy Year $k$ | Expected profits at the end of the year for a policy in force at the start of the year |
|---|---|
| 1 | -1206 |
| 2 | 374 |
| 3 | 400 |

Calculate the partial Net Present Value up, to time 3, $NPV(3)$.

### Explanation

$$NPV(3) = -1206\,v_{12\%} + 374\,p_{60}^{(\tau)}\,v_{12\%}^2 + 400\,{}_{2}p_{60}^{(\tau)}\,v_{12\%}^3$$

$$p_{60}^{(\tau)} = 1 - 0.004 - 0.1 = 0.8960; \quad {}_{2}p_{60}^{(\tau)} = 0.8960(0.9450) = 0.8467$$

$$\Rightarrow NPV(3) = -568.6$$

## Part c (5 points)

Your company's pricing actuary asks you to redo the profit test using the end of year cash values as reserves, with no other changes.

- (i) (*3 points*) Calculate the revised expected profit for policy year 2, per policy in force at the start of year 2.
- (ii) (*1 point*) Explain why the expected profit in policy year 2 decreases due to this change.
- (iii) (*1 point*) State with reasons whether the total present value of profits in all years will increase, decrease, or stay the same due to this change.

(This is Question 6 from the Spring 2014 Written Answer exam.)

### Explanation

**(i)** Revised profit test table for year $t = 2$:

| ${}_{t-1}V$ | $P$ | $E$ | $I$ | $EDB$ | $ESV$ | $E_tV$ | $\Pr_t$ |
|---|---|---|---|---|---|---|---|
| 690 | 1,000 | 60 | 97.8 | 507.5 | 65 | 1,228.5 | -73.2 |

$${}_{1}V = 1290 - 600 = 690$$

$$\begin{align*}
\text{Premium},\ P &= 1000 \\
\text{Expenses},\ E &= 0.05P + 10 = 60 \\
\text{Interest},\ I &= 0.06\left(690 + 1000 - 60\right) \\
                    &= 97.80 \\
EDB &= q_{61}^{(d)} \times (100000 + AV_2) \\
    &= 507.5 \\
ESV &= q_{61}^{(w)} \times (1500 - 200) \\
    &= 65 \\
E_tV &= p_{61}^{(\tau)} \times (1500 - 200) \\
     &= 1228.5
\end{align*}$$

**(ii)** In year 2 the beginning of year reserve, brought forward with interest during year 2 is much lower using the cash value. The end year reserve is also reduced, but the change is smaller as the surrender charge is lower. Hence, the surplus emerging in year 2 decreases.

**(iii)** Overall the total present value of profits will increase, because the profits are released earlier when reserves are smaller. This increases the NPV whenever the risk discount rate is greater than the assumed earned rate.

### Examiner Report

**Graders' Comments:** *Many omitted part (c). Of the candidates who attempted it, many answered (c)(i) correctly or with a minor error (such as omitting AV<sub>2</sub> from the expected cost of death benefit).*

*Parts (c)(ii) and (iii) proved to be challenging conceptual questions. A few strong candidates correctly answered (c)(ii), and a handful correctly (and impressively) answered (c)(iii). Some candidates offered one-word answers (\`increase' or \`decrease'), which received no credit.*
