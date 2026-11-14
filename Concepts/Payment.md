---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:ceb7f99472e3de95a800f17e70bffb2f03c7d8b158ea584109f1404b898bebce
  sources:
    - "Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.3, 3.4.1 payment per loss Y^L=(X-d)_+; 3.4.2-3.4.3 Y^L=alpha[(X^u)-(X^d)] with coinsurance alpha, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "SOA Exam FAM Syllabus, February 2027, Topic 1 outcomes a-b (coverage modifications), p.2, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Payment.md
---

A **Payment** $Y$ is the amount an insurer pays on a ground-up [[Loss Random Variable|loss]] $X$ after the policy's [[Deductible|deductible]] $d$, [[Coinsurance|coinsurance]] factor $c$ and [[Benefit Limit|benefit limit]] $u$, the maximum payment, are applied. The payment is

> $$Y = \min\big(c\,(X - d)^+,\ u\big)$$

- $(X - d)^+ = \max(X - d,\ 0)$ is the part of the loss above the deductible.

The adjustments are applied in order: subtract the deductible, multiply by $c$, then cap the result at $u$. $Y$ is the [[Payment Random Variable|payment random variable]], and its expected value $E[Y]$ is what premium and reserve calculations need.

> [!example]- A loss $X$ is uniform on $[0, 1000]$ and the policy has a $\$200$ deductible and no other adjustments. What is $E[Y]$? {Example}
> - The payment is $Y = (X - 200)^+$, which is $0$ for $X \le 200$ and $X - 200$ for $X > 200$.
> - $E[Y] = \int_{200}^{1000} (x - 200)\,\frac{1}{1000}\,dx$.
> - The integral is $\frac{1}{1000} \cdot \frac{800^2}{2} = 320$.
> - The insurer expects to pay $\$320$ per loss.

## Payment for stop-loss insurance

[[Stop-Loss Reinsurance|Stop-loss insurance]] applies a deductible $d$ to the aggregate loss $S$ of a period, with no coinsurance and no limit, so its payment is

> $$Y = (S - d)^+$$

Its expected payment is the net stop-loss premium, $E[(S - d)^+] = E[S] - E[S \wedge d]$.
