---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:29fdf252f49c4c66cf3451f5e23df4ea4e5d3b4d61d0f171ae191c326d7d42f4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Performance Measurement.md
---

**Performance Measurement** is the process of calculating a [[Portfolio|portfolio's]] return, adjusting it for the risk taken, comparing it with a benchmark, and attributing the difference to the manager's decisions. Its parts answer what return was earned, whether it was enough for the risk, and where it came from.

The return that judges a manager is the time-weighted return $R_{TW}$. It chains the returns between external cash flows, so one plus the time-weighted return is

> $$1 + R_{TW} = \prod_{k=1}^{n}\left(1 + r_k\right)$$

- $r_k$ is the return over sub-period $k$, between external cash flows.

The time-weighted return does not depend on when the client added or withdrew money, so it is the standard for judging a manager. The money-weighted return is the [[Internal Rate of Return|internal rate of return]] of the portfolio's cash flows. It measures the investor's own experience, including the timing of the flows, and suits a manager who controls the flows, as in [[Private Equity|private equity]]. The [[Rate of Return|rate of return]] page works an example of both.

## Risk-adjusted measures

For a portfolio with return $R_p$, standard deviation $\sigma_p$ and beta $\beta_p$, with risk-free rate $R_f$ and market return $R_m$, the Sharpe ratio is

> $$S_p = \frac{R_p - R_f}{\sigma_p}$$

The Treynor ratio is

> $$T_p = \frac{R_p - R_f}{\beta_p}$$

Jensen's alpha is

> $$\alpha_p = R_p - \left[R_f + \beta_p\left(R_m - R_f\right)\right]$$

The Sharpe ratio rewards return per unit of total risk and suits a portfolio that is the investor's whole wealth. The Treynor ratio and Jensen's alpha use only systematic risk, so they suit a portfolio that is one part of a diversified whole. They rely on the capital asset pricing model and a correct market proxy. A poorly diversified portfolio can rank well on Treynor and badly on Sharpe. The information ratio, the active return over the active risk, judges a manager against the benchmark the manager was given, as in [[Active Management|active management]].

> [!example]- How do portfolios X and Y compare on the Sharpe ratio, the Treynor ratio and Jensen's alpha? {Example}
> The risk-free rate is $3\%$, and the market returned $9\%$ with a standard deviation of $16\%$.
>
> | Portfolio | Return | Standard deviation | Beta |
> | :--- | ---: | ---: | ---: |
> | X | 11% | 20% | 1.2 |
> | Y | 8% | 12% | 0.7 |
>
> > [!answer]-
> > - The Sharpe ratios are $S_X = 8\%/20\% = 0.400$ and $S_Y = 5\%/12\% = 0.417$.
> > - The Treynor ratios are $T_X = 8\%/1.2 = 6.67\%$ and $T_Y = 5\%/0.7 = 7.14\%$.
> > - The alphas are $\alpha_X = 11\% - [3\% + 1.2(6\%)] = 0.8\%$ and $\alpha_Y = 8\% - [3\% + 0.7(6\%)] = 0.8\%$.
> > - Both beat the market's Sharpe ratio of $6\%/16\% = 0.375$.
> > - Both have the same alpha, but Y earns it with less risk, so Y ranks higher on both ratios. X's higher raw return comes from taking more market risk, which an investor could have had by holding the market with borrowing.

## Benchmarks

A valid benchmark is:

1. Specified in advance.
2. Appropriate to the manager's style.
3. Measurable.
4. Unambiguous.
5. Reflective of the manager's current holdings.
6. Accepted by the manager.
7. Investable.

A broad market index, a style index, a custom security-based benchmark and a peer group are the usual choices. A peer group fails several of the tests, because its members and their weights are not known in advance.

## Brinson attribution

Brinson attribution splits the active return into the allocation, selection and interaction effects $A_i$, $S_i$ and $I_i$ of each segment $i$:

> $$R_P - R_B = \sum_i \left(A_i + S_i + I_i\right)$$

With $w_i$ and $w_i^B$ the portfolio and benchmark weights of segment $i$, $R_i$ and $R_i^B$ their returns in it, and $R_B$ the benchmark's total return, the allocation effect is

> $$A_i = (w_i - w_i^B)(R_i^B - R_B)$$

The selection effect is

> $$S_i = w_i^B(R_i - R_i^B)$$

The interaction effect is

> $$I_i = (w_i - w_i^B)(R_i - R_i^B)$$

Allocation rewards overweighting segments that beat the benchmark total, so overweighting a segment with a positive but below-benchmark return detracts value. Selection rewards picking better securities within a segment, weighted by the benchmark weight. Some presentations fold the interaction into selection, so the question's definition decides which to report.

> [!example]- How does this manager's active return split into allocation, selection and interaction? {Example}
> | Segment | Benchmark weight | Benchmark return | Portfolio weight | Portfolio return |
> | :--- | ---: | ---: | ---: | ---: |
> | Technology | 40% | 12% | 50% | 10% |
> | Other stocks | 60% | 5% | 50% | 6% |
>
> > [!answer]-
> > - The benchmark returns $0.4(12\%) + 0.6(5\%) = 7.8\%$ and the portfolio $0.5(10\%) + 0.5(6\%) = 8.0\%$, an active return of $0.2\%$.
> > - Allocation is $0.1(12\% - 7.8\%) - 0.1(5\% - 7.8\%) = 0.70\%$.
> > - Selection is $0.4(10\% - 12\%) + 0.6(6\% - 5\%) = -0.20\%$.
> > - Interaction is $0.1(10\% - 12\%) - 0.1(6\% - 5\%) = -0.30\%$.
> > - The effects add to $0.70\% - 0.20\% - 0.30\% = 0.20\%$.
> > - The sector call added value, and the stock selection in technology took most of it away. The interaction is negative because the manager overweighted the sector where the selection was poor.

## Fixed income and factor-based attribution

Bond portfolios are attributed to yield curve, duration, sector and spread, and security selection effects, because a sector split misses the main bets. Factor-based attribution, using a returns-based or holdings-based factor model, separates a style tilt from skill.

## Appraisal and luck

A good period may be luck. Judging skill needs a long record, results consistent with the manager's stated process, and the [[Statistical Significance|statistical significance]] of the alpha or the information ratio.

## Performance of an insurer

The performance of a general insurer as a whole is measured with financial ratios rather than with portfolio returns. The subject there is the insurer's results and capital, covered by [[Key Financial Measures|key financial measures]] and [[Risk-Adjusted Performance|risk-adjusted performance]].

> [!trap] Judging a manager by the money-weighted return
> When the client controls the cash flows, the money-weighted return rewards or penalizes the manager for the client's timing. The time-weighted return is the one that judges the manager.
