---
id: "altam-044"
exam: "Exam ALTAM"
topic: "Traditional Unit Credit Method"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Traditional+Unit+Credit+Method
  - Concepts/Projected+Unit+Credit+Method
  - Concepts/Actuarial+Accrued+Liability
  - Concepts/Normal+Cost
  - Concepts/Defined+Benefit+Plan
points: 8
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:249cf1b7f28528de5702aed8a533a364119e4a78c1386dc75a0d810cda2d3c08
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-044.md
---

You act as the valuation actuary for a corporation which sponsors a final average salary defined benefit pension plan for its employees. The age retirement benefit provisions and valuation assumptions for the corporation's plan are described below.

- The accrual rate is 2% per year of service.
- The final average salary is defined as the salary over the final year of employment.
- The Normal Form of pension is a life annuity with no guarantee, paid monthly in advance.
- The normal retirement age is 65.
- Salaries increase each year on 1 January at a rate of 2.5% per year.
- $i = 0.05$
- Mortality of active members and retirees follows the Standard Ultimate Life Table.
- There are no exits prior to retirement at age 65, other than death.
- The two-term Woolhouse formula is used for annuities paid more frequently than annually.
- The plan is funded using the Traditional Unit Credit method.

You are also given the following summary membership data, as of the valuation date, 1 January 2020.

| Age | Number of members | Status | Pension in payment | Salary per member in 2019 | Years of service per member |
|---|---|---|---|---|---|
| 35 | 20 | Active | - | 45,000 | 8 |
| 60 | 5 | Active | - | 62,000 | 25 |
| 70 | 1 | Retired | 32,000 | -- | 30 |

(This is Question 6 from the Fall 2020 Written Answer exam.)

## Part a (2 points)

Calculate the total actuarial liability for the corporation's pension plan as of the valuation date.

### Explanation

$$\begin{align*}
AL &= 20 \times 8 \times 45{,}000 \times 0.02 \times {}_{30}E_{35} \times \ddot{a}_{65}^{(12)} \\
&\quad + 5 \times 25 \times 62{,}000 \times 0.02 \times {}_{5}E_{60} \times \ddot{a}_{65}^{(12)} \\
&\quad + 32{,}000 \times \ddot{a}_{70}^{(12)}
\end{align*}$$

$$\ddot{a}_{65}^{(12)} = \ddot{a}_{65} - \frac{11}{24} = 13.0915; \quad \ddot{a}_{70}^{(12)} = 11.5500; \quad {}_{30}E_{35} = 0.21981$$

$$\begin{align*}
\Rightarrow AL &= 20 \times 20{,}719 + 5 \times 311{,}223 + 369{,}599 \\
&= 414{,}380 + 1{,}556{,}115 + 369{,}599 \\
 &= 2{,}340{,}094
\end{align*}$$

## Part b (3 points)

Calculate the normal cost for 2020, expressed as a percentage of the total payroll at the valuation date.

### Explanation

NC for age 35 group:

$$414{,}380 \times \left(1.025 \times \frac{9}{8} - 1\right) = 63{,}452$$

NC for age 60 group:

$$1{,}556{,}111 \times \left(1.025 \times \frac{26}{25} - 1\right) = 102{,}704$$

Total Salary

$$45{,}000 \times 20 \times 1.025 + 62{,}000 \times 5 \times 1.025 = 922{,}500 + 317{,}750 = 1{,}240{,}250$$

Normal Contribution Rate

$$\frac{63{,}452 + 102{,}704}{1{,}240{,}250} = 13.397\%$$

## Part c (1 point)

The corporation terminated the employment of all the 35-year-old members on the valuation date.

Calculate the revised normal contribution rate for the corporation, expressed as a percentage of the total payroll of the remaining plan members.

### Explanation

Using the numbers calculated in part (b), we have

$$NC = \frac{102{,}704}{317{,}750} = 32.32\%$$

## Part d (2 points)

Without further calculation, state whether the change in the normal contribution rate would be greater or smaller under Projected Unit Credit funding. Justify your answer.

### Explanation

Under PUC the curve of contribution rates by age is less steep, so the NC at age 60 will be closer to the NC at age 35, implying that the change will be smaller. The reason is that the PUC pre-pays for future pay increases on accrued benefits, while the TUC does not. That means that TUC NC rates at older ages must pay for the new accrued benefit, and in addition must pay to upgrade all past accruals for the most recent pay rise. This creates a very steep curve of contribution rates at older ages.

### Examiner Report

**Comment:** Candidates who used a sketch of the PUC and TUC conrribution rates to support their justification were generally given full credit (assuming the sketch was correct).
