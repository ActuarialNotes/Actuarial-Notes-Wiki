---
id: "altam-042"
exam: "Exam ALTAM"
topic: "Traditional Unit Credit Method"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Traditional+Unit+Credit+Method
  - Concepts/Actuarial+Accrued+Liability
  - Concepts/Normal+Cost
  - Concepts/Service+Table
  - Concepts/Defined+Benefit+Plan
points: 5
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b93fbebbca0aa2bdec9566a0333c2fe2a64a0cff085a55f6e8503f7f07d06d06
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-042.md
---

Person D is a member of a pension plan that offers an annual retirement pension of 2% of the member's career average earnings for each year of service.

At the valuation date, D is exactly 63 years old, has 30 years of service, and their total past earnings are 2,500,000. D's salary in the year following the valuation date will be 160,000 if they work for the full year, and are paid in level monthly payments.

You are given:

(i) The pension is paid as a monthly life annuity-due.

(ii) Members can retire at any time after age 60 without actuarial reduction of benefits.

(iii) There are no benefits other than the age retirement pension.

(iv) The Traditional Unit Credit approach is used for valuation and funding.

(v) The valuation uses the Standard Service Table.

(vi) All lives retiring before age 65 are assumed to exit exactly half-way through the year of age.

(vii) Mortality after retirement follows the Standard Ultimate Life Table with Uniform Distribution of Deaths.

(viii) $i = 0.05$

(ix) $\ddot{a}^{(12)}_{63.5} = 13.514, \quad \ddot{a}^{(12)}_{64.5} = 13.231, \quad \ddot{a}^{(12)}_{65} = 13.086$

(This is Question 3 from the Spring 2019 Written Answer exam.)

## Part a (2 points)

Show that the Actuarial Liability for D is 595,000 to the nearest 1000. You should calculate the value to the nearest 1.

### Explanation
$${}_0V = AL_0 = (TPE)_{63}\cdot\alpha\cdot\left(\frac{r_{63}}{l_{63}}\,v^{0.5}\,\ddot{a}^{(12)}_{63.5} + \frac{r_{64}}{l_{63}}\,v^{1.5}\,\ddot{a}^{(12)}_{64.5} + \frac{r_{65}}{l_{63}}\,v^2\,\ddot{a}^{(12)}_{65}\right)$$

$$
\begin{align*}
AL_0 &= (2{,}500{,}000)(0.02)\left(\frac{4515.2}{47{,}579.3}(1.05)^{-0.5}(13.514) + \frac{4061.0}{47{,}579.3}(1.05)^{-1.5}(13.231) + \frac{38{,}488.3}{47{,}579.3}(1.05)^{-2}(13.086)\right) \\
&= (50{,}000)(1.251550 + 1.049600 + 9.601498) \\
 &= 595{,}132.40
\end{align*}
$$

### Examiner Report
*Graders' Comments:* Performance on this part was mixed. Candidates either did very well, earning full credit, or not at all well. The most common error was to incorrectly value the liability for mid-year exits.

## Part b (3 points)

Show that the Normal Contribution for D is 36,000 to the nearest 1000. You should calculate the value to the nearest 10.

### Explanation
$$AL_0 + NC = EPV(\text{benefits for mid-year exits}) + v\,p^{00}_{63}\,AL_1$$

where

$$
\begin{align*}
EPV(\text{benefits for mid-year exits}) &= \left((TPE)_{63} + 0.5\,s_{63}\right)\alpha\,\frac{r_{63}}{l_{63}}\,v^{0.5}\,\ddot{a}^{(12)}_{63.5} \\
&= \left(2{,}500{,}000 + (0.5)(160{,}000)\right)(0.02)(1.25155) \\
&= 64{,}579.98
\end{align*}
$$

$$AL_1 = \left((TPE)_{63} + s_{63}\right)\cdot\alpha\cdot\left(\frac{r_{64}}{l_{64}}\,v^{0.5}\,\ddot{a}^{(12)}_{64.5} + \frac{r_{65}}{l_{64}}\,v^1\,\ddot{a}^{(12)}_{65}\right)$$

$$
\begin{align*}
v\,p^{00}_{63}\,AL_1 &= \left((TPE)_{63} + s_{63}\right)\cdot\alpha\cdot\left(\frac{r_{64}}{l_{63}}\,v^{1.5}\,\ddot{a}^{(12)}_{64.5} + \frac{r_{65}}{l_{63}}\,v^2\,\ddot{a}^{(12)}_{65}\right) \\
&= (2{,}500{,}000 + 160{,}000)(0.02)(1.0496 + 9.601498) \\
 &= 566{,}638.41
\end{align*}
$$

$$NC = 64{,}579.98 + 566{,}638.41 - 595{,}132.40 = 36{,}085.99$$

Alternatively,

$$
\begin{align*}
NC &= s_{63}\cdot\alpha\cdot\left[(0.5)\,\frac{r_{63}}{l_{63}}\,v^{0.5}\ddot{a}^{(12)}_{63.5} + \frac{r_{64}}{l_{63}}\,v^{1.5}\ddot{a}^{(12)}_{64.5} + \frac{r_{65}}{l_{63}}\,v^2\ddot{a}^{(12)}_{65}\right] \\
&= (160{,}000)(0.02)\left[(0.5)(1.25155) + 1.0496 + 9.601498\right] \\
 &= 36{,}085.99
\end{align*}
$$

### Examiner Report
*Graders' Comments:* Partial credit was awarded to candidates who showed some understanding of the question by writing down some relevant formulas before evaluating them numerically.
