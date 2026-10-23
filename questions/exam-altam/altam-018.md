---
id: "altam-018"
exam: "Exam ALTAM"
topic: "Joint Life"
learning_objective: "Joint Life Insurance and Annuities"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Joint+Life
  - Concepts/Multiple+State+Model
  - Concepts/Kolmogorov's+Forward+Equation
  - Concepts/Thiele's+Differential+Equation
  - Concepts/Annuities
  - Concepts/Policy+Value
points: 11
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:5adcd16f420412d2a13c8f64e44d5f7b4804dc98401242bca22fb6780b52d71d
  sources:
    - "SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q18, pp.34-35, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q18, pp.32-34, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-018.md
---

The mortality of a couple, $(x)$ and $(y)$, is modeled using the Markov multiple-state model described in the following diagram:

![State diagram: 0, (x) alive and (y) alive; 1, (x) dead and (y) alive; 2, (x) alive and (y) dead; 3, (x) dead and (y) dead. Arrows run 0 to 1, 0 to 2, 1 to 3 and 2 to 3.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-018-state-diagram.png)

You are given:

- $\mu_{x+t:y+t}^{01} = A + Bc^{x+t}$ $\quad\mu_{x+t:y+t}^{02} = A + Bc^{y+t}$ $\quad\mu_{y+t}^{13} = D + Bc^{y+t}$ $\quad\mu_{x+t}^{23} = E + Bc^{x+t}$
- $A = 0.0001$ $\quad B = 10^{-5}$ $\quad c = 1.12$ $\quad D = 0.00015$ $\quad E = 0.0002$

## Part a (1 point)

State with reasons whether $(x)$ and $(y)$ have independent future lifetimes under this model.

### Explanation
The future lifetimes of $(x)$ and $(y)$ are dependent, because the force of mortality for each is different depending on whether the other is alive or not, as $\mu_{x+t:y+t}^{01} \ne \mu_{x+t}^{23}$ and $\mu_{x+t:y+t}^{02} \ne \mu_{y+t}^{13}$. That means that the distribution of the time to death of $(x)$ is different if $(y)$ dies early (as printed) than if $(y)$ dies later (and vice versa), which means the future lifetime random variables $T_x$ and $T_y$ are dependent.

### Examiner Report
**Graders' Comments:** *The key point, is that the force of mortality for each life is different from the married state than from the widowed state. Many candidates wrongly claimed that the lives are independent because there is no common shock transition.*

## Part b (3 points)

(i) Write down the Kolmogorov forward differential equation for ${}_tp_{xy}^{00}$, and give the associated boundary condition.

(ii) Starting from the equation in (i), prove that

$${}_tp_{xy}^{00} = \exp\left\{-\int_0^t \left(\mu_{x+r:y+r}^{01} + \mu_{x+r:y+r}^{02}\right)dr\right\}.$$

### Explanation
(i)
$$\frac{d}{dt}\,{}_tp_{xy}^{00} = -{}_tp_{xy}^{00}\left(\mu_{x+t:y+t}^{01} + \mu_{x+t:y+t}^{02}\right)$$
with boundary condition of ${}_0p_{xy}^{00} = 1$

(ii)
$$\frac{d}{dr}\,{}_rp_{xy}^{00} = -{}_rp_{xy}^{00}\left(\mu_{x+r:y+r}^{01} + \mu_{x+r:y+r}^{02}\right) \;\Rightarrow\; \frac{1}{{}_rp_{xy}^{00}}\,\frac{d}{dr}\,{}_rp_{xy}^{00} = -\left(\mu_{x+r:y+r}^{01} + \mu_{x+r:y+r}^{02}\right)$$

$$\Rightarrow \frac{d}{dr}\ln\left({}_rp_{xy}^{00}\right) = -\left(\mu_{x+r:y+r}^{01} + \mu_{x+r:y+r}^{02}\right)$$

Integrate both sides from 0 to t

$$\int_0^t \frac{d}{dr}\ln\left({}_rp_{xy}^{00}\right)dr = \int_0^t -\left(\mu_{x+r:y+r}^{01} + \mu_{x+r:y+r}^{02}\right)dr \;\Rightarrow\; \ln\left({}_tp_{xy}^{00}\right) - \ln\left({}_0p_{xy}^{00}\right) = \int_0^t -\left(\mu_{x+r:y+r}^{01} + \mu_{x+r:y+r}^{02}\right)dr$$

from the boundary condition, $\ln\left({}_0p_{xy}^{00}\right) = 0$, so

$$\ln\left({}_tp_{xy}^{00}\right) = \int_0^t -\left(\mu_{x+r:y+r}^{01} + \mu_{x+r:y+r}^{02}\right)dr \;\Rightarrow\; {}_tp_{xy}^{00} = \exp\left(-\left(\mu_{x+r:y+r}^{01} + \mu_{x+r:y+r}^{02}\right)dr\right) \text{ (as printed)}$$

### Examiner Report
**Graders' Comments:** *Most candidates scored partial credit for this part. Some candidates wrote down a few steps, but missed the key parts of the proof. An acceptable alternative approach was to plug the given solution into the Kolmogorov equation and demonstrate that the integral equation for ${}_tp_{xy}^{00}$ satisfies the Kolmogorov differential equation and the boundary condition. This approach was awarded full points if done correctly.*

## Part c (3 points)

A couple, who are ages $x = 50$ and $y = 55$, purchases a special single premium, deferred joint and last survivor annuity. The annuity will pay 50,000 per year while both are alive, and will pay 30,000 per year while only one is alive. Payments are continuous, and begin 10 years after the annuity purchase.

