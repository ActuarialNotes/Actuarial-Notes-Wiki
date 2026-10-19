---
id: "altam-049"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Universal Life Insurance"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Universal+Life+Insurance
  - Concepts/Profit+Testing
  - Concepts/Profit+Vector
  - Concepts/Profit+Signature
  - Concepts/Net+Present+Value
  - Concepts/Profit+Margin
points: 8
---

(*8 points*) A life insurance company issues a Type B universal life policy with an Additional Death Benefit of 150,000 to a life age 35.

You are given:

| Policy Year | Annual Premium | % Premium Charge | Annual Cost of Insurance Rate Per Thousand | Credited Interest Rate | Account Value at End of Year | Surrender Charge |
|---|---|---|---|---|---|---|
| 1 | 4800 | 20% | 2.31 | 4% | 3647 | 2500 |
| 2 | 4800 | 5% | 2.46 | 4% | 8166 | 1500 |
| 3 | 4800 | 5% | 2.62 | 4% | - | 0 |

(This is Question 2 from the Fall 2017 Written Answer exam.)

## Part a (2 points)

Show that the total death benefit at the end of the third year is 162,800 to the nearest 100. You should calculate the value to the nearest 1.

### Explanation

$$AV_t = \left((AV)\{t-1\} + P_t - E_t - COI_t\right)\left(1 + i_t^c\right)$$

where $COI_t = ADB_t \times q_{x+t-1} \times v_{i_q}$, $ADB_t = 150{,}000$, and $i^q = 0.04$;

$$\Rightarrow AV_3 = \left(8166 + 4800(0.95) - 377.88\right)(1.04) = 12{,}842$$

The total DV in year 3 is $DB_3 = ADB_3 + AV_3 = 162{,}842$

Now the company wants to carry out a profit test of this contract using the following assumptions:

- (i) At the end of the first year, 10% of the in-force policyholders surrender.
- (ii) At the end of the second year, 20% of the in-force policyholders surrender.
- (iii) At the end of the third year, all remaining in-force policyholders surrender.
- (iv) There are no reserves held other than the account value.
- (v) The interest earned on all insurer's funds is 8% per year.
- (vi) Mortality experience is $q_{35+t} = 0.0015$ for $t = 0, 1$ and 2.
- (vii) Pre-contract expenses are 800.
- (viii) Percent of premium expenses are 25% in the first year and 7% for years 2 and 3.
- (ix) Expenses on death are 500.
- (x) The hurdle rate is 10% per year.

## Part b (3 points)

Calculate the profit vector.

### Explanation

The profit test table is:

| Year, $t$ | $AV_{t-1}$ | $P_t$ | $E_t$ | $I_t$ | $EDB_t$ | $ESV_t$ | $EAV_t$ | $Pr_t$ |
|---|---|---|---|---|---|---|---|---|
| 0* | 0 | | 800 | | | | | –800.00 |
| 1 | 0 | 4800 | 1200 | 288.00 | 231.22 | 114.53 | 3277.38 | 264.88 |
| 2 | 3647 | 4800 | 336 | 648.88 | 238.00 | 1331.20 | 6523.00 | 667.68 |
| 3 | 8166 | 4800 | 336 | 1010.40 | 245.01 | 12822.78 | | 572.61 |

$AV_{t-1}$ is the account value brought forward.

$P_t$ is the premium paid at the start of the t-th year.

$E_t$ represents the expenses incurred at the start of the $t$th year.

$I_t = \left(AV_{t-1} + P_t - E_t\right)(0.08)$ is the interest earned during the $t$th year, for a policy in force at the start of the year.

$EDB_t = q_{x+t-1}^{(d)}\left(ADB_t + AV_t + 500\right) = 0.0015(150{,}000 + AV_t + 500)$

$ESV_t = q_{x+t-1}^{(w)}\left(AV_t - SC_t\right)^+$ where $q_{35}^{(w)} = 0.1\left(1 - q_{35}^{(d)}\right)$; $q_{36}^{(w)} = 0.2\left(1 - q_{36}^{(d)}\right)$ and $q_{37}^{(w)} = \left(1 - q_{37}^{(d)}\right)$. SC<sub>t</sub> is the surrender charge in year $t$.

$EAV_t = p_{x+t-1}^{(\tau)}\,AV_t$ where $p_{x+t-1}^{(\tau)} = 1 - q_{x+t-1}^{(d)} - q_{x+t-1}^{(w)}$

$Pr_t$ is the profit vector.

## Part c (2 points)

Calculate the NPV.

### Explanation

| Year, $t$ | $Pr_t$ | $\Pi_t$ |
|---|---|---|
| 0 | –800.00 | –800.00 |
| 1 | 264.88 | 264.88 |
| 2 | 667.00 | 600.01 |
| 3 | 572.61 | 411.04 |

Where $\Pi_0 = Pr_0$, and $\Pi_t = {}_{t-1}p_x^{(\tau)}\,Pr_t$.

$$\begin{align*}
\Rightarrow NPV &= -800 + 264.88v + 600.01v^2 + 411.40v^3 \quad \text{at 10\%} \\
&= 245.50
\end{align*}$$

## Part d (1 point)

Calculate the profit margin.

### Explanation

The profit margin is

$$\frac{NPV}{EPV\ \text{Premiums at 10\%}} = \frac{245.50}{4800\left(1 + p_x^{(\tau)}v + {}_{2}p_x^{(\tau)}v^2\right)} = \frac{245.50}{11569.0} = 2.12\%$$
