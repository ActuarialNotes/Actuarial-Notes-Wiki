---
id: "masi-an-008"
exam: "Exam MAS-I"
topic: "Severity"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Severity
  - Concepts/Exponential+Distribution
  - Concepts/Deductible
  - Concepts/Inflation
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a12384b1f5854610a9f1872a676a05b71e11498a1f7342f531f27453900c693a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-008.md
---

Ground-up losses are exponential with mean 1,000. A policy has an ordinary deductible of 500 and no limit. Next year all losses increase by 10%, and the deductible stays at 500.

By what percentage do the expected payment per loss and the expected payment per payment each increase?

- A) Per loss 10.0%; per payment 10.0%
- B) Per loss 10.0%; per payment 15.1%
- C) Per loss 15.1%; per payment 20.5%
- D) Per loss 15.1%; per payment 15.1%
- E) Per loss 15.1%; per payment 10.0%

## Explanation

Inflated losses are exponential with mean $\theta' = 1{,}100$.

**Per payment.** The exponential is memoryless, so the excess over the deductible, given that the loss exceeds it, is exponential with the same mean:

$$
E[X - d \mid X > d] = \theta
$$

It goes from 1,000 to 1,100, up **10.0%**: the deductible does not lever the severity of the payments that occur.

**Per loss.** The expected payment per loss is the per-payment severity times the probability of a payment:

$$
\begin{align*}
E[(X - 500)_+] &= \theta\,e^{-500/\theta} \\
\text{Before:}\quad 1{,}000\,e^{-0.5} &= 606.53 \\
\text{After:}\quad 1{,}100\,e^{-500/1{,}100} &= 698.21 \\
\frac{698.21}{606.53} - 1 &= 15.1\%
\end{align*}
$$

The extra 5.1 points come entirely from more losses clearing the deductible: $\Pr(X > 500)$ rises from 0.6065 to 0.6347, up 4.65%, and $(1.10)(1.0465) = 1.151$. The answer is **E**.

**Why not the others**

- **A** treats both measures as moving with ground-up inflation, ignoring that a fixed deductible lets more losses through.
- **B** swaps the two: it is the per-*loss* measure that picks up the higher probability of a payment.
- **C** multiplies the per-loss change by the growth in $\Pr(X > 500)$; per-payment severity *divides* by that probability, $(1.151)/(1.0465) = 1.10$.
- **D** assumes the per-payment severity is levered as well; for a memoryless loss it rises exactly with inflation.
