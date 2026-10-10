---
aliases:
  - Payment Option
  - Optional Form
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cb368d6c79c1091ad27c8514d201b8f5feffa23a11d70a0a326071293a15989f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Optional Form of Payment.md
---
An **Optional Form of Payment** is a way a member may elect to receive the pension from a [[Defined Benefit Plan|defined benefit plan]] other than the plan's normal form, such as a joint and survivor pension, a certain-and-life annuity, a level income option or a lump sum. The plan converts the normal-form pension into the chosen form with conversion factors, which are actuarially equivalent when both forms have the same expected present value, and which give the member a subsidy when they are more generous than that.

> $$B_{\text{opt}} = f\,B_{\text{normal}}$$

> $$f = \frac{\ddot{a}_x}{\ddot{a}_x + p\left(\ddot{a}_y - \ddot{a}_{xy}\right)}$$

> $$\ddot{a}_{x:\overline{\overline{n}|}} = \ddot{a}_{\overline{n}|} + {}_nE_x\,\ddot{a}_{x+n}$$

> $$\text{Subsidy} = \left(f_{\text{plan}} - f\right) B_{\text{normal}}\;\ddot{a}_{\text{opt}}$$

- **Symbols:** $B_{\text{normal}}$ is the pension in the normal form, here a single [[Life Annuity|life annuity]] on the member aged $x$, and $f$ is the actuarially equivalent conversion factor. In the joint and survivor factor, $y$ is the spouse's age, $p$ is the survivor percentage, and $\ddot{a}_{xy}$ is the [[Joint Life|joint life]] annuity, so $\ddot{a}_y - \ddot{a}_{xy}$ values the payments made to the spouse after the member dies. $\ddot{a}_{x:\overline{\overline{n}|}}$ is the certain-and-life annuity, and $\ddot{a}_{\text{opt}}$ is the annuity factor of the optional form.
- **The normal form:** The normal form is the one the benefit formula describes. For an unmarried member it is usually a single life annuity, sometimes with a guaranteed period. For a married member, U.S. law makes a joint and survivor annuity of at least 50% the normal form, and most Canadian jurisdictions require at least 60% to the spouse, unless the spouse waives it in writing.
- **Joint and survivor:** The pension continues to a surviving spouse or beneficiary at a stated percentage, such as 50%, 66.67% or 100%. The member's own pension is reduced to pay for it, and some plans add a pop-up that restores the full pension if the beneficiary dies first.
- **Certain-and-life and refund forms:** A guaranteed period, such as 5, 10 or 15 years, pays the pension for the guaranteed period even if the member dies, and for life after that. A modified cash refund annuity pays the beneficiary any excess of the member's contributions with interest over the pension already received.
- **Level income option:** The member takes a higher pension before government benefits start and a lower one afterward, so that plan and [[Social Insurance|social security]] benefits together give a level income. The two parts have equal EPV, so the option is actuarially equivalent unless the plan subsidizes it.
- **Lump sum:** Many U.S. plans, especially cash balance and other [[Hybrid Plan|hybrid plans]], let the member take the value as a single payment. In Canada the [[Commuted Value|commuted value]] of a vested pension can be transferred out on termination, but it remains locked in.
- **Sponsor risk:** An optional form is an [[Embedded Option|embedded option]] the member holds. Factors set years ago on old interest and mortality bases become subsidies when rates fall or members live longer, and unisex factors subsidize women. Members also choose with knowledge of their own health, so those in poor health take a single life or lump sum and those in good health take a life annuity or a 100% survivor form. This [[Adverse Selection|antiselection]] makes the chosen forms cost more than tables suggest, and mitigation includes basing factors on current market rates and mortality, reviewing them regularly, and limiting the forms offered.

