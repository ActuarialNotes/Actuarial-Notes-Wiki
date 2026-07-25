---
concept: "Neural Network"
exam: exam-mas-ii
topic: "C. Statistical Learning"
correct: C
---
Every hidden layer of a deep network is built with the identity activation $g(z) = z$. What class of functions can the network then represent?

- A) Any non-linear function — depth by itself supplies the non-linearity
- B) Non-linear functions, so long as each layer is wide enough
- C) Only a linear function of the inputs, however many layers are stacked
- D) Nothing usable; training would simply fail to converge

<!-- rationale: 0: credits depth with non-linearity, when composing linear maps just gives another linear map · 1: credits width instead, same error · 3: mistakes a modelling limitation for a numerical failure -->
