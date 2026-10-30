---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:0ebe422c8bc4252e67838dab633cae3bcc12f1b3307ef793943f7af4bd9cd5f4
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 sample space (p.18, PDF p.26), Example 1.9 (p.20, PDF p.28), Infinite Sample Spaces (p.28, PDF p.36), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (outcome, sample space, event), fetched 2026-09-28, sha256:5ab5af0abfbf56905a0a023eb3242ae9749a17af50a5ff8581a6c69030ce29ad — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1a (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Example 1.11 (p.26, PDF p.34: m((i,j)) = 1/36), §3.1 A Counting Technique and tree diagrams (p.76, PDF p.84: N = n1·n2·…·nr), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Sample Space.md
---

A **Sample Space** $S$ (or $\Omega$) is the set of all possible outcomes of a random experiment.
- Every conceivable result of the experiment appears as exactly one element of $S$
- Outcomes in $S$ must be mutually exclusive (no two can occur simultaneously) and collectively exhaustive (together they cover every possibility)
- The sample space can be finite, countably infinite, or uncountably infinite depending on the experiment
- When $S$ is finite or countably infinite, its outcomes can be listed in sequence:

> $$S = \{\omega_1, \omega_2, \ldots\}$$
>
> $$\text{where each } \omega_i = \text{an elementary outcome of the experiment}$$

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
> > Each outcome is distinct, they cannot co-occur, and every possible result of the experiment is represented.
