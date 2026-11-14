---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:366faeedfe197400b5f2d84cc5e9e6855f6bb63be30e4ffc92634b42c6f81aae
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Compounding Risk.md
---

**Compounding risk** is the risk that two or more adverse events interact so that their combined effect is greater than the sum of their separate effects, because one event makes another more likely, more severe or harder to absorb. A pandemic that drives up mortality claims while it crashes equity markets, cuts interest rates and disrupts operations is the standard insurance example.

When events $A$ and $B$ occur together, the loss $L_{A \cup B}$ is

> $$L_{A \cup B} = L_A + L_B + I_{AB}$$

- $L_A$ is the loss event $A$ causes on its own.
- $L_B$ is the loss event $B$ causes on its own.
- $I_{AB}$ is the interaction loss. It is positive for compounding risks, zero for additive ones and negative when one event offsets the other.

When many such crises feed one another across the economy, the result is sometimes called a polycrisis, or a cascade when the effects run in a chain.

> [!example]- How does this insurer's compounded loss compare with its correlation-based capital model? {Example}
> An insurer estimates that a severe pandemic on its own would cost $\$200$ million in excess mortality claims, and a severe equity crash on its own would cost $\$300$ million in asset losses and guarantee reserves. If both happen together, lower interest rates, forced asset sales to pay claims and higher surrenders add a further $\$150$ million. The capital model aggregates the two risks with a correlation of $0.25$.
>
> > [!answer]-
> > - The sum of the stand-alone losses is $200 + 300 = \$500$ million.
> > - The compounded loss adds the interaction term, $500 + 150 = \$650$ million.
> > - The correlation-based aggregate is $\sqrt{200^2 + 300^2 + 2(0.25)(200)(300)} = \sqrt{160{,}000} = \$400$ million.
> > - The model credits a $\$100$ million diversification benefit, while the joint scenario costs $\$150$ million more than the sum.
> > - The model understates this outcome by $650 - 400 = \$250$ million. Aggregation describes the average relationship between the risks, and the scenario describes what happens in the tail when they interact, so both belong in the capital assessment.

## Joint probability of linked events

The probability that linked events $A$ and $B$ both occur is

> $$P(A \cap B) = P(A)\,P(B \mid A)$$

- $P(B \mid A)$ is the [[Conditional Probability|conditional probability]] of $B$ given that $A$ has occurred.

A compounding link shows up as $P(B \mid A) > P(B)$, so the joint probability exceeds the $P(A)\,P(B)$ an independence assumption would give.

> [!example]- How much more likely is the combination of these two events when they are linked? {Example}
> A cyber attack that disables a claims system has an annual probability of 5%, and so does a regulatory enforcement action for poor customer treatment. Because customers go unpaid, an attack would lead to enforcement with probability 40%.
>
> > [!answer]-
> > - Under independence, the joint probability is $0.05 \times 0.05 = 0.0025$, or 0.25%.
> > - With the link, it is $0.05 \times 0.40 = 0.02$, or 2%.
> > - The link makes the combination eight times as likely.
> > - A risk register that scores each event alone shows two moderate risks, while the combined scenario is a likely and severe one.
> > - Breaking the link, for instance with a manual payment fallback, is worth more than reducing either event's stand-alone probability.

> [!trap] Multiplying stand-alone probabilities
> The joint probability of linked events uses the conditional probability, not the product of the marginal ones. Assuming independence can understate a combined scenario's likelihood by an order of magnitude, as the cyber example's 0.25% against 2% shows.

## Channels of interaction

Events compound through three channels:

1. One event triggers another, as when a cyber attack halts claims payments and then brings fines and lapses.
2. One event weakens the defence against the next, as when a market fall consumes the capital needed for a later catastrophe.
3. Both events hit the same resource at once, such as liquidity, staff or reinsurance capacity.

The amplification often runs through behaviour, such as policyholders surrendering, counterparties pulling credit or regulators intervening.

## Compounding and accumulation

| | Accumulation | Compounding |
| --- | --- | --- |
| What happens | One event hits many exposures | Different risks interact |
| Example | Many policies under one hurricane | A pandemic that also crashes the market |
| How it is assessed | Exposure concentration analysis | Combined scenarios |

[[Concentration Risk|Accumulation]] and compounding often occur together, since a single event can accumulate across a portfolio and then compound with an unrelated shock. Answering a compounding question with an exposure concentration analysis misses the interaction.

## Compounding and diversification

[[Risk Diversification|Diversification]] and correlation-based aggregation assume that the total is at most the sum of the parts. A [[Correlation|correlation]] coefficient measures linear co-movement on average, and a linear correlation matrix cannot represent an interaction loss. A capital model built on one can therefore show a diversification benefit exactly where compounding removes it. Tail dependence, captured by [[Copula|copulas]] or by joint scenarios, is the modelling response.

## Assessing compounding risks

Interactions are hard to estimate from data, so insurers assess them with:

1. Combined scenarios and [[Stress Testing|stress tests]].
2. [[Reverse Stress Testing|Reverse stress tests]] that look for the combinations that would cause failure.
3. Interconnection maps of the risk register.
4. Expert judgment on conditional probabilities.

The aim is to find the combinations that matter rather than to estimate every interaction precisely. A register that rates each risk separately cannot reveal that two moderate risks together are severe, so the assessment needs a step that looks at combinations.

## Mitigating compounding risks

The responses break the links between risks rather than only reduce each one. Liquidity buffers stop a market shock becoming a funding crisis. [[Business Continuity Management|Business continuity]] plans let operations survive alongside a catastrophe. Decisions prepared in advance keep leaders from improvising across several crises at once. The broader capacity to absorb and adapt is [[Organizational Resilience|organizational resilience]].
