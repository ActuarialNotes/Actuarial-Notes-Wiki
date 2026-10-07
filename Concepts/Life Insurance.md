---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:048f51283fb9fb85c2b18bc6c51bef10be3c45996fbe1f66cd555d0f01ee1764
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Insurance.md
---

**Life Insurance** is a contract that pays a benefit on the death of the insured (and, for an endowment, on survival to the end of the term), in exchange for premiums paid while the insured is alive. Actuarially it is valued through its present value [[Random Variable|random variable]] $Z$, whose [[Expected Value|expected value]] is the expected present value (EPV) written $A$ in standard actuarial notation.

> $$\text{Whole life: } Z = v^{K_x + 1}$$

> $$\text{Term } n\text{: } Z = v^{K_x + 1}\,\mathbb{1}\{K_x < n\}$$

> $$\text{Endowment } n\text{: } Z = v^{\min(K_x + 1,\, n)}$$

> $$A^{1}_{x:\overline{n}|} = \sum_{k=0}^{n-1} v^{k+1}\;{}_kp_x\,q_{x+k}$$

- $K_x$ is the curtate future lifetime of $(x)$, so the benefit is paid at the end of the year of death. Paid at the moment of death the time is $T_x$ ($\bar{A}$), and at the end of the $1/m$-th of a year of death the EPV is $A^{(m)}$
- Products: [[Whole Life Insurance|whole life]] ($A_x$), term ($A^{1}_{x:\overline{n}|}$), pure endowment (${}_nE_x = v^n\,{}_np_x$), endowment ($A_{x:\overline{n}|} = A^{1}_{x:\overline{n}|} + {}_nE_x$), and policies with account values such as [[Universal Life Insurance|universal life]] and equity-linked contracts
- **Variance:** the second moment ${}^2\!A$ is $A$ at $v^2$, and $\text{Var}(Z) = {}^2\!A - A^2$ for a benefit of 1. Insurance and [[Life Annuity|annuity]] EPVs are linked by $A_{x:\overline{n}|} = 1 - d\,\ddot{a}_{x:\overline{n}|}$
- Under the uniform distribution of deaths [[Fractional Age Assumption|fractional age assumption]], $\bar{A}_x = \frac{i}{\delta}A_x$ and $A^{(m)}_x = \frac{i}{i^{(m)}}A_x$ (for a term or endowment insurance, only the death part is adjusted)

> [!example]- Three-Year Term Insurance: EPV and Standard Deviation {Example}
> A 3-year term insurance on $(60)$ pays $100{,}000$ at the end of the year of death. Given $q_{60} = 0.010$, $q_{61} = 0.012$, $q_{62} = 0.014$ and $i = 5\%$, find the EPV and the standard deviation of the present value.
>
> > [!answer]-
> > The probabilities of death in years 1, 2, 3 are $0.010$, $0.99(0.012) = 0.01188$ and $0.97812(0.014) = 0.013694$.
> > $$
> > \begin{align*}
> > A^{1}_{60:\overline{3}|} &= 0.010v + 0.01188v^2 + 0.013694v^3 \\
> > &= 0.009524 + 0.010776 + 0.011829 \\
> > &= 0.032128
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > {}^2\!A^{1}_{60:\overline{3}|} &= 0.010v^2 + 0.01188v^4 + 0.013694v^6 \\
> > &= 0.029062
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{SD} &= 100{,}000\sqrt{0.029062 - 0.032128^2} \\
> > &= 100{,}000(0.16742) \\
> > &= 16{,}742
> > \end{align*}
> > $$
> > The EPV is $\$3{,}212.84$ but the standard deviation is five times that: term insurance is almost all risk.

> [!example]- Endowment Insurance and Its Annuity {Example}
> For the same life and rates, find the EPV and standard deviation of a 3-year endowment insurance of $100{,}000$, and use it to find $\ddot{a}_{60:\overline{3}|}$.
>
> > [!answer]-
> > ${}_3p_{60} = 0.96443$, so ${}_3E_{60} = 0.96443v^3 = 0.833108$.
> > $$
> > \begin{align*}
> > A_{60:\overline{3}|} &= 0.032128 + 0.833108 \\
> > &= 0.865236
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > {}^2\!A_{60:\overline{3}|} &= 0.029062 + 0.96443v^6 \\
> > &= 0.748732
> > \end{align*}
> > $$
> > $\text{Var} = 0.748732 - 0.865236^2 = 0.0000986$, so SD $= 100{,}000\sqrt{0.0000986} = 993$.
> > $$
> > \begin{align*}
> > \ddot{a}_{60:\overline{3}|} &= \frac{1 - 0.865236}{0.05/1.05} \\
> > &= 2.83004
> > \end{align*}
> > $$
> > Direct check: $1 + 0.99v + 0.97812v^2 = 2.83004$. The endowment pays at time 3 at the latest, so its value hardly varies.

> [!example]- From Annual to Continuous and Monthly Under UDD {Example}
> At $i = 5\%$, $A_{50} = 0.24905$. Under UDD find $\bar{A}_{50}$ and $A^{(12)}_{50}$.
>
> > [!answer]-
> > $\delta = \ln 1.05 = 0.048790$ and $i^{(12)} = 12(1.05^{1/12} - 1) = 0.048889$.
> > $$
> > \begin{align*}
> > \bar{A}_{50} &= \frac{0.05}{0.048790}(0.24905) \\
> > &= 0.25523
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > A^{(12)}_{50} &= \frac{0.05}{0.048889}(0.24905) \\
> > &= 0.25471
> > \end{align*}
> > $$
> > Paying sooner after death is worth more; monthly lies between annual and continuous.

> [!tip]- How it appears on the exam
> - **FAM** asks to identify the present value random variable for a whole life, term or endowment insurance, annual, $1/m$-thly or continuous, then its mean, variance or a probability such as $P(Z > z)$, often converting between frequencies with UDD or claims acceleration.
> - FAM also tests the insurance–annuity identities and the effect of changing mortality or interest on $A$.
> - **ALTAM**, **ILA-101**, **CP-341** and **ILA-201I** use life insurance as the product being priced, reinsured, valued under IFRS 17 or embedded with options: the questions are about the contract design and its cash flows rather than the symbol.

> [!warning]- Exam traps
> - Squaring the EPV to get the second moment: ${}^2\!A$ is computed at $v^2$ (or $2\delta$), not $(A)^2$; the two differ and their difference is the variance.
> - Applying $i/\delta$ to the whole endowment insurance under UDD. Only the term (death) part is paid within the year; the pure endowment ${}_nE_x$ is already paid at a fixed time.
> - Variance of an endowment as the sum of the term and pure endowment variances: the two parts are mutually exclusive, so the covariance is $-A^1\,{}_nE_x$ and the second moments add instead.
