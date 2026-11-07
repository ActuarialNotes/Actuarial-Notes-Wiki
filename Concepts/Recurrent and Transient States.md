---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:4269551184a4c56829fdb743d93b5460f573991df7199f8a6c7ab4c63db8f59e
  sources:
    - "Ross, Introduction to Probability Models, Ch 4 'Markov Chains' (an earlier edition than the 12th ed. the 2026 MAS-I outline assigns; course-hosted copy on the NTNU TMA4265 page, printed pp.185-280, PDF p.n = printed p.184+n), §4.3 Classification of States pp.193-204 (PDF pp.9-20): accessible / communicate / classes / irreducible and P^0_ii = 1 pp.193-194; f_i, recurrent iff f_i = 1, visits geometric f_i^(n-1)(1-f_i) with mean 1/(1-f_i) pp.195-196; E[visits] = sum_{n>=0} P^n_ii and Proposition 4.1 p.196; finite chain not all transient p.196; Corollary 4.2 and Remarks (transience a class property; finite irreducible chain recurrent) p.197; Example 4.15 random walk recurrent iff p = 1/2 pp.198-199; §4.4 p.204 (PDF p.20) period definition, periodicity a class property, positive recurrence a class property, finite chain recurrent => positive recurrent, ergodic = positive recurrent aperiodic, null recurrent footnote; Theorem 4.1 p.205; §4.5.1 three classes p.217; §4.7 P0 > 0 => states != 0 transient p.233, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Siegrist, Random (randomservices.org), Ch 15 §5 'Periodicity': d(x) = gcd{n >= 1: P^n(x,x) > 0}, d the largest integer with returns only at its multiples, period a class property, P(x,x) > 0 => aperiodic, sha256:6311c165cff1538b2b8da7ff2f5b6d243b86cb6f1e7cb423a2712c3a7689f9b3 — https://www.randomservices.org/random/markov/Periodicity.html"
    - "Siegrist, Random (randomservices.org), Ch 15 §4 'Transience and Recurrence': recurrent class is irreducible (closed); a finite closed set has a recurrent state; finite irreducible set is a recurrent class; geometric number of visits, sha256:24edb8bd0237b0e3abd7beeae48596f35421c9aa35653c6845cfaebb223c5535 — https://www.randomservices.org/random/markov/Recurrence.html"
    - "Siegrist, Random (randomservices.org), Ch 15 §6 'Stationary and Limiting Distributions': positive/null recurrence class property; a finite closed set has no null recurrent states; ergodic = irreducible, positive recurrent, aperiodic, sha256:d4719c5e1cb9ad3be4fbf84c8dd849390f7d1ad15ced112f6312be83e5545680 — https://www.randomservices.org/random/markov/Limiting.html"
    - "Siegrist, Random (randomservices.org), Ch 15 §14 'Random Walks on Graphs', simple random walk on Z: transient if p != 1/2, null recurrent if p = 1/2, sha256:ae887db7f9a51245ae88a050f75b470aabeee64f2257ed9aeeea0eef091640e8 — https://www.randomservices.org/random/markov/WalkGraph.html"
    - "CAS Exam MAS-I Spring 2018, Q10 — official exam paper (scan), PDF p.14; Final Answer Key PDF p.50 (Q10 = D), sha256:12d102c422a45e87674b082ad448ac5e25a495115f963d1a9ac63a9f8f028020 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-18.pdf"
    - "CAS Exam MAS-I Fall 2019, Q9 — official exam paper (scan), PDF p.13; Final Answer Key PDF p.50 (Q9 = E), sha256:32e26dbc1bd463e053ea0f9116473551be6d1b2f35b6d3670a716ecb86a141bd — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Recurrent and Transient States.md
---

**Recurrent and Transient States** are the two kinds of state of a [[Markov Chain]], distinguished by whether a chain that starts in the state is certain to return to it. The probability that a chain starting in state $i$ ever re-enters state $i$ is

> $$f_i = P(X_n = i \text{ for some } n \ge 1 \mid X_0 = i)$$

- $X_n$ is the state of the chain at time $n$.

State $i$ is recurrent if $f_i = 1$ and transient if $f_i < 1$. A recurrent state is visited infinitely often, and a transient state only finitely often. Equivalently, state $i$ is recurrent exactly when

> $$\sum_{n=1}^{\infty} P_{ii}^{n} = \infty$$

- $P_{ii}^{n}$ is the probability that a chain in state $i$ is in state $i$ again $n$ steps later.

> [!example]- Each month a claim is Open (O), under Investigation (I) or Closed (C). From O it stays O with probability 0.5, moves to I with probability 0.2 and closes with probability 0.3. From I it moves to O with probability 0.4, stays I with probability 0.4 and closes with probability 0.2. A closed claim stays closed. What is $f_O$, and is O recurrent? {Example}
> - From O the claim re-enters O at once with probability 0.5.
> - With probability 0.2 it moves to I. From I it eventually leaves for O or C, and it goes to O with probability $\frac{0.4}{0.4 + 0.2} = \frac23$.
> - The probability of ever re-entering O is $f_O = 0.5 + 0.2 \times \frac23$, which is $\frac{19}{30} = 0.633$.
> - Because $f_O < 1$, state O is transient.

## Communicating states and classes

