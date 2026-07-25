---
concept: "K-Nearest Neighbors"
exam: exam-mas-ii
topic: "C. Statistical Learning"
correct: C
---
An analyst raises $K$ from 1 to 50. What happens to the fitted decision boundary?

- A) It grows more flexible — averaging over more neighbours uses more information
- B) Its flexibility is unchanged; $K$ only affects how long prediction takes
- C) It smooths out — bias increases while variance falls
- D) Both bias and variance fall, since the estimate is averaged over more points

<!-- rationale: 0: reverses the direction — more neighbours means more smoothing, not more flexibility · 1: treats K as a purely computational knob rather than the tuning parameter · 3: wishes away the bias-variance trade-off -->
