---
id: "altam-2025s-q4"
exam: "Exam ALTAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: medium
type: multi-part
year: 2025
session: Spring
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Lapse
  - Concepts/Multiple+State+Model
  - Concepts/Equivalence+Principle
  - Concepts/Kolmogorov's+Forward+Equation
  - Concepts/Whole+Life+Insurance
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:af2057ccec408054ac89d3003074e118f67849fd4c960cb5ecb10e469b59f6ce
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2025s-q4.md
---

You are pricing a special fully discrete whole life insurance on a life age 60. The death benefit is 100,000 during the first 20 years and 200,000 thereafter.

You are given:

- Mortality follows the Standard Ultimate Mortality Model (SUMM).
- The only expenses are commissions, which are 50% of premium in year 1, and 5% of premiums thereafter.
- $i = 0.05$
- Level gross premiums are determined using the equivalence principle.

## Part a (2 points)

Calculate the annual gross premium.

### Explanation
EPV Premiums – Expenses:

$$\left(0.95\,\ddot{a}_{60} - 0.45\right)P = 13.7089P$$

EPV of Benefits:

$$100{,}000A_{60} + 100{,}000\,{}_{20}E_{60}\,A_{80} = 46{,}524.23$$

Or:

$$200{,}000\left(A_{60} - 0.5A^{\,1}_{60:\overline{20}|}\right) = 46{,}524.23$$

Or:

$$100{,}000A^{\,1}_{60:\overline{20}|} + 200{,}000\,{}_{20}E_{60}\,A_{80} = 46{,}524.23$$

$$\text{So Premium} = \frac{46{,}524}{13.7089} = 3393.73$$

### Examiner Report
Most candidates did pretty well on this. Common issues were candidates treating this as an endowment.

## Part b (2 points)

The insurer decides to include lapses in the pricing model, as illustrated in the following multiple state model.

![Multiple state model: State 0 Active, with arrows to State 1 Dead and to State 2 Lapsed.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-2025s-q4-lapse-model.png)

You are given:

- There are no benefits payable upon lapse.
- The force of mortality is unchanged, that is, $\mu_x^{01} = A + Bc^x$ where $A = 0.00022$, $B = 2.7 \times 10^{-6}$, and $c = 1.124$.

(i) State the meaning of "lapse supported business".

(ii) State one disadvantage to the insurer of issuing lapse supported policies.

### Explanation
**(i)** Lapse supported products are priced taking into account that some policies will lapse without payment of any benefit (or with a very low cash value relative to asset share). The unused funds from policies that lapse are used to subsidize costs for those who stay, leading to lower premiums.

**(ii)** The problem arises if policyholders lapse in lower numbers than expected. Suppose the insurer charges a lower premium based on an assumption that a significant proportion of policyholders will lapse. If the insurer overestimates the proportion lapsing then it is making an expected loss on each contract. With the increase in viatical/third party market, policyholders will often do much better by selling their policy to third parties than by lapsing, so rates based on the historical lapse experience may significantly underestimate future lapse experience.

### Examiner Report
Candidates struggled with the pricing implications of lapse supported products, the subsidization that applies and the impacts that they have to the insurer. The candidates that did well provided justification tying to the context of the problem.

## Part c (3 points)

You have calculated these actuarial values incorporating a lapse assumption:

| $x$ | $\ddot{a}_x^{00}$ | $A_x^{01}$ | ${}_{10}p_x^{00}$ |
|---|---|---|---|
| 60 | 8.8023 | 0.10330 | 0.49694 |
| 70 | 8.7967 | 0.24061 | 0.54578 |
| 80 | 6.9365 | 0.41889 | 0.37068 |

(i) Show that the gross premium is 1,850 to the nearest 10. You should calculate the value to the nearest 0.1.

(ii) Show that the gross premium policy value at the end of year 10 is 22,650 to the nearest 50. You should calculate the value to the nearest 1.

