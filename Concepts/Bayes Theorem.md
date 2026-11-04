---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:124b984927040b4b709115d25e8c7284921e4154faa6047ae6699bfb44d529f8
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (p.139, PDF p.147), Bayes formula and eqs. (4.2)-(4.3) (pp.145-146, PDF pp.153-154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.3 Bayes' Rule, sha256:c352ede4dc334d99bc724927ca8b51853cf8561e407a34f59f165b22ae00042a — https://www.probabilitycourse.com/chapter1/1_4_3_bayes_rule.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.4 Conditional Independence (definition (1.8) P(A∩B|C)=P(A|C)P(B|C); two-coin example P(A∩B)=Σ P(A|C)P(B|C)P(C) by LTP = 5/8 ≠ P(A)P(B)=9/16; 'if we know A has occurred … more likely that we have chosen Coin 2 … increases the conditional probability that B occurs'; conditional independence neither implies nor is implied by independence), sha256:ad951e9a3bf2fbaacbf4d3da76be9e02ed2c33627bed79427c4584355903b027 — https://www.probabilitycourse.com/chapter1/1_4_4_conditional_independence.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Bayes' Formula (PDF pp.153-154: hypotheses, evidence, prior and posterior; P(E|H_i) known, P(H_i|E) wanted; formula), Example 4.17 (PDF p.155: prior .001, P(+|cancer)=.99 gives posterior .019 — 'one has to be careful when the prior probabilities are small'), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (2026-05 file), Q306 solution, PDF p.84 (Bayes with likelihoods P(T>1|H)=e^{-1/4}, P(T>1|A)=e^{-1/2}; 0.4612), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., corrected June 2023 PDF from statlearning.com), §4.4 p.142 (PDF p.153): Bayes' theorem (4.15), the Bayes classifier classifies x to the class for which p_k(x) is largest, and LDA, QDA and naive Bayes plug estimates of f_k(x) into (4.15) to approximate it; §4.4.3 QDA p.152 (PDF p.163), sha256:7ed447d1a513c5dd95240a829603310f1d319a14a8079ddfb180c6a3d9d9a6ff — https://drive.google.com/uc?export=download&id=1--811-yIIvjT3dvnyFJM20rj_-tbB3bg"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2) and Topic 2 learning outcome b (PDF p.3), read 2026-11-04 for the objective numbers in the exam tip, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayes Theorem.md
---

**Bayes' Theorem** is a formula for reversing conditional probabilities, updating the prior probability $P(H)$ of a hypothesis to the posterior probability $P(H \mid E)$ after observing evidence $E$.

> $$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$

- The denominator $P(E)$ is computed via [[The Law of Total Probability]] across a partition $\{H_i\}$ of the sample space:

> $$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$

- $H$ is the hypothesis and $E$ is the observed evidence.
- If $H$ and $E$ are independent (with $P(E) > 0$), observing $E$ leaves the prior unchanged: $P(H \mid E) = P(H)$.
- A hypothesis gains probability when the evidence is more likely under it than overall, that is when $P(E \mid H) > P(E)$. A hypothesis under which the evidence is less likely than overall loses probability.
- See also [[Bayesian Credibility]]

> [!idea] The idea
> Exam questions usually give the probability of the evidence under each hypothesis, but ask for the probability of each hypothesis given the evidence. Bayes' theorem reverses the conditioning. Each hypothesis's posterior probability is its share of the total probability of the evidence, so a hypothesis with a small prior probability needs strong evidence to become probable.

![[Media/Figures/Bayes_Theorem.svg|340]]

### Evidence restricted to a subset of hypotheses

When the evidence is an event $E$ together with the information that the outcome lies in a subset $H_1, \ldots, H_k$ of the hypotheses, condition on both: the denominator of Bayes' theorem sums over only the hypotheses in that subset.

> $$P\big(H_j \mid E \cap (H_1 \cup \cdots \cup H_k)\big) = \frac{P(E \mid H_j)\,P(H_j)}{\sum_{i=1}^{k} P(E \mid H_i)\,P(H_i)}, \quad j \le k$$

