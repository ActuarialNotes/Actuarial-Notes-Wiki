---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:5a220c4cccd569e2f7090bfa62c47edafadd0b5c4783d8043ecdeabbd88cf2f2
  sources:
    - "Sigman, 'Acceptance-Rejection Method', Columbia IEOR 4703 notes (2007), PDF pp.1-2: algorithm (generate Y ~ g, U independent, accept if U <= f(Y)/(c g(Y))), sup f/g <= c, number of iterations N geometric with p = 1/c and E(N) = c, proof that an accepted value has distribution F, c should be minimal and close to 1; PDF p.4: uniform g gives c = sup f (beta example), gamma by exponential g with 1/lambda the gamma mean, discrete case accept if U <= p(Y)/(c q(Y)) with sup p(k)/q(k) <= c, sha256:0943071ab4e8a4db52e39cddce042690a2cb2944ad862423a39aa81e68000648 — http://www.columbia.edu/~ks20/4703-Sigman/4703-07-Notes-ARM.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Ross Sections 11.1, 11.2.1 and 11.2.2 assigned (Domain A), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rejection Method.md
---

The **Rejection Method** is a method of simulating a random variable $X$ with density $f$ from candidates drawn from another density $g$ that is easier to simulate, accepting each candidate with a probability that depends on the ratio $f/g$. The constant $c$ in the method must satisfy $f(x) \le c\,g(x)$ for every $x$, and the smallest such constant is

> $$c = \max_x \frac{f(x)}{g(x)}$$

- The maximum is over the values of $x$ where $f(x) > 0$.

The method repeats the following steps until a candidate is accepted:

1. Generate a candidate $Y$ with density $g$.
2. Generate a random number $U$, uniform on $(0, 1)$ and independent of $Y$.
3. If $U \le f(Y)/(c\,g(Y))$, accept the candidate and set $X = Y$. Otherwise return to step 1.

The candidate is accepted when

> $$U \le \frac{f(Y)}{c\,g(Y)}$$

The choice of $c$ makes this ratio at most 1, so it is a probability. An accepted value has density $f$. To find the maximum of $f/g$, set its derivative equal to zero, solve for the critical point, and evaluate the ratio there.

> [!example]- Claim sizes, in thousands, have density $f(x) = x e^{-x}$ for $x > 0$. Candidates are drawn from the exponential density with mean 2, $g(x) = \frac12 e^{-x/2}$. What is the smallest valid $c$, and is the candidate $Y = 1.8326$ accepted with the random number $u = 0.95$? {Example}
> - The ratio is $\frac{f(x)}{g(x)} = 2x e^{-x/2}$.
> - Its derivative, $(2 - x)e^{-x/2}$, is zero at $x = 2$, so $c = 2(2)e^{-1} = 4/e = 1.4715$.
> - The acceptance threshold is $\frac{f(Y)}{c\,g(Y)} = \frac{Y}{2}\,e^{1 - Y/2}$, which is 0.9963 at $Y = 1.8326$.
> - Since $0.95 \le 0.9963$, the candidate is accepted, and the simulated claim size is 1.8326 thousand.

## A uniform candidate density

When the candidates are uniform on $(0, 1)$, $g(x) = 1$, so the ratio $f/g$ is $f$ itself, and the smallest valid constant is the maximum of the density:

> $$c = \max_{0 < x < 1} f(x)$$

The candidate is then accepted when $U \le f(Y)/c$.

> [!example]- A random variable has density $f(x) = 20x(1 - x)^3$ for $0 < x < 1$ and is simulated with uniform candidates. What is the smallest valid $c$, and which of the pairs $(Y, U) = (0.30, 0.80)$ and $(0.70, 0.20)$ are accepted? {Example}
> - The derivative $f'(x) = 20(1 - x)^2(1 - 4x)$ is zero at $x = \frac14$.
> - The smallest valid constant is
>
> $$
> \begin{aligned}
> c &= f\left(\tfrac14\right) \\
> &= 20\left(\tfrac14\right)\left(\tfrac34\right)^3 \\
> &= \tfrac{135}{64} \\
> &= 2.109
> \end{aligned}
> $$
>
> - The acceptance threshold is $\frac{f(Y)}{c} = \frac{256}{27}\,Y(1 - Y)^3$.
> - At $Y = 0.30$ the threshold is 0.9756. Since $0.80 \le 0.9756$, the candidate is accepted, and $X = 0.30$.
> - At $Y = 0.70$ the threshold is 0.1792. Since $0.20 > 0.1792$, the candidate is rejected.

## Number of iterations

Each iteration accepts its candidate with probability $1/c$, independently of the other iterations. The number of iterations $N$ needed to produce one value therefore has a [[Geometric Distribution|geometric distribution]] with success probability $1/c$, and its mean is

> $$E[N] = c$$

The smallest valid constant gives the fewest iterations on average. It is always at least 1, and it is closer to 1 when $g$ is closer to $f$.

> [!example]- For the density $f(x) = 20x(1 - x)^3$ with uniform candidates, what is the probability that an iteration is accepted, and how many iterations are needed on average? {Example}
> - With $c = \frac{135}{64}$, an iteration is accepted with probability $\frac{64}{135} = 0.474$.
> - On average $c = 2.109$ iterations are needed for each simulated value.

> [!trap] Using the maximum of $f$ when $g$ is not uniform
> The constant is the maximum of $f/g$, not of $f$. For $f(x) = x e^{-x}$ with exponential candidates of mean 2, the maximum of $f$ is $e^{-1} = 0.368$, which would make the acceptance ratio greater than 1. The correct constant is $4/e = 1.4715$.
