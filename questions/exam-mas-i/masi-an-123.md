---
id: "masi-an-123"
exam: "Exam MAS-I"
topic: "QQ Plot"
learning_objective: "Extended Linear Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/QQ+Plot
  - Concepts/Order+Statistics
  - Concepts/Normal+Distribution
  - Concepts/Percentile
answer: "-1.04"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d8a3972d650ee970be169f987d74b9a51e0c0b6d4f37eeffa5070ab407b3f8a2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-123.md
---

A linear regression of log claim severity is fitted to 19 claims. To check normality, the analyst draws a normal QQ plot of the 19 standardized residuals: the ordered residuals go on the vertical axis, and the $i$-th smallest is plotted against the standard normal quantile $\Phi^{-1}(p_i)$ with plotting position

$$
p_i = \frac{i}{n+1}
$$

Calculate the horizontal coordinate at which the **third smallest** residual is plotted. Give your answer to two decimal places, with a minus sign if negative (e.g. -0.25).

## Explanation

With $n = 19$ and $i = 3$:

$$
\begin{align*}
p_3 &= \frac{3}{19 + 1} \\
&= 0.15 \\
\Phi^{-1}(0.15) &= -1.0364
\end{align*}
$$

The third smallest residual is plotted at a horizontal coordinate of **-1.04**. If the residuals are standard normal, the point should sit near the reference line there; if the lowest few residuals all fall well below their normal quantiles, the residuals have a heavier lower tail than normal.

**Common wrong entries**

- **-1.12** — uses the other plotting position, $(i - 0.5)/n = 2.5/19 = 0.1316$. Both conventions are in use; the stem fixes $i/(n+1)$.
- **-1.00** — uses $i/n = 3/19 = 0.1579$, which would put the largest residual at $p = 1$, where the normal quantile is infinite.
- **1.04** — counts from the top (the 85th percentile), which is the position of the third *largest* residual.
