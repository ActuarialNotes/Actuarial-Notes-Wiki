---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:53bc2f7e6f9f74cba3ef83312d20eb62dad1c576973e2ec25926fa4c7f3e956a
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 62R ¶10-13, ¶40-41, ¶127 (PDF pp.438, 444-445, 460), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Hasnani, 'Insurance and Reinsurance Without Risk Transfer: implementation guidance on SOP 98-7', Journal of Accountancy, March 1999 (fetched 2026-10-10), sha256:c067928007c79ab2d9766cbf61f21baf1d3c21a4c140f1250a1949fb6918e4a7 — https://www.journalofaccountancy.com/issues/1999/mar/hasnani.html"
    - "New York DFS, Supplement No. 1 to Circular Letter No. 8 (2005) (fetched 2026-10-10), sha256:946c7dd59fe5af9ddae6a278946d1bce9a3a5598827464c0b07c1e29a2bf47a6 — https://www.dfs.ny.gov/industry_guidance/circular_letters/cl2005_08_s01"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deposit Accounting.md
---

**Deposit Accounting** is the accounting for a reinsurance contract that does not transfer both components of insurance risk, underwriting risk and timing risk, as the financing arrangement it is. The cedant records the net consideration it pays as a **deposit asset** and the reinsurer records it as a **deposit liability**. It is the alternative to [[Insurance Accounting|reinsurance accounting]] when the [[Risk Transfer|risk transfer]] test fails.

Under SSAP No. 62R, a contract must transfer both underwriting risk and timing risk to be accounted for as reinsurance. The initial deposit is the net consideration, the premium less the ceding commission or other allowances. For the cedant it is an admitted asset only if the reinsurer is qualified in the cedant's state of domicile or the deposit is secured by qualifying funds held. The effective yield $y$ is the rate at which the expected recoveries discount to the initial deposit, so the initial deposit is

> $$\text{Deposit}_0 = \sum_{t} \frac{\text{Expected recoveries}_t}{(1+y)^t}$$

- $\text{Expected recoveries}_t$ is the recovery expected at the end of year $t$.

Each year the deposit accretes at $y$, which the cedant records as interest income and the reinsurer as interest expense, and each recovery draws it down. The deposit at the end of year $t$ is

> $$\text{Deposit}_t = \text{Deposit}_{t-1}(1+y) - \text{Recoveries}_t$$

- $\text{Recoveries}_t$ is the recovery received at the end of year $t$.

When the actual or expected cash flows change, $y$ is recalculated and the deposit is reset to the amount it would have been had the new yield applied since inception. The difference is booked as interest income or expense.

> [!example]- What are this deposit's effective yield and balances, and what happens when the expected recovery rises? {Example}
> A cedant pays net consideration of $\$20$M under a contract that fails risk transfer. It expects recoveries of $\$10$M at the end of year 1 and $\$11.55$M at the end of year 2. After it receives the year-1 recovery, its year-2 expectation rises to $\$12.10$M.
>
> > [!answer]-
> > - At $y = 5\%$, the recoveries discount to $10/1.05 + 11.55/1.05^2 = 9.524 + 10.476 = 20.000$, so the effective yield is $5\%$.
> > - Year 1 accretes $20 \times 0.05 = 1.00$ of interest, and the recovery leaves $20 + 1.00 - 10 = 11.00$.
> > - Year 2 accretes $0.55$, and the recovery leaves $11.00 + 0.55 - 11.55 = 0$.
> > - With the revised recovery, the yield solves $20 = 10/u + 12.10/u^2$ with $u = 1 + y$, which gives $u = 1.0670$, a yield of $6.70\%$.
> > - The deposit is reset to $20(1.0670) - 10 = 11.34$, and the $0.34$ increase is booked as additional interest income now.
> > - Year 2 accretes $11.34 \times 0.0670 = 0.76$, bringing the balance to $12.10$, which the final recovery clears.
> > - None of it touches premiums, losses or the loss ratio.

## Effect on the cedant's statements

Under deposit accounting there is no ceded premium, no ceded loss and no reduction of the cedant's loss and LAE reserves for the expected recoveries. If the underlying losses are revalued upward, the cedant raises its gross reserves through incurred losses and its deposit through interest income. The recovery appears below the underwriting line, never in it.

Net written premium, the loss ratio and premium-to-surplus therefore look as they would with no reinsurance, and reserves stay gross. A contract that transfers no insurance risk does not improve the measures that describe insurance risk. Deposit accounting may not be used to avoid recognising a loss either: a deposit with no remaining coverage behind it is not recoverable.

> [!example]- How do this cedant's loss ratio and premium-to-surplus differ between reinsurance and deposit accounting? {Example}
> An insurer has direct earned premium of $\$300$M, direct losses of $\$210$M and surplus of $\$150$M. It paid $\$30$M for a contract expected to recover $\$27$M. Written and earned premium are equal.
>
> > [!answer]-
> > - As reinsurance, the net loss ratio is $(210 - 27)/(300 - 30) = 67.8\%$ and premium-to-surplus is $270/150 = 1.80$.
> > - As a deposit, the loss ratio is $210/300 = 70.0\%$ and premium-to-surplus is $300/150 = 2.00$, with a $\$30$M deposit asset that the $\$27$M of recoveries will draw down.
> > - Booking the failed contract as reinsurance would lower the loss ratio by $2.2$ points and leverage by $0.2$, with no risk behind either improvement.

## GAAP

GAAP reaches the same end through ASC 340-30 (originally SOP 98-7), which measures the deposit according to what the contract does transfer: timing risk only, underwriting risk only, neither, or an indeterminate amount. SSAP No. 62R adopts only part of that guidance and uses the effective-yield method above. [[Finite Reinsurance|Finite reinsurance]], whose purpose is usually timing and financing, sits at the boundary between the two treatments.

> [!trap] Treating a recovery as a ceded loss
> Under deposit accounting a recovery draws down the deposit asset. It never reduces incurred losses, the loss reserves or the loss ratio.
