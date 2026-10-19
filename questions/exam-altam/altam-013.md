---
id: "altam-013"
exam: "Exam ALTAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Multiple+State+Model
  - Concepts/Insurance+Premium
  - Concepts/Loss+Random+Variable
  - Concepts/State-Dependent+Insurance
points: 9
---

An insurer issues a whole life insurance of 50,000 to (55), with a waiver of premium on disability. You are evaluating this policy using the following model:

*(Figure: state diagram — Active (State 0), Disabled (State 1), Dead (State 2); arrows run 0 → 1, 0 → 2 and 1 → 2.)*

You are given:

(i) The gross premium $G$ is paid at the start of each year if the insured is Active.

(ii) The death benefit is payable at the end of the month of death.

(iii) Commissions are 5% of each premium paid. There are no other expenses.

(iv) $i = 0.05$

(v)

| $x$ | $A_x^{(12)\,02}$ | $A_x^{(12)\,12}$ | $\ddot{a}_x^{00}$ |
|---|---|---|---|
| 55 | 0.480 | 0.531 | 8.832 |
| 65 | 0.634 | 0.681 | 5.416 |

(vi) ${}_0L^g$ denotes the present value of the gross loss-at-issue random variable.

(vii) ${}_tV^{(j)}$ denotes the gross premium policy value at time $t$, for a life then in State $j$.

## Part a (2 points)

The gross premium is determined such that $\mathrm{E}[{}_0L^g] = -0.1G$. Show that $G = 2{,}900$ to the nearest 100. You should calculate $G$ to the nearest 1.

### Explanation
$$\text{EPV(Death Benefit)} = 50{,}000A_{55}^{(12)02} = 24{,}000$$

$$\text{EPV(Premiums} - \text{Commissions)} = 0.95G\ddot{a}_{55}^{00} = 8.3904G$$

$$\Rightarrow 24{,}000 - 8.3904G = -0.1G$$

$$\Rightarrow G = 2894.9$$

## Part b (2 points)

Show that ${}_{10}V^{(0)}$ is 16,800 to the nearest 100. You should calculate the policy value to the nearest 1.

### Explanation
$${}_{10}V^{(0)} = 50{,}000A_{65}^{(12)02} - 0.95G\ddot{a}_{65}^{00} = 16{,}805$$

## Part c (3 points)

You are also given:

(i) ${}_{10\frac{1}{12}}V^{(1)} = 34{,}110$

(ii) ${}_{10\frac{2}{12}}V^{(1)} = 34{,}170$

(iii) The following probabilities:

| $x$ | ${}_{\frac{1}{12}}p_x^{01}$ | ${}_{\frac{1}{12}}p_x^{02}$ | ${}_{\frac{1}{12}}p_x^{12}$ |
|---|---|---|---|
| 65 | 0.00461 | 0.00293 | 0.00493 |
| $65\frac{1}{12}$ | 0.00467 | 0.00295 | 0.00497 |

(i) Show that ${}_{10\frac{1}{12}}V^{(0)} = 19{,}500$ to the nearest 100. You should calculate the value to the nearest 1.

(ii) Calculate ${}_{10\frac{2}{12}}V^{(0)}$.

### Explanation
(i)

$$\left({}_{10}V^{(0)} + 0.95G\right)(1.05)^{\frac{1}{12}} = {}_{\frac{1}{12}}p_{65}^{00}\ {}_{10\frac{1}{12}}V^{(0)} + {}_{\frac{1}{12}}p_{65}^{01}\ {}_{10\frac{1}{12}}V^{(1)} + {}_{\frac{1}{12}}p_{65}^{02}(50{,}000)$$

$${}_{\frac{1}{12}}p_{65}^{00} = 1 - {}_{\frac{1}{12}}p_{65}^{01} - {}_{\frac{1}{12}}p_{65}^{02} = 0.99246$$

$$\Rightarrow {}_{10\frac{1}{12}}V^{(0)} = 19{,}478$$

(ii)

$$\left({}_{10\frac{1}{12}}V^{(0)}\right)(1.05)^{\frac{1}{12}} = {}_{\frac{1}{12}}p_{65\frac{1}{12}}^{00}\ {}_{10\frac{2}{12}}V^{(0)} + {}_{\frac{1}{12}}p_{65\frac{1}{12}}^{01}\ {}_{10\frac{2}{12}}V^{(1)} + {}_{\frac{1}{12}}p_{65\frac{1}{12}}^{02}(50{,}000)$$

$${}_{\frac{1}{12}}p_{65\frac{1}{12}}^{00} = 1 - {}_{\frac{1}{12}}p_{65\frac{1}{12}}^{01} - {}_{\frac{1}{12}}p_{65\frac{1}{12}}^{02} = 0.99238$$

$$\Rightarrow {}_{10\frac{2}{12}}V^{(0)} = 19{,}398$$

### Examiner Report
Graders' Comments: The majority of candidates got part (i) correct. Fewer candidates got part (ii) correct with the most common error being to include the premium.

## Part d (2 points)

To increase sales, the insurance company raises its commission rate to 15% of the first premium and 8% of each renewal premium paid. The gross premium is not changed.

(i) Without further calculation, state with reasons whether the value of ${}_{10\frac{2}{12}}V^{(0)}$ will increase, decrease or stay the same as a result of these changes.

(ii) Without further calculation, state with reasons whether the value of ${}_{10\frac{2}{12}}V^{(1)}$ will increase, decrease or stay the same as a result of these changes.

(LTAM, Fall 2019, Question 2)

### Explanation
(i) ${}_{10\frac{2}{12}}V^{(0)}$ is the EPV of future benefits – the EPV of future premiums net of commissions for a life in State 0 at $t = 10\frac{2}{12}$. The EPV of future benefits is unchanged, the EPV of future premiums net of commissions is smaller, so ${}_{10\frac{2}{12}}V^{(0)}$ will increase.

(ii) ${}_{10\frac{2}{12}}V^{(1)}$ is the EPV of future benefits – the EPV of future premiums net of commissions for a life in State 1 at $t = 10\frac{2}{12}$. The change in commissions does not affect this calculation, as no premiums are paid once the life transitions into State 1, as there are no transitions back to State 0.

### Examiner Report
Graders' Comments: Candidates did not do as well on this part. Many candidates assumed that the reserve in part (i) would decrease. It is true that the accumulated past premiums minus commissions would be smaller, but prospectively, the EPV of future outgo minus income would be bigger. In (ii) most candidates correctly stated that the reserve would not change but did not offer a sufficient explanation.
