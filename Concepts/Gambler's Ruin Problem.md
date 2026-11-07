---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:6011d0105ea6d92e01bb880f4bbc9955ea86b9419fdc724c6cb49d34f5666f5a
  sources:
    - "Ross, Introduction to Probability Models, Ch 4 'Markov Chains' (an earlier edition than the 12th ed. the 2026 MAS-I outline assigns; course-hosted copy on the NTNU TMA4265 page, printed pp.185-280, PDF p.n = printed p.184+n), §4.5.1 The Gambler's Ruin Problem pp.217-219 (PDF pp.33-35): chain with P00 = PNN = 1, three classes {0}, {1..N-1}, {N}, P_i = pP_{i+1} + qP_{i-1}, P_{i+1} - P_i = (q/p)(P_i - P_{i-1}), Eq. (4.14) P_i = (1-(q/p)^i)/(1-(q/p)^N) for p != 1/2 and i/N for p = 1/2, N -> infinity limit 1-(q/p)^i if p > 1/2 and 0 if p <= 1/2, Example 4.24 two players (i = 5, N = 15, p = 0.6); §4.6 Examples 4.26-4.27 pp.231-232, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Siegrist, Random (randomservices.org), Ch 12 §10 'Timid Play': f(x) = ((q/p)^x - 1)/((q/p)^a - 1) for p != 1/2 and x/a for p = 1/2; expected number of trials g(x) = x/(q-p) - (a/(q-p)) f(x) for p != 1/2 and x(a-x) for p = 1/2, sha256:e0ac4e5bbd2287e7322092c87063ddb9afdea4bbeacf83ab9597df579d86459b — https://www.randomservices.org/random/games/Timid.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., CHANCE Project GNU FDL version dated 4 July 2006), §11.2 Absorbing Markov Chains, Theorem 11.5 (t = Nc, row sums of the fundamental matrix give time to absorption) p.419 (PDF p.427), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "CAS Exam MAS-I Fall 2019, Q10 — official exam paper (scan), PDF p.14; Final Answer Key PDF p.50 (Q10 = A), sha256:32e26dbc1bd463e053ea0f9116473551be6d1b2f35b6d3670a716ecb86a141bd — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf"
    - "CAS Exam MAS-I Fall 2018, Q10 — official exam paper (scan), PDF p.14; Final Answer Key PDF p.50 (Q10 = B), sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf"
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Gambler's Ruin Problem.md"
---

The **Gambler's Ruin Problem** is the problem of finding the probability that a gambler reaches a target fortune before losing everything. On each independent play the gambler wins one unit with probability $p$ and loses one unit with probability $q = 1 - p$, and play stops when the fortune reaches $0$ or $N$. The fortune is a [[Random Walk|random walk]] and a [[Markov Chain]] whose states $0$ and $N$ are [[Transition Probability Matrix#Absorbing states|absorbing]].

If $p \ne \frac12$, the probability that a gambler starting with $i$ units reaches $N$ before $0$ is

> $$P_i = \frac{1 - (q/p)^i}{1 - (q/p)^N}$$

- $0 \le i \le N$.

The fortune reaches $0$ or $N$ with probability 1, because the states $1, \ldots, N-1$ are [[Recurrent and Transient States|transient]]. The gambler is ruined when the fortune reaches $0$ first, so the probability of ruin is $1 - P_i$.

> [!example]- A gambler wins each play with probability 0.6. Starting with 2 units, what is the probability that he reaches 5 units before going broke? {Example}
> - Here $p = 0.6$, $q = 0.4$, $q/p = \frac23$, $i = 2$ and $N = 5$.
> - The probability of reaching 5 first is
>
> $$
> \begin{aligned}
> P_2 &= \frac{1 - (2/3)^2}{1 - (2/3)^5} \\
> &= \frac{0.5556}{0.8683} \\
> &= 0.6398
> \end{aligned}
> $$

## The fair game

If $p = \frac12$, the probability that a gambler starting with $i$ units reaches $N$ before $0$ is

> $$P_i = \frac{i}{N}$$

The probability of ruin in a fair game is $1 - P_i = \frac{N - i}{N}$.

Plays already made affect the probability only through the current fortune, because the fortune is a Markov chain. After some plays, the current fortune is the starting fortune plus the number of wins minus the number of losses, and it takes the place of $i$.

> [!example]- A gambler wins one chip on each head and loses one chip on each tail of a fair coin. He starts with 10 chips and stops when he has 0 or 30. Of the first 6 flips, 4 are heads and 2 are tails. What is the probability that he loses all his chips? {Example}
> - After 6 flips his fortune is $10 + 4 - 2 = 12$ chips, and play restarts from there.
> - The coin is fair, so the probability of reaching 30 first is $\frac{12}{30}$.
> - The probability that he loses all his chips is $1 - \frac{12}{30} = \frac{18}{30} = 0.6$.

## Two players

When two players start with $a$ and $b$ units and play until one has none, each round moves one unit from the loser to the winner. One player has no units exactly when the other holds all $a + b$ units. Following the first player's fortune, the probability that the first player ends with all the units is $P_i$ with

> $$i = a, \qquad N = a + b$$

- $p$ is the probability that the first player wins a round.

> [!example]- Ann starts with 4 coins and Ben with 2. In each independent round the loser pays the winner 1 coin, and Ann wins a round with probability 0.45. They play until one has no coins. What is the probability that Ben ends with no coins? {Example}
> - Ben has no coins exactly when Ann holds all 6, so follow Ann's fortune with $i = 4$, $N = 6$ and $p = 0.45$.
> - Then $q/p = \frac{0.55}{0.45} = \frac{11}{9}$.
> - The probability that Ann reaches 6 is
>
> $$
> \begin{aligned}
> P_4 &= \frac{1 - (11/9)^4}{1 - (11/9)^6} \\
> &= \frac{-1.2315}{-2.3335} \\
> &= 0.5278
> \end{aligned}
> $$

## An opponent with unlimited funds

When the gambler plays until ruin with no target, $N \to \infty$. If $p > \frac12$, the probability of never being ruined is

> $$\lim_{N \to \infty} P_i = 1 - (q/p)^i$$

If $p \le \frac12$, the limit is 0, so a gambler in a fair or unfavourable game against unlimited funds is ruined with probability 1.

> [!example]- An insurer's surplus, in units of 1 million, rises by 1 in a year with probability 0.6 and falls by 1 with probability 0.4, independently from year to year. It starts at 3, and the regulator takes over if it reaches 0. With no upper limit on the surplus, what is the probability that the regulator ever takes over? {Example}
> - Here $p = 0.6 > \frac12$ and $q/p = \frac23$.
> - The probability of ruin is $(q/p)^i = \left(\frac23\right)^3 = 0.2963$.

> [!trap] Reporting $P_i$ as the probability of ruin
> $P_i$ is the probability of reaching $N$ first. The probability of ruin is $1 - P_i$. For the gambler with 12 chips and a target of 30 in a fair game, $P_{12} = 0.4$, and the probability of losing all his chips is 0.6.
