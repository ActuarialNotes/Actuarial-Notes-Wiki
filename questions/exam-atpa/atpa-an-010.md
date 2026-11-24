---
id: "atpa-an-010"
exam: "Exam ATPA"
topic: "Data Warehouse"
learning_objective: "Working with Data"
difficulty: easy
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Data+Warehouse
points: 4
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3857e7645a2ff081ed70330b9a5822a3abd384741b1a59e3d26e6462f43876e7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-010.md
---

An insurer keeps an operational database for its policy system, a data lake, and a data warehouse. Match each request to the store that should serve it. An option may be used more than once or not at all.

## Part a (1 point)
An actuary needs five years of earned premium and incurred losses by territory and month, reconciled to the financial statements, for a rate review.

- A) Operational database
- B) Data lake
- C) Data warehouse

### Answer
C

### Explanation
The warehouse holds cleaned, integrated, historical figures under one set of definitions, reconciled to the financial statements. Pulling them from the operational database (**A**) would mean redoing that integration and could lose history, and the lake (**B**) holds the data raw.

## Part b (1 point)
A data scientist wants adjusters' free-text notes and damage photos to search for new predictors.

- A) Operational database
- B) Data lake
- C) Data warehouse

### Answer
B

### Explanation
A data lake keeps raw data of any structure, including unstructured notes and images, and imposes a structure only when they are read. The warehouse (**C**) holds only structured fields that have already been defined.

## Part c (1 point)
A customer service representative changes the deductible on a policy at the policyholder's request.

- A) Operational database
- B) Data lake
- C) Data warehouse

### Answer
A

### Explanation
Changing a current record is a transaction, which is what the operational database is designed for. The warehouse picks up the change at its next load.

## Part d (1 point)
An auditor asks for written premium by class exactly as it stood at the end of March two years ago, before later corrections.

- A) Operational database
- B) Data lake
- C) Data warehouse

### Answer
C

### Explanation
The warehouse keeps history so that any past month can be reproduced as it stood. The operational database (**A**) holds only the current state, since a change can overwrite the old value.
