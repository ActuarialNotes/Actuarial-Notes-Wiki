---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:001f7ab1c258d16c8aefe9852703b525fd8eddd345164322d05e4a881a38a18a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Automobile Plans.md
---
**Automobile Plans** are the U.S. state residual-market mechanisms that guarantee auto insurance, above all the liability coverage a state's compulsory insurance or financial-responsibility law requires, to drivers who cannot obtain it in the voluntary market. Every insurer writing auto in the state must participate, and the business or its results are shared in proportion to each insurer's voluntary market share.

An insurer's share of a plan's business, its quota, is

> $$\text{Quota}_i = \text{Plan volume} \times \frac{\text{Voluntary premium}_i}{\text{Total voluntary premium}}$$

- $\text{Plan volume}$ is the premium the plan expects to write.
- $\text{Voluntary premium}_i$ is insurer $i$'s voluntary auto premium in the state.
- $\text{Total voluntary premium}$ is the state's voluntary auto premium written by all insurers.

Most assigned risk plans offer **take-out credits**, which reduce the quota of an insurer that voluntarily writes former plan risks.

> [!example]- What are Insurer A's quota and expected cost, with and without its take-out credit? {Example}
> A state's assigned risk plan expects $\$30$ million of premium next year. Insurer A writes $\$450$ million of the state's $\$3.0$ billion voluntary auto premium. Last year A voluntarily took out former plan risks with $\$1.5$ million of premium, and the plan credits take-outs dollar for dollar. Plan business is expected to run at a $115\%$ loss and expense ratio.
>
> > [!answer]-
> > - A's market share is $450/3{,}000 = 15\%$.
> > - Its quota is $0.15 \times \$30\text{M} = \$4.5\text{M}$.
> > - After the credit, its quota is $\$4.5\text{M} - \$1.5\text{M} = \$3.0\text{M}$.
> > - Each dollar of plan premium is expected to lose $15$ cents, so the expected cost is $0.15 \times \$4.5\text{M} = \$675{,}000$ without the credit.
> > - With the credit it is $0.15 \times \$3.0\text{M} = \$450{,}000$.
> > - The credit is worth $\$225{,}000$ to A, provided the taken-out risks can be written profitably at voluntary rates.

## Types of automobile plans

1. **Automobile insurance plans (assigned risk).** The most common form. A driver applies to the plan through a producer, and the plan assigns the risk to a member insurer in rotation against that insurer's quota. The assigned insurer issues the policy, pays the claims and keeps the result, so nothing is pooled. Plan rates are filed separately and are normally higher than voluntary rates. AIPSO provides administration for many states' plans.
2. **Joint underwriting associations (JUAs).** The association itself is the insurer. A few **servicing carriers** issue policies and adjust claims on its behalf for a fee, and the association's profit or loss is shared among all members by market share. The Florida Automobile Joint Underwriting Association is an example.
3. **Reinsurance facilities.** Every insurer must write eligible applicants and may then cede any policy it chooses to the facility, whose results all members share. The driver never knows. This is the U.S. counterpart of a Canadian [[Risk Sharing Pool]]. The North Carolina Reinsurance Facility is the leading example, and state law lets its losses be recouped through a surcharge on auto liability policies across the state.
4. **State funds.** A government insurer of last resort, such as the Maryland Automobile Insurance Fund.

Massachusetts ran its private passenger residual market through a reinsurance pool (Commonwealth Automobile Reinsurers) until replacing it with an assigned-risk plan (MAIP) as it moved to managed competition in 2008.

> [!example]- Why does an assigned risk plan push insurers to depopulate it, when a reinsurance facility does not? {Example}
> - Under an assigned risk plan, each insurer carries the risks it is assigned and keeps their result.
> - So an insurer has a reason to find the plan drivers it can price and bring them back into the voluntary market, which is **depopulation**, and the take-out credit rewards it.
> - Under a reinsurance facility, a ceded risk costs the ceding insurer only its market-share slice of the facility's result, so there is no such pressure.

## Evaluating automobile plans

The size of the residual market is a thermometer of rate adequacy ([[Residual Market]]). Where plan rates are self-supporting, plans stay small. Where the residual rate is held at or near voluntary rates, as a reinsurance facility's ceded business often is, the mechanism grows and is funded by the voluntary market. North Carolina's facility has at times held more than a fifth of the state's private passenger cars. Wherever the residual rate is below cost, the subsidy blunts the higher-risk driver's price signal. That is a [[Moral Hazard|moral hazard]] problem as well as a transfer from other policyholders.

These plans are among the [[Government and Industry Insurance Programs]] Exam 6U covers, alongside [[Crop Insurance]], [[TRIA]] and the [[Florida Hurricane Catastrophe Fund]], that interact with the [[Voluntary Private Insurance Market]].

> [!trap] Assuming every plan pools its results
> Only a JUA and a reinsurance facility share results among members. Under an assigned risk plan the assigned insurer keeps the profit or loss on the risks it is given.
