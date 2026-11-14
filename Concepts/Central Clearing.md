---
aliases:
  - Derivatives Trading
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c7ae181f05cffbbdd4511d88118d40125826067903965ae0053395c77c7a71e0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Central Clearing.md
---

**Central Clearing** is the arrangement in which a central counterparty (CCP) steps between the two sides of a [[Derivative Instrument|derivative]] trade, becoming the buyer to every seller and the seller to every buyer. Each trader's counterparty risk is then to the CCP rather than to the other trader. The CCP protects itself by collecting margin from its members, by netting each member's trades into one position, and by holding a default fund that members contribute to.

If $V_{ij}$ is the current value to member $i$ of all its trades with member $j$, member $i$'s credit exposure when the trades are cleared bilaterally is

> $$\text{Bilateral exposure of } i = \sum_{j \neq i} \max(V_{ij},\ 0)$$

- $V_{ji} = -V_{ij}$.

Once the trades are moved to the CCP, member $i$ holds one net position against the CCP, worth

> $$N_i = \sum_{j \neq i} V_{ij}$$

Because the CCP stands on both sides of every trade, the $N_i$ add up to zero across members. Member $i$'s exposure to the CCP is

> $$\text{Exposure of } i \text{ to the CCP} = \max(N_i,\ 0)$$

> [!example]- How much does clearing these three dealers' swaps through a CCP reduce their exposure? {Example}
> In millions of dollars, dealer A's trades with B are worth $V_{AB} = 80$ to A, B's trades with C are worth $V_{BC} = 60$ to B, and C's trades with A are worth $V_{CA} = 50$ to C.
>
> > [!answer]-
> > - Bilaterally, each dealer is exposed to the one counterparty that owes it: A is owed 80 by B, B is owed 60 by C and C is owed 50 by A.
> > - The total exposure in the system is $80 + 60 + 50 = 190$.
> > - Through the CCP, A nets its two positions into $N_A = 80 - 50 = 30$.
> > - Likewise $N_B = -80 + 60 = -20$ and $N_C = -60 + 50 = -10$, which with $N_A$ sum to zero.
> > - The CCP owes A $\$30$ million, and B and C owe the CCP $\$20$ million and $\$10$ million.
> > - The exposure falls from $\$190$ million to $\$30$ million, and the remaining $\$30$ million is covered by the variation margin B and C have already paid.

## Exchange-traded and OTC markets

On an exchange, standard contracts are traded publicly and every trade is cleared by the exchange's clearing house, which is a CCP. In the over-the-counter (OTC) market, contracts are negotiated directly between two parties, usually a dealer and a client, and are either cleared through a CCP or cleared bilaterally.

## Novation

When an OTC trade between A and B is cleared, the original contract is replaced by two contracts, one between A and the CCP and one between the CCP and B. If B later defaults, A's contract with the CCP stands, and the CCP bears the loss.

## Initial and variation margin

**Initial margin** is collateral posted when a position is opened, sized to cover the loss the CCP could suffer while it closes out a defaulting member's position. **Variation margin** is paid every day to settle the change in value, which is the [[Daily Settlement|daily settlement]] of futures applied to every cleared trade. Variation margin settles losses that have already happened, and initial margin covers losses that could happen while a default is closed out. Variation margin is paid in cash, and initial margin may be cash or securities with a haircut.

## The default waterfall

A defaulting member's losses are met by these layers, in order:

1. The defaulter's own initial margin and default fund contribution.
2. A layer of the CCP's own capital.
3. The other members' default fund contributions.
4. Calls on the surviving members.

The order makes the defaulter pay first and gives the CCP's owners a reason to manage risk well.

> [!example]- How is this default loss shared? {Example}
> A clearing member defaults, and closing out its portfolio costs the CCP $\$45$ million. The member had posted $\$25$ million of initial margin and contributed $\$8$ million to the default fund. The CCP has committed $\$5$ million of its own capital ahead of the other members, whose default fund contributions total $\$100$ million.
>
> > [!answer]-
> > - The defaulter's own resources come first, leaving $45 - 25 - 8 = 12$.
> > - The CCP's capital comes next, leaving $12 - 5 = 7$.
> > - The surviving members lose $\$7$ million, or 7% of their $\$100$ million of contributions, each in proportion to what it paid in.
> > - No further calls on them are needed, and the CCP stays solvent. A loss of more than $\$138$ million would have required calls on the survivors.

## Bilateral clearing

In bilateral clearing the two parties manage the credit risk between themselves, usually under an ISDA master agreement, whose credit support annex says what collateral each posts. The master agreement nets all the trades between the two parties into one amount if either defaults, but it cannot net across different counterparties.

## Post-2008 reforms

After the 2008 crisis, the G20 governments agreed that standardized OTC derivatives, such as plain interest rate swaps and index credit default swaps, must be cleared through CCPs and reported to trade repositories. OTC derivatives that are still cleared bilaterally now face mandatory initial and variation margin and higher capital charges, which gives a further reason to clear centrally.

## Risks central clearing does not remove

Clearing concentrates risk in the CCP, so the failure of a large CCP would be a systemic event, and members must find liquid collateral at short notice when markets move. Clearing removes counterparty risk between members, not the market risk of each member's positions. A member that loses on its trades still loses, but the loss is paid daily rather than becoming an unpaid debt.

> [!trap] Netting across counterparties without a CCP
> Bilateral netting under a master agreement only offsets trades with the same counterparty. Netting A's gain against B with its loss to C requires a CCP, so netting everything bilaterally understates the exposure. In the three-dealer example, bilateral exposure is $\$190$ million, not $\$30$ million.
