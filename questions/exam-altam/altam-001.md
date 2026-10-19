---
id: "altam-001"
exam: "Exam ALTAM"
topic: "Multiple State Model"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Multiple+State+Model
  - Concepts/Kolmogorov's+Forward+Equation
  - Concepts/Long-Term+Insurance+Coverage
  - Concepts/Transition+Intensity
  - Concepts/Annuities
points: 8
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cc1f6b0dfe8dc12a2c6f0cca0e9e21530dd634368bc07657267e3f967bced964
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-001.md
---

A long-term care provider offers three care levels. Transitions are modeled as a Markov multiple-state model. Transitions and states are shown in the following diagram:

![State diagram: Level 0 Care (0), Level 1 Care (1), Level 2 Care (2) and Dead (3); arrows run 0 to 1, 1 to 0, 1 to 2, 0 to 3, 1 to 3 and 2 to 3.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-001-state-diagram.png)

## Part a (1 point)

Write down Kolmogorov's forward differential equations with the associated boundary conditions for this model for:

(i) ${}_tp_x^{10}$

(ii) ${}_tp_x^{11}$

### Explanation
$$\frac{d}{dt}\,{}_tp_x^{10} = {}_tp_x^{11}\,\mu_{x+t}^{10} - {}_tp_x^{10}\left(\mu_{x+t}^{01} + \mu_{x+t}^{03}\right)$$

$$\frac{d}{dt}\,{}_tp_x^{11} = {}_tp_x^{10}\,\mu_{x+t}^{01} - {}_tp_x^{11}\left(\mu_{x+t}^{10} + \mu_{x+t}^{12} + \mu_{x+t}^{13}\right)$$

Boundary Conditions: ${}_0p_x^{10} = 0 \qquad {}_0p_x^{11} = 1$

### Examiner Report
Graders' Comments:

Most candidates achieved full credit for this part. Common errors included omitting the boundary conditions, or omitting terms on the right hand side. A few candidates forgot the derivatives on the left hand side.

## Part b (3 points)

Estimate ${}_1p_{80}^{10}$ using Euler's forward method, a step size of $h = 1/3$, and the transition intensities and probabilities in the table below:

| $t$ | ${}_tp_{80}^{11}$ | $\mu_{80+t}^{01}$ | $\mu_{80+t}^{03}$ | $\mu_{80+t}^{10}$ | $\mu_{80+t}^{12}$ | $\mu_{80+t}^{13}$ | $\mu_{80+t}^{23}$ |
|---|---|---|---|---|---|---|---|
| 0 | 1.00000 | 0.10000 | 0.02981 | 0.08000 | 0.15000 | 0.05962 | 0.11924 |
| 1/3 | 0.90346 | 0.10000 | 0.03082 | 0.08000 | 0.15000 | 0.06164 | 0.12328 |
| 2/3 | 0.81652 | 0.10000 | 0.03186 | 0.08000 | 0.15000 | 0.06373 | 0.12746 |
| 1 | -- | 0.10000 | 0.03294 | 0.08000 | 0.15000 | 0.06589 | 0.13178 |

### Explanation
From the Kolmogorov equation for $\frac{d}{dt}\,{}_tp_{80}^{10}$, we have

$$\lim_{h\to 0}\frac{{}_{t+h}p_{80}^{10} - {}_tp_{80}^{10}}{h} = {}_tp_{80}^{11}\,\mu_{80+t}^{10} - {}_tp_{80}^{10}\left(\mu_{80+t}^{01} + \mu_{80+t}^{03}\right)$$

So, for small $h$,

$$\frac{{}_{t+h}p_{80}^{10} - {}_tp_{80}^{10}}{h} \approx {}_tp_{80}^{11}\,\mu_{80+t}^{10} - {}_tp_{80}^{10}\left(\mu_{80+t}^{01} + \mu_{80+t}^{03}\right)$$

