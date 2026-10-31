---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:5e19bf6848a5ad2e6357711ceb3eeae3de030166111a0d99c22d970bb63bf53a
  sources:
    - "Fisher et al., Individual Risk Rating (CAS Exam 8 study note, 2019), Ch.3 PDF pp.45-49, 58, 66-75, 78-79, 89-90, 94-97, 115, 119, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Table M.md
---

**Table M** is a table of aggregate excess loss factors — insurance charges $\phi(r)$ and insurance savings $\psi(r)$ — by **entry ratio** $r$ and by size of risk, used to price an aggregate limit, a [[Retrospective Rating|retro]] maximum or minimum, or an aggregate deductible limit on a [[Large Deductible Policy|large deductible]]. The entry ratio is a risk's actual aggregate loss divided by its expected aggregate loss, $r = A/E$.

> $$\phi(r) = \mathrm{E}\!\left[\max\!\left(\tfrac{A}{E} - r,\ 0\right)\right] = \int_r^{\infty} (y - r)\, dF(y)$$

> $$\psi(r) = \mathrm{E}\!\left[\max\!\left(r - \tfrac{A}{E},\ 0\right)\right] = \int_0^{r} (r - y)\, dF(y)$$

> $$\psi(r) = \phi(r) + r - 1$$

- $A$ is the risk's actual aggregate loss, $E$ its expected aggregate loss, and $F$ the distribution of the entry ratio $Y = A/E$. The **insurance charge** $\phi(r)$ is the expected loss above $rE$, as a fraction of $E$; the **insurance savings** $\psi(r)$ is the expected amount by which aggregate loss falls short of $rE$, as a fraction of $E$. The dollar charge is $\phi(r) \times E$.
- Entry ratios can be computed from aggregate loss ratios instead of dollars: a risk's entry ratio is its actual aggregate loss ratio divided by the expected loss ratio of its group, typically the group's average loss ratio, so an entry ratio of $r$ is a loss ratio of $r$ times the average.
- **Properties of the charge.** $\phi(0) = 1$, because all of the expected loss lies above zero. $\phi(r)$ is decreasing in $r$, with slope $\phi'(r) = -S(r)$, and convex, with $\phi''(r) = f(r) \geq 0$. $\phi(r) = 0$ at and above the largest possible entry ratio, since no aggregate loss exceeds it. The savings $\psi(r)$ starts at $0$ and increases without bound.
- **Size of risk.** Table M is entered by size, because the distribution of entry ratios depends on it. The higher the expected number of claims, the lower the variance of the entry ratio and the smaller the Table M charge for entry ratios above 1. So a smaller risk (fewer expected claims) has a larger charge above $r = 1$ than a larger risk at the same entry ratio.
- **Expected loss groups.** The NCCI's 1998 Table M was published by **Expected Loss Group (ELG)** rather than by expected claim count. To find the column, the expected loss $E$ (standard premium times the expected loss ratio) is first multiplied by the **state/hazard group relativity**: a risk expected to have more severe claims is treated as having fewer expected claims, and so as a smaller, more variable risk than one with the same expected loss. The adjusted figure only selects the ELG; the charge in dollars is the table's factor times the unadjusted expected loss. The ELG table's dollar ranges change over time with inflation (grouping by expected claim count is less subject to inflation). If the ranges are not updated, an inflated expected loss falls in a larger ELG than the risk's claim count warrants, and the risk is given the charge of a larger risk.
- With a per-occurrence loss limit, "Table M" means the unlimited table. The table for limited losses is Table M$_D$, the combined per-occurrence and aggregate table is [[Table L]], and the NCCI's adjustment of the unlimited table for a loss limit is [[Insurance Charge Reflecting Loss Limitation (ICRLL)|ICRLL]]. The pictures behind every one of these formulas are [[Lee Diagram|Lee diagrams]].

> [!idea] The idea
> The charge is the expected slice of the aggregate loss distribution sitting above the line $rE$, so it can only shrink as the line rises, and it shrinks fastest where many risks still lie above the line. A small risk's outcomes are spread wide — a few claims, sometimes one huge one — so more of its expected loss sits far above the mean, and its charge at $r = 1.5$ is much larger than a big risk's.

## Building an empirical Table M

1. **Group** risks expected to have similar aggregate loss distributions — in practice, similar size and similar hazards (for example, workers compensation risks with between 35 and 40 expected claims).
2. **Compute entry ratios.** For each risk, divide its actual aggregate loss by the group's expected loss, typically the group's average actual aggregate loss (with any other estimate, the empirical $\phi(0)$ will not equal 1). Sort the entry ratios.
3. **Compute the charges**, by either method:
   - *Vertical slicing* (per risk): at each $r$, average every risk's excess $\max(r_i - r, 0)$ over all risks. It is easy to explain but laborious for many entry ratios.
   - *Horizontal slicing* (per layer): for each entry ratio, find the percentage of risks whose entry ratio exceeds it. Then start with a charge of 0 at the largest entry ratio and work upward:

> $$\phi(r_i) = \phi(r_{i+1}) + (r_{i+1} - r_i) \times \Pr(\text{entry ratio} > r_i)$$

