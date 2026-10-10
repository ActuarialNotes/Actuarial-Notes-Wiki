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
  content_hash: sha256:323408e4431e80b4345cbf54f9c542f38463bb03ea64c10cfcc6bc3c49db996e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Plan Merger and Spin-Off.md
---
A **Plan Merger** combines two or more [[Pension Plan|pension plans]] into one, so that one fund backs every member's benefits, and a **Spin-Off** splits a plan in two, moving a group of members and a share of the assets into a new or existing plan. Both usually follow a corporate event, such as one employer buying another or selling a division, and the actuarial questions are the same in each: how much of the assets goes with which benefits, and whether any group of members ends up less secure than before.

> $$\frac{A_M}{L_M} = \frac{A_1 + A_2}{L_1 + L_2}$$

> $$A_S = A \times \frac{L_S}{L}$$

> $$TB_k^{\text{after}} \ge TB_k^{\text{before}}$$

- **Symbols:** $A_1, A_2$ and $L_1, L_2$ are the assets and liabilities of the plans being merged, and $A_M/L_M$ is the funded ratio of the merged plan. In a spin-off, $L_S$ is the liability for the members who move, out of the original plan's liability $L$, and $A_S$ is the pro rata share of the assets $A$ that goes with them. $TB_k$ is member $k$'s benefit on a plan termination basis, compared immediately before and after the transaction.
- **Protecting members' benefits:** In the U.S., IRC section 414(l) requires that after a merger, spin-off or transfer of assets each participant would receive, if the plan then terminated, a benefit at least equal to what the participant would have received on termination immediately before. In Canada an asset transfer between registered plans needs the pension regulator's consent, and the receiving plan must provide the transferred members' accrued benefits.
- **Allocating the assets:** A pro rata split keeps both plans at the original funded ratio, but the answer depends on which liability measures the shares. Going-concern, solvency and accounting liabilities weigh active members, deferred members and pensioners differently, so the choice of basis moves money between the two groups.
- **Surplus and deficit:** A merger pools one plan's surplus with the other plan's deficit. The members of the better-funded plan lose security, and the question of who owns the surplus, settled by the plan documents and the law, has to be answered before the surplus can be used for anyone else.
- **Sale of a business:** When a business is sold, its members either keep a deferred benefit in the seller's plan or move, with assets, to the buyer's plan. Canadian legislation treats employment with the buyer as continuous for the members' entitlements, and the purchase agreement sets the transfer basis within what the regulator will approve.
- **Special-purpose valuations:** The actuary values each plan at the effective date on the bases the transaction needs, usually going-concern and solvency in Canada, and shows that the transfer meets the legislative tests. The report goes to the regulator with the request for consent.
- **Accounting:** Under U.S. GAAP an acquirer recognizes the funded status of the acquired company's plans at the acquisition date, so amounts the seller had not yet recognized do not carry over. A spin-off divides the obligation and the assets, and the deferred amounts with them, between the two plans.

> [!example]- How the Allocation Basis Changes a Spin-Off {Example}
> A plan has assets of \$80,000,000, a solvency liability of \$100,000,000 and a going-concern liability of \$90,000,000. A division being sold has members whose solvency liability is \$30,000,000 and whose going-concern liability is \$20,000,000. Find the assets that move with them, and both plans' solvency ratios afterwards, if the assets are split pro rata on (a) the solvency basis and (b) the going-concern basis.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > A_S^{(a)} &= 80{,}000{,}000 \times \frac{30}{100} \\
> > &= 24{,}000{,}000 \\
> > A_S^{(b)} &= 80{,}000{,}000 \times \frac{20}{90} \\
> > &= 17{,}777{,}778
> > \end{align*}
> > $$
> > On the solvency basis both plans stay 80.0% solvency-funded. On the going-concern basis the transferred members' solvency ratio is $17{,}777{,}778/30{,}000{,}000 = 59.3\%$ and the remaining plan's is $62{,}222{,}222/70{,}000{,}000 = 88.9\%$. The division's share of the liability is 30% on the solvency basis and 22.2% on the going-concern basis, so the choice of basis moves \$6,222,222 between the two groups. A regulator asked to consent would want to see that neither group's security falls, which favours the solvency split here.

> [!example]- Merging a Surplus Plan With a Deficit Plan {Example}
> After an acquisition, the buyer's plan has assets of \$120,000,000 and a liability of \$100,000,000, and the acquired company's plan has assets of \$60,000,000 and a liability of \$80,000,000, on the same basis. Find each plan's funded ratio before and after a merger.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \frac{A_1}{L_1} &= \frac{120}{100} \\
> > &= 120\% \\
> > \frac{A_2}{L_2} &= \frac{60}{80} \\
> > &= 75\% \\
> > \frac{A_M}{L_M} &= \frac{120 + 60}{100 + 80} \\
> > &= 100\%
> > \end{align*}
> > $$
> > The buyer's \$20,000,000 surplus exactly covers the acquired plan's \$20,000,000 deficit. The acquired members' security rises from 75% to 100% and the buyer's members' falls from 120% to 100%, so the merger needs the buyer to be entitled to use that surplus, and it may need consent from the regulator and notice to the members.

> [!tip]- How it appears on the exam
> - **RET-201:** Candidates perform the accounting calculations for plan mergers, acquisitions and spin-offs under the applicable standards: the funded status recognized at the transaction date, and how the obligation, assets and deferred amounts are divided or combined.
> - **RET-301:** Candidates prepare valuation results for a plan merger or spin-off and for asset transfers, and describe and apply the Canadian legislation and regulatory policies that govern them, including the regulator's consent and the protection of the members' accrued benefits and their security.

> [!warning]- Exam traps
> - **Splitting on one basis and testing on another:** An allocation that is pro rata on the going-concern basis can leave one group far worse off on the solvency basis. State the basis, and check the result on every basis the regulator tests.
> - **Merged funded ratio is not an average:** The merged ratio weights each plan by its liability. Averaging 120% and 75% gives 97.5%, not the correct 100%.
> - **Surplus is not free to move:** A surplus belongs to whoever the plan documents and the law say it does. Treating it as the sponsor's to apply to another plan's deficit skips the question the regulator will ask first.
> - **Accounting carries nothing over:** In an acquisition the buyer recognizes the acquired plan's full funded status at the acquisition date. Carrying the seller's unrecognized losses into the buyer's future expense is wrong.
