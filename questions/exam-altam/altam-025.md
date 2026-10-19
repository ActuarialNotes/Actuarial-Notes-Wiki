---
id: "altam-025"
exam: "Exam ALTAM"
topic: "Joint Life"
learning_objective: "Joint Life Insurance and Annuities"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Joint+Life
  - Concepts/Multiple+State+Model
  - Concepts/Transition+Intensity
  - Concepts/Annuities
  - Concepts/Equivalence+Principle
points: 8
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:641649a52c7fa40be9ecaaee810fd3fe2cacf4beb35f9a87bcd0bdfa2739e6a1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-025.md
---

ABC Insurance uses the following model for calculating premiums and policy values for joint life insurance policies.

![State diagram: 0, (x), (y) alive; 1, (x) alive, (y) dead; 2, (x) dead, (y) alive; 3, (x) dead, (y) dead. Arrows run 0 to 1, 0 to 2, 1 to 3 and 2 to 3.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-025-state-diagram.png)

The forces of transition are as follows, where $\mu_z^s$ is the force of mortality at age $z$ under the Standard Ultimate Life Table (SULT).

$$\mu_{x:y}^{01} = \mu_y^s - 0.005; \qquad \mu_{x:y}^{02} = \mu_x^s; \qquad \mu_x^{13} = \mu_x^s + 0.0025; \qquad \mu_y^{23} = \mu_y^s + 0.005$$

## Part a (1 point)

State with reasons whether the future lifetimes of $(x)$ and $(y)$ are independent under this model.

### Explanation
The future lifetimes are <u>not</u> independent. The mortality of each life is different when their partner is alive than it is when their partner is dead. This shows that the future lifetime of each partner impacts the future lifetime of the other. OR: A necessary condition for independence is that $\mu_y^{01} = \mu_y^{23}$ and $\mu_x^{02} = \mu_x^{13}$. As this is not the case, the future lifetimes are not independent.

### Examiner Report
**Graders' Comments:** *Most candidates who correctly identified dependence gave good reasoning. Many candidates failed to recognize dependence, assuming that no direct transitions from State 0 to State 3 implied independence.*

## Part b (1 point)

Show that ${}_tp_{x:y}^{00} = e^{\lambda t}\,{}_tp_x^s\,{}_tp_y^s$, where ${}_tp_x^s$ and ${}_tp_y^s$ are from the SULT, and where $\lambda > 0$ is a constant which you should specify.

### Explanation
$$\begin{align*}
{}_tp_{xy}^{00} &= \exp\left(-\int_0^t \mu_{x+r:y+r}^{01} + \mu_{x+r:y+r}^{02}\,dr\right) \\
&= \exp\left(-\int_0^t \mu_{y+r}^s + \mu_{x+r}^s - 0.005\,dr\right) \\
&= e^{0.005t}\,{}_tp_x^s\,{}_tp_y^s
\end{align*}$$

$$\Longrightarrow \lambda = 0.005$$

### Examiner Report
**Graders' Comments:** *This is a "show that" question, where candidates need to be very precise about their derivation. Overall candidates did well on this part. However, many candidates assumed constant forces of mortality, which is incorrect and unnecessary.*

## Part c (1 point)

In the following table, you are given annuity values calculated using SULT mortality, at different forces of interest, and assuming independent future lifetimes for joint life functions.

| $\delta$ | 3.50% | 3.75% | 4.00% | 4.25% | 4.50% |
|---|---|---|---|---|---|
| $\bar{a}_{40:50}^s$ | 19.3199 | 18.6530 | 18.0216 | 17.4235 | 16.8564 |
| $\bar{a}_{40}^s$ | 22.4243 | 21.4880 | 20.6129 | 19.7939 | 19.0268 |
| $\bar{a}_{50}^s$ | 20.0391 | 19.3174 | 18.6358 | 17.9917 | 17.3825 |

