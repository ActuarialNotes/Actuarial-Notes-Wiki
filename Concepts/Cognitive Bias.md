---
aliases:
  - Cognitive Biase
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d482b5e39db884b26fcbdf92e684347952b261e351e5f8d21b23c0a7c762150f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cognitive Bias.md
---
**A Cognitive Bias** is a systematic, predictable departure of human judgment from what a rational analysis of the same information would conclude, usually caused by the mental shortcuts (heuristics) people use to decide quickly. Because the error has a direction rather than being random noise, it does not average out across decisions, and in organizations it compounds through groups, incentives and earlier commitments.

> $$\hat{X} = A + \lambda (X - A)$$

> $$v(x) = \begin{cases} x^{\alpha} & x \ge 0 \\ -\kappa(-x)^{\beta} & x < 0 \end{cases}$$

- **Symbols:** In the anchoring formula, $A$ is the anchor, $X$ is the estimate the evidence supports, and $\lambda$, between 0 and 1, is how far the judge adjusts toward it. A value below 1 is insufficient adjustment, so $\hat{X}$ stays biased toward $A$. In the prospect theory value function, outcomes are gains or losses from a reference point, $\alpha, \beta < 1$ make the curve concave for gains and convex for losses, and $\kappa > 1$ is loss aversion. Tversky and Kahneman's estimates were about $\alpha = \beta = 0.88$ and $\kappa = 2.25$.
- **Anchoring:** Judgments start from a value, often an irrelevant or outdated one, and adjust too little. Last year's selected reserve, the plan's growth number or the first offer in a negotiation all act as anchors.
- **Overconfidence:** People are too sure of their estimates. Ranges stated as 90% confidence intervals contain the true value far less than 90% of the time, so risk is understated.
- **Confirmation bias:** People look for and weigh evidence that supports what they already believe, and discount evidence against it. An analyst who expects favourable development will notice the quarters that show it.
- **Availability:** Events that are vivid, recent or easy to recall are judged more likely than they are. A recent large loss raises perceived frequency, and a long quiet period lowers it.
- **Framing:** The same choice described as gains or as losses leads to different decisions, because people are risk averse for gains and risk seeking for losses relative to their reference point.
- **Escalation of commitment:** Decision makers keep investing in a failing course of action to justify earlier choices, treating sunk costs as a reason to continue. Large IT projects and struggling acquisitions are the usual organizational examples.
- **Groupthink:** A cohesive group seeking agreement suppresses dissent and stops testing alternatives, so the group is more confident and less accurate than its members. Strong leaders who state a view first make it worse.
- **Debiasing:** Remedies include using outside views and base rates, asking someone to argue the opposite or run a pre-mortem, setting decision rules before seeing results, separating the person who made a commitment from the decision to continue it, and using formal [[Decision Analysis|decision analysis]]. Bazerman and Moore describe lasting change as unfreezing the old process, changing it and refreezing the new one.

> [!example]- An Anchored Reserve Estimate {Example}
> Last year the reserving team selected an ultimate loss of \$50 million for an accident year. This year's data, analysed without reference to the prior selection, supports \$58 million. The team reviews the new indications starting from last year's number and adjusts only 40% of the way. What does it select, and what is the bias?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \hat{X} &= 50 + 0.40(58 - 50) \\
> > &= 50 + 3.2 \\
> > &= \$53.2 \text{ million}
> > \end{align*}
> > $$
> > The selection is \$4.8 million below what the evidence supports, so the [[Loss Reserving|reserves]] are deficient by that amount. Each year repeats the partial adjustment, which is why anchored reserves tend to creep toward adequacy over several years rather than being corrected at once. A remedy is to form the indication before looking at the prior selection, and to document why any change from the indication is made, which the [[Standards of Practice|standards of practice]] expect in any case.

> [!example]- The Same Decision in Two Frames {Example}
> An insurer faces \$600 million of exposure on a failing book. Under program A it saves \$200 million for certain. Under program B it saves all \$600 million with probability $1/3$ and nothing with probability $2/3$. Described as losses, A loses \$400 million for certain, and B loses nothing with probability $1/3$ and \$600 million with probability $2/3$. Using the prospect theory value function with $\alpha = \beta = 0.88$ and $\kappa = 2.25$, show which program each frame favours.
>
> > [!answer]-
> > Both programs have the same expected outcome, saving \$200 million. In the gain frame:
> > $$
> > \begin{align*}
> > v(A) &= 200^{0.88} \\
> > &= 105.9 \\
> > v(B) &= \tfrac{1}{3} \times 600^{0.88} \\
> > &= 92.8
> > \end{align*}
> > $$
> > In the loss frame:
> > $$
> > \begin{align*}
> > v(A) &= -2.25 \times 400^{0.88} \\
> > &= -438.5 \\
> > v(B) &= \tfrac{2}{3} \times (-2.25 \times 600^{0.88}) \\
> > &= -417.7
> > \end{align*}
> > $$
> > The gain frame favours the sure program A, and the loss frame favours the gamble B, although the outcomes are identical. A management team told it can "save \$200 million" and one told it will "lose \$400 million" may choose differently. The defence is to present every option in the same frame, with the full distribution of outcomes.

> [!tip]- How it appears on the exam
> - **CP-311:** The objective asks the candidate to explain the role of cognitive biases in suboptimal individual decisions. Questions describe a decision, such as an acquisition, a project overrun or a forecast, and ask the candidate to identify the biases at work, explain how they led to a poor outcome, and recommend debiasing measures. Name the bias, point to the evidence for it in the case, and match the remedy to the bias.
> - **CP-311:** The companion objective on organizational behaviour asks how group dynamics, incentives and decision processes affect decision quality, where groupthink, escalation of commitment and biased capital allocation are the usual examples.

> [!warning]- Exam traps
> - **Bias versus noise:** A cognitive bias is systematic, so it shifts decisions in one direction and does not cancel out across many decisions. Random inconsistency between judges is a different problem with different remedies.
> - **Sunk costs are not a reason:** Escalation of commitment is recognized when past spending is cited as a reason to continue. The rational test looks only at future costs and benefits from today.
> - **Framing changes nothing real:** Two frames of the same decision have the same outcomes, so a change in choice between them is the bias. Do not argue that one frame is more accurate.
> - **Naming is not explaining:** A list of bias names earns little. Each should be tied to what happened in the case and to a specific remedy.
> - **Statistical bias is different:** The [[Bias|bias of an estimator]] is a property of a statistical method, while a cognitive bias is a property of human judgment. They can interact, as when an analyst picks the method that confirms the expected answer.
