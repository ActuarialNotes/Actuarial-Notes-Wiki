---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:55b84c5e948460833cd7df09efa0e8b0da1de5d77e5b75a9e24644a3280b0814
  sources:
    - "SOA, Tables for Exam C (Fall 2009), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; A.6.1.2 beta (a, b, theta), printed p.8 (PDF p.13), read with theta = 1"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Chapter 4 Beta Density p.168 (PDF p.176), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, 1.3.6.6.17 Beta Distribution (standard beta pdf, mean, standard deviation, skewness), fetched 2026-09-28, sha256:eaab2714d3753b95f94be3402dcc443911e5a19a90ef34aeddb05eb11c0165b0 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda366h.htm"
    - "SOA, Exam P Sample Solutions (Aug 2026 revision), Q565 (PDF p.157), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Kyle Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), 6.6 Order Statistics, The Uniform Distribution, fetched 2026-09-28, sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Beta.md
---

The **Beta Distribution** $X \sim \text{Beta}(\alpha, \beta)$ is a continuous distribution on $(0, 1)$ parameterized by shape parameters $\alpha > 0$ and $\beta > 0$. It is commonly used to model rates, proportions, and probabilities.

> $$f(x) = \frac{x^{\alpha - 1}(1-x)^{\beta - 1}}{B(\alpha,\, \beta)}$$
>
> $$0 < x < 1$$
>
> $$\text{where } B(\alpha, \beta) = \frac{\Gamma(\alpha)\,\Gamma(\beta)}{\Gamma(\alpha + \beta)}$$

- $E[X] = \alpha/(\alpha + \beta)$ and $\text{Var}(X) = \alpha\beta / [(\alpha+\beta)^2(\alpha+\beta+1)]$
- When $\alpha = \beta = 1$ it reduces to the continuous uniform distribution on $(0,1)$
- For **integer** $\alpha$ and $\beta$ the normalizing constant is a binomial coefficient, $1/B(\alpha,\beta) = (\alpha+\beta-1)\dbinom{\alpha+\beta-2}{\alpha-1}$, so the density is a plain polynomial and probabilities integrate directly — no special functions needed
- The distribution is skewed right when $\alpha < \beta$, left when $\alpha > \beta$, and symmetric when $\alpha = \beta$
- The $k$-th [[Order Statistics|order statistic]] of $n$ i.i.d. $\text{Uniform}(0,1)$ variables is exactly $\text{Beta}(k,\, n-k+1)$, which is where $E[X_{(k)}] = k/(n+1)$ comes from

![[Media/Beta_distribution_pdf.svg|500]]

![[Media/Figures/Beta.svg|340]]

> [!example]- Expected Loss Ratio from a Beta Model {Example}
> An insurer models its loss ratio $X \sim \text{Beta}(3, 2)$. Find the mean and variance of $X$.
>
> > [!answer]-
> > With $\alpha = 3$, $\beta = 2$:
> > $$E[X] = \frac{3}{3+2} = \frac{3}{5} = 0.60$$
> > $$\text{Var}(X) = \frac{3 \cdot 2}{(5)^2 (6)} = \frac{6}{150} = 0.04$$
> > The expected loss ratio is 60% with a standard deviation of $\sqrt{0.04} = 0.20$.

> [!example]- Probability the Loss Ratio Exceeds a Threshold {Example}
> With $X \sim \text{Beta}(3,2)$ modelling the loss ratio, find $P(X > 0.8)$.
>
> > [!answer]-
> > Both parameters are integers, so write out the density explicitly:
> > $$
> > \begin{align*}
> > B(3,2) &= \frac{\Gamma(3)\Gamma(2)}{\Gamma(5)} = \frac{2! \cdot 1!}{4!} = \frac{2}{24} = \frac{1}{12} \\
> > f(x) &= 12\,x^2(1-x), \quad 0 < x < 1
> > \end{align*}
> > $$
> > Integrate over the tail:
> > $$
> > \begin{align*}
> > P(X > 0.8) &= \int_{0.8}^{1} 12\left(x^2 - x^3\right) dx \\
> >            &= 12\left[\frac{x^3}{3} - \frac{x^4}{4}\right]_{0.8}^{1} \\
> >            &= 12\left[\left(\tfrac{1}{3} - \tfrac{1}{4}\right) - \left(0.17067 - 0.10240\right)\right] \\
> >            &= 12\left[0.08333 - 0.06827\right] \\
> >            &\approx 0.181
> > \end{align*}
> > $$
> > About an 18% chance the loss ratio exceeds 80%.

> [!example]- Beta as the Distribution of a Uniform Order Statistic {Example}
> Four claim-settlement delays are i.i.d. $\text{Uniform}(0,1)$ years. Find the expected value of the second-smallest delay.
>
> > [!answer]-
> > The $k$-th order statistic of $n$ i.i.d. uniforms is $\text{Beta}(k, n-k+1)$. With $k=2$, $n=4$ that is $\text{Beta}(2,3)$:
> > $$
> > \begin{align*}
> > E[X_{(2)}] &= \frac{\alpha}{\alpha + \beta} \\
> >            &= \frac{2}{2+3} \\
> >            &= 0.4
> > \end{align*}
> > $$
> > This matches the general uniform result $k/(n+1) = 2/5$ — the four delays split the year into five equal expected gaps.
