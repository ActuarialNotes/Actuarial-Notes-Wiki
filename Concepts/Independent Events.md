---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:39ab978d6f083ae710563d7403b73e580a0a28a1e33d9a1d8b6087584bb78b64
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (p.139, PDF p.147), Thm 4.1 (p.140, PDF p.148), Def. 4.2 (p.141, PDF p.149), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.1 Independence (Lemma: A,B independent ⇒ A,B^c; A^c,B; A^c,B^c independent, proof P(A∩B^c)=P(A)(1-P(B)); flight example P(A)=1-(1-p_c)^N), sha256:d3a628b19b7630f57b78839bd1c92defb3988d4897dcdab840d5811dc5522dbd — https://www.probabilitycourse.com/chapter1/1_4_1_independence.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (PDF p.147: conditional form needs both events positive, prob-0 case a separate clause), Thm 4.1 and proof (PDF p.148: product rule holds when either event has probability 0), Def. 4.2 and the remark that pairwise independence does not imply mutual independence (PDF p.149), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.1 Independence, fetched 2026-11-04: definition P(A∩B)=P(A)P(B) with P(A|B)=P(A) only when P(B)≠0; union of independent events 1−Π(1−P(A_i)); 'Warning! One common mistake is to confuse independence and being disjoint' Lemma (P(A),P(B)≠0, disjoint ⇒ not independent); P(W1)=p1/(p1+p2−p1p2), sha256:c724f4e665e442de29d06ae48c8d0871b5d258abf5536bf7f58f13ea5c70f7a8 — https://www.probabilitycourse.com/chapter1/1_4_1_independence.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2) and Topic 2 learning outcome b (PDF p.3), read 2026-11-04 for the objective numbers in the exam tip, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 independence (p.139, PDF p.147), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Independent Events.md
---

Two [[Event|events]] $A$ and $B$ are **Independent** if knowing that one occurred gives no information about whether the other occurred. Independence is defined by the product rule.

> $$P(A \cap B) = P(A)\,P(B)$$

- When $P(A) > 0$ and $P(B) > 0$, independence means $P(A \mid B) = P(A)$ and $P(B \mid A) = P(B)$.
- The product rule is the definition because it is symmetric in $A$ and $B$ and still works when an event has probability 0. An event with probability 0 is independent of every event.
- Independence is checked from the probabilities. It cannot be read off a diagram.
- Independent is not [[Mutually Exclusive Events|mutually exclusive]]. Independent events with positive probabilities do overlap.

> [!idea] The idea
> When events are independent, knowing that one occurred does not change the probability of the other, so the probability that both occur is the product of their probabilities. The probability that none occurs is a product too, which is why "at least one" is found as 1 minus "none".

![[Media/Figures/Independent_Events.svg|340]]

## Does knowing one tell you about the other?

Two drivers are insured separately. Ana files a claim with probability 0.2 and Ben with probability 0.1, independently.

| | Ben claims | Ben doesn't | Total |
|---|---|---|---|
| Ana claims | 0.02 | 0.18 | 0.20 |
| Ana doesn't | 0.08 | 0.72 | 0.80 |
| Total | 0.10 | 0.90 | 1 |

Every cell is its row total times its column total. Given that Ana claims, Ben claims with probability $0.02 / 0.20 = 0.10$, the same as before. Knowing about Ana did not change the probability for Ben.

## Checking independence from data

Compare a portfolio where age matters. On the [[Conditional Probability]] page, 30% of drivers are young, 13% have a claim, and 6% are young with a claim. Independence would need $0.30 \times 0.13 = 0.039$, but the joint probability is 0.06. Young drivers claim more often, so age and claims are dependent.

To check, compute $P(A)\,P(B)$ and compare it with $P(A \cap B)$. Equal means independent.

## Complements, neither and at least one

If $A$ and $B$ are independent, so are $A$ and $B^c$, $A^c$ and $B$, and $A^c$ and $B^c$. In the table, Ana claims and Ben doesn't with probability $0.2 \times 0.9 = 0.18$.

> $$P(A^c \cap B^c) = (1 - P(A))\,(1 - P(B))$$

