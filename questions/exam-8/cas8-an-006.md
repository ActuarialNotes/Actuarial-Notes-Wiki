---
id: "cas8-an-006"
exam: "Exam 8"
topic: "Vehicle Make and Model"
learning_objective: "Classification Ratemaking"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Vehicle+Make+and+Model
  - Concepts/High+Dimensional+Variables
  - Concepts/Cross-Validation
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:41f2637f1060dcc32809141fb31a07dc861d6c4fdfb42d5bd49cde1f989aa90d
  sources:
    - "Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §6.2-6.3, §6.7.3, PDF pp.86-91, 104, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-8/cas8-an-006.md
---

A modeler adds vehicle make and model, with about 12,000 levels, to a physical damage frequency GLM. For each make and model, a credibility-shrunk mean frequency is computed from the whole training set and added as a single numeric feature (target encoding). In 5-fold cross-validation the new model looks far better than the old one, and the encoded feature gets a large coefficient. On a later holdout year it does worse than the old model without the feature. Every make and model in the holdout year also appears in the training data.

What is the most likely cause, and the fix?

- A) Make and model has too many levels to carry any signal, so the feature should be dropped
- B) The shrinkage should use the Bühlmann ratio of variances rather than a $\lambda$ chosen by cross-validation
- C) Make and model should be one-hot encoded in an unpenalized GLM, so each level gets its own coefficient
- D) Each record's encoding includes its own claims, so each fold should be encoded from the other folds only
- E) New makes and models in the holdout were encoded as zero, so they should get the overall mean instead

## Explanation

Chalk et al. (Section 6.3) call this **leakage**: letting the model see the target, or part of it, during training. A target-encoded feature computed from all the training data contains each record's own outcome. Many make-and-model levels have only a few vehicles, so for them the encoding is close to the record's own claim experience. The GLM leans on it, cross-validation rewards it because the validation folds' own claims are inside the feature, and the model falls apart on data it has never seen.

The fix is out-of-fold encoding. For observations in any one fold, the encoding uses only the observations in the other folds. The answer is **D**.

**Why not the others**

- **A** jumps to a conclusion. Chalk et al. do ask whether a high-cardinality variable is really predictive, but this experiment can't answer that while the feature leaks. Encode it properly first.
- **B** changes how much the levels are shrunk, but every level would still be encoded with its own claims. Chalk et al. note that a $\lambda$ chosen by cross-validation may generalize better than the theoretical ratio.
- **C** makes overfitting worse. Thousands of unpenalized coefficients are unreliable for levels with few observations, which is why encoding was used.
- **E** is ruled out by the stem. Every holdout make and model was seen in training, so no level was a novel category.
