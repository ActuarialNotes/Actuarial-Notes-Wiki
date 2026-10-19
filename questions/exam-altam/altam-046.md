---
id: "altam-046"
exam: "Exam ALTAM"
topic: "Traditional Unit Credit Method"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Traditional+Unit+Credit+Method
  - Concepts/Service+Table
  - Concepts/Actuarial+Accrued+Liability
  - Concepts/Normal+Cost
  - Concepts/Joint+Life
  - Concepts/Fractional+Age+Assumption
points: 9
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:aae2b9846913e7ef4535c6a811b398649f3077de3a2a399c50593ac6d0218c50
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-046.md
---

A person (J), who is 57, is a member of a final average salary defined benefit pension plan. The person has 35 years service. You are given the following information. The person's salary was 100,000 last year and this year.

- The accrual rate is 1.8%
- The pension is payable monthly to the plan member from age 65, with a 100% survivor pension paid to the member's partner after the member's death, provided this occurs after age 65.
- There is no benefit on death after withdrawal before age 65.
- The final average salary is the average of the final 2-year's salary before exit.
- Salaries are expected to be frozen for the next year.
- The person's partner (M) is also 57.

You are also given the following valuation assumptions and information:

- (i) Decrements follow the Standard Service Table
- (ii) $i = 0.05$
- (iii) Mortality after exit follows the Standard Ultimate Life Table.
- (iv) Withdrawals occur 1/2 way through the year.
- (v) J and M have independent future lifetimes.
- (vi) $\ddot{a}_{65}^{(12)} = 13.0870$; $\ddot{a}_{65:65}^{(12)} = 11.2158$
- (vii) Uniform distribution of deaths between integer ages for all other fractional age calculations.
- (viii) $a_x^w$ represents the value on withdrawal at age $x$ of an annuity of 1 per year paid monthly in advance from age 65, including the survivor's benefit.
- (ix) $a_{58.5}^w = 10.5804$; $a_{59.5}^w = 11.1456$
- (x) The valuation uses the traditional unit credit funding method.

(This is Question 6 from the Fall 2021 Form A Written Answer exam.)

## Part a (2 points)

- (i) Show that, under the Standard Ultimate Life Table, ${}_{7.5}E_{57.5:57.5} = 0.655$ to the nearest 0.001. You should calculate the value to the nearest 0.0001.
- (ii) Show that $a_{57.5}^w = 10.05$ to the nearest 0.01. You should calculate the value to the nearest 0.001.

### Explanation

**(i)**

$$\begin{align*}
{}_{7.5}E_{57.5:57.5} &= v^{7.5}\left({}_{7.5}p_{57.5}\right)^2 \\
&= v^{7.5}\left(\frac{l_{65}}{l_{57.5}}\right)^2 \\
&= 1.05^{-7.5}\left(\frac{94{,}579.7}{(0.5)(97{,}435.2 + 97{,}195.6)}\right)^2 \\
&= 0.6551081
\end{align*}$$

**(ii)**

$$\begin{align*}
a_{57.5}^w &= v\,\frac{l_{58.5}}{l_{57.5}}\,a_{58.5}^w \\
&= \frac{1}{1.05}\,\frac{(0.5)(97{,}195.6 + 96{,}929.6)}{(0.5)(97{,}435.2 + 97{,}195.6)}\,(10.5804) \\
&= 10.050395
\end{align*}$$

Alternatively,

$$\begin{align*}
a_{57.5}^w &= {}_{7.5}E_{57.5:57.5}\,\ddot{a}_{65:65}^{(12)} + {}_{7.5}E_{57.5}\left(1 - {}_{7.5}p_{57.5}\right)\ddot{a}_{65}^{(12)} \\
&= {}_{7.5}E_{57.5}\,\ddot{a}_{65}^{(12)} + {}_{7.5}E_{57.5:57.5}\left(\ddot{a}_{65}^{(12)} - \ddot{a}_{65:65}^{(12)}\right) \\
&= (0.674057)(13.0807) + (0.6551081)(13.0870 - 11.2158) \\
&= 8.8213838 + 1.0258383 \\
&= 10.04722
\end{align*}$$

where

$${}_{7.5}E_{57.5} = 1.05^{-7.5}\left(\frac{94{,}579.7}{(0.5)(97{,}435.2 + 97{,}195.6)}\right) = 0.674057$$

### Examiner Report

