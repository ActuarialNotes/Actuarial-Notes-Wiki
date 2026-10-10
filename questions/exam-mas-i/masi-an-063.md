---
id: "masi-an-063"
exam: "Exam MAS-I"
topic: "Cramér-Rao Lower Bound"
learning_objective: "Statistics"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Cramér-Rao+Lower+Bound
  - Concepts/Fisher+Information
  - Concepts/Gamma
  - Concepts/Unbiasedness
answer: "19200"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:9618c9270501bf744e2b241602fcb4935d0af8d1f31d04fd78f6a10329201bbd
  sources:
    - "Siegrist, randomservices.org, ch.7 Best Unbiased Estimators, Cramer-Rao lower bound for an unbiased estimator of lambda(theta): [d lambda/d theta]^2 / E[L_2], sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.3.2.1 gamma density, PDF p.11, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-063.md
---

Claim sizes follow a gamma distribution with known shape $\alpha = 3$ and unknown scale $\theta$:

$$
f(x) = \frac{x^{\alpha - 1} e^{-x/\theta}}{\Gamma(\alpha)\,\theta^{\alpha}}, \quad x > 0
$$

A random sample of 25 claims will be used to estimate the mean claim size, $\alpha\theta = 3\theta$.

Calculate the Cramér–Rao lower bound for the variance of an unbiased estimator of the mean claim size, evaluated at $\theta = 400$. Give your answer as a whole number.

## Explanation

The Fisher information in one observation, from the second derivative of the log-density in $\theta$:

$$
\begin{align*}
\ln f(x) &= (\alpha - 1)\ln x - \frac{x}{\theta} - \ln\Gamma(\alpha) - \alpha\ln\theta \\
\frac{\partial^2}{\partial\theta^2}\ln f(x) &= -\frac{2x}{\theta^3} + \frac{\alpha}{\theta^2} \\
I(\theta) &= \frac{2\alpha\theta}{\theta^3} - \frac{\alpha}{\theta^2} \\
&= \frac{\alpha}{\theta^2}
\end{align*}
$$

The target is $g(\theta) = \alpha\theta$, so $g'(\theta) = \alpha$, and

$$
\begin{align*}
\text{Var}(T) &\ge \frac{[g'(\theta)]^2}{n\,I(\theta)} \\
&= \frac{\alpha^2}{n\alpha/\theta^2} \\
&= \frac{\alpha\theta^2}{n} \\
&= \frac{3 \times 400^2}{25} \\
&= 19{,}200
\end{align*}
$$

The bound is **19200**. The sample mean is unbiased for $\alpha\theta$ with variance $\alpha\theta^2/n$, so it attains the bound.

**Common wrong entries**

- **2133.33** — $\theta^2/(n\alpha)$, the bound for estimating $\theta$ itself: the factor $[g'(\theta)]^2 = \alpha^2$ for a function of the parameter was left out.
- **57600** — $\alpha^2\theta^2/n$: the $g'$ factor included but the information taken as $\theta^{-2}$, the exponential's, ignoring the shape.
- **480000** — $\alpha\theta^2$, the bound for a single observation: the information of the sample is $n I(\theta)$, not $I(\theta)$.
