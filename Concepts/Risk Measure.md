---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6a5913df81efdb65fce6b783046f0fb82f5db4c1ad203dffdf32555efa63a4ff
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Measure.md
---

A **Risk Measure** $\rho$ assigns a single number $\rho(X)$ to a random loss $X$ — the capital needed to support it, or the premium to charge for it. Exam 9 uses risk measures in both roles: a *capital* risk measure sets the assets $a$ an insurer holds against $X$, and a *pricing* risk measure sets the premium for the loss those assets can actually pay, $X \wedge a$.

> $$\text{VaR}_p(X) = \inf\{\, x : F(x) \geq p \,\}$$
>
> $$\text{TVaR}_p(X) = \frac{1}{1-p}\int_p^1 \text{VaR}_s(X)\, ds$$
>
> $$\rho_g(X) = \int_0^\infty g\big(S(x)\big)\, dx$$

- **Value at Risk** is the lower $p$-quantile of the loss ([[Percentile]]). A [[Probable Maximum Loss|PML]] is a VaR: the 1-in-250 PML is $\text{VaR}_{0.996}$. VaR is easy to explain, always exists and is easy to back-test, but it is blind to how bad losses beyond the quantile are.
- **Tail Value at Risk** averages the worst $1-p$ of outcomes; for any distribution $\text{TVaR}_p = \text{VaR}_p + E[(X - \text{VaR}_p)^+]/(1-p)$. The **conditional tail expectation** $E[X \mid X \geq \text{VaR}_p]$ equals TVaR for a continuous loss but not when there is a probability mass at $\text{VaR}_p$. *Expected shortfall* and *CVaR* usually mean TVaR, though some actuarial texts use expected shortfall for the unconditional $E[(X - \text{VaR}_p)^+]$ — check the definition in use. The **expected policyholder deficit** $E[(X - a)^+]$ is the loss that assets $a$ leave unpaid.
- **Moment-based measures** — the standard deviation principle $E[X] + k\,\sigma(X)$ and the variance principle $E[X] + k\,\text{Var}(X)$ — measure volatility around the mean rather than the tail, and are the classical basis of [[Risk Loads]] ([[Standard Deviation]], [[Variance]]).
- **Coherence** (Artzner, Delbaen, Eber and Heath, 1999) asks for four properties:
  - *monotone*: $X \leq Y \Rightarrow \rho(X) \leq \rho(Y)$
  - *subadditive*: $\rho(X + Y) \leq \rho(X) + \rho(Y)$
  - *positive homogeneous*: $\rho(\lambda X) = \lambda\,\rho(X)$ for $\lambda \geq 0$
  - *translation invariant*: $\rho(X + c) = \rho(X) + c$

  TVaR has all four. VaR fails subadditivity. The standard deviation principle fails monotonicity (with $k = 2$, a 50/50 chance of $0$ or $10$ scores $15$ — more than a certain loss of $10$); the variance principle fails positive homogeneity and subadditivity; $(1+\theta)E[X]$ fails translation invariance.
- **Distortion (spectral) risk measures** weight each layer of loss by $g(S(x))$, where $S = 1 - F$ and $g:[0,1] \to [0,1]$ is increasing with $g(0) = 0$, $g(1) = 1$. Those conditions make $\rho_g$ monotone and translation invariant; a **concave** $g$ also makes it subadditive, hence coherent (and comonotonic additive). Examples: proportional hazard $s^{\alpha}$ ($0 < \alpha \leq 1$), Wang $\Phi(\Phi^{-1}(s) + \lambda)$, dual $1 - (1-s)^m$ ($m \geq 1$), TVaR $\min(1, s/(1-p))$ and constant cost of capital $\nu s + \delta$ for $s > 0$. VaR is the distortion equal to $1$ for $s > 1-p$ and $0$ otherwise — a step, not concave.
- **Strategic effect.** The measure adopted for capital, limits and reinsurance shapes behaviour: a target at one return period can be met by piling risk just beyond it, while TVaR charges for the whole tail but is harder to estimate and does not exist when the mean is infinite. Solvency II uses a 99.5% one-year VaR ([[Solvency II]]); the Swiss Solvency Test uses 99% TVaR. See [[Risk Taxonomies]], [[Risk Modeling]] and [[Risk Capital]].

