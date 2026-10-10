---
id: "masi-an-032"
exam: "Exam MAS-I"
topic: "Random Sample"
learning_objective: "Statistics"
difficulty: easy
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Random+Sample
  - Concepts/Sample+Mean
  - Concepts/Sample+Variance
  - Concepts/Standard+Deviation
answer: "2.87"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c7164547d352e3d484e8f0bd50c7948c61c734f781253785fd32405b6e07e224
  sources:
    - "Siegrist, randomservices.org, ch.6 The Sample Variance, standard sample variance S^2 with divisor n-1, sha256:452e2841007fad173229a9bb069a4acdda8e0d0bc6c1632f7239ef585248b0c6 — https://www.randomservices.org/random/sample/Variance.html"
    - "Siegrist, randomservices.org, ch.7 Estimators, Var(M) = sigma^2/n, sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-032.md
---

An insurer treats the following eight claim amounts, in thousands, as a random sample from its severity distribution:

$$
3,\quad 7,\quad 8,\quad 12,\quad 15,\quad 18,\quad 22,\quad 27
$$

Calculate the estimated standard error of the sample mean, using the unbiased sample variance. Give your answer in thousands, to two decimal places (for example, 1.23).

## Explanation

The standard error of $\bar{X}$ is $\sigma/\sqrt{n}$; with $\sigma$ unknown it is estimated by $S/\sqrt{n}$, with $S^2$ the unbiased sample variance (divisor $n - 1$).

$$
\bar{x} = \frac{112}{8} = 14
$$

$$
\sum_{i=1}^{8} (x_i - \bar{x})^2 = 121 + 49 + 36 + 4 + 1 + 16 + 64 + 169 = 460
$$

$$
s^2 = \frac{460}{8 - 1} = 65.714, \qquad s = 8.1064
$$

$$
\widehat{\text{SE}}(\bar{X}) = \frac{s}{\sqrt{n}} = \frac{8.1064}{\sqrt{8}} = 2.8661
$$

The answer is **2.87**.

**Common wrong entries**

- **2.68** — dividing the sum of squares by $n = 8$ instead of $n - 1 = 7$, the biased variance estimate the stem ruled out.
- **8.11** — reporting $s$, the spread of a single claim, instead of the spread of the mean of eight claims.
- **8.21** — dividing the variance by $n$ but not taking the square root: $s^2/n$ estimates $\text{Var}(\bar{X})$, not its standard deviation.
