---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:eeec824fc1d09d64e579310bad7c00e19c078a2d304a56e7625b730bcf6a672f
  sources:
    - "Jensen & Bard, Operations Research Models and Methods (Univ. of Texas at Austin ORMM supplement), Ch. 26 'Reliability' (5/28/02): structure function and R = P{phi(X)=1} = E[phi(X)] with independent components PDF p.2; series and parallel structure functions and reliabilities eqs (2)-(5) PDF pp.3-4; k-out-of-n eq. (6) and binomial reliability eq. (7), 2-of-3 with p = 0.9 -> 0.972 PDF pp.4-5; minimal paths/cuts and structure functions from them eqs (9)-(11) PDF pp.8-9; bounds R_U = 1 - prod_j(1 - prod_{i in P_j} p_i), R_L = prod_j(1 - prod_{i in C_j} q_i), Example 4 (2-of-3 minimal paths and cuts are the three pairs) and 'lower bound better when reliabilities are high' PDF pp.15-16, sha256:4dc0c5592ed88249e31a90b2dedc12b9bfc355cba4262dc36ee757daa4d67a3d - https://utw11041.utweb.utexas.edu/ORMM/supplements/units/reliability/reliability.pdf"
    - "Rausand, System Reliability Theory (Wiley 2004) course slides, NTNU RAMS Group, Ch. 3 'Structure Analysis': k-out-of-n structure, noon = series, 1oon = parallel PDF pp.8-9; minimal path and cut sets of the bridge {1,4},{2,5},{1,3,5},{2,3,4} / {1,2},{4,5},{1,3,5},{2,3,4} PDF pp.14-17; pivotal decomposition phi(x) = x_i phi(1_i,x) + (1-x_i) phi(0_i,x) PDF p.25, sha256:e7e0e27e5ba2e4647b0280b7650cc6f8ce06f5a1cad591bc036ce9a818adc624 - https://www.ntnu.edu/documents/624876/1277590549/chapt03-structure.pdf/ce525e3b-3f22-43c8-9ed3-d1dcba174742"
    - "Rausand, System Reliability Theory course slides, NTNU, Ch. 4 'System of Independent Components': koon reliability as a binomial tail PDF p.12; 2oo3 of identical exponential components R_S(t) = 3e^{-2 lambda t} - 2e^{-3 lambda t}, MTTF = integral of R_S = 5/(6 lambda), 'less than the MTTF of a single component' PDF p.29, sha256:5acd59f70a27bd39e8c7514208db1e8ef55f6e640350d023b2278a13385227c6 - https://www.ntnu.edu/documents/624876/1277590549/chapt04-1.pdf"
    - "Struppeck, 'Life Contingencies', CAS Study Note (Oct 2014, rev. Sept 2015) - MAS-I syllabus reading: joint-life annuity pays until the first death, last-survivor until both have died, PDF p.11, sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 - https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06): Ross, Introduction to Probability Models, Sections 9.1-9.6 assigned to Domain A, PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed - https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Huseby & Dahl, STK3405 Lecture 8 (Univ. of Oslo, autumn 2021), Ch.5 importance: slide 3 (importance identifies components to improve to increase system reliability), slide 12 (Birnbaum reliability importance = P(component i critical) = P(phi(1_i,X) - phi(0_i,X) = 1)), slide 13 (= h(1_i,p) - h(0_i,p) for independent components), slide 14 (partial derivative formula I = dh/dp_i, proof by pivotal decomposition h(p) = p_i h(1_i,p) + (1-p_i) h(0_i,p)), slides 21-22 (series: worst component most important; parallel: best), PDF sha256:f7372935a3a3dc0a45c77a2a2cf77e6afada5f5c66c7499e682d0e0b6a57fb38 — https://www.uio.no/studier/emner/matnat/math/STK3405/h21/forelesningsnotater/lecture-8.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/System Reliability.md
---

**System Reliability** is the probability that a system of components functions, when whether the system functions is determined by which of its components function. For a system of $n$ components, let $x_i = 1$ if component $i$ functions and $x_i = 0$ if it fails. The structure function of the system is

> $$\phi(\mathbf{x}) = \begin{cases} 1 & \text{if the system functions} \\ 0 & \text{if the system fails} \end{cases}$$

- $\mathbf{x} = (x_1, \ldots, x_n)$ is the state vector of the components.

If component $i$ functions with probability $p_i$, independently of the other components, the reliability of the system is

> $$r(\mathbf{p}) = P(\phi(\mathbf{X}) = 1)$$

- $\mathbf{X} = (X_1, \ldots, X_n)$ is the random state vector, with $P(X_i = 1) = p_i$.
- $\mathbf{p} = (p_1, \ldots, p_n)$ is the vector of component reliabilities.

As a function of $\mathbf{p}$, $r$ is called the reliability function. Because $\phi(\mathbf{X})$ takes only the values 0 and 1, $r(\mathbf{p}) = E[\phi(\mathbf{X})]$.

## Series systems

A series system functions only if all its components function, so $\phi(\mathbf{x}) = x_1 x_2 \cdots x_n$. Its reliability is the product of the component reliabilities:

> $$r(\mathbf{p}) = \prod_{i=1}^{n} p_i$$

