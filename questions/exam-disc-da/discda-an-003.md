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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0bb9529de63755581e8d4a0635fbcebfb6342c55a41178225ce49e639b5a39a4
  sources: []
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