State $j$ is accessible from state $i$ if $P_{ij}^{n} > 0$ for some $n \ge 0$. States $i$ and $j$ communicate when each is accessible from the other, that is, when

> $$P_{ij}^{n} > 0 \text{ and } P_{ji}^{m} > 0$$

- $n \ge 0$ and $m \ge 0$ are some numbers of steps.
- $P_{ii}^{0} = 1$, so every state communicates with itself.

Communication divides the states into classes, each a set of states that all communicate with one another. A state that the chain cannot re-enter after leaving it is a class by itself. The chain is irreducible if it has only one class.

To find the classes, read the one-step moves off the positive entries of the [[Transition Probability Matrix|transition probability matrix]], trace the paths of several steps, and group the states that can reach each other.

> [!example]- A Markov chain on states 1 to 5 has the transition probability matrix below. What are its classes? {Example}
> $$\mathbf{P} = \begin{bmatrix} 0.5 & 0.5 & 0 & 0 & 0 \\ 0.2 & 0.8 & 0 & 0 & 0 \\ 0.3 & 0 & 0.4 & 0.3 & 0 \\ 0 & 0 & 0.6 & 0.4 & 0 \\ 0 & 0 & 0 & 0.5 & 0.5 \end{bmatrix}$$
>
> - The positive entries give the one-step moves $1 \to \{1, 2\}$, $2 \to \{1, 2\}$, $3 \to \{1, 3, 4\}$, $4 \to \{3, 4\}$ and $5 \to \{4, 5\}$.
> - States 1 and 2 reach each other, and neither reaches any other state, so $\{1, 2\}$ is a class.
> - States 3 and 4 reach each other, so $\{3, 4\}$ is a class.
> - State 5 reaches 4, but no other state reaches 5, so $\{5\}$ is a class by itself.
> - The chain has three classes, $\{1, 2\}$, $\{3, 4\}$ and $\{5\}$.

## Recurrent and transient classes

Recurrence and transience are class properties: every state of a class is recurrent, or every state is transient. In a chain with finitely many states:

1. A class is closed when no state outside it is accessible from it, so the transition probabilities out of the class are zero.
2. A closed class is recurrent.
3. A class that the chain can leave and never return to is transient.
4. An absorbing state, with $P_{ii} = 1$, is a closed class by itself and is recurrent.
5. At least one class is recurrent, so an irreducible chain with finitely many states is recurrent.

> [!example]- In the five-state chain above, which classes are recurrent and which are transient? {Example}
> - No state outside $\{1, 2\}$ is accessible from 1 or 2, so $\{1, 2\}$ is closed and recurrent.
> - State 3 moves to state 1 with probability 0.3 and can never return, so $\{3, 4\}$ is transient.
> - State 5 moves to state 4 with probability 0.5 and can never return, so $\{5\}$ is transient.
> - States 1 and 2 are recurrent, and states 3, 4 and 5 are transient.

## Expected number of periods in a transient state

Each return to state $i$ starts the chain afresh, so the number of periods a chain starting in state $i$ spends in $i$, counting the starting period, has a [[Geometric Distribution|geometric distribution]]. For a transient state its expected value is

> $$\frac{1}{1 - f_i}$$

The expected time in every transient state, from every transient starting state, is the [[Mean Time Spent in Transient States|mean time spent in transient states]].

> [!example]- For the claim that is Open now, with $f_O = \frac{19}{30}$, what is the expected number of months it spends Open, counting this one? {Example}
> - The expected number of months Open is $\frac{1}{1 - 19/30} = \frac{30}{11}$.
> - The claim spends 2.73 months Open on average.

## The period of a state

State $i$ has period $d$ if the chain can return to $i$ only at multiples of $d$ steps. The period is

> $$d = \gcd\{n \ge 1 : P_{ii}^{n} > 0\}$$

- $\gcd$ is the greatest common divisor.

A state with period 1 is aperiodic, and a state with period $d > 1$ is periodic. Every state of a class has the same period. A state with $P_{ii} > 0$ can return in one step, so it has period 1, and an irreducible chain with such a state is aperiodic.

A recurrent state is positive recurrent if the expected time to return to it is finite. In a chain with finitely many states every recurrent state is positive recurrent. A positive recurrent, aperiodic state is called ergodic, and an irreducible chain of ergodic states has a [[Stationary Distribution|stationary distribution]] that is also its limiting distribution.

> [!example]- A Markov chain on states 1 to 4 moves $1 \to 2$ with probability 0.6 and $1 \to 3$ with probability 0.4, $2 \to 1$ and $2 \to 4$ with probability 0.5 each, $3 \to 4$ with probability 1, and $4 \to 1$ with probability 1. What is the period of state 1? {Example}
> - Every diagonal entry is 0, so no state can return in one step.
> - State 1 can return in 2 steps, along $1 \to 2 \to 1$.
> - State 1 can return in 3 steps, along $1 \to 3 \to 4 \to 1$.
> - The period is $\gcd\{2, 3, \ldots\} = 1$, so state 1 is aperiodic.

> [!trap] Reading a zero diagonal as periodic
> A state with $P_{ii} = 0$ is not necessarily periodic. In the last example every diagonal entry is 0, but state 1 returns in both 2 and 3 steps, so its period is 1.
