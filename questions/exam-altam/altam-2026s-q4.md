---
id: "altam-2026s-q4"
exam: "Exam ALTAM"
topic: "Projected Unit Credit Method"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
year: 2026
session: Spring
wiki_link:
  - Concepts/Projected+Unit+Credit+Method
  - Concepts/Normal+Cost
  - Concepts/Replacement+Ratio
  - Concepts/Defined+Benefit+Plan
  - Concepts/Defined+Contribution+Plan
  - Concepts/Hybrid+Plan
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3bb08da484a255335cd844f4f9c889811e1c229eaaf0737d562a84abd77ade1d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2026s-q4.md
---

A company has a hybrid pension plan combining a Final Average Salary Defined Benefit (DB) plan with a Defined Contribution (DC) top-up.

You are given the following plan information and valuation assumptions for a valuation at 1/1/2026.

(i) The DB accrual rate is 1.6%.

(ii) Pensions are paid monthly in advance.

(iii) Final average salary is defined as the average salary paid in the three years before retirement.

(iv) Employees have the option to contribute to a separate DC account throughout their working lives.

(v) Salaries increase at the end of each year by 2%.

(vi) Retirements before age 65 are assumed to occur midway through the year of age.

(vii) $i = 0.045$

(viii) $\ddot{a}_{64.5}^{(12)} = 13.882$ and $\ddot{a}_{65}^{(12)} = 13.723$ at $i = 0.045$

(ix) The Projected Unit Credit method is used for valuation and funding.

The following is an excerpt from the valuation service table. There are no retirements before age 64.

| $x$ | $l_x$ | $r_x$ |
|---|---|---|
| 23 | 73,804 | 0 |
| 24 | 66,696 | 0 |
| $\vdots$ | $\vdots$ | $\vdots$ |
| 63 | $\vdots$ | 0 |
| 64 | $\vdots$ | 865 |
| 65 exact | 8,203 | 8,203 |

A new employee, Jeff, joins the plan on the valuation date at age 23, with a starting salary of 80,000.

## Part a (4 points)

(i) (1 point) Show that the projected final average salary (FAS) at age 64.5 is 175,000 to the nearest 1000. You should calculate the value to the nearest 1.

(ii) (1 point) Show that the projected final average salary (FAS) at age 65 is 177,000 to the nearest 1000. You should calculate the value to the nearest 1.

(iii) (2 points) Calculate the normal contribution rate for Jeff's DB plan retirement benefits at the valuation date.

### Explanation
**(i)**

$$FAS_{64.5} = S_{23}\left(\frac{0.5(1.02)^{41} + (1.02)^{40} + (1.02)^{39} + 0.5(1.02)^{38}}{3}\right) = 174{,}934$$

**(ii)**

$$FAS_{65} = 80{,}000\left(\frac{(1.02)^{39} + (1.02)^{40} + (1.02)^{41}}{3}\right) = 176{,}666$$

**(iii)** There is no AL as Jeff is a new entrant.

The normal cost is the EPV at 1/1/2026 of the benefits that will accrue in 2026, i.e.

$$NC = \frac{\alpha}{l_{23}}\left(FAS_{64.5} \times r_{64} \times v^{41.5} \times \ddot{a}_{64.5}^{(12)} + FAS_{65} \times r_{65} \times v^{42} \times \ddot{a}_{65}^{(12)}\right)$$

$$
\begin{align*}
\Rightarrow NC &= \frac{0.016}{73{,}804}\left(174{,}934 \times 865 \times v^{41.5} \times 13.882 + 176{,}666 \times 8203 \times v^{42} \times 13.723\right) \\
&= 752.08
\end{align*}
$$

$$\Rightarrow \text{NC rate is } \frac{752.08}{80{,}000} = 0.940\%$$

