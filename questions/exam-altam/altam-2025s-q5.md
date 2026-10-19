---
id: "altam-2025s-q5"
exam: "Exam ALTAM"
topic: "Defined Benefit Plan"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
year: 2025
session: Spring
wiki_link:
  - Concepts/Defined+Benefit+Plan
  - Concepts/Defined+Contribution+Plan
  - Concepts/Projected+Unit+Credit+Method
  - Concepts/Actuarial+Accrued+Liability
  - Concepts/Replacement+Ratio
  - Concepts/Woolhouse's+Formula
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:26287694147b58724e739d621d6db0dd6d5566a2514e9064bee9860672c6980d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2025s-q5.md
---

Jo is a member of a final average salary Defined Benefit (DB) pension plan. The annual accrual rate is 2% and the final average salary is based on the average of the previous three years' salaries.

The pension benefit is a monthly whole life annuity-due, payable from age 65. At the valuation date, December 31, 2025, Jo is age 50 and has 25 years of pensionable service.

Jo's salary will be 78,000 in 2026.

The valuation and funding basis is as follows:

- There are no decrements before age 65 other than deaths.
- Members surviving to age 65 retire immediately.
- Mortality before and after retirement follows the Standard Ultimate Mortality Model.
- There is no benefit payable on death.
- Monthly annuities are calculated using Woolhouse's 2-term formula.
- Salaries increase by 2% every January 1 starting in 2027.
- $i = 0.05$
- The Projected Unit Credit (PUC) funding method is used.

## Part a (3 points)

Show that the Actuarial Liability of Jo's pension benefits at the valuation date is 304,900 to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
The projected final average salary is

$$
\begin{align*}
FAS &= \frac{S_{62} + S_{63} + S_{64}}{3} \\
&= S_{50}\,\frac{1.02^{12} + 1.02^{13} + 1.02^{14}}{3} \\
&= 100{,}914.51
\end{align*}
$$

Then $AL = \alpha\,n\,(FAS)\;{}_{15}E_{50}\,\ddot{a}_{65}^{(12)}$

$${}_{15}E_{50} = \frac{l_{65}}{l_{50}}\,v^{15} = 0.46151$$

$$\ddot{a}_{65}^{(12)} = \ddot{a}_{65} - \frac{11}{24} = 13.0915$$

$$\Rightarrow AL = (0.02)(25)(100{,}914.5)(0.46151)(13.0915) = 304{,}858$$

### Examiner Report
Candidates did very well on this part.

## Part b (2 points)

(i) Calculate the projected monthly pension that Jo can expect to receive on retirement at age 65, including future service.

(ii) Calculate Jo's projected replacement ratio at age 65.

### Explanation
**(i)** The projected monthly pension is

$$\frac{(0.02)(40)(FAS)}{12} = \frac{80{,}731.6}{12} = 6{,}727.63$$

**(ii)** The projected replacement ratio is

$$\frac{80{,}731.6}{S_{50}(1.02)^{14}} = 78.44\%$$

### Examiner Report
This part was also done quite well, but some candidates missed the extra 15 years of service in the pension valuation.

## Part c (3 points)

Jo's employer will replace the existing DB Pension with a Defined Contribution (DC) pension plan effective January 1, 2026. The key features of the new plan are as follows:

- All members must transfer to the new DC plan.
- 12% of members' salaries are contributed into their DC accounts at the end of each year.
- In addition to the new DC plan benefits, existing members must choose one of the following options:
  - Option A: Retain their past service pension as a deferred pension payable from age 65, based on their final average salary at age 65; or
  - Option B: Have a lump sum deposited into their DC account on January 1, 2026. The lump sum would be equal to the Actuarial Liability of their past service benefits under the DB plan, based on the December 31, 2025 valuation, as calculated in (a).

You are given the following assumptions about Jo's future salary increases and investment returns.

- Jo will receive a 2% salary increase every January 1 until age 65.
- The DC account will earn interest at 6% per year.
- At age 65, Jo will immediately convert the DC account assets into a level whole life annuity-due. The assets will be converted to income using the equivalence principle, and using the valuation assumptions above.

(i) Calculate the total projected monthly pension payable to Jo including the DC part under Option A.

(ii) Calculate the total projected monthly pension payable to Jo under Option B.

### Explanation
**(i)** The monthly income from the DB part is $(0.02)(25)(FAS)/12 = 4204.77$

The accumulated DC assets under option A are:

$$
\begin{align*}
&(0.12)S_{50}\left(1.06^{14} + (1.02)(1.06^{13}) + (1.02^2)(1.06^{12}) + \ldots + 1.02^{14}\right) \\
&= (0.12)S_{50}(1.06)^{14}\left(1 + \left(\frac{1.02}{1.06}\right) + \left(\frac{1.02}{1.06}\right)^2 + \cdots + \left(\frac{1.02}{1.06}\right)^{14}\right) \\
&= (0.12)S_{50}(1.06)^{14}\left(\frac{1 - \left(\frac{1.02}{1.06}\right)^{15}}{1 - \left(\frac{1.02}{1.06}\right)}\right) \\
&= (0.12)S_{50}\left(\frac{1.06^{15} - 1.02^{15}}{1.06 - 1.02}\right) \\
&= (0.12)(78{,}000)(26.2672) \\
&= 245{,}861
\end{align*}
$$

Converting these assets to a pension gives a monthly income from the DC account of

$$\frac{245{,}861}{12\,\ddot{a}_{65}^{(12)}} = \frac{245{,}861}{157.1} = 1565.02$$

$\Rightarrow$ total projected monthly income under Option A is $4204.77 + 1565.02 = 5769.80$

**(ii)** Under Option B the projected DC assets at retirement are

$$304{,}858\left(1.06^{15}\right) + 245{,}861 = 976{,}471$$

which converts to a monthly pension of

$$\frac{976{,}471}{12\,\ddot{a}_{65}^{(12)}} = \frac{976{,}471}{157.1} = 6215.7$$

### Examiner Report
Quite a few candidates omitted this part. Good candidates understood the correct point in time at which benefits should be calculated. Many candidates were off by a single year.

## Part d (2 points)

Describe one advantage and one disadvantage for Jo of Option A compared with Option B.

### Explanation
Advantages

- The DB part of the pension carries no investment risk during the accumulation (pre-retirement) period; it is guaranteed (given FAS) as long as the employer survives. It is also increasing with salary. Under Option B all assets are vulnerable to investment risk.
- Annuitization of DC assets depends on mortality and interest rates at retirement. Under Option A at least the DB part of the income is safe from interest rate / annuity pricing risk.

Disadvantages:

- The projected income is lower than Option B;
- The DB part is vulnerable to employer default
- There is less opportunity to benefit from stronger market returns.
- No death benefit from DB part.

### Examiner Report
High performing candidates were able to recognize that Option B produced higher benefits, and recognized that as a disadvantage of Option A. Candidates need to have clear labeling of what is an advantage and which is a disadvantage, as the graders can not reward points if it is not clear.
