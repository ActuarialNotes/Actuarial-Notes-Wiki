---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e932f3b84a7e5810d370d49c0e29208726686d53d613084e15047053ad7986c8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Employment Insurance.md
---

![[Media/Figures/Employment_Insurance.svg|340]]

**Employment Insurance** (EI) is Canada's federal [[Social Insurance|social insurance]] program providing temporary income replacement to workers who lose employment through no fault of their own, plus special benefits for sickness, maternity, parental and compassionate care. It is compulsory, funded by employee and employer premiums on insurable earnings, and administered entirely by the federal government.

The benefit is $55\%$ of average weekly insurable earnings, which are capped at the maximum insurable earnings, so the weekly benefit is

> $$\text{Weekly benefit} = 0.55 \times \min\big(\text{Average weekly insurable earnings},\ \text{Maximum}\big)$$

- $\text{Maximum}$ is the maximum insurable earnings, expressed per week.

Entitlement also depends on a qualifying period measured in insured hours, a waiting period, and a benefit duration that varies with hours worked and the regional unemployment rate.

> [!example]- With a weekly maximum of $\$1{,}200$, what replacement rates do workers earning $\$700$, $\$1{,}200$ and $\$2{,}400$ a week get? {Example}
> - The benefits are $0.55 \times \$700 = \$385$, $0.55 \times \$1{,}200 = \$660$ and $0.55 \times \$1{,}200 = \$660$.
> - The first two replace $\$385/\$700 = \$660/\$1{,}200 = 55\%$ of earnings.
> - The third replaces $\$660/\$2{,}400 = 27.5\%$, because premiums and benefits stop at the maximum.
> - The ceiling caps the program's cost and its redistribution, and leaves a market for private income protection above it.
> - The replacement rates are $55\%$, $55\%$ and $27.5\%$.

## Financing

Employees pay a premium rate on insurable earnings, and employers pay $1.4$ times the employee rate. The account is intended to break even over a business cycle, with the rate set by a seven-year break-even mechanism. That mechanism is meant to prevent the surplus accumulation and deficit crises of earlier decades.

Experience rating is largely absent. Unlike [[Workers Compensation Insurance|workers compensation]], employers pay a uniform multiple of the employee rate regardless of their layoff record, so an industry that lays off seasonally is subsidised by one that does not.

## Why EI is compulsory

Unemployment is the archetypal [[Adverse Selection|adverse selection]] risk. Only workers who expect to lose their jobs would buy voluntary coverage, and the private market has never sustainably offered it.

## Moral hazard and the design trade-off

[[Moral Hazard]] is the central design problem. A benefit that replaces too much income for too long reduces the incentive to return to work, and regional variation in entitlement is criticised for subsidising seasonal industries and discouraging mobility. Against that, payments rise automatically in a recession, which stabilises demand.

Raising the ceiling improves adequacy for higher earners but raises cost and weakens the return-to-work incentive. Lowering the replacement rate does the reverse. This is the [[Social Insurance|social adequacy versus individual equity]] trade-off, and the actuary's contribution is to price each option and state its incentive effect, not to choose.

## Interaction with private insurance

EI sickness benefits are short and capped, so group short-term and long-term disability coverage is built on top of them. Disability insurers integrate EI as a [[Collateral Benefits|collateral benefit]].

> [!trap] Applying 55% to earnings above the maximum
> The $55\%$ applies only up to the maximum insurable earnings. A worker earning twice the maximum receives the same benefit as one earning exactly the maximum, so the effective replacement rate falls below $55\%$.
