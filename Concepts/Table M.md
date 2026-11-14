---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:6f76f4408665ba6963fdbd5a63d3eb33019c36ad8e55589b092f824db41bd880
  sources:
    - "Fisher et al., Individual Risk Rating (CAS Exam 8 study note, 2019), Ch.3 PDF pp.45-49, 58, 66-75, 78-79, 89-90, 94-97, 115, 119, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Table M.md
---
**Table M** is a table of insurance charges and insurance savings by entry ratio and by size of risk. It prices an aggregate limit, a [[Retrospective Rating|retro]] maximum or minimum, or an aggregate deductible limit on a [[Large Deductible Policy|large deductible]].

## The entry ratio

A risk's entry ratio is its actual aggregate loss divided by its expected aggregate loss:

> $$r = \frac{A}{E}$$

- $A$ is the risk's actual aggregate loss.
- $E$ is its expected aggregate loss.

Entry ratios can be computed from aggregate loss ratios instead of dollars. A risk's entry ratio is then its actual aggregate loss ratio divided by the expected loss ratio of its group, typically the group's average loss ratio.

## Insurance charge and insurance savings

The insurance charge $\phi(r)$ is the expected loss above $rE$, as a fraction of $E$. With $F$ the distribution of the entry ratio $Y = A/E$, the charge is

> $$\phi(r) = \int_r^{\infty} (y - r)\, dF(y)$$

The insurance savings $\psi(r)$ is the expected amount by which aggregate loss falls short of $rE$, as a fraction of $E$, and it is

> $$\psi(r) = \int_0^{r} (r - y)\, dF(y)$$

The savings follow from the charge:

> $$\psi(r) = \phi(r) + r - 1$$

So $\psi(1) = \phi(1)$, which checks a table. The dollar charge is $\phi(r) \times E$.

The charge has a fixed shape. $\phi(0) = 1$, because all of the expected loss lies above zero. $\phi(r)$ decreases in $r$, with slope $\phi'(r) = -S(r)$, and it is convex, with $\phi''(r) = f(r) \geq 0$. $\phi(r) = 0$ at and above the largest possible entry ratio, since no aggregate loss exceeds it. The savings $\psi(r)$ starts at $0$ and increases without bound.

## Building an empirical Table M

1. Group risks expected to have similar aggregate loss distributions: in practice, similar size and similar hazards (for example, workers compensation risks with between 35 and 40 expected claims).
2. For each risk, divide its actual aggregate loss by the group's expected loss, typically the group's average actual aggregate loss. With any other estimate, the empirical $\phi(0)$ will not equal 1. Sort the entry ratios.
3. Compute the charges by vertical or horizontal slicing.

Vertical slicing works per risk: at each $r$, it averages every risk's excess $\max(r_i - r, 0)$ over all risks. It is easy to explain but laborious for many entry ratios. Horizontal slicing works per layer. It starts with a charge of 0 at the largest entry ratio and works upward, so the charge at the next lower entry ratio $r_i$ is

> $$\phi(r_i) = \phi(r_{i+1}) + (r_{i+1} - r_i)\, P(Y > r_i)$$

- $P(Y > r_i)$ is the percentage of risks whose entry ratio exceeds $r_i$.

The two methods give the same charges when horizontal slices are taken at every data point. Charges between observed entry ratios are interpolated, and the recursion must end at $\phi(0) = 1$.