A series system fails when its first component fails, so its lifetime is the [[Order Statistics#The maximum and the minimum|minimum]] of the component lifetimes.

## Parallel systems

A parallel system functions if at least one of its components functions, so it fails only when every component fails. Its reliability is

> $$r(\mathbf{p}) = 1 - \prod_{i=1}^{n} (1 - p_i)$$

With $n$ identical components of reliability $p$, the reliability is $1 - (1 - p)^n$. A parallel system fails when its last component fails, so its lifetime is the [[Order Statistics#The maximum and the minimum|maximum]] of the component lifetimes.

A system built of series and parallel blocks is reduced one block at a time. Each block is replaced by a single component with the block's reliability, and the blocks are then combined in series or in parallel.

> [!example]- Components 1 and 2 are in parallel, and that block is in series with component 3. Each component functions with probability 0.9, independently. What is the reliability of the system? {Example}
> - The parallel block functions with probability $1 - (0.1)(0.1) = 0.99$.
> - The block is in series with component 3, so the system functions with probability $0.99 \times 0.9 = 0.891$.

## $k$-out-of-$n$ systems

A $k$-out-of-$n$ system functions when at least $k$ of its $n$ components function. With identical components of reliability $p$, the number that function has a [[Binomial Distribution|binomial distribution]], and the reliability is

> $$r(p) = \sum_{i=k}^{n} \binom{n}{i} p^i (1 - p)^{n-i}$$

A series system is an $n$-out-of-$n$ system, and a parallel system is a 1-out-of-$n$ system.

> [!example]- A claims platform runs on three servers and stays up while at least two of them are running. Each server is running with probability 0.9, independently. What is the reliability of the platform? {Example}
> - The platform is a 2-out-of-3 system, so it is up when 2 or 3 servers are running.
> - The probability is
>
> $$
> \begin{aligned}
> r(0.9) &= \binom{3}{2}(0.9)^2(0.1) + \binom{3}{3}(0.9)^3 \\
> &= 0.243 + 0.729 \\
> &= 0.972
> \end{aligned}
> $$

## Minimal path sets and minimal cut sets

A path set is a set of components whose functioning ensures that the system functions. A minimal path set is a path set that contains no smaller path set. A cut set is a set of components whose failure ensures that the system fails, and a minimal cut set is a cut set that contains no smaller cut set. A set that strictly contains a path set or a cut set is therefore not minimal.

The system functions exactly when all the components of at least one minimal path set function. With minimal path sets $A_1, \ldots, A_s$, the structure function is

> $$\phi(\mathbf{x}) = \max_{j} \prod_{i \in A_j} x_i$$

The system fails exactly when all the components of at least one minimal cut set fail. With minimal cut sets $C_1, \ldots, C_t$, the structure function is

> $$\phi(\mathbf{x}) = \prod_{j} \max_{i \in C_j} x_i$$

The probability that the system fails is therefore the probability of the union of the events that each minimal cut set fails, and [[Inclusion-Exclusion Principle#Bounds on the probability of a union|inclusion and exclusion]] gives it, or bounds it. With independent components, all the components of a cut set fail with probability $\prod_{i \in C_j} (1 - p_i)$.

In a $k$-out-of-$n$ system, the minimal path sets are the $\binom{n}{k}$ sets of exactly $k$ components, and the minimal cut sets are the $\binom{n}{n-k+1}$ sets of exactly $n - k + 1$ components.

In the bridge system, components 1 and 2 leave the input, component 5 joins component 1 to the output, component 4 joins component 2 to the output, and component 3 links the two middle points. Its minimal path sets are $\{1, 5\}$, $\{2, 4\}$, $\{1, 3, 4\}$ and $\{2, 3, 5\}$, and its minimal cut sets are $\{1, 2\}$, $\{4, 5\}$, $\{1, 3, 4\}$ and $\{2, 3, 5\}$.

> [!example]- In the bridge system, each component functions with probability 0.9, independently. What is the reliability of the system? {Example}
> - Condition on component 3. If it functions, the system is the parallel block of 1 and 2 in series with the parallel block of 4 and 5, which functions with probability $(1 - 0.1^2)^2 = 0.9801$.
> - If component 3 fails, the system is the series pair $\{1, 5\}$ in parallel with the series pair $\{2, 4\}$, which functions with probability $1 - (1 - 0.81)^2 = 0.9639$.
> - The reliability is
>
> $$
> \begin{aligned}
> r &= 0.9(0.9801) + 0.1(0.9639) \\
> &= 0.97848
> \end{aligned}
> $$

## System lifetime

If component $i$ has lifetime distribution $F_i$, it functions at time $t$ with probability $\bar{F}_i(t) = 1 - F_i(t)$. With independent components, the probability that the system is still functioning at time $t$ is the reliability function evaluated at these probabilities:

> $$P(L > t) = r(\bar{F}_1(t), \ldots, \bar{F}_n(t))$$

- $L$ is the lifetime of the system.

For a series system this is the product of the component survival probabilities, $\bar{F}_1(t) \cdots \bar{F}_n(t)$.

The expected lifetime of the system is the integral of this probability, as for [[Expected Value#The expected value from the survival function|any nonnegative random variable]]:

> $$E[L] = \int_0^\infty P(L > t)\, dt$$

> [!example]- In the 2-out-of-3 claims platform, each server has an exponential lifetime with mean 10 years. What is the expected lifetime of the platform? {Example}
> - Each server is running at time $t$ with probability $p = e^{-t/10}$.
> - The platform is running at time $t$ with probability $3p^2(1 - p) + p^3$, which is $3p^2 - 2p^3$.
> - The expected lifetime is
>
> $$
> \begin{aligned}
> E[L] &= \int_0^\infty \left(3e^{-2t/10} - 2e^{-3t/10}\right) dt \\
> &= 3(5) - 2\left(\tfrac{10}{3}\right) \\
> &= 8.33
> \end{aligned}
> $$
>
> - The platform lasts 8.33 years on average.

> [!trap] Counting exactly $k$ components in a $k$-out-of-$n$ system
> A $k$-out-of-$n$ system functions when *at least* $k$ components function. For the 2-out-of-3 platform, the probability that exactly two servers run is 0.243, but the reliability adds the 0.729 probability that all three run, for 0.972.
