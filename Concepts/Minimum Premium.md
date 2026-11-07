---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-13
  last_checked_by: agent:validate-v1
  content_hash: sha256:9bc602e60ed86afe8de91ca0ebff18116d060f8b475f1adc19ec729c7e495459
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.2 'Rating Manuals', printed pp.13, 16, 27-28 and 31-32 (PDF pp.25, 28, 39-40, 43-44), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Minimum Premium.md
---

![[Media/Figures/Minimum_Premium.svg|340]]

A **Minimum Premium** is the floor below which an insurer will not write a policy, whatever the rated exposure. It is intended to ensure that, on an individual risk basis, premium covers the expected [[Fixed Expenses|fixed expenses]] plus some minimum expected loss. With a minimum premium, the premium of a policy is

> $$\text{Premium} = \max\!\left(\text{Rate} \times \text{Exposure},\; \text{Minimum Premium}\right)$$

- $\text{Rate}$ is the rate per unit of exposure, after the risk's relativities.
- $\text{Exposure}$ is the policy's number of units of the [[Exposure Base|exposure base]].

Most insurers that use a minimum premium have no additive fixed expense fee in their [[Rating Algorithm|rating algorithm]]. The algorithm states where in its sequence the minimum applies, for example after all discounts.

> [!example]- A liability rate is $\$4.00$ per $\$1{,}000$ of receipts, with a minimum premium of $\$750$. What is the premium for a contractor with $\$150{,}000$ of receipts, and at what receipts does the minimum stop binding? {Example}
> - The rated premium is $4.00 \times 150{,}000/1{,}000 = \$600$.
> - Since $\$600 < \$750$, the minimum applies and the charge is $\$750$.
> - The rated premium reaches the minimum at $(750/4.00) \times 1{,}000 = \$187{,}500$ of receipts.
> - Every insured below $\$187{,}500$ of receipts pays $\$750$, so the effective rate per $\$1{,}000$ falls as the risk grows, from $\$7.50$ at $\$100{,}000$ to $\$4.00$ at the crossover.

## Effect of a minimum premium on total premium

A minimum premium raises the total premium of a book, so when rates are calculated its effect is

> $$\text{Effect} = \frac{\text{Premium With Minimum}}{\text{Premium Without Minimum}} - 1.0$$

A percentage rate change does **not** flow through evenly to policies sitting at the minimum. Raising the base rate $8\%$ changes nothing for a risk already at the floor, so the achieved rate change on a book with many minimum-premium policies is less than the filed one.

> [!example]- A book has 900 policies with rated premiums averaging $\$800$, above the minimum, and 100 policies with rated premiums averaging $\$300$. What is the effect of a $\$400$ minimum premium? {Example}
> - Without the minimum, the premium is $900 \times 800 + 100 \times 300 = \$750{,}000$.
> - With it, the 100 small policies pay $\$400$ each, and the premium is $900 \times 800 + 100 \times 400 = \$760{,}000$.
> - The effect is $760{,}000/750{,}000 - 1.0 = +1.3\%$.

## Setting the minimum premium

The minimum is set from the costs of the smallest risks the insurer writes. Set too high, it prices the insurer out of desirable small accounts. Set too low, it writes small policies at a loss, and the loss does not show in the aggregate indication, so minimum premiums are reviewed separately.

> [!example]- Fixed expenses are $\$95$ per policy, variable expenses 23% and the target profit 5%. The smallest risks written have an expected loss cost of about $\$110$. What minimum premium is indicated, and what happens at a $\$200$ minimum? {Example}
> - The premium that covers the smallest risk's costs is $(110 + 95)/(1 - 0.23 - 0.05) = 205/0.72 = \$284.72$, so a minimum of about $\$285$ is indicated.
> - At a $\$200$ minimum, each such policy keeps $200 \times (1 - 0.23) = \$154$ after variable expenses.
> - Against $\$110$ of loss and $\$95$ of fixed expense, **each policy loses $\$51$**, before any profit.

The minimum premium of a policy is distinct from the **minimum retrospective premium**, the floor of a [[Retrospective Rating|retrospective rating]] plan, and from a **deposit premium**, an advance against an auditable exposure ([[Premium Audit|premium audit]]).
