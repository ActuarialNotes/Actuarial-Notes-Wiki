---
id: "discda-an-024"
exam: "Exam DISC-DA"
topic: "Unstructured Data"
learning_objective: "4. Working With Different Types of Data"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Unstructured+Data
  - Concepts/Structured+Data
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:23a22315a4ff3954173007ac57168a3056f0dea469bfef8ec1a5eafbc7c72f42
  sources:
    - "Manning, Raghavan & Schütze, Introduction to Information Retrieval (Cambridge UP, 2008), §6.2.2 tf-idf weighting of terms in documents, sha256:79ac59cc29b8fa1e2ba827f4a992d39e16c7b54e7f60162774098a68f86feaba — https://nlp.stanford.edu/IR-book/html/htmledition/tf-idf-weighting-1.html"
    - "Manning, Raghavan & Schütze, Introduction to Information Retrieval (Cambridge UP, 2008), §1 unstructured data, sha256:2536b9352416ca671cd66b93bd5878c85d7461d479dc730c2f79687e69dd0e65 — https://nlp.stanford.edu/IR-book/html/htmledition/boolean-retrieval-1.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-024.md
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
