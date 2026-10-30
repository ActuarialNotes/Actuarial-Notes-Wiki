---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:e08f3e3fd1cde709fdc8079b14666ba039d87638b41cf050c452c434438416c4
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 memoryless, only continuous density with this property is the exponential, p.68 (PDF p.76); 5.2 continuous uniform density 1/(b-a) on [a,b] p.205 (PDF p.213), memoryless P(T > r+s | T > r) = P(T > s) p.206 (PDF p.214), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Exam P Sample Solutions (Aug 2026 revision), Q473 (PDF p.132), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.6.1.2 beta (a, b, theta) with a = b = 1, uniform on (0, theta): E = theta/2, E[X^2] = theta^2/3, printed p.8 (PDF p.13), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Siegrist, 5.21 The Uniform Distribution on an Interval, Related Distributions: Y=c+dX (d>0) uniform with location c+da and scale dw (HTML fetched 2026-10-30), sha256:8e9ed89d801bc2780eab168757688e254a9484275e8d068c1fd000bf625c8558 — https://www.randomservices.org/random/special/UniformContinuous.html"
    - "Siegrist, 5.20 General Uniform Distributions: P(X in A)=lambda(A)/lambda(S); (X,Y) uniform on S x T iff X, Y independent and each uniform (HTML fetched 2026-10-30), sha256:df0f3d671bbd4ee0a72d98431cfd36e142ce833eb5c78d96dcfcb9c6650d7575 — https://www.randomservices.org/random/special/Uniform.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Uniform Continuous Distribution.md
---

The **Continuous Uniform Distribution** $X \sim \text{Unif}(a, b)$ assigns equal probability density to every point in the interval $(a, b)$, making it the continuous analogue of the discrete uniform. It is commonly used as a simple loss model when all outcomes in a range are equally plausible.

> $$f(x) = \frac{1}{b - a}, \quad a < x < b$$

- $E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$
- Conditional distributions on sub-intervals are also uniform: given $X > d$, $X$ is uniform on $(d, b)$
- The uniform is **not** memoryless — the exponential is the only continuous density that is. For $\text{Unif}(0, 10)$, $P(X > 8 \mid X > 5) = 2/5$, but $P(X > 3) = 7/10$
- **Linear functions stay uniform.** If $X \sim \text{Unif}(a, b)$, $c > 0$ and $k$ is any constant, then $cX + k \sim \text{Unif}(ca + k,\ cb + k)$. In particular, dividing a uniform on $[0, b]$ by a positive constant $c$ gives a uniform on $[0, b/c]$: a loss uniform on $[0, 500]$, measured in hundreds, is uniform on $[0, 5]$
- **Two independent uniforms: probability is area.** If $X$ and $Y$ are independent and each $\text{Unif}(0, 1)$, the pair is uniform on the unit square with joint density $f(x, y) = 1$, so $P\bigl((X, Y) \in R\bigr)$ is simply the area of the part of $R$ inside the square. For independent uniforms on any rectangle, divide the area of $R$ within it by the rectangle's area. For instance, $P(Y > 2X)$ is the triangle with corners $(0, 0)$, $(0, 1)$ and $(1/2, 1)$, area $1/4$

![[Media/Figures/Uniform_Continuous_Distribution.svg|340]]

> [!example]- Expected Payment with Uniform Losses and a Deductible {Example}
> Ground-up losses $X \sim \text{Unif}(0, 1000)$. An ordinary deductible of $d = 300$ applies. Find $E[(X - 300)_+]$.
>
> > [!answer]-
> > Since losses are uniform, those above 300 are distributed $\text{Unif}(300, 1000)$. The probability of exceeding the deductible is $P(X > 300) = 700/1000 = 0.7$, and given $X > 300$ the expected excess is $700/2 = 350$. Therefore:
> > $$E[(X-300)_+] = P(X > 300) \times E[X - 300 \mid X > 300] = 0.7 \times 350 = 245$$
