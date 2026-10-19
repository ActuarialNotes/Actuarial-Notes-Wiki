---
id: "altam-033"
exam: "Exam ALTAM"
topic: "Analysis of Surplus"
learning_objective: "Profit Analysis"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Analysis+of+Surplus
  - Concepts/Whole+Life+Insurance
  - Concepts/Equivalence+Principle
  - Concepts/Policy+Value
  - Concepts/Recursion
points: 10
---

A whole life insurance policy on (50) has an initial sum insured of 200,000 payable at the end of the year of death. At the beginning of each policy year after the first, the sum insured will increase by 5,000. The insured will pay level annual premiums payable for at most 20 years.

You are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) $i = 0.05$

(This is Question 1 from the Fall 2021 Form B Written Answer exam.)
(Part (a), (b) and (c) are covered by the FAM-L exam.)

## Part a (2 points)

(i) Show that $(IA)_x = A_x + v\,p_x\,(IA)_{x+1}$

(ii) Use this relationship to show that if $(IA)_{50} = 5.8255$, then $(IA)_{51} = 5.9$ rounded to the nearest 0.1. You should calculate the value to the nearest 0.001.

### Explanation
(i)

$$
\begin{align*}
(IA)_x &= v\,q_x + 2v^2\,p_x\,q_{x+1} + 3v^3\,{}_2p_x\,q_{x+2} + 4v^4\,{}_3p_x\,q_{x+3} + \ldots \\
&= v\,q_x + v^2\,p_x\,q_{x+1} + v^3\,{}_2p_x\,q_{x+2} + v^4\,{}_3p_x\,q_{x+3} + \ldots \\
&\qquad + v^2\,p_x\,q_{x+1} + 2v^3\,{}_2p_x\,q_{x+2} + 3v^4\,{}_3p_x\,q_{x+3} + \ldots \\
&= A_x + v\,p_x\left\{v\,q_{x+1} + 2v^2\,p_{x+1}\,q_{x+2} + 3v^3\,{}_2p_{x+1}\,q_{x+3} + \ldots\right\} \\
&= A_x + v\,p_x\,(IA)_{x+1}
\end{align*}
$$

(ii)

$$(IA)_{50} = A_{50} + v\,p_{50}\,(IA)_{51} = 5.8255$$

$$(IA)_{51} = \frac{5.8255 - A_{50}}{v\,p_{50}} = \frac{5.8255 - 0.18931}{0.998791/1.05} = 5.92516$$

### Examiner Report
*Graders' Comments:* Candidates did very well on this part. Where points were deducted, it was primarily from part (i) not being sufficiently rigorous.

## Part b (2 points)

Annual gross premiums are calculated using the equivalence principle based on expenses of:

- 1000 on the payment of the death benefit.
- 15% of the first premium.
- 5% of all other premiums.

Show that the annual gross premium is 5,500 to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
$$(200{,}000 + 1000)A_{50} + 5000\left((IA)_{50} - A_{50}\right) = P\left((0.95)\,\ddot{a}_{50:\overline{20}|} - 0.1\right)$$

$$(195{,}000 + 1000)A_{50} + 5000(IA)_{50} = P\left((0.95)\,\ddot{a}_{50:\overline{20}|} - 0.1\right)$$

$$37{,}104.76 + 29{,}127.5 = P\left((0.95)(12.8428) - (0.1)\right)$$

$$P = \frac{66{,}232.26}{12.10066} = 5473.44$$

### Examiner Report
*Graders' Comments:* Candidates did very well on this part with most getting full credit.

## Part c (2 points)

Show that the gross premium policy value at the end of the second policy year is 10,080 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation
Recursively,

$${}_1V = \frac{(5473.44)(0.85)(1.05) - (0.001209)(201{,}000)}{0.998791} = 4647.6$$

$${}_2V = \frac{\left[4647.6 + (5473.44)(0.95)\right](1.05) - (0.001331)(206{,}000)}{0.998669} = 10{,}078.9$$

## Part d (4 points)

You are given:

- The gross premium policy values at times 10 and 11 are ${}_{10}V^g = 63{,}208$ and ${}_{11}V^g = 71{,}217$.
- At the start of the 11th policy year, at time $t = 10$, there were 1000 identical, independent policies in force.
- During the 11th year, the experience was as follows:
  - The interest rate earned was 6%.
  - There were six deaths.
  - Expenses of 6% of premiums, plus 1100 for each death benefit, were incurred.

(i) Show that the surplus earned on the portfolio in the 11th policy year, per policy in force at the start of the year, was 160 to the nearest 10. You should calculate the value to the nearest 1.

(ii) Calculate the gain by source, in the order: (1) Interest; (2) Mortality; (3) Expenses.

### Explanation
**(i)** Total gain: using the actual experience (\*) during year 11,

$$1000\left({}_{10}V + P - e^*_{10}\right)\left(1 + i^*_{10}\right) - 1000\,q^*_{60}\left(250{,}000 + E^*_{10}\right) - 1000\,p^*_{60}\,{}_{11}V$$

$$
\begin{align*}
&= 1000(63{,}208 + 0.94(5473.44))(1.06) - 6(250{,}000 + 1100) - 994(71{,}217) \\
&= 1000\left[72{,}454.2156 - 1506.6 - 70{,}789.698\right] \\
&= 157{,}917.62
\end{align*}
$$

i.e. a gain per policy in force at 10 of 157.92

**(ii)** Gain by source:

**Gain from interest:**

Actual interest earned – expected interest earned,

$$
\begin{align*}
&1000(63{,}208 + 0.95(5473.44))(1.06) - \left[1000(63{,}208 + 0.95(5473.44))(1.05)\right] \\
&= 1000(68{,}407.768)(1.06 - 1.05) \\
&= 684{,}077.68
\end{align*}
$$

i.e. a gain from interest of 684,077.68

**Gain from mortality:**

Expected mortality cost – actual mortality cost, using the actual interest

$$\left[1000\,q_{60}(250{,}000 + E_{10}) + 1000\,p_{60}\,{}_{11}V^g\right] - \left[1000\,q^*_{60}(250{,}000 + E_{10}) - 1000\,p^*_{60}\,{}_{11}V^g\right]$$

$$
\begin{align*}
&= 852{,}898 + 70{,}975{,}004.6 - (1{,}506{,}000 + 70{,}789{,}698) \\
&= -467{,}795.37
\end{align*}
$$

i.e. a loss from mortality of 467,795.37

**Gain from expenses:**

Expected expenses – Actual expenses, valued at year end, using actual interest & mortality

$$\left(1000\left({}_{10}V^g + P - e_{10}\right)(1.06) + 1000\,q^*_{60}(250{,}000 + E_{10})\right) - \left[1000\left({}_{10}V^g + P - e^*_{10}\right)(1.06) + 1000\,q^*_{60}\left(250{,}000 + E^*_{10}\right)\right]$$

$$
\begin{align*}
&= 1000(0.05P - 0.06P)(1.06) + 1000(0.006)(251{,}000 - 251{,}100) \\
&= -58{,}618.46
\end{align*}
$$

i.e. a loss from expenses of 58,618.46

### Examiner Report
*Graders' Comments:* A common error was not doing the calculations in the order given or not incorporating some of the actual experience.
