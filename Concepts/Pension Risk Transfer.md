---
aliases:
  - PRTs-longevity Swap
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e31c5b6540f7e13329771f7d83ec73d9baf924c6cb1d2c8e4e7131b4dd2e2714
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pension Risk Transfer.md
---
**Pension Risk Transfer** (PRT) is the transfer of some or all of the risks of a [[Defined Benefit Plan|defined benefit pension plan]] from the plan sponsor to an insurer or reinsurer. The three main forms are the buy-out, the buy-in and the longevity swap. A buy-out settles the obligation, a buy-in insures it while the plan keeps it, and a longevity swap transfers only [[Longevity Risk|longevity risk]]. Insurers that write the annuities in turn reinsure them, through longevity reinsurance for the mortality risk and annuity coinsurance for the assets and liabilities together.

> $$P = \sum_{t \ge 1} \frac{\mathrm{E}\left[B_t\right]}{(1+j)^{t}} + \text{loads}$$

> $$\text{Net}_t = B^{\text{act}}_t - (1+f)\,B^{\text{exp}}_t$$

- **Symbols:** $P$ is the single premium for a buy-out or buy-in, $\mathrm{E}[B_t]$ the expected benefits paid in year $t$ on the insurer's mortality basis, and $j$ the discount rate the insurer can support with its backing assets, net of expected defaults. The loads cover expenses, capital and profit. In a longevity swap, $B^{\text{exp}}_t$ is the fixed leg's schedule of benefits, set at the start from an agreed mortality table with improvements, $f$ is the fee, and $B^{\text{act}}_t$ is the floating leg, the benefits actually paid. $\text{Net}_t$ is the payment to the hedger when positive.
- **Buy-out:** The plan pays a premium and the insurer issues annuities to the members, who become its policyholders. The plan's liability for them is settled and leaves its balance sheet, which in the U.S. usually means a settlement charge and, for a full buy-out, a [[Plan Termination|plan termination]].
- **Buy-in:** The insurer issues a bulk annuity contract to the plan, which holds it as an asset that pays the plan the members' benefits. The plan keeps the liability and the members remain members, but the asset matches the liability in investment and longevity terms, and a buy-in can later be converted to a buy-out.
- **Longevity swap:** The hedger pays a fixed leg, the expected benefits plus a fee, and receives a floating leg, the benefits actually paid. The plan or insurer keeps its assets and investment risk and is protected only against members living longer than the table.
- **Insurer pricing:** The insurer builds a mortality basis from a base table, the plan's own experience or postcode and benefit-size factors, and an improvement scale. It discounts at the yield on the assets it will buy, often including private credit and mortgages, less default and expense allowances, and adds capital and profit. Deferred members cost more than retirees because their options and longer duration are uncertain.
- **Reinsurance of PRT:** Insurers cede longevity risk through longevity reinsurance, which works like a longevity swap and is often written by large global reinsurers looking for an offset to their mortality business. They cede the whole contract, assets included, through asset-intensive annuity coinsurance, frequently to a Bermuda reinsurer, as described under [[Offshore Reinsurance]].
- **U.S. and Canada:** The U.S. market is larger and mostly buy-outs, and many U.S. deals lift out retirees with small benefits to cut per-member PBGC premiums. Canada's market is smaller, uses buy-ins as well as buy-outs, and has seen longevity insurance for large plans. Canadian annuity purchases may include inflation indexing, and provincial and federal pension law governs when a purchase discharges the administrator.

> [!example]- One Year of a Longevity Swap {Example}
> A plan hedges 2,000 pensioners who each receive \$24,000 at the end of the year if alive. The fixed leg assumes 1,960 survivors, from the agreed table, and carries a fee of 1%. Find the fixed leg, and the net settlement if (a) 1,985 pensioners survive or (b) 1,955 survive.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Fixed} &= 1.01 \times 1{,}960 \times 24{,}000 \\
> > &= 47{,}510{,}400 \\
> > \text{Floating}_{(a)} &= 1{,}985 \times 24{,}000 \\
> > &= 47{,}640{,}000 \\
> > \text{Net}_{(a)} &= 47{,}640{,}000 - 47{,}510{,}400 \\
> > &= 129{,}600 \\
> > \text{Floating}_{(b)} &= 1{,}955 \times 24{,}000 \\
> > &= 46{,}920{,}000 \\
> > \text{Net}_{(b)} &= 46{,}920{,}000 - 47{,}510{,}400 \\
> > &= -590{,}400
> > \end{align*}
> > $$
> > In (a) more members live than expected, and the counterparty pays the plan \$129,600 toward the extra benefits. In (b) fewer live, and the plan pays \$590,400, which it can afford because it pays out less in benefits. Either way the plan's cost is the fixed leg, so its longevity risk is gone for the year.

> [!example]- Buy-Out Premium Against the Accounting Liability {Example}
> A plan's retiree liability is \$100 million on its accounting basis, discounted at 5.2%, with a modified duration of 10. An insurer's quote for a buy-out implies a discount rate of 4.8% on the same mortality. Estimate the premium with a first-order duration approximation.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P &\approx 100\,\bigl(1 + 10 \times (0.052 - 0.048)\bigr) \\
> > &= 104.0
> > \end{align*}
> > $$
> > The premium is about \$104 million, or 104% of the accounting liability. The sponsor pays the extra \$4 million to remove the investment, longevity and expense risk for good, and in the U.S. it also stops paying PBGC premiums on those members. A buy-out also brings forward a settlement loss on the plan's accounts.

> [!tip]- How it appears on the exam
> - **CP-341:** Questions ask for the forms of reinsurance used for PRT and longevity swaps, how the insurer prices and reinsures the annuities, and the difference between longevity reinsurance and annuity coinsurance. A short calculation settles the fixed and floating legs of a swap.
> - **ILA-101:** Questions describe the PRT products, buy-outs, buy-ins and longevity insurance, alongside other annuity designs. They compare the U.S. and Canadian markets and the risks the insurer takes on.

> [!warning]- Exam traps
> - **Buy-in is not settlement:** A buy-in is a plan asset and the liability stays with the plan. Only a buy-out settles the obligation and removes the members from the plan.
> - **Swap direction:** The hedger receives the floating leg and pays the fixed leg. When members live longer, the floating leg is larger and the hedger receives the difference, not the other way round.
> - **What a swap leaves behind:** A longevity swap transfers no investment or interest rate risk. A plan that wants those gone needs a buy-in or buy-out.
> - **Fixed leg runs on the original schedule:** The fixed leg is set from the table at the start and does not update when actual mortality differs. Recomputing it from actual survivors removes the hedge.
