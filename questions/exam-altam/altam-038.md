---
id: "altam-038"
exam: "Exam ALTAM"
topic: "Replacement Ratio"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Replacement+Ratio
  - Concepts/Defined+Benefit+Plan
  - Concepts/Defined+Contribution+Plan
  - Concepts/Salary+Scale
  - Concepts/Accrued+Benefit
points: 9
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9ce35d27794227dc9e387e146436d9e5804f004c16c08ed5483a55982bb3325a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-038.md
---

A company sponsors a defined benefit pension plan. Key attributes of the pension plan are:

- Benefits are payable as a single life annuity, paid at the beginning of each month.
- The annual benefit payable at age 65 is calculated as 2% of the final 3-year average salary up to 100,000 multiplied by years of service, plus 3% of the final 3-year average salary over 100,000 multiplied by years of service. The monthly benefit is the annual benefit divided by 12.
- You are given:

(i) $i = 5\%$

(ii) $A^{(12)}_{65} = 0.470$

An individual joined the company on January 1, 2009 at exact age 40. The individual is planning to retire on January 1, 2034 at age 65. The salary for 2014 is 80,000 and the individual receives annual raises of 4% each January 1.

## Part a (2 points)

Assuming the individual works until age 65, show that the monthly accrued benefit at age 65 is 8050, to the nearest 10. You should calculate the benefit to the nearest 1.

### Explanation
Let $S_x$ denote the salary in year of age $x$ to $x+1$. The projected salaries in the final three years are:

$$
\begin{align*}
S_{62} &= (80{,}000)(1.04)^{17} \\
       &= 155{,}832 \\
S_{63} &= (80{,}000)(1.04)^{18} \\
       &= 162{,}065 \\
S_{64} &= (80{,}000)(1.04)^{19} \\
       &= 168{,}548
\end{align*}
$$

$$FAS = \frac{155{,}832 + 162{,}065 + 168{,}548}{3} = 162{,}148$$

So the projected benefit per month is

$$25\left[(0.02)(100{,}000) + (0.03)(62{,}148)\right]/12 = 8050.92$$

## Part b (1 point)

Calculate the replacement ratio at age 65.

### Explanation
The Replacement Ratio (RR) is

$$\frac{(12)(8051)}{168{,}548} = 57.3\%$$

### Examiner Report
*Graders' Comments:* This part was done well. The most common error was using the final average salary instead of the final year's salary in the denominator.

## Part c (2 points)

Calculate the expected present value of the benefit at age 65.

### Explanation
The EPV is

$$EPV = (8051)(12)\,\ddot{a}^{(12)}_{65}$$

$$\ddot{a}^{(12)}_{65} = \frac{1 - A^{(12)}_{65}}{d^{(12)}} = \frac{1 - 0.470}{0.04869} = 10.885$$

$$\Rightarrow EPV = 1{,}051{,}620$$

### Examiner Report
*Graders' Comments:* Many candidates gained full credit on this part. The most common error was forgetting to multiply the monthly benefit by 12

## Part d (4 points)

In addition to accruing a benefit in the defined benefit plan, the individual will contribute a constant percentage of their annual salary to a defined contribution plan.

You are also given:

(iii) Contributions are made at the start of each year, beginning on January 1, 2014.

(iv) Contributions earn an investment return of 7% per year.

(v) The contribution balance is converted to a monthly life annuity using assumptions (i) and (ii) above.

Calculate the percentage of each year's salary that the individual needs to contribute so that their total replacement ratio is 80% at age 65.

(This is Question 2 from the Fall 2014 Written Answer exam.)

### Explanation
We require (0.8 - 0.573) = 0.227 replacement ratio for the DC plan.

The cost of adding 22.7% RR is

$$(0.227)(168{,}548)\,\ddot{a}^{(12)}_{65} = 416{,}464$$

The accumulated contributions to age 65, where $c$ is the contribution rate, are

$$
\begin{align*}
&c\,S_{45}\left((1.07)^{20} + (1.04)(1.07)^{19} + \ldots + (1.04)^{19}(1.07)\right) \\
&= c\,S_{45}\left(\frac{(1.07)^{20} - (1.04)^{20}}{1 - (1.04)/(1.07)}\right) \\
 &= (4{,}789{,}500)c
\end{align*}
$$

Equating the contributions and the benefit value gives

$$c = 8.70\%$$

### Examiner Report
*Graders' Comments:* This part was less well done, although a number of strong candidates scored full marks. The most common errors, which earned partial credit, were miscalculating the geometric series, or omitting either the 4% or 7% terms in the series.
