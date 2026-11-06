---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:f5e35f5f830493b6d37e3eac16f9372009b3a83bbeeadfbbff1a649992bfa4d4
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 sample space (p.18, PDF p.26), Example 1.9 (p.20, PDF p.28), Infinite Sample Spaces (p.28, PDF p.36), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (outcome, sample space, event), fetched 2026-09-28, sha256:5ab5af0abfbf56905a0a023eb3242ae9749a17af50a5ff8581a6c69030ce29ad — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Example 1.11 (p.26, PDF p.34: m((i,j)) = 1/36), §3.1 A Counting Technique and tree diagrams (p.76, PDF p.84: N = n1·n2·…·nr), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space (p.18, PDF p.26), Def. 1.2 distribution function m(ω)≥0, Σm(ω)=1, P(E)=Σ_{ω∈E}m(ω) (p.19, PDF p.27), Thm 1.1 (p.22, PDF p.30), Historical Remarks: 36 ordered vs 21 unordered pairs (p.30, PDF p.38); §3.1 A Counting Technique (p.76, PDF p.84), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 difference A−B (p.21, PDF p.29), Thm 1.4 proof ('added twice') and Cor. 1.1 P(A)=P(A∩B)+P(A∩~B) (p.24, PDF p.32), Historical Remarks: 36 ordered vs 21 unordered pairs (p.30, PDF p.38), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Venn Fig. 1.7, Thm 1.1-1.4 incl. Thm 1.4 proof 'added twice' (pp.21-24, PDF pp.29-32); Infinite Sample Spaces (pp.28-29, PDF pp.36-37), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Sample Space.md
---

A **Sample Space** $S$ (or $\Omega$) is the set of all possible outcomes of a random experiment. When $S$ is finite or countably infinite, its outcomes can be listed in sequence:

> $$S = \{\omega_1, \omega_2, \ldots\}$$

- where each $\omega_i$ is an elementary outcome of the experiment.
- Outcomes in $S$ must be mutually exclusive (no two can occur simultaneously) and collectively exhaustive (together they cover every possibility)
- The sample space can be finite, countably infinite, or uncountably infinite, depending on the experiment.
- An [[Event|event]] is a subset of $S$. A mistake in the sample space carries into every probability computed from it.

> [!idea] The idea
> You can't find the probability of an event until you know every outcome that could occur. The sample space is the set of all of them, each listed once and none missing. So the outcomes' probabilities sum to 1, and an event's probability is the sum of the probabilities of its outcomes.

![[Media/Figures/Sample_Space.svg|340]]

## Listing the outcomes

A policyholder buys auto insurance for two years. For each year, the insurer records whether the policyholder had no accident, one accident, or two or more. What are the possible outcomes?

An outcome must say what happened in *both* years, so it is an ordered pair (year one, year two). Three results in year one, each followed by three in year two, give nine outcomes.

| Year one | Year two: 0 | Year two: 1 | Year two: 2+ |
|---|---|---|---|
| 0 | (0, 0) | (0, 1) | (0, 2+) |
| 1 | (1, 0) | (1, 1) | (1, 2+) |
| 2+ | (2+, 0) | (2+, 1) | (2+, 2+) |

This is the multiplication principle. If an experiment is carried out in two stages, with $n_1$ outcomes at the first stage and, for each of them, $n_2$ outcomes at the second, the sample space has $n_1 \times n_2$ ordered outcomes.

> $$|S| = n_1 \times n_2$$

- The order matters. $(1, 0)$ and $(0, 1)$ are different outcomes, because the accident happened in a different year.
- The words "for each" matter too. Drawing two different digits from 0 to 9 gives $10 \times 9 = 90$ ordered outcomes, because the second stage has one value fewer.

## Each outcome once, none missing

Why must the outcomes be mutually exclusive and exhaustive? Because the probabilities of the outcomes have to add to exactly 1.

