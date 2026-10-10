---
id: "discda-an-024"
exam: "Exam DISC-DA"
topic: "Unstructured Data"
learning_objective: "Working With Different Types of Data"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Unstructured+Data
  - Concepts/Structured+Data
answer: "D"
points: 1
---

A claims-triage model is to use the free-text loss descriptions taken at first notice of loss. What has to happen before the descriptions can enter the model as predictors?

- A) Nothing, since the text is already stored in a column of the claims database
- B) The text must be parsed as JSON, since it is semi-structured data
- C) The descriptions must first be moved into a separate data mart
- D) Features must be extracted, such as term counts in a document-term matrix

## Explanation

Free text has no predefined data model, so it cannot enter a model as typed variables until features are extracted from it. A common route tokenizes the text and counts terms, giving a document-term matrix (often weighted, as with tf-idf) with one row per claim and one column per term. That matrix is structured and can be used by a model. The answer is **D**.

**Why not the others**

- **A** — storage is not structure: a database column of notes still holds unstructured text.
- **B** — JSON is semi-structured because it carries labelled fields. A typed description has no labels to parse.
- **C** — where the text is stored does not change its form; it is still free text.
