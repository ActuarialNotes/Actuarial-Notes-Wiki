---
id: "fams-070"
exam: "Exam FAM"
topic: "Parallelogram Method"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Parallelogram+Method
  - Concepts/On-Leveling
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:380fd76cc47388f3e1c85a11a014ae856d0ca5c03945b40a995204509949cc93
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-070.md
---

You are given:

i) Policies are written uniformly throughout the year.

ii) Policies have a term of 6 months.

iii) The following rate changes have occurred:

| Date | Amount |
|---|---|
| October 1, CY1 | +7% |
| July 1, CY2 | +10% |
| September 1, CY3 | –6% |

Rates are currently at the September 1, CY3 level.

Calculate the on-level factor needed to adjust CY2 earned premiums to the current rate level.

- A) 0.97
- B) 0.98
- C) 0.99
- D) 1.00
- E) 1.01

## Explanation

Let $P$ be the premium prior to the October 1, CY1 rate change. After the change, the premium is $1.07P$ and on July 1, CY2 it becomes $1.10(1.07)P = 1.177P$. The relevant parallelogram is:

![Parallelogram diagram for six-month policies: calendar years CY1, CY2 and CY3 as three unit squares, with a steep diagonal line from each rate change. The region before the first line is at P, between the lines at 1.07P, and after the second line at 1.177P.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/fam-s-q070-parallelogram.png)

The upper left triangle for CY2 has area $(1/2)(1/4)(1/2) = 1/16$ and the lower right triangle has area $(1/2)(1/2)(1) = 4/16$. The weighted average is

$$\begin{align*}
&[1 + 4(1.177) + 11(1.07)]P/16 \\
&= 1.092375P.
\end{align*}$$

The factor is

$$\begin{align*}
&(1.177 \times .94)/(1.092375) \\
&= 1.0128.
\end{align*}$$

The answer is **E**.