Determine $\bar{a}_{x:y}^{00}$ at $\delta = 4\%$, for $x = 40$ and $y = 50$, based on the ABC Insurance model.

### Explanation
$$\bar{a}_{x:y}^{00} = \int_0^{\infty} {}_tp_{x:y}^{00}\,e^{-\delta t}\,dt = \int_0^{\infty} {}_tp_x^s\,{}_tp_y^s\,e^{\lambda t}\,e^{-\delta t}\,dt = \bar{a}_{x:y}^s\Big|_{\delta^*} \quad \text{where } \delta^* = \delta - \lambda = 0.035$$

$$\Rightarrow \bar{a}_{40:50}^{00} = 19.3199$$

### Examiner Report
**Graders' Comments:** *The point of this part is to get candidates to work out the correct interest rate to use. For full credit, they need to justify their choice. Many candidates overcomplicated the question, spending time integrating, instead of using the table (this was especially true for candidates who assumed constant forces of mortality).*

## Part d (3 points)

(i) Write down an integral expression for the expected present value of a payment of 1 immediately on the first death of $(x)$ and $(y)$, using the multiple state model notation.

(ii) Show that, for $x = 40$ and $y = 50$, at $\delta = 4\%$, the expected present value of a payment of 1 immediately on the first death, under the ABC Insurance joint life mortality model, is 0.227 to the nearest 0.001. You should calculate the value to the nearest 0.00001.

### Explanation
(i)
$$\bar{A}_{x:y}^{01} + \bar{A}_{x:y}^{02} = \int_0^{\infty} {}_tp_{x:y}^{00}\left(\mu_{y+t}^{01} + \mu_{x+t}^{02}\right)e^{-\delta t}\,dt$$

(ii)
$$\begin{align*}
\bar{A}_{x:y}^{01} + \bar{A}_{x:y}^{02} &= \int_0^{\infty} {}_tp_x^s\,{}_tp_y^s\left(\mu_{y+t}^s + \mu_{x+t}^s - 0.005\right)e^{-\delta^* t}\,dt \\
&= \bar{A}_{x:y|\delta^*}^s - 0.005\,\bar{a}_{x:y|\delta^*}^s \\
&= 1 - \delta^*\,\bar{a}_{x:y|\delta^*}^s - 0.005\,\bar{a}_{x:y|\delta^*}^s \\
&= 1 - \delta\,\bar{a}_{x:y|\delta^*}^s \\
&= 1 - (0.04)(19.3199) \\
&= 0.227204
\end{align*}$$

### Examiner Report
**Graders' Comments:** *Most candidates either skipped this part or assumed constant forces of mortality.*

## Part e (1 point)

ABC Insurance issues a fully continuous joint life policy of 500,000 on $(x)$, who is 40, and $(y)$, who is 50.

Calculate the annual rate of net premium for this policy using the ABC Insurance joint life mortality model, with $\delta = 4\%$.

### Explanation
$$P = \frac{500{,}000\left(\bar{A}_{x:y}^{01} + \bar{A}_{x:y}^{02}\right)}{\bar{a}_{x:y}^{00}} = \frac{(500{,}000)(0.227204)}{19.3199} = 5{,}880.1$$

## Part f (1 point)

Exactly 10 years after issue $(y)$ dies while $(x)$ survives. At that time, $(x)$ uses the sum insured to provide a continuous annuity paying $X$ per year while she survives. The annuity amount is determined using the equivalence principle with $\delta = 4\%$.

Calculate $X$.

(This is Question 4 from the Spring 2022 Written Answer exam.)

### Explanation
$$X = \frac{500{,}000}{\bar{a}_{50}^{11}} = \frac{500{,}000}{\bar{a}_{x:y|\delta^{**}=0.0425}^s} = \frac{500{,}000}{17.9917} = 27{,}791$$

### Examiner Report
**Graders' Comments:** *Parts (e) and (f) were quite straightforward, relying on given answers from earlier parts. However, many candidates who struggled with part (d) skipped these parts.*
