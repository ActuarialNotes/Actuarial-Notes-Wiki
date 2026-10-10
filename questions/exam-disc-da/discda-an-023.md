---
id: "discda-an-023"
exam: "Exam DISC-DA"
topic: "Structured Data"
learning_objective: "Working With Different Types of Data"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Structured+Data
  - Concepts/Unstructured+Data
answer: "C"
points: 1
---

An insurer's analytics team has four new data sources. Which one is structured data, ready to be filtered and summarized with SQL as it stands?

- A) Telematics trip records delivered as JSON, whose labelled fields vary by device
- B) Scanned PDF loss runs supplied by prior carriers
- C) A spreadsheet of agency premium, one row per policy with the same typed columns
- D) Recorded first-notice-of-loss calls from the call centre

## Explanation

Structured data follow a fixed schema: every record has the same named fields, each holding one type of value. A spreadsheet with one row per policy and consistent typed columns meets that test even though it is not in a database, and it can be loaded and queried as a table. The answer is **C**.

**Why not the others**

- **A** — JSON with labelled fields is semi-structured: its pieces are tagged, but the records fit no single fixed table until they are flattened.
- **B** — a scanned PDF is an image of a document; its figures must be extracted before they are data in fields.
- **D** — audio recordings are unstructured, with no predefined fields at all.
