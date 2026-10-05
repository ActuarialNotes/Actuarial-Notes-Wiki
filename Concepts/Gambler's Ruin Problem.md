---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9252764ee5b80977105bb7cadccebb9206dba009d84b96ef9d20c6c54c5410a4
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Gambler's Ruin Problem.md"
---

The **Gambler's Ruin Problem** asks how likely a gambler is to reach a target before going broke. On each independent play the gambler wins one unit with probability $p$ and loses one with probability $q = 1 - p$; starting with $i$ units and stopping at $0$ or $N$, the fortune is a [[Markov Chain]] with absorbing states $0$ and $N$, and $P_i$ is the probability of reaching $N$ first.

> $$P_i = \begin{cases} \dfrac{1 - (q/p)^i}{1 - (q/p)^N} & p \neq \tfrac12 \\[10pt] \dfrac{i}{N} & p = \tfrac12 \end{cases}$$

- **Where it comes from.** Conditioning on the first play gives $P_i = p\,P_{i+1} + q\,P_{i-1}$ for $0 < i < N$, with $P_0 = 0$ and $P_N = 1$. Rearranged, $P_{i+1} - P_i = (q/p)(P_i - P_{i-1})$: the differences form a geometric sequence with ratio $q/p$, and summing them gives the formula.
- **The game ends.** The chain has three classes — $\{0\}$ and $\{N\}$ recurrent, $\{1, \ldots, N-1\}$ [[Recurrent and Transient States|transient]] — so with probability 1 the fortune reaches $0$ or $N$, and the probability of ruin is $1 - P_i$.
- **An infinitely rich opponent.** Letting $N \to \infty$, $P_i \to 1 - (q/p)^i$ if $p > \tfrac12$ and $P_i \to 0$ if $p \leq \tfrac12$. Against unlimited funds, a gambler in a fair or unfavourable game is ruined with certainty, and a favoured one with probability $(q/p)^i$.
- **Two players.** When two players holding $a$ and $b$ units play until one is broke, follow one player's fortune: $i = a$, $N = a + b$, and $p$ is that player's chance of winning a round. Play already completed matters only through the current fortune.
- **How long play lasts.** The expected number of plays until the fortune hits $0$ or $N$ is $\frac{i}{q-p} - \frac{N}{q-p}\,P_i$ when $p \neq \tfrac12$, and $i(N - i)$ when $p = \tfrac12$. It is also a row sum of $(I - P_T)^{-1}$ — see [[Mean Time Spent in Transient States]].

> [!example]- Two Players Until One Is Broke {Example}
> (CAS Exam MAS-I, Fall 2019, Q10.) Ann and Beatrice each start with 5 coins. In each independent round the loser pays the winner 1 coin, and Beatrice wins a round with probability 0.75. They play until one has no coins. Find the probability that Beatrice ends with no coins.
>
> > [!answer]-
> > Beatrice is broke exactly when Ann holds all 10 coins. Follow Ann: $i = 5$, $N = 10$, $p = 0.25$, $q = 0.75$, so $q/p = 3$.
> > $$
> > \begin{align*}
> > P_5 &= \frac{1 - 3^5}{1 - 3^{10}} \\
> > &= \frac{1 - 243}{1 - 59{,}049} \\
> > &= \frac{242}{59{,}048} \\
> > &= \frac{1}{244} \\
> > &= 0.0041
> > \end{align*}
> > $$
> > Less than 0.01 — the CAS key's answer (A). Following Beatrice instead ($i = 5$, $p = 0.75$, ruin $= 1 - P_5$) gives the same $1/244$.

> [!example]- Ruin After Some Plays Have Happened {Example}
> (CAS Exam MAS-I, Fall 2018, Q10.) A gambler wins 1 chip on heads and loses 1 on tails of a fair coin. He starts with 20 chips and stops when he has 0 or 50. Of the first 10 flips, 7 are heads and 3 are tails. Find the probability that he loses all his chips.
>
> > [!answer]-
> > By the Markov property only the current fortune matters: $20 + 7 - 3 = 24$ chips. The coin is fair, so $P_i = i/N$ and
> > $$
> > \begin{align*}
> > P(\text{ruin}) &= 1 - \frac{24}{50} \\
> > &= \frac{26}{50} \\
> > &= 0.52
> > \end{align*}
> > $$
> > This falls in $[0.5, 0.6)$, the CAS key's answer (B). The order of the 10 flips is irrelevant; only the net gain of 4 chips counts.

> [!example]- An Insurer's Surplus Against a Regulator {Example}
> A small insurer's surplus, in units of \$1 million, rises by 1 in a year with probability 0.6 and falls by 1 with probability 0.4, independently from year to year. It starts at 3, and the regulator takes over if it reaches 0.
>
> (a) With no upper limit, what is the probability the regulator ever takes over?
>
> (b) The owners will sell once surplus reaches 10. Find the probability of selling before a takeover, and the expected number of years until one or the other.
>
> > [!answer]-
> > Here $q/p = 0.4/0.6 = \tfrac23$ and $i = 3$.
> >
> > **(a)** With $p > \tfrac12$ and no cap, ruin has probability
> > $$
> > \begin{align*}
> > (q/p)^i &= \big(\tfrac23\big)^3 \\
> > &= 0.2963
> > \end{align*}
> > $$
> >
> > **(b)** With $N = 10$:
> > $$
> > \begin{align*}
> > P_3 &= \frac{1 - (2/3)^3}{1 - (2/3)^{10}} \\
> > &= \frac{0.70370}{0.98266} \\
> > &= 0.7161
> > \end{align*}
> > $$
> > and, with $q - p = -0.2$, the expected number of years is
> > $$
> > \begin{align*}
> > \frac{i}{q-p} - \frac{N}{q-p}\,P_i &= \frac{3}{-0.2} - \frac{10}{-0.2}(0.7161) \\
> > &= -15 + 35.81 \\
> > &= 20.8
> > \end{align*}
> > $$
> > The probability of a takeover before a sale is $1 - 0.7161 = 0.2839$, a little below the uncapped 0.2963: selling at 10 removes the paths that would have reached 10 and failed later.
