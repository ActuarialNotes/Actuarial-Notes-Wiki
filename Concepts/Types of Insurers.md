---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:60ab5c692b40147bb55a51280a743affeab13b1b21346904cc64cfa2c34a4280
  sources:
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.5 pp.88-99; Ch.8 p.146; Ch.3 pp.49-50, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
    - "IRMI Glossary, \"risk retention group\", definition, sha256:b3713c667bb71b1dd4918edaa779232f5130cebe7371cf30e878d177abbb6856 — https://www.irmi.com/term/insurance-definitions/risk-retention-group"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Types of Insurers.md
---

**Types of Insurers** are the ways [[Insurer|insurers]] are classified: by their legal form of ownership, by their place of incorporation, by their licensing status in a jurisdiction, and by the system they use to distribute their policies. One insurer belongs to a class on every dimension at once.

| Classification | Classes | What it tells |
| :--- | :--- | :--- |
| Ownership | Stock, mutual, reciprocal, Lloyd's, captive, government | Who supplies the capital and keeps the profit |
| Domicile | Domestic, foreign, alien | Who regulates the insurer's solvency |
| Licensing | Admitted, non-admitted | Which rules and protections apply to its policies |
| Distribution | Independent agency, exclusive agency, direct writer, direct response | How it reaches customers |

## Ownership

A **stock insurer** is a corporation owned by shareholders, who supply its capital and receive its profit as stock dividends and growth in the share price. A board elected by the shareholders runs it. Stock insurers can raise capital by issuing shares, which makes it easier to grow or recover after large losses.

A **mutual insurer** is owned by its policyholders, who elect the board and may share in its results through policyholder dividends. It has no shares to sell, so it builds surplus mainly from retained earnings. Some mutuals have converted to stock insurers (demutualization), or formed a mutual holding company that can own stock subsidiaries, to gain access to capital.

In a **reciprocal exchange**, the members, called subscribers, insure one another. An attorney-in-fact, often a corporation, manages the exchange for a fee, usually a percentage of premium, and handles underwriting, claims and investments. In a mutual the company insures its policyholder-owners, while in a reciprocal the subscribers insure one another, and the attorney-in-fact is not an owner of the exchange.

**Lloyd's** of London is a marketplace, not an insurer. Members, both individual Names and corporations, supply the capital through syndicates, each run by a managing agent, and the syndicates underwrite the risks. Business reaches the syndicates mostly through brokers.

A **captive** is an insurer formed to insure the risks of its parent, or of a group of related owners, rather than the public. A [[Risk Retention Groups|risk retention group]] is a U.S. form of group captive that writes liability insurance for owners in a similar business and can operate in every state with only its domicile's licence.

**Government insurers** insure what the private market won't or can't, such as flood, crop and nuclear risks, and governments run residual markets and, in some places, workers compensation funds. Some Canadian provinces sell [[Public Auto Insurance|public auto insurance]] through crown corporations. [[Government and Industry Insurance Programs]] and [[Social Insurance]] cover these in detail.

## Participating policies

A participating policy from a mutual, or from a stock insurer that issues them, may return a policyholder dividend out of favourable results. The policyholder's net cost is

> $$\text{Net cost} = \text{Premium} - \text{Dividend}$$

- The dividend is not guaranteed.

> [!example]- Which policy has the lower expected net cost, and what does the owner give up by choosing the mutual? {Example}
> A business owner is offered two commercial property policies for the same coverage. A stock insurer quotes a nonparticipating premium of \$24,000. A mutual quotes a participating premium of \$25,500 and has paid policyholder dividends of 8% of premium in each of the last five years. The figures are illustrative.
>
> > [!answer]-
> > - At its recent rate, the mutual's dividend is $0.08 \times 25{,}500 = \$2{,}040$.
> > - The mutual's net cost is $25{,}500 - 2{,}040 = \$23{,}460$, which is \$540 less than the stock insurer's premium.
> > - The dividend is declared by the mutual's board out of its results and is not guaranteed, so in a bad year the owner could pay \$1,500 more than the stock quote.
> > - The owner trades a certain price for a share in the insurer's results.

## Domicile

An insurer is classified relative to a state $s$ by where it is incorporated:

| Status in state $s$ | Incorporated |
| :--- | :--- |
| Domestic | In $s$ |
| Foreign | In another state of the same country |
| Alien | In another country |

The same insurer is domestic in its home state and foreign in every other U.S. state.

## Licensing status

An admitted insurer is licensed in the state and subject to its rate, form and solvency rules, and its policyholders are protected by the state's guaranty fund. A non-admitted insurer is not licensed there but may write risks the admitted market declines through a surplus lines broker ([[Excess and Surplus Lines]]). It has more freedom of rate and form, and its policyholders usually lack guaranty fund protection. An insurer can be admitted in one state and non-admitted in another, so licensing status always refers to a particular jurisdiction.

## Distribution

Insurers are also grouped by how they sell: through independent agents and brokers, exclusive agents, their own sales employees (direct writers), or by direct response without a producer. A stock insurer can use any of these, and so can a mutual, so ownership can't be inferred from how an insurer sells. [[Insurance Distribution Systems]] covers each system.

> [!example]- How is each of these insurers classified in Ohio? {Example}
> Classify each by ownership, place of incorporation relative to Ohio, and licensing status in Ohio.
>
> 1. A company owned by shareholders, incorporated in Ohio and licensed there, selling auto insurance through independent agents.
> 2. A company owned by its policyholders, incorporated in Indiana and licensed in Ohio, selling through exclusive agents.
> 3. A company incorporated in Bermuda that writes excess property coverage in Ohio through a surplus lines broker.
> 4. An exchange whose subscribers insure one another, managed by an attorney-in-fact, incorporated in Pennsylvania and licensed in Ohio.
> 5. A company formed by forty nursing homes to insure their liability, domiciled in Vermont and registered in Ohio.
>
> > [!answer]-
> > - Insurer 1 is a stock insurer, domestic in Ohio and admitted there, using the independent agency system.
> > - Insurer 2 is a mutual insurer, foreign in Ohio and admitted there, using the exclusive agency system.
> > - Insurer 3's ownership isn't stated. It is alien and non-admitted, writing as an eligible surplus lines insurer.
> > - Insurer 4 is a reciprocal exchange, foreign in Ohio and admitted there.
> > - Insurer 5 is a risk retention group, foreign in Ohio and licensed only in Vermont, its domicile.

> [!trap] Foreign is not alien
> A foreign insurer is incorporated in another state of the same country, and an alien insurer is incorporated in another country. An insurer from a neighbouring state is foreign, not alien.
