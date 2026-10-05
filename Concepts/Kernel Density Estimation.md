---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:61a489fba7e3716a8ccef8efc1d91121ef56bb28bfbbf47008ddcb2fe2e11de8
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch 4 'Model Selection and Estimation', §4.1.1.4 Density Estimators: eq. (4.2) f_n(x) = (1/2nb) sum I(x-b < X_i <= x+b), eq. (4.3) f_n(x) = (1/nb) sum w((x-X_i)/b), Table 4.1 kernels (uniform 1/2 I(-1<x<=1), triangle (1-|x|) I(|x|<=1), Gaussian phi), kernel CDF estimator F~_n(x) = (1/n) sum W((x-X_i)/b) with uniform W(y) = (y+1)/2 on [-1,1), bandwidth trade-off (smaller b more volatile, larger b smoother), Example 4.1.5 triangular kernel, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "CAS Exam MAS-I Spring 2019, Q20 — official exam paper (scan), PDF p.24; Final Answer Key PDF p.50 (Q20 = D), sha256:02debe7c986ee38d3f484b277d0dc4a08ec424d0bb3b868b4890e4edb9312274 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-19.pdf"
    - "Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents p.x (PDF p.12): §11.1.2 Kernel estimation of probability density function p.306, sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Tse Section 11.1 assigned (Domain B), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Kernel Density Estimation.md
---

**Kernel Density Estimation** is a nonparametric estimate of a [[Probability Density Function (PDF)|density]] from a sample $x_1, \ldots, x_n$: each observation is replaced by a small density (the **kernel**) centred on it, with spread set by the **bandwidth** $b > 0$, and the $n$ kernels are averaged.

> $$\hat{f}(x) = \frac{1}{nb}\sum_{i=1}^{n} w\!\left(\frac{x - x_i}{b}\right)$$

> $$\hat{F}(x) = \frac{1}{n}\sum_{i=1}^{n} W\!\left(\frac{x - x_i}{b}\right)$$

- $w$ is a density centred at 0 and $W$ its [[Cumulative Distribution Function (CDF)|CDF]]. Equivalently, the kernel centred at an observation $y$ is $k_y(x) = \frac{1}{b}\,w\!\left(\frac{x - y}{b}\right)$, and $\hat{f}(x)$ is the average of $k_{x_1}(x), \ldots, k_{x_n}(x)$.
- **Uniform (rectangular) kernel**, $w(u) = \frac{1}{2}$ on $-1 \leq u \leq 1$: each observation is spread evenly over $[y - b,\ y + b]$ at height $\frac{1}{2b}$, so $\hat{f}(x)$ is the number of observations within $b$ of $x$, divided by $2bn$. Its CDF rises linearly, $W(u) = \frac{u + 1}{2}$ on $[-1, 1]$.
- **Triangular kernel**, $w(u) = 1 - |u|$ on $-1 \leq u \leq 1$: a tent of height $\frac{1}{b}$ over $[y - b,\ y + b]$, so $k_y(x) = \frac{b - |x - y|}{b^2}$. Its CDF is $W(u) = \frac{(1 + u)^2}{2}$ for $-1 \leq u \leq 0$ and $1 - \frac{(1 - u)^2}{2}$ for $0 \leq u \leq 1$.
- **Gaussian kernel**, $w = \phi$, the standard [[Normal Distribution|normal]] density: each kernel is a normal density with mean $x_i$ and standard deviation $b$, and $W = \Phi$. Unlike the other two, it gives every observation some weight at every $x$.
- **An observation exactly $b$ from $x$:** for the rectangular kernel the edge matters. The CAS answer key to MAS-I Spring 2019 Q20 counts such an observation, treating the window as the closed interval $[y - b,\ y + b]$; some texts write the uniform kernel on a half-open interval. The triangular kernel is 0 at the edge, so there the question does not arise.
- **Choosing $b$:** a larger bandwidth averages over more data and gives a smoother curve that can miss local features; a smaller one follows the data closely but is more volatile — a [[Bias-Variance Tradeoff|bias–variance tradeoff]]. The rectangular kernel is a [[Histogram]] whose bin of width $2b$ moves with $x$.

