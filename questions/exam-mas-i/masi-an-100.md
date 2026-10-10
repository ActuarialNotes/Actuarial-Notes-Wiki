---
id: "masi-an-100"
exam: "Exam MAS-I"
topic: "Control Variable"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Control+Variable
  - Concepts/Poisson+Regression
  - Concepts/Offset+Variable
  - Concepts/Categorical+Predictor
  - Concepts/Frequency
points: 3
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a740622478e4fc5ff37a92abcc0e3a36fbed713f0a7b57ee080faf5d4ab81936
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-100.md
---

An auto insurer has two accident years of data, split by vehicle age:

| Accident year | Vehicle age | Exposure | Claims |
|---|---|---|---|
| 2023 | New | 2,000 | 100 |
| 2023 | Old | 8,000 | 440 |
| 2025 | New | 8,000 | 500 |
| 2025 | Old | 2,400 | 165 |

Two Poisson GLMs with a log link and an offset of $\ln(\text{exposure})$ are fitted, each with New as the base level:

- Model 1: vehicle age is the only predictor.
- Model 2: vehicle age and accident year (categorical) are both predictors, with no interaction.

## Part a (1 point)
Calculate the Old/New frequency relativity fitted by Model 1. Give your answer to three decimal places.

### Answer
0.970

### Explanation
With a single categorical predictor and an exposure offset, the Poisson maximum likelihood estimates reproduce each level's observed frequency, so the relativity is the ratio of the one-way frequencies:

$$
\begin{aligned}
\text{Old} &= \frac{440 + 165}{8{,}000 + 2{,}400} \\
&= 0.05817 \\
\text{New} &= \frac{100 + 500}{2{,}000 + 8{,}000} \\
&= 0.06000 \\
\text{Relativity} &= \frac{0.05817}{0.06000} \\
&= \mathbf{0.970}
\end{aligned}
$$

A common wrong entry is **1.031**, the inverse (New/Old). Another is **1.100**, which is Model 2's answer, not Model 1's.

## Part b (1 point)
Calculate the Old/New frequency relativity fitted by Model 2. Give your answer to three decimal places.

### Answer
1.100

### Explanation
Look within each accident year:

$$
\begin{aligned}
2023 &: \frac{440 / 8{,}000}{100 / 2{,}000} = \frac{0.0550}{0.0500} = 1.100 \\
2025 &: \frac{165 / 2{,}400}{500 / 8{,}000} = \frac{0.06875}{0.06250} = 1.100
\end{aligned}
$$

The 2025/2023 ratio is also the same for both vehicle ages (new: 0.0625/0.05 = 1.25; old: 0.06875/0.055 = 1.25), so the four observed frequencies are exactly multiplicative. A main-effects log-link model can therefore fit all four cells exactly, and its maximum likelihood estimates are those ratios: an Old/New relativity of **1.100** (and a 2025 relativity of 1.25).

A common wrong entry is **0.970** again, which would mean adding the year changed nothing; another is **1.031**, the inverse of part a.

## Part c (1 point)
Which relativity should the rating plan use for old vehicles, and why?

- A) 0.970, because accident year is not a rating variable and so should not be in the model
- B) 1.100, because accident year absorbs the trend that the mix shift had loaded onto vehicle age
- C) 0.970, because Model 1 has fewer parameters and is therefore preferred by parsimony
- D) 1.035, the average of the two, since each model captures part of the true effect
- E) 1.375, the product of 1.100 and the 2025 accident-year relativity of 1.25

### Answer
B

### Explanation
Frequency rose 25% from 2023 to 2025, and the book shifted from mostly old vehicles (2023) to mostly new ones (2025). Without accident year, new vehicles are credited with the higher frequency of the year they are concentrated in, so old vehicles look 3% *better* than new; within each year they are 10% *worse*. Accident year is a **control variable**: it belongs in the model so the vehicle-age relativity is measured net of the trend, then it is left out of the rates. The answer is **B**.

- **A** — the fork: dropping a variable because it is not rated leaves its effect to leak into a correlated rating variable, here enough to reverse the sign.
- **C** — parsimony cannot justify a model whose omitted variable biases the coefficient that will be used; Model 2 fits the data exactly while Model 1 does not.
- **D** — averaging a biased and an unbiased estimate is still biased; there is no sense in which each model has "part" of the effect.
- **E** — multiplies in the control variable's effect, which is exactly what the rating plan must not do.
