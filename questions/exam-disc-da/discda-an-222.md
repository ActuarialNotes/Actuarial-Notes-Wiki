---
id: "discda-an-222"
exam: "Exam DISC-DA"
topic: "Statistical Learning"
learning_objective: "Understanding Fundamental Modeling Concepts"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Statistical+Learning
  - Concepts/Supervised+Learning
  - Concepts/Logistic+Regression
answer: "A"
points: 1
---

An insurer has five years of renewal offers, each recorded with the policy's characteristics and whether the policyholder renewed or lapsed. It wants a model that estimates, for each upcoming renewal, whether the policy will lapse. What kind of statistical learning problem is this?

- A) Supervised classification
- B) Supervised regression
- C) Unsupervised clustering
- D) Unsupervised dimension reduction

## Explanation

Each historical record has a response, renewed or lapsed, so a model can be trained on labeled outcomes: the problem is **supervised**. The response is qualitative, one of two classes, so it is a **classification** problem (James et al., §2.1.4–2.1.5). Logistic regression or a classification tree would suit it. The answer is **A**.

**Why not the others**

- **B** — regression problems have a quantitative response, such as claim severity. Renew or lapse is a category.
- **C** — clustering is used when there is no response; here the outcome is recorded.
- **D** — dimension reduction, such as principal components, summarizes predictors and also uses no response.
