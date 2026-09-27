---
Title: "Poisson processes (and mixture distributions)"
Authors: "James W. Daniel"
Publisher: "Casualty Actuarial Society"
Year: "2008"
date: "2008"
Type: "Study Note"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2f52375d6b91b0578d2618d78df3500b0475fcb0081fc864e8745b1c950c691f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Poisson Processes and Mixture Distributions (Daniel - 2008).md
---
![[Poisson Processes and Mixture Distributions (Daniel - 2008) - Cover.svg]]

A CAS study note on Poisson processes and mixture distributions that explains the ideas and states the key facts rather than deriving the theory. Written by James W. Daniel of Austin Actuarial Seminars and dated June 26, 2008, it covers the Poisson-process material then needed for Exams MLC/3L of the SoA and CAS; in place of problems of its own, each section ends with a list of practice problems from the SoA Exam MLC/M/3 and CAS Exam 3 archives.

> [!info] On the syllabus
> - [[Exam MAS-I (CAS)|Exam MAS-I]] — objectives A1–A5; the whole note (an online publication), with the practice problems its Foreword lists available on the CAS website.

## Foreword
- The note covers the material on Poisson processes needed for Exams MLC/3L of the SoA and CAS, concentrating on explaining the ideas and stating the important facts rather than deriving the theory.
- To save space it lists practice problems to download from the SoA and CAS websites rather than containing problems.

## 1 Poisson processes
- 1.1 What's a Poisson process?
    - A [[Poisson Process|Poisson process]] $N$ with rate (intensity) function $\lambda$ is a [[Counting Process|counting process]] with independent increments over non-overlapping intervals (touching at an endpoint is OK), and each increment $N(t+h) - N(t)$ is a Poisson random variable with mean $\int_t^{t+h} \lambda(z)\,dz$.
    - The mean-value function $m(t) = \int_0^t \lambda(z)\,dz$ — the operational time — gives $E[N(t)] = m(t)$; a constant $\lambda$ makes the process homogeneous, and a rate that varies makes it a [[Nonhomogeneous Poisson Process|non-homogeneous]] one.
    - The time $T(x)$ from time $x$ to the next event has $\Pr[T(x) > t] = e^{-\int_x^{x+t} \lambda(z)\,dz}$, the survival-model formula with $\lambda$ in place of the force of mortality $\mu$.
    - 1.1.1 Some important time intervals
        - $T_n$ is the time of the $n$th event and $V_j = T_j - T_{j-1}$ the $j$th interevent time; a probability about $T_n$ is best translated into one about $N(t)$ — $T_3 > 1.2$ exactly when $N(1.2) \le 2$.
- 1.2 Compound Poisson processes
    - A [[Compound Poisson Process|compound Poisson process]] is $S(t) = \sum_{j=1}^{N(t)} X_j$, with $N$ a Poisson process and the severities $X_j$ identically distributed and independent of $N(t)$ and of each other.
    - $E[S(t)] = E[N(t)]\,E[X]$ and $\text{Var}[S(t)] = E[N(t)]\,\text{Var}[X] + \text{Var}[N(t)]\,E[X]^2 = E[N(t)]\,E[X^2]$; when $E[N(t)]$ is large, $S(t)$ is approximated by a Normal random variable with that mean and variance.
- 1.3 Creating new processes from existing ones
    - 1.3.1 Counting special types of events
        - [[Poisson Thinning|Thinning]]: if an event at time $t$ is of Type $j$ with probability $\pi_j(t)$, the events of each type form independent Poisson processes with rates $\pi_j(t)\,\lambda(t)$.
    - 1.3.2 Sums of Poisson processes
        - [[Poisson Superposition|The sum]] of independent Poisson processes with rates $\lambda_1$ and $\lambda_2$ is a Poisson process with rate $\lambda_1(t) + \lambda_2(t)$.
    - 1.3.3 Mixture distributions
        - The Mixing Method: a quantity that is linear in the mixture's probability or density function — a probability, the mean, the second moment, but not the variance — is computed as if the case were known, then averaged as the case varies.
        - A Poisson random variable whose mean is [[Gamma|gamma]] with parameters $\alpha$ and $\theta$ is a [[Negative Binomial Distribution|negative binomial]] with $r = \alpha$ and $\beta = \theta$.
        - A [[Mixed Poisson Process|mixture of Poisson processes]] arises when an insurer models each insured's claims as a homogeneous Poisson process but treats the rate $\lambda$ as varying randomly among insureds.
- 1.4 Homogeneous Poisson processes
    - 1.4.1 Fundamentals
        - With a constant rate each increment $N(t+h) - N(t)$ is Poisson with mean $\lambda h$, depending only on the interval's length: homogeneous Poisson processes have stationary increments.
        - The [[Interarrival Time|interevent times]] $V_j$ are independent [[Exponential Distribution|exponential]] random variables with mean $1/\lambda$, and $T_n$ is gamma with $\alpha = n$ and $\theta = 1/\lambda$; conversely, a counting process with independent exponential interevent times of mean $\theta$ is a homogeneous Poisson process with rate $1/\theta$.
    - 1.4.2 Sums of compound Poisson processes
        - Merging two independent compound Poisson processes gives one with rate $\lambda_1 + \lambda_2$ whose severity is a mixture of $X_1$ and $X_2$ with probabilities $\lambda_1/(\lambda_1+\lambda_2)$ and $\lambda_2/(\lambda_1+\lambda_2)$.
    - 1.4.3 Counting special types of events in a homogeneous process
        - Thinning a homogeneous process gives a homogeneous or a non-homogeneous process according to whether $\pi_j(t)$ is constant — one way non-homogeneous processes arise in practice, as with claims whose repair cost exceeds \$1,000 under inflation.

## Related readings
- [[Introduction to Probability Models (Ross - 2019)]] — assigned with it for Domain A (Probability Models) of the MAS-I outline
- [[Life Contingencies (Struppeck - 2014)]] — assigned with it for Domain A of the MAS-I outline

## Sources
- [Poisson processes (and mixture distributions) (CAS, 2008)](https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf) — the document, read in full: title page, Foreword and Chapter 1 with its sections
- [CAS Exam MAS-I Content Outline (2025)](https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf) — the citation (CAS Study Note, June 2008), the note on the practice problems, the links to the CAS copies and the assignment
- [Practice problems for the Daniel note (CAS)](https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_2.pdf) — the scanned problem set the content outline links beside the note (first page read: Exam 3, Spring 2007, question 1)