- The two methods give the same charges when horizontal slices are taken at every data point. Savings then follow from $\psi(r) = \phi(r) + r - 1$, and charges between observed entry ratios are interpolated.
- Where data are thin, the aggregate distribution can instead be modelled from fitted frequency and severity distributions and sliced the same way. A model avoids gaps between empirical entry ratios, but if its assumptions are wrong it gives plausible, precise and misleading charges.

## Table M compared with Table L

- **Table M** (the NCCI's countrywide Table of Aggregate Loss Factors) is built on unlimited aggregate losses and indexed by size and entry ratio. When it was entered by ELG, it was kept current for inflation by updating the ELG table, and through ICRLL a single unlimited table gave reasonable charges for any per-occurrence loss limit — charges that would otherwise have needed a large number of Tables M$_D$. ICRLL is only an approximation to Table M$_D$, though.
- **[[Table L]]**, named for Skurnick's California Table L, prices the per-occurrence excess and the aggregate excess together as one factor of expected unlimited loss. It needs one table for each per-occurrence limit, and it is calculated directly from the limited loss distribution, so it does not double count the losses the two limits overlap on.

> [!example]- Horizontal Slicing of Ten Risks {Example}
> Ten risks of about 500 expected claims each have aggregate losses (in \$000) of $1{,}000$, $2{,}500$, $3{,}000$, $3{,}500$, $4{,}000$, $4{,}000$, $4{,}500$, $5{,}000$, $7{,}500$ and $15{,}000$. Build the Table M charges at the observed entry ratios, and find $\psi(1.0)$.
>
> > [!answer]-
> > **Entry ratios.** The average is $\$5{,}000$K, so the entry ratios are $0.2, 0.5, 0.6, 0.7, 0.8, 0.8, 0.9, 1.0, 1.5, 3.0$.
> >
> > **Work up from the top**, adding (width to the next entry ratio) × (share of risks above):
> >
> > $$
> > \begin{align*}
> > \phi(3.0) &= 0 \\
> > \phi(1.5) &= 0 + 1.5 \times 10\% \\
> > &= 0.15 \\
> > \phi(1.0) &= 0.15 + 0.5 \times 20\% \\
> > &= 0.25 \\
> > \phi(0.9) &= 0.25 + 0.1 \times 30\% \\
> > &= 0.28 \\
> > \phi(0.8) &= 0.28 + 0.1 \times 40\% \\
> > &= 0.32
> > \end{align*}
> > $$
> >
> > Continuing gives $\phi(0.7) = 0.38$, $\phi(0.6) = 0.45$, $\phi(0.5) = 0.53$, $\phi(0.2) = 0.80$ and $\phi(0) = 1$.
> >
> > **Savings:** $\psi(1.0) = 0.25 + 1.0 - 1 = 0.25$.
> >
> > Check one value by vertical slicing: at $r = 1.2$ only the risks at $1.5$ and $3.0$ are above the line, so $\phi(1.2) = (0.3 + 1.8)/10 = 0.21$. *(Fisher et al., Exhibits 3.12–3.20.)*

> [!example]- Choosing the Expected Loss Group {Example}
> A workers compensation risk has expected aggregate losses of $\$760{,}000$ and a state/hazard group relativity of $0.9$, and buys a maximum at an entry ratio of $1.5$. In the ELG table, $\$630{,}000$–$\$720{,}000$ is ELG 31 and $\$720{,}001$–$\$830{,}000$ is ELG 30. Which column is used, and what is the dollar charge if that column's $\phi(1.5)$ is $0.19$ (an illustrative value)?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Adjusted } E &= \$760{,}000 \times 0.9 \\
> > &= \$684{,}000 \;\Rightarrow\; \text{ELG 31} \\
> > \text{Charge} &= 0.19 \times \$760{,}000 \\
> > &= \$144{,}400
> > \end{align*}
> > $$
> >
> > Unadjusted, the risk would sit in ELG 30; the relativity moves it one column, to the charges of a smaller (more variable) risk. The adjusted figure picks the column, and the unadjusted $E$ prices it.

> [!tip]- How it appears on the exam
> - **Exam 8** gives a handful of risks' aggregate losses or loss ratios and asks for a Table M by vertical or horizontal slicing, then a charge or savings at an entry ratio between the rows.
> - It gives standard premium, an expected loss ratio, a state/hazard group relativity and excerpts of the ELG and Table M tables, and asks for the charge for a maximum or an aggregate deductible limit.
> - It asks why charges are larger for smaller risks, what happens when the ELG ranges are not updated for inflation, and how Table M compares with Table L.

> [!warning]- Exam traps
> - **Starting the recursion at the wrong end:** horizontal slicing starts from 0 at the *largest* entry ratio and adds upward; $\phi(0)$ must come out at 1.
> - **Pricing with the adjusted loss:** the state/hazard group relativity selects the column only. Multiplying the factor by the adjusted expected loss misprices the charge.
> - **Mixing up charge and savings:** $\psi(r) = \phi(r) + r - 1$, not $\phi(r) - r + 1$; check that $\psi(1) = \phi(1)$.
