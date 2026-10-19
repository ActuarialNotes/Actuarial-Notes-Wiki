---
id: "faml-4-10"
exam: "Exam FAM"
topic: "Whole Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Whole+Life+Insurance
  - Concepts/Pure+Endowment
  - Concepts/Term+Life+Insurance
  - Concepts/Standard+Actuarial+Notation
  - Concepts/Random+Variable
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:791f57167af47f851a9e3eb30d793eb37113776fbc1f7316d4f131ff26f45eff
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-10.md
---

The present value random variable for an insurance policy on $(x)$ is expressed as:

$$Z = \begin{cases} 0, & \text{if } T_{x} \le 10 \\ v^{T_{x}}, & \text{if } 10 < T_{x} \le 20 \\ 2v^{T_{x}}, & \text{if } 20 < T_{x} \le 30 \\ 0, & \text{thereafter} \end{cases}$$

Determine which of the following is a correct expression for $E[Z]$.

[Question 4 on the Spring 2015 exam]

- A) ${}_{10|}\bar{A}_{x} + {}_{20|}\bar{A}_{x} - {}_{30|}\bar{A}_{x}$
- B) $\bar{A}_{x} + {}_{20}E_{x}\,\bar{A}_{x+20} - 2\,{}_{30}E_{x}\,\bar{A}_{x+30}$
- C) ${}_{10}E_{x}\,\bar{A}_{x} + {}_{20}E_{x}\,\bar{A}_{x+20} - 2\,{}_{30}E_{x}\,\bar{A}_{x+30}$
- D) ${}_{10}E_{x}\,\bar{A}_{x+10} + {}_{20}E_{x}\,\bar{A}_{x+20} - 2\,{}_{30}E_{x}\,\bar{A}_{x+30}$
- E) ${}_{10}E_{x}\left[\bar{A}_{x+10} + {}_{10}E_{x+10}\,\bar{A}_{x+20} - {}_{10}E_{x+20}\,\bar{A}_{x+30}\right]$

## Explanation

The benefit payment pattern is a benefit of 1 for death between ages $x+10$ and $x+20$, and a benefit of 2 for death between ages $x+20$ and $x+30$:

![Step chart of the benefit by age at death: nothing before x + 10, a benefit of 1 from x + 10 to x + 20, and 2 from x + 20 to x + 30.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/fam-l-q4-10-benefit-pattern.png)

$$\begin{align*}
E[Z] &= {}_{10}E_{x} \times \bar{A}_{x+10} + {}_{20}E_{x} \times \bar{A}_{x+20} - 2\,{}_{30}E_{x} \times \bar{A}_{x+30}
\end{align*}$$

The answer is **D**.
