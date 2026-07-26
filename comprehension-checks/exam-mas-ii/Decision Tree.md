---
concept: "Decision Tree"
exam: exam-mas-ii
topic: "C. Statistical Learning"
correct: A
---
Two analysts fit trees to datasets that differ in only a handful of rows, and end up with trees that split on entirely different variables. What does this illustrate?

- A) High variance — an early greedy split changes, and every split below it follows
- B) High bias — the method systematically under-fits the response
- C) An error somewhere, since a deterministic algorithm on near-identical data must agree
- D) Only that the two trees were pruned at different complexity penalties

<!-- rationale: 1: names the opposite failure mode; single trees are low-bias, high-variance · 2: mistakes determinism given fixed data for stability under perturbed data · 3: blames a tuning parameter that would not explain sensitivity to the data itself -->
