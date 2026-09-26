---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e1b9ab828f53dc3efc5d73702c893a86301f6236802dd43f6a4b5d29d99dcabc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Region of Integration.md
---

The **Region of Integration** $R$ is the set of points $(x, y)$ over which a double integral of a [[Joint Probability Density Function|joint density]] is taken: the event $A$ whose probability is wanted, cut down to the support where $f(x,y) > 0$. Turning $R$ into limits — constant outer limits, inner limits that may depend on the outer variable — is most of the work in a continuous multivariate Exam P problem.

> $$P\big((X,Y) \in A\big) = \iint_{R} f(x,y)\,dA$$

> $$R = A \cap \{(x,y) : f(x,y) > 0\}$$

> $$\iint_R f\,dA = \int_{a}^{b}\!\!\int_{g_1(x)}^{g_2(x)} f(x,y)\,dy\,dx$$

- **Sketch first.** Shade the support, draw the event's boundary (such as the line $x + y = s$ or $y = 2x$) and mark where they cross. Integrating over $A$ while ignoring the support — or the reverse — is the most common error.
- **Vertical slices** (outer $x$): $a$ and $b$ are the smallest and largest $x$ in $R$; $g_1(x)$ and $g_2(x)$ are the lower and upper edges a vertical line crosses. **Horizontal slices** swap the roles. Choose the order in which one formula describes every slice; if an edge changes formula part-way, split $R$ there and add the pieces.
- **Complement.** When $R$ is awkward, $P(A) = 1 - P(A^c)$ and the complement is often a single slice.
- **Constant density** (independent uniforms): no integral needed. $P(A) = \text{area}(R)/\text{area}(\text{support})$.
- Standard shapes: $X < Y$ lies above the diagonal; $X + Y \le s$ below the anti-diagonal — the CDF method for a sum, see [[Transformations of Random Variables]]; for non-negative variables $\max(X,Y) \le t$ is the square $[0,t]^2$ and $\min(X,Y) > t$ the quadrant beyond $(t, t)$. The [[Joint Cumulative Distribution Function|joint CDF]] $F(x,y)$ integrates over the quadrant below and left of $(x,y)$.
- The same region-setting drives normalising constants, [[Marginal Probability Function|marginals]] and expectations of a [[Continuous Random Variable|continuous]] pair. The [[Discrete Random Variable|discrete]] analogue is choosing which cells of the joint table to add.

> [!example]- Two Report Times and a Split Region {Example}
> Two claims are reported at independent exponential times with mean 1 year. With $X$ the earlier and $Y$ the later report time, $f(x,y) = 2e^{-x-y}$ for $0 < x < y$. Find $P(X + Y < 2)$.
>
> > [!answer]-
> > The support is above the diagonal $y = x$; the event is below $y = 2 - x$. They cross at $(1, 1)$, so $R$ is the triangle with corners $(0,0)$, $(1,1)$ and $(0,2)$.
> >
> > With $x$ outermost, every vertical slice runs from $y = x$ up to $y = 2 - x$ — one integral. With $y$ outermost the right-hand edge changes at $y = 1$ (it is $x = y$ below, $x = 2 - y$ above), so that order needs two integrals. Take $x$ outside:
> > $$
> > \begin{align*}
> > P &= \int_0^1\!\!\int_x^{2-x} 2e^{-x}e^{-y}\,dy\,dx \\
> >   &= \int_0^1 2e^{-x}\left(e^{-x} - e^{-(2-x)}\right)dx \\
> >   &= \int_0^1 \left(2e^{-2x} - 2e^{-2}\right)dx \\
> >   &= \left(1 - e^{-2}\right) - 2e^{-2} \\
> >   &= 1 - 3e^{-2} \\
> >   &= 0.594
> > \end{align*}
> > $$
> > Check: $X + Y$ is just the sum of the two report times, a [[Gamma]]$(2, 1)$, and $P(\text{Gamma}(2,1) < 2) = 1 - e^{-2}(1 + 2)$. The region was right.

> [!example]- Aggregate Cover on Two Uniform Losses {Example}
> Losses $X$ and $Y$ on two policies are independent and uniform on $(0, 10)$, in \$000s. An aggregate cover responds when $X + Y > 12$. Find the probability it responds.
>
> > [!answer]-
> > The density is the constant $\tfrac{1}{100}$ on the square, so the answer is an area ratio. The region above $x + y = 12$ inside the square is a right triangle with corners $(2,10)$, $(10,10)$ and $(10,2)$ — legs of 8, area 32. As an integral:
> > $$
> > \begin{align*}
> > P(X + Y > 12) &= \int_2^{10}\!\!\int_{12-x}^{10} \frac{1}{100}\,dy\,dx \\
> >               &= \int_2^{10} \frac{x - 2}{100}\,dx \\
> >               &= \frac{32}{100} \\
> >               &= 0.32
> > \end{align*}
> > $$
> > The outer limit starts at $x = 2$, not 0: below it even $y = 10$ cannot reach 12. That clipping by the support is exactly what the sketch is for.
