A **Stochastic Process** $\{X(t) : t \in T\}$ is a collection of [[Random Variable]]s indexed by a parameter $t$ (usually time), describing how a random quantity — such as an insurer's cumulative claim count or surplus — evolves over an index set $T$.

> $$\{X(t) : t \in T\}$$

- $T$ is the **index set**: a *discrete-time* process has $t = 0, 1, 2, \ldots$, while a *continuous-time* process has $t \geq 0$
- The set of values $X(t)$ can take is the **state space**, likewise discrete or continuous
- A **counting process** $N(t)$ records the number of events by time $t$; the [[Poisson Process]] is the central continuous-time example, and a [[Time Series]] is a common discrete-time example
- A process has the **Markov property** when the future depends on the past only through the present state:

> $$P\big(X(t_{n+1}) = j \mid X(t_n), \ldots, X(t_0)\big) = P\big(X(t_{n+1}) = j \mid X(t_n)\big)$$

- For a Poisson counting process the increments are independent and stationary, giving $N(t) - N(s) \sim \text{Poi}(\lambda(t-s))$ for $s < t$

> [!example]- Cumulative Claims as a Counting Process {Example}
> Claims hit a portfolio as a [[Poisson Process]] at rate $\lambda = 4$ per month. Let $N(t)$ be the cumulative number of claims by month $t$. Classify the process and find the expected count and variance over the first half-year.
>
> > [!answer]-
> > $N(t)$ is a **continuous-time** ($t \geq 0$), **discrete-state** ($0, 1, 2, \ldots$) counting process. Over $t = 6$ months:
> > $$N(6) \sim \text{Poi}(4 \times 6) = \text{Poi}(24)$$
> > $$E[N(6)] = \text{Var}(N(6)) = 24$$
> > On average the insurer expects 24 claims in six months.

> [!example]- A Two-State Risk-Class Markov Chain {Example}
> Each year an insured is classed Standard ($S$) or Preferred ($P$). The process is a discrete-time [[Markov Chain]] with one-step transition matrix
> $$\begin{array}{c|cc} & S & P \\ \hline S & 0.8 & 0.2 \\ P & 0.3 & 0.7 \end{array}$$
> An insured is Standard this year. Find the probability they are Preferred two years from now.
>
> > [!answer]-
> > Condition on the class next year (the Markov property lets us ignore earlier history):
> > $$
> > \begin{align*}
> > P(X_2 = P \mid X_0 = S) &= P_{SS}P_{SP} + P_{SP}P_{PP} \\
> >   &= (0.8)(0.2) + (0.2)(0.7) \\
> >   &= 0.16 + 0.14 \\
> >   &= 0.30
> > \end{align*}
> > $$
> > There is a 30% chance the insured is Preferred after two years.
