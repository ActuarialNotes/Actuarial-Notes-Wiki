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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:d8a3972d650ee970be169f987d74b9a51e0c0b6d4f37eeffa5070ab407b3f8a2
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §8.2.2.1 Probability plotting (plotting positions (i - 0.5)/n or i/(n+1)), sha256:11a585711628fade71ccff818ff899ca10f9053156cc1a0723da6298ee760f86 — https://www.itl.nist.gov/div898/handbook/apr/section2/apr221.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.21 Normal Probability Plot (ordered response values vs normal order statistic medians), sha256:245e8b264fe656e711181300d3ce443d6c3b4a67a517d1a864bab079327da2de — https://www.itl.nist.gov/div898/handbook/eda/section3/normprpl.htm"
    - "Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016; MAS-I reading), 'QQ and Box Plots to test distribution assumptions' PDF pp.1-2, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
