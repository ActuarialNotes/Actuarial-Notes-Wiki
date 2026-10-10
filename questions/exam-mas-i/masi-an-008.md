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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a12384b1f5854610a9f1872a676a05b71e11498a1f7342f531f27453900c693a
  sources:
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.3.3.1 exponential E[X^x]=theta(1-e^{-x/theta}), PDF p.12, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.4.1 (Y^P for an exponential loss is exponential with the same mean, memoryless; E(Y^L)=E(Y^P)S(d)), 3.4.3 (inflation), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Tse, Nonlife Actuarial Models (Cambridge, 2009), publisher preview: table of contents, contents: 2.2 continuous severity distributions, 2.3 mixtures, 2.4 tail properties, 2.5 coverage modifications incl. 2.5.4 inflation, PDF pp.9-10 (contents only; text not read), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
