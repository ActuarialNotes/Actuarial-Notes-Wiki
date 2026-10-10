---
id: "masi-an-131"
exam: "Exam MAS-I"
topic: "Box Plot"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Box+Plot
  - Concepts/Median
  - Concepts/Outlier
points: 4
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a4dd26b875bce92ec099203710360660a0f7b099266955b80c15e6c6ec821aad
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §7.1.6 'What are outliers in the data?': inner fences Q1 - 1.5 IQ, Q3 + 1.5 IQ; outer fences at 3 IQ, sha256:0294f35d537ad06eedd8c983b017077aee7838a3790733cf9605722e4e95791c — https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm"
    - "R documentation, grDevices::boxplot.stats, coef = 1.5: whiskers extend to the most extreme data point no more than coef times the box length from the box; hinges vs quartiles, sha256:202dc113fa952aae23b87aef26e3eb28b384ae53bfa717dc3b86ef46949b78c3 — https://stat.ethz.ch/R-manual/R-devel/library/grDevices/html/boxplot.stats.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-131.md
---

Fifteen liability claims (in thousands) are:

$$
1.2,\ 1.8,\ 2.0,\ 2.5,\ 3.1,\ 3.4,\ 3.9,\ 4.2,\ 4.8,\ 5.5,\ 6.0,\ 7.2,\ 9.5,\ 14.0,\ 22.5
$$

A box plot is drawn with these conventions: $Q_1$ is the median of the seven values below the overall median and $Q_3$ the median of the seven values above it (the overall median is left out of both halves); a point is plotted individually as an outlier if it lies more than 1.5 × IQR beyond the box; each whisker runs to the most extreme value that is not an outlier.

## Part a (1 point)
Calculate the interquartile range. Give your answer to one decimal place.

### Answer
4.7

### Explanation

With $n = 15$ the median is the 8th value, 4.2. The lower half is 1.2, 1.8, 2.0, 2.5, 3.1, 3.4, 3.9, with median $Q_1 = 2.5$; the upper half is 4.8, 5.5, 6.0, 7.2, 9.5, 14.0, 22.5, with median $Q_3 = 7.2$.

$$
\text{IQR} = 7.2 - 2.5 = 4.7
$$

**Common wrong entries**

- **3.8** — keeping the median in both halves (or using linear-interpolation quartiles), which gives $Q_1 = 2.8$ and $Q_3 = 6.6$. The stem fixes the convention.
- **21.3** — the range, maximum minus minimum, rather than the spread of the middle half.

## Part b (1 point)
Calculate the upper fence, $Q_3 + 1.5\,\text{IQR}$. Give your answer to two decimal places.

### Answer
14.25

### Explanation

$$
\begin{align*}
Q_3 + 1.5\,\text{IQR} &= 7.2 + 1.5(4.7) \\
&= 7.2 + 7.05 \\
&= 14.25
\end{align*}
$$

**Common wrong entries**

- **11.25** — adding 1.5 × IQR to the median (4.2) instead of to $Q_3$.
- **21.30** — the outer fence, $Q_3 + 3\,\text{IQR}$.

## Part c (1 point)
Calculate the number of claims plotted as outliers. Give your answer as a whole number.

### Answer
1

### Explanation

The lower fence is $Q_1 - 1.5\,\text{IQR} = 2.5 - 7.05 = -4.55$, below every claim. Above, only 22.5 exceeds 14.25; the claim of 14.0 lies just inside the fence. One outlier.

**Common wrong entries**

- **2** — counting 14.0 as well, which happens with the interpolated quartiles of part a's wrong entry (fence 6.6 + 1.5 × 3.8 = 12.3), or by eye because 14.0 looks far from the box.

## Part d (1 point)
Where does the upper whisker end?

- A) 9.5
- B) 14.0
- C) 14.25
- D) 21.3
- E) 22.5

### Answer
B

### Explanation

The whisker runs to the largest observation that is **not** an outlier. The largest claim inside the fence of 14.25 is 14.0, so the whisker stops at **14.0** and 22.5 is drawn as a separate point.

- **A** — 9.5 is where the whisker would stop if 14.0 were also an outlier.
- **C** — the whisker ends at a data value, not at the fence itself.
- **D** — 21.3 is the outer fence, not an observation.
- **E** — 22.5 is the maximum, but it is plotted on its own as an outlier, so the whisker does not reach it.
