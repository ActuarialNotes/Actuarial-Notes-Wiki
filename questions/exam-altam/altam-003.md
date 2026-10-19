---
id: "altam-003"
exam: "Exam ALTAM"
topic: "Loss Random Variable"
learning_objective: "Survival Models for Contingent Cash Flows"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Loss+Random+Variable
  - Concepts/Multiple+Decrement+Model
  - Concepts/Expected+Value
  - Concepts/Variance
  - Concepts/Normal+Approximation
points: 10
---

For a special fully discrete two-year term insurance on an individual, age 60, you are given:

(i) The death benefit is 1000 plus the return of gross premiums paid with interest at 6%.

(ii) The following double decrement table, where decrement $(d)$ is death and decrement $(w)$ is withdrawal:

| $x$ | $q_x^{(d)}$ | $q_x^{(w)}$ |
|---|---|---|
| 60 | 0.06 | 0.04 |
| 61 | 0.12 | 0.00 |

(iii) There are no withdrawal benefits.

(iv) $i = 0.06$

(v) $G$ denotes the annual gross premium.

(vi) $L_0$ denotes the insurer's loss at issue random variable for the individual's policy.

## Part a (4 points)

Calculate the values in the following table. Express $L_0$ in terms of $G$ where appropriate:

| Event | Value of $L_0$, Given that the Event Occurred | Probability of Event |
|---|---|---|
| Death in year 1 | | |
| Withdrawal in year 1 | | |
| Death in year 2 | | |
| Neither death or withdrawal | | |

### Explanation
**Death in Year 1:**

$$L_0 \mid \text{Event} = \left(1000 + G(1+i)\right)v - G = 1000v = 943.4$$

Probability $= 0.06$

**Withdrawal in Year 1:**

$$L_0 \mid \text{Event} = -G$$

Probability $= 0.04$

**Death in Year 2:**

$$L_0 \mid \text{Event} = \left(1000 + G(1+i) + G(1+i)^2\right)v^2 - G(1+v) = 1000v^2 = 890.0$$

Probability $= (0.90)(0.12) = 0.108$

**Survival in force to end of year 2:**

$$L_0 \mid \text{Event} = -G(1+v) = -1.9434G$$

Probability $= (0.9)(0.88) = 0.792$

In table form:

| Event | Value of $L_0$, Given that the Event Occurred | Probability of Event |
|---|---|---|
| Death in year 1 | 943.4 | 0.06 |
| Withdrawal in year 1 | $-G$ | 0.04 |
| Death in year 2 | 890.0 | 0.108 |
| Neither death or withdrawal | $-1.9434G$ | 0.792 |

### Examiner Report
Graders' Comments: Most candidates did well in this part. Amongst candidates who did not achieve full marks, the most common problem was determining the amount of the return of premiums benefit.

## Part b (4 points)

(i) Show that $E\left[L_0\right] = a - bG$, where $a$ is 150 to the nearest 10 and $b$ is 1.58 to the nearest 0.01. You should calculate $a$ to the nearest 1 and $b$ to the nearest 0.001.

(ii) Show that $Var\left(L_0\right) = cG^2 + dG + e$, where $c$ is 0.5 to the nearest 0.1, $d$ is 480 to the nearest 10, and $e$ is 116,000 to the nearest 1000. You should calculate $c$ to the nearest 0.01, $d$ to the nearest 1, and $e$ to the nearest 100.

### Explanation
(i)

$$\begin{align*}
E[L_0] &= (943.4)(0.06) + (-G)(0.04) + (890.0)(0.108) + (-1.9434G)(0.792) \\
&= 152.7 - 1.579G
\end{align*}$$

$$\Rightarrow a = 152.7 \quad\text{and}\quad b = 1.579$$

(ii)

$$\begin{align*}
E[L_0^2] &= (943.4)^2(0.06) + (-G)^2(0.04) + (890.0)^2(0.108) + (-1.9434G)^2(0.792) \\
&= 138{,}947 + 3.0312G^2
\end{align*}$$

$$E[L_0]^2 = (152.7 - 1.579G)^2 = 23{,}317 - 482.2G + 2.4932G^2$$

$$V[L_0] = E[L_0^2] - E[L_0]^2 = 115{,}630 + 482.2G + 0.538G^2$$

$$\Rightarrow c = 0.538 \qquad d = 482.2 \qquad e = 115{,}630$$

### Examiner Report
Graders' Comments: The table in part (a) was used by many candidates to answer part (b), as the examiners intended. Standard variance formulas for level benefit term insurance do not work in this case, and candidates who tried to use memorized formulas received no credit for this part.

## Part c (2 points)

The insurer expects to issue 200 such policies to insureds with independent future lifetimes. The premium for each policy is $G = 130$.

Let $L_{agg}$ denote the insurer's aggregate future loss random variable at issue for these 200 policies.

Calculate $\Pr\left(L_{agg} > 0\right)$ using the normal approximation without continuity correction.

(MLC, Fall 2015, Question 4.)

### Explanation
For each policy:

$$E[L_0] = a - bG = -52.57$$

$$V[L_0] = cG^2 + dG + e = 187{,}408$$

So for the aggregate loss

$$E[L_{agg}] = (200)(-52.57) = -10{,}514$$

$$V[L_{agg}] = (200)(187{,}408) = 37{,}481{,}600 = (6122.2)^2$$

$$\begin{align*}
\Rightarrow \Pr[L_{agg} > 0] &= 1 - \Phi\left(\frac{0 - (-10{,}514)}{6122.2}\right) \\
&= 1 - \Phi(1.72) \\
&= 1 - 0.9573 \\
&= 0.0427
\end{align*}$$
