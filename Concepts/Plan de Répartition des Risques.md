---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:43d1b070767799967081bb71cfcf9af056c14c640d8a1a5909d04d044cb39f12
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Plan de Répartition des Risques.md"
---

The **Plan de Répartition des Risques** (PRR, Quebec's risk sharing plan) is the mechanism through which an automobile insurer in Quebec that does not wish to keep a higher-risk driver in its own portfolio transfers that risk to a plan in which all of Quebec's automobile insurers insure it collectively. The policyholder continues to deal with the insurer of their choice for both the policy and claims. The plan is run by the Groupement des assureurs automobiles (GAA) and is Quebec's counterpart of the [[Risk Sharing Pool]] used elsewhere in Canada.

The PRR result is the combined underwriting result of every risk transferred to the plan. Member $i$'s share of it is

> $$\text{Member } i\text{'s share} = s_i \times \text{PRR result}$$

- $s_i$ is member $i$'s participation share under the plan's sharing rules.
- $\sum_i s_i = 1$.

Every member carries its share whether or not it transfers any risks. That is what "insured collectively" means.

> [!example]- How much does transferring this risk to the PRR save the insurer? {Example}
> An insurer holds an $8\%$ participation share in the plan. It has written a commercial vehicle whose premium it expects to fall short of claims and expenses by $\$900{,}000$. Excluding this risk, the plan's expected deficit for the year is $\$23.1$ million. Ignore any servicing allowance.
>
> > [!answer]-
> > - If the insurer keeps the risk, it bears the whole shortfall plus its share of the plan's deficit, $900{,}000 + 0.08 \times 23{,}100{,}000 = \$2{,}748{,}000$.
> > - If it transfers the risk, the plan's deficit becomes $\$24.0$ million, and the insurer bears $0.08 \times 24{,}000{,}000 = \$1{,}920{,}000$.
> > - The transfer saves $2{,}748{,}000 - 1{,}920{,}000 = \$828{,}000$, which is $(1 - 0.08) \times 900{,}000$.
> > - In general, transferring a risk with expected shortfall $D$ saves the insurer $(1 - s_i)D$ and passes $s_j D$ to every other member $j$.
> > - Every insurer has the same incentive, so the plan collects the risks members expect to lose money on. An insurer that transfers nothing still pays its $8\%$ of the result, the price of guaranteed access.

## Why Quebec has its own mechanism

Quebec's product differs from the rest of Canada's. Bodily injury is covered by the public, no-fault SAAQ scheme, so the compulsory private cover is civil liability, at least $\$50{,}000$ for a private passenger vehicle under the *Automobile Insurance Act* (see [[Compulsory Auto Insurance]]). The Act makes the GAA, whose members are all of Quebec's automobile insurers, responsible for guaranteeing that every owner can obtain that cover regardless of risk. The [[Facility Association]] does not operate in Quebec.

The GAA provides access by two routes:

1. An access mechanism helps owners who cannot find an insurer obtain at least the compulsory liability cover. A separate mechanism for businesses was added in 2023.
2. The PRR sits behind the policy: an insurer writes the driver and then transfers the underwriting result to the plan.

The GAA also administers Quebec's direct-compensation agreement for property damage claims.

## Comparison with the rest of Canada

The PRR works like a [[Risk Sharing Pool]]: the insurer keeps the customer and the risk is shared. Quebec has no equivalent of the [[Facility Association|Facility Association Residual Market (FARM)]], where the facility itself writes the risk.

It has the same strengths and criticisms as any pool. It keeps compulsory cover available without making one insurer absorb a bad risk it happened to receive. But the cost is shared without a price signal reaching the driver, and plan volume rises when an insurer's own rates or underwriting stop covering a segment. The GAA reported rapid growth in premium transferred to the plan in the late 2010s, particularly for commercial risks, the kind of trend a [[Residual Market]] analyst reads as a market signal.

> [!trap] Treating a non-transferring insurer as unaffected
> An insurer that transfers no risks still carries its share $s_i$ of the plan's result, because every member insures the transferred risks collectively.
