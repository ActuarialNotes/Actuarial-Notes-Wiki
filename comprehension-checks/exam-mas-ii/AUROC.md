---
concept: "AUROC"
exam: exam-mas-ii
topic: "C. Statistical Learning"
correct: C
---
Only 1% of claims in a portfolio are fraudulent, and a model that flags nothing at all is reported as 99% accurate. What score would this model earn on a ranking-based metric?

- A) About 0.99, since both measures reward the same correct classifications
- B) Exactly 0, because it identifies none of the fraudulent claims
- C) About 0.5, the value that indicates no ability to rank frauds above non-frauds
- D) It cannot be computed until a classification threshold is chosen

<!-- rationale: 0: assumes the metric tracks accuracy, the very failure it is meant to expose · 1: reads 0 as "no skill", when 0 means perfectly reversed ranking and 0.5 means no skill · 3: misses threshold-independence, the defining property of the measure -->
