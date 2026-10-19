---
id: "altam-006"
exam: "Exam ALTAM"
topic: "Multiple State Model"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Multiple+State+Model
  - Concepts/Health+Insurance
  - Concepts/Transition+Intensity
  - Concepts/Annuities
  - Concepts/Present+Value
points: 9
---

You are analyzing waiting times and expenses associated with optometric procedures. The analysis is based on the multiple state model illustrated below.

An individual who is diagnosed with a specific eye condition moves into State 1, where they are Monitored. When the condition progresses, they move onto a Wait List for surgery (State 2). Surgery (State 3) is performed once their name reaches the top of the wait list. The time spent on the wait list is random, depending on the progression of the disease and the availability of surgical resources.

*(Figure: state diagram — Healthy (State 0) → Monitored (State 1) → Wait List (State 2) → Surgery (State 3).)*

You are given the following information:

(i) $\mu_{x+t}^{01} = a + be^{c(x+t)}$ where $a = 0.004$, $b = 0.015$, and $c = 0.005$;

(ii) $\mu_{x+t}^{12} = 0.2; \quad \mu_{x+t}^{23} = 0.4.$

(iii) $\delta = 0.05$

## Part a (2 points)

Calculate the probability that a Healthy life age 60 will be diagnosed with the eye condition before age 65.

### Explanation
Note that $\mu_{x+t}^{01}$ is the force of mortality under Makeham's Law with parameters A, B and c\*, where $A = 0.004$, $B = 0.015$, and $c^* = e^{0.005} = 1.0050125$

$${}_5p_{60}^{00} = e^{-5A - \frac{B}{\log c^*}(c^*)^{60}\left((c^*)^5 - 1\right)} = 0.8846922$$

$$\text{Prob. of diagnosis} = 1 - {}_5p_{60}^{00} = 0.11531$$

## Part b (1 point)

Show that ${}_tp_x^{12} = \left(e^{-0.2t} - e^{-0.4t}\right)$.

### Explanation
$$\begin{align*}
{}_tp_x^{12} &= \int_0^t {}_rp_x^{11}\,\mu_{x+r}^{12}\,{}_{t-r}p_{x+r}^{22}\,dr \\
&= \int_0^t e^{-0.2r}(0.2)e^{-0.4(t-r)}\,dr \\
&= \left(0.2\,e^{-0.4t}\right)\int_0^t e^{0.2r}\,dr \\
&= \left(0.2\,e^{-0.4t}\right)\left(\frac{e^{0.2t} - 1}{0.2}\right) \\
&= e^{-0.2t} - e^{-0.4t}
\end{align*}$$

## Part c (1 point)

Calculate the probability that a life currently being Monitored (State 1) will have Surgery (State 3) within 5 years.

### Explanation
$${}_5p_x^{13} = 1 - {}_5p_x^{11} - {}_5p_x^{12} = 1 - e^{-5(0.2)} - \left(e^{-5(0.2)} - e^{-5(0.4)}\right) = 0.399577$$

## Part d (2 points)

(i) Show that $\bar{a}_{x:\overline{5}|}^{11} = 2.85$ to the nearest 0.01. You should calculate the value to the nearest 0.001.

(ii) Show that $\bar{a}_{x:\overline{5}|}^{12} = 0.87$ to the nearest 0.01. You should calculate the value to the nearest 0.001.

(iii) Show algebraically that $\bar{a}_{x:\overline{5}|}^{11} + \bar{a}_{x:\overline{5}|}^{12} + \bar{a}_{x:\overline{5}|}^{13} = \bar{a}_{\overline{5}|}$

### Explanation
(i)

$$\begin{align*}
\bar{a}_{x:\overline{5}|}^{11} &= \int_0^5 {}_tp_x^{11}\,e^{-\delta t}\,dt \\
&= \int_0^5 e^{-0.2t}e^{-0.05t}\,dt \\
&= \frac{1 - e^{5(0.25)}}{0.25} \\
&= 2.85398
\end{align*}$$

(ii)

$$\begin{align*}
\bar{a}_{x:\overline{5}|}^{12} &= \int_0^5 {}_tp_x^{12}\,e^{-\delta t}\,dt \\
&= \int_0^5 \left(e^{-0.2t} - e^{-0.4t}\right)e^{-0.05t}\,dt \\
&= 2.85398 - \frac{1 - e^{5(0.45)}}{0.45} \\
&= 0.86598
\end{align*}$$

