---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d8cf7a12b78a6db686b5b3f77c88baf2124426bd35d758795e294b90967450fb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Sharing Pool.md
---

![[Media/Figures/Risk_Sharing_Pool.svg|340]]

A **Risk Sharing Pool** (RSP) is a mechanism that lets an automobile insurer transfer a policy it is compelled to write, but believes is underpriced at the approved rate, into an industry pool. The transfer happens **without the policyholder's knowledge and at no change to the policyholder's premium**.

A cession to the pool works in four steps:

1. The insurer writes the policy at its filed rate, as the [[Take-All-Comers Rule]] obliges it to.
2. Within a limited window after issue, the insurer cedes the policy to the pool, subject to a **cession limit**, typically a maximum percentage of its own book.
3. Premium and losses transfer to the pool. The insurer keeps the customer relationship and the servicing.
4. The pool's underwriting result is allocated to all member insurers by voluntary market share.

The cession limit keeps the pool from becoming a dumping ground for everything unprofitable.

## Why the pool exists

The [[Take-All-Comers Rule]] obliges an insurer to write any applicant meeting its filed rules at its filed rates. Where [[Rate Regulation|rate regulation]] holds those rates below cost for part of the risk spectrum, the pool prevents that obligation from concentrating losses on whichever insurer happened to receive the application.

## The risk sharing pool and the Facility Association

The key contrast is with the [[Facility Association]] Residual Market (FARM). The RSP is invisible to the policyholder, and FARM is not:

| | Risk sharing pool | Facility Association (FARM) |
| :--- | :--- | :--- |
| Who writes the policy | The driver's own insurer | The Facility Association |
| Rate the driver pays | The insurer's normal approved rate | The Facility Association's own, much higher, rates |
| Does the driver know | No | Yes |

## The cession decision

The insurer cedes where its own estimate of expected loss exceeds the approved premium net of the pool's terms. Pool volume is therefore a direct measurement of the gap between filed rates and expected costs. Like [[Residual Market|residual market]] share, growth in pool volume means the approved rate structure is drifting away from cost.

> [!example]- Should the insurer cede this policy? {Example}
> An insurer must write a driver at its approved rate of $\$1{,}450$. Its own model puts the expected loss and LAE at $\$1{,}680$. Fixed expenses are $\$180$ whether or not it cedes. If it cedes, it keeps a servicing allowance of $12\%$ of premium, and its share of the pool result is $2.4\%$.
>
> > [!answer]-
> > - Retaining the policy, the insurer keeps the premium and the losses, so its result is $\$1{,}450 - \$1{,}680 - \$180 = -\$410$.
> > - Ceding, it keeps a servicing allowance of $0.12 \times \$1{,}450 = \$174$.
> > - The policy's result in the pool is $\$1{,}450 - \$1{,}680 = -\$230$, of which the insurer bears $0.024 \times (-\$230) = -\$5.52$.
> > - Ceding, its result is $\$174 - \$180 - \$5.52 = -\$11.52$.
> > - Ceding improves the result by about $\$398$, so the insurer cedes, subject to its cession limit.

## Criticism

Cost is socialised without any price signal reaching the driver, so the risk is never priced to the person creating it. The pool's existence also relieves some of the pressure that would otherwise force rates to adequacy. Its defenders reply that in a compulsory, rate-regulated market the alternative to the pool is insurer withdrawal.
