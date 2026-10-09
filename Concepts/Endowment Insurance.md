---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:df10e763155fda0fbf5d1c99da63f0baae88f466f4fbff8b8d14e5ff0bc55070
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Endowment Insurance.md
---

**Endowment Insurance** pays a sum insured on the death of the insured within a term of $n$ years, or at the end of the term if the insured survives it, so the benefit is certain to be paid by time $n$. For a life aged $x$ with the death benefit paid at the end of the year of death, its present value random variable is $Z = v^{\min(K_x+1,\,n)}$ and its expected present value (EPV) is $A_{x:\overline{n}|}$. It combines a [[Term Life Insurance|term insurance]] with a [[Pure Endowment|pure endowment]] and behaves mainly as a savings contract.

> $$Z = v^{\min(K_x+1,\,n)}$$

> $$A_{x:\overline{n}|} = A^{1}_{x:\overline{n}|} + {}_nE_x$$

> $$\text{Var}(Z) = {}^2A_{x:\overline{n}|} - \left(A_{x:\overline{n}|}\right)^2$$

> $$\ddot{a}_{x:\overline{n}|} = \frac{1 - A_{x:\overline{n}|}}{d}$$

- **Symbols:** $K_x$ is the curtate [[Future Lifetime Random Variable|future lifetime]], and ${}^2A_{x:\overline{n}|}$ is the EPV at $v^2$, which equals ${}^2A^{1}_{x:\overline{n}|} + v^{2n}\,{}_np_x$. When the death benefit is paid at the moment of death, $\bar{Z} = v^{\min(T_x,\,n)}$ and $\bar{a}_{x:\overline{n}|} = (1 - \bar{A}_{x:\overline{n}|})/\delta$.
- **Two parts:** $Z$ is the sum of the term insurance and pure endowment present values, $Z_1 + Z_2$. They can never both be positive, so $E[Z_1 Z_2] = 0$ and $\text{Cov}(Z_1, Z_2) = -A^{1}_{x:\overline{n}|}\,{}_nE_x$. The second moments therefore add, but the variances do not.
- **The annuity identity:** The present value of an $n$-year temporary [[Life Annuity|life annuity]]-due is $Y = \ddot{a}_{\overline{\min(K_x+1,\,n)}|} = (1 - Z)/d$. Taking expectations gives the fourth block, and $\text{Var}(Y) = \text{Var}(Z)/d^2$. It follows that the net annual premium per unit is $A_{x:\overline{n}|}/\ddot{a}_{x:\overline{n}|} = d\,A_{x:\overline{n}|}/(1 - A_{x:\overline{n}|})$.
- **A savings contract:** Because the benefit is paid by time $n$ at the latest, $A_{x:\overline{n}|} \ge v^n$, and for a young life most of the value is the maturity payment. Its value depends mainly on the interest rate, and under UDD only the term part is converted to continuous, $\bar{A}_{x:\overline{n}|} = \frac{i}{\delta}A^{1}_{x:\overline{n}|} + {}_nE_x$.

> [!example]- Twenty-Year Endowment Insurance on the SULT {Example}
> On the SULT at $5\%$, $A_{45} = 0.15161$, $A_{65} = 0.35477$, ${}_{20}E_{45} = 0.35994$ and $\ddot{a}_{45} = 17.8162$. For a fully discrete 20-year endowment insurance of \$100,000 on $(45)$, find $A_{45:\overline{20}|}$, $\ddot{a}_{45:\overline{20}|}$ and the net annual premium. Compare the premium with that for a fully discrete whole life insurance of the same amount.
>
> > [!answer]-
> > The term part is the whole life value less a whole life insurance deferred 20 years.
> > $$
> > \begin{align*}
> > A^{1}_{45:\overline{20}|} &= 0.15161 - 0.35994(0.35477) \\
> > &= 0.023914 \\
> > A_{45:\overline{20}|} &= 0.023914 + 0.35994 \\
> > &= 0.383854 \\
> > \ddot{a}_{45:\overline{20}|} &= \frac{1 - 0.383854}{0.05/1.05} \\
> > &= 12.9391 \\
> > P &= \frac{38{,}385.4}{12.9391} \\
> > &= 2{,}966.62
> > \end{align*}
> > $$
> > The whole life premium is $15{,}161/17.8162 = 850.97$. The endowment costs three and a half times as much, because it pays \$100,000 by age 65 for certain, and $94\%$ of its EPV is the pure endowment.

> [!example]- Paying the Death Benefit at the Moment of Death {Example}
> For the policy in the first example, assume UDD and find $\bar{A}_{45:\overline{20}|}$, with the death benefit paid at the moment of death. Then find $\bar{a}_{45:\overline{20}|}$ with $\delta = \ln 1.05 = 0.048790$.
>
> > [!answer]-
> > Only the death benefit is paid within the year, so only the term part is multiplied by $i/\delta = 1.024797$.
> > $$
> > \begin{align*}
> > \bar{A}_{45:\overline{20}|} &= 1.024797(0.023914) + 0.35994 \\
> > &= 0.024507 + 0.35994 \\
> > &= 0.384447 \\
> > \bar{a}_{45:\overline{20}|} &= \frac{1 - 0.384447}{0.048790} \\
> > &= 12.6164
> > \end{align*}
> > $$
> > Paying claims sooner adds less than $0.2\%$ to the value, because the death benefit is a small part of it. The continuous annuity is smaller than $\ddot{a}_{45:\overline{20}|} = 12.9391$, because each payment is spread over its year instead of being paid at the start.

> [!tip]- How it appears on the exam
> - **FAM** asks candidates to identify the present value random variable of an endowment insurance paid annually, $1/m$-thly or continuously, and to find its EPV and variance, either from second moments or from the term and pure endowment parts with their covariance.
> - **Relationships:** FAM's objective on relationships between insurance, endowment and annuity values is built on $\ddot{a}_{x:\overline{n}|} = (1 - A_{x:\overline{n}|})/d$, which questions use in both directions.
> - **Premiums and losses:** Endowment insurance is one of the policies in FAM's premium section. Its [[Future Loss Random Variable|future loss random variable]] is a linear function of $Z$, so its variance has the same shortcut as whole life.

> [!warning]- Exam traps
> - **Adding the variances of the parts:** The variance of $Z$ is not $\text{Var}(Z_1) + \text{Var}(Z_2)$, because the covariance $-A^{1}_{x:\overline{n}|}\,{}_nE_x$ is negative. Leaving it out overstates the variance.
> - **The annuity from the wrong insurance:** The identity $\ddot{a}_{x:\overline{n}|} = (1 - A)/d$ needs the endowment insurance value. Using the term value $A^{1}_{x:\overline{n}|}$ in the first example gives $20.50$, which is impossible for a 20-year annuity-due at $5\%$.
> - **UDD on the whole value:** Multiplying all of $A_{x:\overline{n}|}$ by $i/\delta$ treats the maturity payment as if it were paid early, and in the second example it overstates $\bar{A}$ by $0.0089$.
> - **Death in the last year:** A death in year $n$ is paid at time $n$, the same time as the maturity benefit. So $Z = v^n$ with probability ${}_{n-1}p_x$, not ${}_np_x$.
