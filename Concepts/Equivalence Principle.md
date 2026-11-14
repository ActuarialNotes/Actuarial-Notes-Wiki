---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:c76d42e1f2be3442d2828171874485d04e6280dbf4aa9420e11e0e0b669b653f
  sources:
    - "Valdez, STT 456 Premium Calculation slides (MSU, Spring 2015), slides 11-14 (return of premium: j = 0 gives P = B A_x/(ä_x - (IA)_x); j = i gives L0 = B v^(K+1), no possible premium; j > i loss always positive; slide 14 example data: 10,000 + ROP, 290.84, (IA)40 = 8.6179, i = 4%, no answer printed), sha256:7b4af6694606f8ee6a4ad037032100e510c0f7d382d2f47d6f85044cff02cc98 — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks1to2-S2015.pdf"
    - "SOA Exam FAM-L Sample Solutions (2024-10, rev. Aug 2026), Q6.1 p.34 (death benefit 1000 + (k+1)P: P = 1000A^1/(ä - (IA)^1)), Q6.2 p.34 (G(IA)^1 with expenses), Q6.7 p.37 (pi s̈_(K+1) v^(K+1) = pi ä_(K+1); pi s̈_20 = 100,000), Q6.51 p.60 ((IA)^1_62:10 = 11A^1_62:10 - sum_(k=1..10) A^1_62:k), Q6.35 p.52 (gross premium by the equivalence principle), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), §6.1.1 p.151 (PDF 161: (DA)^1_x:n = (n+1)A^1_x:n - (IA)^1_x:n, DA paying n - k on death in year k+1), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "SOA Tables for Exam FAM (2024-10), Standard Ultimate Life Table p.20 (A45 = 0.15161, ä45:20 = 12.9391, ä50 = 17.0245, A50 = 0.18931, 2A50 = 0.05108), sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Equivalence Principle.md
---

The **Equivalence Principle** sets a [[Insurance Premium|premium]] so that the expected present value of the future loss random variable $L_0$ at issue is zero: the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of the expenses when a gross premium is being set. The equation of value it gives is

> $$\text{EPV(premiums)} = \text{EPV(benefits)} + \text{EPV(expenses)}$$

Leaving expenses out gives the **net premium**. Including them gives the **gross premium**. Net premiums are also used inside net premium policy values, on the valuation basis.

## Loss at issue for whole life insurance

For a fully discrete [[Whole Life Insurance|whole life]] policy with sum insured $S$ and annual premium $P$, the loss at issue is

> $$L_0 = S\,v^{K_x+1} - P\,\ddot{a}_{\overline{K_x+1}|}$$

- $L_0$ is the present value at issue of the insurer's future outgo less future income.
- $K_x$ is the curtate future lifetime of $(x)$.

Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$. Zero expected loss is not zero risk, and the variance of the loss for whole life is

> $$\text{Var}(L_0) = \left(S + P/d\right)^2\left({}^2\!A_x - A_x^2\right)$$

- ${}^2\!A_x$ is $A_x$ calculated at $v^2$.

$\text{Var}(L_0)$ scales by $(S + P/d)^2$ for annual premiums and $(S + P/\delta)^2$ for continuous ones. The portfolio percentile principle instead chooses $P$ so that the aggregate loss on $N$ policies is negative with a target probability, a [[Percentile|percentile]] of the loss usually found with the [[Normal Distribution|normal]] approximation.

> [!example]- What are the net annual premium and the standard deviation of $L_0$ for this policy? {Example}
> A fully discrete whole life insurance of $\$100{,}000$ is issued to $(50)$. The values are found using the Standard Ultimate Life Table at $i = 5\%$ ($A_{50} = 0.18931$, ${}^2\!A_{50} = 0.05108$, $\ddot{a}_{50} = 17.0245$).
>
> > [!answer]-
> > - The net premium is $P = 18{,}931/17.0245 = \$1{,}111.99$.
> > - With $d = 0.05/1.05$, the coefficient is $100{,}000 + P/d = 123{,}351.8$.
> > - The variance of the insurance present value is $0.05108 - 0.18931^2 = 0.015242$.
> > - $\text{SD}(L_0) = 123{,}351.8\sqrt{0.015242} = \$15{,}229$.
> > - The insurer expects to break even, but the loss on a single policy has a standard deviation of about $\$15{,}200$.

## Gross premiums with expenses

For a gross premium $G$, expenses are added to the benefit side of the equation of value. Premiums payable for at most $n$ years are valued with the temporary annuity-due $\ddot{a}_{x:\overline{n}|}$, paid only while the insured survives. If the initial expense replaces the renewal expense at time 0, renewals run over $\ddot{a}-1$. Using $\ddot{a}$ adds one extra renewal expense.

