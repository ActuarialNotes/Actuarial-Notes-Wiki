---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:45c838faa763bfb503c4f105990d332b615d6d12b19ce6347ea4757e6670bec4
  sources:
    - "Frees & Johnson (eds.), Loss Data Analytics (open textbook), Ch.3 §3.4.2 Policy Limits (X ^ u definition; X = (X-u)+ + X ^ u; Y^L = (X^u) - (X^d)), §3.4.3 Y^L = alpha[(X^u) - (X^d)], piecewise in X, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "SOA Exam FAM-S sample solutions (Oct 2024), Q14 p.7, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Limited Expected Value.md
---

The **Limited Expected Value** (LEV) of a random variable $X$ at limit $u$ is the expected value of the payment under a policy that pays $X$ up to a maximum of $u$. It equals the expected value of $\min(X, u)$.

> $$E[X \wedge u] = \int_0^u [1 - F(x)]\,dx \quad \text{(for non-negative } X\text{)}$$

> $$E[X \wedge u] = E[X] - E[\max(X - u, 0)] = E[X] - e(u)\cdot[1-F(u)]$$

- Also written $E[\min(X, u)]$; the **limited loss variable** is $Y = \min(X, u)$
- $e(u)$ is the mean excess loss at $u$: $e(u) = \dfrac{E[X] - E[X \wedge u]}{1 - F(u)}$
- As $u \to \infty$, $E[X \wedge u] \to E[X]$
- Used to price **[[Policy Limit|policy limits]]** and **excess-of-loss reinsurance**: the insurer pays $E[X \wedge u]$ and the reinsurer pays $E[X] - E[X \wedge u]$
- Exam 5 (Werner & Modlin) writes the limit as $H$ and calls $E[X \wedge H]$ the **limited average severity** $\text{LAS}(H)$. Under its simplifying assumptions, the increased limit factor for limit $H$ over basic limit $B$ is $\text{ILF}(H) = \text{LAS}(H)/\text{LAS}(B)$ (see [[Increased Limits]])
- **As an area.** $E[X \wedge u]$ is the area under a [[Lee Diagram]]'s curve below the horizontal line at $u$.
- **A shortfall below a threshold.** A payment that rewards a loss for falling below $d$, $(d - X)_+ = \max(d - X, 0)$, equals $d - (X \wedge d)$, so $E[(d - X)_+] = d - E[X \wedge d]$. A payment of $c$ times the shortfall has expected value $c\,(d - E[X \wedge d])$. It is the mirror of $E[(X - d)_+] = E[X] - E[X \wedge d]$, and it prices a bonus or dividend paid when losses come in under a target.

**Common formulas:**

| Distribution | $E[X \wedge u]$ |
| :--- | :--- |
| Exponential$(\theta)$ | $\theta(1 - e^{-u/\theta})$ |
| Pareto$(\alpha, \theta)$, $\alpha \neq 1$ | $\dfrac{\theta}{\alpha-1}\!\left[1 - \left(\dfrac{\theta}{\theta+u}\right)^{\alpha-1}\right]$ |
| Pareto$(\alpha = 1, \theta)$ | $-\theta \ln\!\left(\dfrac{\theta}{\theta+u}\right)$ |

![[Media/Figures/Limited_Expected_Value.svg|340]]

> [!example]- Insurer Payment with a Policy Limit {Example}
> Losses $X \sim \text{Exponential}(\theta = 1{,}000)$. A policy pays losses up to a limit of $u = 2{,}000$. Find the expected payment per loss.
>
> > [!answer]-
> > $$E[X \wedge 2{,}000] = 1{,}000\left(1 - e^{-2{,}000/1{,}000}\right) = 1{,}000(1 - e^{-2}) \approx 1{,}000(0.8647) = 864.7$$
> > The insurer expects to pay \$$864.70$ per loss.

> [!example]- A Bonus for Losses Under a Target {Example}
> A reinsurer pays a ceding company a profit bonus equal to $25\%$ of the amount by which the year's losses $X$ fall below $800$, and nothing if losses reach $800$. Losses are $\text{Exponential}(\theta = 500)$. Find the expected bonus.
>
> > [!answer]-
> > The bonus is $0.25\,(800 - X)_+$, and $(800 - X)_+ = 800 - (X \wedge 800)$, so it needs only the limited expected value at the target.
> >
> > $$
> > \begin{align*}
> > E[X \wedge 800] &= 500\left(1 - e^{-800/500}\right) \\
> > &= 399.05 \\
> > E[\text{Bonus}] &= 0.25\,(800 - 399.05) \\
> > &= 100.24
> > \end{align*}
> > $$
> >
> > *Why subtract from the target?* $X \wedge 800$ is the loss when it is under $800$ and $800$ otherwise, so $800 - (X \wedge 800)$ is the shortfall when there is one and $0$ when there isn't.
