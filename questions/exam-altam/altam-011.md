---
id: "altam-011"
exam: "Exam ALTAM"
topic: "Continuing Care Retirement Community"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Continuing+Care+Retirement+Community
  - Concepts/Multiple+State+Model
  - Concepts/Policy+Value
  - Concepts/Equivalence+Principle
  - Concepts/Annuities
points: 12
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2ac85c6701b044db88951cc1ec6bc973978a5f302074c3f7d7cb9f5ac5f0cb22
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-011.md
---

An individual, who is now 65 years old, is entering a Continuing Care Retirement Community (CCRC) under a full life care (Type A) contract. The individual will move into an Independent Living Unit (ILU). The individual pays a one-time fee of $F$ immediately on entry and a level monthly fee of $M$ at the start of each month that she is in the CCRC, including the first.

You are given:

(i) The entry fee, $F$, is equal to 25% of the expected present value of all future costs.

(ii) The CCRC operates three types of accommodation; they are listed here, with the monthly costs incurred at the beginning of the month by the CCRC for each resident in each category:

| | |
|---|---|
| Independent Living Unit (ILU): | 3,000 |
| Assisted Living Unit (ALU): | 7,500 |
| Specialized Nursing Facility (SNF): | 15,000 |

(iii) $i = 0.05$

(iv) The monthly fee $M$ is determined so that the expected present value of the monthly costs at entry is equal to the expected present value of the fees at entry, including the entry fee.

(v) The CCRC uses the following multiple state model to determine the fee structure.

![State diagram: ILU (State 0), ALU (State 1), SNF (State 2) and Dead (State 3); arrows run 0 to 1, 1 to 2, and from each of States 0, 1 and 2 to State 3.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-011-state-diagram.png)

(vi) The following actuarial functions have been evaluated for the model at $i = 0.05$

| $x$ | $\ddot{a}_x^{(12)00}$ | $\ddot{a}_x^{(12)01}$ | $\ddot{a}_x^{(12)02}$ | $\ddot{a}_x^{(12)11}$ | $\ddot{a}_x^{(12)12}$ | $\ddot{a}_x^{(12)22}$ | $A_x^{(12)03}$ |
|---|---|---|---|---|---|---|---|
| 65 | 11.4106 | 1.3570 | 0.3745 | 11.8352 | 0.7979 | 10.6905 | 0.3601 |
| 70 | 9.5210 | 1.7037 | 0.4942 | 10.1754 | 0.9960 | 9.1961 | 0.4294 |

## Part a (3 points)

(i) You are given that $F$ is 150,000 to the nearest 1000. Calculate $F$ to the nearest 10.

(ii) Calculate $M$.

### Explanation
(a)(i) EPV of future costs is

$$12\times 3000\times\ddot{a}_{65}^{(12)00} + 12\times 7500\times\ddot{a}_{65}^{(12)01} + 12\times 15000\times\ddot{a}_{65}^{(12)02} = 600{,}321.6$$

So $F$ is 25% of the EPV = 150,080

(a)(ii) The monthly fee is $M$ where

$$12M\left(\ddot{a}_{65}^{(12)00} + \ddot{a}_{65}^{(12)01} + \ddot{a}_{65}^{(12)02}\right) = 0.75(600321.6) \Rightarrow M = 2854.95$$

## Part b (3 points)

(i) Calculate ${}_5V^{(0)}$, the policy value five years after entry, assuming the insured is in state 0.

(ii) Calculate ${}_5V^{(1)}$, the policy value five years after entry, assuming the insured is in state 1.

### Explanation
(b)(i) The reserve is EPV future outgo – EPV future fee income, so

$$\begin{align*}
{}_5V^{(0)} &= 12(3000)\ddot{a}_{70}^{(12)00} + 12(7500)\ddot{a}_{70}^{(12)01} + 12(15000)\ddot{a}_{70}^{(12)02} \\
&\quad - 12(2854.95)\left(\ddot{a}_{70}^{(12)00} + \ddot{a}_{70}^{(12)01} + \ddot{a}_{70}^{(12)02}\right) \\
&= 183{,}563
\end{align*}$$

(b)(ii) Now we have

$$\begin{align*}
{}_5V^{(1)} &= 12\times 7500\times\ddot{a}_{70}^{(12)11} + 12\times 15000\times\ddot{a}_{70}^{(12)12} - 12\times 2854.95\times\left(\ddot{a}_{70}^{(12)11} + \ddot{a}_{70}^{(12)12}\right) \\
&= 712{,}340
\end{align*}$$

## Part c (2 points)

You are given that

$${}_{\frac{1}{12}}p_{69\frac{11}{12}}^{00} = 0.94937 \qquad {}_{\frac{1}{12}}p_{69\frac{11}{12}}^{01} = 0.00906 \qquad {}_{\frac{1}{12}}p_{69\frac{11}{12}}^{02} = 0.00003$$

Calculate ${}_{4\frac{11}{12}}V^{(0)}$.

### Explanation
By recursion, we have

$$\left({}_{4\frac{11}{12}}V^{(0)} + M - 3000\right)(1.05)^{\frac{1}{12}} = {}_{\frac{1}{12}}p_{69\frac{11}{12}}^{00}\ {}_5V^{(0)} + {}_{\frac{1}{12}}p_{69\frac{11}{12}}^{01}\ {}_5V^{(1)} + {}_{\frac{1}{12}}p_{69\frac{11}{12}}^{02}\ {}_5V^{(2)}$$

$${}_5V^{(2)} = 12\times(15000 - 2854.95)\times\ddot{a}_{70}^{(12)22} = 1{,}340{,}245$$

$$\begin{align*}
\Rightarrow {}_{4\frac{11}{12}}V^{(0)} &= \left(0.94937(183{,}563) + 0.00906(712{,}340) + 0.00003(1{,}340{,}245)\right)v^{\frac{1}{12}} + 145.05 \\
&= 180{,}175
\end{align*}$$

## Part d (4 points)

The CCRC introduces an option under which 50% of the initial fee is refunded at the end of the month of death. The revised entry fee, $F$, will be equal to 25% of the expected present value of all future costs plus the refund. The revised monthly fee $M$ is determined so that the expected present value of the monthly costs plus the expected present value of the refund benefit are equal to the expected present value of $M$ plus the expected present value of $F$.

(i) Calculate the revised entry fee assuming the individual selects the refund option.

(ii) Calculate the revised monthly fee assuming the individual selects this option.

(iii) State with reasons whether ${}_5V^{(0)}$ will increase, decrease or stay the same under the 50% refund contract.

### Explanation
(d)(i) The equation of value for $F$ is now

$$F = 0.25\left(600{,}321.6 + 0.5FA_{65}^{(12)03}\right) = 150{,}080 + 0.04501F$$

$$\Rightarrow F = 157{,}153$$

(d)(ii) The equation of value for M is now

$$12M\left(\ddot{a}_{65}^{(12)00} + \ddot{a}_{65}^{(12)01} + \ddot{a}_{65}^{(12)02}\right) = 0.75\left(600321.6 + 0.5FA_{65}^{(12)03}\right)$$

$$\Rightarrow M = 2989.52$$

(d)(iii) *(The SOA's published solutions print no answer to this part.)*
