---
id: "discrm-an-466"
exam: "Exam DISC-RM"
topic: "Holistic Risk Treatment"
learning_objective: "4. Treating Risk"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Holistic+Risk+Treatment
  - Concepts/Correlation
  - Concepts/Standard+Deviation
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a96a057aa3952367ab4009c1ae5fd4a52df1f78a50f4f0ecb94ba6afc0f7ec15
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-466.md
---
A company's two business units have annual results with standard deviations of \$5 million and \$12 million, and a correlation of 0.25 between them. The board's risk tolerance for the whole company is a standard deviation of \$13 million. What is the company's standard deviation, and is it within tolerance?

- A) \$11.8 million, within tolerance
- B) \$13.0 million, exactly at tolerance
- C) \$14.1 million, above tolerance
- D) \$17.0 million, above tolerance

## Explanation

Portfolio risk is not the simple sum of the parts; it depends on the correlation:

$$
\begin{align*}
\sigma_P &= \sqrt{5^2 + 12^2 + 2(0.25)(5)(12)} \\
&= \sqrt{25 + 144 + 30} \\
&= \sqrt{199} \\
&\approx 14.1
\end{align*}
$$

At \$14.1 million the company is above its \$13 million tolerance, so treatment chosen for the combined position is needed. The answer is **C**.

**Why not the others**

- **A** — \$11.8 million subtracts the correlation term, as if the units were negatively correlated.
- **B** — \$13.0 million assumes the units are uncorrelated, leaving out the term that carries the correlation.
- **D** — \$17.0 million adds the standard deviations, which is correct only if the correlation is 1.
