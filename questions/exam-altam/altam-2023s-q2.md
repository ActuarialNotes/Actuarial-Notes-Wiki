---
id: "altam-2023s-q2"
exam: "Exam ALTAM"
topic: "Joint Life"
learning_objective: "Joint Life Insurance and Annuities"
difficulty: medium
type: multi-part
year: 2023
session: Spring
wiki_link:
  - Concepts/Joint+Life
  - Concepts/Multiple+State+Model
  - Concepts/Kolmogorov's+Forward+Equation
  - Concepts/Equivalence+Principle
  - Concepts/Policy+Value
points: 11
---

Consider the following multi-state model for modeling joint life insurance policies issued to a couple $(x)$ and $(y)$:

*(Figure: State 0, $(x)$ alive, $(y)$ alive; State 1, $(x)$ dead, $(y)$ alive; State 2, $(x)$ alive, $(y)$ dead; State 3, $(x)$ dead, $(y)$ dead. Arrows: State 0 to State 1 ($\mu_{x:y}^{01}$), State 0 to State 2 ($\mu_{x:y}^{02}$), State 0 to State 3 ($\mu_{x:y}^{03}$), State 1 to State 3 ($\mu_{y}^{13}$) and State 2 to State 3 ($\mu_{x}^{23}$).)*

## Part a (1 point)

State two reasons why a couple may have dependent future lifetimes.

### Explanation
- A couple may have common lifestyles leading to similar mortality (eg both smokers)
- The broken heart syndrome increases mortality of the surviving partner in the period following their spouse's death
- The couple may be exposed to common shock risk, i.e., the risk that they die at the same time, e.g., in an accident.

### Examiner Report
Candidates did well on this part. Note that full credit requires more than writing down key words.

## Part b (1 point)

State the conditions for $(x)$ and $(y)$ to have independent future lifetimes, in terms of $\mu_{x+t:y+t}^{01}$, $\mu_{x+t:y+t}^{02}$, $\mu_{y+t}^{13}$, $\mu_{x+t}^{23}$, and $\mu_{x+t:y+t}^{03}$.

### Explanation
We require:

$\mu_{x+t:y+t}^{03} = 0$ (no common shock)

$\mu_{x+t:y+t}^{02} = \mu_{y+t}^{13}$ and $\mu_{x+t:y+t}^{01} = \mu_{x+t}^{23}$

(no common lifestyle or broken heart syndrome)

### Examiner Report
Candidates did well on this part, apart from some carelessness with subscripts.

## Part c (3 points)

(i) Write down the Kolmogorov forward differential equation, with the associated boundary condition, for ${}_tp_{x:y}^{00}$.

(ii) Use the Kolmogorov forward differential equation in part (i) to show that

$$
{}_tp_{x:y}^{00} = \exp\left(-\int_0^t \left(\mu_{x+u:y+u}^{01} + \mu_{x+u:y+u}^{02} + \mu_{x+u:y+u}^{03}\right)du\right)
$$

### Explanation
**(i)**

$$
\frac{d}{dt}\,{}_tp_{x:y}^{00} = -\,{}_tp_{x:y}^{00}\left(\mu_{x+t:y+t}^{01} + \mu_{x+t:y+t}^{02} + \mu_{x+t:y+t}^{03}\right)
$$

BC: ${}_0p_{x:y}^{00} = 1.0$

**(ii)**

$$
\frac{d}{dt}\,{}_tp_{x:y}^{00} = -\,{}_tp_{x:y}^{00}\left(\mu_{x+t:y+t}^{01} + \mu_{x+t:y+t}^{02} + \mu_{x+t:y+t}^{03}\right)
$$

$$
\Rightarrow \frac{1}{{}_tp_{x:y}^{00}}\,\frac{d}{dt}\,{}_tp_{x:y}^{00} = -\left(\mu_{x+t:y+t}^{01} + \mu_{x+t:y+t}^{02} + \mu_{x+t:y+t}^{03}\right)
$$

