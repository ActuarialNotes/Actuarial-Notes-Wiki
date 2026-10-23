---
id: "altam-2023f-q4"
exam: "Exam ALTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Survival Models for Contingent Cash Flows"
difficulty: medium
type: multi-part
year: 2023
session: Fall
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Transition+Intensity
  - Concepts/Multiple+State+Model
  - Concepts/Estimator
  - Concepts/Probability
points: 9
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:47dc2ebbef3cfcd129c03ec0e3cac704c01cb67ab42b6c5c1b1a096ab9b55f41
  sources:
    - "SOA Exam ALTAM Fall 2023 — exam (question paper), Q4, pp.8-9, sha256:c162b6a75c9ccaedf38fcc9f7f4debf83abcf768f1e6ee6ff0d84e89e3098bc7 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-altam-exam.pdf"
    - "SOA Exam ALTAM Fall 2023 — model solutions and examiners' comments, Q4, pp.9-10, sha256:df2ab0d9bc15ea197487448a071c8d909aa27d14841c082505cbb63358a6b93b — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/altam-fall-2023-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2023f-q4.md
---

Twenty individuals with independent future lifetimes, all exact age 70, are subject to the following multi-state nursing home model:

![State diagram: Healthy 0, Nursing Home 1, Memory Care 2 and Dead 3, with arrows from 0 to 1, from 1 to 0, from 0 to 3, from 1 to 3, from 1 to 2 and from 2 to 3](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-2023f-q4-state-diagram.png)

You are using maximum likelihood estimation to estimate model transition intensities, assuming constant transition intensities.

You are given:

(i) Life A is in State 0 at age 70 and remains in State 0 until she dies at age 70.9.

(ii) Life B is in State 1 at age 70. At age 70.2, she moves into State 0 where she remains until age 70.5. At age 70.5, she moves into State 1 and remains there until she dies at age 70.9.

(iii) Life C is in State 0 at age 70. At age 70.3, she moves into State 1 where she remains until age 70.6. At age 70.6, she moves into State 2 and remains there until age 71.

(iv) Life D is in State 0 at age 70. At age 70.5, she moves into State 1 where she remains until age 70.7 at which point she dies.

(v) Six additional lives are in State 0 at age 70 and remain there until age 71.

(vi) Nine additional lives are in State 1 at age 70 and remain there until age 71.

(vii) One additional life is in State 2 at age 70 and remains there until age 71.

## Part a (1 point)

Explain in words why the contribution to the likelihood of a life who remains in State 0 from age 70 to age 71 is $e^{-(1)\left(\mu_{70}^{01} + \mu_{70}^{03}\right)}$.

### Explanation
The likelihood is the joint probability (density) function of the data. Each data point contributes its associated probability (density).

The probability associated with remaining in State 0 from age 70 to age 71 is

$$
{}_1p_{70}^{\overline{00}} = e^{-\int_0^1 \left(\mu_{70+t}^{01} + \mu_{70+t}^{03}\right)dt} = e^{-1\left(\mu_{70}^{01} + \mu_{70}^{03}\right)}
$$

as the transition forces are constant between integer ages.

### Examiner Report
Part a: Successful candidates gave several reasons why (probability of staying in state 0, constant force, transition to states 1 or 3) and a brief discussion of each. Candidates generally did well here.

## Part b (2 points)

Write an expression for the contribution to the likelihood of Life B expressed entirely in terms of transition intensities.

### Explanation
The contribution is

$$
\begin{align*}
L_B &= {}_{0.2}p_{70}^{\overline{11}}\,\mu_{70}^{10}\,{}_{0.3}p_{70}^{\overline{00}}\,\mu_{70}^{01}\,{}_{0.4}p_{70}^{\overline{11}}\,\mu_{70}^{13} \\
&= {}_{0.6}p_{70}^{\overline{11}}\,{}_{0.3}p_{70}^{\overline{00}}\,\mu_{70}^{10}\,\mu_{70}^{01}\,\mu_{70}^{13} \\
&= \exp\left\{-\left(0.6\left(\mu_{70}^{10} + \mu_{70}^{12} + \mu_{70}^{13}\right) + 0.3\left(\mu_{70}^{01} + \mu_{70}^{03}\right)\right)\right\}\mu_{70}^{10}\,\mu_{70}^{01}\,\mu_{70}^{13}
\end{align*}
$$

### Examiner Report
Part b: The most common error was candidates using actual ages instead of age 70 alone. A few also left answers in terms of probabilities and not transition intensities as the question asked.

## Part c (2 points)

Calculate the maximum likelihood estimate of $\mu_{70}^{01}$.

### Explanation
The MLE of $\mu_{70}^{01}$ is

$$
\hat{\mu}_{70}^{01} = \frac{d_{70}^{01}}{t_{70}^{(0)}} = \frac{3}{0.9 + 0.3 + 0.3 + 0.5 + 6} = \frac{3}{8} = 0.375
$$

The numerator counts the 3 transitions from 0 to 1 (B, C, D) and the denominator counts the total exposure in State 0, i.e. Life A:0.9; Life B:0.3; Life C:0.3: Life D: 0.5, plus 6 other lives at 1 year each.

### Examiner Report
Part c: Common errors here were candidates misunderstanding the total exposure, either by including too many individuals in state zero or using a full year time period instead of the actual time spent in state zero.

## Part d (2 points)

Calculate the maximum likelihood estimate of ${}_1p_{70}^{\overline{00}}$.

### Explanation
Due to the invariance property of MLEs, the MLE for ${}_1p_{70}^{\overline{00}}$ is ${}_1\hat{p}_{70}^{\overline{00}} = e^{-\left(\hat{\mu}_{70}^{01} + \hat{\mu}_{70}^{03}\right)}$.

$$
\hat{\mu}_{70}^{03} = \frac{d_{70}^{03}}{t_{70}^{(0)}} = \frac{1}{0.9 + 0.3 + 0.3 + 0.5 + 6} = \frac{1}{8} = 0.125
$$

$$
\Rightarrow \hat{p}_{70}^{\overline{00}} = e^{-\left(\hat{\mu}_{70}^{01} + \hat{\mu}_{70}^{03}\right)} = e^{-0.5} = 0.6065
$$

### Examiner Report
Part d: This was generally done well. The most common mistake was candidates misunderstanding which states applied (eg, some included transitions from zero to two despite it being impossible per the question).

## Part e (1 point)

Calculate the estimated standard deviation of the maximum likelihood estimate of $\mu_{70}^{01}$.

### Explanation
The SD of $\hat{\mu}_{70}^{01}$ is approximately

$$
\frac{\sqrt{3}}{8} = 0.2165
$$

### Examiner Report
Part e: The most common error was candidates providing the variance when the question asked for the standard deviation.

## Part f (1 point)

The maximum likelihood estimate of $\mu_{70}^{23}$ is 0.

Explain why this transition intensity is estimated to be 0 despite the transition from State 2 to State 3 being a possible transition in the model.

### Explanation
This value of $\mu_{70}^{23}$ is zero since there were no transitions from State 2 to State 3 among the 20 lives being studied.

### Examiner Report
Part f: This was generally done well. There weren't many errors, but some were candidates either not providing enough detail or misunderstanding the question (assuming transition from state 3 to 2 instead of 2 to 3).
