---
aliases:
  - Contagion-Related Risk
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1fcaa24dcc033f800e6dd74e2c3ec6b520f238e49441fe234ec9d30235d52875
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Contagion Risk.md
---

**Contagion risk** is the risk that financial distress at one firm, market or group entity spreads to others, through direct exposures such as reinsurance recoverables, loans and guarantees, or through indirect channels such as forced asset sales and a loss of confidence. Across the financial system, contagion is the mechanism by which a single failure becomes systemic risk.

If firm $A$ is owed $R_{AB}$ by firm $B$, such as reinsurance recoverables, $A$'s loss from $B$'s failure is

> $$\text{Loss}_A = R_{AB} \times \left(1 - \delta_B\right) \times \mathbf{1}\{L_B > K_B\}$$

- $\delta_B$ is the fraction of $R_{AB}$ that $A$ recovers if $B$ fails.
- $L_B$ is $B$'s loss.
- $K_B$ is $B$'s capital, so $B$ fails when $L_B$ exceeds it.
- $\mathbf{1}\{L_B > K_B\}$ is 1 when $B$ fails and 0 otherwise.

## Probability of default through a chain

If $B$ is itself owed money by a debtor $C$ whose failure is large enough to bring $B$ down, the probability that $B$ fails is

> $$P(D_B) = p_B + p_C\left(1 - p_B\right)$$

- $p_B$ is $B$'s probability of failing for reasons of its own.
- $p_C$ is the probability that $C$ fails.
- $C$'s failure is independent of $B$'s own problems.

> [!example]- How does contagion from $C$ change cedant $A$'s expected credit loss on its recoverable? {Example}
> Cedant $A$ is owed $\$80$ million of recoverables by reinsurer $B$. $B$ has $\$50$ million of capital and is owed $\$120$ million by its retrocessionaire $C$. If $C$ fails, its estate pays 40% of what it owes. If $B$ fails, its estate pays 55%. The annual probability that $C$ fails is 2%, and $B$ fails on its own with probability 0.5%, independently of $C$.
>
> > [!answer]-
> > - If $C$ fails, $B$ loses $120 \times (1 - 0.40) = \$72$ million, which exceeds its $\$50$ million of capital, so $B$ fails too.
> > - When $B$ fails, $A$ loses $80 \times (1 - 0.55) = \$36$ million.
> > - On $B$'s own default probability alone, $A$'s expected loss is $36 \times 0.005 = \$0.18$ million, or $\$180{,}000$.
> > - Allowing for contagion, $B$ fails if it fails on its own or if $C$ fails, so $P(D_B) = 0.005 + 0.02(1 - 0.005) = 0.0249$.
> > - The expected loss is then $36 \times 0.0249 = \$0.896$ million, about $\$896{,}000$, five times as much.
> > - $A$ cannot see this from $B$'s rating alone, because the exposure to $C$ sits in $B$'s retrocession program. Collateral from $B$, or limits on reinsurers with concentrated retrocession, would cut the chain.

> [!trap] Using a counterparty's stand-alone default probability
> A counterparty's own rating ignores the exposures that could bring it down. Using it alone understates the probability of default whenever the counterparty is exposed to a weaker third party, by a factor of five in the example above.

## Channels of contagion

Contagion spreads through direct and indirect channels.

1. **Direct channels.** Distress passes along chains of obligations: retrocession to reinsurance to primary insurance, derivatives counterparties, intragroup loans and guarantees, and securities lending. A cedant stays fully liable to its policyholders when a reinsurer fails, so [[Reinsurance Credit Risk|reinsurance credit risk]] is the most common direct route into an insurer.
2. **Indirect channels.** A distressed firm that sells assets in a hurry pushes their prices down, which marks down the same assets held by everyone else. This is a fire sale. Firms with similar portfolios and strategies are hit by the same shocks. A failure can also make customers, lenders and markets doubt similar firms whether or not they are exposed, which shows up as surrenders, wider credit spreads or lost new business.

Contagion doesn't need a contract between the firms, so an answer that lists only counterparty links is incomplete.

## Reputational contagion in a group

Within a group, contagion is the risk that a problem in one subsidiary damages the reputation, funding or capital of the rest. Customers and counterparties often see a group as one firm, so a scandal or failure in one subsidiary can drive lapses or ratings pressure in a healthy one. Parents may also feel obliged to support a failing subsidiary beyond any legal duty, which moves the loss onto the group's capital.

## Systemic risk in insurance

Traditional insurance is usually seen as less prone to contagion than banking, because insurers are funded by premiums rather than short-term deposits and policyholders cannot all withdraw at once. Arguments about bank runs therefore don't transfer directly. The risk concentrates in non-traditional activities, such as securities lending with cash reinvestment, credit default swaps and products with liquid surrender options, which were the channels in AIG's 2008 crisis. The SOA's 2017 report on systemic risk in the insurance industry reviews this debate and the regulatory responses to it.

In reserving, [[Internal Systemic Risk|internal]] and [[External Systemic Risk|external systemic risk]] mean uncertainty that affects all claims in a valuation alike. That usage is about valuation uncertainty and has nothing to do with contagion between firms.

## Why contagion is hard to quantify

Contagion depends on the whole network of exposures, much of it invisible to any single firm, and on behaviour under stress, which is rarely observed. It appears only in crises, so there is little data. Its effects are strongly nonlinear: a small extra loss can tip a firm past its capital and turn a contained shock into a chain of failures.

## Assessing and managing contagion

Firms assess contagion with counterparty concentration limits, network or exposure maps, and [[Stress Testing|stress scenarios]] in which a major counterparty fails or a market seizes. They manage it with collateral and letters of credit, ring-fencing of group entities, limits on intragroup support, and liquidity buffers that avoid forced sales.
