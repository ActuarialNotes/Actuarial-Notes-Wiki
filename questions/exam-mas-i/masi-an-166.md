---
id: "masi-an-166"
exam: "Exam MAS-I"
topic: "Multiple Comparisons"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multi-part
bloom: evaluate
wiki_link:
  - Concepts/Multiple+Comparisons
  - Concepts/ANOVA
  - Concepts/F-Distribution
  - Concepts/Student's+t-Distribution
  - Concepts/Type+I+Error
points: 3
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:954e868c874fbcce4ce6a43cbe3388720de7f5548c7a002d132352bbda45240e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-166.md
---

Mean claim severity (in \$000) is compared across six territories with 5 claims each. The one-way ANOVA gives $\hat\sigma^2 = 4.0$ on 24 degrees of freedom, and its F test rejects equal means. **After looking at the six sample means**, the actuary notices that territories B and E differ most, by $\bar y_B - \bar y_E = 4.0$, and wants a statement about this difference that holds with 95% family-wise confidence.

These percentiles are available:

| Quantity | Value |
| :--- | ---: |
| $t$, two-sided area 0.05, 24 df | 2.064 |
| $t$, two-sided area 0.05/15 = 0.00333, 24 df | 3.258 |
| Studentized range $q_{0.05;\,6,\,24}$ | 4.373 |
| $F_{0.05;\,5,\,24}$ | 2.621 |

## Part a (1 point)
Calculate the half-width of the Scheffé interval for $\mu_B - \mu_E$ at 95% family-wise confidence. Give your answer to two decimal places.

### Answer
4.58

### Explanation
For a pairwise difference with $n = 5$ in each group,

$$
\begin{align*}
s_{\hat C} &= \sqrt{4.0\left(\tfrac{1}{5} + \tfrac{1}{5}\right)} \\
&= 1.2649
\end{align*}
$$

Scheffé's multiplier uses $k - 1 = 5$ numerator degrees of freedom:

$$
\begin{align*}
\text{half-width} &= \sqrt{(k - 1)\,F_{0.05;\,5,\,24}}\; s_{\hat C} \\
&= \sqrt{5(2.621)}\,(1.2649) \\
&= 3.620(1.2649) \\
&= \mathbf{4.58}
\end{align*}
$$

**Common wrong entries**

- **2.05** — leaves out the factor $k - 1$, using $\sqrt{F}$ alone.
- **16.58** — forgets the square root, using $(k - 1)F$ as the multiplier.
- **3.24** — uses $\sqrt{\hat\sigma^2/n}$, the standard error of one mean, instead of the standard error of a difference.

## Part b (1 point)
The actuary wants an interval that keeps the 95% family-wise guarantee for this comparison and, among such intervals, is the narrowest. Which interval should be used, and what does it conclude about $\mu_B - \mu_E$?

- A) The ordinary $t$ interval; the difference is significant
- B) Bonferroni for all 15 pairwise differences; the difference is not significant
- C) Tukey's interval; the difference is significant
- D) Scheffé's interval; the difference is not significant

### Answer
C

### Explanation
The half-widths are

$$
\begin{align*}
\text{ordinary } t &: 2.064(1.2649) = 2.61 \\
\text{Bonferroni, } g = 15 &: 3.258(1.2649) = 4.12 \\
\text{Tukey} &: 4.373\,\sqrt{4.0/5} = 4.373(0.8944) = 3.91 \\
\text{Scheffé} &: 4.58
\end{align*}
$$

Because the pair was chosen *after* seeing which means were farthest apart, the interval must cover every pair it might have been: all 15 pairwise differences. Tukey, Bonferroni with $g = 15$ and Scheffé all do; the ordinary $t$ interval does not. Of the three valid intervals, Tukey's (equal group sizes, all pairwise differences) is the narrowest. Its half-width 3.91 is less than the observed 4.0, so the difference is **significant**. The answer is **C**.

- **A** — the ordinary $t$ interval has 95% confidence for one pre-chosen comparison only. Applied to the largest of 15 differences, its real error rate is far above 5%: about 34% when all six true means are equal.
- **B** — valid, but Bonferroni is wider than Tukey when every pair is covered: 4.12 against 3.91, and it misses the difference.
- **D** — valid, but Scheffé covers *every* contrast, not just pairs, and pays for it with the widest interval.

## Part c (1 point)
Explain why the ordinary $t$ interval is not acceptable here, and why Tukey's interval is preferred to the Bonferroni and Scheffé intervals.

### Explanation
A full-credit answer makes these points:

1. The comparison was **selected by looking at the data**: B and E were picked because their means were farthest apart. A per-comparison 95% interval controls the error rate only for a comparison fixed in advance. Applied to the most extreme of 15 differences, the chance of at least one false finding (the family-wise error rate) is well above 5%.
2. A valid procedure must therefore control the family-wise error rate over **all 15 pairwise differences**. Tukey, Bonferroni with $g = 15$ and Scheffé all do.
3. Tukey's studentized range is built for exactly this family (all pairs, equal sample sizes), so its coverage is exactly 95% and its interval is the narrowest (3.91).
4. Bonferroni is conservative: it guarantees *at least* 95% through the Bonferroni inequality, giving a wider interval (4.12). Scheffé covers every possible contrast, an infinite family far larger than the 15 pairs needed, so it is wider still (4.58). Scheffé would be the right choice if the actuary might look at non-pairwise contrasts, such as the average of three territories against the other three.

**Sample answer.** Because B and E were chosen after seeing that they differed most, the comparison is really one of all 15 pairwise differences, and an ordinary 95% $t$ interval would understate the chance of a false finding. A family-wise procedure is needed. Tukey's interval is designed for all pairwise comparisons with equal group sizes and is exact, so it is narrower (3.91) than the conservative Bonferroni interval (4.12) and Scheffé's interval (4.58), which protects every contrast, not just pairs. Tukey's interval excludes zero, so B and E differ.
