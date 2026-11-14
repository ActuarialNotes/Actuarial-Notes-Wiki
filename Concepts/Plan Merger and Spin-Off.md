---
aliases:
  - Plan Merger
  - Spin-Off
  - Spinoff
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3a0354479cf6b99b8d9513db9a9252c4c099ad12e34a07e88f09045b7ade02cd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Plan Merger and Spin-Off.md
---
A **Plan Merger** combines two or more [[Pension Plan|pension plans]] into one, so that one fund backs every member's benefits. A **Spin-Off** splits a plan in two, moving a group of members and a share of the assets into a new or existing plan.

Both usually follow a corporate event, such as one employer buying another or selling a division. The actuarial questions are the same in each: how much of the assets goes with which benefits, and whether any group of members ends up less secure than before.

## Protecting members' benefits

In the U.S., IRC section 414(l) requires that after a merger, spin-off or transfer of assets, each participant would receive, if the plan then terminated, a benefit at least equal to what the participant would have received on termination immediately before. For each member $k$ the test is

> $$TB_k^{\text{after}} \ge TB_k^{\text{before}}$$

- $TB_k$ is member $k$'s benefit on a plan termination basis, compared immediately before and after the transaction.

In Canada an asset transfer between registered plans needs the pension regulator's consent, and the receiving plan must provide the transferred members' accrued benefits. The actuary values each plan at the effective date on the bases the transaction needs, usually going-concern and solvency, and shows that the transfer meets the legislative tests. The report goes to the regulator with the request for consent.

## Merging plans

The funded ratio of the merged plan is

> $$\frac{A_M}{L_M} = \frac{A_1 + A_2}{L_1 + L_2}$$

- $A_1$ and $A_2$ are the assets of the plans being merged.
- $L_1$ and $L_2$ are their liabilities, on the same basis.

The merged ratio weights each plan by its liability, so it is not the average of the two plans' ratios.

A merger pools one plan's surplus with the other plan's deficit, so the members of the better-funded plan lose security. Who owns the surplus is settled by the plan documents and the law, and that question has to be answered before the surplus can be used for anyone else.

> [!example]- What is each plan's funded ratio before and after this merger? {Example}
> After an acquisition, the buyer's plan has assets of $\$120{,}000{,}000$ and a liability of $\$100{,}000{,}000$. The acquired company's plan has assets of $\$60{,}000{,}000$ and a liability of $\$80{,}000{,}000$, on the same basis.
>
> > [!answer]-
> > - The buyer's plan is $120/100 = 120\%$ funded.
> > - The acquired plan is $60/80 = 75\%$ funded.
> > - The merged plan is $(120 + 60)/(100 + 80) = 100\%$ funded, not the 97.5% average of the two ratios.
> > - The buyer's $\$20{,}000{,}000$ surplus exactly covers the acquired plan's $\$20{,}000{,}000$ deficit.
> > - The acquired members' security rises from 75% to 100% and the buyer's members' falls from 120% to 100%.
> > - The merger needs the buyer to be entitled to use that surplus, and it may need consent from the regulator and notice to the members.

## Spinning off a group of members

In a pro rata split, the assets that move with the members leaving are

> $$A_S = A \times \frac{L_S}{L}$$

- $A$ is the original plan's assets and $L$ its liability.
- $L_S$ is the liability for the members who move.

A pro rata split keeps both plans at the original funded ratio on the basis used, but the answer depends on which liability measures the shares. Going-concern, solvency and accounting liabilities weigh active members, deferred members and pensioners differently, so the choice of basis moves money between the two groups.

> [!example]- How much of the assets moves with this division on each allocation basis? {Example}
> A plan has assets of $\$80{,}000{,}000$, a solvency liability of $\$100{,}000{,}000$ and a going-concern liability of $\$90{,}000{,}000$. A division being sold has members whose solvency liability is $\$30{,}000{,}000$ and whose going-concern liability is $\$20{,}000{,}000$. The assets are split pro rata on (a) the solvency basis or (b) the going-concern basis.
>
> > [!answer]-
> > - On the solvency basis, $A_S = 80{,}000{,}000 \times 30/100 = \$24{,}000{,}000$, and both plans stay 80.0% solvency-funded.
> > - On the going-concern basis, $A_S = 80{,}000{,}000 \times 20/90 = \$17{,}777{,}778$.
> > - The transferred members' solvency ratio is then $17{,}777{,}778/30{,}000{,}000 = 59.3\%$.
> > - The remaining plan's solvency ratio is $62{,}222{,}222/70{,}000{,}000 = 88.9\%$.
> > - The choice of basis moves $\$6{,}222{,}222$ between the two groups.
> > - A regulator asked to consent would want to see that neither group's security falls, which favours the solvency split here.

## Sale of a business

When a business is sold, its members either keep a deferred benefit in the seller's plan or move, with assets, to the buyer's plan. Canadian legislation treats employment with the buyer as continuous for the members' entitlements. The purchase agreement sets the transfer basis within what the regulator will approve.

## Accounting

Under U.S. GAAP an acquirer recognizes the funded status of the acquired company's plans at the acquisition date, so amounts the seller had not yet recognized do not carry over. A spin-off divides the obligation and the assets, and the deferred amounts with them, between the two plans.

> [!trap] Splitting on one basis and testing on another
> An allocation that is pro rata on the going-concern basis can leave one group far worse off on the solvency basis, as the spin-off example shows. State the basis, and check the result on every basis the regulator tests.
