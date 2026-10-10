---
id: "discda-an-003"
exam: "Exam DISC-DA"
topic: "Data Documentation"
learning_objective: "1. Planning an Insurer Data Modeling Project"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Data+Documentation
  - Concepts/Insurer+Operational+Data
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0bb9529de63755581e8d4a0635fbcebfb6342c55a41178225ce49e639b5a39a4
  sources:
    - "U.S. Geological Survey, Data Management: Data Dictionaries, contents of a data dictionary (data type, size, nullability, business rules, domains/lookup tables, definitions); USGS Survey Manual 502.7 metadata (who produced the data, collection and processing methods, definitions of entities and attributes), sha256:4d1a24d7a64bec6e3f31b3b12d59fb36f14427d6a4aacfa206e393a1274bc830 — https://www.usgs.gov/data-management/data-dictionaries"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.3 printed p.37 (PDF p.43): similar labels do not imply similar definitions, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-003.md
---

Two analysts compute 2024 personal auto claim frequency from the same warehouse tables, using the same 1,500 claims. Analyst 1 reports 0.050 and Analyst 2 reports 0.100. The investigation finds that Analyst 1's extract counted exposure in six-month policy terms (30,000 of them) and Analyst 2's in car-years (15,000). Which piece of documentation would have prevented the disagreement?

- A) A data dictionary entry for the exposure field stating its unit
- B) Metadata recording each extract's run date and record count
- C) A database index on the policy number in both extracts
- D) Lineage showing which system the claim counts came from

## Explanation

The two frequencies differ by exactly the ratio of the exposure bases:

$$
\begin{align*}
f_1 &= \frac{1{,}500}{30{,}000} \\
&= 0.050 \\
f_2 &= \frac{1{,}500}{15{,}000} \\
&= 0.100
\end{align*}
$$

Each six-month term is half a car-year, so nothing in either extract is wrong: the field named exposure simply meant different things. A **data dictionary** fixes each field's definition and unit, which is exactly what was missing. The answer is **A**.

**Why not the others**

- **B** — metadata describes a data set as a whole (its extract date, record count, filters). It would not say what unit a field is in.
- **C** — an index changes how fast a query runs, never what it returns.
- **D** — the claim counts agree (1,500 in both), so tracing their source would find nothing; the difference is in the exposure.
