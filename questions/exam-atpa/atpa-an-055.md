---
id: "atpa-an-055"
exam: "Exam ATPA"
topic: "Explainability"
learning_objective: "Model Explainability and Communication"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Explainability
  - Concepts/Shapley+Value
answer: "D"
points: 1
---

A personal auto insurer prices with a GBM. A policyholder calls to ask why her quote is well above what her neighbour pays, and the customer service team asks the pricing actuary for something it can use to answer her.

Which of the following should the actuary provide?

- A) The model's variable importance plot, which ranks the rating variables across the portfolio
- B) The partial dependence plot of each rating variable, showing the model's average response
- C) A SHAP summary plot showing the Shapley values of every policy in the book at once
- D) Her own Shapley values, each turned into a plain sentence of what it adds or takes off
- E) The model's lift chart on holdout data, which shows how well it ranks risks overall

## Explanation

The policyholder's question is about one record: why did this quote come out where it did? That needs a local explanation, and Shapley values split her prediction into the average prediction plus one contribution per feature. Turned into plain sentences ("keeping the car in the city adds this much"), they answer her in her own terms. The answer is **D**.

**Why not the others**

- **A** answers which variables drive the model as a whole, and says nothing about her quote or about which way any variable moves it.
- **B** shows how the prediction moves with one variable on average across the book, not why her prediction is where it is.
- **C** uses the right values but in a form that explains the model to a modeler, not to a policyholder.
- **E** answers how well the model ranks risks, which is a question about the model's value, not about her premium.
