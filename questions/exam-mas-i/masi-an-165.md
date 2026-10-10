---
id: "masi-an-165"
exam: "Exam MAS-I"
topic: "Multiple Comparisons"
learning_objective: "Extended Linear Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Multiple+Comparisons
  - Concepts/ANOVA
  - Concepts/Student's+t-Distribution
  - Concepts/Confidence+Interval
answer: "2.41"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:e5b147762cef6e195fe8076d985f5d2608f4837ea092b27036c97a6d7a220934
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7.3 Bonferroni's method (g statements chosen in advance; t_{1-alpha/(2g), N-r} s_C; at least 1 - alpha), sha256:891d83c90afee1c86a6f33623ffcc5825833a236cc12b89776a755f694ef72f9 — https://www.itl.nist.gov/div898/handbook/prc/section4/prc473.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7 How can we make multiple comparisons? (pairwise tests repeated over all pairs do not hold the overall significance level), sha256:eec606ca847e4f22c97e8c440d0b7033e0fd7362f3f5830a7ea48dee47cc8d32 — https://www.itl.nist.gov/div898/handbook/prc/section4/prc47.htm"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-165.md
---

Mean claim severity (in \$000) is compared across five territories, with 5 claims from each. The one-way ANOVA gives a mean squared error of $\hat\sigma^2 = 1.8$ on 20 degrees of freedom. Before seeing the data, the actuary decided to build Bonferroni intervals for all 10 pairwise differences in territory means, with 90% family-wise confidence.

The $df = 20$ row of the t table (two-sided tail areas) is:

| Two-sided area | 0.20 | 0.10 | 0.05 | 0.02 | 0.01 |
| :--- | ---: | ---: | ---: | ---: | ---: |
| $df = 20$ | 1.325 | 1.725 | 2.086 | 2.528 | 2.845 |

Calculate the half-width of each Bonferroni interval. Give your answer to two decimal places.

## Explanation

The standard error of a pairwise difference uses $\sum c_i^2/n_i = 1/5 + 1/5$:

$$
\begin{align*}
s_{\hat C} &= \sqrt{1.8\left(\tfrac{1}{5} + \tfrac{1}{5}\right)} \\
&= \sqrt{0.72} \\
&= 0.8485
\end{align*}
$$

Bonferroni splits the family's error rate of $\alpha = 0.10$ equally among the $g = 10$ intervals, so each is built with two-sided area 0.10/10 = 0.01, and the multiplier is the 0.01 column, 2.845:

$$
\begin{align*}
\text{half-width} &= 2.845 \times 0.8485 \\
&= \mathbf{2.41}
\end{align*}
$$

Any pair of territories whose means differ by more than \$2,410 is declared different, with at most a 10% chance of any false declaration across all ten comparisons.

**Common wrong entries**

- **1.46** — uses the 0.10 column with no adjustment, so each interval has 90% confidence but the family much less.
- **2.15** — divides $\alpha$ by the number of territories, 5, instead of the number of comparisons, 10, and reads the 0.02 column.
- **1.77** — uses the 0.05 column, the usual 95% interval, ignoring both the family size and the stated 90% level.
- **1.71** — uses $\sqrt{\hat\sigma^2/n} = 0.6$ as the standard error, the standard error of one mean instead of a difference of two.
