---
concept: "Gini Index"
exam: exam-mas-ii
topic: "C. Statistical Learning"
correct: C
---
A model report quotes a value of 0.6, using the ranking-performance sense of the measure rather than the node-impurity sense. What AUROC does that correspond to?

- A) 0.6 — the two are the same quantity under different names
- B) 0.3, half the quoted value
- C) 0.8
- D) 0.4, one minus the quoted value

<!-- rationale: 0: collapses the two metrics, ignoring the rescaling between them · 1: halves the value instead of inverting Gini = 2·AUROC − 1 · 3: reaches for a complement, the wrong transformation entirely -->
