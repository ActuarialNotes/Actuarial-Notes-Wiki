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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:12bb804a470759d6c0757fc6877876e52f80115cc0164b7f86138eabd775bfc3
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §7.2 Step Functions, PDF pp.300-301 (C_k(X) = I(c_k <= X < c_k+1); C0+...+CK = 1; least squares on C1..CK with an intercept; avoids a global structure), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
