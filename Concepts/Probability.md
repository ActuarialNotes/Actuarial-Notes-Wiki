---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:7013f7f5f83afe26167bac648bf89f7ce9ecd69582cdf972f999dab0f228c449
  sources:
    - "SOA Probability Exam syllabus, November 2026, General Probability learning outcomes a, c-g, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 pp.22-23 (PDF pp.30-31), Def. 1.3 p.25 (PDF p.33), historical remark p.30 (PDF p.38), §4.1 Examples 4.1/4.4 pp.133-135 (PDF pp.141-143), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Example 1.10 (p.24, PDF p.32: three coin tosses, eight equally likely paths), Example 1.11 (p.26, PDF p.34: ordered pairs, 36 equally likely outcomes, unordered pairs declined), §3.1 A Counting Technique (p.76, PDF p.84), Example 3.14 (p.107, PDF p.115), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, coin-tossing example (2^n bit strings, equally likely), sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.2 distribution function P(E)=Σm(ω) (p.19, PDF p.27), Def. 1.3 uniform m(ω)=1/n (p.25, PDF p.33), Example 1.11 36 ordered pairs (p.26, PDF p.34), Historical Remarks: 36 ordered vs 21 unordered pairs (p.30, PDF p.38); §1.1 Example 1.3 de Méré, at least one six in four rolls 1−(5/6)^4 = .518 (pp.4-5, PDF pp.12-13); Thm 1.1 (p.22, PDF p.30), Thm 1.4 proof (p.24, PDF p.32), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures (discrete case: P(A)=#(A)/#(S) for counting measure; general discrete P(A)=Σ_{x∈A} f(x)), fetched 2026-11-04, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Probability.md
---

A **Probability** $P$ is a measure of how likely an event $E$ is to occur. It is a [[Set Function]] that maps events in a sample space to a real number between 0 and 1, and must satisfy the [[Axioms of Probability]].
If all outcomes in a finite sample space $S$ are equally likely, then $P$ can be calculated as:

> $$P(E) = \frac{|E|}{|S|}$$

> $$=\frac{\text{number of outcomes in E}}{\text{number of possible outcomes}}$$

- where $|E|$ is the number of outcomes in the event $E$ and $|S|$ the number of outcomes in the [[Sample Space]] $S$.
- When the outcomes are not equally likely, $P(E)$ is instead the sum of the probabilities of the individual outcomes in $E$.

> [!idea] The idea
> Equally likely outcomes share the total probability of 1 evenly, so each outcome carries $1/|S|$ and an event's probability is just a count. The work is choosing a sample space whose outcomes really are equally likely (ordered outcomes for dice and coins) and then counting carefully.

![[Media/Figures/Probability.svg|340]]

### Dice and coins: count ordered outcomes

- When fair dice are rolled independently, every ordered outcome is equally likely, so $n$ dice have $6^n$ equally likely ordered outcomes; two dice have $6 \times 6 = 36$.
- Treat the dice as distinguishable (a first die and a second die) even when they look alike, and count ordered outcomes: the unordered result "a 1 and a 2" is two ordered outcomes, $(1, 2)$ and $(2, 1)$, while "two 1s" is only one, $(1, 1)$.
- Fair coins work the same way: $n$ tosses have $2^n$ equally likely ordered sequences.

> $$P(E) = \frac{\text{number of ordered outcomes in } E}{6^n} \quad \text{for } n \text{ fair dice}$$

> [!example]- A Sum of 4 on Two Dice {Example}
>
> Two fair dice are rolled. What is the probability that the sum is 4?
>
> > [!answer]-
> > Count ordered pairs (first die, second die). A sum of 4 is $\{(1, 3), (3, 1), (2, 2)\}$: three of the 36 equally likely ordered outcomes.
> >
> > $$P(\text{sum} = 4) = \frac{3}{36} = \frac{1}{12}$$
> >
> > Counting unordered results instead ($\{1, 3\}$ and $\{2, 2\}$) would undercount, because $\{1, 3\}$ can happen two ways and $\{2, 2\}$ only one.

> [!example]- Probability of a Fair Die? {Example}
> 
> What is the probability of rolling an even number on a fair 6-sided die?
> 
> > [!answer]-
> >  
> > - **Sample Space ($S$):** $\{1, 2, 3, 4, 5, 6\}$
> > - **Event ($E$):** Rolling an even number $\rightarrow \{2, 4, 6\}$
> >
> > The size of the set $S$ is 6 (there are 6 possible outcomes). The size of the set $E$ is 3 (there are 3 even numbers)
> > 
> > - $$P(E) = \frac{|E|}{|S|} = \frac{3}{6} = 50\%$$
> >
> > > [!tip] Common Trap
> > > Always verify the sample space first.
> > > If the problem said "a die is rolled and the result is greater than 2," your $|S|$ would change from 6 to 4

> [!tip]- How it appears on the exam
> - **Exam P** (General Probability, objectives 1–2): the page is tagged on 74 Exam P questions in the bank, so it underlies most of the first topic rather than one question shape.
> - Equally likely outcomes counted directly: dice and coins (three fair dice; three fair coins, the toss repeated until a success), or two numbers chosen at random from the same range.
> - Counting with [[Combinatorics]] for the numerator and denominator: hats or letters returned at random, a sample of claims drawn from a group.
> - A handful of questions on other exams link it too (FAM, ALTAM, ASTAM, MAS-I, Exam 5), where it is background to the calculation rather than the point of it.

> [!warning]- Exam traps
> - **Outcomes that aren't equally likely.** Treating the eleven sums $2, \ldots, 12$ of two dice as equally likely gives $P(\text{sum} = 4) = 1/11$; the sums are not equally likely, and the answer is $3/36$. Count in the space of 36 ordered pairs.
> - **"At least one" counted directly.** For at least one 6 in four rolls, $4 \times \frac{1}{6} = \frac{2}{3}$ counts rolls with two or more 6s more than once. Use the complement: $1 - (5/6)^4 = 0.518$.
> - **A probability outside $[0, 1]$.** A count of favourable outcomes larger than $|S|$, or a negative complement, means the count went wrong: an outcome was counted more than once (counting "at least one 6" in eight rolls as $8 \cdot 6^7$ favourable outcomes gives $8/6$), or the numerator and denominator were counted in different sample spaces (ordered in one and unordered in the other).
