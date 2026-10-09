---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4af278f2e98c5579fb573cd6e75c13e3de2ba171f8213bdeac2dc91470a5e657
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Kolmogorov's Forward Equation.md"
---

**Kolmogorov's Forward Equations** are the system of differential equations satisfied by the transition probabilities ${}_tp^{ij}_x$ of a continuous-time [[Multiple State Model|multiple state model]]. The rate of change of the probability of being in state $j$ is the rate at which lives move into $j$ from every other state, less the rate at which they leave $j$, with each move happening at its [[Transition Intensity|transition intensity]].

> $$\frac{d}{dt}\,{}_tp^{ij}_x = \sum_{k \neq j}\left({}_tp^{ik}_x\,\mu^{kj}_{x+t} - {}_tp^{ij}_x\,\mu^{jk}_{x+t}\right)$$

> $${}_0p^{ij}_x = \begin{cases} 1 & i = j \\ 0 & i \neq j \end{cases}$$

> $${}_{t+h}p^{ij}_x \approx {}_tp^{ij}_x + h\,\frac{d}{dt}\,{}_tp^{ij}_x$$

- **Symbols:** Following Dickson, Hardy & Waters (chapter 8), the starting state $i$ is fixed and there is one equation for each destination $j$. The first term in the sum is the flow into $j$ from state $k$, and the second is the flow out of $j$ to $k$. The second block gives the boundary conditions at $t = 0$, and the third block is Euler's method, which steps the system forward from them.
- **Derivation:** Condition on the state at time $t$, as in the [[Chapman-Kolmogorov Equations|Chapman-Kolmogorov equations]]: ${}_{t+h}p^{ij}_x = \sum_k {}_tp^{ik}_x\,{}_hp^{kj}_{x+t}$. For small $h$, ${}_hp^{kj}_{x+t} = h\,\mu^{kj}_{x+t} + o(h)$ and ${}_hp^{jj}_{x+t} = 1 - h\sum_{k \neq j}\mu^{jk}_{x+t} + o(h)$. Subtracting ${}_tp^{ij}_x$, dividing by $h$ and letting $h \to 0$ gives the first block.
- **Matrix form:** Writing $\mathbf{P}(t)$ for the matrix of ${}_tp^{ij}_x$ and $\mathbf{M}(x+t)$ for the matrix of intensities, with diagonal entries $-\sum_{k \neq i}\mu^{ik}$, the equations are $\frac{d}{dt}\mathbf{P}(t) = \mathbf{P}(t)\,\mathbf{M}(x+t)$. In discrete time the [[Transition Probability Matrix|one-step matrices]] are multiplied instead, while in continuous time the system has to be solved.
- **Staying in a state:** For ${}_tp^{\overline{ii}}_x$, only the outflow term remains, $\frac{d}{dt}{}_tp^{\overline{ii}}_x = -{}_tp^{\overline{ii}}_x\sum_{j \neq i}\mu^{ij}_{x+t}$, which integrates to the exponential formula. When a model allows returns, such as recovery from sickness, ${}_tp^{ii}_x$ has no such closed form and the forward equations are solved numerically.

