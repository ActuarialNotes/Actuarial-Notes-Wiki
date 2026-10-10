---
id: "discda-an-210"
exam: "Exam DISC-DA"
topic: "Model Training and Evaluation"
learning_objective: "7. Understanding Fundamental Modeling Concepts"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Model+Training+and+Evaluation
  - Concepts/Confusion+Matrix
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:97111dfca54a5a92dc9c8c6ebe3bd228f758d18b6160355fcef8eda3a1630785
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), Table 4.7 PDF p.162, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §7.3.1 PDF p.93, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-210.md
---

A subrogation model is tested on 1,000 closed claims, of which 150 produced a recovery. The model flags 120 claims as likely recoveries, and 90 of the flagged claims did produce one. What are the model's precision and recall?

- A) Precision 0.75 and recall 0.60
- B) Precision 0.60 and recall 0.75
- C) Precision 0.91 and recall 0.60
- D) Precision 0.75 and recall 0.96

## Explanation

From the counts: $TP = 90$, $FP = 120 - 90 = 30$, $FN = 150 - 90 = 60$ and $TN = 850 - 30 = 820$.

$$
\begin{align*}
\text{Precision} &= \frac{TP}{TP + FP} \\
&= \frac{90}{120} \\
&= 0.75 \\
\text{Recall} &= \frac{TP}{TP + FN} \\
&= \frac{90}{150} \\
&= 0.60
\end{align*}
$$

Three of every four flagged claims recover, and the model finds 60% of all recoveries. The answer is **A**.

**Why not the others**

- **B** — swaps the denominators. Precision divides by what was flagged, recall by what was actually positive.
- **C** — 0.91 is accuracy, $(90 + 820) / 1{,}000$, not precision.
- **D** — 0.96 is specificity, $\tfrac{820}{850}$, the share of non-recoveries correctly left unflagged, not recall.
