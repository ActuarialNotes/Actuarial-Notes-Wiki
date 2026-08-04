A **Joint Probability Density Function** $f(x,y)$ describes the [[Multivariate Distribution]] of two continuous random variables. Probability is *volume* under the surface $f$: to find $P((X,Y) \in A)$, integrate $f$ over the region $A$.

> $$P\bigl((X,Y) \in A\bigr) = \iint_A f(x,y)\,dA$$

> $$f_X(x) = \int f(x,y)\,dy$$

> $$f_{Y \mid X}(y \mid x) = \frac{f(x,y)}{f_X(x)}$$

- A valid joint density satisfies $f(x,y) \geq 0$ and integrates to 1 over its support. Setting that double integral equal to 1 is how an unknown constant $c$ is found.
- The [[Marginal Probability Function|marginal]] $f_X(x)$ integrates $y$ **out** — the limits on that inner integral depend on $x$ whenever the support is not a rectangle. The marginal is a function of $x$ alone; if $y$ survives, the limits were wrong.
- $X$ and $Y$ are [[Independent Random Variables|independent]] **only if** $f(x,y) = f_X(x)f_Y(y)$ *and* the support is a rectangle. A triangular support such as $0 < x < y < 1$ forces dependence no matter how the formula factors, because the range of $Y$ depends on $x$.
- $E[g(X,Y)] = \iint g(x,y) f(x,y)\,dx\,dy$ — see [[Moments for Joint Distributions]] and [[Covariance]].

## Setting up the limits

The integrand is rarely the hard part; the **region** is. Work in this order:

1. **Sketch the support.** Shade the set of $(x,y)$ where $f > 0$.
2. **Pick an outer variable** and read off its full numeric range — those limits must be constants.
3. **Slice.** Holding the outer variable fixed, read the inner variable's range off the sketch — those limits may involve the outer variable.
4. **Sanity check:** the outer limits are always numbers, the inner limits never mention the outer variable's *own* symbol.

> $$\int_{a}^{b}\!\!\int_{g_1(x)}^{g_2(x)} f(x,y)\,dy\,dx$$

Reversing the order of integration is a legitimate move and is often far easier — but the limits must be re-derived from the sketch, not swapped mechanically.

![[Media/Figures/Joint_Probability_Density_Function.svg|540]]

> [!example]- Finding the Normalizing Constant on a Triangle {Example}
> $f(x,y) = c(x+y)$ on the region $0 < x < y < 1$. Find $c$.
>
> > [!answer]-
> > The support is the triangle above the line $y = x$ inside the unit square. Integrate $x$ from 0 to 1; for each $x$, $y$ runs from $x$ up to 1:
> > $$
> > \begin{align*}
> > 1 &= \int_0^1\!\!\int_x^1 c(x+y)\,dy\,dx \\
> >   &= c\int_0^1 \left[xy + \tfrac{y^2}{2}\right]_{y=x}^{y=1} dx \\
> >   &= c\int_0^1 \left(x + \tfrac{1}{2} - x^2 - \tfrac{x^2}{2}\right) dx \\
> >   &= c\int_0^1 \left(x + \tfrac{1}{2} - \tfrac{3x^2}{2}\right) dx \\
> >   &= c\left[\tfrac{1}{2} + \tfrac{1}{2} - \tfrac{1}{2}\right] \\
> >   &= \frac{c}{2}
> > \end{align*}
> > $$
> > So $c = 2$.

> [!example]- Marginal Density on a Non-Rectangular Support {Example}
> Losses on two coverages have $f(x,y) = 8xy$ for $0 < x < y < 1$. Find the marginal density of $Y$.
>
> > [!answer]-
> > To get $f_Y(y)$, integrate $x$ out. On the sketch, fixing $y$ means $x$ runs from 0 up to $y$ — **not** from 0 to 1:
> > $$
> > \begin{align*}
> > f_Y(y) &= \int_0^y 8xy\,dx \\
> >        &= 8y\left[\tfrac{x^2}{2}\right]_0^y \\
> >        &= 4y^3, \quad 0 < y < 1
> > \end{align*}
> > $$
> > Check: $\int_0^1 4y^3\,dy = 1$. Using limits 0 to 1 for $x$ would have given $4y$, which integrates to 2 — an immediate signal the region was wrong.

> [!example]- Probability over a Region and a Conditional Density {Example}
> With $f(x,y) = 8xy$ on $0 < x < y < 1$, find $P(Y > 2X)$ and the conditional density $f_{X \mid Y}(x \mid y)$.
>
> > [!answer]-
> > The event $Y > 2X$ is the part of the triangle above the line $y = 2x$. Integrating $x$ outermost, $y$ runs from $2x$ to 1, and $x$ can go no higher than $\tfrac{1}{2}$:
> > $$
> > \begin{align*}
> > P(Y > 2X) &= \int_0^{1/2}\!\!\int_{2x}^{1} 8xy\,dy\,dx \\
> >           &= \int_0^{1/2} 4x\left[y^2\right]_{2x}^{1} dx \\
> >           &= \int_0^{1/2} \left(4x - 16x^3\right) dx \\
> >           &= \left[2x^2 - 4x^4\right]_0^{1/2} \\
> >           &= \tfrac{1}{2} - \tfrac{1}{4} \\
> >           &= 0.25
> > \end{align*}
> > $$
> > Dividing the joint by the marginal $f_Y(y) = 4y^3$ from the previous example:
> > $$
> > \begin{align*}
> > f_{X \mid Y}(x \mid y) &= \frac{8xy}{4y^3} \\
> >                        &= \frac{2x}{y^2}, \quad 0 < x < y
> > \end{align*}
> > $$
> > Given $Y = y$, $X$ is confined to $(0, y)$ — the conditional support shrinks with $y$, which is exactly why $X$ and $Y$ cannot be independent here even though $8xy$ factors as $(8x)(y)$.
