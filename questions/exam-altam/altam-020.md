---
id: "altam-020"
exam: "Exam ALTAM"
topic: "Joint Life"
learning_objective: "Joint Life Insurance and Annuities"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Joint+Life
  - Concepts/Multiple+State+Model
  - Concepts/Transition+Intensity
  - Concepts/Equivalence+Principle
  - Concepts/Insurance+Premium
points: 10
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:1db5d276da1a582b028fa207d644c0198efe97fd502a6a8b1d5b43f67345279c
  sources:
    - "SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q20, pp.38-39, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q20, pp.37-38, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-020.md
---

An insurer uses the following model for joint life policies.

![State diagram: 0, (x) alive and (y) alive; 1, (x) alive and (y) dead; 2, (x) dead and (y) alive; 3, (x) dead and (y) dead; 4, (x) dead and (y) dead. Arrows run 0 to 1, 0 to 2, 0 to 4, 1 to 3 and 2 to 3.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-020-state-diagram.png)

You are given the following additional information

(i) $\mu_w^*$ is the force of mortality for a life age $w$ under the Standard Ultimate Life Table.

(ii) $\mu_{x+t:y+t}^{01} = \mu_{y+t}^* - 0.0005$; $\mu_{x+t:y+t}^{02} = \mu_{x+t}^* - 0.0005$; $\mu_{x+t:y+t}^{04} = 0.0005$

(iii) $\mu_{x+t:y+t}^{13} = 1.2\mu_{x+t}^*$; $\mu_{x+t:y+t}^{23} = 1.05\mu_{y+t}^*$

(iv) $i = 0.05$

(v) For $x = 40$ and $y = 50$, $\bar{a}_{x:y:\overline{10}|}^{00} = 7.8487$ and $\bar{A}_{x:y:\overline{10}|}^{03} = 0.00789$

## Part a (2 points)

Describe two ways that dependency is incorporated in this model.

### Explanation
<u>Common shock</u>:
Simultaneous deaths represented by transitions from State 0 to State 4.

<u>Broken heart syndrome</u>:
Mortality of surviving life is higher than individual mortality when both are alive, $\mu^{13} > \mu^{02}$ and $\mu^{23} > \mu^{01}$.

### Examiner Report
**Graders' Comments:** *Performance on this part was mixed. Many candidates identified only one way that dependency is incorporated in the model.*

## Part b (3 points)

(i) Calculate ${}_{10}p_{50}^{23}$.

(ii) Calculate ${}_{10}p_{x:y}^{00}$ for $x = 40$ and $y = 50$.

### Explanation
(i)
$$\begin{align*}
{}_{10}p_{50}^{23} &= 1 - \exp\left(-\int_0^{10} 1.05\,\mu_{50+t}^*\,dt\right) \\
&= 1 - \exp\left(-\int_0^{10} \mu_{50+t}^*\,dt\right)^{1.05} \\
&= 1 - \left({}_{10}p_{50}\right)^{1.05} \quad \text{where } {}_{10}p_{50} \text{ is from the SULT} \\
&= 0.020678
\end{align*}$$

(ii)
$$\begin{align*}
{}_{10}p_{40:50}^{00} &= \exp\left(-\int_0^{10} \mu_{40+t:50+t}^{01} + \mu_{40+t:50+t}^{02} + \mu_{40+t:50+t}^{04}\,dt\right) \\
&= \exp\left(-\int_0^{10} \left(\mu_{50+t}^* - 0.0005\right) + \left(\mu_{40+t}^* - 0.0005\right) + 0.0005\,dt\right) \\
&= e^{0.005}\,{}_{10}p_{40}\,{}_{10}p_{50} \\
&= 0.977654
\end{align*}$$

### Examiner Report
**Graders' Comments:** *Only the most well-prepared candidates achieved full or nearly full credit on this part. Partial credit was awarded to candidates who showed some understanding of the question by writing down some formulas relevant to the calculation of these probabilities of transition.. (as printed)*

## Part c (3 points)

A couple, $(x)$ who is age 40 and $(y)$ who is age 50, buys a special 10-year joint life insurance policy with the following features:

- Level premiums are payable continuously while in State 0.
- A death benefit of 100,000 is payable immediately on the second death.
- If the deaths are simultaneous, the death benefit is increased to 300,000.

Calculate the annual net premium rate.

### Explanation
Note that we must use the given information, that $\bar{a}_{40:50:\overline{10}|}^{00} = 7.8487$ and $\bar{A}_{40:50:\overline{10}|}^{03} = 0.00789$. The equation of value is

$$P\,\bar{a}_{40:50:\overline{10}|}^{00} = 100{,}000\,\bar{A}_{40:50:\overline{10}|}^{03} + 300{,}000\,\bar{A}_{40:50:\overline{10}|}^{04}$$

$$\begin{align*}
\bar{A}_{40:50:\overline{10}|}^{04} &= \int_0^{10} {}_tp_{40:50}^{00}\,\mu_{40+t:50+t}^{04}\,e^{-\delta t}\,dt \\
&= 0.0005\int_0^{10} {}_tp_{40:50}^{00}\,\mu_{40+t:50+t}^{04}\,e^{-\delta t}\,dt \\
&= 0.0005\,\bar{a}_{40:50:\overline{10}|}^{00} \\
&= 0.00392435
\end{align*}$$

$$\Rightarrow P = 250.53$$

### Examiner Report
**Graders' Comments:** *Most candidates were able to write down the formula needed to calculate the premium. Some candidates were also able to write down a correct expression for $\bar{A}_{40:50:\overline{10}|}^{04}$ but only a few recognized that it could be calculated from the given value for $\bar{a}_{40:50:\overline{10}|}^{00}$.*

## Part d (2 points)

State with reasons whether each of the following would be higher, lower or stay the same if $\mu_{x+t:y+t}^{23}$ is increased to $1.15\mu_{y+t}^*$, assuming all other transition intensities are as given above.

(i) $\bar{a}_{x:y:\overline{10}|}^{00}$

(ii) $\bar{A}_{x:y:\overline{10}|}^{03}$

(iii) $\bar{a}_{x|y}$

(iv) The annual net premium for the contract in (c).

(This is Question 3 from the Fall 2019 Written Answer exam.)

### Explanation
(i) $\bar{a}_{x:y:\overline{10}|}^{00}$: Stays the **same**.
The transition intensities leaving State 0 do not change and it is impossible to return to State 0 after leaving it.

(ii) $\bar{A}_{x:y:\overline{10}|}^{03}$: Would be **higher**.
If (y) dies first, no impact. If (x) dies first, (y) is likely to die sooner which will increase the EPV of the insurance benefit.

(iii) $\bar{a}_{x|y}$: This corresponds to $\bar{a}_{x:y}^{02}$ in this model. Would be **lower**.
This annuity is payable while (y) is alive after the death of (x). Since in this case, (y) is likely to die sooner, the EPV of the annuity payments will decrease.

(iv) Premium: Would be **higher**.
Since $\bar{a}_{x:y:\overline{10}|}^{00}$ and $\bar{A}_{x:y:\overline{10}|}^{04}$ would stay the same but $\bar{A}_{40:50:\overline{10}|}^{03}$ would increase, the premium in (c) would increase.

### Examiner Report
**Graders' Comments:** *Most candidates received partial credit for correctly justifying the impact of the change on some of the four given actuarial functions. A small number of candidates adequately justified the impact of the change on all four functions.*
