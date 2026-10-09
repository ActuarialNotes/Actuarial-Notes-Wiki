---
aliases:
  - Three-Term Woolhouse Approximation
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:79ed0f12e91c7887ef3d79f1943f778ef8880f5b5c88e5e8449309b608f892b2
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Woolhouse's Formula.md"
---

**Woolhouse's Formula** approximates the expected present value of an annuity paid $m$ times a year from the value of the same annuity paid once a year, using the Euler–Maclaurin formula. It turns annual [[Life Annuity|life annuity]] values from a life table into monthly or continuous ones, and in a [[Multiple State Model|multiple state model]] it does the same for payments made while the life is in a given state.

> $$\ddot{a}^{(m)}_x \approx \ddot{a}_x - \frac{m-1}{2m} - \frac{m^2-1}{12m^2}\left(\delta + \mu_x\right)$$

> $$\begin{aligned} \ddot{a}^{(m)}_{x:\overline{n}|} \approx {} & \ddot{a}_{x:\overline{n}|} - \frac{m-1}{2m}\left(1 - {}_nE_x\right) \\ & - \frac{m^2-1}{12m^2}\left(\delta + \mu_x - {}_nE_x\left(\delta + \mu_{x+n}\right)\right) \end{aligned}$$

> $$\begin{aligned} \frac{1}{m}\sum_{k=0}^{\infty} g\!\left(\tfrac{k}{m}\right) \approx {} & \sum_{k=0}^{\infty} g(k) - \frac{m-1}{2m}\,g(0) \\ & + \frac{m^2-1}{12m^2}\,g'(0) \end{aligned}$$

- **Symbols:** Following Dickson, Hardy & Waters (chapter 5), $\ddot{a}^{(m)}_x$ pays $1/m$ at the start of each $m$-th of a year while $(x)$ is alive, $\delta$ is the [[Force of Interest|force of interest]], $\mu_x$ is the [[Hazard Rate|force of mortality]], and ${}_nE_x = v^n\,{}_np_x$. The first block is the three-term formula, and dropping its last term gives the two-term formula $\ddot{a}^{(m)}_x \approx \ddot{a}_x - \frac{m-1}{2m}$.
- **Where it comes from:** The third block is the Euler–Maclaurin formula written once with step $1/m$ and once with step 1, with the integral of $g$ eliminated between them. For a single life $g(t) = v^t\,{}_tp_x$, so $g(0) = 1$ and $g'(0) = -(\delta + \mu_x)$, which gives the first block. A term annuity also has terms at $t = n$, which gives the second block.
- **Continuous limit:** Letting $m \to \infty$ gives $\bar{a}_x \approx \ddot{a}_x - \frac{1}{2} - \frac{1}{12}\left(\delta + \mu_x\right)$. If the force of mortality is not given, it can be estimated from the table as $\mu_x \approx -\frac{1}{2}\left(\ln p_{x-1} + \ln p_x\right)$.
- **State-dependent cash flows:** For payments made while the life is in state $j$, starting from state $i$, take $g(t) = v^t\,{}_tp^{ij}_x$. If $j = i$, then $g(0) = 1$ and $g'(0) = -\left(\delta + \sum_{k \neq i}\mu^{ik}_x\right)$. If $j \neq i$, then $g(0) = 0$ and $g'(0) = \mu^{ij}_x$, so the two-term formula makes no adjustment at all and only the third term changes the value.

> [!example]- Monthly Life Annuity on the SULT {Example}
> A pension of \$1,000 a month is paid in advance for life to a retiree aged 65. On the SULT at $5\%$, $\ddot{a}_{65} = 13.5498$ and $\mu_{65} = 0.005605$, and $\delta = \ln 1.05 = 0.048790$. Estimate the EPV with the two-term and the three-term Woolhouse formulas.
>
> > [!answer]-
> > With $m = 12$, the coefficients are $\frac{11}{24} = 0.458333$ and $\frac{143}{1{,}728} = 0.082755$, and $\delta + \mu_{65} = 0.054395$.
> > $$
> > \begin{align*}
> > \ddot{a}^{(12)}_{65} &\approx 13.5498 - 0.458333 \\
> > &= 13.0915 \\
> > \ddot{a}^{(12)}_{65} &\approx 13.091467 - 0.082755(0.054395) \\
> > &= 13.0870
> > \end{align*}
> > $$
> > The EPVs are $12{,}000(13.0915) = 157{,}098$ and $12{,}000(13.0870) = 157{,}044$. Summing the monthly payments directly under the Makeham law gives $13.08696$, so the three-term value is exact to four decimals, while the two-term value overstates the EPV by about \$54.

> [!example]- Monthly Disability Income in a Multiple State Model {Example}
> A disability income policy on a healthy life uses the healthy–sick–dead model with constant intensities $\mu^{01} = 0.02$, $\mu^{02} = 0.01$, $\mu^{10} = 0.10$ and $\mu^{12} = 0.05$, and $\delta = 0.05$. The annual values are $\ddot{a}^{00}_x = 14.7924$ and $\ddot{a}^{01}_x = 1.42691$. The policy pays \$2,000 a month in advance while the insured is sick, and premiums are paid monthly in advance while the insured is healthy. Use the three-term formula to find the annual premium.
>
> > [!answer]-
> > For the healthy-state annuity, $g'(0) = -(0.05 + 0.02 + 0.01) = -0.08$. For the sick-state annuity, $g(0) = 0$ and $g'(0) = \mu^{01} = 0.02$.
> > $$
> > \begin{align*}
> > \ddot{a}^{(12)00}_x &\approx 14.7924 - 0.458333 - 0.082755(0.08) \\
> > &= 14.32745 \\
> > \ddot{a}^{(12)01}_x &\approx 1.42691 + 0.082755(0.02) \\
> > &= 1.42857 \\
> > P &= \frac{24{,}000(1.42857)}{14.32745} \\
> > &= 2{,}393.01
> > \end{align*}
> > $$
> > The premium is \$2,393.01 a year, or \$199.42 a month. The exact monthly values from the model are $14.32743$ and $1.42856$. Using the two-term formula, which leaves $\ddot{a}^{01}_x$ unchanged, gives \$2,389.12 instead.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to derive the two-term and three-term formulas and to apply them to the EPVs of state-dependent cash flows. The inputs can be annual annuity values from a multiple state model, such as disability income or a [[Continuing Care Retirement Community|CCRC]], together with the transition intensities at the starting age.
> - **Premiums and policy values:** The converted annuities then feed a premium by the [[Equivalence Principle|equivalence principle]] or a [[Policy Value|policy value]] for a contract with monthly premiums or benefits.

> [!warning]- Exam traps
> - **Force of interest, not the rate:** The third term uses $\delta$, not $i$. With $i = 5\%$, writing $0.05$ in place of $\delta = 0.04879$ makes the third term too large.
> - **Annuity-due versus immediate:** The formulas are for annuities-due. An $m$-thly annuity-immediate is $a^{(m)}_x = \ddot{a}^{(m)}_x - \frac{1}{m}$, and applying the formula to $a_x$ directly gives the wrong constant term.
> - **The end of a term annuity:** A term annuity needs the correction at $t = n$ as well. Leaving out the ${}_nE_x$ terms subtracts a full correction for payments that are never made.
> - **The starting state:** For an annuity paid in a state other than the starting state, $g(0) = 0$, so there is no $\frac{m-1}{2m}$ term. Subtracting it anyway removes about $0.46$ from a value that may be close to 1.
