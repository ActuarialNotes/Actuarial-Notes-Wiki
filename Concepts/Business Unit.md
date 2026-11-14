---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:570de88a27d06ff231bd33f2750f1f498c9d99c7d9d3bfe2aa42b42c5ec984d1
  sources:
    - "Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf"
    - "Myers & Read, Capital Allocation for Insurance Companies (Brattle working paper, Aug 2001), pp.2-9, 22, 44-45, sha256:681450625dce92c765b9fb1762de4d299d060bb852906e79b3233bb6e4aa7a9b — https://www.brattle.com/wp-content/uploads/2017/10/Capital-Allocation-for-Insurance-Companies.pdf"
    - "D'Arcy, Capital Allocation in the Property-Liability Insurance Industry (Variance 5:2), pp.141-146 (PDF pp.1-6), sha256:e7a4dc616cf02bf9721fd906a35cdd3c2a017ae92921b058a6a932555c955612 — https://www.casact.org/sites/default/files/2021-07/Capital-Allocation-Darcy.pdf"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Business Unit.md
---

A **Business Unit** is a separately managed and separately measured part of an insurer, such as a line of business, a product group, a region, a distribution channel or a subsidiary, to which [[Financial Risk Management|financial risk management]] assigns [[Risk Capital|risk capital]], a [[Cost of Capital|capital charge]] and performance targets. It is where prices are set, growth is chosen and managers are held accountable.

A unit's economic value added is its net operating income less the cost of its allocated capital. When the firm's capital $C$ is allocated to units $i$ with hurdle rate $k$, the firm's economic value added is

> $$\text{EVA}_{\text{firm}} = \sum_i \left(\text{NOI}_i - k\,C_i\right)$$

- $\text{NOI}_i$ is unit $i$'s net operating income.
- $C_i$ is unit $i$'s allocated capital.

The identity holds only when the allocation is **complete**, $\sum_i C_i = C$. Otherwise the units' results do not add up to the firm's. Merton–Perold marginal capital, for example, does not in general sum to $C$, so the difference has to be carried somewhere. A unit adds value when its RAROC, $\text{NOI}_i / C_i$, exceeds $k$, or equivalently when its EVA is positive.

## Business units and lines of business

A [[Line of Business|line of business]] is one grouping of policies, and a business unit is whatever grouping management measures. Pricing and allocation theory treats them alike, so the same allocation methods apply to either.

A unit's capital is notional. Each line's policyholders are paid only while the firm as a whole is solvent, so if the insurer fails, every unit's policyholders go unpaid together. The diversification benefit belongs to the portfolio, and the allocation method decides how it is shared.

## Allocation and incentives

Charged on standalone capital, a unit is over-charged and will underwrite too little of the business that diversifies the firm. Charged on marginal capital, it sees the true effect of its growth on the firm's risk. The allocation that sets a unit's [[Risk-Adjusted Pricing|target prices]] also drives the verdict on its [[Risk-Adjusted Performance|results]].

Two common allocations are:

1. **Proportional**: the firm's capital is allocated in proportion to each unit's standalone capital.
2. **Scaled marginal**: each unit's marginal capital is the firm's capital less the capital the firm would need without that unit, and the marginal amounts are scaled up proportionally to sum to the firm's capital.

> [!example]- Which unit passes the hurdle under each of these two allocations? {Example}
> Unit X earns $\text{NOI} = \$12$M with standalone capital of $\$100$M. Unit Y earns $\$20$M with standalone capital of $\$150$M. Together they need $\$200$M, and the hurdle rate is 16%. Capital is allocated (a) in proportion to standalone capital, and (b) by marginal capital scaled up to $\$200$M.
>
> > [!answer]-
> > - Proportionally, X gets $200 \times 100/250 = \$80$M and Y gets $\$120$M.
> > - X's RAROC is $12/80 = 15.0\%$ and its EVA is $12 - 0.16(80) = -\$0.8$M, so X fails.
> > - Y's RAROC is $20/120 = 16.7\%$ and its EVA is $20 - 0.16(120) = +\$0.8$M, so Y passes.
> > - X's marginal capital is $200 - 150 = \$50$M and Y's is $200 - 100 = \$100$M, which sum to $\$150$M.
> > - Scaled by $200/150$, X gets $\$66.7$M and Y gets $\$133.3$M.
> > - X's RAROC is $12/66.7 = 18.0\%$ and its EVA is $12 - 10.67 = +\$1.33$M, so X passes.
> > - Y's RAROC is $20/133.3 = 15.0\%$ and its EVA is $20 - 21.33 = -\$1.33$M, so Y fails.
> > - The firm's EVA is $32 - 0.16(200) = 0$ under both methods. Only the verdict on each unit changes.

> [!trap] Shrinking the unit an allocation fails
> A unit's verdict depends on the allocation method, not only on its results. In the example X fails under proportional allocation but passes under scaled marginal allocation, because it adds only half its standalone capital to the firm's need. Before shrinking a unit, check that the allocation measures what management wants to reward.