- **Exhaustive.** Every possible two-year record is one of the nine cells. Leaving out "2+" would leave some policyholders with no outcome, and the probabilities would add to less than 1.
- **Mutually exclusive.** A policyholder's record is exactly one cell. A list such as $\{\text{Claim}, \text{Large Claim}, \text{No Claim}\}$ fails this test, because a large claim is also a claim. Its probabilities would add to more than 1.

Once the outcomes pass both tests, any event is a set of cells. "At least one accident in year two" is the six cells in the last two columns.

## How much detail?

The same experiment can be described by a coarser sample space. The insurer could record only the total number of accidents over the two years. That sample space is shorter, but it can't answer "Was there an accident in year two?", because a total of 1 could be $(1, 0)$ or $(0, 1)$.

- Choose a sample space fine enough for every event the question asks about.
- When the probabilities come from counting, choose one whose outcomes are equally likely. Two fair dice have 36 equally likely ordered outcomes. The 21 unordered results are not equally likely, because $\{1, 2\}$ happens two ways and $\{1, 1\}$ only one.

## Finite, countable or uncountable

Record the exact number of accidents each year instead of capping it at "2+". The outcomes are then all pairs $(j, k)$ with $j, k = 0, 1, 2, \ldots$. The list never ends, but it can still be written in sequence, so the sample space is countably infinite.

Now record the time until the policyholder's first claim. Any positive real number is possible, so $S = (0, \infty)$. That sample space is uncountable. Its outcomes can't be listed, and each single time has probability 0. Probabilities then come from intervals and a density, which is why a [[Continuous Random Variable|continuous random variable]] needs calculus.

## Try it

> [!example]- Two random digits {Example}
> Two people each pick a digit from 0 to 9, independently and uniformly at random. Find the probability that they pick the same digit.
>
> > [!answer]-
> > **Plan:** use ordered pairs, which are equally likely, then count the matches.
> >
> > The sample space is the $10 \times 10 = 100$ ordered pairs. The favourable pairs are $(0, 0), (1, 1), \ldots, (9, 9)$, ten of them.
> > $$P(\text{same digit}) = \frac{10}{100} = 0.10$$

> [!example]- Claim occurrence and size {Example}
> An experiment records whether a policyholder files a claim and, if so, classifies the loss as small (at most $\$1{,}000$) or large (more than $\$1{,}000$). Write the sample space.
>
> > [!answer]-
> > **Plan:** list results that can't occur together and that cover every case.
> > $$S = \{\text{No Claim},\ \text{Small Claim},\ \text{Large Claim}\}$$
> > No two of the outcomes can occur together, and every possible result is one of them. "Claim" is not an outcome here, because it overlaps the last two.

> [!example]- Unordered results on two dice {Example}
> Two fair dice are rolled. A student lists the 21 unordered results and gives each probability $1/21$. Find the true probability of $\{1, 2\}$ and of $\{1, 1\}$.
>
> > [!answer]-
> > **Plan:** go back to the 36 equally likely ordered pairs.
> >
> > - $\{1, 2\}$ is $(1, 2)$ or $(2, 1)$, so its probability is $2/36 = 1/18$.
> > - $\{1, 1\}$ is only $(1, 1)$, so its probability is $1/36$.
> >
> > The 21 results have probabilities $1/36$ or $2/36$, not $1/21$. They still add to 1, because 6 doubles and 15 mixed pairs give $6 + 30 = 36$ thirty-sixths.

> [!warning]- Exam traps
> - **Unordered outcomes treated as equally likely.** Two dice have 21 unordered results but 36 equally likely ordered ones. Dividing by 21 gives wrong probabilities.
> - **Outcomes that overlap.** $\{\text{Claim}, \text{Large Claim}, \text{No Claim}\}$ is not a sample space. A large claim is also a claim, so the probabilities add to more than 1.
> - **$n_1 \times n_2$ without the "for each".** Drawing two different digits from 0 to 9 gives $10 \times 9 = 90$ ordered outcomes, not $100$.
> - **A sample space too coarse for the question.** Recording only the two-year total can't separate an accident in year one from one in year two.
