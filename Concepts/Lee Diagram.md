---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8435afbb02caa174982784eeecddebda174889aa7b05d37c9b3b6005843e8f45
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Lee Diagram.md
---

A **Lee diagram** (after Yoong-Sin Lee) graphs a loss distribution with **size on the vertical axis** — severity, aggregate loss, or entry ratio — against the **cumulative probability** $F$, from 0 to 1, on the horizontal axis, so that expected losses in any layer, and the charges and savings of [[Retrospective Rating|retro]] and deductible plans, are read as **areas**.

> $$\mathrm{E}\{X\} = \int_0^{\infty} x\, dF(x) = \int_0^{\infty} S(x)\, dx$$

> $$\mathrm{E}\{\text{layer } a \text{ to } b\} = \int_a^b S(x)\, dx$$

- $F$ is the cumulative distribution function, $S(x) = 1 - F(x)$. Laying the losses in ascending order from left to right, each occupying an equal width, draws the curve; with data it is a step function. **The area under the curve is the expected loss.**
- **Size method and layer method.** A vertical strip at height $x$ has area $x\,dF(x)$ and groups losses by *size*; a horizontal strip at height $x$ has area $S(x)\,dx$ and groups loss amounts by *layer*. Summing either gives $\mathrm{E}\{X\}$. The layer method gives the simple $\int_a^b S(x)\,dx$ for a layer from $a$ to $b$; the size method gives the more complicated $\int_a^b x\,dF(x) + b\,S(b) - a\,S(a)$. The layer method is often more convenient, and it is the easy way to get the expected loss at many limits at once (each new limit is one more horizontal slice); its drawback is that $S(x)$ is generally harder to integrate in closed form, a drawback that vanishes when the distribution is given numerically, as with actual experience. Table M and Table L were constructed by the layer method.
- **Excess of a retention by layers.** With equally likely ordered losses, the expected loss above a retention is the sum, over the layers above the retention, of each layer's width times the probability that a loss exceeds the bottom of that layer.
- **Limits and deductibles.** For a coverage with limit $L$, every vertical strip is cut off at height $L$: the expected payment is the area under the curve and below the line at $L$. With a deductible $D$ and limit $L$, it is the area under the curve between the lines at $D$ and $L$.
- **Aggregate charge and savings.** Plotted on the entry-ratio scale, the area under the curve is 1. The **insurance charge** $\phi(r)$ is the area above the horizontal line at $r$ and below the curve; the **insurance savings** $\psi(r)$ is the area below the line and above the curve (to the left of it). The rectangle from 0 to $r$ gives $r = [1 - \phi(r)] + \psi(r)$, so $\psi(r) = \phi(r) + r - 1$, and the diagram shows $\phi(0) = 1$, $\phi$ decreasing and $\phi'(r) = -S(r)$. With a minimum at $r_1$ and a maximum at $r_2$, the insured's expected ratable loss is $\mathrm{E}\{L\}/E = 1 + \psi(r_1) - \phi(r_2)$.
- See [[Table M]], [[Table L]], [[Aggregate Loss Model]], [[Limited Expected Value]] and [[Layer of Insurance]].

> [!idea] The idea
> Turning the distribution on its side makes every coverage a region: a limit is a horizontal line, a deductible another, an aggregate limit a third, and whoever pays a layer pays the area of its region. Adding or subtracting regions replaces most of the integration by parts the algebra needs.

## Per-occurrence and aggregate limits on one diagram

Draw two curves: $F$, the unlimited aggregate loss, and below it $F_D$, the aggregate of losses limited per occurrence to $D$, both in units of expected unlimited loss, with a horizontal line at the aggregate entry ratio $r$.

- **The area between the two curves is the per-occurrence excess**, of total area $k$. The area under the lower curve is the limited loss, $1 - k$. The area under the lower curve and above the line $r$ is the aggregate excess of the limited losses.
- **The Table L charge** is the area between the curves plus the area under the lower curve and above $r$. The unlimited Table M charge at $r$ is the area under the upper curve and above $r$.
- **The overlap.** When a plan has both a per-occurrence limit and an aggregate limit (or maximum premium), the area that lies **between the two curves and above the line $r$** belongs to both: the charge for the maximum read from the unlimited curve and the charge for the loss limit both contain it. Capping individual losses makes it less likely that aggregate losses reach the maximum, so the two charges are not additive — the combined charge is generally less than their sum. Pricing the aggregate charge on the limited curve removes the overlap.
- **Raising only the largest losses.** If the most severe losses grow, the unlimited curve rises at its right end, but those losses are already capped at $D$, so the limited curve barely moves. The gap between the curves — the per-occurrence excess $k$ — widens, and almost none of the increase reaches the aggregate charge. A per-occurrence limit low enough to cap a new class of severe claims shifts their cost from the aggregate charge to the per-occurrence charge.
- **Changing only the limited curve.** If the limited distribution changes while the unlimited one does not, and the change lies above the aggregate line (so the insured's retained area under both the lower curve and the line is unchanged), any increase in the aggregate excess area is matched by an equal decrease in the area between the curves. The total loss cost the insurer bears — per-occurrence excess plus aggregate excess, $1$ minus the insured's retained area — is unchanged.

> [!example]- Charge and Savings off a Uniform Lee Diagram {Example}
> Aggregate loss is uniform on 0 to 100, so $E = 50$ and the entry ratio $Y = A/E$ is uniform on 0 to 2. Read $\phi(1.2)$ and $\psi(1.2)$ off the Lee diagram.
>
> > [!answer]-
> > On the diagram the curve is the straight line from height 0 at $F = 0$ to height 2 at $F = 1$. The line $r = 1.2$ crosses it at $F = 0.6$.
> >
> > $$
> > \begin{align*}
> > \phi(1.2) &= \tfrac{1}{2}(2 - 1.2)(1 - 0.6) \\
> > &= 0.16 \\
> > \psi(1.2) &= \tfrac{1}{2}(1.2)(0.6) \\
> > &= 0.36
> > \end{align*}
> > $$
> >
> > Check: $\phi(1.2) + 1.2 - 1 = 0.36 = \psi(1.2)$. The charge is the triangle above the line and under the curve; the savings the triangle below the line and above the curve.

> [!tip]- How it appears on the exam
> - **Exam 8** asks candidates to draw or label a Lee diagram: the Table M charge and savings at the maximum and minimum entry ratios, the per-occurrence excess, the Table L charge and savings, and the overlap.
> - It gives a simple (often uniform or discrete) distribution and asks for an expected excess, a charge or a savings as an area.
> - It asks, using the diagram, what happens to the per-occurrence and aggregate charges when the largest losses grow or when the limited distribution changes.

> [!warning]- Exam traps
> - **Axes the usual way round:** size goes on the *vertical* axis; drawn as an ordinary CDF, the areas for charges and savings are on the wrong sides.
> - **Adding the two charges:** with both a loss limit and a maximum, the per-occurrence charge plus the unlimited Table M charge counts the overlap twice.
> - **Units:** on the entry-ratio scale the area under the unlimited curve is 1; areas under the limited curve are fractions of expected *unlimited* loss.
