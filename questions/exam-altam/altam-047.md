---
id: "altam-047"
exam: "Exam ALTAM"
topic: "Defined Contribution Plan"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Defined+Contribution+Plan
  - Concepts/Replacement+Ratio
  - Concepts/Joint+Life
  - Concepts/Woolhouse's+Formula
  - Concepts/Equivalence+Principle
points: 9
---

(*9 points*) Person M enrolled in a defined contribution (DC) pension plan at age 35. Person M and their employer each contribute 6% of Person M's salary to the pension fund.

M plans for the retirement based on the following assumptions:

- M's initial salary rate is 50,000 per year.
- Salaries increase continuously at an annual rate of 2%, compounded continuously.
- Contributions are invested continuously to a fund earning a 6% per year force of interest.
- M intends to retire on their 60<sup>th</sup> birthday.

(This is Question 6 from the Fall 2021 Form B Written Answer exam.)

## Part a (2 points)

Show that M's projected DC account balance as of their 60<sup>th</sup> birthday is 425,000 to the nearest 1000. You should calculate the value to the nearest 1.

### Explanation

F: account balance

$$F = \int_0^{25} c\,S_{35+t}\,e^{\delta(25-t)}\,dt$$

$$\begin{align*}
F &= \int_0^{25} (0.12)(50{,}000)\,e^{0.02t}\,e^{0.06(25-t)}\,dt \\
&= 6000\,e^{0.06(25)}\left(\frac{1 - e^{-0.04(25)}}{0.04}\right) \\
&= 424{,}945.17
\end{align*}$$

### Examiner Report

*Graders' Comments:* Some candidates treated the salary as an annual lump sum. Also, some confused the projection of the salary between enrollment and payment, with the accumulation from payment until retirement.

## Part b (2 points)

Assume first that, on retirement, M elects to receive a monthly life annuity with a 10-year guarantee. Annuities are priced using the equivalence principle, based on the following assumptions:

- Mortality follows the Standard Ultimate Life Table.
- The annual effective interest rate is $i = 0.05$.
- Woolhouse's two term formula.

(i) Calculate M's projected monthly income in retirement.

(ii) Estimate M's projected Replacement Ratio.

### Explanation

**(i)** X: monthly income

$$\begin{align*}
424{,}945.17 &= 12X\left(\ddot{a}_{\overline{10|}}^{(12)} + {}_{10}E_{60}\,\ddot{a}_{70}^{(12)}\right) \\
&= 12X\left[7.92949 + (0.57864)\left(12.0083 - \frac{11}{24}\right)\right] \\
&= 12X\,[7.92949 + (0.57864)(11.54997)] \\
&= 12X\,(14.61276)
\end{align*}$$

$$\ddot{a}_{\overline{10|}}^{(12)} = \frac{1 - v^{10}}{d^{(12)}} = \frac{1 - 1.05^{-10}}{0.04869} = 7.92949$$

$$\Rightarrow X = 424{,}945.17/[(12)(14.61276)] = 2423.37$$

**(ii)** Final 1-year salary is

$$\int_{24}^{25} (50{,}000)\,e^{0.02t}\,dt = 81{,}617.17$$

$$R = \frac{\text{Pension income in year post retirement}}{\text{Salary in year prior to retirement}} = \frac{29{,}080.42}{81{,}617.17} = 0.3563$$

R=35.63%

### Examiner Report

*Graders' Comments:* Common mistakes were using UDD instead of Woolhouse to calculate the monthly annuity or using an annual annuity factor. Additionally, the replacement ratio compares the first year in retirement to the last year in employment. Many candidates used the rate of salary instead of the salary during the last year.

## Part c (2 points)

M's spouse, C, is also 60. M and C have independent future lifetimes. When they reach age 60, M's DC account has accumulated to 750,000, after several years of high investment returns.

Assume that M elects to receive a monthly pension payable while both M and C survive, with a 2/3 survivor's benefit payable after the first death, with no guarantee period. Show that the monthly benefit is 4,200 rounded to the nearest 100. You should calculate the value to the nearest 1.

### Explanation

