---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5f725e33190195307ada440db4f01659cce7733a8a6e58547a6a8f8e808815e0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Equivalence Principle.md
---

**The Equivalence Principle** sets a [[Insurance Premium|premium]] so that the expected present value of the future loss random variable $L_0$ at issue is zero: the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of the expenses when a gross premium is being set. It is the standard premium principle of AMLCR Chapter 6 for [[Whole Life Insurance|insurance]] and [[Life Annuity|annuities]] on single lives, [[Joint Life|joint lives]] and multiple-state models.

> $$E\left[L_0\right] = 0$$

> $$\text{EPV(premiums)} = \text{EPV(benefits)} + \text{EPV(expenses)}$$

> $$L_0 = S\,v^{K_x+1} - P\,\ddot{a}_{\overline{K_x+1}|}$$

- $L_0$ is the present value at issue of the insurer's future outgo less future income. The third block is the net loss for a fully discrete [[Whole Life Insurance|whole life]] policy with sum insured $S$ and annual premium $P$. Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.
- **Net vs gross:** leave expenses out and the result is the **net premium**; include them and it is the **gross premium**. Net premiums are also used inside net premium policy values, on the valuation basis.
- **Variance of the loss:** for whole life, $\text{Var}(L_0) = \left(S + P/d\right)^2\left({}^2\!A_x - A_x^2\right)$. Zero expected loss is not zero risk. The portfolio percentile principle instead chooses $P$ so that the aggregate loss on $N$ policies is negative with a target probability, a [[Percentile|percentile]] of the loss usually found with the [[Normal Distribution|normal]] approximation.
- **State-dependent and joint-life contracts (ALTAM):** the same equation holds. Each EPV is taken over the multiple-state model, or over the joint or last-survivor status, and premiums are valued only while the paying status lasts.

> [!example]- Net Premium and Loss Volatility for Whole Life {Example}
> Using the Standard Ultimate Life Table at $i = 5\%$ ($A_{50} = 0.18931$, ${}^2\!A_{50} = 0.05108$, $\ddot{a}_{50} = 17.0245$), find the net annual premium for a fully discrete whole life insurance of \$100,000 on $(50)$. Then find the standard deviation of $L_0$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P &= \frac{100{,}000\,A_{50}}{\ddot{a}_{50}} \\
> > &= \frac{18{,}931}{17.0245} \\
> > &= 1{,}111.99 \\
> > \text{SD}(L_0) &= \left(100{,}000 + \frac{P}{d}\right)\sqrt{{}^2\!A_{50} - A_{50}^2} \\
> > &= (123{,}351.8)\sqrt{0.015242} \\
> > &= 15{,}229
> > \end{align*}
> > $$
> > The insurer expects to break even, but the loss on a single policy has a standard deviation of about \$15,200.

> [!example]- Gross Premium for a Limited-Pay Policy {Example}
> A whole life policy of \$100,000 on $(45)$ is fully discrete, with premiums payable for at most 20 years. Expenses are 50% of the first premium plus \$250 at issue, then 5% of each later premium plus \$50 at the start of each later premium year. On the SULT at $5\%$, $A_{45} = 0.15161$ and $\ddot{a}_{45:\overline{20}|} = 12.9391$. Find the gross premium $G$.
>
> > [!answer]-
> > Equate the EPV of gross premiums to the EPV of benefits plus expenses. Renewal expenses run over $\ddot{a}_{45:\overline{20}|} - 1$, because the first year carries the initial expense instead.
> > $$
> > \begin{align*}
> > G\,\ddot{a}_{45:\overline{20}|} &= 100{,}000A_{45} + 0.5G + 250 + (0.05G + 50)(\ddot{a}_{45:\overline{20}|} - 1) \\
> > G &= \frac{15{,}161 + 250 + 50(11.9391)}{12.9391 - 0.5 - 0.05(11.9391)} \\
> > &= \frac{16{,}007.96}{11.8421} \\
> > &= 1{,}351.78
> > \end{align*}
> > $$
> > The net premium is $15{,}161/12.9391 = 1{,}171.72$, so expenses load the premium by about \$180 a year.

> [!example]- Last-Survivor Insurance with Joint-Life Premiums {Example}
> Independent lives $(x)$ and $(y)$ have constant forces of mortality $0.02$ and $0.03$, and $\delta = 0.05$. A last-survivor insurance of \$100,000 is paid at the moment of the second death. Premiums are payable continuously while **both** lives survive. Find the annual premium rate.
>
> > [!answer]-
> > The joint life has force $0.05$, so $\bar{A}_{xy} = 0.05/0.10$ and $\bar{a}_{xy} = 1/0.10$.
> > $$
> > \begin{align*}
> > \bar{A}_{\overline{xy}} &= \bar{A}_x + \bar{A}_y - \bar{A}_{xy} \\
> > &= \frac{0.02}{0.07} + \frac{0.03}{0.08} - 0.5 \\
> > &= 0.160714 \\
> > P &= \frac{100{,}000\,\bar{A}_{\overline{xy}}}{\bar{a}_{xy}} \\
> > &= \frac{16{,}071.4}{10} \\
> > &= 1{,}607.14
> > \end{align*}
> > $$
> > Valuing premiums with the last-survivor annuity $\bar{a}_{\overline{xy}} = 16.786$ would give \$957.45. That premium is too small, because no premium is paid after the first death.

> [!tip]- How it appears on the exam
> - **FAM** gives a life table (usually the SULT) or a survival model, a benefit and an expense basis. It asks for the net or gross annual premium by the equivalence principle, often with limited premium terms or a return-of-premium benefit.
> - **FAM** pairs it with the loss random variable: find $E[L_0]$ or $\text{Var}(L_0)$, or contrast it with the portfolio percentile premium for $N$ policies, or with the premium for a given EPV of profit.
> - **ALTAM** applies it to joint-life and last-survivor contracts, and to multiple-state products: disability income, long-term care and CCRCs. The work is building each EPV from transition probabilities, and premiums are payable only in the healthy or both-alive state.
> - The premium found here is often the first step of a policy-value question; see [[Reserve]].

> [!warning]- Exam traps
> - **Wrong premium annuity.** Pricing a 20-pay policy with $\ddot{a}_x$, or a both-alive premium with the last-survivor annuity, understates the premium.
> - **Double-counting first-year expense.** If the initial expense replaces the renewal expense at time 0, renewals run over $\ddot{a}-1$. Using $\ddot{a}$ adds one extra renewal expense.
> - **Net vs gross.** A net premium policy value uses the net premium on the valuation basis, not the gross premium actually charged.
> - **Variance factor.** $\text{Var}(L_0)$ scales by $(S + P/d)^2$ for annual premiums and $(S + P/\delta)^2$ for continuous ones. Forgetting $P$ gives the variance of the benefit alone, which is too small.
