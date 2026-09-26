---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:62a8625a7ec917873f6cd06ccf76ba21a722f27410d6ec29e8059063a2cff167
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Structured Finance.md
---

**Structured Finance** is the pooling of credit-sensitive assets — loans, bonds, mortgages — in a special purpose vehicle, followed by the issue against that pool of a **prioritised capital structure of claims (tranches)**, so that losses hit the junior tranches first and the senior tranches can be far safer than the average asset in the pool.

> $$L_{[a,\,d]} = \min\big(\max(L - a,\ 0),\ d - a\big)$$

- $L$ is the pool's loss, $a$ the tranche's **attachment** point and $d$ its **detachment** point. The tranche loses nothing until the claims beneath it are exhausted, then absorbs everything up to its size $d - a$. Summed over all tranches the losses equal $L$: tranching redistributes the pool's risk, it does not remove it.
- **Pooling alone achieves nothing.** A pass-through (a pro-rata share of the pool) simply inherits the pool's average rating. The credit enhancement comes from *prioritisation*: the junior claims beneath a senior tranche set how large a pool loss it survives. The same arithmetic prices an [[Excess of Loss|excess-of-loss]] [[Layer of Insurance|layer]] — a reinsurance layer is a tranche of the cedant's loss distribution.
- **A tranche's rating depends on the joint distribution.** A single bond's rating needs only its own default probability; a senior tranche's needs the probability that *many* assets default together, so it is acutely sensitive to **default [[Correlation|correlation]]** and to errors in default probabilities and recoveries. Coval, Jurek & Stafford's first point is that tranching **amplifies** those errors, and re-tranching tranches (the CDO-squared) amplifies them again.
- **Senior tranches are economic catastrophe bonds.** Idiosyncratic defaults diversify away in a large pool, so a senior tranche is impaired only in a severe, economy-wide downturn. A rating measures default probability or expected loss, not *when* the loss occurs, so a AAA tranche deserves a far larger spread than a AAA corporate bond — their second point. A [[CAT Bonds|cat bond]], whose losses are unrelated to the economy, is the opposite case.
- See [[Securitization]] for the process and its incentive problems, and [[Credit Risk]] for default modelling.

> [!example]- Two-Bond Pool: The Senior Tranche Lives on Correlation {Example}
> Two $\$1$ bonds each default with probability $p = 10\%$ and recover nothing. They are pooled and split into a $\$1$ junior tranche (first loss) and a $\$1$ senior tranche. Find each tranche's default probability for default correlation $\rho = 0$, $0.2$ and $1$.
>
> > [!answer]-
> > The senior tranche defaults only if **both** bonds default; the junior defaults if **either** does. For two identical default indicators, $\rho = \dfrac{p_{DD} - p^2}{p(1-p)}$, so
> >
> > $$
> > \begin{align*}
> > p_{DD} &= p^2 + \rho\,p(1-p) \\
> > &= 0.01 + 0.09\rho \\[4pt]
> > P(\text{junior defaults}) &= 2p - p_{DD} \\
> > &= 0.19 - 0.09\rho
> > \end{align*}
> > $$
> >
> > - $\rho = 0$: senior $1.0\%$, junior $19.0\%$
> > - $\rho = 0.2$: senior $2.8\%$, junior $17.2\%$
> > - $\rho = 1$: senior $10.0\%$, junior $10.0\%$
> >
> > A modest correlation of $0.2$ nearly **triples** the senior tranche's default probability while moving the junior's by under two points. At $\rho = 1$ the structure achieves no enhancement at all. The senior investor is really buying an assumption about $\rho$.

> [!example]- Ten-Bond Pool: Seniority Amplifies Parameter Error {Example}
> Ten $\$1$ bonds with zero recovery default independently. Tranches: equity $[0, 1]$, mezzanine $[1, 3]$, senior $[3, 10]$. The rating model uses $p = 5\%$, but the true default probability is $10\%$. How does each tranche's probability of impairment change?
>
> > [!answer]-
> > With $N \sim \text{Bin}(10, p)$ defaults, equity is impaired if $N \geq 1$, mezzanine if $N \geq 2$, senior if $N \geq 4$.
> >
> > At $p = 0.05$ the probabilities of $0, 1, 2, 3$ defaults are $0.59874, 0.31512, 0.07463, 0.01048$; at $p = 0.10$ they are $0.34868, 0.38742, 0.19371, 0.05740$ ([[Binomial Distribution]]).
> >
> > $$
> > \begin{align*}
> > P_{0.05}(N \geq 4) &= 1 - 0.99897 \\
> > &= 0.00103 \\[4pt]
> > P_{0.10}(N \geq 4) &= 1 - 0.98721 \\
> > &= 0.01279
> > \end{align*}
> > $$
> >
> > - Equity: $40.1\% \to 65.1\%$ (about $1.6\times$)
> > - Mezzanine: $8.6\% \to 26.4\%$ (about $3.1\times$)
> > - Senior: $0.10\% \to 1.28\%$ (about $12.4\times$)
> >
> > The more senior the tranche, the larger the *relative* error. A doubling of $p$ that would move a single bond a notch or two moves the senior tranche across many rating categories — and adding correlation would make it worse.
