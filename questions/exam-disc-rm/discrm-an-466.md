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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a96a057aa3952367ab4009c1ae5fd4a52df1f78a50f4f0ecb94ba6afc0f7ec15
  sources:
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.105, 122-123 portfolio not sum; correlation, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "Rittenberg & Martens, Enterprise Risk Management - Understanding and Communicating Risk Appetite (COSO, Jan 2012), pp.1, 6, 11 (appetite definition; tolerance = acceptable level of variation relative to a specific objective), sha256:9d2780c3dae839afe27d56adb9461066548b9ace9c64b46369baf778570d0768 — https://www.coso.org/_files/ugd/3059fc_b0013c9344764b0b8c30a7eb7e5c27c9.pdf"
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