*Graders' Comments:* Candidates generally did well on part (i) but struggled with part (ii). Common errors were misapplied recursive annuity formula and using an annuity-due instead of an annuity-immediate. The annuity is deferred to age 65 so there is a payment at t=0.

## Part b (3 points)

Show that the actuarial liability for the withdrawal benefit is 36,000 to the nearest 1000. You should calculate the value to the nearest 1.

### Explanation

$$\begin{align*}
AL &= (0.018)(35)(100{,}000)\left\{\frac{w_{57}}{l_{57}}\,v^{0.5}\,a_{57.5}^w + \frac{w_{58}}{l_{57}}\,v^{1.5}\,a_{58.5}^w + \frac{w_{59}}{l_{57}}\,v^{2.5}\,a_{59.5}^w\right\} \\
&= (63{,}000)\left\{\frac{1976}{99{,}960.2}\,1.05^{-0.5}(10.04722) + \frac{1929.9}{99{,}960.2}\,1.05^{-1.5}(10.5804) + \frac{1884.3}{99{,}960.2}\,1.05^{-2.5}(11.1456)\right\} \\
&= (63{,}000)\{0.193825 + 0.1898566 + 0.1859744\} \\
&= 35{,}888.33
\end{align*}$$

### Examiner Report

*Graders' Comments:* In general, if candidates applied first principles to the contingent benefit they did well. Trying to shoehorn memorized formulas did not work well. Some candidates applied mortality decrements from SULT instead of retirement decrements from Standard Service Table, and many candidates missed that there were 3 possible withdrawal ages.

## Part c (2 points)

Calculate the normal contribution for the withdrawal benefit.

### Explanation

$$\begin{align*}
NC &= (0.018)(100{,}000)\left\{(0.5)\,\frac{w_{57}}{l_{57}}\,v^{0.5}\,a_{57.5}^w + \frac{w_{58}}{l_{57}}\,v^{1.5}\,a_{58.5}^w + \frac{w_{59}}{l_{57}}\,v^{2.5}\,a_{59.5}^w\right\} \\
&= (1{,}800)\{(0.5)(0.193825) + 0.1898566 + 0.1859744\} \\
&= 850.94
\end{align*}$$

Or

$$\begin{align*}
NC &= v\,p_{57}\,AL_1 + EPV(\text{mid-year-exits}) - AL_0 \\
&= 24{,}353.85 + 12{,}35.46 - 35{,}888.33 \\
&= 850.94
\end{align*}$$

$$\begin{align*}
v\,p_{57}\,AL_1 &= (36)(0.018)(100{,}000)\left\{\left(\frac{w_{58}}{l_{57}}\right)v^{1.5}\,a_{58.5}^w + \left(\frac{w_{59}}{l_{57}}\right)v^{2.5}\,a_{59.5}^w\right\} \\
&= (64{,}800)\{0.1898566 + 0.185974\} \\
&= 24{,}353.85
\end{align*}$$

$$\begin{align*}
EPV(\text{mid-year-exits}) &= (35.5)(0.018)(100{,}000)\left(\frac{w_{57}}{l_{57}}\right)v^{0.5}\,a_{57.5}^w \\
&= (63{,}900)(0.193825) \\
&= 12{,}385.46
\end{align*}$$

### Examiner Report

*Graders' Comments:* Many candidates tried to use the PUC shortcut formula for a TUC plan. Those who used the TUC shortcut did not allow for the benefit being contingent on withdrawal.

## Part d (2 points)

Person J withdraws at age 57.5 and immediately gets divorced. Under the divorce settlement, Person M will receive a pension of $X/3$ for life from age 65, and Person J will receive a pension of $X$ for life from age 65. The value of the settlement is equal to the value of the joint and last survivor pension payable had the couple not divorced.

Calculate $X$.

### Explanation

Value of settlement pre-divorce:

$$(0.018)(35.5)(100{,}000)\,a_{57.5}^w = (63{,}900)(10.04722) = 642{,}017.36$$

Value of settlement post-divorce:

$${}_{7.5}E_{57.5}\,\ddot{a}_{65}^{(12)}\,X + {}_{7.5}E_{57.5}\,\ddot{a}_{65}^{(12)}\,\frac{X}{3} = (0.674057)(13.0870)\,\frac{4X}{3} = 11.761845\,X$$

For the two values to be equal, $X = 54{,}584.75$