> [!example]- Euler's Method in the Disability Income Model {Example}
> A healthy life aged 60 is in the healthy (0), sick (1) and dead (2) model with recovery. The intensities are $\mu^{01}_{60} = 0.014204$, $\mu^{10}_{60} = 0.001420$ and $\mu^{02}_{60} = \mu^{12}_{60} = 0.014954$ at age 60, and $\mu^{01}_{60.5} = 0.015191$, $\mu^{10}_{60.5} = 0.001519$ and $\mu^{02}_{60.5} = \mu^{12}_{60.5} = 0.015601$ at age 60.5. Write the forward equations for ${}_tp^{00}_{60}$ and ${}_tp^{01}_{60}$, then estimate both at $t = 1$ by Euler's method with $h = 0.5$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \tfrac{d}{dt}{}_tp^{00}_{60} &= {}_tp^{01}_{60}\,\mu^{10}_{60+t} - {}_tp^{00}_{60}\left(\mu^{01}_{60+t} + \mu^{02}_{60+t}\right) \\
> > \tfrac{d}{dt}{}_tp^{01}_{60} &= {}_tp^{00}_{60}\,\mu^{01}_{60+t} - {}_tp^{01}_{60}\left(\mu^{10}_{60+t} + \mu^{12}_{60+t}\right)
> > \end{align*}
> > $$
> > Start from ${}_0p^{00} = 1$ and ${}_0p^{01} = 0$, using the intensities at the start of each step.
> > $$
> > \begin{align*}
> > {}_{0.5}p^{00} &= 1 + 0.5(-0.029158) \\
> > &= 0.985421 \\
> > {}_{0.5}p^{01} &= 0 + 0.5(0.014204) \\
> > &= 0.007102 \\
> > {}_{1}p^{00} &= 0.985421 + 0.5(-0.030332) \\
> > &= 0.970255 \\
> > {}_{1}p^{01} &= 0.007102 + 0.5(0.014848) \\
> > &= 0.014526
> > \end{align*}
> > $$
> > At the second step, $-0.030332 = 0.007102(0.001519) - 0.985421(0.030792)$ and $0.014848 = 0.985421(0.015191) - 0.007102(0.017120)$. A fine-step solution gives $0.969673$ and $0.014843$. Euler's method overstates ${}_1p^{00}$ because it uses the lower intensities from the start of each step while they rise with age.

> [!example]- Deriving the Equation for the Sick State {Example}
> In the healthy–sick–dead model with recovery, derive the forward equation for ${}_tp^{01}_x$ from first principles.
>
> > [!answer]-
> > A life that starts healthy is sick at time $t+h$ if it was healthy at $t$ and fell sick in $(t, t+h)$, or if it was sick at $t$ and neither recovered nor died. Paths with two or more moves in $(t, t+h)$ have probability $o(h)$.
> > $$
> > \begin{align*}
> > {}_{t+h}p^{01}_x &= {}_tp^{00}_x\,{}_hp^{01}_{x+t} + {}_tp^{01}_x\,{}_hp^{11}_{x+t} \\
> > &= {}_tp^{00}_x\,h\,\mu^{01}_{x+t} \\
> > &\quad + {}_tp^{01}_x\left(1 - h\,\mu^{10}_{x+t} - h\,\mu^{12}_{x+t}\right) + o(h)
> > \end{align*}
> > $$
> > Subtracting ${}_tp^{01}_x$ from both sides, dividing by $h$ and letting $h \to 0$ removes the $o(h)/h$ term.
> > $$
> > \begin{align*}
> > \frac{d}{dt}\,{}_tp^{01}_x &= {}_tp^{00}_x\,\mu^{01}_{x+t} \\
> > &\quad - {}_tp^{01}_x\left(\mu^{10}_{x+t} + \mu^{12}_{x+t}\right)
> > \end{align*}
> > $$
> > The boundary condition is ${}_0p^{01}_x = 0$. Death is absorbing, so there is no inflow from state 2.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to derive Kolmogorov's forward equations for a stated continuous-time Markov model and to apply them, for example by Euler's method with a given step, to reach a transition probability.
> - **Uses of the result:** The probabilities found this way feed EPVs of [[State-Dependent Insurance|state-dependent insurance]] benefits and premiums, so a question can continue into a premium or a policy value.
> - **Discrete contrast:** The same syllabus topic asks for discrete-time probabilities from the Chapman-Kolmogorov equations, and a question may set the two side by side.

> [!warning]- Exam traps
> - **Forward, not backward:** The forward equations fix the starting state $i$ and vary the destination $j$. The flows are into and out of $j$, so the intensities are evaluated at the current age $x+t$, not at the starting age $x$.
> - **Every flow:** Each equation needs an inflow from every state that can move to $j$ and an outflow to every state $j$ can move to. Leaving out recovery, for example, makes the sick-state probability too large.
> - **Euler's step uses the start of the interval:** Forward Euler evaluates the derivative at $t$, with the intensities at $x+t$. Using the intensities at $x+t+h$ gives a different answer from the one the question asks for, even though both methods converge as $h \to 0$.
> - **Probabilities that must add up:** The probabilities from state $i$ sum to 1 at every $t$, and Euler's method keeps that property. A total that drifts from 1 means a term was dropped.
