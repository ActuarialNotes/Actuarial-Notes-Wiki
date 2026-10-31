---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:ffcb26c8caad4542069fc4b805de9fdccbc203fd6d08e3af23227645ef1a9d69
  sources:
    - "SOA Exam FAM syllabus, October 2026, Topic 10 learning outcomes a-e, p.7; readings p.8, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "B. Hartman, Stat 344 Life Contingencies I, Chapter 7: Policy values / Reserves (BYU lecture notes), slides 9-15, 19-26, sha256:4a7db0e5fc0d829fd275b0e3f1de1f45217199b6e9722b8ee60252ee57c38785 — https://hartman.byu.edu/docs/344Files/Stat344_Chapter7.pdf"
    - "E. Valdez, STT 456 Policy Values lecture slides (Michigan State, Spring 2015), after Dickson et al. ch.7, slides 6-15, 18-23, sha256:3ace4861349a3e83d119f5e4b1490970d1fc3dc70409fc2213e0584b1c255a5f — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks2to4-S2015.pdf"
    - "SOA Exam FAM Sample Questions, Topics 7-10 (version Aug 18, 2026), Q6.4, Q6.6, Q6.17, Q7.13, Q7.17, Q7.40 (pp.52-53, 63, 103, 106, 125), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Topics 7-10, Q5.5 p.29; Q6.4 p.35; Q6.6 p.36; Q7.13 p.71; Q7.16-7.17 p.73; Q7.40 p.82, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Tables for Exam FAM, Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Modified Net Premium Policy Value.md
---

**A Modified Net Premium Policy Value** is a net premium [[Policy Value|policy value]] calculated with net premiums that are not level but follow some other specified pattern; the actual premiums paid are unchanged. One particular method is **full preliminary term** (FPT): the first-year net premium only pays for one year of term cover, and the renewal net premium is that of a policy issued one year older for one year shorter.

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
