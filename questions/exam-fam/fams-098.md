---
id: "fams-098"
exam: "Exam FAM"
topic: "On-Leveling"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/On-Leveling
  - Concepts/Parallelogram+Method
  - Concepts/Rate+Change
  - Concepts/Earned+Premium
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7159b72b3f947bd19765acfe7775874b0fc0e9f3704ce7d1510568a5d12933f3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-098.md
---

An insurance company sells one-year policies that have uniformly distributed effective dates.

The following rate changes have occurred:

| Date | Rate Change |
|---|---|
| June 1, CY1 | +10% |
| August 1, CY2 | $r$ |

Rates are currently at the level set on August 1, CY2.

The earned premium at current rates for CY2 is 1.03 times the CY2 earned premium.

Calculate $r$.

- A) 1.7%
- B) 2.4%
- C) 3.3%
- D) 5.3%
- E) 7.5%

## Explanation

Let $P$ represent the rate level before the rate change on June 1, CY1. The rate level $1.1P$ takes effect on June 1, CY1. The rate level $(1.1P)(1 + r)$ takes effect on August 1, CY2, so this level is the current rate level.

The parallelogram method is shown in the diagram below.

![Parallelogram diagram: calendar years CY1, CY2 and CY3 across, 0% to 100% of policies up. Diagonal lines rise from 6/1/CY1 and from a second rate change labelled 8/1/CY1 (as printed; the change is August 1, CY2). The rate level is P before the first line, 1.1P between the lines, and 1.1P(1 + r) after the second.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/fam-s-q098-parallelogram.png)

For CY2, the average rate level for the earned exposure is

$$\begin{align*}
&\frac{1}{2}\left(\frac{5}{12}\right)^2 P + \left[1 - \frac{1}{2}\left(\frac{5}{12}\right)^2 - \frac{1}{2}\left(\frac{5}{12}\right)^2\right](1.1P) + \frac{1}{2}\left(\frac{5}{12}\right)^2(1.1P)(1 + r) \\
&= 0.086806P + 0.909028P + 0.0954861P(1 + r) \\
&= 0.9958\overline{3}P + 0.095486\overline{1}P(1 + r)
\end{align*}$$

The ratio of the earned premium at current rates for CY2 to the CY2 earned premium, which is the on-level factor for CY2, is

$$\begin{align*}
&\frac{(1.1P)(1 + r)}{0.9958\overline{3}P + 0.095486\overline{1}P(1 + r)} \\
&= \frac{1.1}{0.9958\overline{3}/(1 + r) + 0.095486\overline{1}} \\
&= 1.03
\end{align*}$$

$$\begin{align*}
\Rightarrow 1 + r &= 1.02402 \\
\Rightarrow r &= 2.402\%
\end{align*}$$

The answer is **B**.
