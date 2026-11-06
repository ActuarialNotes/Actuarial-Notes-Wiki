---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:e173cf2c3326bbb7a342c4eb61a1a797390530129807705fd4ef2d6b40880e89
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 property 4, Thm 1.2 (pairwise disjoint), Thm 1.3 (P(E)=Σ P(E∩A_i) over a partition), Thm 1.4 with proof 'added twice … subtracted once' (pp.22-24, PDF pp.30-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Bayes' Formula: hypotheses partition Ω, prior, evidence, P(E|H_i), posterior; eqs (4.1)-(4.3) P(E)=Σ P(H_k)P(E|H_k) (pp.145-146, PDF pp.153-154), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.2 Law of Total Probability (partition of S; P(A)=Σ P(A|B_i)P(B_i)), read 2026-11-06, sha256:e670bbb6d9b77df6d4a0c8d7fa5d5317d0bc1991eb0f7fb8e4df15a2b41a3825 — https://www.probabilitycourse.com/chapter1/1_4_2_total_probability.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.1.3 Conditioning and Independence (conditional PMF P_{X|A}(x_i)=P(X=x_i and A)/P(A); E[X|A]=Σ x_i P_{X|A}(x_i); LTP over values of a discrete random variable; independent random variables: conditional PMF equals marginal), read 2026-11-06, sha256:937740fa7d0feecdb1a09585b50e5fc6bea5ed4cfae6425ad7aa56855a0f58e4 — https://www.probabilitycourse.com/chapter5/5_1_3_conditioning_independence.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence (conditional CDF (F_X(x)−F_X(a))/(F_X(b)−F_X(a)); law of total probability P(A)=∫P(A|X=x)f_X(x)dx (5.16)), read 2026-11-06, sha256:5d697207bda40aa9ff1ce9a59db1231fe112d2fd061fed5ce08921d8c889c03a — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2), Topic 2 outcome b (PDF p.3), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/The Law of Total Probability.md
---

**The Law of Total Probability** finds the probability of an [[Event|event]] $B$ by splitting the sample space into scenarios $A_1, \ldots, A_n$ that form a partition. $P(B)$ is the weighted average of the [[Conditional Probability|conditional probabilities]] $P(B \mid A_i)$, each weighted by the probability of its scenario.

> $$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$

- The scenarios $A_1, \ldots, A_n$ must be [[Mutually Exclusive Events|mutually exclusive]] and exhaustive: no outcome in two of them, and every outcome in one.
- Each term is a joint probability, $P(B \mid A_i)\,P(A_i) = P(B \cap A_i)$, by the [[Probability Multiplication Rule|multiplication rule]].
- The weights $P(A_i)$ are nonnegative and add to 1, so $P(B)$ lies between the smallest and the largest $P(B \mid A_i)$.
- The law supplies the denominator $P(E)$ in [[Bayes Theorem|Bayes' theorem]].

> [!idea] The idea
> When the probability of $B$ depends on which scenario holds, it is hard to find directly but easy to find within each scenario. The law finds it scenario by scenario and weights each answer by how likely that scenario is. The scenarios don't overlap and together cover everything, so the weighted pieces add up to $P(B)$ with nothing counted twice or missed.

![[Media/Figures/The_Law_of_Total_Probability.svg|340]]

## One probability, three classes

A portfolio is 30% young drivers, 50% middle-aged and 20% senior. Their claim probabilities are 0.20, 0.10 and 0.15. What is the probability that a driver chosen at random has a claim?

| Class $A_i$ | $P(A_i)$ | $P(C \mid A_i)$ | $P(C \cap A_i)$ |
|---|---|---|---|
| Young | 0.30 | 0.20 | 0.060 |
| Middle-aged | 0.50 | 0.10 | 0.050 |
| Senior | 0.20 | 0.15 | 0.030 |
| Total | 1 | | 0.140 |

Each row is the share of the portfolio that is in that class and has a claim. The rows don't overlap, so they add to $P(C) = 0.14$.

## Why the weights matter

The plain average of the three claim probabilities is $(0.20 + 0.10 + 0.15)/3 = 0.15$. That treats every class as a third of the portfolio. The middle-aged class is half the portfolio and has the lowest rate, so the true answer, 0.14, is lower.

> [!trap] An unweighted average
> Averaging the $P(B \mid A_i)$ without the weights $P(A_i)$ is right only when the classes are equally likely. Every term needs its weight.

## One step further: which class?

A driver has a claim. What is the probability they are young? The answer is one row of the table over the total.

> $$P(\text{young} \mid C) = \frac{0.060}{0.140} \approx 0.429$$

That is [[Bayes Theorem|Bayes' theorem]]. The law of total probability is its denominator, so a Bayes question that stops at the total has stopped one step early.

## Conditioning on a random variable

The scenarios can be the values of a [[Random Variable|random variable]]. The events $\{X = x\}$ partition the sample space. For a continuous $Y$ with density $f_Y$, the sum becomes an integral.

> $$P(A) = \sum_x P(A \mid X = x)\,P(X = x)$$

> $$P(A) = \int_{-\infty}^{\infty} P(A \mid Y = y)\,f_Y(y)\,dy$$

When $X$ and $Y$ are independent, conditioning on one leaves the other with its own distribution. Each term then becomes a product.

> $$P(X + Y > s,\ X \in B) = \sum_{x \in B} P(X = x)\,P(Y > s - x)$$

> $$P(X = Y) = \sum_x P(X = x)\,P(Y = x)$$

> $$P(X > g(Y)) = \int_{-\infty}^{\infty} P(X > g(y))\,f_Y(y)\,dy$$

Take two independent claim counts $X$ and $Y$, each 0, 1 or 2 with probabilities 0.5, 0.3 and 0.2.

- They are equal with probability $0.5^2 + 0.3^2 + 0.2^2 = 0.38$. For identically distributed variables the sum is $\sum_x P(X = x)^2$.
- $P(X + Y > 2,\ X \ge 1)$ partitions on $X = 1$ and $X = 2$: $0.3\,P(Y > 1) + 0.2\,P(Y > 0) = 0.06 + 0.10 = 0.16$.
- For independent exponential $X$ and $Y$ with means 1 and 2, conditioning on $Y$ gives $P(X > Y) = \int_0^\infty e^{-y} \cdot \frac{1}{2} e^{-y/2}\,dy = \frac{1}{3}$.

## Try it

> [!example]- Accidents by territory {Example}
> A portfolio is 40% urban, 35% suburban and 25% rural. The accident probabilities are 0.05, 0.08 and 0.12. Find the probability of an accident for a policyholder chosen at random.
>
> > [!answer]-
> > **Plan:** weight each territory's probability by its share.
> > $$
> > \begin{align*}
> > P(\text{accident}) &= 0.40(0.05) + 0.35(0.08) + 0.25(0.12) \\
> > &= 0.020 + 0.028 + 0.030 \\
> > &= 0.078
> > \end{align*}
> > $$

> [!example]- Next year's claim, given last year's {Example}
> 25% of drivers are risky and claim in a year with probability 0.4. The rest claim with probability 0.1. Claims in different years are independent given the class. A new applicant claimed last year. Find the probability they claim next year.
>
> > [!answer]-
> > **Plan:** update the class probabilities with Bayes' theorem, then apply the law of total probability with the updated weights.
> >
> > Last year's claim: $P(C_1) = 0.25(0.4) + 0.75(0.1) = 0.175$.
> >
> > Updated weights: $P(\text{risky} \mid C_1) = 0.100/0.175 \approx 0.571$, and $0.429$ for the rest.
> > $$
> > \begin{align*}
> > P(C_2 \mid C_1) &= 0.571(0.4) + 0.429(0.1) \\
> > &\approx 0.271
> > \end{align*}
> > $$
> > Weighting by the original 25% and 75% would give 0.175 again. Last year's claim is evidence about the class, so the weights move.

> [!example]- A random claim rate {Example}
> Given its risk parameter $\Lambda = \lambda$, a policy has no claims in a year with probability $e^{-\lambda}$. $\Lambda$ is uniform on $(0, 2)$. Find the probability of no claims.
>
> > [!answer]-
> > **Plan:** condition on $\Lambda$ and integrate against its density $\frac{1}{2}$.
> > $$
> > \begin{align*}
> > P(\text{no claims}) &= \int_0^2 e^{-\lambda} \cdot \frac{1}{2}\,d\lambda \\
> > &= \frac{1 - e^{-2}}{2} \\
> > &\approx 0.432
> > \end{align*}
> > $$

> [!warning]- Exam traps
> - **An unweighted average.** Right only when the classes are equally likely.
> - **Weights that are not a partition.** The $P(A_i)$ must be the probabilities of classes that don't overlap and add to 1. Overlapping categories, or percentages quoted on different bases, must be turned into a partition first.
> - **Stopping one step early.** When the question asks for a class *given* the event, $P(B)$ is only the denominator. The answer is one term over the whole sum.
