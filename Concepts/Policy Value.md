---
aliases:
  - Policy Value Calculation Process
  - Gross Premium
  - Net Premium
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:82a0e9be95eaac431daae657137762a9180c7109fc370a45ff6f27790226fc2b
  sources:
    - "B. Hartman, Stat 344 Life Contingencies I, Chapter 7: Policy values / Reserves (BYU lecture notes), slides 13, 19-20, sha256:4a7db0e5fc0d829fd275b0e3f1de1f45217199b6e9722b8ee60252ee57c38785 — https://hartman.byu.edu/docs/344Files/Stat344_Chapter7.pdf"
    - "E. Valdez, STT 456 Policy Values lecture slides (Michigan State, Spring 2015), slides 22, 25-26, sha256:3ace4861349a3e83d119f5e4b1490970d1fc3dc70409fc2213e0584b1c255a5f — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks2to4-S2015.pdf"
    - "SOA Exam FAM Sample Solutions, Topics 7-10 (version Aug 18, 2026), Q7.6 pp.67-68; Q7.10 p.70; Q7.26 p.77; Q7.31 p.80; Q7.36 p.81, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Sample Questions, Topics 7-10 (version Aug 18, 2026), Q7.26 p.115; Q1.1-1.2 p.3, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Tables for Exam FAM, Standard Ultimate Life Table p.20 (x = 40, 45), sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policy Value.md
---

A **Policy Value** ${}_tV$ is the amount an insurer needs at time $t$ for a long-term insurance or annuity policy still in force: the expected present value (EPV) at $t$ of the future benefits and expenses, less the EPV of the future premiums, on a stated basis. It is the long-term form of a [[Reserve|reserve]]. The prospective policy value is

> $${}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})$$

The values at time $t$ use the attained age $x+t$ and the remaining term. In a [[Multiple State Model|multiple state model]] or on [[Joint Life|joint lives]], a policy value ${}_tV^{(i)}$ is defined for each state $i$ the policy can be in, and the formulas apply state by state. The continuous-time version is governed by [[Thiele's Differential Equation|Thiele's differential equation]].

## Gross and net premium policy values

The gross premium is the premium actually charged, with loadings for expenses and profit. The gross premium policy value uses that premium and the expenses it pays for. The net premium is the [[Equivalence Principle|equivalence principle]] premium for the benefits alone, computed on the valuation basis, and the net premium policy value uses it with no expenses at all. For a fully discrete whole life insurance of $S$ with net premium $P$, the net premium policy value is

> $${}_tV = S A_{x+t} - P\ddot{a}_{x+t}$$

A [[Modified Net Premium Policy Value|modified net premium policy value]] changes the net premium pattern to allow for initial expenses.

## The recursion

For a fully discrete policy, the policy value at $t$ and the policy value at $t+1$ are related by

> $$\begin{aligned} \left({}_tV + P_t - e_t\right)(1+i_t) = {} & q_{x+t}\left(S_{t+1} + E_{t+1}\right) \\ & + p_{x+t}\,{}_{t+1}V \end{aligned}$$

- $P_t$ and $e_t$ are the premium and the premium-related expense at the start of year $t+1$.
- $S_{t+1}$ is the death benefit and $E_{t+1}$ the expense of paying it, both paid at the end of the year of death.
- $i_t$ is the interest rate earned in the year.

The amount held after the premium is paid, rolled up with interest, pays the expected claims and funds the policy value for the survivors.

The recursion can also be written with the net amount at risk, $S_{t+1} + E_{t+1} - {}_{t+1}V$, also called the death strain at risk:

> $$({}_tV + P_t - e_t)(1+i_t) = {}_{t+1}V + q_{x+t}\left(S_{t+1} + E_{t+1} - {}_{t+1}V\right)$$

When the death benefit is a fixed amount $b$ plus the end-of-year policy value and no claim expense is paid, the net amount at risk is just $b$.

