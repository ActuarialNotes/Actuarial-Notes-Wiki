---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:dd7516c28ca3d5a6b54d9937405d7436d1a4006116fc49635fd60076ea7cd16e
  sources:
    - "Siegrist, Random (randomservices.org), Random Samples > Order Statistics (k-th smallest value; F_k(x)=sum_{j=k}^n C(n,j)F^j(1-F)^{n-j}; f_k(x)=n!/((k-1)!(n-k)!) F^{k-1}(1-F)^{n-k} f; standard uniform X_(k) ~ beta(k, n-k+1), E(X_(k)) = a + h k/(n+1)), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q451 solution (first order statistic density g_1(y) = 3 f(y)[1-F(y)]^2), PDF p.126, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes 3a-3f, PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Order Statistics.md
---

**Order Statistics** are the values of a random sample arranged in non-decreasing order. Given a sample $X_1, X_2, \ldots, X_n$, the $k$-th order statistic $X_{(k)}$ is the $k$-th smallest value. The minimum is $X_{(1)}$ and the maximum is $X_{(n)}$.

> $$F_{X_{(k)}}(x) = \sum_{j=k}^{n} \binom{n}{j} [F(x)]^j [1 - F(x)]^{n-j}$$

> $$f_{X_{(k)}}(x) = \frac{n!}{(k-1)!\,(n-k)!} [F(x)]^{k-1} [1 - F(x)]^{n-k} f(x)$$

- The formulas above apply when the observations are i.i.d. with common CDF $F(x)$ and PDF $f(x)$
- For the $\text{Uniform}(0,1)$ distribution: $E[X_{(k)}] = \dfrac{k}{n+1}$

![[Media/Figures/Order_Statistics.svg|340]]

> [!example]- Expected Maximum of Three Uniform Observations {Example}
> Three independent observations are drawn from a $\text{Uniform}(0,1)$ distribution. What is the expected value of the maximum?
>
> > [!answer]-
> > The maximum is the $k = 3$ order statistic from a sample of $n = 3$. For i.i.d. $\text{Uniform}(0,1)$ random variables:
> > $$E[X_{(3)}] = \frac{3}{3+1} = \frac{3}{4} = 0.75$$
