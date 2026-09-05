---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c1783993faf5f023959da9d9d3be4f088d37c4e7ead5cabd86afd7e78eff774f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Employment Insurance.md
---

**Employment Insurance** (EI) is Canada's federal [[Social Insurance|social insurance]] program providing temporary income replacement to workers who lose employment through no fault of their own, plus special benefits for sickness, maternity, parental and compassionate care. It is compulsory, funded by employee and employer premiums on insurable earnings, and administered federally — one of the few insurance programs in Canada that is entirely federal.

> $$\text{Weekly benefit} = 0.55 \times \text{Average weekly insurable earnings}$$

- **Structure:** a benefit rate of $55\%$ of average insurable earnings up to a maximum insurable earnings ceiling, subject to a qualifying period measured in insured hours, a waiting period, and a benefit duration that varies with hours worked and **regional unemployment rate**.
- **Financing.** Employees pay a premium rate on insurable earnings; employers pay $1.4$ times the employee rate. The account is intended to break even over a business cycle, with the rate set by a seven-year break-even mechanism — an explicit attempt to prevent the surplus-accumulation and deficit-crisis pattern of earlier decades.
- **Why it must be compulsory.** Unemployment is the archetypal [[Adverse Selection]] risk: only workers who expect to lose their jobs would buy voluntary coverage, and the private market has never sustainably offered it.
- **[[Moral Hazard]] is the central design problem.** A benefit that replaces too much income for too long reduces the incentive to return to work; regional variation in entitlement is criticised for subsidising seasonal industries and discouraging mobility. Against that, the program's stabilising effect in a recession is its clearest benefit — payments rise automatically exactly when the economy needs demand.
- **Experience rating is largely absent.** Unlike [[Workers Compensation Insurance]], employers pay a uniform multiple of the employee rate regardless of their layoff record, so an industry that lays off seasonally is subsidised by one that does not.
- **Interaction with private insurance:** EI sickness benefits are short and capped, so group short-term and long-term disability coverage is built on top of them, and disability insurers integrate EI as a [[Collateral Benefits|collateral benefit]].

> [!example]- Replacement Rate and the Ceiling {Example}
> Three workers become unemployed, with average weekly insurable earnings of $\$700$, $\$1{,}200$ and $\$2{,}400$. Maximum insurable earnings correspond to $\$1{,}200$ per week.
>
> Compute each benefit and the effective replacement rate, and comment.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Worker A} &= 0.55 \times \$700 = \$385 \\
> > \text{Worker B} &= 0.55 \times \$1{,}200 = \$660 \\
> > \text{Worker C} &= 0.55 \times \$1{,}200 = \$660
> > \end{align*}$$
> >
> > Effective replacement rates:
> >
> > $$\begin{align*}
> > \text{A} &= \frac{\$385}{\$700} = 55\% \\[4pt]
> > \text{B} &= \frac{\$660}{\$1{,}200} = 55\% \\[4pt]
> > \text{C} &= \frac{\$660}{\$2{,}400} = 27.5\%
> > \end{align*}$$
> >
> > **What the ceiling does.** Above the maximum, the program becomes progressively less useful: Worker C pays premiums on only the first $\$1{,}200$ but replaces barely a quarter of their income. The ceiling caps the program's cost and its redistribution, and it creates the market for private income protection above it.
> >
> > **The design tension.** Raising the ceiling improves adequacy for higher earners but raises cost and weakens the return-to-work incentive; lowering the replacement rate does the reverse. There is no actuarially correct answer — it is the [[Social Insurance|social adequacy versus individual equity]] trade-off, and the actuary's contribution is to price each option and state the incentive effect, not to choose.
