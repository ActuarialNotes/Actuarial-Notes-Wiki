---
id: "discda-an-222"
exam: "Exam DISC-DA"
topic: "Statistical Learning"
learning_objective: "7. Understanding Fundamental Modeling Concepts"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Statistical+Learning
  - Concepts/Supervised+Learning
  - Concepts/Logistic+Regression
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:44d5b7bd09859a3dca5516483f1907deb77095ace9a83a2a14ddbae1e2dac4cb
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §2.1.4-2.1.5 PDF pp.37-39, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-222.md
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
