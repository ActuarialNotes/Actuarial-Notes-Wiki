---
id: "faml-2-11"
exam: "Exam FAM"
topic: "Fractional Age Assumption"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Fractional+Age+Assumption
  - Concepts/Life+Table
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:69a5a939dde6c4cb2c9861e42a2c90d55d80fd80510921a0a93bec80aad0f695
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-11.md
---

You are given:

i) $q_{80} = 0.04$

ii) $q_{81} = 0.06$

iii) $q_{82} = 0.08$

iv) Deaths between ages 80 and 81 are uniformly distributed

v) Deaths between ages 81 and 82 are subject to a constant force of mortality

Calculate the probability that a person aged 80.6 will die between ages 81.1 and 81.6.

[Question on October 2022 FAM-L Exam]

- A) 0.0294
- B) 0.0296
- C) 0.0298
- D) 0.0300
- E) 0.0302

## Explanation

Let $l_{80} = 1000 \Rightarrow l_{81} = 960 \Rightarrow l_{82} = 902.4$

$$\begin{align*}
\text{Answer} &= \frac{l_{81.1} - l_{81.6}}{l_{80.6}} \\
&= \frac{(960)^{0.9}(902.4)^{0.1} - (960)^{0.4}(902.4)^{0.6}}{(0.4)(1000) + (0.6)(960)} \\
&= 0.02978
\end{align*}$$

The value for $l_{80}$ is arbitrary. Any other starting value gives the same result.

Another form for the survivors between 81 and 82 would be

$\mu = -\ln(902/960) = 0.0095833$;

$l_{81.1} = 960 \times e^{-0.1 \times 0.0095833} = 959.08$;

$l_{81.6} = 960 \times e^{-0.6 \times 0.0095833} = 954.496$.

The answer is **C**.
