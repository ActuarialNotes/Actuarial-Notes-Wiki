---
aliases:
  - Three-Term Woolhouse Approximation
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f62fadbc3b4224112f90908e45e581333ff6005195532c15fb83803523291a18
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Woolhouse's Formula.md"
---

**Woolhouse's Formula** approximates the expected present value of an annuity paid $m$ times a year from the value of the same annuity paid once a year. It turns annual [[Life Annuity|life annuity]] values from a life table into monthly or continuous ones. For a whole life annuity-due on $(x)$, the three-term formula is

> $$\ddot{a}^{(m)}_x \approx \ddot{a}_x - \frac{m-1}{2m} - \frac{m^2-1}{12m^2}\left(\delta + \mu_x\right)$$

- $\ddot{a}^{(m)}_x$ pays $1/m$ at the start of each $m$-th of a year while $(x)$ is alive.
- $\delta$ is the [[Force of Interest|force of interest]].
- $\mu_x$ is the [[Hazard Rate|force of mortality]] at age $x$.

Dropping the last term gives the two-term formula, which is

> $$\ddot{a}^{(m)}_x \approx \ddot{a}_x - \frac{m-1}{2m}$$

The formulas are for annuities-due. An $m$-thly annuity-immediate is $a^{(m)}_x = \ddot{a}^{(m)}_x - \frac{1}{m}$. Monthly payments of $P$ at the start of each month are worth $12P\,\ddot{a}^{(12)}_x$.

> [!example]- What is the EPV of this monthly pension by the two-term and three-term formulas? {Example}
> A pension of $\$1{,}000$ a month is paid in advance for life to a retiree aged 65. On the SULT at $5\%$, $\ddot{a}_{65} = 13.5498$ and $\mu_{65} = 0.005605$, and $\delta = \ln 1.05 = 0.048790$.
>
> > [!answer]-
> > - With $m = 12$, the coefficients are $\frac{11}{24} = 0.458333$ and $\frac{143}{1{,}728} = 0.082755$.
> > - $\delta + \mu_{65} = 0.054395$.
> > - The two-term value is $\ddot{a}^{(12)}_{65} \approx 13.5498 - 0.458333 = 13.0915$.
> > - The three-term value is $13.091467 - 0.082755(0.054395) = 13.0870$.
> > - The EPVs are $12{,}000(13.0915) = 157{,}098$ and $12{,}000(13.0870) = 157{,}044$.
> > - Summing the monthly payments directly gives $13.08696$, so the three-term value is exact to four decimals, while the two-term value overstates the EPV by about $\$54$.

## Temporary annuities

A term annuity also needs the correction at $t = n$, where the payments stop. The three-term formula for an $n$-year temporary annuity-due is

> $$\begin{aligned} \ddot{a}^{(m)}_{x:\overline{n}|} \approx {} & \ddot{a}_{x:\overline{n}|} - \frac{m-1}{2m}\left(1 - {}_nE_x\right) \\ & - \frac{m^2-1}{12m^2}\left(\delta + \mu_x - {}_nE_x\left(\delta + \mu_{x+n}\right)\right) \end{aligned}$$

- ${}_nE_x = v^n\,{}_np_x$ is the [[Pure Endowment|pure endowment]] factor.

The two-term formula keeps the first line. Leaving out the ${}_nE_x$ terms subtracts a full correction for payments that are never made.

## Derivation from the Euler–Maclaurin formula

For a smooth function $g$, the Euler–Maclaurin formula written once with step $1/m$ and once with step 1, with the integral of $g$ eliminated between them, gives

> $$\begin{aligned} \frac{1}{m}\sum_{k=0}^{\infty} g\!\left(\tfrac{k}{m}\right) \approx {} & \sum_{k=0}^{\infty} g(k) - \frac{m-1}{2m}\,g(0) \\ & + \frac{m^2-1}{12m^2}\,g'(0) \end{aligned}$$

For a single life $g(t) = v^t\,{}_tp_x$, so $g(0) = 1$ and $g'(0) = -(\delta + \mu_x)$, which gives the whole life formula. A term annuity has the same terms again at $t = n$, which gives the temporary formula.

Letting $m \to \infty$ gives the continuous annuity, which is

> $$\bar{a}_x \approx \ddot{a}_x - \frac{1}{2} - \frac{1}{12}\left(\delta + \mu_x\right)$$

If the force of mortality is not given, it can be estimated from the table as $\mu_x \approx -\frac{1}{2}\left(\ln p_{x-1} + \ln p_x\right)$.

## State-dependent cash flows

In a [[Multiple State Model|multiple state model]], payments made while the life is in state $j$, starting from state $i$, take $g(t) = v^t\,{}_tp^{ij}_x$. If $j = i$, then $g(0) = 1$ and

> $$g'(0) = -\left(\delta + \sum_{k \neq i}\mu^{ik}_x\right)$$

- $\mu^{ik}_x$ is the [[Transition Intensity|transition intensity]] from state $i$ to state $k$ at age $x$.

If $j \neq i$, then $g(0) = 0$ and $g'(0) = \mu^{ij}_x$, so the two-term formula makes no adjustment at all and only the third term changes the value.

> [!example]- What is the annual premium for this disability income policy, by the three-term formula? {Example}
> A disability income policy on a healthy life uses the healthy–sick–dead model with constant intensities $\mu^{01} = 0.02$, $\mu^{02} = 0.01$, $\mu^{10} = 0.10$ and $\mu^{12} = 0.05$, and $\delta = 0.05$. The annual values are $\ddot{a}^{00}_x = 14.7924$ and $\ddot{a}^{01}_x = 1.42691$. The policy pays $\$2{,}000$ a month in advance while the insured is sick, and premiums are paid monthly in advance while the insured is healthy.
>
> > [!answer]-
> > - For the healthy-state annuity, $g'(0) = -(0.05 + 0.02 + 0.01) = -0.08$.
> > - So $\ddot{a}^{(12)00}_x \approx 14.7924 - 0.458333 - 0.082755(0.08) = 14.32745$.
> > - For the sick-state annuity, $g(0) = 0$ and $g'(0) = \mu^{01} = 0.02$.
> > - So $\ddot{a}^{(12)01}_x \approx 1.42691 + 0.082755(0.02) = 1.42857$.
> > - By the [[Equivalence Principle|equivalence principle]], $P = 24{,}000(1.42857)/14.32745 = 2{,}393.01$ a year, or $\$199.42$ a month.
> > - The exact monthly values from the model are $14.32743$ and $1.42856$.
> > - The two-term formula, which leaves $\ddot{a}^{01}_x$ unchanged, gives $\$2{,}389.12$ instead.

> [!trap] Using the interest rate in place of the force of interest
> The third term uses $\delta$, not $i$. With $i = 5\%$, writing $0.05$ in place of $\delta = 0.04879$ makes the third term too large.
