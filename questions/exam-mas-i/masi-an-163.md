---
id: "masi-an-163"
exam: "Exam MAS-I"
topic: "Step Function"
learning_objective: "Extended Linear Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Step+Function
  - Concepts/Ordinary+Least+Squares
  - Concepts/Categorical+Predictor
answer: "-4"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:12bb804a470759d6c0757fc6877876e52f80115cc0164b7f86138eabd775bfc3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-163.md
---

Ten policies' loss costs (in \$00) are fitted by least squares with a step function of driver age $X$, using cutpoints $c_1 = 25$, $c_2 = 45$ and $c_3 = 65$:

$$
y_i = \beta_0 + \beta_1 C_1(x_i) + \beta_2 C_2(x_i) + \beta_3 C_3(x_i) + \epsilon_i
$$

where $C_1(X) = I(25 \le X < 45)$, $C_2(X) = I(45 \le X < 65)$ and $C_3(X) = I(65 \le X)$.

| Driver age | 19 | 23 | 28 | 36 | 44 | 45 | 52 | 60 | 66 | 74 |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Loss cost | 9 | 11 | 7 | 6 | 8 | 8 | 6 | 4 | 7 | 9 |

Calculate $\hat\beta_2$. Give your answer as a whole number, with a minus sign if it is negative.

## Explanation

With an intercept and one indicator per bin above the first, least squares fits each bin's mean. Place each driver by the rule $c_k \le X < c_{k+1}$; the 45-year-old belongs to the $C_2$ bin, not the one below:

$$
\begin{align*}
X < 25 &: \frac{9 + 11}{2} = 10 \\
25 \le X < 45 &: \frac{7 + 6 + 8}{3} = 7 \\
45 \le X < 65 &: \frac{8 + 6 + 4}{3} = 6 \\
65 \le X &: \frac{7 + 9}{2} = 8
\end{align*}
$$

$\hat\beta_0 = 10$ is the mean of the reference bin ($X < 25$), and each other coefficient is its bin's mean minus 10:

$$
\begin{align*}
\hat\beta_2 &= 6 - 10 \\
&= \mathbf{-4}
\end{align*}
$$

Drivers aged 45 to 64 have average loss costs \$400 lower than drivers under 25.

**Common wrong entries**

- **-5** — puts the 45-year-old in the 25–44 bin, so the $C_2$ bin's mean is $(6 + 4)/2 = 5$. The cutpoint belongs to the bin it starts.
- **6** — reports the bin's mean, $\hat\beta_0 + \hat\beta_2$, instead of its difference from the reference bin.
- **-1.5** — measures the bin against the overall mean of 7.5 instead of the omitted bin $X < 25$.
- **-1** — measures the bin against the neighbouring 25–44 bin, as if the coefficients were successive steps.
