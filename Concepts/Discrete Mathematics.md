---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:8861415c7a0d5717c21fdd9bfd04437b6a32f4db0a7886703fe7450f3db922e0
  sources:
    - "Levin, Discrete Mathematics: An Open Introduction (4th ed.), §0.1 What is Discrete Mathematics? (objects individually separate and distinct, contrasted with the intervals of calculus), read 2026-11-06, sha256:ff3d5233b8d550726430f4d4ddf082cf192cd0cdcb7b1b27972d7e7c6c274773 — https://discrete.openmathbooks.org/dmoi4/sec_intro-intro.html"
    - "Levin, Discrete Mathematics: An Open Introduction (4th ed.), §0.2 Discrete Structures (implication false only when hypothesis true and conclusion false; Def. converse Q→P and contrapositive ¬Q→¬P; converse not equivalent), read 2026-11-06, sha256:006647200a59feee0cafe9809efd0a5e876e5d62198dded7ed547bb6efa57422 — https://discrete.openmathbooks.org/dmoi4/sec_intro-structures.html"
    - "Levin, Discrete Mathematics: An Open Introduction (4th ed.), §1.3 Rules of Logic (truth table of ¬P∨Q identical to P→Q), read 2026-11-06, sha256:ffc0b596025abccfcb8925529780567b385af4ac29f318bcff9fffd3e1f8fdfa — https://discrete.openmathbooks.org/dmoi4/sec_logic-rules.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 A Counting Technique N = n1·n2·…·nr (p.76, PDF p.84); §3.2 Ex. 3.5 and binomial coefficients, a set of n elements has 2^n subsets (p.93, PDF p.101); §5.1 hypergeometric h(N,k,n,x) = C(k,x)C(N−k,n−x)/C(N,n) (p.193, PDF p.201), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.0 §1 Sets: universal set, empty set, power set, union/intersection/difference/complement, De Morgan's laws, distributive laws, symmetric difference, Venn diagrams, partitions, read 2026-11-06, sha256:88ae6adae225bb78dcf149c6e9807cc4de3d615bf803a343f73b387d3729824a — https://www.randomservices.org/random/foundations/Sets.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, introduction (calculus incl. series, differentiation, integration assumed, PDF p.1) and Topic 1 General Probability learning objective and outcomes a-g (PDF p.2), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Discrete Mathematics.md
---

**Discrete Mathematics** is the branch of mathematics concerned with countable, distinct structures like [[Set Theory|sets]], as opposed to the continuous quantities studied in [[Calculus|calculus]]. Discrete mathematics provides the language and tools for counting outcomes, defining events, and reasoning about logical relationships between outcomes and events.

> $$|\mathcal{P}(S)| = 2^{|S|}$$

- A [[Power Set]] $\mathcal{P}(S)$ is the set of all subsets of $S$, and $|S|$ is the number of elements of $S$.
- Exam P lists discrete mathematics with probability in its first topic. It supplies the sets, the counts and the logic that general probability questions are built from.

> [!idea] The idea
> A probability over equally likely outcomes is a count divided by a count, and an event is a subset described in words. Discrete mathematics makes both precise. It counts outcomes without listing them, and it turns "if", "and", "or" and "not" into statements about sets.

![[Media/Figures/Discrete_Mathematics.svg|340]]

## Subsets: what a policy can cover

An insurer offers four optional coverages, $S = \{\text{Fire}, \text{Flood}, \text{Theft}, \text{Liability}\}$. A policy's coverages are a subset of $S$. How many different policies are possible?

Each coverage is either in the policy or out of it. Four independent in-or-out choices give $2 \times 2 \times 2 \times 2 = 16$ subsets.

- The count includes the empty set (no coverage) and $S$ itself (all four coverages).
- The same reasoning gives $2^n$ subsets for any set of $n$ elements. That is the formula above.
- A sample space with $n$ outcomes has $2^n$ [[Event|events]], one for each subset.

## Counting without listing

The insurer wants to know how many policies have exactly two coverages. Listing all 16 subsets would work here, but not for 20 coverages. Counting rules answer it directly.

