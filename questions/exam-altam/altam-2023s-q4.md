---
id: "altam-2023s-q4"
exam: "Exam ALTAM"
topic: "Continuing Care Retirement Community"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: medium
type: multi-part
year: 2023
session: Spring
wiki_link:
  - Concepts/Continuing+Care+Retirement+Community
  - Concepts/Multiple+State+Model
  - Concepts/Equivalence+Principle
  - Concepts/Policy+Value
  - Concepts/Thiele's+Differential+Equation
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:28e9750c3aad48da0b51433f0dfb0ce7456b4d537c204df486568943078154ed
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2023s-q4.md
---

A Continuing Care Retirement Community (CCRC) offers new residents Modified Life Care contracts.

The CCRC contains three different types of accommodation: Independent Living Units (ILU), Assisted Living Units (ALU), and Specialized Nursing Facilities (SNF). The following Markov model is used to determine fees.

![State diagram: ILU State 0, ALU State 1, SNF State 2 and Dead State 3, with arrows from State 0 to State 1, State 1 to State 2, and from each of States 0, 1 and 2 to State 3](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-2023s-q4-state-diagram.png)

You are given:

(i) The CCRC incurs the following monthly costs per resident, payable continuously, by type of accommodation.

| Accommodation | Monthly cost |
|---|---|
| ILU | 3,000 |
| ALU | 7,000 |
| SNF | 15,000 |

(ii) Each resident pays a lump sum fee immediately on entry and pays residence fees continuously while in the CCRC.

(iii) Residence fees are a fixed proportion, $\gamma$, of the monthly costs.

(iv) The value of $\gamma$ is determined such that the EPV of future costs is equal to the EPV of all fees, including the entry fee.

(v) $i = 0.05$

(vi) The following actuarial functions, evaluated at 5%.

| $x$ | $\bar{a}_x^{00}$ | $\bar{a}_x^{01}$ | $\bar{a}_x^{02}$ | $\bar{a}_x^{11}$ | $\bar{a}_x^{12}$ | $\bar{a}_x^{22}$ |
|---|---|---|---|---|---|---|
| 65 | 11.4106 | 1.3570 | 0.3745 | 11.8352 | 0.7979 | 10.6905 |
| 70 | 9.5210 | 1.7037 | 0.4942 | 10.1754 | 0.9960 | 9.1961 |

An individual enters the CCRC, in an ILU, at age 65. Their entry fee is 150,000.

## Part a (1 point)

Show that the expected present value of future costs is 592,200 to the nearest 100. You should calculate the value to the nearest 10.

### Explanation
The expected present value of future costs for (65) is

$$
\begin{align*}
EPV &= 12\left(3000\,\bar{a}_{65}^{00} + 7000\,\bar{a}_{65}^{01} + 15000\,\bar{a}_{65}^{02}\right) \\
&= 592{,}180
\end{align*}
$$

### Examiner Report
Candidates generally did well on this question, with most candidates earning full credit for (a), (b) and (c). Part (d) was the most challenging section of the question, though many students received partial credit for (iii) even if the input values from (ii) were not correct. For (e), candidates were required to state coherently why ILU fees are higher under full life care contract to earn any credit. Most candidates handled this well, but a few provided long but irrelevant answers, earning little or no credit.

## Part b (2 points)

Show that $\gamma = 0.75$ to the nearest 0.01. You should calculate the value to the nearest 0.001.

### Explanation
The parameter $\gamma$ satisfies

$$
EPV = 12\gamma\left(3{,}000\,\bar{a}_{65}^{00} + 7{,}000\,\bar{a}_{65}^{01} + 15{,}000\,\bar{a}_{65}^{02}\right) + 150{,}000
$$

$$
\Rightarrow \gamma = \frac{592{,}179.6 - 150{,}000}{592{,}179.6} = 0.7467
$$

## Part c (2 points)

Let ${}_tV_x^{(j)}$ denote the EPV at time $t$ of the CCRC's future costs minus future income, for an individual who entered the CCRC at age $x$, and who is now in state $j$ at age $x+t$.

Show that ${}_5V_{65}^{(1)}$ is 261,900 to the nearest 100. You should calculate the value to the nearest 10.

### Explanation

$$
\begin{align*}
{}_5V_{65}^{(1)} &= 12\left(7{,}000(1-\gamma)\,\bar{a}_{70}^{11} + 15{,}000(1-\gamma)\,\bar{a}_{70}^{12}\right) \\
&= 261{,}917
\end{align*}
$$

## Part d (4 points)

You are also given:

- ${}_5V_{65}^{(2)} = 419{,}280$
- $\mu_{70}^{12} = 0.00156$ and $\mu_{70}^{13} = 0.01194$

(i) (1 point) Write down Thiele's differential equation for ${}_tV_{65}^{(1)}$.

(ii) (1 point) Show that $\dfrac{d}{dt}\left({}_tV_{65}^{(1)}\right)$ evaluated at $t = 5$ is $-5{,}620$ to the nearest 10. You should calculate the value to the nearest 1.

(iii) (2 points) Using Euler's forward method, with a step size of $h = 0.25$, calculate ${}_{5.25}V_{65}^{(1)}$.

### Explanation
**(i)** Thiele's equation for ${}_tV_{65}^{(1)}$ is

$$
\frac{d}{dt}\,{}_tV_{65}^{(1)} = \delta \times {}_tV_{65}^{(1)} - 12(1-\gamma) \times 7000 - \mu_{65+t}^{12}\left({}_tV_{65}^{(2)} - {}_tV_{65}^{(1)}\right) - \mu_{65+t}^{13}\left(0 - {}_tV_{65}^{(1)}\right)
$$

**(ii)**

$$
\begin{align*}
\left.\frac{d}{dt}\,{}_tV_{65}^{(1)}\right|_{t=5} &= \delta \times 261{,}917 - 12(1 - 0.7467) \times 7000 \\
&\quad - 0.00156(419{,}280 - 261{,}917) - 0.011940(0 - 261{,}917.2) \\
&= -5{,}616.5
\end{align*}
$$

**(iii)** Using Euler's forward method, we have

$$
{}_{5+h}V_{65}^{(1)} \approx {}_5V_{65}^{(1)} + h\left(\left.\frac{d}{dt}\,{}_tV_{65}^{(1)}\right|_{t=5}\right)
$$

$$
\Rightarrow {}_{5+h}V_{65}^{(1)} \approx 261{,}917.2 + 0.25 \times (-5{,}616.54) = 260{,}513.1
$$

## Part e (1 point)

The CCRC introduces a Full Life Care contract option, under which residence fees are level throughout their residency, regardless of the accommodation type. Entry fees are the same for both contract options.

State with reasons whether an individual would pay a higher residence fee while in ILU under the Full Life Care contract or the Modified Life Care contract.

### Explanation
The ILU residence fee is higher under the Full Life Care contract.

Both the EPV of costs and the entry fee are the same for an individual, so the EPV of total residence fees under the Full Life Care and modified life care are the same, but the modified life care fees step up on transition out of the ILU. The FLC effectively spreads that increase over the whole residency period, resulting in higher fees in the ILU.
