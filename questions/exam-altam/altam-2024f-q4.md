---
id: "altam-2024f-q4"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Profit Analysis"
difficulty: medium
type: multi-part
year: 2024
session: Fall
wiki_link:
  - Concepts/Profit+Testing
  - Concepts/Profit+Vector
  - Concepts/Profit+Signature
  - Concepts/Internal+Rate+of+Return
  - Concepts/Profit+Margin
points: 11
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:02eb6a4c348b951da1a32ceaba0e7bd00022006558acd0bf58f8806ee6bcf50e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2024f-q4.md
---

An insurance company sells fully discrete 2-year term life insurance policies to lives age 60. The death benefit is 1,000,000. The gross premium is 4,300.

You are given the following profit testing assumptions:

(i) Mortality follows the Standard Ultimate Mortality Model.

(ii) The precontract expense is 1000.

(iii) Commissions are 5% of the gross premium, paid at the beginning of each year.

(iv) Annual maintenance expenses are 100, paid at the beginning of each year including the first.

(v) The lapse rate is 8% of the policies in-force at the end of the first year. There is no benefit payable on lapse.

(vi) The earned interest rate is 6% per year.

(vii) The hurdle rate is 10% per year.

(viii) The insurer holds a reserve of 100 at the start of each year, including the first.

## Part a (1 point)

Describe two uses of profit testing in insurance practice.

### Explanation
- Set premium to meet a profit objective
- Set or analyze sufficiency of reserves
- Assess profit sharing mechanisms (e.g. for participating or variable insurance)
- Explore implications of changing lapse experience
- Stress testing portfolio or company-wide cashflow projections

### Examiner Report
Candidates performed well on this part and were able to successfully identify two uses of profit testing in the insurance practice. The most successful candidates listed uses other than to test profit.

## Part b (4 points)

(i) (3 points) Calculate the profit vector, $\left(\mathrm{Pr}_0, \mathrm{Pr}_1, \mathrm{Pr}_2\right)$.

(ii) (1 point) Calculate the profit signature, $\left(\Pi_0, \Pi_1, \Pi_2\right)$.

### Explanation
**(i)**

| $t$ | ${}_{t-1}V$ | $P$ | $E$ | $I$ | EDB | E ${}_tV$ | Pr |
|---|---|---|---|---|---|---|---|
| 0 | | | 1000 | | | 100 | -1100 |
| 1 | 100 | 4300 | 315 | 245.1 | 3398.2 | 91.7 | 840.2 |
| 2 | 100 | 4300 | 315 | 245.1 | 3791.6 | 0 | 538.5 |

**(ii)**

$$\Pi_0 = Pr_0 = -1100$$

$$\Pi_1 = Pr_1 = 840.2$$

$$\Pi_2 = p_{60}^{(\tau)}\,Pr_2 = (0.99660)(0.92)(538.5) = 493.7$$

### Examiner Report
In general, candidates did well on this part. Not all candidates considered the reserve of 100 in the profit calculation at time zero and adjusted the profit signature at time two for both voluntary lapse and mortality.

## Part c (3 points)

(i) Show that the net present value of the contract is 70 to the nearest 10. You should calculate the value to the nearest 0.1.

(ii) Without further calculation, state with reasons whether the internal rate of return is greater than or less than the hurdle rate.

(iii) Calculate the profit margin.

### Explanation
**(i)** The NPV is

$$-1100 + 840.2v_{10\%} + 493.7v_{10\%}^2 = 71.9$$

**(ii)** The IRR is greater than the hurdle rate; the IRR is rate at which NPV =0; NPV is a decreasing function of the hurdle rate.

**(iii)**

$$PM = \frac{NPV}{EPV\ \text{Premiums}} = \frac{71.86}{4300\,\ddot{a}_{x:\overline{2}|}} = \frac{71.86}{4300(1.83352)} = 0.91\%$$

### Examiner Report
Candidates performed well on this part. The most successful candidates knew to discount the profit signature by the hurdle rate, identified that the IRR is greater than the hurdle rate because the IRR is the rate at which the NPV equals zero, and recalled that the profit margin represents the net present value of the contract divided by the expected present value of premiums.

A common mistake was to not consider voluntary lapse in the expected present value of premiums calculation.

Candidates that carried over an error in part b were not penalized twice for that error if the approach was consistent with that prior error. Candidates that tried to show that the net present value was equal to 70 when a prior error would not lead to a net present value of 70 were penalized for this approach.

## Part d (3 points)

Your manager wants to change the gross premium to achieve a profit margin of 5%. Calculate the revised gross premium that will meet this objective.

### Explanation
Now assume unknown premium $P$:

$$
\begin{align*}
NPV &= -1100 + \left\{P(0.95)(1.06) - (3398.2 + 91.69)\right\}v_{10\%} + \left\{P(0.95)(1.06) - 3791.6\right\}v_{10\%}^2\,p_{60}^{(\tau)} \\
&= P\left(0.95(1.06)\right)\left(v_{10\%} + p_{60}^{(\tau)}v_{10\%}^2\right) - 7145.71 \\
&= 1.67851P - 7145.71
\end{align*}
$$

also, the profit margin is $pm = 0.05$

$$\Rightarrow 0.05 = \frac{NPV}{P(1.8335)} = \frac{1.67851P - 7145.71}{P(1.8335)}$$

$$\Rightarrow P\left(-0.05(1.8335) + 1.67851\right) = 7145.71$$

$$\Rightarrow P = \frac{7145.71}{1.58679} = 4503.2$$

### Examiner Report
The most successful candidates utilized the profit margin formula to solve for the gross premium to achieve a profit margin of 5%. Successful candidates identified that the net present value of the contract needed to be adjusted. Candidates that utilized goal seek or trial and error in Excel and gave a detailed description of the work they completed in Excel were given full credit or the credit demonstrated on the paper answer. The excel file is not reviewed or graded for questions 2-6.
