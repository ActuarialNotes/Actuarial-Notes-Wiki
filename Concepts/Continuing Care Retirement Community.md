---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cb457a255804107bd99abc2c1e96e731671a2ba44d4eb1ea9e862b4b4a4b9efb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Continuing Care Retirement Community.md
---

A **Continuing Care Retirement Community** (CCRC) is a residential community for older people that offers housing and a continuum of care on one site: independent living, assisted living and skilled nursing care. Residents usually pay an entry fee on joining and a monthly fee after that, and the contract decides how much of the cost of higher levels of care the community bears.

Actuarially a CCRC contract is a [[State-Dependent Insurance|state-dependent]] contract on a [[Multiple State Model|multiple state model]]. A basic model has states for independent living (state 0), assisted living, skilled nursing and death, with [[Transition Intensity|transition intensities]] for moving to a higher level of care and for dying from each state. Some models allow a return from nursing care after a short stay, and a model for couples has a state for each combination of the two residents' states.

By the [[Equivalence Principle|equivalence principle]], the fees for a resident who enters independent living at age $x$ satisfy

> $$E + \sum_{j} F_j\,\bar{a}^{0j}_x = \sum_{j} C_j\,\bar{a}^{0j}_x$$

- $E$ is the entry fee.
- $F_j$ is the annual fee rate charged in state $j$.
- $C_j$ is the annual cost of housing and care in state $j$.
- $\bar{a}^{0j}_x$ is the EPV of 1 a year paid while the resident is in state $j$.

The entry fee is paid once, at entry, so it enters the equation as a lump sum. A partly refundable entry fee adds the EPV of the refund to the right-hand side.

## Types of contract

The contract sets what a resident pays once they need more care:

| Contract | What the resident pays in assisted living or nursing care |
|---|---|
| Life care (Type A) | The same monthly fee as in independent living |
| Modified (Type B) | The same fee for a limited amount of care, then a discounted or market rate |
| Fee-for-service (Type C) | The market rate for the care used |

Under a life care contract, the fee does not rise with the level of care, so the community carries the long-term care risk, much as [[Health Insurance|long-term care insurance]] does. Under fee-for-service, the resident pays for care as it is used and the community bears little of that risk, so the entry fee is usually lower.

> [!example]- What are the fees $F$ and $F_C$ for these two CCRC contracts? {Example}
> A CCRC models a new resident with states 0 (independent living), 1 (assisted living), 2 (skilled nursing) and 3 (dead). With $\delta = 0.04$, the model gives $\bar{a}^{00} = 6.25$, $\bar{a}^{01} = 1.29310$ and $\bar{a}^{02} = 0.81786$. The annual costs are $\$40{,}000$, $\$80{,}000$ and $\$140{,}000$ in the three living states, paid continuously.
>
> A life care contract has an entry fee of $\$150{,}000$ and a level fee $F$ in every living state. A fee-for-service contract has an entry fee of $\$50{,}000$, a fee $F_C$ in independent living, and charges the full cost in states 1 and 2.
>
> > [!answer]-
> > - The EPV of the costs is $40{,}000(6.25) + 80{,}000(1.29310) + 140{,}000(0.81786) = \$467{,}948.40$.
> > - Under life care the fee is paid in all three living states, so its annuity is $6.25 + 1.29310 + 0.81786 = 8.36096$.
> > - $F = (467{,}948.40 - 150{,}000)/8.36096 = \$38{,}027.74$ a year.
> > - Under fee-for-service, care in states 1 and 2 pays for itself, so only independent living has to balance: $50{,}000 + 6.25\,F_C = 40{,}000(6.25)$.
> > - $F_C = \$32{,}000$ a year.
> > - The life care resident pays $\$100{,}000$ more on entry and about $\$6{,}000$ a year more while independent. In return, the monthly fee stays at about $\$3{,}169$ instead of rising to $\$6{,}667$ or $\$11{,}667$ when care is needed.

## Policy values by state

The community needs a [[Policy Value|policy value]] for each resident in each state. For a resident now in state $i$, it is the EPV of future costs less the EPV of future fees:

> $$V^{(i)} = \sum_{j} \left(C_j - F_j\right)\bar{a}^{ij}$$

- $\bar{a}^{ij}$ is the EPV of 1 a year paid while a resident now in state $i$ is in state $j$, at the resident's current age.

Under a life care contract, a resident in nursing care costs more than the fee for the rest of their life, so that state's policy value is large. [[Thiele's Differential Equation|Thiele's differential equation]] can be written for each state's policy value.

> [!example]- What is the policy value for a life care resident in each living state? {Example}
> For the life care contract above, with no transitions back to a lower level of care, the model also gives $\bar{a}^{11} = 3.44828$, $\bar{a}^{12} = 1.32626$ and $\bar{a}^{22} = 2.56410$. The intensities do not change with age.
>
> > [!answer]-
> > - $V^{(0)} = 467{,}948.40 - 38{,}027.74(8.36096) = \$150{,}000$, the entry fee, which the community holds against future care costs.
> > - $V^{(1)} = 41{,}972.26(3.44828) + 101{,}972.26(1.32626) = \$279{,}974$.
> > - $V^{(2)} = 101{,}972.26(2.56410) = \$261{,}467$.
> > - Because the intensities do not depend on age, these values do not change with duration either.
> > - The assisted living value is the largest, because those residents pay less than cost now and are likely to move into nursing care later.

> [!trap] Charging the life care fee in independent living only
> Under a life care contract the fee is paid in every living state, so the fee annuity is $\bar{a}^{00} + \bar{a}^{01} + \bar{a}^{02}$. Using only $\bar{a}^{00}$ gives $317{,}948.40/6.25 = \$50{,}872$ in place of $\$38{,}028$, overstating the fee.
