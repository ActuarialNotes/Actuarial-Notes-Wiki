---
id: "altam-2025f-q5"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Profit Analysis"
difficulty: hard
type: multi-part
year: 2025
session: Fall
wiki_link:
  - Concepts/Profit+Testing
  - Concepts/Transition+Probability+Matrix
  - Concepts/Multiple+State+Model
  - Concepts/Policy+Value
  - Concepts/Profit+Signature
  - Concepts/Profit+Margin
points: 12
---

NED Insurance Company uses the following multi-state model to price and reserve term life insurance policies offering an additional benefit for lives in Nursing Home care.

*(Figure: Healthy (State 0), Nursing Home (State 1) and Dead (State 2), with arrows from State 0 to State 1, State 1 to State 0, State 0 to State 2 and State 1 to State 2.)*

Let $P_x$ denote the one-year probability transition matrix for a person age $x$. You are given:

$$P_{80} = \begin{bmatrix} 0.80 & 0.15 & 0.05 \\ 0.40 & 0.40 & 0.20 \\ 0 & 0 & 1 \end{bmatrix} \quad\text{and}\quad P_{81} = \begin{bmatrix} 0.70 & 0.20 & 0.10 \\ 0.30 & 0.40 & 0.30 \\ 0 & 0 & 1 \end{bmatrix}$$

You are also given that all transitions occur before the year end.

A Healthy life age 80 purchases a 2-year policy with the following benefits:

- A death benefit of 100,000 payable at the end of the year of death.
- A benefit of 50,000 payable at the end of each year if the policyholder is in a Nursing Home at that time.
- Level gross annual premiums are payable conditional on the policyholder being in State 0 at the payment date.

You are also given:

1. $v = 0.95$
2. The expense to issue the policy is 500. This would be considered a pre-contract cost in a profit testing exercise.
3. The maintenance expense for the policy is 300 at the beginning of each year including the first.

## Part a (3 points)

(i) Calculate the 2-year transition matrix for a life age 80.

(ii) Show that the expected present value of benefits for this policy is 33,000 to the nearest 1000. You should calculate the value to the nearest 1.

### Explanation
**(i)** The 2-year transition matrix is (by matrix multiplication)

$${}_2P_{80} = \begin{pmatrix} 0.80 & 0.15 & 0.05 \\ 0.40 & 0.40 & 0.20 \\ 0 & 0 & 1 \end{pmatrix} \times \begin{pmatrix} 0.70 & 0.20 & 0.10 \\ 0.30 & 0.40 & 0.30 \\ 0 & 0 & 1 \end{pmatrix} = \begin{pmatrix} 0.605 & 0.220 & 0.175 \\ 0.400 & 0.240 & 0.360 \\ 0 & 0 & 1 \end{pmatrix}$$

**(ii)** Using the transition matrix above, the EPV of benefits is:

DB:

$$
\begin{align*}
100{,}000\left({}_1p_{80}^{02}\,v + \left({}_2p_{80}^{02} - {}_1p_{80}^{02}\right)v^2\right) &= 100{,}000\left[(0.05)(0.95) + (0.175 - 0.05)(0.95)^2\right] \\
&= 16{,}031.25
\end{align*}
$$

NHB:

$$
\begin{align*}
50{,}000\left({}_1p_{80}^{01}\,v + {}_2p_{80}^{01}\,v^2\right) &= 50{,}000\left(0.15(0.95) + (0.22)(0.95)^2\right) \\
&= 17{,}052.50
\end{align*}
$$

Total: $\mathbf{33{,}083.75}$

### Examiner Report
1. Overall performance on this question was very variable. Very few candidates omitted the question entirely, and around 30% earned full credit on at least 3 parts of the question. However, for parts (b), (c), and (d), many candidates earned little or no partial credit.
2. Part (a) was done well overall. Many candidates used Excel to multiply the matrices in (a)(i), which earned full credit if correct. In (a)(ii) the most common error was using ${}_2p_{80}^{00}$ for the probability of the death benefit payment in the second year, but that probability includes the probability that the life died in the first year. The deferred probability is required for the year 2 benefit values.

## Part b (1 point)

The gross annual premium for this policy is calculated using the equivalence principle. Show that the gross annual premium is 19,400 to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
$$\text{EPV Expenses: } 500 + 300\left(1 + \left({}_1p_{80}^{00} + {}_1p_{80}^{01}\right)v\right) = 1{,}070.75$$

$$\Rightarrow P = \frac{33{,}083.75 + 1{,}070.75}{1 + 0.8v} = \mathbf{19{,}405.97}$$

### Examiner Report
3. Part (b) was also well done, though many candidates lost some credit, and could not match the given value, because they assumed that the maintenance expenses are only incurred in the Healthy state.

## Part c (2 points)

The gross premium policy value at time $t$ for a policy in state $j$ is denoted ${}_tV^{(j)}$.

(i) Show that ${}_1V^{(0)}$ is $-100$ to the nearest 100. You should calculate the value to the nearest 1.

