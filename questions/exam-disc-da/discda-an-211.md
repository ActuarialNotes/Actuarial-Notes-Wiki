---
id: "discda-an-211"
exam: "Exam DISC-DA"
topic: "Model Training and Evaluation"
learning_objective: "Understanding Fundamental Modeling Concepts"
difficulty: easy
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Model+Training+and+Evaluation
  - Concepts/Overfitting
  - Concepts/Holdout+Sample
answer: "C"
points: 1
---

An analyst fits four frequency models of increasing complexity on a training set and scores each on a separate validation set:

| Model | 1 | 2 | 3 | 4 |
| :--- | ---: | ---: | ---: | ---: |
| Training error | 30.2 | 26.8 | 24.9 | 23.1 |
| Validation error | 31.5 | 28.0 | 27.6 | 29.9 |

Which model should be selected for final testing?

- A) Model 1
- B) Model 2
- C) Model 3
- D) Model 4

## Explanation

Training error always falls as complexity grows, so it cannot choose between models. Validation error, measured on data the models did not see, falls to Model 3 and then rises: Model 4 is overfitting, fitting noise in the training data. Model 3 has the lowest validation error, and its performance should then be confirmed once on the untouched test set. The answer is **C**.

**Why not the others**

- **A** — the simplest model underfits; its validation error is the highest of the four.
- **B** — Model 2 is close, but its validation error of 28.0 is above Model 3's 27.6.
- **D** — the lowest *training* error belongs to the most flexible model, which is exactly the one overfitting.
