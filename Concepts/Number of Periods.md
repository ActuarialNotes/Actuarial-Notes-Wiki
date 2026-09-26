---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3bab8bb04970ea4de28b64f897fbbb2c5e522cc4e672f3b460df22faaa2b0547
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Number of Periods.md
---

The **number of periods** $n$ (or time $t$) is the length of time, counted in the same unit as the [[Interest Rate|interest rate]], over which an amount is accumulated or discounted; in a time-value-of-money problem it is the unknown found when the rate, the [[Present Value|present value]] and the [[Future Value|future value]] are given.

> $$n = \frac{\ln(FV/PV)}{\ln(1+i)}$$

> $$t = \frac{FV/PV - 1}{i}$$

- The first block solves $FV = PV(1+i)^n$ under [[Compound Interest|compound interest]]; the second solves $FV = PV(1 + it)$ under [[Simple Interest|simple interest]].
- **Units follow the rate.** With a nominal rate $i^{(12)}$ the natural rate is $i^{(12)}/12$ per month, so $n$ comes out in months. At $6\%$ convertible monthly, money doubles in $\ln 2 / \ln 1.005 = 138.98$ months, or $11.58$ years.
- Since $\ln(1+i) = \delta$, the [[Force of Interest|force of interest]], the compound answer is also $n = \ln(FV/PV)/\delta$. Under a [[Variable Force of Interest|variable force]] $\delta(t)$, solve $\int_0^n \delta(t)\,dt = \ln(FV/PV)$ for $n$.
- Under compound interest $n$ need not be a whole number — $(1+i)^t$ is defined for every real $t$. For an annuity or loan, the number of *payments* is the [[Term of Annuity]] or [[Term of Loan]], and a non-integer answer means a smaller final [[Drop Payment]] or a larger [[Balloon Payment]].
- It is one of the four quantities in a [[Time Value of Money Equations|time-value-of-money equation]]: given any three of rate, time, present value and future value, the [[Equation of Value]] gives the fourth.

> [!example]- Time for a Claims Fund to Reach Its Target {Example}
> An insurer sets aside \$2,000,000 to meet a settlement it expects to cost \$2,500,000. How long must the fund be invested at 4% per year to reach the target under (a) compound interest and (b) simple interest?
>
> > [!answer]-
> > The ratio needed is $FV/PV = 2{,}500{,}000/2{,}000{,}000 = 1.25$.
> >
> > $$
> > \begin{align*}
> > n_{\text{compound}} &= \frac{\ln 1.25}{\ln 1.04} \\
> > &= \frac{0.22314}{0.03922} \\
> > &= 5.69 \text{ years}
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > t_{\text{simple}} &= \frac{1.25 - 1}{0.04} \\
> > &= 6.25 \text{ years}
> > \end{align*}
> > $$
> >
> > Compound interest reaches the target about seven months sooner, because interest earned in the early years itself earns interest.

> [!example]- Solving for Time Under a Variable Force of Interest {Example}
> A fund grows under the force of interest $\delta(t) = 0.02 + 0.004t$. How long does it take a deposit to grow to 150% of its original amount?
>
> > [!answer]-
> > Set the accumulated force equal to $\ln 1.5$:
> >
> > $$
> > \begin{align*}
> > \int_0^n (0.02 + 0.004t)\,dt &= \ln 1.5 \\
> > 0.02n + 0.002n^2 &= 0.405465
> > \end{align*}
> > $$
> >
> > Solve the quadratic $0.002n^2 + 0.02n - 0.405465 = 0$, keeping the positive root:
> >
> > $$
> > \begin{align*}
> > n &= \frac{-0.02 + \sqrt{0.02^2 + 4(0.002)(0.405465)}}{2(0.002)} \\
> > &= \frac{-0.02 + 0.060363}{0.004} \\
> > &= 10.09 \text{ years}
> > \end{align*}
> > $$
> >
> > The deposit reaches 150% of its value after about 10.1 years.
