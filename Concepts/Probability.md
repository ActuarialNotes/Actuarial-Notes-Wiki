---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:57d35b5ef9946b6fb3138caf14eab52f424e761f261e87776ab0205cf5ee0e81
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Venn Fig. 1.7, Thm 1.1-1.4 incl. Thm 1.4 proof 'added twice' (pp.21-24, PDF pp.29-32); Infinite Sample Spaces (pp.28-29, PDF pp.36-37), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Probability.md
---

A **Probability** $P$ is a measure of how likely an event $E$ is to occur. It is a [[Set Function]] that maps events in a sample space to a real number between 0 and 1. A probability must satisfy the [[Axioms of Probability]].
If all outcomes in a finite sample space $S$ are equally likely, then $P$ can be calculated as:

> $$P(E) = \frac{|E|}{|S|}$$

> $$=\frac{\text{number of outcomes in E}}{\text{number of possible outcomes}}$$

- where $|E|$ is the number of outcomes in the event $E$ and $|S|$ the number of outcomes in the [[Sample Space]] $S$.
- When the outcomes are not equally likely, $P(E)$ is instead the sum of the probabilities of the individual outcomes in $E$.

> [!idea] The idea
> A count of outcomes gives a probability only when every outcome is equally likely. Equally likely outcomes share the total probability of 1 evenly, so each outcome has probability $1/|S|$. The probability of an event $E$ is then the count $|E|$ divided by $|S|$. The work is in choosing a sample space whose outcomes really are equally likely, such as ordered outcomes for dice and coins, and then in counting carefully.

![[Media/Figures/Probability.svg|340]]

### Dice and coins: count ordered outcomes

- When fair dice are rolled independently, every ordered outcome is equally likely, so $n$ dice have $6^n$ equally likely ordered outcomes; two dice have $6 \times 6 = 36$.
- Treat the dice as distinguishable, as a first die and a second die, even when they look alike. Count ordered outcomes: the unordered result "a 1 and a 2" is two ordered outcomes, $(1, 2)$ and $(2, 1)$, while "two 1s" is only one, $(1, 1)$.
- Fair coins work the same way: $n$ tosses have $2^n$ equally likely ordered sequences.

> $$P(E) = \frac{\text{number of ordered outcomes in } E}{6^n} \quad \text{for } n \text{ fair dice}$$

> [!example]- A Sum of 4 on Two Dice {Example}
>
> Two fair dice are rolled. What is the probability that the sum is 4?
>
> > [!answer]-
> > Count ordered pairs, written (first die, second die). A sum of 4 is $\{(1, 3), (3, 1), (2, 2)\}$, which is three of the 36 equally likely ordered outcomes.
> >
> > $$P(\text{sum} = 4) = \frac{3}{36} = \frac{1}{12}$$
> >
> > Counting the unordered results $\{1, 3\}$ and $\{2, 2\}$ instead would undercount, because $\{1, 3\}$ can happen two ways and $\{2, 2\}$ only one.

> [!example]- Probability of a Fair Die? {Example}
> 
> What is the probability of rolling an even number on a fair 6-sided die?
> 
> > [!answer]-
> >  
> > - **Sample Space ($S$):** $\{1, 2, 3, 4, 5, 6\}$
> > - **Event ($E$):** Rolling an even number $\rightarrow \{2, 4, 6\}$
> >
> > The sample space $S$ has 6 possible outcomes, so $|S| = 6$. The event $E$ contains the 3 even numbers, so $|E| = 3$.
> > 
> > - $$P(E) = \frac{|E|}{|S|} = \frac{3}{6} = 50\%$$
> >
> > > [!tip] Common Trap
> > > Always verify the sample space first.
> > > If the problem said "a die is rolled and the result is greater than 2," $|S|$ would change from 6 to 4.

> [!tip]- How it appears on the exam
> - **Exam P** (General Probability, objectives 1–2): the page is tagged on 74 Exam P questions in the bank. It underlies most of the first topic rather than one question shape.
> - Equally likely outcomes are counted directly with dice and coins, such as three fair dice, or three fair coins tossed repeatedly until a success. Two numbers chosen at random from the same range are counted the same way.
> - [[Combinatorics]] counts the numerator and the denominator when hats or letters are returned at random, or when a sample of claims is drawn from a group.
> - A handful of questions on other exams link it too: FAM, ALTAM, ASTAM, MAS-I and Exam 5. On those exams it is background to the calculation rather than the point of it.

> [!warning]- Exam traps
> - **Outcomes that aren't equally likely.** Treating the eleven sums $2, \ldots, 12$ of two dice as equally likely gives $P(\text{sum} = 4) = 1/11$. The sums are not equally likely, and the answer is $3/36$. Count in the space of 36 ordered pairs.
> - **"At least one" counted directly.** For at least one 6 in four rolls, $4 \times \frac{1}{6} = \frac{2}{3}$ counts rolls with two or more 6s more than once. Use the complement: $1 - (5/6)^4 = 0.518$.
> - **A probability outside $[0, 1]$.** A count of favourable outcomes larger than $|S|$, or a negative complement, means the count went wrong. Either an outcome was counted more than once, or the numerator and denominator were counted in different sample spaces, ordered in one and unordered in the other. Counting "at least one 6" in eight rolls as $8 \cdot 6^7$ favourable outcomes, for example, counts outcomes more than once and gives $8/6$.
