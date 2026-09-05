---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2afd3c0de8e5605de7e8c6fa2ccb33e5daaf94a94cc93e6e11fb6af8904c6aed
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Sharing Pool.md
---

**A Risk Sharing Pool** (RSP) is a mechanism that lets an automobile insurer transfer a policy it is compelled to write — but believes is underpriced at the approved rate — into an industry pool, **without the policyholder's knowledge and at no change to the policyholder's premium**. The insurer keeps the customer relationship and the servicing; the pool takes the underwriting result, shared among all insurers by market share.

> $$\text{Ceded to pool: premium and losses; retained: the customer}$$

- **Why it exists.** The [[Take-All-Comers Rule]] obliges an insurer to write any applicant meeting its filed rules at its filed rates. Where [[Rate Regulation|rate regulation]] holds those rates below cost for part of the risk spectrum, the pool prevents that obligation from concentrating losses on whichever insurer happened to receive the application.
- **Mechanics.** The insurer cedes the policy within a limited window after issue, subject to a **cession limit** — typically a maximum percentage of its own book — so the pool cannot become a dumping ground for everything unprofitable. Premium and losses transfer; results are allocated to all members by voluntary market share.
- **The key contrast with [[Facility Association|FARM]]:** the RSP is **invisible** to the policyholder, who pays a normal rate through a normal insurer; FARM business is written by the Facility Association at its own, much higher, rates and the driver knows.
- **The cession decision is an actuarial one.** The insurer cedes where its own estimate of expected loss exceeds the approved premium net of the pool's terms — so pool volume is a direct measurement of the gap between filed rates and expected costs.
- **Criticism.** Cost is socialised without any price signal reaching the driver, so the risk is never priced to the person creating it; and the pool's existence relieves some of the pressure that would otherwise force rates to adequacy. Its defenders reply that in a compulsory, rate-regulated market the alternative is not accurate pricing but insurer withdrawal.
- **Watch pool volume** the way one watches [[Residual Market]] share: growth means the approved rate structure is drifting away from cost.

> [!example]- Should the Policy Be Ceded? {Example}
> An insurer must write a driver at its approved rate of $\$1{,}450$. Its own model puts the expected loss and LAE at $\$1{,}680$, with fixed expenses of $\$180$ regardless of cession. Ceding transfers premium and losses to the pool, but the insurer retains a servicing allowance of $12\%$ of premium and its share of the pool result is $2.4\%$ of the industry total. The pool's overall expected loss ratio is $118\%$.
>
> Should the insurer cede?
>
> > [!answer]-
> > **Retain.** The insurer keeps the premium and the losses:
> >
> > $$\begin{align*}
> > \text{Result} &= \$1{,}450 - \$1{,}680 - \$180 \\
> > &= -\$410
> > \end{align*}$$
> >
> > **Cede.** The insurer keeps a servicing allowance and takes only its market-share slice of this policy's contribution to the pool's result:
> >
> > $$\begin{align*}
> > \text{Servicing allowance} &= 0.12 \times \$1{,}450 = \$174 \\[4pt]
> > \text{Pool result on this policy} &= \$1{,}450 - \$1{,}680 = -\$230 \\[4pt]
> > \text{Insurer's share} &= 0.024 \times (-\$230) = -\$5.52 \\[4pt]
> > \text{Result} &= \$174 - \$180 - \$5.52 \\
> > &= -\$11.52
> > \end{align*}$$
> >
> > Ceding improves the outcome by roughly $\$398$, so the insurer cedes — subject to its cession limit, which is why limits exist at all.
> >
> > **What the numbers show about the system.** The insurer's decision rule is simply "cede whenever expected loss exceeds the approved premium," so **the pool collects exactly the business the rate regime underprices**. Its $118\%$ loss ratio is therefore not a failure of the pool; it is a measurement of rate inadequacy, socialised across the industry. Every insurer pays its market-share slice of that $18$ points, including those who never received such an application — which is the design, and the criticism, in the same sentence.