> [!example]- Smoothing a Small Loss Sample Three Ways {Example}
> Five losses are observed: $300,\ 450,\ 500,\ 700,\ 800$. With bandwidth $b = 200$, estimate the density at $x = 600$ using (a) a rectangular kernel, (b) a triangular kernel and (c) a Gaussian kernel.
>
> > [!answer]-
> > The window around 600 is $[400, 800]$. It holds 450, 500 and 700, and 800 sits exactly on its edge; 300 is outside.
> >
> > (a) Rectangular — counting the edge observation 800 (closed window), four observations each contribute $\frac{1}{2b} = \frac{1}{400}$:
> >
> > $$
> > \begin{align*}
> > \hat{f}(600) &= \frac{1}{5}\left(\frac{4}{400}\right) \\
> > &= 0.0020
> > \end{align*}
> > $$
> >
> > (b) Triangular — the distances are 150, 100, 100 and 200, so the numerators $b - |x - x_i|$ are $50,\ 100,\ 100,\ 0$, each over $b^2 = 40{,}000$:
> >
> > $$
> > \begin{align*}
> > \hat{f}(600) &= \frac{1}{5}\left(\frac{250}{40{,}000}\right) \\
> > &= 0.00125
> > \end{align*}
> > $$
> >
> > (c) Gaussian — the standardised distances $u = (600 - x_i)/200$ are $1.5,\ 0.75,\ 0.5,\ -0.5,\ -1.0$, with $\phi(u) = 0.1295,\ 0.3011,\ 0.3521,\ 0.3521,\ 0.2420$:
> >
> > $$
> > \begin{align*}
> > \hat{f}(600) &= \frac{1.3768}{5 \times 200} \\
> > &= 0.00138
> > \end{align*}
> > $$
> >
> > The rectangular estimate is the largest because it gives the edge observation full weight, where the triangular kernel gives it none.

> [!example]- Kernel-Smoothed CDF of Claim Sizes {Example}
> Claim sizes (in thousands) are $2,\ 5,\ 6,\ 9,\ 15$. With bandwidth $b = 2$, estimate $F(6.5)$ using (a) a uniform kernel and (b) a triangular kernel.
>
> > [!answer]-
> > The standardised distances $u = (6.5 - x_i)/2$ are $2.25,\ 0.75,\ 0.25,\ -1.25,\ -4.25$. An observation with $u \geq 1$ lies wholly below 6.5 and contributes 1; one with $u \leq -1$ contributes 0.
> >
> > (a) Uniform, $W(u) = \frac{u + 1}{2}$: the contributions are $1,\ 0.875,\ 0.625,\ 0,\ 0$.
> >
> > $$
> > \begin{align*}
> > \hat{F}(6.5) &= \frac{1 + 0.875 + 0.625}{5} \\
> > &= 0.5000
> > \end{align*}
> > $$
> >
> > (b) Triangular, $W(u) = 1 - \frac{(1 - u)^2}{2}$ for $0 \leq u \leq 1$: the claims at 5 and 6 contribute $1 - \frac{0.25^2}{2} = 0.96875$ and $1 - \frac{0.75^2}{2} = 0.71875$.
> >
> > $$
> > \begin{align*}
> > \hat{F}(6.5) &= \frac{1 + 0.96875 + 0.71875}{5} \\
> > &= 0.5375
> > \end{align*}
> > $$
> >
> > The empirical CDF at 6.5 is $3/5 = 0.6$. Both smoothed estimates are lower because they spread part of the claims at 5 and 6 above 6.5 — the triangular kernel less of it, since it keeps more of each claim's weight close to the claim.
