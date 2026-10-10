---
id: "masi-an-135"
exam: "Exam MAS-I"
topic: "Histogram"
learning_objective: "Extended Linear Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Histogram
  - Concepts/Probability+Density+Function+(PDF)
answer: "144"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:33284b0b7176b3bca8d916bd5369ead1352f54343a5e4e07232313e2b5af723c
  sources:
    - "R documentation, graphics::hist, freq = FALSE plots probability densities 'so that the histogram has a total area of one', sha256:77630f10cde01668526e0e8ed07b58a325b5bf0a4e235713c7420789c3d92397 — https://stat.ethz.ch/R-manual/R-devel/library/graphics/html/hist.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.14 Histogram: shape of the distribution; relative histogram normalized as a density, sha256:8505d865ba5c787e3179e903ad98276d05386fab18449eb3b554d12b271b58d5 — https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-135.md
---

A histogram of 400 claim amounts (in thousands) is drawn on the **density scale**, with bins of unequal width. The bars are:

| Bin | 0 to 1 | 1 to 2 | 2 to 4 | 4 to 8 | 8 to 16 |
|---|---|---|---|---|---|
| Bar height | 0.34 | 0.20 | 0.10 | 0.04 | 0.0125 |

Each bin includes its left end and excludes its right end. Calculate the number of claims that are at least 2 but less than 8. Give your answer as a whole number.

## Explanation

On the density scale the **area** of a bar, height × width, is the proportion of observations in its bin (and the areas sum to 1: 0.34 + 0.20 + 0.20 + 0.16 + 0.10 = 1). For the two bins from 2 to 8:

$$
\begin{align*}
\text{proportion} &= 0.10 \times 2 + 0.04 \times 4 \\
&= 0.20 + 0.16 \\
&= 0.36 \\
\text{number of claims} &= 0.36 \times 400 \\
&= 144
\end{align*}
$$

The answer is **144**.

**Common wrong entries**

- **56** — reading the bar heights as proportions, $(0.10 + 0.04) \times 400$, ignoring that the bins are 2 and 4 wide.
- **184** — counting every claim of 2 or more, which adds the 8-to-16 bin (0.0125 × 8 × 400 = 40); that bin starts at 8, outside the range asked for.
- **80** — counting only the 2-to-4 bin (0.10 × 2 × 400) and forgetting that the range continues to 8.
