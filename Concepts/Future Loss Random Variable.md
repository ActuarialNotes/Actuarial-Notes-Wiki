---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:0bb4dec10ce1fa7953e63df114a2b56dc7bb575c37cefd9783e7422891458491
  sources:
    - "SOA Exam FAM syllabus, October 2026, Topic 10 learning outcomes a-e, p.7; readings p.8, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "E. Valdez, STT 456 Premium Calculation lecture slides (Michigan State, Spring 2015), after Dickson et al. ch.6, slides 4-8, 16, 18, sha256:7b4af6694606f8ee6a4ad037032100e510c0f7d382d2f47d6f85044cff02cc98 — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks1to2-S2015.pdf"
    - "E. Valdez, STT 456 Policy Values lecture slides (Michigan State, Spring 2015), after Dickson et al. ch.7, slides 6-15, 18-23, sha256:3ace4861349a3e83d119f5e4b1490970d1fc3dc70409fc2213e0584b1c255a5f — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks2to4-S2015.pdf"
    - "B. Hartman, Stat 344 Life Contingencies I, Chapter 6: Premiums (BYU lecture notes), slides 3-6, 23-33, sha256:da3f77bfcd709a519f2c4982b1969fa3d62c4ec4b410117ad00dedf510dee5e8 — https://hartman.byu.edu/docs/344Files/Stat344_Chapter6.pdf"
    - "SOA Exam FAM Sample Questions, Topics 7-10 (version Aug 18, 2026), Q6.4, Q6.6, Q6.17, Q7.13, Q7.17, Q7.40 (pp.52-53, 63, 103, 106, 125), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Topics 7-10, Q5.5 p.29; Q6.4 p.35; Q6.6 p.36; Q7.13 p.71; Q7.16-7.17 p.73; Q7.40 p.82, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Tables for Exam FAM, Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Future Loss Random Variable.md
---

The **Future Loss Random Variable** ${}_tL$ of a long-term insurance or annuity is the present value, at time $t$, of the insurer's future outgo less the present value of its future premium income, for a policy still in force at $t$. At issue it is written $L_0$. The net loss counts benefits and net premiums, and the gross loss adds expenses and uses the gross premium.

For a fully discrete [[Whole Life Insurance|whole life]] insurance on $(x)$ with sum insured $S$ and annual premium $P$, the loss at issue is

> $$L_0 = S\,v^{K_x+1} - P\,\ddot{a}_{\overline{K_x+1}|}$$

- $K_x$ is the [[Future Lifetime Random Variable|curtate future lifetime]] of $(x)$, so the benefit is paid at the end of year $K_x + 1$ and premiums are paid at the start of each year up to it.
- $\ddot{a}_{\overline{k}|}$ is the present value of an annuity-certain of 1 a year for $k$ years, paid in advance.

Under the [[Equivalence Principle|equivalence principle]] $E[L_0] = 0$. For a premium set some other way, $E[L_0]$ is the EPV of benefits less the EPV of premiums at that premium.

## The loss as a linear function of $v^{K_x+1}$

Writing $\ddot{a}_{\overline{k}|} = (1 - v^k)/d$ makes the loss a linear function of the single variable $v^{K_x+1}$,

> $$L_0 = \left(S + \frac{P}{d}\right)v^{K_x+1} - \frac{P}{d}$$

so its variance is

> $$\text{Var}(L_0) = \left(S + \frac{P}{d}\right)^2\left({}^2A_x - A_x^2\right)$$

- $A_x = E[v^{K_x+1}]$, and ${}^2A_x$ is the same expectation at double the force of interest.

Policies on the same mortality and interest share $A_x$ and ${}^2A_x$, so the factor ${}^2A_x - A_x^2$ found from one policy applies to another. Setting $P = S A_x/\ddot{a}_x$ gives $L_0 = \left(S + P/d\right)\left(v^{K_x+1} - A_x\right)$. The insurer loses money exactly when the benefit's present value exceeds its EPV, which means when the life dies early. Solving $v^{K+1} > c$ gives an upper limit on $K$, and $\Pr(L_0 > 0)$ is a death probability ${}_mq_x$, not a survival probability.

> [!trap] Forgetting the premium in the variance
> $\text{Var}(L_0)$ scales by $(S + P/d)^2$, not $S^2$. Leaving out $P/d$ gives the variance of the benefit alone, which is too small.

## The loss after issue

At time $t$, ${}_tL$ has the same form with $K_{x+t}$ in place of $K_x$. Its expected value, for a policy in force, is the [[Policy Value|policy value]],

> $$E\left[{}_tL \mid T_x > t\right] = {}_tV$$

