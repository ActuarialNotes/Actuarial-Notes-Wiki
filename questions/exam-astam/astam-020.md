---
id: "astam-020"
exam: "Exam ASTAM"
topic: "Chain Ladder Method"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Chain+Ladder+Method
  - Concepts/Bühlmann-Straub+Credibility
  - Concepts/Bornhuetter-Ferguson+Method
  - Concepts/Unpaid+Claims
  - Concepts/Development+Factor
points: 5
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:75d554aa19e1a4e3699bb71da9f9c185a71f13ccdcdb5825abdd469fd5ea5aad
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q20, p.25, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q20, pp.37-39, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-020.md
---

You are given the following run-off triangle of incremental claim payments, $X_{ij}$. Assume all claims are settled by the end of development year 4.

| Accident Year (AY) $i$ | DY $j$ = 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| 0 | 1023 | 132 | 188 | 43 | 10 |
| 1 | 1358 | 350 | 197 | 25 | |
| 2 | 1283 | 283 | 172 | | |
| 3 | 1503 | 508 | | | |
| 4 | 1536 | | | | |
| $\hat{\beta}_j$ | 0.6931 | ? | 0.9725 | 0.9928 | 1.000 |
| $\hat{\gamma}_j$ | 0.6931 | ? | 0.1086 | 0.0204 | 0.0072 |

## Part a

(i) Show that $\hat{\beta}_1 = 0.86$ to the nearest 0.01. You should calculate the value to the nearest 0.001.

(ii) Show that $\hat{\gamma}_1 = 0.17$ to the nearest 0.01. You should calculate the value to the nearest 0.001.

### Explanation

The cumulative claim run-off triangle is:

| Accident Year (AY) $i$ | DY $j$ = 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| 0 | 1023 | 1155 | 1343 | 1386 | 1396 |
| 1 | 1358 | 1708 | 1905 | 1930 | |
| 2 | 1283 | 1566 | 1738 | | |
| 3 | 1503 | 2011 | | | |
| 4 | 1536 | | | | |
| $\hat{f}_j$ | 1.2464 | 1.1258 | 1.0209 | 1.0072 | |
| $\hat{\lambda}_j$ | 1.4428 | 1.1576 | 1.0283 | 1.0072 | |
| $\hat{\beta}_j$ | 0.6931 | ? | 0.9725 | 0.9928 | 1.000 |
| $\hat{\gamma}_j$ | 0.6931 | ? | 0.1086 | 0.0204 | 0.0072 |

$$
\begin{align*}
\hat{f}_0 &= \frac{1155 + 1708 + 1566 + 2011}{1023 + 1358 + 1283 + 1503} \\
          &= 1.2464 \\
\hat{f}_1 &= \frac{1343 + 1905 + 1738}{1155 + 1708 + 1566} \\
          &= 1.1258 \\
\hat{f}_2 &= \frac{1386 + 1930}{1343 + 1905} \\
          &= 1.0209 \\
\hat{f}_3 &= \frac{1396}{1386} \\
          &= 1.0072
\end{align*}
$$

$\hat{\lambda}_3 = \hat{f}_3 = 1.0072$; $\hat{\lambda}_2 = \hat{f}_2 \times \hat{\lambda}_3 = 1.0283$; $\hat{\lambda}_1 = \hat{f}_1 \times \hat{\lambda}_2 = 1.1576$; $\hat{\lambda}_0 = \hat{f}_0 \times \hat{\lambda}_1 = 1.4428$.

$$
\hat{\beta}_1 = \frac{1}{\hat{\lambda}_1} = 0.8639; \qquad \hat{\gamma}_1 = \hat{\beta}_1 - \hat{\beta}_0 = 0.1708.
$$

## Part b

Calculate the estimated outstanding claims using the chain ladder method.

### Explanation

The ultimate projected claims cost for the $i$-th accident year is $\hat{C}_{i,4} = C_{i,4-i} \times \hat{\lambda}_i$, where $C_{i,4-i}$ is the latest available cumulative claims data for the $i$-th AY.

The estimated outstanding claims for AY i is $\hat{R}_i = \hat{C}_{i,4} - C_{i,4-i}$

| AY, i | $\hat{C}_{i,4}$ | $\hat{R}_i$ |
|---|---|---|
| 0 | 1396 | 0 |
| 1 | 1944 | 14 |
| 2 | 1787 | 49 |
| 3 | 2328 | 317 |
| 4 | 2216 | 680 |

The total of the outstanding claims is $\hat{R} = 1060$.

## Part c

Write down the three assumptions of the Bühlmann-Straub model of outstanding claims.

