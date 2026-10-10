---
id: "masi-an-134"
exam: "Exam MAS-I"
topic: "Univariate Plot"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Univariate+Plot
  - Concepts/Histogram
  - Concepts/Box+Plot
  - Concepts/Exploratory+Data+Analysis
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f720a706275789cf58cdb4c675bc2634e91e073232bab51c286e7f64e95324bb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-134.md
---

An actuary plots driver age for 50,000 auto policies before building a claim frequency model. The histogram (5-year bins) shows a single smooth hump from age 16 to about 85, peaking in the 40s, with almost nothing between 85 and 95. Then there is a separate bar at exactly age 99 holding 1,100 policies. A further 40 policies have driver age 0. The quartiles of driver age are $Q_1 = 34$ and $Q_3 = 56$.

Determine which of the following statements are true.

- I. The 1,100 policies at age 99 should be investigated as a possible default code for a missing age before any model is fitted.
- II. Because the histogram from 16 to 85 is a single smooth hump, driver age can enter the frequency model as a linear term.
- III. A box plot with fences at 1.5 × IQR beyond the box would flag both the age-0 and the age-99 records as outliers, but would not show that 1,100 records share one value.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I — True.** A smooth age distribution that is nearly empty from 85 to 95 does not suddenly hold 1,100 drivers at exactly 99. A spike at one round, extreme value is the classic sign of a placeholder for missing data (and age 0 is impossible for a driver). Left in, these records would be fitted as very old drivers; they need to be checked, corrected or set aside first.

**II — False.** A histogram shows how driver age is *distributed*, not how claim frequency *depends on* it. Whether the effect is linear has to be read from a plot of frequency against age (or from diagnostics after fitting); for driver age it is usually U-shaped, high for young and for very old drivers.

**III — True.** With $\text{IQR} = 56 - 34 = 22$:

$$
\begin{align*}
\text{lower fence} &= 34 - 1.5(22) = 1 \\
\text{upper fence} &= 56 + 1.5(22) = 89
\end{align*}
$$

so ages 0 and 99 both lie outside the fences and are plotted as outlier points. But the 1,100 records at 99 are all drawn at the same spot, as what looks like a single point: a box plot shows *where* outliers are, not how many share a value. That is why the histogram, not the box plot, exposes the spike.

The true statements are I and III. The answer is **C**.

**Why not the others**

- **A** — misses III, perhaps assuming a box plot would show the pile-up at 99 or would miss the outliers.
- **B** and **D** — accept II, reading the shape of a predictor's own distribution as the shape of its relationship with the response.
- **E** — the true set, I and III, is option C.