$$\Rightarrow {}_{t+h}p_{80}^{10} \approx {}_tp_{80}^{10} + h\left[{}_tp_{80}^{11}\,\mu_{80+t}^{10} - {}_tp_{80}^{10}\left(\mu_{80+t}^{01} + \mu_{80+t}^{03}\right)\right]$$

$$\Rightarrow {}_{1/3}p_{80}^{10} \approx 0 + \frac{1}{3}(0.08) = 0.02667$$

and

$${}_{2/3}p_{80}^{10} \approx {}_{1/3}p_{80}^{10} + \frac{1}{3}\left[(0.90346)(0.08) - (0.02667)(0.13082)\right] = 0.04960$$

$${}_1p_{80}^{10} \approx {}_{2/3}p_{80}^{10} + \frac{1}{3}\left[(0.81652)(0.08) - (0.04960)(0.13186)\right] = 0.06919$$

### Examiner Report
Graders' Comments:

This part was quite well done. Many candidates calculated values for ${}_hp_{80}^{11}$, not realizing these had been given to them in the question.

## Part c (4 points)

You are given the following annuity values at 5%:

| $x$ | $\bar{a}_x^{00}$ | $\bar{a}_x^{01}$ | $\bar{a}_x^{02}$ | $\bar{a}_x^{11}$ | $\bar{a}_x^{10}$ | $\bar{a}_x^{12}$ | $\bar{a}_x^{22}$ |
|---|---|---|---|---|---|---|---|
| 80 | 5.5793 | 1.3813 | 0.6109 | 3.0936 | 1.6719 | 1.7206 | 4.4712 |
| 85 | 4.8066 | 1.0396 | 0.3403 | 2.6723 | 0.8834 | 1.0883 | 3.2367 |

You are also given:

- ${}_5p_{80}^{00} = 0.53880 \qquad {}_5p_{80}^{01} = 0.17327 \qquad {}_5p_{80}^{02} = 0.06956$
- $i = 0.05$
- Residents pay a service fee of 8000 per year continuously while in Level 0 or Level 1 Care.
- Level 2 Care costs are paid at a continuous rate of 30,000 per year for lives age 80 to 85, and 40,000 per year for lives older than 85.

A person, who is age 80, is currently in Level 0 Care.

(i) Calculate the expected present value of the person's future Level 0 and Level 1 service fees.

(ii) Calculate the expected present value of the person's future Level 2 Care costs.

(MLC, Fall 2014, Question 4.)

### Explanation
(i) The expected present value of the service fees is

$$EPV = 8000\left(\bar{a}_{80}^{00} + \bar{a}_{80}^{01}\right) = (8000)(5.5793 + 1.3813) = 55{,}685$$

(ii) The expected present values of the level 2 care costs is

$$\begin{align*}
EPV &= (30{,}000)\,\bar{a}_{80}^{02} + (10{,}000)\,{}_{5|}\bar{a}_{80}^{02} \\
&= (30{,}000)\,\bar{a}_{80}^{02} + (10{,}000)\left(v^5\,{}_5p_{80}^{00}\,\bar{a}_{85}^{02} + v^5\,{}_5p_{80}^{01}\,\bar{a}_{85}^{12} + v^5\,{}_5p_{80}^{02}\,\bar{a}_{85}^{22}\right) \\
&= 23{,}005
\end{align*}$$

### Examiner Report
Graders' Comments: This part is designed to test understanding of the multiple state model annuity factor notation, and ability to manipulate the probabilities and annuities to create term annuity factors. It was one of the more challenging parts of the exam overall.

Many candidates achieved full credit for (c)(i). Those who did not tended to combine, for example, $\bar{a}_{80}^{00}$ and $\bar{a}_{80}^{11}$, which would require the person to be in state 0 and state 1 simultaneously at age 80.

In (c)(ii), most candidates did not take all three cases into consideration. Some answers allowed appropriately for one or two cases, and these received partial credit. Some candidates combined, for example, ${}_5p_{80}^{02}$ with $\bar{a}_{80}^{02}$, which is a more serious error, as it indicates a lack of understanding of the functions involved.
