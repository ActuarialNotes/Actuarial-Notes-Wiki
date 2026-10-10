---
aliases:
  - Contagion-Related Risk
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4b1553e4dfac5de82a5515780aa6f8629ff081dc5a9b2608c8b9a093644ffe0e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Contagion Risk.md
---
**Contagion risk** is the risk that financial distress at one firm, market or group entity spreads to others, through direct exposures such as reinsurance recoverables, loans and guarantees, or through indirect channels such as forced asset sales and a loss of confidence. Within a group, it is the risk that a problem in one subsidiary damages the reputation, funding or capital of the rest. Across the financial system, contagion is the mechanism by which a single failure becomes systemic risk.

> $$\text{Loss}_A = R_{AB} \times \left(1 - \delta_B\right) \times \mathbf{1}\{L_B > K_B\}$$

> $$P(D_B) = p_B + p_C\left(1 - p_B\right)$$

- **Symbols:** Firm $A$ is owed $R_{AB}$ by firm $B$, such as reinsurance recoverables, and recovers a fraction $\delta_B$ of it if $B$ fails. $B$ fails when its loss $L_B$ exceeds its capital $K_B$, and the indicator $\mathbf{1}\{\cdot\}$ is 1 in that case. In the second block, $p_B$ is $B$'s probability of failing for reasons of its own, $p_C$ is the probability that its own debtor $C$ fails, and the formula assumes $C$'s failure is large enough to bring $B$ down and is independent of $B$'s own problems.
- **Direct channels:** Distress passes along chains of obligations: retrocession to reinsurance to primary insurance, derivatives counterparties, intragroup loans and guarantees, and securities lending. A cedant stays fully liable to its policyholders when a reinsurer fails, so [[Reinsurance Credit Risk|reinsurance credit risk]] is the most common direct route into an insurer.
- **Indirect channels:** A distressed firm that sells assets in a hurry pushes their prices down, which marks down the same assets held by everyone else (a fire sale). Firms with similar portfolios and strategies are hit by the same shocks, and a failure can make customers, lenders and markets doubt similar firms whether or not they are exposed, which shows up as surrenders, wider credit spreads or lost new business.
- **Reputational contagion in a group:** Customers and counterparties often see a group as one firm, so a scandal or failure in one subsidiary can drive lapses or ratings pressure in a healthy one. Parents may also feel obliged to support a failing subsidiary beyond any legal duty, which moves the loss onto the group's capital.
- **Systemic risk in insurance:** Traditional insurance is usually seen as less prone to contagion than banking, because insurers are funded by premiums rather than short-term deposits and policyholders cannot all withdraw at once. The risk concentrates in non-traditional activities, such as securities lending with cash reinvestment, credit default swaps and products with liquid surrender options, which were the channels in AIG's 2008 crisis. The SOA's 2017 report on systemic risk in the insurance industry reviews this debate and the regulatory responses to it.
- **Why it is hard to quantify:** Contagion depends on the whole network of exposures, much of it invisible to any single firm, and on behaviour under stress, which is rarely observed. It appears only in crises, so there is little data, and its effects are strongly nonlinear: a small extra loss can tip a firm past its capital and turn a contained shock into a chain of failures.
- **Assessment and management:** Firms assess contagion with counterparty concentration limits, network or exposure maps, and [[Stress Testing|stress scenarios]] in which a major counterparty fails or a market seizes. They manage it with collateral and letters of credit, ring-fencing of group entities, limits on intragroup support, and liquidity buffers that avoid forced sales.

> [!example]- A Two-Stage Default Chain Through Reinsurance {Example}
> Cedant $A$ is owed \$80 million of recoverables by reinsurer $B$. $B$ has \$50 million of capital and is owed \$120 million by its retrocessionaire $C$. If $C$ fails, its estate pays 40% of what it owes. If $B$ fails, its estate pays 55%. The annual probability that $C$ fails is 2%, and $B$ fails on its own with probability 0.5%, independently of $C$.
>
> 1. Show that $C$'s failure brings down $B$, and find $A$'s loss in that case.
> 2. Compare $A$'s expected credit loss on the recoverable when it considers only $B$'s own default probability and when it allows for contagion from $C$.
>
> > [!answer]-
> > $B$ loses 60% of what $C$ owes it, which exceeds its capital, so it fails, and $A$ then loses 45% of its recoverable.
> > $$
> > \begin{align*}
> > L_B &= 120 \times (1 - 0.40) \\
> > &= 72 > 50 \\
> > \text{Loss}_A &= 80 \times (1 - 0.55) \\
> > &= 36
> > \end{align*}
> > $$
> > Allowing for contagion, $B$ fails if it fails on its own or if $C$ fails.
> > $$
> > \begin{align*}
> > P(D_B) &= 0.005 + 0.02(1 - 0.005) \\
> > &= 0.0249 \\
> > E[\text{Loss}_A] &= 36 \times 0.0249 \\
> > &= 0.896
> > \end{align*}
> > $$
> > Using $B$'s stand-alone probability, the expected loss is $36 \times 0.005 = 0.18$, or \$180,000. Contagion raises it to about \$896,000, five times as much. $A$ cannot see this from $B$'s rating alone, because the exposure to $C$ sits in $B$'s retrocession program. Collateral from $B$, or limits on reinsurers with concentrated retrocession, would cut the chain.

> [!tip]- How it appears on the exam
> - **CFE-101:** The risk assessment section asks candidates to analyse risks that are not easily quantifiable, naming contagion-related risk alongside operational and environmental risk. Typical questions ask candidates to identify contagion channels in a group or market described in a case study, explain why the risk resists quantification, and recommend how to assess and manage it.
> - **Systemic risk:** Questions drawing on the SOA's systemic-risk report ask whether and how insurers can generate or transmit systemic risk, and which activities make the difference.
> - **Calculations:** A short calculation may trace a default chain through reinsurance or intragroup exposures, or compare expected credit losses with and without contagion.

> [!warning]- Exam traps
> - **Stand-alone default probabilities:** A counterparty's own rating ignores the exposures that could bring it down. Using it alone understates the probability of default whenever the counterparty is exposed to a weaker third party.
> - **Ignoring indirect channels:** Contagion doesn't need a contract between the firms. Fire sales, common exposures and loss of confidence spread distress to firms with no direct exposure, and answers that list only counterparty links are incomplete.
> - **Treating insurers like banks:** Traditional insurance liabilities are not runnable in the way deposits are, so arguments about bank runs don't transfer directly. The systemic concern is concentrated in non-traditional activities and liquid liabilities.
> - **Systemic in another sense:** In reserving, [[Internal Systemic Risk|internal]] and [[External Systemic Risk|external systemic risk]] mean uncertainty that affects all claims in a valuation alike. That usage is about valuation uncertainty and has nothing to do with contagion between firms.
