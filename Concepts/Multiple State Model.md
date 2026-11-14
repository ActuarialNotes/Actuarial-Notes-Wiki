---
aliases:
  - Markov Multiple
  - Continuous Time Markov
  - Continuous Time Markov Multiple
  - State-Dependent Probability
  - Mortality-morbidity
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:89702f7daf1d0a30b346126d2e27d66dca8930aedad263423b07f14cdf3ff4b8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multiple State Model.md
---

A **Multiple State Model** describes a life that moves in continuous time among a finite set of states, such as healthy, sick and dead, with $Y(x)$ the state occupied at age $x$. Moves are governed by [[Transition Intensity|transition intensities]] $\mu^{ij}_{x}$, and under the Markov assumption the future depends only on the current state and age.

Benefits and premiums attach to being in a state or to moving between states, which makes it the model for [[State-Dependent Insurance|state-dependent insurance]], long-term [[Health Insurance|health insurance]] and [[Joint Life|joint lives]]. The probability that a life aged $x$ in state $i$ is in state $j$ at age $x+t$ is

> $${}_tp^{ij}_x = \Pr\left[Y(x+t) = j \mid Y(x) = i\right]$$

The probability ${}_tp^{\overline{ii}}_x$ that the life stays in state $i$ throughout the $t$ years is

> $${}_tp^{\overline{ii}}_x = \exp\left(-\int_0^t \sum_{j \neq i} \mu^{ij}_{x+s}\,ds\right)$$

In general ${}_tp^{ij}_x$ includes every path that ends in $j$, such as healthy, sick, healthy, so it seldom has a simple closed form. It is found from [[Kolmogorov's Forward Equation|Kolmogorov's forward equations]], usually numerically. The discrete-time version of the same model is the [[Multi-State Model|multi-state model]] built from a [[Transition Probability Matrix|transition probability matrix]] and the [[Chapman-Kolmogorov Equations|Chapman-Kolmogorov equations]].

## Standard models

The alive–dead model has $\mu^{01}_x = \mu_x$, the force of mortality. The accidental death model has two dead states. The permanent disability model has healthy, disabled and dead states with no recovery, and the disability income model adds recovery. The joint life model has four states for two lives. A [[Continuing Care Retirement Community|CCRC]] model has states for independent living, assisted living, nursing care and death. A [[Multiple Decrement Model|multiple decrement model]] is the special case with one active state and several exits.

## Probabilities when a state cannot be re-entered

When state 1 cannot be left except to an absorbing state, a life starting in state 0 is in state 1 at time $t$ only if it stays in 0 until some time $s$, moves at $s$, and then stays in 1. The probability is

> $${}_tp^{01}_x = \int_0^t {}_sp^{\overline{00}}_x\,\mu^{01}_{x+s}\;{}_{t-s}p^{\overline{11}}_{x+s}\,ds$$

The intensities out of state 1 apply from age $x+s$ onward, after the move.

> [!example]- In this permanent disability model, what are the probabilities that the life is healthy, disabled or dead in 10 years? {Example}
> A healthy life is subject to constant intensities of disablement $\mu^{01} = 0.02$ and death while healthy $\mu^{02} = 0.01$. A disabled life does not recover and dies with intensity $\mu^{12} = 0.07$.
>
> > [!answer]-
> > - A healthy life leaves state 0 at total rate $0.03$, so ${}_{10}p^{00} = {}_{10}p^{\overline{00}} = e^{-0.3} = 0.740818$.
> > - A disabled life stays disabled for $10 - s$ years with probability $e^{-0.07(10-s)}$.
> > - So ${}_{10}p^{01} = \int_0^{10} e^{-0.03s}(0.02)\,e^{-0.07(10-s)}\,ds = 0.5\left(e^{-0.3} - e^{-0.7}\right) = 0.5(0.740818 - 0.496585) = 0.122116$.
> > - The rest are dead: ${}_{10}p^{02} = 1 - 0.740818 - 0.122116 = 0.137066$.
> > - About 12% of lives are disabled at time 10. More than that became disabled during the 10 years, because some disabled lives have since died.

## Joint lives as a multiple state model

Two lives $(x)$ and $(y)$ are modelled with four states: 0 (both alive), 1 (only $x$ alive), 2 (only $y$ alive) and 3 (both dead). This is an alternative to modelling the time to failure of a status, as in [[Joint Life]]. A common shock, an event that kills both lives at once, enters the model as a direct transition from state 0 to state 3.

> [!example]- With a common accident, what are ${}_{10}p^{00}$, ${}_{10}p^{01}$ and the probability that both die in a common accident within 10 years? {Example}
> While both are alive, $y$ dies with intensity $0.03$, $x$ dies with intensity $0.02$, and a common accident kills both at once with intensity $0.005$. After one death, the survivor dies with intensity $0.02$ for $x$ or $0.03$ for $y$.
>
> > [!answer]-
> > - State 0 is left at total rate $0.055$, so ${}_{10}p^{00} = e^{-0.55} = 0.576950$.
> > - State 1 is entered when $y$ dies first and is left at rate $0.02$.
> > - So ${}_{10}p^{01} = \int_0^{10} e^{-0.055s}(0.03)\,e^{-0.02(10-s)}\,ds = 0.03\,e^{-0.2}\left(1 - e^{-0.35}\right)/0.035 = 0.207241$.
> > - The common accident happens from state 0, so its probability is $\int_0^{10} e^{-0.055s}(0.005)\,ds = (0.005/0.055)\left(1 - e^{-0.55}\right) = 0.038459$.
> > - If each life were independent with its own force including the accident, $0.025$ and $0.035$, both would be alive at 10 with probability $e^{-0.6} = 0.548812$. The model gives more, because one accident ends both lives at once and is counted only once.

## Assumptions of the Markov model

The Markov assumption says that the time already spent in a state does not matter. In practice, recovery is most likely early in a sickness and mortality is higher soon after disablement. A model can split a state by duration, at the cost of more states and less data per state. The model also treats every life in a state as having the same intensities, which ignores heterogeneity such as health differences that underwriting did not capture.

> [!trap] Being in a state versus staying in it
> ${}_tp^{00}_x$ includes lives that were sick and recovered, while ${}_tp^{\overline{00}}_x$ does not. The exponential formula gives only the second, so it understates ${}_tp^{00}_x$ in a model with recovery.