> [!example]- What are the Table M charges for these ten risks, and what is $\psi(1.0)$? {Example}
> Ten risks of about 500 expected claims each have these aggregate losses (in \$000):
>
> | Risk | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
> | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
> | Loss | 1,000 | 2,500 | 3,000 | 3,500 | 4,000 | 4,000 | 4,500 | 5,000 | 7,500 | 15,000 |
>
> > [!answer]-
> > - The average loss is $\$5{,}000$K, so the entry ratios are $0.2$, $0.5$, $0.6$, $0.7$, $0.8$, $0.8$, $0.9$, $1.0$, $1.5$ and $3.0$.
> > - Start at the top with $\phi(3.0) = 0$.
> > - One risk in ten is above $1.5$, so $\phi(1.5) = 0 + 1.5 \times 10\% = 0.15$.
> > - Two are above $1.0$, so $\phi(1.0) = 0.15 + 0.5 \times 20\% = 0.25$.
> > - Continuing down gives $\phi(0.9) = 0.28$, $\phi(0.8) = 0.32$, $\phi(0.7) = 0.38$, $\phi(0.6) = 0.45$, $\phi(0.5) = 0.53$, $\phi(0.2) = 0.80$ and $\phi(0) = 1$.
> > - By vertical slicing at $r = 1.2$, only the risks at $1.5$ and $3.0$ are above the line, so $\phi(1.2) = (0.3 + 1.8)/10 = 0.21$.
> > - The savings is $\psi(1.0) = 0.25 + 1.0 - 1 = 0.25$.

Where data are thin, the aggregate distribution can instead be modelled from fitted frequency and severity distributions and sliced the same way. A model avoids gaps between empirical entry ratios, but if its assumptions are wrong it gives plausible, precise and misleading charges.

## Size of risk and expected loss groups

Table M is entered by size, because the distribution of entry ratios depends on it. The higher the expected number of claims, the lower the variance of the entry ratio and the smaller the charge for entry ratios above 1. A smaller risk therefore has a larger charge above $r = 1$ than a larger risk at the same entry ratio.

The NCCI's 1998 Table M was published by **Expected Loss Group (ELG)** rather than by expected claim count. To find the column, the expected loss $E$ (standard premium times the expected loss ratio) is first multiplied by the **state/hazard group relativity**. A risk expected to have more severe claims is treated as having fewer expected claims, and so as a smaller, more variable risk than one with the same expected loss. The adjusted figure only selects the ELG. The dollar charge is the table's factor times the unadjusted expected loss.

The ELG table's dollar ranges change over time with inflation, and grouping by expected claim count is less subject to inflation. If the ranges are not updated, an inflated expected loss falls in a larger ELG than the risk's claim count warrants, and the risk is given the charge of a larger risk.

> [!example]- Which ELG column is used for this risk, and what is the dollar charge? {Example}
> A workers compensation risk has expected aggregate losses of $\$760{,}000$ and a state/hazard group relativity of $0.9$, and it buys a maximum at an entry ratio of $1.5$. In the ELG table, $\$630{,}000$–$\$720{,}000$ is ELG 31 and $\$720{,}001$–$\$830{,}000$ is ELG 30. That column's $\phi(1.5)$ is $0.19$ (an illustrative value).
>
> > [!answer]-
> > - The adjusted expected loss is $\$760{,}000 \times 0.9 = \$684{,}000$, which falls in ELG 31.
> > - Unadjusted, the risk would sit in ELG 30, so the relativity moves it to the charges of a smaller, more variable risk.
> > - The charge is priced on the unadjusted expected loss: $0.19 \times \$760{,}000 = \$144{,}400$.

## Table M compared with Table L

With a per-occurrence loss limit, "Table M" means the unlimited table, and the table for limited losses is Table M$_D$. The NCCI's countrywide Table M is built on unlimited aggregate losses and indexed by size and entry ratio. When it was entered by ELG, it was kept current for inflation by updating the ELG table. Through [[Insurance Charge Reflecting Loss Limitation (ICRLL)|ICRLL]], the one unlimited table gave reasonable charges for any per-occurrence loss limit, charges that would otherwise have needed a large number of Tables M$_D$. ICRLL is only an approximation to Table M$_D$, though.

[[Table L]], named for Skurnick's California Table L, prices the per-occurrence excess and the aggregate excess together as one factor of expected unlimited loss. It needs one table for each per-occurrence limit. It is calculated directly from the limited loss distribution, so it does not double count the losses the two limits overlap on. The pictures behind all of these formulas are [[Lee Diagram|Lee diagrams]].

> [!trap] Pricing the charge on the adjusted expected loss
> The state/hazard group relativity selects the ELG column only. Multiplying the table's factor by the adjusted expected loss misprices the charge. In the example above it would give $0.19 \times \$684{,}000 = \$129{,}960$ instead of $\$144{,}400$.
