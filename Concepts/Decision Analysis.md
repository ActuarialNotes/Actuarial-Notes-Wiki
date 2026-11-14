---
aliases:
  - Uncertain Condition
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:96b7bef67853c997825527e32a8bf40db84b9ca128143e2a0e8132328d4cfb47
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Decision Analysis.md
---

**Decision Analysis** is the structured method for choosing among alternatives whose outcomes are uncertain. It lays out the decisions, the uncertain events and the payoffs in a decision tree, attaches probabilities, and chooses the alternative with the best expected value, or the best expected utility when the decision maker is averse to risk.

If an alternative $a$ pays $v(a, s)$ in a state of the world $s$, its expected monetary value is

> $$\text{EMV}(a) = \sum_s p_s \, v(a, s)$$

- $p_s$ is the probability of state $s$.

Decision analysis is the quantitative core of [[Risk-Informed Decision Making (RIDM)|risk-informed decision making]]. It is also a formal remedy for [[Cognitive Bias|cognitive biases]], since it makes probabilities and values explicit before the choice is made.

> [!example]- A product launch gains $\$10$ million with probability 0.40 and loses $\$4$ million otherwise. Not launching is worth $\$0$. Should the insurer launch? {Example}
> - The EMV of launching is $0.40(10) + 0.60(-4) = \$1.6$ million.
> - The EMV of not launching is $\$0$.
> - Launching has the higher EMV, so on EMV the insurer launches.

## Decision trees

A square decision node marks a choice the decision maker controls, and a round chance node marks an uncertain event with probabilities on its branches. The tree runs left to right in the order decisions are made and uncertainty resolves.

The tree is solved from right to left, which is called folding back. At each chance node, take the probability-weighted average of the branches. At each decision node, keep the best branch and prune the rest. The value at the root is the value of the best strategy.

## Expected value of perfect information

The expected value of perfect information (EVPI) is the best expected payoff when the state is known before deciding, less the best expected payoff without that knowledge:

> $$\text{EVPI} = \sum_s p_s \max_a v(a, s) - \max_a \text{EMV}(a)$$

EVPI is an upper bound on what any forecast, survey or test is worth, since no real information is better than perfect.

> [!example]- In the launch above, what is the expected value of perfect information? {Example}
> - With perfect information, the insurer launches only when the product will succeed, for an expected payoff of $0.40(10) + 0.60(0) = 4.0$.
> - Without it, the best EMV is the $1.6$ of launching.
> - The EVPI is $4.0 - 1.6 = \$2.4$ million.

## Expected value of sample information

The expected value of sample information (EVSI) is what a real, imperfect test adds. It is found by putting the test into the tree and updating the probabilities with [[Bayes Theorem|Bayes' theorem]]. A test is worth buying only if EVSI exceeds its cost, and the net value of testing is the EMV with the test less its cost.

> [!example]- Is the market test worth buying, and what is the best strategy? {Example}
> A new product succeeds ($S$) with probability 0.40, when launching it is worth $\$10$ million, and otherwise it loses $\$4$ million. Not launching is worth $\$0$. For $\$0.5$ million, a market test first gives a positive result ($+$) with probability 0.80 if the product would succeed and 0.20 if it would fail.
>
> > [!answer]-
> > - Without the test, the best EMV is launching, at $0.40(10) + 0.60(-4) = 1.6$.
> > - The probability of a positive test weights the test's positive rates by the probabilities of success and failure: $P(+) = 0.80(0.40) + 0.20(0.60) = 0.44$.
> > - By Bayes' theorem, $P(S \mid +) = 0.32/0.44 = 0.7273$ and $P(S \mid -) = 0.08/0.56 = 0.1429$.
> > - After a positive test, launching is worth $0.7273(10) - 0.2727(4) = 6.18$, so launch.
> > - After a negative test, launching is worth $0.1429(10) - 0.8571(4) = -2.00$, so don't launch.
> > - The EMV with the test is $0.44(6.18) + 0.56(0) = 2.72$, so the EVSI is $2.72 - 1.6 = 1.12$.
> > - The EVSI of $\$1.12$ million exceeds the $\$0.5$ million cost, so the best strategy is to test and launch only after a positive result, for a net EMV of $2.72 - 0.5 = \$2.22$ million.
> > - The test is worth less than the $\$2.4$ million EVPI because it can be wrong.

> [!trap] Using the test's reliability in place of the posterior
> After a test, the branches use the updated probabilities $P(S \mid +)$ and $P(S \mid -)$, not the test's reliability $P(+ \mid S)$. In the market test, the branch after a positive result uses $0.7273$, not $0.80$.

## Sensitivity analysis

The inputs are estimates, so the analyst finds the values at which the choice changes, such as the break-even probability of success. A decision that holds across the plausible range is robust, and one that flips near the estimate needs better information.

> [!example]- In the launch above, at what probability of success does launching without a test break even? {Example}
> - Launching breaks even when $10p - 4(1 - p) = 0$.
> - So $p = 4/14 = 0.286$.
> - The estimate of 0.40 is above it, but not by much, which is a reason to buy the test.

## Risk attitude and the certainty equivalent

EMV suits decisions that are small relative to the firm and repeated often. When a loss would hurt the firm, the decision maker uses a concave utility function $u$, and the certainty equivalent (CE) of alternative $a$, the sure amount valued the same as the gamble, is

> $$\text{CE} = u^{-1}\left(\sum_s p_s \, u\big(v(a, s)\big)\right)$$

- A common choice is the exponential utility $u(x) = 1 - e^{-x/R}$, where $R$ is the risk tolerance.

For a risk-averse decision maker the certainty equivalent is lower than the EMV, and the gap is the risk premium.

> [!example]- In the launch above, what is the certainty equivalent of launching for a firm with exponential utility and a risk tolerance of $\$5$ million? {Example}
> - With payoffs in millions, the expected utility is $0.40(1 - e^{-10/5}) + 0.60(1 - e^{4/5}) = 0.3459 - 0.7353 = -0.3895$.
> - Inverting $u$ gives $\text{CE} = -5 \ln(1 + 0.3895) = -1.64$.
> - The certainty equivalent is a loss of $\$1.64$ million against an EMV of $\$1.6$ million, so this firm would rather not launch without testing.
> - The $\$4$ million downside is large relative to its risk tolerance, which is the case in which EMV is the wrong criterion.

## Simulation

When the uncertain inputs are many or continuous, the tree is replaced by Monte Carlo simulation, as in Bertsimas and Freund. The analyst samples the inputs from their distributions, computes the outcome for each draw, and reads off the mean, the spread and the probability of a loss. The [[Expected Value|expected value]] alone hides the downside that simulation shows.
