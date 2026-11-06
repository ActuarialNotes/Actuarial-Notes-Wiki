---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:ec35e899c388db4aace549e9a06b2d3f1c37dc856b820221d854e18eb1f46d19
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Bayes' Formula: hypotheses partition Ω, prior, evidence, P(E|H_i), posterior; eqs (4.1)-(4.3) P(E)=Σ P(H_k)P(E|H_k) (pp.145-146, PDF pp.153-154), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.3 Bayes' Rule (Bayes' rule with LTP denominator over a partition), read 2026-11-06, sha256:47b55f920c18f40f4e9332d6d9dc13e065da3b748de97d18a8dcf53d52a2d48d — https://www.probabilitycourse.com/chapter1/1_4_3_bayes_rule.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.4 Conditional Independence (P(A∩B|C)=P(A|C)P(B|C); two-coin example, P(A∩B)=Σ P(A|C_i)P(B|C_i)P(C_i)), read 2026-11-06, sha256:c0648f3ab8dbef113ddc1bd80d29e311a705fbd2a4adc143f549eb567a2e28d6 — https://www.probabilitycourse.com/chapter1/1_4_4_conditional_independence.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.2 Law of Total Probability (partition of S; P(A)=Σ P(A|B_i)P(B_i)), read 2026-11-06, sha256:e670bbb6d9b77df6d4a0c8d7fa5d5317d0bc1991eb0f7fb8e4df15a2b41a3825 — https://www.probabilitycourse.com/chapter1/1_4_2_total_probability.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Poisson distribution P(Y=k)=e^{−λt}(λt)^k/k! (Ch. 5 exercise 11, PDF p.206), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (2026-05 file), Q306 solution, PDF p.84 (Bayes with survival likelihoods P(T>1|H), P(T>1|A) for 'still in force'), read 2026-11-06, sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2), Topic 2 outcome b (PDF p.3), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayes Theorem.md
---

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
