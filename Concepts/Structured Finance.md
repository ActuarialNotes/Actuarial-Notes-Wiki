---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:f660ef0736cc7ca65da12f59ee3061a07fb5ee7fdad9a80c24db513f19877f3d
  sources:
    - "Coval, Jurek & Stafford, The Economics of Structured Finance, HBS Working Paper 09-060, printed pp.1-3 (amplification of errors; diversifiable for systematic risk), pp.5-6 (pass-through inherits the average rating, no credit enhancement; prioritized tranches; SPV), pp.14-15 (CDO2 sensitivity; senior tranche impaired only short of an economic catastrophe), pp.16-17 (GSEs Fannie Mae, Freddie Mac, Ginnie Mae chartered 'to ensure a continuous supply of credit to home buyers' to purchase mortgages originated by local banks meeting size and credit-quality requirements; repackaged into MBS with the implicit U.S. guarantee; non-conforming jumbo and subprime ineligible, held or sold directly; private-label MBS originated among others by Wall Street banks), pp.18-21 (credit ratings reflect only expected payoffs; yield spread over a Treasury of the same duration; catastrophe bond earns a spread for expected losses; senior tranches resemble a digital call and should earn more than single-name bonds of similar rating), sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf"
    - "CAS Exam 9 Spring 2019 — sample answers and examiner's report, Q10, PDF pp.58-59 (price = 500(1-0.0969)/1.05^2 = 409.57; yield = (500/409.57)^(1/2) - 1 = 10.49%; default premium = yield less risk-free rate; examiner: 'default premium is the difference between the CDO2 return and the risk-free rate'; mistakes: not discounting to t = 0, one year instead of two), sha256:a22ca9c6e1851e8dba6ba296f891233ebcfb8db3f0dea8484a92d04da6503b5a — https://www.casact.org/sites/default/files/2021-03/19-9_0.pdf"
    - "CAS Exam 9 Spring 2018 — sample answers and examiner's report, Q12, PDF p.67 (price = [100 x (1-0.077)]/1.05 = 87.90; CDOs should earn more than single-name securities of the same rating, higher exposure to systematic risk; mistakes: price as probability of default x 100, not discounting), sha256:1a71540d2106881211b9b06b4e3735f36d25f12b0d668d0aa4fa08f3fef19d89 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam9_18-9.pdf"
    - "Froot, The Market for Catastrophe Risk: A Clinical Examination, NBER Working Paper 7286 (1999), PDF p.4 (cedant coinsures 5-20% of a layer; reinsurance layers are call spreads on the cedant's cat losses, long a call at the retention, short a call at the exhaustion point), sha256:acfb53778c0377792e10790026d6c2fd715d765ffcdcd93ba463497462761cfd — https://www.nber.org/system/files/working_papers/w7286/w7286.pdf"
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
- **Pricing a tranche.** A tranche that pays a fixed amount $X$ at maturity $T$, or nothing if it defaults, is worth its expected payoff discounted to today: $\text{Price} = X(1 - p_D)/(1+r)^T$, where $p_D$ is the tranche's own default probability — worked out from the pool's joint default distribution, as in the examples below — and $r$ the discount rate. Its yield is $(X/\text{Price})^{1/T} - 1$, and its **default premium** is that yield less the risk-free rate, the measure CAS's examiners credit. Coval, Jurek & Stafford's *yield spread* is the same idea against a Treasury of the same duration, and their point is that a senior tranche, bearing systematic risk, should earn a larger one than a single-name bond with the same rating.
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
> > P_{0.10}(N \geq 4) &= 1 - 0.98720 \\
> > &= 0.01280
> > \end{align*}
> > $$
> >
> > - Equity: $40.1\% \to 65.1\%$ (about $1.6\times$)
> > - Mezzanine: $8.6\% \to 26.4\%$ (about $3.1\times$)
> > - Senior: $0.10\% \to 1.28\%$ (about $12.4\times$)
> >
> > The more senior the tranche, the larger the *relative* error. A doubling of $p$ that would move a single bond a notch or two moves the senior tranche across many rating categories — and adding correlation would make it worse.

> [!example]- Price, Yield and Default Premium of a Zero-Coupon Tranche {Example}
> A senior tranche promises $\$1{,}000$ in $3$ years and pays nothing if it defaults. Its probability of default over the term is $4\%$, and the discount rate and the risk-free rate are both $3\%$. Find its price, yield and default premium.
>
> > [!answer]-
> > **Plan:** expected payoff, discounted over the full term; then the yield that turns the price back into the promised payment.
> >
> > $$
> > \begin{align*}
> > \text{Price} &= \frac{1{,}000\,(1 - 0.04)}{1.03^{3}} \\
> > &= \frac{960}{1.09273} \\
> > &= \$878.54 \\
> > \text{Yield} &= \left(\frac{1{,}000}{878.54}\right)^{1/3} - 1 \\
> > &= 4.41\% \\
> > \text{Default premium} &= 4.41\% - 3.00\% \\
> > &= 1.41\%
> > \end{align*}
> > $$
> >
> > The default premium is what the promised yield must exceed the risk-free rate by to cover the expected default loss alone; it is spread over the term, so a $4\%$ default chance over three years adds about $1.4\%$ a year. A rating that measures only $p_D$ would class this tranche with any bond of the same default probability, though its defaults, coming in a severe downturn, deserve a higher return.
