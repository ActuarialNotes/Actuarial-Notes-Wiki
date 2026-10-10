---
id: "masi-an-013"
exam: "Exam MAS-I"
topic: "Insurance Portfolio"
learning_objective: "Statistics"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Insurance+Portfolio
  - Concepts/Coefficient+of+Variation
  - Concepts/Covariance
  - Concepts/Variance
answer: "E"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a899c78ffea8f50297bc84f90faaad79f2449cf876d34ddbe2cebbd058f3ab03
  sources:
    - "Siegrist, Probability, Mathematical Statistics, Stochastic Processes (randomservices.org), ch.4 Covariance and Correlation, The Variance of a Sum (variance of a sum = sum of pairwise covariances), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "CAS Exam MAS-I Content Outline 2026, domain titles (B. Statistics) and Domain B tasks, PDF pp.3-4; text references (Hogg B sections incl. 2.8 linear combinations), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-013.md
---

An insurer's portfolio is 8,000 coastal homes. Each home's annual loss has mean $\mu$ and standard deviation $\sigma = 10\mu$, and any two coastal homes' losses have correlation 0.01. The portfolio's coefficient of variation (CV) of total annual loss is currently 1.006.

The insurer will add 2,000 more homes of the same kind, either on the same coast (correlation 0.01 with every coastal home) or inland (independent of every other home). Its criterion is the lower CV of total annual loss. Which is the best assessment?

- A) Either location: the CV falls to about 0.900 in both cases
- B) Either location: the CV falls to 0.100 in both cases
- C) Neither: adding homes raises the variance of total loss
- D) Coastal: its CV is 0.806 against 1.005 inland
- E) Inland: its CV is 0.806 against 1.005 coastal

## Explanation

For $n$ homes with standard deviation $\sigma$ and common correlation $\rho$:

$$
\text{Var}(S) = n\sigma^2 + n(n-1)\rho\,\sigma^2
$$

**Coastal**, 10,000 correlated homes:

$$
\begin{align*}
\text{CV} &= \frac{\sigma}{\mu}\sqrt{\frac{1 + 9{,}999(0.01)}{10{,}000}} \\
&= 10\sqrt{0.010099} \\
&= 1.005
\end{align*}
$$

**Inland**: the new homes add $\sigma^2 \times 2{,}000$ of variance and no covariance:

$$
\begin{align*}
\text{Var}(S) &= \sigma^2\left[8{,}000 + 8{,}000(7{,}999)(0.01) + 2{,}000\right] \\
&= 649{,}920\,\sigma^2 \\
\text{CV} &= \frac{10\mu\sqrt{649{,}920}}{10{,}000\,\mu} \\
&= 0.806
\end{align*}
$$

Correlation puts a floor of $\frac{\sigma}{\mu}\sqrt{\rho} = 1.0$ under the CV of the coastal book, so more coastal homes barely help; independent homes dilute it. The insurer should write **inland**, so the answer is **E**.

**Why not the others**

- **A** scales the current CV by $\sqrt{8{,}000/10{,}000}$, which is right only if every home is independent of every other.
- **B** ignores the correlation everywhere: $\sigma/(\mu\sqrt{10{,}000}) = 0.100$ is the CV of 10,000 independent homes.
- **C** confuses total variance with relative risk; the criterion is the CV, which falls in both cases.
- **D** has the two CVs the wrong way round.
