---
id: "altam-041"
exam: "Exam ALTAM"
topic: "Defined Benefit Plan"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Defined+Benefit+Plan
  - Concepts/Woolhouse's+Formula
  - Concepts/Internal+Rate+of+Return
  - Concepts/Adverse+Selection
  - Concepts/Salary+Scale
  - Concepts/Life+Annuity
points: 10
---

A corporation offers its employees a Final Salary Defined Benefit pension with an accrual rate of 2% per year of service. The Final Pensionable Salary is the salary earned in the final year of employment. The pension is paid as a single life monthly annuity-due with a 10-year guarantee.

Employees contribute 6% of pay at the end of each month throughout their period of employment.

An employee of the corporation is about to retire at age 65. The employee was hired at age 30 and has worked continuously since then. Their starting salary was 40,000 per year.

You are given the following additional information:

(i) Salaries increase monthly at a rate of 3.6% per year compounded monthly.

(ii) The two term Woolhouse Formula is used for valuing the retirement pension.

(iii) Mortality is assumed to follow the Standard Ultimate Life Table.

(iv) The valuation interest rate is 5%.

(v) Members have the option of taking a lump sum at retirement equal to the expected present value of their retirement pension, using the valuation assumptions.

(This is Question 6 from the Fall 2018 Written Answer exam.)

## Part a (2 points)

Show that the employee's monthly pension is 8050 to the nearest 10. You should calculate the value to the nearest 0.1.

### Explanation
$$S_{64} = 40{,}000\left(1 + \frac{0.036}{12}\right)^{(64-30)(12)}\,s^{(12)}_{\overline{1}|\,i=1.003^{12}-1} = 138{,}044.47$$

The monthly pension, $B$, is:

$$B = (0.02)(35)S_{64}/12 = 8052.594$$

### Examiner Report
*Graders' Comments:* Many candidates did well on this part, especially those who drew a timeline to show the increasing monthly earnings. For those who did not receive full credit, the most common error was to calculate the final year salary, $S_{64}$, incorrectly, for which a small deduction was applied.

## Part b (2 points)

Calculate the expected present value of the employee's retirement pension at age 65.

### Explanation
$$EPV = (0.02)(35)S_{64}\,\ddot{a}^{(12)}_{\overline{65:\overline{10}|}} = (0.02)(35)(138{,}044.47)(13.38208) = 1{,}293{,}125.93$$

where

$$
\begin{align*}
\ddot{a}^{(12)}_{\overline{65:\overline{10}|}} &= \ddot{a}^{(12)}_{\overline{10}|} + {}_{10}E_{65}\,\ddot{a}^{(12)}_{75} \\
                                               &= \ddot{a}^{(12)}_{\overline{10}|} + {}_{10}E_{65}\left(\ddot{a}_{75} - 11/24\right) \\
&= \left(\frac{1 - 1.05^{-10}}{12\left(1 - 1.05^{-1/12}\right)}\right) + (0.55305)(10.3178 - 11/24) \\
 &= 13.38208
\end{align*}
$$

### Examiner Report
*Graders' Comments:* Common errors included calculating the EPV at the wrong date, using annual payments, incorrectly calculating the EPV of the 10-year guaranteed annuity and using UDD instead of the Woolhouse formula.

## Part c (2 points)

Show that the accumulated value of the employee's contributions at retirement, assuming interest of 9.6% per year compounded monthly, is 995,500 to the nearest 100. You should calculate the value to the nearest 10.

### Explanation
The accumulated value of contributions, $AV$, is

$$
\begin{align*}
AV &= (0.06)\left(\frac{40{,}000}{12}\right) \times \left[1.008^{419} + (1.003)\left(1.008^{418}\right) + \cdots + \left(1.003^{419}\right)\left(1.008^0\right)\right] \\
&= 200\left[\left(1.008^{419}\right)\left(\frac{1 - \left(\frac{1.003}{1.008}\right)^{420}}{1 - \left(\frac{1.003}{1.008}\right)}\right)\right] \\
 &= (200)(28.181425)(176.627679) \\
&= 995{,}523.94
\end{align*}
$$

### Examiner Report
*Graders' Comments:* Most candidates found this challenging. Those who used a timeline to show the contribution amounts found it helpful in answering this part.

## Part d (1 point)

Assume that the employee takes the lump sum option. State with reasons whether the internal rate of return (IRR) that the employee has earned on their contributions is more than or less than 9.6% per year compounded monthly.

### Explanation
Since the lump sum of 1,293,126 is larger than the value of contributions at 9.6% (995,524), the IRR that earned by taking the lump sum is more than 9.6% convertible monthly.

### Examiner Report
*Graders' Comments:* Many candidates tried to answer the question in general terms instead of comparing the options using the results from parts b) and c).

## Part e (1 point)

Employees have the option to take a higher monthly pension at retirement without a guarantee period. The revised benefit has the same expected present value at age 65 as the standard benefit.

Calculate the revised monthly payment.

### Explanation
The revised monthly benefit, $B^*$, is such that

$$EPV = 1{,}293{,}125.93 = \left(12B^*\right)\ddot{a}^{(12)}_{65} = \left(12B^*\right)\left(\ddot{a}_{65} - 11/24\right)$$

$$B^* = \frac{1{,}293{,}125.93}{12\left(13.5498 - \frac{11}{24}\right)} = 8{,}231.35$$

### Examiner Report
*Graders' Comments:* The candidates who attempted this part did well. Some candidates used the AV of contributions instead of the EPV of benefits, for which no credit was given.

## Part f (2 points)

(i) Define adverse selection.

(ii) Explain how adverse selection might impact the pension plan's costs based on the employees' selection of annuity with guarantee, annuity without guarantee, and lump sum.

### Explanation
(i) Adverse selection in insurance refers to a situation where a policyholder makes a decision based on asymmetric information about the risk, i.e. information known to the policyholder but unknown to the insurer. Policyholders who represent higher risk tend to buy more insurance.

Here, adverse selection would occur whenever an employee would choose the most advantageous option at the time of retirement based on his/her health and other risk factors unknown to the pension plan sponsor.

(ii) Adverse selection is likely to <u>increase the cost</u> to the plan. The healthiest employees mostly choosing the life annuity and those in poor health choosing the lump sum.

### Examiner Report
*Graders' Comments:* Well-prepared candidates provided a coherent rationale as to why the costs to the plan would increase due to adverse selection. The candidates who discussed the pricing issues rather than the impact on the plan's costs received no credit for part (ii).
