---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:1e0199cfa6a6b7dd18ec2ce8f07b9b5c39f9e3ff209ddf80b5446a5900868e4f
  sources:
    - "Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), §6.1 eqs.6.1-6.7, PDF pp.175-176; Example 6.3 and ILF eq.6.15 with ALAE factor (1+u), PDF p.179, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Expenses.md
---

**Expenses** are an insurer's costs of providing insurance other than the loss payments themselves. They come in two kinds, **loss adjustment expense** (LAE), the cost of settling claims, and **underwriting expense**, the cost of acquiring and servicing policies, so

> $$\text{Expenses} = \text{LAE} + \text{Underwriting Expenses}$$

- $\text{LAE}$ splits into [[Allocated Loss Adjustment Expense|ALAE]] (defence and experts, charged to a specific claim) and [[Unallocated Loss Adjustment Expenses ULAE|ULAE]] (the overhead of the claims department).
- $\text{Underwriting Expenses}$ are commissions and brokerage, other acquisition, general expenses, and premium taxes, licences and fees.

Together they drive the [[Expense Ratio|expense ratio]].

## Fixed and variable expenses

In a rate, [[Variable Expenses|variable expenses]] rise with premium and [[Fixed Expenses|fixed expenses]] are a dollar amount per exposure or per policy ([[Expense Provisions]]). If variable expenses plus the loads for profit and risk are the fraction $v$ of the final premium, and fixed expenses are $f$ per exposure unit, the premium for $m$ exposure units with pure premium $p$ is

> $$P = \frac{m(p + f)}{1 - v}$$

In words, premium equals expected loss plus fixed expense, divided by one minus the sum of the variable expense, commission, tax, profit and risk percentages. With no fixed expense the premium is the expected loss times the loss-cost multiplier $1/(1 - v)$.

A load stated as a percentage of premium goes in the denominator. LAE stated as a percentage of loss multiplies the loss in the numerator, as in Bahnemann's severity $E[X; l](1 + u)$ with ALAE at $u$ of indemnity. Underwriting profit can be zero, or even negative in anticipation of investment income. A negative profit load is added back, which increases the denominator $1 - v$ and lowers the premium.

Much of the cost of servicing an account doesn't grow with its size, so the expense *ratio* falls as premium grows. Large risks get premium discounts for that reason.

> [!example]- An insurer's costs are $\$400$ per policy plus $15\%$ of premium. What is the expense ratio on a $\$5{,}000$ policy and on a $\$500{,}000$ account? {Example}
> - On the small policy the expense ratio is $400/5{,}000 + 0.15 = 23.0\%$.
> - On the large account it is $400/500{,}000 + 0.15 = 15.08\%$.
> - A flat $23\%$ load would overcharge the large account by $0.0792 \times 500{,}000 = \$39{,}600$.
> - Large-risk rating plans therefore grade the expense provision by size.

## Expenses in a retrospective rating plan

In individual risk rating what matters is which expenses move with the insured's own losses. Only those are recalculated when a policy is [[Retrospective Rating|retrospectively rated]] after it expires. The retrospective premium is

> $$R = (\text{BP} + \text{LCF} \times L) \times \text{TM}$$

- $L$ is the insured's actual limited losses.
- $\text{LCF}$ is the loss conversion factor. It carries the LAE, which tracks losses, so it responds to actual experience.
- $\text{TM}$ is the tax multiplier. It carries premium taxes and assessments, which are levied on whatever premium is finally charged.
- $\text{BP}$ is the basic premium. It carries the remaining expenses (acquisition and general) plus the net insurance charge for the plan's maximum and minimum, and does not respond to losses.

The basic premium is

> $$\text{BP} = e - (\text{LCF} - 1)\,E + \text{LCF} \times I$$

- $e$ is the expense provision excluding taxes.
- $E$ is expected losses.
- $I$ is the net insurance charge in loss dollars.

Subtracting $(\text{LCF}-1)E$ removes the LAE that the conversion factor will collect, so it isn't charged twice.

> [!example]- What are the basic and retrospective premiums for this plan, and which expense provisions responded? {Example}
> A retro plan has standard premium $\$500{,}000$, expected losses $E = \$325{,}000$ and an expense provision excluding taxes (LAE included) of $e = \$110{,}000$. The terms are $\text{LCF} = 1.12$, net insurance charge $I = \$30{,}000$ and $\text{TM} = 1.03$. Actual limited losses come in at $\$250{,}000$, inside the plan's limits.
>
> > [!answer]-
> > - The basic premium is $110{,}000 - 0.12 \times 325{,}000 + 1.12 \times 30{,}000 = \$104{,}600$.
> > - Before taxes, the premium is $104{,}600 + 1.12 \times 250{,}000 = \$384{,}600$.
> > - The retrospective premium is $384{,}600 \times 1.03 = \$396{,}138$.
> > - The LAE collected is $0.12 \times 250{,}000 = \$30{,}000$, against $\$39{,}000$ expected, so it responded to the good year.
> > - Taxes of $0.03 \times 384{,}600 = \$11{,}538$ responded to the lower premium. The $\$104{,}600$ basic premium was fixed at inception.
> > - On average the plan's limits remove $I$ of losses, so $E[R] = (104{,}600 + 1.12 \times 295{,}000) \times 1.03 = \$448{,}050$. That equals $(e + E) \times \text{TM}$, so the plan is balanced.
