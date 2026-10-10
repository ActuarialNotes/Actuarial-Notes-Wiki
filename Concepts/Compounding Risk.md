---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:73dabaed2eb288a2b5349a94a127bc4940589410cdcddb66c2968fe6a88267f7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Compounding Risk.md
---

**Compounding risk** is the risk that two or more adverse events interact so that their combined effect is greater than the sum of their separate effects, because one event makes another more likely, more severe or harder to absorb. A pandemic that drives up mortality claims while it crashes equity markets, cuts interest rates and disrupts operations is the standard insurance example. When many such crises feed one another across the economy, the result is sometimes called a polycrisis, or a cascade when the effects run in a chain.

> $$L_{A \cup B} = L_A + L_B + I_{AB}$$

> $$P(A \cap B) = P(A)\,P(B \mid A)$$

- **Symbols:** $L_A$ and $L_B$ are the losses each event causes on its own, and $L_{A \cup B}$ is the loss when both occur. $I_{AB}$ is the interaction loss: it is positive for compounding risks, zero for additive ones and negative when one event offsets the other. In the second block, a compounding link shows up as $P(B \mid A) > P(B)$, so the joint probability exceeds the $P(A)\,P(B)$ an independence assumption would give.
- **Channels of interaction:** Events compound when one triggers another (a cyber attack that halts claims payments and then brings fines and lapses), when one weakens the defence against the next (a market fall that consumes the capital needed for a later catastrophe), or when both hit the same resource at once (liquidity, staff or reinsurance capacity). The amplification often runs through behaviour, such as policyholders surrendering, counterparties pulling credit or regulators intervening.
- **Accumulation is different:** [[Concentration Risk|Accumulation]] arises when many exposures are hit by one event, such as many policies under one hurricane. Compounding arises when different risks interact. The two often occur together, since a single event can accumulate across a portfolio and then compound with an unrelated shock.
- **Diversification assumes the opposite:** [[Risk Diversification|Diversification]] and correlation-based aggregation assume that the total is at most the sum of the parts. A linear correlation matrix cannot represent an interaction loss, so a capital model built on one can show a diversification benefit exactly where compounding removes it. Tail dependence, captured by copulas or by joint scenarios, is the modelling response.
- **Assessment techniques:** Because interactions are hard to estimate from data, insurers assess them with combined scenarios and [[Stress Testing|stress tests]], [[Reverse Stress Testing|reverse stress tests]] that look for the combinations that would cause failure, interconnection maps of the risk register, and expert judgment on conditional probabilities. The aim is to find the combinations that matter, not to estimate every interaction precisely.
- **Mitigation:** The responses are to break the links between risks rather than only reduce each one. Examples are liquidity buffers that stop a market shock becoming a funding crisis, [[Business Continuity Management|business continuity]] plans that let operations survive alongside a catastrophe, and preparing decisions in advance so that leaders are not improvising across several crises at once. The broader capacity to absorb and adapt is [[Organizational Resilience|organizational resilience]].

> [!example]- A Pandemic That Also Crashes the Market {Example}
> An insurer estimates that a severe pandemic on its own would cost \$200 million in excess mortality claims, and a severe equity crash on its own would cost \$300 million in asset losses and guarantee reserves. If both happen together, lower interest rates, forced asset sales to pay claims and higher surrenders add a further \$150 million. The capital model aggregates the two risks with a correlation of 0.25. Compare the sum of the stand-alone losses, the model's aggregated figure and the compounded loss.
>
> > [!answer]-
> > The compounded loss adds the interaction term to the two stand-alone losses.
> > $$
> > \begin{align*}
> > L_A + L_B &= 200 + 300 \\
> > &= 500 \\
> > L_{A \cup B} &= 500 + 150 \\
> > &= 650
> > \end{align*}
> > $$
> > The correlation-based aggregation gives less than the sum.
> > $$
> > \begin{align*}
> > \text{Agg} &= \sqrt{200^2 + 300^2 + 2(0.25)(200)(300)} \\
> > &= \sqrt{160{,}000} \\
> > &= 400
> > \end{align*}
> > $$
> > The model credits a \$100 million diversification benefit, while the joint scenario costs \$150 million more than the sum, so the model understates this outcome by \$250 million. Aggregation describes the average relationship between the risks, while the scenario describes what happens in the tail when they interact. Both views belong in the capital assessment.

> [!example]- When One Event Makes the Other Likely {Example}
> A cyber attack that disables a claims system has an annual probability of 5%, and so does a regulatory enforcement action for poor customer treatment. Assuming independence, how likely is it that both occur in a year? If instead an attack would lead to enforcement with probability 40%, because customers go unpaid, how likely is the combination?
>
> > [!answer]-
> > Under independence the joint probability is the product.
> > $$
> > \begin{align*}
> > P(A \cap B) &= 0.05 \times 0.05 \\
> > &= 0.0025 \\
> > P(A \cap B) &= 0.05 \times 0.40 \\
> > &= 0.02
> > \end{align*}
> > $$
> > The link raises the probability of the combination from 0.25% to 2%, eight times as likely. A risk register that scores each event alone shows two moderate risks, while the combined scenario is a likely and severe one. Breaking the link, for instance with a manual payment fallback, is worth more than reducing either event's stand-alone probability.

> [!tip]- How it appears on the exam
> - **CFE-101:** Questions ask candidates to demonstrate techniques for assessing risk accumulations and compounding risks, often in a case study where a scenario touches several risk categories. A good answer separates accumulation from compounding, builds a combined scenario, and explains why correlation-based aggregation can understate the result.
> - **Calculations:** A question may give stand-alone losses with an interaction term, or a conditional probability, and ask for the compounded loss or the joint probability. It may then ask for the comparison with a diversified figure.
> - **Mitigation:** Questions also ask what leaders can do about compounding risks, such as mapping interconnections, holding buffers that break the transmission links, and planning responses in advance.

> [!warning]- Exam traps
> - **Confusing compounding with accumulation:** Accumulation is one event reaching many exposures. Compounding is different risks amplifying each other. Answering a compounding question with an exposure-concentration analysis misses the interaction.
> - **Relying on correlation:** A correlation coefficient measures linear co-movement on average and cannot produce a combined loss above the sum of the parts. A high correlation is not a substitute for a joint scenario.
> - **Multiplying stand-alone probabilities:** The joint probability of linked events uses the conditional probability, not the product of the marginal ones. Assuming independence can understate a combined scenario's likelihood by an order of magnitude.
> - **Scoring risks one at a time:** A register that rates each risk separately cannot reveal that two moderate risks together are severe. The assessment needs a step that looks at combinations.
