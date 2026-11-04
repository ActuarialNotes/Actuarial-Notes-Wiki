---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:f5e35f5f830493b6d37e3eac16f9372009b3a83bbeeadfbbff1a649992bfa4d4
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Venn Fig. 1.7, Thm 1.1-1.4 incl. Thm 1.4 proof 'added twice' (pp.21-24, PDF pp.29-32); Infinite Sample Spaces (pp.28-29, PDF pp.36-37), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Sample Space.md
---

A **Sample Space** $S$ (or $\Omega$) is the set of all possible outcomes of a random experiment. When $S$ is finite or countably infinite, its outcomes can be listed in sequence:

> $$S = \{\omega_1, \omega_2, \ldots\}$$

- where each $\omega_i$ is an elementary outcome of the experiment
- Every conceivable result of the experiment appears as exactly one element of $S$
- Outcomes in $S$ must be mutually exclusive (no two can occur simultaneously) and collectively exhaustive (together they cover every possibility)
- The sample space can be finite, countably infinite, or uncountably infinite depending on the experiment
- A mistake in the sample space carries into every probability computed from it. Treating the 21 unordered results of two dice as equally likely, for example, makes every answer wrong.

> [!idea] The idea
> You can't find the probability of an event until you know every outcome that could occur. The sample space is the set of all of them. Each outcome appears once and none is missing, so the outcomes' probabilities sum to 1 and an [[Event]]'s probability is the sum of the probabilities of its outcomes.

![[Media/Figures/Sample_Space.svg|340]]

### Ordered pairs: the multiplication principle

- If an experiment is carried out in two stages, with $n_1$ outcomes at the first stage and, for each of them, $n_2$ outcomes at the second, the sample space has $n_1 \times n_2$ ordered outcomes.

> $$|S| = n_1 \times n_2$$

- Rolling two fair dice gives $6 \times 6 = 36$ equally likely ordered outcomes, each with probability $1/36$.
- When each of two independent choices is made uniformly at random from the same $n$ values, all $n^2$ ordered pairs are equally likely, each with probability $1/n^2$, so the probability of an event is the number of favourable ordered pairs divided by $n^2$.

> $$P(E) = \frac{\text{number of favourable ordered pairs}}{n^2}$$

> [!example]- Two Random Digits {Example}
> Two people each pick a digit from 0 to 9, independently and uniformly at random. Find the probability that they pick the same digit.
>
> > [!answer]-
> > The sample space is the $10 \times 10 = 100$ equally likely ordered pairs. The favourable pairs are $(0, 0), (1, 1), \ldots, (9, 9)$, ten of them:
> > $$P(\text{same digit}) = \frac{10}{100} = 0.10$$

> [!example]- Sample Space for Claim Occurrence and Size {Example}
> An experiment records whether a policyholder files a claim and, if so, classifies the loss as small ($\le$ \$$1{,}000$) or large ($>$ \$$1{,}000$). Write the sample space.
>
> > [!answer]-
> > There are three mutually exclusive, exhaustive outcomes:
> > $$S = \{\text{No Claim},\; \text{Small Claim},\; \text{Large Claim}\}$$
> > No two of the outcomes can occur together. Every possible result of the experiment is one of them.

> [!tip]- How it appears on the exam
> - **Exam P** (General Probability, objective 1: define sample space and events): rarely asked on its own. One question in the bank is tagged with this page. It asks which events, described in words over a two-year policy, match a set expression.
> - More often the sample space is the first step of a counting question: list the ordered outcomes of dice, coins or a two-stage choice, then count the favourable ones.

> [!warning]- Exam traps
> - **Unordered outcomes treated as equally likely.** Two dice have 21 unordered results but 36 equally likely ordered ones. Dividing by 21 gives wrong probabilities because $\{1, 2\}$ happens two ways and $\{1, 1\}$ only one.
> - **Outcomes that overlap.** $\{\text{Claim}, \text{Large Claim}, \text{No Claim}\}$ is not a sample space: a large claim is also a claim, so the probabilities add to more than 1. Split into outcomes that cannot co-occur.
> - **$n_1 \times n_2$ without the "for each".** Drawing two different digits from 0–9 gives $10 \times 9 = 90$ ordered outcomes, not $100$. The second stage has fewer choices because the first digit can't repeat.
