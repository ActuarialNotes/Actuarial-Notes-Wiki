---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b76ae0085bee493c66913f0866e46e8f3a8e2c22362086835369ce93ee0a4906
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Parallelogram Method.md
---

The **Parallelogram Method** (or geometric method) is the [[On-Leveling|on-leveling]] method that restates a period's aggregate earned premium to the current rate level with a single factor: it uses geometry — and the assumption that policies are written evenly through time — to find what share of the period's premium was earned at each historical rate level.

> $$\text{OLF}_Y = \frac{I_{\text{current}}}{\sum_k A_{Y,k}\, I_k}$$

> $$A_{\text{new}} = \tfrac{1}{2}(1 - p)^2$$

- $I_k$ is the cumulative rate level index of rate level group $k$ (each index is the previous one times $1 +$ that change), $I_{\text{current}}$ the latest index — even if the change came after the experience period — and $A_{Y,k}$ the share (area) of year $Y$'s earned premium written at level $k$. The second formula is the area earned in the same calendar year at a new level effective a fraction $p$ of the way through it, for annual policies.
- **The picture.** A calendar year is a unit square: time across, fraction of the policy term earned up. A rate change for policies written on or after a date is a **diagonal** line whose slope is set by the term (steeper for six-month policies). A change forced by law onto policies already in force is a **vertical** line. Areas come from triangles ($\tfrac{1}{2}bh$), parallelograms ($bh$) and trapezoids.
- **Werner's six steps:** date the changes and form rate level groups; find each group's area in each year; build cumulative indices; take the area-weighted average index; divide it into the current index; apply the factor to the year's earned premium.
- **Policy-year and written premium** are grouped by write date, so the rate level boundary cuts them cleanly: a change effective a fraction $p$ into the year affects the share $1 - p$. In the policy-year picture the regions are parallelograms rather than triangles.
- **Two weaknesses.** It assumes uniform writing — false for seasonal business such as boat owners, whose policies are bought ahead of the season; refining to quarters or months, or weighting by the actual distribution of writings, helps. And it applies the *overall average* change, so if changes varied by class or territory the segment premiums are not on-level, which makes the result unacceptable for [[Classification Ratemaking|classification]] work — hence the move to [[Extension of Exposures|extension of exposures]].

> [!example]- Three Rate Changes Across Three Calendar Years {Example}
> Annual policies, written uniformly. Rate changes apply to policies written on or after: $+4.0\%$ on $7/1/2021$, $+7.5\%$ on $4/1/2022$, $+3.0\%$ on $10/1/2023$. Calendar year earned premium was $\$9{,}500{,}000$ ($2022$), $\$10{,}400{,}000$ ($2023$) and $\$11{,}000{,}000$ ($2024$).
>
> Compute each year's on-level factor and on-level earned premium.
>
> > [!answer]-
> > **Indices:** $1.0000$; $1.0400$; $1.04 \times 1.075 = 1.1180$; $1.1180 \times 1.03 = 1.15154$ (current).
> >
> > **CY 2022.** Policies written before $7/1/2021$ still earning: a triangle with base and height $0.5$, area $\tfrac{1}{2}(0.5)^2 = 0.125$. Written on or after $4/1/2022$: $\tfrac{1}{2}(0.75)^2 = 0.28125$. The $1.0400$ level holds the rest, $0.59375$.
> >
> > **CY 2023.** Still earning at $1.0400$ (written $1/1$–$3/31/2022$): $\tfrac{1}{2}(0.25)^2 = 0.03125$. At $1.15154$ (written from $10/1/2023$): $\tfrac{1}{2}(0.25)^2 = 0.03125$. At $1.1180$: $0.9375$.
> >
> > **CY 2024.** At $1.1180$ (written before $10/1/2023$): $\tfrac{1}{2}(0.75)^2 = 0.28125$. At $1.15154$: $0.71875$.
> >
> > $$
> > \begin{align*}
> > \bar{I}_{2022} &= 0.125(1.0000) + 0.59375(1.0400) \\
> > &\quad + 0.28125(1.1180) \\
> > &= 1.05694 \\
> > \bar{I}_{2023} &= 0.03125(1.0400) + 0.9375(1.1180) \\
> > &\quad + 0.03125(1.15154) \\
> > &= 1.11661 \\
> > \bar{I}_{2024} &= 0.28125(1.1180) + 0.71875(1.15154) \\
> > &= 1.14211
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{OLF}_{2022} &= 1.15154 / 1.05694 = 1.0895 \\
> > \text{OLF}_{2023} &= 1.15154 / 1.11661 = 1.0313 \\
> > \text{OLF}_{2024} &= 1.15154 / 1.14211 = 1.0083
> > \end{align*}
> > $$
> >
> > On-level earned premium: $\$9{,}500{,}000 \times 1.0895 = \$10{,}350{,}250$; $\$10{,}400{,}000 \times 1.0313 = \$10{,}725{,}520$; $\$11{,}000{,}000 \times 1.0083 = \$11{,}091{,}300$. Even $2024$ needs a factor: policies written before $10/1/2023$, at the old level, still earn $28\%$ of its premium.

> [!example]- Six-Month Policies Earn Faster {Example}
> A personal auto book writes six-month policies uniformly. Rates rose $10\%$ for policies written on or after $4/1/2024$, with no other change. Compute the CY 2024 on-level factor, and the error from using annual-policy geometry.
>
> > [!answer]-
> > With a six-month term the diagonal runs from $4/1$ at the bottom of the square to $10/1$ at the top. The region to its right is a trapezoid with bases $0.75$ and $0.25$ and height $1$:
> >
> > $$
> > \begin{align*}
> > A_{\text{new}} &= \tfrac{1}{2}(0.75 + 0.25)(1) = 0.50 \\
> > \bar{I} &= 0.50(1.00) + 0.50(1.10) = 1.050 \\
> > \text{OLF} &= 1.10 / 1.050 = 1.0476
> > \end{align*}
> > $$
> >
> > Annual-policy geometry would give $A_{\text{new}} = \tfrac{1}{2}(0.75)^2 = 0.28125$, $\bar{I} = 1.0281$ and an OLF of $1.0699$ — overstating CY 2024 on-level premium by $2.1\%$. Six-month policies take on a change faster, so they need a smaller adjustment; and CY 2025 needs none at all, since every policy written before $4/1/2024$ expired by $10/1/2024$.
