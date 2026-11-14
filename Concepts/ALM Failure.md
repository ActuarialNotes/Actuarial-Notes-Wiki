---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d8dfd8d4f1baf4e15b484001dd9cad82cd714d87ac99f72754e97e0e7d63d7cd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/ALM Failure.md
---
An **ALM failure** is the collapse, or near collapse, of an insurer, pension fund or bank caused by a mismatch between its assets and liabilities that it did not measure, did not price or could not unwind in time. Each classic case turned an [[ALM Risk|ALM risk]] that looked remote into a loss of solvency or of liquidity, and their lessons shape how [[Asset-Liability Management|asset-liability management]] is practised.

The failures share four features:

1. A liability option was held by others and exercised against the institution.
2. The mismatch was invisible in the accounting measure the institution watched.
3. Concentration made the policyholders or depositors act together.
4. The institution's own downgrade or announcement started the run.

## General American Life (1999)

The insurer had issued several billion dollars of funding agreements to money market funds that holders could put back for cash on seven days' notice, and it backed them with longer, less liquid assets. When Moody's downgraded it in the summer of 1999, the holders exercised their puts on more than $\$4$ billion at once. The company was solvent but couldn't sell assets fast enough. Missouri regulators placed it under administrative supervision in August 1999, and MetLife bought it in January 2000. A ratings trigger can turn a put option that is rarely used into a run.

The liquidity coverage ratio over a stress horizon is

> $$\text{Coverage} = \frac{\sum_j (1 - h_j)\,q_j\,A_j}{\sum_k r_k\,L_k}$$

- $A_j$ is the value of asset class $j$.
- $q_j$ is the share of it that can be sold within the stress horizon.
- $h_j$ is the haircut on a forced sale.
- $L_k$ is the value of liability class $k$.
- $r_k$ is the share of it expected to be withdrawn in the stress.

A ratio below 1 means the institution runs out of cash.

> [!example]- What is this insurer's liquidity coverage in a normal week and after a downgrade? {Example}
> A life insurer has issued $\$6.0$ billion of funding agreements that holders can put on seven days' notice, and it expects other outflows of $\$0.2$ billion in any week. In a normal week 10% of the agreements are put, and after a downgrade 75%. Its private placements and commercial mortgages can't be sold within a week. Its liquid sources are:
>
> | Asset | Value ($ billion) | Saleable in a week | Haircut |
> | :--- | ---: | ---: | ---: |
> | Cash | 0.4 | 100% | 0% |
> | Treasuries | 0.8 | 100% | 2% |
> | Agency MBS | 1.5 | 100% | 5% |
> | Public corporate bonds | 6.0 | 30% | 10% |
>
> > [!answer]-
> > - The sources are $0.4 + 0.784 + 1.425 + 1.620 = \$4.229$ billion, where the bonds give $6.0 \times 0.30 \times 0.90 = 1.620$.
> > - In a normal week the outflow is $0.10 \times 6.0 + 0.2 = \$0.8$ billion, so coverage is $4.229 / 0.8 = 5.29$.
> > - After the downgrade the outflow is $0.75 \times 6.0 + 0.2 = \$4.7$ billion, so coverage is $4.229 / 4.7 = 0.90$.
> > - The insurer is short by $4.7 - 4.229 = \$0.471$ billion, even though its balance sheet may show a healthy surplus.
> > - Selling private assets at a deep discount to raise the rest can turn the liquidity problem into a solvency one.

## Equitable Life (UK, 2000)

The world's oldest mutual life office had sold with-profits pension policies with guaranteed annuity rates, mostly when interest rates were high and the guarantees seemed worthless. When rates and mortality fell in the 1990s, the guarantees became very valuable. It had neither reserved nor hedged for them. When the courts ruled in 2000 that it could not cut the bonuses of the guaranteed-rate holders to pay for them, it closed to new business. [[Embedded Option|Embedded options]] must be valued and hedged when they are written, at their full value under changing rates rather than their current intrinsic value.

The value at retirement of a guaranteed annuity option (GAO) is

> $$\text{GAO value} = F \times \max\left(g\,\ddot{a}_x - 1,\ 0\right)$$

- $F$ is the policyholder's fund at retirement.
- $g$ is the guaranteed annual annuity per unit of fund.
- $\ddot{a}_x$ is the market annuity factor at the retirement age.

> [!example]- What is this guaranteed annuity option worth when the annuity factor is 8.0, and when it is 11.0? {Example}
> A policy guarantees that a fund of $\$100{,}000$ buys an annuity of at least 11.1% a year, $\$11{,}100$. The market annuity factor was 8.0 when the policy was sold. By retirement, rates and mortality have fallen and the factor is 11.0.
>
> > [!answer]-
> > - At a factor of 8.0, $g\,\ddot{a}_x = 0.111 \times 8.0 = 0.888$, so the guaranteed annuity is worth 88.8% of the fund and the option is worth nothing.
> > - At 11.0, $g\,\ddot{a}_x = 0.111 \times 11.0 = 1.221$.
> > - The option is worth $100{,}000 \times (1.221 - 1) = \$22{,}100$, or 22.1% of the fund.
> > - A receiver swaption bought at issue would have paid off in the same scenario.

## Japanese life insurers (late 1990s)

Insurers had sold savings policies guaranteeing rates of around 5% or more. After the bubble burst, Japanese government bond yields fell far below those rates and stayed there. The insurers earned less on their assets than they had promised, a negative spread, and several failed between 1997 and 2001. Long guarantees backed by shorter assets leave the insurer exposed to [[Reinvestment Risk|reinvestment risk]] for decades.

The annual loss from a negative spread is

> $$\text{Annual loss} = \left(i_g - i_A\right) \times L$$

- $i_g$ is the guaranteed rate credited on the liabilities.
- $L$ is the value of the liabilities.
- $i_A$ is the yield the assets earn.

The failure came from years of such losses, not one shock, so a one-period stress test misses it. Long guarantees need multi-year projections under low-rate scenarios.

## Silicon Valley Bank (2023)

The bank invested a surge of deposits in long-dated Treasuries and mortgage-backed securities without hedging their duration. When rates rose sharply, those securities lost a large part of their value. The securities were mostly held at amortized cost, so the losses didn't reduce reported capital until securities were sold. Most of its deposits were uninsured and concentrated among technology firms and venture funds. When it announced a loss on selling securities and a plan to raise capital, depositors withdrew tens of billions of dollars in a day, and it failed within 48 hours. Unhedged duration and flighty, concentrated liabilities together can destroy a bank faster than its accounts show.

## What the lessons changed

Insurers now limit puttable and ratings-triggered liabilities and run liquidity stress tests alongside solvency tests. They price and hedge guarantees with [[Interest Rate Derivative|interest rate derivatives]] when they are sold, and measure the duration of surplus with key rate and scenario tools. Regulators added liquidity monitoring and asset adequacy testing that must consider these risks.

> [!trap] Treating a liquidity failure as bad investments
> General American had positive surplus when it failed. The failure was the speed of the withdrawals after the downgrade, not the quality of the assets, so an answer must name the put option and the ratings trigger that made every holder act at once.
