A **Markov Chain** is a [[Stochastic Processes|stochastic process]] $\{X_n\}$ on a discrete state space that has the **Markov property**: the next state depends on the past only through the current state. It is governed by a one-step **transition probability matrix** $P$.

> $$P\big(X_{n+1} = j \mid X_n = i, \ldots, X_0\big) = P\big(X_{n+1} = j \mid X_n = i\big) = P_{ij}$$

- $P_{ij} \geq 0$ is the probability of moving from state $i$ to state $j$ in one step; each row sums to 1
- The $n$-step transition probabilities are the entries of the matrix power $P^n$:

> $$P\big(X_n = j \mid X_0 = i\big) = \big(P^n\big)_{ij}$$

- A **stationary distribution** $\boldsymbol{\pi}$ satisfies $\boldsymbol{\pi}P = \boldsymbol{\pi}$ with $\sum_i \pi_i = 1$; for an irreducible aperiodic chain it is the long-run fraction of time spent in each state
- Common actuarial uses include no-claims-discount (bonus-malus) systems, multi-state disability/mortality models, and credit-rating migration

> [!example]- Two-Year Risk-Class Transition {Example}
> An insured is classed Standard ($S$) or Preferred ($P$) each year, with transition matrix
> $$P = \begin{array}{c|cc} & S & P \\ \hline S & 0.8 & 0.2 \\ P & 0.3 & 0.7 \end{array}$$
> Given the insured is Standard now, find the probability of being Preferred in two years.
>
> > [!answer]-
> > Sum over the intermediate class (the Markov property ignores earlier history):
> > $$
> > \begin{align*}
> > \big(P^2\big)_{SP} &= P_{SS}P_{SP} + P_{SP}P_{PP} \\
> >   &= (0.8)(0.2) + (0.2)(0.7) \\
> >   &= 0.30
> > \end{align*}
> > $$
> > There is a 30% chance the insured is Preferred after two years.

> [!example]- Long-Run Stationary Distribution {Example}
> Using the same matrix, find the long-run proportion of years the insured is Preferred.
>
> > [!answer]-
> > Solve $\boldsymbol{\pi}P = \boldsymbol{\pi}$ with $\pi_S + \pi_P = 1$. The balance equation for state $P$ is:
> > $$
> > \begin{align*}
> > \pi_P &= 0.2\,\pi_S + 0.7\,\pi_P \\
> > 0.3\,\pi_P &= 0.2\,\pi_S \\
> > \pi_P &= \tfrac{2}{3}\,\pi_S
> > \end{align*}
> > $$
> > With $\pi_S + \pi_P = 1$: $\pi_S = 0.6$, $\pi_P = 0.4$. In the long run the insured is Preferred about 40% of the time.
