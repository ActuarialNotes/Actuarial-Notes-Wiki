**Bayes' Theorem** reverses a [[Conditional Probability|conditional probability]]. It updates the prior probability $P(H)$ of a hypothesis to the posterior probability $P(H \mid E)$ after evidence $E$ is observed.

> $$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$

- $H$ is the hypothesis and $E$ is the observed evidence.
- $P(E \mid H)$ is the likelihood: the probability of the evidence if the hypothesis is true.
- The denominator $P(E)$ comes from [[The Law of Total Probability|the law of total probability]] over a partition $H_1, H_2, \ldots$ of the sample space.

> $$P(E) = \sum_i P(E \mid H_i)\,P(H_i)$$

> [!idea] The idea
> Questions usually tell you how likely the evidence is under each hypothesis. They ask the reverse: how likely each hypothesis is, now that the evidence has been seen. Bayes' theorem answers by giving each hypothesis its share of the total probability of the evidence.

![[Media/Figures/Bayes_Theorem.svg|340]]

## One portfolio, counted

An insurer has 1,000 policyholders. 200 are high-risk and 800 are low-risk. A high-risk policyholder files a claim with probability 0.40, and a low-risk one with probability 0.10.

| | Claim | No claim | Total |
|---|---|---|---|
| High-risk | 80 | 120 | 200 |
| Low-risk | 80 | 720 | 800 |
| Total | 160 | 840 | 1,000 |

A policyholder files a claim. What is the probability they are high-risk? The evidence is the claim, so the sample space is the 160 claimants.

> $$P(\text{high} \mid \text{claim}) = \frac{80}{160} = 0.50$$

The claim raised the probability of high-risk from the prior 0.20 to the posterior 0.50.

## From the counts to the formula

The table and the formula do the same thing. Each cell in the claim column is a likelihood times a prior, and the column total is the law of total probability.

> $$P(\text{high} \mid \text{claim}) = \frac{0.40 \times 0.20}{0.40 \times 0.20 + 0.10 \times 0.80} = \frac{0.08}{0.16} = 0.50$$

- The numerator is the high-risk share of the claims.
- The denominator is all the claims, from both classes.
- With more than two classes, the denominator has one term per class.

## Why a small prior needs strong evidence

A test flags 95% of defective items, and it also flags 10% of good ones. Only 2% of items are defective. An item is flagged. Is it probably defective?

> $$P(\text{defective} \mid \text{flagged}) = \frac{0.95 \times 0.02}{0.95 \times 0.02 + 0.10 \times 0.98} = \frac{0.019}{0.117} \approx 0.16$$

Most flagged items are good. The test is accurate, but good items outnumber defective ones 49 to 1, so the 10% of good items that are flagged swamp the defective ones.

> [!trap] Reading the likelihood as the posterior
> "The test flags 95% of defective items" is $P(\text{flagged} \mid \text{defective})$. The question asks for $P(\text{defective} \mid \text{flagged})$. Answering 0.95 skips the prior entirely.

## When the evidence comes from a distribution

The likelihood doesn't have to be stated as a single probability. It can be read off each class's distribution.

- A **claim count** is often Poisson, with a different mean in each class. The likelihood of $k$ claims is $e^{-\lambda}\lambda^k / k!$ for that class's $\lambda$.
- **"Still in force at time $t$"** means the lifetime exceeded $t$. The likelihood is the survival probability $P(T > t)$, not the density at $t$.

## When the evidence narrows the hypotheses

Sometimes the evidence also says which hypotheses are still possible, such as "the claim came from an urban driver". Hypotheses ruled out have likelihood 0, so they drop out of the denominator. Sum only over the hypotheses still in play.

> $$P\big(H_j \mid E \cap (H_1 \cup \cdots \cup H_k)\big) = \frac{P(E \mid H_j)\,P(H_j)}{\sum_{i=1}^{k} P(E \mid H_i)\,P(H_i)}, \quad j \le k$$

## Repeated observations of an unknown class

A coin is chosen at random from a bag and tossed twice. Given the coin, the two tosses are independent. Without knowing the coin, they are not, because the first toss is evidence about which coin it is.

To find the probability of the second observation given the first, condition on the class in both the numerator and the denominator.

> $$P(B \mid A) = \frac{\sum_i P(A \mid C_i)\,P(B \mid C_i)\,P(C_i)}{\sum_i P(A \mid C_i)\,P(C_i)}$$

- $C_i$ are the classes, and $A$ and $B$ are independent within each class.
- If $A$ and $B$ are both more likely in the same class, observing $A$ makes $B$ more likely.

## Try it

> [!example]- Two tosses of an unknown coin {Example}
> A bag holds a fair coin and a coin that lands heads with probability 0.8. One coin is drawn at random and tossed twice. Find the probability that the second toss is heads given that the first is.
>
> > [!answer]-
> > **Plan:** condition on the coin for both the joint probability and the first toss.
> > $$P(H_1) = 0.5(0.5) + 0.5(0.8) = 0.65$$
> > $$P(H_1 \cap H_2) = 0.5(0.5)^2 + 0.5(0.8)^2 = 0.445$$
> > $$P(H_2 \mid H_1) = \frac{0.445}{0.65} \approx 0.685$$
> > A first head makes the biased coin more likely, so a second head is more likely than 0.65.

> [!example]- Poisson claim counts {Example}
> 60% of drivers have a Poisson claim count with mean 1, and 40% have mean 3. A driver has exactly 2 claims. Find the probability that the driver is in the mean-3 class.
>
> > [!answer]-
> > **Plan:** read each likelihood off that class's Poisson distribution.
> > $$P(2 \mid \lambda = 1) = \frac{e^{-1}\,1^2}{2!} \approx 0.1839, \qquad P(2 \mid \lambda = 3) = \frac{e^{-3}\,3^2}{2!} \approx 0.2240$$
> > $$P(\lambda = 3 \mid 2) = \frac{0.40 \times 0.2240}{0.60 \times 0.1839 + 0.40 \times 0.2240} = \frac{0.0896}{0.2000} \approx 0.448$$

> [!example]- A policy still in force {Example}
> Half of policies are type A, whose time to cancellation is exponential with mean 1 year. The other half are type B, with mean 2 years. A policy is still in force after 1 year. Find the probability it is type A.
>
> > [!answer]-
> > **Plan:** the evidence is survival past 1 year, so each likelihood is $P(T > 1)$.
> > $$P(A \mid T > 1) = \frac{0.5\,e^{-1}}{0.5\,e^{-1} + 0.5\,e^{-0.5}} \approx 0.378$$
> > Using the densities at 1 instead gives about 0.548, which is the answer to a different question: the policy was cancelled at exactly 1 year.

> [!warning]- Exam traps
> - **Reading the likelihood as the posterior.** With a small prior, the posterior is far below the test's accuracy.
> - **Dropping the prior.** Dividing each likelihood by the sum of the likelihoods is right only when the classes are equally likely to begin with. Every term needs its $P(H_i)$.
> - **The density for "still in force".** Survival past $t$ has likelihood $P(T > t)$, not $f(t)$.