$$\begin{align*}
750{,}000 &= 12X\left(\ddot{a}_{60:60}^{(12)} + \frac{2}{3}\left(\ddot{a}_{\overline{60:60}}^{(12)} - \ddot{a}_{60:60}^{(12)}\right)\right) \\
&= 12X\left(\ddot{a}_{60:60}^{(12)} + \frac{2}{3}\left(\left(2\ddot{a}_{60}^{(12)} - \ddot{a}_{60:60}^{(12)}\right) - \ddot{a}_{60:60}^{(12)}\right)\right) \\
&= 12X\left(\frac{4}{3}\ddot{a}_{60}^{(12)} - \frac{1}{3}\ddot{a}_{60:60}^{(12)}\right) \\
&= 12X\left(\frac{4}{3}\left(\ddot{a}_{60} - \frac{11}{24}\right) - \frac{1}{3}\left(\ddot{a}_{60:60} - \frac{11}{24}\right)\right) \\
&= 12X\left(\frac{4}{3}\left(14.9041 - \frac{11}{24}\right) - \frac{1}{3}\left(13.2497 - \frac{11}{24}\right)\right) \\
&= 12X\,(14.9972)
\end{align*}$$

X=4167.44

### Examiner Report

*Graders' Comments:* There were many ways to calculate the annuity values in this part, but many candidates are not comfortable with annuities whose payment depends on a two-life status.

## Part d (1 point)

Person M is also eligible for a Government Pension Plan (GPP) which will provide a benefit of 1000 per month starting at age 65, payable during M's lifetime and with a 50% benefit payable to C after M's death.

Calculate the monthly benefit payable from M's entitlements from both the DC pension plan and GPP eight years after M's retirement under each of the following states:

- (i) M and C survive.
- (ii) Only M survives.
- (iii) Only C survives.

### Explanation

- (i) (1) (4167.44) + 1000 = 5167.44
- (ii) (2/3)(4167.44) + 1000 = 3778.29
- (iii) (2/3)(4167.44) + 500 = 3278.29

## Part e (2 points)

M elects to receive an integrated pension which will start at $X$ per month at age 60 and will reduce to $X$–1000 per month at age 65, so as to provide a level benefit before and after the start of M's GPP benefit, assuming M survives to age 65.

Calculate $X$, assuming the 2/3 survivor pension option.

### Explanation

$$\begin{align*}
750{,}000 &= 12X\left(\frac{4}{3}\ddot{a}_{60}^{(12)} - \frac{1}{3}\ddot{a}_{60:60}^{(12)}\right) \\
&\quad - 12\,(1000)\left(\frac{4}{3}\ddot{a}_{65}^{(12)} - \frac{1}{3}\ddot{a}_{65:65}^{(12)}\right){}_{5}E_{60:60} \qquad \text{(i.e. both alive at 65)} \\
&\quad - 12\,(1000)\,2\left(\frac{2}{3}\ddot{a}_{65}^{(12)}\right){}_{5}E_{60}\,({}_{5}q_{60}) \qquad \text{(i.e. only one alive)}
\end{align*}$$

where $\frac{4}{3}\ddot{a}_{60}^{(12)} - \frac{1}{3}\ddot{a}_{60:60}^{(12)} = 14.9972$ from part c).

$$\begin{align*}
750{,}000 &= 12X\,(14.9972) \\
&\quad - 12\,(1000)\left(\frac{4}{3}\left(13.5498 - \frac{11}{24}\right) - \frac{1}{3}\left(11.6831 - \frac{11}{24}\right)\right)(0.75057) \\
&\quad - 12\,(1000)\,2\left(\frac{2}{3}\left(13.5498 - \frac{11}{24}\right)\right)(0.76687)(0.02126) \\
&= 12X\,(14.9972) - 123{,}516.35 - 3414.95
\end{align*}$$

$$\Rightarrow X = 4872.74$$

$$\begin{align*}
{}_{5}E_{60:60} &= ({}_{5}E_{60})^2(1+i)^5 \\
                &= (0.76687)^2(1.05)^5 \\
                &= 0.75057 \\
{}_{5}E_{60:60} &= v^5({}_{5}p_{60})^2 \\
                &= (1.05)^{-5}\left(\frac{94{,}579.7}{96{,}634.1}\right)^2 \\
                &= (1.05)^{-5}(0.97874)^2 \\
                &= 0.75057
\end{align*}$$

$${}_{5}q_{60} = 1 - {}_{5}p_{60} = 1 - \frac{94{,}579.7}{96{,}634.1} = 1 - 0.97874 = 0.02126$$

### Examiner Report

*Graders' Comments:* Few attempted this part and very few got it right. The key is to consider all the possible outcomes when the couple (jointly or singly) reaches 65..
