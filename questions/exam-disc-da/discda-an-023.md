---
id: "discda-an-023"
exam: "Exam DISC-DA"
topic: "Structured Data"
learning_objective: "4. Working With Different Types of Data"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Structured+Data
  - Concepts/Unstructured+Data
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:f3356b7547947b091107ad111690812be7f49520ac78bbc7550dc0886c15e942
  sources:
    - "Manning, Raghavan & Schütze, Introduction to Information Retrieval (Cambridge UP, 2008), §1 structured data's canonical example is a relational database; unstructured data has no easy-for-a-computer structure, sha256:2536b9352416ca671cd66b93bd5878c85d7461d479dc730c2f79687e69dd0e65 — https://nlp.stanford.edu/IR-book/html/htmledition/boolean-retrieval-1.html"
    - "Manning, Raghavan & Schütze, Introduction to Information Retrieval (Cambridge UP, 2008), §10 semistructured (XML) data, sha256:6ad525b29d7965f8216806084a9bceb4bf533ad0533acc017fb58ac9724fb5df — https://nlp.stanford.edu/IR-book/html/htmledition/xml-retrieval-1.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-023.md
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
