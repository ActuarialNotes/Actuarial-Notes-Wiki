---
aliases:
  - Policy Value Calculation Process
  - Gross Premium
  - Net Premium
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eee1318ba012449336f9ce272d068b21b92214e0d58c8ce6a776df388b8649c7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policy Value.md
---

**Policy Value** ${}_tV$ is the amount an insurer needs at time $t$ for a long-term insurance or annuity policy still in force: the expected present value (EPV) at $t$ of the future benefits and expenses, less the EPV of the future premiums, on a stated basis. It is the long-term form of a [[Reserve|reserve]], and its continuous-time version is governed by [[Thiele's Differential Equation|Thiele's differential equation]].

> $${}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})$$

> $$\begin{aligned} \left({}_tV + P_t - e_t\right)(1+i_t) = {} & q_{x+t}\left(S_{t+1} + E_{t+1}\right) \\ & + p_{x+t}\,{}_{t+1}V \end{aligned}$$

> $${}_tV = \frac{\text{EPV}_0(\text{premiums in } [0,t)) - \text{EPV}_0(\text{outgo in } [0,t))}{{}_tE_x}$$

- **Gross and net premium:** The gross premium is the premium actually charged, with loadings for expenses and profit. The gross premium policy value uses that premium and the expenses it pays for. The net premium is the [[Equivalence Principle|equivalence principle]] premium for the benefits alone, computed on the valuation basis, and the net premium policy value uses it with no expenses at all. A [[Modified Net Premium Policy Value|modified net premium policy value]] changes the net premium pattern to allow for initial expenses.
- **Recursion:** In the second block (AMLCR chapter 7 notation), $P_t$ and $e_t$ are the premium and premium-related expense at the start of year $t+1$, $S_{t+1}$ is the death benefit, $E_{t+1}$ is the expense of paying it, and $i_t$ is the interest rate earned in the year. The amount held after the premium is paid, rolled up with interest, pays the expected claims and funds the policy value for the survivors.
- **Retrospective form:** The third block accumulates past premiums less past benefits and expenses with interest and survivorship. It equals the prospective value only when the premium was set by the equivalence principle and the same basis is used for both, which is why the policy value is defined prospectively.
- **Between premium dates:** For $0 < s < 1$ the exact value comes from the same argument over a part year. It is ${}_{t+s}V = v^{1-s}[{}_{1-s}q_{x+t+s}(S_{t+1} + E_{t+1}) + {}_{1-s}p_{x+t+s}\,{}_{t+1}V]$, and linear interpolation between ${}_tV + P_t - e_t$ and ${}_{t+1}V$ is the usual approximation.
- **Several states:** In a [[Multiple State Model|multiple state model]] or on [[Joint Life|joint lives]], a policy value ${}_tV^{(i)}$ is defined for each state $i$ the policy can be in, and the formulas apply state by state.

> [!example]- Prospective and Retrospective Net Premium Policy Values {Example}
> A fully discrete 20-year endowment insurance of \$100,000 on $(40)$ has a level net premium. On the SULT at $5\%$, $A_{40:\overline{20}|} = 0.381263$, $\ddot{a}_{40:\overline{20}|} = 12.99348$, $A_{50:\overline{10}|} = 0.616428$, $\ddot{a}_{50:\overline{10}|} = 8.05500$, $\ddot{a}_{40:\overline{10}|} = 8.08633$, $A^1_{40:\overline{10}|} = 0.005732$ and ${}_{10}E_{40} = 0.609205$. Find the net premium, then ${}_{10}V$ just before the eleventh premium, both prospectively and retrospectively.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P &= \frac{100{,}000\,A_{40:\overline{20}|}}{\ddot{a}_{40:\overline{20}|}} \\
> > &= \frac{38{,}126.30}{12.99348} \\
> > &= 2{,}934.26 \\
> > {}_{10}V &= 100{,}000\,A_{50:\overline{10}|} - P\,\ddot{a}_{50:\overline{10}|} \\
> > &= 61{,}642.80 - 23{,}635.46 \\
> > &= 38{,}007.34 \\
> > {}_{10}V &= \frac{P\,\ddot{a}_{40:\overline{10}|} - 100{,}000\,A^1_{40:\overline{10}|}}{{}_{10}E_{40}} \\
> > &= \frac{23{,}727.39 - 573.20}{0.609205} \\
> > &= 38{,}007.23
> > \end{align*}
> > $$
> > Both methods give \$38,007, and the 11 cents between them comes from rounding the table values. The policy value is large because the endowment must pay \$100,000 at age 60 even if the insured survives.