A policy value depends only on the future, so a change to the assumptions for year $t+1$ alone, such as $q_{x+t}$ replaced by $q'_{x+t}$, leaves ${}_{t+1}V$ and every later policy value unchanged. Subtracting the recursions for that year under the two bases gives ${}_tV' - {}_tV = v\,(q'_{x+t} - q_{x+t})(S_{t+1} + E_{t+1} - {}_{t+1}V)$. Earlier policy values move too, since each depends on the one after it.

## Policy values between premium dates

For $0 < s < 1$, no premium is paid between $t$ and $t+1$, so the exact policy value at $t+s$ is

> $${}_{t+s}V = v^{1-s}\left[{}_{1-s}q_{x+t+s}(S_{t+1} + E_{t+1}) + {}_{1-s}p_{x+t+s}\,{}_{t+1}V\right]$$

Linear interpolation between ${}_tV + P_t - e_t$ and ${}_{t+1}V$ is close, but a little too high, because interest compounds over the part year.

> [!example]- What are ${}_{11}V$ by the recursion and ${}_{10.5}V$ for this gross premium endowment? {Example}
> A fully discrete 20-year endowment insurance of $\$100{,}000$ on $(40)$ has a gross premium of $\$3{,}165.78$. Renewal expenses are $3\%$ of each premium plus $\$25$, and a claim expense of $\$200$ is paid with the death benefit. On the SULT at $5\%$, the gross premium policy value just before the premium at time 10 is ${}_{10}V = 37{,}111.78$, with $q_{50} = 0.0012085$ and ${}_{0.5}q_{50.5} = 0.000619$.
>
> > [!answer]-
> > - The expense at time 10 is $e_{10} = 0.03(3{,}165.78) + 25 = 119.97$.
> > - The amount held, with interest, is $(37{,}111.78 + 3{,}165.78 - 119.97)(1.05) = 42{,}165.47$.
> > - The expected death cost is $0.0012085(100{,}200) = 121.09$, so ${}_{11}V = (42{,}165.47 - 121.09)/0.9987915 = 42{,}095.25$.
> > - Half a year before time 11, ${}_{10.5}V = 1.05^{-0.5}\left[0.000619(100{,}200) + 0.999381(42{,}095.25)\right]$.
> > - That is $0.975900(62.02 + 42{,}069.19) = 41{,}115.85$.
> > - Linear interpolation gives $0.5(40{,}157.59) + 0.5(42{,}095.25) = 41{,}126.42$, about $\$11$ too high.

## Retrospective policy value

Accumulating past premiums less past benefits and expenses with interest and survivorship, the retrospective policy value is

> $${}_tV = \frac{\text{EPV}_0(\text{premiums in } [0,t)) - \text{EPV}_0(\text{outgo in } [0,t))}{{}_tE_x}$$

- ${}_tE_x$ is the [[Pure Endowment|pure endowment]] factor $v^t\,{}_tp_x$.

It equals the prospective value only when the premium was set by the equivalence principle and the same basis is used for both. When the bases differ, the policy value is the prospective one.

> [!example]- What are the net premium and ${}_{10}V$, prospectively and retrospectively, for this endowment insurance? {Example}
> A fully discrete 20-year endowment insurance of $\$100{,}000$ on $(40)$ has a level net premium. On the SULT at $5\%$, $A_{40:\overline{20}|} = 0.381263$, $\ddot{a}_{40:\overline{20}|} = 12.99348$, $A_{50:\overline{10}|} = 0.616428$, $\ddot{a}_{50:\overline{10}|} = 8.05500$, $\ddot{a}_{40:\overline{10}|} = 8.08633$, $A^1_{40:\overline{10}|} = 0.005732$ and ${}_{10}E_{40} = 0.609205$. ${}_{10}V$ is just before the eleventh premium.
>
> > [!answer]-
> > - $P = 100{,}000\,A_{40:\overline{20}|}/\ddot{a}_{40:\overline{20}|} = 38{,}126.30/12.99348 = 2{,}934.26$.
> > - Prospectively, ${}_{10}V = 100{,}000\,A_{50:\overline{10}|} - P\,\ddot{a}_{50:\overline{10}|} = 61{,}642.80 - 23{,}635.46 = 38{,}007.34$.
> > - Retrospectively, ${}_{10}V = (P\,\ddot{a}_{40:\overline{10}|} - 100{,}000\,A^1_{40:\overline{10}|})/{}_{10}E_{40}$.
> > - That is $(23{,}727.39 - 573.20)/0.609205 = 38{,}007.23$.
> > - Both give $\$38{,}007$. The 11 cents between them come from rounding the table values.

## Expense policy value

The expense premium, or expense loading, is the gross premium less the net premium, $P^e = G - P$. The expense policy value ${}_tV^e$ is the EPV at $t$ of future expenses less the EPV of future expense premiums. When the gross premium is the equivalence principle premium and both policy values use the same basis, the gross premium policy value is

> $${}_tV^g = {}_tV^n + {}_tV^e$$

Applying the equivalence principle to the expenses alone, the level expense premium is the EPV at issue of all the expenses, initial and renewal, divided by the premium annuity factor, $\ddot{a}_{x:\overline{n}|}$ or $\ddot{a}_x$.

Expenses that are level throughout create no expense policy value. Because the loadings are level and expenses are typically incurred disproportionately at the start of the policy, the expense policy value is typically negative at positive durations. This negative amount is often called the deferred acquisition cost (DAC), especially in the U.S. At a duration $t \ge 1$, if the expense at each remaining premium date is $e$ and nothing is paid on a claim, ${}_tV^e = (e - P^e)\,\ddot{a}_{x+t:\overline{n-t}|}$.

> [!example]- What are the expense premium and ${}_5V^e$ for this whole life insurance? {Example}
> A fully discrete whole life insurance of $\$100{,}000$ on $(40)$ has expenses of $\$500$ at issue, $\$50$ at the start of each renewal year, $2\%$ of every premium, and $\$100$ paid with the death benefit. On the SULT at $5\%$, $A_{40} = 0.12106$, $\ddot{a}_{40} = 18.4578$, $A_{45} = 0.15161$ and $\ddot{a}_{45} = 17.8162$.
>
> > [!answer]-
> > - The net premium is $P = 100{,}000(0.12106)/18.4578 = 655.87$, and the equivalence principle gives the gross premium $G = 745.83$.
> > - The EPV of the expenses is $100A_{40} + 500 + 50(\ddot{a}_{40} - 1) + 0.02G\,\ddot{a}_{40} = 12.11 + 500 + 872.89 + 275.33 = 1{,}660.33$.
> > - So $P^e = 1{,}660.33/18.4578 = 89.95$, which equals $G - P = 89.96$ to rounding.
> > - At time 5, ${}_5V^e = 100A_{45} + (50 + 0.02G - P^e)\,\ddot{a}_{45} = 15.16 + (-25.035)(17.8162) = -430.9$.
> > - As a check, ${}_5V^n = 3{,}475.8$ and ${}_5V^g = 3{,}044.9$, whose difference is $-430.9$.
> > - The expense policy value is negative because $\$450$ of the $\$500$ issue expense is above the renewal level, and the loadings still have to repay it.

> [!trap] Just before or just after the premium
> "Just before" the premium at time $t$ counts that premium as future income, and "just after" does not. The two policy values differ by $P_t - e_t$.
