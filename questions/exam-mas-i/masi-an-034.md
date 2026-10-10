---
id: "masi-an-034"
exam: "Exam MAS-I"
topic: "Type II Error"
learning_objective: "Statistics"
difficulty: medium
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Type+II+Error
  - Concepts/Power+of+a+Test
  - Concepts/Hypothesis+Testing
  - Concepts/Critical+Value
  - Concepts/Normal+Distribution
points: 2
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3bbdcde8f3f3749d24c7f977f79b8039270d19e24a7385637e2c196f7f26181e
  sources:
    - "Siegrist, randomservices.org, ch.9 Tests in the Normal Model, power function of the right-tailed z test, sha256:fd7bc50171fc51310f41e9132005b66cdbbd31bf507a70a0246394b05a379ab2 — https://www.randomservices.org/random/hypothesis/Normal.html"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-034.md
---

An actuary suspects that average claim cost has risen above its filed value of 500. Claim costs are normally distributed with known standard deviation $\sigma = 120$. She tests $H_0: \mu = 500$ against $H_1: \mu > 500$ with a one-sided $z$-test on the sample mean, at significance level $\alpha = 0.05$. Use $z_{0.05} = 1.645$ and $z_{0.10} = 1.282$.

## Part a (1 point)
The test uses $n = 36$ claims. Calculate the probability of a Type II error if the true mean is 540.

- A) Less than 0.20
- B) At least 0.20, but less than 0.40
- C) At least 0.40, but less than 0.60
- D) At least 0.60, but less than 0.80
- E) At least 0.80

### Answer
B

### Explanation
The standard error is $\sigma/\sqrt{n} = 120/\sqrt{36} = 20$, so the test rejects $H_0$ when

$$
\bar{X} > c = 500 + 1.645(20) = 532.9
$$

A Type II error is failing to reject when $\mu = 540$:

$$
\beta = P(\bar{X} \le 532.9 \mid \mu = 540) = \Phi\!\left(\frac{532.9 - 540}{20}\right) = \Phi(-0.355) = 0.361
$$

This is in **B**.

**Why not the others**

- **A** — 0.05 is $\alpha$, the Type I error probability, which is fixed by the design and says nothing about missing a true increase.
- **C** — 0.484 comes from a two-sided critical value, $c = 500 + 1.96(20) = 539.2$, for a one-sided alternative.
- **D** — 0.639 is the power, $\text{power} = 1 - \beta$: the probability of *rejecting* when $\mu = 540$.
- **E** — 0.905 comes from using $\sigma = 120$ instead of $\sigma/\sqrt{n} = 20$ as the standard deviation of $\bar{X}$, both in the critical value and in the standardisation.

## Part b (1 point)
Calculate the smallest sample size $n$ for which the probability of a Type II error at $\mu = 540$ is at most 0.10, keeping $\alpha = 0.05$. Give your answer as a whole number.

### Answer
78

### Explanation
The critical value is $c = 500 + 1.645\,\sigma/\sqrt{n}$, and $\beta \le 0.10$ requires it to sit at least 1.282 standard errors below 540:

$$
500 + 1.645\frac{\sigma}{\sqrt{n}} \le 540 - 1.282\frac{\sigma}{\sqrt{n}}
$$

$$
\sqrt{n} \ge \frac{(1.645 + 1.282)(120)}{40} = 8.781
$$

$$
n \ge 77.11
$$

The sample size must be a whole number of claims at least 77.11, so the answer is **78**. (Check: at $n = 77$, $\beta = 0.1003$; at $n = 78$, $\beta = 0.0970$.)

**Common wrong entries**

- **77** — rounding 77.11 to the nearest integer instead of up; 77 claims leave $\beta$ just above 0.10.
- **95** — using the two-sided $z_{0.025} = 1.96$ in place of $z_{0.05} = 1.645$.
- **98** — using 1.645 for both the Type I and the Type II requirement, which targets $\beta = 0.05$ instead of 0.10.
