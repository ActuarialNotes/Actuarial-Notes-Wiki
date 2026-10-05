---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:3a81f4e3a3689c91292f94eb0dbd9b4c43fdb4d7baf96ac80edb7589253ff043
  sources:
    - "Sigman, 'Acceptance-Rejection Method', Columbia IEOR 4703 notes (2007), PDF pp.1-2: algorithm (generate Y ~ g, U independent, accept if U <= f(Y)/(c g(Y))), sup f/g <= c, number of iterations N geometric with p = 1/c and E(N) = c, proof that an accepted value has distribution F, c should be minimal and close to 1; PDF p.4: uniform g gives c = sup f (beta example), gamma by exponential g with 1/lambda the gamma mean, discrete case accept if U <= p(Y)/(c q(Y)) with sup p(k)/q(k) <= c, sha256:0943071ab4e8a4db52e39cddce042690a2cb2944ad862423a39aa81e68000648 — http://www.columbia.edu/~ks20/4703-Sigman/4703-07-Notes-ARM.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Ross Sections 11.1, 11.2.1 and 11.2.2 assigned (Domain A), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rejection Method.md
---

The **Rejection Method** (acceptance–rejection method) simulates a draw from a density $f$ that is hard to invert by drawing candidates $Y$ from an easier density $g$ and accepting each candidate with probability $f(Y)/\bigl(c\,g(Y)\bigr)$, where the constant $c$ bounds the ratio $f/g$.

> $$c \geq \max_x \frac{f(x)}{g(x)}$$
>
> $$\text{accept } X = Y \text{ if } U \leq \frac{f(Y)}{c\,g(Y)}$$

- **The algorithm:** (1) generate $Y$ from $g$; (2) generate $U$ from a [[Uniform Continuous Distribution|Uniform]]$(0,1)$ distribution, independent of $Y$; (3) if $U \leq f(Y)/\bigl(c\,g(Y)\bigr)$, accept and set $X = Y$, otherwise return to step 1. An accepted value has density exactly $f$.
- **Efficiency:** each pass accepts with probability $1/c$, so the number of passes $N$ needed for one $X$ is [[Geometric Distribution|geometric]] with success probability $1/c$, and $E[N] = c$. The smallest valid constant, $c = \max_x f(x)/g(x)$, is therefore the best one; it is always at least 1, and the closer $g$ is to $f$, the closer $c$ is to 1.
- **With $g$ uniform on $(0, 1)$:** $g(x) = 1$, so $c$ is the maximum of the density, $c = \max_x f(x)$, found by setting $f'(x) = 0$. The acceptance test is $U \leq f(Y)/c$.
- **When to use it:** when $F^{-1}$ has no closed form, so the [[Inversion Method]] is unavailable for $f$ itself; the candidates $Y$ are usually generated from $g$ by inversion.
- **Discrete case:** identical, with probability mass functions in place of densities: accept $Y$ if $U \leq p(Y)/\bigl(c\,q(Y)\bigr)$, where $c \geq \max_k p(k)/q(k)$.

> [!example]- Rejection Sampling a Beta Loss Ratio {Example}
> The proportion $X$ of a policy's premium paid out in losses has density $f(x) = 20x(1 - x)^3$ for $0 < x < 1$. It is simulated by the rejection method with $g(x) = 1$ on $(0, 1)$.
>
> (a) Find the smallest valid $c$, the probability that a pass is accepted, and the expected number of passes per simulated value.
>
> (b) Two passes produce the pairs $(Y, U) = (0.30,\ 0.80)$ and $(0.70,\ 0.20)$. Which candidates are accepted?
>
> > [!answer]-
> > (a) Maximise $f$: $f'(x) = 20(1-x)^2(1 - 4x) = 0$ gives $x = \frac{1}{4}$, so
> >
> > $$
> > \begin{align*}
> > c &= f\!\left(\tfrac{1}{4}\right) \\
> > &= 20\left(\tfrac{1}{4}\right)\left(\tfrac{3}{4}\right)^3 \\
> > &= \tfrac{135}{64} \\
> > &\approx 2.109
> > \end{align*}
> > $$
> >
> > Each pass is accepted with probability $1/c = 64/135 \approx 0.474$, and on average $c \approx 2.11$ passes are needed per value.
> >
> > (b) The acceptance test is $U \leq f(Y)/c = \frac{256}{27}\,Y(1 - Y)^3$.
> >
> > - $Y = 0.30$: $\frac{256}{27}(0.30)(0.70)^3 = 0.9756$, and $0.80 \leq 0.9756$, so it is **accepted**: $X = 0.30$.
> > - $Y = 0.70$: $\frac{256}{27}(0.70)(0.30)^3 = 0.1792$, and $0.20 > 0.1792$, so it is **rejected**.

> [!example]- Simulating a Gamma Severity from an Exponential {Example}
> Claim sizes (in thousands) have the gamma density $f(x) = x e^{-x}$, $x > 0$. Candidates are drawn from the exponential density with mean 2, $g(x) = \frac{1}{2}e^{-x/2}$, by inversion.
>
> (a) Find the smallest valid $c$ and the expected number of passes per simulated claim.
>
> (b) A pass draws $u_1 = 0.60$ for the candidate and $u_2 = 0.95$ for the test. What is the result?
>
> > [!answer]-
> > (a) The ratio is $f(x)/g(x) = 2x e^{-x/2}$. Its derivative $(2 - x)e^{-x/2}$ is zero at $x = 2$, so
> >
> > $$
> > \begin{align*}
> > c &= 2(2)e^{-1} \\
> > &= 4/e \\
> > &\approx 1.4715
> > \end{align*}
> > $$
> >
> > On average $1.47$ passes are needed per claim (acceptance probability $e/4 \approx 0.680$).
> >
> > (b) By inversion, $Y = -2\ln(1 - 0.60) = 1.8326$. The acceptance threshold is
> >
> > $$
> > \begin{align*}
> > \frac{f(Y)}{c\,g(Y)} &= \frac{Y}{2}\,e^{1 - Y/2} \\
> > &= 0.9163\,e^{0.0837} \\
> > &= 0.9963
> > \end{align*}
> > $$
> >
> > Since $0.95 \leq 0.9963$, the candidate is accepted: the simulated claim is $1.8326$, or about \$1,833.
