---
id: "atpa-an-052"
exam: "Exam ATPA"
topic: "Actuarial Communication"
learning_objective: "Model Explainability and Communication"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Actuarial+Communication
  - Concepts/Link+Function
answer: "A"
points: 1
---

A log-link frequency GLM for personal auto gives a coefficient of 0.405 for an at-fault claim in the prior three years. The finding is going into a two-page summary for the vice-president of personal lines.

Which sentence states the finding best for that reader?

- A) Drivers with an at-fault claim in the last three years are expected to have about 50% more claims than otherwise similar drivers.
- B) Drivers with an at-fault claim in the last three years are expected to have about 40.5% more claims than otherwise similar drivers.
- C) An at-fault claim in the last three years causes a driver's future claims to rise by about 50% compared with similar drivers.
- D) The at-fault indicator enters the log-link GLM with a coefficient of 0.405 and significantly reduces the model's deviance.
- E) Drivers with an at-fault claim in the last three years are expected to have about 150% more claims than otherwise similar drivers.

## Explanation

In a log-link model a coefficient multiplies the expected outcome by $e^{\hat{\beta}}$, other variables held fixed, so the percentage change is

$$e^{0.405} - 1 = 0.499 \approx 50\%$$

A non-technical reader needs that effect in plain units, as a comparison with otherwise similar drivers, without the model's vocabulary. The answer is **A**.

**Why not the others**

- **B** reads the coefficient itself as the percentage change. On the log scale 0.405 is a change of $e^{0.405} - 1 = 50\%$, and the gap between the two widens as the coefficient grows.
- **C** gets the size right but says the claim causes the increase. The model describes an association between the indicator and frequency.
- **D** is correct but written for a modeler: coefficients and deviance mean nothing to this reader, and the sentence never says what happens to frequency.
- **E** takes the multiplier $e^{0.405} = 1.50$ as the percentage increase. A multiplier of 1.50 is 50% more claims, not 150% more.
