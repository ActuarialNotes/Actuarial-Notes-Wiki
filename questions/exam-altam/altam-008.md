---
id: "altam-008"
exam: "Exam ALTAM"
topic: "Thiele's Differential Equation"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Thiele's+Differential+Equation
  - Concepts/Multiple+State+Model
  - Concepts/Equivalence+Principle
  - Concepts/Policy+Value
  - Concepts/Annuities
points: 9
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:07f73a497f5580b37fccb50ea58ead2da03f5eddcda8d795ff8dfa95cd34d54e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-008.md
---

You are using the following 3-state Markov model to price a 10-year disability insurance product.

![State diagram: Healthy (0), Temporarily Disabled (1) and Dead (2); arrows run 0 to 1, 1 to 0, 0 to 2 and 1 to 2.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-008-state-diagram.png)

## Part a (2 points)

Show that for this model, $\displaystyle\sum_{j=0}^{2} \bar{a}_{x:\overline{10}|}^{0j} = \bar{a}_{\overline{10}|}$.

### Explanation
$$\bar{a}_{x:\overline{10}|}^{0j} = \int_0^{10} {}_tp_x^{0j}\cdot e^{-\delta t}\cdot dt$$

$$\Rightarrow \bar{a}_{x:\overline{10}|}^{00} + \bar{a}_{x:\overline{10}|}^{01} + \bar{a}_{x:\overline{10}|}^{02} = \int_0^{10}\left({}_tp_x^{00} + {}_tp_x^{01} + {}_tp_x^{02}\right)\cdot e^{-\delta t}\cdot dt$$

but ${}_tp_x^{00} + {}_tp_x^{01} + {}_tp_x^{02} = 1$

$$\Rightarrow \bar{a}_{x:\overline{10}|}^{00} + \bar{a}_{x:\overline{10}|}^{01} + \bar{a}_{x:\overline{10}|}^{02} = \int_0^{10} e^{-\delta t}\cdot dt = \bar{a}_{\overline{10}|}$$

### Examiner Report
Graders' Comments: Many candidates did well on this part. Some candidates gave a verbal explanation, rather than mathematical proof. Generally, this earned partial credit, but full credit was awarded if the verbal proof was sufficiently detailed.

## Part b (2 points)

The product has the following features:

- The product is issued to individuals age $x$ who are in the Healthy state.
- The product pays a continuous disability benefit at a rate of 1000 per year while the insured is in the Temporarily Disabled state.
- The product pays a death benefit of 10,000 at the moment of death.
- Net premiums are payable continuously while the insured is in the Healthy state.

You are also given the following information:

| | | | |
|---|---|---|---|
| $\delta = 0.1$ | $\bar{a}_{x:\overline{10}|}^{00} = 4.49$ | $\bar{a}_{x:\overline{10}|}^{02} = 1.36$ | $\bar{A}_{x:\overline{10}|}^{02} = 0.3871$ |
| $\mu_{x+t}^{01} = 0.04$ | $\mu_{x+t}^{02} = 0.02t$ | $\mu_{x+t}^{10} = 0.05$ | $\mu_{x+t}^{12} = 0.04t$ |

Show that the net premium rate for this policy is 970 per year to the nearest 10. You should calculate the rate to the nearest 1.

### Explanation
EPV Premiums:

$$P\bar{a}_{x:\overline{10}|}^{00} = 4.49P$$

$EPV$ Disability Annuity:

$$1000\bar{a}_{x:\overline{10}|}^{01} = 1000\left(\bar{a}_{\overline{10}|} - \left(\bar{a}_{x:\overline{10}|}^{00} + \bar{a}_{x:\overline{10}|}^{02}\right)\right) \quad\text{where}\quad \bar{a}_{\overline{10}|} = \frac{1 - v^{10}}{\delta} = 6.32121$$

$$\Rightarrow EPV \text{ Disability Annuity} = 471.21$$

EPV Death Benefit:

$$10000\bar{A}_{x:\overline{10}|}^{02} = 3871.0$$

So the Premium is

$$P = \frac{3871 + 471.21}{4.49} = 967.1$$

## Part c (2 points)

Let ${}_tV^{(i)}$ denote the net premium policy value for a policy in state $i$ at time $t$. You are given:

$${}_3V^{(0)} = 1304.54 \qquad {}_3V^{(1)} = 7530.09$$

Calculate $\dfrac{d}{dt}\,{}_tV^{(0)}$ at $t = 3$.

### Explanation
The Thiele equation at time t is

$$\frac{d}{dt}\,{}_tV^{(0)} = \delta\cdot{}_tV^{(0)} + P - \mu_{x+t}^{01}\left({}_tV^{(1)} - {}_tV^{(0)}\right) - \mu_{x+t}^{02}\left(10{,}000 - {}_tV^{(0)}\right)$$

so at $t = 3$ we have

$$\begin{align*}
\left.\frac{d}{dt}\,{}_tV^{(0)}\right|_{t=3} &= (0.1)(1304.54) + 967.1 \\
&\quad - 0.04\left(7530.09 - 1304.54\right) \\
&\quad - 3(0.2)\left(10{,}000 - 1304.54\right) \\
&= 326.80
\end{align*}$$

### Examiner Report
Graders' Comments: This part proved more challenging to many candidates. The responses indicated that many candidates are memorizing Thiele's formula rather than understanding the intuition behind it.

## Part d (3 points)

Your company is considering adding an additional feature to this product. Under this additional feature, the insurer would return the sum of the premiums paid at the end of 10 years without interest if no benefits were paid during the life of the policy.

Calculate the increase in the net premium rate payable continuously for the product as a result of including this feature.

(MLC, Spring 2015, Question 1)

### Explanation
Let $P^*$ denote the new premium. The EPV of the return of premium benefit is

$$\text{EPV} = 10P^*e^{-10\delta}\,{}_{10}p_x^{\overline{00}}, \text{ where}$$

$${}_{10}p_x^{\overline{00}} = \exp\left(-\int_0^{10}\mu_{x+t}^{01} + \mu_{x+t}^{02}\,dt\right) = \exp\left(-\int_0^{10} 0.04 + 0.02t\,dt\right) = e^{-1.4} = 0.24660$$

$$\Rightarrow \text{EPV} = 10P^*e^{-10\times 0.1}(0.24660) = 0.90718P^*$$

$$\Rightarrow P^* = \frac{3871 + 471.2}{4.490 - 0.90718} = 1212.0$$

$$\Rightarrow \left(P^* - P\right) = 244.9$$

### Examiner Report
Graders' Comments: A common error was to omit the discount factor, $e^{-10\delta}$, possibly on the grounds that the premiums are returned without interest, but the discount factor reflects the interest earned by the insurer, not the interest that might be returned to the policyholder. If the premiums were returned with interest, the benefit would be in the form $P^*\bar{s}_{\overline{10}|}$ instead of $10P^*$.
