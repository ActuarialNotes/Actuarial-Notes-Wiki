---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1a392f743784ae7a75d4404f38616f1dc6406f8c516500a1bd686c48b05f6fee
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Modified Net Premium Policy Value.md
---

**A Modified Net Premium Policy Value** is a net premium [[Policy Value|policy value]] calculated with a net premium that is lower in the first year and higher afterwards, so that the policy value allows for the insurer's initial expenses. The standard method is **full preliminary term** (FPT): the first-year net premium only pays for one year of term cover, and the renewal net premium is that of a policy issued one year older for one year shorter.

> $$P^{FPT}_0 = S\,v\,q_x$$

> $$P^{FPT} = \frac{S\,A_{x+1}}{\ddot{a}_{x+1}}$$

> $${}_tV^{FPT}_{x} = {}_{t-1}V_{x+1}, \quad t \geq 1$$

- **Symbols:** For a fully discrete [[Whole Life Insurance|whole life insurance]] of $S$ on $(x)$, $P^{FPT}_0$ is the first-year net premium and $P^{FPT}$ is the renewal net premium. ${}_{t-1}V_{x+1}$ is the ordinary net premium policy value at duration $t-1$ of a policy issued at age $x+1$. For a [[Term Life Insurance|term]] or [[Endowment Insurance|endowment]] policy of $n$ years, the renewal premium is that of the same policy on $(x+1)$ for $n-1$ years.
- **Why modify:** A net premium policy value ignores expenses, so it assumes the insurer has the whole net premium available in the first year. Acquisition costs are much higher in the first year than later, so a net premium policy value can be more than the insurer has left after paying them. FPT spends the first year's premium on the cost of cover only, which gives ${}_1V^{FPT} = 0$.
- **Expense allowance:** Both premium patterns satisfy the [[Equivalence Principle|equivalence principle]], so they have the same EPV at issue, $P^{FPT}_0 + P^{FPT}(\ddot{a}_x - 1) = P\,\ddot{a}_x$, where $P$ is the level net premium. The extra first-year allowance is therefore $P^{FPT} - P^{FPT}_0 = (P^{FPT} - P)\,\ddot{a}_x$, which is paid back through higher renewal net premiums.
- **Size:** When mortality rises with age, $P^{FPT} > P$, so the FPT policy value is below the net premium policy value at every duration. Like the gross premium policy value, which allows for expenses directly, it is lower because it makes room for the initial expenses.

> [!example]- Full Preliminary Term Premiums and Policy Values {Example}
> A fully discrete whole life insurance of \$100,000 is issued to $(40)$. On the SULT at $5\%$, $q_{40} = 0.0005272$, $A_{40} = 0.121059$, $\ddot{a}_{40} = 18.45776$, $A_{41} = 0.126652$, $\ddot{a}_{41} = 18.34031$ and $\ddot{a}_{50} = 17.02453$. Find the FPT premiums, then compare ${}_{10}V^{FPT}$ with the net premium policy value ${}_{10}V$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P^{FPT}_0 &= \frac{100{,}000(0.0005272)}{1.05} \\
> > &= 50.21 \\
> > P^{FPT} &= \frac{12{,}665.2}{18.34031} \\
> > &= 690.57 \\
> > P &= \frac{12{,}105.9}{18.45776} \\
> > &= 655.87
> > \end{align*}
> > $$
> > For whole life, a net premium policy value is $S\left(1 - \ddot{a}_{x+t}/\ddot{a}_x\right)$, and the FPT value uses the policy issued at 41.
> > $$
> > \begin{align*}
> > {}_{10}V^{FPT} &= 100{,}000\left(1 - \frac{17.02453}{18.34031}\right) \\
> > &= 7{,}174.25 \\
> > {}_{10}V &= 100{,}000\left(1 - \frac{17.02453}{18.45776}\right) \\
> > &= 7{,}764.92
> > \end{align*}
> > $$
> > The FPT policy value is about \$590 lower. The difference is $(P^{FPT} - P)\,\ddot{a}_{50}$, the part of the first-year expense allowance that the higher renewal net premiums have not yet repaid.

> [!example]- First-Year Strain Under Net Premium and FPT Policy Values {Example}
> For the same policy, the gross premium is \$800 and the insurer pays expenses of \$600 at issue. On the SULT, the net premium policy value at the end of the first year is ${}_1V = 636.28$. Find the insurer's expected profit for the first year per policy issued, holding the net premium policy value and then the FPT policy value at the end of the year.
>
> > [!answer]-
> > The amount invested for the year is $800 - 600 = 200$. Each surviving policy needs the end-of-year policy value, and $p_{40} = 0.9994728$.
> > $$
> > \begin{align*}
> > \text{Net premium:}\ & 200(1.05) - 100{,}000(0.0005272) - 0.9994728(636.28) \\
> > &= 210 - 52.72 - 635.94 \\
> > &= -478.66 \\
> > \text{FPT:}\ & 210 - 52.72 - 0.9994728(0) \\
> > &= 157.28
> > \end{align*}
> > $$
> > Holding the net premium policy value produces a first-year loss of \$479 per policy, which the insurer must fund from its capital. The FPT policy value is zero at time 1, so the first year shows a profit, and the policy value is built up instead from the higher renewal net premiums.

> [!tip]- How it appears on the exam
> - **FAM** asks for modified net premium policy values alongside gross premium and net premium policy values for whole life, term and endowment insurance. A question can give the FPT definition and life table values and ask for ${}_tV^{FPT}$, the FPT renewal premium, or the difference from the net premium policy value.
> - **Interpretation:** A question may ask why the FPT value is smaller than the net premium value, or which of the three policy values is closest to what the insurer actually needs once expenses are counted.

> [!warning]- Exam traps
> - **The shift in age and term:** ${}_tV^{FPT}$ for a policy issued at $x$ is the net premium policy value at duration $t-1$ for a policy issued at $x+1$. Using duration $t$, or keeping the original term $n$ instead of $n-1$, gives the wrong annuity factor.
> - **The first-year premium:** For an annual death benefit paid at the end of the year, $P^{FPT}_0 = S\,v\,q_x$. Using $S\,q_x$ forgets the discounting, and a policy that pays at the moment of death needs $S\,\bar{A}^{\,1}_{x:\overline{1}|}$ instead.
> - **Policy value at time 1:** ${}_1V^{FPT}$ is zero because the first year's net premium pays only for that year's cover. A nonzero answer at time 1 means the renewal premium was used in the first year.
