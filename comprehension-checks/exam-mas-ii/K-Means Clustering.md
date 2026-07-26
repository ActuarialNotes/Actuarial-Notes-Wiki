---
concept: "K-Means Clustering"
exam: exam-mas-ii
topic: "C. Statistical Learning"
correct: B
---
An analyst runs the algorithm twice on exactly the same standardized data with $K = 3$, and gets two different partitions. What is the most likely explanation?

- A) A bug — the procedure is deterministic and must repeat itself exactly
- B) It reached different local minima, since the starting assignment is random
- C) $K$ was set too low; a larger $K$ would make the answer unique
- D) The predictors were left on very different measurement scales

<!-- rationale: 0: mistakes guaranteed convergence for a unique solution · 2: treats non-uniqueness as a symptom of too few clusters · 3: names a genuine pitfall that the stem has already ruled out, and which would not cause run-to-run variation anyway -->
