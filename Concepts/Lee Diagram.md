---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:b6e56fd25321646679b4cc9b0b752eb4304b04c1e89183f7d9e113adea2f9742
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §2.1 pp.51-52 (PDF pp.56-57), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Lee Diagram.md
---
A **Lee Diagram** is a graph of a loss distribution with size of loss on the vertical axis, against the cumulative probability $F$, from 0 to 1, on the horizontal axis. The size can be severity, aggregate loss or entry ratio. Expected losses in any layer, and the charges and savings of [[Retrospective Rating|retro]] and deductible plans, are read off it as areas.

Laying the losses in ascending order from left to right, each occupying an equal width, draws the curve. With data it is a step function. The area under the curve is the expected loss, which is

> $$\mathrm{E}\{X\} = \int_0^{\infty} x\, dF(x)$$

> $$\mathrm{E}\{X\} = \int_0^{\infty} S(x)\, dx$$

- $F$ is the cumulative distribution function.
- $S(x) = 1 - F(x)$.

Size goes on the vertical axis. Drawn the usual way round, as an ordinary cumulative distribution function, the areas for charges and savings are on the wrong sides.

> [!idea] The idea
> Turning the distribution on its side makes every coverage a region between horizontal lines, and whoever pays a layer pays the area of its region.

Adding or subtracting regions replaces most of the integration by parts the algebra needs.

## Size method and layer method

A vertical strip at height $x$ has area $x\,dF(x)$ and groups losses by size. A horizontal strip at height $x$ has area $S(x)\,dx$ and groups loss amounts by layer. Summing either gives $\mathrm{E}\{X\}$. By the layer method, the expected loss in a layer from $a$ to $b$ is

> $$\mathrm{E}\{\text{layer } a \text{ to } b\} = \int_a^b S(x)\, dx$$

By the size method, the same layer is

> $$\mathrm{E}\{\text{layer } a \text{ to } b\} = \int_a^b x\,dF(x) + b\,S(b) - a\,S(a)$$

The layer method is often more convenient. It is the easy way to get the expected loss at many limits at once, since each new limit is one more horizontal slice. Its drawback is that $S(x)$ is generally harder to integrate in closed form, a drawback that vanishes when the distribution is given numerically, as with actual experience. [[Table M]] and [[Table L]] were constructed by the layer method. The size method integrates $x\,dF(x)$, so it avoids integrating $S(x)$, and its expression for a layer is the form commonly found in the literature.

With equally likely ordered losses, the expected loss above a retention is the sum, over the layers above the retention, of each layer's width times the probability that a loss exceeds the bottom of that layer.

## Limits and deductibles

For a coverage with limit $L$, every vertical strip is cut off at height $L$. The expected payment is the area under the curve and below the line at $L$, the [[Limited Expected Value|limited expected value]]. With a deductible $D$ and limit $L$, it is the area under the curve between the lines at $D$ and $L$, a [[Layer of Insurance|layer]].

## Insurance charge and savings

Plotted on the entry-ratio scale, the area under the curve of [[Aggregate Loss Model|aggregate loss]] is 1. The insurance charge $\phi(r)$ is the area above the horizontal line at $r$ and below the curve. The insurance savings $\psi(r)$ is the area below the line and above the curve, to the left of it. The rectangle from 0 to $r$ has area $r = [1 - \phi(r)] + \psi(r)$, so the savings is

> $$\psi(r) = \phi(r) + r - 1$$

The diagram shows that $\phi(0) = 1$, that $\phi$ decreases, and that $\phi'(r) = -S(r)$. With a minimum at $r_1$ and a maximum at $r_2$, the insured's expected ratable loss is

> $$\frac{\mathrm{E}\{L\}}{E} = 1 + \psi(r_1) - \phi(r_2)$$

- $\mathrm{E}\{L\}$ is the expected ratable loss.
- $E$ is the expected unlimited aggregate loss.

> [!example]- Aggregate loss is uniform on 0 to 100. What are $\phi(1.2)$ and $\psi(1.2)$, read off the Lee diagram? {Example}
> - The expected loss is $E = 50$, so the entry ratio is uniform on 0 to 2.
> - The curve is the straight line from height 0 at $F = 0$ to height 2 at $F = 1$, and the line $r = 1.2$ crosses it at $F = 0.6$.
> - The charge is the triangle above the line and under the curve, $\phi(1.2) = \tfrac{1}{2}(2 - 1.2)(1 - 0.6) = 0.16$.
> - The savings is the triangle below the line and above the curve, $\psi(1.2) = \tfrac{1}{2}(1.2)(0.6) = 0.36$.
> - As a check, $\phi(1.2) + 1.2 - 1 = 0.36 = \psi(1.2)$.

## Per-occurrence and aggregate limits

Two curves go on one diagram, with a horizontal line at the aggregate entry ratio $r$. The upper curve $F$ is the unlimited aggregate loss. The lower curve $F_D$ is the aggregate of losses limited per occurrence to $D$. Both are in units of expected unlimited loss, so areas under the lower curve are fractions of the expected unlimited loss.

The area between the two curves is the per-occurrence excess, of total area $k$. The area under the lower curve is the limited loss, $1 - k$. The area under the lower curve and above $r$ is the aggregate excess of the limited losses. The Table L charge is the area between the curves plus the area under the lower curve and above $r$. The unlimited Table M charge at $r$ is the area under the upper curve and above $r$.

When a plan has both a per-occurrence limit and an aggregate limit (or maximum premium), the area between the two curves and above the line $r$ belongs to both. The charge for the maximum read from the unlimited curve and the charge for the loss limit both contain it. Capping individual losses makes it less likely that aggregate losses reach the maximum, so the combined charge is generally less than the sum of the two. Pricing the aggregate charge on the limited curve removes the overlap.

If the most severe losses grow, the unlimited curve rises at its right end. Those losses are already capped at $D$, so the limited curve barely moves. The per-occurrence excess $k$ widens, and almost none of the increase reaches the aggregate charge. A per-occurrence limit low enough to cap a new class of severe claims shifts their cost from the aggregate charge to the per-occurrence charge.

If the limited distribution changes while the unlimited one does not, and the change lies above the aggregate line, the insured's retained area is unchanged. Any increase in the aggregate excess area is then matched by an equal decrease in the area between the curves. The total loss cost the insurer bears, the per-occurrence excess plus the aggregate excess, is 1 minus the insured's retained area and is unchanged.

> [!trap] Adding the loss-limit charge and the Table M charge
> With both a loss limit and a maximum, the per-occurrence charge plus the unlimited Table M charge counts the area between the curves and above $r$ twice. Price the aggregate charge on the limited curve instead.
