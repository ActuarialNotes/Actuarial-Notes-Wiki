---
id: "masi-an-061"
exam: "Exam MAS-I"
topic: "Rao-Blackwell Theorem"
learning_objective: "Statistics"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Rao-Blackwell+Theorem
  - Concepts/Sufficient+Statistic
  - Concepts/Unbiasedness
  - Concepts/Minimum+Variance
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7a3d0d61ecbd33c0eb739b7843a197c3cbe8ac6a1980e725e5deba80d4ccc89e
  sources:
    - "Siegrist, randomservices.org, ch.7 Sufficient, Complete and Ancillary Statistics, Rao-Blackwell theorem (E(V|U) is a valid statistic because U is sufficient, unbiased and uniformly better); complete statistics; Lehmann-Scheffe theorem, sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-061.md
---

Let $W$ be an unbiased estimator of a parameter $\theta$, computed from a random sample $X_1, \ldots, X_n$, and let $T$ be a statistic computed from the same sample.

Determine which of the following statements are true.

- I. If $T$ is sufficient for $\theta$, then $E[W \mid T]$ is unbiased for $\theta$ and its variance is no larger than $\text{Var}(W)$, whatever the value of $\theta$.
- II. If $T$ is not sufficient for $\theta$, then $E[W \mid T]$ can depend on $\theta$, in which case it cannot be computed from the data and is not an estimator.
- III. If $T$ is sufficient but not complete, then $E[W \mid T]$ is still guaranteed to be the minimum variance unbiased estimator of $\theta$, whichever unbiased $W$ is used.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

Take each statement in turn.

**I — true.** This is the Rao–Blackwell theorem. Unbiasedness follows from the tower property, and the variance inequality from the law of total variance:

$$
E\big[E[W \mid T]\big] = E[W] = \theta
$$

$$
\text{Var}(W) = \text{Var}\big(E[W \mid T]\big) + E\big[\text{Var}(W \mid T)\big] \ge \text{Var}\big(E[W \mid T]\big)
$$

**II — true.** Sufficiency is exactly what makes the conditional distribution of the sample given $T$ free of $\theta$. Without it, $E[W \mid T]$ is in general a function of $\theta$ as well as of $T$, so it cannot be evaluated from the data — it is not a statistic, let alone an estimator.

**III — false.** Rao–Blackwellization improves an estimator but does not, by itself, produce *the* best one. That needs completeness (the Lehmann–Scheffé theorem): when $T$ is complete and sufficient, every unbiased function of $T$ is the same estimator, the UMVUE. Without completeness the result can depend on the $W$ you start from. The extreme case: the whole sample $T = (X_1, \ldots, X_n)$ is always sufficient, and conditioning on it returns $W$ unchanged, so any unbiased $W$ — however poor — would be "guaranteed" to be best.

Statements I and II only are true, so the answer is **B**.

**Why not the others**

- **A** — rejects II, missing that sufficiency is what makes $E[W \mid T]$ free of $\theta$; conditioning on any statistic still lowers variance, but only conditioning on a sufficient one yields something computable.
- **C** and **D** — accept III, confusing the Rao–Blackwell theorem (an improvement) with Lehmann–Scheffé (optimality, which needs completeness).
- **E** — would require the true set to be something other than I and II, such as all three or none.
