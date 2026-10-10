---
id: "masi-an-075"
exam: "Exam MAS-I"
topic: "Coverage Modifications"
learning_objective: "Statistics"
difficulty: medium
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Coverage+Modifications
  - Concepts/Limited+Expected+Value
  - Concepts/Exponential+Distribution
  - Concepts/Deductible
  - Concepts/Coinsurance
  - Concepts/Payment+Random+Variable
  - Concepts/Inflation
points: 3
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:cc0e0c2226f20e15b3fe6b75220ba63229219072c9c1f28e9bf39d916820f7cf
  sources:
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.3.3.1 exponential E[X^x] = theta(1 - e^{-x/theta}), PDF p.12, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.4.3 Y^L = alpha[(X^u) - (X^d)]; inflation E(Y^L) = alpha(1+r)[E(X^u/(1+r)) - E(X^d/(1+r))]; 3.4.1 E(Y^P) = E(Y^L)/S(d), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Tse, Nonlife Actuarial Models (Cambridge, 2009), publisher preview: table of contents, contents: 2.2 continuous severity distributions, 2.3 mixtures, 2.4 tail properties, 2.5 coverage modifications incl. 2.5.4 inflation, PDF pp.9-10 (contents only; text not read), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-075.md
---

Ground-up losses $X$ are exponential with mean 1,000, so $E[X \wedge x] = 1{,}000\left(1 - e^{-x/1{,}000}\right)$. A policy has an ordinary deductible of 250, a maximum covered loss of 3,000, and 75% coinsurance.

## Part a (1 point)
Calculate the expected payment per loss, $E[Y^L]$. Give your answer to the nearest whole number.

### Answer
547

### Explanation
The payment per loss is $Y^L = 0.75\big[(X \wedge 3{,}000) - (X \wedge 250)\big]$:

$$
\begin{align*}
E[X \wedge 250] &= 1{,}000\left(1 - e^{-0.25}\right) \\
&= 221.199 \\
E[X \wedge 3{,}000] &= 1{,}000\left(1 - e^{-3}\right) \\
&= 950.213 \\
E[Y^L] &= 0.75\,(950.213 - 221.199) \\
&= 546.76
\end{align*}
$$

which rounds to **547**.

**Common wrong entries:** **729** leaves out the coinsurance; **584** ignores the maximum covered loss, using $E[X] = 1{,}000$ in place of $E[X \wedge 3{,}000]$.

## Part b (1 point)
Calculate the expected payment per payment, $E[Y^P]$. Give your answer to the nearest whole number.

### Answer
702

### Explanation
Only losses above the deductible produce a payment, with probability $S(250) = e^{-0.25} = 0.7788$:

$$
\begin{align*}
E[Y^P] &= \frac{E[Y^L]}{S(250)} \\
&= \frac{546.76}{0.7788} \\
&= 702.05
\end{align*}
$$

which rounds to **702**.

**Common wrong entries:** **547** forgets to condition on a payment occurring; **2472** divides by $F(250)$, the probability of *no* payment, instead of $S(250)$.

## Part c (1 point)
All losses inflate by 10%, while the deductible, maximum covered loss and coinsurance stay the same. Calculate the new expected payment per loss. Give your answer to the nearest whole number.

### Answer
603

### Explanation
With $X' = 1.1X$, deflate the policy terms instead of inflating the losses, and multiply by 1.1:

$$
\begin{align*}
E[Y^L] &= 0.75 \times 1.1\left(E\big[X \wedge \tfrac{3{,}000}{1.1}\big] - E\big[X \wedge \tfrac{250}{1.1}\big]\right) \\
&= 0.825\,(934.603 - 203.297) \\
&= 603.33
\end{align*}
$$

which rounds to **603**, a 10.3% increase: the fixed deductible leverages inflation by slightly more than the fixed limit dampens it. (Equivalently, use an exponential with mean 1,100 and the original terms.)

**Common wrong entries:** **601** multiplies part (a) by 1.1, as if the fixed policy terms had no effect; **548** deflates the terms but drops the factor 1.1 in front; **596** inflates the terms instead of deflating them.
