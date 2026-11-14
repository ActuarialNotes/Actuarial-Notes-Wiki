---
aliases:
  - PRTs-longevity Swap
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4ba0aaef5f9aa440d9d84a969fcffada9761b34f42cd5fff75b4ca8005c564a5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pension Risk Transfer.md
---
**Pension Risk Transfer** (PRT) is the transfer of some or all of the risks of a [[Defined Benefit Plan|defined benefit pension plan]] from the plan sponsor to an insurer or reinsurer. Its three main forms are:

| Form | What the insurer provides | Who keeps the liability |
| --- | --- | --- |
| Buy-out | Annuities issued to the members, who become its policyholders | The insurer: the plan's obligation is settled |
| Buy-in | A bulk annuity contract held by the plan as an asset | The plan, whose members remain members |
| Longevity swap | Benefits actually paid, in exchange for a fixed schedule plus a fee | The plan, which keeps its assets and investment risk |

A buy-out settles the obligation, and the plan's liability for those members leaves its balance sheet. In the U.S. that usually means a settlement charge and, for a full buy-out, a [[Plan Termination|plan termination]]. A buy-in matches the liability in investment and longevity terms, and it can later be converted to a buy-out. A longevity swap transfers only [[Longevity Risk|longevity risk]].

## Buy-out and buy-in pricing

The single premium for a buy-out or buy-in is

> $$P = \sum_{t \ge 1} \frac{\mathrm{E}\left[B_t\right]}{(1+j)^{t}} + \text{loads}$$

- $\mathrm{E}[B_t]$ is the expected benefits paid in year $t$ on the insurer's mortality basis.
- $j$ is the discount rate the insurer can support with its backing assets, net of expected defaults.
- The loads cover expenses, capital and profit.

The insurer builds its mortality basis from a base table, the plan's own experience or postcode and benefit-size factors, and an improvement scale. It discounts at the yield on the assets it will buy, often including private credit and mortgages, less default and expense allowances. Deferred members cost more than retirees because their options and longer duration are uncertain.

> [!example]- What buy-out premium does this quote imply? {Example}
> A plan's retiree liability is $\$100$ million on its accounting basis, discounted at 5.2%, with a modified duration of 10. An insurer's quote for a buy-out implies a discount rate of 4.8% on the same mortality. Estimate the premium with a first-order duration approximation.
>
> > [!answer]-
> > - The insurer's rate is 0.4% lower, so the premium is higher than the accounting liability.
> > - $P \approx 100 \times (1 + 10 \times 0.004) = 104.0$.
> > - The premium is about $\$104$ million, or 104% of the accounting liability. The sponsor pays the extra $\$4$ million to remove the investment, longevity and expense risk for good, and in the U.S. it also stops paying PBGC premiums on those members.

## Longevity swap

In a longevity swap the hedger pays a fixed leg, the expected benefits plus a fee, and receives a floating leg, the benefits actually paid. The net payment to the hedger in year $t$ is

> $$\text{Net}_t = B^{\text{act}}_t - (1+f)\,B^{\text{exp}}_t$$

- $B^{\text{act}}_t$ is the floating leg, the benefits actually paid.
- $B^{\text{exp}}_t$ is the fixed leg's schedule of benefits, set at the start from an agreed mortality table with improvements.
- $f$ is the fee.

The fixed leg is set from the table at the start and does not update when actual mortality differs. The swap transfers no investment or interest rate risk, so a plan that wants those gone needs a buy-in or buy-out.

> [!example]- What is the net settlement if 1,985 pensioners survive, and if 1,955 survive? {Example}
> A plan hedges 2,000 pensioners who each receive $\$24{,}000$ at the end of the year if alive. The fixed leg assumes 1,960 survivors, from the agreed table, and carries a fee of 1%.
>
> > [!answer]-
> > - The fixed leg is $1.01 \times 1{,}960 \times 24{,}000 = 47{,}510{,}400$.
> > - With 1,985 survivors the floating leg is $1{,}985 \times 24{,}000 = 47{,}640{,}000$, so the net is $+129{,}600$. More members live than expected, and the counterparty pays the plan $\$129{,}600$ toward the extra benefits.
> > - With 1,955 survivors the floating leg is $1{,}955 \times 24{,}000 = 46{,}920{,}000$, so the net is $-590{,}400$. The plan pays $\$590{,}400$, which it can afford because it pays out less in benefits.
> > - Either way the plan's cost is the fixed leg, so its longevity risk is gone for the year.

## Reinsurance of PRT

Insurers that write the annuities in turn reinsure them. They cede longevity risk through longevity reinsurance, which works like a longevity swap and is often written by large global reinsurers looking for an offset to their mortality business. They cede the whole contract, assets included, through asset-intensive annuity coinsurance, frequently to a Bermuda reinsurer, as described under [[Offshore Reinsurance]].

## The U.S. and Canadian markets

The U.S. market is larger and mostly buy-outs. Many U.S. deals lift out retirees with small benefits to cut per-member PBGC premiums. Canada's market is smaller, uses buy-ins as well as buy-outs, and has seen longevity insurance for large plans. Canadian annuity purchases may include inflation indexing, and provincial and federal pension law governs when a purchase discharges the administrator.

> [!trap] Treating a buy-in as a settlement
> A buy-in is a plan asset, and the liability stays with the plan. Only a buy-out settles the obligation and removes the members from the plan.