> [!example]- Gross Premium Policy Value by Recursion and Between Premium Dates {Example}
> For the same endowment, the gross premium is \$3,165.78 a year. Renewal expenses are $3\%$ of each premium plus \$25, and a claim expense of \$200 is paid with the death benefit. On the SULT at $5\%$, the gross premium policy value just before the premium at time 10 is ${}_{10}V = 37{,}111.78$, with $q_{50} = 0.0012085$ and ${}_{0.5}q_{50.5} = 0.000619$. Find ${}_{11}V$ by the recursion, then ${}_{10.5}V$ exactly and by linear interpolation.
>
> > [!answer]-
> > The expense at time 10 is $e_{10} = 0.03(3{,}165.78) + 25 = 119.97$.
> > $$
> > \begin{align*}
> > (37{,}111.78 + 3{,}165.78 - 119.97)(1.05) &= 42{,}165.47 \\
> > 42{,}165.47 &= 0.0012085(100{,}200) + 0.9987915\,{}_{11}V \\
> > {}_{11}V &= \frac{42{,}165.47 - 121.09}{0.9987915} \\
> > &= 42{,}095.25 \\
> > {}_{10.5}V &= 1.05^{-0.5}\left[0.000619(100{,}200) + 0.999381(42{,}095.25)\right] \\
> > &= 0.975900(62.02 + 42{,}069.19) \\
> > &= 41{,}115.85
> > \end{align*}
> > $$
> > Linear interpolation gives $0.5(40{,}157.59) + 0.5(42{,}095.25) = 41{,}126.42$, which is about \$11 too high. Interest compounds over the half year, so the true value at mid-year lies a little below the straight line between the two ends. The gross premium policy value is below the net premium policy value of the first example at the same duration, because the future loadings in the gross premium still have to repay the initial expenses.

> [!example]- Policy Values by State for a Last-Survivor Policy {Example}
> The last-survivor example in [[Equivalence Principle]] has independent lives $(x)$ and $(y)$ with constant forces of mortality $0.02$ and $0.03$, and $\delta = 0.05$. A last-survivor insurance of \$100,000 is bought with premiums of \$1,607.14 a year, paid continuously while both are alive, and $\bar{A}_{\overline{xy}} = 0.160714$ and $\bar{a}_{xy} = 10$. Find the policy value at time $t$ if both lives are alive, if only $(x)$ is alive, and if only $(y)$ is alive.
>
> > [!answer]-
> > With constant forces, the future looks the same at every duration, so the both-alive value is the issue value. Once one life has died, no premiums remain and the survivor's whole life insurance is all that is left.
> > $$
> > \begin{align*}
> > {}_tV^{(0)} &= 100{,}000(0.160714) - 1{,}607.14(10) \\
> > &= 0 \\
> > {}_tV^{(x \text{ only})} &= 100{,}000\left(\frac{0.02}{0.02 + 0.05}\right) \\
> > &= 28{,}571.43 \\
> > {}_tV^{(y \text{ only})} &= 100{,}000\left(\frac{0.03}{0.03 + 0.05}\right) \\
> > &= 37{,}500.00
> > \end{align*}
> > $$
> > The first death moves the policy into a state with a much larger policy value. That jump is the cost of the first death to the insurer, even though no benefit is paid at that time.

> [!tip]- How it appears on the exam
> - **FAM** asks for gross premium, net premium and modified net premium policy values for whole life, term and endowment insurance and for annuities, from a life table or a parametric survival model. A question may run the recursion for a year, or ask for a policy value between premium dates.
> - **FAM** also asks how a change of basis, such as heavier mortality or a lower interest rate, changes a policy value, because the topic's objectives name the effect of changes in assumptions.
> - **ALTAM** asks for policy values on joint lives and for state-dependent life insurance, long-term [[Health Insurance|health insurance]] and [[Continuing Care Retirement Community|CCRC]] contracts, one value for each state. A policy value question can lead into Thiele's equation or a [[Profit Testing|profit test]].

> [!warning]- Exam traps
> - **Before or after the premium:** "Just before" the premium at time $t$ counts that premium as future income, and "just after" does not. The two answers differ by $P_t - e_t$.
> - **Net premium on the wrong basis:** A net premium policy value uses the net premium recalculated on the valuation basis. Using the gross premium, or a net premium from another basis, gives a value that is neither net nor gross.
> - **Retrospective on a different basis:** The retrospective formula equals the prospective value only when the premium satisfies the equivalence principle on the basis being used. When the bases differ, a question that asks for the policy value wants the prospective one.
> - **Claim expense in the recursion:** The death benefit in the recursion is $S_{t+1} + E_{t+1}$. Leaving out a claim expense that the question states makes ${}_{t+1}V$ too large.