| Question | Rule | Count |
|---|---|---|
| Policies with exactly 2 coverages | $\binom{4}{2}$ | 6 |
| Orders to review all 4 coverages | $4!$ | 24 |
| All possible policies | $2^4$ | 16 |

- A [[Combination|combination]] $\binom{n}{k}$ counts the subsets of size $k$, where order doesn't matter.
- A [[Permutation|permutation]] counts arrangements, where order does matter.
- The subsets of each size add back to the total: $\binom{4}{0} + \binom{4}{1} + \binom{4}{2} + \binom{4}{3} + \binom{4}{4} = 1 + 4 + 6 + 4 + 1 = 16$.

[[Combinatorics]] collects these rules. They are the numerator and the denominator of every equally likely probability.

## Logic: "if", "and", "or", "not"

Suppose the insurer requires that a policy with Flood also has Fire. How many of the 16 policies are allowed?

The statement "if Flood, then Fire" fails only when Flood is in and Fire is out. That happens in $2^2 = 4$ subsets, since Theft and Liability are free. So $16 - 4 = 12$ policies are allowed.

- "If $p$ then $q$" is the same as "not $p$, or $q$". It is false only when $p$ is true and $q$ is false.
- Its **contrapositive**, "if not $q$, then not $p$", says the same thing. A policy without Fire has no Flood.
- As sets, "if Flood then Fire" says the event "has Flood" is a subset of the event "has Fire".
- "And", "or" and "not" are the set operations intersection, union and complement.

## Sums over discrete values

What is the average number of coverages, over all 16 possible policies? A discrete quantity is averaged with a sum, where a continuous one would need an integral.

$$\frac{1}{16} \sum_{k=0}^{4} k \binom{4}{k} = \frac{0 + 4 + 12 + 12 + 4}{16} = 2$$

- The sum runs over the distinct values $k = 0, 1, \ldots, 4$, each weighted by how many subsets have that size.
- Means and probabilities of a [[Discrete Random Variable|discrete random variable]] are sums of exactly this kind.

## Try it

> [!example]- Counting subsets of a risk portfolio {Example}
> An insurer has 4 distinct risk categories: Fire, Flood, Theft, and Liability. How many distinct subsets of these risks could be included in a policy?
>
> > [!answer]-
> > **Plan:** each risk is in or out, so count the subsets with the power set formula.
> > $$|\mathcal{P}(S)| = 2^4 = 16$$
> > This includes the empty set (no coverage) and the full set (all four risks covered), giving 16 possible coverage combinations.

> [!example]- Six coverages {Example}
> A policy can include any of 6 optional coverages. How many policies have exactly 3 coverages, and how many have at least one?
>
> > [!answer]-
> > **Plan:** a combination for "exactly 3", and the complement of "none" for "at least one".
> >
> > - Exactly 3: $\binom{6}{3} = 20$.
> > - At least one: $2^6 - 1 = 63$, removing only the empty policy.
> >
> > Counting "at least one" through its complement avoids adding six combination terms.

> [!example]- Two coverages that exclude each other {Example}
> Of 6 optional coverages, two can't be held together. How many policies are allowed?
>
> > [!answer]-
> > **Plan:** count all policies, then remove those with both of the excluded pair.
> >
> > - All policies: $2^6 = 64$.
> > - Policies with both: the other 4 coverages are free, so $2^4 = 16$.
> >
> > $$64 - 16 = 48$$
> >
> > The rule "not both" is the complement of "both", so subtracting is quicker than counting the allowed policies directly.

> [!warning]- Exam traps
> - **Forgetting the empty set.** A set of $n$ elements has $2^n$ subsets, including $\varnothing$. "At least one" is $2^n - 1$.
> - **Order where it doesn't belong.** A set of coverages is unordered. Using $4 \times 3 = 12$ for two coverages counts each pair twice. The answer is $\binom{4}{2} = 6$.
> - **Reversing "if … then".** "If Flood, then Fire" does not mean "if Fire, then Flood". A policy may have Fire without Flood.
