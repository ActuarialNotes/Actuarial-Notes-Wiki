---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:5e7488b2be8c299f7a43f5e9f10666f7ffe8df9204db9a546cea59754a061b3c
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space/outcomes/events, Def. 1.2 P(E)=Σ_{ω∈E} m(ω), Examples 1.6-1.9, set operations and Fig. 1.7, Thm 1.1 (P(E)≥0, P(Ω)=1, monotonicity, disjoint additivity, complement with proof), Thms 1.2-1.4 and Cor. 1.1 (pp.18-24, PDF pp.26-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 A Counting Technique N = n1·n2·…·nr (p.76, PDF p.84); §3.2 Ex. 3.5 and binomial coefficients, a set of n elements has 2^n subsets (p.93, PDF p.101); §5.1 hypergeometric h(N,k,n,x) = C(k,x)C(N−k,n−x)/C(N,n) (p.193, PDF p.201), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.3.1 Random Experiments (outcome, sample space = set of all possible outcomes, event = subset; union = 'or'/'at least', intersection = 'and'), read 2026-11-06, sha256:45b7306c1035a289566eaa2987945972aebd1eeab04d12c337bef7e23a4139e9 — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.1 §2 Events and Random Variables: events, S always occurs and the empty set never occurs, discrete sample space = all subsets, disjoint = mutually exclusive, read 2026-11-06, sha256:510418f107a11631155faaf9854f524c0e241b1319a4bc335ace7a769ee0aec3 — https://www.randomservices.org/random/prob/Events.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, introduction (calculus incl. series, differentiation, integration assumed, PDF p.1) and Topic 1 General Probability learning objective and outcomes a-g (PDF p.2), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Event.md
---

An **event** $E$ is any subset of the [[Sample Space]] $S$. Events are the objects to which probabilities are assigned.

> $$E \subseteq S$$

- A **simple** (elementary) **event** contains exactly one outcome.
- $S$ itself is the certain event, and the empty set $\varnothing$ is the impossible event.
- The [[Axioms of Probability]] define $P(E) \in [0,1]$ for every event $E$, with $P(S) = 1$.

> [!idea] The idea
> A question asks about a statement, such as "the policyholder has an accident in year two", and many different outcomes make it true. The event is the set of all those outcomes. Its probability is the total probability of the outcomes in it, so the work is in deciding exactly which outcomes belong.

![[Media/Figures/Event.svg|340]]

## From a statement to a set of outcomes

A policyholder buys auto insurance for two years. Each year the insurer records 0, 1, or 2 or more accidents, so an outcome is an ordered pair (year one, year two) and $S$ has nine outcomes.

Which outcomes make "exactly one accident in year one" true? Every pair whose first entry is 1.

> $$F = \{(1, 0),\ (1, 1),\ (1, 2+)\}$$

In the same way, "one or more accidents in year two" is every pair whose second entry is 1 or 2+.

> $$G = \{(0, 1),\ (0, 2+),\ (1, 1),\ (1, 2+),\ (2+, 1),\ (2+, 2+)\}$$

- The event $F$ **occurs** when the outcome lands in $F$. If the record is $(1, 1)$, then $F$ and $G$ both occur.
- The simple event $\{(0, 0)\}$ is "no accidents in either year".

## Combining events

Exam questions describe events in words. The words "and", "or" and "not" become the [[Set Operations|set operations]] intersection, union and complement.

| Words | Event | Outcomes |
|---|---|---|
| $F$ and $G$ | $F \cap G$ | (1, 1), (1, 2+) |
| not $G$ | $G^c$ | (0, 0), (1, 0), (2+, 0) |
| $F$ or not $G$ | $F \cup G^c$ | (1, 0), (1, 1), (1, 2+), (0, 0), (2+, 0) |

Two descriptions name the **same event** when they hold the same outcomes. "Exactly one accident in year one, and two or more accidents in total" is $\{(1, 1), (1, 2+)\}$. That is $F \cap G$ again, worded another way.

> [!trap] A description that only sounds the same
> "Exactly one accident in year one and more than one in year two" leaves out $(1, 1)$. It is a proper subset of $F \cap G$, not the same event. Check each outcome against both descriptions.

## Assigning probabilities

Suppose each year has 0, 1 or 2+ accidents with probabilities 0.7, 0.2 and 0.1, independently of the other year. Each outcome's probability is then a product.

| Year one | Year two: 0 | Year two: 1 | Year two: 2+ |
|---|---|---|---|
| 0 | 0.49 | 0.14 | 0.07 |
| 1 | 0.14 | 0.04 | 0.02 |
| 2+ | 0.07 | 0.02 | 0.01 |

The probability of an event is the sum of its cells.

> $$P(E) = \sum_{\omega \in E} P(\{\omega\})$$

- $P(F) = 0.14 + 0.04 + 0.02 = 0.20$.
- $P(F \cap G) = 0.04 + 0.02 = 0.06$.
- $P(G^c) = 0.49 + 0.14 + 0.07 = 0.70$, so $P(G) = 0.30$.

## When can probabilities be added?

Two events are [[Mutually Exclusive Events|mutually exclusive]] when they share no outcome. Then the probability of their union is the sum of their probabilities, because no cell is counted twice.

- $F$ and $\{(0, 0)\}$ share no cell, so $P(F \cup \{(0, 0)\}) = 0.20 + 0.49 = 0.69$.
- $F$ and $G$ share two cells. Adding gives $0.20 + 0.30 = 0.50$, but the union is $0.44$, because the shared cells, worth 0.06, were counted twice.

To decide whether several events can be added, look for an outcome that lies in two of them. One shared outcome is enough to rule it out.

## Try it

> [!example]- Rolling a die {Example}
> A fair six-sided die is rolled. The sample space is $S = \{1,2,3,4,5,6\}$. Write the event "an even number is rolled" and find its probability.
>
> > [!answer]-
> > **Plan:** list the outcomes that make the statement true, then count.
> >
> > $E = \{2, 4, 6\}$ contains 3 of the 6 equally likely outcomes.
> > $$P(E) = \frac{|E|}{|S|} = \frac{3}{6} = 0.5$$

> [!example]- Thefts over three years {Example}
> A homeowners policy is observed for three years. Let $A$ be "no thefts in any year", $B$ "at least one theft in year one" and $C$ "no theft in year one and at least one in year three". Can $P(A \cup B \cup C)$ be found by adding?
>
> > [!answer]-
> > **Plan:** check each pair of events for a shared outcome.
> >
> > - $A$ and $B$: $A$ has no theft in year one and $B$ has one. No shared outcome.
> > - $A$ and $C$: $A$ has no theft in year three and $C$ has one. No shared outcome.
> > - $B$ and $C$: they disagree about year one. No shared outcome.
> >
> > The three events are mutually exclusive, so $P(A \cup B \cup C) = P(A) + P(B) + P(C)$.

> [!example]- How many events? {Example}
> The two-year sample space above has 9 outcomes. How many different events does it have?
>
> > [!answer]-
> > **Plan:** an event is any subset, and each outcome is either in it or out of it.
> > $$2^9 = 512$$
> > The count includes $\varnothing$ and $S$ itself. The collection of all subsets is the [[Power Set|power set]] of $S$.

> [!warning]- Exam traps
> - **An outcome is not an event.** $(1, 1)$ is an outcome. $\{(1, 1)\}$ is the simple event that contains it.
> - **Similar wording, different set.** "More than one" and "at least one" differ by the outcome with exactly one. List the outcomes before calling two events the same.
> - **Adding events that overlap.** $P(F) + P(G)$ counts $F \cap G$ twice. Add only events that are mutually exclusive.
