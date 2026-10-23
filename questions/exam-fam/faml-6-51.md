---
id: "faml-6-51"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Deferred+Annuity
  - Concepts/Term+Life+Insurance
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:719cbfc04260123cf8d7a82e5f76a64913c23a565425d6e6412dd4b2bb0fdfe3
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.51, p.90, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.51, p.60, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-51.md
---

For a special 10-year deferred whole life annuity-due of 50,000 on (62), you are given:

(i) Level annual net premiums are payable for 10 years

(ii) A death benefit, payable at the end of the year of death, is provided only over the deferral period and is the sum of the net premiums paid without interest

(iii) $\ddot{a}_{62} = 12.2758$

(iv) $\ddot{a}_{62:\overline{10}|} = 7.4574$

(v) $A^{1}_{62:\overline{10}|} = 0.0910$

(vi) $\displaystyle\sum_{k=1}^{10} A^{1}_{62:\overline{k}|} = 0.4891$

Calculate the net premium for this special annuity.

[A modified version of Question 14 on the Fall 2013 exam (as printed)

- A) 34,400
- B) 34,500
- C) 34,600
- D) 34,700
- E) 34,800

## Explanation

Under the Equivalence Principle

$$P\ddot{a}_{62:\overline{10}|} = 50{,}000\left(\ddot{a}_{62} - \ddot{a}_{62:\overline{10}|}\right) + P\left((IA)^{1}_{62:\overline{10}|}\right)$$

where

$$\begin{align*}
(IA)^{1}_{62:\overline{10}|} &= 11A^{1}_{62:\overline{10}|} - \sum_{k=1}^{10} A^{1}_{62:\overline{k}|} \\
&= 11(0.091) - 0.4891 \\
&= 0.5119
\end{align*}$$

So

$$\begin{align*}
P &= \frac{50{,}000\left(\ddot{a}_{62} - \ddot{a}_{62:\overline{10}|}\right)}{\ddot{a}_{62:\overline{10}|} - (IA)^{1}_{62:\overline{10}|}} \\
&= \frac{50{,}000(12.2758 - 7.4574)}{7.4574 - 0.5119} \\
&= 34{,}687
\end{align*}$$

The answer is **D**.
