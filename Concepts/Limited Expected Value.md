---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:f90ce910e2cf132487fc10b013371b4b70a3edc5c9456ae843ad155e081b45b0
  sources:
    - "Frees & Johnson (eds.), Loss Data Analytics (open textbook), Ch.3 §3.4.2 Policy Limits (X ^ u definition; X = (X-u)+ + X ^ u; Y^L = (X^u) - (X^d)), §3.4.3 Y^L = alpha[(X^u) - (X^d)], piecewise in X, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "SOA Exam FAM-S sample solutions (Oct 2024), Q14 p.7, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Limited Expected Value.md
---

![[Media/Figures/Limited_Expected_Value.svg|340]]

A **Limited Expected Value** of a loss $X$ at a limit $u$ is the expected value of the limited loss $X \wedge u = \min(X, u)$, which equals $X$ when $X \le u$ and $u$ when $X > u$. For a continuous loss with density $f(x)$, the limited expected value is

> $$E[X \wedge u] = \int_0^u x\,f(x)\,dx + u\,S(u)$$

- $S(u) = P(X > u)$ is the [[Survival Model|survival function]] of $X$ at $u$.

For a non-negative loss, the limited expected value is also the integral of the survival function up to the limit:

> $$E[X \wedge u] = \int_0^u S(x)\,dx$$

$E[X \wedge u]$ increases to $E[X]$ as $u$ grows, and it equals $E[X]$ when $u$ is at or above the largest possible loss. For a non-negative integer-valued $N$ and an integer $m$, the integral becomes a sum, $E[N \wedge m] = \sum_{k=0}^{m-1} P(N > k)$.

> [!example]- A loss is uniformly distributed on $[0, 1{,}000]$. A policy pays the loss up to a limit of 600. What is the expected payment per loss? {Example}
> - The survival function is $S(x) = 1 - x/1{,}000$ for $0 \le x \le 1{,}000$.
> - The expected payment is $E[X \wedge 600] = \int_0^{600} \left(1 - \frac{x}{1{,}000}\right) dx = 600 - \frac{600^2}{2{,}000}$.
> - $E[X \wedge 600] = 600 - 180 = 420$.

## Limited expected values of the exponential and Pareto distributions

For an [[Exponential Distribution|exponential distribution]] with mean $\theta$, the limited expected value is

> $$E[X \wedge u] = \theta\left(1 - e^{-u/\theta}\right)$$

For a [[Pareto Distribution|Pareto distribution]] with parameters $\alpha$ and $\theta$, the limited expected value is

> $$E[X \wedge u] = \frac{\theta}{\alpha - 1}\left[1 - \left(\frac{\theta}{\theta + u}\right)^{\alpha - 1}\right]$$

- $\alpha \ne 1$.

> [!example]- Losses are exponential with mean 1,000. What is the expected payment per loss under a policy limit of 2,000? {Example}
> - $E[X \wedge 2{,}000] = 1{,}000\left(1 - e^{-2}\right) = 864.66$.

> [!example]- Losses are Pareto with $\alpha = 3$ and $\theta = 2{,}000$. What is the expected payment per loss under a policy limit of 1,000? {Example}
> - The ratio is $\frac{\theta}{\theta + u} = \frac{2{,}000}{3{,}000} = \frac{2}{3}$.
> - $E[X \wedge 1{,}000] = \frac{2{,}000}{2}\left[1 - \left(\frac{2}{3}\right)^2\right] = 1{,}000 \times \frac{5}{9} = 555.56$.

## Payments under a deductible and a limit

A loss splits into the part below a point $d$ and the part above it, $X = (X \wedge d) + (X - d)_+$. Under an ordinary [[Deductible|deductible]] $d$ the insured retains $X \wedge d$, and the expected payment per loss is

> $$E[(X - d)_+] = E[X] - E[X \wedge d]$$

The expected payment on the layer of losses between $d$ and $u$ is $E[X \wedge u] - E[X \wedge d]$. The [[Mean Excess Loss|mean excess loss]] at $d$ is $e(d) = \frac{E[X] - E[X \wedge d]}{S(d)}$. A shortfall below a target $d$ is $(d - X)_+ = d - (X \wedge d)$.

> [!example]- Losses are exponential with mean 1,000. A policy has a deductible of 500 and a limit of 2,000 on the loss. What is the expected payment per loss? {Example}
> - The payment is the layer of the loss between 500 and 2,000.
> - $E[X \wedge 500] = 1{,}000\left(1 - e^{-0.5}\right) = 393.47$.
> - $E[X \wedge 2{,}000] = 864.66$, so the expected payment per loss is $864.66 - 393.47 = 471.19$.

## Increased limits factors

An increased limits factor (ILF) prices a limit $H$ relative to a basic limit $B$. Without a risk load, it is

> $$\text{ILF}(H) = \frac{E[X \wedge H]}{E[X \wedge B]}$$

Exam 5 calls $E[X \wedge H]$ the limited average severity, $\text{LAS}(H)$, and uses it to price [[Increased Limits|increased limits]].

> [!example]- Losses are exponential with mean 1,000, and the basic limit is 1,000. What is the increased limits factor for a limit of 2,000? {Example}
> - $E[X \wedge 1{,}000] = 1{,}000\left(1 - e^{-1}\right) = 632.12$.
> - $\text{ILF}(2{,}000) = 864.66/632.12 = 1.3679$.

> [!trap] Limiting the mean instead of the loss
> The limit applies to each loss, not to the mean. For exponential losses with mean 1,000 and a limit of 2,000, $E[X \wedge 2{,}000] = 864.66$, not $\min(1{,}000, 2{,}000) = 1{,}000$.
