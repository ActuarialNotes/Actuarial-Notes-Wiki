---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:27f76b4d1477e0d9a4da0a1fac3c73ec6be8a923ccf307e3a3d8d125e59ed945
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Future Loss Random Variable.md
---

**The Future Loss Random Variable** ${}_tL$ of a long-term insurance or annuity is the present value, at time $t$, of the insurer's future outgo less the present value of its future premium income, for a policy still in force at $t$. At issue it is written $L_0$. The net loss counts benefits and net premiums, and the gross loss adds expenses and uses the gross premium. Under the [[Equivalence Principle|equivalence principle]] $E[L_0] = 0$, and at a later time the expected future loss is the [[Policy Value|policy value]] ${}_tV$ (Dickson, Hardy & Waters, chapters 6–7).

> $$L_0 = S\,v^{K_x+1} - P\,\ddot{a}_{\overline{K_x+1}|}$$

> $$L_0 = \left(S + \frac{P}{d}\right)v^{K_x+1} - \frac{P}{d}$$

> $$\text{Var}(L_0) = \left(S + \frac{P}{d}\right)^2\left({}^2A_x - A_x^2\right)$$

> $$E\left[{}_tL \mid T_x > t\right] = {}_tV$$

- **Symbols:** The blocks are for a fully discrete [[Whole Life Insurance|whole life]] insurance on $(x)$ with sum insured $S$ and annual premium $P$. The second block uses $\ddot{a}_{\overline{k}|} = (1 - v^k)/d$, which makes the loss a linear function of the single variable $v^{K_x+1}$. At time $t$, ${}_tL$ has the same form with $K_{x+t}$ in place of $K_x$.
- **Other policies:** For an $n$-year [[Endowment Insurance|endowment insurance]], replace $K_x + 1$ by $\min(K_x+1, n)$ throughout, and the variance uses ${}^2A_{x:\overline{n}|} - A_{x:\overline{n}|}^2$. A fully continuous whole life has $L_0 = \left(S + P/\delta\right)e^{-\delta T_x} - P/\delta$. For an $n$-year [[Term Life Insurance|term insurance]], $L_0 = S\,v^{K_x+1}\,\mathbb{1}\{K_x < n\} - P\,\ddot{a}_{\overline{\min(K_x+1,\,n)}|}$, which is not linear in one variable, so its variance has no such shortcut. An annuity of $B$ a year bought for a single premium $G$ has $L_0 = B\,\ddot{a}_{\overline{K_x+1}|} - G$.
- **With the equivalence premium:** Setting $P = S A_x/\ddot{a}_x$ gives $L_0 = \left(S + P/d\right)\left(v^{K_x+1} - A_x\right)$. The insurer loses money exactly when the benefit's present value exceeds its EPV, which means when the life dies early.

> [!example]- Loss Distribution of an Endowment Insurance {Example}
> The fully discrete 20-year endowment insurance of \$100,000 on $(45)$ in [[Endowment Insurance]] has net premium $P = 2{,}966.62$. On the SULT at $5\%$, $A_{45:\overline{20}|} = 0.38385$, ${}^2A_{45:\overline{20}|} = 0.14937$ and ${}_{19}p_{45} = 0.96010$. Find the standard deviation of $L_0$ and $\Pr(L_0 > 0)$.
>
> > [!answer]-
> > Here $P/d = 2{,}966.62(21) = 62{,}299.02$.
> > $$
> > \begin{align*}
> > \text{Var}(Z) &= 0.14937 - 0.38385^2 \\
> > &= 0.0020292 \\
> > \text{SD}(L_0) &= (162{,}299.02)\sqrt{0.0020292} \\
> > &= 162{,}299.02(0.045046) \\
> > &= 7{,}311
> > \end{align*}
> > $$
> > The loss is positive when $v^{\min(K+1,\,20)} > 62{,}299.02/162{,}299.02 = 0.38385$, the EPV itself.
> > $$
> > \begin{align*}
> > \min(K+1, 20) &< \frac{-\ln 0.38385}{\ln 1.05} \\
> > &= 19.62 \\
> > \Pr(L_0 > 0) &= \Pr(K_{45} \le 18) \\
> > &= 1 - 0.96010 \\
> > &= 0.03990
> > \end{align*}
> > $$
> > The insurer loses only if the insured dies in the first 19 years. A death in year 20 is paid at the same time as the maturity benefit, so it costs no more.

