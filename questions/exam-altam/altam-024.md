---
id: "altam-024"
exam: "Exam ALTAM"
topic: "Joint Life"
learning_objective: "Joint Life Insurance and Annuities"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Joint+Life
  - Concepts/Equivalence+Principle
  - Concepts/Insurance+Premium
  - Concepts/Random+Variable
  - Concepts/Life+Insurance
points: 7
---

ABC Insurance issues a 10-year endowment insurance policy to Person A who is 60 and Person B who is 50. The sum insured is 200,000 payable at the earliest of the end of the year of the first death and the end of 10 years. Premiums are paid annually in advance.

You are given:

(i) Mortality follows the Standard Ultimate Life Table.

(ii) $i = 0.05$

(iii) Person A and Person B have independent future lifetimes.

(iv) Gross premiums are calculated using the equivalence principle.

(This is Question 5 from the Fall 2021 Form A Written Answer exam.)

## Part a (1 point)

Show that the net premium is 15,780 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation
$$200{,}000\,A_{50:60:\overline{10}|} = P\,\ddot{a}_{50:60:\overline{10}|}$$

$$\ddot{a}_{50:60:\overline{10}|} = 7.9044$$

$$A_{50:60:\overline{10}|} = 1 - d\,\ddot{a}_{50:60:\overline{10}|} = 1 - \frac{0.05}{1.05}(7.9044) = 0.6236$$

$$P = \frac{(200{,}000)\,A_{50:60:\overline{10}|}}{\ddot{a}_{50:60:\overline{10}|}} = \frac{(200{,}000)(0.6236)}{7.9044} = 15{,}778.55$$

## Part b (2 points)

Show that ${}^2A_{50:60:\overline{10}|} = 0.39$ to the nearest 0.01. You should calculate the value to the nearest 0.0001.

### Explanation
$$\begin{align*}
{}^2A_{50:60:\overline{10}|} &= {}^2A_{50:60} + v^{20}\,{}_{10}p_{50}\,{}_{10}p_{60}\left(1 - {}^2A_{60:70}\right) \\
&= {}^2A_{50:60} + {}_{10}E_{50}\,{}_{10}E_{60}\left(1 - {}^2A_{60:70}\right) \\
&= 0.3908335
\end{align*}$$

### Examiner Report
**Graders' Comments:** *Candidates did well on these parts. Common errors were missing the endowment part of the equation or using wrong discount factors for the endowment.*

## Part c (1 point)

Calculate the standard deviation of the net Loss at Issue random variable.

### Explanation
$$\begin{align*}
Var[L] &= \left(S + \frac{P}{d}\right)^2\left({}^2A_{50:60:\overline{10}|} - \left(A_{50:60:\overline{10}|}\right)^2\right) \\
&= (531{,}349.55)^2\left(0.390834 - 0.6236^2\right) \\
&= (531{,}349.55)^2(0.001957) \\
&= 552{,}524{,}514.1 \\
&= 23{,}505.84^2
\end{align*}$$

Standard Deviation of L = 23,505.84

### Examiner Report
**Graders' Comments:** *Overall, candidates did well on this part also. Many candidates have this formula memorized. Partial credit was awarded if there was an attempt to derive the formula, if it wasn't memorized.*

## Part d (1 point)

Expenses are 25% of the first year's premium plus 10% of all renewal premiums. Calculate the gross premium using the equivalence principle.

### Explanation
$$G = \frac{S\,A_{50:60:\overline{10}|}}{(0.9)\,\ddot{a}_{50:60:\overline{10}|} - 0.15} = \frac{124{,}720}{6.96396} = 17{,}909.35$$

### Examiner Report
**Graders' Comments:** *Again, candidates did well on this part. The most common error was the double counting first year expense (using a separate 0.25 instead and using .15)*

## Part e (2 points)

Following a major economic upheaval, the interest rate has increased to 10.25% per year. Note that $1.05^2 = 1.1025$.

(i) Calculate the percentage reduction in the gross premium, as a result of the change in the interest rate.

(ii) State with reasons whether the percentage reduction in the premium for a 10-year term joint life insurance on Person A and Person B would be greater or less than the change in (i) above.

### Explanation
(i)
$$G^* = \frac{S\,{}^2A_{50:60:\overline{10}|}}{(0.9)\,{}^2\ddot{a}_{50:60:\overline{10}|} - 0.15} = \frac{200{,}000(0.390834)}{5.747024} = 13{,}601.27$$

$${}^2\ddot{a}_{50:60:\overline{10}|} = \frac{1 - {}^2A_{50:60:\overline{10}|}}{d^*} = 6.552249$$

$$d^* = 0.1025/1.1025 = 0.0929705$$

A reduction of $(17{,}909.35 - 13{,}601.27)/17{,}909.35 = 0.2405$ or 24.05%

(ii) The percentage reduction would be **less** for a 10-year term insurance. The endowment insurance also pays a benefit in case of survival to time 10. The percentage reduction in the EPV of the survival benefit will be larger than the percentage reduction in the EPV of the death benefit (which is paid early, on average, and is therefore relatively less affected by a change in the interest rate).

### Examiner Report
**Graders' Comments:** *For Part (i) the most common error was not calculating the correct discount rate or calculating the net premium instead of the gross premium. For Part (ii), many candidates did not really address the question answered and instead commented on expenses or joint life versus single life as opposed to the difference between term and endowment.*
