---
id: "altam-021"
exam: "Exam ALTAM"
topic: "Joint Life"
learning_objective: "Joint Life Insurance and Annuities"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Joint+Life
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Expected+Value
  - Concepts/Random+Variable
  - Concepts/Insurance+Premium
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c89fd31a4d2b7a9473fbb50a93281f8522e1a70ea7c7c3893dd5218f73348d12
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-021.md
---

A fully discrete, joint life 10-year endowment insurance policy, with sum insured 100,000, is issued to two independent lives, both aged 70. Premiums are payable annually until the earlier of the first death or the contract maturity.

You are given:

(i) Acquisition expenses are 400 plus 50% of the first year's premium.

(ii) Renewal expenses are 2% of each subsequent premium.

(iii) Mortality follows Standard Ultimate Life Table.

(iv) $i = 0.05$

(v) The gross premium is $G = 10{,}658$.

(vi) $L_0$ is the gross loss at issue random variable.

## Part a (1 point)

Calculate the probability that both lives survive to the end of the contract.

### Explanation
Due to independence:

$${}_{10}p_{70:70} = \left({}_{10}p_{70}\right)^2 = \left(\frac{l_{80}}{l_{70}}\right)^2 = \left(\frac{75{,}657.2}{91{,}082.4}\right)^2 = 0.689972$$

### Examiner Report
**Graders' Comments:** *The majority of candidates did well on parts (a) to (d) with many receiving full credit. Part (e) proved much more challenging, with few candidates receiving full credit.*

## Part b (2 points)

Show that the expected loss at issue for the policy is $-4{,}470$ to the nearest 10. You should calculate the value to the nearest 1.

### Explanation
$$E[L_0] = 100{,}000\,A_{70:70:\overline{10}|} + 400 - G\left(0.98\,\ddot{a}_{70:70:\overline{10}|} - 0.48\right)$$

where

$$\ddot{a}_{70:70:\overline{10}|} = 7.2329 \quad \text{(from SULT)}$$

$$A_{70:70:\overline{10}|} = 1 - d\,\ddot{a}_{70:70:\overline{10}|} = 1 - (0.04762)(7.2329) = 0.65557$$

Then

$$\begin{align*}
E[L_0] &= 65{,}557 + 400 - 10{,}658\left(0.98(7.2329) - 0.48\right) \\
&= -4{,}474
\end{align*}$$

## Part c (3 points)

(i) Show that ${}^2A_{70:70:\overline{10}|} = 0.44$ to the nearest 0.01. You should calculate the value to the nearest 0.001.

(ii) Show that the standard deviation of $L_0$ is 30,000 to the nearest 10,000. You should calculate the value to the nearest 10.

### Explanation
(i)
$$\begin{align*}
{}^2A_{70:70:\overline{10}|} &= {}^2A_{70:70} + {}_{10}p_{70:70}\,v^{20}\left(1 - {}^2A_{80:80}\right) \\
&= 0.30743 + 0.689972\,(1.05)^{-20}\,(1 - 0.50165) \\
&= 0.437
\end{align*}$$

(ii)
$$L_0 = 100{,}000\,v^{\min(K_{70:70}+1,\,10)} + 400 - G\left(0.98\,\ddot{a}_{\overline{\min(K_{70:70}+1,\,10)}|} - 0.48\right)$$

$$L_0 = 100{,}000\,v^{\min(K_{70:70}+1,\,10)} + 400 - G\left((0.98)\left(\frac{1 - v^{\min(K_{70:70}+1,\,10)}}{d}\right) - 0.48\right)$$

$$L_0 = \left(100{,}000 + \frac{0.98\,G}{d}\right)v^{\min(K_{70:70}+1,\,10)} + 400 - G\left(\frac{0.98}{d} - 0.48\right)$$

$$\begin{align*}
Var[L_0] &= \left(100{,}000 + \frac{0.98\,G}{d}\right)^2 Var\left[v^{\min(K_{70:70}+1,\,10)}\right] \\
&= \left(100{,}000 + \frac{0.98\,G}{d}\right)^2\left({}^2A_{70:70:\overline{10}|} - \left(A_{70:70:\overline{10}|}\right)^2\right) \\
&= 737{,}080{,}000
\end{align*}$$

$$SD[L_0] = 27{,}150$$

## Part d (2 points)

Now consider a portfolio of 100 identical, independent policies issued to couples both aged 70, with independent future lifetimes. Calculate the probability that the aggregate loss at issue is positive, using the Normal approximation to the aggregate loss distribution.

### Explanation
Let $L_{0,i}$ be the loss at issue for policy i, $i = 1, 2, \ldots, 100$.

The aggregate loss at issue is $L = \sum_{i=1}^{100} L_{0,i}$.

Then, $E[L] = 100\,E[L_0] = -447{,}400$

$$Var[L] = 100\,Var[L_0]$$

$$SD[L] = 10\,SD[L_0] = 271{,}500$$

$$\begin{align*}
P[L > 0] &\approx 1 - \Phi\left(\frac{0 - (-447{,}400)}{271{,}500}\right) \\
&\approx 1 - \Phi(1.648) \\
&\approx 0.05
\end{align*}$$

## Part e (2 points)

In a sub-portfolio of 10 identical, independent policies issued to couples with lives both age 70, the age at death of the 10 couples' lives turned out to be the following:

| Policy Number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Age at death of first to die | 75.2 | 78.5 | 80.5 | 82.1 | 83.5 | 83.8 | 83.9 | 91.3 | 91.5 | 95.8 |
| Age at death of second to die | 77.2 | 93.1 | 81.7 | 90.1 | 92.3 | 95.0 | 96.3 | 91.7 | 94.2 | 100.8 |

Without further calculation, state whether the value of the total profit realized in this sub-portfolio will be greater or less than the expected value of the profit for the sub-portfolio. Justify your answer.

(This is Question 1 from the Spring 2020 Written Answer exam.)

### Explanation
The total profit realized in this sub-portfolio will be <u>**greater**</u> than its expected value.

<u>Justification:</u>

There were two death benefits paid during the term of the contract and 8 endowment benefits paid at maturity (time 10).

The expected number of death benefits in the sub-portfolio was $10\left(1 - {}_{10}p_{70:70}\right)$ which represents 3.1 death benefits.

The EPV of the 2 death benefits was lower than expected.

<u>Or</u>

The mortality experience in this sub-portfolio was better than expected and the death benefits were paid relatively late in the term of the policy (at times 6 and 9).

Consequently, the EPV of the benefits was lower than expected.
