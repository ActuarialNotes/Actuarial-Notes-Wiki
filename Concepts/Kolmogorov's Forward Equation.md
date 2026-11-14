---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0a705c868bfe96cad143a9cfda2551e50ec01c461ad039adeba9c7f2f4708a50
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Kolmogorov's Forward Equation.md"
---

**Kolmogorov's Forward Equation** for a transition probability ${}_tp^{ij}_x$ of a continuous-time [[Multiple State Model|multiple state model]] is the differential equation that gives its rate of change: the rate at which lives move into state $j$ from every other state, less the rate at which they leave $j$. The starting state $i$ is fixed, and there is one equation for each destination $j$.

For a life aged $x$ in state $i$, the forward equation for state $j$ is

> $$\frac{d}{dt}\,{}_tp^{ij}_x = \sum_{k \neq j}\left({}_tp^{ik}_x\,\mu^{kj}_{x+t} - {}_tp^{ij}_x\,\mu^{jk}_{x+t}\right)$$

- $\mu^{kj}_{x+t}$ is the [[Transition Intensity|transition intensity]] from state $k$ to state $j$ at age $x+t$.
- In the sum, the first term is the flow into $j$ from state $k$ and the second is the flow out of $j$ to state $k$.

The boundary conditions at $t = 0$ are

> $${}_0p^{ij}_x = \begin{cases} 1 & i = j \\ 0 & i \neq j \end{cases}$$

The probabilities from state $i$ sum to 1 at every $t$.

> [!example]- How is the forward equation for ${}_tp^{01}_x$ derived in the healthy–sick–dead model with recovery? {Example}
> - A life that starts healthy is sick at time $t+h$ if it was healthy at $t$ and fell sick in $(t, t+h)$, or if it was sick at $t$ and neither recovered nor died.
> - Paths with two or more moves in $(t, t+h)$ have probability $o(h)$.
> - So ${}_{t+h}p^{01}_x = {}_tp^{00}_x\,{}_hp^{01}_{x+t} + {}_tp^{01}_x\,{}_hp^{11}_{x+t} + o(h)$.
> - For small $h$, ${}_hp^{01}_{x+t} = h\,\mu^{01}_{x+t} + o(h)$ and ${}_hp^{11}_{x+t} = 1 - h\,\mu^{10}_{x+t} - h\,\mu^{12}_{x+t} + o(h)$.
> - Subtracting ${}_tp^{01}_x$, dividing by $h$ and letting $h \to 0$ removes the $o(h)/h$ term.
> - The equation is $\frac{d}{dt}{}_tp^{01}_x = {}_tp^{00}_x\,\mu^{01}_{x+t} - {}_tp^{01}_x\left(\mu^{10}_{x+t} + \mu^{12}_{x+t}\right)$, with ${}_0p^{01}_x = 0$.
> - Death is absorbing, so there is no inflow from state 2.

The general equation is derived the same way. Condition on the state at time $t$, as in the [[Chapman-Kolmogorov Equations|Chapman-Kolmogorov equations]], ${}_{t+h}p^{ij}_x = \sum_k {}_tp^{ik}_x\,{}_hp^{kj}_{x+t}$. Then use ${}_hp^{kj}_{x+t} = h\,\mu^{kj}_{x+t} + o(h)$ for $k \neq j$ and ${}_hp^{jj}_{x+t} = 1 - h\sum_{k \neq j}\mu^{jk}_{x+t} + o(h)$.

## Euler's method

In general the forward equations are solved numerically, stepping forward from the boundary conditions. With a step of $h$, Euler's method is

> $${}_{t+h}p^{ij}_x \approx {}_tp^{ij}_x + h\,\frac{d}{dt}\,{}_tp^{ij}_x$$

Forward Euler evaluates the derivative at $t$, with the intensities at age $x+t$, the start of the step.

> [!example]- What are ${}_1p^{00}_{60}$ and ${}_1p^{01}_{60}$ by Euler's method with $h = 0.5$? {Example}
> A healthy life aged 60 is in the healthy (0), sick (1) and dead (2) model with recovery. The intensities are:
>
> | Age | $\mu^{01}$ | $\mu^{10}$ | $\mu^{02} = \mu^{12}$ |
> | :--- | ---: | ---: | ---: |
> | 60 | 0.014204 | 0.001420 | 0.014954 |
> | 60.5 | 0.015191 | 0.001519 | 0.015601 |
>
> > [!answer]-
> > - The equations are $\frac{d}{dt}{}_tp^{00} = {}_tp^{01}\mu^{10} - {}_tp^{00}(\mu^{01} + \mu^{02})$ and $\frac{d}{dt}{}_tp^{01} = {}_tp^{00}\mu^{01} - {}_tp^{01}(\mu^{10} + \mu^{12})$.
> > - Start from ${}_0p^{00} = 1$ and ${}_0p^{01} = 0$. At $t = 0$ the derivatives are $-0.029158$ and $0.014204$.
> > - So ${}_{0.5}p^{00} = 1 + 0.5(-0.029158) = 0.985421$ and ${}_{0.5}p^{01} = 0.5(0.014204) = 0.007102$.
> > - At $t = 0.5$, with the age-60.5 intensities, the derivatives are $0.007102(0.001519) - 0.985421(0.030792) = -0.030332$ and $0.985421(0.015191) - 0.007102(0.017120) = 0.014848$.
> > - So ${}_1p^{00}_{60} = 0.985421 + 0.5(-0.030332) = 0.970255$ and ${}_1p^{01}_{60} = 0.007102 + 0.5(0.014848) = 0.014526$.

## Matrix form

Writing $\mathbf{P}(t)$ for the matrix of ${}_tp^{ij}_x$ and $\mathbf{M}(x+t)$ for the matrix of intensities, the forward equations are

> $$\frac{d}{dt}\mathbf{P}(t) = \mathbf{P}(t)\,\mathbf{M}(x+t)$$

- The diagonal entries of $\mathbf{M}(x+t)$ are $-\sum_{k \neq i}\mu^{ik}_{x+t}$.

In discrete time the [[Transition Probability Matrix|one-step matrices]] are multiplied instead.

## Staying in a state

For the probability ${}_tp^{\overline{ii}}_x$ of staying in state $i$ throughout, only the outflow term remains, and the equation is

> $$\frac{d}{dt}\,{}_tp^{\overline{ii}}_x = -\,{}_tp^{\overline{ii}}_x\sum_{j \neq i}\mu^{ij}_{x+t}$$

It integrates to the exponential formula for ${}_tp^{\overline{ii}}_x$. When a model allows returns, such as recovery from sickness, ${}_tp^{ii}_x$ has no such closed form and the forward equations are solved numerically.

> [!trap] Leaving out a flow
> Each equation needs an inflow from every state that can move to $j$ and an outflow to every state $j$ can move to. Leaving out recovery, for example, makes the sick-state probability too large.
