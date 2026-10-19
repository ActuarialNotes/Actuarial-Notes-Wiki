---
id: "altam-028"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Profit Analysis"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Profit+Testing
  - Concepts/Profit+Signature
  - Concepts/Discounted+Payback+Period
  - Concepts/Transition+Probability+Matrix
  - Concepts/Chapman-Kolmogorov+Equations
  - Concepts/Policy+Value
points: 10
---

You are performing a profit test on a 50,000, fully discrete 10-year term life insurance policy issued to a healthy life age 60.
The annual premium is waived when the insured is sick.
You are given the following information regarding the policy value basis:

(i) A Markov model with three states: Healthy (0), Sick (1), and Dead (2) is used to value the policy.

(ii) The annual probability transition matrix for an insured age $60 + k$, $k = 0, 1, \cdots, 9$ is:

$$\begin{array}{c} \\ 0 \\ 1 \\ 2 \end{array}
\begin{array}{c}
\begin{array}{ccc} \quad 0 \quad & \quad 1 \quad & \quad 2 \quad \end{array} \\
\begin{pmatrix}
0.90 - 0.01k & 0.05 & 0.05 + 0.01k \\
0.70 - 0.01k & 0.20 & 0.10 + 0.01k \\
0 & 0 & 1
\end{pmatrix}
\end{array}$$

(iii) The annual gross premium is 5000 from the start of the third year.

(iv) Premiums in the first two years are lower.

(v) Reserves are gross premium policy values.

(vi) Issue expenses are 300 per policy.

(vii) Maintenance expenses are 150 incurred at the start of each year, including the first, for all policies in force.

(viii) $i = 6\%$

(ix) The following actuarial present value functions, calculated at $i = 6\%$:

| $k$ | $A_{60+k:\overline{10-k}\vert}^{02}$ | $A_{60+k:\overline{10-k}\vert}^{12}$ | $\ddot{a}_{60+k:\overline{10-k}\vert}^{00}$ | $\ddot{a}_{60+k:\overline{10-k}\vert}^{01}$ | $\ddot{a}_{60+k:\overline{10-k}\vert}^{10}$ | $\ddot{a}_{60+k:\overline{10-k}\vert}^{11}$ |
|---|---|---|---|---|---|---|
| ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ |
| 2 | 0.46667 | 0.49680 | 4.7328 | 0.2533 | 3.3340 | 1.4060 |
| ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ |

(This is Question 1 from the Fall 2018 Written Answer exam.)

## Part a (2 points)

Calculate ${}_2p_{60}^{01}$.

### Explanation
$$\begin{align*}
{}_2p_{60}^{01} &= p_{60}^{00}\,p_{61}^{01} + p_{60}^{01}\,p_{61}^{11} \\
&= (0.9)(0.05) + (0.05)(0.2) \\
&= 0.055
\end{align*}$$

### Examiner Report
*Graders' Comments:*

1. *This part was done correctly by almost all candidates.*
2. *For those who did not receive full credit, two common errors were to use an incorrect annual probability of transition and to calculate only one of two terms.*

## Part b (4 points)

${}_kV^{(j)}$ is the gross premium policy value at the end of year k, for a policy then in state $j$.

(i) Show that ${}_2V^{(0)}$ is 420 to the nearest 10. You should calculate the value to the nearest 1.

(ii) Show that ${}_2V^{(1)}$ is 8880 to the nearest 10. You should calculate the value to the nearest 1.

(iii) You are given that ${}_3V^{(0)} = 1788$. Calculate ${}_3V^{(1)}$.

### Explanation
(i)
$$\begin{align*}
{}_2V^{(0)} &= 50{,}000\,A_{62:\overline{8}|}^{02} + 150\,\ddot{a}_{62:\overline{8}|}^{00} + 150\,\ddot{a}_{62:\overline{8}|}^{01} - 5{,}000\,\ddot{a}_{62:\overline{8}|}^{00} \\
&= 50{,}000(0.46667) + 150(4.7328) + 150(0.2533) - 5{,}000(4.7328) \\
&= 23{,}333.5 + 709.92 + 37.995 - 23{,}664.0 \\
&= 417.415
\end{align*}$$

(ii)
$$\begin{align*}
{}_2V^{(1)} &= 50{,}000\,A_{62:\overline{8}|}^{12} + 150\,\ddot{a}_{62:\overline{8}|}^{10} + 150\,\ddot{a}_{62:\overline{8}|}^{11} - 5{,}000\,\ddot{a}_{62:\overline{8}|}^{10} \\
&= 50{,}000(0.4968) + 150(3.334 + 1.406) - 5{,}000(3.334) \\
&= 24{,}840 + 711 - 16{,}670 \\
&= 8{,}881
\end{align*}$$

