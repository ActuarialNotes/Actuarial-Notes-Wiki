---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:489abffe4e3ab83add2016d39570bfad188b5170eb4bfffda8d9376e5eea3435
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Plan de Répartition des Risques.md"
---

**The Plan de Répartition des Risques** (PRR, Quebec's risk sharing plan) is the mechanism through which an automobile insurer in Quebec that does not wish to keep a higher-risk driver in its own portfolio transfers that risk to a plan in which it is insured **collectively by all of Quebec's automobile insurers** — while the policyholder continues to deal with the insurer of their choice for both the policy and claims. It is run by the Groupement des assureurs automobiles (GAA) and is Quebec's counterpart of the [[Risk Sharing Pool]] used elsewhere in Canada.

> $$\text{Member } i\text{'s share} = s_i \times \text{PRR result}$$

> $$\sum_i s_i = 1$$

- **Symbols.** The PRR result is the combined underwriting result of every risk transferred to the plan; $s_i$ is member $i$'s participation share under the plan's sharing rules. Every member carries its share **whether or not it transfers any risks** — that is what "collectively insured" means.
- **Why Quebec has its own mechanism.** Quebec's product differs: bodily injury is covered by the public, no-fault SAAQ scheme, so the compulsory private cover is civil liability — at least $\$50{,}000$ for a private passenger vehicle under the *Automobile Insurance Act* (see [[Compulsory Auto Insurance]]). The Act makes the GAA, whose members are all of Quebec's automobile insurers, responsible for guaranteeing that every owner can obtain that cover regardless of risk. The [[Facility Association]] does not operate in Quebec.
- **The GAA's two routes to access.** An *access mechanism* helps owners who cannot find an insurer obtain at least the compulsory liability cover (a separate mechanism for businesses was added in 2023). The *PRR* sits behind the policy: an insurer writes the driver and then transfers the underwriting result to the plan.
- **Compared with the rest of Canada.** The PRR works like a [[Risk Sharing Pool]] — the insurer keeps the customer and the risk is socialised. There is no equivalent of FA's residual market ([[Facility Association|FARM]]), where the facility itself writes the risk. The GAA also administers Quebec's direct-compensation agreement for property damage claims.
- **Same strengths and criticisms as any pool.** It keeps compulsory cover available without making one insurer absorb a bad risk it happened to receive; but cost is shared without a price signal reaching the driver, and plan volume rises when an insurer's own rates or underwriting stop covering a segment. The GAA reported rapid growth in premium transferred to the plan in the late 2010s, particularly for commercial risks — the kind of trend a [[Residual Market]] analyst reads as a market signal.

> [!example]- The Arithmetic of Transferring a Risk {Example}
> An insurer holds an $8\%$ participation share in the plan. It has written a commercial vehicle whose premium it expects to fall short of claims and expenses by $\$900{,}000$. Excluding this risk, the plan's expected deficit for the year is $\$23.1$ million. Ignore any servicing allowance.
>
> What does transferring the risk to the PRR save the insurer?
>
> > [!answer]-
> > **Keep the risk.** The insurer bears the whole shortfall, plus its share of the plan's deficit:
> >
> > $$
> > \begin{align*}
> > \text{Cost} &= \$900{,}000 + 0.08 \times \$23.1\text{M} \\
> > &= \$900{,}000 + \$1{,}848{,}000 \\
> > &= \$2{,}748{,}000
> > \end{align*}
> > $$
> >
> > **Transfer it.** The plan's deficit becomes $\$24.0$ million, of which the insurer bears its share:
> >
> > $$
> > \begin{align*}
> > \text{Cost} &= 0.08 \times \$24.0\text{M} \\
> > &= \$1{,}920{,}000
> > \end{align*}
> > $$
> >
> > The transfer saves $\$828{,}000$, which is $(1 - 0.08) \times \$900{,}000$. In general, transferring a risk with expected shortfall $D$ saves the insurer $(1 - s_i)D$ and passes $s_j D$ to every other member $j$.
> >
> > **What this means for the system.** Every insurer has the same incentive, so the plan collects exactly the risks that members expect to lose money on. An insurer that transfers nothing still pays its $8\%$ of the result — the price of guaranteed access, shared by all insurers because the law makes the liability cover compulsory for all owners.
