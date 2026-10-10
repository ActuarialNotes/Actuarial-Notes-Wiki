---
aliases:
  - Uncertain Condition
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:735072d25f8f623ed64f13f83e22ab65369add18f6841baafb2876db7cf8ee4a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Decision Analysis.md
---
**Decision Analysis** is the structured method for choosing among alternatives when their outcomes are uncertain: lay out the decisions, the uncertain events and the payoffs in a decision tree, attach probabilities, and choose the alternative with the best expected value, or the best expected utility when the decision maker is averse to risk. It also prices information, through the expected value of perfect information, and tests how sensitive the choice is to its inputs.

> $$\text{EMV}(a) = \sum_s p_s \, v(a, s)$$

> $$\text{EVPI} = \sum_s p_s \max_a v(a, s) - \max_a \text{EMV}(a)$$

> $$\text{CE} = u^{-1}\left(\sum_s p_s \, u\big(v(a, s)\big)\right)$$

- **Symbols:** $a$ is an alternative, $s$ a state of the world with probability $p_s$, and $v(a,s)$ the payoff of $a$ in state $s$. EMV is the expected monetary value. EVPI compares the best expected payoff when the state is known before deciding with the best expected payoff without that knowledge. $u$ is a utility function and CE the certainty equivalent, the sure amount the decision maker values the same as the gamble.
- **Decision trees:** A square decision node marks a choice the decision maker controls, and a round chance node marks an uncertain event with probabilities on its branches. The tree runs left to right in the order decisions are made and uncertainty resolves.
- **Folding back:** The tree is solved from right to left. At each chance node, take the probability-weighted average of the branches, and at each decision node, keep the best branch and prune the rest. The value at the root is the value of the best strategy.
- **The value of information:** EVPI is an upper bound on what any forecast, survey or test is worth, since no real information is better than perfect. The expected value of sample information (EVSI) is what a real, imperfect test adds, found by putting the test into the tree and updating probabilities with [[Bayes Theorem|Bayes' theorem]]. A test is worth buying only if EVSI exceeds its cost.
- **Sensitivity analysis:** The inputs are estimates, so the analyst finds the values at which the choice changes, such as the break-even probability of success. A decision that holds across the plausible range is robust, and one that flips near the estimate needs better information.
- **Risk attitude:** EMV suits decisions that are small relative to the firm and repeated often. When a loss would hurt the firm, a concave utility function, such as the exponential $u(x) = 1 - e^{-x/R}$ with risk tolerance $R$, makes the certainty equivalent lower than the EMV, and the gap is the risk premium.
- **Simulation:** When the uncertain inputs are many or continuous, the tree is replaced by Monte Carlo simulation, as in Bertsimas and Freund: sample the inputs from their distributions, compute the outcome for each draw, and read off the mean, the spread and the probability of a loss. The [[Expected Value|expected value]] alone hides the downside that simulation shows.
- **Place in decision making:** Decision analysis is the quantitative core of [[Risk-Informed Decision Making (RIDM)|risk-informed decision making]], and a formal remedy for [[Cognitive Bias|cognitive biases]], since it makes probabilities and values explicit before the choice is made.

> [!example]- A Product Launch with a Market-Test Option {Example}
> An insurer can launch a new critical illness product or not. If the product succeeds, with probability 0.40, the launch is worth \$10 million; if it fails, it loses \$4 million. Not launching is worth \$0. For \$0.5 million, a market test first gives a positive result with probability 0.80 if the product would succeed and 0.20 if it would fail. Find the EMV of launching now, the EVPI, and whether the test is worth buying.
>
> > [!answer]-
> > Without information, launching beats not launching, and perfect information would let the insurer launch only when the product will succeed.
> > $$
> > \begin{align*}
> > \text{EMV(launch)} &= 0.40(10) + 0.60(-4) \\
> > &= 1.6 \\
> > \text{EVPI} &= 0.40(10) + 0.60(0) - 1.6 \\
> > &= 2.4
> > \end{align*}
> > $$
> > With the test, update the probability of success by Bayes' theorem.
> > $$
> > \begin{align*}
> > P(+) &= 0.80(0.40) + 0.20(0.60) \\
> > &= 0.44 \\
> > P(S \mid +) &= \frac{0.32}{0.44} \\
> > &= 0.7273 \\
> > P(S \mid -) &= \frac{0.08}{0.56} \\
> > &= 0.1429
> > \end{align*}
> > $$
> > Fold back each branch. After a positive test, launching is worth $0.7273(10) - 0.2727(4) = 6.18$, so launch. After a negative test, it is worth $0.1429(10) - 0.8571(4) = -2.00$, so don't.
> > $$
> > \begin{align*}
> > \text{EMV(test)} &= 0.44(6.18) + 0.56(0) \\
> > &= 2.72 \\
> > \text{EVSI} &= 2.72 - 1.6 \\
> > &= 1.12
> > \end{align*}
> > $$
> > The test adds \$1.12 million, more than its \$0.5 million cost, so the best strategy is to test and launch only after a positive result, for a net EMV of \$2.22 million. The test is worth less than the \$2.4 million EVPI because it can be wrong.

> [!example]- Sensitivity and Risk Attitude {Example}
> In the previous example, find the probability of success at which launching without a test breaks even. Then evaluate the launch-now gamble for a firm with exponential utility and a risk tolerance of $R = \$5$ million.
>
> > [!answer]-
> > The break-even probability solves $10p - 4(1 - p) = 0$, so $p = 4/14 = 0.286$. The estimate of 0.40 is above it, but not by much, which is a reason to buy the test. For the risk-averse firm, with payoffs in millions:
> > $$
> > \begin{align*}
> > E[u] &= 0.40\left(1 - e^{-10/5}\right) + 0.60\left(1 - e^{4/5}\right) \\
> > &= 0.3459 - 0.7353 \\
> > &= -0.3895 \\
> > \text{CE} &= -5 \ln(1 + 0.3895) \\
> > &= -1.64
> > \end{align*}
> > $$
> > The certainty equivalent is a loss of \$1.64 million, against an EMV of \$1.6 million, so this firm would rather not launch without testing. The \$4 million downside is large relative to its risk tolerance, which is the case in which EMV is the wrong criterion.

> [!tip]- How it appears on the exam
> - **CP-311:** The objective asks the candidate to apply statistical and quantification methods to managerial decisions under uncertain conditions. Expect to draw and fold back a decision tree, compute EMV, EVPI and the value of a test, update probabilities with Bayes' theorem, and recommend a decision with its sensitivity to the key inputs.
> - **CP-311:** Questions on Bertsimas and Freund's simulation material ask how to set up a Monte Carlo model of a business decision, which inputs to treat as random, and how to read the output distribution, not only its mean.

> [!warning]- Exam traps
> - **Cost of information:** EVSI is compared with the test's cost, and the net value of testing subtracts the cost. Forgetting to subtract it, or subtracting it twice, is the most common arithmetic error.
> - **Use posterior probabilities:** After a test, the branches use the updated probabilities $P(S \mid +)$ and $P(S \mid -)$, not the test's reliability $P(+ \mid S)$. Mixing them up gives the wrong tree.
> - **EVPI is an upper bound:** No real test is worth more than EVPI. An answer in which sample information beats perfect information signals an error.
> - **EMV assumes risk neutrality:** EMV is right for small, repeated decisions. When one outcome could threaten the firm, use utility or state the risk, and say why the criterion was chosen.
