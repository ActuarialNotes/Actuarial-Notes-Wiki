---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:bab4f2a9a86afdde5f80cdb3e5fcdc70841b86cb7ee9abe9584c39b0232c10ac
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 p.146 (PDF p.154) eqs. (4.2)-(4.3), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q84, PDF p.26, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.1.3 Conditioning and Independence (P(X∈A)=Σ_{y_j} P(X∈A|Y=y_j)P_Y(y_j)), sha256:f96cfc28220511431e9ae38905cb664d260d0c2d770fcc6d9a9288149ed138e0 — https://www.probabilitycourse.com/chapter5/5_1_3_conditioning_independence.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence, eq. (5.16) P(A)=∫P(A|X=x)f_X(x)dx and example P(X^3+Y>1)=∫_0^1 P(Y>1-x^3)dx 'since X and Y are independent', sha256:b9e764e0b2adb7b888334dd58ee563d47c9c6cd66bd666fa4fa24c7d5e3b32a4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 eqs. (4.2)-(4.3) and Bayes' formula (PDF pp.153-154: H_i pairwise disjoint with union Ω; P(E)=Σ P(H_i)P(E|H_i); posterior = term over the sum), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2) and Topic 2 learning outcome b (PDF p.3), read 2026-11-04 for the objective numbers in the exam tip, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 eqs. (4.2)-(4.3) (p.146, PDF p.154); Lemma 11.1 proof (p.448, PDF p.456): each entry of Py is a weighted average of the entries of y, and the largest weighted average obtainable is d·m0+(1-d)·M0 ≤ M0, read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Wikipedia, Convex combination: definition (alpha_i >= 0, sum alpha_i = 1) and 'The convex hull of a given set of points is identical to the set of all their convex combinations', fetched 2026-11-04, sha256:5e5051915a20bf7038b4700a1aded862ac76deca69fe6092a0d5d52f1a868f1d — https://en.wikipedia.org/wiki/Convex_combination"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/The Law of Total Probability.md
---

**The Law of Total Probability** states that if $\{A_1, \ldots, A_n\}$ is a partition of the sample space $S$, then the probability of any event $B$ can be expressed as a weighted average of its conditional probabilities given each $A_i$.

> $$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$

- $\{A_1, A_2, \ldots, A_n\}$ must be mutually exclusive and exhaustive events to partition $S$
- Used for computing the denominator $P(E)$ in [[Bayes Theorem]] and finding marginal probabilities when a problem is structured by distinct scenarios or risk classes
- Every term equals $P(B \mid A_i)\,P(A_i) = P(B \cap A_i)$
- The weights $P(A_i)$ are nonnegative and sum to 1, so $P(B)$ is a weighted average of the conditional probabilities $P(B \mid A_i)$. It therefore lies between the smallest and the largest of them.

> [!idea] The idea
> When the probability of $B$ depends on which scenario holds, it is hard to find directly but easy to find within each scenario. The law of total probability finds the conditional probability $P(B \mid A_i)$ within each scenario $A_i$ and weights it by $P(A_i)$, the probability of that scenario. The scenarios form a partition of the sample space. They do not overlap and together cover every outcome, so the weighted pieces add up to $P(B)$ with nothing counted twice or missed.

![[Media/Figures/The_Law_of_Total_Probability.svg|340]]

### Conditioning on the value of a random variable

The events $\{X = x\}$ partition the sample space, so the law can condition on the value of a random variable. For a continuous $Y$ with density $f_Y$, the sum becomes an integral.

> $$P(A) = \sum_x P(A \mid X = x)\,P(X = x)$$

> $$P(A) = \int_{-\infty}^{\infty} P(A \mid Y = y)\,f_Y(y)\,dy$$

- When $X$ and $Y$ are independent, conditioning on one leaves the other with its own distribution, so each term becomes a product of the two variables' probabilities.

> $$P(X + Y > s,\ X \in B) = \sum_{x \in B} P(X = x)\,P(Y > s - x)$$

> $$P(X = Y) = \sum_x P(X = x)\,P(Y = x)$$

> $$P(X > g(Y)) = \int_{-\infty}^{\infty} P(X > g(y))\,f_Y(y)\,dy$$

- To find the probability that the sum of two independent discrete variables exceeds a value on an event restricted to the first variable, partition on each value of the first variable and use $P(X = x)\,P(Y > s - x)$ by independence.
- For two independent, identically distributed discrete variables, the probability that they are equal is the sum over values of the squared probabilities, $\sum_x P(X = x)^2$.
- For an event involving two independent continuous random variables, condition on one variable and integrate the conditional probability against its density.

> [!example]- Overall Claim Probability Across Risk Classes {Example}
> A portfolio is 30% young drivers ($A_1$), 50% middle-aged ($A_2$), and 20% senior ($A_3$). Claim probabilities are $P(C \mid A_1)=0.20$, $P(C \mid A_2)=0.10$, $P(C \mid A_3)=0.15$. Find the overall probability of a claim.
>
> > [!answer]-
> > Since $\{A_1, A_2, A_3\}$ partitions the portfolio:
> > $$P(C) = (0.20)(0.30) + (0.10)(0.50) + (0.15)(0.20)$$
> > $$= 0.060 + 0.050 + 0.030 = 0.140$$
> > The overall claim probability is 14%.

> [!tip]- How it appears on the exam
> - **Exam P** (General Probability, objective 7): a portfolio is split into classes or territories, each with its own claim, accident or failure probability. The question asks for that probability for a policyholder chosen at random.
> - **Exam P**: the law most often appears as the first step of a [[Bayes Theorem]] question, where it supplies the denominator. A test result, a claim or a survival is observed, and the question asks which class the policyholder is in.
> - **Exam P**: some questions condition on the value of a random variable. Examples are a claim count or a class that is itself random, a sum of two independent variables, and a continuous variable integrated against its density.

> [!warning]- Exam traps
> - **An unweighted average.** Averaging the conditional probabilities $P(B \mid A_i)$ without the weights $P(A_i)$ gives the right answer only when the classes are equally likely.
> - **Weights that are not a partition.** The $P(A_i)$ must be the probabilities of non-overlapping classes that sum to 1. Overlapping categories, or percentages quoted on different bases, have to be turned into a partition first.
> - **Stopping one step early.** When the question asks for the probability of a class *given* the event, $P(B)$ is only the denominator. The answer is one term of the sum divided by the whole sum.