### Explanation

Assumption 1: $X_{i,j} \mid \theta_i$ are independent wrt DY, $j$.

Assumption 2: There exist $\gamma_j$ such that $E\left[X_{i,j} \mid \theta_i\right] = \gamma_j\,\mu(\theta_i)$ and $Var\left[X_{i,j} \mid \theta_i\right] = \gamma_j\,v(\theta_i)$

Assumption 3: $\left(X_{i,j} \mid \theta_i\right)$, $\left(X_{l,j} \mid \theta_l\right)$ are independent and identically distributed for all $i \neq l$.

## Part d

Using the Bühlmann-Straub model,

(i) Calculate $s_2^2$.

(ii) You are given that $\hat{v} = 30{,}582$. Calculate $\hat{a}$.

(iii) Describe briefly what $\hat{v}$ and $\hat{a}$ are measuring.

(iv) You are given that $\hat{\mu} = 1926.2$. Calculate $\hat{C}_{2,4}^{BS2}$.

### Explanation

Using the formula sheet, with $I = J = 4$,

(i)

$$
\begin{align*}
s_2^2 &= \frac{1}{2}\sum_{j=0}^{2}\hat{\gamma}_j\left(\frac{X_{2,j}}{\hat{\gamma}_j} - \hat{C}_{2,4}\right)^2 \\
&= \left\{0.6931\left(\frac{1283}{0.6931} - 1787\right)^2 + 0.1708\left(\frac{283}{0.1708} - 1787\right)^2 + 0.1086\left(\frac{172}{0.1086} - 1787\right)^2\right\} \text{ (as printed)} \\
&= 5112
\end{align*}
$$

(ii) $m_0 = \hat{\beta}_4 = 1.00$; $m_1 = \hat{\beta}_3 = 0.9929$ (as printed); $m_2 = \hat{\beta}_2 = 0.9725$; $m_3 = \hat{\beta}_1 = 0.8639$; $m_4 = \hat{\beta}_0 = 0.6931$.

$$
m = \sum_{i=0}^{4} m_i = 4.5224; \qquad \sum_{i=0}^{4} m_i^2 = 4.1583.
$$

$$
\bar{C} = \frac{1396 + 1930 + \cdots + 1536}{4.5224} = 1904.
$$

$$
\begin{align*}
\hat{a} &= \left\{\frac{1.00(1396 - 1904)^2 + 0.9929(1944 - 1904)^2 + \cdots 0.6931(2216 - 1904)^2 - 4(30582)}{4.5224 - 4.1583/4.5224}\right\} \\
&= \frac{373415}{3.6029} \\
 &= 103643
\end{align*}
$$

(iii) The estimator $\hat{v}$ is an estimate of $v(\theta_i)$, which is a measure of the variance of the estimated ultimate claims cost, based on the incremental claims information from AY i, DYj. This measures the uncertainty in the estimated ultimate claims based solely on the row (AY) information. The estimator $\hat{a}$ is a measure of the variance of $\mu(\theta_i)$, which measures the variability across different AYs. A small value for $\hat{v}$ indicates that there is little variation in payment patterns within each AY. A small value for $\hat{a}$ indicates that the payments patterns are similar across AYs, so the information from all the AYs is valuable in predicting claims in a single AY.

(iv) First, we calculate the Bühlmann-Straub estimate, then we iterate the credibility, using the $m_i$ weights, and using the Bühlmann-Straub estimate as the 'prior' mean. That is,

$$
\begin{align*}
Z_2 &= \frac{m_2}{m_2 + \hat{v}/\hat{a}} \\
    &= 0.7671 \\
\hat{C}_{2,4}^{BS} &= Z_2\,\hat{C}_{2,4} + (1 - Z_2)\,\hat{\mu} \\
                   &= 1819 \\
\hat{C}_{2,4}^{BS2} &= m_2\,\hat{C}_{2,4} + (1 - m_2)\,\hat{C}_{2,4}^{BS} \\
                    &= 1788
\end{align*}
$$

## Part e

Explain briefly how the Bühlmann-Straub model can be seen as a special case of the Bornhuetter-Ferguson model.

### Explanation

The Bornhuetter Ferguson estimate can be written as $\hat{C}_i^{BF} = \hat{\beta}_{I-i}\,\hat{C}_{i,J} + \left(1 - \hat{\beta}_{I-i}\right)\mu_i$.

Typically, the $\mu_i$ estimate is determined using a loss ratio or other subjective method, but we can see that the Bühlmann-Straub estimate uses the same formula, but with $\mu_i$ set equal to the raw Bs estimator (as printed) for AY $i$.
