---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:45c838faa763bfb503c4f105990d332b615d6d12b19ce6347ea4757e6670bec4
  sources:
    - "SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential (PDF p.11) and A.2.3.1 Pareto incl. alpha = 1 (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Exam C Sample Solutions (C-09-15), Q#101 mean excess loss (PDF p.37), E[(X-d)+] = E(X) - E(X ^ d) (PDF p.74), sha256:de58b71716cce5fbbe82cd3b31d1533db67686a86cabe407844ae403534a9a4a — https://www.soa.org/globalassets/assets/files/edu/edu-exam-c-sample-sol.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF p.17), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.11 Increased Limits, LAS(H) and ILF(H) = LAS(H)/LAS(B) (PDF p.205), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §2.1 'Limits', PDF p.55, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
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
