---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0348a6e676d3b84b90bf1fe6c280eb646f465304c94f4723c7904a2a77f6d94c
  sources: []
  open_findings: 3
  open_critical: 0
  log: .verify/Concepts/Table L.md
---

**Table L** is a table of insurance charges $\phi^*_D(r)$ and savings $\psi^*_D(r)$ that prices a per-occurrence limit $D$ and an aggregate limit **together**, as a single factor of expected *unlimited* loss. It is named for Skurnick's California Table L. Like Table M$_D$ it has three dimensions — expected size of the policy, entry ratio, and per-occurrence limit — so it is one table per limit.

> $$k = \frac{E - \mathrm{E}\{A_D\}}{E} = 1 - \frac{\mathrm{E}\{A_D\}}{E}$$

> $$r = \frac{A_D}{E}$$

> $$\phi^*_D(r) = \int_r^{\infty} (y - r)\, dF_D(y) + k$$

> $$\psi^*_D(r) = \int_0^{r} (r - y)\, dF_D(y) = \phi^*_D(r) + r - 1$$

- $E$ is the expected unlimited aggregate loss, $A_D$ the actual aggregate loss with each occurrence limited to $D$, and $F_D$ the distribution of $A_D/E$. $k$ is the **excess ratio for the per-occurrence limit** — the fraction of expected loss above $D$ (called "ER" in the pre-2019 NCCI retro manual). Exam solutions often call $k$ the "LER": the share of loss the per-occurrence limit eliminates from the insured's losses. That is $1 - \text{LER}$ in the deductible sense of [[Loss Elimination Ratio]], whose LER is the share *below* the deductible.
- **The entry ratio is limited loss over unlimited expected loss.** The Table L charge is the average difference between a risk's unlimited and limited loss, plus its limited loss in excess of $rE$, all as a ratio to expected unlimited loss. The $k$ term is the per-occurrence excess; the integral is the additional effect of the aggregate limit beyond the occurrence limit.
- **From a limited table.** A charge $\phi_{\text{lim}}$ read from a Table M$_D$, which is a ratio to *expected limited* loss, converts to a ratio to unlimited loss, for the same aggregate limit, by $\phi^* = \phi_{\text{lim}}(1 - k) + k$. When the aggregate charge is already a ratio to expected unlimited loss, as the integral in Table L is, no $(1 - k)$ factor is applied: $\phi^* = (\text{that charge}) + k$.
- **Shape.** $\phi^*_D(0) = 1$, because all of the expected unlimited loss is either above $D$ or above zero. $\phi^*_D(r) - k$ is a Table M charge of the limited distribution, so $\phi^*_D$ is decreasing and convex in $r$. It never falls below $k$: losses above the per-occurrence limit are always the insurer's, however high the aggregate. At and above the largest limited entry ratio the aggregate part is 0, and $\phi^*_D(r) = k$.
- With no loss limit, $k = 0$, $F_D = F$, and Table L reduces to [[Table M]]. Using the limited distribution $F_D$ in the integral is what keeps the per-occurrence and aggregate limits from double counting the losses they overlap on (see [[Lee Diagram]]); the alternative way of pricing a limited aggregate from an unlimited Table M is [[Insurance Charge Reflecting Loss Limitation (ICRLL)|ICRLL]].

> [!idea] The idea
> Table L asks one question — of every dollar of expected loss, how much falls to the insurer after both limits act? — and answers it per occurrence first. The fraction $k$ above the occurrence limit is gone before the aggregate is even counted, so the charge has a floor at $k$ and only the limited losses can pile up past the aggregate.

## Building Table L from data

1. For each risk in the group, record both the unlimited and the limited aggregate loss.
2. Compute $k$ from the averages: $k = 1 - (\text{average limited})/(\text{average unlimited})$.
3. Compute each risk's entry ratio as its limited aggregate loss over the group's expected *unlimited* loss. The average entry ratio is $1 - k$.
4. Slice horizontally as for Table M: begin from the bottom row with 0, since no loss lies above the largest entry ratio, and work up, adding (difference in $r$) × (% of risks above $r$). This gives $\phi^*_D(r) - k$; add $k$ to every row.
5. Savings follow from $\psi^*_D(r) = \phi^*_D(r) + r - 1$.

Claim-level unlimited data can be limited "as if" at any per-occurrence limit, so one body of data serves every table. Simulating a Table L needs claim counts and severities simulated separately, so the limit can be applied claim by claim.

> [!example]- Building Table L for a $\$50{,}000$ Limit {Example}
> Ten risks have unlimited aggregate losses (in \$000) of $20, 50, 60, 70, 80, 80, 90, 100, 150, 300$ and, with each occurrence limited to $\$50{,}000$, limited aggregate losses of $20, 50, 60, 70, 80, 80, 90, 100, 120, 250$. Find $k$, $\phi^*_D(1.0)$ and $\phi^*_D$ at the top entry ratio.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > k &= 1 - \frac{92}{100} \\
> > &= 0.08
> > \end{align*}
> > $$
> >
> > The entry ratios, limited loss over $\$100$K, are $0.2, 0.5, 0.6, 0.7, 0.8, 0.8, 0.9, 1.0, 1.2, 2.5$. Slicing from the top:
> >
> > $$
> > \begin{align*}
> > \phi^*_D(2.5) - k &= 0 \\
> > \phi^*_D(1.2) - k &= 0 + 1.3 \times 10\% \\
> > &= 0.13 \\
> > \phi^*_D(1.0) - k &= 0.13 + 0.2 \times 20\% \\
> > &= 0.17 \\
> > \phi^*_D(1.0) &= 0.17 + 0.08 \\
> > &= 0.25
> > \end{align*}
> > $$
> >
> > At the top entry ratio $\phi^*_D(2.5) = k = 0.08$: the aggregate limit removes nothing more, but the per-occurrence limit still does. *(Fisher et al., Exhibits 3.24–3.27.)*

> [!tip]- How it appears on the exam
> - **Exam 8** gives unlimited and limited aggregate losses for a group of risks and asks for $k$ and a Table L charge or savings at an entry ratio.
> - It asks for the shape of $\phi^*_D(r)$: its value at $r = 0$, its limit as $r$ grows, and why it is convex.
> - It asks when the $(1 - k)$ adjustment applies, and how Table L compares with Table M and ICRLL.

> [!warning]- Exam traps
> - **Dividing by limited expected loss:** the Table L entry ratio is limited loss over *unlimited* expected loss. Dividing by expected limited loss gives the Table M$_D$ entry ratio instead.
> - **Forgetting to add $k$:** the horizontal slices give $\phi^*_D(r) - k$; without $k$, the charge falls to 0 at high entry ratios.
> - **Applying $(1 - k)$ twice:** convert with $(1 - k)$ only a charge that is a ratio to expected limited loss.
