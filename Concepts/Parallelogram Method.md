---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:bee312384d226e7637ce5b18042f94bf0b4ebdf2853e2cb159c3a45cb6e21d57
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp. 73-80 (PDF pp. 85-92), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Parallelogram Method.md
---

The **Parallelogram Method**, or geometric method, is the [[On-Leveling|on-leveling]] method that restates a period's aggregate earned premium to the current rate level with a single factor. It uses geometry, and the assumption that policies are written evenly through time, to find what share of the period's premium was earned at each historical rate level. The on-level factor of year $Y$ is

> $$\text{OLF}_Y = \frac{I_{\text{current}}}{\sum_k A_{Y,k}\, I_k}$$

- $I_k$ is the cumulative rate level index of rate level group $k$ (each index is the previous one times $1 +$ that change).
- $I_{\text{current}}$ is the latest index, even if the change came after the experience period.
- $A_{Y,k}$ is the share (area) of year $Y$'s earned premium written at level $k$.

Werner & Modlin's six steps are:

1. Date the rate changes and group the policies into rate level groups.
2. Find each group's share of each year's earned premium.
3. Build the cumulative rate level index of each group.
4. Take the area-weighted average index of each year.
5. Divide the current index by it to get the on-level factor.
6. Apply the factor to the year's earned premium.

## The areas

A calendar year is a unit square: time across, fraction of the policy term earned up. A rate change for policies written on or after a date is a **diagonal** line whose slope is set by the term (steeper for six-month policies). A change forced by law onto policies already in force is a **vertical** line. Areas come from triangles ($\tfrac{1}{2}bh$), parallelograms ($bh$) and trapezoids ($\tfrac{1}{2}(b_1 + b_2)h$). For annual policies, a new level effective a fraction $p$ of the way through a calendar year earns in that year

> $$A_{\text{new}} = \tfrac{1}{2}(1 - p)^2$$

- $p$ is the fraction of the year elapsed when the change takes effect.

> [!example]- Annual policies are written uniformly. Rates changed $+5\%$ on $7/1/2010$, $+10\%$ on $1/1/2011$ and $-1\%$ on $4/1/2012$, each for policies written on or after the date. What are the on-level factors for Calendar Years 2010, 2011 and 2012? {Example}
> - The indices are $1.0000$, $1.0500$, $1.0500 \times 1.10 = 1.1550$ and $1.1550 \times 0.99 = 1.14345$, the current index.
> - In 2010, the $7/1$ change earns $\tfrac{1}{2}(0.5)^2 = 0.125$, so the average index is $0.875(1.0000) + 0.125(1.0500) = 1.00625$.
> - In 2011, policies written before $7/1/2010$ still earn $0.125$ and the $1/1/2011$ group earns $\tfrac{1}{2}(1.0)^2 = 0.500$, leaving $0.375$ for the $1.0500$ group.
> - The 2011 average index is $0.125(1.0000) + 0.375(1.0500) + 0.500(1.1550) = 1.09625$.
> - In 2012, the $4/1$ change earns $\tfrac{1}{2}(0.75)^2 = 0.28125$, so the average index is $0.71875(1.1550) + 0.28125(1.14345) = 1.15175$.
> - The on-level factors are $1.14345/1.00625 = 1.1363$, $1.14345/1.09625 = 1.0431$ and $1.14345/1.15175 = 0.9928$.

## Policy year premium

Policy-year and written premium are grouped by write date, so the rate level boundary cuts them cleanly. A change effective a fraction $p$ into the year affects the share $1 - p$. In the policy-year picture the regions are parallelograms rather than triangles, each with area base times height.

> [!example]- With the same rate changes, what is the on-level factor for Policy Year 2012? {Example}
> - Policies written from $1/1/2012$ to $3/31/2012$ are at $1.1550$, a parallelogram of area $0.25 \times 1.00 = 0.25$.
> - Policies written from $4/1/2012$ are at $1.14345$, an area of $0.75$.
> - The average index is $0.25(1.1550) + 0.75(1.14345) = 1.14634$.
> - The on-level factor is $1.14345/1.14634 = 0.9975$.

## Six-month policies

With a six-month term the diagonal is steeper, and a change is fully earned six months after it takes effect. Six-month policies take on a change faster, so they need a smaller adjustment.

> [!example]- A personal auto book writes six-month policies uniformly. Rates rose 10% for policies written on or after $4/1/2024$, with no other change. What is the Calendar Year 2024 on-level factor? {Example}
> - With a six-month term the diagonal runs from $4/1$ at the bottom of the square to $10/1$ at the top.
> - The region to its right is a trapezoid with bases $0.75$ and $0.25$ and height 1, so the new level earns $\tfrac{1}{2}(0.75 + 0.25) = 0.50$.
> - The average index is $0.50(1.00) + 0.50(1.10) = 1.050$.
> - The on-level factor is $1.10/1.050 = 1.0476$.
> - CY 2025 needs none at all, since every policy written before $4/1/2024$ expired by $10/1/2024$.

## Weaknesses of the method

It assumes uniform writing, which is false for seasonal business such as boat owners, whose policies are bought ahead of the season. Refining to quarters or months, or weighting by the actual distribution of writings, helps. It also applies the *overall average* change, so if changes varied by class or territory the segment premiums are not on-level. That makes the result unacceptable for [[Classification Ratemaking|classification]] work, and it is why many insurers moved to [[Extension of Exposures|extension of exposures]].

> [!trap] Annual-policy geometry on six-month policies
> The area depends on the policy term. Annual geometry on the six-month book gives $A_{\text{new}} = \tfrac{1}{2}(0.75)^2 = 0.28125$ and an on-level factor of $1.0699$, against the correct $1.0476$, overstating Calendar Year 2024's on-level premium by $2.1\%$.
