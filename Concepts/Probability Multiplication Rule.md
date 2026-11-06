---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:ec4b18153d934058b6c244b90ae23579f8a4191f7e1cebb528fae41deda6a62d
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 conditional probability p.134 (PDF p.142), Example 4.5/Fig. 4.1 p.135 (PDF p.143), Def. 4.1 + Thm 4.1 pp.139-140 (PDF pp.147-148), eq. (4.2) p.146 (PDF p.154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q351 p.98 (multiplication rule for independent events), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Multiplication Rule.md
---

The **Probability Multiplication Rule** gives the probability that two [[Event|events]] $A$ and $B$ both occur. It multiplies the probability of $A$ by the [[Conditional Probability|conditional probability]] of $B$ given $A$.

> $$P(A \cap B) = P(A)\,P(B \mid A)$$

> $$P(A \cap B) = P(B)\,P(A \mid B)$$

- The two forms condition in opposite directions. Use the one whose conditional probability the question gives.
- When $A$ and $B$ are [[Independent Events|independent]], $P(B \mid A) = P(B)$ and the rule becomes $P(A \cap B) = P(A)\,P(B)$.
- The rule is the definition of conditional probability, $P(B \mid A) = P(A \cap B)/P(A)$, solved for the joint probability.

> [!idea] The idea
> Follow the events in order. $A$ happens in a share $P(A)$ of outcomes, and among those, $B$ also happens in a share $P(B \mid A)$. A share of a share is a product, so the probability that both happen is $P(A)$ times $P(B \mid A)$.

![[Media/Figures/Probability_Multiplication_Rule.svg|340]]

## Two draws in sequence

A portfolio has 10 policies. 4 will generate a claim this year and 6 will not. Two policies are drawn at random without replacement. What is the probability that both generate a claim?

The first draw is a claim with probability $4/10$. Given that, 3 of the 9 policies left are claims.

> $$P(\text{both claim}) = \frac{4}{10} \times \frac{3}{9} = \frac{2}{15} \approx 0.133$$

The same rule gives every path through the two draws. Here $C$ is a claim and $N$ is no claim.

| First, second | Probability |
|---|---|
| $C, C$ | $\frac{4}{10} \cdot \frac{3}{9} = \frac{12}{90}$ |
| $C, N$ | $\frac{4}{10} \cdot \frac{6}{9} = \frac{24}{90}$ |
| $N, C$ | $\frac{6}{10} \cdot \frac{4}{9} = \frac{24}{90}$ |
| $N, N$ | $\frac{6}{10} \cdot \frac{5}{9} = \frac{30}{90}$ |

The four paths add to 1. Counting gives the same first answer, $\binom{4}{2} / \binom{10}{2} = 6/45 = 2/15$.

## Either order gives the same answer

The second form of the rule conditions on $B$ instead. From the table, the second policy is a claim with probability $12/90 + 24/90 = 0.4$. That is the same as the first, by symmetry. Given that the second is a claim, the first is one of the other 9 policies, 3 of which are claims.

> $$P(\text{both claim}) = 0.4 \times \frac{3}{9} = \frac{2}{15}$$

Both forms give the same joint probability. A question that states "of those who passed January, 60% pass February" hands over $P(\text{Feb} \mid \text{Jan})$, so the first form is the one to use.

## A chain of events

Draw a third policy. All three are claims with probability $\frac{4}{10} \cdot \frac{3}{9} \cdot \frac{2}{8} = \frac{1}{30}$. Each factor conditions on everything drawn before it.

> $$P(A_1 \cap A_2 \cap A_3) = P(A_1)\,P(A_2 \mid A_1)\,P(A_3 \mid A_1 \cap A_2)$$

- The chain extends to any number of events, one conditional factor per event.
- A tree diagram is the same chain drawn out. Each branch carries a conditional probability, and a path's probability is the product along it.

## With replacement, or independent

If each policy is put back before the next draw, the second draw no longer depends on the first. $P(B \mid A) = P(B) = 0.4$ and both are claims with probability $0.4^2 = 0.16$.

> [!trap] Unconditional factors without replacement
> Without replacement, the second factor must reflect the first draw. Using $0.4 \times 0.4 = 0.16$ in place of $0.4 \times 3/9 \approx 0.133$ treats dependent draws as independent.

## Try it

> [!example]- Reading the conditional off the wording {Example}
> Every customer insures at least one car. 60% insure more than one car and 25% insure a sports car. Of the customers who insure more than one car, 20% insure a sports car. Find the probability that a customer insures exactly one car and it is not a sports car.
>
> > [!answer]-
> > **Plan:** "of the customers who insure more than one car" gives a conditional probability. Multiply it by the probability of its condition, then work through the complements.
> >
> > Multi-car and sports car: $0.60 \times 0.20 = 0.12$.
> >
> > One car and a sports car: $0.25 - 0.12 = 0.13$.
> >
> > One car and no sports car: $0.40 - 0.13 = 0.27$.

> [!example]- "Three times as likely" {Example}
> 60% of students pass a January exam and 45% pass a February exam. Students who pass in January are three times as likely to pass in February as those who fail in January. Find the probability that a student passes both.
>
> > [!answer]-
> > **Plan:** let $y = P(\text{Feb} \mid \text{fail Jan})$, so $P(\text{Feb} \mid \text{Jan}) = 3y$. Solve for $y$ from the overall pass rate, then apply the multiplication rule.
> > $$
> > \begin{align*}
> > 0.45 &= 0.60(3y) + 0.40\,y \\
> > &= 2.2\,y
> > \end{align*}
> > $$
> > So $y \approx 0.2045$ and $P(\text{both}) = 0.60 \times 3y \approx 0.368$.
> > The overall rate is the [[The Law of Total Probability|law of total probability]] over January's two outcomes.

> [!example]- The first claim on the third draw {Example}
> From the 10 policies, 4 of which claim, policies are drawn without replacement. Find the probability that the first claim appears on the third draw.
>
> > [!answer]-
> > **Plan:** the event is no claim, no claim, then a claim. Chain the three conditional factors.
> > $$
> > \begin{align*}
> > P(N, N, C) &= \frac{6}{10} \cdot \frac{5}{9} \cdot \frac{4}{8} \\
> > &= \frac{1}{6}
> > \end{align*}
> > $$

> [!warning]- Exam traps
> - **The conditional the wrong way round.** "Of those with a sports car, 48% insure several cars" is $P(\text{multi} \mid \text{sports})$. It pairs with $P(\text{sports})$, not $P(\text{multi})$.
> - **Dependent draws treated as independent.** Without replacement, every later factor changes with what was drawn.
> - **Multiplying where events are mutually exclusive.** Two events that cannot both occur have $P(A \cap B) = 0$, not $P(A)\,P(B)$.
