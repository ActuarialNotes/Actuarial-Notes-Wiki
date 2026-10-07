---
aliases:
  - Fractional Age
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bfad937b111f7a60ba6207a501c298cf2c174a5b05855e046ac1579ace03cdb0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fractional Age Assumption.md
---
**A Fractional Age Assumption** fixes how deaths, or other decrements, are spread within each year of age. With it, a [[Life Table|life table]] that gives only $\ell_x$ or $q_x$ at integer ages also yields ${}_sp_x$, ${}_sq_x$ and the force of [[Hazard Rate|mortality]] $\mu_{x+s}$ for $0 < s < 1$. The two in AMLCR Section 3.3 are **uniform distribution of deaths** (UDD) and **constant force of mortality**.

> $$\text{UDD:}\quad {}_sq_x = s\,q_x$$

> $$\text{UDD:}\quad \mu_{x+s} = \frac{q_x}{1 - s\,q_x}$$

> $$\text{Constant force:}\quad {}_sp_x = \left(p_x\right)^s$$

> $$\text{Constant force:}\quad \mu_{x+s} = -\ln p_x$$

- **What UDD means.** $\ell_{x+s}$ is linear in $s$, so the density ${}_sp_x\,\mu_{x+s} = q_x$ is flat over the year. Equivalently, $T_x = K_x + R$, where $R$ is [[Uniform Continuous Distribution|uniform]] on $(0,1)$ and independent of the curtate lifetime $K_x$. This gives $\mathring{e}_x = e_x + \tfrac12$. Under a constant force, $\ell_{x+s}$ is exponential in $s$ and $\mu$ is flat within the year.
- **Within a year, not from age $x$.** For $0 \le t < t+s \le 1$, UDD gives ${}_sq_{x+t} = s\,q_x/(1 - t\,q_x)$, while a constant force gives ${}_sp_{x+t} = (p_x)^s$. Across an integer age, split the period and multiply the pieces.
- **Insurance values (FAM).** Under UDD, $\bar{A}_x = \tfrac{i}{\delta}A_x$ and $A^{(m)}_x = \tfrac{i}{i^{(m)}}A_x$. The claims acceleration approximation $\bar{A}_x \approx (1+i)^{1/2}A_x$ assumes instead that deaths are paid, on average, half a year early.
- **Multiple decrements (ALTAM).** UDD in the multiple decrement table, or constant forces, gives $p'^{(j)}_x = \left(p^{(\tau)}_x\right)^{q^{(j)}_x/q^{(\tau)}_x}$. UDD in each single decrement table instead gives, for two decrements, $q^{(1)}_x = q'^{(1)}_x\left(1 - \tfrac12 q'^{(2)}_x\right)$.

> [!example]- Survival Across a Birthday {Example}
> Given $q_{60} = 0.02$ and $q_{61} = 0.025$, find ${}_{0.75}q_{60.5}$ under UDD and under a constant force of mortality.
>
> > [!answer]-
> > Split at age 61: ${}_{0.75}p_{60.5} = {}_{0.5}p_{60.5}\cdot{}_{0.25}p_{61}$.
> > $$
> > \begin{align*}
> > \text{UDD:}\ {}_{0.75}p_{60.5} &= \frac{p_{60}}{1 - 0.5\,q_{60}}\left(1 - 0.25\,q_{61}\right) \\
> > &= \frac{0.98}{0.99}(0.99375) \\
> > &= 0.983712 \\
> > \text{Constant force:}\ {}_{0.75}p_{60.5} &= (0.98)^{0.5}(0.975)^{0.25} \\
> > &= 0.983703
> > \end{align*}
> > $$
> > So ${}_{0.75}q_{60.5} = 0.016288$ under UDD and $0.016297$ under a constant force. When $q$ is small the two assumptions agree to about five decimals.

> [!example]- From Annual to Continuous Insurance Values {Example}
> On the SULT at $i = 5\%$, $A_{50} = 0.18931$. Find $\bar{A}_{50}$ under UDD and by claims acceleration, and find $A^{(12)}_{50}$ under UDD.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{A}_{50} &= \frac{i}{\delta}A_{50} \\
> > &= \frac{0.05}{\ln 1.05}(0.18931) \\
> > &= 1.024797(0.18931) \\
> > &= 0.19400 \\
> > \bar{A}_{50} &\approx (1.05)^{1/2}(0.18931) \\
> > &= 0.19399 \\
> > A^{(12)}_{50} &= \frac{0.05}{0.048889}(0.18931) \\
> > &= 0.19361
> > \end{align*}
> > $$
> > Paying at the moment of death raises the value by about $2.5\%$. Monthly payment raises it by a little less.

> [!example]- Deconstructing a Multiple Decrement Table {Example}
> A two-decrement model has $q^{(1)}_x = 0.03$ (death) and $q^{(2)}_x = 0.12$ (withdrawal). Assuming UDD in the multiple decrement table, find the associated single decrement rates $q'^{(1)}_x$ and $q'^{(2)}_x$.
>
> > [!answer]-
> > $q^{(\tau)}_x = 0.15$, so $p^{(\tau)}_x = 0.85$.
> > $$
> > \begin{align*}
> > p'^{(1)}_x &= (0.85)^{0.03/0.15} \\
> > &= 0.968019 \\
> > p'^{(2)}_x &= (0.85)^{0.12/0.15} \\
> > &= 0.878082
> > \end{align*}
> > $$
> > So $q'^{(1)}_x = 0.03198$ and $q'^{(2)}_x = 0.12192$, and $p'^{(1)}_x\,p'^{(2)}_x = 0.85$. Each independent rate is higher than its dependent rate. With withdrawal removed, more lives remain exposed to death, and the reverse holds for withdrawal.

> [!tip]- How it appears on the exam
> - **FAM** gives a life table at integer ages and asks for a probability, $\mu_{x+s}$, or the complete expectation $\mathring{e}_x$ or ${}_n\mathring{e}_x$ at a fractional age or duration. The question states which assumption to use.
> - **FAM** converts annual insurance values to continuous or $m$-thly ones with $i/\delta$ or $i/i^{(m)}$ under UDD, or with claims acceleration. These are then used in a premium or variance calculation.
> - **ALTAM** builds a multiple decrement table from single decrement rates, or recovers them from it, under UDD in the multiple decrement table or in the single decrement tables. The table then feeds a premium, policy value or pension valuation.

> [!warning]- Exam traps
> - **${}_sq_{x+t} \neq s\,q_x$.** Under UDD the denominator is $1 - t\,q_x$. Dropping it understates the probability slightly, which matters when the answer choices are close.
> - **Mixing the assumptions.** $(p_x)^s$ is the constant-force answer, while $1 - s\,q_x$ is UDD. A question that says UDD and is worked with exponents lands on the neighbouring choice.
> - **Annuities do not convert like insurance.** $\bar{a}_x = (1 - \bar{A}_x)/\delta$ must be built from the converted $\bar{A}_x$. Multiplying $\ddot{a}_x$ by $i/\delta$ is wrong.
> - **Two kinds of multiple decrement UDD.** UDD in the multiple decrement table, or constant forces, uses the power formula. UDD in each single decrement table uses $q'^{(1)}\left(1 - \tfrac12 q'^{(2)}\right)$. They give different tables.
