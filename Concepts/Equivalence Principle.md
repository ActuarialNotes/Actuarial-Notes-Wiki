---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:9677281190dd86c597c49c8f084945353921be558daa4febb916650155dc3172
  sources:
    - "Valdez, STT 456 Premium Calculation slides (MSU, Spring 2015), slides 11-14 (return of premium: j = 0 gives P = B A_x/(ä_x - (IA)_x); j = i gives L0 = B v^(K+1), no possible premium; j > i loss always positive; slide 14 example data: 10,000 + ROP, 290.84, (IA)40 = 8.6179, i = 4%, no answer printed), sha256:7b4af6694606f8ee6a4ad037032100e510c0f7d382d2f47d6f85044cff02cc98 — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks1to2-S2015.pdf"
    - "SOA Exam FAM-L Sample Solutions (2024-10, rev. Aug 2026), Q6.1 p.34 (death benefit 1000 + (k+1)P: P = 1000A^1/(ä - (IA)^1)), Q6.2 p.34 (G(IA)^1 with expenses), Q6.7 p.37 (pi s̈_(K+1) v^(K+1) = pi ä_(K+1); pi s̈_20 = 100,000), Q6.51 p.60 ((IA)^1_62:10 = 11A^1_62:10 - sum_(k=1..10) A^1_62:k), Q6.35 p.52 (gross premium by the equivalence principle), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), §6.1.1 p.151 (PDF 161: (DA)^1_x:n = (n+1)A^1_x:n - (IA)^1_x:n, DA paying n - k on death in year k+1), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "SOA Tables for Exam FAM (2024-10), Standard Ultimate Life Table p.20 (A45 = 0.15161, ä45:20 = 12.9391, ä50 = 17.0245, A50 = 0.18931, 2A50 = 0.05108), sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 1
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
- **Return of premiums without interest:** A death benefit that returns the premiums paid, without interest, pays $G(k+1)$ on death in year $k+1$, an increasing term insurance. Its EPV is $G\,(IA)^1_{x:\overline{n}|}$, plus $S\,A^1_{x:\overline{n}|}$ when a level sum $S$ is paid as well. Because $G$ appears on both sides of the equation of value, collect its terms and solve: $G\,\ddot{a}_{x:\overline{n}|} = S\,A^1_{x:\overline{n}|} + G\,(IA)^1_{x:\overline{n}|}$ gives $G = S\,A^1_{x:\overline{n}|}/\left(\ddot{a}_{x:\overline{n}|} - (IA)^1_{x:\overline{n}|}\right)$, with any expenses added to the right-hand side first. For whole life, $G = S\,A_x/\left(\ddot{a}_x - (IA)_x\right)$.
- **Increasing term from level terms:** $(IA)^1_{x:\overline{n}|} = (n+1)A^1_{x:\overline{n}|} - \sum_{k=1}^{n} A^1_{x:\overline{k}|}$. A benefit of $k+1$ on death in year $k+1$ is $n+1$ less $n-k$, and the decreasing benefit $n-k$ is a stack of term insurances of 1 for $1, 2, \ldots, n$ years, since a death in year $k+1$ is covered by the $n-k$ of them that last at least $k+1$ years.
- **Return of premiums with interest:** If the death benefit is the premiums accumulated at the valuation rate $i$, paid at the end of the year of death, its present value on death in year $K_x+1$ is $P\,\ddot{s}_{\overline{K_x+1}|}\,v^{K_x+1} = P\,\ddot{a}_{\overline{K_x+1}|}$, exactly the present value of the premiums paid. These death benefits are self-funding, so for an $n$-year endowment insurance with this death benefit and an endowment of $E$, the equation of value reduces to $P\,\ddot{s}_{\overline{n}|} = E$, and mortality drops out. For a whole life policy with premiums payable for life, the same refund plus a sum $S$ on death leaves the loss at $S\,v^{K_x+1}$ whatever the premium, so no premium satisfies the equation, and a refund at a rate above $i$ makes the loss positive every time.

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

> [!example]- Whole Life with a Return of Premiums {Example}
> A fully discrete whole life insurance on $(40)$ pays \$10,000 plus a return of all premiums paid, without interest, at the end of the year of death. The annual net premium is \$290.84, $(IA)_{40} = 8.6179$ and $i = 4\%$. Find $\ddot{a}_{40}$.
>
> > [!answer]-
> > Write the equation of value with the refund on the benefit side, then replace $A_{40}$ by $1 - d\,\ddot{a}_{40}$ so that $\ddot{a}_{40}$ is the only unknown. Here $d = 0.04/1.04 = 0.0384615$.
> > $$
> > \begin{align*}
> > 290.84\,\ddot{a}_{40} &= 10{,}000A_{40} + 290.84\,(IA)_{40} \\
> > 290.84\,\ddot{a}_{40} &= 10{,}000(1 - 0.0384615\,\ddot{a}_{40}) + 2{,}506.43 \\
> > \ddot{a}_{40}(290.84 + 384.615) &= 12{,}506.43 \\
> > \ddot{a}_{40} &= 18.516
> > \end{align*}
> > $$
> > So $A_{40} = 1 - 0.0384615(18.516) = 0.2879$. Without the refund the same $A_{40}$ would need a premium of only $10{,}000(0.2879)/18.516$, about \$155: the refund nearly doubles the premium, because the refund itself has to be paid for out of the premiums.

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