(ii) Show that ${}_1V^{(1)}$ is 48,000 to the nearest 1000. You should calculate the value to the nearest 1.

### Explanation
**(i)**

$$
\begin{align*}
{}_1V^{(0)} &= 50{,}000v\left({}_1p_{81}^{01}\right) + 100{,}000v\left({}_1p_{81}^{02}\right) + 300 - P \\
&= 50{,}000(0.95)(0.20) + 100{,}000(0.95)(0.10) + 300 - 19.405.97 \\
&= \mathbf{-105.97}
\end{align*}
$$

**(ii)**

$$
\begin{align*}
{}_1V^{(1)} &= 50{,}000v\left({}_1p_{81}^{11}\right) + 100{,}000v\left({}_1p_{81}^{12}\right) + 300 \\
&= 50{,}000(0.95)(0.4) + 100{,}000(0.95)(0.30) \\
&= \mathbf{47{,}800}
\end{align*}
$$

### Examiner Report
4. Part (c) was generally well done, but again some candidates lost points by calculating net premium policy values instead of gross premiums. It is good practice in this exam to read the question several times as you work through it, to ensure that you have fully allowed for all of the information given in the question, including defining terms.

## Part d (5 points)

NED conducts a profit test of the contract using the following assumptions:

1. The earned interest is 12%.
2. The hurdle rate is 10%.
3. Reserves are the gross premium policy values.

All other assumptions are the same as the premium basis above.

The expected profit at time $t$ per policy in state $j$ at time $t-1$ is denoted by $Pr_t^{(j)}$.

(i) Show that $Pr_1^{(0)}$ is 1800 to the nearest 100. You should calculate the value to the nearest 1.

(ii) Calculate $Pr_2^{(0)}$ and $Pr_2^{(1)}$.

(iii) Calculate the profit signature for this policy.

(iv) Calculate the profit margin for this policy.

### Explanation
**(i)**

$$
\begin{align*}
\text{Pr}_1^{(0)} &= (P - 300)(1.12) - p_{80}^{02}(100{,}000) - p_{80}^{01}\left(50{,}000 + {}_1V^{(1)}\right) - p_{80}^{00}\left({}_1V^{(0)}\right) \\
&= (19{,}405.97 - 300)(1.12) - (0.05)(100{,}000) - (0.15)(50{,}000 + 47{,}800) - (0.8)(-105.97) \\
&= \mathbf{1813.46}
\end{align*}
$$

**(ii)**

$$
\begin{align*}
\text{Pr}_2^{(0)} &= \left({}_1V^{(0)} + P - 300\right)(1.12) - p_{81}^{02}(100{,}000) - p_{81}^{01}(50{,}000) \\
&= (-105.97 + 19{,}405.97 - 300)(1.12) - (0.10)(100{,}000) - (0.20)(50{,}000) \\
&= \mathbf{1280}
\end{align*}
$$

$$
\begin{align*}
\text{Pr}_2^{(1)} &= \left({}_1V^{(1)} - 300\right)(1.12) - p_{81}^{12}(100{,}000) - p_{81}^{11}(50{,}000) \\
&= (47{,}800 - 300)(1.12) - (0.3)(100{,}000) - 0.4(50{,}000) \\
&= \mathbf{3200}
\end{align*}
$$

**(iii)** $\text{Pr}_0^{(0)} = -500$

$\Rightarrow$ Profit signature is

$$\Pi = \left(\text{Pr}_0^{(0)},\ \text{Pr}_1^{(0)},\ \left(p_{80}^{00}\,\text{Pr}_2^{(0)} + p_{80}^{01}\,\text{Pr}_2^{(1)}\right)\right)^{T} = \left(\mathbf{-500,\ 1813.46,\ 1504}\right)^{T}$$

**(iv)** NPV is

$$-500 + 1813.46\,v_{10\%} + 1504\,v_{10\%}^2 = 2391.58$$

$$\Rightarrow \text{PM is } \frac{2391.58}{P\left(1 + p_{80}^{00}\,v\right)} = \frac{2391.58}{19{,}405.97\left(1 + 0.8v_{10\%}\right)} = \mathbf{7.135\%}$$

### Examiner Report
5. In part (d), performance was very polarized, likely separating candidates who had studied profit testing in the multiple state context from those who had not. A few candidates who correctly identified the profit signature then used the wrong interest rate for the NPV and profit margin.

## Part e (1 point)

Explain why the profit margin for this contract will increase if NED increases its reserves at time 1.

### Explanation
Because the hurdle rate is less than the earned rate, so holding more capital is beneficial. We accumulate at 12% and discount at 10%.

### Examiner Report
6. Part (e) presented an unusual situation, where the hurdle rate was less than the earned rate on reserves, which inverted the usual relationship between NPV and reserves. A few candidates realized that in this case, it is beneficial to NED to hold more capital (i.e., reserves) at time 1.
