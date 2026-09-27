---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0f7885f6d3342a90811ed2deff85c197439daeddc35a3f95359243bef72e2569
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Lee Diagram.md
---

A **Lee Diagram** graphs a loss distribution with *size* — claim severity, aggregate loss or entry ratio — on the vertical axis and the cumulative claim count, or cumulative probability $F$, on the horizontal axis. Expected losses then appear as areas, which can be summed in vertical strips (losses grouped by size) or horizontal strips (loss dollars grouped by [[Layer of Insurance|layer]]).

> $$E\{X\} = \int_0^{\infty} x\,dF(x) = \int_0^{\infty} S(x)\,dx$$

> $$\int_a^b S(x)\,dx = \int_a^b x\,dF(x) + bS(b) - aS(a)$$

> $$\frac{E\{L\}}{E} = 1 + \psi(r_1) - \phi(r_2)$$

- **Building one.** Sort the losses and lay them side by side, each one unit wide: the curve is a step function, the vertical strip at a loss of size $x_i$ occurring $n_i$ times has area $n_i x_i$, and the whole area under the curve is the total loss. Rescale the width to probability and the strip at height $x$ has area $x\,dF(x)$, while a horizontal strip at height $x$ has area $S(x)\,dx$, with $S(x) = 1 - F(x)$.
- **Size method versus layer method.** A layer from $a$ to $b$ is simply $\int_a^b S(x)\,dx$ in horizontal strips; the vertical-strip (size) expression is the longer second formula. A limit $L$ cuts every strip at height $L$; a deductible $D$ with a limit $L$ leaves the band between the horizontal lines at $D$ and $L$. With numerical data the layer method is easy, which is why Table M and [[Table L]] are built by horizontal slicing.
- **Aggregate losses.** Plot the entry ratio $y = A/E$ against $F(y)$; the area under the curve is $1$. The [[Insurance Charge|Table M charge]] $\phi(r)$ is the area under the curve above the line $y = r$, and the savings $\psi(r)$ is the area below that line and above the curve. The rectangle of height $r$ gives $r = [1 - \phi(r)] + \psi(r)$, and a thin strip at $r$ shows $\phi'(r) = -S(r)$.
- **Retro and deductible plans.** With a minimum ratable loss at $r_1 E$ and a maximum at $r_2 E$, the ratable losses are the area under the curve cut off at the maximum line and filled up to the minimum line — the third formula ($r_H$ and $r_G$ in retro notation). The area under the curve between the two lines is $\phi(r_H) - \phi(r_G)$, the source of the balance equation for the minimum premium. With a per-occurrence limit, a second, lower curve $F_D$ (limited losses) separates the per-occurrence excess, the area between the curves, from the aggregate excess of the limited losses ([[Table L]]).
- The diagrams are from Yoong-Sin Lee's graphical approach to excess of loss and retrospective rating. They are a way to see who pays which slice of loss before calculating anything.

> [!example]- Layer Cost by Horizontal and Vertical Strips {Example}
> Ten general liability claims (\$000) are $5$, $10$, $10$, $20$, $30$, $40$, $60$, $80$, $120$ and $200$. A policy pays each claim in the layer from $25$ to $100$ (\$75K xs \$25K). Find the layer's losses by horizontal strips and by vertical strips, and its share of ground-up loss.
>
> > [!answer]-
> > **Horizontal strips (layer method).** Between successive claim sizes, count the claims that reach each band — $6$ claims reach $25$–$30$, $5$ reach $30$–$40$, $4$ reach $40$–$60$, $3$ reach $60$–$80$ and $2$ reach $80$–$100$:
> >
> > $$
> > \begin{align*}
> > \text{Layer} &= 6(5) + 5(10) + 4(20) + 3(20) + 2(20) \\
> > &= 30 + 50 + 80 + 60 + 40 \\
> > &= 260
> > \end{align*}
> > $$
> >
> > **Vertical strips (size method).** Claims inside $(25, 100]$ contribute their full size, the $2$ claims above $100$ contribute $b = 100$ each, and $a = 25$ comes off each of the $6$ claims above $25$:
> >
> > $$
> > \begin{align*}
> > \text{Layer} &= (30 + 40 + 60 + 80) + 100(2) - 25(6) \\
> > &= 210 + 200 - 150 \\
> > &= 260
> > \end{align*}
> > $$
> >
> > Both give $\$260{,}000$, or $\$26{,}000$ per claim. Ground-up loss is $\$575{,}000$, so the layer carries $260/575 = 45.2\%$ of it. On the diagram the layer is the part of the area under the step curve between the horizontal lines at $25$ and $100$.

> [!example]- Reading a Retro Plan off an Aggregate Lee Diagram {Example}
> A group of risks has entry ratios $Y$ uniform on $[0.5, 1.5]$, so the Lee diagram's curve is the straight line $y = 0.5 + p$ for $p$ from $0$ to $1$. A retro plan has a minimum ratable loss at $r_H = 0.7$ and a maximum at $r_G = 1.2$. For a risk with $E = \$1{,}000{,}000$, $c = 1.10$ and $e = \$250{,}000$ (ignore taxes):
>
> 1. Find $\phi(1.2)$, $\psi(0.7)$ and $E\{L\}/E$ as areas.
> 2. Find the basic premium and the minimum and maximum premiums.
> 3. Check the balance equation for the minimum premium.
>
> > [!answer]-
> > **1.** The line reaches $1.2$ at $p = 0.7$, leaving a triangle above $y = 1.2$ of width $0.3$ and height $0.3$. It reaches $0.7$ at $p = 0.2$, leaving a triangle below $y = 0.7$ of width $0.2$ and height $0.2$.
> >
> > $$
> > \begin{align*}
> > \phi(1.2) &= \tfrac{1}{2}(0.3)(0.3) \\
> > &= 0.045 \\[4pt]
> > \psi(0.7) &= \tfrac{1}{2}(0.2)(0.2) \\
> > &= 0.020 \\[4pt]
> > \frac{E\{L\}}{E} &= 1 + 0.020 - 0.045 \\
> > &= 0.975
> > \end{align*}
> > $$
> >
> > **2.** The net insurance charge is $I = (0.045 - 0.020)(1{,}000{,}000) = \$25{,}000$.
> >
> > $$
> > \begin{align*}
> > B &= e - (c - 1)E + cI \\
> > &= 250{,}000 - 100{,}000 + 27{,}500 \\
> > &= \$177{,}500 \\[4pt]
> > H &= 177{,}500 + 1.10(700{,}000) \\
> > &= \$947{,}500 \\[4pt]
> > G &= 177{,}500 + 1.10(1{,}200{,}000) \\
> > &= \$1{,}497{,}500
> > \end{align*}
> > $$
> >
> > **3.** The area under the curve between the minimum and maximum lines is $\phi(0.7) - \phi(1.2)$, where $\phi(0.7)$ is the triangle above $y = 0.7$, $\tfrac{1}{2}(0.8)(0.8) = 0.32$:
> >
> > $$
> > \begin{align*}
> > \phi(0.7) - \phi(1.2) &= 0.32 - 0.045 \\
> > &= 0.275 \\[4pt]
> > \frac{(e + E) - H}{cE} &= \frac{1{,}250{,}000 - 947{,}500}{1{,}100{,}000} \\
> > &= 0.275
> > \end{align*}
> > $$
> >
> > The two agree: the expected premium above the minimum is $cE$ times that area.
