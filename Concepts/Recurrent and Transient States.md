---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:fddacb618e605446015fd9d5f2a49ca40c8574bb348d28fd5a668f51c065c084
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

**Recurrent and transient states** classify the states of a [[Markov Chain]] by whether the chain is sure to come back. Let $f_i$ be the probability that a chain started in state $i$ ever re-enters $i$: the state is **recurrent** if $f_i = 1$ and **transient** if $f_i < 1$.

> $$f_i = P\big(X_n = i \text{ for some } n \geq 1 \mid X_0 = i\big)$$

> $$i \text{ is recurrent} \iff \sum_{n=1}^{\infty} P^n_{ii} = \infty$$

> $$
> \begin{align*}
> E\big[\text{periods in } i \mid X_0 = i\big] &= \sum_{n=0}^{\infty} P^n_{ii} \\
> &= \frac{1}{1 - f_i}
> \end{align*}
> $$

- **Accessible, communicate, classes.** State $j$ is *accessible* from $i$ if $P^n_{ij} > 0$ for some $n \geq 0$, and $i$ and $j$ *communicate* ($i \leftrightarrow j$) if each is accessible from the other. Communication is an equivalence relation, so it splits the states into **classes**; the chain is **irreducible** if there is only one. Every state communicates with itself ($P^0_{ii} = 1$), so a state that nothing leads back to is a class on its own.
- **Visits are geometric.** Each return starts the chain afresh, so a recurrent state is visited infinitely often. From a transient state the number of periods spent there (counting time 0) is exactly $n$ with probability $f_i^{\,n-1}(1 - f_i)$ — a [[Geometric Distribution]] with mean $1/(1 - f_i)$, finite — so a transient state is visited only finitely often.
- **Class properties.** Recurrence, transience, the period and positive recurrence are shared by every state in a class. A finite chain cannot have all its states transient, so a finite irreducible chain is recurrent. In a finite chain a class is recurrent exactly when it is **closed** (no state outside it is accessible from it); a class the chain can leave for good is transient.
- **Period.** State $i$ has period $d$ if $P^n_{ii} = 0$ whenever $n$ is not a multiple of $d$, and $d$ is the largest integer with that property — equivalently $d = \gcd\{n \geq 1 : P^n_{ii} > 0\}$. A state with period 1 is **aperiodic**; any state with $P_{ii} > 0$ is aperiodic.
- **Positive and null recurrence.** A recurrent state is *positive recurrent* if the expected time to return to it is finite and *null recurrent* if that expectation is infinite. In a finite chain every recurrent state is positive recurrent. Positive recurrent, aperiodic states are called **ergodic** — the setting in which the [[Stationary Distribution]] is also the limit of $P^n_{ij}$. The simple random walk on the integers ($P_{i,i+1} = p = 1 - P_{i,i-1}$) is the standard infinite case: transient if $p \neq \tfrac12$, null recurrent if $p = \tfrac12$.
- The classification organises the rest of Markov-chain theory: the [[Gambler's Ruin Problem]] has two recurrent (absorbing) classes and one transient class, the expected time in each transient state is the [[Mean Time Spent in Transient States]], and in a [[Branching Process]] with $P_0 > 0$ every state but 0 is transient.

> [!example]- Counting the Classes of a Five-State Chain {Example}
> (CAS Exam MAS-I, Spring 2018, Q10.) A Markov chain has transition matrix
> $$P = \begin{bmatrix} 0.7 & 0.3 & 0 & 0 & 0 \\ 0.4 & 0.6 & 0 & 0 & 0 \\ 0.5 & 0.5 & 0 & 0 & 0 \\ 0.4 & 0.2 & 0.1 & 0.3 & 0 \\ 0 & 0 & 0 & 0 & 1 \end{bmatrix}$$
> Find its classes and say which are recurrent and which transient.
>
> > [!answer]-
> > Read the one-step moves off the nonzero entries: $1 \to \{1, 2\}$, $2 \to \{1, 2\}$, $3 \to \{1, 2\}$, $4 \to \{1, 2, 3, 4\}$, $5 \to \{5\}$.
> >
> > - $1 \leftrightarrow 2$, and neither leads anywhere else: $\{1, 2\}$ is a closed class, so it is recurrent.
> > - State 3 leads to 1 and 2, but nothing leads back to it — only state 4 enters 3, and 3 cannot reach 4. So $\{3\}$ is a class by itself, transient, with $f_3 = 0$.
> > - State 4 returns to itself with $P_{44} = 0.3$ and otherwise leaves for good: $\{4\}$ is transient, with $f_4 = 0.3$.
> > - State 5 is absorbing: $\{5\}$ is recurrent.
> >
> > Four classes — $\{1, 2\}$, $\{3\}$, $\{4\}$, $\{5\}$ — the CAS key's answer (D). Two are recurrent and two transient; a single state can be a class even when the chain never returns to it.

> [!example]- Recurrent States and the Period {Example}
> (CAS Exam MAS-I, Fall 2019, Q9, extended.) A Markov chain has transition matrix
> $$P = \begin{bmatrix} 0 & 0.3 & 0.3 & 0.4 & 0 \\ 0.4 & 0 & 0 & 0.6 & 0 \\ 0 & 0 & 0 & 1 & 0 \\ 0.5 & 0.5 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 1 \end{bmatrix}$$
> How many states are recurrent? What is the period of state 1?
>
> > [!answer]-
> > The one-step moves are $1 \to \{2, 3, 4\}$, $2 \to \{1, 4\}$, $3 \to \{4\}$, $4 \to \{1, 2\}$, $5 \to \{5\}$.
> >
> > States 1 and 2 reach each other directly, 1 and 4 likewise, and 3 is reached from 1 and returns through $3 \to 4 \to 1$. So $\{1, 2, 3, 4\}$ is one class. None of its rows puts probability on state 5, so the class is closed, and a finite closed class is recurrent. State 5 is absorbing, hence recurrent too. All **5** states are recurrent — CAS key (E).
> >
> > Every diagonal entry of the first class is 0, yet state 1 is not periodic. It can return in 2 steps ($1 \to 2 \to 1$) and in 3 steps ($1 \to 3 \to 4 \to 1$):
> > $$d = \gcd\{2, 3, \ldots\} = 1$$
> > State 1 — and with it the whole class — is aperiodic. A zero diagonal does not make a state periodic.

> [!example]- How Long Does a Claim Stay Open? {Example}
> Each month a claim is Open ($O$), under Investigation ($I$) or Closed ($C$), with
> $$P = \begin{array}{c|ccc} & O & I & C \\ \hline O & 0.5 & 0.2 & 0.3 \\ I & 0.4 & 0.4 & 0.2 \\ C & 0 & 0 & 1 \end{array}$$
> Classify the states. For a claim that is Open this month, find $f_O$, the probability that it is Open in some later month, and the expected number of months it spends Open, counting this one.
>
> > [!answer]-
> > $C$ is absorbing, so $\{C\}$ is recurrent. $O \leftrightarrow I$, but both lead to $C$, which never leads back: $\{O, I\}$ is transient.
> >
> > From $O$ the chain re-enters $O$ at once (0.5), or moves to $I$ (0.2) and then reaches $O$ before $C$. From $I$ it stays put with probability 0.4, so when it leaves $I$ it goes to $O$ with probability $0.4 / (0.4 + 0.2) = \tfrac23$:
> > $$
> > \begin{align*}
> > f_O &= 0.5 + 0.2 \times \tfrac23 \\
> > &= \tfrac{19}{30} \\
> > &= 0.633
> > \end{align*}
> > $$
> > The months spent Open are geometric, so
> > $$
> > \begin{align*}
> > E[\text{months Open}] &= \frac{1}{1 - 19/30} \\
> > &= \frac{30}{11} \\
> > &= 2.73
> > \end{align*}
> > $$
> > An Open claim spends about 2.7 months Open in total. The same number is the $(O, O)$ entry of $(I - P_T)^{-1}$ — see [[Mean Time Spent in Transient States]].
