---
id: "fams-068"
exam: "Exam FAM"
topic: "Parallelogram Method"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Parallelogram+Method
  - Concepts/On-Leveling
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:91758c64b8a5b977d14e3c403c5919234e8d55e479daeedfe6d8e66b13665d8c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-068.md
---

You are given the following earned premiums for three calendar years:

| Calendar Year | Earned Premium |
|---|---|
| CY5 | 7,706 |
| CY6 | 9,200 |
| CY7 | 10,250 |

All policies have a one-year term and policy issues are uniformly distributed through each year.

The following rate changes have occurred:

| Date | Rate Change |
|---|---|
| July 1, CY3 | + 7% |
| Nov. 15, CY5 | – 4% |
| October 1, CY6 | + 5% |

Rates are currently at the level set on October 1, CY6.

Calculate the earned premium at the current rate level for CY6.

- A) 9300
- B) 9400
- C) 9500
- D) 9600
- E) 9700

## Explanation

Let $P$ be the premium after the July 1, CY3 rate change. On November 15, CY5 the premium is $0.96P$ and on October 1, CY6 it becomes $1.05(0.96)P = 1.008P$. The relevant parallelogram is:

![Parallelogram diagram: calendar years CY5, CY6 and CY7 as three unit squares, with a diagonal line from each rate change. The region before the first line is at P, between the lines at 0.96P, and after the second line at 1.008P.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/fam-s-q068-parallelogram.png)

The upper left triangle for CY6 has area $(1/2)(7/8)^2 = 49/128$ and the lower right triangle has area $(1/2)(1/4)^2 = 4/128$. The weighted average is

$$\begin{align*}
&[49 + 4(1.008) + 75(0.960)]P/128 \\
&= 0.9768P.
\end{align*}$$

The current premium is

$$\begin{align*}
&9200(1.008)/(0.9768) \\
&= 9494.
\end{align*}$$

The answer is **C**.