### Examiner Report
1. Parts (i) and (ii) were done well.
2. Only a few candidates earned full credit for part (iii). Many thought that the NC should be 0, based on the shortcut that in some cases, NC=AL/n. In this case, AL=0 and n=0 (no past service) and so that approach will not work. This meant that candidates had to rely on first principles, i.e., using the fact that the NC pays for the EPV of the increase in the actuarial liability accruing over the next year.
3. Candidates who did understand the principle behind the NC calculation generally scored reasonably well.
4. Some lost fractional credit for not converting the NC into a rate (by dividing by salary). The Examiners again emphasize the value for candidates in re-reading the question as you work through it to avoid losing points unnecessarily.
5. One advantage of calculating the NC rate is as a reasonableness check. The rate should be low at the start of an employee's career (as we see in part (iii) above), and will rise as the employee nears retirement.

## Part b (2 points)

Show that Jeff's projected replacement rate from the DB plan if he retires at age 65 is 0.66 to the nearest 0.01. You should calculate the value to the nearest 0.001.

### Explanation
The projected RR is

$$RR_{65} = \frac{\left(FAS_{65}\right) \times 0.016 \times 42}{S_{64}}$$

where $S_{64} = 80{,}000(1.02)^{41} = 180{,}176$

$$\Rightarrow RR_{65} = \frac{118{,}720}{180{,}176} = 0.6589$$

### Examiner Report
This part was done well by candidates who attempted it.

## Part c (2.5 points)

Jeff plans to contribute 1% of his annual salary to the DC fund, and to retire at age 65. You are given the following assumptions:

(i) Jeff's contributions are made at each year end, with the last payment at age 64.

(ii) The DC account earns 8% interest per year.

(iii) At retirement, Jeff plans to annuitize the DC account value. The annuitization assumptions are the same as for the DB valuation.

Calculate Jeff's total projected replacement rate at age 65.

### Explanation
The accumulated DC account value at age 65 is projected to be

$$
\begin{align*}
& 0.01 S_{23}\left((1.08)^{41} + (1.02)(1.08)^{40} + (1.02)^2(1.08)^{39} + \cdots + (1.02)^{40}(1.08)\right) \\
&= 800(1.08)^{41}\left(1 + \left(\frac{1.02}{1.08}\right) + \left(\frac{1.02}{1.08}\right)^2 + \cdots + \left(\frac{1.02}{1.08}\right)^{40}\right) \\
&= 800(1.08)^{41}\left(\frac{1 - \left(\frac{1.02}{1.08}\right)^{41}}{1 - \left(\frac{1.02}{1.08}\right)}\right) \\
&= 305{,}428
\end{align*}
$$

This converts to an additional annual pension of

$$\frac{305{,}428}{\ddot{a}_{65}^{(12)}} = \frac{305{,}428}{13.723} = 22{,}257,$$

which gives a total projected replacement rate of

$$\frac{118{,}720 + 22{,}257}{180{,}176} = 78.24\%$$

### Examiner Report
1. This part was done well by most candidates.
2. Many candidates did the calculation in Excel. For full credit, candidates should explain that they have used Excel, and briefly describe how they did the calculation. This allows the examiners to give partial credit in the case of minor errors.
3. Full credit was also given to candidates who interpreted the question as including 42 years of contributions, rather than 41.

## Part d (1.5 points)

Describe one advantage and one disadvantage of this hybrid plan from the employee's perspective, compared with a DB plan with a higher accrual rate and an annual employee contribution of 1% of salary.

### Explanation
Advantages (one required):

- There is upside opportunity from DC top up investments – potential for higher income than the DB guarantee.
- DB plans have low value for early leavers. The DC top-up will likely provide a better benefit for early leavers.
- There is contribution flexibility in the DC top up - the plan member can skip, reduce, or increase contributions.
- If the DB plan defaults or closes early, the DC top-up funds should be secure.

Disadvantages (one required):

- The DB benefit is guaranteed (as long as the plan does not default). The DC investments could do badly. A higher guaranteed benefit provides better retirement security.

### Examiner Report
1. Many candidates answered this part well.
2. Some candidates failed to take the employee's perspective, as specified in the question, and others offered generic comments on the comparison between DB and DC plans, which didn't fully address the specific question, i.e. a comparison of a hybrid plan vs DB with higher accrual rate.
