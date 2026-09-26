---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d3683c64224278737f18798bf787a9380b502c9247b65a19e52406d31cb48f49
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Automobile Plans.md
---

**Automobile Plans** are the U.S. state residual-market mechanisms that guarantee auto insurance — above all the liability coverage a state's compulsory insurance or financial-responsibility law requires — to drivers who cannot obtain it in the voluntary market. Every insurer writing auto in the state must participate, and the business or its results are shared in proportion to each insurer's voluntary market share.

> $$\text{Quota}_i = \text{Plan volume} \times \frac{\text{Voluntary premium}_i}{\text{Total voluntary premium}}$$

- **Automobile insurance plans (assigned risk)** — the most common form. A driver applies to the plan through a producer, and the plan assigns the risk to a member insurer in rotation against that insurer's quota. The assigned insurer issues the policy, pays the claims and **keeps the result**; nothing is pooled. Plan rates are filed separately and are normally higher than voluntary rates. Most plans offer **take-out credits**, reducing the quota of an insurer that voluntarily writes former plan risks. AIPSO provides administration for many states' plans.
- **Joint underwriting associations (JUAs)** — the association itself is the insurer. A few **servicing carriers** issue policies and adjust claims on its behalf for a fee, and the association's profit or loss is shared among all members by market share. The Florida Automobile Joint Underwriting Association is an example.
- **Reinsurance facilities** — every insurer must write eligible applicants and may then **cede** any policy it chooses to the facility, whose results all members share. The driver never knows; this is the U.S. counterpart of a Canadian [[Risk Sharing Pool]]. The North Carolina Reinsurance Facility is the leading example, and state law lets its losses be recouped through a surcharge on auto liability policies across the state. Massachusetts ran its private passenger residual market through a reinsurance pool (Commonwealth Automobile Reinsurers) until replacing it with an assigned-risk plan (MAIP) as it moved to managed competition in 2008.
- **State funds** — a government insurer of last resort, such as the Maryland Automobile Insurance Fund.
- **Evaluating them.** The size of the residual market is a thermometer of rate adequacy ([[Residual Market]]). Where plan rates are self-supporting, plans stay small; where the residual rate is held at or near voluntary rates — as a reinsurance facility's ceded business often is — the mechanism grows and is funded by the voluntary market. North Carolina's facility has at times held more than a fifth of the state's private passenger cars. Wherever the residual rate is below cost, the subsidy blunts the higher-risk driver's price signal — a [[Moral Hazard|moral hazard]] problem as well as a transfer from other policyholders.
- These are among the programs, alongside [[Crop Insurance]], [[TRIA]] and the [[Florida Hurricane Catastrophe Fund]], that Exam 6U treats as [[Government and Industry Insurance Programs]] interacting with the [[Voluntary Private Insurance Market]].

> [!example]- Assigned Risk Quota With a Take-Out Credit {Example}
> A state's assigned risk plan expects $\$30$ million of premium next year. Insurer A writes $\$450$ million of the state's $\$3.0$ billion voluntary auto premium. Last year A voluntarily took out former plan risks with $\$1.5$ million of premium, and the plan credits take-outs dollar for dollar. Plan business is expected to run at a $115\%$ loss and expense ratio.
>
> Find A's quota and its expected cost, with and without the credit.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Market share} &= \frac{450}{3{,}000} \\
> > &= 15\% \\[4pt]
> > \text{Quota} &= 0.15 \times \$30\text{M} \\
> > &= \$4.5\text{M} \\[4pt]
> > \text{After credit} &= \$4.5\text{M} - \$1.5\text{M} \\
> > &= \$3.0\text{M}
> > \end{align*}
> > $$
> >
> > Each dollar of plan premium is expected to lose $15$ cents:
> >
> > $$
> > \begin{align*}
> > \text{Without credit} &= -0.15 \times \$4.5\text{M} \\
> > &= -\$675{,}000 \\[4pt]
> > \text{With credit} &= -0.15 \times \$3.0\text{M} \\
> > &= -\$450{,}000
> > \end{align*}
> > $$
> >
> > The credit is worth $\$225{,}000$ to A, **provided** the taken-out risks can be written profitably at voluntary rates. This is the design of an assigned risk plan: each insurer carries the risks it is assigned, so it has a reason to find the drivers it can price and bring them back into the voluntary market — **depopulation**. A reinsurance facility has no such pressure, because a ceded risk costs the ceding insurer only its market-share slice of the facility's result.