$$
\Rightarrow \frac{d}{dt}\log {}_tp_{x:y}^{00} = -\left(\mu_{x+t:y+t}^{01} + \mu_{x+t:y+t}^{02} + \mu_{x+t:y+t}^{03}\right)
$$

$$
\Rightarrow \int_0^n \frac{d}{dt}\log {}_tp_{x:y}^{00}\,dt = -\int_0^n \left(\mu_{x+t:y+t}^{01} + \mu_{x+t:y+t}^{02} + \mu_{x+t:y+t}^{03}\right)dt
$$

$$
\Rightarrow \log {}_np_{x:y}^{00} - \log {}_0p_{x:y}^{00} = -\int_0^n \left(\mu_{x+t:y+t}^{01} + \mu_{x+t:y+t}^{02} + \mu_{x+t:y+t}^{03}\right)dt
$$

$$
\log {}_0p_{x:y}^{00} = \log 1.0 = 0
$$

$$
\Rightarrow {}_np_{x:y}^{00} = \exp\left(-\int_0^n \left(\mu_{x+t:y+t}^{01} + \mu_{x+t:y+t}^{02} + \mu_{x+t:y+t}^{03}\right)dt\right)
$$

### Examiner Report
This part proved more challenging. Candidates were required to show a full coherent proof for full credit. Candidates lost points by skipping key steps (eg writing down the first and last line of the derivation, but failing to connect them), by failing to check the boundary condition, and by using confusing or missing subscripts and/or variables of integration.

## Part d (2 points)

A couple, $(x)$ who is age 40 and $(y)$ who is age 50, buys a fully discrete last survivor whole life insurance with a sum insured of 100,000.

You are given:

(i) The couple's future lifetimes are independently distributed.

(ii) Premiums are payable while at least one life is alive for a maximum of 10 years.

(iii) Mortality follows the Standard Ultimate Life Table (SULT).

(iv) $i = 0.05$

Show that the annual net premium is 1,220 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation

$$
P\,\ddot{a}_{\overline{40:50}:\overline{10}|} = 100{,}000\left(A_{\overline{40:50}}\right)
$$

$$
\ddot{a}_{\overline{40:50}:\overline{10}|} = \ddot{a}_{40:\overline{10}|} + \ddot{a}_{50:\overline{10}|} - \ddot{a}_{40:50:\overline{10}|} = 8.1076
$$

$$
A_{\overline{40:50}} = A_{40} + A_{50} - A_{40:50} = 0.098737
$$

$$
\Rightarrow P = 1217.83
$$

### Examiner Report
Generally well done. A few candidates used a joint life annuity instead of last survivor.

## Part e (2 points)

(i) Show that the policy value at time 10, if $(y)$ is alive but $(x)$ is dead, is 29,000 to the nearest 100. You should calculate the value to the nearest 1.

(ii) Show that the policy value at time 10, if both $(x)$ and $(y)$ are alive, is 15,900 to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
**(i)** ${}_{10}V^{(1)} = 100{,}000\,A_{60} = 29{,}028$

**(ii)** ${}_{10}V^{(0)} = 100{,}000\left(A_{\overline{50:60}}\right) = 15{,}911.1$

### Examiner Report
This part was very well done.

## Part f (2 points)

The insurer decides to incorporate a common shock risk in the joint life model, although each life's marginal individual mortality still follows the SULT.

(i) State with reasons whether the policy value in (e)(i) would increase, decrease, or stay the same as a result of the common shock risk.

(ii) State with reasons whether the policy value in (e)(ii) would increase, decrease, or stay the same as a result of the common shock risk.

### Explanation
**(i)** The policy value would stay the same.

Once $(x)$ has died, the policy value only depends on the marginal mortality of $(y)$, which is unchanged.

**(ii)** The policy value would increase.

The time to the first death is the same as under the independent model, but the time to the second death is less than or equal to the independent model, because of the possibility of simultaneous deaths.

### Examiner Report
This part was generally well done. For full credit candidates were required to provide coherent explanations of how the policy values change based on the timing of the second death.