> [!example]- Converting a Life Annuity to a 60% Joint and Survivor Pension {Example}
> A member aged 65 is entitled to a single life pension of \$20,000 a year, paid annually in advance. He elects a 60% joint and survivor pension with his spouse, aged 62. Using the Standard Ultimate Life Table at 5%, with independent lives, $\ddot{a}_{65} = 13.5498$, $\ddot{a}_{62} = 14.3861$ and $\ddot{a}_{65:62} = 12.1283$. (a) Find the actuarially equivalent factor and the J&S pension. (b) The plan's factor table gives 0.95. Find the value of the subsidy.
>
> > [!answer]-
> > The J&S form pays $B$ while the member is alive and $0.6B$ to the spouse after his death, so its value per \$1 of member pension is $\ddot{a}_{65} + 0.6(\ddot{a}_{62} - \ddot{a}_{65:62})$.
> > $$
> > \begin{align*}
> > \ddot{a}_{\text{J\&S}} &= 13.5498 + 0.6(14.3861 - 12.1283) \\
> > &= 14.9044 \\
> > f &= \frac{13.5498}{14.9044} \\
> > &= 0.90911 \\
> > B_{\text{J\&S}} &= 0.90911 \times 20{,}000 \\
> > &= 18{,}182
> > \end{align*}
> > $$
> > Under the plan's factor of 0.95 the member receives \$19,000 instead.
> > $$
> > \begin{align*}
> > \text{EPV}_{\text{plan}} &= 19{,}000 \times 14.9044 \\
> > &= 283{,}184 \\
> > \text{EPV}_{\text{life}} &= 20{,}000 \times 13.5498 \\
> > &= 270{,}996 \\
> > \text{Subsidy} &= 283{,}184 - 270{,}996 \\
> > &= 12{,}188
> > \end{align*}
> > $$
> > The plan's factor gives about 4.5% more value than the single life pension. If the spouse were older, the equivalent factor would be closer to 1 and the subsidy smaller, which is why factor tables vary with the age difference.

> [!example]- Pricing a Ten-Year Guarantee {Example}
> The same member is offered a 10-year certain-and-life annuity instead. At 5%, $\ddot{a}_{\overline{10}|} = 8.1078$, and on the SULT ${}_{10}E_{65} = 0.55305$ and $\ddot{a}_{75} = 10.3178$. Find the actuarially equivalent pension.
>
> > [!answer]-
> > The guarantee pays for 10 years certain, and the pension continues after that only if the member is alive at 75.
> > $$
> > \begin{align*}
> > \ddot{a}_{65:\overline{\overline{10}|}} &= 8.1078 + 0.55305(10.3178) \\
> > &= 13.8141 \\
> > f &= \frac{13.5498}{13.8141} \\
> > &= 0.98087 \\
> > B_{\text{C\&L}} &= 0.98087 \times 20{,}000 \\
> > &= 19{,}617
> > \end{align*}
> > $$
> > A 10-year guarantee costs the member only about 2% of the pension at 65, because most members survive the guarantee period anyway. A plan that offers it without reduction gives a small subsidy that members in poor health are the most likely to take.

> [!tip]- How it appears on the exam
> - **RET-101 plan features:** Objective 1b asks candidates to explain payment options and the adjustments to the amount of benefit that go with them. Expect written answers on why a plan offers each form, the spousal rules, and how the conversion factors are set, with calculations that convert a normal-form pension into a joint and survivor or certain-and-life form.
> - **RET-101 sponsor risk:** Objective 3b asks candidates to assess the sponsor risk from optional form of payment factors and to describe ways to mitigate it. A typical question gives stale factors or a new low-rate environment and asks for the subsidy, the effect of antiselection, and a recommendation such as moving to market-based factors.
> - **Calculation inputs:** The calculations follow AMLCR chapters 9 and 10, so they need joint life annuities on independent lives and pure endowments from the SULT or a given table.

> [!warning]- Exam traps
> - **The survivor part:** The spouse's benefit is $p(\ddot{a}_y - \ddot{a}_{xy})$, a reversionary annuity, not $p\,\ddot{a}_y$. Using $p\,\ddot{a}_y$ pays the spouse while the member is still alive and makes the equivalent factor too small.
> - **Factor direction:** The factor that converts the normal form to a more valuable form is below 1. A factor above 1 for a J&S form means the normal form is the J&S and the member is converting to a single life.
> - **Equivalence is on EPV, not on total payments:** Two forms are equivalent when their EPVs on the plan's basis are equal. Comparing undiscounted expected payments ignores interest and makes guarantees look cheaper than they are.
> - **Subsidy versus antiselection:** A factor can be actuarially equivalent on the table and still cost the sponsor money, because members who choose a form are healthier or sicker than the table assumes. Say both when asked about sponsor risk.
