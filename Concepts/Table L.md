---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:2815cd4ac9c40e2d03cf6a472dc4dc8c03abc6ab69a111f8f5ebcfd44dd528ef
  sources:
    - "Fisher et al., Individual Risk Rating (CAS Exam 8 study note, 2019), Ch.3 PDF pp.48-49, 78-79, 83-88, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Table L.md
---
**Table L** is a table of insurance charges and savings that prices a per-occurrence limit $D$ and an aggregate limit together, as one factor of expected unlimited loss. It is named for Skurnick's California Table L. Like Table M$_D$, it has three dimensions (expected size of the policy, entry ratio and per-occurrence limit), so there is one table per limit.

The fraction of the expected unlimited aggregate loss $E$ that lies above the per-occurrence limit is

> $$k = 1 - \frac{\mathrm{E}\{A_D\}}{E}$$

- $A_D$ is the actual aggregate loss with each occurrence limited to $D$.

$k$ is the excess ratio for the per-occurrence limit, called "ER" in the pre-2019 NCCI retro manual. Exam solutions often call $k$ the "LER", the share of loss the per-occurrence limit eliminates from the insured's losses. That is $1 - \text{LER}$ in the deductible sense of [[Loss Elimination Ratio|loss elimination ratio]], whose LER is the share below the deductible.

A risk's Table L entry ratio is its limited aggregate loss over the expected unlimited loss:

> $$r = \frac{A_D}{E}$$

The Table L charge at entry ratio $r$ is

> $$\phi^*_D(r) = \int_r^{\infty} (y - r)\, dF_D(y) + k$$

- $F_D$ is the distribution of $A_D/E$.

The charge is the average difference between a risk's unlimited and limited loss, plus its limited loss in excess of $rE$, all as a ratio to expected unlimited loss. The $k$ term is the per-occurrence excess, and the integral is the additional effect of the aggregate limit beyond the occurrence limit. The savings is

> $$\psi^*_D(r) = \int_0^{r} (r - y)\, dF_D(y)$$

and it follows from the charge:

> $$\psi^*_D(r) = \phi^*_D(r) + r - 1$$

## Properties of the Table L charge

$\phi^*_D(0) = 1$, because all of the expected unlimited loss is either above $D$ or above zero. $\phi^*_D(r) - k$ is a Table M charge of the limited distribution, so $\phi^*_D$ is decreasing and convex in $r$. It never falls below $k$, because losses above the per-occurrence limit are always the insurer's, however high the aggregate. At and above the largest limited entry ratio the aggregate part is 0, and $\phi^*_D(r) = k$.

With no loss limit, $k = 0$, $F_D = F$, and Table L reduces to [[Table M]]. Using the limited distribution $F_D$ in the integral is what keeps the per-occurrence and aggregate limits from double counting the losses they overlap on, as a [[Lee Diagram|Lee diagram]] shows. The other way of pricing a limited aggregate from an unlimited Table M is [[Insurance Charge Reflecting Loss Limitation (ICRLL)|ICRLL]].

## Converting a Table M$_D$ charge

A charge $\phi_{\text{lim}}$ read from a Table M$_D$ is a ratio to expected limited loss. For the same aggregate limit, the charge as a ratio to expected unlimited loss is

> $$\phi^* = \phi_{\text{lim}}(1 - k) + k$$

When the aggregate charge is already a ratio to expected unlimited loss, as the integral in Table L is, no $(1 - k)$ factor is applied, and $\phi^*$ is that charge plus $k$.

> [!example]- A Table M$_D$ charge is $0.20$ and $k = 0.08$. What is the charge as a ratio to expected unlimited loss? {Example}
> - The Table M$_D$ charge is a ratio to expected limited loss, so it is first scaled by $1 - k = 0.92$, giving $0.184$.
> - Adding the per-occurrence excess gives $\phi^* = 0.184 + 0.08 = 0.264$.

## Building Table L from data

1. For each risk in the group, record both the unlimited and the limited aggregate loss.
2. Compute $k = 1 - (\text{average limited})/(\text{average unlimited})$.
3. Compute each risk's entry ratio as its limited aggregate loss over the group's expected unlimited loss. The average entry ratio is $1 - k$.
4. Slice horizontally as for Table M, starting from 0 at the largest entry ratio and adding (difference in $r$) × (% of risks above $r$) on the way up. This gives $\phi^*_D(r) - k$.
5. Add $k$ to every row. Without it, the charge falls to 0 at high entry ratios.
6. Compute the savings from $\psi^*_D(r) = \phi^*_D(r) + r - 1$.

Claim-level unlimited data can be limited "as if" at any per-occurrence limit, so one body of data serves every table. Simulating a Table L needs claim counts and severities simulated separately, so the limit can be applied claim by claim.

> [!example]- What are $k$, $\phi^*_D(1.0)$ and $\phi^*_D$ at the top entry ratio for these ten risks? {Example}
> Ten risks have these aggregate losses (in \$000), unlimited and with each occurrence limited to $\$50{,}000$:
>
> | Risk | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
> | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
> | Unlimited | 20 | 50 | 60 | 70 | 80 | 80 | 90 | 100 | 150 | 300 |
> | Limited | 20 | 50 | 60 | 70 | 80 | 80 | 90 | 100 | 120 | 250 |
>
> > [!answer]-
> > - The averages are $\$100$K unlimited and $\$92$K limited, so $k = 1 - 92/100 = 0.08$.
> > - The entry ratios, limited loss over $\$100$K, are $0.2$, $0.5$, $0.6$, $0.7$, $0.8$, $0.8$, $0.9$, $1.0$, $1.2$ and $2.5$.
> > - Slicing from the top, $\phi^*_D(2.5) - k = 0$.
> > - One risk in ten is above $1.2$, so $\phi^*_D(1.2) - k = 1.3 \times 10\% = 0.13$.
> > - Two are above $1.0$, so $\phi^*_D(1.0) - k = 0.13 + 0.2 \times 20\% = 0.17$, and $\phi^*_D(1.0) = 0.17 + 0.08 = 0.25$.
> > - At the top entry ratio $\phi^*_D(2.5) = k = 0.08$: the aggregate limit removes nothing more, but the per-occurrence limit still does.

> [!trap] Dividing by the expected limited loss
> The Table L entry ratio is limited loss over expected unlimited loss. Dividing by the expected limited loss gives the Table M$_D$ entry ratio instead. In the example above, risk 10's entry ratio would be $250/92 = 2.72$ in place of $2.5$.
