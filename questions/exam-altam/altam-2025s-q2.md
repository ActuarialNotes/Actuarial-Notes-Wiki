---
id: "altam-2025s-q2"
exam: "Exam ALTAM"
topic: "Multiple State Model"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: medium
type: multi-part
year: 2025
session: Spring
wiki_link:
  - Concepts/Multiple+State+Model
  - Concepts/Kolmogorov's+Forward+Equation
  - Concepts/Thiele's+Differential+Equation
  - Concepts/Equivalence+Principle
  - Concepts/Disability+Income+Insurance
  - Concepts/Critical+Illness+Insurance
points: 10
---

You are analyzing an insurance policy with disability income benefits and critical illness benefits. You use the following multiple state model:

*(Figure: Healthy (State 0), Disabled (State 1), Critically Ill (State 2) and Dead (State 3), with arrows from State 0 to State 1, State 0 to State 3, State 1 to State 2 and State 1 to State 3.)*

You are given the following information:

1. The policy is issued to Healthy individuals only.
2. The level premium is paid continuously while the policyholder is Healthy.
3. A disability income annuity of 10,000 per year is paid continuously while the policyholder is Disabled.
4. A critical illness benefit of 120,000 is paid immediately on becoming Critically Ill.
5. A death benefit of 100,000 is paid immediately on Death, provided that the policyholder has not already received a critical illness benefit.
6. The force of interest is $\delta = 0.05$.
7. Transition intensities for all ages $x$ are:

$$\mu_x^{01} = 0.02, \qquad \mu_x^{12} = 0.04, \qquad \mu_x^{03} = 0.05, \qquad \mu_x^{13} = 0.10.$$

## Part a (1 point)

Explain whether this model satisfies the Markov property.

### Explanation
Examples of acceptable solutions:

- This model satisfies the Markov property because, given the state at time $t$, the probability of moving to any other state by time $t+s$, say, for any $s > 0$, does not depend on any history of the process before time $t$.
- ${}_{s}p_{x+t}^{ij}$ does not depend on how long the process has been in the current state, or on any other information about the process prior to being in state $i$ at time $t$.
- Let $Y(t)$ denote the state that $(x)$ is in at age $x+t$. Then

$$\Pr\left[Y(t+k) = j \mid Y(t)\right] = \Pr\left[Y(t+k) = j \mid Y(s)\ \forall s \le t\right]$$

Notes: Any equivalent answer should be given full credit. Answer must be coherent, and must specify, in words or symbols, that the future probability does not depend on the past history.

### Examiner Report
Successful candidates were able to determine that the model satisfied the Markov property. The most successful candidates were also able to clearly explain how the model satisfied the Markov property. Candidates that contradicted themselves or gave an explanation but did not identify whether it satisfied the Markov property received little credit for their work.

## Part b (3 points)

(i) Write down the Kolmogorov forward differential equations for ${}_tp_x^{00}$ and ${}_tp_x^{01}$ with the associated boundary conditions.

(ii) Show that ${}_tp_x^{01} = \dfrac{2}{7}\left(e^{-0.07t} - e^{-0.14t}\right)$.

### Explanation
**(i)**

$$\frac{d}{dt}\,{}_tp_x^{00} = -{}_tp_x^{00}\left(\mu_{x+t}^{01} + \mu_{x+t}^{03}\right)$$

$$\frac{d}{dt}\,{}_tp_x^{01} = {}_tp_x^{00}\,\mu_{x+t}^{01} - {}_tp_x^{01}\left(\mu_{x+t}^{12} + \mu_{x+t}^{13}\right)$$

Boundary conditions: ${}_0p_x^{00} = 1$ and ${}_0p_x^{01} = 0$.

**(ii)**

$$
\begin{align*}
{}_tp_x^{01} &= \int_0^t {}_rp_x^{00}\,\mu_{x+r}^{01}\,{}_{t-r}p_{x+r}^{11}\,dr \\
&= \int_0^t e^{-0.07r}(0.02)\,e^{-0.14(t-r)}\,dr \\
&= 0.02\left(e^{-0.14t}\right)\int_0^t e^{0.07r}\,dr \\
&= 0.02\left(e^{-0.14t}\right)\left(\frac{e^{0.07t} - 1}{0.07}\right) \\
&= \frac{2}{7}\left(e^{-0.07t} - e^{-0.14t}\right) \quad \text{as required.}
\end{align*}
$$

