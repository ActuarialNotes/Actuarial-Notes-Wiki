---
id: "atpa-an-022"
exam: "Exam ATPA"
topic: "Train-Test Split"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Train-Test+Split
  - Concepts/Test+Error
answer: "C"
points: 1
---

An analyst builds a claim-frequency model on five years of policy records, in which each renewal of a policy is a separate record. Determine which of the following statements about the analyst's procedure are true.

- I. Assigning records to the training and test sets at random, so that renewals of one policy fall on both sides, tends to make the test error look better than it will be on new policies.
- II. Imputing missing driver ages with the mean of all five years of data before splitting is acceptable, because the imputation does not use the response.
- III. After the test set has been used to choose between two candidate models, the winner's error on that set tends to understate its true test error.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

Each part of a split can judge a step only if that step has never seen it.

- **I is true.** The split must be made at the right unit, so that one policy's renewals do not fall on both sides. Otherwise the model is tested partly on policies it was trained on.
- **II is false.** Every step that learns from the data, including imputation, must be fitted on the training data alone and applied unchanged to the other sets. A mean taken over all five years uses the test records, whether or not the response is involved.
- **III is true.** A held-out set that has chosen between models has become a validation set. The smallest of several noisy error estimates is biased downward, so the winner's error is optimistic.

I and III are true, so the answer is **C**.

**Why not the others**

- **A** — leaves out III, treating the test error as unbiased even after the set chose the model.
- **B** and **D** — both include II, which accepts a step fitted on data that includes the test set.
- **E** — would need all three true, or another combination, but II is false.