> [!example]- VaR, TVaR and CTE for a Catastrophe Portfolio {Example}
> An insurer's annual catastrophe loss $X$ (\$ millions) is $0$ with probability $0.80$, $10$ with probability $0.12$, $50$ with probability $0.06$ and $100$ with probability $0.02$. Compute $E[X]$, $\sigma(X)$, $\text{VaR}_{0.95}$, $\text{TVaR}_{0.95}$ and $\text{CTE}_{0.95}$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[X] &= 0.12(10) + 0.06(50) + 0.02(100) \\
> > &= 6.2 \\
> > E[X^2] &= 0.12(100) + 0.06(2{,}500) + 0.02(10{,}000) \\
> > &= 362 \\
> > \sigma(X) &= \sqrt{362 - 6.2^2} \\
> > &= 17.99
> > \end{align*}
> > $$
> >
> > The CDF steps through $F(0) = 0.80$, $F(10) = 0.92$, $F(50) = 0.98$, $F(100) = 1$. The first value at which $F$ reaches $0.95$ is $50$, so $\text{VaR}_{0.95} = 50$. TVaR averages the worst $5\%$ of probability — all $2\%$ at $100$ and $3\%$ of the $6\%$ mass at $50$:
> >
> > $$
> > \begin{align*}
> > \text{TVaR}_{0.95} &= \frac{0.02(100) + 0.03(50)}{0.05} \\
> > &= 70
> > \end{align*}
> > $$
> >
> > The shortcut agrees: $50 + 0.02(100 - 50)/0.05 = 50 + 20 = 70$. CTE conditions on $X \geq 50$, which takes in the *whole* mass at $50$:
> >
> > $$
> > \begin{align*}
> > \text{CTE}_{0.95} &= \frac{0.06(50) + 0.02(100)}{0.08} \\
> > &= 62.5
> > \end{align*}
> > $$
> >
> > VaR says a 1-in-20 year costs \$50 million; TVaR says the worst 1-in-20 years average \$70 million. CTE is lower because the atom at $50$ drags in outcomes better than the worst $5\%$ — the discrete-distribution trap.

> [!example]- Two Catastrophe Treaties: VaR Is Not Subadditive {Example}
> A reinsurer writes two treaties on unrelated perils. Each year exactly one of three states occurs: no loss (probability $0.92$), treaty 1 loses $10$ (probability $0.04$), or treaty 2 loses $10$ (probability $0.04$). Compare VaR and TVaR at $p = 0.95$ for each treaty and for the pair.
>
> > [!answer]-
> > **Each treaty alone:** $P(X_i = 0) = 0.96 \geq 0.95$, so $\text{VaR}_{0.95}(X_i) = 0$. Its worst $5\%$ is $4\%$ at $10$ and $1\%$ at $0$:
> >
> > $$
> > \begin{align*}
> > \text{TVaR}_{0.95}(X_i) &= \frac{0.04(10) + 0.01(0)}{0.05} \\
> > &= 8
> > \end{align*}
> > $$
> >
> > **The pair:** $X_1 + X_2 = 10$ with probability $0.08$, so $F(0) = 0.92 < 0.95$ and $\text{VaR}_{0.95} = 10$. The worst $5\%$ is all at $10$, so $\text{TVaR}_{0.95} = 10$.
> >
> > $$
> > \begin{align*}
> > \text{VaR: } 10 &> 0 + 0 \\
> > \text{TVaR: } 10 &\leq 8 + 8
> > \end{align*}
> > $$
> >
> > Under VaR each treaty needs no capital but the pair needs $10$ — combining unrelated risks *raised* measured risk, so limits set treaty by treaty do not control the total. TVaR rewards the diversification. The older CTE definition fails too: $E[X_i \mid X_i \geq 0] = 0.4$ for each treaty against $10$ for the pair.

> [!example]- TVaR and a Proportional Hazard Premium as Distortions {Example}
> For the portfolio in the first example, evaluate $\rho_g(X)$ with (a) $g(s) = \min(1,\, s/0.05)$ and (b) the proportional hazard distortion $g(s) = \sqrt{s}$.
>
> > [!answer]-
> > $S(x)$ is $0.20$ on $[0, 10)$, $0.08$ on $[10, 50)$, $0.02$ on $[50, 100)$ and $0$ above, so the integral is a sum of layer width times $g(S)$:
> >
> > $$
> > \begin{align*}
> > \rho_{(a)} &= 10(1) + 40(1) + 50(0.4) \\
> > &= 70 \\
> > \rho_{(b)} &= 10\sqrt{0.20} + 40\sqrt{0.08} + 50\sqrt{0.02} \\
> > &= 4.47 + 11.31 + 7.07 \\
> > &= 22.86
> > \end{align*}
> > $$
> >
> > (a) reproduces $\text{TVaR}_{0.95} = 70$, and $g(s) = s$ would return $E[X] = 10(0.20) + 40(0.08) + 50(0.02) = 6.2$. The proportional hazard premium of $22.86$ carries a margin of $16.66$ over expected loss, most of it on the remote layers, where $\sqrt{s}$ is many times $s$.
