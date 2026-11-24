---
id: "pa-an-007"
exam: "Exam PA"
topic: "Unstructured Data"
learning_objective: "Data Exploration and Visualization"
difficulty: easy
type: multi-part
bloom: understand
wiki_link:
  - Concepts/Unstructured+Data
  - Concepts/Structured+Data
points: 4
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7abe7ddbb3b3d115cb174a881146dcbbbc414ea902021e6eef4f3a60d8edc25a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-pa/pa-an-007.md
---

An insurer is building a model to predict which new auto claims will exceed \$50,000. Classify each data source the team has found. An option may be used more than once or not at all.

## Part a (1 point)
Telematics crash events, delivered as JSON records with labelled fields for speed at impact, peak deceleration and airbag deployment.

- A) Structured
- B) Semi-structured
- C) Unstructured

### Answer
B

### Explanation
JSON carries tags that label each piece, so the fields can be parsed mechanically and flattened into rows, but it is not a single table. That is semi-structured data. Calling it **C** and prescribing text mining for it misreads the feed; calling it **A** ignores that it must be parsed and summarized per claim before it is a table.

## Part b (1 point)
A free-text "loss description" column in the claims database, typed by the person taking the first report.

- A) Structured
- B) Semi-structured
- C) Unstructured

### Answer
C

### Explanation
The database table has a schema, but the contents of this column do not: it is free text. A text field sitting in a database column is still unstructured, and it enters a model only after features are extracted, for example as a document-term matrix. **A** confuses the table's schema with the column's contents.

## Part c (1 point)
The policy administration table, with one row per vehicle and fixed fields for vehicle age, coverage and limit.

- A) Structured
- B) Semi-structured
- C) Unstructured

### Answer
A

### Explanation
A fixed schema of records and fields is structured data, and it can join directly on the policy number. Nothing needs parsing or extracting, so **B** and **C** do not apply.

## Part d (1 point)
Recordings of calls between adjusters and claimants.

- A) Structured
- B) Semi-structured
- C) Unstructured

### Answer
C

### Explanation
Audio has no predefined data model, so it is unstructured. It would have to be transcribed to text and then treated like the loss descriptions, which is expensive and subject to consent and privacy rules. It has no labelled fields to parse, so it is not **B**.