If neither life survives the deferred period, then a sum of 3 times the single premium is paid immediately on the second death.

There are no other benefits.

You are given:

(i) ${}_{10}p_{50:55}^{00} = 0.86041$ $\quad{}_{10}p_{50:55}^{01} = 0.04835$ $\quad{}_{10}p_{50:55}^{02} = 0.08628$

(ii) $\bar{A}_{50:55:\overline{10}|}^{03} = 0.003421$

(iii) $\bar{a}_{60:65}^{00} = 8.8219$ $\quad\bar{a}_{60:65}^{01} = 1.3768$ $\quad\bar{a}_{60:65}^{02} = 3.0175$

(iv) $\bar{a}_{65}^{11} = 10.1948$ $\quad\bar{a}_{60}^{22} = 11.8302$

(v) $i = 0.05$

(i) Show that the expected present value of the future benefits at time 10, if both lives survive to time 10, is 573,000 to the nearest 1000. You should calculate the value to the nearest 100.

(ii) Calculate the single net premium for the policy.

### Explanation
(i) At time 10, $(x)$ is age 60 and $(y)$ is age 65. The value at time 10 of the joint and reversionary annuities is

$$\begin{align*}
& 50{,}000\,\bar{a}_{60:65}^{00} + 30{,}000\,\bar{a}_{60:65}^{01} + 30{,}000\,\bar{a}_{60:65}^{02} \\
&= (50{,}000)(8.8219) + (30{,}000)(1.3768) + (30{,}000)(3.0175) \\
&= 572{,}924
\end{align*}$$

(ii) The EPV of the deferred annuity for the case where both lives survive 10 years uses the results from (i):

$${}_{10}p_{50:55}^{00} \cdot v^{10} \cdot 572{,}924 = (0.86041)(0.61391)(572{,}924) = 302{,}627$$

The EPV of the deferred annuity for the case where $(y)$ survives 10 years but $(x)$ does not, is

$${}_{10}p_{50:55}^{01} \cdot v^{10}\left(30{,}000\,\bar{a}_{65}^{11}\right) = (0.04835)(0.61391)(30{,}000)(10.1948) = 9078$$

The EPV of the deferred annuity for the case where $(x)$ survives 10 years but $(y)$ does not, is

$${}_{10}p_{50:55}^{02} \cdot v^{10}\left(30{,}000\,\bar{a}_{60}^{22}\right) = (0.08628)(0.61391)(30{,}000)(11.8302) = 18{,}799$$

Let $P$ denote the premium. Then the EPV of the benefit paid on the second death during the deferred period is

$$3P\,\bar{A}_{50:55:\overline{10}|}^{03} = 3P(0.003421) = (0.010263)P$$

$$\Rightarrow P = 302{,}627 + 9078 + 18{,}799 + 0.010263P$$

$$\Rightarrow P = \frac{330{,}504}{0.989737} = 333{,}931$$

### Examiner Report
**Graders' Comments:** *Only the top few candidates achieved full credit for this part. Many candidates did not allow for the possibility that only one life would survive the deferred period.*

## Part d (4 points)

(i) Determine ${}_{10}V^{(0)}$, ${}_{10}V^{(1)}$ and ${}_{10}V^{(2)}$ for the policy.

(ii) Write down Thiele's differential equation for the policy value at $t$, $t \ge 10$, assuming both lives survive to $t$.

(iii) Using Euler's forward method, with a step size of $h = 0.5$, calculate the policy value required at 10.5 assuming both lives are alive at that time.

(MLC, Fall 2015, Question 2)

### Explanation
(i)

$${}_{10}V^{(0)} = 572{,}924 \quad \text{from (c)(i)}$$

$${}_{10}V^{(1)} = 30{,}000\,\bar{a}_{65}^{11} = (30{,}000)(10.1948) = 305{,}844$$

$${}_{10}V^{(2)} = 30{,}000\,\bar{a}_{60}^{22} = (30{,}000)(11.8302) = 354{,}906$$

(ii) For $t \ge 10$ and $\delta = \log(1.05)$

$$\frac{d}{dt}\,{}_tV^{(0)} = \delta\,{}_tV^{(0)} - 50{,}000 - \mu_{50+t:55+t}^{01}\left({}_tV^{(1)} - {}_tV^{(0)}\right) - \mu_{50+t:55+t}^{02}\left({}_tV^{(2)} - {}_tV^{(0)}\right)$$

(iii) We need $\mu_{60:65}^{01} = A + Bc^{60} = 0.009076$ and $\mu_{60:65}^{02} = A + Bc^{65} = 0.015919$. Then

$$\begin{align*}
{}_{t+h}V^{(0)} &\approx {}_tV^{(0)} + h\left(\delta\,{}_tV^{(0)} - 50{,}000 - \mu_{50+t:55+t}^{01}\left({}_tV^{(1)} - {}_tV^{(0)}\right) - \mu_{50+t:55+t}^{02}\left({}_tV^{(2)} - {}_tV^{(0)}\right)\right) \\
&\approx 572{,}924 + 0.5\{(0.048790)(572{,}924) - 50{,}000 - (0.009076)(305{,}844 - 572{,}924) - (0.015919)(354{,}906 - 572{,}924)\} \\
&= 564{,}848
\end{align*}$$

### Examiner Report
**Graders' Comments:** *As in (c), only the strongest candidates achieved full credit for this part. Many students correctly calculated the three policy calues (as printed), though some did not apply the correct annuity values ti (as printed) the state-dependent polict (as printed) values.*
