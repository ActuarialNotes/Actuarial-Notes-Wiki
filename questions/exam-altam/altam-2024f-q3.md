---
id: "altam-2024f-q3"
exam: "Exam ALTAM"
topic: "Traditional Unit Credit Method"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
year: 2024
session: Fall
wiki_link:
  - Concepts/Traditional+Unit+Credit+Method
  - Concepts/Defined+Benefit+Plan
  - Concepts/Actuarial+Accrued+Liability
  - Concepts/Normal+Cost
  - Concepts/Woolhouse's+Formula
  - Concepts/Joint+Life
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fe0462aa5582d93935947eced9f03411da49f215d98c35aae66bae1f1736e698
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2024f-q3.md
---

You are the actuary for a small defined benefit pension plan. You are given the following information.

(i) The plan is a career average earnings plan with an accrual rate of 2%.

(ii) The retirement benefit for each plan member is a whole life annuity payable monthly in advance from age 65.

(iii) On the death of a plan member after retirement a 75% reversionary benefit is payable to their surviving spouse for the remainder of the spouse's lifetime.

(iv) The current membership information, as of December 31, 2023, is given in the following table.

| Employee | Exact Age | Years of Service | Accrued Benefits | 2023 Salary |
|---|---|---|---|---|
| **Active Members** | | | | |
| A | 25 | 2 | 1,100 | 30,000 |
| B | 45 | 10 | 7,400 | 40,000 |
| C | 45 | 15 | 10,500 | 40,000 |
| D | 55 | 25 | 20,000 | 50,000 |
| E | 55 | 30 | 25,000 | 50,000 |
| **Retired Member** | | | | |
| F | 70 | | 25,000 | |

The valuation assumptions are as follows:

(i) There are no exits before age 65.

(ii) Each member, including the retired member, is assumed to have a spouse of the same age as the member.

(iii) Post-retirement mortality for members and their spouses follows the Standard Ultimate Mortality Model.

(iv) Members and their spouses are assumed to have independent future lifetimes.

(v) All salaries increased by 2% on January 1, 2024.

(vi) Monthly annuity values are determined using Woolhouse's 2-term approximation.

(vii) The Traditional Unit Credit funding method is used for valuing the accrued benifits and for determining the Normal Contribution.

(viii) $i = 0.05$

## Part a (1 point)

Show that $\ddot{a}^{(12)}_{65|65} = 1.9$ to the nearest 0.1. You should calculate the value to the nearest 0.0001.

### Explanation
$$
\begin{align*}
\ddot{a}^{(12)}_{65|65} &= \ddot{a}^{(12)}_{65} - \ddot{a}^{(12)}_{65:65} \\
&\approx \left(\ddot{a}_{65} - \frac{11}{24}\right) - \left(\ddot{a}_{65:65} - \frac{11}{24}\right) \\
&= \ddot{a}_{65} - \ddot{a}_{65:65} \\
&= 13.5498 - 11.6831 \\
&= 1.8667
\end{align*}
$$

### Examiner Report
Overall, the candidates did poorly on this question. It seems like this is true of every exam. There will always be one pension question on the exam. It is short sighted to not know this material.

Candidates should pay attention to pension questions and understand different defined benefit plans instead of memorizing formulas. Candidates should be able to appreciate the differences of different plans and apply right formulas to tackle the questions and be able to interpret the change in the computed result from changed assumptions.

Pension question usually has a lot of calculations. Since Excel is available, it might be a good idea to use Excel to do the calculations and write down your calculations on the paper answer sheet. Do not just write down the final answer on your answer sheet as this will receive little credit.

## Part b (3 points)

Show that the Actuarial Liability, as of January 1, 2024, is 827,000 to the nearest 1000. You should calculate the value to the nearest 1.

### Explanation
$$
\begin{align*}
AL = {} & \left(1100v^{40} + (7400 + 10{,}500)v^{20} + (20{,}000 + 25{,}000)v^{10}\right)\left(\ddot{a}^{(12)}_{65} + 0.75\,\ddot{a}^{(12)}_{65|65}\right) \\
& + 25{,}000\left(\ddot{a}^{(12)}_{70} + 0.75\,\ddot{a}^{(12)}_{70|70}\right) \\
= {} & 34{,}528.67\left(13.5498 - \frac{11}{24} + 0.75(1.8667)\right) \\
& + 25{,}000\left(12.0083 - \frac{11}{24} + 0.75(12.0083 - 9.9774)\right) \\
= {} & 34{,}528.67\left(13.0915 + 0.75(1.8667)\right) + 25{,}000\left(11.5500 + 0.75(2.0309)\right) \\
= {} & 500{,}373 + 326{,}829 = 827{,}202
\end{align*}
$$

## Part c (2 points)

Calculate the Normal Contribution for 2024 as a percentage of the total active members' salaries in 2024.

### Explanation
The increase in the accrued benefit in 2024 is $\alpha$=2% of the 2024 salary, for each active employee.

The expected value at 1/1/24 of the increase in the AL in 2024 is

$$(0.02)(1.02)\left(30{,}000v^{40} + 80{,}000v^{20} + 100{,}000v^{10}\right)\left(\ddot{a}^{(12)}_{65} + 0.75\,\ddot{a}^{(12)}_{65|65}\right) = 28{,}322.22$$

Expressed as a % of 2024 payroll, the contribution rate is

$$\frac{28{,}322.22}{(1.02)(210{,}000)} = 13.22\%$$

## Part d (3 points)

Following your valuation, the Plan Sponsor decides to improve benefits for active members as follows. The annual retirement benefit will be equal to

- 2% of 2023 salary per year of service, for service prior to January 1, 2024 plus
- 2% of all earnings after January 1, 2024.

(i) Calculate the increase in the Actuarial Liability, as of the valuation date January 1, 2024.

(ii) State with reasons whether the Normal Contribution would increase, decrease, or stay the same.

### Explanation
**(i)** The new accrued benefits are $\alpha \times n \times S_x$ where $\alpha = 0.02$ is the accrual rate, $n$ is past service, and $S_x$ is the salary in 2023, so the new accrued benefits are, by employee

- A: (0.02)(2)(30,000) = 1,200
- B: (0.02)(10)(40,000) = 8,000
- C: (0.02)(15)(40,000) = 12,000
- D: (0.02)(25)(50,000) = 25,000
- E: (0.02)(30)(50,000) = 30,000

So the new aggregate AL for active members is

$$
\begin{align*}
AL_{actives} &= \left(1200v^{40} + 20{,}000v^{20} + 55{,}000v^{10}\right)\left(\ddot{a}^{(12)}_{65} + 0.75\,\ddot{a}^{(12)}_{65|65}\right) \\
&= 41{,}473.5\left(13.0915 + 0.75(1.8667)\right) \\
&= 601{,}014
\end{align*}
$$

So the increase is $601{,}014 - 500{,}373 = 100{,}641$

**(ii)** The NC pays for EPV of the increase in the accrued benefit during the valuation year. The 2024 accruals are unchanged, so the normal contribution is unchanged.

## Part e (1 point)

Assume that the marginal post-retirement mortality of members and their spouses is unchanged, but that there is a common shock risk while both are alive. State with reasons whether the Actuarial Liability for the pension plan would increase, decrease or stay the same.

### Explanation
Under this model, the member's future lifetime distribution is the same as in the independent model, so there is no change to the EPV of their own pension.

However, the possibility of a common shock reduces the expected period of payment of spousal benefits.

Hence the AL would decrease.
