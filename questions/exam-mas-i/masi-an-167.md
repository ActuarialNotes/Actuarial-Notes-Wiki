---
id: "masi-an-167"
exam: "Exam MAS-I"
topic: "Chi-Squared Distribution"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multi-part
bloom: understand
wiki_link:
  - Concepts/Chi-Squared+Distribution
  - Concepts/Student's+t-Distribution
  - Concepts/F-Distribution
  - Concepts/Sample+Variance
  - Concepts/Normal+Distribution
points: 5
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7c06fe1183fa136de4f75b2e45e85a994c4c240cef38cf99e7d74dcf5b7197b6
  sources:
    - "Siegrist, Random, 'Special Properties of Normal Samples', n W^2/sigma^2 ~ chi-square(n); (n-1)S^2/sigma^2 ~ chi-square(n-1), independent of the sample mean; T = (M - mu)/(S/sqrt n) ~ t(n-1); F = (U/j)/(V/k); chi-square(k) mean k, variance 2k, sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-167.md
---

$X_1, \dots, X_n$ is a random sample from a normal distribution with mean $\mu$ and variance $\sigma^2$, with sample mean $\bar X$ and sample variance $S^2 = \sum (X_i - \bar X)^2/(n - 1)$. Match each statistic to its exact distribution. An option may be used more than once or not at all.

## Part a (1 point)
$$\frac{1}{\sigma^2}\sum_{i=1}^{n} (X_i - \mu)^2$$

- A) $\chi^2(1)$
- B) $\chi^2(n - 1)$
- C) $\chi^2(n)$
- D) $t(n - 1)$
- E) $F(1,\ n - 1)$

### Answer
C

### Explanation
Each $(X_i - \mu)/\sigma$ is an independent standard normal, and the chi-squared distribution with $n$ degrees of freedom is the distribution of a sum of $n$ such squares. No parameter is estimated, so no degree of freedom is lost (**B** would apply if $\bar X$ replaced $\mu$).

## Part b (1 point)
$$\frac{(n - 1)S^2}{\sigma^2}$$

- A) $\chi^2(1)$
- B) $\chi^2(n - 1)$
- C) $\chi^2(n)$
- D) $t(n - 1)$
- E) $F(1,\ n - 1)$

### Answer
B

### Explanation
$(n - 1)S^2/\sigma^2 = \sum (X_i - \bar X)^2/\sigma^2$. Measuring deviations from $\bar X$ instead of $\mu$ uses up one degree of freedom (the deviations sum to zero), so the distribution is $\chi^2(n - 1)$, not $\chi^2(n)$ (**C**).

## Part c (1 point)
$$\frac{n(\bar X - \mu)^2}{S^2}$$

- A) $\chi^2(1)$
- B) $\chi^2(n - 1)$
- C) $\chi^2(n)$
- D) $t(n - 1)$
- E) $F(1,\ n - 1)$

### Answer
E

### Explanation
This is the square of the one-sample $t$ statistic. Write it as

$$
\frac{n(\bar X - \mu)^2/\sigma^2}{S^2/\sigma^2} = \frac{\chi^2(1)/1}{\chi^2(n - 1)/(n - 1)}
$$

a ratio of independent chi-squared variables, each over its degrees of freedom, which is $F(1, n - 1)$. Choosing **A** forgets that $\sigma^2$ has been replaced by its estimate; choosing **D** forgets the square.

## Part d (1 point)
$$\frac{\bar X - \mu}{S/\sqrt{n}}$$

- A) $\chi^2(1)$
- B) $\chi^2(n - 1)$
- C) $\chi^2(n)$
- D) $t(n - 1)$
- E) $F(1,\ n - 1)$

### Answer
D

### Explanation
$(\bar X - \mu)/(\sigma/\sqrt n)$ is standard normal and $(n - 1)S^2/\sigma^2$ is an independent $\chi^2(n - 1)$, so the ratio of the first to the square root of the second over its degrees of freedom is $t(n - 1)$. Its square is part (c), **E**.

## Part e (1 point)
$$\frac{n(\bar X - \mu)^2}{\sigma^2}$$

- A) $\chi^2(1)$
- B) $\chi^2(n - 1)$
- C) $\chi^2(n)$
- D) $t(n - 1)$
- E) $F(1,\ n - 1)$

### Answer
A

### Explanation
$\bar X \sim N(\mu, \sigma^2/n)$, so $\sqrt n(\bar X - \mu)/\sigma$ is one standard normal, and its square is $\chi^2(1)$. With the known $\sigma^2$ in the denominator there is no estimated variance, so this is not the $F$ of part (c). Answering **C** confuses the sample size with the number of squared normals: there is only one.
