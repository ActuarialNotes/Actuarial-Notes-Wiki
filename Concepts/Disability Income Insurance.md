---
aliases:
  - Disability Income
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5c7b61b2e1394409c58e3c4419bf5b5a99a5315f90fb4119c32e037bf6c598b4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Disability Income Insurance.md
---
**Disability Income Insurance** replaces part of a person's earned income while sickness or injury keeps the insured from working. Benefits start after an elimination period and continue while the insured stays disabled, up to the end of a maximum benefit period. Group short-term disability (STD) pays for weeks or months, group long-term disability (LTD) can pay to retirement age, and individual disability income is sold to individuals, often professionals. It is priced and reserved with a [[Multiple State Model|healthy-disabled-dead model]]: how often members become disabled (incidence) and how long claims last (termination).

> $$B = \max\Big(\min(p\,W,\ B_{\max}) - O,\ B_{\min}\Big)$$

> $$C_x = i_x \times B \sum_{t=0}^{n-1} v^{t}\,{}_tp^{\,d}_{[x]}$$

> $$\text{DLR}_s = B \sum_{t=0}^{n-s-1} v^{t}\,\frac{{}_{s+t}p^{\,d}_{[x]}}{{}_sp^{\,d}_{[x]}}$$

- **Symbols:** $W$ is pre-disability earnings, $p$ the benefit percentage, $B_{\max}$ and $B_{\min}$ the maximum and minimum benefits, and $O$ the offsets for other disability income, so $B$ is the benefit in the design shown, which applies the maximum before the offsets. $i_x$ is the incidence rate for a life aged $x$, ${}_tp^{\,d}_{[x]}$ is the probability that a claim beginning at age $x$ is still open $t$ periods later, and $n$ is the number of payments in the benefit period. $C_x$ is the expected claim cost per life per year, and $\text{DLR}_s$ is the disabled life reserve on a claim that has been open for $s$ periods.
- **Elimination and benefit periods:** The elimination period is the time a claimant must be disabled before benefits start, and the benefit period is the longest they are paid. STD has a short elimination period and pays for weeks or months, while LTD typically starts after STD ends and pays for years. A longer elimination period removes the many short claims and lowers the premium sharply.
- **Definition of disability:** An own-occupation definition pays when the insured cannot perform the duties of their own job. An any-occupation definition pays only when the insured cannot work in any job suited to their education, training and experience. Many LTD plans use own occupation for an initial period and any occupation after it, which ends some claims at the switch.
- **Benefit percentage and offsets:** Benefits replace well under 100% of earnings, so that a claimant keeps a reason to return to work. LTD benefits are reduced by other disability income, such as Social Security disability benefits in the U.S. and workers compensation. Insurers often help claimants apply for Social Security, because an award reduces the LTD benefit.
- **Incidence and termination:** Incidence rises with age and varies by occupation, sex, salary and the economy, and claims rise when unemployment rises. Termination by recovery or death is fastest in the first months of a claim and slows with duration, so a claim that has lasted two years is expected to last much longer than a new one.
- **Individual disability income:** Individual policies are usually noncancellable or guaranteed renewable, so the premium is set at issue for many years. They often pay residual benefits for partial loss of income, and their long guarantees make them a long-duration contract with active life reserves as well as claim reserves.
- **Moral hazard and other risks:** Disability is partly subjective, especially for mental and musculoskeletal conditions, and a generous replacement ratio or loose definition invites claims. Long claims also expose the insurer to [[Interest Rate Risk|interest rate risk]] and to claim litigation.

> [!example]- LTD Benefits With an Offset and a Maximum {Example}
> An LTD plan pays 60% of monthly earnings to a maximum of \$6,000, less Social Security disability benefits, with a minimum benefit of \$100. Find the LTD benefit and the total replacement ratio for a claimant earning \$8,000 a month who receives \$2,100 from Social Security, and for one earning \$15,000 who receives \$2,900.
>
> > [!answer]-
> > The 60% applies first, then the maximum, then the offset.
> > $$
> > \begin{align*}
> > B_1 &= \min(4{,}800,\ 6{,}000) - 2{,}100 \\
> > &= 2{,}700 \\
> > B_2 &= \min(9{,}000,\ 6{,}000) - 2{,}900 \\
> > &= 3{,}100
> > \end{align*}
> > $$
> > The first claimant's income while disabled is $2{,}700 + 2{,}100 = 4{,}800$, or 60% of earnings. The second receives $3{,}100 + 2{,}900 = 6{,}000$, only 40% of earnings, because the maximum binds. The offset passes most of the Social Security award to the insurer, which is why the insurer helps claimants apply.

> [!example]- Claim Cost and a Disabled Life Reserve {Example}
> An LTD benefit of \$36,000 a year is paid at the start of each year while the claimant is disabled, for at most four payments after the elimination period. The probabilities that a new claim is still open after one, two and three years are 0.65, 0.55 and 0.50. The illustrative incidence rate is 0.004 a year, and $i = 4\%$. Find the expected claim cost per life per year, and the reserve for a claim that has been open for two years, just before its third payment.
>
> > [!answer]-
> > The claim cost is the incidence rate times the present value of a new claim.
> > $$
> > \begin{align*}
> > \text{PV} &= 36{,}000\,(1 + 0.65v + 0.55v^2 + 0.50v^3) \\
> > &= 36{,}000 \times 2.5780 \\
> > &= 92{,}808 \\
> > C &= 0.004 \times 92{,}808 \\
> > &= 371.23
> > \end{align*}
> > $$
> > The claim cost is \$371.23 a year, or \$30.94 a month per insured life. For the open claim, the chance of reaching the last payment is conditional on being open now.
> > $$
> > \begin{align*}
> > \text{DLR}_2 &= 36{,}000\left(1 + \frac{0.50}{0.55}\,v\right) \\
> > &= 36{,}000 \times 1.8741 \\
> > &= 67{,}469
> > \end{align*}
> > $$
> > Using the unconditional 0.50 instead would give \$53,308 and understate the reserve by about \$14,000. A claim that has lasted two years has already shown that it is unlikely to end soon.

> [!tip]- How it appears on the exam
> - **CP-321:** The plan and product provisions objectives ask candidates to describe group and individual disability income contracts, the organizations that offer them and why, and the moral hazard and financial and legal risks each carries, including how U.S. Social Security disability benefits interact with them.
> - **CP-321 pricing and reserving:** Other objectives build on the same contract. They ask for incidence and termination assumptions, a claim cost from them, and claim reserves for open disability claims, which are valued with claim termination rates.

> [!warning]- Exam traps
> - **Unconditional continuance on an open claim:** A reserve for a claim already open for $s$ periods must divide by ${}_sp^{\,d}$. Using the probabilities measured from the start of disability understates the reserve, because long claims are the ones least likely to end.
> - **Order of the maximum and the offsets:** Plans differ on whether the maximum applies before or after the offsets, and the two give different benefits for a high earner. Read the plan's wording rather than assuming one order.
> - **Elimination period and benefit period:** The elimination period delays the first payment, and the benefit period limits how long payments last. A longer elimination period removes many short claims, so its effect on cost is far larger than the few weeks of benefit it removes.
> - **Own occupation versus any occupation:** A plan that switches from own occupation to any occupation will see some claims end at the switch. Termination assumptions that ignore the switch overstate the reserve for claims that are close to it.
