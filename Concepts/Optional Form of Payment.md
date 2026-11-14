---
aliases:
  - Payment Option
  - Optional Form
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:120423fce95885ebf5311dc3f4e1e47df5c23b3f38a0733f9b881d93b4200e26
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Optional Form of Payment.md
---

An **Optional Form of Payment** is a way a member may elect to receive the pension from a [[Defined Benefit Plan|defined benefit plan]] other than the plan's normal form, such as a joint and survivor pension, a certain-and-life annuity, a level income option or a lump sum. Conversion factors are actuarially equivalent when both forms have the same expected present value, and they give the member a subsidy when they are more generous than that.

The plan converts the pension in the normal form, $B_{\text{normal}}$, into the pension in the chosen form with a conversion factor $f$, so the optional-form pension is

> $$B_{\text{opt}} = f\,B_{\text{normal}}$$

The normal form is the one the benefit formula describes. For an unmarried member it is usually a single [[Life Annuity|life annuity]], sometimes with a guaranteed period. For a married member, U.S. law makes a joint and survivor annuity of at least 50% the normal form, and most Canadian jurisdictions require at least 60% to the spouse, unless the spouse waives it in writing.

Two forms are equivalent when their EPVs on the plan's basis are equal. Comparing undiscounted expected payments ignores interest and makes guarantees look cheaper than they are.

## Joint and survivor pension

A joint and survivor pension continues to a surviving spouse or beneficiary at a stated percentage, such as 50%, 66.67% or 100%. The member's own pension is reduced to pay for it, and some plans add a pop-up that restores the full pension if the beneficiary dies first. When the normal form is a single life annuity on the member aged $x$, the actuarially equivalent factor is

> $$f = \frac{\ddot{a}_x}{\ddot{a}_x + p\left(\ddot{a}_y - \ddot{a}_{xy}\right)}$$

- $y$ is the spouse's age.
- $p$ is the survivor percentage.
- $\ddot{a}_{xy}$ is the [[Joint Life|joint life]] annuity, so $\ddot{a}_y - \ddot{a}_{xy}$ values the payments made to the spouse after the member dies.

The factor is below 1 when converting from a single life pension to the more valuable J&S form. If the spouse were older, the equivalent factor would be closer to 1, which is why factor tables vary with the age difference.

> [!example]- What 60% joint and survivor pension is actuarially equivalent to this member's single life pension? {Example}
> A member aged 65 is entitled to a single life pension of $\$20{,}000$ a year, paid annually in advance. He elects a 60% joint and survivor pension with his spouse, aged 62. On the Standard Ultimate Life Table at 5%, with independent lives, $\ddot{a}_{65} = 13.5498$, $\ddot{a}_{62} = 14.3861$ and $\ddot{a}_{65:62} = 12.1283$.
>
> > [!answer]-
> > - The J&S form pays $B$ while the member is alive and $0.6B$ to the spouse after his death.
> > - Its value per $\$1$ of member pension is $13.5498 + 0.6(14.3861 - 12.1283) = 14.9044$.
> > - The factor is $f = 13.5498 / 14.9044 = 0.90911$.
> > - The J&S pension is $0.90911 \times 20{,}000 = \$18{,}182$ a year.

## Certain-and-life annuity

A guaranteed period, such as 5, 10 or 15 years, pays the pension for the guaranteed period even if the member dies, and for life after that. Payments are certain during the first $n$ years, and the payment at time $k \ge n$ is made only if the member is alive then, so the $n$-year certain-and-life annuity-due on a member aged $x$ is

> $$\ddot{a}_{x:\overline{\overline{n}|}} = \ddot{a}_{\overline{n}|} + {}_nE_x\,\ddot{a}_{x+n}$$

- $\ddot{a}_{\overline{n}|}$ is the $n$-year annuity-certain due.
- ${}_nE_x$ is the [[Pure Endowment|pure endowment]] factor.
- ${}_nE_x\,\ddot{a}_{x+n}$ is the $n$-year deferred life annuity, the life annuity from age $x+n$ valued at age $x$.

A modified cash refund annuity is another refund form. It pays the beneficiary any excess of the member's contributions with interest over the pension already received.

> [!example]- What 10-year certain-and-life pension is actuarially equivalent to the same member's $\$20{,}000$ single life pension? {Example}
> At 5%, $\ddot{a}_{\overline{10}|} = 8.1078$. On the Standard Ultimate Life Table, ${}_{10}E_{65} = 0.55305$, $\ddot{a}_{75} = 10.3178$ and $\ddot{a}_{65} = 13.5498$.
>
> > [!answer]-
> > - The guarantee pays for 10 years certain, and the pension continues after that only if the member is alive at 75.
> > - The annuity factor is $8.1078 + 0.55305 \times 10.3178 = 13.8141$.
> > - The factor is $f = 13.5498 / 13.8141 = 0.98087$.
> > - The equivalent pension is $0.98087 \times 20{,}000 = \$19{,}617$ a year, about 2% less, because most members survive the guarantee period anyway.

## Level income option and lump sum

Under a level income option the member takes a higher pension before government benefits start and a lower one afterward, so that plan and [[Social Insurance|social security]] benefits together give a level income. The two parts have equal EPV, so the option is actuarially equivalent unless the plan subsidizes it.

Many U.S. plans, especially cash balance and other [[Hybrid Plan|hybrid plans]], let the member take the value as a single payment. In Canada the [[Commuted Value|commuted value]] of a vested pension can be transferred out on termination, but it remains locked in.

## Subsidy and sponsor risk

When the plan's factor $f_{\text{plan}}$ is more generous than the equivalent factor $f$, the subsidy is

> $$\text{Subsidy} = \left(f_{\text{plan}} - f\right) B_{\text{normal}}\;\ddot{a}_{\text{opt}}$$

- $\ddot{a}_{\text{opt}}$ is the annuity factor of the optional form.

An optional form is an [[Embedded Option|embedded option]] the member holds. Factors set years ago on old interest and mortality bases become subsidies when rates fall or members live longer, and unisex factors subsidize women. Members also choose with knowledge of their own health, so those in poor health take a single life or lump sum and those in good health take a life annuity or a 100% survivor form. This [[Adverse Selection|antiselection]] makes the chosen forms cost more than tables suggest, even when a factor is actuarially equivalent on the table. Mitigation includes basing factors on current market rates and mortality, reviewing them regularly, and limiting the forms offered.

> [!example]- The plan's factor table gives 0.95 for the 60% joint and survivor form above. What is the value of the subsidy? {Example}
> - The equivalent factor is $0.90911$, and the J&S annuity factor is $14.9044$.
> - The subsidy is $(0.95 - 0.90911) \times 20{,}000 \times 14.9044 = \$12{,}188$.
> - The plan's factor gives about 4.5% more value than the single life pension's EPV of $20{,}000 \times 13.5498 = \$270{,}996$.

> [!trap] Valuing the survivor part as a full annuity on the spouse
> The spouse's benefit is $p(\ddot{a}_y - \ddot{a}_{xy})$, a reversionary annuity, not $p\,\ddot{a}_y$. Using $p\,\ddot{a}_y$ pays the spouse while the member is still alive and makes the equivalent factor too small.