### Explanation
**(i)**

$$
\begin{align*}
\text{EPV Benefits} &= 100{,}000\left(A_{60}^{01} + {}_{20}p_{60}^{00}\,v^{20}A_{80}^{01}\right) \\
&= 100{,}000(0.10330 + 0.04282) \\
&= 14{,}612
\end{align*}
$$

Or

$$100{,}000A_{60:\overline{20}|}^{01} + 200{,}000\left({}_{20}p_{60}^{00}\,v^{20}A_{80}^{01}\right)$$

$$A_{60:\overline{20}|}^{01} = A_{60}^{01} - {}_{20}p_{60}^{00}\,v^{20}A_{80}^{01} = 0.06048$$

$$\Rightarrow \text{EPV Benefits} = 100{,}000(0.06048) + 200{,}000(0.04282) = 14{,}612$$

$$\Rightarrow P = \frac{14{,}612}{0.95\,\ddot{a}_{60}^{00} - 0.45} = 1846.77$$

**(ii)** At time 10:

$$
\begin{align*}
{}_{10}V^{(0)} &= 100{,}000\left(A_{70}^{01} + {}_{10}p_{70}^{00}\,v^{10}A_{80}^{01}\right) - P\left(0.95\,\ddot{a}_{70}^{00}\right) \\
&= 100{,}000(0.380964) - 1846.76(0.95 \times 8.7967) \\
&= 22{,}663.3
\end{align*}
$$

### Examiner Report
1. Most candidates did pretty well.
2. A few candidates incorrectly included first time expenses in the reserve calculations.
3. Some candidates calculated values that were provided in the questions.

## Part d (3 points)

You are given that $\mu_{70}^{02} = 0.04$ and $\mu_{70.5}^{02} = 0.045$.

(i) Use Euler's forward method with step size $h = 0.5$ to show that $p_{70}^{00} = 0.95$ to the nearest 0.01. You should calculate the value to the nearest 0.001.

(ii) Use Euler's forward method with step size $h = 0.5$ to show that $p_{70}^{01} = 0.01$ to the nearest 0.01. You should calculate the value to the nearest 0.001.

(iii) Using recursion, calculate the gross premium policy value at time 11.

### Explanation
**(i)**

$${}_{t+h}p_{70}^{00} \approx {}_tp_{70}^{00} - h\,{}_tp_{70}^{00}\left(\mu_{70+t}^{01} + \mu_{70+t}^{02}\right)$$

Let $h = 0.5$, $t = 0$:

$${}_{0.5}p_{70}^{00} \approx 1 - 0.5(1)(0.009881 + 0.04) = 0.97506$$

Let $h = 0.5$, $t = 0.5$:

$${}_1p_{70}^{00} \approx 0.97506 - 0.5(0.97506)(0.010462 + 0.045) = 0.94802$$

**(ii)**

$${}_{t+h}p_{70}^{01} \approx {}_tp_{70}^{01} + h\,{}_tp_{70}^{00}\left(\mu_{70+t}^{01}\right)$$

Let $h = 0.5$, $t = 0$:

$${}_{0.5}p_{70}^{01} \approx 0 + 0.5(1)(0.009881) = 0.00494$$

Let $h = 0.5$, $t = 0.5$:

$${}_1p_{70}^{01} \approx 0.00494 + 0.5(0.97506)(0.010462) = 0.01004$$

**(iii)**

$$\left({}_{10}V + 0.95P\right)(1 + i) = p_{70}^{01}(100{,}000) + p_{70}^{00}\,{}_{11}V$$

$$\Rightarrow {}_{11}V = 25{,}985.21$$

### Examiner Report
Results were generally mixed. Candidates generally understood the formulas but struggled to apply to the question being asked. Specially most struggled on the first two parts but most did well in part 3 with many receiving full credit on part (iii). Some candidates miss the premium based expenses.
