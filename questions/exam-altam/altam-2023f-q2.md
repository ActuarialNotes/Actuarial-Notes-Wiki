---
id: "altam-2023f-q2"
exam: "Exam ALTAM"
topic: "Critical Illness Insurance"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: medium
type: multi-part
year: 2023
session: Fall
wiki_link:
  - Concepts/Critical+Illness+Insurance
  - Concepts/Multiple+State+Model
  - Concepts/Woolhouse's+Formula
  - Concepts/Equivalence+Principle
  - Concepts/Thiele's+Differential+Equation
  - Concepts/Policy+Value
points: 12
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:191e2fde564a6338e625a96c4b4a4fc31e979c7bd09b626b424574f4e8e3a1f8
  sources:
    - "SOA Exam ALTAM Fall 2023 — exam (question paper), Q2, pp.4-5, sha256:c162b6a75c9ccaedf38fcc9f7f4debf83abcf768f1e6ee6ff0d84e89e3098bc7 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-altam-exam.pdf"
    - "SOA Exam ALTAM Fall 2023 — model solutions and examiners' comments, Q2, pp.4-6, sha256:df2ab0d9bc15ea197487448a071c8d909aa27d14841c082505cbb63358a6b93b — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/altam-fall-2023-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2023f-q2.md
---

An insurance company offers the following range of options for critical illness (CI) insurance riders attached to a life insurance policy. In each case the critical illness benefit would be paid immediately upon diagnosis of a covered critical illness.

Option A: Partially accelerated death benefit

Option B: Fully accelerated death benefit

Option C: Additional lump sum benefit on CI diagnosis

## Part a (2 points)

For each of the options above, state with reasons which of the following models could be used to calculate premiums and reserves.

Model 1:

![Model 1 state diagram: Healthy 0, Critically Ill 1 and Dead 2, with arrows from 0 to 1 and from 0 to 2](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-2023f-q2-model-1.png)

Model 2:

![Model 2 state diagram: Healthy 0, Critically Ill 1, Dead 2 and Dead 3, with arrows from 0 to 1, from 0 to 2 and from 1 to 3](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-2023f-q2-model-2.png)

Model 3:

![Model 3 state diagram: Healthy 0, Critically Ill 1 and Dead 2, with arrows from 0 to 1, from 0 to 2 and from 1 to 2](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-2023f-q2-model-3.png)

### Explanation
For Option A,

- Model 2 could be used because it allows for a payment upon CI diagnosis, and then two different payment amounts on death, depending on whether the CI benefit had previously been paid.
- Model 1 doesn't work for this option because if the CI benefit is paid, the model doesn't allow for a subsequent DB payment;
- Model 3 doesn't work because it does not distinguish between deaths after CI or deaths without a CI diagnosis, which matters for this option.

For Option B,

- Model 1 or Model 2 or Model 3 could work.

For Option C,

- Either Model 2 or Model 3 could work.
- Model 1 would not work for this option because it only allows for a single payment, and two payments are necessary in the event that the insured receives a CI diagnosis prior to death.

### Examiner Report
For Part (a), most candidate (as printed) understood the features of each model; however very few candidates identified all the applicable models for each option and only picked one.

## Part b (1 point)

A special 10-year term insurance policy issued to a Healthy life age 50 pays 100,000 immediately upon death of the policyholder, and an additional lump sum benefit of 50,000 immediately upon diagnosis of critical illness. Premiums are payable annually while the policyholder is Healthy. You are given that the insurer uses Model 3 for analyzing this policy.

(i) Write down an integral expression for the probability that a new policyholder dies before the policy expires.

(ii) Write down an integral expression for the expected present value of the death benefit.

### Explanation
**(i)**

$$
\int_0^{10}\left({}_tp_{50}^{00}\,\mu_{50+t}^{02} + {}_tp_{50}^{01}\,\mu_{50+t}^{12}\right)dt
$$

$$
\int_0^{10} {}_tp_{50}^{00}\left(\mu_{50+t}^{02} + \mu_{50+t}^{01}\,{}_{10-t}p_{50+t}^{12}\right)dt
$$

$$
\int_0^{10} {}_tp_{50}^{00}\left(\mu_{50+t}^{02} + \mu_{50+t}^{01}\int_0^{10-t} {}_rp_{50+t}^{11}\,\mu_{50+t+r}^{12}\,dr\right)dt
$$

**(ii)**

$$
\int_0^{10} 100{,}000\left({}_tp_{50}^{00}\,\mu_{50+t}^{02} + {}_tp_{50}^{01}\,\mu_{50+t}^{12}\right)v^t\,dt
$$

### Examiner Report
For part (b), most candidates got full credit, except a few put wrong integration limit or consider direct transition from state 0 to 2.

## Part c (2 points)

The insurer values the contract payments using force of interest of $\delta = 0.05$. You are given the following table of actuarial functions under Model 3, at $\delta = 0.05$.

| $x$ | ${}_{10}p_x^{00}$ | ${}_{10}p_x^{01}$ | $\mu_x^{0\bullet}$ | $\bar{a}_x^{00}$ | $\bar{A}_x^{01}$ | $\bar{A}_x^{02}$ | $\bar{A}_x^{12}$ |
|---|---|---|---|---|---|---|---|
| 50 | 0.90880 | 0.04152 | 0.00562 | 13.1491 | 0.21846 | 0.21878 | 0.30227 |
| 60 | 0.75019 | 0.13565 | 0.01542 | 10.0781 | 0.33692 | 0.33714 | 0.41861 |