> [!example]- The Loss at Time 10 on a Whole Life Policy {Example}
> The fully discrete whole life insurance of \$100,000 on $(50)$ in [[Equivalence Principle]] has net premium $P = 1{,}111.99$. On the SULT at $5\%$, $A_{60} = 0.29028$, ${}^2A_{60} = 0.10834$ and $\ddot{a}_{60} = 14.9041$. Given that the policy is in force at time 10, find the mean and standard deviation of ${}_{10}L$, valued just before the premium then due.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E\left[{}_{10}L\right] &= 100{,}000(0.29028) - 1{,}111.99(14.9041) \\
> > &= 29{,}028 - 16{,}573.21 \\
> > &= 12{,}454.79 \\
> > \text{SD}\left({}_{10}L\right) &= (100{,}000 + 21P)\sqrt{0.10834 - 0.29028^2} \\
> > &= 123{,}351.79(0.155169) \\
> > &= 19{,}140
> > \end{align*}
> > $$
> > The mean is the net premium policy value ${}_{10}V$, which also equals $100{,}000\left(1 - \ddot{a}_{60}/\ddot{a}_{50}\right)$. At issue the loss had a mean of zero and a standard deviation of \$15,229. Ten years later the expected future loss is positive, and its standard deviation is larger than at issue.

> [!example]- A Term Insurance Loss Has No Shortcut {Example}
> A fully discrete 2-year term insurance of \$100,000 on $(70)$ has net premium $P = 1{,}049.80$, from the SULT values $q_{70} = 0.010413$ and $q_{71} = 0.011670$ at $5\%$. Find the standard deviation of $L_0$.
>
> > [!answer]-
> > $L_0$ takes three values: death in year 1, death in year 2, or survival to the end of the term.
> > $$
> > \begin{align*}
> > 100{,}000v - P &= 94{,}188.30 \\
> > 100{,}000v^2 - P(1 + v) &= 88{,}653.34 \\
> > -P(1 + v) &= -2{,}049.61
> > \end{align*}
> > $$
> > Their probabilities are $0.010413$, $0.989587(0.011670) = 0.011548$ and $0.978039$. Since $E[L_0] = 0$, the variance is the second moment.
> > $$
> > \begin{align*}
> > E\left[L_0^2\right] &= 0.010413(94{,}188.30)^2 + 0.011548(88{,}653.34)^2 \\
> > &\quad + 0.978039(2{,}049.61)^2 \\
> > &= 187{,}247{,}428 \\
> > \text{SD}(L_0) &= 13{,}684
> > \end{align*}
> > $$
> > The whole life formula $(S + P/d)\sqrt{{}^2A^{1} - (A^{1})^2}$ would give \$16,613. It is wrong here, because the premiums stop at the end of the term whether or not the life is alive.

> [!tip]- How it appears on the exam
> - **FAM** asks candidates to identify the future loss random variable for whole life, term life and endowment insurance and for term and whole life annuities on a single life, net or gross, and with annual or continuous premiums.
> - **Moments and probabilities:** A question can ask for $E[L_0]$ at a given premium, $\text{Var}(L_0)$ by the $(S + P/d)^2$ shortcut, or $\Pr(L_0 > 0)$ by turning the loss into a condition on $K_x$ or $T_x$.
> - **Premiums and policy values:** The loss is the starting point for the equivalence principle and for the [[Portfolio Percentile Principle|portfolio percentile principle]], which needs $E[L_0]$ and $\text{SD}(L_0)$ as functions of $P$. FAM's policy values are $E[{}_tL]$ for a policy in force, so the same random variable returns after issue.

> [!warning]- Exam traps
> - **Forgetting the premium in the variance:** $\text{Var}(L_0)$ scales by $(S + P/d)^2$, not $S^2$. Leaving out $P/d$ gives the variance of the benefit alone, which is too small.
> - **$d$ or $\delta$:** Annual premiums use $P/d$, and continuous premiums use $P/\delta$, with ${}^2\bar{A}$ and $\bar{A}$ in the variance. Using $d$ where $\delta$ belongs changes $P/d$ by about $2.5\%$ at $5\%$ interest.
> - **The shortcut for term insurance:** The formula $(S + P/d)^2({}^2A - A^2)$ holds only when the benefit and the premium annuity end at the same time. For term insurance, work from the distribution of $L_0$ or include the covariance.
> - **The direction of $\Pr(L_0 > 0)$:** The loss is positive when the present value of the benefit is large, which happens when death is early. Solving $v^{K+1} > c$ gives an upper limit on $K$, and the answer is a death probability ${}_mq_x$, not a survival probability.