> [!example]- What are the mean and standard deviation of ${}_{10}L$ for this whole life policy? {Example}
> The fully discrete whole life insurance of $\$100{,}000$ on $(50)$ in [[Equivalence Principle]] has net premium $P = 1{,}111.99$. On the SULT at $5\%$, $A_{60} = 0.29028$, ${}^2A_{60} = 0.10834$ and $\ddot{a}_{60} = 14.9041$. The policy is in force at time 10, and the loss is valued just before the premium then due.
>
> > [!answer]-
> > - $E\left[{}_{10}L\right] = 100{,}000(0.29028) - 1{,}111.99(14.9041)$.
> > - That is $29{,}028 - 16{,}573.21 = 12{,}454.79$, the net premium policy value ${}_{10}V$, which also equals $100{,}000\left(1 - \ddot{a}_{60}/\ddot{a}_{50}\right)$.
> > - At $5\%$, $1/d = 21$, so $S + P/d = 100{,}000 + 21P = 123{,}351.79$.
> > - $\sqrt{0.10834 - 0.29028^2} = 0.155169$.
> > - $\text{SD}\left({}_{10}L\right) = 123{,}351.79(0.155169) = \$19{,}140$.
> > - At issue the loss had a mean of zero and a standard deviation of $\$15{,}229$, so ten years later both are larger.

## Other policies

For an $n$-year [[Endowment Insurance|endowment insurance]], replace $K_x + 1$ by $\min(K_x+1, n)$ throughout, and the variance uses ${}^2A_{x:\overline{n}|} - A_{x:\overline{n}|}^2$. An annuity of $B$ a year bought for a single premium $G$ has $L_0 = B\,\ddot{a}_{\overline{K_x+1}|} - G$.

A fully continuous whole life has $L_0 = \left(S + P/\delta\right)e^{-\delta T_x} - P/\delta$. Continuous premiums use $P/\delta$ where annual premiums use $P/d$, with ${}^2\bar{A}_x$ and $\bar{A}_x$ in the variance.

For an $n$-year [[Term Life Insurance|term insurance]], $L_0 = S\,v^{K_x+1}\,\mathbb{1}\{K_x < n\} - P\,\ddot{a}_{\overline{\min(K_x+1,\,n)}|}$, which is not linear in one variable, so its variance has no such shortcut. Work from the distribution of $L_0$ instead.

> [!example]- What are the standard deviation of $L_0$ and $\Pr(L_0 > 0)$ for this endowment insurance? {Example}
> The fully discrete 20-year endowment insurance of $\$100{,}000$ on $(45)$ in [[Endowment Insurance]] has net premium $P = 2{,}966.62$. On the SULT at $5\%$, $A_{45:\overline{20}|} = 0.38385$, ${}^2A_{45:\overline{20}|} = 0.14937$ and ${}_{19}p_{45} = 0.96010$.
>
> > [!answer]-
> > - At $5\%$, $1/d = 21$, so $P/d = 2{,}966.62(21) = 62{,}299.02$ and $S + P/d = 162{,}299.02$.
> > - $\text{Var}(Z) = 0.14937 - 0.38385^2 = 0.0020292$, so $\text{SD}(Z) = 0.045046$.
> > - $\text{SD}(L_0) = 162{,}299.02(0.045046) = \$7{,}311$.
> > - The loss is positive when $v^{\min(K+1,\,20)} > 62{,}299.02/162{,}299.02 = 0.38385$, the EPV itself.
> > - That needs $\min(K+1, 20) < -\ln 0.38385/\ln 1.05 = 19.62$, so the insurer loses only if the insured dies in the first 19 years.
> > - A death in year 20 is paid at the same time as the maturity benefit, so it costs no more.
> > - $\Pr(L_0 > 0) = \Pr(K_{45} \le 18) = 1 - 0.96010 = 0.03990$.

> [!example]- What is the standard deviation of $L_0$ for this 2-year term insurance? {Example}
> A fully discrete 2-year term insurance of $\$100{,}000$ on $(70)$ has net premium $P = 1{,}049.80$, from the SULT values $q_{70} = 0.010413$ and $q_{71} = 0.011670$ at $5\%$.
>
> > [!answer]-
> > - $L_0$ takes three values: death in year 1, death in year 2, or survival to the end of the term.
> > - Death in year 1 gives $100{,}000v - P = 94{,}188.30$, with probability $0.010413$.
> > - Death in year 2 gives $100{,}000v^2 - P(1 + v) = 88{,}653.34$, with probability $0.989587(0.011670) = 0.011548$.
> > - Survival gives $-P(1 + v) = -2{,}049.61$, with probability $0.978039$.
> > - Since $E[L_0] = 0$, the variance is the second moment, $0.010413(94{,}188.30)^2 + 0.011548(88{,}653.34)^2 + 0.978039(2{,}049.61)^2$.
> > - That is $187{,}247{,}428$, so $\text{SD}(L_0) = \$13{,}684$.
> > - The whole life formula $(S + P/d)\sqrt{{}^2A^{1} - (A^{1})^2}$ would give $\$16{,}613$. It is wrong here, because the premiums stop at the end of the term whether or not the life is alive.
