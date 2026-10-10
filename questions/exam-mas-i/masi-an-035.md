---
id: "masi-an-035"
exam: "Exam MAS-I"
topic: "Efficiency"
learning_objective: "Statistics"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Efficiency
  - Concepts/Unbiasedness
  - Concepts/Order+Statistics
  - Concepts/Uniform+Continuous+Distribution
  - Concepts/Sample+Mean
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:97710e342039e00a58f20f5c6e7b1c27b7ed4c2faaabaec62c7dbe3eaae57189
  sources:
    - "Siegrist, randomservices.org, ch.7 Estimators, relative efficiency defined for unbiased estimators by variance, sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-035.md
---

Losses on a block of policies are uniformly distributed on $(0, \theta)$. From a random sample of $n = 5$ losses, two unbiased estimators of $\theta$ are proposed:

- $T_1$: twice the sample mean, $T_1 = 2\bar{X}$
- $T_2$: the largest loss scaled up, $T_2 = \tfrac{6}{5}X_{(5)}$

You are given that, for a sample of size $n$ from this distribution,

$$
E\big[X_{(n)}\big] = \frac{n\theta}{n+1}, \qquad \text{Var}\big(X_{(n)}\big) = \frac{n\theta^2}{(n+1)^2(n+2)}
$$

Calculate the efficiency of $T_2$ relative to $T_1$, defined as $\text{Var}(T_1)/\text{Var}(T_2)$.

- A) Less than 0.50
- B) At least 0.50, but less than 1.50
- C) At least 1.50, but less than 2.50
- D) At least 2.50, but less than 3.00
- E) At least 3.00

## Explanation

A uniform on $(0, \theta)$ has variance $\theta^2/12$, so

$$
\text{Var}(T_1) = 4\,\text{Var}(\bar{X}) = 4 \cdot \frac{\theta^2}{12 \cdot 5} = \frac{\theta^2}{15}
$$

Scaling $X_{(5)}$ by $\tfrac{6}{5}$ scales its variance by $\left(\tfrac{6}{5}\right)^2$:

$$
\text{Var}(T_2) = \frac{36}{25} \cdot \frac{5\theta^2}{36 \cdot 7} = \frac{\theta^2}{35}
$$

$$
\frac{\text{Var}(T_1)}{\text{Var}(T_2)} = \frac{35}{15} = 2.333
$$

This is in **C**: from five losses, the scaled maximum is about 2.3 times as efficient as the doubled mean. (In general the ratio is $\text{Var}(T_1)/\text{Var}(T_2) = (n+2)/3$, so the advantage grows with $n$.)

**Why not the others**

- **A** — 0.429 is the ratio upside down, $\text{Var}(T_2)/\text{Var}(T_1)$: the efficiency of $T_1$ relative to $T_2$.
- **B** — 0.583 uses $\text{Var}(\bar{X}) = \theta^2/60$ for $T_1$, forgetting that doubling an estimator multiplies its variance by 4.
- **D** — 2.80 scales $\text{Var}(X_{(5)})$ by $\tfrac{6}{5}$ instead of $\left(\tfrac{6}{5}\right)^2$.
- **E** — 3.36 uses the variance of the unscaled maximum $X_{(5)}$, a biased estimator, as though it were $T_2$'s.
