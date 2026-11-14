---
aliases:
  - Cognitive Biase
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bb4311b4fe70bdc2494cc0ea1513caefb151ffe7d1b69e95f469458d849b2c8e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cognitive Bias.md
---
A **Cognitive Bias** is a systematic, predictable departure of human judgment from what a rational analysis of the same information would conclude, usually caused by the mental shortcuts (heuristics) people use to decide quickly. Because the error has a direction rather than being random noise, it does not average out across decisions, and in organizations it compounds through groups, incentives and earlier commitments.

The biases that most often lead to suboptimal decisions are:

1. **Anchoring.** Judgments start from a value, often an irrelevant or outdated one, and adjust too little. Last year's selected reserve, the plan's growth number or the first offer in a negotiation all act as anchors.
2. **Overconfidence.** People are too sure of their estimates. Ranges stated as 90% confidence intervals contain the true value far less than 90% of the time, so risk is understated.
3. **Confirmation bias.** People look for and weigh evidence that supports what they already believe, and discount evidence against it. An analyst who expects favourable development will notice the quarters that show it.
4. **Availability.** Events that are vivid, recent or easy to recall are judged more likely than they are. A recent large loss raises perceived frequency, and a long quiet period lowers it.
5. **Framing.** The same choice described as gains or as losses leads to different decisions, because people are risk averse for gains and risk seeking for losses relative to their reference point.
6. **Escalation of commitment.** Decision makers keep investing in a failing course of action to justify earlier choices, treating sunk costs as a reason to continue. Large IT projects and struggling acquisitions are the usual organizational examples. The rational test looks only at future costs and benefits from today.
7. **Groupthink.** A cohesive group seeking agreement suppresses dissent and stops testing alternatives, so the group is more confident and less accurate than its members. Strong leaders who state a view first make it worse.

A cognitive bias is a property of human judgment, while the [[Bias|bias of an estimator]] is a property of a statistical method. The two can interact, as when an analyst picks the method that confirms the expected answer.

## Anchoring and insufficient adjustment

A judge who starts from an anchor $A$ and adjusts toward the estimate the evidence supports, $X$, reaches the judgment

> $$\hat{X} = A + \lambda (X - A)$$

- $\lambda$, between 0 and 1, is how far the judge adjusts toward $X$.

A value of $\lambda$ below 1 is insufficient adjustment, so $\hat{X}$ stays biased toward $A$.

> [!example]- What does this reserving team select, and what is the bias? {Example}
> Last year the reserving team selected an ultimate loss of $\$50$ million for an accident year. This year's data, analysed without reference to the prior selection, supports $\$58$ million. The team reviews the new indications starting from last year's number and adjusts only 40% of the way.
>
> > [!answer]-
> > - The selection is $\hat{X} = 50 + 0.40 \times (58 - 50) = \$53.2$ million.
> > - That is $\$4.8$ million below what the evidence supports, so the [[Loss Reserving|reserves]] are deficient by that amount.
> > - Each year repeats the partial adjustment, so anchored reserves tend to creep toward adequacy over several years rather than being corrected at once.
> > - A remedy is to form the indication before looking at the prior selection, and to document why any change from the indication is made, which the [[Standards of Practice|standards of practice]] expect in any case.

## Framing and prospect theory

In prospect theory, outcomes are valued as gains or losses $x$ from a reference point, and the value of an outcome is

> $$v(x) = \begin{cases} x^{\alpha} & x \ge 0 \\ -\kappa(-x)^{\beta} & x < 0 \end{cases}$$

- $\alpha, \beta < 1$ make the curve concave for gains and convex for losses.
- $\kappa > 1$ is loss aversion.

Tversky and Kahneman's estimates were about $\alpha = \beta = 0.88$ and $\kappa = 2.25$. Two frames of the same decision have the same outcomes, so a change in choice between them is the bias, and neither frame is the more accurate one.

> [!example]- Which program does each frame favour? {Example}
> An insurer faces $\$600$ million of exposure on a failing book. Under program A it saves $\$200$ million for certain. Under program B it saves all $\$600$ million with probability $1/3$ and nothing with probability $2/3$. Described as losses, A loses $\$400$ million for certain, and B loses nothing with probability $1/3$ and $\$600$ million with probability $2/3$. Use $\alpha = \beta = 0.88$ and $\kappa = 2.25$.
>
> > [!answer]-
> > - Both programs have the same expected outcome, saving $\$200$ million.
> > - In the gain frame, $v(A) = 200^{0.88} = 105.9$ and $v(B) = \tfrac{1}{3} \times 600^{0.88} = 92.8$, so the sure program A is favoured.
> > - In the loss frame, $v(A) = -2.25 \times 400^{0.88} = -438.5$ and $v(B) = \tfrac{2}{3} \times (-2.25 \times 600^{0.88}) = -417.7$, so the gamble B is favoured.
> > - A management team told it can "save $\$200$ million" and one told it will "lose $\$400$ million" may choose differently, although the outcomes are identical.
> > - The defence is to present every option in the same frame, with the full distribution of outcomes.

## Debiasing

Remedies for cognitive bias include:

1. Using outside views and base rates.
2. Asking someone to argue the opposite, or running a pre-mortem.
3. Setting decision rules before seeing results.
4. Separating the person who made a commitment from the decision to continue it.
5. Using formal [[Decision Analysis|decision analysis]].

Bazerman and Moore describe lasting change as unfreezing the old process, changing it and refreezing the new one. In a case, each bias named is tied to what happened and to a specific remedy, because a list of bias names alone explains nothing.

> [!trap] Treating a bias as random noise
> A cognitive bias is systematic, so it shifts decisions in one direction and does not cancel out across many decisions. Random inconsistency between judges is a different problem with different remedies.