- Neither driver claims with probability $0.8 \times 0.9 = 0.72$.
- At least one claims with probability $1 - 0.72 = 0.28$.
- The [[Probability Addition Rule|addition rule]] agrees: $0.2 + 0.1 - 0.02 = 0.28$.
- Exactly one claims with probability $0.18 + 0.08 = 0.26$.

## Many independent trials

Now insure 10 drivers like Ana, independently, each claiming with probability 0.2. The probability that none claims is $0.8^{10}$.

> $$P(\text{at least one}) = 1 - (1 - p)^n$$

- On the example, $1 - 0.8^{10} \approx 0.893$.
- All 10 claim with probability $0.2^{10}$, which is tiny.

> [!trap] "At least one" as $np$
> Adding the 10 probabilities gives $10 \times 0.2 = 2$, which is not a probability. The sum counts every overlap repeatedly. Use 1 minus the probability of none.

## Pairwise is not mutual

For three or more events, independence in pairs is not enough. Toss a fair coin twice. Let $A$ be "first toss heads", $B$ be "second toss heads" and $C$ be "the two tosses match".

- Each event has probability $\frac{1}{2}$, and each pair occurs together with probability $\frac{1}{4}$. Every pair is independent.
- All three occur only on two heads, with probability $\frac{1}{4}$, not $\frac{1}{8}$. Once $A$ and $B$ are known, $C$ is certain.

Events $A_1, \ldots, A_n$ are **mutually independent** when the product rule holds for every subset of them, not just for pairs.

> $$P(A_{i_1} \cap \cdots \cap A_{i_m}) = P(A_{i_1}) \cdots P(A_{i_m})$$

## On other exams

**MAS-I** uses independence of events as one step inside reliability, hazard-rate and stochastic-process questions.

- A series system of independent components works only if every component works, so its reliability is the product of the components' reliabilities. Three components each with reliability 0.9 give $0.9^3 = 0.729$.
- A parallel system fails only if every component fails. With the same three components it works with probability $1 - 0.1^3 = 0.999$.

## Try it

> [!example]- Testing independence {Example}
> For two policyholders, $P(A \text{ claims}) = 0.4$, $P(B \text{ claims}) = 0.3$ and $P(\text{both claim}) = 0.12$. Are their claim events independent?
>
> > [!answer]-
> > **Plan:** compare the product of the marginals with the joint probability.
> >
> > $P(A)\,P(B) = 0.4 \times 0.3 = 0.12$, which equals $P(A \cap B)$. The events are independent.

> [!example]- Losses above a deductible {Example}
> Five independent losses each exceed the deductible with probability 0.3. Find the probability that at least one exceeds it.
>
> > [!answer]-
> > **Plan:** find the probability that none exceeds it, then take the complement.
> > $$
> > \begin{align*}
> > P(\text{at least one}) &= 1 - 0.7^5 \\
> > &\approx 0.832
> > \end{align*}
> > $$

> [!example]- How many policies? {Example}
> Each policy has a claim with probability 0.1, independently. How many policies are needed for the probability of at least one claim to be at least 0.95?
>
> > [!answer]-
> > **Plan:** set $1 - 0.9^n \ge 0.95$ and solve for $n$ with logarithms.
> > $$
> > \begin{align*}
> > 0.9^n &\le 0.05 \\
> > n &\ge \frac{\ln 0.05}{\ln 0.9} \approx 28.4
> > \end{align*}
> > $$
> > So 29 policies are needed. Check: $1 - 0.9^{28} \approx 0.948$ and $1 - 0.9^{29} \approx 0.953$.
> > Dividing by $\ln 0.9$, a negative number, flips the inequality.

> [!warning]- Exam traps
> - **Independent is not mutually exclusive.** Disjoint events with positive probabilities are dependent. Multiplying the probabilities of disjoint events, or adding those of independent ones, gives a wrong answer from the right numbers.
> - **Pairwise is not mutual.** A question about all three events together needs mutual independence, stated or checked.
> - **"At least one" by multiplication or addition.** It is $1 - (1 - p)^n$, not $np$ and not $p^n$.
> - **Union without the overlap.** For independent $A$ and $B$, $P(A \cup B) = P(A) + P(B) - P(A)\,P(B)$. Dropping the last term gives the plain sum.