> [!example]- What is the gross premium $G$ for this limited-pay policy? {Example}
> A whole life policy of $\$100{,}000$ on $(45)$ is fully discrete, with premiums payable for at most 20 years. Expenses are 50% of the first premium plus \$250 at issue, then 5% of each later premium plus \$50 at the start of each later premium year. On the SULT at $5\%$, $A_{45} = 0.15161$ and $\ddot{a}_{45:\overline{20}|} = 12.9391$.
>
> > [!answer]-
> > - Equate the EPV of gross premiums to the EPV of benefits plus expenses. Renewal expenses run over $\ddot{a}_{45:\overline{20}|} - 1$, because the first year carries the initial expense instead.
> > - The equation of value is $G\,\ddot{a}_{45:\overline{20}|} = 100{,}000A_{45} + 0.5G + 250 + (0.05G + 50)(\ddot{a}_{45:\overline{20}|} - 1)$.
> > - Collecting the terms in $G$ on the left gives $G\,(12.9391 - 0.5 - 0.05 \times 11.9391) = 15{,}161 + 250 + 50 \times 11.9391$.
> > - So $G = 16{,}007.96/11.8421 = \$1{,}351.78$.
> > - The net premium is $15{,}161/12.9391 = \$1{,}171.72$, so expenses load the premium by about $\$180$ a year.

> [!trap] Pricing with the wrong premium annuity
> Pricing a 20-pay policy with $\ddot{a}_x$, or a both-alive premium with the last-survivor annuity, understates the premium. Value the premiums with the annuity for the status and term over which they are actually paid.

## Joint lives and multiple-state models

The same equation holds for [[Joint Life|joint lives]] and multiple-state models. Each EPV is taken over the multiple-state model, or over the joint or last-survivor status, and premiums are valued only while the paying status lasts.

> [!example]- What is the annual premium rate for this last-survivor insurance? {Example}
> Independent lives $(x)$ and $(y)$ have constant forces of mortality $0.02$ and $0.03$, and $\delta = 0.05$. A last-survivor insurance of $\$100{,}000$ is paid at the moment of the second death. Premiums are payable continuously while **both** lives survive.
>
> > [!answer]-
> > - The joint life has force $0.05$, so $\bar{A}_{xy} = 0.05/0.10 = 0.5$ and $\bar{a}_{xy} = 1/0.10 = 10$.
> > - The last-survivor insurance is $\bar{A}_{\overline{xy}} = \bar{A}_x + \bar{A}_y - \bar{A}_{xy} = 0.02/0.07 + 0.03/0.08 - 0.5 = 0.160714$.
> > - The premium rate is $P = 100{,}000\,\bar{A}_{\overline{xy}}/\bar{a}_{xy} = 16{,}071.4/10 = \$1{,}607.14$.
> > - Valuing premiums with the last-survivor annuity $\bar{a}_{\overline{xy}} = 16.786$ would give $\$957.45$, which is too small, because no premium is paid after the first death.

## Return of premiums

A death benefit that returns the premiums paid, without interest, pays $G(k+1)$ on death in year $k+1$, an increasing term insurance. With a level sum $S$ paid as well, $G$ appears on both sides of the equation of value, so its terms are collected and

> $$G = \frac{S\,A^1_{x:\overline{n}|}}{\ddot{a}_{x:\overline{n}|} - (IA)^1_{x:\overline{n}|}}$$

- $(IA)^1_{x:\overline{n}|}$ is the EPV of an $n$-year increasing term insurance paying $k+1$ on death in year $k+1$.

Any expenses are added to the numerator first. For whole life, $G = S\,A_x/\left(\ddot{a}_x - (IA)_x\right)$.

If the death benefit is instead the premiums accumulated at the valuation rate $i$, its present value on death in year $K_x+1$ is $P\,\ddot{a}_{\overline{K_x+1}|}$, exactly the present value of the premiums paid. These death benefits fund themselves, so for an $n$-year endowment insurance with this death benefit and an endowment of $E$, the equation of value reduces to $P\,\ddot{s}_{\overline{n}|} = E$, and mortality drops out.

> [!example]- What is $\ddot{a}_{40}$ for this return-of-premium policy? {Example}
> A fully discrete whole life insurance on $(40)$ pays $\$10{,}000$ plus a return of all premiums paid, without interest, at the end of the year of death. The annual net premium is $\$290.84$, $(IA)_{40} = 8.6179$ and $i = 4\%$.
>
> > [!answer]-
> > - The equation of value is $290.84\,\ddot{a}_{40} = 10{,}000A_{40} + 290.84\,(IA)_{40}$.
> > - Replace $A_{40}$ by $1 - d\,\ddot{a}_{40}$ with $d = 0.04/1.04 = 0.0384615$, so that $\ddot{a}_{40}$ is the only unknown.
> > - Then $290.84\,\ddot{a}_{40} = 10{,}000(1 - 0.0384615\,\ddot{a}_{40}) + 2{,}506.43$.
> > - So $\ddot{a}_{40} = 12{,}506.43/675.455 = 18.516$.
