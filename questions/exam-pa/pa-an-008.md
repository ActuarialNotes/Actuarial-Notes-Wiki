---
id: "pa-an-008"
exam: "Exam PA"
topic: "Unstructured Data"
learning_objective: "Data Exploration and Visualization"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Unstructured+Data
answer: "0.1565"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e97ed7724faf2509c7df2b264b35079a3026d1f48e722c1be95a53d5ee39ca36
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-pa/pa-an-008.md
---

An insurer turns 2,000 auto claim notes into a document-term matrix to add features to a severity model. The term "rollover" appears in 40 of the notes. Note #231 is 50 terms long and contains "rollover" twice.

Using natural logs and term frequency as a proportion of the note's length, calculate the tf-idf weight of "rollover" in note #231. Give your answer to four decimal places.

## Explanation

The tf-idf weight of term $j$ in document $i$ is

$$
w_{ij} = \frac{x_{ij}}{\sum_{l} x_{il}} \cdot \ln\frac{n}{\text{df}_j}
$$

The term frequency is $\text{tf} = 2/50 = 0.04$, and the inverse document frequency is $\ln(2{,}000/40) = \ln 50 = 3.9120$. The weight is

$$
w = 0.04 \times 3.9120 = 0.1565
$$

The answer is **0.1565**.

**Common wrong entries**

- **7.8240**: using the raw count, 2, as the term frequency instead of the proportion of the note's length.
- **0.0680**: taking the logarithm in base 10 instead of the natural log the question specifies.
- **-0.1565**: inverting the ratio inside the log, $\ln(40/2{,}000)$. A rare term should get a large positive weight.