- This is Bayes' theorem with the evidence $E' = E \cap (H_1 \cup \cdots \cup H_k)$. Then $P(E' \mid H_i) = P(E \mid H_i)$ for $i \le k$ and $0$ for every other hypothesis, so the other hypotheses drop out of the denominator.

### Conditionally independent events

Events $A$ and $B$ are conditionally independent given each class $C_i$ of a partition when $P(A \cap B \mid C_i) = P(A \mid C_i)\,P(B \mid C_i)$. Within a class, the probability of several outcomes is the product of their conditional probabilities.

> $$P(A \cap B) = \sum_i P(A \mid C_i)\,P(B \mid C_i)\,P(C_i)$$

> $$P(B \mid A) = \frac{\sum_i P(A \mid C_i)\,P(B \mid C_i)\,P(C_i)}{\sum_i P(A \mid C_i)\,P(C_i)}$$

- Events that are independent given each class are in general not independent unconditionally when the class is unknown, because observing one event updates the probability of each class.
- Repeated tosses of a coin chosen at random are independent only given which coin was chosen; unconditionally they are dependent, because each toss gives information about the coin.
- The second formula is a Bayesian update of the class probabilities, $P(B \mid A) = \sum_i P(B \mid C_i)\,P(C_i \mid A)$: compute the joint probability and the probability of the observed event by conditioning on each class, then divide.
- Observing $A$ shifts weight toward the classes under which $A$ is more likely; with two classes, when $A$ and $B$ are both more likely in the same class, this raises the probability of $B$, so $P(B \mid A) > P(B)$.

> [!example]- Two tosses of an unknown coin {Example}
> A bag holds a fair coin and a coin that lands heads with probability 0.8. One coin is drawn at random and tossed twice. Find the probability that the second toss is heads given that the first is.
>
> > [!answer]-
> > **Plan:** the tosses are independent given the coin, so condition on the coin for both numerator and denominator.
> > $$P(H_1) = 0.5(0.5) + 0.5(0.8) = 0.65$$
> > $$P(H_1 \cap H_2) = 0.5(0.5)^2 + 0.5(0.8)^2 = 0.125 + 0.32 = 0.445$$
> > $$P(H_2 \mid H_1) = \frac{0.445}{0.65} \approx 0.685$$
> > A first head makes the biased coin more likely, so the second head is more likely than the unconditional 0.65.

> [!example]- Identifying a High-Risk Policyholder After a Claim {Example}
> 20% of policyholders are high-risk ($H$) and 80% are low-risk ($L$). A high-risk policyholder files a claim in year 1 with probability 0.40; a low-risk one with probability 0.10. A randomly selected policyholder files a claim. What is the probability they are high-risk?
>
> > [!answer]-
> > First find $P(\text{claim})$ by the Law of Total Probability:
> > $$P(C) = P(C \mid H)P(H) + P(C \mid L)P(L) = (0.40)(0.20) + (0.10)(0.80) = 0.08 + 0.08 = 0.16$$
> > Now apply Bayes' Theorem:
> > $$P(H \mid C) = \frac{P(C \mid H)\,P(H)}{P(C)} = \frac{0.40 \times 0.20}{0.16} = \frac{0.08}{0.16} = 0.50$$
> > After observing a claim, the probability the policyholder is high-risk rises from 20% to 50%.

> [!tip]- How it appears on the exam
> - **Exam P** (General Probability, objective 7): policyholders, boards or messages fall into classes with known proportions. One observation is made, such as a claim, a positive test, a symbol received or a policy still in force. The question asks for the probability of a class given that observation.
> - **Exam P**: the evidence can come from a distribution rather than a single probability, such as a Poisson claim count, an exponential time to cancellation or a discrete uniform count. Each likelihood is then read off that class's distribution.
> - **MAS-I**: four questions in the bank link this page. They cover naive Bayes and quadratic discriminant analysis, which assign the class with the largest posterior, and a mixing distribution.
> - **MAS-II**: four past-paper questions link this page. They cover Bayesian updating of a prior.

> [!warning]- Exam traps
> - **Reading the likelihood as the posterior.** A test that is correct 80% of the time on defective items does not give a positive result an 80% probability of coming from a defective item. With a small prior, the posterior is far lower.
> - **Dropping the prior.** Normalising the likelihoods, $P(E \mid H_j) / \sum_i P(E \mid H_i)$, is right only when the hypotheses are equally likely a priori. Every term needs its $P(H_i)$.
> - **The wrong likelihood for "still in force".** When the evidence is that something has *survived* past time $t$, the likelihood under each class is its survival probability $P(T > t)$, not the density at $t$.
