A **Transformation of a Random Variable** produces a new variable $Y = g(X)$ from an existing one. The reliable way to find its distribution is the **CDF method**: write $F_Y(y) = P(g(X) \leq y)$, rearrange the inequality into an event about $X$, evaluate with $F_X$, then differentiate to get the density.

> $$F_Y(y) = P\bigl(g(X) \leq y\bigr)$$

> $$f_Y(y) = \frac{d}{dy}F_Y(y)$$

> $$f_Y(y) = f_X\bigl(g^{-1}(y)\bigr)\left|\frac{d}{dy}g^{-1}(y)\right|$$

- The third line is the **change-of-variable shortcut**, valid only when $g$ is strictly monotone on the support of $X$. The Jacobian factor $|dg^{-1}/dy|$ is what most solutions forget.
- If $g$ is **not** monotone (e.g. $Y = X^2$ with $X$ taking both signs), the shortcut fails — go back to the CDF method and collect every branch of $X$ that maps into the region.
- Always carry the **support** through the transformation. Deriving a correct formula on the wrong interval is the most common way to lose the mark.
- A linear transformation $Y = aX + b$ gives $E[Y] = aE[X] + b$ and $\text{Var}(Y) = a^2\text{Var}(X)$ directly, with no integration needed.
- Insurance applications are transformations: $Y = (X-d)_+$ under a [[Deductible]], $Y = \min(X, u)$ under a [[Benefit Limit]], and $X' = (1+r)X$ under [[Inflation]] all reshape the [[Loss Random Variable]] into the [[Payment Random Variable]].
- If $E[g(X)]$ is all that is wanted, do **not** find $f_Y$ — use $E[g(X)] = \int g(x) f_X(x)\,dx$ directly.

![[Media/Figures/Transformations_of_Random_Variables.svg|340]]

> [!example]- Scaling an Exponential Loss for Inflation {Example}
> Losses follow $X \sim \text{Exponential}$ with mean 1000. Next year losses inflate by 10%, so $Y = 1.1X$. Find the density of $Y$.
>
> > [!answer]-
> > $g(x) = 1.1x$ is strictly increasing, with $g^{-1}(y) = y/1.1$ and $\frac{d}{dy}g^{-1}(y) = 1/1.1$. Apply the change-of-variable formula:
> > $$
> > \begin{align*}
> > f_Y(y) &= f_X\!\left(\frac{y}{1.1}\right) \cdot \frac{1}{1.1} \\
> >        &= \frac{1}{1000}e^{-y/1100} \cdot \frac{1}{1.1} \\
> >        &= \frac{1}{1100}e^{-y/1100}, \quad y > 0
> > \end{align*}
> > $$
> > That is exponential with mean 1100 — scaling an exponential just scales its mean. Dropping the $1/1.1$ Jacobian would have left a density that does not integrate to 1.

> [!example]- The Probability Integral Transform {Example}
> $X$ is continuous with strictly increasing CDF $F_X$. Show that $U = F_X(X)$ is $\text{Uniform}(0,1)$.
>
> > [!answer]-
> > Use the CDF method. For $0 < u < 1$:
> > $$
> > \begin{align*}
> > F_U(u) &= P\bigl(F_X(X) \leq u\bigr) \\
> >        &= P\bigl(X \leq F_X^{-1}(u)\bigr) \\
> >        &= F_X\bigl(F_X^{-1}(u)\bigr) \\
> >        &= u
> > \end{align*}
> > $$
> > $F_U(u) = u$ on $(0,1)$ is exactly the [[Uniform Continuous Distribution|uniform]] CDF. Run backwards, $X = F_X^{-1}(U)$ turns uniform random numbers into samples from any distribution — the basis of simulation.

> [!example]- A Non-Monotone Transformation {Example}
> $X \sim \text{Uniform}(-1, 1)$, so $f_X(x) = 1/2$ on $(-1,1)$. Find the density of $Y = X^2$.
>
> > [!answer]-
> > $g(x) = x^2$ is not monotone on $(-1,1)$, so the shortcut does not apply. Use the CDF method, keeping **both** branches of $X$ that produce $Y \leq y$:
> > $$
> > \begin{align*}
> > F_Y(y) &= P(X^2 \leq y) \\
> >        &= P(-\sqrt{y} \leq X \leq \sqrt{y}) \\
> >        &= \frac{2\sqrt{y}}{2} \\
> >        &= \sqrt{y}, \quad 0 < y < 1
> > \end{align*}
> > $$
> > Differentiating:
> > $$f_Y(y) = \frac{1}{2\sqrt{y}}, \quad 0 < y < 1$$
> > Note the support collapsed from $(-1,1)$ to $(0,1)$ — squaring folds the negative half onto the positive half.
