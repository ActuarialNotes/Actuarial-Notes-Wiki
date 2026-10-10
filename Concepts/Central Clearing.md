---
aliases:
  - Derivatives Trading
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3e2d7dd16a45bb041f636011852d45a9577e5a86297b25464c5909d1a470b80d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Central Clearing.md
---
**Central clearing** is the arrangement in which a central counterparty (CCP) steps between the two sides of a [[Derivative Instrument|derivative]] trade, becoming the buyer to every seller and the seller to every buyer, so that each trader's counterparty risk is to the CCP rather than to the other trader. The CCP protects itself by collecting margin from its members, by netting each member's trades into one position, and by holding a default fund that members contribute to.

> $$N_i = \sum_{j \neq i} V_{ij}$$

> $$\text{Bilateral exposure of } i = \sum_{j \neq i} \max(V_{ij},\ 0)$$

> $$\text{Exposure of } i \text{ to the CCP} = \max(N_i,\ 0)$$

- **Symbols:** $V_{ij}$ is the current value to member $i$ of all its trades with member $j$, so $V_{ji} = -V_{ij}$. Once the trades are moved to the CCP, member $i$ holds one net position worth $N_i$ against the CCP. Because the CCP stands on both sides of every trade, the $N_i$ add up to zero across members.
- **Exchange-traded vs OTC:** On an exchange, standard contracts are traded publicly and every trade is cleared by the exchange's clearing house, which is a CCP. In the over-the-counter (OTC) market, contracts are negotiated directly between two parties, usually a dealer and a client, and are either cleared through a CCP or cleared bilaterally.
- **Novation:** When an OTC trade between A and B is cleared, the original contract is replaced by two contracts, one between A and the CCP and one between the CCP and B. If B later defaults, A's contract with the CCP stands, and the CCP bears the loss.
- **Initial and variation margin:** Initial margin is collateral posted when a position is opened, sized to cover the loss the CCP could suffer while it closes out a defaulting member's position. Variation margin is paid every day to settle the change in value, which is the [[Daily Settlement|daily settlement]] of futures applied to every cleared trade. Variation margin is paid in cash, and initial margin may be cash or securities with a haircut.
- **Default fund and waterfall:** A defaulting member's losses are met first by its own initial margin and default fund contribution, then by a layer of the CCP's own capital, then by the other members' default fund contributions, and finally by calls on the surviving members. The order makes the defaulter pay first and gives the CCP's owners a reason to manage risk well.
- **Bilateral clearing:** In bilateral clearing the two parties manage the credit risk between themselves, usually under an ISDA master agreement, whose credit support annex says what collateral each posts. The master agreement nets all the trades between the two parties into one amount if either defaults, but it cannot net across different counterparties.
- **Post-2008 reforms:** After the 2008 crisis, the G20 governments agreed that standardized OTC derivatives, such as plain interest rate swaps and index credit default swaps, must be cleared through CCPs and reported to trade repositories. OTC derivatives that are still cleared bilaterally now face mandatory initial and variation margin and higher capital charges, which gives a further reason to clear centrally.
- **What it does not remove:** Clearing concentrates risk in the CCP, so the failure of a large CCP would be a systemic event, and members must find liquid collateral at short notice when markets move. Clearing also does not remove market risk. A member that loses on its trades still loses, but the loss is paid daily rather than becoming an unpaid debt.

> [!example]- Netting Three Bilateral Exposures Through a CCP {Example}
> Three dealers have the following swap positions, in \$ millions. Dealer A's trades with B are worth $V_{AB} = 80$ to A, B's trades with C are worth $V_{BC} = 60$ to B, and C's trades with A are worth $V_{CA} = 50$ to C. Find each dealer's credit exposure if the trades are cleared bilaterally, and each dealer's net position if all of them are cleared through a CCP.
>
> > [!answer]-
> > Bilaterally, each dealer is exposed to the one counterparty that owes it: A is owed 80 by B, B is owed 60 by C and C is owed 50 by A. The total exposure in the system is
> > $$
> > \begin{align*}
> > \text{Total} &= 80 + 60 + 50 \\
> > &= 190
> > \end{align*}
> > $$
> > Through the CCP, each dealer nets its two positions into one.
> > $$
> > \begin{align*}
> > N_A &= V_{AB} + V_{AC} \\
> > &= 80 - 50 \\
> > &= 30 \\
> > N_B &= -80 + 60 \\
> > &= -20 \\
> > N_C &= -60 + 50 \\
> > &= -10
> > \end{align*}
> > $$
> > The CCP owes A \$30 million, and B and C owe the CCP \$20 million and \$10 million, which sum to zero. The exposure falls from \$190 million to \$30 million, and the remaining \$30 million is covered by the variation margin B and C have already paid. Netting across all members is what bilateral clearing cannot do, because A's agreement with B cannot set off what A owes C.

> [!example]- A Member Default Through the Waterfall {Example}
> A clearing member defaults. Closing out its portfolio costs the CCP \$45 million. The member had posted \$25 million of initial margin and contributed \$8 million to the default fund. The CCP has committed \$5 million of its own capital ahead of the other members, whose default fund contributions total \$100 million. How is the loss shared?
>
> > [!answer]-
> > The layers are used in order until the loss is covered.
> > $$
> > \begin{align*}
> > \text{Left after defaulter} &= 45 - 25 - 8 \\
> > &= 12 \\
> > \text{Left after CCP capital} &= 12 - 5 \\
> > &= 7
> > \end{align*}
> > $$
> > The surviving members lose \$7 million, or 7% of their \$100 million of contributions, each in proportion to what it paid in. No further calls on them are needed, and the CCP stays solvent. Had the loss been more than \$138 million, the CCP would have had to call for more resources from the survivors.

> [!tip]- How it appears on the exam
> - **INV-201 objective 1d:** Questions ask how derivatives are traded and cleared, comparing exchange-traded with OTC markets and central with bilateral clearing. A good answer names novation, initial and variation margin, the default fund and netting.
> - **Calculation:** A question may give bilateral exposures among a few dealers and ask how much central clearing reduces them, or give a default and ask which layer of the waterfall absorbs it.
> - **Written:** Questions ask why regulators required standard OTC derivatives to be centrally cleared after 2008, and what new risks that creates, such as concentration in the CCP and the liquidity needed for margin calls.
> - **Link to futures:** The same mechanics appear in [[Daily Settlement|daily settlement]] questions, where the margin account of one futures position is tracked day by day.

> [!warning]- Exam traps
> - **Netting without a CCP:** Bilateral netting under a master agreement only offsets trades with the same counterparty. Netting A's gain against B with its loss to C requires a CCP, so a candidate who nets everything bilaterally understates the exposure.
> - **Initial vs variation margin:** Variation margin settles losses that have already happened, and initial margin covers losses that could happen while a default is closed out. Saying that initial margin is returned as the price moves describes variation margin.
> - **Market risk remains:** Central clearing removes counterparty risk between members, not the market risk of each member's positions. A hedged insurer still has its basis risk and its funding needs.
> - **Waterfall order:** The defaulter's own resources come first, before the CCP's capital or the survivors' contributions. Spreading a loss across all members from the start ignores the defaulter-pays principle.