(iii)
$$\left({}_2V^{(0)} + 5{,}000 - 150\right)1.06 = p_{62}^{02}(50{,}000) + p_{62}^{00}\,{}_3V^{(0)} + p_{62}^{01}\,{}_3V^{(1)}$$

$$(417.415 + 4850)1.06 = 0.07(50{,}000) + 0.88(1788) + 0.05\,{}_3V^{(1)}$$

$${}_3V^{(1)} = \frac{(5583.46 - 3500 - 1573.44)}{0.05} = 10{,}200.40$$

<u>Alternatively</u>

$$\left({}_2V^{(1)} + 0 - 150\right)1.06 = p_{62}^{12}(50{,}000) + p_{62}^{10}\,{}_3V^{(0)} + p_{62}^{11}\,{}_3V^{(1)}$$

$$(8881 - 150)1.06 = 0.12(50{,}000) + 0.68(1788) + 0.20\,{}_3V^{(1)}$$

$${}_3V^{(1)} = \frac{(9254.86 - 6000 - 1215.84)}{0.2} = 10{,}195.10$$

### Examiner Report
**Graders' Comments:** *Parts (i) and (ii) were done correctly by most candidates; for those who did not receive full credit, a common error was to ignore maintenance expenses. Although most candidates recognized that a recursive formula was needed to answer part (iii), setting it up correctly proved to be challenging for many candidates.*

## Part c (4 points)

You are given the following additional information regarding the profit test for this policy:

- The earned rate is 5.7%.
- The hurdle rate is 8%.
- Pre-contract expenses are 200.
- Maintenance expenses are 60 at the start of each year, including the first, for all policies in force.
- Mortality and morbidity are the same as in the policy value basis.
- Reserves are gross premium policy values.
- There are no withdrawals.
- The profit signature values for $t = 1, 2$ are $\Pi_1 = 84.74$ and $\Pi_2 = 80.35$

(i) Show that $\Pi_3$ is 70 to the nearest 10. You should calculate the value to the nearest 0.1.

(ii) Calculate the Discounted Payback Period.

### Explanation
(i)
$$\begin{align*}
Pr_3^{(0)} &= \left({}_2V^{(0)} + P - 60\right)1.057 - p_{62}^{00}\,{}_3V^{(0)} - p_{62}^{01}\,{}_3V^{(1)} - p_{62}^{02}(50{,}000) \\
&= (417.415 + 5000 - 60)1.057 - (0.88)(1788) - (0.05)(10{,}200.4) - (0.07)(50{,}000) \\
&= 79.328
\end{align*}$$

$$\begin{align*}
Pr_3^{(1)} &= \left({}_2V^{(1)} - 60\right)1.057 - p_{62}^{10}\,{}_3V^{(0)} - p_{62}^{11}\,{}_3V^{(1)} - p_{62}^{12}(50{,}000) \\
&= (8881 - 60)1.057 - (0.68)(1788) - (0.2)(10{,}200.4) - (0.12)(50{,}000) \\
&= 67.877
\end{align*}$$

${}_2p_{60}^{01} = 0.055$ from (a)

$${}_2p_{60}^{00} = (0.9)(0.89) + (0.05)(0.69) = 0.8355$$

$$\begin{align*}
\pi_3 &= {}_2p_{60}^{00}\,Pr_3^{(0)} + {}_2p_{60}^{01}\,Pr_3^{(1)} \\
&= (0.8355)(79.328) + (0.055)(67.877) \\
&= 70.012
\end{align*}$$

(ii)
$$NPV_t = NPV_{t-1} + \pi_t\,v^t = \sum_{k=0}^{t} \pi_k\,v^k; \quad NPV_0 = \pi_0; \quad v = 1/1.08$$

| $t$ | $\pi_t$ | $NPV_t$ |
|---|---|---|
| 0 | -200.00 | -200.00 |
| 1 | 84.74 | -121.54 |
| 2 | 80.35 | - 52.65 |
| 3 | 70.01 | 2.93 |

Alternatively, with $\pi_3 = 70.291$, we get $NPV_3 = 3.150$

The Discounted Payback Period (DPP) is 3 years.

### Examiner Report
**Graders' Comments:** *For part (i), many candidates did not recognize that the expected emerging profit depends on the state at the beginning of the period. Most candidates did well on part (ii). Some candidates discounted the profit signature values at a rate other than the hurdle rate.*
