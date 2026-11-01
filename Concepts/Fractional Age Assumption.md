---
aliases:
  - Fractional Age
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:121703d89c365790323e1f781401748644feba7286e679ab507160b5d4745255
  sources:
    - "Hartman, Stat 344 Life Contingencies I, Chapter 5 (BYU), slide 27 (ä(m)_x = (1 - A(m)_x)/d(m)), slide 36 (UDD: ä(m)_x = alpha(m) ä_x - beta(m), alpha = id/(i(m)d(m)), beta = (i - i(m))/(i(m)d(m)); n-year: alpha ä_x:n - beta(1 - nE_x)), slide 37 (Woolhouse), sha256:3cceb4a4ae537548e470a22a01a01f62e1de16319c9669ddeeb17bed4c9509cf — https://hartman.byu.edu/docs/344Files/Stat344_Chapter5.pdf"
    - "SOA Exam FAM-L Sample Solutions (2024-10, rev. Aug 2026), Q3.11 p.15 (2.5q50 = 2q50 + 2p50 (0.5/2)(0.04): deaths uniform over a two-year interval), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Tables for Exam FAM (2024-10), Standard Ultimate Life Table p.20 (A45 = 0.15161, ä45:20 = 12.9391, ä50 = 17.0245, A50 = 0.18931, 2A50 = 0.05108), sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), ch.4 exercises 8-9 p.116 (PDF 126: death-times uniform within 5-year age intervals), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
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
- **Annuity values (FAM).** Annuities follow from the insurance values through $\ddot{a}^{(m)}_x = (1 - A^{(m)}_x)/d^{(m)}$, not by multiplying $\ddot{a}_x$ by a ratio. Under UDD this gives $\ddot{a}^{(m)}_x = \alpha(m)\,\ddot{a}_x - \beta(m)$, with $\alpha(m) = \frac{i\,d}{i^{(m)}\,d^{(m)}}$ and $\beta(m) = \frac{i - i^{(m)}}{i^{(m)}\,d^{(m)}}$. For an $n$-year temporary annuity, $\ddot{a}^{(m)}_{x:\overline{n}|} = \alpha(m)\,\ddot{a}_{x:\overline{n}|} - \beta(m)\left(1 - {}_nE_x\right)$. [[Woolhouse's Formula|Woolhouse's formula]] is the other standard approximation.
- **Over a longer interval.** A table given only every $n$ years can be filled in the same way. If deaths are uniform over the $n$ years from age $x$, then $\ell_{x+s}$ is linear for $0 \le s \le n$ and ${}_sq_x = \frac{s}{n}\,{}_nq_x$.
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

> [!example]- A Monthly Annuity Under UDD {Example}
> On the SULT at $i = 5\%$, $\ddot{a}_{50} = 17.0245$. Find $\ddot{a}^{(12)}_{50}$ under UDD, and check it against $A^{(12)}_{50} = 0.19361$ from the previous example.
>
> > [!answer]-
> > At $5\%$, $i^{(12)} = 0.048889$ and $d^{(12)} = 0.048691$.
> > $$
> > \begin{align*}
> > \alpha(12) &= \frac{(0.05)(0.047619)}{(0.048889)(0.048691)} \\
> > &= 1.00020 \\
> > \beta(12) &= \frac{0.05 - 0.048889}{(0.048889)(0.048691)} \\
> > &= 0.46651 \\
> > \ddot{a}^{(12)}_{50} &= 1.00020(17.0245) - 0.46651 \\
> > &= 16.5614
> > \end{align*}
> > $$
> > The check is $(1 - 0.19361)/0.048691 = 16.5614$. Monthly payments are worth about $0.46$ less than annual ones in advance, close to the $\frac{m-1}{2m} = 0.458$ that paying each instalment later on average suggests.

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
