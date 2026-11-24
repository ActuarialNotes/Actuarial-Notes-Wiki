---
id: "atpa-an-024"
exam: "Exam ATPA"
topic: "Linear Mixed Model"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Linear+Mixed+Model
  - Concepts/Random+Effects
  - Concepts/Best+Linear+Unbiased+Predictor
answer: "320"
points: 1
---

An insurer models pure premium by territory with a linear mixed model that has a random intercept for territory and no other predictors. The estimated overall mean is 300, the variance between territories is $\sigma_u^2 = 400$ and the residual variance is $\sigma^2 = 6{,}000$. Territory T, newly added to the book, has 5 policy-years of data with an average pure premium of 380.

Calculate the model's fitted pure premium for territory T. Give your answer as a whole number.

## Explanation

The predicted random intercept is territory T's average residual shrunk toward zero by the credibility weight:

$$
\frac{n_T\sigma_u^2}{n_T\sigma_u^2 + \sigma^2} = \frac{5(400)}{5(400) + 6{,}000} = \frac{2{,}000}{8{,}000} = 0.25
$$

$$
\hat{u}_T = 0.25\,(380 - 300) = 20
$$

The fitted pure premium adds it to the overall mean:

$$
300 + 20 = \mathbf{320}
$$

Territory T has little data, so partial pooling keeps only a quarter of its own deviation and borrows the rest from the other territories.

**Common wrong entries**

- **380** — no pooling: fits territory T on its own data, as a fixed effect would.
- **300** — complete pooling: ignores the territory, as if $\sigma_u^2$ were 0.
- **379** — inverts the variance ratio, using $k = \sigma_u^2/\sigma^2$ instead of $\sigma^2/\sigma_u^2$, which gives a weight near 1.
