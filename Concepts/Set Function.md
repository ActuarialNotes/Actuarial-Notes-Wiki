---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:bb6fb57cc03c90cfde8d1020e31b5db5fe699dacc693d20a7900ccaa3f8d9df5
  sources:
    - "Encyclopedia of Mathematics (Springer/EMS), article Set function, fetched 2026-09-28, sha256:b2e0e1232b723b52bdc147fe88ced0ad2f459b58ce633e882eb2b38a9ea7d3d2 — https://encyclopediaofmath.org/wiki/Set_function"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Examples 1.6 and 1.8 (pp.18-20, PDF pp.26-28), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Set Function.md
---

A **set function** $f$ is a function that maps a collection of subsets $\mathcal{F}$ of a set $\mathcal{S}$ to the real numbers $\mathbb{R}$.

> $$f:\mathcal{F} \to \mathbb{R}$$

- Its input is a whole set, not a single number. Its output is one real number for that set.
- The count $n(A)$ of the elements in $A$ is a set function. So is a [[Probability|probability]] $P(A)$, defined on the [[Event|events]] of a [[Sample Space|sample space]].
- A set function is **additive** when $f(A \cup B) = f(A) + f(B)$ for every pair of disjoint sets $A$ and $B$.

> [!idea] The idea
> A count, a probability and an area all measure how big a set is. Each assigns a number to a whole set, and for pieces that don't overlap the number for the union is the sum of the numbers for the pieces. That shared rule is why a count of clients and a probability are worked out with the same diagrams and the same formulas.

![[Media/Figures/Set_Function.svg|340]]

## A count is a set function

An insurance agent has 100 clients. 60 have an auto policy, 45 have a homeowners policy, and 25 have both. Let $n(\cdot)$ count the clients in a set.

| Set | Clients | $n$ |
|---|---|---|
| $A$ | auto | 60 |
| $H$ | homeowners | 45 |
| $A \cap H$ | both | 25 |
| $S$ | all clients | 100 |

How many clients have at least one policy? Adding 60 and 45 counts the 25 clients with both policies twice, so subtract them once.

> $$n(A \cup H) = n(A) + n(H) - n(A \cap H)$$

- $n(A \cup H) = 60 + 45 - 25 = 80$, so $100 - 80 = 20$ clients have neither policy.

## Additive pieces

Why subtract the overlap? Because $n$ adds exactly only over sets that don't overlap. Cut the clients into disjoint pieces and every count is a sum of pieces.

| Piece | Clients |
|---|---|
| auto only, $A \cap H^c$ | $60 - 25 = 35$ |
| home only, $A^c \cap H$ | $45 - 25 = 20$ |
| both, $A \cap H$ | 25 |
| neither, $(A \cup H)^c$ | 20 |

- The four pieces add to 100.
- $n(A \cup H) = 35 + 20 + 25 = 80$, the same answer as the formula.
- A problem stated as "15 more clients own only auto than only home" is an equation in these pieces. Each given fact becomes one equation.

## Not every set function adds

Let $g(A) = 1$ if $A$ has at least one client and $g(A) = 0$ if $A$ is empty. $g$ is a set function, but it is not additive. The auto-only and home-only pieces are disjoint and each has $g = 1$, yet their union also has $g = 1$, not 2.

Additivity is the property that makes a set function behave like a size. It is the third of the [[Axioms of Probability|axioms of probability]].

## Probability as a set function

Pick one of the 100 clients at random. Each client is equally likely, so the probability of a set is its count divided by 100.

> $$P(A) = \frac{n(A)}{n(S)}$$

- $P(A \cup H) = 80/100 = 0.80$ and $P(\text{neither}) = 0.20$.
- Dividing by $n(S)$ keeps additivity and makes $P(S) = 1$. Those are the axioms.
- Every count identity therefore has a probability twin. $P(A \cup H) = P(A) + P(H) - P(A \cap H)$ is the count formula divided by 100.

## Try it

> [!example]- Probability of a fair die {Example}
> A fair die is rolled. Find the probability assigned to the event $\{2, 4, 6\}$.
>
> > [!answer]-
> > **Plan:** the probability set function on equally likely outcomes is a count divided by 6.
> > $$P(\{2, 4, 6\}) = \frac{3}{6} = 0.5$$
> > A probability can be assigned in this way to any event in $S = \{1, 2, 3, 4, 5, 6\}$, which is what makes it a set function on the events of $S$.

> [!example]- A two-way split {Example}
> In a portfolio, there are 200 more policies on urban risks than on rural risks. There are 50 more claim-free rural policies than claim-free urban policies. 400 policies had a claim. Find the number of rural policies with a claim.
>
> > [!answer]-
> > **Plan:** name the four disjoint pieces, write each fact as an equation, and solve.
> >
> > Let $u_c$, $u_f$, $r_c$, $r_f$ be urban with a claim, urban claim-free, rural with a claim and rural claim-free.
> > $$
> > \begin{align*}
> > (u_c + u_f) - (r_c + r_f) &= 200 \\
> > r_f - u_f &= 50 \\
> > u_c + r_c &= 400
> > \end{align*}
> > $$
> > The first two give $u_c - r_c = 200 + 50 = 250$. With the third, $2 r_c = 150$, so $r_c = 75$.

> [!example]- Three products {Example}
> An agent's clients own auto, homeowners and life insurance. 160 own auto, 125 own homeowners, 40 own auto and homeowners, 35 own life and homeowners, and 10 own all three. 60 more clients own only auto than own only life, and 200 own exactly one product. Find the number of clients who own at least one product.
>
> > [!answer]-
> > **Plan:** find the seven disjoint pieces from the centre outwards, then add them.
> >
> > - Auto and homeowners only: $40 - 10 = 30$. Life and homeowners only: $35 - 10 = 25$.
> > - Homeowners only: $125 - 30 - 25 - 10 = 60$.
> > - Auto only plus life only: $200 - 60 = 140$, and their difference is 60. So auto only is 100 and life only is 40.
> > - Auto and life only: $160 - 100 - 30 - 10 = 20$.
> >
> > $$100 + 60 + 40 + 30 + 20 + 25 + 10 = 285$$
> >
> > Why work from the centre? Each pairwise count, such as the 40 with auto and homeowners, includes the 10 with all three.

> [!warning]- Exam traps
> - **Adding counts that overlap.** $n(A) + n(H)$ counts the clients in both sets twice. Additivity holds only for disjoint pieces.
> - **A pairwise count used as a piece.** "40 own auto and homeowners" includes those who own all three. The "only" piece is 40 less the centre.
> - **Forgetting the outside piece.** The pieces inside the circles add to "at least one", not to the whole group. Add "neither" when the question asks for the total.