### Examiner Report
- The most successful candidates remembered to identify the boundary conditions and used the appropriate subscripts throughout the Kolmogorov forward differential equations for the first part of the question.
- For the second part of the question, the most successful candidates showed enough work through the derivation of the integral for tpx01 to confirm their understanding of the proof being requested.

## Part c (2 points)

(i) Show that $\bar{a}_x^{01} = 0.88$ to the nearest 0.01. You should calculate the value to the nearest 0.0001.

(ii) Show that $\bar{A}_x^{02} = 0.04\,\bar{a}_x^{01}$.

### Explanation
**(i)**

$$
\begin{align*}
\bar{a}_x^{01} &= \int_0^\infty {}_tp_x^{01}\,e^{-\delta t}\,dt \\
&= \int_0^\infty \frac{2}{7}\left(e^{-0.07t} - e^{-0.14t}\right)e^{-0.05t}\,dt \\
&= \frac{2}{7}\left(\frac{1}{0.12} - \frac{1}{0.19}\right) \\
&= 0.87719
\end{align*}
$$

**(ii)**

$$
\begin{align*}
\bar{A}_x^{02} &= \int_0^\infty {}_tp_x^{01}\,\mu_{x+t}^{12}\,e^{-\delta t}\,dt \\
&= \int_0^\infty 0.04\,{}_tp_x^{01}\,e^{-\delta t}\,dt \\
&= 0.04\,\bar{a}_x^{01}
\end{align*}
$$

### Examiner Report
- Most candidates did well on this part of this question. The most successful candidates remembered to follow the rounding rules requested within the question.
- Most candidates also did well on the second part of this question. The most successful candidates remembered to utilize the force of interest notation within the integral and identified that the transition intensity was constant and could be moved outside the integral.

## Part d (2 points)

You are given that the expected present value of the death benefit for this policy is 50,438.60.

Calculate the annual level premium of this policy using the equivalence principle.

### Explanation
$$P\bar{a}_x^{00} = 50{,}438.60 + 10{,}000\,\bar{a}_x^{01} + 120{,}000\,\bar{A}_x^{02}$$

$$\bar{a}_x^{00} = \int_0^\infty {}_tp_x^{00}\,e^{-0.05t}\,dt = \int_0^\infty e^{-0.12t}\,dt = \frac{1}{0.12} = 8.333$$

$$P = \frac{50{,}438.6 + 8{,}771.9 + 4{,}210.5}{8.333} = 7610.5$$

### Examiner Report
Most candidates did well on this part of the question. The most successful candidates realized that there were three components to the benefit – the death benefit of 100,000 paid immediately, the disability income annuity of 10,000 per year paid continuously, and the critical illness benefit of 120,000 paid immediately.

## Part e (1 point)

State the Thiele differential equation for ${}_tV^{(1)}$, the State 1 policy value at time $t$.

### Explanation
$$\frac{d}{dt}\,{}_tV^{(1)} = \delta\,{}_tV^{(1)} - 10{,}000 - \mu^{12}\left(120{,}000 - {}_tV^{(1)}\right) - \mu^{13}\left(100{,}000 - {}_tV^{(1)}\right)$$

### Examiner Report
Examiners' Notes: Most candidates did well on this part of the question. The most successful candidates avoided using the generic formula for the Thiele differential equation and realized that ${}_tV^{(2)}$ and ${}_tV^{(3)}$ were zero.

## Part f (1 point)

The insurer decides to include an additional death benefit of 50,000 in this policy, payable when the policyholder dies while Critically Ill.

Sketch a diagram of a revised model incorporating this change.

### Explanation
The revised model keeps States 0–3 and their transitions (Healthy → Disabled, Healthy → Dead (State 3), Disabled → Critically Ill, Disabled → Dead (State 3)) and adds a new state, **Dead – State 4**, with a transition from Critically Ill (State 2) to Dead (State 4).

*(Figure: the model solution's diagram — the original four states with a new box "Dead, State 4" below Critically Ill, State 2, and an arrow from State 2 to State 4.)*

### Examiner Report
Examiners' Notes: Most candidates did well on this part of the question. The most successful candidates realized that a separate Dead state was needed to identify the unique benefit being offered to individuals moving from the Critically Ill state to the Dead state.
