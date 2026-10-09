---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d4d12f1eb2367439b4fdeed647e97228cb2acba9687015d236511d5241cd62b1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Continuing Care Retirement Community.md
---

**A Continuing Care Retirement Community** (CCRC) is a residential community for older people that offers housing and a continuum of care on one site: independent living, assisted living and skilled nursing care. Residents usually pay an entry fee on joining and a monthly fee after that, and the contract decides how much of the cost of higher levels of care the community bears. Actuarially it is a [[State-Dependent Insurance|state-dependent]] contract on a [[Multiple State Model|multiple state model]], priced with the [[Equivalence Principle|equivalence principle]].

> $$E + \sum_{j} F_j\,\bar{a}^{0j}_x = \sum_{j} C_j\,\bar{a}^{0j}_x$$

| Contract | What the resident pays in assisted living or nursing care |
|---|---|
| Life care (Type A) | The same monthly fee as in independent living |
| Modified (Type B) | The same fee for a limited amount of care, then a discounted or market rate |
| Fee-for-service (Type C) | The market rate for the care used |

- **Symbols:** In the formula, $E$ is the entry fee, $F_j$ is the annual fee rate charged in state $j$, $C_j$ is the annual cost of housing and care in state $j$, and $\bar{a}^{0j}_x$ is the EPV of 1 a year paid while a resident who enters at age $x$ in independent living (state 0) is in state $j$. A partly refundable entry fee adds the EPV of the refund to the right-hand side.
- **The model:** A basic model has states for independent living, assisted living, skilled nursing and death, with [[Transition Intensity|transition intensities]] for moving to a higher level of care and for dying from each state. Some models allow a return from nursing care after a short stay, and a model for couples has a state for each combination of the two residents' states.
- **Who bears the risk:** Under a life care contract, the fee does not rise with the level of care, so the community carries the long-term care risk, much as [[Health Insurance|long-term care insurance]] does. Under fee-for-service, the resident pays for care as it is used and the community bears little of that risk, so the entry fee is usually lower.
- **Policy values:** The community needs a [[Policy Value|policy value]] for each resident in each state. Under a life care contract, a resident in nursing care costs more than the fee for the rest of their life, so that state's policy value is large.

> [!example]- Fees for Life Care and Fee-for-Service Contracts {Example}
> A CCRC models a new resident in independent living with states 0 (independent living), 1 (assisted living), 2 (skilled nursing) and 3 (dead). With $\delta = 0.04$, the model gives $\bar{a}^{00} = 6.25$, $\bar{a}^{01} = 1.29310$ and $\bar{a}^{02} = 0.81786$. The annual costs are \$40,000, \$80,000 and \$140,000 in the three living states, paid continuously. A life care contract has an entry fee of \$150,000 and a level fee $F$ in every state. A fee-for-service contract has an entry fee of \$50,000, a fee $F_C$ in independent living, and charges the full cost in states 1 and 2. Find $F$ and $F_C$.
>
> > [!answer]-
> > For life care, the fee is paid in all three living states.
> > $$
> > \begin{align*}
> > \text{EPV(costs)} &= 40{,}000(6.25) + 80{,}000(1.29310) + 140{,}000(0.81786) \\
> > &= 250{,}000 + 103{,}448.00 + 114{,}500.40 \\
> > &= 467{,}948.40 \\
> > F &= \frac{467{,}948.40 - 150{,}000}{6.25 + 1.29310 + 0.81786} \\
> > &= \frac{317{,}948.40}{8.36096} \\
> > &= 38{,}027.74
> > \end{align*}
> > $$
> > For fee-for-service, care in states 1 and 2 pays for itself, so only independent living has to balance.
> > $$
> > \begin{align*}
> > 50{,}000 + 6.25\,F_C &= 40{,}000(6.25) \\
> > F_C &= 32{,}000
> > \end{align*}
> > $$
> > The life care resident pays \$100,000 more on entry and about \$6,000 a year more while independent. In return, the monthly fee stays at about \$3,169 instead of rising to \$6,667 or \$11,667 when care is needed.

> [!example]- Policy Values by State for a Life Care Contract {Example}
> For the life care contract above, with no transitions back to a lower level of care, the model also gives $\bar{a}^{11} = 3.44828$, $\bar{a}^{12} = 1.32626$ and $\bar{a}^{22} = 2.56410$. The intensities do not change with age. Find the policy value for a resident in each living state.
>
> > [!answer]-
> > Each policy value is the EPV of future costs less the EPV of future fees, starting from the resident's current state.
> > $$
> > \begin{align*}
> > V^{(0)} &= 467{,}948.40 - 38{,}027.74(8.36096) \\
> > &= 150{,}000.00 \\
> > V^{(1)} &= 41{,}972.26(3.44828) + 101{,}972.26(1.32626) \\
> > &= 144{,}732.10 + 135{,}241.73 \\
> > &= 279{,}973.83 \\
> > V^{(2)} &= 101{,}972.26(2.56410) \\
> > &= 261{,}467.07
> > \end{align*}
> > $$
> > In independent living, the policy value equals the entry fee, which the community holds against future care costs. Because the intensities do not depend on age, these values do not change with duration either. The assisted living value is the largest, because those residents pay less than cost now and are likely to move into nursing care later.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to apply Markov multiple state models to CCRCs and to calculate premiums, here the entry fee and monthly fees, by the equivalence principle.
> - **Policy values:** ALTAM also asks for CCRC policy values in each state, and [[Thiele's Differential Equation|Thiele's differential equation]] can be written for each of them.
> - **Contract design:** A question can ask how the fees or the policy values change between life care, modified and fee-for-service contracts, or what a refundable entry fee adds to the cost.

> [!warning]- Exam traps
> - **Which states pay the fee:** Under a life care contract the fee is paid in every living state, so the fee annuity is $\bar{a}^{00} + \bar{a}^{01} + \bar{a}^{02}$. Using only $\bar{a}^{00}$ overstates the fee.
> - **The entry fee is income at time 0:** The entry fee is paid once, at entry, so it enters the equation as a lump sum. Multiplying it by an annuity factor treats it as a recurring fee and overstates the income.
> - **Starting state:** A resident who is already in assisted living needs annuities that start in state 1, such as $\bar{a}^{11}$ and $\bar{a}^{12}$. Reusing the values for a new resident in independent living undervalues the cost.
