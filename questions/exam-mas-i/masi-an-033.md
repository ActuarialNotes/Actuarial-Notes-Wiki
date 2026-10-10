---
id: "masi-an-033"
exam: "Exam MAS-I"
topic: "Type II Error"
learning_objective: "Statistics"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Type+II+Error
  - Concepts/Type+I+Error
  - Concepts/Power+of+a+Test
  - Concepts/Hypothesis+Testing
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2a5c499bb86f7e04d0392c25357b53338ac991aaa5d617868c1a2d6ae7ae4a0a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-033.md
---

An actuary tests whether average claim cost has risen, $H_0: \mu = 500$ against $H_1: \mu > 500$, with a one-sided $z$-test on the mean of $n = 36$ claims at significance level $\alpha = 0.05$. The claim standard deviation is known. The true mean is in fact 540.

Which single change, with everything else held as stated, **increases** the probability of a Type II error?

- A) Raising the sample size from 36 to 64 claims
- B) Raising the significance level from 0.05 to 0.10
- C) Having a true mean of 560 rather than 540
- D) Having a smaller claim standard deviation
- E) Lowering the significance level from 0.05 to 0.01

## Explanation

A Type II error here is failing to reject $H_0$ although $\mu = 540$. The test rejects when $\bar{X} > c = 500 + z_{\alpha}\,\sigma/\sqrt{n}$, so

$$
\beta = P\left(\bar{X} \le c \mid \mu = 540\right) = \Phi\!\left(\frac{c - 540}{\sigma/\sqrt{n}}\right)
= \Phi\!\left(z_{\alpha} - \frac{540 - 500}{\sigma/\sqrt{n}}\right)
$$

$\beta$ rises whenever the argument of $\Phi$ rises. Lowering $\alpha$ from 0.05 to 0.01 raises $z_\alpha$ from 1.645 to 2.326: the critical value moves further from 500, more samples from $\mu = 540$ fall short of it, and $\beta$ grows. This is the trade-off between the two errors — guarding harder against a false alarm makes a real increase easier to miss. The answer is **E**.

**Why not the others**

- **A** — a larger $n$ shrinks $\sigma/\sqrt{n}$, which pulls the critical value toward 500 and spreads the true and null means further apart in standard-error units; $\beta$ falls.
- **B** — a larger $\alpha$ lowers the critical value, so the test rejects more readily; it trades a higher Type I error rate for a *lower* $\beta$.
- **C** — a true mean further from the null is easier to detect; $\beta$ depends on the true parameter and falls as it moves away from $H_0$.
- **D** — a smaller $\sigma$ has the same effect as a larger sample: a smaller standard error and a smaller $\beta$.
