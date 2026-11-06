---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:57d35b5ef9946b6fb3138caf14eab52f424e761f261e87776ab0205cf5ee0e81
  sources:
    - "SOA Probability Exam syllabus, November 2026, General Probability learning outcomes a, c-g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 pp.22-23 (PDF pp.30-31), Def. 1.3 p.25 (PDF p.33), historical remark p.30 (PDF p.38), §4.1 Examples 4.1/4.4 pp.133-135 (PDF pp.141-143), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Example 1.10 (p.24, PDF p.32: three coin tosses, eight equally likely paths), Example 1.11 (p.26, PDF p.34: ordered pairs, 36 equally likely outcomes, unordered pairs declined), §3.1 A Counting Technique (p.76, PDF p.84), Example 3.14 (p.107, PDF p.115), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, coin-tossing example (2^n bit strings, equally likely), sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.2 distribution function P(E)=Σm(ω) (p.19, PDF p.27), Def. 1.3 uniform m(ω)=1/n (p.25, PDF p.33), Example 1.11 36 ordered pairs (p.26, PDF p.34), Historical Remarks: 36 ordered vs 21 unordered pairs (p.30, PDF p.38); §1.1 Example 1.3 de Méré, at least one six in four rolls 1−(5/6)^4 = .518 (pp.4-5, PDF pp.12-13); Thm 1.1 (p.22, PDF p.30), Thm 1.4 proof (p.24, PDF p.32), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures (discrete case: P(A)=#(A)/#(S) for counting measure; general discrete P(A)=Σ_{x∈A} f(x)), fetched 2026-11-04, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 difference A−B (p.21, PDF p.29), Thm 1.4 proof ('added twice') and Cor. 1.1 P(A)=P(A∩B)+P(A∩~B) (p.24, PDF p.32), Historical Remarks: 36 ordered vs 21 unordered pairs (p.30, PDF p.38), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Venn Fig. 1.7, Thm 1.1-1.4 incl. Thm 1.4 proof 'added twice' (pp.21-24, PDF pp.29-32); Infinite Sample Spaces (pp.28-29, PDF pp.36-37), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability.md
---

A **Probability** $P$ is a measure of how likely an [[Event|event]] $E$ is to occur. A probability is a [[Set Function|set function]] that maps each event in a [[Sample Space|sample space]] to a real number between 0 and 1, and it must satisfy the [[Axioms of Probability|axioms of probability]].

If all outcomes in a finite sample space $S$ are equally likely, then $P$ can be calculated as:

> $$P(E) = \frac{|E|}{|S|}$$

> $$=\frac{\text{number of outcomes in E}}{\text{number of possible outcomes}}$$

- where $|E|$ is the number of outcomes in the event $E$ and $|S|$ the number of outcomes in the sample space $S$.
- When the outcomes are not equally likely, $P(E)$ is instead the sum of the probabilities of the individual outcomes in $E$.

> [!idea] The idea
> A count of outcomes gives a probability only when every outcome is equally likely. Then each of the $|S|$ outcomes carries the same share of the total probability of 1, so an event's probability is its count divided by $|S|$. The work is in choosing a sample space whose outcomes really are equally likely, and then in counting carefully.

![[Media/Figures/Probability.svg|340]]

## Two dice: which outcomes are equally likely?

Two fair dice are rolled. What is the probability that the sum is 4?

The sums 2 to 12 look like the natural outcomes, but they are not equally likely. A sum of 2 needs both dice to show 1, while a sum of 7 can happen six ways. So the sums can't simply be counted.

Treat the dice as distinguishable, as a first die and a second die, even when they look alike. Each of the $6 \times 6 = 36$ ordered pairs is then equally likely.

| Sum | Ordered pairs | Probability |
|---|---|---|
| 2 or 12 | 1 | 1/36 |
| 3 or 11 | 2 | 2/36 |
| 4 or 10 | 3 | 3/36 |
| 5 or 9 | 4 | 4/36 |
| 6 or 8 | 5 | 5/36 |
| 7 | 6 | 6/36 |

A sum of 4 is $\{(1, 3), (2, 2), (3, 1)\}$, three of the 36 ordered pairs, so $P(\text{sum} = 4) = 3/36 = 1/12$.

- The unordered result "a 1 and a 3" is two ordered outcomes, $(1, 3)$ and $(3, 1)$. The result "two 2s" is only one, $(2, 2)$.
- When fair dice are rolled independently, every ordered outcome is equally likely. So $n$ dice have $6^n$ equally likely ordered outcomes.
- Fair coins work the same way. $n$ tosses have $2^n$ equally likely ordered sequences.

> $$P(E) = \frac{\text{number of ordered outcomes in } E}{6^n}$$

## When outcomes aren't equally likely

The table turns the sums into a sample space of their own, with eleven outcomes of unequal probability. What is the probability that the sum is at most 4? The event holds the sums 2, 3 and 4, so add their probabilities.

$$P(\text{sum} \le 4) = \frac{1}{36} + \frac{2}{36} + \frac{3}{36} = \frac{1}{6}$$

That is the general rule. A probability of an event is the sum of the probabilities of the outcomes in it.

> $$P(E) = \sum_{\omega \in E} P(\{\omega\})$$

- Counting is the special case in which every outcome has probability $1/|S|$.
- Insurance outcomes are rarely equally likely. If a policy has 0, 1 or 2 claims in a year with probabilities 0.7, 0.2 and 0.1, the probability of at least one claim is $0.2 + 0.1 = 0.3$.

