---
id: "masi-an-106"
exam: "Exam MAS-I"
topic: "Predictor Variable"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Predictor+Variable
  - Concepts/Interaction
  - Concepts/Categorical+Predictor
  - Concepts/Variable+Transformation
  - Concepts/Poisson+Regression
  - Concepts/Link+Function
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:20bea70387c0c8cc8426017e553cfbbbe130b8c5c62ce874ba9d3f186eb9cdb7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-106.md
---

A homeowners claim-frequency model is a Poisson GLM with a log link. Its predictors are:

- `aoi`, the amount of insurance in thousands of dollars, entered through its natural logarithm;
- `construction`, categorical with levels Frame (the base) and Masonry;
- `prot_class`, the protection class 1 to 10, entered as a single numeric term;
- an interaction between $\ln(\text{aoi})$ and construction.

| Parameter | $\hat\beta$ |
|---|---|
| Intercept | -5.2000 |
| $\ln(\text{aoi})$ | 0.3000 |
| Construction: Masonry | -0.2000 |
| Protection class | 0.0500 |
| $\ln(\text{aoi}) \times$ Masonry | 0.1000 |

Calculate the expected claim frequency per house-year for a masonry home insured for \$300,000 in protection class 6.

- A) Less than 0.035
- B) At least 0.035, but less than 0.050
- C) At least 0.050, but less than 0.065
- D) At least 0.065, but less than 0.080
- E) At least 0.080

## Explanation

Each predictor enters according to its type: the amount of insurance as $\ln 300$ (thousands), masonry as an indicator equal to 1, protection class as its value 6, and the interaction as $\ln 300 \times 1$.

$$
\begin{aligned}
\ln 300 &= 5.70378 \\
\hat\eta &= -5.2 + 0.3(5.70378) - 0.2 + 0.05(6) + 0.1(5.70378) \\
&= -5.2 + 1.71113 - 0.2 + 0.3 + 0.57038 \\
&= -2.81849 \\
\hat\mu &= e^{-2.81849} \\
&= 0.0597
\end{aligned}
$$

For a masonry home the amount-of-insurance slope is 0.3 + 0.1 = 0.4; for frame it is 0.3. The expected frequency is **0.0597**, in range **C**.

**Why not the others**

- **A** — dropping the interaction term gives $e^{-3.38887} = 0.0337$; with an interaction, the masonry home's slope on $\ln(\text{aoi})$ is not the frame slope.
- **B** — pricing the home as frame (no masonry main effect, no interaction) gives $e^{-3.18887} = 0.0412$.
- **D** — including the interaction but forgetting the masonry main effect of $-0.2$ gives $e^{-2.61849} = 0.0729$.
- **E** — multiplying the interaction coefficient by the unlogged amount, 0.1 × 300 = 30, gives a linear predictor near 26.6 and an impossible frequency; the interaction is with $\ln(\text{aoi})$, the form in which the amount enters.
