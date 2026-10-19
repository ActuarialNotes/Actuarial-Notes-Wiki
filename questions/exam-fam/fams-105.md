---
id: "fams-105"
exam: "Exam FAM"
topic: "Limited Expected Value"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Limited+Expected+Value
  - Concepts/Lognormal+Distribution
  - Concepts/Coverage+Modifications
  - Concepts/Deductible
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:82b5f49286a38588fab59ed51bea570b023ef0c25f0b561595083b08c4ecf074
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-105.md
---

Losses follow a lognormal distribution with $\mu = 7$ and $\sigma = 2$.

A policy covering these losses makes no payment for losses below 5,000. For losses between 5,000 and 20,000, the policy pays the full amount of the loss. For losses exceeding 20,000, the policy pays 20,000.

Calculate the expected cost per loss.

- A) 2,961
- B) 3,109
- C) 3,273
- D) 3,307
- E) 3,583

## Explanation

This policy has three components, an ordinary deductible of 5,000, a maximum covered loss of 20,000, and a bonus payment of 5,000 whenever there is a payment. The expected cost per loss is

$$E(X \wedge 20{,}000) - E(X \wedge 5{,}000) + 5{,}000[1 - F(5{,}000)].$$

$$E(X \wedge x) = \exp\left(\mu + \sigma^2/2\right)\Phi\left(\frac{\ln(x) - \mu - \sigma^2}{\sigma}\right) + x[1 - F(x)]$$

$$\begin{align*}
E(X \wedge 20{,}000) &= \exp(7 + 2^2/2)\Phi\left(\frac{\ln(20{,}000) - 7 - 2^2}{2}\right) + 20{,}000\left[1 - \Phi\left(\frac{\ln(20{,}000) - 7}{2}\right)\right] \\
&= 3{,}830
\end{align*}$$

$$\begin{align*}
E(X \wedge 5{,}000) &= \exp(7 + 2^2/2)\Phi\left(\frac{\ln(5{,}000) - 7 - 2^2}{2}\right) + 5{,}000\left[1 - \Phi\left(\frac{\ln(5{,}000) - 7}{2}\right)\right] \\
&= 1{,}989
\end{align*}$$

$$\begin{align*}
5{,}000[1 - F(5{,}000)] &= 5{,}000\left[1 - \Phi\left(\frac{\ln(5{,}000) - 7}{2}\right)\right] \\
&= 1{,}120
\end{align*}$$

$$\begin{align*}
E(X \wedge 20{,}000) - E(X \wedge 5{,}000) + 5{,}000[1 - F(5{,}000)] &= 3{,}830 - 1{,}989 + 1{,}120 \\
&= 2{,}961
\end{align*}$$

The answer is **A**.
