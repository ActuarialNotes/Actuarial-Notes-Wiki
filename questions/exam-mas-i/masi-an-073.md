---
id: "masi-an-073"
exam: "Exam MAS-I"
topic: "Tail Weight"
learning_objective: "Statistics"
difficulty: medium
type: multiple-choice
bloom: remember
wiki_link:
  - Concepts/Tail+Weight
  - Concepts/Gamma
  - Concepts/Weibull+Distribution
  - Concepts/Lognormal+Distribution
  - Concepts/Pareto+Distribution
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:df648b8c942afe260c3a203ed83c831ee45905e4b8e6003184848a21d1561ac6
  sources:
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.3.2.1 gamma M(t) = (1 - theta t)^-alpha for t < 1/theta (any alpha > 0); A.2.4.1 Pareto moments only for k < alpha; A.4.1.1 lognormal moments exp(k mu + k^2 sigma^2/2) for all k; A.4.1.4 single-parameter Pareto moments k < alpha; PDF pp.10-14, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Frees et al., Loss Data Analytics (open text), ch.10 Insurance Portfolio Management (tails), 10.2.1: the lognormal has all positive moments yet no moment generating function, sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-073.md
---

Which of the following claim-severity distributions has a moment generating function $E\big[e^{tX}\big]$ that is finite for some $t > 0$?

- A) Pareto with $\alpha = 4$
- B) Lognormal with $\sigma = 0.5$
- C) Weibull with $\tau = 0.5$
- D) Gamma with $\alpha = 0.5$
- E) Single-parameter Pareto with $\alpha = 6$

## Explanation

The gamma's moment generating function is

$$
M_X(t) = (1 - \theta t)^{-\alpha}, \quad t < \frac{1}{\theta}
$$

for **every** shape $\alpha > 0$, including $\alpha = 0.5$: its density ends in the factor $e^{-x/\theta}$, which overpowers $e^{tX}$ whenever $t < 1/\theta$. The answer is **D**. (A gamma with shape below 1 has a decreasing hazard rate, yet its tail is still exponentially light — it approaches an exponential's.)

**Why not the others**

- **A** — a Pareto's survival function falls only like $x^{-\alpha}$, so $E[X^k]$ is infinite for $k \ge 4$ and $E[e^{tX}]$ is infinite for every $t > 0$.
- **B** — the lognormal has every moment, at any $\sigma$, but no moment generating function: its tail, though lighter than any Pareto's, is heavier than any exponential's. This is the case where the moment test and the MGF test disagree.
- **C** — a Weibull with $\tau < 1$ has survival function $e^{-(x/\theta)^{0.5}}$, which decays more slowly than $e^{-tx}$ for any $t > 0$, so the integral diverges even though every moment exists.
- **E** — the single-parameter Pareto is a shifted two-parameter Pareto with the same polynomial tail; moments exist only below order 6, and there is no moment generating function.
