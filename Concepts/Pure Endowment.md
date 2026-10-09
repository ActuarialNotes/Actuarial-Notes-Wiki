---
aliases:
  - Endowment
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1cea7fc362e3978ce44cebe8db88f7922c9038cdc5297c99570b446eef2e8e42
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pure Endowment.md
---
**A Pure Endowment** pays a sum insured at the end of a term of $n$ years if the insured, aged $x$ at issue, is still alive then, and pays nothing if the insured dies first. Its expected present value (EPV) per unit, ${}_nE_x$, discounts for interest and survival together, so it serves both as a contract in its own right and as the actuarial discount factor that moves life-contingent values through time. It is the survival part of an [[Endowment Insurance|endowment insurance]].

> $$Z = \begin{cases} 0 & K_x \le n-1 \\ v^n & K_x \ge n \end{cases}$$

> $${}_nE_x = A^{\phantom{x:}1}_{x:\overline{n}|} = v^n\,{}_np_x$$

> $$\text{Var}(Z) = v^{2n}\,{}_np_x\,{}_nq_x$$

> $${}_{m+n}E_x = {}_mE_x\;{}_nE_{x+m}$$

- **Symbols:** $Z = v^n I$, where $I$ indicates survival of $(x)$ to age $x+n$ and is a Bernoulli variable with probability ${}_np_x$. The mean and variance follow, and the second moment is ${}^2_{\,n}E_x = v^{2n}\,{}_np_x = v^n\,{}_nE_x$. The 1 above $\overline{n}|$ in the second block shows that the term must end before the life fails. The payment time is fixed, so there are no annual, $1/m$-thly or continuous versions to convert between.
- **Actuarial discount factor:** ${}_nE_x$ moves a value at age $x+n$ back to age $x$ for a life who must survive to collect it. That is how a deferred annuity is valued, ${}_{n|}\ddot{a}_x = {}_nE_x\,\ddot{a}_{x+n}$, and how a [[Whole Life Insurance|whole life]] value splits, $A_x = A^{1}_{x:\overline{n}|} + {}_nE_x\,A_{x+n}$. Dividing by ${}_nE_x$ accumulates instead, so the actuarial accumulated value of an annuity is $\ddot{s}_{x:\overline{n}|} = \ddot{a}_{x:\overline{n}|}/{}_nE_x$.
- **Part of an endowment:** An [[Endowment Insurance|endowment insurance]] is a [[Term Life Insurance|term insurance]] plus a pure endowment, $A_{x:\overline{n}|} = A^{1}_{x:\overline{n}|} + {}_nE_x$. The two parts can never both pay, so their present values have covariance $-A^{1}_{x:\overline{n}|}\,{}_nE_x$. In FAM's objectives, "endowment" covers both this survival benefit and the endowment insurance.
- **Assumptions:** ${}_nE_x$ falls when the interest rate rises and rises when mortality is lighter. That is the opposite of a death benefit's response to mortality, which is why survival benefits carry longevity risk.

> [!example]- Twenty-Year Pure Endowment on the SULT {Example}
> A pure endowment of \$100,000 is issued to $(45)$ for 20 years. On the SULT, $\ell_{45} = 99{,}033.9$ and $\ell_{65} = 94{,}579.7$, and $i = 5\%$. Find the EPV and the standard deviation of the present value.
>
> > [!answer]-
> > ${}_{20}p_{45} = 94{,}579.7/99{,}033.9 = 0.95502$ and $v^{20} = 0.376889$.
> > $$
> > \begin{align*}
> > {}_{20}E_{45} &= 0.376889(0.95502) \\
> > &= 0.359937 \\
> > \text{EPV} &= 100{,}000(0.359937) \\
> > &= 35{,}993.70 \\
> > \text{SD} &= 100{,}000(0.376889)\sqrt{0.95502(0.04498)} \\
> > &= 37{,}688.9(0.207260) \\
> > &= 7{,}811.4
> > \end{align*}
> > $$
> > The standard deviation is about $22\%$ of the EPV. Only $4.5\%$ of lives forfeit the benefit, so the value of the contract depends mainly on the interest rate.

> [!example]- The Pure Endowment Bought by Annual Premiums {Example}
> A life aged 55 pays \$10,000 at the start of each year for 10 years, while alive, to buy a pure endowment payable at age 65. On the SULT at $5\%$, $\ddot{a}_{55:\overline{10}|} = 8.0192$ and ${}_{10}E_{55} = 0.59342$. Find the pure endowment and compare it with the same deposits saved at $5\%$ interest.
>
> > [!answer]-
> > By the [[Equivalence Principle|equivalence principle]], $X\,{}_{10}E_{55} = 10{,}000\,\ddot{a}_{55:\overline{10}|}$.
> > $$
> > \begin{align*}
> > X &= \frac{10{,}000(8.0192)}{0.59342} \\
> > &= 135{,}135.3 \\
> > 10{,}000\,\ddot{s}_{\overline{10}|} &= 10{,}000\,\frac{1.05^{10} - 1}{0.05/1.05} \\
> > &= 132{,}067.9
> > \end{align*}
> > $$
> > The survivors receive about \$3,067 more than a bank account would give. That is their share of the deposits of the $3.3\%$ of lives who die before 65 and forfeit them, which is the survivorship benefit that the division by ${}_{10}E_{55}$ builds in.

> [!tip]- How it appears on the exam
> - **FAM** asks candidates to identify the present value random variable of a pure endowment and to find its mean, variance or a probability, for example as one part of an endowment insurance or a deferred annuity.
> - **Relationships:** FAM's objective on the relationships between insurance, endowment and annuity present values uses ${}_nE_x$ to split whole life and annuity values at age $x+n$, and to find the covariance between the term and pure endowment parts of an endowment insurance.
> - **Assumption changes:** A question may ask how a value that includes ${}_nE_x$ moves when interest or mortality changes, which tests the opposite response of survival and death benefits.

> [!warning]- Exam traps
> - **Second moment versus squared mean:** The second moment is $v^{2n}\,{}_np_x$, while the squared mean is $v^{2n}({}_np_x)^2$. Their difference is the variance, so using one for the other gives a variance of zero.
> - **Accumulating at interest only:** Dividing by $v^n$ ignores the forfeited deposits of those who die. The actuarial accumulation divides by ${}_nE_x$, and the gap was about \$3,067 in the second example.
> - **Converting to continuous:** A UDD factor such as $i/\delta$ applies only to death benefits. Applying it to ${}_nE_x$ inside an endowment insurance overstates the value, because the maturity payment is already made at a fixed time.
> - **Endowment versus pure endowment:** ${}_nE_x$ values a payment on survival only, while $A_{x:\overline{n}|}$ also values the payment on death within the term. Reading "endowment" as one when the question means the other changes the answer by the whole term insurance.