(iii)

$$\begin{align*}
\bar{a}_{x:\overline{5}|}^{11} + \bar{a}_{x:\overline{5}|}^{12} + \bar{a}_{x:\overline{5}|}^{13} &= \int_0^5 \left({}_tp_x^{11} + {}_tp_x^{12} + {}_tp_x^{13}\right)e^{-\delta t}\,dt \\
&= \int_0^5 1\,e^{-\delta t}\,dt \quad \text{(law of complete probability)} \\
&= \bar{a}_{\overline{5}|}
\end{align*}$$

### Examiner Report
Graders' Comments: Candidates who attempted this part did well on this question in general, with most receiving full marks. Part iii) required a rigorous demonstration.

## Part e (3 points)

The health authority is considering two alternatives for improving care for those diagnosed with the eye condition. One criterion for deciding which course of action to choose is based on a quality of life (QL) index, as follows:

- In State 1, $QL = 0.5$ per year.
- In State 2, $QL = 0.2$ per year
- In State 3, $QL = 1.0$ per year.

The authority will choose one of the following options:

Option A: Open a new surgical center. This would increase $\mu_x^{23}$ to 1.0 without changing any other transition intensities.

Option B: Improve care for those in States 1 and 2. This would improve the QL index to 0.55 in State 1, and to 0.3 in State 2.

Calculate whether the health authority should select Option A or Option B, based on the increase in the expected present value of the 5-year QL of lives currently in State 1, using a force of interest of $\delta = 0.05$.

(LTAM, Fall 2021 Form B, Question 3)

### Explanation
**Under Option A** the QL index is $0.5\,\bar{a}_{x:\overline{5}|}^{11} + 0.2\,\bar{a}_{x:\overline{5}|}^{12} + 1.0\,\bar{a}_{x:\overline{5}|}^{13}$, where the annuities are now calculated with $\mu_x^{23} = 1.0$.

$\bar{a}_{x:\overline{5}|}^{11} = 2.85398$ from above.

$$\begin{align*}
{}_tp_x^{12} \text{ is now} &= \int_0^t e^{-0.2r}(0.2)e^{-(t-r)}\,dr \\
&= \left(0.2\,e^{-t}\right)\left(\frac{e^{0.8t} - 1}{0.8}\right) \\
&= 0.25\left(e^{-0.2t} - e^{-t}\right)
\end{align*}$$

So

$$\begin{align*}
\bar{a}_{x:\overline{5}|}^{12} &= 0.25\int_0^5 \left(e^{-0.2t} - e^{-t}\right)e^{-0.05t}\,dt \\
&= 0.25\left(2.85398 - \frac{1 - e^{-(1.05)5}}{1.05}\right) \\
&= 0.47665
\end{align*}$$

Also

$$\begin{align*}
\bar{a}_{x:\overline{5}|}^{13} &= \bar{a}_{\overline{5}|} - \bar{a}_{x:\overline{5}|}^{11} - \bar{a}_{x:\overline{5}|}^{12} \\
&= 4.42398 - 2.85398 - 0.47665 \\
&= 1.09335
\end{align*}$$

So

$$\begin{align*}
QL^A &= 0.5(2.85398) + 0.2(0.47665) + 1.0(1.09335) \\
&= 2.61567
\end{align*}$$

**Under Option B** the QL index is $0.55\,\bar{a}_{x:\overline{5}|}^{11} + 0.3\,\bar{a}_{x:\overline{5}|}^{12} + 1.0\,\bar{a}_{x:\overline{5}|}^{13} = 2.534$, where the annuities are calculated as in part (d), with

$$\bar{a}_{x:\overline{5}|}^{12} = 0.86598 \quad\text{and}\quad \bar{a}_{x:\overline{5}|}^{13} = 4.42398 - 2.85398 - 0.86598 = 0.70402$$

$$\Rightarrow QL^B = 2.5335$$

Based on the improved QL, the health authority should select Option A.

### Examiner Report
Graders' Comments: This problem was not attempted by a majority of the candidates; those that did generally received most of the available credit.
