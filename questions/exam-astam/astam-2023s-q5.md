---
id: "astam-2023s-q5"
exam: "Exam ASTAM"
topic: "Classification Ratemaking"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: medium
type: multi-part
year: 2023
session: Spring
wiki_link:
  - Concepts/Classification+Ratemaking
  - Concepts/Loss+Ratio+Method
  - Concepts/Balancing+Back
  - Concepts/Rate+Change
  - Concepts/Territory+Ratemaking
points: 7
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bcaf2fef3422d08f2a1c5c4618ad85543cf88f6ac0525cbb51d8b5b17e1b4cee
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2023s-q5.md
---

You are conducting a ratemaking analysis for a line of business that is sold in only two geographical areas, Territory A and Territory B.

You are given the following information:

(i) The current base rate for Territory A and Age Group 1 is 200.

(ii) Age Group differentials will not change.

| Territory | Age Group | Calendar Year 2022 Earned Exposures | Accident Year 2022 Losses as of December 31, 2022 |
|---|---|---|---|
| A | 1 | 5,000 | 600,000 |
| A | 2 | 2,200 | 242,000 |
| B | 1 | 3,100 | 434,000 |
| B | 2 | 1,300 | 169,000 |

| Territory | Current Differential |
|---|---|
| A | 1.00 |
| B | 1.20 |

| Age Group | Current Differential |
|---|---|
| 1 | 1.00 |
| 2 | 0.95 |

## Part a (2 points)

Show that the new differential for Territory B is 1.17 to the nearest 0.01, using the loss ratio method. You should calculate the value to the nearest 0.001.

### Explanation
Premium income in 2022 for Territory A:

$$
5000 \times 200 + 2200 \times 200 \times 0.95 = 1{,}418{,}000.
$$

Premium income in 2022 for Territory B:

$$
3100(200)(1.2) + 1300(200)(1.2)(0.95) = 1{,}040{,}400.
$$

So, the loss ratios at current rates for Territories A and B are

$$
\begin{align*}
\text{A: } & 842{,}000 / 1{,}418{,}000 = 0.5938 \\
\text{B: } & 603{,}000 / 1{,}040{,}400 = 0.5796
\end{align*}
$$

The new differential for B is $1.20 \times \dfrac{0.5796}{0.5938} = 1.1713.$

### Examiner Report
Overall, this question proved more challenging than expected, with the lowest average score of all the questions.

Many candidates omitted the question, or made a very brief attempt at one or two parts.

In part (a) , many candidates did not allow for the age differentials within each territory

## Part b (1 point)

State why losses do not need to be developed to ultimate values when calculating indicated differentials in part (a).

### Explanation
We assume that loss developments continue in the same ratio for both territories, so that using the fully developed data to calculate the new differential would give the same result.

### Examiner Report
Few candidates provided a coherent explanation for (b).

## Part c (2 points)

The company has decided to implement the following new territory differentials:

| Territory | New Differential |
|---|---|
| A | 1.00 |
| B | 1.15 |

Calculate the new Territory A, Age Group 1 base rate needed to give an overall rate increase of 7%.

### Explanation
Let $B$ = new base rate:

$$
\begin{align*}
B\big(5000 + (0.95)(2200) + 1.15(3100) + (1.15)(0.95)(1300)\big) &= (1.07)\big(1{,}418{,}000 + 1{,}040{,}400\big) \\
\Rightarrow B = \frac{2{,}630{,}488}{12{,}292.0} &= 217.84
\end{align*}
$$

### Examiner Report
Part (c) was done well by those who attempted it, with most achieving maximum credit. However, it is not sufficient for candidates to memorize algorithms or formulas, they are also expected to know the assumptions or theory behind the formulas.

## Part d (2 points)

- (i) Calculate the percentage increase in premiums in Territory B.
- (ii) State with reasons whether you would expect the proportion of policies sold in Territory A to increase, decrease, or stay the same, as a result of the rate changes.

### Explanation
**(i)** The territory B premiums will increase by

$$
\frac{217.84}{200.00} \times \frac{1.15}{1.20} - 1 = 4.36\%
$$

**(ii)** The Territory A premiums will increase by $\dfrac{217.84}{200.00} - 1 = 8.92\%$.

We would therefore expect more attrition from Territory A policyholders, than Territory B, and possibly more new business from Territory B, if the revised differential results in a more competitive premium in that region. Both factors imply that the Territory A proportion would be expected to decrease.

### Examiner Report
Part (d)(i) was done well by those who attempted it, but few candidates understood the implications of the changes tested in (d)(ii).
