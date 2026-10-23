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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:791f57167af47f851a9e3eb30d793eb37113776fbc1f7316d4f131ff26f45eff
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.10, p.31 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.10, p.22 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
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
