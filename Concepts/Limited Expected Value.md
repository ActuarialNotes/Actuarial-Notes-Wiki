---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:125485b01971ca7647556495b3d0586f5721c7e578a20c3562fb4e1f84b0a6cf
  sources:
    - "SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential (PDF p.11) and A.2.3.1 Pareto (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Exam C Sample Solutions (C-09-15), Q#28 (PDF p.10), Q#100-#101 (PDF p.37), Q#119-#120 (PDF p.44), PDF p.74, sha256:de58b71716cce5fbbe82cd3b31d1533db67686a86cabe407844ae403534a9a4a — https://www.soa.org/globalassets/assets/files/edu/edu-exam-c-sample-sol.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF p.17), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 2016), ch.11 Increased Limits, LAS(H) (PDF p.205), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 4
  open_critical: 0
  log: .verify/Concepts/Limited Expected Value.md
---

The **Limited Expected Value** (LEV) of a random variable $X$ at limit $u$ is the expected value of the payment under a policy that pays $X$ up to a maximum of $u$. It equals the expected value of $\min(X, u)$.

> $$E[X \wedge u] = \int_0^u [1 - F(x)]\,dx \quad \text{(for non-negative } X\text{)}$$

> $$E[X \wedge u] = E[X] - E[\max(X - u, 0)] = E[X] - e(u)\cdot[1-F(u)]$$

- Also written $E[\min(X, u)]$; the **limited loss variable** is $Y = \min(X, u)$
- $e(u)$ is the mean excess loss at $u$: $e(u) = \dfrac{E[X] - E[X \wedge u]}{1 - F(u)}$
- As $u \to \infty$, $E[X \wedge u] \to E[X]$
- Used to price **policy limits** and **excess-of-loss reinsurance**: the insurer pays $E[X \wedge u]$ and the reinsurer pays $E[X] - E[X \wedge u]$
- Exam 5 (Werner & Modlin) writes the limit as $H$ and calls $E[X \wedge H]$ the **limited average severity** $\text{LAS}(H)$. Under its simplifying assumptions, the increased limit factor for limit $H$ over basic limit $B$ is $\text{ILF}(H) = \text{LAS}(H)/\text{LAS}(B)$ (see [[Increased Limits]])

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
