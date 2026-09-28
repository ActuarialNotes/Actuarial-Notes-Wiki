---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:c09509fb975861c8e04ffe8462b4e1289b74f8134ef33d721ee08f7abb9d3b4b
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 9.4 Central Limit Theorem (printed p.343, PDF p.351), Thm 9.6 Central Limit Theorem (printed p.357, PDF p.365), Thm 6.9 (printed p.260, PDF p.268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q65 (PDF p.22), Q86 (PDF pp.26-27), Q459 (PDF p.128), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Exam P normal distribution table (rev. 4/29/21), row z=0.9 (column .04 = 0.8264), sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 3 (Multivariate Random Variables) learning outcomes g-i, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Central Limit Theorem.md
---

The **Central Limit Theorem** (CLT) states that the standardized sum of independent and identically distributed random variables with mean $\mu$ and finite variance $\sigma^2$ converges in distribution to a standard normal as $n \to \infty$.

> $$\frac{S_n - n\mu}{\sigma\sqrt{n}} \xrightarrow{d} N(0,1) \quad \text{as } n \to \infty$$
>
> $$\text{where } S_n = X_1 + \cdots + X_n$$

- For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution

![[Media/Figures/Central_Limit_Theorem.svg|340]]

> [!example]- Approximating Total Claims Across 200 Policies {Example}
> An insurer has 200 independent policies. Each policy's annual claim has mean \$500 and standard deviation \$300. Approximate $P(S_{200} > 104{,}000)$.
>
> > [!answer]-
> > By the CLT, $S_{200} \approx N(n\mu,\, n\sigma^2)$:
> > $$\mu_S = 200 \times 500 = 100{,}000, \qquad \sigma_S = \sqrt{200 \times 300^2} = 300\sqrt{200} \approx 4{,}243$$
> > Standardising:
> > $$P(S_{200} > 104{,}000) = P\!\left(Z > \frac{104{,}000 - 100{,}000}{4{,}243}\right) = P(Z > 0.94) \approx 0.1736$$
