---
id: "altam-023"
exam: "Exam ALTAM"
topic: "Joint Life"
learning_objective: "Joint Life Insurance and Annuities"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Joint+Life
  - Concepts/Kolmogorov's+Forward+Equation
  - Concepts/Woolhouse's+Formula
  - Concepts/Annuities
  - Concepts/Multiple+State+Model
points: 9
---

Assume the following 4-state joint life model of mortality.

*(Figure: four-state model — 0: (x) alive, (y) alive; 1: (x) dead, (y) alive; 2: (x) alive, (y) dead; 3: (x) dead, (y) dead; arrows 0 → 1 labelled $\mu_{x+t}^{01}$, 0 → 2 labelled $\mu_{y+t}^{02}$, 1 → 3 labelled $\mu_{y+t}^{13}$ and 2 → 3 labelled $\mu_{x+t}^{23}$)*

(This is Question 6 from the Spring 2021 Written Answer exam.)

## Part a (1 point)

Describe the annuity that has actuarial value $\bar{a}_{xy}^{01}$.

### Explanation
$\bar{a}_{xy}^{01}$ is the actuarial value of a (whole-life) annuity paid to (y) starting on the death of (x), payable continuously at a <u>*rate*</u> of 1 per year.

Or

A reversionary annuity paid to (y) starting on the death of (x), payable continuously at a <u>*rate*</u> of 1 per year.

### Examiner Report
**Graders' Comments:** *Most candidates did very well. Some candidates didn't mention "continuous", and a few candidates only provided a description that was not specific to the given joint life model (e.g., "a continuous annuity payable at a rate of 1 per year while in state 1 given that it is issued in state 0")*

## Part b (2 points)

Write down the Kolmogorov forward differential equations, with boundary conditions, for ${}_tp_{xy}^{00}$ and ${}_tp_{xy}^{01}$.

### Explanation
$$\frac{d}{dt}\,{}_tp_{xy}^{00} = -{}_tp_{xy}^{00}\left(\mu_{x+t}^{01} + \mu_{y+t}^{02}\right); \qquad {}_0p_{xy}^{00} = 1$$

And

$$\frac{d}{dt}\,{}_tp_{xy}^{01} = {}_tp_{xy}^{00}\,\mu_{x+t}^{01} - {}_tp_{xy}^{01}\,\mu_{y+t}^{13}; \qquad {}_0p_{xy}^{01} = 0$$

### Examiner Report
**Graders' Comments:** *Candidates did well on this part. A common error was incorrect or missing subscripts (i.e., ages). A few candidates didn't provide the boundary conditions.*

## Part c (3 points)

You are given the Euler-Maclaurin-Woolhouse approximation formula

$$\int_0^{\infty} g(t)\,dt \approx \sum_{k=0}^{\infty} g(k) - \frac{1}{2}g(0) + \frac{1}{12}g'(0).$$

Use this approximation, with $g(t) = {}_tp_{xy}^{00}\,e^{-\delta t}$, to prove that

$$\bar{a}_{xy}^{00} \approx \ddot{a}_{xy}^{00} - \frac{1}{2} - \frac{1}{12}\left(\mu_x^{01} + \mu_y^{02} + \delta\right).$$

Hint: Use the Kolmogorov forward differential equations, and the chain rule.

### Explanation
We have

$$\bar{a}_{xy}^{00} = \int_0^{\infty} {}_tp_{xy}^{00}\,e^{-\delta t}\,dt = \int_0^{\infty} g(t)\,dt$$

and

$$\ddot{a}_{xy}^{00} = \sum_{k=0}^{\infty} {}_kp_{xy}^{00}\,e^{-\delta k} = \sum_{k=0}^{\infty} g(k)$$

(i.e. $\bar{a}$ is the integral, $\ddot{a}$ the sum) where

$$g(t) = {}_tp_{xy}^{00}\,e^{-\delta t}, \qquad g(0) = 1.$$

The derivative of g(t) using the product rule is

$$\begin{align*}
g'(t) &= \left(\frac{d}{dt}\,{}_tp_{xy}^{00}\right)e^{-\delta t} + {}_tp_{xy}^{00}\left(\frac{d}{dt}\,e^{-\delta t}\right) \\
&= -{}_tp_{xy}^{00}\left(\mu_{x+t}^{01} + \mu_{y+t}^{02}\right)e^{-\delta t} + {}_tp_{xy}^{00}\left(-\delta e^{-\delta t}\right).
\end{align*}$$

So,

$$g'(0) = -1 \cdot \left(\mu_x^{01} + \mu_y^{02}\right) \cdot 1 + 1 \cdot (-\delta \cdot 1) = -\left(\mu_x^{01} + \mu_y^{02} + \delta\right)$$

The approximation

$$\int_0^{\infty} g(t)\,dt \approx \sum_{k=0}^{\infty} g(k) - \frac{1}{2}g(0) + \frac{1}{12}g'(0)$$

then gives

$$\bar{a}_{xy}^{00} \approx \ddot{a}_{xy}^{00} - \frac{1}{2} - \frac{1}{12}\left(\mu_x^{01} + \mu_y^{02} + \delta\right).$$

### Examiner Report
**Graders' Comments:** *Candidates did fairly well, but not many received full credit. The most common issue was the derivative, g'(t). A number of candidates mistakenly assumed constant forces of mortality, receiving little credit.*

## Part d (3 points)

Z and A are both 70 years old. They purchase a last survivor annuity, with a level benefit payable continuously.

The single net premium is 1,000,000.

You are given the following information:

(i) The mortality of each life follows the Standard Ultimate Life Table.

(ii) Z and A have independent future lifetimes.

(iii) $i = 0.05$

(iv) $\mu_{70} = 0.009881$

(v) $\bar{a}_{70|70} = 2.0317$

Calculate the level annual rate of benefit, using the Euler-Maclaurin-Woolhouse approximation.

### Explanation
Let $B$ = annual annuity payment rate

$$1{,}000{,}000 = B\,\bar{a}_{\overline{70:70}} = B\left(\bar{a}_{70:70}^{00} + \bar{a}_{70:70}^{01} + \bar{a}_{70:70}^{02}\right)$$

Since $\bar{a}_{70:70}^{01} = \bar{a}_{70:70}^{02} = \bar{a}_{70|70} = 2.0317$

$$1{,}000{,}000 = B\,\bar{a}_{\overline{70:70}} = B\left(\bar{a}_{70:70}^{00} + 2\bar{a}_{70|70}\right)$$

Using the approximation in (c),

$$\begin{align*}
\bar{a}_{70:70}^{00} &\approx \ddot{a}_{70:70}^{00} - \frac{1}{2} - \frac{1}{12}\left(2\mu_{70} + \delta\right) \\
&= \ddot{a}_{70:70}^{SULT} - \frac{1}{2} - \frac{1}{12}\left(2(0.009881) + 0.04879\right) \\
&= 9.4717
\end{align*}$$

$$\Rightarrow B = \frac{1{,}000{,}000}{9.4717 + 2(2.0317)} = \frac{1{,}000{,}000}{13.5351} = 73{,}881.98$$

### Examiner Report
**Graders' Comments:** *Candidates did fairly well on this part. A few candidates mistakenly applied the EMW approximation in Part c) for a last-survivor annuity. Note that the formula for g(t) is different for different cases, the EMW approximation for a last-survivor annuity would be different from c).*
