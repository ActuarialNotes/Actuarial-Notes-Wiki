---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7530630b0662dec1bf2356fd93cb672039c6ecc645a48be46c6157b28e3e9a55
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pension Plan.md
---

A **Pension Plan** is an arrangement through which a [[Plan Sponsor|plan sponsor]], usually an employer, provides retirement income to employees, financed by contributions accumulated in a fund. There are two kinds:

1. In a [[Defined Benefit Plan|defined benefit (DB)]] plan the benefit is set by formula from salary and service, and the sponsor bears the investment and [[Mortality|longevity]] risk.
2. In a [[Defined Contribution Plan|defined contribution (DC)]] plan the contributions are set, and the member's benefit is whatever the account buys.

## Defined benefit formula

In a DB plan, the annual pension of a member with $n$ years of service is

> $$B = \alpha \, n \, \bar S$$

- $\alpha$ is the accrual rate, such as $1.5\%$.
- $\bar S$ is the pensionable salary: the final average salary (FAS), the career average earnings (CAE) or the career average revalued earnings (CARE).

The [[Replacement Ratio|replacement ratio]] of a pension is

> $$R = \frac{\text{pension income in the year after retirement}}{\text{salary in the year before retirement}}$$

Future salaries are projected with a [[Salary Scale|salary scale]] $s_y$. The ratio of a member's salary at age $y$ to the salary at age $x$ is

> $$\frac{S_y}{S_x} = \frac{s_y}{s_x}$$

- $S_x$ and $S_y$ are the member's salaries at ages $x$ and $y$.

> [!example]- What are this member's annual pension and replacement ratio? {Example}
> A member aged exactly 40, hired at 30, earns $\$70{,}000$ in the year of age 40 to 41. Salaries rise $3\%$ a year. The plan pays $1.6\%$ of the 3-year final average salary per year of service from age 65.
>
> > [!answer]-
> > - The salary for the year of age 40 to 41 grows 24 times to reach the year 64 to 65, so the final year's salary is $70{,}000(1.03)^{24} = 142{,}296$.
> > - The 3-year final average salary is $138{,}191$, the average of $142{,}296$, $142{,}296/1.03$ and $142{,}296/1.03^2$.
> > - The member will have 35 years of service, so $B = 0.016 \times 35 \times 138{,}191 = \$77{,}387$.
> > - The replacement ratio is $77{,}387/142{,}296 = 54.4\%$.
> > - Averaging over three years costs about $2.9\%$ of the benefit.

## Defined contribution accumulation

In a DC plan with contributions of $c$ times salary paid at the start of each year for $n$ years, earning $i$, the account at retirement is

> $$c\sum_{t=0}^{n-1} S_{x+t}\,(1+i)^{n-t}$$

- $S_{x+t}$ is the salary in the year of age $x+t$ to $x+t+1$.

At retirement the account buys an annuity. The member bears any shortfall if the assumptions are not realized.

> [!example]- What contribution rate gives this member a replacement ratio of 50%? {Example}
> A member aged 35 earns $\$50{,}000$ this year, and salaries rise $3\%$ a year. Contributions of $c$ times salary are paid at the start of each year to age 65 and earn $6\%$. At 65 the account buys a pension at $\$12.0$ per $\$1$ of annual income.
>
> > [!answer]-
> > - The final salary is $50{,}000(1.03)^{29} = 117{,}828$, so the target pension is $58{,}914$.
> > - The account must reach $12.0 \times 58{,}914 = 706{,}970$.
> > - At $c = 1$ the contributions would accumulate to $5{,}858{,}671$, the sum of $50{,}000(1.03)^t(1.06)^{30-t}$ for $t = 0$ to $29$.
> > - The contribution rate is $c = 706{,}970/5{,}858{,}671 = 12.07\%$.

## Purposes of a valuation

A DB plan is valued for several purposes, each with its own assumptions:

1. **Going-concern funding** sets contributions, through a cost method's [[Normal Cost|normal cost]] and [[Actuarial Accrued Liability|accrued liability]].
2. **Solvency or hypothetical wind-up** values the benefits as if the plan ended today, at annuity-purchase rates.

It is also valued on termination and for accounting.

Solvency and hypothetical wind-up liabilities use settlement rates, the annuity-purchase and commuted-value rates, and include no future salary increases.

> [!trap] Using going-concern assumptions for a wind-up valuation
> A wind-up liability is valued at settlement rates. Discounting it at the going-concern rate understates it.

## Liability-driven investment

The liabilities of a DB plan are long-duration and often inflation-linked, so their value is very sensitive to interest rates and longevity. Liability-driven investing matches the asset [[Duration|duration]] to the liability's, a partial [[Immunization|immunization]], instead of maximizing return. The interest rate hedge ratio is

> $$\text{Hedge ratio} = \frac{\text{dollar duration of the assets}}{\text{dollar duration of the liabilities}}$$

- A dollar duration is a value times its modified duration.

A plan $40\%$ invested in bonds is not $40\%$ hedged, because short bonds hedge little of a long liability.

> [!example]- What is this plan's interest rate hedge ratio, and what swap raises it to 80%? {Example}
> A DB plan has liabilities of $\$200$ million with modified duration 14. Its $\$200$ million of assets are $\$80$ million of bonds with duration 6 and $\$120$ million of equities, treated as duration 0. A receive-fixed swap has duration 18.
>
> > [!answer]-
> > - The hedge ratio is $\frac{80 \times 6}{200 \times 14} = \frac{480}{2{,}800} = 17.1\%$.
> > - If rates fall $1\%$, the surplus changes by about $(480 - 2{,}800)(0.01) = -\$23.2$ million.
> > - An $80\%$ hedge needs a dollar duration of $0.8(2{,}800) = 2{,}240$, so the swap notional is $(2{,}240 - 480)/18 = \$97.8$ million.
> > - The overlay cuts the loss on a $1\%$ fall to about $\$5.6$ million without selling equities.
