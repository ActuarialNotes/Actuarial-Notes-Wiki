---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:86ecab683e2245d4421a21481b1737ad774a577fe29cf58d8ae16aef4dbf6f65
  sources:
    - "Siegrist, Random (randomservices.org), Random Samples > Order Statistics (F_k and f_k for an i.i.d. sample; joint pdf f_jk of two order statistics and f_1n of min and max; standard uniform X_(k) beta(k, n-k+1)), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "Siegrist, Random (randomservices.org), Distributions > Transformations > Minimum and Maximum (independent X_i with distribution functions F_i: max has F_1...F_n, min has 1 - product of (1 - F_i)), sha256:827bba81a7f85933f2ba982a09155f5277f5ec19838e2ffe70ac0563a56aca69 — https://www.randomservices.org/random/dist/Transformations.html"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q249 (min of two independent exponentials by multiplying survival functions, PDF pp.73-74), Q497 (min of three i.i.d. losses, 1 - [1 - F(x)]^3, PDF p.137), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Order Statistics.md
---

**Order Statistics** are the values of a random sample arranged in non-decreasing order. Given a sample $X_1, X_2, \ldots, X_n$, the $k$-th order statistic $X_{(k)}$ is the $k$-th smallest value. The minimum is $X_{(1)}$ and the maximum is $X_{(n)}$.

> $$F_{X_{(k)}}(x) = \sum_{j=k}^{n} \binom{n}{j} [F(x)]^j [1 - F(x)]^{n-j}$$

> $$f_{X_{(k)}}(x) = \frac{n!}{(k-1)!\,(n-k)!} [F(x)]^{k-1} [1 - F(x)]^{n-k} f(x)$$

- The formulas above apply when the observations are i.i.d. with common CDF $F(x)$ and PDF $f(x)$
- For the $\text{Uniform}(0,1)$ distribution: $E[X_{(k)}] = \dfrac{k}{n+1}$
- For **independent** $X_1, \ldots, X_n$ that need not share a distribution ($X_i$ with CDF $F_i$), the maximum and minimum still have product forms. They use only distribution functions, so they hold for discrete and continuous variables alike:

> $$P\bigl(X_{(n)} \le x\bigr) = F_1(x)\,F_2(x)\cdots F_n(x)$$

> $$P\bigl(X_{(1)} > x\bigr) = \bigl[1 - F_1(x)\bigr]\bigl[1 - F_2(x)\bigr]\cdots\bigl[1 - F_n(x)\bigr]$$

- The **joint** density of two order statistics $X_{(j)} < X_{(k)}$ ($j < k$) of an i.i.d. continuous sample counts the observations below, between and above them; for the minimum and maximum ($j = 1$, $k = n$) it reduces to $f_{1,n}(x,y) = n(n-1)[F(y) - F(x)]^{n-2} f(x) f(y)$:

> $$f_{j,k}(x,y) = \frac{n!}{(j-1)!\,(k-j-1)!\,(n-k)!} [F(x)]^{j-1} [F(y) - F(x)]^{k-j-1} [1 - F(y)]^{n-k} f(x)\, f(y), \quad x < y$$

![[Media/Figures/Order_Statistics.svg|340]]

> [!example]- Expected Maximum of Three Uniform Observations {Example}
> Three independent observations are drawn from a $\text{Uniform}(0,1)$ distribution. What is the expected value of the maximum?
>
> > [!answer]-
> > The maximum is the $k = 3$ order statistic from a sample of $n = 3$. For i.i.d. $\text{Uniform}(0,1)$ random variables:
> > $$E[X_{(3)}] = \frac{3}{3+1} = \frac{3}{4} = 0.75$$

> [!example]- First Failure of Two Different Components {Example}
> A system fails as soon as either of two independent components fails. Their lifetimes are exponential with means 10 and 15. Find the distribution and mean of the system's lifetime.
>
> > [!answer]-
> > The system lifetime is the minimum $X_{(1)}$ of two independent but **not** identically distributed lifetimes, so multiply the survival functions:
> > $$
> > \begin{align*}
> > P\bigl(X_{(1)} > x\bigr) &= e^{-x/10}\, e^{-x/15} \\
> >                          &= e^{-x/6}
> > \end{align*}
> > $$
> > That is the survival function of an exponential with mean 6, so $E[X_{(1)}] = 6$ — shorter than either component's mean.

> [!example]- Joint Distribution of the Low and High Die {Example}
> Two fair dice are rolled independently. Let $L$ be the smaller number and $H$ the larger. Find the joint probability function of $(L, H)$ and $P(H - L \ge 4)$.
>
> > [!answer]-
> > Of the 36 equally likely ordered outcomes, $\{L = l, H = h\}$ with $l < h$ is the two outcomes $(l, h)$ and $(h, l)$, while $l = h$ is the single outcome $(l, l)$:
> > $$p_{L,H}(l, h) = \begin{cases} 2/36, & l < h \\ 1/36, & l = h \end{cases}$$
> > The pairs with $h - l \ge 4$ are $(1,5)$, $(1,6)$ and $(2,6)$:
> > $$P(H - L \ge 4) = 3 \cdot \frac{2}{36} = \frac{1}{6}$$