Show that $\ddot{a}_{50:\overline{10}|}^{00} = 7.8$ to the nearest 0.1, using Woolhouse's 3-term formula. You should calculate the value to the nearest 0.001.

### Explanation

$$
\ddot{a}_{50}^{00} \approx \bar{a}_{50}^{00} + \frac{1}{2} + \frac{\mu_{50}^{0\bullet} + \delta}{12} = 13.65374
$$

$$
\ddot{a}_{60}^{00} \approx \bar{a}_{60}^{00} + \frac{1}{2} + \frac{\mu_{60}^{0\bullet} + \delta}{12} = 10.58355
$$

$$
\ddot{a}_{50:\overline{10}|}^{00} = \ddot{a}_{50}^{00} - e^{-10\delta}\,{}_{10}p_{50}^{00}\,\ddot{a}_{60}^{00} \approx 7.8199
$$

### Examiner Report
For Part (c), most candidate (as printed) did well. Typical mistake was applying Woolhouse's formula to term annuity instead of whole-life annuity.

## Part d (3 points)

Show that the annual net premium is 495 to the nearest 5. You should calculate the value to the nearest 0.1.

### Explanation
EPV Death Benefit:

$$
\begin{align*}
&100{,}000\left(\bar{A}_{50}^{02} - e^{-10\delta}\,{}_{10}p_{50}^{00}\,\bar{A}_{60}^{02} - e^{-10\delta}\,{}_{10}p_{50}^{01}\,\bar{A}_{60}^{12}\right) \\
&= 100{,}000\left(0.21878 - e^{-0.5}(0.9088)(0.33174) - e^{-0.5}(0.04512)(0.41861)\right) \text{ (as printed)} \\
&= 2240.14
\end{align*}
$$

EPV CI Benefit:

$$
\begin{align*}
&50{,}000\left(\bar{A}_{50}^{01} - e^{-10\delta}\,{}_{10}p_{50}^{00}\,\bar{A}_{60}^{01}\right) \\
&= 50{,}000\left(0.21846 - e^{-0.5}(0.9088)(0.33692)\right) \\
&= 1637.23
\end{align*}
$$

EPV Premiums: $7.8199P$

$$
\Rightarrow P = \frac{2240.14 + 1637.23}{7.8199} = 495.83
$$

### Examiner Report
For Part (d), most candidate (as printed) did well. Typical mistake was candidates omitted transition from state 1 to 2 in computing term life insurance.

## Part e (2 points)

You are given the following additional information for a policy in force at time 5:

| $t$ | ${}_tV^{(0)}$ | ${}_tV^{(1)}$ | $\mu_{50+t}^{01}$ | $\mu_{50+t}^{02}$ |
|---|---|---|---|---|
| 5 | 702.6 | 5322.0 | 0.004265 | 0.004835 |
| 6 | 714.3 | 4562.4 | 0.004845 | 0.005234 |

Calculate $\dfrac{d}{dt}\,{}_tV^{(0)}$ at time 5, immediately after the premium payment.

### Explanation

$$
\left.\frac{d}{dt}\,{}_tV^{(0)}\right|_{t=5+} = \left({}_{5+}V^{(0)}\right)\delta - \mu_{55}^{01}\left(50{,}000 + {}_5V^{(1)} - {}_{5+}V^{(0)}\right) - \mu_{55}^{02}\left(100{,}000 - {}_{5+}V^{(0)}\right)
$$

$$
{}_{5+}V^{(0)} = (702.6 + 495.8) = 1198.4
$$

$$
\begin{align*}
\Rightarrow \left.\frac{d}{dt}\,{}_tV^{(0)}\right|_{t=5+} &= (1198.4)0.05 - 0.004265(50{,}000 + 5322.0 - 1198.4) \\
&\quad - 0.004835(100{,}000 - 1198.4) = -648.6
\end{align*}
$$

### Examiner Report
For Part (e), a few candidates got full credit in this part. Most candidates didn't know how to apply Thiele's differentiation equation to the semi-continuous policy where premium is paid at the beginning of the year and death benefit is immediately upon transition. They didn't know where to put the premium payment at the beginning of the year in the Thiele's differential equation.

## Part f (2 points)

Sketch the graph of ${}_tV^{(0)}$ as a function of $t$ for $5 \le t \le 6$. You should mark key numerical values on each axis.

### Explanation
![Model solution sketch of tV(0) for t from 5 to 6. The horizontal axis is marked at 5 and 6; the vertical axis is marked at 702.6, 714.3, 1198.43 and 1210.13. At t = 5 there is a filled dot at 702.6 and an open circle at 1198.43; the curve falls from 1198.43 to a filled dot at 714.3 at t = 6, where a dashed line rises to an open circle at 1210.13](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-2023f-q2-reserve-sketch.png)

### Examiner Report
Most candidates didn't do well in this part (f) and didn't give details of the graph. They didn't realize the graph of reserve has stepwise jumps at premium payment times. Some sketched an increasing curve even though they computed a negative derivative in Part (e).