## Probability as a set function

A probability takes a set of outcomes and returns a number. The [[Axioms of Probability|axioms]] fix the rules it follows: no event has a negative probability, the whole sample space has probability 1, and the probabilities of [[Mutually Exclusive Events|mutually exclusive events]] add.

What is the probability that at least one of the two dice shows a 6? Counting directly gives 11 ordered pairs: six with a 6 on the first die, six with a 6 on the second, less $(6, 6)$, which was counted twice. The complement is shorter. No 6 on either die is $5 \times 5 = 25$ pairs.

> $$P(E^c) = 1 - P(E)$$

- $P(\text{at least one } 6) = 1 - 25/36 = 11/36$.
- "At least one" is almost always quicker through its complement, "none".

> [!trap] Adding $1/6$ for each die
> $1/6 + 1/6 = 12/36$ counts the outcome $(6, 6)$ twice. Probabilities add only for mutually exclusive events. Use the complement, or subtract the overlap.

## Counting bigger sample spaces

When the outcomes are too many to list, [[Combinatorics]] counts the numerator and the denominator. The rule doesn't change. Both counts must be taken in the same sample space, ordered with ordered or unordered with unordered.

A file holds 10 claims, 3 of them large. An auditor picks 2 claims at random. What is the probability that both are large?

- Unordered: $\binom{3}{2} / \binom{10}{2} = 3/45 = 1/15$.
- Ordered: $(3 \times 2) / (10 \times 9) = 6/90 = 1/15$.

Both routes agree because each unordered pair is exactly two ordered pairs, in the numerator and in the denominator alike.

## On other exams

A handful of questions on FAM, ALTAM, ASTAM, MAS-I and Exam 5 link this page too. On those exams the probability is background to the calculation rather than the point of it. The rules are the same: a probability lies in $[0, 1]$, mutually exclusive cases add, and the complement is 1 minus the event.

## Try it

> [!example]- An even number on a die {Example}
> What is the probability of rolling an even number on a fair 6-sided die?
>
> > [!answer]-
> > **Plan:** list the sample space, list the event, then divide the counts.
> >
> > - **Sample space:** $S = \{1, 2, 3, 4, 5, 6\}$, so $|S| = 6$.
> > - **Event:** rolling an even number is $E = \{2, 4, 6\}$, so $|E| = 3$.
> >
> > $$P(E) = \frac{3}{6} = 0.5$$
> >
> > Why check the sample space first? If the problem said the result is known to be greater than 2, $|S|$ would change from 6 to 4.

> [!example]- A sum of 5 on three dice {Example}
> Three fair dice are rolled. Find the probability that the sum is 5.
>
> > [!answer]-
> > **Plan:** count ordered triples, out of $6^3 = 216$.
> >
> > - The unordered results with sum 5 are $\{1, 1, 3\}$ and $\{1, 2, 2\}$.
> > - Each can be arranged in 3 orders, so there are 6 ordered triples.
> >
> > $$P(\text{sum} = 5) = \frac{6}{216} = \frac{1}{36}$$
> >
> > Counting the two unordered results over 216 would give $2/216$, a third of the right answer.

> [!example]- At least one 6 in four rolls {Example}
> A fair die is rolled four times. Find the probability of at least one 6.
>
> > [!answer]-
> > **Plan:** go through the complement, no 6 in four rolls.
> >
> > $$
> > \begin{align*}
> > P(\text{no } 6) &= \left(\frac{5}{6}\right)^4 \\
> > &= \frac{625}{1296} \\
> > P(\text{at least one } 6) &= 1 - \frac{625}{1296} \\
> > &\approx 0.518
> > \end{align*}
> > $$
> >
> > Adding $1/6$ four times gives $2/3$, which counts rolls with two or more 6s more than once.

> [!example]- Sampling claims {Example}
> A file holds 10 claims, 3 of them large. Four claims are chosen at random without replacement. Find the probability that exactly one is large.
>
> > [!answer]-
> > **Plan:** count unordered samples of 4, choosing which large claim and which three small ones.
> >
> > $$
> > \begin{align*}
> > P(\text{one large}) &= \frac{\binom{3}{1}\binom{7}{3}}{\binom{10}{4}} \\
> > &= \frac{3 \times 35}{210} \\
> > &= 0.5
> > \end{align*}
> > $$
> >
> > The numerator and the denominator both count unordered samples, so they are counted in the same sample space.

> [!warning]- Exam traps
> - **Outcomes that aren't equally likely.** Treating the eleven sums $2, \ldots, 12$ of two dice as equally likely gives $P(\text{sum} = 4) = 1/11$. The answer is $3/36$. Count in the space of 36 ordered pairs.
> - **"At least one" counted directly.** For at least one 6 in four rolls, $4 \times \frac{1}{6} = \frac{2}{3}$ counts rolls with two or more 6s more than once. Use the complement: $1 - (5/6)^4 = 0.518$.
> - **A probability outside $[0, 1]$.** A count larger than $|S|$, or a negative complement, means the count went wrong. Either an outcome was counted more than once, or the numerator and denominator were counted in different sample spaces. Counting "at least one 6" in eight rolls as $8 \cdot 6^7$ favourable outcomes, for example, gives $8/6$.
> - **Mixing ordered and unordered counts.** An ordered numerator over an unordered denominator is off by a factor of the number of orders.
