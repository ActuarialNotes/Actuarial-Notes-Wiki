---
id: "discda-an-018"
exam: "Exam DISC-DA"
topic: "Missing Data"
learning_objective: "3. Preparing Data for Analysis"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Missing+Data
  - Concepts/SQL
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8ff06e3a9704deed1ddbd9058ab5ff13bce480b37c7ed98b55e9264a497d67d1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-018.md
---

A policy table holds four policies with deductibles of 500, 1,000, NULL and 1,500. The underwriting manager wants the average deductible with an unrecorded deductible counted at the company's \$500 default. Which expression returns that figure?

- A) `AVG(COALESCE(deductible, 500))`
- B) `AVG(deductible)`
- C) `COALESCE(AVG(deductible), 500)`
- D) `SUM(deductible) / COUNT(deductible)`

## Explanation

`COALESCE(deductible, 500)` returns the deductible where it is recorded and 500 where it is null, so applying it **inside** the average puts the default into the calculation for every row:

$$
\begin{align*}
\text{AVG} &= \frac{500 + 1{,}000 + 500 + 1{,}500}{4} \\
&= 875
\end{align*}
$$

The answer is **A**.

**Why not the others**

- **B** — `AVG` ignores the null, averaging the three recorded deductibles to 1,000.
- **C** — the average of the non-null values is 1,000, which is not null, so the outer `COALESCE` changes nothing. It substitutes 500 only when there are no recorded deductibles at all.
- **D** — `COUNT(deductible)` counts non-null values, so this is the same 1,000 as `AVG(deductible)`.
