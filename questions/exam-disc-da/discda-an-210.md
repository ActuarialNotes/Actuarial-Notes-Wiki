---
id: "discda-an-210"
exam: "Exam DISC-DA"
topic: "Model Training and Evaluation"
learning_objective: "Understanding Fundamental Modeling Concepts"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Model+Training+and+Evaluation
  - Concepts/Confusion+Matrix
answer: "A"
points: 1
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
\text{Precision} &= \frac{TP}{TP + FP} = \frac{90}{120} \\
&= 0.75 \\
\text{Recall} &= \frac{TP}{TP + FN} = \frac{90}{150} \\
&= 0.60
\end{align*}
$$

Three of every four flagged claims recover, and the model finds 60% of all recoveries. The answer is **A**.

**Why not the others**

- **B** — swaps the denominators. Precision divides by what was flagged, recall by what was actually positive.
- **C** — 0.91 is accuracy, $(90 + 820) / 1{,}000$, not precision.
- **D** — 0.96 is specificity, $820 / 850$, the share of non-recoveries correctly left unflagged, not recall.
