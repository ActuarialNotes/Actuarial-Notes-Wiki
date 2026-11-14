---
aliases:
  - Target Replacement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dcc04c056ea8cbc1a94aa19151bf0caef269661b5ef04d490cbbfa4278babf58
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Replacement Ratio.md
---
The **Replacement Ratio** is a retiring member's pension income in the first year of retirement divided by her salary in the year before retirement. It measures how much of a member's working income a [[Retirement Plan|retirement plan]] replaces. For a member retiring at age $x_r$, the replacement ratio is

> $$R = \frac{B}{S_{x_r-1}}$$

- $B$ is the annual pension in the first year of retirement.
- $S_{x_r-1}$ is the salary earned in the year of age $x_r - 1$ to $x_r$.

A [[Defined Benefit Plan|defined benefit plan]]'s formula fixes the replacement ratio in advance, while a [[Defined Contribution Plan|defined contribution plan]] can only aim at a target replacement ratio through its contribution rate. A target is often set for total retirement income, so the plan's share is the target less the ratio that government benefits ([[Social Insurance|social insurance]]) provide, as in [[Plan Design|plan design]].

## Replacement ratio in a defined benefit plan

In a plan whose pensionable salary is the final year's salary, a member with $n$ years of service at accrual rate $\alpha$ has the replacement ratio

> $$R = n\,\alpha$$

So 35 years at 2% replace 70%. A final average salary, a career average, or a revaluation index that grows more slowly than salary gives less, because the pensionable salary then falls below $S_{x_r-1}$.

> [!example]- What is this member's replacement ratio under each plan formula? {Example}
> A member joins at 30 and retires at exact age 65 with 35 years of service. Her salary rises 3.5% a year, of which 2% is price inflation. The accrual rate is 2%. The three plan formulas are:
>
> - (a) a final-salary plan based on the salary in the year before retirement;
> - (b) a CARE plan that revalues each year's salary by 2% a year from the end of that year to retirement;
> - (c) a CARE plan that revalues by 3.5% a year.
>
> > [!answer]-
> > - (a) The pensionable salary is $S_{64}$, so $R = 35(0.02) = 70\%$.
> > - (b) The salary of the year of age $30 + k$ is $S_{64}(1.035)^{-(34-k)}$, and it is revalued by $(1.02)^{34-k}$. With $j = 34 - k$, the years from that salary to retirement, the ratio is
> >
> > > $$R = 0.02 \sum_{j=0}^{34} \left(\frac{1.02}{1.035}\right)^{j}$$
> >
> > - The sum is geometric with ratio $1.02/1.035$ and 35 terms, so it is $27.6055$.
> > - The replacement ratio is $R = 0.02 \times 27.6055 = 55.2\%$.
> > - (c) Revaluing by 3.5% a year turns every year's salary into $S_{64}$, so the ratio is 70% again.
> > - Price revaluation keeps each year's earnings at their purchasing power, but it does not credit the 1.5% a year of real growth in her pay, which costs her 14.8 points of replacement.
> > - A CARE plan revalued with her own salary growth is the same as a final-salary plan for a member whose pay rises steadily.

## Target replacement ratio in a defined contribution plan

For a DC member aged $x$ with $m = x_r - x$ years to retirement and a target ratio $R^{*}$, the fund that buys the target pension at retirement is

> $$F^{*} = R^{*}\,S_{x_r-1}\,\ddot{a}^{(12)}_{x_r}$$

- $\ddot{a}^{(12)}_{x_r}$ is the price at retirement of a monthly life annuity of 1 a year.

The account at retirement is linear in the contribution rate. A deterministic projection, with one assumed return, one salary path and one annuity price, gives the required contribution rate from a single linear equation. With contributions paid at the start of each year, it is

> $$c^{*} = \frac{F^{*} - F_0\,(1+i)^{m}}{\sum_{k=0}^{m-1} S_{x+k}\,(1+i)^{\,m-k}}$$

- $F_0$ is the member's account today.
- $i$ is the assumed annual return.
- $S_{x+k}$ is the salary in the year of age $x + k$ to $x + k + 1$, projected with the [[Salary Scale|salary scale]].

The existing account keeps earning interest until retirement, so it is accumulated before it is subtracted. A monthly pension is priced with the monthly annuity factor: the annual factor $\ddot{a}_{x_r}$ overstates the fund needed. The member bears any shortfall if returns, salary growth or annuity prices turn out worse than assumed.

> [!example]- What contribution rate gives this DC member a replacement ratio of 60%? {Example}
> A DC member aged 45 has an account of $\$150{,}000$. Her salary in the year of age 45 to 46 is $\$80{,}000$ and rises 3% a year. Contributions of $c$ times salary are paid at the start of each year from 45 to 64, the account earns 5% a year, and at 65 it buys a monthly life annuity at $\ddot{a}^{(12)}_{65} = 13.0870$ (SULT at 5%).
>
> > [!answer]-
> > - The target pension is 60% of the salary in the year of age 64 to 65, which is $S_{64} = 80{,}000(1.03)^{19} = \$140{,}280.48$.
> > - The target pension is $0.60(140{,}280.48) = \$84{,}168.29$ a year.
> > - The fund that buys it is $F^{*} = 84{,}168.29(13.0870) = \$1{,}101{,}510.42$.
> > - The existing account grows to $150{,}000(1.05)^{20} = \$397{,}994.66$, so contributions must provide $\$703{,}515.76$.
> > - A contribution rate of 1 would accumulate to $\$3{,}558{,}183.18$:
> >
> > > $$80{,}000 \sum_{k=0}^{19} (1.03)^k(1.05)^{20-k} = 80{,}000(44.47729)$$
> >
> > - The required contribution rate is $c^{*} = 19.77\%$, which is $703{,}515.76$ divided by $3{,}558{,}183.18$.
> > - Without the existing balance she would need $1{,}101{,}510.42/3{,}558{,}183.18 = 30.96\%$ of salary, so the money she saved earlier does more than a third of the work.

> [!trap] Dividing by the wrong salary
> The ratio divides by the salary in the year before retirement, $S_{x_r-1}$. Dividing by the final average salary, a salary projected to age $x_r$, or today's salary gives a different answer.
