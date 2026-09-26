---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:54e4fe21b7f7904a929dc69fa034d4465974a66fffe337f82677d15d47ee89fd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deposit Accounting.md
---

**Deposit Accounting** is the treatment of a reinsurance contract that, despite its form, does not transfer both components of insurance risk: the net consideration paid is recorded as a **deposit asset** by the cedant and a **deposit liability** by the reinsurer, and the contract is accounted for as the financing arrangement it is. It is the alternative to [[Insurance Accounting|reinsurance accounting]] when the [[Risk Transfer|risk transfer]] test fails.

> $$\text{Deposit}_0 = \sum_{t} \frac{\text{Expected recoveries}_t}{(1+y)^t}$$

> $$\text{Deposit}_t = \text{Deposit}_{t-1}(1+y) - \text{Recoveries}_t$$

- **Initial amount.** Net consideration — premium less ceding commission or other allowances (SSAP No. 62R). For the cedant it is an admitted asset only if the reinsurer is qualified in the cedant's state of domicile or the deposit is secured by qualifying funds held.
- **Effective yield $y$** equates the deposit with the expected amount and timing of recoveries. Each period the balance accretes at $y$ as **interest income** (interest expense for the reinsurer), and cash settlements reduce it. When the actual or expected cash flows change, $y$ is recalculated and the deposit reset to the amount it would have been had the new yield applied since inception, with the difference in interest income or expense.
- **What does not happen:** no ceded premium, no ceded losses, and **no deduction from the cedant's loss and LAE reserves**. If the underlying losses are revalued upward, the cedant raises its gross reserves through incurred losses and its deposit through interest income — the recovery appears below the underwriting line, never in it.
- **Consequences for the metrics.** Net written premium, the loss ratio and premium-to-surplus look exactly as they would with no reinsurance, and reserves stay gross. That is the point: a contract that transfers no insurance risk should not improve the measures that describe insurance risk. Nor may deposit accounting be used to avoid recognising a loss — a deposit with no remaining coverage behind it is not recoverable.
- **GAAP** reaches the same end through ASC 340-30 (originally SOP 98-7), which measures the deposit according to what the contract does transfer — timing risk only, underwriting risk only, neither, or indeterminate. SSAP No. 62R adopts only part of that guidance and uses the effective-yield method above. See also [[Finite Reinsurance]].

> [!example]- Interest Method on a Failed Contract {Example}
> A cedant pays net consideration of $\$20$M under a contract that fails risk transfer. It expects recoveries of $\$10$M at the end of year 1 and $\$11.55$M at the end of year 2.
>
> Find the effective yield and the deposit balance at each year end. Then suppose that after receiving the year-1 recovery, the year-2 expectation rises to $\$12.10$M.
>
> > [!answer]-
> > Trying $y = 5\%$:
> >
> > $$
> > \begin{align*}
> > \frac{10}{1.05} + \frac{11.55}{1.05^2} &= 9.524 + 10.476 \\
> > &= 20.000
> > \end{align*}
> > $$
> >
> > So $y = 5\%$. Year 1: interest $1.00$, balance $20 + 1.00 - 10 = 11.00$. Year 2: interest $0.55$, balance $11.00 + 0.55 - 11.55 = 0$.
> >
> > **Revised estimate.** Solve $20 = \frac{10}{1+y} + \frac{12.10}{(1+y)^2}$, a quadratic in $u = 1 + y$:
> >
> > $$
> > \begin{align*}
> > u &= \frac{10 + \sqrt{100 + 4(20)(12.10)}}{2(20)} \\
> > &= 1.0670
> > \end{align*}
> > $$
> >
> > The yield becomes $6.70\%$, and the deposit is reset to what it would have been at that yield from inception: $20(1.0670) - 10 = 11.34$. The $0.34$ increase is booked as additional interest income now; year 2 then accretes $11.34 \times 0.0670 = 0.76$, bringing the balance to $12.10$, which the final recovery clears. None of it touches premiums, losses or the loss ratio.

> [!example]- What the Cedant's Ratios Show {Example}
> An insurer has direct earned premium of $\$300$M, direct losses of $\$210$M and surplus of $\$150$M. It paid $\$30$M for a contract expected to recover $\$27$M. Compare its loss ratio and premium-to-surplus if the contract is booked as reinsurance and if it is a deposit (treat written and earned premium as equal).
>
> > [!answer]-
> > **As reinsurance:**
> >
> > $$
> > \begin{align*}
> > \text{Net loss ratio} &= \frac{210 - 27}{300 - 30} \\
> > &= 67.8\% \\
> > \text{Premium to surplus} &= \frac{270}{150} \\
> > &= 1.80
> > \end{align*}
> > $$
> >
> > **As a deposit:** loss ratio $210/300 = 70.0\%$ and premium to surplus $300/150 = 2.00$, with a $\$30$M deposit asset that the $\$27$M of recoveries will draw down.
> >
> > Booking a failed contract as reinsurance would flatter the loss ratio by $2.2$ points and leverage by $0.2$ — improvements with no risk behind them. That is precisely the misstatement the risk transfer test and the CEO/CFO attestation exist to prevent.
